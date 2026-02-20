"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Loader2,
    AlertCircle,
    CheckCircle,
    Mail,
    ArrowLeft,
    KeyRound,
} from "lucide-react";
import React, { useState } from "react";
import { authApi } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import Branding from "@/components/Branding";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const MorphLoopVisuals = dynamic(() => import("@/components/MorphLoopVisuals"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin"></div>
        </div>
    )
});

export default function ForgotPasswordPage() {
    const router = useRouter();
    const { theme } = useTheme();
    const isDarkMode = theme === "dark";

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setError("Please enter a valid email address.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await authApi.forgotPassword(email.trim());

            if (response.success) {
                setSuccess(true);
            } else {
                setError(response.error || "Something went wrong. Please try again.");
            }
        } catch (err: any) {
            setError(err?.message || "Network error. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen overflow-hidden flex flex-col lg:flex-row items-stretch bg-white dark:bg-slate-900">

            {/* Left Side - Visuals */}
            <div className="block w-full lg:w-[55%] h-[35%] lg:h-full shrink-0">
                <div className="w-full h-full overflow-hidden relative">
                    <MorphLoopVisuals />
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col items-center justify-start lg:justify-center p-4 sm:p-8 relative overflow-y-auto lg:overflow-visible">

                {/* Mobile Header */}
                <div className="w-full flex items-center justify-between mb-6 lg:hidden shrink-0">
                    <Branding />
                    <Link
                        href="/login"
                        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors p-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                    </Link>
                </div>

                {/* Desktop: Back to Login */}
                <Link
                    href="/login"
                    className="absolute top-6 left-6 hidden lg:flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors group"
                >
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span>Back to Sign In</span>
                </Link>

                <div className="w-full max-w-[380px] flex flex-col gap-5">

                    <AnimatePresence mode="wait">
                        {!success ? (
                            /* ─── FORM STATE ─── */
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col gap-5"
                            >
                                {/* Icon + Header */}
                                <div className="text-center flex flex-col items-center gap-3">
                                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center border border-emerald-100 dark:border-emerald-800/30">
                                        <KeyRound className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                            Forgot password?
                                        </h1>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                            Enter your email and we'll send you a reset link.
                                        </p>
                                    </div>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium ${isDarkMode
                                            ? "bg-red-900/20 border border-red-800/50 text-red-400"
                                            : "bg-red-50 border border-red-100 text-red-600"
                                            }`}
                                    >
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        <span>{error}</span>
                                    </motion.div>
                                )}

                                {/* Form */}
                                <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
                                    {/* Email Input */}
                                    <div className="space-y-1">
                                        <div className="relative group">
                                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                                            <input
                                                id="forgot-email"
                                                type="email"
                                                placeholder="Enter your email address"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                    if (error) setError("");
                                                }}
                                                disabled={isLoading}
                                                autoComplete="email"
                                                autoFocus
                                                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-11 mt-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl border border-transparent transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.98] text-sm"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            "Send Reset Link"
                                        )}
                                    </button>
                                </form>

                                {/* Back to Login */}
                                <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                                    Remember your password?{" "}
                                    <Link
                                        href="/login"
                                        className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 hover:underline transition-colors"
                                    >
                                        Sign in
                                    </Link>
                                </div>
                            </motion.div>
                        ) : (
                            /* ─── SUCCESS STATE ─── */
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="flex flex-col items-center gap-5 text-center"
                            >
                                {/* Success Icon */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                                    className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-700/40 flex items-center justify-center"
                                >
                                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                                </motion.div>

                                <div className="flex flex-col gap-2">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        Check your inbox!
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                        We've sent a password reset link to{" "}
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                                            {email}
                                        </span>
                                        . Please check your email and follow the instructions.
                                    </p>
                                </div>

                                {/* Info box */}
                                <div className={`w-full p-3 rounded-xl text-xs leading-relaxed ${isDarkMode
                                    ? "bg-slate-800/60 border border-slate-700/50 text-slate-400"
                                    : "bg-slate-50 border border-slate-200 text-slate-500"
                                    }`}>
                                    Didn't receive the email? Check your spam folder or{" "}
                                    <button
                                        onClick={() => setSuccess(false)}
                                        className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                                    >
                                        try again
                                    </button>
                                    .
                                </div>

                                <Link
                                    href="/login"
                                    className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20 hover:scale-[1.01] text-sm"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Sign In
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="w-full text-center text-[10px] text-slate-400 mt-2">
                        © 2026 ephotocart. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
}
