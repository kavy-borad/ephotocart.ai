"use client";

import React, { useState } from 'react';
import { Sidebar, Header } from '@/components/layout';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Upload } from 'lucide-react';

export default function CreativeBuilderPage() {
    // Hardcoded states matching typical app shell requirements
    const [balance, setBalance] = useState(0);
    const [freeCredits, setFreeCredits] = useState(0);

    return (
        <div className="h-full flex overflow-x-hidden bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Sidebar */}
            <Sidebar activeNav="creative-builder" />

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-slate-50 dark:bg-gray-900">
                {/* Header */}
                <Header
                    breadcrumbs={[
                        { label: "Home", href: "/?view=landing" },
                        { label: "Ads Creative Builder" }
                    ]}
                    freeCredits={freeCredits}
                    balance={balance}
                />

                {/* Content Area */}
                <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-2xl"
                    >
                        <div className="relative group cursor-pointer w-full">

                            {/* Card Container */}
                            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-12 sm:p-16 border-2 border-dashed border-slate-200 dark:border-gray-700 hover:border-teal-500/50 dark:hover:border-teal-500/50 hover:bg-slate-50/50 dark:hover:bg-gray-800/50 transition-all duration-300 flex flex-col items-center justify-center text-center group-hover:shadow-[0_0_40px_-10px_rgba(20,184,166,0.15)]">

                                {/** Icon Visual **/}
                                <div className="mb-8 relative transition-transform duration-300 group-hover:-translate-y-1">
                                    <div className="w-20 h-20 bg-teal-50 dark:bg-teal-900/20 rounded-2xl flex items-center justify-center text-teal-600 dark:text-teal-400 mb-4 mx-auto shadow-sm group-hover:shadow-md transition-all">
                                        <ImageIcon className="w-10 h-10" strokeWidth={1.5} />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 p-1.5 rounded-lg shadow-sm border border-slate-100 dark:border-gray-700 text-teal-600 dark:text-teal-400">
                                        <Upload className="w-4 h-4" />
                                    </div>
                                </div>

                                {/** Typography **/}
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                    Upload Creative Assets
                                </h2>
                                <p className="text-slate-500 dark:text-gray-400 mb-8 max-w-sm text-sm leading-relaxed">
                                    Drag and drop high-quality images here, or <span className="text-teal-600 dark:text-teal-400 font-semibold underline decoration-2 decoration-teal-100 dark:decoration-teal-900 underline-offset-2 hover:decoration-teal-500 transition-all">browse</span> from your computer.
                                </p>

                                {/** Primary Action **/}
                                <button className="px-8 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-slate-900 rounded-xl font-semibold shadow-lg shadow-slate-900/10 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3">
                                    <Upload className="w-4 h-4" />
                                    <span>Select Image</span>
                                </button>

                                {/** Tech Specs **/}
                                <div className="mt-10 flex items-center justify-center gap-6 text-[10px] font-bold text-slate-400 dark:text-gray-600 uppercase tracking-widest opacity-80">
                                    <span>PNG</span>
                                    <span>JPG</span>
                                    <span>WEBP</span>
                                    <span className="text-slate-300 dark:text-gray-700">•</span>
                                    <span>Max 10MB</span>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
