"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { walletApi } from '@/lib/wallet';

// --- Types ---
interface WalletContextType {
    freeCredits: number;
    purchasedCredits: number;
    balance: number;
    totalCredits: number;  // purchasedCredits + freeCredits (from backend, not calculated)
    creditsUsed: number;   // Total credits used (from statistics.totalDebits)
    isLoading: boolean;
    refreshWallet: () => Promise<void>;
}

// --- Context ---
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// --- Hook to use wallet data ---
export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        // Return default values if not within provider (for non-authenticated pages)
        return {
            freeCredits: 0,
            purchasedCredits: 0,
            balance: 0,
            totalCredits: 0,
            creditsUsed: 0,
            isLoading: false,
            refreshWallet: async () => { },
        };
    }
    return context;
};

// --- Provider Component ---
export function WalletProvider({ children }: { children: React.ReactNode }) {
    const [freeCredits, setFreeCredits] = useState(0);
    const [purchasedCredits, setPurchasedCredits] = useState(0);
    const [totalCredits, setTotalCredits] = useState(0);
    const [creditsUsed, setCreditsUsed] = useState(0);
    const [balance, setBalance] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const hasFetched = useRef(false);

    // Fetch wallet data
    const refreshWallet = useCallback(async () => {
        try {
            setIsLoading(true);
            console.log('🔄 WalletContext: Fetching wallet data...');
            const response = await walletApi.getUserCredits();
            console.log('📦 WalletContext: API Response:', response);
            if (response.success && response.data) {
                console.log('✅ WalletContext: Setting values:', {
                    freeCredits: response.data.freeCredits,
                    purchasedCredits: response.data.purchasedCredits,
                    totalCredits: response.data.totalCredits,
                    creditsUsed: response.data.creditsUsed,
                    balance: response.data.balance
                });
                setFreeCredits(response.data.freeCredits || 0);
                setPurchasedCredits(response.data.purchasedCredits || 0);
                setTotalCredits(response.data.totalCredits || 0);
                setCreditsUsed(response.data.creditsUsed || 0);
                setBalance(response.data.balance || 0);
            }
        } catch (error) {
            console.error('❌ WalletProvider: Failed to fetch wallet:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Fetch once when authenticated
    useEffect(() => {
        // Function to check and fetch
        const checkAndFetch = () => {
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

            if (!token) {
                setIsLoading(false);
                return false;
            }

            if (hasFetched.current) {
                return true;
            }

            hasFetched.current = true;
            console.log('WalletContext: Token found, fetching wallet...');
            refreshWallet();
            return true;
        };

        // Initial check
        checkAndFetch();

        // Listen for wallet updates (e.g., after purchase)
        const handleWalletUpdate = () => {
            console.log('WalletContext: wallet-updated event received');
            hasFetched.current = false; // Allow refetch
            refreshWallet();
        };

        // Listen for auth changes (login/logout)
        const handleAuthChange = () => {
            console.log('WalletContext: auth-changed event received');
            hasFetched.current = false; // Reset fetch flag
            checkAndFetch();
        };

        window.addEventListener('wallet-updated', handleWalletUpdate);
        window.addEventListener('auth-changed', handleAuthChange);

        // Also check periodically for a short time after mount (for login scenarios)
        const checkInterval = setInterval(() => {
            if (!hasFetched.current) {
                const fetched = checkAndFetch();
                if (fetched) {
                    clearInterval(checkInterval);
                }
            } else {
                clearInterval(checkInterval);
            }
        }, 500);

        // Clear interval after 5 seconds
        setTimeout(() => clearInterval(checkInterval), 5000);

        return () => {
            window.removeEventListener('wallet-updated', handleWalletUpdate);
            window.removeEventListener('auth-changed', handleAuthChange);
            clearInterval(checkInterval);
        };
    }, [refreshWallet]);

    const value: WalletContextType = {
        freeCredits,
        purchasedCredits,
        balance,
        totalCredits,  // Using totalCredits from backend directly
        creditsUsed,   // Using creditsUsed from statistics.totalDebits
        isLoading,
        refreshWallet,
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
}
