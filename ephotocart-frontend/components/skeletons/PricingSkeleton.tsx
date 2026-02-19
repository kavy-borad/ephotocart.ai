"use client";

import { motion } from "framer-motion";

export function PricingSkeleton() {
    return (
        <div className="min-h-screen w-full bg-slate-50 dark:bg-gray-950 overflow-hidden flex flex-col">
            {/* Navbar Skeleton - Fixed Placeholder */}
            {/* Matches PublicNavbar height (~64px) + borders */}
            <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-50/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-gray-800/50">
                <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                    {/* Logo Area */}
                    <div className="flex items-center gap-3">
                        <div className="size-9 rounded-full bg-slate-200 dark:bg-gray-800 animate-pulse" />
                        <div className="h-5 w-24 bg-slate-200 dark:bg-gray-800 rounded-md animate-pulse" />
                    </div>

                    {/* Nav Links */}
                    <div className="hidden lg:flex items-center gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-4 w-20 bg-slate-200 dark:bg-gray-800 rounded animate-pulse" />
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden lg:flex items-center gap-5">
                        <div className="size-5 rounded bg-slate-200 dark:bg-gray-800 animate-pulse" />
                        <div className="h-5 w-px bg-slate-200 dark:bg-gray-800" />
                        <div className="size-9 rounded-full bg-slate-200 dark:bg-gray-800 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Main Content - Matches PricingPage padding & layout */}
            {/* pt-10 md:pt-16 + offset for fixed navbar */}
            <main className="relative z-10 container mx-auto px-4 flex-1 flex flex-col items-center pt-24 md:pt-32 pb-20">

                {/* Header Section */}
                <div className="w-full max-w-xl flex flex-col items-center mb-6 space-y-4 shrink-0">
                    {/* Title - Long gray bar */}
                    <div className="h-9 md:h-10 w-64 md:w-80 bg-slate-200 dark:bg-gray-800 rounded-lg animate-pulse" />

                    {/* Toggle - Rounded rectangle */}
                    <div className="mt-2 h-11 w-[260px] bg-slate-200 dark:bg-gray-800 rounded-full animate-pulse" />
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl w-full h-auto mt-2">
                    {[1, 2, 3].map((i) => (
                        <PricingCardSkeleton key={i} />
                    ))}
                </div>
            </main>
        </div>
    );
}

function PricingCardSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative flex flex-col h-full bg-transparent border border-slate-200 dark:border-gray-800 rounded-[22px] p-5 lg:p-6"
        >
            {/* Header: Name + Tag */}
            <div className="flex justify-between items-start mb-3">
                <div className="h-7 w-28 bg-slate-200 dark:bg-gray-800 rounded-md animate-pulse" />
                <div className="h-6 w-14 bg-slate-100 dark:bg-gray-800 rounded-full animate-pulse" />
            </div>

            {/* Description - Multiple short lines */}
            <div className="space-y-2 mb-5 min-h-[40px]">
                <div className="h-4 w-full bg-slate-100 dark:bg-gray-800 rounded animate-pulse" />
                <div className="h-4 w-3/5 bg-slate-100 dark:bg-gray-800 rounded animate-pulse" />
            </div>

            {/* Price Section */}
            <div className="mb-5">
                <div className="flex items-end gap-2 mb-2">
                    <div className="h-9 w-24 bg-slate-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                    <div className="h-4 w-10 bg-slate-100 dark:bg-gray-800 rounded animate-pulse mb-1" />
                </div>
                {/* Tags */}
                <div className="flex gap-2">
                    <div className="h-5 w-16 bg-slate-100 dark:bg-gray-800 rounded animate-pulse" />
                    <div className="h-5 w-16 bg-slate-100 dark:bg-gray-800 rounded animate-pulse" />
                </div>
            </div>

            {/* Subscribe Button */}
            <div className="w-full h-12 bg-slate-200 dark:bg-gray-800 rounded-full animate-pulse mb-5" />

            {/* Divider */}
            <div className="h-px w-full bg-slate-100 dark:bg-gray-800 mb-5" />

            {/* Features List */}
            <div className="space-y-2.5 flex-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-2.5">
                        {/* Icon Placeholder */}
                        <div className="size-4 rounded-full bg-slate-200 dark:bg-gray-800 shrink-0 animate-pulse" />
                        {/* Text Placeholder - varying widths */}
                        <div className={`h-4 rounded bg-slate-100 dark:bg-gray-800 animate-pulse ${i % 2 === 0 ? 'w-32' : 'w-40'
                            }`} />
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
