"use client";

import { motion } from "framer-motion";

export function LandingSkeleton() {
    return (
        <div className="min-h-screen w-full bg-slate-50 dark:bg-gray-950 overflow-hidden flex flex-col font-sans antialiased">
            {/* Navbar Skeleton - Fixed */}
            <div className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-slate-50/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-gray-800/50">
                <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Logo */}
                        <div className="size-8 rounded-lg bg-slate-200 dark:bg-gray-800 animate-pulse" />
                        <div className="h-5 w-20 bg-slate-200 dark:bg-gray-800 rounded animate-pulse" />
                    </div>
                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-4 w-16 bg-slate-200 dark:bg-gray-800 rounded animate-pulse" />
                        ))}
                    </div>
                    {/* User Menu */}
                    <div className="hidden lg:flex items-center gap-4">
                        <div className="size-8 rounded-full bg-slate-200 dark:bg-gray-800 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full flex-1 flex flex-col pt-32 pb-20 px-4 sm:px-6 overflow-hidden"
            >
                <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column - Hero Text */}
                    <div className="max-w-xl mx-auto lg:mx-0 flex flex-col items-center lg:items-start text-center lg:text-left">
                        {/* Badge */}
                        <div className="h-7 w-40 bg-slate-200 dark:bg-gray-800 rounded-full animate-pulse mb-8" />

                        {/* Heading - Matches "Transform Products into / Viral Content" layout */}
                        <div className="space-y-3 sm:space-y-4 mb-6 w-full flex flex-col items-center lg:items-start">
                            <div className="h-10 sm:h-14 lg:h-[72px] w-[90%] lg:w-[85%] bg-slate-200 dark:bg-gray-800 rounded-xl sm:rounded-2xl animate-pulse" />
                            <div className="h-10 sm:h-14 lg:h-[72px] w-[60%] lg:w-[50%] bg-slate-200 dark:bg-gray-800 rounded-xl sm:rounded-2xl animate-pulse" />
                        </div>

                        {/* Description */}
                        <div className="space-y-3 mb-10 w-full max-w-lg flex flex-col items-center lg:items-start">
                            <div className="h-4 w-full bg-slate-100 dark:bg-gray-800/80 rounded animate-pulse" />
                            <div className="h-4 w-[95%] bg-slate-100 dark:bg-gray-800/80 rounded animate-pulse" />
                            <div className="h-4 w-[85%] bg-slate-100 dark:bg-gray-800/80 rounded animate-pulse" />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full justify-center lg:justify-start">
                            {/* Get Started - Neutral but distinct */}
                            <div className="h-14 w-44 bg-slate-300 dark:bg-gray-700 rounded-full animate-pulse" />
                            {/* Pricing - White/Outline */}
                            <div className="h-14 w-36 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-full animate-pulse" />
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap items-center gap-6 mb-12 justify-center lg:justify-start">
                            <div className="flex items-center gap-2">
                                <div className="size-4 rounded-full bg-slate-200 dark:bg-gray-700 animate-pulse" />
                                <div className="h-3 w-32 bg-slate-100 dark:bg-gray-800/60 rounded animate-pulse" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="size-4 rounded-full bg-slate-200 dark:bg-gray-700 animate-pulse" />
                                <div className="h-3 w-28 bg-slate-100 dark:bg-gray-800/60 rounded animate-pulse" />
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="flex flex-wrap gap-4 w-full justify-center lg:justify-start">
                            {/* Stat 1 */}
                            <div className="h-16 w-40 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-slate-100 dark:border-gray-800 animate-pulse p-3 flex items-center gap-3">
                                <div className="size-10 rounded-lg bg-slate-200 dark:bg-gray-700 animate-pulse shrink-0" />
                                <div className="flex flex-col gap-1.5 w-full">
                                    <div className="h-4 w-12 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
                                    <div className="h-2 w-16 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                </div>
                            </div>
                            {/* Stat 2 */}
                            <div className="h-16 w-40 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-slate-100 dark:border-gray-800 animate-pulse p-3 flex items-center gap-3">
                                <div className="size-10 rounded-lg bg-slate-200 dark:bg-gray-700 animate-pulse shrink-0" />
                                <div className="flex flex-col gap-1.5 w-full">
                                    <div className="h-4 w-10 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
                                    <div className="h-2 w-14 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                </div>
                            </div>
                            {/* Stat 3 */}
                            <div className="h-16 w-40 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-slate-100 dark:border-gray-800 animate-pulse p-3 flex items-center gap-3">
                                <div className="size-10 rounded-lg bg-slate-200 dark:bg-gray-700 animate-pulse shrink-0" />
                                <div className="flex flex-col gap-1.5 w-full">
                                    <div className="h-4 w-10 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
                                    <div className="h-2 w-16 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Visuals Masonry Grid */}
                    <div className="hidden lg:block relative h-[650px] w-full">
                        <div className="flex gap-4 w-full h-full overflow-hidden mask-gradient-b">
                            {/* Column 1 */}
                            <div className="flex-1 flex flex-col gap-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={`c1-${i}`} className="aspect-[2/3] w-full bg-slate-200 dark:bg-gray-800 rounded-2xl animate-pulse relative border border-slate-100/50 dark:border-gray-700/50">
                                        <div className="absolute bottom-3 right-3 h-5 w-24 bg-slate-300 dark:bg-gray-700/50 rounded-full animate-pulse" />
                                    </div>
                                ))}
                            </div>

                            {/* Column 2 - Offset Top */}
                            <div className="flex-1 flex flex-col gap-4 pt-12">
                                {[1, 2, 3].map((i) => (
                                    <div key={`c2-${i}`} className="aspect-[2/3] w-full bg-slate-200 dark:bg-gray-800 rounded-2xl animate-pulse relative border border-slate-100/50 dark:border-gray-700/50">
                                        <div className="absolute bottom-3 right-3 h-5 w-24 bg-slate-300 dark:bg-gray-700/50 rounded-full animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </motion.main>
        </div>
    );
}
