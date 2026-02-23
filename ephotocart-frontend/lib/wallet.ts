import api from "./axios";

// Wallet Types
export interface WalletBalance {
    balance: number;
    currency: string;
    freeCredits: number;
    purchasedCredits: number;  // Maps to backend's paidCredits
    totalCredits: number;      // Total credits from backend (freeCredits + paidCredits)
    maxFreeCredits: number;
    promotionalCredits: number;
    isActive: boolean;
    stats?: {
        totalTransactions: number;
        totalCredits: number;
        totalDebits: number;
        imagesGenerated: number;
        monthlySpending: number;
        monthlyImages: number;
    };
}

export interface Transaction {
    id: string;
    type: 'credit' | 'debit' | 'refund' | 'bonus';
    category?: 'top_up' | 'image_generation' | 'subscription' | 'refund' | 'bonus' | 'referral' | 'adjustment';
    amount: number;
    currency: string;
    description: string;
    status: 'completed' | 'pending' | 'failed';
    createdAt: string;      // Frontend uses camelCase
    created_at?: string;    // Backend returns snake_case
    metadata?: {
        generationId?: string;
        paymentMethod?: string;
        promoCode?: string;
        orderId?: string;
    };
}

export interface TransactionFilters {
    type?: 'credit' | 'debit' | 'refund' | 'bonus';
    category?: 'top_up' | 'image_generation' | 'subscription' | 'refund' | 'bonus' | 'referral' | 'adjustment';
    status?: 'completed' | 'pending' | 'failed';
    days?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
    startDate?: string;
    endDate?: string;
}

