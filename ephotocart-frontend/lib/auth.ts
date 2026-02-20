import api from "./axios";

// Auth Types
export interface RegisterData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    countryCode: string;
}

export interface LoginData {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface User {
    id: string;
    fullName: string;
    email: string;
}

export interface AuthResponse {
    user: User;
    token?: string;
    message?: string;
}

// Auth API functions
export const authApi = {
    // POST /api/auth/register
    register: async (userData: RegisterData) => {
        try {
            console.log("=== REGISTER REQUEST ===");
            console.log("Payload:", JSON.stringify({
                fullName: userData.fullName,
                email: userData.email,
                password: "***",
                confirmPassword: "***",
                phoneNumber: userData.phoneNumber,
                countryCode: userData.countryCode,
            }));

            const response = await api.post("/auth/register", {
                fullName: userData.fullName,
                email: userData.email,
                password: userData.password,
                confirmPassword: userData.confirmPassword,
                phoneNumber: userData.phoneNumber,
                countryCode: userData.countryCode,
            });

            console.log("=== REGISTER RESPONSE (SUCCESS) ===");
            console.log("Status:", response.status);
            console.log("Data:", JSON.stringify(response.data, null, 2));

            return {
                success: true,
                data: response.data?.data || response.data,
                message: response.data?.message || ""
            };
        } catch (err: any) {
            console.log("=== REGISTER ERROR ===");
            console.log("Status:", err.response?.status);
            console.log("Error Data:", JSON.stringify(err.response?.data, null, 2));

            const errorData = err.response?.data;
            let errorMessage = "";
            let errorCode = "";

            if (errorData) {
                errorCode = errorData.error || "";

                // VALIDATION_FAILED — extract details[] messages
                if (errorData.details && Array.isArray(errorData.details) && errorData.details.length > 0) {
                    errorMessage = errorData.details.map((d: any) => d.message).join(". ");
                    console.log("Validation Errors:", errorData.details);
                }
                // message field (EMAIL_EXISTS, etc.)
                else if (errorData.message && typeof errorData.message === 'string') {
                    errorMessage = errorData.message;
                }
                // fallback to error field
                else if (errorCode) {
                    errorMessage = errorCode;
                }
            }

            return {
                success: false,
                error: errorMessage,
                errorCode: errorCode
            };
        }
    },

    // POST /api/auth/verify-email
    verifyEmail: async (email: string, otp: string) => {
        try {
            console.log("=== VERIFY EMAIL REQUEST ===");
            console.log("Email:", email, "OTP:", otp);

            const response = await api.post("/auth/verify-email", { email, otp });

            console.log("=== VERIFY EMAIL RESPONSE ===");
            console.log("response.data:", JSON.stringify(response.data, null, 2));

            // On success, store tokens and user data
            if (response.data && typeof window !== 'undefined') {
                const { accessToken, refreshToken, user } = response.data.data || response.data;

                if (accessToken) {
                    localStorage.setItem('token', accessToken);
                    console.log('Access token saved');
                }
                if (refreshToken) {
                    localStorage.setItem('refreshToken', refreshToken);
                    console.log('Refresh token saved');
                }
                if (user) {
                    const normalizedUser = {
                        id: user.id || '',
                        fullName: user.fullName || user.name || '',
                        email: user.email || '',
                    };
                    localStorage.setItem('user', JSON.stringify(normalizedUser));
                    console.log('User saved:', normalizedUser);
                }
            }

            return { success: true, data: response.data };
        } catch (err: any) {
            console.log("Verify Email Error:", err.response?.data);

            const errorData = err.response?.data;
            let errorMessage = "Verification failed";

            if (errorData) {
                if (errorData.message && typeof errorData.message === 'string') {
                    errorMessage = errorData.message;
                } else if (errorData.error && typeof errorData.error === 'string') {
                    errorMessage = errorData.error;
                }
            }

            return {
                success: false,
                error: errorMessage,
                errorCode: errorData?.error || "UNKNOWN_ERROR"
            };
        }
    },

    // POST /api/auth/resend-otp
    resendOtp: async (email: string) => {
        try {
            console.log("=== RESEND OTP REQUEST ===");
            console.log("Email:", email);

            const response = await api.post("/auth/resend-otp", { email });

            console.log("=== RESEND OTP RESPONSE (SUCCESS) ===");
            console.log("Status:", response.status);
            console.log("Data:", JSON.stringify(response.data, null, 2));

            return {
                success: true,
                data: response.data?.data || response.data,
                message: response.data?.message || ""
            };
        } catch (err: any) {
            console.log("=== RESEND OTP ERROR ===");
            console.log("Status:", err.response?.status);
            console.log("Error Data:", JSON.stringify(err.response?.data, null, 2));

            const errorData = err.response?.data;
            let errorMessage = "";
            let errorCode = "";

            if (errorData) {
                errorCode = errorData.error || "";

                if (errorData.message && typeof errorData.message === 'string') {
                    errorMessage = errorData.message;
                } else if (errorCode) {
                    errorMessage = errorCode;
                }
            }

            return {
                success: false,
                error: errorMessage,
                errorCode: errorCode
            };
        }
    },

    // POST /api/auth/login
    login: async (credentials: LoginData) => {
        try {
            console.log("=== LOGIN REQUEST ===");
            console.log("Payload:", JSON.stringify({
                email: credentials.email,
                password: "***",
                rememberMe: credentials.rememberMe || false,
            }));

            const response = await api.post("/auth/login", {
                email: credentials.email,
                password: credentials.password,
                rememberMe: credentials.rememberMe || false,
            });

            console.log("=== LOGIN RESPONSE (SUCCESS) ===");
            console.log("Status:", response.status);
            console.log("Data:", JSON.stringify(response.data, null, 2));

            // Store tokens and user data on successful login
            if (response.data && typeof window !== 'undefined') {
                const data = response.data.data || response.data;
                const { accessToken, refreshToken, user } = data;

                if (accessToken) {
                    localStorage.setItem('token', accessToken);
                    console.log('Access token saved');
                }
                if (refreshToken) {
                    localStorage.setItem('refreshToken', refreshToken);
                    console.log('Refresh token saved');
                }
                if (user) {
                    const normalizedUser = {
                        id: user.id || '',
                        fullName: user.fullName || user.name || '',
                        email: user.email || '',
                    };
                    localStorage.setItem('user', JSON.stringify(normalizedUser));
                    console.log('User saved:', normalizedUser);
                }
            }

            return {
                success: true,
                data: response.data?.data || response.data,
                message: response.data?.message || ""
            };
        } catch (err: any) {
            console.log("=== LOGIN ERROR ===");
            console.log("Status:", err.response?.status);
            console.log("Error Data:", JSON.stringify(err.response?.data, null, 2));

            const errorData = err.response?.data;
            let errorMessage = "";
            let errorCode = "";
            let action = null;

            if (errorData) {
                errorCode = errorData.error || "";
                errorMessage = errorData.message || errorCode || "";
                // EMAIL_NOT_VERIFIED — includes action with resendUrl/verifyUrl
                if (errorData.action) {
                    action = errorData.action;
                    console.log("Action required:", JSON.stringify(action, null, 2));
                }
            }

            return {
                success: false,
                error: errorMessage,
                errorCode: errorCode,
                action: action
            };
        }
    },

    // POST /api/auth/logout
    logout: async () => {
        try {
            const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : '';
            await api.post("/auth/logout", { refreshToken: refreshToken || '' });
        } catch (err) {
            // Ignore errors, clear storage anyway
        }
        // Clear local storage
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('refreshToken');
        }
        return { success: true };
    },

