"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useWallet } from '@/lib/WalletContext';

// --- Types ---
export type Step = 'UPLOAD' | 'GOALS' | 'EDITOR' | 'EXPORT';

export interface CreativeBuilderContextType {
    currentStep: Step;
    setCurrentStep: (step: Step) => void;
    uploadedImage: string | null;
    setUploadedImage: (img: string | null) => void;
    offer: string;
    setOffer: (val: string) => void;
    price: string;
    setPrice: (val: string) => void;
    offerPrice: string;
    setOfferPrice: (val: string) => void;
    selectedPlatform: string;
    setSelectedPlatform: (id: string) => void;
    showUploadError: boolean;
    setShowUploadError: (val: boolean) => void;
    demoState: {
        urlConnected: boolean;
        brandAssetsConnected: boolean;
        productNameAdded: boolean;
    };
    setDemoState: (val: any | ((prev: any) => any)) => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
    selectedConcept: any;
    setSelectedConcept: (concept: any) => void;
    showCaptionModal: boolean;
    setShowCaptionModal: (val: boolean) => void;
    balance: number;
    freeCredits: number;
}

// --- Context ---
const CreativeBuilderContext = createContext<CreativeBuilderContextType | null>(null);

export const useCreativeBuilder = () => {
    const context = useContext(CreativeBuilderContext);
    if (!context) {
        throw new Error('useCreativeBuilder must be used within CreativeBuilderProvider');
    }
    return context;
};

// --- Mock Data ---
const DEFAULT_CONCEPT = {
    id: 1,
    headline: 'Elevate Your Style',
    cta: 'Shop Now',
    score: 98,
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
};

// --- Provider Component ---
export function CreativeBuilderProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Derive current step from pathname
    const getCurrentStep = (): Step => {
        if (pathname?.includes('/goals')) return 'GOALS';
        if (pathname?.includes('/edit')) return 'EDITOR';
        if (pathname?.includes('/export')) return 'EXPORT';
        return 'UPLOAD';
    };

    const [currentStep, setCurrentStep] = useState<Step>(getCurrentStep());
    const [selectedPlatform, setSelectedPlatform] = useState('ig');
    const [offer, setOffer] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [selectedConcept, setSelectedConcept] = useState<any>(DEFAULT_CONCEPT);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Use global wallet context - dynamic values from API
    const { freeCredits, balance } = useWallet();

    // Validation & Demo State
    const [showUploadError, setShowUploadError] = useState(false);
    const [demoState, setDemoState] = useState({
        urlConnected: false,
        brandAssetsConnected: false,
        productNameAdded: false,
    });

    // Caption Modal State
    const [showCaptionModal, setShowCaptionModal] = useState(false);

    // Sync step with pathname for correct headers/progress
    useEffect(() => {
        setCurrentStep(getCurrentStep());
    }, [pathname]);

    const contextValue: CreativeBuilderContextType = {
        currentStep,
        setCurrentStep, // Still exposed but primary updates via effect
        uploadedImage,
        setUploadedImage,
        offer,
        setOffer,
        price,
        setPrice,
        offerPrice,
        setOfferPrice,
        selectedPlatform,
        setSelectedPlatform,
        showUploadError,
        setShowUploadError,
        demoState,
        setDemoState,
        fileInputRef,
        selectedConcept,
        setSelectedConcept,
        showCaptionModal,
        setShowCaptionModal,
        balance,
        freeCredits,
    };

    return (
        <CreativeBuilderContext.Provider value={contextValue}>
            {children}
        </CreativeBuilderContext.Provider>
    );
}
