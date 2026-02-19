// import api from "./axios";

// // Generate Types based on backend API
// export type GenerationType = 'single_image' | 'E-commerce_bundle';
// export type UploadType = 'file' | 'url';

// // Source configuration for image upload
// export interface SourceConfig {
//     upload_type: UploadType;
//     file_id?: string;
//     image_url?: string;
//     strength?: number;
// }

// // Model options for generation request
// export interface ModelOptions {
//     model_id?: string;
//     category: string;
//     style?: string;
//     human_model_preset?: string;
//     show_model?: boolean;
// }

// // Bundle options for E-commerce bundle generation
// export interface BundleOptionsPayload {
//     product_views: string;
//     background: string;
//     format: string;
//     platform: string;
//     lighting: string;
//     effects: {
//         natural_shadow: boolean;
//         reflection: boolean;
//     };
//     image_count: number;
// }

// // Business info for branding
// export interface BusinessInfo {
//     brand_name?: string;
//     instagram_username?: string;
//     website_url?: string;
//     tagline?: string;
// }

// // Main request payload matching backend API exactly
// export interface GenerateRequest {
//     generation_type: 'single_image' | 'E-commerce_bundle';
//     source: SourceConfig;  // REQUIRED by backend
//     model: ModelOptions;   // REQUIRED by backend
//     bundle_options?: BundleOptionsPayload;
//     business?: BusinessInfo;
// }

// // Generated image from API response
// export interface GeneratedImageResponse {
//     id: string;
//     index: number;
//     filename: string;
//     url: string;
//     original_url: string;
//     has_branding: boolean;
//     saved_to_gallery: boolean;
// }

// // Credits info from API response
// export interface CreditsInfo {
//     deducted: boolean;
//     freeCreditsUsed: number;
//     paidAmount: number;
//     usedFreeCredit: boolean;
// }

// // API Response data
// export interface GenerateResponseData {
//     generation_type: string;
//     workflow: any;
//     source: any;
//     model: {
//         model_id: string;
//         model_name: string;
//         category: string;
//         style: string;
//     };
//     output: {
//         resolution: string;
//         format: string;
//         background: string;
//         requested_count: number;
//         generated_count: number;
//     };
//     generated_images: GeneratedImageResponse[];
//     business: BusinessInfo & { brand_logo: any };
//     user: { user_id: string };
//     credits: CreditsInfo | null;
//     meta: {
//         processing_time_ms: number;
//         prompt_used: string;
//         timestamp: string;
//     };
// }

// // Full API Response
// export interface GenerateResponse {
//     success: boolean;
//     message: string;
//     request_id: string;
//     data: GenerateResponseData;
// }

// // Form data interface for UI components
// export interface GenerateFormData {
//     generationType: GenerationType;
//     uploadType: UploadType;
//     fileId?: string;
//     imageUrl?: string;
//     modelId?: string;
//     modelCategory: string;
//     modelStyle: string;
//     businessCategory?: string;
//     brandName?: string;
//     imageCount?: number;
//     resolution?: string;
//     format?: string;
//     background?: string;
//     humanModelPreset?: string;
//     showModel?: boolean;
//     bundleOptions?: BundleOptionsPayload;
//     instagramUsername?: string;
//     websiteUrl?: string;
//     tagline?: string;
// }

// export interface GeneratedImage {
//     id: string;
//     url: string;
//     thumbnailUrl?: string;
//     prompt?: string;
//     style?: string;
//     createdAt: string;
// }

// export interface GenerateResult {
//     requestId: string;
//     status: 'pending' | 'processing' | 'completed' | 'failed';
//     images?: GeneratedImageResponse[];
//     message?: string;
//     creditsUsed?: number;
//     remainingCredits?: { free: number; paid: number };
// }

// // Category type from /generate/categories API
// export interface Category {
//     id: string;
//     name: string;
//     description: string;
//     show_model: boolean;
//     recommended_model: string;
//     icon: string | null;
// }

// // Full response from /generate/categories API
// export interface CategoriesResponse {
//     success: boolean;
//     data: Category[];
//     info: {
//         show_model_true: string;
//         show_model_false: string;
//     };
// }

