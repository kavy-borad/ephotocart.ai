"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useEffect } from "react";

interface ImageGenerationLoaderProps {
    isLoading: boolean;
    text?: string;
}

export default function ImageGenerationLoader({
    isLoading,
    text = "Generating your images...",
}: ImageGenerationLoaderProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const bgVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isLoading) {
            if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(() => { });
            }
            if (bgVideoRef.current) {
                bgVideoRef.current.currentTime = 0;
                bgVideoRef.current.play().catch(() => { });
            }
        } else {
            if (videoRef.current) videoRef.current.pause();
            if (bgVideoRef.current) bgVideoRef.current.pause();
        }
    }, [isLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[99999] bg-black overflow-hidden flex flex-col items-center justify-center"
                >
                    {/* Layer 1: Blurred Background Video (Fills screen) */}
                    <div className="absolute inset-0 z-0 opacity-40">
                        <video
                            ref={bgVideoRef}
                            src="/large-thumbnail20250702-1771823-y6blol.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover blur-3xl scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
                    </div>

                    {/* Layer 2: Sharp Center Video (Main Focus) */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10 w-full max-w-[500px] aspect-[9/16] md:aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10"
                    >
                        <video
                            ref={videoRef}
                            src="/large-thumbnail20250702-1771823-y6blol.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-contain bg-black"
                        />
                    </motion.div>

                    {/* Text & Loader */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="relative z-20 mt-8 flex flex-col items-center gap-4"
                    >
                        <p className="text-sm font-medium text-white/90 tracking-[0.2em] uppercase text-shadow-sm">
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
