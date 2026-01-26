"use client";

import { motion } from "framer-motion";

export function GenerateSkeleton() {
    return (
        <div className="w-full min-h-screen flex overflow-hidden bg-[#f8fafc] dark:bg-gray-900 font-sans antialiased text-slate-500 dark:text-slate-400">
            {/* Sidebar Skeleton */}
            <aside className="hidden lg:flex w-64 h-screen flex-col bg-white dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 shrink-0 z-20">
                {/* Logo Area */}
                <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-gray-700 shrink-0">
                    <div className="size-8 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                    <div className="h-4 w-24 bg-slate-200 dark:bg-gray-700 rounded animate-pulse ml-3" />
                </div>

                {/* Nav Links */}
                <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
                    {/* Dashboard */}
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <div className="size-5 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-4 w-24 bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse" />
                    </div>
                    {/* Generate Image (Active) */}
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-100 dark:bg-gray-700/50">
                        <div className="size-5 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
                        <div className="h-4 w-32 bg-slate-200 dark:bg-gray-600 rounded animate-pulse" />
                    </div>
                    {/* My Gallery */}
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <div className="size-5 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-4 w-24 bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse" />
                    </div>
                    {/* Wallet */}
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <div className="size-5 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-4 w-20 bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse" />
                    </div>
                    {/* Spacer */}
                    <div className="h-8" />
                    {/* Settings */}
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <div className="size-5 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-4 w-20 bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse" />
                    </div>
                </div>

                {/* Bottom CTA / Profile */}
                <div className="p-4 mt-auto border-t border-slate-100 dark:border-gray-700">
                    <div className="h-10 w-full bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                </div>
            </aside>

            {/* Main Layout Area */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-[#f8fafc] dark:bg-gray-900 transition-colors duration-300">
                {/* Top Header */}
                <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200/60 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shrink-0 z-10">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-12 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-4 w-3 bg-slate-200 dark:bg-gray-700/50 rounded animate-pulse" />
                        <div className="h-4 w-32 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
                    </div>

                    {/* Right Toolbar */}
                    <div className="flex items-center gap-4">
                        {/* Credits Badge */}
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-gray-700/50 rounded-lg border border-slate-100 dark:border-gray-600">
                            <div className="size-4 bg-slate-300 dark:bg-gray-500 rounded animate-pulse" />
                            <div className="h-4 w-16 bg-slate-200 dark:bg-gray-600 rounded animate-pulse" />
                        </div>
                        {/* Notification Bell */}
                        <div className="size-9 bg-slate-100 dark:bg-gray-700 rounded-full animate-pulse" />
                        {/* Profile Dropdown */}
                        <div className="flex items-center gap-2">
                            <div className="size-9 bg-slate-200 dark:bg-gray-600 rounded-full animate-pulse" />
                            <div className="hidden md:block h-4 w-12 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                        </div>
                    </div>
                </header>

                {/* Main Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="max-w-5xl mx-auto flex flex-col h-full"
                    >
                        {/* Page Title & Subtitle */}
                        <div className="mb-8">
                            <div className="h-8 md:h-9 w-64 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse mb-3" />
                            <div className="h-5 w-full max-w-lg bg-slate-100 dark:bg-gray-800 rounded animate-pulse" />
                        </div>

                        {/* Stepper */}
                        <div className="mb-12">
                            <div className="relative max-w-2xl mx-auto px-4">
                                {/* Connector Lines */}
                                <div className="absolute top-5 left-[16.66%] right-[16.66%] h-[2px] bg-slate-100 dark:bg-gray-800" />

                                <div className="grid grid-cols-3 relative">
                                    {/* Step 1: Active */}
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="z-10 size-10 rounded-full bg-slate-300 dark:bg-gray-600 ring-4 ring-slate-50 dark:ring-gray-800 flex items-center justify-center animate-pulse" />
                                        <div className="h-3 w-10 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                    </div>
                                    {/* Step 2: Pending */}
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="z-10 size-10 rounded-full bg-white dark:bg-gray-900 border-2 border-slate-100 dark:border-gray-800 flex items-center justify-center animate-pulse" />
                                        <div className="h-3 w-14 bg-slate-100 dark:bg-gray-800 rounded animate-pulse" />
                                    </div>
                                    {/* Step 3: Pending */}
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="z-10 size-10 rounded-full bg-white dark:bg-gray-900 border-2 border-slate-100 dark:border-gray-800 flex items-center justify-center animate-pulse" />
                                        <div className="h-3 w-14 bg-slate-100 dark:bg-gray-800 rounded animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Selection Section */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-6 w-56 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                            <div className="size-4 bg-slate-200 dark:bg-gray-700 rounded-full animate-pulse" />
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Card 1: Selected State (Simulated neutral border emphasis) */}
                            <div className="relative p-6 rounded-2xl bg-white dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 shadow-sm h-64 flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="size-12 bg-slate-100 dark:bg-gray-700/50 rounded-xl animate-pulse" />
                                    <div className="size-6 bg-slate-200 dark:bg-gray-700 rounded-full animate-pulse" />
                                </div>
                                <div className="mt-auto space-y-3">
                                    <div className="h-6 w-32 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                    <div className="space-y-1.5">
                                        <div className="h-4 w-full bg-slate-100 dark:bg-gray-800 rounded animate-pulse" />
                                        <div className="h-4 w-5/6 bg-slate-100 dark:bg-gray-800 rounded animate-pulse" />
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Default State */}
                            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-800 h-64 flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="size-12 bg-slate-50 dark:bg-gray-900 rounded-xl animate-pulse" />
                                </div>
                                <div className="mt-auto space-y-3">
                                    <div className="h-6 w-40 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                    <div className="space-y-1.5">
                                        <div className="h-4 w-full bg-slate-100 dark:bg-gray-800 rounded animate-pulse" />
                                        <div className="h-4 w-2/3 bg-slate-100 dark:bg-gray-800 rounded animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="flex justify-end pt-4 mt-auto">
                            <div className="h-12 w-32 bg-slate-200 dark:bg-gray-700 rounded-full animate-pulse" />
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
