"use client";

import Link from "@/components/Link";
import {
    LayoutDashboard,
    Sparkles,
    Image,
    Wallet,
    Settings,
    User,
    Lock,
    Eye,
    EyeOff,
    Bell,
    Loader2,
    CheckCircle,
    AlertCircle,
    LogOut,
    Sun,
    Moon,
    CreditCard,
    Shield,
    Sliders,
    Zap,
    ChevronRight,
    Mail,
    Smartphone
} from "lucide-react";
import { useRouter } from "@/components/useRouter";
import { authApi } from "@/lib/auth";
import { useState, useEffect, useRef } from "react";
import { settingsApi, UserProfile } from "@/lib/settings";
import { walletApi } from "@/lib/wallet";
import { Sidebar, Header } from "@/components/layout";
import { useTheme } from "@/lib/theme";
import { motion, AnimatePresence } from "framer-motion";

// Skeleton Loader Component
const SettingsSkeleton = () => (
    <div className="min-h-screen flex overflow-x-hidden bg-slate-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
        <Sidebar activeNav="settings" />

        <main className="flex-1 flex flex-col min-w-0 min-h-screen lg:h-full lg:overflow-hidden bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Header without props (self-fetching) */}
            <Header
                breadcrumbs={[
                    { label: "Home", href: "/?view=landing" },
                    { label: "Settings" }
                ]}
            />

            <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
                <div className="container mx-auto max-w-6xl p-4 sm:p-6 lg:p-8 space-y-8 pb-20">

                    {/* Page Title Skeleton */}
                    <div>
                        <div className="h-9 w-64 bg-slate-200 dark:bg-gray-700/80 rounded-lg animate-pulse mb-3" />
                        <div className="h-5 w-96 max-w-full bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse" />
                    </div>

                    {/* Tabs Navigation Skeleton */}
                    <div className="border-b border-slate-200 dark:border-gray-700">
                        <div className="flex items-center gap-1 pb-1 overflow-x-auto no-scrollbar">
                            {/* Profile (Active Style) */}
                            <div className="px-4 py-3 relative">
                                <div className="flex items-center gap-2.5">
                                    <div className="size-4 rounded-full bg-slate-200 dark:bg-gray-700 animate-pulse" />
                                    <div className="h-4 w-12 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500/50 rounded-t-full" />
                            </div>

                            {/* Security */}
                            <div className="px-4 py-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="size-4 rounded-full bg-slate-200 dark:bg-gray-700 animate-pulse" />
                                    <div className="h-4 w-16 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                </div>
                            </div>

                            {/* Usage & Billing */}
                            <div className="px-4 py-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="size-4 rounded-full bg-slate-200 dark:bg-gray-700 animate-pulse" />
                                    <div className="h-4 w-28 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                </div>
                            </div>

                            {/* Notifications */}
                            <div className="px-4 py-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="size-4 rounded-full bg-slate-200 dark:bg-gray-700 animate-pulse" />
                                    <div className="h-4 w-24 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                </div>
                            </div>

                            {/* Preferences */}
                            <div className="px-4 py-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="size-4 rounded-full bg-slate-200 dark:bg-gray-700 animate-pulse" />
                                    <div className="h-4 w-24 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Card Skeleton */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-6 shadow-sm">
                        {/* Avatar & Name */}
                        <div className="flex items-center gap-5 mb-8">
                            <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-gray-700 animate-pulse shrink-0" />
                            <div className="space-y-2.5">
                                <div className="h-6 w-32 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
                                <div className="h-4 w-20 bg-slate-100 dark:bg-gray-700/50 rounded animate-pulse" />
                            </div>
                        </div>

                        {/* Input Grid */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {/* Email Field Helper */}
                            <div className="space-y-2.5">
                                <div className="h-3 w-24 bg-slate-200 dark:bg-gray-700/80 rounded animate-pulse" />
                                <div className="h-11 w-full bg-slate-100 dark:bg-gray-700/30 rounded-lg animate-pulse" />
                            </div>
                            {/* Phone Field Helper */}
                            <div className="space-y-2.5">
                                <div className="h-3 w-28 bg-slate-200 dark:bg-gray-700/80 rounded animate-pulse" />
                                <div className="h-11 w-full bg-slate-100 dark:bg-gray-700/30 rounded-lg animate-pulse" />
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end pt-2">
                            <div className="h-10 w-32 bg-slate-800 dark:bg-gray-600 rounded-lg animate-pulse" />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    </div>
);

export default function SettingsPage() {
    // Theme state
    const { theme, toggleTheme } = useTheme();
    const darkMode = theme === 'dark';

    // Router
    const router = useRouter();

    // Tab State
    const [activeTab, setActiveTab] = useState("profile");

    // Data State
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const hasFetchedData = useRef(false);

    // Get initial user from local storage for immediate display
    const storedUser = authApi.getCurrentUser();

    // Derived state for display
    const displayName = userProfile?.name || storedUser?.fullName || "User";
    const displayRole = userProfile?.role || "Member";
    const displayInitial = displayName.charAt(0).toUpperCase();

    // Profile Form State
    const [email, setEmail] = useState(storedUser?.email || "");
    const [phone, setPhone] = useState("");
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [profileMessage, setProfileMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Password Form State
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Logout State
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Notification Mock State
    const [emailNotif, setEmailNotif] = useState(true);
    const [pushNotif, setPushNotif] = useState(true);
    const [marketingNotif, setMarketingNotif] = useState(false);

    // --- Effects & Data Fetching ---

    useEffect(() => {
        if (hasFetchedData.current) return;
        hasFetchedData.current = true;
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const profileRes = await settingsApi.getProfile();
            if (profileRes.success && profileRes.data) {
                setUserProfile(profileRes.data);
                setEmail(profileRes.data.email);
                setPhone(profileRes.data.phone || "");
            }
        } catch (error) {
            console.warn('Failed to fetch user data:', error);
            // Fallback
            setEmail("alex.designer@saas.ai");
            setPhone("+1 (555) 123-4567");
        } finally {
            setIsLoading(false);
        }
    };

    // --- Handlers ---

    const handleSaveProfile = async () => {
        setIsSavingProfile(true);
        setProfileMessage(null);
        try {
            const response = await settingsApi.updateProfile({ email, phone });
            if (response.success && response.data) {
                setUserProfile(response.data);
                setProfileMessage({ type: 'success', text: 'Profile updated successfully!' });
            } else {
                setProfileMessage({ type: 'error', text: response.error || 'Failed to update profile' });
            }
        } catch (error) {
            setProfileMessage({ type: 'error', text: 'Failed to update profile.' });
        } finally {
            setIsSavingProfile(false);
            setTimeout(() => setProfileMessage(null), 3000);
        }
    };

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'Please fill in all fields' });
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }
        if (newPassword.length < 8) {
            setPasswordMessage({ type: 'error', text: 'Password must be at least 8 characters' });
            return;
        }

        setIsChangingPassword(true);
        setPasswordMessage(null);

        try {
            const response = await settingsApi.changePassword({ currentPassword, newPassword, confirmPassword });
            if (response.success) {
                setPasswordMessage({ type: 'success', text: 'Password updated successfully!' });
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                setPasswordMessage({ type: 'error', text: response.error || 'Failed to change password' });
            }
        } catch (error) {
            setPasswordMessage({ type: 'error', text: 'Failed to change password.' });
        } finally {
            setIsChangingPassword(false);
            setTimeout(() => setPasswordMessage(null), 5000);
        }
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await authApi.logout();
            router.push('/login');
        } catch (error) {
            router.push('/login');
        } finally {
            setIsLoggingOut(false);
        }
    };

    // Dynamic wallet state
    const [freeCredits, setFreeCredits] = useState(0);
    const [balance, setBalance] = useState(0);

    // Fetch wallet credits on mount
    useEffect(() => {
        const fetchWalletCredits = async () => {
            try {
                const response = await walletApi.getUserCredits();
                if (response.success && response.data) {
                    setFreeCredits(response.data.freeCredits);
                    setBalance(response.data.balance);
                }
            } catch (error) {
                console.error('Failed to fetch wallet credits:', error);
            }
        };
        fetchWalletCredits();
    }, []);

    const tabs = [
        { id: "profile", label: "Profile", icon: User, description: "Manage your personal information" },
        { id: "security", label: "Security", icon: Shield, description: "Password and account security" },
        { id: "billing", label: "Usage & Billing", icon: CreditCard, description: "Credits and plan details" },
        { id: "notifications", label: "Notifications", icon: Bell, description: "Configure your alerts" },
        { id: "preferences", label: "Preferences", icon: Sliders, description: "Theme and app settings" },
    ];

    // --- Render Components ---

    const renderProfileTab = () => (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-2xl">
                        {displayInitial}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{displayName}</h3>
                        <p className="text-sm text-slate-500 dark:text-gray-400">{displayRole}</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-slate-500 dark:text-gray-400 tracking-wider">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900/50 text-slate-900 dark:text-white text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-slate-500 dark:text-gray-400 tracking-wider">Phone Number</label>
                        <div className="relative">
                            <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900/50 text-slate-900 dark:text-white text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                    {profileMessage ? (
                        <div className={`flex items-center gap-2 text-sm ${profileMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                            {profileMessage.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                            {profileMessage.text}
                        </div>
                    ) : <div></div>}
                    <button
                        onClick={handleSaveProfile}
                        disabled={isSavingProfile}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm px-6 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSavingProfile && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isSavingProfile ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );

    const renderSecurityTab = () => (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-6 shadow-sm max-w-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Change Password</h3>
            <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">Ensure your account is using a long, random password to stay secure.</p>

            <div className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Current Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900/50 text-slate-900 dark:text-white text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
                            placeholder="Enter current password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-gray-300"
                        >
                            {showCurrentPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-gray-300">New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type={showNewPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900/50 text-slate-900 dark:text-white text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
                                placeholder="Min 8 characters"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-gray-300"
                            >
                                {showNewPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900/50 text-slate-900 dark:text-white text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
                                placeholder="Confirm new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-gray-300"
                            >
                                {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-gray-700 flex items-center justify-between">
                    {passwordMessage ? (
                        <div className={`flex items-center gap-2 text-sm ${passwordMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                            {passwordMessage.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                            {passwordMessage.text}
                        </div>
                    ) : <div></div>}
                    <button
                        onClick={handleChangePassword}
                        disabled={isChangingPassword}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm px-6 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isChangingPassword && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isChangingPassword ? 'Updating...' : 'Update Password'}
                    </button>
                </div>
            </div>
        </div>
    );

    const renderBillingTab = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Balance Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-6 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Wallet className="w-24 h-24" />
                    </div>
                    <div className="relative z-10 flex flex-col items-start justify-between h-full">
                        <div>
                            <p className="text-slate-300 text-sm font-medium mb-1">Total Balance</p>
                            <h3 className="text-3xl font-bold tracking-tight">${balance.toFixed(2)}</h3>
                        </div>
                        <div className="mt-6 w-full">
                            <Link href="/wallet" className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all text-white text-sm font-semibold py-2 rounded-lg border border-white/10">
                                <Wallet className="w-4 h-4" />
                                <span>Wallet</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Credits Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-teal-100 dark:border-teal-900/30 p-6 shadow-sm relative overflow-hidden group hover:border-teal-300 dark:hover:border-teal-700 transition-all">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 dark:bg-teal-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-teal-100 dark:bg-teal-900/40 rounded-lg text-teal-600 dark:text-teal-400">
                                <Zap className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Active Credits</h3>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-slate-900 dark:text-white">{freeCredits}</span>
                                <span className="text-sm text-slate-500 dark:text-gray-400">available</span>
                            </div>
                            <p className="text-xs text-slate-400 dark:text-gray-500 mt-1">Refreshes monthly based on plan.</p>
                        </div>
                        <Link href="/wallet" className="flex items-center justify-center gap-2 w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold py-2 rounded-lg transition-all shadow-sm hover:shadow-md">
                            Get More Credits
                        </Link>
                    </div>
                </div>

                {/* Plan Card (Mock) */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Current Plan</h3>
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 text-xs font-bold uppercase tracking-wide">Free</span>
                        </div>
                        <ul className="space-y-3 mb-6">
                            {[
                                "Basic Generation Quality",
                                "Standard Access Speed",
                                "Community Support"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400">
                                    <CheckCircle className="w-4 h-4 text-teal-500 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button className="w-full py-2 rounded-lg border border-slate-200 dark:border-gray-600 text-slate-700 dark:text-gray-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">
                        Upgrade Plan
                    </button>
                </div>
            </div>
        </div>
    );

    const renderNotificationsTab = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 overflow-hidden shadow-sm h-full flex flex-col">
                <div className="p-4 border-b border-slate-100 dark:border-gray-700 bg-slate-50/50 dark:bg-gray-800/50">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Preferences</h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-gray-700">
                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="flex gap-3">
                            <div className="mt-0.5">
                                <Mail className="w-5 h-5 text-slate-400" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-slate-900 dark:text-white">Email Notifications</h4>
                                <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">Receive updates about your account via email.</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-500"></div>
                        </label>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="flex gap-3">
                            <div className="mt-0.5">
                                <Bell className="w-5 h-5 text-slate-400" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-slate-900 dark:text-white">Push Notifications</h4>
                                <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">Receive real-time alerts on your device.</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={pushNotif} onChange={() => setPushNotif(!pushNotif)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-500"></div>
                        </label>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="flex gap-3">
                            <div className="mt-0.5">
                                <Sparkles className="w-5 h-5 text-slate-400" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-slate-900 dark:text-white">Marketing & Offers</h4>
                                <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">Receive updates about new features and promotions.</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={marketingNotif} onChange={() => setMarketingNotif(!marketingNotif)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-500"></div>
                        </label>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 overflow-hidden shadow-sm h-full flex flex-col">
                <div className="p-4 border-b border-slate-100 dark:border-gray-700 bg-slate-50/50 dark:bg-gray-800/50 flex justify-between items-center">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Activity</h3>
                    <button className="text-xs text-teal-600 hover:text-teal-700 font-medium hover:underline">Mark all read</button>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-gray-700 max-h-60 overflow-y-auto">
                    {[
                        { title: "Image Generation Complete", desc: "Your 'Futuristic City' batch has finished processing.", time: "2m ago", unread: true },
                        { title: "Welcome to Visiora", desc: "Thanks for joining! Start creating amazing visuals.", time: "1h ago", unread: false },
                        { title: "Credits Added", desc: "You received 5 promotional credits.", time: "1d ago", unread: false }
                    ].map((item, i) => (
                        <div key={i} className={`p-4 hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors flex gap-3 ${item.unread ? 'bg-slate-50/50 dark:bg-gray-800/80' : ''}`}>
                            <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${item.unread ? 'bg-teal-500' : 'bg-slate-300 dark:bg-gray-600'}`}></div>
                            <div>
                                <h4 className={`text-sm ${item.unread ? 'font-semibold text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-gray-300'}`}>{item.title}</h4>
                                <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5 line-clamp-1">{item.desc}</p>
                                <span className="text-[10px] text-slate-400 mt-1 block">{item.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderPreferencesTab = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-6 shadow-sm h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                        {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">Appearance</h3>
                        <p className="text-xs text-slate-500 dark:text-gray-400">Customize your visual experience</p>
                    </div>
                </div>

                <div className="space-y-4 mb-8 flex-1">
                    <div className="p-4 rounded-lg border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900/30 flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Theme Mode</span>
                        <div className="flex items-center gap-3">
                            <Sun className={`w-4 h-4 ${!darkMode ? 'text-amber-500' : 'text-slate-400'}`} />
                            <button
                                onClick={toggleTheme}
                                className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${darkMode ? 'bg-teal-600' : 'bg-slate-300'}`}
                            >
                                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${darkMode ? 'left-6' : 'left-1'}`} />
                            </button>
                            <Moon className={`w-4 h-4 ${darkMode ? 'text-indigo-400' : 'text-slate-400'}`} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-6 shadow-sm h-full flex flex-col border-l-4 border-l-red-500">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                        <LogOut className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">Session Management</h3>
                        <p className="text-xs text-slate-500 dark:text-gray-400">Control your login session</p>
                    </div>
                </div>

                <div className="space-y-4 flex-1 flex flex-col justify-end">
                    <p className="text-sm text-slate-600 dark:text-gray-400 bg-slate-50 dark:bg-gray-900/50 p-3 rounded-lg border border-slate-100 dark:border-gray-700 italic">
                        "Signing out will return you to the login screen. You will need your credentials to access your account again."
                    </p>
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold text-sm py-2.5 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 hover:shadow-md disabled:opacity-50"
                    >
                        {isLoggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
                        {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
                    </button>
                </div>
            </div>
        </div>
    );

    if (isLoading && !userProfile && !storedUser) {
        return <SettingsSkeleton />;
    }

    return (
        <div className="min-h-screen flex overflow-x-hidden bg-slate-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
            <Sidebar activeNav="settings" />

            <main className="flex-1 flex flex-col min-w-0 min-h-screen lg:h-full lg:overflow-hidden bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
                <Header
                    breadcrumbs={[
                        { label: "Home", href: "/?view=landing" },
                        { label: "Settings" }
                    ]}
                    freeCredits={freeCredits}
                    balance={balance}
                />

                <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
                    <div className="container mx-auto max-w-6xl p-4 sm:p-6 lg:p-8 space-y-8 pb-20">

                        {/* Page Title & Intro */}
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Account Settings</h1>
                            <p className="text-slate-500 dark:text-gray-400 mt-1 max-w-2xl">
                                Manage your profile details, security preferences, and billing information.
                            </p>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="border-b border-slate-200 dark:border-gray-700">
                            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
                                {tabs.map((tab) => {
                                    const isActive = activeTab === tab.id;
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`
                                                relative px-4 py-3 flex items-center gap-2.5 text-sm font-medium transition-all whitespace-nowrap outline-none
                                                ${isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300'}
                                            `}
                                        >
                                            <Icon className={`w-4 h-4 ${isActive ? 'stroke-2' : 'stroke-[1.5]'}`} />
                                            {tab.label}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeTabIndicator"
                                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500"
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[400px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {activeTab === 'profile' && renderProfileTab()}
                                    {activeTab === 'security' && renderSecurityTab()}
                                    {activeTab === 'billing' && renderBillingTab()}
                                    {activeTab === 'notifications' && renderNotificationsTab()}
                                    {activeTab === 'preferences' && renderPreferencesTab()}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