    // GET /api/auth/me
    getMe: async () => {
        try {
            const response = await api.get("/auth/me");
            return { success: true, data: response.data };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || "Failed to get user" };
        }
    },

    // Get current user from localStorage (client-side)
    getCurrentUser: (): User | null => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        }
        return null;
    },

    // Update current user in localStorage (after profile edit)
    updateCurrentUser: (updates: Partial<User>): void => {
        if (typeof window !== 'undefined') {
            const currentUser = localStorage.getItem('user');
            if (currentUser) {
                const user = JSON.parse(currentUser);
                const updatedUser = { ...user, ...updates };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                console.log('User updated in localStorage:', updatedUser);
            }
        }
    },

    // Check if user is logged in
    isAuthenticated: (): boolean => {
        if (typeof window !== 'undefined') {
            return !!localStorage.getItem('token');
        }
        return false;
    },

    // POST /api/auth/forgot-password
    forgotPassword: async (email: string) => {
        try {
            console.log("=== FORGOT PASSWORD REQUEST ===");
            console.log("Payload:", JSON.stringify({ email }));

            const response = await api.post("/auth/forgot-password", { email });

            console.log("=== FORGOT PASSWORD RESPONSE (SUCCESS) ===");
            console.log("Status:", response.status);
            console.log("Data:", JSON.stringify(response.data, null, 2));

            return {
                success: true,
                message: response.data?.message || "Password reset link sent! Please check your email.",
            };
        } catch (err: any) {
            console.log("=== FORGOT PASSWORD ERROR ===");
            console.log("Status:", err.response?.status);
            console.log("Error Data:", JSON.stringify(err.response?.data, null, 2));

            const errorData = err.response?.data;
            let errorMessage = "Something went wrong. Please try again.";

            if (errorData) {
                if (errorData.details && Array.isArray(errorData.details) && errorData.details.length > 0) {
                    errorMessage = errorData.details.map((d: any) => d.message).join(". ");
                } else if (errorData.message) {
                    errorMessage = errorData.message;
                } else if (errorData.error) {
                    errorMessage = errorData.error;
                }
            }

            return {
                success: false,
                error: errorMessage,
                errorCode: errorData?.error || "",
            };
        }
    },
};

export default authApi;
