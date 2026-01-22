"use client";

import Link from "@/components/Link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
    Sparkles,
    ArrowRight,
    Play,
    CheckCircle,
    Images,
    Zap,
    Users,
    Shield,
} from "lucide-react";
import { landingApi, LandingStats } from "@/lib/landing";
import { PublicNavbar } from "@/components/layout";
import { authApi } from "@/lib/auth";
import { motion } from "framer-motion";
import ComparisonSlider from "@/components/ComparisonSlider";

export default function LandingPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    // Auth check state - start with checking auth
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    // Stats state
    const [stats, setStats] = useState<LandingStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check auth on mount - redirect to dashboard if logged in
    // But allow viewing if user explicitly navigated here (via Home link)
    useEffect(() => {
        const checkAuth = () => {
            const viewLanding = searchParams.get('view') === 'landing';
            // Temporary: Disable redirect to allow viewing design changes
            if (authApi.isAuthenticated() && !viewLanding) {
                // router.replace("/dashboard");
                setIsCheckingAuth(false); // Allow viewing even if logged in for now
            } else {
                setIsCheckingAuth(false);
            }
        };
        checkAuth();
    }, [router, searchParams]);

    // Fetch stats on mount
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await landingApi.getStats();
                if (response.success && response.data) {
                    setStats(response.data);
                }
            } catch (error) {
                console.warn('Failed to fetch landing stats:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    // Show loading state while checking auth
    if (isCheckingAuth) {
        return (
            <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-white via-emerald-50/50 to-teal-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    // Fallback values if API fails
    const imagesGenerated = stats?.imagesGenerated ?? 10000;
    const avgGenerationTime = stats?.avgGenerationTime ?? 30;
    const activeUsers = stats?.activeUsers ?? 2000;

    // Format numbers for display
    const formatNumber = (num: number): string => {
        if (num >= 1000) return `${(num / 1000).toFixed(0)}K+`;
        return `${num}+`;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 10
            }
        }
    };

    const cardContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.6 // Start after hero text
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 15
            }
        }
    };


    return (
        <div className="h-full w-screen overflow-x-hidden bg-gradient-to-br from-white via-emerald-50/50 to-teal-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-slate-900 dark:text-gray-100 antialiased flex flex-col transition-colors duration-300">
            {/* Navbar */}
            <PublicNavbar activePage="home" />

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center relative px-4 sm:px-6 py-6 sm:py-0 overflow-y-auto lg:overflow-hidden">
                {/* Background Blurs */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute top-10 left-1/4 w-72 h-72 bg-emerald-200/20 dark:bg-emerald-500/10 rounded-full blur-[80px] -z-10 pointer-events-none"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="absolute bottom-10 right-1/4 w-72 h-72 bg-teal-100/30 dark:bg-teal-500/10 rounded-full blur-[80px] -z-10 pointer-events-none"
                />

                <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Left Column - Hero Text */}
                    <motion.div
                        className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Badge */}
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white dark:bg-gray-800 border border-emerald-100 dark:border-gray-700 mb-3 sm:mb-5 shadow-sm">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-[10px] font-semibold text-slate-600 dark:text-gray-400 tracking-wide uppercase">AI-Powered Technology</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold leading-[1.1] mb-4 sm:mb-6 tracking-tight text-slate-900 dark:text-white">
                            Transform Products into <br className="hidden sm:block" />
                            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 bg-clip-text text-transparent">Stunning Visuals</span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p variants={itemVariants} className="text-base sm:text-lg 2xl:text-xl text-slate-500 dark:text-gray-400 leading-relaxed mb-6 sm:mb-8 max-w-md 2xl:max-w-lg mx-auto lg:mx-0">
                            Create professional product photography instantly. No studio required. Just upload your product and let our AI generate photorealistic scenes.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center sm:items-center justify-center lg:justify-start gap-4 mb-6 sm:mb-8">
                            <Link
                                href="/register"
                                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-600 text-white font-semibold rounded-2xl transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 hover:scale-[1.02] flex items-center gap-2 text-base"
                            >
                                Start Creating Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link href="/solutions" className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-300 font-medium rounded-2xl transition-all shadow-sm hover:shadow-md flex items-center gap-2 text-base">
                                <Play className="w-4 h-4 text-slate-500 dark:text-gray-400" />
                                See How it Works
                            </Link>
                        </motion.div>

                        {/* Trust Badges */}
                        <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-3 text-sm text-slate-500 dark:text-gray-400">
                            <div className="flex items-center gap-1.5">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span>No credit card required</span>
                            </div>
                            <span className="text-slate-300 dark:text-gray-600">•</span>
                            <div className="flex items-center gap-1.5">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span>14-day free trial</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Comparison Slider & Stats */}
                    <motion.div
                        className="relative hidden lg:block -mt-16"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {/* Comparison Slider */}
                        <div className="relative z-10 rounded-2xl p-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700 shadow-2xl shadow-emerald-500/10 mb-8 transform hover:scale-[1.01] transition-transform duration-500 max-w-sm mx-auto">
                            <ComparisonSlider
                                slides={[
                                    { before: "/red-top-before.png", after: "/red-top-after.jpg" },
                                    { before: "/plaid-before.jpg", after: "/plaid-after.jpg" },
                                    { before: "/suit-before.jpg", after: "/suit-after.jpg" }
                                ]}
                                aspectRatio="3/4"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Footer Stats - Centered at bottom (Removed as requested) */}
            </main>
        </div>
    );
}

