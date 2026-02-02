"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCreativeBuilder } from '../layout';
import {
    Upload,
    Link as LinkIcon,
    CheckCircle2,
    Plus,
    Sparkles,
    ArrowRight
} from 'lucide-react';

// --- Animation Variants ---
const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.1 } }
};

export default function UploadPage() {
    const router = useRouter();
    const {
        uploadedImage,
        setUploadedImage,
        demoState,
        setDemoState,
        showUploadError,
        setShowUploadError
    } = useCreativeBuilder();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUploadedImage(imageUrl);
        }
    };

    const handleUpload = () => {
        router.push('/creative-builder/goals');
    };

    return (
        <motion.div
            key="upload"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full flex-1 flex flex-col justify-center"
        >
            <div className="w-full max-w-5xl mx-auto space-y-3 lg:space-y-4">
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-teal-500 rounded-full" />
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Upload Product Image</h2>
                    <span className="ml-auto text-[10px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">Supported: JPG, PNG, WEBP</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch justify-center">
                    {/* Upload Area */}
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`lg:col-span-5 lg:col-start-2 group relative cursor-pointer backdrop-blur-xl rounded-[2rem] p-6 border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden shadow-sm hover:shadow-md h-[280px] ${showUploadError && !uploadedImage
                            ? 'border-red-500 animate-[shake_0.3s_ease-in-out] bg-red-50 dark:bg-red-900/10'
                            : 'bg-white dark:bg-[#1e293b]/40 border-teal-500/30 hover:border-teal-500'
                            }`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {uploadedImage ? (
                            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-2">
                                <img src={uploadedImage} className="w-full h-full object-contain rounded-xl shadow-sm" alt="Preview" />
                                <div className="absolute bottom-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-teal-600 rounded-full text-[9px] font-bold uppercase tracking-widest border border-teal-500/20 shadow-sm">
                                    Image Selected
                                </div>
                            </div>
                        ) : (
                            <div className="relative z-10 space-y-6">
                                <div className="w-16 h-16 bg-teal-50 bg-opacity-50 dark:bg-teal-500/10 rounded-[1.25rem] flex items-center justify-center text-teal-500 dark:text-teal-400 mx-auto transform group-hover:scale-110 transition-all duration-300">
                                    <Upload className="w-7 h-7" strokeWidth={2.5} />
                                </div>
                                <div className="space-y-1.5">
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Click to upload</h3>
                                    <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">or drag and drop your file here</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-5 flex flex-col gap-3">
                        {/* Option Cards */}
                        <div
                            onClick={() => setDemoState((prev: any) => ({ ...prev, urlConnected: !prev.urlConnected }))}
                            className={`backdrop-blur-xl p-5 rounded-[2rem] border transition-all duration-300 cursor-pointer group ${demoState.urlConnected
                                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 shadow-md'
                                : 'bg-white dark:bg-[#1e293b]/40 border-slate-200 dark:border-slate-700/50 hover:border-teal-500/30'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-12 ${demoState.urlConnected ? 'bg-blue-500 text-white' : 'bg-blue-500/10 text-blue-600'}`}>
                                    {demoState.urlConnected ? <CheckCircle2 className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                                </div>
                                <div className="flex-1 text-left">
                                    <h4 className={`font-black text-sm tracking-tight ${demoState.urlConnected ? 'text-blue-700 dark:text-blue-300' : 'text-slate-900 dark:text-white'}`}>Paste Product URL <span className="text-slate-400 font-normal ml-1">(Optional)</span></h4>
                                    <p className="text-slate-400 text-[10px] mt-0.5">Import from Shopify, Amazon...</p>
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() => setDemoState((prev: any) => ({ ...prev, brandAssetsConnected: !prev.brandAssetsConnected }))}
                            className={`backdrop-blur-xl p-5 rounded-[2rem] border transition-all duration-300 cursor-pointer group ${showUploadError && !demoState.brandAssetsConnected
                                ? 'border-red-500 animate-[shake_0.3s_ease-in-out] bg-red-50 dark:bg-red-900/10'
                                : demoState.brandAssetsConnected
                                    ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-500 shadow-md'
                                    : 'bg-white dark:bg-[#1e293b]/40 border-slate-200 dark:border-slate-700/50 hover:border-teal-500/30'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-12 ${demoState.brandAssetsConnected ? 'bg-amber-500 text-white' : 'bg-amber-500/10 text-amber-600'}`}>
                                    {demoState.brandAssetsConnected ? <CheckCircle2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                </div>
                                <div className="flex-1 text-left">
                                    <h4 className={`font-black text-sm tracking-tight ${demoState.brandAssetsConnected ? 'text-amber-700 dark:text-amber-300' : 'text-slate-900 dark:text-white'}`}>Add Brand Assets</h4>
                                    <p className="text-slate-400 text-[10px] mt-0.5">Logo, brand colors, and fonts</p>
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() => setDemoState((prev: any) => ({ ...prev, productNameAdded: !prev.productNameAdded }))}
                            className={`backdrop-blur-xl p-5 rounded-[2rem] border transition-all duration-300 cursor-pointer group ${showUploadError && !demoState.productNameAdded
                                ? 'border-red-500 animate-[shake_0.3s_ease-in-out] bg-red-50 dark:bg-red-900/10'
                                : demoState.productNameAdded
                                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 shadow-md'
                                    : 'bg-white dark:bg-[#1e293b]/40 border-slate-200 dark:border-slate-700/50 hover:border-teal-500/30'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-12 ${demoState.productNameAdded ? 'bg-emerald-500 text-white' : 'bg-emerald-500/10 text-emerald-600'}`}>
                                    {demoState.productNameAdded ? <CheckCircle2 className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                                </div>
                                <div className="flex-1 text-left">
                                    <h4 className={`font-black text-sm tracking-tight ${demoState.productNameAdded ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-900 dark:text-white'}`}>Product Name</h4>
                                    <p className="text-slate-400 text-[10px] mt-0.5">Add a name for better targeting</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-end mt-1">
                <button
                    onClick={() => {
                        // Validation - URL is now optional
                        if (!uploadedImage || !demoState.brandAssetsConnected || !demoState.productNameAdded) {
                            setShowUploadError(true);
                            setTimeout(() => setShowUploadError(false), 500);
                            return;
                        }
                        handleUpload();
                    }}
                    className="group relative flex items-center gap-2 bg-[#1A1A1A] text-white px-8 py-3 rounded-full font-medium text-sm overflow-hidden ring-1 ring-white/10 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70"></div>
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-black/40 to-transparent"></div>
                    <span className="relative z-10 flex items-center gap-2">
                        Next Step
                        <ArrowRight className="w-4 h-4 text-white transition-opacity" />
                    </span>
                </button>
            </div>
        </motion.div>
    );
}
