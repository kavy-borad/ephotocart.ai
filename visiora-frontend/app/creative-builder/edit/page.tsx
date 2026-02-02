"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCreativeBuilder } from '../layout';
import {
    Type,
    Palette,
    Layout as LayoutIcon,
    Sparkles,
    ArrowRight,
    ArrowLeft,
    ChevronDown,
    Copy
} from 'lucide-react';

// --- Animation Variants ---
const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.1 } }
};

// --- Default Concept ---
const DEFAULT_CONCEPT = {
    id: 1,
    headline: 'Elevate Your Style',
    cta: 'Shop Now',
    score: 98,
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
};

export default function EditPage() {
    const router = useRouter();
    const {
        selectedConcept,
        showCaptionModal,
        setShowCaptionModal
    } = useCreativeBuilder();

    const concept = selectedConcept || DEFAULT_CONCEPT;

    // Caption Modal State
    const [captionTone, setCaptionTone] = useState('Professional');
    const [generatedCaption, setGeneratedCaption] = useState('');
    const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);

    const handleGoBack = () => {
        router.push('/creative-builder/goals');
    };

    const handleGenerateFinal = () => {
        router.push('/creative-builder/export');
    };

    const generateCaption = async () => {
        setIsGeneratingCaption(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        const captions = [
            "✨ Elevate your everyday look with premium style. #Fashion #Style #Premium",
            "🔥 Limited time: Transform your wardrobe today! #OOTD #FashionTrends #Sale",
            "💫 Quality meets style. Shop the new collection now. #NewArrivals #Luxury #ShopNow",
        ];
        setGeneratedCaption(captions[Math.floor(Math.random() * captions.length)]);
        setIsGeneratingCaption(false);
    };

    return (
        <>
            <motion.div
                key="editor"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full h-full flex flex-col"
            >
                <div className="flex-1 min-h-0 flex flex-col items-center justify-start w-full max-w-[1200px] mx-auto p-4 pt-20">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

                        {/* Card 1: Brand & Visual Settings (Merged) */}
                        <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 border border-slate-200 dark:border-gray-700 shadow-xl space-y-8 flex flex-col h-full">

                            {/* Brand Settings Section */}
                            <div className="space-y-4">
                                <label className="text-sm font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-gray-700 pb-2 block">Brand Settings</label>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <span className="font-bold text-xs text-slate-700 dark:text-gray-200">Headline</span>
                                        <textarea
                                            className="w-full bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl p-3 text-sm focus:border-teal-500 focus:ring-0 transition-all outline-none font-medium text-slate-600 dark:text-gray-300 min-h-[80px] resize-none"
                                            rows={2}
                                            value={generatedCaption || concept?.headline || "Elevate Your Style"}
                                            onChange={(e) => setGeneratedCaption(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="font-bold text-xs text-slate-700 dark:text-gray-200">CTA Label</span>
                                        <input className="w-full bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl p-3 text-sm focus:border-teal-500 focus:ring-0 outline-none font-medium text-slate-600 dark:text-gray-300" defaultValue={concept?.cta || "Shop Now"} />
                                    </div>
                                </div>
                            </div>

                            {/* Visual Styles Section (Integrated as Categories) */}
                            <div className="space-y-4 flex-1">
                                <label className="text-sm font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-gray-700 pb-2 block">Visual Styles</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-left hover:border-teal-500 transition-all group w-full">
                                        <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"><Palette className="w-4 h-4 text-teal-500" /></div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-700 dark:text-gray-200">Colors</span>
                                            <span className="text-[10px] text-slate-400">Custom Palette</span>
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-slate-400 ml-auto" />
                                    </button>
                                    <button className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-left hover:border-teal-500 transition-all group w-full">
                                        <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"><Type className="w-4 h-4 text-teal-500" /></div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-700 dark:text-gray-200">Fonts</span>
                                            <span className="text-[10px] text-slate-400">Typography</span>
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-slate-400 ml-auto" />
                                    </button>
                                    <button className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-left hover:border-teal-500 transition-all group w-full">
                                        <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"><LayoutIcon className="w-4 h-4 text-teal-500" /></div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-700 dark:text-gray-200">Overlay</span>
                                            <span className="text-[10px] text-slate-400">Layouts</span>
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-slate-400 ml-auto" />
                                    </button>
                                    <button className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-left hover:border-teal-500 transition-all group w-full">
                                        <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"><Sparkles className="w-4 h-4 text-teal-500" /></div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-700 dark:text-gray-200">AI Filter</span>
                                            <span className="text-[10px] text-slate-400">Effects</span>
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-slate-400 ml-auto" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Smart Caption (Large) */}
                        <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 border border-slate-200 dark:border-gray-700 shadow-xl flex flex-col h-full">
                            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-gray-700 pb-4 mb-4">
                                <span className="p-2 bg-teal-50 dark:bg-teal-900/20 rounded-lg"><Sparkles className="w-5 h-5 text-teal-500" /></span>
                                <div>
                                    <label className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest block">Smart Caption</label>
                                    <span className="text-xs text-slate-400 font-medium">Generate viral captions with AI</span>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col gap-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Tone & Style</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['Storyteller', 'Professional', 'Sales', 'Viral', 'Casual', 'Luxury'].map((tone) => (
                                            <button key={tone} onClick={() => setCaptionTone(tone)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${captionTone === tone ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md transform scale-105' : 'bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-600 text-slate-500 hover:border-teal-300'}`}>{tone}</button>
                                        ))}
                                    </div>
                                </div>

                                <button onClick={generateCaption} disabled={isGeneratingCaption} className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-2xl font-bold text-sm shadow-lg hover:shadow-emerald-500/30 transform active:scale-95 transition-all flex items-center justify-center gap-3 group">
                                    {isGeneratingCaption ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating Magic...</> : <><Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Generate Caption & Hashtags</>}
                                </button>

                                <div className="flex-1 bg-slate-50 dark:bg-gray-900/50 rounded-2xl p-5 border border-slate-200 dark:border-gray-700 overflow-hidden flex flex-col">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Generated Result</span>
                                        {generatedCaption && <button onClick={() => navigator.clipboard.writeText(generatedCaption)} className="text-[10px] font-bold text-teal-500 hover:text-teal-600 flex items-center gap-1"><Copy className="w-3 h-3" /> Copy</button>}
                                    </div>
                                    <div className="flex-1 overflow-y-auto">
                                        {generatedCaption ? (
                                            <div className="space-y-2 animate-in fade-in duration-500">
                                                <p className="text-sm font-medium text-slate-700 dark:text-gray-300 leading-relaxed">{generatedCaption.split('#')[0]}</p>
                                                <div className="flex flex-wrap gap-1.5 pt-2">
                                                    {generatedCaption.match(/#[a-zA-Z0-9]+/g)?.map((tag, i) => (
                                                        <span key={i} className="text-xs bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400 px-2 py-1 rounded-md border border-slate-200 dark:border-gray-600 font-semibold">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2 opacity-60">
                                                <Sparkles className="w-8 h-8" />
                                                <span className="text-xs italic">Select a tone and click generate...</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer Buttons - Scrollable & Full Width */}
                    <div className="w-screen ml-[calc(50%-50vw)] ml-4 mr-4 flex items-center justify-between py-4 mt-4 px-6 sm:px-12">
                        <button
                            onClick={handleGoBack}
                            className="py-3 px-8 flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium text-sm hover:text-slate-900 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            <ArrowLeft className="w-4 h-4" /><span>Back</span>
                        </button>
                        <button
                            onClick={handleGenerateFinal}
                            className="group px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2"
                        >
                            <span>Next Step</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </motion.div>


        </>
    );
}
