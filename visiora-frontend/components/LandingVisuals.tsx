"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";

// Standard pairs
const col1 = [
    {
        id: 5,
        raw: '/shirt-set-raw.jpg',
        ai: '/shirt-set-ai.jpg',
        aspect: 'aspect-[2/3]'
    },
    {
        id: 1,
        raw: '/suit-before.jpg',
        ai: '/suit-after.jpg',
        aspect: 'aspect-[2/3]'
    },
    {
        id: 6,
        raw: '/poncho-raw.jpg',
        ai: '/poncho-ai.jpg',
        aspect: 'aspect-[2/3]'
    }
];

const col2 = [
    {
        id: 3,
        raw: '/red-top-before-v2.jpg',
        ai: '/red-top-after.jpg',
        aspect: 'aspect-[2/3]'
    },
    {
        id: 2,
        raw: '/lehenga-before.jpg',
        ai: '/lehenga-after.jpg',
        aspect: 'aspect-[2/3]'
    },
    {
        id: 4,
        raw: '/plaid-before-v2.jpg',
        ai: '/plaid-after.jpg',
        aspect: 'aspect-[2/3]'
    }
];

export default function LandingVisuals() {
    return (
        <div className="w-full h-full relative p-4 flex justify-center gap-3 sm:gap-5 overflow-hidden masked-gradient">
            {/* Column 1 - Continuous Scroll Up */}
            <motion.div
                className="w-1/2 flex flex-col gap-5"
                initial={{ y: 0 }}
                animate={{ y: "-50%" }}
                transition={{
                    repeat: Infinity,
                    duration: 20,
                    ease: "linear"
                }}
            >
                {[...col1, ...col1].map((item, idx) => (
                    <GridItem key={`${item.id}-${idx}`} item={item} index={idx} />
                ))}
            </motion.div>

            {/* Column 2 - Continuous Scroll Down (Offset) */}
            <motion.div
                className="w-1/2 flex flex-col gap-5 pt-4"
                initial={{ y: "-50%" }}
                animate={{ y: 0 }}
                transition={{
                    repeat: Infinity,
                    duration: 25,
                    ease: "linear"
                }}
            >
                {[...col2, ...col2].map((item, idx) => (
                    <GridItem key={`${item.id}-${idx}`} item={item} index={idx + 2} />
                ))}
            </motion.div>
        </div>
    );
}

function GridItem({ item, index }: { item: any, index: number }) {
    const [showAi, setShowAi] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowAi(prev => !prev);
        }, 4000 + (index * 1500)); // Staggered toggle timing

        return () => clearInterval(interval);
    }, [index]);

    return (
        <div className={`relative w-full aspect-[2/3] min-h-[320px] rounded-2xl overflow-hidden bg-gray-200 dark:bg-slate-800 border border-white/40 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-black/40 group`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />

            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={showAi ? "ai" : "raw"}
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                >
                    {/* Image Container with Cover to look premium */}
                    <div className="relative w-full h-full">
                        <Image
                            src={showAi ? item.ai : item.raw}
                            alt={showAi ? "AI" : "Raw"}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Subtle Overlay to unify contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
                    </div>

                    {/* Minimal Badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                        <div className="flex flex-col">
                            {/* Caption could go here */}
                        </div>
                        {showAi ? (
                            <span className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold bg-white/90 text-teal-700 backdrop-blur-md rounded-full shadow-sm">
                                <Sparkles className="w-2.5 h-2.5" /> GENERATED
                            </span>
                        ) : (
                            <span className="px-2.5 py-1 text-[10px] font-bold bg-black/40 text-white backdrop-blur-md rounded-full border border-white/10">
                                ORIGINAL
                            </span>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
