import api from "./axios";

// Settings Types
export interface UserProfile {
    id: string;
    email: string;
    phone?: string;
    phone_number?: string;
    country_code?: string;
    name?: string;
    full_name?: string;
    avatar?: string;
    avatar_url?: string;
    role: 'user' | 'admin';
    credits?: number;
    is_verified?: boolean;
    createdAt: string;
    updatedAt: string;
    last_login?: string;
}

export interface UserCredits {
    freeCredits: number;
    balance: number;
}

export interface UpdateProfileRequest {
    email?: string;
    phone?: string;
    name?: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface NotificationSettings {
    emailNotifications: boolean;
    pushNotifications: boolean;
    marketingEmails: boolean;
    generationUpdates: boolean;
    weeklyDigest: boolean;
}

export interface AccountSettings {
    language: string;
    timezone: string;
    currency: string;
    defaultImageFormat: 'png' | 'jpg' | 'webp';
    defaultImageQuality: 'low' | 'medium' | 'high';
}

// Helper response type
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

// Settings API functions
export const settingsApi = {
    // Get user profile — GET /api/auth/me (until /user/profile is deployed on backend)
    getProfile: async (): Promise<ApiResponse<UserProfile>> => {
        try {
            console.log("=== SETTINGS: GET PROFILE REQUEST ===");
            console.log("Endpoint: GET /auth/me");

            const res = await api.get('/auth/me');

            console.log("=== SETTINGS: GET PROFILE RESPONSE (SUCCESS) ===");
            console.log("Status:", res.status);
            console.log("Data:", JSON.stringify(res.data, null, 2));

            const profileData = res.data?.data || res.data;
            return { success: true, data: profileData };
        } catch (err: any) {
            console.log("=== SETTINGS: GET PROFILE ERROR ===");
            console.log("Status:", err.response?.status);
            console.log("Error Data:", JSON.stringify(err.response?.data, null, 2));

            return { success: false, error: err.response?.data?.message || 'Failed to load profile' };
        }
    },

    // Update user profile
    updateProfile: async (data: UpdateProfileRequest): Promise<ApiResponse<UserProfile>> => {
        try {
            const res = await api.put('/user/profile', data);
            return { success: true, data: res.data };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Failed to update profile' };
        }
    },

    // Change password
    changePassword: async (data: ChangePasswordRequest): Promise<ApiResponse<{ success: boolean; message: string }>> => {
        try {
            const res = await api.put('/user/password', data);
            return { success: true, data: res.data };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Failed to change password' };
        }
    },

    // Edit profile — PUT /api/user/edit-profile
    editProfile: async (data: {
        full_name?: string;
        phone_number?: string;
        country_code?: string;
        old_password?: string;
        new_password?: string;
        confirm_new_password?: string;
    }): Promise<ApiResponse<{ success: boolean; message: string; data?: any }>> => {
        try {
            console.log("=== EDIT PROFILE REQUEST ===");
            console.log("Endpoint: PUT /user/edit-profile");
            console.log("Payload:", JSON.stringify({
                ...data,
                old_password: data.old_password ? "***" : undefined,
                new_password: data.new_password ? "***" : undefined,
                confirm_new_password: data.confirm_new_password ? "***" : undefined,
            }));

            const res = await api.put('/user/edit-profile', data);

            console.log("=== EDIT PROFILE RESPONSE (SUCCESS) ===");
            console.log("Status:", res.status);
            console.log("Data:", JSON.stringify(res.data, null, 2));

            const responseData = res.data?.data || res.data;

            return {
                success: true,
                data: {
                    success: true,
                    message: res.data?.message || "Profile updated successfully",
                    data: responseData,
                }
            };
        } catch (err: any) {
            console.log("=== EDIT PROFILE ERROR ===");
            console.log("Status:", err.response?.status);
            console.log("Error Data:", JSON.stringify(err.response?.data, null, 2));

            const errorData = err.response?.data;
            let errorMessage = "";

            if (errorData) {
                if (errorData.message && typeof errorData.message === 'string') {
                    errorMessage = errorData.message;
                } else if (errorData.error && typeof errorData.error === 'string') {
                    errorMessage = errorData.error;
                }
            }

            return { success: false, error: errorMessage || 'Failed to update profile' };
        }
    },

    // Get notification settings
    getNotificationSettings: async (): Promise<ApiResponse<NotificationSettings>> => {
        try {
            const res = await api.get('/user/notifications');
            return { success: true, data: res.data };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Failed to load settings' };
        }
    },

    // Update notification settings
    updateNotificationSettings: async (data: Partial<NotificationSettings>): Promise<ApiResponse<NotificationSettings>> => {
        try {
            const res = await api.put('/user/notifications', data);
            return { success: true, data: res.data };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Failed to update settings' };
        }
    },

    // Get account settings
    getAccountSettings: async (): Promise<ApiResponse<AccountSettings>> => {
        try {
            const res = await api.get('/user/settings');
            return { success: true, data: res.data };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Failed to load settings' };
        }
    },

    // Update account settings
    updateAccountSettings: async (data: Partial<AccountSettings>): Promise<ApiResponse<AccountSettings>> => {
        try {
            const res = await api.put('/user/settings', data);
            return { success: true, data: res.data };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Failed to update settings' };
        }
    },

    // Get user credits (for header and settings)
    getUserCredits: async (): Promise<ApiResponse<UserCredits>> => {
        try {
            const res = await api.get('/wallet');
            const data = res.data?.data || res.data || {};

            return {
                success: true,
                data: {
                    freeCredits: data.freeCredits ?? 0,
                    balance: data.balance ?? 0
                }
            };
        } catch (err: any) {
            console.error('settingsApi.getUserCredits error:', err);
            // Return 0s on error instead of high mock values
            return { success: false, data: { freeCredits: 0, balance: 0 }, error: err.response?.data?.message };
        }
    },

    // Upload avatar
    uploadAvatar: async (file: File): Promise<ApiResponse<{ avatarUrl: string }>> => {
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const res = await api.post('/user/avatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return { success: true, data: res.data };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Failed to upload avatar' };
        }
    },

    // Delete account
    deleteAccount: async (password: string): Promise<ApiResponse<{ success: boolean }>> => {
        try {
            const res = await api.delete('/user/account', { data: { password } });
            return { success: true, data: res.data };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Failed to delete account' };
        }
    },

    // Export user data
    exportData: async (): Promise<ApiResponse<{ downloadUrl: string }>> => {
        try {
            const res = await api.get('/user/export');
            return { success: true, data: res.data };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Failed to export data' };
        }
    },
};
