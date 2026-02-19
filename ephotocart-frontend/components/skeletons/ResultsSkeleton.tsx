"use client";

export function ResultsSkeleton() {
    return (
        <div className="min-h-screen lg:h-screen w-screen lg:overflow-hidden overflow-x-hidden bg-slate-50 dark:bg-gray-900 flex flex-col">
            {/* Public Navbar Menu */}
            <div className="shrink-0 border-b border-slate-200/60 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 relative w-full">
                <div className="px-4 sm:px-6 md:px-10 py-3 max-w-[1440px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-9 sm:h-10 w-9 sm:w-10 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                        <div className="h-5 w-20 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                    <div className="hidden lg:flex gap-8">
                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-4 w-20 bg-slate-200 dark:bg-gray-700/50 rounded animate-pulse" />)}
                    </div>
                    <div className="hidden lg:flex gap-3">
                        <div className="size-9 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                        <div className="h-9 w-20 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                        <div className="h-9 w-28 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                    </div>
                    <div className="lg:hidden size-9 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-4xl space-y-6">
                    <div className="h-8 w-48 bg-slate-200 dark:bg-gray-700 rounded animate-pulse mx-auto" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="aspect-square bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
