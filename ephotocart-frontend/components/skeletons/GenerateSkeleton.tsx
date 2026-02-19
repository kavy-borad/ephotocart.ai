"use client";

import { motion } from "framer-motion";

export function GenerateSkeleton() {
    return (
        <div className="w-full h-full flex overflow-hidden bg-gray-50 dark:bg-gray-900 font-sans antialiased text-gray-500 dark:text-gray-400">
            {/* Sidebar Skeleton */}
            <aside className="hidden lg:flex w-56 h-full flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shrink-0 z-20">
                {/* Logo Area */}
                <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-700 shrink-0">
                    <div className="size-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ml-3" />
                </div>

                {/* Nav Links */}
                <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
                    {/* Dashboard */}
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <div className="size-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-4 w-24 bg-gray-100 dark:bg-gray-700/50 rounded animate-pulse" />
                    </div>
                    {/* Generate Image (Active) */}
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700/50">
                        <div className="size-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                    </div>
                    {/* My Gallery */}
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <div className="size-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-4 w-24 bg-gray-100 dark:bg-gray-700/50 rounded animate-pulse" />
                    </div>
                    {/* Wallet */}
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <div className="size-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-4 w-20 bg-gray-100 dark:bg-gray-700/50 rounded animate-pulse" />
                    </div>
                    {/* Settings */}
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <div className="size-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-4 w-20 bg-gray-100 dark:bg-gray-700/50 rounded animate-pulse" />
                    </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="p-4 mt-auto border-t border-gray-100 dark:border-gray-700">
                    <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                </div>
            </aside>

            {/* Main Layout Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                {/* Top Header */}
                <header className="h-14 flex items-center justify-between px-4 sm:px-6 border-b border-gray-200/60 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shrink-0 z-10">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-4 w-3 bg-gray-200 dark:bg-gray-700/50 rounded animate-pulse" />
                        <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                    </div>

                    {/* Right Toolbar */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
                            <div className="size-4 bg-gray-300 dark:bg-gray-500 rounded animate-pulse" />
                            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                        </div>
                        <div className="size-9 bg-gray-100 dark:bg-gray-700 rounded-full animate-pulse" />
                        <div className="flex items-center gap-2">
                            <div className="size-9 bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse" />
                        </div>
                    </div>
                </header>

                {/* Main Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 scroll-smooth bg-gray-50/50 dark:bg-gray-900/50">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col min-h-full max-w-7xl mx-auto"
                    >
                        {/* Page Title & Subtitle */}
                        <div className="mb-6 shrink-0">
                            <div className="h-8 md:h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-3" />
                            <div className="h-5 w-full max-w-lg bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                        </div>

                        {/* Stepper */}
                        <div className="mb-8 shrink-0">
                            <div className="relative max-w-3xl mx-auto px-4 sm:px-0">
                                {/* Connector Lines */}
                                <div className="absolute top-5 left-[16.66%] right-[16.66%] h-[2px] bg-gray-200 dark:bg-gray-800" />

                                <div className="grid grid-cols-3 relative">
                                    {/* Step 1: Active */}
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="z-10 size-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center animate-pulse ring-4 ring-gray-100 dark:ring-gray-700" />
                                        <div className="h-3 w-10 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mt-1" />
                                    </div>
                                    {/* Step 2: Inactive */}
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="z-10 size-10 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center animate-pulse" />
                                        <div className="h-3 w-14 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-1" />
                                    </div>
                                    {/* Step 3: Inactive */}
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="z-10 size-10 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center animate-pulse" />
                                        <div className="h-3 w-14 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-1" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section Title */}
                        <div className="mb-5 shrink-0">
                            <div className="h-6 w-56 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 md:mb-0 md:flex-1 md:min-h-0 max-w-5xl mx-auto w-full">
                            {/* Card 1: Selected (Single Image) */}
                            <div className="relative p-5 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 shadow-sm flex flex-col min-h-[220px]">
                                <div className="flex justify-between items-start mb-4">
                                    {/* Icon Box */}
                                    <div className="size-12 bg-gray-100 dark:bg-gray-700/50 rounded-xl animate-pulse" />
                                    {/* Selected Checkmark */}
                                    <div className="size-5 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
                                </div>
                                <div>
                                    {/* Title */}
                                    <div className="h-7 w-32 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-3" />
                                    {/* Description */}
                                    <div className="space-y-2">
                                        <div className="h-3 w-full bg-gray-100 dark:bg-gray-700/50 rounded animate-pulse" />
                                        <div className="h-3 w-5/6 bg-gray-100 dark:bg-gray-700/50 rounded animate-pulse" />
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Default (E-Commerce) */}
                            <div className="relative p-5 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 shadow-sm flex flex-col min-h-[220px]">
                                <div className="flex justify-between items-start mb-4">
                                    {/* Icon Box */}
                                    <div className="size-12 bg-gray-50 dark:bg-gray-900/50 rounded-xl animate-pulse" />
                                </div>
                                <div>
                                    {/* Title */}
                                    <div className="h-7 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3" />
                                    {/* Description */}
                                    <div className="space-y-2">
                                        <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                                        <div className="h-3 w-2/3 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Next Button - Bottom Right */}
                        <div className="flex justify-end pt-5 mt-auto md:mt-5 shrink-0 pb-4 md:pb-0">
                            <div className="h-12 w-32 bg-gray-900 dark:bg-gray-700 rounded-full shadow-lg animate-pulse" />
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
