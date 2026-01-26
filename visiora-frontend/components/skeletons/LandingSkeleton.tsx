"use client";

import { motion } from "framer-motion";

export function LandingSkeleton() {
    return (
        <div className="min-h-screen w-full bg-slate-50 dark:bg-gray-950 overflow-hidden flex flex-col">
            {/* Navbar Skeleton - Fixed */}
            <div className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-slate-50/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-gray-800/50">
                <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-9 rounded-full bg-slate-200 dark:bg-gray-800 animate-pulse" />
                        <div className="h-5 w-24 bg-slate-200 dark:bg-gray-800 rounded-md animate-pulse" />
                    </div>
                    <div className="hidden lg:flex items-center gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-4 w-20 bg-slate-200 dark:bg-gray-800 rounded animate-pulse" />
                        ))}
                    </div>
                    <div className="hidden lg:flex items-center gap-5">
                        <div className="size-5 rounded bg-slate-200 dark:bg-gray-800 animate-pulse" />
                        <div className="h-5 w-px bg-slate-200 dark:bg-gray-800" />
                        <div className="size-9 rounded-full bg-slate-200 dark:bg-gray-800 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="relative z-10 w-full flex-1 flex flex-col pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
                <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Left Column - Hero Text */}
                    <div className="max-w-xl mx-auto lg:mx-0 flex flex-col items-center lg:items-start text-center lg:text-left">

                        {/* Badge */}
                        <div className="h-7 w-48 bg-slate-200 dark:bg-gray-800 rounded-full animate-pulse mb-8" />

                        {/* Heading - 3 Lines */}
                        <div className="space-y-3 mb-6 w-full flex flex-col items-center lg:items-start">
                            <div className="h-10 sm:h-14 lg:h-16 w-full max-w-md lg:max-w-full bg-slate-200 dark:bg-gray-800 rounded-xl animate-pulse" />
                            <div className="h-10 sm:h-14 lg:h-16 w-3/4 max-w-sm lg:max-w-[90%] bg-slate-200 dark:bg-gray-800 rounded-xl animate-pulse" />
                            <div className="h-10 sm:h-14 lg:h-16 w-1/2 max-w-xs lg:max-w-[80%] bg-slate-200 dark:bg-gray-800 rounded-xl animate-pulse" />
                        </div>

                        {/* Description - 3 Lines */}
                        <div className="space-y-2.5 mb-8 w-full max-w-md flex flex-col items-center lg:items-start">
                            <div className="h-4 w-full bg-slate-100 dark:bg-gray-800/80 rounded animate-pulse" />
                            <div className="h-4 w-[90%] bg-slate-100 dark:bg-gray-800/80 rounded animate-pulse" />
                            <div className="h-4 w-[80%] bg-slate-100 dark:bg-gray-800/80 rounded animate-pulse" />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full justify-center lg:justify-start">
                            <div className="h-14 w-full sm:w-44 bg-slate-200 dark:bg-gray-800 rounded-full animate-pulse" />
                            <div className="h-14 w-full sm:w-36 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-full animate-pulse" />
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center gap-4 mb-8 justify-center lg:justify-start">
                            <div className="h-4 w-32 bg-slate-100 dark:bg-gray-800/50 rounded animate-pulse" />
                            <div className="size-1 bg-slate-300 dark:bg-gray-700 rounded-full" />
                            <div className="h-4 w-28 bg-slate-100 dark:bg-gray-800/50 rounded animate-pulse" />
                        </div>

                        {/* Stats Row */}
                        <div className="flex gap-3 w-full max-w-md lg:max-w-none">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex-1 h-20 bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-2xl animate-pulse p-3 flex items-center gap-3">
                                    <div className="size-10 rounded-lg bg-slate-100 dark:bg-gray-800 animate-pulse shrink-0" />
                                    <div className="flex flex-col gap-1.5 w-full">
                                        <div className="h-4 w-12 bg-slate-200 dark:bg-gray-800 rounded animate-pulse" />
                                        <div className="h-2 w-16 bg-slate-100 dark:bg-gray-800/50 rounded animate-pulse" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Visuals Grid */}
                    <div className="hidden lg:block relative h-[600px] w-full overflow-hidden mask-fade-bottom">
                        {/* Two Columns */}
                        <div className="flex gap-5 w-full h-full p-4">
                            {/* Col 1 */}
                            <div className="w-1/2 flex flex-col gap-5">
                                {[1, 2].map((i) => (
                                    <div key={i} className="aspect-[2/3] w-full bg-slate-200 dark:bg-gray-800 rounded-2xl animate-pulse relative overflow-hidden border border-slate-100/50 dark:border-gray-700/50">
                                        <div className="absolute bottom-4 right-4 h-6 w-20 bg-slate-300 dark:bg-gray-700 rounded-full animate-pulse opacity-70" />
                                    </div>
                                ))}
                            </div>
                            {/* Col 2 - Offset */}
                            <div className="w-1/2 flex flex-col gap-5 pt-12">
                                {[1, 2].map((i) => (
                                    <div key={i} className="aspect-[2/3] w-full bg-slate-200 dark:bg-gray-800 rounded-2xl animate-pulse relative overflow-hidden border border-slate-100/50 dark:border-gray-700/50">
                                        <div className="absolute bottom-4 right-4 h-6 w-20 bg-slate-300 dark:bg-gray-700 rounded-full animate-pulse opacity-70" />
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
