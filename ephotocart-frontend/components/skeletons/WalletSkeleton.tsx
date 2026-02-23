"use client";

import { motion } from "framer-motion";

import SidebarSkeleton from "./SidebarSkeleton";

export function WalletSkeleton() {
    return (
        <div className="w-full h-full flex overflow-hidden bg-[#f8fafc] dark:bg-gray-900 font-sans antialiased text-slate-500 dark:text-slate-400">
            {/* Sidebar Skeleton */}
            <SidebarSkeleton activeNav="wallet" />

            {/* Main Layout Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#f8fafc] dark:bg-gray-900 transition-colors duration-300">
                {/* Top Header */}
                <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200/60 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shrink-0 z-10">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-12 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-4 w-3 bg-slate-200 dark:bg-gray-700/50 rounded animate-pulse" />
                        <div className="h-4 w-16 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
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
                        {/* Page Header */}
                        <div className="mb-8">
                            <div className="h-8 md:h-9 w-32 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse mb-3" />
                            <div className="h-4 w-64 bg-slate-100 dark:bg-gray-800 rounded animate-pulse" />
                        </div>

                        {/* Two Columns Grid */}
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                            {/* Left Column (2/3 width) */}
                            <div className="xl:col-span-2 space-y-6">
                                {/* Balance Card */}
                                <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 shadow-sm">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="h-3 w-32 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                                <div className="size-3 bg-slate-200 dark:bg-gray-700 rounded-full animate-pulse" />
                                            </div>
                                            <div className="flex items-baseline gap-3">
                                                <div className="h-10 w-40 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                                <div className="h-5 w-12 bg-slate-100 dark:bg-gray-800 rounded animate-pulse" />
                                                <div className="h-5 w-16 bg-slate-100 dark:bg-gray-800/50 rounded animate-pulse" />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 w-full sm:w-auto">
                                            <div className="h-10 w-full sm:w-32 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                                            <div className="h-10 w-10 bg-slate-100 dark:bg-gray-800 rounded-lg animate-pulse" />
                                        </div>
                                    </div>
                                </div>

                                {/* Transaction History */}
                                <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 shadow-sm min-h-[400px]">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="size-6 bg-slate-100 dark:bg-gray-800 rounded animate-pulse" />
                                        <div className="h-5 w-40 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                    </div>

                                    {/* Filters */}
                                    <div className="flex gap-3 mb-6 overflow-x-auto pb-1">
                                        <div className="h-9 w-32 bg-slate-50 dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-lg animate-pulse shrink-0" />
                                        <div className="h-9 w-40 bg-slate-50 dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-lg animate-pulse shrink-0" />
                                        <div className="h-9 w-36 bg-slate-50 dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-lg animate-pulse shrink-0" />
                                    </div>

                                    {/* Transactions List */}
                                    <div className="space-y-4">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-transparent border-b-slate-50 dark:border-b-gray-800">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-10 rounded-full bg-slate-100 dark:bg-gray-800 animate-pulse" />
                                                    <div className="space-y-2">
                                                        <div className="h-4 w-48 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                                        <div className="h-3 w-20 bg-slate-100 dark:bg-gray-800 rounded animate-pulse" />
                                                    </div>
                                                </div>
                                                <div className="text-right space-y-2">
                                                    <div className="h-4 w-16 bg-slate-200 dark:bg-gray-700 rounded animate-pulse ml-auto" />
                                                    <div className="h-3 w-14 bg-slate-100 dark:bg-gray-800 rounded animate-pulse ml-auto" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column (Credit Packages) */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="size-4 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                    <div className="h-4 w-24 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                </div>

                                {/* Package Cards */}
                                {[
                                    { credits: "10", price: "99" },
                                    { credits: "35", price: "249", bonus: true },
                                    { credits: "85", price: "499", popular: true, bonus: true },
                                    { credits: "190", price: "999", bonus: true }
                                ].map((pkg, i) => (
                                    <div
                                        key={i}
                                        className={`relative p-5 rounded-xl bg-white dark:bg-gray-800 border ${pkg.popular ? 'border-slate-300 dark:border-gray-600' : 'border-slate-200 dark:border-gray-700'} shadow-sm`}
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <div className="flex items-baseline gap-1.5 mb-1">
                                                    <div className="h-7 w-8 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                                    <div className="h-4 w-12 bg-slate-100 dark:bg-gray-800 rounded animate-pulse" />
                                                </div>
                                                <div className="h-3 w-16 bg-slate-100 dark:bg-gray-800 rounded animate-pulse" />
                                            </div>
                                            <div className="h-8 w-20 bg-slate-100 dark:bg-gray-800 rounded-lg animate-pulse" />
                                        </div>

                                        {pkg.bonus && (
                                            <div className="h-5 w-28 bg-slate-200 dark:bg-gray-700 rounded-full animate-pulse mt-2" />
                                        )}

                                        {pkg.popular && (
                                            <div className="absolute -top-3 right-4 h-6 w-20 bg-slate-300 dark:bg-gray-600 rounded-full animate-pulse" />
                                        )}
                                    </div>
                                ))}
                            </div>

                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