export interface TransactionResponse {
    transactions: Transaction[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

export interface PaymentMethod {
    id: string;
    type: 'card' | 'upi' | 'netbanking' | 'wallet';
    last4?: string;
    brand?: string;
    expiryMonth?: number;
    expiryYear?: number;
    isDefault: boolean;
    upiId?: string;
}

export interface AddMoneyRequest {
    amount: number;
    packageId?: string;
}

export interface AddMoneyResponse {
    success?: boolean;
    message?: string;
    data?: {
        orderId: string;           // Razorpay order ID (e.g., order_K8aK9...)
        amount: number;
        currency: string;
        userId: string;
        razorpayKeyId: string;     // Razorpay key from backend
        internalOrderId: string;   // Internal reference
        phoneNumber?: string;      // For Razorpay prefill
        countryCode?: string;      // For Razorpay prefill
    };
}

// Payment Status Types
export interface PaymentStatusResponse {
    id: string;                    // Internal payment order ID (e.g., po_abc123)
    userId: string;
    amount: number;
    currency: string;
    status: 'created' | 'pending' | 'paid' | 'failed' | 'expired';
    gatewayPaymentId?: string;     // Razorpay payment ID (e.g., pay_K8aK9...)
    createdAt: string;
    paidAt?: string;
}

// Wallet Package Types
export interface Package {
    id: string;
    name: string;
    description: string;
    amount: number;
    credits: number;
    bonusCredits: number;
    totalCredits: number;
    currency: string;
    isPopular: boolean;
}

// Wallet Stats Types
export interface WalletStats {
    totalSpent: number;
    totalCreditsUsed: number;
    totalTransactions: number;
    averageSpending: number;
    lastTransaction?: string;
    monthlySpending?: number;
    weeklySpending?: number;
}

// Helper response type
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

// Clear all caches (Placeholder now as caching is removed)
export const clearWalletCache = () => {
    // No-op as requested by user to remove caching logic
};

// Wallet API functions
export const walletApi = {
    // Get wallet stats
    getStats: async (): Promise<ApiResponse<WalletStats>> => {
        try {
            console.log('🌐 Fetching stats from API...');
            const res = await api.get('/wallet/stats');
            return { success: true, data: res.data };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Failed to load stats' };
        }
    },

    // Get main wallet info including stats
    getWallet: async (): Promise<ApiResponse<WalletBalance>> => {
        try {
            console.log('🌐 Fetching wallet data from API...');
            const res = await api.get('/wallet');

            // Parse nested response structure
            if (res.data?.success && res.data?.data?.wallet) {
                const w = res.data.data.wallet;
                const s = res.data.data.statistics;

                // DEBUG: Log raw wallet response to see all available fields
                console.log('💰 RAW WALLET RESPONSE:', JSON.stringify(w, null, 2));

                // Parse purchased credits - backend sends as paidCredits
                const purchasedCredits = Number(w.paidCredits ?? w.paid_credits ?? w.purchasedCredits ?? w.purchased_credits ?? 0);
                const freeCredits = Number(w.freeCredits ?? w.free_credits ?? 0);
                // Use backend's totalCredits directly, or calculate as fallback
                const totalCredits = Number(w.totalCredits ?? w.total_credits ?? (purchasedCredits + freeCredits));

                const walletData: WalletBalance = {
                    balance: Number(w.balance || 0),
                    currency: w.currency || 'INR',
                    freeCredits: freeCredits,
                    purchasedCredits: purchasedCredits,
                    totalCredits: totalCredits,
                    maxFreeCredits: Number(w.maxFreeCredits ?? w.max_free_credits ?? 1),
                    promotionalCredits: Number(w.promotionalCredits ?? w.promotional_credits ?? 0),
                    isActive: w.status === 'active',
                    stats: s
                };

                console.log('💰 PARSED WALLET DATA:', {
                    freeCredits: walletData.freeCredits,
                    purchasedCredits: walletData.purchasedCredits,
                    totalCredits: walletData.totalCredits,
                    balance: walletData.balance
                });

                return { success: true, data: walletData };
            }

            return { success: true, data: res.data };
        } catch (err: any) {
            console.error('getWallet error:', err);
            return { success: false, error: err.response?.data?.message || 'Failed to load wallet' };
        }
    },

    // Get wallet balance - Explicit endpoint
    getBalance: async (): Promise<ApiResponse<WalletBalance>> => {
        try {
            console.log('🌐 Fetching balance from /wallet/balance...');
            const res = await api.get('/wallet/balance');
            return { success: true, data: res.data };
        } catch (err: any) {
            // Don't fallback to getWallet() to avoid duplicate calls
            // Just return error - caller should use getWallet() directly if needed
            console.warn('Failed to fetch balance from /wallet/balance');
            return { success: false, error: err.response?.data?.message || 'Failed to fetch balance' };
        }
    },

    // Get user credits specifically - for navbar/header display
    getUserCredits: async (): Promise<ApiResponse<{ freeCredits: number; purchasedCredits: number; totalCredits: number; creditsUsed: number; balance: number; maxFreeCredits: number }>> => {
        try {
            const walletRes = await walletApi.getWallet();
            if (walletRes.success && walletRes.data) {
                // Get creditsUsed from statistics.totalDebits
                const creditsUsed = walletRes.data.stats?.totalDebits ?? 0;
                
                console.log('💳 getUserCredits - Returning:', {
                    freeCredits: walletRes.data.freeCredits,
                    purchasedCredits: walletRes.data.purchasedCredits,
                    totalCredits: walletRes.data.totalCredits,
                    creditsUsed: creditsUsed,
                    balance: walletRes.data.balance
                });
                return {
                    success: true,
                    data: {
                        freeCredits: walletRes.data.freeCredits ?? 0,
                        purchasedCredits: walletRes.data.purchasedCredits ?? 0,
                        totalCredits: walletRes.data.totalCredits ?? 0,
                        creditsUsed: creditsUsed,
                        balance: walletRes.data.balance ?? 0,
                        maxFreeCredits: walletRes.data.maxFreeCredits ?? 1
                    }
                };
            }
            return { success: false, error: 'Failed to fetch wallet data' };
        } catch (err: any) {
            console.error('Failed to get user credits:', err);
            return { success: false, error: err.message || 'Failed to fetch credits' };
        }
    },

    // Check if user has sufficient balance for an amount
    checkBalance: async (amount: number): Promise<ApiResponse<{
        canProceed: boolean;
        hasFreeCredits: boolean;
        freeCredits: number;
        balance: number;
        requiredAmount: number;
        shortfall: number;
    }>> => {
        try {
            console.log('=== CHECK BALANCE REQUEST ===');
            console.log('Amount:', amount);

            const res = await api.post('/wallet/check-balance', { amount });

            console.log('=== CHECK BALANCE RESPONSE ===');
            console.log('Response:', res.data);

            // Handle nested response { success: true, data: {...} }
            if (res.data?.success && res.data?.data) {
                return { success: true, data: res.data.data };
            }
            return { success: true, data: res.data };
        } catch (err: any) {
            console.log('=== CHECK BALANCE ERROR ===');
            console.log('Error:', err.response?.data);
            return { success: false, error: err.response?.data?.message || 'Failed to check balance' };
        }
    },

    // Get transactions
    getTransactions: async (
        page: number = 1,
        limit: number = 20,
        filters?: TransactionFilters
    ): Promise<ApiResponse<TransactionResponse>> => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        // Add filter parameters matching backend API
        if (filters?.days) params.append('days', filters.days.toString());
        if (filters?.type) params.append('type', filters.type);
        if (filters?.category) params.append('category', filters.category);
        if (filters?.status) params.append('status', filters.status);
        if (filters?.sortBy) params.append('sortBy', filters.sortBy);
        if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);
        if (filters?.startDate) params.append('startDate', filters.startDate);
        if (filters?.endDate) params.append('endDate', filters.endDate);

        try {
            console.log('[Wallet] Fetching transactions with params:', params.toString());
            const res = await api.get(`/wallet/transactions?${params.toString()}`);
            console.log('[Wallet] Transactions API response:', res.data);

            // Parse response - handle different response structures
            let transactionsData: Transaction[] = [];
            let total = 0;
            let hasMore = false;

            // Actual API response: { success: true, data: [...], pagination: {...} }
            if (res.data?.success && res.data?.data) {
                const data = res.data.data;
                const pagination = res.data.pagination;

                // data is directly the transactions array
                if (Array.isArray(data)) {
                    transactionsData = data;
                    total = pagination?.total || data.length;
                    hasMore = pagination?.hasNext || false;
                    console.log('[Wallet] Parsed from { success, data: [...], pagination }:', data.length, 'transactions');
                } else if (data.transactions && Array.isArray(data.transactions)) {
                    // Fallback: { success, data: { transactions: [...] } }
                    transactionsData = data.transactions;
                    total = data.total || pagination?.total || data.transactions.length;
                    hasMore = data.hasMore || pagination?.hasNext || false;
                }
            } else if (res.data?.transactions && Array.isArray(res.data.transactions)) {
                // Direct: { transactions: [...], total, ... }
                transactionsData = res.data.transactions;
                total = res.data.total || res.data.transactions.length;
                hasMore = res.data.hasMore || false;
            } else if (Array.isArray(res.data)) {
                // Direct array
                transactionsData = res.data;
                total = res.data.length;
            }

            // Normalize fields for each transaction
            const normalizedTransactions: Transaction[] = transactionsData.map((tx: any) => ({
                id: tx.id,
                type: tx.type,
                category: tx.category,
                amount: Number(tx.amount || 0),
                currency: tx.currency || 'INR',
                description: tx.description || tx.title || '',
                status: tx.paymentStatus || tx.status || 'completed', // Use paymentStatus from API
                createdAt: tx.createdAt || tx.created_at || new Date().toISOString(),
                metadata: tx.metadata || {},
            }));

            console.log('[Wallet] Parsed transactions:', normalizedTransactions.length);

            return {
                success: true,
                data: {
                    transactions: normalizedTransactions,
                    total,
                    page,
                    limit,
                    hasMore,
                }
            };
        } catch (err: any) {
            console.error('[Wallet] getTransactions error:', err);
            return { success: false, error: err.response?.data?.message || 'Failed to load transactions' };
        }
    },

