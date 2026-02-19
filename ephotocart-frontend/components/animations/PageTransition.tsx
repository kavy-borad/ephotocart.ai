"use client";

import { motion } from "framer-motion";
import { usePageTransition } from "@/components/TransitionProvider";
import { ReactNode } from "react";

interface PageTransitionProps {
    children: ReactNode;
    className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
    const { isTransitioning } = usePageTransition();

    return (
        <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={
                !isTransitioning
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 12, filter: "blur(4px)" }
            }
            transition={{
                duration: 0.5,
                ease: [0.2, 0.65, 0.3, 0.9], // Comfortable ease-out
                delay: 0.1 // Slight delay to ensure skeleton is fully gone
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