// // Model Preset type from /generate/model-presets API
// export interface ModelPreset {
//     id: string;
//     name: string;
//     description: string;
//     prompt_description: string;
//     gender: 'female' | 'male' | 'unisex';
//     age_range: string;
//     style: 'professional' | 'casual' | 'athletic' | 'elegant' | 'diverse';
//     thumbnail?: string;
// }

// // Full response from /generate/model-presets API
// export interface ModelPresetsResponse {
//     success: boolean;
//     data: ModelPreset[];
//     info: {
//         description: string;
//         usage: string;
//     };
// }

// // Filter options for model presets
// export interface ModelPresetFilters {
//     gender?: 'female' | 'male' | 'unisex' | 'all';
//     style?: 'professional' | 'casual' | 'athletic' | 'elegant' | 'diverse' | 'all';
// }

// // Bundle Options types from /generate/bundle-options API
// export interface BundleOption {
//     id: string;
//     name: string;
//     description?: string;
//     prompt_addition?: string;
//     settings?: Record<string, any>;
//     is_default: boolean;
// }

// export interface BundleEffect {
//     id: string;
//     name: string;
//     description: string;
//     default: boolean;
// }

// export interface BundleOptionsData {
//     product_views: BundleOption[];
//     background: BundleOption[];
//     format: BundleOption[];
//     platform: BundleOption[];
//     lighting: BundleOption[];
// }

// export interface BundleEffects {
//     natural_shadow: BundleEffect;
//     reflection: BundleEffect;
// }

// export interface BundleOptionsResponse {
//     success: boolean;
//     data: BundleOptionsData;
//     effects: BundleEffects;
//     info: {
//         description: string;
//         usage: string;
//     };
// }

// export interface UserCredits {
//     freeCredits: number;
//     maxFreeCredits: number;
//     balance: number;
// }

// // Model type for AI models
// export interface Model {
//     id: string;
//     name: string;
//     category?: string;
//     style?: string;
//     description?: string;
//     thumbnail?: string;
//     isPremium?: boolean;
// }

// // Style type for generation styles
// export interface Style {
//     id: string;
//     name: string;
//     description?: string;
//     thumbnail?: string;
//     category?: string;
// }

// // Background type for background options
// export interface Background {
//     id: string;
//     name: string;
//     description?: string;
//     thumbnail?: string;
//     color?: string;
// }

// // Helper response type
// export interface ApiResponse<T = any> {
//     success: boolean;
//     data?: T;
//     error?: string;
// }

// // ============================================
// // Generate API Functions
// // ============================================
// export const generateApi = {

//     // ==========================================
//     // Get available business categories
//     // GET /api/generate/categories
//     // ==========================================
//     getCategories: async (): Promise<ApiResponse<CategoriesResponse>> => {
//         try {
//             const res = await api.get('/generate/categories');
//             return {
//                 success: true,
//                 data: {
//                     success: res.data.success,
//                     data: res.data.data,
//                     info: res.data.info
//                 }
//             };
//         } catch (err: any) {
//             console.error('getCategories error:', err.response?.data);
//             return { success: false, error: err.response?.data?.message || 'Failed to load categories' };
//         }
//     },

//     // ==========================================
//     // Get available AI models
//     // GET /api/generate/models
//     // ==========================================
//     getModels: async (): Promise<ApiResponse<Model[]>> => {
//         try {
//             const res = await api.get('/generate/models');
//             return { success: true, data: res.data.data || res.data };
//         } catch (err: any) {
//             console.error('getModels error:', err.response?.data);
//             return { success: false, error: err.response?.data?.message || 'Failed to load models' };
//         }
//     },

//     // ==========================================
//     // Get human model presets
//     // GET /api/generate/model-presets
//     // ==========================================
//     getModelPresets: async (filters?: ModelPresetFilters): Promise<ApiResponse<ModelPresetsResponse>> => {
//         try {
//             const params = new URLSearchParams();
//             if (filters?.gender && filters.gender !== 'all') {
//                 params.append('gender', filters.gender);
//             }
//             if (filters?.style && filters.style !== 'all') {
//                 params.append('style', filters.style);
//             }
//             const queryString = params.toString();
//             const url = queryString ? `/generate/model-presets?${queryString}` : '/generate/model-presets';

