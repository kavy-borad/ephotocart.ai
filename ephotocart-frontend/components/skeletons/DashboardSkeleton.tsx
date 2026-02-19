"use client";

import { motion } from "framer-motion";

import { usePathname } from "next/navigation";

export function DashboardSkeleton() {
    const pathname = usePathname();

    // Safety check: Never ensure this skeleton shows on creative builder pages
    if (pathname?.includes('/creative-builder')) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen flex overflow-hidden bg-slate-100 dark:bg-gray-900 transition-colors duration-300"
        >
            {/* Sidebar Skeleton */}
            <aside className="w-64 2xl:w-[280px] h-full hidden lg:flex flex-col bg-white dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 shrink-0 shadow-sm">
                {/* Logo Area */}
                <div className="h-16 flex items-center px-6 shrink-0 border-b border-slate-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-slate-200 dark:bg-gray-700 animate-pulse" />
                        <div className="h-4 w-20 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                </div>

                {/* Nav Items */}
                <div className="flex-1 py-4 px-3 space-y-1">
                    {/* Active Item */}
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-100 dark:bg-gray-700/50">
                        <div className="size-5 bg-slate-200 dark:bg-gray-600 rounded animate-pulse" />
                        <div className="h-3.5 w-20 bg-slate-200 dark:bg-gray-600 rounded animate-pulse" />
                    </div>

                    {/* Other Nav Items */}
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                            <div className="size-5 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                            <div className="h-3.5 w-24 bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse" />
                        </div>
                    ))}

                    <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-gray-700">
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                            <div className="size-5 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                            <div className="h-3.5 w-20 bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Bottom Button */}
                <div className="p-3">
                    <div className="w-full h-11 bg-slate-200 dark:bg-gray-700 rounded-xl animate-pulse" />
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <main className="flex-1 flex flex-col min-w-0 h-full overflow-x-hidden lg:overflow-hidden bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
                {/* Header Skeleton */}
                <header className="h-16 border-b border-slate-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur flex items-center justify-between px-4 sm:px-6 shrink-0">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2">
                        <div className="h-3.5 w-10 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-3.5 w-3 bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse" />
                        <div className="h-3.5 w-16 bg-slate-300 dark:bg-gray-600 rounded animate-pulse" />
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        {/* Credits + Balance */}
                        <div className="hidden sm:flex items-center gap-2">
                            <div className="h-8 w-20 bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse" />
                            <div className="h-8 w-20 bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse" />
                        </div>
                        {/* Bell + User */}
                        <div className="size-8 rounded-full bg-slate-200 dark:bg-gray-700 animate-pulse" />
                        <div className="size-8 rounded-full bg-slate-100 dark:bg-gray-800 animate-pulse" />
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="flex-1 p-3 sm:p-4 overflow-y-auto lg:overflow-hidden">
                    <div className="flex flex-col gap-3 sm:gap-4 lg:h-full">

                        {/* Stats Cards (4 cols) */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 shrink-0">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="relative bg-white dark:bg-gray-800 p-3 rounded-2xl border border-slate-200 dark:border-gray-700 overflow-hidden animate-pulse">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col gap-0.5">
                                                <div className="h-2.5 w-20 bg-slate-200 dark:bg-gray-700 rounded" />
                                                <div className="h-6 w-12 bg-slate-800 dark:bg-white rounded mt-1" />
                                            </div>
                                            <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-gray-700" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Charts (2 cols, expands) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:flex-1 lg:min-h-0">
                            {/* Line Chart */}
                            <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-slate-200 dark:border-gray-700 flex flex-col h-[200px] sm:h-[220px] lg:h-full animate-pulse">
                                <div className="flex justify-between items-center mb-3 shrink-0">
                                    <div className="h-4 w-32 bg-slate-200 dark:bg-gray-700 rounded" />
                                    <div className="h-5 w-20 bg-slate-100 dark:bg-gray-700 rounded" />
                                </div>
                                <div className="flex-1 flex gap-2 min-h-0">
                                    {/* Y Axis */}
                                    <div className="w-6 flex flex-col justify-between py-1">
                                        {[1, 2, 3, 4, 5, 6].map(j => <div key={j} className="h-2 w-full bg-slate-100 dark:bg-gray-700/50 rounded" />)}
                                    </div>
                                    {/* Chart Body */}
                                    <div className="flex-1 flex flex-col justify-end border-l border-b border-slate-100 dark:border-gray-700/50 relative">
                                        <div className="absolute bottom-0 left-0 right-0 top-[40%] bg-slate-50 dark:bg-gray-700/20 rounded-tr-3xl" />
                                    </div>
                                </div>
                            </div>

                            {/* Bar Chart */}
                            <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-slate-200 dark:border-gray-700 flex flex-col h-[200px] sm:h-[220px] lg:h-full animate-pulse">
                                <div className="flex justify-between items-center mb-3 shrink-0">
                                    <div className="h-4 w-28 bg-slate-200 dark:bg-gray-700 rounded" />
                                    <div className="flex gap-2">
                                        <div className="h-3 w-10 bg-slate-100 dark:bg-gray-700 rounded" />
                                        <div className="h-3 w-10 bg-slate-100 dark:bg-gray-700 rounded" />
                                    </div>
                                </div>
                                <div className="flex-1 flex gap-2 min-h-0">
                                    {/* Y Axis */}
                                    <div className="w-6 flex flex-col justify-between py-1">
                                        {[1, 2, 3, 4, 5, 6].map(j => <div key={j} className="h-2 w-full bg-slate-100 dark:bg-gray-700/50 rounded" />)}
                                    </div>
                                    {/* Bars */}
                                    <div className="flex-1 flex items-end justify-between border-l border-b border-slate-100 dark:border-gray-700/50 px-2 pb-px gap-1">
                                        {[40, 60, 30, 80, 50, 70, 45].map((h, i) => (
                                            <div key={i} className="flex-1 flex flex-col gap-0.5 justify-end h-full">
                                                <div style={{ height: `${h * 0.4}%` }} className="w-full bg-slate-200 dark:bg-gray-700 rounded-t-sm" />
                                                <div style={{ height: `${h * 0.6}%` }} className="w-full bg-slate-100 dark:bg-gray-700/50 rounded-t-sm" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Generations */}
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-slate-200 dark:border-gray-700 animate-pulse shrink-0">
                            <div className="flex items-center justify-between mb-2">
                                <div className="h-4 w-32 bg-slate-200 dark:bg-gray-700 rounded" />
                                <div className="h-3 w-16 bg-slate-100 dark:bg-gray-800 rounded" />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-9 gap-2 sm:gap-4">
                                {[1, 2, 3, 4, 5, 6, 7].map(i => (
                                    <div key={i} className="aspect-square bg-slate-100 dark:bg-gray-700 rounded border border-slate-200 dark:border-gray-600" />
                                ))}
                                <div className="aspect-square bg-slate-50 dark:bg-gray-700/50 rounded border border-dashed border-slate-300 dark:border-gray-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </motion.div>
    );
}
