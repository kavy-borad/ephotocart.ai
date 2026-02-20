"use client";

import { motion } from "framer-motion";

import SidebarSkeleton from "./SidebarSkeleton";

export function GallerySkeleton() {
    return (
        <div className="w-full min-h-screen flex overflow-hidden bg-[#f8fafc] dark:bg-gray-900 font-sans antialiased text-slate-500 dark:text-slate-400">
            {/* Sidebar Skeleton */}
            <SidebarSkeleton activeNav="gallery" />

            {/* Main Layout Area */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-[#f8fafc] dark:bg-gray-900 transition-colors duration-300">
                {/* Top Header */}
                <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200/60 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shrink-0 z-10">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-12 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-4 w-3 bg-slate-200 dark:bg-gray-700/50 rounded animate-pulse" />
                        <div className="h-4 w-24 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
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
                        className="flex flex-col h-full"
                    >
                        {/* Header & Controls Row - Matches screenshot layout */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                            {/* Left: Title & Subtitle */}
                            <div className="space-y-2">
                                <div className="h-8 md:h-9 w-40 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                                <div className="h-4 w-64 bg-slate-100 dark:bg-gray-800 rounded animate-pulse" />
                            </div>

                            {/* Right: Toolbar Controls */}
                            <div className="flex flex-wrap items-center gap-3">
                                {/* Select Button */}
                                <div className="h-10 w-24 bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg animate-pulse" />

                                {/* Search Input */}
                                <div className="h-10 w-48 bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg animate-pulse" />

                                {/* Filter Dropdown */}
                                <div className="h-10 w-32 bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg animate-pulse" />

                                {/* Sort Dropdown */}
                                <div className="h-10 w-40 bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg animate-pulse" />
                            </div>
                        </div>

                        {/* Gallery Grid - 4 Columns like screenshot */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {/* Generate 8 cards to match the view */}
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="aspect-square relative rounded-xl bg-slate-200 dark:bg-gray-700 animate-pulse overflow-hidden">
                                    {/* Simulated Image Content */}
                                    <div className="absolute inset-0 bg-slate-300/30 dark:bg-gray-600/30" />

                                    {/* Optional "Generated" Badge Placement (some items) */}
                                    {i === 4 && (
                                        <div className="absolute top-3 left-3 h-5 w-20 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