//             const res = await api.get(url);
//             return {
//                 success: true,
//                 data: {
//                     success: res.data.success,
//                     data: res.data.data,
//                     info: res.data.info
//                 }
//             };
//         } catch (err: any) {
//             console.error('getModelPresets error:', err.response?.data);
//             return { success: false, error: err.response?.data?.message || 'Failed to load model presets' };
//         }
//     },

//     // ==========================================
//     // Get available generation styles
//     // GET /api/generate/styles
//     // ==========================================
//     getStyles: async (): Promise<ApiResponse<Style[]>> => {
//         try {
//             const res = await api.get('/generate/styles');
//             return { success: true, data: res.data.data || res.data };
//         } catch (err: any) {
//             console.error('getStyles error:', err.response?.data);
//             return { success: false, error: err.response?.data?.message || 'Failed to load styles' };
//         }
//     },

//     // ==========================================
//     // Get available backgrounds
//     // GET /api/generate/backgrounds
//     // ==========================================
//     getBackgrounds: async (): Promise<ApiResponse<Background[]>> => {
//         try {
//             const res = await api.get('/generate/backgrounds');
//             return { success: true, data: res.data.data || res.data };
//         } catch (err: any) {
//             console.error('getBackgrounds error:', err.response?.data);
//             return { success: false, error: err.response?.data?.message || 'Failed to load backgrounds' };
//         }
//     },

//     // ==========================================
//     // Get E-Commerce bundle options
//     // GET /api/generate/bundle-options
//     // ==========================================
//     getBundleOptions: async (): Promise<ApiResponse<BundleOptionsResponse>> => {
//         try {
//             const res = await api.get('/generate/bundle-options');
//             return {
//                 success: true,
//                 data: {
//                     success: res.data.success,
//                     data: res.data.data,
//                     effects: res.data.effects,
//                     info: res.data.info
//                 }
//             };
//         } catch (err: any) {
//             console.error('getBundleOptions error:', err.response?.data);
//             return { success: false, error: err.response?.data?.message || 'Failed to load bundle options' };
//         }
//     },

//     // ==========================================
//     // Get user credits/wallet balance
//     // GET /api/wallet/balance
//     // ==========================================
//     getUserCredits: async (): Promise<ApiResponse<UserCredits>> => {
//         try {
//             const res = await api.get('/wallet/balance');
//             const data = res.data.data || res.data;
//             return {
//                 success: true,
//                 data: {
//                     freeCredits: data.free_credits ?? data.freeCredits ?? 0,
//                     maxFreeCredits: data.max_free_credits ?? 5,
//                     balance: data.balance ?? data.wallet_balance ?? 0
//                 }
//             };
//         } catch (err: any) {
//             console.warn('getUserCredits warning:', err.response?.data?.message || 'Failed to fetch credits');
//             // Return defaults if API fails (user may not be logged in)
//             return {
//                 success: true,
//                 data: {
//                     freeCredits: 0,
//                     maxFreeCredits: 5,
//                     balance: 0
//                 }
//             };
//         }
//     },

//     // ==========================================
//     // Validate generation request before processing
//     // POST /api/generate/validate
//     // ==========================================
//     validateGeneration: async (formData: GenerateFormData): Promise<ApiResponse<{ valid: boolean; message?: string; errors?: string[] }>> => {
//         // Build the CORRECT request payload with 'source' object
//         const requestPayload: GenerateRequest = {
//             generation_type: formData.generationType === 'batch_image' ? 'E-commerce_bundle' : 'single_image',
//             source: {
//                 upload_type: formData.uploadType || 'file',
//                 file_id: formData.fileId,
//                 image_url: formData.imageUrl,
//                 strength: 0.75
//             },
//             model: {
//                 model_id: formData.modelId,
//                 category: formData.businessCategory || formData.modelCategory || 'general',
//                 style: formData.modelStyle || 'professional',
//                 human_model_preset: formData.humanModelPreset,
//                 show_model: formData.showModel
//             }
//         };

//         // Add bundle_options for E-commerce bundle
//         if (formData.generationType === 'batch_image' && formData.bundleOptions) {
//             requestPayload.bundle_options = formData.bundleOptions;
//         }

