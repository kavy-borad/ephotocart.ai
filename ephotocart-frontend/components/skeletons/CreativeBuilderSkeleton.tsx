"use client";

import { motion } from "framer-motion";

import SidebarSkeleton from "./SidebarSkeleton";

export function CreativeBuilderSkeleton() {
    return (
        <div className="w-full h-full flex overflow-hidden bg-[#f8fafc] dark:bg-gray-900 font-sans antialiased text-slate-500 dark:text-slate-400">
            {/* Sidebar Skeleton */}
            <SidebarSkeleton activeNav="creative-builder" />

            {/* Main Layout Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#f8fafc] dark:bg-gray-900 transition-colors duration-300">
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
                        className="flex flex-col h-full mt-4"
                    >
                        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto items-center mt-20 text-center">
                            {/* Icon Pulse */}
                            <div className="size-20 bg-slate-200 dark:bg-gray-700 rounded-2xl animate-pulse shadow-sm" />

                            {/* Title Pulse */}
                            <div className="h-10 w-64 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                            <div className="h-6 w-32 bg-slate-100 dark:bg-gray-800 rounded-lg animate-pulse" />

                            {/* Text lines Pulse */}
                            <div className="space-y-3 mt-4 w-full flex flex-col items-center">
                                <div className="h-4 w-full max-w-sm bg-slate-100 dark:bg-gray-800 rounded animate-pulse" />
                                <div className="h-4 w-3/4 max-w-sm bg-slate-100 dark:bg-gray-800 rounded animate-pulse" />
                            </div>

                            {/* Button Pulse */}
                            <div className="mt-8 h-12 w-48 bg-slate-200 dark:bg-gray-700 rounded-xl animate-pulse" />
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
