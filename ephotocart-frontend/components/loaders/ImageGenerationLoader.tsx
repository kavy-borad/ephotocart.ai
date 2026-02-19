"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface ImageGenerationLoaderProps {
    isLoading: boolean;
    text?: string;
}

const Sparkle = ({
    size = 40,
    delay = 0,
    className = "",
    style = {},
}: {
    size?: number;
    delay?: number;
    className?: string;
    style?: React.CSSProperties;
}) => {
    return (
        <motion.div
            className={`absolute ${className}`}
            style={{
                ...style,
                width: size,
                height: size,
            }}
            initial={{ opacity: 0, scale: 0, rotate: -10 }}
            animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.2, 1, 0],
                rotate: [-10, 0, 10, 20], // Subtle rotation for 3D feel
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1],
                delay: delay,
                repeatDelay: 0.5,
            }}
        >
            {/* 3D Glow Back layer */}
            <div
                className="absolute inset-0 bg-white rounded-full blur-[8px] opacity-60"
                style={{ transform: 'scale(0.6)' }}
            />

            <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10"
                style={{ filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))" }}
            >
                <defs>
                    <radialGradient id={`grad-${delay}`} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="white" stopOpacity="1" />
                        <stop offset="60%" stopColor="#f0f9ff" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.8" />
                    </radialGradient>
                </defs>
                <path
                    d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                    fill={`url(#grad-${delay})`}
                    stroke="white"
                    strokeWidth="0.5"
                    strokeOpacity="0.5"
                />
            </svg>
        </motion.div>
    );
};

export default function ImageGenerationLoader({
    isLoading,
    text = "Generating your images...",
}: ImageGenerationLoaderProps) {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black"
                    style={{ isolation: 'isolate', perspective: '1000px' }}
                >
                    {/* Ambient Background Glow */}
                    <motion.div
                        animate={{ opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"
                    />

                    <div className="relative flex items-center justify-center w-64 h-64 transform-style-3d">
                        {/* Small Sparkle - Appears first */}
                        <Sparkle
                            size={32}
                            delay={0}
                            className="text-white z-10"
                            style={{ top: "35%", left: "25%" }}
                        />

                        {/* Large Center Sparkle - Appears second */}
                        <Sparkle
                            size={84}
                            delay={0.6}
                            className="text-white z-20"
                            style={{ top: "30%", left: "40%" }}
                        />

                        {/* Medium Sparkle - Appears third */}
                        <Sparkle
                            size={56}
                            delay={1.2}
                            className="text-white z-15"
                            style={{ bottom: "30%", right: "20%" }}
                        />

                        {/* Tiny Accent Sparkle - Appears fourth */}
                        <Sparkle
                            size={28}
                            delay={1.8}
                            className="text-white z-5"
                            style={{ top: "25%", right: "35%" }}
                        />
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="mt-12 text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-[0.2em] uppercase"
                    >
                        {text}
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