//         // Add business info if provided
//         if (formData.brandName || formData.instagramUsername || formData.websiteUrl) {
//             requestPayload.business = {
//                 brand_name: formData.brandName,
//                 instagram_username: formData.instagramUsername,
//                 website_url: formData.websiteUrl,
//                 tagline: formData.tagline
//             };
//         }

//         try {
//             console.log('Validate API Request:', JSON.stringify(requestPayload, null, 2));
//             const res = await api.post('/generate/validate', requestPayload);
//             console.log('Validate API Response:', res.data);
//             return { success: true, data: res.data };
//         } catch (err: any) {
//             console.error('Validate API Error:', err.response?.data);
//             return { success: false, error: err.response?.data?.message || 'Validation failed' };
//         }
//     },

//     // ==========================================
//     // Submit image generation request
//     // POST /api/generate
//     // ==========================================
//     generateImages: async (formData: GenerateFormData): Promise<ApiResponse<GenerateResponse>> => {
//         // Build the CORRECT request payload with 'source' object
//         // This is the KEY FIX - backend requires 'source', not 'file_id' at root level
//         const requestPayload: GenerateRequest = {
//             generation_type: formData.generationType === 'batch_image' ? 'E-commerce_bundle' : 'single_image',
//             source: {
//                 upload_type: formData.uploadType || 'file',
//                 file_id: formData.fileId,
//                 image_url: formData.imageUrl,
//                 strength: 0.75
//             },
//             model: {
//                 model_id: formData.modelId,
//                 category: formData.businessCategory || formData.modelCategory || 'general',
//                 style: formData.modelStyle || 'professional',
//                 human_model_preset: formData.humanModelPreset,
//                 show_model: formData.showModel
//             }
//         };

//         // Add bundle_options for E-commerce bundle
//         if (formData.generationType === 'batch_image' && formData.bundleOptions) {
//             requestPayload.bundle_options = formData.bundleOptions;
//         }

//         // Add business info if provided
//         if (formData.brandName || formData.instagramUsername || formData.websiteUrl) {
//             requestPayload.business = {
//                 brand_name: formData.brandName,
//                 instagram_username: formData.instagramUsername,
//                 website_url: formData.websiteUrl,
//                 tagline: formData.tagline
//             };
//         }

//         try {
//             console.log('Generate API Request:', JSON.stringify(requestPayload, null, 2));
//             const res = await api.post('/generate', requestPayload);
//             console.log('Generate API Response:', res.data);
//             return { success: true, data: res.data as GenerateResponse };
//         } catch (err: any) {
//             console.error('Generate API Error:', err.response?.data);
//             return { success: false, error: err.response?.data?.message || err.response?.data?.error || 'Generation failed' };
//         }
//     },

//     // ==========================================
//     // Generate with direct file upload (multipart/form-data)
//     // POST /api/generate
//     // This sends the image file directly in the request
//     // ==========================================
//     generateWithFile: async (file: File, formData: GenerateFormData): Promise<ApiResponse<GenerateResponse>> => {
//         const data = new FormData();

//         // Add the image file
//         data.append('image', file);

//         // Add generation_type
//         data.append('generation_type', formData.generationType === 'batch_image' ? 'E-commerce_bundle' : 'single_image');

//         // Add source as JSON string (backend will parse it)
//         data.append('source', JSON.stringify({
//             upload_type: 'file',
//             strength: 0.75
//         }));

//         // Add model as JSON string
//         data.append('model', JSON.stringify({
//             model_id: formData.modelId,
//             category: formData.businessCategory || formData.modelCategory || 'general',
//             style: formData.modelStyle || 'professional',
//             human_model_preset: formData.humanModelPreset,
//             show_model: formData.showModel
//         }));

//         // Add business info if provided
//         if (formData.brandName || formData.instagramUsername || formData.websiteUrl) {
//             data.append('business', JSON.stringify({
//                 brand_name: formData.brandName,
//                 instagram_username: formData.instagramUsername,
//                 website_url: formData.websiteUrl,
//                 tagline: formData.tagline
//             }));
//         }

//         try {
//             console.log('Generate with File - Sending multipart/form-data');
//             const res = await api.post('/generate', data, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//                 timeout: 120000 // 2 minute timeout for generation
//             });
//             console.log('Generate API Response:', res.data);
//             return { success: true, data: res.data as GenerateResponse };
//         } catch (err: any) {
//             console.error('Generate API Error:', err.response?.data);
//             return { success: false, error: err.response?.data?.message || err.response?.data?.error || 'Generation failed' };
//         }
//     },

