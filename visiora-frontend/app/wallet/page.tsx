"use client";

import Link from "@/components/Link";
import {
    LayoutDashboard,
    Sparkles,
    Image,
    Wallet,
    Settings,
    ChevronDown,
    Zap,
    Plus,
    MoreHorizontal,
    Info,
    Receipt,
    ArrowRight,
    ChevronRight,
    Filter,
    Bell,
    Menu,
    Loader2,
    CreditCard,
    ArrowUpRight,
    ArrowDownLeft,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { walletApi, WalletBalance, Transaction, TransactionFilters, Package, WalletStats } from "@/lib/wallet";
import { authApi } from "@/lib/auth";
import { Sidebar, Header } from "@/components/layout";

export default function WalletPage() {
    // User profile state
    const [userName, setUserName] = useState("Jane");
    const [userInitial, setUserInitial] = useState("J");

    // API state
    const [walletBalance, setWalletBalance] = useState<WalletBalance | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [packages, setPackages] = useState<Package[]>([]);
    const [walletStats, setWalletStats] = useState<WalletStats | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPackages, setIsLoadingPackages] = useState(false);
    const [isAddingMoney, setIsAddingMoney] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<'30' | '60' | '90' | 'all'>('30');
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    // Transaction Details State
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [loadingTransactionId, setLoadingTransactionId] = useState<string | null>(null);

    const handleViewTransaction = async (id: string) => {
        setLoadingTransactionId(id);
        try {
            const response = await walletApi.getTransaction(id);
            if (response.success && response.data) {
                setSelectedTransaction(response.data);
                setShowDetailsModal(true);
            } else {
                // If fetching specific details fails, try to find in current list or show error
                const inList = transactions.find(t => t.id === id);
                if (inList) {
                    setSelectedTransaction(inList);
                    setShowDetailsModal(true);
                } else {
                    console.error("Failed to load transaction details:", response.error);
                }
            }
        } catch (error) {
            console.error("Error fetching transaction:", error);
        } finally {
            setLoadingTransactionId(null);
        }
    };

    const [apiError, setApiError] = useState<string | null>(null);

    // Fetch wallet data on mount - using sessionStorage to survive React Strict Mode remount
    useEffect(() => {
        const fetchKey = 'wallet_page_fetched';

        // Check if already fetched in this session (survives Strict Mode remount)
        if (sessionStorage.getItem(fetchKey)) {
            return;
        }
        sessionStorage.setItem(fetchKey, 'true');

        // Load user from localStorage
        const storedUser = authApi.getCurrentUser();
        if (storedUser && storedUser.fullName) {
            const firstName = storedUser.fullName.split(' ')[0];
            setUserName(firstName);
            setUserInitial(firstName.charAt(0).toUpperCase());
        }

        fetchWalletData();
        fetchPackages();

        // Cleanup: remove flag when component unmounts (for next navigation)
        return () => {
            sessionStorage.removeItem(fetchKey);
        };
    }, []);

    // Fetch transactions when filter changes (but not on initial mount - that's handled above)
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return; // Skip first run - initial transactions are fetched in fetchWalletData
        }
        fetchTransactions();
    }, [selectedFilter]);

    const fetchWalletData = async () => {
        setIsLoading(true);
        setApiError(null);
        try {
            const [walletRes, balanceRes, statsRes, transactionsRes] = await Promise.all([
                walletApi.getWallet(),      // GET /api/wallet
                walletApi.getBalance(),     // GET /api/wallet/balance
                walletApi.getStats(),       // GET /api/wallet/stats
                walletApi.getTransactions(1, 20),
            ]);

            // Check for rate limit errors in any response
            const responses = [walletRes, balanceRes, statsRes, transactionsRes];
            const rateLimitError = responses.find(r =>
                r.error?.toLowerCase().includes('too many requests') ||
                r.error?.toLowerCase().includes('rate limit')
            );

            if (rateLimitError) {
                setApiError('Too many requests. Please wait a moment and try again.');
                return;
            }

            // Use wallet data, fallback to balance data
            if (walletRes.success && walletRes.data) {
                setWalletBalance(walletRes.data);
            } else if (balanceRes.success && balanceRes.data) {
                setWalletBalance(balanceRes.data);
            }

            // Set wallet stats
            if (statsRes.success && statsRes.data) {
                setWalletStats(statsRes.data);
            }

            // Safe check for transactions
            if (transactionsRes.success && transactionsRes.data) {
                // Handle various response shapes
                const txData = transactionsRes.data;
                if (Array.isArray(txData)) {
                    setTransactions(txData);
                } else if (txData.transactions && Array.isArray(txData.transactions)) {
                    setTransactions(txData.transactions);
                } else {
                    console.warn('Unexpected transactions format:', txData);
                    setTransactions([]);
                }
            }
        } catch (error: any) {
            console.warn('Failed to fetch wallet data:', error);
            // Check for rate limit in catch block
            if (error?.message?.includes('429') || error?.message?.includes('Too many')) {
                setApiError('Too many requests. Please wait a moment and try again.');
            } else {
                setApiError('Failed to load wallet data. Please refresh the page.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTransactions = async () => {
        try {
            const now = new Date();
            let startDate: string | undefined;

            if (selectedFilter !== 'all') {
                const days = parseInt(selectedFilter);
                const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
                startDate = start.toISOString();
            }

            const filters: TransactionFilters = startDate ? { startDate } : {};
            const response = await walletApi.getTransactions(1, 20, Object.keys(filters).length > 0 ? filters : undefined);

            if (response.success && response.data) {
                const txData = response.data;
                if (Array.isArray(txData)) {
                    setTransactions(txData as any);
                } else if (txData.transactions && Array.isArray(txData.transactions)) {
                    setTransactions(txData.transactions);
                } else {
                    setTransactions([]);
                }
            }
        } catch (error) {
            console.warn('Failed to fetch transactions:', error);
            setTransactions([]);
        }
    };

    const fetchPackages = async () => {
        setIsLoadingPackages(true);
        try {
            // First, load from cache if available (instant load)
            const cached = localStorage.getItem('wallet_packages');
            if (cached) {
                try {
                    const cachedData = JSON.parse(cached);
                    if (Array.isArray(cachedData) && cachedData.length > 0) {
                        console.log('📦 Loading packages from cache:', cachedData.length);
                        setPackages(cachedData);
                        // Auto-select popular package or first one
                        const popularPkg = cachedData.find((p: any) => p.isPopular);
                        if (popularPkg) {
                            setSelectedPackage(popularPkg.id);
                        } else {
                            setSelectedPackage(cachedData[0].id);
                        }
                    }
                } catch (e) {
                    console.warn('Failed to parse cached packages:', e);
                }
            }

            // Then fetch fresh data from API
            const response = await walletApi.getPackages();
            console.log('=== PACKAGES API RESPONSE ===', response);

            // Handle different response formats: array directly or object with packages array
            let packagesData: any[] = [];

            if (response.success && response.data) {
                const data = response.data as any;
                console.log('Packages data type:', typeof data, Array.isArray(data) ? 'isArray' : 'notArray');
                console.log('Packages data:', data);

                if (Array.isArray(data)) {
                    packagesData = data;
                } else if (data.packages && Array.isArray(data.packages)) {
                    packagesData = data.packages;
                } else if (data.data && Array.isArray(data.data)) {
                    // Handle nested data.data structure
                    packagesData = data.data;
                } else if (typeof data === 'object') {
                    // If it's an object, try to convert to array or ignore
                    console.warn('Packages API returned object instead of array:', data);
                }
            }

            console.log('Final packagesData:', packagesData, 'length:', packagesData.length);

            if (packagesData.length > 0) {
                setPackages(packagesData);
                // Cache packages in localStorage for next time
                localStorage.setItem('wallet_packages', JSON.stringify(packagesData));
                console.log('✅ Packages cached for future loads');

                // Auto-select popular package or first one
                const popularPkg = packagesData.find((p: any) => p.isPopular);
                if (popularPkg) {
                    setSelectedPackage(popularPkg.id);
                } else {
                    setSelectedPackage(packagesData[0].id);
                }
            } else {
                console.warn('No packages found in response - keeping existing packages');
                // Don't clear packages if we already have some
                // setPackages([]); // REMOVED - keep existing data
            }
        } catch (error) {
            console.error('Failed to fetch packages:', error);
            // Don't clear packages on error - keep existing data
            // setPackages([]); // REMOVED - keep existing data
        } finally {
            setIsLoadingPackages(false);
        }
    };

    const handleAddMoney = async () => {
        // Get amount from selected package or use default
        const selectedPkg = packages.find(p => p.id === selectedPackage);
        const amount = selectedPkg?.amount || 100; // Default to 100 if no package selected

        setIsAddingMoney(true);
        try {
            // Step 1: Call add-money API to create Razorpay order
            const response = await walletApi.addMoney(amount, 'razorpay', {
                packageId: selectedPackage || undefined,
                credits: selectedPkg?.totalCredits || 0,
            });

            console.log('=== ADD MONEY API RESPONSE ===');
            console.log('Response:', response);

            if (!response.success || !response.data) {
                alert('Error: ' + (response.error || 'Failed to create order'));
                setIsAddingMoney(false);
                return;
            }

            // Step 2: Extract order details from response
            const orderData = response.data;
            const razorpayOrderId = orderData.razorpayOrderId || orderData.orderId || orderData.order_id || orderData.id;

            if (!razorpayOrderId) {
                console.error('No order ID in response:', orderData);
                alert('Error: No order ID received from server');
                setIsAddingMoney(false);
                return;
            }

            // Step 3: Load Razorpay script if not already loaded
            if (!window.Razorpay) {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.async = true;
                await new Promise<void>((resolve, reject) => {
                    script.onload = () => resolve();
                    script.onerror = () => reject(new Error('Failed to load Razorpay'));
                    document.body.appendChild(script);
                });
            }

            // Step 4: Get user details for prefill
            const user = authApi.getCurrentUser();

            // Step 5: Open Razorpay checkout
            const razorpayOptions = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY', // Replace with your Razorpay key
                amount: amount * 100, // Razorpay expects amount in paise
                currency: currency || 'INR',
                name: 'Visiora',
                description: selectedPkg ? `${selectedPkg.totalCredits} Credits - ${selectedPkg.name}` : 'Add Money to Wallet',
                order_id: razorpayOrderId,
                handler: async function (razorpayResponse: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) {
                    console.log('=== RAZORPAY SUCCESS ===');
                    console.log('Response:', razorpayResponse);

                    // Step 6: Verify payment with backend
                    try {
                        const verifyResult = await walletApi.verifyPayment({
                            orderId: razorpayResponse.razorpay_order_id,
                            paymentId: razorpayResponse.razorpay_payment_id,
                            signature: razorpayResponse.razorpay_signature,
                            method: 'razorpay',
                        });

                        if (verifyResult.success) {
                            alert('✅ Payment successful! ' + (verifyResult.data?.message || 'Credits added to your wallet.'));
                            // Refresh wallet data
                            fetchWalletData();
                            // Sync Header
                            window.dispatchEvent(new Event('wallet-updated'));
                        } else {
                            alert('⚠️ Payment verification failed: ' + (verifyResult.error || 'Please contact support.'));
                        }
                    } catch (verifyError) {
                        console.error('Payment verification error:', verifyError);
                        alert('⚠️ Payment completed but verification failed. Please contact support.');
                    }
                },
                prefill: {
                    name: user?.fullName || userName,
                    email: user?.email || '',
                    contact: '',
                },
                theme: {
                    color: '#14b8a6', // Teal color matching Visiora theme
                },
                modal: {
                    ondismiss: function () {
                        console.log('Razorpay checkout dismissed');
                        setIsAddingMoney(false);
                    },
                    escape: true,
                    animation: true,
                },
            };

            const razorpay = new window.Razorpay(razorpayOptions);

            razorpay.on('payment.failed', function (response: any) {
                console.error('=== RAZORPAY PAYMENT FAILED ===');
                console.error('Error:', response.error);
                alert('❌ Payment failed: ' + (response.error?.description || 'Please try again.'));
                setIsAddingMoney(false);
            });

            razorpay.open();

        } catch (error) {
            console.error('Failed to initiate payment:', error);
            alert('An error occurred. Please try again.');
            setIsAddingMoney(false);
        }
    };


    // Derived values with fallbacks
    const balance = walletBalance?.balance ?? 0;
    const currency = walletBalance?.currency ?? 'INR';
    const freeCredits = walletBalance?.freeCredits ?? 1;
    const isActive = walletBalance?.isActive ?? true;
    const promotionalCredits = walletBalance?.promotionalCredits ?? 0;

    // Format currency based on type
    const formatCurrency = (amount: number, curr: string = currency) => {
        if (curr === 'INR') return `₹${amount.toFixed(2)}`;
        if (curr === 'USD') return `$${amount.toFixed(2)}`;
        return `${amount.toFixed(2)} ${curr}`;
    };

    // Get transaction icon
    const getTransactionIcon = (type: string) => {
        switch (type) {
            case 'credit':
            case 'promotional':
                return <ArrowDownLeft className="w-4 h-4 text-green-500" />;
            case 'debit':
                return <ArrowUpRight className="w-4 h-4 text-red-500" />;
            case 'refund':
                return <ArrowDownLeft className="w-4 h-4 text-blue-500" />;
            default:
                return <CreditCard className="w-4 h-4 text-slate-400" />;
        }
    };

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { id: "generate", label: "Generate Image", icon: Sparkles, href: "/generate" },
        { id: "gallery", label: "My Gallery", icon: Image, href: "/gallery" },
        { id: "wallet", label: "Wallet", icon: Wallet, href: "/wallet", active: true },
    ];

    return (
        <div className="h-full flex overflow-x-hidden bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Reusable Sidebar */}
            <Sidebar activeNav="wallet" />

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-full overflow-x-hidden lg:overflow-hidden bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
                {/* Reusable Header with dynamic breadcrumbs */}
                <Header
                    breadcrumbs={[
                        { label: "Home", href: "/?view=landing" },
                        { label: "Wallet" }
                    ]}
                    freeCredits={freeCredits}
                    balance={balance}
                />

                {/* Main Content Area - Scrollable on mobile */}
                <div className="flex-1 flex flex-col overflow-y-auto lg:overflow-hidden p-4 sm:p-6">
                    {/* Page Header */}
                    <div className="shrink-0 mb-3">
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Overview</h1>
                        <p className="text-slate-500 dark:text-gray-400 text-xs mt-0.5">Welcome back. Here's a snapshot of your wallet activity.</p>
                    </div>

                    {/* Error Banner */}
                    {apiError && (
                        <div className="shrink-0 mb-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-xs font-bold">!</span>
                                </div>
                                <p className="text-amber-800 dark:text-amber-200 text-sm">{apiError}</p>
                            </div>
                            <button
                                onClick={() => { setApiError(null); fetchWalletData(); fetchPackages(); }}
                                className="px-3 py-1 text-xs font-medium bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {/* Content - Fixed Layout with flex sections */}
                    {/* Main Split Layout */}
                    <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 overflow-hidden scroll-smooth">

                        {/* LEFT COLUMN - Balance & Transactions */}
                        <div className="flex-1 flex flex-col gap-5 min-h-0 overflow-hidden">

                            {/* Balance Card */}
                            <div className="shrink-0 rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden p-6 transition-all hover:shadow-md">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-slate-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Current Balance</span>
                                            <Info className="w-3.5 h-3.5 text-slate-400 cursor-help hover:text-teal-500 transition-colors" />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{formatCurrency(balance)}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 text-[10px] font-bold">{currency}</span>
                                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${isActive ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 text-red-700'}`}>{isActive ? 'ACTIVE' : 'INACTIVE'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                                        <button
                                            onClick={handleAddMoney}
                                            disabled={isAddingMoney}
                                            className="flex-1 md:flex-none cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white h-11 px-6 text-sm font-bold shadow-lg shadow-teal-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                        >
                                            {isAddingMoney ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Plus className="w-4 h-4" />
                                            )}
                                            {isAddingMoney ? 'Processing...' : 'Add Money'}
                                        </button>
                                        <button className="cursor-pointer inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white h-11 w-11 transition-all hover:border-slate-300">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Transaction History Card */}
                            <div className="flex-1 flex flex-col rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden min-h-[300px]">
                                {/* Header */}
                                <div className="px-6 py-4 border-b border-slate-100 dark:border-gray-700 flex items-center justify-between shrink-0">
                                    <div className="flex items-center gap-3">
                                        <div className="p-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-500">
                                            <Receipt className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-slate-900 dark:text-white text-base font-bold">Transaction History</h3>
                                    </div>
                                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-gray-600 text-slate-600 dark:text-gray-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">
                                        <span>Last 30 days</span>
                                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                                    </button>
                                </div>

                                {/* List */}
                                {isLoading ? (
                                    <div className="flex-1 flex flex-col items-center justify-center p-6">
                                        <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
                                    </div>
                                ) : transactions.length > 0 ? (
                                    <div className="flex-1 overflow-y-auto">
                                        {transactions.map((tx) => (
                                            <div
                                                key={tx.id}
                                                onClick={() => handleViewTransaction(tx.id)}
                                                className="group cursor-pointer flex items-center justify-between px-6 py-4 border-b border-slate-50 dark:border-gray-700/50 hover:bg-slate-50 dark:hover:bg-gray-700/30 transition-all last:border-0"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`shrink-0 size-10 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'
                                                        }`}>
                                                        {getTransactionIcon(tx.type)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{tx.description}</p>
                                                        <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">{new Date(tx.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-base font-bold ${tx.type === 'debit' ? 'text-slate-900 dark:text-white' : 'text-green-600'}`}>
                                                        {tx.type === 'debit' ? '-' : '+'}{formatCurrency(tx.amount, tx.currency)}
                                                    </p>
                                                    <span className={`inline-block mt-0.5 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded ${tx.status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                                                        }`}>
                                                        {tx.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                                        <div className="size-20 bg-slate-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
                                            <Receipt className="w-8 h-8 text-slate-300 dark:text-gray-600" />
                                        </div>
                                        <h4 className="text-slate-900 dark:text-white text-lg font-bold mb-1">No transactions yet</h4>
                                        <p className="text-slate-500 dark:text-gray-400 text-sm max-w-xs mx-auto">
                                            Your purchase history and credit usage will appear here.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT COLUMN - Fixed Sidebar */}
                        <div className="w-full lg:w-[320px] 2xl:w-[360px] shrink-0 flex flex-col gap-4 overflow-y-auto pb-4 h-full">
                            <div className="flex items-center gap-2 px-1">
                                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                                <h3 className="text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider">Buy Credits</h3>
                            </div>

                            <div className="flex flex-col gap-3">
                                {isLoadingPackages ? (
                                    <div className="p-8 flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700">
                                        <Loader2 className="w-6 h-6 text-teal-500 animate-spin" />
                                    </div>
                                ) : packages.length > 0 ? (
                                    packages.map((pkg) => (
                                        <button
                                            key={pkg.id}
                                            onClick={() => setSelectedPackage(pkg.id)}
                                            className={`relative bg-white dark:bg-gray-800 rounded-2xl p-5 border-2 text-left transition-all hover:-translate-y-1 hover:shadow-lg group ${selectedPackage === pkg.id
                                                ? 'border-teal-500 shadow-md ring-2 ring-teal-500/10'
                                                : 'border-white dark:border-gray-800 shadow-sm hover:border-teal-100 dark:hover:border-teal-200'
                                                }`}
                                        >
                                            {pkg.isPopular && (
                                                <div className="absolute -top-2.5 right-4 bg-gradient-to-r from-teal-500 to-teal-400 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm">
                                                    Popular
                                                </div>
                                            )}

                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <div className="flex items-baseline gap-1.5">
                                                        <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{pkg.totalCredits}</span>
                                                        <span className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">Credits</span>
                                                    </div>
                                                    <p className="text-sm font-medium text-slate-500 dark:text-gray-400">{pkg.name}</p>
                                                </div>
                                                <span className="text-lg font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2.5 py-1 rounded-lg group-hover:bg-teal-500 group-hover:text-white transition-colors">
                                                    {formatCurrency(pkg.amount, pkg.currency)}
                                                </span>
                                            </div>

                                            {pkg.bonusCredits > 0 && (
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md inline-flex">
                                                    <Plus className="w-3 h-3" />
                                                    {pkg.bonusCredits} Bonus Credits
                                                </div>
                                            )}
                                        </button>
                                    ))
                                ) : (
                                    <div className="p-6 text-center bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700">
                                        <p className="text-slate-500 text-sm">No packages available</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction Details Modal */}
                {showDetailsModal && selectedTransaction && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDetailsModal(false)}></div>
                        <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            {/* Header */}
                            <div className="px-5 py-4 border-b border-slate-100 dark:border-gray-700 flex items-center justify-between">
                                <h3 className="text-base font-bold text-slate-900 dark:text-white">Transaction Details</h3>
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-gray-700 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-5">
                                <div className="flex flex-col items-center mb-6">
                                    <div className="size-14 bg-slate-50 dark:bg-gray-700/50 rounded-full flex items-center justify-center mb-3">
                                        {getTransactionIcon(selectedTransaction.type)}
                                    </div>
                                    <h2 className={`text-2xl font-bold ${selectedTransaction.type === 'debit' ? 'text-slate-900 dark:text-white' : 'text-green-600 dark:text-green-400'}`}>
                                        {selectedTransaction.type === 'debit' ? '-' : '+'}{formatCurrency(selectedTransaction.amount, selectedTransaction.currency)}
                                    </h2>
                                    <p className="text-sm font-medium text-slate-500 dark:text-gray-400 mt-1">{selectedTransaction.description}</p>
                                    <div className={`mt-2 px-2.5 py-0.5 rounded-full text-xs font-bold border ${selectedTransaction.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' : selectedTransaction.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                        {selectedTransaction.status.toUpperCase()}
                                    </div>
                                </div>

                                <div className="space-y-3 bg-slate-50 dark:bg-gray-700/30 rounded-xl p-4 border border-slate-100 dark:border-gray-700/50">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 dark:text-gray-400">Date</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">{new Date(selectedTransaction.createdAt).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 dark:text-gray-400">Transaction ID</span>
                                        <span className="font-mono font-medium text-slate-700 dark:text-gray-300 text-xs">{selectedTransaction.id}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 dark:text-gray-400">Type</span>
                                        <span className="capitalize font-semibold text-slate-900 dark:text-white">{selectedTransaction.type}</span>
                                    </div>
                                    {selectedTransaction.metadata?.paymentMethod && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-500 dark:text-gray-400">Gateway</span>
                                            <span className="capitalize font-semibold text-slate-900 dark:text-white">{selectedTransaction.metadata.paymentMethod}</span>
                                        </div>
                                    )}
                                    {/* Order ID from Metadata - If available */}
                                    {/* Need to ensure 'orderId' or similar effectively exists in Transaction type or metadata */}
                                    {(selectedTransaction as any).orderId && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-500 dark:text-gray-400">Order ID</span>
                                            <span className="font-mono text-slate-700 dark:text-gray-300 text-xs">{(selectedTransaction as any).orderId}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-4 border-t border-slate-100 dark:border-gray-700 bg-slate-50/50 dark:bg-gray-800/50 flex gap-3">
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="flex-1 py-2.5 bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl text-sm font-semibold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
                                >
                                    Close
                                </button>
                                <button className="flex-1 py-2.5 bg-teal-500 hover:bg-teal-600 rounded-xl text-sm font-semibold text-white transition-colors shadow-sm shadow-teal-500/20">
                                    Download Receipt
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