    // Get single transaction
    getTransaction: async (id: string): Promise<ApiResponse<Transaction>> => {
        try {
            const res = await api.get(`/wallet/transactions/${id}`);
            return { success: true, data: res.data };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Failed to load transaction' };
        }
    },

    // Create payment order via Razorpay (POST /payment/create-order)
    createPaymentOrder: async (amount: number, packageId?: string): Promise<ApiResponse<AddMoneyResponse>> => {
        try {
            console.log('=== CREATE PAYMENT ORDER REQUEST ===');
            console.log('Endpoint: POST /payment/create-order');
            console.log('Amount:', amount);
            console.log('Package ID:', packageId || 'None (custom amount)');

            const requestBody: AddMoneyRequest = { amount };
            if (packageId) {
                requestBody.packageId = packageId;
            }

            console.log('Request Body:', JSON.stringify(requestBody, null, 2));

            const res = await api.post('/payment/create-order', requestBody);

            console.log('=== CREATE PAYMENT ORDER SUCCESS ===');
            console.log('Status:', res.status);
            console.log('Full Response:', JSON.stringify(res.data, null, 2));

            // Log phone data specifically for debugging
            const orderData = res.data?.data || res.data;
            console.log('Order ID:', orderData?.orderId);
            console.log('Razorpay Key ID:', orderData?.razorpayKeyId ? 'Present ✅' : 'Missing ❌');
            console.log('Phone Number:', orderData?.phoneNumber || 'Not provided');
            console.log('Country Code:', orderData?.countryCode || 'Not provided');

            return { success: true, data: res.data };
        } catch (err: any) {
            console.log('=== CREATE PAYMENT ORDER ERROR ===');
            console.log('Status:', err.response?.status);
            console.log('Error Response:', JSON.stringify(err.response?.data, null, 2));
            console.log('Error Message:', err.message);

            // Extract error message from various possible response formats
            const errorMsg = err.response?.data?.message
                || err.response?.data?.error
                || err.response?.data?.errors?.[0]?.message
                || `HTTP ${err.response?.status}: ${err.response?.statusText}`
                || err.message
                || 'Failed to create payment order';

            return { success: false, error: errorMsg };
        }
    },