//     // ==========================================
//     // Check generation job status
//     // GET /api/generate/:requestId/status
//     // ==========================================
//     checkJobStatus: async (requestId: string): Promise<ApiResponse<GenerateResult>> => {
//         try {
//             const res = await api.get(`/generate/${requestId}/status`);
//             return { success: true, data: res.data.data || res.data };
//         } catch (err: any) {
//             console.error('checkJobStatus error:', err.response?.data);
//             return { success: false, error: err.response?.data?.message || 'Failed to check status' };
//         }
//     },

//     // ==========================================
//     // Upload image file (standalone upload)
//     // Note: Backend currently doesn't have a separate upload endpoint
//     // Use generateWithFile() instead for direct file uploads
//     // ==========================================
//     uploadImage: async (file: File): Promise<ApiResponse<{ file_id jetzt: string; url: string }>> => {
//         // Since backend doesn't have a separate upload endpoint,
//         // we'll store the file locally and use it with generateWithFile()
//         console.log('Note: Storing file reference locally for:', file.name);

//         // Create a temporary file ID based on filename
//         const tempFileId = `temp_${Date.now()}_${file.name}`;

//         // Store in sessionStorage for later use
//         // In production, you might want to use a proper upload API
//         return {
//             success: true,
//             data: {
//                 file_id: tempFileId,
//                 url: URL.createObjectURL(file) // Local blob URL for preview
//             }
//         };
//     },

//     // ==========================================
//     // Upload brand logo
//     // Note: Logo is uploaded with the generate request
//     // ==========================================
//     uploadLogo: async (file: File): Promise<ApiResponse<{ url: string }>> => {
//         console.log('Note: Logo will be uploaded with generate request:', file.name);
//         return {
//             success: true,
//             data: {
//                 url: URL.createObjectURL(file) // Local blob URL for preview
//             }
//         };
//     },

//     // ==========================================
//     // Save generation type selection (client-side only)
//     // ==========================================
//     saveGenerationType: async (type: GenerationType): Promise<ApiResponse<{ sessionId: string }>> => {
//         // Client-side storage - no backend call needed
//         if (typeof window !== 'undefined') {
//             localStorage.setItem('generateType', type);
//         }
//         return { success: true, data: { sessionId: `session_${Date.now()}` } };
//     },

//     // ==========================================
//     // Get current generation session
//     // ==========================================
//     getSession: async (): Promise<ApiResponse<Partial<GenerateFormData>>> => {
//         // Client-side retrieval
//         if (typeof window !== 'undefined') {
//             const generateType = localStorage.getItem('generateType') as GenerationType | null;
//             const fileId = localStorage.getItem('uploadedFileId');

//             return {
//                 success: true,
//                 data: {
//                     generationType: generateType || 'single_image',
//                     fileId: fileId || undefined
//                 }
//             };
//         }
//         return { success: true, data: {} };
//     },``
// };

// export default generateApi;other 


import api from "./axios";

// Generate Types based on backend API
export type GenerationType = 'single_image' | 'batch_image';
export type UploadType = 'file' | 'url';

// Model options for generation request
export interface ModelOptions {
    category: string;
    style?: string;
    human_model_preset?: string;
    show_model?: boolean;
}

// Bundle options for E-commerce bundle generation
export interface BundleOptionsPayload {
    product_views: string;
    background: string;
    format: string;
    platform: string;
    lighting: string;
    effects: {
        natural_shadow: boolean;
        reflection: boolean;
    };
    image_count: number;
}

// Business info for branding
export interface BusinessInfo {
    brand_name?: string;
    instagram_username?: string;
    website_url?: string;
    tagline?: string;
}

// Main request payload matching backend API exactly
export interface GenerateRequest {
    generation_type: 'single_image' | 'batch_image';
    file_id: string;
    model: ModelOptions;
    bundle_options?: BundleOptionsPayload;
    business?: BusinessInfo;
}

// Generated image from API response
export interface GeneratedImageResponse {
    url: string;
    gallery_id: number;
    has_branding: boolean;
    original_url: string;
}

