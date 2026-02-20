import api from "./axios";

// ========== User Profile Types ==========
export interface UserProfileData {
    id: string;
    full_name: string;
    email: string;
    phone_number: string | null;
    country_code: string | null;
    role: string;
    credits: number;
    is_verified: boolean;
    avatar_url: string | null;
    created_at: string;
    last_login: string | null;
}

// ========== API Response Type ==========
interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
    errorCode?: string;
}

// ========== User API ==========
export const userApi = {

    // GET /api/auth/me (TODO: switch to /user/profile when backend deploys it)
    getProfile: async (): Promise<ApiResponse<UserProfileData>> => {
        try {
            console.log("=== GET USER PROFILE REQUEST ===");
            console.log("Endpoint: GET /auth/me");
            console.log("Token:", typeof window !== 'undefined' ? (localStorage.getItem('token') ? 'Present ✅' : 'Missing ❌') : 'SSR');

            const response = await api.get("/auth/me");

            console.log("=== GET USER PROFILE RESPONSE (SUCCESS) ===");
            console.log("Status:", response.status);
            console.log("Data:", JSON.stringify(response.data, null, 2));

            // Extract data from response (handle both flat and nested)
            const profileData = response.data?.data || response.data;

            return {
                success: true,
                message: response.data?.message || "",
                data: {
                    id: profileData.id || "",
                    full_name: profileData.full_name || profileData.fullName || "",
                    email: profileData.email || "",
                    phone_number: profileData.phone_number || profileData.phoneNumber || null,
                    country_code: profileData.country_code || profileData.countryCode || null,
                    role: profileData.role || "user",
                    credits: profileData.credits ?? 0,
                    is_verified: profileData.is_verified ?? profileData.isVerified ?? false,
                    avatar_url: profileData.avatar_url || profileData.avatarUrl || null,
                    created_at: profileData.created_at || profileData.createdAt || "",
                    last_login: profileData.last_login || profileData.lastLogin || null,
                },
            };
        } catch (err: any) {
            console.log("=== GET USER PROFILE ERROR ===");
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

            // Handle specific HTTP status codes
            if (err.response?.status === 401) {
                errorMessage = errorMessage || "Session expired. Please login again.";
                errorCode = errorCode || "UNAUTHORIZED";
            } else if (err.response?.status === 404) {
                errorMessage = errorMessage || "User profile not found.";
                errorCode = errorCode || "NOT_FOUND";
            }

            return {
                success: false,
                error: errorMessage || "Failed to fetch profile",
                errorCode: errorCode,
            };
        }
    },

    // PUT /api/user/edit-profile
    updateProfile: async (data: {
        full_name?: string;
        phone_number?: string;
        country_code?: string;
        old_password?: string;
        new_password?: string;
        confirm_new_password?: string;
    }): Promise<ApiResponse> => {
        try {
            console.log("=== UPDATE PROFILE REQUEST ===");
            console.log("Endpoint: PUT /user/edit-profile");
            console.log("Payload:", JSON.stringify({
                ...data,
                old_password: data.old_password ? "***" : undefined,
                new_password: data.new_password ? "***" : undefined,
                confirm_new_password: data.confirm_new_password ? "***" : undefined,
            }));

            const response = await api.put("/user/edit-profile", data);

            console.log("=== UPDATE PROFILE RESPONSE (SUCCESS) ===");
            console.log("Status:", response.status);
            console.log("Data:", JSON.stringify(response.data, null, 2));

            const responseData = response.data?.data || response.data;

            return {
                success: true,
                message: response.data?.message || "",
                data: responseData,
            };
        } catch (err: any) {
            console.log("=== UPDATE PROFILE ERROR ===");
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
                error: errorMessage || "Failed to update profile",
                errorCode: errorCode,
            };
        }
    },
};

export default userApi;
