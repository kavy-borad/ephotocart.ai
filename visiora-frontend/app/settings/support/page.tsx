"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Mail, ChevronDown, CheckCircle, Loader2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar, Header } from '@/components/layout';
import { walletApi } from '@/lib/wallet';
import { helpApi, SupportSubject } from '@/lib/help';

export default function EmailSupportPage() {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Wallet data for header
    const [balance, setBalance] = useState(0);
    const [freeCredits, setFreeCredits] = useState(0);

    // Support subjects state
    const [subjects, setSubjects] = useState<SupportSubject[]>([]);
    const [isLoadingSubjects, setIsLoadingSubjects] = useState(false);
    const hasFetchedSubjects = useRef(false);

    // Fetch wallet balance for header
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await walletApi.getBalance();
                if (response.success && response.data) {
                    setBalance(response.data.balance || 0);
                    setFreeCredits(response.data.freeCredits || 0);
                }
            } catch (error) {
                console.error('Failed to fetch balance:', error);
            }
        };
        fetchBalance();
    }, []);

    // Fetch support subjects (with duplicate prevention)
    useEffect(() => {
        if (hasFetchedSubjects.current) return;
        hasFetchedSubjects.current = true;

        const fetchSubjects = async () => {
            setIsLoadingSubjects(true);
            try {
                const response = await helpApi.getSubjects();
                if (response.success && response.data) {
                    // Sort by display_order
                    const sorted = [...response.data].sort((a, b) => a.display_order - b.display_order);
                    setSubjects(sorted);
                }
            } catch (error) {
                console.error('Failed to fetch subjects:', error);
            } finally {
                setIsLoadingSubjects(false);
            }
        };
        fetchSubjects();
    }, []);

    const isSubmitting = useRef(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent double submission
        if (isSubmitting.current) return;
        isSubmitting.current = true;

        setIsSending(true);
        try {
            const response = await helpApi.sendEmail({
                email,
                subject,
                message
            });

            if (response.success) {
                setIsSuccess(true);
                // Reset form
                setEmail("");
                setSubject("");
                setMessage("");
            } else {
                console.error('Failed to send email:', response.error);
                alert(response.error || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSending(false);
            isSubmitting.current = false;
        }
    };

    return (
        <div className="h-screen flex overflow-hidden bg-slate-50 dark:bg-gray-950 font-sans">
            <Sidebar activeNav="settings" />

            <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">

                {/* Background Decorations - Fixed position */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2 z-0" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2 z-0" />

                {/* Header */}
                <Header
                    breadcrumbs={[
                        { label: "Home", href: "/?view=landing" },
                        { label: "Settings", href: "/settings" },
                        { label: "Email Support" }
                    ]}
                    freeCredits={freeCredits}
                    balance={balance}
                    disableWalletFetch={true}
                />

                {/* Content Area - Fixed & Centered */}
                <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 h-full overflow-hidden relative z-10">

                    {/* Top Bar with Back Button */}
                    <div className="flex items-center mb-4 sm:mb-8 flex-shrink-0">
                        <Link
                            href="/settings"
                            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">Back</span>
                        </Link>
                    </div>

                    {/* Centered Form Card Wrapper */}
                    <div className="flex-1 flex items-center justify-center pb-48">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full max-w-[440px]"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-gray-700 overflow-hidden relative">

                                {/* Top Accent Line */}
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500" />

                                <AnimatePresence mode="wait">
                                    {!isSuccess ? (
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {/* Form Header */}
                                            <div className="px-8 pt-6 pb-2 text-center">
                                                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-2xl flex items-center justify-center text-teal-600 dark:text-teal-400 mb-4 shadow-inner">
                                                    <Mail className="w-6 h-6" />
                                                </div>
                                                <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-1">How can we help?</h1>
                                                <p className="text-slate-500 dark:text-gray-400 text-xs max-w-[280px] mx-auto leading-relaxed">
                                                    Our team typically responds within <span className="font-semibold text-slate-700 dark:text-slate-300">24 hours</span>.
                                                </p>
                                            </div>

                                            <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-4">
                                                <div className="space-y-3.5">
                                                    <div className="group">
                                                        <label className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 block group-focus-within:text-teal-600 dark:group-focus-within:text-teal-400 transition-colors">Your Email</label>
                                                        <input
                                                            type="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            placeholder="name@company.com"
                                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900/50 text-slate-900 dark:text-white text-sm font-medium focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none placeholder:text-slate-400"
                                                            required
                                                        />
                                                    </div>

                                                    <div className="group">
                                                        <label className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 block group-focus-within:text-teal-600 dark:group-focus-within:text-teal-400 transition-colors">Topic</label>
                                                        <div className="relative">
                                                            <select
                                                                value={subject}
                                                                onChange={(e) => setSubject(e.target.value)}
                                                                className="w-full px-4 py-2.5 pl-4 pr-10 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900/50 text-slate-900 dark:text-white text-sm font-medium focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none appearance-none cursor-pointer hover:bg-slate-100 dark:hover:bg-gray-800"
                                                                required
                                                                disabled={isLoadingSubjects}
                                                            >
                                                                <option value="" disabled>
                                                                    {isLoadingSubjects ? 'Loading...' : 'Select a topic...'}
                                                                </option>
                                                                {subjects.map((subj) => (
                                                                    <option key={subj.id} value={subj.id}>
                                                                        {subj.title}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                                        </div>
                                                    </div>

                                                    <div className="group">
                                                        <label className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 block group-focus-within:text-teal-600 dark:group-focus-within:text-teal-400 transition-colors">Message</label>
                                                        <textarea
                                                            value={message}
                                                            onChange={(e) => setMessage(e.target.value)}
                                                            placeholder="Describe your issue..."
                                                            rows={3}
                                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900/50 text-slate-900 dark:text-white text-sm font-medium focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none placeholder:text-slate-400 resize-none"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={isSending}
                                                    className="w-full relative overflow-hidden group bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold text-sm py-3.5 rounded-xl transition-all shadow-xl shadow-slate-900/10 dark:shadow-none flex items-center justify-center gap-2 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                                                >
                                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                                    {isSending ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                            <span>Sending...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>Send Message</span>
                                                            <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4 }}
                                            className="flex flex-col items-center justify-center p-12 text-center h-[520px]"
                                        >
                                            <div className="relative mb-8">
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                                                    className="w-24 h-24 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-teal-500/30 relative z-10"
                                                >
                                                    <CheckCircle className="w-12 h-12" />
                                                </motion.div>
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-teal-500/20 rounded-full blur-xl animate-pulse" />
                                            </div>

                                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Message Sent!</h2>
                                            <p className="text-slate-500 dark:text-gray-400 max-w-[240px] leading-relaxed mb-10">
                                                We've received your message and will get back to you shortly.
                                            </p>

                                            <Link
                                                href="/settings"
                                                className="px-8 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-slate-900 dark:text-white font-bold rounded-xl transition-all active:scale-95"
                                            >
                                                Return to Settings
                                            </Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Bottom copyright/help text */}
                            {!isSuccess && (
                                <p className="text-center mt-6 text-xs font-medium text-slate-400 dark:text-gray-600">
                                    Need immediate help? Check our <a href="#" className="text-teal-600 dark:text-teal-400 hover:underline">Documentation</a>
                                </p>
                            )}
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
