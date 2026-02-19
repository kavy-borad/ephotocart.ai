"use client";

import { useRouter } from "next/navigation";
import { authApi } from "@/lib/auth";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { PublicNavbar } from "@/components/layout";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResultsPage() {
    const router = useRouter();

    // Handle "Try Now" click
    const handleTryClick = () => {
        if (authApi.isAuthenticated()) {
            router.push('/generate');
        } else {
            router.push('/login');
        }
    };

    const showcaseItems = [
        {
            id: 1,
            title: "Casual Collection",
            description: "Flat lay to lifestyle model",
            beforeImage: "/shirt-set-raw.jpg",
            afterImage: "/shirt-set-ai.jpg",
        },
        {
            id: 2,
            title: "Formal Wear",
            description: "Mannequin to studio professional",
            beforeImage: "/suit-before.jpg",
            afterImage: "/suit-after.jpg",
        },
        {
            id: 3,
            title: "Ethnic & Bridal",
            description: "Raw capture to cinematic shot",
            beforeImage: "/lehenga-before.jpg",
            afterImage: "/lehenga-after.jpg",
        },
        {
            id: 4,
            title: "Winter Fashion",
            description: "Ghost mannequin to creative editorial",
            beforeImage: "/poncho-raw.jpg",
            afterImage: "/poncho-ai.jpg",
        },
        {
            id: 5,
            title: "Urban Streetwear",
            description: "Studio lighting enhancement",
            beforeImage: "/plaid-before-v2.jpg",
            afterImage: "/plaid-after.jpg",
        },
        {
            id: 6,
            title: "Essential Tops",
            description: "Wrinkle removal and professional retouch",
            beforeImage: "/red-top-before-v2.jpg",
            afterImage: "/red-top-after.jpg",
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % showcaseItems.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [showcaseItems.length]);

    const visibleItems = showcaseItems.slice(activeIndex * 3, (activeIndex * 3) + 3);

    return (
        <div className="min-h-screen lg:h-screen w-full lg:overflow-hidden overflow-x-hidden bg-slate-100 dark:bg-gray-800 text-slate-900 dark:text-gray-100 antialiased flex flex-col transition-colors duration-300">
            {/* Google Material Icons */}
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                rel="stylesheet"
            />
            <style>{`
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
            `}</style>

            <PublicNavbar activePage="results" />

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center overflow-y-auto lg:overflow-hidden">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="shrink-0 flex w-full flex-col items-center pt-14 sm:pt-16 pb-3 sm:pb-4 px-4 md:px-10"
                >
                    <div className="flex flex-col items-center max-w-[960px] text-center gap-2">
                        {/* Headline */}
                        <div className="relative">
                            <h1 className="text-slate-900 dark:text-white tracking-tight text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.1]">
                                Actual Results
                            </h1>
                            <div className="h-0.5 w-12 sm:w-16 bg-teal-500 mx-auto rounded-full opacity-60 mt-1"></div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-500 dark:text-gray-400 text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-xl">
                            Transform raw flat-lays and ghost mannequins into high-conversion lifestyle imagery.
                        </p>
                    </div>
                </motion.div>

                {/* 3D Showcase Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative w-full max-w-[1280px] mx-auto flex-1 min-h-[500px] flex flex-col lg:block perspective-[1200px] overflow-visible"
                >
                    <div className="lg:absolute lg:inset-0 flex justify-center items-start">
                        <AnimatePresence mode="popLayout">
                            {showcaseItems.map((item, index) => {
                                // Calculate circular offset
                                const length = showcaseItems.length;
                                let diff = index - activeIndex;
                                if (diff > length / 2) diff -= length;
                                if (diff < -length / 2) diff += length;

                                // Determine position states
                                const isCenter = diff === 0;
                                const isLeft = diff === -1;
                                const isRight = diff === 1;
                                const isVisible = Math.abs(diff) <= 1;

                                {/* Desktop 3D Styles */ }
                                const desktopVariants = {
                                    center: { x: 0, scale: 1.15, zIndex: 50, opacity: 1, rotateY: 0, filter: "blur(0px)" },
                                    left: { x: -340, scale: 0.85, zIndex: 30, opacity: 0.8, rotateY: 30, filter: "blur(2px)" },
                                    right: { x: 340, scale: 0.85, zIndex: 30, opacity: 0.8, rotateY: -30, filter: "blur(2px)" },
                                    hidden: { x: 0, scale: 0, zIndex: 0, opacity: 0, rotateY: 0, filter: "blur(10px)" }
                                };

                                let variant = "hidden";
                                if (isCenter) variant = "center";
                                else if (isLeft) variant = "left";
                                else if (isRight) variant = "right";

                                return (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={false}
                                        animate={variant}
                                        variants={desktopVariants}
                                        transition={{ duration: 0.7, type: "spring", stiffness: 60, damping: 15 }}
                                        className={`absolute top-12 left-[36%] -translate-x-1/2 w-[340px] h-[380px] lg:flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-slate-100 dark:border-gray-700 hidden backface-hidden`}
                                    >
                                        <div className="shrink-0 flex justify-between items-center mb-3 px-1">
                                            <div className="bg-red-50 text-red-700 text-[9px] font-bold px-2.5 py-0.5 rounded-full tracking-wide">BEFORE</div>
                                            <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                                            <div className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2.5 py-0.5 rounded-full tracking-wide">AFTER</div>
                                        </div>

                                        <div className="flex gap-2 flex-1 min-h-0">
                                            <div className="flex-1 relative overflow-hidden rounded-lg bg-slate-50 dark:bg-gray-700 group">
                                                <div className="absolute inset-0 bg-center bg-cover transition-transform duration-700 hover:scale-110" style={{ backgroundImage: `url('${item.beforeImage}')` }} />
                                            </div>
                                            <div className="flex-1 relative overflow-hidden rounded-lg bg-slate-50 dark:bg-gray-700 group">
                                                <div className="absolute inset-0 bg-center bg-cover transition-transform duration-700 hover:scale-110" style={{ backgroundImage: `url('${item.afterImage}')` }} />
                                                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm p-1 rounded-full shadow-sm">
                                                    <Check className="w-3 h-3 text-teal-500" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="shrink-0 mt-4 px-1 text-center">
                                            <h3 className="text-slate-900 dark:text-white text-sm font-bold">{item.title}</h3>
                                            <p className="text-slate-500 dark:text-gray-400 text-xs mt-1">{item.description}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Mobile/Tablet Grid Fallback (non-3D) */}
                    <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 pb-20">
                        {showcaseItems.map((item) => (
                            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-gray-700 flex flex-col h-[280px]">
                                <div className="shrink-0 flex justify-between items-center mb-3">
                                    <div className="bg-red-50 text-red-700 text-[9px] font-bold px-2 py-0.5 rounded-full">BEFORE</div>
                                    <div className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-full">AFTER</div>
                                </div>
                                <div className="flex gap-2 flex-1 min-h-0">
                                    <div className="flex-1 relative rounded-lg overflow-hidden bg-slate-50"><div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url('${item.beforeImage}')` }} /></div>
                                    <div className="flex-1 relative rounded-lg overflow-hidden bg-slate-50"><div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url('${item.afterImage}')` }} /></div>
                                </div>
                                <div className="mt-3">
                                    <h3 className="text-slate-900 dark:text-white text-sm font-semibold">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Dots Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="hidden lg:flex justify-center gap-1.5 mt-4 mb-2"
                >
                    {showcaseItems.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? "w-6 bg-teal-500" : "w-1.5 bg-slate-200 dark:bg-gray-700 hover:bg-teal-200"}`}
                        />
                    ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="shrink-0 py-3 sm:py-4 flex justify-center"
                >
                    <button
                        onClick={handleTryClick}
                        className="flex items-center gap-2 text-slate-800 dark:text-gray-200 font-bold text-xs bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-600 hover:bg-teal-50/50 dark:hover:bg-teal-900/20 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all shadow-sm group"
                    >
                        <span>Try with your own photos</span>
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </main>
        </div>
    );
}
