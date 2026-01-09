"use client";

import Link from "@/components/Link";
import { useRouter } from "@/components/useRouter";
import {
    ChevronDown,
    ArrowLeft,
    ArrowRight,
    Check,
    ImageIcon,
    Grid3X3,
    Tag,
    Briefcase,
    CloudUpload,
    Loader2,
    X,
    Plus,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { generateApi, GenerateFormData, CategoryOption, UserCredits } from "@/lib/generate";
import { authApi } from "@/lib/auth";
import { Sidebar, Header } from "@/components/layout";
import AILoader from "@/components/AILoader";

// Model options for E-commerce category
interface ModelOption {
    id: number;
    name: string;
    image: string;
}

const ecommerceModels: ModelOption[] = [
    { id: 1, name: "Studio Pro", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoJOWZv8vNa6RFDGdXaIvLaH1_pdkuYu-Agf7KHBV7dZLL6lcg3dEQbFGXKIlQS8k254SLSMQmiUvXsfxyiyDIShg3_S6o7I3rlYsqBKUCj0VB_EMEh1TtDXrCHQ2qPuJBNBAlw608JzNFmmiHNT23G9GauVMPNytrEt2AeIBiMWrVSotyFe9LHsUqOn6t6aFqPb2D7o50F3IXGSt3vaBD8clHz2Y-RHF2ndjeX1nOgYAyCbzu3eIVNWJemxHa-bj9mZ80mTFKQGcp" },
    { id: 2, name: "Executive", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpG9rDTml0LTJBFVE5t-U0Omqgfb3Tw_BE6o52TdSubE-ysc2NDMpXscqBfiyX2KhpE4RoQ6kBC_Dj2vXNAi_fu_xtmOkXF6EM-fAPGHyaHdbCY9wbfrpGtB--He0zEzAFos5unfLFbQZ2V7kYoSytJIvUrjKL3kKOKdxJHfKr32yJtZUnWg_INO1zRvni1fcNR4nPd66JVMNwnvLhtySvbEFZrz8oqbqn-FausNQF0ldgK9O-tvkJWojn698Nu5EXkW2GRm2dnNA-" },
    { id: 3, name: "Lifestyle", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9ACO1yIxW2Q7hu0tsE3eHwUUyjVdJ3HyZErsD7Ap3NW63vnNqc8gOdANW1nzeQVqympPmOP2inFzBfiXvwhVGE3xpqCC1irVol8sqcNER4J-SZyXKkJDH3nNE8b2i_PkFaHMI-Hx9D0fjiEAm8dy4rzuJsRf7Zng4ZKT-oa7BjWqQF5CofzFaMSlBuoMUlJQOy3x92VoZ4R0oYRHLXUUv1wmYczzDtfp5A4PFZE2L1XvSmtqI8m4aEM2I8r8jHvsFZvvGnOiWHGwr" },
    { id: 4, name: "Creative", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1u8i7swl0DmbulakI3kpCNdVj7fB698D3HvZ_xJESOKhpQaYDaUNljdmhCvBCgWQ5XkV9oemtOMlPedi_cxlTr1Ec01YU4ytL0Pfzlg__0ERYd0znaAyjeTyIen3w4zaMUwW38VaAT5aaGg0pzAVeLmFGhu_gYQOXRKOg-Gf2EWxKsWZDB6nkY7O3aGrjB3jNlfeAlweHLdEIKlDr4ylvItyL_FHfrnySOHlrFVtk1NIu0n817Dc7E5MPGfVnIz0gcWHcG5_zRevL" },
];

export default function DetailsPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form state - matching backend API
    const [generationType, setGenerationType] = useState<"single_image" | "batch_image">("single_image");
    const [businessCategory, setBusinessCategory] = useState("");
    const [brandName, setBrandName] = useState("");
    const [brandLogo, setBrandLogo] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [instagramUsername, setInstagramUsername] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");

    // Model settings
    const [modelId, setModelId] = useState("studio_pro");
    const [modelCategory, setModelCategory] = useState("portrait");
    const [modelStyle, setModelStyle] = useState("professional");

    // Output settings
    const [imageCount, setImageCount] = useState(4);
    const [resolution, setResolution] = useState("1024x1024");
    const [format, setFormat] = useState("png");
    const [background, setBackground] = useState("studio");

    // Uploaded file ID from upload step
    const [uploadedFileId, setUploadedFileId] = useState<string | null>(null);

    // API state
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [userCredits, setUserCredits] = useState<UserCredits | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Uploaded image for loader background
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

    // User profile state
    const [userName, setUserName] = useState("Jane");
    const [userInitial, setUserInitial] = useState("J");

    // Selected model for E-commerce category
    const [selectedModel, setSelectedModel] = useState<number | null>(1);

    // Load generation type and uploaded image from previous step
    useEffect(() => {
        const savedType = localStorage.getItem("generateType");
        if (savedType === "single_image" || savedType === "batch_image") {
            setGenerationType(savedType);
        }

        // Load uploaded image for loader background
        const savedImagePreview = localStorage.getItem("uploadedImage");
        if (savedImagePreview) {
            setUploadedImageUrl(savedImagePreview);
        }

        // Load uploaded file ID from upload step
        const savedFileId = localStorage.getItem("uploadedFileId");
        if (savedFileId) {
            setUploadedFileId(savedFileId);
        }
    }, []);

    // Fetch categories and user credits on mount
    useEffect(() => {
        // Load user from localStorage
        const storedUser = authApi.getCurrentUser();
        if (storedUser && storedUser.fullName) {
            const firstName = storedUser.fullName.split(' ')[0];
            setUserName(firstName);
            setUserInitial(firstName.charAt(0).toUpperCase());
        }

        fetchCategories();
        fetchUserCredits();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await generateApi.getCategories();
            if (response.success && response.data) {
                setCategories(response.data);
            }
        } catch (error) {
            console.warn('Failed to fetch categories:', error);
        }
    };

    const fetchUserCredits = async () => {
        try {
            const response = await generateApi.getUserCredits();
            if (response.success && response.data) {
                setUserCredits(response.data);
            }
        } catch (error) {
            console.warn('Failed to fetch user credits:', error);
        }
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBrandLogo(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setBrandLogo(null);
        setLogoPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            // Get current user for user_id
            const currentUser = authApi.getCurrentUser();
            const userId = currentUser?.id || 'unknown';

            // Build form data matching backend API format
            const formData: GenerateFormData = {
                generationType: generationType,
                uploadType: 'file',
                fileId: uploadedFileId || undefined,
                modelId: modelId,
                modelCategory: modelCategory,
                modelStyle: modelStyle,
                businessCategory: businessCategory || 'business',
                brandName: brandName || 'My Brand',
                imageCount: imageCount,
                resolution: resolution,
                format: format,
                background: background,
            };

            // Call API with user info
            const response = await generateApi.generateImages(formData, userId, 'free');

            if (response.success && response.data) {
                // Store job ID and redirect to gallery or processing page
                localStorage.setItem('lastJobId', response.data.jobId);
                router.push('/gallery');
            } else {
                setError(response.error || 'Failed to generate images');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Fallback categories if API fails
    const displayCategories = categories.length > 0 ? categories : [
        { value: "ecommerce", label: "E-commerce & Retail" },
        { value: "realestate", label: "Real Estate" },
        { value: "food", label: "Food & Beverage" },
        { value: "tech", label: "Technology & SaaS" },
    ];

    // User credits display values (fallback)
    const freeCredits = userCredits?.freeCredits ?? 1;
    const balance = userCredits?.balance ?? 12.00;



    return (
        <>
            {/* AI Loader - Shows when generating */}
            <AILoader
                isLoading={isSubmitting}
                text="Generating your images..."
            />

            <div className="h-screen flex overflow-hidden bg-[#f8fafc] dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased transition-colors duration-200">
                {/* Reusable Sidebar */}
                <Sidebar activeNav="generate" />

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                    {/* Reusable Header with dynamic breadcrumbs */}
                    <Header
                        breadcrumbs={[
                            { label: "Home", href: "/?view=landing" },
                            { label: "Generate", href: "/generate" },
                            { label: "Details" }
                        ]}
                        freeCredits={freeCredits}
                        balance={balance}
                    />

                    {/* Main Content Area */}
                    <main className="flex-1 flex flex-col overflow-hidden bg-[#f8fafc] dark:bg-gray-900">
                        {/* Content - No Scroll */}
                        <div className="flex-1 p-4 sm:p-5 overflow-hidden flex flex-col">
                            <div className="flex flex-col gap-2 h-full">
                                {/* Page Header */}
                                <div className="mb-2 shrink-0">
                                    <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-1 tracking-tight">Generate Images</h1>
                                    <p className="text-slate-500 dark:text-gray-400 text-sm md:text-base font-light">Upload an image and get professional variations in minutes.</p>
                                </div>

                                {/* Progress Steps - Same style as Upload page */}
                                <div className="mb-2 shrink-0">
                                    <div className="relative max-w-3xl mx-auto px-4 sm:px-0">
                                        {/* Background line */}
                                        <div className="absolute top-5 left-[16.67%] right-[16.67%] h-[2px] bg-slate-200 dark:bg-gray-700"></div>
                                        {/* Active line (all segments) */}
                                        <div className="absolute top-5 left-[16.67%] right-[16.67%] h-[2px] bg-teal-500"></div>

                                        <div className="grid grid-cols-3">
                                            {/* STEP 1 - Completed */}
                                            <div className="flex flex-col items-center cursor-pointer group">
                                                <div className="z-10 size-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold transition-transform group-hover:scale-110">
                                                    <Check className="w-5 h-5" />
                                                </div>
                                                <span className="mt-2 text-xs font-bold text-teal-600 tracking-wide uppercase">
                                                    TYPE
                                                </span>
                                            </div>

                                            {/* STEP 2 - Completed */}
                                            <div className="flex flex-col items-center cursor-pointer group">
                                                <div className="z-10 size-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold transition-transform group-hover:scale-110">
                                                    <Check className="w-5 h-5" />
                                                </div>
                                                <span className="mt-2 text-xs font-bold text-teal-600 tracking-wide uppercase">
                                                    UPLOAD
                                                </span>
                                            </div>

                                            {/* STEP 3 - Current Active */}
                                            <div className="flex flex-col items-center cursor-pointer group">
                                                <div className="z-10 size-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold ring-4 ring-teal-500/20 transition-transform group-hover:scale-110">
                                                    3
                                                </div>
                                                <span className="mt-2 text-xs font-bold text-teal-600 tracking-wide uppercase">
                                                    DETAILS
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Content - Compact Layout */}
                                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex-1 min-h-0 flex flex-col overflow-hidden">
                                    <div className="p-4 sm:p-5 flex flex-col gap-4 flex-1 overflow-hidden">
                                        {/* Row 1: Image Type, Category, Brand Info - Side by Side */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
                                            {/* Image Type */}
                                            <div className="flex flex-col gap-1">
                                                <h2 className="text-gray-900 dark:text-white text-xs font-bold flex items-center gap-1.5">
                                                    <ImageIcon className="w-3.5 h-3.5 text-gray-400" />
                                                    Image Type
                                                </h2>
                                                <div
                                                    onClick={() => setGenerationType("single_image")}
                                                    className={`group flex items-center gap-2 p-2.5 rounded-lg cursor-pointer transition-all ${generationType === "single_image"
                                                        ? "border-2 border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                                                        : "border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-teal-400"
                                                        }`}
                                                >
                                                    <div className={`p-1.5 rounded-lg flex-shrink-0 ${generationType === "single_image"
                                                        ? "bg-white dark:bg-gray-800 text-teal-500"
                                                        : "bg-gray-100 dark:bg-gray-600 text-gray-500"
                                                        }`}>
                                                        <ImageIcon className="w-3.5 h-3.5" />
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-900 dark:text-white font-semibold text-xs">Single Image</span>
                                                        <p className="text-gray-500 text-[9px]">Generate from a single source</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Category Selection */}
                                            <div className="flex flex-col gap-1">
                                                <h2 className="text-gray-900 dark:text-white text-xs font-bold flex items-center gap-1.5">
                                                    <Tag className="w-3.5 h-3.5 text-gray-400" />
                                                    Category
                                                </h2>
                                                <div className="relative">
                                                    <select
                                                        value={businessCategory}
                                                        onChange={(e) => setBusinessCategory(e.target.value)}
                                                        className="w-full h-[52px] pl-3 pr-8 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 appearance-none text-sm font-medium cursor-pointer"
                                                    >
                                                        <option value="">Select category...</option>
                                                        {displayCategories.map((cat) => (
                                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                                </div>
                                            </div>

                                            {/* Brand Name */}
                                            <div className="flex flex-col gap-1">
                                                <h2 className="text-gray-900 dark:text-white text-xs font-bold flex items-center gap-1.5">
                                                    <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                                                    Brand Name
                                                </h2>
                                                <input
                                                    value={brandName}
                                                    onChange={(e) => setBrandName(e.target.value)}
                                                    className="w-full h-[52px] px-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm"
                                                    placeholder="e.g. Acme Corp"
                                                    type="text"
                                                />
                                            </div>
                                        </div>

                                        {/* Row 2: E-commerce Layout - Branding Info + Models Side by Side */}
                                        {businessCategory === "ecommerce" && (
                                            <div className="flex-1 min-h-0 flex flex-col gap-2">
                                                {/* Branding Info Row - Compact */}
                                                <div className="shrink-0 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 border border-gray-200 dark:border-gray-600">
                                                    <div className="flex items-center gap-2 mb-1.5">
                                                        <Briefcase className="w-3 h-3 text-gray-400" />
                                                        <h3 className="text-[11px] font-bold text-gray-900 dark:text-white">Additional Branding Info</h3>
                                                        <span className="text-[8px] font-normal text-gray-400 bg-white dark:bg-gray-600 px-1 py-0.5 rounded-full">Optional</span>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {/* Logo Upload */}
                                                        <div className="flex flex-col gap-0.5">
                                                            <label className="text-gray-600 dark:text-gray-300 text-[9px] font-medium">Brand Logo</label>
                                                            <input
                                                                ref={fileInputRef}
                                                                type="file"
                                                                accept=".svg,.png,.jpg,.jpeg"
                                                                onChange={handleLogoUpload}
                                                                className="hidden"
                                                            />
                                                            {logoPreview ? (
                                                                <div className="h-9 bg-white dark:bg-gray-800 border-2 border-teal-500 rounded-lg flex items-center justify-center px-2 relative">
                                                                    <img src={logoPreview} alt="Logo" className="max-h-6 max-w-full object-contain" />
                                                                    <button
                                                                        onClick={removeLogo}
                                                                        className="absolute top-0.5 right-0.5 size-3.5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                                                    >
                                                                        <X className="w-2 h-2" />
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    onClick={() => fileInputRef.current?.click()}
                                                                    className="h-9 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer hover:border-teal-400 transition-colors"
                                                                >
                                                                    <CloudUpload className="w-3.5 h-3.5 text-gray-400" />
                                                                    <span className="text-[10px] text-gray-400">Upload</span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Instagram */}
                                                        <div className="flex flex-col gap-0.5">
                                                            <label className="text-gray-600 dark:text-gray-300 text-[9px] font-medium">Instagram</label>
                                                            <div className="relative">
                                                                <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-400 pointer-events-none text-xs">@</span>
                                                                <input
                                                                    value={instagramUsername}
                                                                    onChange={(e) => setInstagramUsername(e.target.value)}
                                                                    className="w-full h-9 pl-5 pr-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-teal-500 text-xs"
                                                                    placeholder="username"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Website */}
                                                        <div className="flex flex-col gap-0.5">
                                                            <label className="text-gray-600 dark:text-gray-300 text-[9px] font-medium">Website URL</label>
                                                            <input
                                                                value={websiteUrl}
                                                                onChange={(e) => setWebsiteUrl(e.target.value)}
                                                                className="w-full h-9 px-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-teal-500 text-xs"
                                                                placeholder="https://example.com"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Models Grid - Below Branding Info */}
                                                <div className="flex-1 min-h-0 flex flex-col">
                                                    <div className="flex items-center gap-2 mb-1.5 shrink-0">
                                                        <Grid3X3 className="w-3.5 h-3.5 text-gray-400" />
                                                        <h3 className="text-xs font-bold text-gray-900 dark:text-white">Select Model</h3>
                                                        <span className="text-[9px] font-normal text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-full">Optional</span>
                                                    </div>

                                                    <div className="flex-1 min-h-0 pb-4">
                                                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 2xl:grid-cols-8 gap-3">
                                                            {ecommerceModels.map((model) => (
                                                                <div
                                                                    key={model.id}
                                                                    className="flex flex-col cursor-pointer group"
                                                                    onClick={() => setSelectedModel(model.id)}
                                                                >
                                                                    <div className={`relative rounded-lg bg-gray-100 dark:bg-gray-700 h-[125px] overflow-hidden transition-all ${selectedModel === model.id
                                                                        ? "ring-2 ring-teal-500 ring-offset-1 dark:ring-offset-gray-800"
                                                                        : "border border-gray-200 dark:border-gray-600 hover:ring-2 hover:ring-teal-400 hover:ring-offset-1"
                                                                        }`}>
                                                                        <img
                                                                            src={model.image}
                                                                            alt={model.name}
                                                                            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                                                                        />
                                                                        {selectedModel === model.id && (
                                                                            <div className="absolute bottom-0.5 right-0.5 bg-teal-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center shadow-lg">
                                                                                <Check className="w-2 h-2" />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <p className={`text-[9px] font-medium text-center mt-1 pb-0.5 ${selectedModel === model.id
                                                                        ? "text-teal-500"
                                                                        : "text-gray-500 dark:text-gray-400"
                                                                        }`}>
                                                                        {model.name}
                                                                    </p>
                                                                </div>
                                                            ))}

                                                            {/* Custom Add Button */}
                                                            <div className="flex flex-col cursor-pointer group">
                                                                <div className="rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-600 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-300 transition-colors h-[125px]">
                                                                    <Plus className="w-4 h-4 text-gray-300 dark:text-gray-500 group-hover:text-gray-400" />
                                                                </div>
                                                                <p className="text-[9px] font-medium text-center mt-1 pb-0.5 text-gray-400">Custom</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Row 2 Alternative: Additional Info - Shows when NOT E-commerce */}
                                        {businessCategory !== "ecommerce" && (
                                            <div className="flex-1 min-h-0 flex flex-col mt-4">
                                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600 flex-1 flex flex-col">
                                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                                        <Briefcase className="w-4 h-4 text-gray-400" />
                                                        Additional Branding Info
                                                        <span className="text-[10px] font-normal text-gray-400 bg-white dark:bg-gray-600 px-2 py-0.5 rounded-full">Optional</span>
                                                    </h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                        {/* Logo Upload */}
                                                        <div className="flex flex-col gap-1">
                                                            <label className="text-gray-600 dark:text-gray-300 text-[10px] font-medium">Brand Logo</label>
                                                            <input
                                                                ref={fileInputRef}
                                                                type="file"
                                                                accept=".svg,.png,.jpg,.jpeg"
                                                                onChange={handleLogoUpload}
                                                                className="hidden"
                                                            />
                                                            {logoPreview ? (
                                                                <div className="h-12 bg-white dark:bg-gray-800 border-2 border-teal-500 rounded-lg flex items-center justify-center px-3 relative">
                                                                    <img src={logoPreview} alt="Logo" className="max-h-8 max-w-full object-contain" />
                                                                    <button
                                                                        onClick={removeLogo}
                                                                        className="absolute top-1 right-1 size-4 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                                                    >
                                                                        <X className="w-2.5 h-2.5" />
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    onClick={() => fileInputRef.current?.click()}
                                                                    className="h-12 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:border-teal-400 transition-colors"
                                                                >
                                                                    <CloudUpload className="w-4 h-4 text-gray-400" />
                                                                    <span className="text-xs text-gray-400">Upload Logo</span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Instagram */}
                                                        <div className="flex flex-col gap-1">
                                                            <label className="text-gray-600 dark:text-gray-300 text-[10px] font-medium">Instagram</label>
                                                            <div className="relative">
                                                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none text-sm">@</span>
                                                                <input
                                                                    value={instagramUsername}
                                                                    onChange={(e) => setInstagramUsername(e.target.value)}
                                                                    className="w-full h-12 pl-7 pr-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-teal-500 text-sm"
                                                                    placeholder="username"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Website */}
                                                        <div className="flex flex-col gap-1">
                                                            <label className="text-gray-600 dark:text-gray-300 text-[10px] font-medium">Website URL</label>
                                                            <input
                                                                value={websiteUrl}
                                                                onChange={(e) => setWebsiteUrl(e.target.value)}
                                                                className="w-full h-12 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-teal-500 text-sm"
                                                                placeholder="https://example.com"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons - Fixed Footer */}
                        <div className="shrink-0 px-5 py-2 bg-[#f8fafc] dark:bg-gray-900">
                            {error && (
                                <div className="mb-2 p-1.5 bg-red-50 border border-red-200 rounded-lg text-red-600 text-[10px] text-center">
                                    {error}
                                </div>
                            )}
                            <div className="flex items-center justify-between">
                                <Link
                                    href="/generate/upload"
                                    className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors flex items-center gap-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back
                                </Link>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="group relative flex items-center gap-2.5 bg-gradient-to-b from-slate-800 to-slate-900 text-white px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/50 overflow-hidden"
                                >
                                    {/* Glossy top highlight line */}
                                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

                                    {/* Glass shine overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none"></div>

                                    {/* Hover shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 pointer-events-none"></div>

                                    <span className="relative z-10 flex items-center gap-2">
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                Generate
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                            </>
                                        )}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

