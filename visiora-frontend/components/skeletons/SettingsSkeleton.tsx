"use client";

import { motion } from "framer-motion";

export function SettingsSkeleton() {
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
                    {/* Generate Image */}
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <div className="size-5 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-4 w-32 bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse" />
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
                    {/* Settings (Active) */}
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-100 dark:bg-gray-700/50">
                        <div className="size-5 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
                        <div className="h-4 w-20 bg-slate-200 dark:bg-gray-600 rounded animate-pulse" />
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
                            <div className="h-8 md:h-9 w-48 bg-slate-800 dark:bg-white rounded-lg animate-pulse mb-3" />
                            <div className="h-4 w-96 bg-slate-400/60 dark:bg-gray-600 rounded animate-pulse" />
                        </div>

                        {/* Tabs Bar */}
                        <div className="flex items-center gap-8 border-b border-slate-200 dark:border-gray-700 mb-8 overflow-x-auto">
                            {/* Profile (Active) */}
                            <div className="pb-3 border-b-2 border-teal-500 px-1">
                                <div className="flex items-center gap-2">
                                    <div className="size-4 bg-teal-500/20 rounded animate-pulse" />
                                    <div className="h-4 w-12 bg-teal-700 dark:bg-teal-400 rounded animate-pulse" />
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
                                <div className="size-20 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center animate-pulse">
                                    <div className="size-8 bg-teal-200 dark:bg-teal-800 rounded animate-pulse" />
                                </div>
                                <div className="space-y-2">
                                    <div className="h-6 w-32 bg-slate-900 dark:bg-white rounded animate-pulse" />
                                    <div className="h-4 w-16 bg-slate-400 dark:bg-gray-500 rounded animate-pulse" />
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
                                <div className="h-11 w-32 bg-slate-900 dark:bg-white rounded-lg animate-pulse" />
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