    // Get payment methods
    getPaymentMethods: async (): Promise<ApiResponse<PaymentMethod[]>> => {
        return Promise.resolve({ success: true, data: [] });
    },

    // Add payment method
    addPaymentMethod: async (data: any): Promise<ApiResponse<PaymentMethod>> => {
        return Promise.resolve({ success: false, error: 'Not implemented' });
    },

    // Remove payment method
    removePaymentMethod: async (id: string): Promise<ApiResponse<{ success: boolean }>> => {
        return Promise.resolve({ success: true, data: { success: true } });
    },

    // Set default payment method
    setDefaultPaymentMethod: async (id: string): Promise<ApiResponse<PaymentMethod>> => {
        return Promise.resolve({ success: false, error: 'Not implemented' });
    },

    // Apply promo code
    applyPromoCode: async (code: string): Promise<ApiResponse<{
        valid: boolean;
        discount?: number;
        message: string;
    }>> => {
        return Promise.resolve({ success: true, data: { valid: true, discount: 10, message: 'Promo applied' } });
    },



    // Get available wallet packages
    getPackages: async (): Promise<ApiResponse<Package[]>> => {
        try {
            console.log('🌐 Fetching fresh packages from API...');
            const res = await api.get('/wallet/packages');

            let packagesData: Package[] = [];

            // API returns { success: true, data: [...packages] }
            if (res.data?.success && Array.isArray(res.data?.data)) {
                packagesData = res.data.data;
            } else if (Array.isArray(res.data)) {
                packagesData = res.data;
            } else {
                packagesData = res.data?.data || res.data || [];
            }

            return { success: true, data: packagesData };
        } catch (err: any) {
            console.error('getPackages error:', err);
            return { success: false, error: err.response?.data?.message || 'Failed to load packages' };
        }
    },

