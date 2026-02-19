import api from "./axios";

// Help & Support Types
export interface HelpItem {
    id: string;
    question: string;
    answer: string;
}

export interface HelpCategory {
    id: string;
    title: string;
    icon: string;
    items: HelpItem[];
}

export interface HelpSupportResponse {
    success: boolean;
    message: string;
    data: HelpCategory[];
}

// Support Subject Type
export interface SupportSubject {
    id: string;
    title: string;
    display_order: number;
    created_at: string;
    updated_at: string;
}

// Helper response type
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

// Help & Support API functions
export const helpApi = {
    // Get help & support data (FAQs)
    getHelpSupport: async (): Promise<ApiResponse<HelpCategory[]>> => {
        try {
            console.log('🌐 Fetching help & support data from API...');
            const res = await api.get('/help-support');

            // Handle response structure { success: true, data: [...] }
            if (res.data?.success && Array.isArray(res.data?.data)) {
                return { success: true, data: res.data.data };
            }

            // Direct array response
            if (Array.isArray(res.data)) {
                return { success: true, data: res.data };
            }

            return { success: true, data: res.data?.data || [] };
        } catch (err: any) {
            console.error('Failed to fetch help & support:', err);
            return {
                success: false,
                error: err.response?.data?.message || 'Failed to load help & support data'
            };
        }
    },

    // Get support subjects for dropdown
    getSubjects: async (): Promise<ApiResponse<SupportSubject[]>> => {
        try {
            console.log('🌐 Fetching support subjects from API...');
            const res = await api.get('/help-support/subjects');

            // Handle response structure { success: true, data: [...] }
            if (res.data?.success && Array.isArray(res.data?.data)) {
                return { success: true, data: res.data.data };
            }

            // Direct array response
            if (Array.isArray(res.data)) {
                return { success: true, data: res.data };
            }

            return { success: true, data: res.data?.data || [] };
        } catch (err: any) {
            console.error('Failed to fetch support subjects:', err);
            return {
                success: false,
                error: err.response?.data?.message || 'Failed to load support subjects'
            };
        }
    },

    // Send support email
    sendEmail: async (data: { email: string; subject: string; message: string }): Promise<ApiResponse<{ message: string }>> => {
        try {
            console.log('🌐 Sending support email to API...');
            const res = await api.post('/help-support/email/send', data);

            if (res.data?.success) {
                return {
                    success: true,
                    data: { message: res.data.message || 'Your message has been sent successfully.' }
                };
            }

            return {
                success: false,
                error: res.data?.message || 'Failed to send email'
            };
        } catch (err: any) {
            console.error('Failed to send support email:', err);
            return {
                success: false,
                error: err.response?.data?.message || 'Failed to send email. Please try again.'
            };
        }
    },
};