// Credits remaining from API response
export interface RemainingCredits {
    free: number;
    paid: number;
}

// API Response data
export interface GenerateResponseData {
    request_id: string;
    generated_images: GeneratedImageResponse[];
    model_id: string;
    category_used: string;
    show_model: boolean;
    credits_used: number;
    remaining_credits: RemainingCredits;
}

// Full API Response
export interface GenerateResponse {
    success: boolean;
    message: string;
    data: GenerateResponseData;
}

// Form data interface for UI components
export interface GenerateFormData {
    generationType: GenerationType;
    uploadType: UploadType;
    fileId?: string;
    imageUrl?: string;
    imageFile?: File; // Added for direct file upload
    modelId: string;
    modelCategory: string;
    modelStyle: string;
    businessCategory: string;
    brandName: string;
    imageCount: number;
    resolution: string;
    format: string;
    background: string;
    // New fields for updated API
    humanModelPreset?: string;
    showModel?: boolean;
    bundleOptions?: BundleOptionsPayload;
    instagramUsername?: string;
    websiteUrl?: string;
    tagline?: string;
}

export interface GeneratedImage {
    id: string;
    url: string;
    thumbnailUrl?: string;
    prompt?: string;
    style?: string;
    createdAt: string;
}

export interface GenerateResult {
    requestId: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    images?: GeneratedImageResponse[];
    message?: string;
    creditsUsed?: number;
    remainingCredits?: RemainingCredits;
}

// Category type from /generate/categories API
export interface Category {
    id: string;
    name: string;
    description: string;
    show_model: boolean;
    recommended_model: string;
    icon: string | null;
}

// Full response from /generate/categories API
export interface CategoriesResponse {
    success: boolean;
    data: Category[];
    info: {
        show_model_true: string;
        show_model_false: string;
    };
}

// Model Preset type from /generate/model-presets API
export interface ModelPreset {
    id: string;
    name: string;
    description: string;
    prompt_description: string;
    gender: 'female' | 'male' | 'unisex';
    age_range: string;
    style: 'professional' | 'casual' | 'athletic' | 'elegant' | 'diverse';
    thumbnail?: string; // Optional thumbnail image URL
}

// Full response from /generate/model-presets API
export interface ModelPresetsResponse {
    success: boolean;
    data: ModelPreset[];
    info: {
        description: string;
        usage: string;
    };
}

// Filter options for model presets
export interface ModelPresetFilters {
    gender?: 'female' | 'male' | 'unisex' | 'all';
    style?: 'professional' | 'casual' | 'athletic' | 'elegant' | 'diverse' | 'all';
}

// Bundle Options types from /generate/bundle-options API
export interface BundleOption {
    id: string;
    name: string;
    description?: string;
    prompt_addition?: string;
    settings?: Record<string, any>;
    is_default: boolean;
}

export interface BundleEffect {
    id: string;
    name: string;
    description: string;
    default: boolean;
}

export interface BundleOptionsData {
    product_views: BundleOption[];
    background: BundleOption[];
    format: BundleOption[];
    platform: BundleOption[];
    lighting: BundleOption[];
}

export interface BundleEffects {
    natural_shadow: BundleEffect;
    reflection: BundleEffect;
}

export interface BundleOptionsResponse {
    success: boolean;
    data: BundleOptionsData;
    effects: BundleEffects;
    info: {
        description: string;
        usage: string;
    };
}

// Legacy CategoryOption for compatibility
export interface CategoryOption {
    value: string;
    label: string;
}

export interface UserCredits {
    freeCredits: number;
    maxFreeCredits: number;
    balance: number;
}

// Model type for AI models
export interface Model {
    id: string;
    name: string;
    category?: string;
    style?: string;
    description?: string;
    thumbnail?: string;
    isPremium?: boolean;
}

// Style type for generation styles
export interface Style {
    id: string;
    name: string;
    description?: string;
    thumbnail?: string;
    category?: string;
}

// Background type for background options
export interface Background {
    id: string;
    name: string;
    description?: string;
    thumbnail?: string;
    color?: string;
}

// Helper response type
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