    // Get payment status (GET /payment/status/{orderId})
    getPaymentStatus: async (orderId: string): Promise<ApiResponse<PaymentStatusResponse>> => {
        try {
            console.log('=== GET PAYMENT STATUS REQUEST ===');
            console.log('Endpoint: GET /payment/status/' + orderId);
            console.log('Order ID:', orderId);
            console.log('Timestamp:', new Date().toISOString());

            const res = await api.get(`/payment/status/${orderId}`);

            console.log('=== GET PAYMENT STATUS SUCCESS ===');
            console.log('HTTP Status:', res.status);
            console.log('Full Response:', JSON.stringify(res.data, null, 2));

            // Parse response - handle nested { success, data } structure
            const responseData = res.data?.data || res.data;
            console.log('Payment ID:', responseData?.id);
            console.log('Payment Status:', responseData?.status);
            console.log('Amount:', responseData?.amount, responseData?.currency);
            console.log('Gateway Payment ID:', responseData?.gatewayPaymentId || 'N/A');
            console.log('Created At:', responseData?.createdAt);
            console.log('Paid At:', responseData?.paidAt || 'Not yet paid');

            return { success: true, data: responseData };
        } catch (err: any) {
            console.log('=== GET PAYMENT STATUS ERROR ===');
            console.log('Order ID:', orderId);
            console.log('HTTP Status:', err.response?.status);
            console.log('Error Response:', JSON.stringify(err.response?.data, null, 2));
            console.log('Error Message:', err.message);

            const errorMsg = err.response?.data?.message
                || err.response?.data?.error
                || `HTTP ${err.response?.status}: ${err.response?.statusText}`
                || err.message
                || 'Failed to get payment status';

            return { success: false, error: errorMsg };
        }
    },

    // Verify Razorpay payment (POST /payment/verify)
    verifyPayment: async (paymentData: {
        razorpayOrderId: string;
        razorpayPaymentId: string;
        razorpaySignature: string;
        amount: number;
    }): Promise<ApiResponse<{
        success: boolean;
        message: string;
        data?: {
            transactionId: string;
            paymentId: string;
            orderId: string;
            amount: number;
            balanceAfter: number;
            currency: string;
            timestamp: string;
        };
    }>> => {
        try {
            console.log('=== VERIFY PAYMENT REQUEST ===');
            console.log('Razorpay Order ID:', paymentData.razorpayOrderId);
            console.log('Razorpay Payment ID:', paymentData.razorpayPaymentId);
            console.log('Amount:', paymentData.amount);
            console.log('Full Request Body:', JSON.stringify(paymentData, null, 2));

            const res = await api.post('/payment/verify', paymentData);

            console.log('=== VERIFY PAYMENT SUCCESS ===');
            console.log('Response Status:', res.status);
            console.log('Response Data:', JSON.stringify(res.data, null, 2));
            return { success: true, data: res.data };
        } catch (err: any) {
            console.log('=== VERIFY PAYMENT ERROR ===');
            console.log('Status:', err.response?.status);
            console.log('Error Response:', JSON.stringify(err.response?.data, null, 2));
            console.log('Error Message:', err.message);

            const errorMsg = err.response?.data?.message
                || err.response?.data?.error
                || `HTTP ${err.response?.status}: ${err.response?.statusText}`
                || err.message
                || 'Payment verification failed';

            return { success: false, error: errorMsg };
        }
    },
};
