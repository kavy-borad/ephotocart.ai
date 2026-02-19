"use client";

import { motion } from "framer-motion";

export function FeaturesSkeleton() {
    return (
        <div className="min-h-screen w-full bg-slate-50 dark:bg-gray-950 overflow-hidden flex flex-col font-sans antialiased">
            {/* Navbar Skeleton - Fixed */}
            <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-gray-800/60">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
                    {/* Logo Area */}
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-slate-200 dark:bg-gray-800 animate-pulse" />
                        <div className="h-5 w-24 bg-slate-200 dark:bg-gray-800 rounded-md animate-pulse" />
                    </div>
                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-4 w-16 bg-slate-200 dark:bg-gray-800 rounded animate-pulse" />
                        ))}
                    </div>
                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <div className="size-8 rounded-full bg-slate-200 dark:bg-gray-800 animate-pulse" />
                        <div className="hidden sm:block h-9 w-24 bg-slate-200 dark:bg-gray-800 rounded-full animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col pt-24 pb-12 px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full max-w-[1440px] mx-auto flex flex-col items-center"
                >

                    {/* Header Section */}
                    <div className="flex flex-col items-center text-center gap-4 mb-12 max-w-3xl w-full">
                        {/* Title Bar */}
                        <div className="h-8 md:h-10 w-64 sm:w-80 md:w-96 bg-slate-300 dark:bg-gray-700 rounded-lg animate-pulse" />

                        {/* Subtitle Lines */}
                        <div className="flex flex-col items-center gap-2 w-full max-w-lg">
                            <div className="h-4 w-full bg-slate-200 dark:bg-gray-800 rounded animate-pulse" />
                            <div className="h-4 w-3/4 bg-slate-200 dark:bg-gray-800 rounded animate-pulse" />
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="flex flex-col p-5 bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-2xl shadow-sm h-[280px]"
                            >
                                {/* Icon Placeholder */}
                                <div className="size-10 rounded-lg bg-slate-200 dark:bg-gray-800 mb-4 animate-pulse" />

                                {/* Title */}
                                <div className="h-6 w-1/2 bg-slate-200 dark:bg-gray-800 rounded mb-3 animate-pulse" />

                                {/* Description Rows */}
                                <div className="space-y-2 mt-1">
                                    <div className="h-4 w-full bg-slate-100 dark:bg-gray-800/60 rounded animate-pulse" />
                                    <div className="h-4 w-[90%] bg-slate-100 dark:bg-gray-800/60 rounded animate-pulse" />
                                    <div className="h-4 w-[95%] bg-slate-100 dark:bg-gray-800/60 rounded animate-pulse" />
                                </div>

                                {/* Bottom Spacer / Extra content simulation */}
                                <div className="mt-auto pt-4">
                                    <div className="h-3 w-1/4 bg-slate-50 dark:bg-gray-800/30 rounded animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
