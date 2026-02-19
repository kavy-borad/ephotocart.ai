"use client";

import { motion } from "framer-motion";

export function SolutionsSkeleton() {
    return (
        <div className="min-h-screen w-full bg-slate-50 dark:bg-gray-950 overflow-hidden flex flex-col">
            {/* Navbar Skeleton - Matching PublicNavbar height */}
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

            {/* Main Content Area */}
            <main className="relative z-10 w-full max-w-6xl mx-auto px-4 flex-1 flex flex-col pt-32 pb-20">

                {/* Page Header */}
                <div className="w-full flex flex-col items-center mb-16 space-y-6">
                    {/* Title "Only three steps to magic" */}
                    <div className="h-10 md:h-12 w-3/4 max-w-lg bg-slate-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                    {/* Subtitle */}
                    <div className="space-y-3 w-full max-w-2xl flex flex-col items-center">
                        <div className="h-4 w-full bg-slate-200 dark:bg-gray-800 rounded animate-pulse" />
                        <div className="h-4 w-2/3 bg-slate-200 dark:bg-gray-800 rounded animate-pulse" />
                    </div>
                </div>

                {/* Step 1 Content - Split Grid */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20 w-full">

                    {/* Left Side: Text Content */}
                    <div className="w-full md:w-1/2 flex flex-col space-y-8">
                        {/* Step Badge */}
                        <div className="h-7 w-20 bg-slate-200 dark:bg-gray-800 rounded-full animate-pulse" />

                        {/* Heading "Select Generate Type" */}
                        <div className="h-9 w-64 bg-slate-200 dark:bg-gray-800 rounded-lg animate-pulse" />

                        {/* Description Paragraph */}
                        <div className="space-y-3 pr-8">
                            <div className="h-4 w-full bg-slate-100 dark:bg-gray-800/80 rounded animate-pulse" />
                            <div className="h-4 w-5/6 bg-slate-100 dark:bg-gray-800/80 rounded animate-pulse" />
                            <div className="h-4 w-4/6 bg-slate-100 dark:bg-gray-800/80 rounded animate-pulse" />
                        </div>

                        {/* Button "Continue" */}
                        <div className="h-14 w-40 bg-slate-200 dark:bg-gray-800 rounded-2xl animate-pulse mt-4" />
                    </div>

                    {/* Right Side: Visual Mockup */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full md:w-1/2"
                    >
                        {/* Container matching aspect ratio ~4:3 */}
                        <div className="aspect-[4/3] w-full max-w-md mx-auto rounded-3xl bg-slate-200 dark:bg-gray-800/50 p-1 flex overflow-hidden relative animate-pulse">
                            {/* Inner Split Container */}
                            <div className="w-full h-full rounded-[22px] bg-slate-100 dark:bg-gray-800 overflow-hidden flex border border-slate-200/50 dark:border-gray-700/50">

                                {/* Left Half - Single */}
                                <div className="w-1/2 h-full border-r border-slate-200 dark:border-gray-700 relative p-4 flex flex-col justify-end items-center">
                                    {/* Image placeholder */}
                                    <div className="absolute inset-0 m-3 mb-12 rounded-xl bg-slate-200 dark:bg-gray-700/50 animate-pulse" />
                                    {/* Pill Label */}
                                    <div className="z-10 h-6 w-16 bg-slate-300 dark:bg-gray-600 rounded-full animate-pulse mb-2" />
                                </div>

                                {/* Right Half - Bundle */}
                                <div className="w-1/2 h-full relative p-4 flex flex-col justify-end items-center">
                                    {/* Grid placeholders */}
                                    <div className="absolute inset-x-3 top-3 bottom-12 grid grid-cols-2 gap-1.5">
                                        <div className="bg-slate-200 dark:bg-gray-700/50 rounded-lg animate-pulse" />
                                        <div className="bg-slate-200 dark:bg-gray-700/50 rounded-lg animate-pulse" />
                                        <div className="bg-slate-200 dark:bg-gray-700/50 rounded-lg animate-pulse" />
                                        <div className="bg-slate-200 dark:bg-gray-700/50 rounded-lg animate-pulse" />
                                    </div>
                                    {/* Pill Label */}
                                    <div className="z-10 h-6 w-16 bg-slate-300 dark:bg-gray-600 rounded-full animate-pulse mb-2" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
