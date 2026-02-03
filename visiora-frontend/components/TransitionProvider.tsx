"use client";

import { useEffect, useState, createContext, useContext, useCallback, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { PricingSkeleton } from "@/components/skeletons/PricingSkeleton";
import { SolutionsSkeleton } from "@/components/skeletons/SolutionsSkeleton";
import { LandingSkeleton } from "@/components/skeletons/LandingSkeleton";
import { DashboardSkeleton } from "@/components/skeletons/DashboardSkeleton";
import { GenerateSkeleton } from "@/components/skeletons/GenerateSkeleton";
import { GallerySkeleton } from "@/components/skeletons/GallerySkeleton";
import { WalletSkeleton } from "@/components/skeletons/WalletSkeleton";
import { SettingsSkeleton } from "@/components/skeletons/SettingsSkeleton";
import { FeaturesSkeleton } from "@/components/skeletons/FeaturesSkeleton";
import { ResultsSkeleton } from "@/components/skeletons/ResultsSkeleton";

interface TransitionContextType {
    isTransitioning: boolean;
    startTransition: () => void;
}

const TransitionContext = createContext<TransitionContextType>({
    isTransitioning: false,
    startTransition: () => { },
});

export const usePageTransition = () => useContext(TransitionContext);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [nextPath, setNextPath] = useState<string | null>(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const previousPathRef = useRef<string | null>(null);

    // End transition when route changes - with minimum display time
    useEffect(() => {
        const currentPath = pathname + (searchParams?.toString() || '');

        // Only process if path actually changed
        if (previousPathRef.current !== currentPath) {
            previousPathRef.current = currentPath;

            // End transition after minimum display time for visibility
            if (isTransitioning) {
                // Minimum 500ms loader visibility to ensure new page is fully rendered
                // This prevents the "flash of old content" issue
                setTimeout(() => {
                    setIsTransitioning(false);
                    // Clear nextPath slightly after to ensure smooth fade out
                    setTimeout(() => setNextPath(null), 200);
                }, 500);
            }
        }
    }, [pathname, searchParams, isTransitioning]);

    // Clear transition after a max timeout to prevent stuck states
    useEffect(() => {
        if (isTransitioning) {
            // Safety timeout
            timeoutRef.current = setTimeout(() => {
                setIsTransitioning(false);
                setNextPath(null);
            }, 3000);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isTransitioning]);

    const startTransition = useCallback(() => {
        setIsTransitioning(true);
    }, []);

    // Lightweight click listener for internal navigation
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest("a");

            if (!anchor) return;

            const href = anchor.getAttribute("href");
            if (!href) return;

            // Skip non-navigation links
            const isExternalLink = href.startsWith("http") && !href.startsWith(window.location.origin);
            const isHashLink = href.startsWith("#");
            const isMailto = href.startsWith("mailto:");
            const isNewTab = anchor.target === "_blank";
            const isModifiedClick = e.ctrlKey || e.metaKey || e.shiftKey;
            const isDownload = anchor.hasAttribute("download");

            if (isExternalLink || isHashLink || isMailto || isNewTab || isModifiedClick || isDownload) {
                return;
            }

            // Check if navigating to a different route
            const currentPath = window.location.pathname + window.location.search;
            const targetPath = href.startsWith(window.location.origin)
                ? href.replace(window.location.origin, '')
                : href;

            if (currentPath !== targetPath) {
                // SPECIAL CASE: Disable full skeleton when navigating between /generate or /creative-builder steps
                // This allows for smooth "app-like" transitions without reloading the shell
                if ((currentPath.includes('/generate') && targetPath.includes('/generate')) ||
                    (currentPath.includes('/creative-builder') && targetPath.includes('/creative-builder'))) {
                    return;
                }

                setNextPath(targetPath);
                setIsTransitioning(true);
            }
        };

        // Handle browser back/forward navigation
        const handlePopState = () => {
            const newPath = window.location.pathname + window.location.search;

            // SPECIAL CASE: Disable full skeleton for /generate and /creative-builder history navigation too
            if ((previousPathRef.current?.includes('/generate') && newPath.includes('/generate')) ||
                (previousPathRef.current?.includes('/creative-builder') && newPath.includes('/creative-builder'))) {
                return;
            }

            setNextPath(newPath);
            setIsTransitioning(true);
        };

        document.addEventListener("click", handleClick, { passive: true });
        window.addEventListener("popstate", handlePopState);

        return () => {
            document.removeEventListener("click", handleClick);
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    // Helper to determine skeleton type
    // NOTE: This global transition loader requires manual mapping of skeletons to page structures.
    // For "automatic" skeletons that update with page UI, the standard Next.js approach is using
    // `loading.tsx` files in each route directory. However, this global overlay provides a 
    // smoother, instant interaction feedback that `loading.tsx` sometimes misses on client nav.
    const getSkeletonContent = () => {
        const path = nextPath || pathname; // Fallback to current path if nextPath not set

        // 0. Disable Loader for Auth Pages and Creative Builder
        // We want these pages to load instantly with their own internal animations
        if (path.includes('/login') || path.includes('/register') || path.includes('/signup') || path.includes('/creative-builder')) {
            return null;
        }

        // 1a. Generate Images (Type Selection) Skeleton
        if (path === '/generate') {
            return <GenerateSkeleton />;
        }

        // 1. Dashboard Skeleton
        if (path === '/dashboard' || path.startsWith('/dashboard')) {
            return <DashboardSkeleton />;
        }

        // 1. Landing Page Skeleton
        if (path === '/' || path.includes('view=landing')) {
            return <LandingSkeleton />;
        }

        // 2. Features Skeleton
        if (path.includes('/features')) {
            return <FeaturesSkeleton />;
        }



        // 3. Solutions Skeleton
        if (path.includes('/solutions')) {
            return <SolutionsSkeleton />;
        }


        // 4. Pricing Skeleton
        if (path.includes('/pricing')) {
            return <PricingSkeleton />;
        }

        // 5. Results Skeleton
        if (path.includes('/results')) {
            return (
                <div className="min-h-screen lg:h-screen w-screen lg:overflow-hidden overflow-x-hidden bg-slate-50 dark:bg-gray-900 flex flex-col">
                    {/* Public Navbar Menu */}
                    <div className="shrink-0 border-b border-slate-200/60 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 relative w-full">
                        <div className="px-4 sm:px-6 md:px-10 py-3 max-w-[1440px] mx-auto flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-9 sm:h-10 w-9 sm:w-10 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                                <div className="h-5 w-20 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                            </div>
                            <div className="hidden lg:flex gap-8">
                                {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-4 w-20 bg-slate-200 dark:bg-gray-700/50 rounded animate-pulse" />)}
                            </div>
                            <div className="hidden lg:flex gap-3">
                                <div className="size-9 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                                <div className="h-9 w-20 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                                <div className="h-9 w-28 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                            </div>
                            <div className="lg:hidden size-9 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                        </div>
                    </div>

                    <main className="flex-1 flex flex-col items-center overflow-y-auto lg:overflow-hidden">
                        {/* Hero Section */}
                        <div className="shrink-0 flex w-full flex-col items-center pt-4 sm:pt-6 pb-3 sm:pb-4 px-4 md:px-10">
                            <div className="flex flex-col items-center gap-3 mb-6 w-full max-w-[960px] text-center">
                                <div className="h-6 sm:h-7 w-40 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-full animate-pulse shadow-sm" />
                                <div className="h-8 sm:h-10 w-64 bg-slate-900 dark:bg-white rounded-lg animate-pulse mt-1" />
                                <div className="h-4 sm:h-5 w-full max-w-lg bg-slate-400 dark:bg-gray-500 rounded animate-pulse" />
                            </div>
                        </div>

                        {/* Showcase Grid Container */}
                        <div className="flex-1 flex flex-col max-w-[1280px] w-full px-4 md:px-6 mx-auto lg:overflow-hidden lg:min-h-0">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:flex-1 lg:min-h-0">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className={`bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-sm border border-slate-100 dark:border-gray-700 animate-pulse flex flex-col gap-3 min-h-[200px] ${i === 1 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                                        {/* Before/After Badges */}
                                        <div className="shrink-0 flex justify-between items-center mb-2 sm:mb-3 px-1">
                                            <div className="h-4 w-12 bg-slate-100 rounded-full" />
                                            <div className="size-3 bg-slate-200 rounded-full" />
                                            <div className="h-4 w-12 bg-slate-100 rounded-full" />
                                        </div>

                                        {/* Split Images */}
                                        <div className="flex gap-2 flex-1 min-h-[120px] sm:min-h-[150px] lg:min-h-0">
                                            <div className="flex-1 bg-slate-100 dark:bg-gray-700 rounded-lg" />
                                            <div className="flex-1 bg-slate-100 dark:bg-gray-700 rounded-lg" />
                                        </div>

                                        {/* Text Info */}
                                        <div className="shrink-0 mt-2 sm:mt-3 px-1 space-y-2">
                                            <div className="h-4 w-32 bg-slate-800 dark:bg-white rounded" />
                                            <div className="h-3 w-48 bg-slate-400 dark:bg-gray-500 rounded" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
            );
        }

        // 6. Get Started Skeleton
        if (path.includes('/get-started')) {
            return (
                <div className="min-h-screen lg:h-screen w-screen lg:overflow-hidden overflow-x-hidden bg-slate-50 dark:bg-gray-900 flex flex-col">
                    {/* Public Navbar */}
                    <div className="shrink-0 border-b border-slate-200/60 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 relative w-full">
                        <div className="px-4 sm:px-6 md:px-10 py-3 max-w-[1440px] mx-auto flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-9 sm:h-10 w-9 sm:w-10 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                                <div className="h-5 w-20 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                            </div>
                            <div className="hidden lg:flex gap-8">
                                {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-4 w-20 bg-slate-200 dark:bg-gray-700/50 rounded animate-pulse" />)}
                            </div>
                            <div className="hidden lg:flex gap-3">
                                <div className="size-9 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                                <div className="h-9 w-20 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                                <div className="h-9 w-28 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                            </div>
                            <div className="lg:hidden size-9 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                        </div>
                    </div>

                    <main className="relative z-10 flex-1 flex flex-col justify-center py-6 sm:py-8 overflow-y-auto lg:overflow-hidden">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="relative mx-auto max-w-3xl">
                                <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-gray-700 px-5 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16 animate-pulse flex flex-col items-center text-center gap-6 shadow-lg">
                                    {/* Decorative Top Gradient Line - Neutral */}
                                    <div className="absolute top-0 inset-x-0 h-1 sm:h-1.5 bg-slate-200 dark:bg-gray-700 opacity-50" />

                                    <div className="flex flex-col items-center gap-4 w-full max-w-xl">
                                        <div className="h-8 sm:h-12 w-3/4 bg-slate-900 dark:bg-white rounded-xl" />
                                        <div className="h-8 sm:h-12 w-1/2 bg-slate-200 dark:bg-gray-700 rounded-xl" />
                                    </div>

                                    <div className="h-4 sm:h-5 w-full max-w-lg bg-slate-400 dark:bg-gray-500 rounded mt-2" />
                                    <div className="h-4 sm:h-5 w-3/4 max-w-md bg-slate-400 dark:bg-gray-500 rounded" />

                                    <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8 w-full sm:w-auto">
                                        <div className="h-11 sm:h-12 w-full sm:w-[180px] bg-slate-800 dark:bg-gray-600 rounded-xl shadow-sm" />
                                        <div className="h-11 sm:h-12 w-full sm:w-[140px] bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl" />
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="flex items-center gap-1.5">
                                                <div className="size-3.5 sm:size-4 bg-slate-300 dark:bg-gray-600 rounded-full" />
                                                <div className="h-3 w-20 bg-slate-300 dark:bg-gray-600 rounded" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            );
        }

        // 7. Gallery Skeleton
        if (path.includes('/gallery')) {
            return (
                <div className="flex flex-col h-full overflow-hidden">
                    {/* Header + Toolbar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 mb-4 p-1">
                        <div className="flex flex-col gap-1.5">
                            <div className="h-7 w-32 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                            <div className="h-3 w-48 bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-16 bg-slate-100 dark:bg-gray-700/50 rounded-md animate-pulse" />
                            <div className="h-8 w-32 bg-slate-100 dark:bg-gray-700/50 rounded-md animate-pulse" />
                            <div className="h-8 w-20 bg-slate-100 dark:bg-gray-700/50 rounded-md animate-pulse" />
                        </div>
                    </div>

                    {/* Gallery Grid */}
                    <div className="flex-1 min-h-0">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 pb-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                                <div key={i} className="aspect-square bg-white dark:bg-gray-800 rounded-xl border-2 border-slate-200 dark:border-gray-700 animate-pulse relative overflow-hidden shadow-sm">
                                    <div className="absolute inset-0 bg-slate-100 dark:bg-gray-700/20" />
                                    <div className="absolute bottom-2 left-2 right-2 h-2 bg-slate-200 dark:bg-gray-700/50 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        // 4a. Generate Details Skeleton (Specific)
        if (path.includes('/generate/details')) {
            return (
                <div className="flex flex-col h-full overflow-hidden">
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-hidden flex flex-col">
                            <div className="flex flex-col gap-2 min-h-full md:min-h-0 md:flex-1">
                                {/* Page Header */}
                                <div className="mb-2 shrink-0">
                                    <div className="h-8 w-48 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse mb-1" />
                                    <div className="h-4 w-64 bg-slate-200 dark:bg-gray-700/60 rounded animate-pulse" />
                                </div>

                                {/* Progress Steps */}
                                <div className="mb-2 shrink-0">
                                    <div className="relative max-w-3xl mx-auto px-4 sm:px-0 h-16 flex items-center justify-center">
                                        <div className="absolute top-5 left-[16.67%] right-[16.67%] h-[2px] bg-slate-200 dark:bg-gray-700" />
                                        <div className="grid grid-cols-3 w-full relative z-10">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="size-10 rounded-full bg-slate-300 dark:bg-gray-600 animate-pulse" />
                                                <div className="h-3 w-10 bg-slate-200 dark:bg-gray-700 rounded" />
                                            </div>
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="size-10 rounded-full bg-slate-300 dark:bg-gray-600 animate-pulse" />
                                                <div className="h-3 w-12 bg-slate-200 dark:bg-gray-700 rounded" />
                                            </div>
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="size-10 rounded-full bg-slate-400 dark:bg-gray-500 ring-4 ring-slate-200 dark:ring-gray-700 animate-pulse" />
                                                <div className="h-3 w-12 bg-slate-300 dark:bg-gray-600 rounded" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Content */}
                                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm md:flex-1 flex flex-col">
                                    <div className="p-3 sm:p-5 md:p-6 flex flex-col gap-4 md:flex-1 h-full overflow-hidden">
                                        {/* Row 1: Inputs */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
                                            <div className="flex flex-col gap-1">
                                                <div className="h-3 w-20 bg-slate-200 dark:bg-gray-700 rounded mb-1" />
                                                <div className="h-[52px] bg-slate-50 dark:bg-gray-700/30 border border-slate-200 dark:border-gray-600 rounded-lg animate-pulse" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="h-3 w-20 bg-slate-200 dark:bg-gray-700 rounded mb-1" />
                                                <div className="h-[52px] bg-slate-50 dark:bg-gray-700/30 border border-slate-200 dark:border-gray-600 rounded-lg animate-pulse" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="h-3 w-20 bg-slate-200 dark:bg-gray-700 rounded mb-1" />
                                                <div className="h-[52px] bg-slate-50 dark:bg-gray-700/30 border border-slate-200 dark:border-gray-600 rounded-lg animate-pulse" />
                                            </div>
                                        </div>

                                        {/* Model Selection Grid */}
                                        <div className="flex-1 flex flex-col min-h-0 gap-2">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="h-4 w-32 bg-slate-200 dark:bg-gray-700 rounded" />
                                                <div className="flex gap-2">
                                                    <div className="h-7 w-24 bg-slate-100 dark:bg-gray-700/50 rounded-lg" />
                                                    <div className="h-7 w-24 bg-slate-100 dark:bg-gray-700/50 rounded-lg" />
                                                </div>
                                            </div>
                                            <div className="flex-1 overflow-hidden grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 2xl:grid-cols-8 gap-3">
                                                {[...Array(14)].map((_, i) => (
                                                    <div key={i} className="flex flex-col gap-1">
                                                        <div className="aspect-[3/4] rounded-lg bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 animate-pulse" />
                                                        <div className="h-2 w-16 mx-auto bg-slate-100 dark:bg-gray-700 rounded" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="shrink-0 pt-4 flex justify-between items-center px-1">
                            <div className="h-9 w-20 bg-slate-100 dark:bg-gray-700/50 hover:bg-slate-200 rounded-lg animate-pulse" />
                            <div className="h-11 w-32 bg-slate-800 dark:bg-gray-700 rounded-xl shadow-lg animate-pulse" />
                        </div>
                    </div>
                </div>
            );
        }

        // 5a. Email Support - Circular Loader
        if (path.includes('/settings/support')) {
            return (
                <div className="flex h-screen w-screen items-center justify-center bg-slate-100 dark:bg-gray-950">
                    <Loader2 className="h-10 w-10 animate-spin text-slate-400 dark:text-gray-500" />
                </div>
            );
        }

        // 5. Settings Skeleton
        if (path.includes('/settings') && !path.includes('/settings/support')) {
            return <SettingsSkeleton />;
        }



        // 4c. Generate Root Skeleton - EXACT 1:1 PIXEL PERFECT INNER CONTENT
        if (path === '/generate' || path === '/generate/') {
            return (
                <div className="flex flex-col min-h-full">
                    {/* Page Header - mb-6 */}
                    <div className="mb-6 shrink-0">
                        <div className="h-8 sm:h-9 w-48 sm:w-56 bg-slate-900 dark:bg-white rounded animate-pulse mb-1.5" />
                        <div className="h-4 sm:h-5 w-80 sm:w-[420px] max-w-full bg-slate-400 dark:bg-gray-500 rounded animate-pulse" />
                    </div>

                    {/* Progress Steps - mb-6 sm:mb-8 */}
                    <div className="mb-6 sm:mb-8 shrink-0">
                        <div className="relative max-w-3xl mx-auto px-4 sm:px-0">
                            {/* Background line */}
                            <div className="absolute top-5 left-[16.67%] right-[16.67%] h-[2px] bg-slate-200 dark:bg-gray-700" />
                            {/* Active line (first segment) - Neutral */}
                            <div className="absolute top-5 left-[16.67%] w-[33.33%] h-[2px] bg-slate-800 dark:bg-white" />

                            <div className="grid grid-cols-3">
                                {/* STEP 1 - Active - Neutral */}
                                <div className="flex flex-col items-center">
                                    <div className="z-10 size-10 rounded-full bg-slate-800 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold ring-4 ring-slate-200 dark:ring-gray-700 animate-pulse" />
                                    <div className="mt-2 h-3 w-8 bg-slate-600 dark:bg-gray-400 rounded animate-pulse" />
                                </div>
                                {/* STEP 2 */}
                                <div className="flex flex-col items-center">
                                    <div className="z-10 size-10 rounded-full border-2 border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex items-center justify-center animate-pulse" />
                                    <div className="mt-2 h-3 w-12 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
                                </div>
                                {/* STEP 3 */}
                                <div className="flex flex-col items-center">
                                    <div className="z-10 size-10 rounded-full border-2 border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex items-center justify-center animate-pulse" />
                                    <div className="mt-2 h-3 w-12 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section Title - mb-4 */}
                    <div className="mb-4 shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="h-5 sm:h-6 w-56 sm:w-64 bg-slate-800 dark:bg-white rounded animate-pulse" />
                            <div className="w-4 h-4 bg-slate-400 dark:bg-gray-500 rounded-full animate-pulse" />
                        </div>
                    </div>

                    {/* Type Selection Cards - grid cols-1 md:cols-2 gap-5 max-w-5xl mx-auto */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 md:mb-0 md:flex-1 md:min-h-0 max-w-5xl mx-auto w-full">
                        {/* Single Image Card - SELECTED */}
                        <div className="h-full p-5 rounded-xl bg-white dark:bg-gray-800 border-2 border-slate-800 dark:border-white ring-4 ring-slate-100 dark:ring-gray-700 shadow-xl flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div className="size-12 rounded-xl bg-slate-100 dark:bg-gray-700 flex items-center justify-center shadow-sm">
                                    <div className="w-6 h-6 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
                                </div>
                                <div className="size-5 bg-slate-800 dark:bg-white rounded-full flex items-center justify-center shadow-md">
                                    <div className="w-3 h-3 bg-white dark:bg-gray-900 rounded-sm" />
                                </div>
                            </div>
                            <div>
                                <div className="h-6 w-28 bg-slate-900 dark:bg-white rounded animate-pulse mb-1.5" />
                                <div className="space-y-1.5">
                                    <div className="h-3 w-full bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                    <div className="h-3 w-[90%] bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>

                        {/* E-Commerce Bundle Card - DEFAULT */}
                        <div className="h-full p-5 rounded-xl bg-white dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 shadow-md flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div className="size-12 rounded-xl bg-slate-100 dark:bg-gray-700 flex items-center justify-center shadow-sm">
                                    <div className="w-6 h-6 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
                                </div>
                            </div>
                            <div>
                                <div className="h-6 w-40 bg-slate-900 dark:bg-white rounded animate-pulse mb-1.5" />
                                <div className="space-y-1.5">
                                    <div className="h-3 w-full bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                    <div className="h-3 w-[85%] bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Next Button - flex justify-end pt-5 mt-auto md:mt-5 */}
                    <div className="flex justify-end pt-5 mt-auto md:mt-5 shrink-0 pb-4 md:pb-0">
                        <div className="flex items-center gap-2.5 bg-gradient-to-b from-slate-800 to-slate-900 px-7 py-3 rounded-xl shadow-lg animate-pulse">
                            <div className="h-4 w-16 bg-white/40 rounded animate-pulse" />
                            <div className="w-4 h-4 bg-white/40 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            );
        }

        // 3. Wallet Skeleton (Exact Replica)
        if (path.includes('/wallet')) {
            return (
                <div className="flex flex-col h-full overflow-hidden">
                    <div className="flex flex-col gap-2 shrink-0 mb-3">
                        <div className="h-7 w-32 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                        <div className="h-3 w-48 bg-slate-100 dark:bg-gray-700/60 rounded animate-pulse" />
                    </div>

                    {/* Split Layout */}
                    <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 overflow-hidden">
                        {/* LEFT COLUMN: Balance + Transactions */}
                        <div className="flex-1 flex flex-col gap-5 min-h-0">
                            {/* Balance Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6 animate-pulse shrink-0 shadow-sm">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="space-y-3">
                                        <div className="h-3 w-24 bg-slate-200 dark:bg-gray-700 rounded" />
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-48 bg-slate-300 dark:bg-gray-600 rounded-lg" />
                                            <div className="h-6 w-16 bg-slate-100 dark:bg-gray-700 rounded-md" />
                                        </div>
                                    </div>
                                    <div className="flex gap-3 w-full md:w-auto">
                                        <div className="h-11 w-32 bg-slate-800 dark:bg-gray-700 rounded-xl" />
                                        <div className="size-11 bg-slate-100 dark:bg-gray-700/50 rounded-xl" />
                                    </div>
                                </div>
                            </div>

                            {/* Transactions List */}
                            <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 overflow-hidden flex flex-col shadow-sm">
                                <div className="h-16 border-b border-slate-100 dark:border-gray-700 flex items-center justify-between px-6 shrink-0">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 bg-slate-100 dark:bg-gray-700/50 rounded-lg" />
                                        <div className="h-5 w-32 bg-slate-200 dark:bg-gray-700 rounded" />
                                    </div>
                                    <div className="h-8 w-24 bg-slate-100 dark:bg-gray-700/30 rounded-lg" />
                                </div>
                                <div className="p-6 space-y-6 flex-1 overflow-hidden">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="flex justify-between items-center animate-pulse">
                                            <div className="flex gap-4">
                                                <div className="size-10 bg-slate-100 dark:bg-gray-700 rounded-full" />
                                                <div className="space-y-2">
                                                    <div className="h-4 w-40 bg-slate-200 dark:bg-gray-700/50 rounded" />
                                                    <div className="h-3 w-24 bg-slate-100 dark:bg-gray-700/30 rounded" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <div className="h-5 w-20 bg-slate-200 dark:bg-gray-700/50 rounded" />
                                                <div className="h-4 w-16 bg-slate-100 dark:bg-gray-700/30 rounded" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Packages Sidebar */}
                        <div className="w-full lg:w-[320px] 2xl:w-[360px] shrink-0 flex flex-col gap-4 h-full">
                            <div className="flex items-center gap-2">
                                <div className="size-4 bg-slate-200 dark:bg-gray-700 rounded" />
                                <div className="h-4 w-24 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                            </div>
                            <div className="flex-1 flex flex-col gap-3 overflow-hidden">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-5 animate-pulse flex flex-col gap-4 shadow-sm">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <div className="h-7 w-24 bg-slate-200 dark:bg-gray-700 rounded" />
                                                <div className="h-4 w-32 bg-slate-100 dark:bg-gray-700/50 rounded" />
                                            </div>
                                            <div className="h-8 w-20 bg-slate-100 dark:bg-gray-700/30 rounded-lg" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }



        // 4b. Generate DETAILS Page Skeleton - Pixel Perfect Match
        if (path.includes('/generate/details')) {
            return (
                <div className="min-h-screen h-full w-full flex overflow-hidden bg-[#f8fafc] dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased transition-colors duration-200">
                    {/* Sidebar */}
                    <aside className="hidden lg:flex w-56 h-full flex-col bg-white dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 z-30 shrink-0 shadow-sm">
                        <div className="h-16 flex items-center px-6 shrink-0">
                            <div className="flex items-center gap-2.5">
                                <div className="h-8 w-8 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                                <div className="h-4 w-16 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                            </div>
                        </div>
                        <nav className="flex-1 py-4 px-3 space-y-1">
                            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                                <div className="size-5 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
                                <div className="h-4 w-24 bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse" />
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-100 dark:bg-gray-700 border-l-4 border-slate-400">
                                <div className="size-5 rounded bg-slate-300 dark:bg-gray-600 animate-pulse" />
                                <div className="h-4 w-32 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                                <div className="size-5 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
                                <div className="h-4 w-24 bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse" />
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                                <div className="size-5 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
                                <div className="h-4 w-16 bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse" />
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-gray-700">
                                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                                    <div className="size-5 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
                                    <div className="h-4 w-20 bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse" />
                                </div>
                            </div>
                        </nav>
                        <div className="p-3 mt-auto">
                            <div className="h-9 w-full bg-slate-800 dark:bg-white rounded-lg animate-pulse" />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                        {/* Header */}
                        <div className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-slate-200/60 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-12 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                <div className="h-4 w-3 bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse" />
                                <div className="h-4 w-20 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                <div className="h-4 w-3 bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse" />
                                <div className="h-4 w-16 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-gray-800 rounded-lg">
                                    <div className="size-4 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
                                    <div className="h-4 w-16 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                </div>
                                <div className="h-9 w-9 bg-slate-200 dark:bg-gray-700 rounded-xl animate-pulse" />
                            </div>
                        </div>

                        {/* Main Area */}
                        <main className="flex-1 flex flex-col overflow-hidden bg-[#f8fafc] dark:bg-gray-900">
                            <div className="flex-1 p-4 sm:p-5 overflow-y-auto md:overflow-hidden flex flex-col">
                                <div className="flex flex-col gap-2 min-h-full md:min-h-0 md:flex-1">
                                    {/* Page Header */}
                                    <div className="mb-2 shrink-0">
                                        <div className="h-9 w-56 bg-slate-900 dark:bg-white rounded-lg animate-pulse mb-1" />
                                        <div className="h-5 w-[420px] max-w-full bg-slate-400/60 dark:bg-gray-600 rounded animate-pulse" />
                                    </div>

                                    {/* Stepper - Step 3 Active (All Complete) */}
                                    <div className="mb-2 shrink-0">
                                        <div className="relative max-w-3xl mx-auto px-4 sm:px-0">
                                            <div className="absolute top-5 left-[16.67%] right-[16.67%] h-[2px] bg-slate-800 dark:bg-white"></div>
                                            <div className="grid grid-cols-3">
                                                {/* Step 1 - Completed */}
                                                <div className="flex flex-col items-center">
                                                    <div className="z-10 size-10 rounded-full bg-slate-800 dark:bg-white flex items-center justify-center animate-pulse"></div>
                                                    <span className="mt-2 h-3 w-8 bg-slate-500 dark:bg-gray-400 rounded animate-pulse"></span>
                                                </div>
                                                {/* Step 2 - Completed */}
                                                <div className="flex flex-col items-center">
                                                    <div className="z-10 size-10 rounded-full bg-slate-800 dark:bg-white flex items-center justify-center animate-pulse"></div>
                                                    <span className="mt-2 h-3 w-14 bg-slate-500 dark:bg-gray-400 rounded animate-pulse"></span>
                                                </div>
                                                {/* Step 3 - Active */}
                                                <div className="flex flex-col items-center">
                                                    <div className="z-10 size-10 rounded-full bg-slate-800 dark:bg-white ring-4 ring-slate-200 dark:ring-gray-700 flex items-center justify-center animate-pulse"></div>
                                                    <span className="mt-2 h-3 w-14 bg-slate-500 dark:bg-gray-400 rounded animate-pulse"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form Card */}
                                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm md:flex-1 flex flex-col">
                                        <div className="p-3 sm:p-5 md:p-6 flex flex-col gap-1 md:flex-1">
                                            {/* Row 1: 3 Inputs Side by Side */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
                                                {/* Image Type */}
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-3.5 h-3.5 bg-gray-400 rounded animate-pulse" />
                                                        <div className="h-3 w-20 bg-slate-900 dark:bg-white rounded animate-pulse" />
                                                    </div>
                                                    <div className="h-[52px] px-3 rounded-lg bg-slate-50 dark:bg-gray-700/30 border-2 border-slate-300 dark:border-gray-600 flex items-center gap-2">
                                                        <div className="p-1.5 rounded-lg bg-white dark:bg-gray-800">
                                                            <div className="w-3.5 h-3.5 bg-slate-400 dark:bg-gray-500 rounded animate-pulse" />
                                                        </div>
                                                        <div className="flex flex-col gap-0.5">
                                                            <div className="h-3 w-20 bg-slate-900 dark:bg-white rounded animate-pulse" />
                                                            <div className="h-2 w-32 bg-gray-500 rounded animate-pulse" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Category */}
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-3.5 h-3.5 bg-slate-400 dark:bg-gray-500 rounded animate-pulse" />
                                                        <div className="h-3 w-16 bg-slate-900 dark:bg-white rounded animate-pulse" />
                                                    </div>
                                                    <div className="h-[52px] rounded-lg bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 animate-pulse" />
                                                </div>

                                                {/* Brand Name */}
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-3.5 h-3.5 bg-gray-400 rounded animate-pulse" />
                                                        <div className="h-3 w-24 bg-slate-900 dark:bg-white rounded animate-pulse" />
                                                    </div>
                                                    <div className="h-[52px] rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 animate-pulse" />
                                                </div>
                                            </div>

                                            {/* Additional Branding Info Section */}
                                            <div className="md:flex-1 md:min-h-0 flex flex-col mt-4">
                                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600 md:flex-1 flex flex-col">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div className="w-4 h-4 bg-gray-400 rounded animate-pulse" />
                                                        <div className="h-4 w-48 bg-slate-900 dark:bg-white rounded animate-pulse" />
                                                        <div className="h-5 w-16 bg-gray-100 dark:bg-gray-600 rounded-full animate-pulse" />
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                        {/* Logo Upload */}
                                                        <div className="flex flex-col gap-1">
                                                            <div className="h-2.5 w-20 bg-gray-600 dark:bg-gray-300 rounded animate-pulse" />
                                                            <div className="h-12 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center gap-2">
                                                                <div className="w-4 h-4 bg-gray-400 rounded animate-pulse" />
                                                                <div className="h-3 w-20 bg-gray-400 rounded animate-pulse" />
                                                            </div>
                                                        </div>
                                                        {/* Instagram */}
                                                        <div className="flex flex-col gap-1">
                                                            <div className="h-2.5 w-16 bg-gray-600 dark:bg-gray-300 rounded animate-pulse" />
                                                            <div className="h-12 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 animate-pulse" />
                                                        </div>
                                                        {/* Website */}
                                                        <div className="flex flex-col gap-1">
                                                            <div className="h-2.5 w-20 bg-gray-600 dark:bg-gray-300 rounded animate-pulse" />
                                                            <div className="h-12 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 animate-pulse" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Navigation */}
                            <div className="shrink-0 px-5 py-2 bg-[#f8fafc] dark:bg-gray-900">
                                <div className="flex items-center justify-between">
                                    <div className="h-10 w-20 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
                                    <div className="h-12 w-32 bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl animate-pulse" />
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            );
        }

        // 4e. Generate Root Skeleton - EXACT 1:1 PIXEL PERFECT REPLICA
        // 4e. Generate Root Skeleton - EXACT 1:1 PIXEL PERFECT REPLICA
        if (path === '/generate' || path === '/generate/') {
            return <GenerateSkeleton />;
        }

        // 4d. E-commerce Options Skeleton
        if (path.includes('/generate/ecommerce-options')) {
            return (
                <div className="flex h-full w-full items-center justify-center min-h-[500px]">
                    <Loader2 className="h-12 w-12 animate-spin text-teal-500/80" />
                </div>
            );
        }



        // 6. Default Dashboard Skeleton
        return (
            <div className="flex flex-col gap-6 h-full">
                {/* Page Title */}
                <div className="flex flex-col gap-2">
                    <div className="h-8 w-48 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                    <div className="h-4 w-64 bg-slate-200 dark:bg-gray-700/60 rounded-md animate-pulse" />
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-40 bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-4 animate-pulse">
                            <div className="w-full h-full bg-slate-100 dark:bg-gray-700/30 rounded-lg" />
                        </div>
                    ))}
                </div>

                {/* Large Content Area */}
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 animate-pulse p-4">
                    <div className="w-full h-full bg-slate-100 dark:bg-gray-700/30 rounded-lg" />
                </div>
            </div>
        );
    };

    return (
        <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
            {children}

            {/* Optimized Page Transition Loader - Instant Show, Smooth Hide */}
            {/* Optimized Page Transition Loader - Instant Show, Smooth Hide */}
            {/* Exclude Auth pages from global transition loader to allow their native animations */}
            {!((nextPath || pathname)?.includes('/login') || (nextPath || pathname)?.includes('/register') || (nextPath || pathname)?.includes('/signup')) && (
                <div
                    className={`fixed inset-0 z-[9999] ${isTransitioning
                        ? 'opacity-100 visible pointer-events-auto'
                        : 'opacity-0 invisible pointer-events-none transition-opacity duration-200'
                        }`}
                    style={{ willChange: isTransitioning ? 'opacity' : 'auto' }}
                >
                    {/* Skeleton Loader Layout */}
                    <div className="absolute inset-0 bg-slate-50 dark:bg-gray-900 overflow-hidden">
                        {(() => {
                            const path = nextPath || pathname;

                            // Special case for Email Support & Generate Flow - Simple Loader (Bypass all Layout Skeletons)
                            if (path.includes('/settings/support') || path.includes('/generate/upload') || path.includes('/generate/ecommerce-options') || path.includes('/wallet/add-money') || path.includes('ref=add_money') || path.includes('payment=')) {
                                return (
                                    <div className="flex h-full w-full items-center justify-center bg-slate-100 dark:bg-gray-950">
                                        <Loader2 className="h-12 w-12 animate-spin text-teal-500/80" />
                                    </div>
                                );
                            }
                            const isFullLayout = path === '/' ||
                                path.includes('view=landing') ||
                                path.includes('/features') ||
                                path.includes('/solutions') ||
                                path.includes('/pricing') ||
                                path.includes('/results') ||
                                path.includes('/get-started') ||
                                path.startsWith('/dashboard') ||
                                path.startsWith('/generate') ||
                                path.startsWith('/gallery') ||
                                path.startsWith('/wallet') ||
                                path.startsWith('/settings');

                            if (isFullLayout) {
                                // Helper for App Shell Skeleton (Sidebar + Header) - EXACT match to Gallery/Wallet structure
                                const AppShellSkeleton = ({ children }: { children: React.ReactNode }) => (
                                    <div className="w-full h-full flex overflow-x-hidden bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
                                        {/* Sidebar Skeleton - matches Sidebar component exactly */}
                                        <aside className="hidden lg:flex w-56 h-full flex-col bg-white dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 z-30 shrink-0 shadow-sm">
                                            {/* Logo */}
                                            <div className="h-16 flex items-center px-5 border-b border-slate-100 dark:border-gray-700 shrink-0">
                                                <div className="h-8 w-8 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                                                <div className="h-5 w-20 bg-slate-200 dark:bg-gray-700 rounded animate-pulse ml-2.5" />
                                            </div>
                                            {/* Nav Items */}
                                            <nav className="flex-1 py-4 px-3 space-y-1">
                                                {[1, 2, 3, 4, 5].map(i => (
                                                    <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl">
                                                        <div className="size-5 rounded-lg bg-slate-200 dark:bg-gray-700 animate-pulse" />
                                                        <div className="h-4 w-24 rounded bg-slate-100 dark:bg-gray-700/50 animate-pulse" />
                                                    </div>
                                                ))}
                                            </nav>
                                            {/* Profile */}
                                            <div className="p-3 mt-auto border-t border-slate-100 dark:border-gray-700">
                                                <div className="flex items-center gap-3 p-2">
                                                    <div className="size-9 rounded-full bg-slate-200 dark:bg-gray-700 animate-pulse" />
                                                    <div className="flex-1">
                                                        <div className="h-4 w-20 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                                        <div className="h-3 w-28 bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse mt-1" />
                                                    </div>
                                                </div>
                                            </div>
                                        </aside>

                                        {/* Main Content Area - matches Gallery/Wallet main structure exactly */}
                                        <main className="flex-1 flex flex-col min-w-0 h-full overflow-x-hidden lg:overflow-hidden bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
                                            {/* Header Skeleton - matches Header component */}
                                            <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-slate-200/60 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shrink-0">
                                                <div className="flex items-center gap-2">
                                                    <div className="lg:hidden size-8 bg-slate-100 dark:bg-gray-700 rounded-lg animate-pulse" />
                                                    <div className="hidden sm:flex items-center gap-1.5">
                                                        <div className="h-4 w-12 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                                        <div className="h-4 w-3 bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse" />
                                                        <div className="h-4 w-24 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-gray-800 rounded-lg">
                                                        <div className="size-4 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                                        <div className="h-4 w-16 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                                    </div>
                                                    <div className="h-9 w-24 bg-slate-200 dark:bg-gray-700 rounded-xl animate-pulse" />
                                                </div>
                                            </header>

                                            {/* Content Area - matches Gallery/Wallet content padding */}
                                            <div className="flex-1 p-3 sm:p-4 overflow-y-auto lg:overflow-hidden">
                                                {children}
                                            </div>
                                        </main>
                                    </div>
                                );

                                // Dashboard has its own complete skeleton (self-contained)
                                if (path.startsWith('/dashboard')) {
                                    return getSkeletonContent();
                                }

                                // Generate Main Page is self-contained
                                if (path === '/generate') {
                                    return getSkeletonContent();
                                }

                                // Generate sub-pages, Gallery, Wallet, and Settings have content-only skeletons, wrap them in AppShell
                                if (path.startsWith('/gallery') || path.startsWith('/wallet') || path.startsWith('/generate') || path.startsWith('/settings')) {
                                    return (
                                        <AppShellSkeleton>
                                            {getSkeletonContent()}
                                        </AppShellSkeleton>
                                    );
                                }

                                // 5. Gallery Skeleton
                                if (path === '/gallery' || path === '/gallery/') {
                                    return <GallerySkeleton />;
                                }

                                // 6. Wallet Skeleton
                                if (path === '/wallet' || path === '/wallet/') {
                                    return <WalletSkeleton />;
                                }

                                // 7. Settings Skeleton
                                if (path === '/settings' || path === '/settings/') {
                                    return <SettingsSkeleton />;
                                }

                                // For public pages, return simple wrapper
                                return (
                                    <div className="w-full h-full overflow-hidden bg-white dark:bg-gray-900">
                                        {getSkeletonContent()}
                                    </div>
                                );
                            }

                            return (
                                <div className="flex h-full w-full">
                                    {/* Sidebar Skeleton (hidden on mobile) */}
                                    <div className="hidden lg:flex w-56 flex-col border-r border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 gap-4 z-20 shrink-0">
                                        {/* Logo Area */}
                                        <div className="h-8 w-32 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse mb-6 flex items-center gap-2">
                                            <div className="size-6 bg-slate-300 dark:bg-gray-600 rounded-md" />
                                            <div className="h-4 flex-1 bg-slate-300 dark:bg-gray-600 rounded" />
                                        </div>

                                        {/* Nav Items */}
                                        <div className="flex flex-col gap-2">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <div key={i} className="h-10 w-full bg-slate-100 dark:bg-gray-700/50 rounded-lg animate-pulse" />
                                            ))}
                                        </div>

                                        {/* Spacer */}
                                        <div className="flex-1" />

                                        {/* Bottom Profile Area */}
                                        <div className="h-14 w-full bg-slate-100 dark:bg-gray-700/50 rounded-xl animate-pulse" />
                                    </div>

                                    {/* Main Content Skeleton */}
                                    <div className="flex-1 flex flex-col min-w-0 relative z-10 overflow-hidden">
                                        {/* Header Skeleton */}
                                        <div className="h-14 border-b border-slate-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 p-4 flex items-center justify-between backdrop-blur-sm shrink-0">
                                            <div className="flex items-center gap-2">
                                                {/* Mobile Menu Button Placeholder */}
                                                <div className="lg:hidden size-8 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                                                {/* Breadcrumb Placeholder */}
                                                <div className="h-5 w-32 bg-slate-200 dark:bg-gray-700 rounded-md animate-pulse hidden md:block" />
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-24 bg-slate-200 dark:bg-gray-700 rounded-full animate-pulse hidden sm:block" />
                                                <div className="size-8 bg-slate-200 dark:bg-gray-700 rounded-full animate-pulse" />
                                            </div>
                                        </div>

                                        {/* Dynamic Page Content Skeleton */}
                                        <div className="flex-1 p-4 sm:p-6 overflow-hidden">
                                            {getSkeletonContent()}
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            )}
        </TransitionContext.Provider >
    );
}

