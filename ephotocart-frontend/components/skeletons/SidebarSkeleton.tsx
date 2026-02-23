"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Sparkles, Image, Wallet, Settings, Wand2 } from "lucide-react";
import { SidebarContext } from "@/components/layout/SidebarContext";
import { useContext } from "react";

interface SidebarSkeletonProps {
    activeNav?: string;
}

const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "generate", label: "Generate Image", icon: Sparkles },
    { id: "gallery", label: "My Gallery", icon: Image },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "creative-builder", label: "Ads Creative", icon: Wand2 },
    { id: "settings", label: "Settings", icon: Settings },
];

export default function SidebarSkeleton({ activeNav = "dashboard" }: SidebarSkeletonProps) {
    const context = useContext(SidebarContext);
    // Force open (pinned) state for the skeleton so it always appears full-width as requested
    const isOpen = true;

    return (
        <motion.aside
            className="h-full hidden lg:flex flex-col bg-white dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 z-30 shrink-0 shadow-sm relative overflow-hidden"
            initial={false}
            animate={{ width: isOpen ? 210 : 72 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            {/* Logo Section */}
            <div className="h-16 flex items-center shrink-0 pl-3.5 relative">
                <div className="flex items-center gap-3 overflow-hidden">
                    {/* Logo Image Skeleton */}
                    <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200 dark:bg-gray-700 animate-pulse" />

                    {/* Logo Text Skeleton */}
                    <motion.div
                        initial={false}
                        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute left-16"
                    >
                        {isOpen && (
                            <div className="h-6 w-24 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-hidden">
                {navItems.map((item) => {
                    const isActive = activeNav === item.id;
                    return (
                        <div
                            key={item.id}
                            className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 whitespace-nowrap overflow-hidden ${isActive
                                ? "bg-slate-100 dark:bg-slate-800 shadow-sm"
                                : "hover:bg-slate-50 dark:hover:bg-gray-800"
                                }`}
                        >
                            {/* Icon Skeleton */}
                            <div className={`w-5 h-5 shrink-0 rounded ${isActive
                                ? "bg-slate-300 dark:bg-slate-600"
                                : "bg-slate-200 dark:bg-gray-700 animate-pulse"
                                }`} />

                            {/* Label Skeleton */}
                            <motion.div
                                className="overflow-hidden"
                                initial={false}
                                animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? "auto" : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isOpen && (
                                    <div className={`h-4 rounded ${isActive
                                        ? "w-24 bg-slate-300 dark:bg-slate-500"
                                        : "w-20 bg-slate-200 dark:bg-gray-700 animate-pulse"
                                        }`} />
                                )}
                            </motion.div>
                        </div>
                    );
                })}
            </nav>

            {/* New Generation Button Skeleton */}
            <div className={`mt-auto transition-all duration-300 ${isOpen ? 'px-5 py-4' : 'p-4'}`}>
                <div className={`w-full rounded-xl h-10 bg-slate-200 dark:bg-gray-700 animate-pulse ${isOpen ? '' : 'aspect-square'}`} />
            </div>
        </motion.aside>
    );
}
