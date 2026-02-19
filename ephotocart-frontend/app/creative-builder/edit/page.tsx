"use client";

import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-teal-900/20 p-6">
            <div className="max-w-2xl w-full text-center space-y-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/25">
                    <Sparkles className="w-10 h-10 text-white" />
                </div>

                <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-teal-800 to-slate-900 dark:from-white dark:via-teal-300 dark:to-white">
                        Creative Builder
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300">
                        Coming Soon
                    </p>
                </div>

                <div className="max-w-md mx-auto space-y-4">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        We're working on an amazing ad creative builder tool. Create stunning ads with AI-powered templates, smart editing, and instant optimization.
                    </p>

                    <div className="pt-4">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Link>
                    </div>
                </div>

                <div className="pt-8 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                    <span>Feature under development</span>
                </div>
            </div>
        </div>
    );
}
