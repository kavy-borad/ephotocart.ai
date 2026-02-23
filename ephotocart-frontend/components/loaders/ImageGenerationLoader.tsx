"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../../public/loader.json";

interface ImageGenerationLoaderProps {
    isLoading: boolean;
    text?: string;
}

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
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[99999] bg-[#0A0D14]/95 overflow-hidden flex flex-col items-center justify-center backdrop-blur-md"
                >
                    {/* Layer 2: Sharp Center Lottie Animation (Main Focus) */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10 w-full max-w-[300px] md:max-w-[400px] flex items-center justify-center"
                    >
                        <Lottie
                            animationData={loaderAnimation}
                            loop={true}
                            autoplay={true}
                            className="w-full"
                        />
                    </motion.div>

                    {/* Text & Loader Indicator */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="relative z-20 mt-6 flex flex-col items-center gap-4"
                    >
                        <p className="text-sm font-medium text-white/90 tracking-[0.2em] uppercase drop-shadow-md">
                            {text}
                        </p>

                        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="w-full h-full bg-gradient-to-r from-transparent via-teal-400 to-transparent"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