// Generate API functions
export const generateApi = {
    // Get available business categories from /api/generate/categories
    getCategories: async (): Promise<ApiResponse<CategoriesResponse>> => {
        try {
            const res = await api.get('/generate/categories');
            // The response contains { success, data, info }
            return {
                success: true,
                data: {
                    success: res.data.success,
                    data: res.data.data,
                    info: res.data.info
                }
            };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Failed to load categories' };
        }
    },

    // Get available AI models
    getModels: async (): Promise<ApiResponse<Model[]>> => {
        try {
            const res = await api.get('/generate/models');
            return { success: true, data: res.data };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Failed to load models' };
        }
    },

    // Get human model presets from /api/generate/model-presets
    getModelPresets: async (filters?: ModelPresetFilters): Promise<ApiResponse<ModelPresetsResponse>> => {
        try {
            // Build query params
            const params = new URLSearchParams();
            if (filters?.gender && filters.gender !== 'all') {
                params.append('gender', filters.gender);
            }
            if (filters?.style && filters.style !== 'all') {
                params.append('style', filters.style);
            }

            const queryString = params.toString();
            const url = queryString ? `/generate/model-presets?${queryString}` : '/generate/model-presets';

            const res = await api.get(url);
            // The response contains { success, data, info }
            return {
                success: true,
                data: {
                    success: res.data.success,
                    data: res.data.data,
                    info: res.data.info
                }
            };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Failed to load model presets' };
        }
    },

    // Get available generation styles
    getStyles: async (): Promise<ApiResponse<Style[]>> => {
        try {
            const res = await api.get('/generate/styles');
            return { success: true, data: res.data };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Failed to load styles' };
        }
    },

    // Get available backgrounds
    getBackgrounds: async (): Promise<ApiResponse<Background[]>> => {
        try {
            const res = await api.get('/generate/backgrounds');
            return { success: true, data: res.data };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Failed to load backgrounds' };
        }
    },

    // Get E-Commerce bundle options from /api/generate/bundle-options
    getBundleOptions: async (): Promise<ApiResponse<BundleOptionsResponse>> => {
        try {
            const res = await api.get('/generate/bundle-options');
            // The response contains { success, data, effects, info }
            return {
                success: true,
                data: {
                    success: res.data.success,
                    data: res.data.data,
                    effects: res.data.effects,
                    info: res.data.info
                }
            };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Failed to load bundle options' };
        }
    },

    // Get user credits info
    getUserCredits: async (): Promise<ApiResponse<UserCredits>> => {
        try {
            const res = await api.get('/wallet');
            const data = res.data?.data || res.data || {};

            // Get maxFreeCredits dynamically from API, fallback to 1
            const maxFreeCredits = data.maxFreeCredits ?? data.max_free_credits ?? 1;

            return {
                success: true,
                data: {
                    freeCredits: data.freeCredits ?? 0,
                    maxFreeCredits: maxFreeCredits,
                    balance: data.balance ?? 0
                }
            };
        } catch (err: any) {
            console.error('generateApi.getUserCredits error:', err);
            return { success: false, data: { freeCredits: 0, maxFreeCredits: 1, balance: 0 }, error: err.response?.data?.message };
        }
    },

    // Validate generation request before processing - POST /generate/validate
    validateGeneration: async (formData: GenerateFormData): Promise<ApiResponse<{ valid: boolean; message?: string; errors?: string[] }>> => {
        // Build request payload for validation (JSON format)
        // If the file is not yet available as an ID, validation might be tricky.
        // We'll trust the caller to have handled file presence.
        const requestPayload: Partial<GenerateRequest> = {
            generation_type: formData.generationType === 'batch_image' ? 'batch_image' : 'single_image',
            file_id: formData.fileId || 'temp_file_id', // Placeholder for validation
            model: {
                category: formData.businessCategory || formData.modelCategory || 'clothes',
                style: formData.modelStyle || 'professional',
                human_model_preset: formData.humanModelPreset,
                show_model: formData.showModel
            }
        };

        if (formData.generationType === 'batch_image' && formData.bundleOptions) {
            requestPayload.bundle_options = formData.bundleOptions;
        }

        try {
            const res = await api.post('/generate/validate', requestPayload);
            return { success: true, data: res.data };
        } catch (err: any) {
            console.error('Validate API Error:', err.response?.data);
            return { success: false, error: err.response?.data?.message || 'Validation failed' };
        }
    },

    // Submit image generation request - POST /api/generate
    generateImages: async (formData: GenerateFormData): Promise<ApiResponse<GenerateResponse>> => {
        const data = new FormData();

        // 1. Image File (Required)
        if (formData.imageFile) {
            data.append('image', formData.imageFile);
        } else {
            // Fallback: This might fail if backend enforces strictly on 'image' field
            console.error('generateImages: No file provided.');
            return { success: false, error: 'Image file is required.' };
        }

        // 2. Generation Type (Required, snake_case per spec)
        const genType = formData.generationType === 'batch_image' ? 'E-commerce_bundle' : 'single_image';
        data.append('generation_type', genType);

        // 3. Source Config (Required JSON String)
        const sourceConfig = {
            upload_type: "file",
            strength: 0.75
        };
        data.append('source', JSON.stringify(sourceConfig));

        // 4. Model Config (JSON String)
        const modelConfig = {
            category: formData.businessCategory || formData.modelCategory || 'clothes',
            style: formData.modelStyle || 'professional',
            human_model_preset: formData.humanModelPreset,
            // Only send human model related fields if relevant
            ...(formData.humanModelPreset ? { show_model: true } : {})
        };
        data.append('model', JSON.stringify(modelConfig));

        // 5. Business Info (Optional JSON String)
        if (formData.brandName) {
            const businessConfig = {
                brand_name: formData.brandName,
                instagram_username: formData.instagramUsername,
                website_url: formData.websiteUrl,
                tagline: formData.tagline
            };
            data.append('business', JSON.stringify(businessConfig));
        }

        // 6. Bundle Options (Optional JSON String)
        if (formData.generationType === 'batch_image' && formData.bundleOptions) {
            data.append('bundle_options', JSON.stringify(formData.bundleOptions));
        }

        try {
            console.log('Sending Generate Request (Multipart)...');
            const res = await api.post('/generate', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 120000 // 2 minutes
            });
            console.log('Generate Response:', res.data);

            return {
                success: true,
                data: res.data as GenerateResponse
            };
        } catch (err: any) {
            console.error('Generate API Error:', err.response?.data);
            return { success: false, error: err.response?.data?.message || 'Generation failed' };
        }
    },

    // Check generation job status
    checkJobStatus: async (jobId: string): Promise<ApiResponse<GenerateResult>> => {
        try {
            const res = await api.get(`/generate/status/${jobId}`);
            return { success: true, data: res.data };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Failed to check status' };
        }
    },

    // Upload image file and get file_id
    uploadImage: async (file: File): Promise<ApiResponse<{ file_id: string; url: string }>> => {
        // Mock response to prevent 404 errors (Backend upload endpoint missing)
        // Returning '12' as a test ID that the backend might accept or for UI flow testing
        console.log('Mocking upload for file:', file.name);
        return Promise.resolve({
            success: true,
            data: {
                file_id: '12',
                url: '' // No remote URL since we didn't upload
            }
        });

        /*
        const data = new FormData();
        data.append('image', file);

        try {
            const response = await api.post('/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return { success: true, data: response.data };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || 'Upload failed'
            };
        }
        */
    },

    // Upload brand logo
    uploadLogo: async (file: File): Promise<ApiResponse<{ url: string }>> => {
        const data = new FormData();
        data.append('logo', file);

        try {
            const response = await api.post('/upload/logo', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return { success: true, data: response.data };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || 'Upload failed'
            };
        }
    },

    // Save generation type selection (step 1)
    saveGenerationType: async (type: GenerationType): Promise<ApiResponse<{ sessionId: string }>> => {
        // Mock response to prevent 404 errors
        return Promise.resolve({ success: true, data: { sessionId: 'mock-session-id' } });
        /*
        try {
            const res = await api.post('/generate/session', { generation_type: type });
            return { success: true, data: res.data };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Failed to save' };
        }
        */
    },

    // Get current generation session
    getSession: async (): Promise<ApiResponse<Partial<GenerateFormData>>> => {
        // Mock response to prevent 404 errors
        return Promise.resolve({ success: true, data: {} });
        /*
        try {
            const res = await api.get('/generate/session');
            return { success: true, data: res.data };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Failed to load session' };
        }
        */
    },
};
