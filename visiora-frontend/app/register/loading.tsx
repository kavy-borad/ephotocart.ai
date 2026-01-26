export default function Loading() {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-white dark:bg-slate-900">
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-700 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
        </div>
    );
}
