"use client";

import Link from "@/components/Link";
import { useRouter } from "@/components/useRouter";
import {
    ArrowLeft,
    ArrowRight,
    ChevronDown,
    Monitor,
    Lightbulb,
    Images,
    Layers,
    Sparkles,
    Info,
    Check,
    Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { authApi } from "@/lib/auth";
import { generateApi, UserCredits } from "@/lib/generate";
import { Sidebar, Header } from "@/components/layout";

export default function EcommerceOptionsPage() {
    const router = useRouter();
    const [userCredits, setUserCredits] = useState<UserCredits | null>(null);

    // Form state
    const [productViews, setProductViews] = useState("standard_4");
    const [backgroundType, setBackgroundType] = useState("white");
    const [transparentBg, setTransparentBg] = useState("transparent_png");
    const [naturalShadow, setNaturalShadow] = useState(true);
    const [reflection, setReflection] = useState(false);
    const [platformSize, setPlatformSize] = useState("marketplace_standard");
    const [lightingStyle, setLightingStyle] = useState("soft_studio");
    const [numberOfImages, setNumberOfImages] = useState("1");

    // Dropdown states
    const [showViewsDropdown, setShowViewsDropdown] = useState(false);
    const [showBgDropdown, setShowBgDropdown] = useState(false);
    const [showTransparentDropdown, setShowTransparentDropdown] = useState(false);
    const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
    const [showImagesDropdown, setShowImagesDropdown] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (!authApi.isAuthenticated()) {
            router.push('/login');
            return;
        }
        fetchUserCredits();
    }, [router]);

    const fetchUserCredits = async () => {
        try {
            const response = await generateApi.getUserCredits();
            if (response.success && response.data) {
                setUserCredits(response.data);
            }
        } catch (error) {
            // Silently ignore
        }
    };

    // Prefetch next route for smoother transition
    useEffect(() => {
        router.prefetch('/generate/details');
    }, [router]);

    const handleNextStep = () => {
        setIsExiting(true);

        const ecommerceOptions = {
            productViews,
            backgroundType,
            transparentBg,
            naturalShadow,
            reflection,
            platformSize,
            lightingStyle,
            numberOfImages,
        };
        localStorage.setItem('ecommerceOptions', JSON.stringify(ecommerceOptions));

        setTimeout(() => {
            router.push('/generate/details');
        }, 400);
    };

    const freeCredits = userCredits?.freeCredits ?? 1;
    const balance = userCredits?.balance ?? 12.00;

    const viewsOptions = [
        { value: "standard_4", label: "Standard (4 views)", desc: "Front, back, side & detail shots" },
        { value: "basic_2", label: "Basic (2 views)", desc: "Front & back shots" },
        { value: "premium_6", label: "Premium (6 views)", desc: "All angles + detail shots" },
        { value: "complete_8", label: "Complete (8 views)", desc: "Full 360° coverage" },
    ];

    const platformOptions = [
        { value: "marketplace_standard", label: "Marketplace Standard", desc: "Amazon / Shopify" },
        { value: "social_media", label: "Social Media", desc: "Instagram / Facebook" },
        { value: "custom", label: "Custom Size", desc: "Define your own dimensions" },
    ];

    const lightingOptions = [
        { value: "soft_studio", label: "Soft studio (Recommended)" },
        { value: "high_contrast", label: "High contrast" },
    ];

    return (
        <div className="h-screen flex overflow-hidden bg-[#f8fafc] dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased transition-colors duration-200">
            {/* Sidebar */}
            <Sidebar activeNav="generate" />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
                {/* Header */}
                <Header
                    breadcrumbs={[
                        { label: "Home", href: "/dashboard" },
                        { label: "Generate Images", href: "/generate" },
                        { label: "E-Commerce Options" }
                    ]}
                    freeCredits={freeCredits}
                    balance={balance}
                />

                {/* Main Content */}
                <main className="flex-1 flex flex-col overflow-hidden bg-[#f8fafc] dark:bg-gray-900">
                    {/* Scrollable content area */}
                    <div className="flex-1 px-4 sm:px-5 pt-2 sm:pt-3 overflow-hidden flex flex-col">
                        <div className="flex flex-col gap-2 h-full">

                            {/* Page Header */}
                            <div className="mb-2 shrink-0">
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-1.5 tracking-tight">
                                    Generate <span className="text-teal-500">Images</span>
                                </h1>
                                <p className="text-slate-500 dark:text-gray-400 text-sm md:text-base font-light">Upload an image and get professional variations in minutes.</p>
                            </div>

                            {/* Progress Steps */}
                            <div className="mb-2 shrink-0">
                                <div className="relative max-w-3xl mx-auto px-4 sm:px-0">
                                    <div className="absolute top-5 left-[16.67%] right-[16.67%] h-[2px] bg-slate-200 dark:bg-gray-700"></div>
                                    <div className="absolute top-5 left-[16.67%] w-[33.33%] h-[2px] bg-teal-500"></div>
                                    <div className="grid grid-cols-3">
                                        {/* STEP 1 - Completed */}
                                        <div className="flex flex-col items-center cursor-pointer group">
                                            <div className="z-10 size-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold transition-transform group-hover:scale-110">
                                                <Check className="w-5 h-5" />
                                            </div>
                                            <span className="mt-2 text-xs font-bold text-teal-600 tracking-wide uppercase">TYPE</span>
                                        </div>
                                        {/* STEP 2 - Current */}
                                        <div className="flex flex-col items-center cursor-pointer group">
                                            <div className="z-10 size-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold ring-4 ring-teal-500/20 transition-transform group-hover:scale-110">
                                                2
                                            </div>
                                            <span className="mt-2 text-xs font-bold text-teal-600 tracking-wide uppercase">UPLOAD</span>
                                        </div>
                                        {/* STEP 3 */}
                                        <div className="flex flex-col items-center cursor-pointer group">
                                            <div className="z-10 size-10 rounded-full border-2 border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-500 dark:text-gray-400 flex items-center justify-center font-bold transition-transform group-hover:scale-110">
                                                3
                                            </div>
                                            <span className="mt-2 text-xs font-semibold text-slate-400 dark:text-gray-500 tracking-wide uppercase">DETAILS</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content Card - scrollable */}
                            <div className="flex-1 min-h-0 max-w-[800px] mx-auto w-full bg-white dark:bg-gray-800 rounded-2xl border border-slate-200/60 dark:border-gray-700 overflow-y-auto text-slate-900 dark:text-gray-100 shadow-sm">
                                <div className="p-5 md:p-6 pb-48">
                                    <h2 className="text-[17px] font-bold text-slate-900 dark:text-white mb-5">E-Commerce Bundle Options</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">

                                        {/* ── LEFT COLUMN ── */}
                                        <div className="flex flex-col gap-4">

                                            {/* Product Views */}
                                            <div>
                                                <label className="block text-[12px] font-bold text-slate-700 dark:text-gray-300 mb-1.5">Product Views</label>
                                                <div className="relative">
                                                    <button
                                                        onClick={() => setShowViewsDropdown(!showViewsDropdown)}
                                                        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50 dark:bg-gray-700/50 border border-slate-200 dark:border-gray-600 rounded-md hover:border-teal-400 dark:hover:border-teal-500 transition-colors shadow-sm"
                                                    >
                                                        <span className="text-[14px] text-slate-900 dark:text-white font-medium">
                                                            {viewsOptions.find(v => v.value === productViews)?.label || 'Standard (4 views)'}
                                                        </span>
                                                        <ChevronDown className={`w-4 h-4 text-slate-500 dark:text-gray-400 transition-transform duration-200 ${showViewsDropdown ? 'rotate-180' : ''}`} />
                                                    </button>
                                                    {showViewsDropdown && (
                                                        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-md shadow-xl z-20 overflow-hidden">
                                                            {viewsOptions.map((option) => (
                                                                <button
                                                                    key={option.value}
                                                                    onClick={() => { setProductViews(option.value); setShowViewsDropdown(false); }}
                                                                    className="w-full px-4 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-gray-600 transition-colors"
                                                                >
                                                                    <p className="text-[14px] text-slate-900 dark:text-white font-medium">{option.label}</p>
                                                                    <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-0.5">{option.desc}</p>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="mt-1.5 text-[11px] text-slate-500 dark:text-gray-400 font-medium">Front, back, side & detail shots</p>
                                            </div>

                                            {/* Background */}
                                            <div>
                                                <label className="block text-[12px] font-bold text-slate-700 dark:text-gray-300 mb-1.5">Background</label>
                                                <div className="relative">
                                                    <button
                                                        onClick={() => setShowBgDropdown(!showBgDropdown)}
                                                        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50 dark:bg-gray-700/50 border border-slate-200 dark:border-gray-600 rounded-md hover:border-teal-400 dark:hover:border-teal-500 transition-colors shadow-sm"
                                                    >
                                                        <span className="text-[14px] text-slate-900 dark:text-white font-medium capitalize">{backgroundType}</span>
                                                        <ChevronDown className={`w-4 h-4 text-slate-500 dark:text-gray-400 transition-transform duration-200 ${showBgDropdown ? 'rotate-180' : ''}`} />
                                                    </button>
                                                    {showBgDropdown && (
                                                        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-md shadow-xl z-20 overflow-hidden">
                                                            {['white', 'gray', 'black'].map((color) => (
                                                                <button
                                                                    key={color}
                                                                    onClick={() => { setBackgroundType(color); setShowBgDropdown(false); }}
                                                                    className="w-full px-4 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-gray-600 transition-colors text-[14px] text-slate-900 dark:text-white font-medium capitalize"
                                                                >
                                                                    {color}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Download Format */}
                                            <div>
                                                <label className="block text-[12px] font-bold text-slate-700 dark:text-gray-300 mb-1.5">Download Format</label>
                                                <div className="relative">
                                                    <button
                                                        onClick={() => setShowTransparentDropdown(!showTransparentDropdown)}
                                                        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50 dark:bg-gray-700/50 border border-slate-200 dark:border-gray-600 rounded-md hover:border-teal-400 dark:hover:border-teal-500 transition-colors shadow-sm"
                                                    >
                                                        <span className="text-[14px] text-slate-900 dark:text-white font-medium">
                                                            {transparentBg === 'transparent_png' ? 'Transparent (PNG)' : 'JPG'}
                                                        </span>
                                                        <ChevronDown className={`w-4 h-4 text-slate-500 dark:text-gray-400 transition-transform duration-200 ${showTransparentDropdown ? 'rotate-180' : ''}`} />
                                                    </button>
                                                    {showTransparentDropdown && (
                                                        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-md shadow-xl z-20 overflow-hidden">
                                                            {[
                                                                { value: 'transparent_png', label: 'Transparent (PNG)' },
                                                                { value: 'jpg', label: 'JPG' }
                                                            ].map((option) => (
                                                                <button
                                                                    key={option.value}
                                                                    onClick={() => { setTransparentBg(option.value); setShowTransparentDropdown(false); }}
                                                                    className="w-full px-4 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-gray-600 transition-colors text-[14px] text-slate-900 dark:text-white font-medium"
                                                                >
                                                                    {option.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Effects */}
                                            <div>
                                                <label className="flex items-center gap-1.5 text-[12px] font-bold text-slate-700 dark:text-gray-300 mb-2">
                                                    <Sparkles className="w-3.5 h-3.5" />
                                                    Effects
                                                </label>
                                                <div className="space-y-2">
                                                    {/* Natural Shadow Toggle */}
                                                    <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 dark:bg-gray-700/30 rounded-md border border-slate-200 dark:border-gray-700/50 shadow-sm">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center transition-colors ${naturalShadow ? 'bg-teal-500' : 'bg-slate-200 dark:bg-gray-600'}`}>
                                                                {naturalShadow && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                                            </div>
                                                            <span className={`text-[13px] font-medium transition-colors ${naturalShadow ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-gray-400'}`}>Natural shadow</span>
                                                        </div>
                                                        <button
                                                            onClick={() => setNaturalShadow(!naturalShadow)}
                                                            className={`relative w-[38px] h-5 rounded-full transition-colors ${naturalShadow ? 'bg-teal-500' : 'bg-slate-300 dark:bg-gray-600'}`}
                                                        >
                                                            <div className={`absolute top-[2px] w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${naturalShadow ? 'left-[20px]' : 'left-[2px]'}`}></div>
                                                        </button>
                                                    </div>

                                                    {/* Reflection Toggle */}
                                                    <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 dark:bg-gray-700/30 rounded-md border border-slate-200 dark:border-gray-700/50 shadow-sm">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center transition-colors ${reflection ? 'bg-teal-500' : 'bg-slate-200 dark:bg-gray-600'}`}>
                                                                {reflection && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                                            </div>
                                                            <span className={`text-[13px] font-medium transition-colors ${reflection ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-gray-400'}`}>Reflection</span>
                                                        </div>
                                                        <button
                                                            onClick={() => setReflection(!reflection)}
                                                            className={`relative w-[38px] h-5 rounded-full transition-colors ${reflection ? 'bg-teal-500' : 'bg-slate-300 dark:bg-gray-600'}`}
                                                        >
                                                            <div className={`absolute top-[2px] w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${reflection ? 'left-[20px]' : 'left-[2px]'}`}></div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>{/* end LEFT COLUMN */}

                                        {/* ── RIGHT COLUMN ── */}
                                        <div className="flex flex-col gap-4">

                                            {/* Platform / Image Size */}
                                            <div>
                                                <label className="flex items-center gap-1.5 text-[12px] font-bold text-slate-700 dark:text-gray-300 mb-1.5">
                                                    <Monitor className="w-3.5 h-3.5" />
                                                    Platform / Image Size
                                                </label>
                                                <div className="relative">
                                                    <button
                                                        onClick={() => setShowPlatformDropdown(!showPlatformDropdown)}
                                                        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50 dark:bg-gray-700/50 border border-slate-200 dark:border-gray-600 rounded-md hover:border-teal-400 dark:hover:border-teal-500 transition-colors text-left shadow-sm"
                                                    >
                                                        <div>
                                                            <span className="block text-[14px] text-slate-900 dark:text-white leading-snug font-medium">
                                                                {platformOptions.find(p => p.value === platformSize)?.label || 'Marketplace Standard'}
                                                            </span>
                                                            <span className="block text-[11px] text-slate-500 dark:text-gray-400">
                                                                {platformOptions.find(p => p.value === platformSize)?.desc || 'Amazon / Shopify'}
                                                            </span>
                                                        </div>
                                                        <ChevronDown className={`w-4 h-4 text-slate-500 dark:text-gray-400 transition-transform duration-200 ${showPlatformDropdown ? 'rotate-180' : ''}`} />
                                                    </button>
                                                    {showPlatformDropdown && (
                                                        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-md shadow-xl z-20 overflow-hidden">
                                                            {platformOptions.map((option) => (
                                                                <button
                                                                    key={option.value}
                                                                    onClick={() => { setPlatformSize(option.value); setShowPlatformDropdown(false); }}
                                                                    className="w-full px-4 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-gray-600 transition-colors"
                                                                >
                                                                    <p className="text-[14px] text-slate-900 dark:text-white font-medium">{option.label}</p>
                                                                    <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-0.5">{option.desc}</p>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="mt-1.5 text-[11px] text-slate-500 dark:text-gray-400 font-medium">Optimized for Amazon & Shopify</p>
                                            </div>

                                            {/* Lighting Style */}
                                            <div>
                                                <label className="flex items-center gap-1.5 text-[12px] font-bold text-slate-700 dark:text-gray-300 mb-1.5">
                                                    <Lightbulb className="w-3.5 h-3.5" />
                                                    Lighting Style
                                                </label>
                                                <div className="space-y-2">
                                                    {lightingOptions.map((option) => (
                                                        <button
                                                            key={option.value}
                                                            onClick={() => setLightingStyle(option.value)}
                                                            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-md border text-left transition-all duration-200 shadow-sm ${lightingStyle === option.value
                                                                ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-500 ring-1 ring-teal-500/20'
                                                                : 'bg-slate-50 dark:bg-gray-700/50 border-slate-200 dark:border-gray-600 hover:border-slate-300 dark:hover:border-gray-500'
                                                                }`}
                                                        >
                                                            <div className={`shrink-0 w-[22px] h-[22px] rounded-full flex items-center justify-center transition-colors ${lightingStyle === option.value
                                                                ? 'bg-teal-500'
                                                                : 'bg-white dark:bg-gray-600 border border-slate-200 dark:border-gray-500'
                                                                }`}>
                                                                {lightingStyle === option.value && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                                            </div>
                                                            <span className={`block text-[13px] font-medium transition-colors ${lightingStyle === option.value
                                                                ? 'text-teal-900 dark:text-teal-400'
                                                                : 'text-slate-600 dark:text-gray-300'
                                                                }`}>
                                                                {option.label}
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                        </div>{/* end RIGHT COLUMN */}

                                    </div>{/* end grid */}
                                </div>{/* end padding div */}
                            </div>{/* end card */}

                        </div>{/* end flex-col h-full */}
                    </div>{/* end scrollable content */}

                    {/* Transition Loader Overlay */}
                    {isExiting && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-100/80 dark:bg-gray-950/80 backdrop-blur-sm"
                        >
                            <Loader2 className="w-12 h-12 text-teal-500/80 animate-spin" />
                        </motion.div>
                    )}

                    {/* Navigation Buttons - Fixed Footer */}
                    <div className="shrink-0 px-4 py-3 bg-[#f8fafc] dark:bg-gray-900">
                        <div className="flex items-center justify-between w-full">
                            <Link
                                href="/generate/upload"
                                className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors flex items-center gap-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </Link>
                            <button
                                onClick={handleNextStep}
                                disabled={isExiting}
                                className="group relative flex items-center gap-2 bg-[#1A1A1A] text-white px-8 py-3 rounded-full font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 overflow-hidden ring-1 ring-white/10"
                            >
                                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70"></div>
                                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-black/40 to-transparent"></div>
                                <span className="relative z-10 flex items-center gap-2.5">
                                    {isExiting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <span className="tracking-wide">Next Step</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </>
                                    )}
                                </span>
                            </button>
                        </div>
                    </div>

                </main>{/* end main */}
            </div>{/* end Main Content Area */}
        </div>/* end root */
    );
}
