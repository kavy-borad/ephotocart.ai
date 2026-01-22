"use client";

import React, { useState } from "react";
import Link from "@/components/Link";
import { useRouter } from "@/components/useRouter";
import {
    Sparkles,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Loader2,
    AlertCircle,
    CheckCircle,
} from "lucide-react";
import { authApi } from "@/lib/auth";
import { AuthNavbar } from "@/components/layout";
import { useTheme } from "@/lib/theme";
import LoginVisuals from "@/components/LoginVisuals";

export default function LoginPage() {
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === 'dark';

    // Redirect to dashboard if already logged in
    React.useEffect(() => {
        if (authApi.isAuthenticated()) {
            router.replace("/dashboard");
        }
    }, [router]);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
        // Clear error when user starts typing
        if (error) setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validation
        if (!formData.email.trim()) {
            setError("Please enter your email");
            return;
        }
        if (!formData.password) {
            setError("Please enter your password");
            return;
        }

        setIsLoading(true);

        try {
            const response = await authApi.login({
                email: formData.email,
                password: formData.password,
            });

            if (response.success) {
                setSuccess("Login successful! Redirecting to dashboard...");
                // Token and user are already saved by authApi.login()
                // Redirect after short delay
                setTimeout(() => {
                    router.push("/dashboard");
                }, 1000);
            } else {
                setError(response.error || "Invalid email or password. Please try again.");
            }
        } catch (err) {
            setError("Network error. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen overflow-hidden flex items-stretch bg-white dark:bg-slate-900">

            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col relative z-10 bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-800">
                {/* Reusable Auth Navbar - Positioned absolutely or at top of flex column */}
                <div className="absolute top-0 left-0 w-full z-20">
                    <AuthNavbar
                        isDarkMode={isDarkMode}
                        onToggleDarkMode={toggleTheme}
                        currentPage="login"
                    />
                </div>

                <div className="flex-1 flex items-center justify-center px-4 sm:px-12 xl:px-24">
                    <div className="w-full max-w-[400px] flex flex-col gap-8">

                        {/* Header */}
                        <div className="text-left">
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Welcome back</h1>
                            <p className="text-slate-500 dark:text-slate-400">Please enter your details to sign in.</p>
                        </div>

                        {/* Error/Success Messages */}
                        {error && (
                            <div className={`w-full flex items-center gap-2 p-3 rounded-lg text-sm ${isDarkMode ? "bg-red-900/30 border border-red-800 text-red-400" : "bg-red-50 border border-red-200 text-red-600"}`}>
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}
                        {success && (
                            <div className={`w-full flex items-center gap-2 p-3 rounded-lg text-sm ${isDarkMode ? "bg-green-900/30 border border-green-800 text-green-400" : "bg-green-50 border border-green-200 text-green-600"}`}>
                                <CheckCircle className="w-4 h-4 shrink-0" />
                                <span>{success}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {/* Email */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="email">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:border-transparent transition-all"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="password">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full h-11 pl-10 pr-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:border-transparent transition-all"
                                        required
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleChange}
                                        className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                                    />
                                    <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
                                </label>
                                <Link href="#" className="text-sm font-medium text-slate-900 dark:text-white hover:underline">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 mt-2"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign in"}
                            </button>

                            {/* Google */}
                            <button
                                type="button"
                                className="w-full h-11 border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-3"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span>Sign in with Google</span>
                            </button>
                        </form>

                        <p className="text-center text-sm text-slate-500">
                            Don't have an account?{" "}
                            <Link href="/register" className="font-semibold text-slate-900 dark:text-white hover:underline">Sign up for free</Link>
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-4 left-0 w-full text-center text-[10px] text-slate-400">
                    © 2026 Visiora AI. All rights reserved.
                </div>
            </div>

            {/* 2. Visual Card (Right - Bottom Layer) */}
            <div className="hidden lg:block flex-1 w-full h-[640px] rounded-[2.5rem] overflow-hidden relative z-10 shadow-2xl shadow-indigo-500/10 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <LoginVisuals
                    beforeImage1="/red-top-before.png"
                    afterImage1="/red-top-after.jpg"
                    beforeImage2="/plaid-before.jpg"
                    afterImage2="/plaid-after.jpg"
                />
            </div>
        </div>
    );
}
