"use client";

import { motion } from "framer-motion";

import SidebarSkeleton from "./SidebarSkeleton";

export function SettingsSkeleton() {
    return (
        // z-50 + fixed inset-0 ensures this overlays the persistent layout (sidebar/header), showing only this skeleton
        <div className="fixed inset-0 z-50 w-full h-screen flex overflow-hidden bg-[#f8fafc] dark:bg-gray-900 font-sans antialiased text-slate-500 dark:text-slate-400">
            {/* Sidebar Skeleton */}
            <SidebarSkeleton activeNav="settings" />

            {/* Main Layout Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#f8fafc] dark:bg-gray-900 transition-colors duration-300">
                {/* Top Header */}
                <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200/60 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shrink-0 z-10">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-12 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-4 w-3 bg-slate-200 dark:bg-gray-700/50 rounded animate-pulse" />
                        <div className="h-4 w-20 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
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
                        {/* Title Section */}
                        <div className="mb-6">
                            <div className="h-8 md:h-9 w-48 bg-slate-300 dark:bg-gray-600 rounded-lg animate-pulse mb-3" />
                            <div className="h-4 w-96 bg-slate-200 dark:bg-gray-700/50 rounded animate-pulse" />
                        </div>

                        {/* Tabs Bar */}
                        <div className="flex items-center gap-8 border-b border-slate-200 dark:border-gray-700 mb-8 overflow-x-auto">
                            {/* Profile (Active) */}
                            <div className="pb-3 border-b-2 border-slate-400 dark:border-gray-500 px-1">
                                <div className="flex items-center gap-2">
                                    <div className="size-4 bg-slate-300 dark:bg-gray-500 rounded animate-pulse" />
                                    <div className="h-4 w-12 bg-slate-400 dark:bg-gray-400 rounded animate-pulse" />
                                </div>
                            </div>
                            {/* Security */}
                            <div className="pb-3 px-1">
                                <div className="flex items-center gap-2">
                                    <div className="size-4 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                    <div className="h-4 w-16 bg-slate-200 dark:bg-gray-600 rounded animate-pulse" />
                                </div>
                            </div>
                            {/* Usage & Billing */}
                            <div className="pb-3 px-1">
                                <div className="flex items-center gap-2">
                                    <div className="size-4 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                    <div className="h-4 w-24 bg-slate-200 dark:bg-gray-600 rounded animate-pulse" />
                                </div>
                            </div>
                            {/* Notifications */}
                            <div className="pb-3 px-1">
                                <div className="flex items-center gap-2">
                                    <div className="size-4 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                    <div className="h-4 w-20 bg-slate-200 dark:bg-gray-600 rounded animate-pulse" />
                                </div>
                            </div>
                            {/* Preferences */}
                            <div className="pb-3 px-1">
                                <div className="flex items-center gap-2">
                                    <div className="size-4 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                    <div className="h-4 w-20 bg-slate-200 dark:bg-gray-600 rounded animate-pulse" />
                                </div>
                            </div>
                            {/* Help */}
                            <div className="pb-3 px-1">
                                <div className="flex items-center gap-2">
                                    <div className="size-4 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                    <div className="h-4 w-24 bg-slate-200 dark:bg-gray-600 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>

                        {/* Content Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-8 max-w-4xl shadow-sm">
                            {/* Avatar Row */}
                            <div className="flex items-center gap-5 mb-10">
                                <div className="size-20 rounded-full bg-slate-100 dark:bg-gray-700/50 flex items-center justify-center animate-pulse">
                                    <div className="size-8 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
                                </div>
                                <div className="space-y-2">
                                    <div className="h-6 w-32 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
                                    <div className="h-4 w-16 bg-slate-200 dark:bg-gray-700/50 rounded animate-pulse" />
                                </div>
                            </div>

                            {/* Form Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                {/* Full Name Input */}
                                <div className="space-y-2">
                                    <div className="h-3 w-20 bg-slate-400 dark:bg-gray-500 rounded animate-pulse font-bold uppercase tracking-wider text-[10px]" />
                                    <div className="h-12 w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg animate-pulse flex items-center px-4">
                                        <div className="size-4 bg-slate-300 dark:bg-gray-600 rounded animate-pulse mr-3" />
                                        <div className="h-4 w-32 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <div className="h-3 w-24 bg-slate-400 dark:bg-gray-500 rounded animate-pulse font-bold uppercase tracking-wider text-[10px]" />
                                    <div className="h-12 w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg animate-pulse flex items-center px-4">
                                        <div className="size-4 bg-slate-300 dark:bg-gray-600 rounded animate-pulse mr-3" />
                                        <div className="h-4 w-48 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end pt-4">
                                <div className="h-11 w-32 bg-slate-300 dark:bg-gray-600 rounded-lg animate-pulse" />
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
