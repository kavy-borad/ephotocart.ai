"use client";

import { motion } from "framer-motion";

export function ResultsSkeleton() {
    return (
        <div className="min-h-screen lg:h-screen w-full lg:overflow-hidden overflow-x-hidden bg-slate-50 dark:bg-gray-900 flex flex-col font-sans antialiased">
            {/* Navbar Skeleton - Fixed */}
            <div className="h-16 border-b border-slate-200/60 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shrink-0">
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-8 rounded-lg bg-slate-200 dark:bg-gray-800 animate-pulse" />
                        <div className="h-5 w-24 bg-slate-200 dark:bg-gray-800 rounded animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col items-center overflow-hidden relative"
            >

                {/* Hero Section */}
                <div className="shrink-0 flex w-full flex-col items-center pt-14 sm:pt-16 pb-4 px-4">
                    <div className="flex flex-col items-center max-w-[960px] w-full gap-4">
                        {/* Headline */}
                        <div className="h-8 sm:h-10 w-48 sm:w-64 bg-slate-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                        <div className="h-1 w-16 bg-slate-200 dark:bg-gray-800 rounded-full animate-pulse" />

                        {/* Description */}
                        <div className="flex flex-col items-center gap-2 w-full max-w-lg mt-2">
                            <div className="h-4 w-full bg-slate-100 dark:bg-gray-800/60 rounded animate-pulse" />
                            <div className="h-4 w-3/4 bg-slate-100 dark:bg-gray-800/60 rounded animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* 3D Carousel Skeleton */}
                <div className="relative w-full max-w-[1280px] flex-1 min-h-[500px]">
                    <div className="lg:absolute lg:inset-0 flex justify-center items-start pt-8">

                        {/* Left Card (Hidden/Faded/Small) */}
                        <div
                            className="absolute top-12 left-[40%] w-[340px] h-[380px] bg-white/40 dark:bg-gray-800/40 rounded-2xl border border-slate-100/50 dark:border-gray-700/50 hidden lg:block"
                            style={{ transform: "translateX(-50%) translateX(-340px) scale(0.85)", zIndex: 10 }}
                        >
                            <div className="w-full h-full p-4 flex flex-col opacity-50">
                                <div className="flex justify-between mb-3">
                                    <div className="h-4 w-12 bg-slate-200 dark:bg-gray-700 rounded-full" />
                                    <div className="h-4 w-12 bg-slate-200 dark:bg-gray-700 rounded-full" />
                                </div>
                                <div className="flex gap-2 flex-1">
                                    <div className="flex-1 bg-slate-200 dark:bg-gray-700 rounded-lg" />
                                    <div className="flex-1 bg-slate-200 dark:bg-gray-700 rounded-lg" />
                                </div>
                            </div>
                        </div>

                        {/* Center Card (Prominent) */}
                        <div
                            className="absolute top-12 left-[40%] w-[340px] h-[380px] bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-gray-700 z-50 lg:block"
                            style={{ transform: "translateX(-50%) scale(1.15)" }}
                        >
                            <div className="w-full h-full flex flex-col animate-pulse">
                                {/* Badges */}
                                <div className="flex justify-between mb-4">
                                    <div className="h-5 w-14 bg-slate-200 dark:bg-gray-700 rounded-full" />
                                    <div className="h-5 w-14 bg-slate-200 dark:bg-gray-700 rounded-full" />
                                </div>
                                {/* Images */}
                                <div className="flex gap-2 flex-1 min-h-0 mb-4">
                                    <div className="flex-1 bg-slate-200 dark:bg-gray-700 rounded-lg" />
                                    <div className="flex-1 bg-slate-200 dark:bg-gray-700 rounded-lg relative">
                                        <div className="absolute bottom-2 right-2 size-5 bg-white/50 rounded-full" />
                                    </div>
                                </div>
                                {/* Text */}
                                <div className="flex flex-col items-center gap-2 mt-auto">
                                    <div className="h-5 w-32 bg-slate-200 dark:bg-gray-700 rounded" />
                                    <div className="h-3 w-48 bg-slate-100 dark:bg-gray-800 rounded" />
                                </div>
                            </div>
                        </div>

                        {/* Right Card (Hidden/Faded/Small) */}
                        <div
                            className="absolute top-12 left-[40%] w-[340px] h-[380px] bg-white/40 dark:bg-gray-800/40 rounded-2xl border border-slate-100/50 dark:border-gray-700/50 hidden lg:block"
                            style={{ transform: "translateX(-50%) translateX(340px) scale(0.85)", zIndex: 10 }}
                        >
                            <div className="w-full h-full p-4 flex flex-col opacity-50">
                                <div className="flex justify-between mb-3">
                                    <div className="h-4 w-12 bg-slate-200 dark:bg-gray-700 rounded-full" />
                                    <div className="h-4 w-12 bg-slate-200 dark:bg-gray-700 rounded-full" />
                                </div>
                                <div className="flex gap-2 flex-1">
                                    <div className="flex-1 bg-slate-200 dark:bg-gray-700 rounded-lg" />
                                    <div className="flex-1 bg-slate-200 dark:bg-gray-700 rounded-lg" />
                                </div>
                            </div>
                        </div>

                        {/* Mobile Grid Fallback */}
                        <div className="lg:hidden w-full px-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="h-[280px] bg-white dark:bg-gray-800 rounded-xl p-4 border border-slate-200 dark:border-gray-700">
                                    <div className="flex justify-between mb-3">
                                        <div className="h-4 w-12 bg-slate-200 dark:bg-gray-700 rounded-full animate-pulse" />
                                        <div className="h-4 w-12 bg-slate-200 dark:bg-gray-700 rounded-full animate-pulse" />
                                    </div>
                                    <div className="flex gap-2 h-40 mb-3">
                                        <div className="flex-1 bg-slate-100 dark:bg-gray-700/50 rounded-lg animate-pulse" />
                                        <div className="flex-1 bg-slate-100 dark:bg-gray-700/50 rounded-lg animate-pulse" />
                                    </div>
                                    <div className="h-4 w-24 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex gap-2 mb-8 mt-4 lg:mt-0 lg:absolute lg:bottom-20 z-10">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="size-1.5 rounded-full bg-slate-200 dark:bg-gray-700" />
                    ))}
                </div>

                {/* CTA Button */}
                <div className="mb-8 lg:absolute lg:bottom-8 z-10">
                    <div className="h-10 w-48 bg-slate-200 dark:bg-gray-800 rounded-full animate-pulse mx-auto" />
                </div>
            </motion.main>
        </div>
    );
}
