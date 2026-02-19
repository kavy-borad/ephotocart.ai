"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Image as ImageIcon } from "lucide-react";

interface LoginVisualsProps {
    beforeImage1: string;
    afterImage1: string;
    beforeImage2: string;
    afterImage2: string;
}

export default function LoginVisuals({ beforeImage1, afterImage1, beforeImage2, afterImage2 }: LoginVisualsProps) {
    const [active1, setActive1] = useState<'original' | 'result'>('result');
    const [active2, setActive2] = useState<'original' | 'result'>('result');

    return (
        <div className="relative w-full h-full min-h-[600px] flex items-center justify-center p-4 overflow-hidden bg-slate-50/50 dark:bg-slate-900/50">
            {/* Background blobs for depth */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-[80px]" />

            <div className="relative w-full max-w-lg aspect-[3/4]">

                {/* --- PAIR 1: Red Top (Top Left) --- */}
                <div className="absolute top-0 left-0 w-[65%] aspect-[3/4] z-10">
                    {/* Raw 1 */}
                    <motion.div
                        onClick={() => setActive1('original')}
                        initial={{ opacity: 0, y: -20, rotate: -4 }}
                        animate={{
                            opacity: active1 === 'original' ? 1 : 0.8,
                            scale: active1 === 'original' ? 1.05 : 0.95,
                            zIndex: active1 === 'original' ? 30 : 10,
                            y: 0, // Keep initial position animation
                            x: 0,
                            rotate: -4,
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className="absolute top-0 left-0 w-[90%] h-[90%] bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden cursor-pointer"
                    >
                        <div className="absolute top-2 left-2 z-20 px-2 py-0.5 bg-slate-900/10 dark:bg-white/10 backdrop-blur rounded-full">
                            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200">Original</span>
                        </div>
                        <Image src={beforeImage1} alt="Original 1" fill className="object-cover" />
                    </motion.div>

                    {/* Result 1 (Overlapping) */}
                    <motion.div
                        onClick={() => setActive1('result')}
                        initial={{ opacity: 0, x: 20, y: 20, rotate: 2 }}
                        animate={{
                            opacity: active1 === 'result' ? 1 : 0.8,
                            scale: active1 === 'result' ? 1.05 : 0.95,
                            zIndex: active1 === 'result' ? 30 : 10,
                            x: 0, // Keep initial position animation
                            y: 0,
                            rotate: 2,
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className="absolute bottom-0 right-0 w-[90%] h-[90%] bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 border-white dark:border-slate-600 overflow-hidden cursor-pointer"
                    >
                        <div className="absolute top-2 right-2 z-20 px-2 py-0.5 bg-emerald-500/90 backdrop-blur rounded-full shadow-sm">
                            <span className="text-[10px] font-bold text-white flex items-center gap-1"><Sparkles className="w-2 h-2" /> AI</span>
                        </div>
                        <Image src={afterImage1} alt="Result 1" fill className="object-cover" />
                    </motion.div>
                </div>


                {/* --- PAIR 2: Plaid Shirt (Bottom Right) --- */}
                <div className="absolute bottom-4 right-0 w-[65%] aspect-[3/4] z-20">
                    {/* Raw 2 */}
                    <motion.div
                        onClick={() => setActive2('original')}
                        initial={{ opacity: 0, y: 20, rotate: -2 }}
                        animate={{
                            opacity: active2 === 'original' ? 1 : 0.8,
                            scale: active2 === 'original' ? 1.05 : 0.95,
                            zIndex: active2 === 'original' ? 30 : 10,
                            y: 0, // Keep initial position animation
                            x: 0,
                            rotate: -2,
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className="absolute top-0 left-0 w-[90%] h-[90%] bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden cursor-pointer"
                    >
                        <div className="absolute top-2 left-2 z-20 px-2 py-0.5 bg-slate-900/10 dark:bg-white/10 backdrop-blur rounded-full">
                            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200">Original</span>
                        </div>
                        <Image src={beforeImage2} alt="Original 2" fill className="object-cover" />
                    </motion.div>

                    {/* Result 2 (Overlapping) */}
                    <motion.div
                        onClick={() => setActive2('result')}
                        initial={{ opacity: 0, x: 20, y: 20, rotate: 4 }}
                        animate={{
                            opacity: active2 === 'result' ? 1 : 0.8,
                            scale: active2 === 'result' ? 1.05 : 0.95,
                            zIndex: active2 === 'result' ? 30 : 10,
                            x: 0, // Keep initial position animation
                            y: 0,
                            rotate: 4,
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className="absolute bottom-0 right-0 w-[90%] h-[90%] bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 border-white dark:border-slate-600 overflow-hidden cursor-pointer"
                    >
                        <div className="absolute top-2 right-2 z-20 px-2 py-0.5 bg-emerald-500/90 backdrop-blur rounded-full shadow-sm">
                            <span className="text-[10px] font-bold text-white flex items-center gap-1"><Sparkles className="w-2 h-2" /> AI</span>
                        </div>
                        <Image src={afterImage2} alt="Result 2" fill className="object-cover" />
                    </motion.div>
                </div>

            </div>
        </div>
    );

}
