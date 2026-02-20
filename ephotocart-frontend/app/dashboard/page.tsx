"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "@/components/Link";
import { useRouter } from "@/components/useRouter";
import {
    LayoutDashboard,
    Image,
    Wallet,
    Settings,
    Bell,
    ChevronRight,
    ChevronDown,
    TrendingUp,
    TrendingDown,
    Zap,
    Sparkles,
    Plus,
    Eye,
    ArrowRight,
    Loader2,
} from "lucide-react";
import { dashboardApi, DashboardStats, RecentImage, ChartDataPoint, UserProfile } from "@/lib/dashboard";
import { authApi } from "@/lib/auth";
import { Sidebar, Header } from "@/components/layout";

import { PageTransition } from "@/components/animations/PageTransition";

// Module-level flag to prevent duplicate API calls
let dashboardInitialFetchDone = false;

export default function DashboardPage() {
    const router = useRouter();
    const [activeNav, setActiveNav] = useState("dashboard");

    // Loading and error states (blocking - show loading state until data loads)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Data states
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentImages, setRecentImages] = useState<RecentImage[]>([]);
    const [imageChartData, setImageChartData] = useState<ChartDataPoint[]>([]);
    const [spendingChartData, setSpendingChartData] = useState<ChartDataPoint[]>([]);
    const [styleAnalytics, setStyleAnalytics] = useState<any>(null); // State for style analytics
    const [typeAnalytics, setTypeAnalytics] = useState<any>(null); // State for type analytics

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { id: "generate", label: "Generate Image", icon: Sparkles, href: "/generate" },
        { id: "gallery", label: "My Gallery", icon: Image, href: "/gallery" },
        { id: "wallet", label: "Wallet", icon: Wallet, href: "/wallet" },
    ];

    // Load cached data from localStorage immediately on mount
    useEffect(() => {
        // Try to load cached dashboard data for instant display
        try {
            const cachedStats = localStorage.getItem('dashboard_stats_cache');
            const cachedProfile = localStorage.getItem('dashboard_profile_cache');
            const cachedCharts = localStorage.getItem('dashboard_charts_cache');
            const cachedRecent = localStorage.getItem('dashboard_recent_cache');

            if (cachedStats) {
                const parsed = JSON.parse(cachedStats);
                setStats(parsed);
            }
            if (cachedProfile) {
                setUserProfile(JSON.parse(cachedProfile));
            }
            if (cachedCharts) {
                const charts = JSON.parse(cachedCharts);
                if (charts.imageChartData) setImageChartData(charts.imageChartData);
                if (charts.spendingChartData) setSpendingChartData(charts.spendingChartData);
            }
            if (cachedRecent) {
                setRecentImages(JSON.parse(cachedRecent));
            }
        } catch (e) {
            console.warn('Failed to load cached dashboard data:', e);
        }
    }, []);

    // Fetch dashboard data on mount (optional - uses fallback data if fails)
    useEffect(() => {
        // Skip if already fetched (module-level check)
        if (dashboardInitialFetchDone) {
            console.log('⏭️ Dashboard: Already fetched, skipping');
            setIsLoading(false);
            return;
        }

        dashboardInitialFetchDone = true;
        console.log('🚀 Dashboard: Initial fetch starting...');

        // First, get user from localStorage (stored during login)
        const storedUser = authApi.getCurrentUser();
        if (storedUser) {
            const profile = {
                id: storedUser.id,
                fullName: storedUser.fullName,
                email: storedUser.email,
                balance: 0,
                freeCredits: 0,
            };
            setUserProfile(profile);
            // Cache profile
            localStorage.setItem('dashboard_profile_cache', JSON.stringify(profile));
        }

        // Then try to fetch dashboard data in background (non-blocking)
        fetchDashboardData();

        // Reset on unmount (for page navigation scenarios)
        return () => {
            setTimeout(() => {
                dashboardInitialFetchDone = false;
            }, 100);
        };
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Call ALL dashboard endpoints for complete integration
            const [
                dashboardRes,
                recentRes,
                activityRes,
                chartsRes,
                styleRes,
                typeRes,
                overviewRes,             // NEW: Explicit call
                dailyGenRes,             // NEW: Explicit call
                dailySpendRes            // NEW: Explicit call
            ] = await Promise.all([
                dashboardApi.getDashboardData(),           // /dashboard
                dashboardApi.getRecent(),                   // /dashboard/recent
                dashboardApi.getActivity(),                 // /dashboard/activity
                dashboardApi.getCharts(),                   // /dashboard/charts
                dashboardApi.getStyleAnalytics(),           // /dashboard/analytics/by-style
                dashboardApi.getTypeAnalytics(),            // /dashboard/analytics/by-type
                dashboardApi.getOverview(),                 // /dashboard/overview
                dashboardApi.getDailyGenerationChart(),     // /dashboard/charts/daily-generation
                dashboardApi.getDailySpendingChart()        // /dashboard/charts/daily-spending
            ]);

            console.log('📊 All dashboard endpoints called');

            // Main dashboard data
            if (dashboardRes.success && dashboardRes.data) {
                if (dashboardRes.data.stats) {
                    setStats(dashboardRes.data.stats);
                    // Cache stats for instant display on next visit
                    localStorage.setItem('dashboard_stats_cache', JSON.stringify(dashboardRes.data.stats));
                }

                // FORCE DYNAMIC BEHAVIOR: If total images is 0, charts MUST be flat 0.
                // This overrides any potential "sample data" from backend.
                if (dashboardRes.data.stats?.totalImages === 0) {
                    console.log('📉 Total images is 0, forcing charts to empty state');
                    setImageChartData([]); // This triggers the "fill(0)" fallback
                    setSpendingChartData([]);
                } else {
                    if (dashboardRes.data.recentImages) setRecentImages(dashboardRes.data.recentImages);
                    if (dashboardRes.data.imageGenerationChart) setImageChartData(dashboardRes.data.imageGenerationChart);
                    if (dashboardRes.data.spendingChart) setSpendingChartData(dashboardRes.data.spendingChart);
                }
            }

            // Explicitly log success of required endpoints
            if (overviewRes.success && overviewRes.data && overviewRes.data.stats) {
                console.log('✅ /dashboard/overview called', overviewRes.data.stats);
                // Merge overview stats into current stats to ensure we have the latest "favoriteStyle"
                setStats(prev => {
                    const newStats = overviewRes.data!.stats;
                    return prev ? { ...prev, ...newStats } : newStats;
                });
            }

            if (dailyGenRes.success) {
                console.log('✅ /dashboard/charts/daily-generation called');
                // You can use this data if you want a specifically daily view
            }

            if (dailySpendRes.success) {
                console.log('✅ /dashboard/charts/daily-spending called');
                // You can use this data if you want a specifically daily view
            }

            // Recent images (fallback/override from dedicated endpoint)
            if (recentRes.success && recentRes.data && Array.isArray(recentRes.data)) {
                console.log('✅ /dashboard/recent:', recentRes.data.length, 'images');
                setRecentImages(recentRes.data);
                // Cache recent images
                localStorage.setItem('dashboard_recent_cache', JSON.stringify(recentRes.data));
            }

            // Activity data
            if (activityRes.success && activityRes.data) {
                console.log('✅ /dashboard/activity:', activityRes.data);
            }

            // Charts data (override if available)
            // Charts data - always load if available (removed totalImages check to allow proper updates)
            if (chartsRes.success && chartsRes.data) {
                console.log('✅ /dashboard/charts loaded');
                const chartDataToCache: any = {};

                if (chartsRes.data.imageGeneration) {
                    setImageChartData(chartsRes.data.imageGeneration);
                    chartDataToCache.imageChartData = chartsRes.data.imageGeneration;
                }
                if (chartsRes.data.spending) {
                    setSpendingChartData(chartsRes.data.spending);
                    chartDataToCache.spendingChartData = chartsRes.data.spending;
                }

                // Cache charts data
                localStorage.setItem('dashboard_charts_cache', JSON.stringify(chartDataToCache));
            }

            // Analytics
            if (styleRes.success && styleRes.data) {
                console.log('✅ /dashboard/analytics/by-style:', styleRes.data);
                setStyleAnalytics(styleRes.data);
            }
            if (typeRes.success && typeRes.data) {
                console.log('✅ /dashboard/analytics/by-type:', typeRes.data);
                setTypeAnalytics(typeRes.data);
            }

        } catch (err) {
            console.warn('Dashboard API fetch failed:', err);
        } finally {
            // Always set loading to false when done
            setIsLoading(false);
        }
    };

    // Determine favorite style from analytics or stats
    let favStyle = "N/A";
    let favStyleUsage = 0;
    let styleFound = false;

    if (styleAnalytics) {
        // Handle array response: [{style: 'Realistic', count: 10}, ...]
        if (Array.isArray(styleAnalytics) && styleAnalytics.length > 0) {
            favStyle = styleAnalytics[0].style || styleAnalytics[0].name || "N/A";
            // Calculate usage percentage if total is available, otherwise show count
            favStyleUsage = styleAnalytics[0].percentage || styleAnalytics[0].count || 0;
            styleFound = true;
        }
        // Handle object response: { topStyle: 'Realistic', usage: 50 }
        else if (styleAnalytics.topStyle) {
            favStyle = styleAnalytics.topStyle;
            favStyleUsage = styleAnalytics.usage || 0;
            styleFound = true;
        }
    }

    // Fallback if analytics didn't find anything but we have it in stats (from overview API)
    if (!styleFound && stats && stats.favoriteStyle && stats.favoriteStyle !== 'None') {
        favStyle = stats.favoriteStyle;
        favStyleUsage = stats.favoriteStyleUsage || 0;
    }

    // Determine top generation type
    let favType = "N/A";
    let favTypeUsage = 0;

    if (typeAnalytics) {
        // Handle array response: [{type: 'single_image', count: 10}, ...]
        if (Array.isArray(typeAnalytics) && typeAnalytics.length > 0) {
            let rawType = typeAnalytics[0].type || typeAnalytics[0].name || "N/A";
            // Check if usage is percentage or simple count
            favTypeUsage = typeAnalytics[0].percentage || 0;

            // Format type name
            if (rawType.includes('single')) favType = "Single Image";
            else if (rawType.includes('batch')) favType = "E-Com Bundle";
            else favType = rawType;

        } else if (typeAnalytics.topType) {
            favType = typeAnalytics.topType;
            favTypeUsage = typeAnalytics.usage || 0;
        }
    }

    // Build stats cards from API data or fallback
    const statsCards = stats ? [
        {
            label: "Total Images",
            value: stats.totalImages.toLocaleString(),
            trend: stats.imageTrend >= 0 ? `+${stats.imageTrend}%` : `${stats.imageTrend}%`,
            trendUp: stats.imageTrend >= 0,
            progress: Math.min((stats.totalImages / 2000) * 100, 100),
            color: "bg-teal-500",
            icon: Image // Explicitly reusing Image icon or similar suitable one
        },
        {
            label: "Free Credits",
            value: stats.freeCredits.toString(),
            // subValue removed as requested by user - only show dynamic credit count
            icon: Zap,
            progress: (stats.freeCredits / stats.maxFreeCredits) * 100,
            color: "bg-blue-500"
        },
        {
            label: "Total Spent",
            value: `₹${stats.totalSpent}`,
            trend: stats.spendingTrend >= 0 ? `+${stats.spendingTrend}%` : `${stats.spendingTrend}%`,
            trendUp: stats.spendingTrend < 0, // Down spending is good
            progress: Math.min((stats.totalSpent / 1000) * 100, 100),
            color: "bg-indigo-500",
            icon: Wallet // Using Wallet as a proxy for "Spent"
        },
        {
            label: "Favorite Style",
            value: favStyle || "N/A",
            subText: favStyleUsage ? `Used ${favStyleUsage}% of time` : undefined,
            icon: Sparkles,
            color: "bg-violet-500"
        },
    ] : [
        { label: "Total Images", value: isLoading ? "..." : "0", trend: "+0%", trendUp: true, progress: 0, color: "bg-teal-500", icon: Image },
        {
            label: "Free Credits",
            value: userProfile?.freeCredits !== undefined ? userProfile.freeCredits.toString() : (isLoading ? "..." : "0"),
            subValue: "/ 1",
            icon: Zap,
            progress: userProfile?.freeCredits ? Math.min((userProfile.freeCredits / 1) * 100, 100) : 0,
            color: "bg-blue-500"
        },
        { label: "Total Spent", value: isLoading ? "₹..." : "₹0", trend: "+0%", trendUp: true, progress: 0, color: "bg-indigo-500", icon: Wallet },
        { label: "Favorite Style", value: isLoading ? "..." : "N/A", subText: isLoading ? "Loading..." : undefined, icon: Sparkles, color: "bg-violet-500" },
    ];

    // Chart data from API or fallback
    // Chart data from API or zero fallback
    const chartData = spendingChartData.length > 0
        ? spendingChartData.map(d => d.value)
        : Array(7).fill(0);
    const chartDays = spendingChartData.length > 0
        ? spendingChartData.map(d => d.day)
        : ["M", "T", "W", "T", "F", "S", "S"];

    // Line chart data from API or zero fallback
    const lineChartPoints = imageChartData.length > 0
        ? imageChartData.map(d => d.value)
        : Array(7).fill(0);
    const lineChartDays = imageChartData.length > 0
        ? imageChartData.map(d => d.day)
        : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // Recent images from API or empty
    const displayImages = recentImages.length > 0
        ? recentImages.map(img => img.url)
        : [];

    // User info from API or fallback
    const userName = userProfile?.fullName?.split(' ')[0] || 'Jane';
    const userInitial = userName.charAt(0).toUpperCase();
    const userBalance = userProfile?.balance ?? 0;
    // Use dynamic stats if available, otherwise fallback to profile (or 0)
    const userFreeCredits = stats?.freeCredits ?? userProfile?.freeCredits ?? 0;

    return (
        <div className="h-screen flex overflow-hidden bg-slate-100 dark:bg-gray-900 transition-colors duration-300">
            {/* Reusable Sidebar */}
            <Sidebar activeNav="dashboard" />

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-full overflow-x-hidden lg:overflow-hidden bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
                {/* Reusable Header with dynamic breadcrumbs */}
                <Header
                    breadcrumbs={[
                        { label: "Home", href: "/?view=landing" },
                        { label: "Dashboard" }
                    ]}
                    freeCredits={userFreeCredits}
                    balance={userBalance}
                />

                {/* Content - Fixed on desktop to prevent scroll, scrollable on mobile */}
                <div className="flex-1 p-3 sm:p-4 overflow-y-auto lg:overflow-hidden">
                    <PageTransition className="flex flex-col gap-3 sm:gap-4 lg:h-full">

                        {/* Page Header with Animation */}


                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 shrink-0">
                            {statsCards.map((card, index) => (
                                <div
                                    key={index}
                                    className="relative bg-white dark:bg-gray-800 p-3 rounded-2xl border border-slate-200 dark:border-gray-700 overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-teal-500/50 dark:hover:border-teal-400/50"
                                >
                                    {/* Shine/Glare Effect */}
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-slate-100/50 dark:via-white/10 to-transparent z-0 pointer-events-none skew-x-12" />

                                    {/* Content Wrapper */}
                                    <div className="relative z-10 flex flex-col gap-2">
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-[10px] font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider">{card.label}</span>
                                                <div className="flex items-baseline gap-1 mt-0.5">
                                                    <span className={`text-xl font-bold text-slate-800 dark:text-white ${card.label === 'Favorite Style' ? 'capitalize' : ''} leading-none`}>{card.value}</span>
                                                </div>
                                                {card.trend && (
                                                    <span className={`text-[9px] font-bold mt-1 px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5 w-fit ${card.trendUp ? "text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400" : "text-rose-700 bg-rose-100 dark:bg-rose-900/30 dark:text-rose-400"}`}>
                                                        {card.trendUp ? <TrendingUp className="w-2 h-2" /> : <TrendingDown className="w-2 h-2" />}
                                                        {card.trend}
                                                    </span>
                                                )}
                                                {card.subText && <span className="text-[9px] text-slate-400 mt-1">{card.subText}</span>}
                                            </div>

                                            {card.icon && (
                                                <div className={`
                                                    w-9 h-9 rounded-full flex items-center justify-center
                                                    ${card.color ? card.color.replace('bg-', 'bg-').replace('500', '500/10') : 'bg-slate-100 dark:bg-gray-700'}
                                                    group-hover:scale-110 transition-transform duration-300
                                                    shadow-sm border border-slate-100 dark:border-gray-600
                                                `}>
                                                    <card.icon className={`w-4 h-4 ${card.color ? card.color.replace('bg-', 'text-') : 'text-slate-500 dark:text-gray-400'}`} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Charts Row - Expands to fill space */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:flex-1 lg:min-h-0">
                            {/* Area Chart - Fills height */}
                            <div className="opacity-0 animate-fade-in bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-slate-200 dark:border-gray-700 flex flex-col h-[200px] sm:h-[220px] lg:h-full hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center justify-between mb-3 shrink-0">
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-white">Daily Image Generation</h3>
                                    <select className="text-[10px] border border-slate-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded px-1.5 py-0.5 outline-none focus:border-teal-500">
                                        <option>Last 7 Days</option>
                                    </select>
                                </div>
                                <div className="flex-1 relative min-h-0">
                                    {/* Y-axis labels - Fixed scale: 0, 20, 40, 60, 80, 100 */}
                                    <div className="absolute left-0 top-0 bottom-4 w-8 flex flex-col justify-between text-[9px] text-slate-400 pr-1">
                                        <span>100</span>
                                        <span>80</span>
                                        <span>60</span>
                                        <span>40</span>
                                        <span>20</span>
                                        <span>0</span>
                                    </div>
                                    {/* Chart area */}
                                    <div className="ml-9 h-full flex flex-col">
                                        <div className="flex-1 relative">
                                            {/* Grid lines for fixed scale */}
                                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                                {[0, 1, 2, 3, 4, 5].map((i) => (
                                                    <div key={i} className="border-t border-slate-100 dark:border-gray-700/50 w-full" />
                                                ))}
                                            </div>

                                            {/* SVG Area Chart - Smooth Water-like Curve */}
                                            {(() => {
                                                const FIXED_MAX = 100;

                                                // 1. Prepare Points
                                                const points = lineChartPoints.map((val, i) => {
                                                    const x = (i / (lineChartPoints.length - 1)) * 100;
                                                    const normalizedVal = Math.min((val / FIXED_MAX) * 100, 100);
                                                    return { x, y: 100 - normalizedVal };
                                                });

                                                // 2. Cubic Bezier Smoothing Functions
                                                // These calculate control points to create a smooth 'water-like' flow through the data points
                                                const line = (pointA: any, pointB: any) => {
                                                    const lengthX = pointB.x - pointA.x;
                                                    const lengthY = pointB.y - pointA.y;
                                                    return {
                                                        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
                                                        angle: Math.atan2(lengthY, lengthX)
                                                    };
                                                };

                                                const getControlPoint = (current: any, previous: any, next: any, reverse: boolean) => {
                                                    const p = previous || current;
                                                    const n = next || current;
                                                    const smoothing = 0.2; // Adjust for more/less "flow"
                                                    const o = line(p, n);
                                                    const angle = o.angle + (reverse ? Math.PI : 0);
                                                    const length = o.length * smoothing;
                                                    const x = current.x + Math.cos(angle) * length;
                                                    const y = current.y + Math.sin(angle) * length;
                                                    return { x, y };
                                                };

                                                const bezierCommand = (point: any, i: number, a: any[]) => {
                                                    const cps = getControlPoint(a[i - 1], a[i - 2], point, false);
                                                    const cpe = getControlPoint(point, a[i - 1], a[i + 1], true);
                                                    return `C ${cps.x},${cps.y} ${cpe.x},${cpe.y} ${point.x},${point.y}`;
                                                };

                                                const dPath = points.length > 0
                                                    ? `M ${points[0].x},${points[0].y} ` +
                                                    points.slice(1).map((p, i) => bezierCommand(p, i + 1, points)).join(" ")
                                                    : 'M 0,100 L 100,100';

                                                const areaD = `${dPath} L 100,100 L 0,100 Z`;

                                                return (
                                                    <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                                                        <defs>
                                                            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                                <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
                                                                <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                                                            </linearGradient>
                                                        </defs>
                                                        {/* Area Fill */}
                                                        <path d={areaD} fill="url(#waterGradient)" className="opacity-0 animate-fade-in-delay" style={{ transition: 'd 0.5s ease' }} />
                                                        {/* Line Stroke */}
                                                        <path
                                                            d={dPath}
                                                            fill="none"
                                                            stroke="#14b8a6"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            vectorEffect="non-scaling-stroke"
                                                            className="animate-draw-line"
                                                            style={{ transition: 'd 0.5s ease' }}
                                                        />
                                                    </svg>
                                                );
                                            })()}

                                            {/* Data points (Invisible hit targets for tooltips) */}
                                            {(() => {
                                                const FIXED_MAX = 100;
                                                return (
                                                    <div className="absolute inset-0 z-10">
                                                        {lineChartPoints.map((p, i) => {
                                                            const normalizedPercent = Math.min((p / FIXED_MAX) * 100, 100);
                                                            const xPercent = lineChartPoints.length > 1 ? (i / (lineChartPoints.length - 1)) * 100 : 50;
                                                            // Approximate Y for tooltip positioning
                                                            const yPercent = 100 - normalizedPercent;
                                                            return (
                                                                <div
                                                                    key={i}
                                                                    className="absolute group w-4 h-full -top-0 cursor-pointer"
                                                                    style={{
                                                                        left: `${xPercent}%`,
                                                                        transform: 'translateX(-50%)' // Center the hit area
                                                                    }}
                                                                >
                                                                    {/* Tooltip Dot (visible on hover) */}
                                                                    <div
                                                                        className="absolute w-3 h-3 rounded-full bg-teal-500 border-[3px] border-white shadow-md opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100 duration-200"
                                                                        style={{
                                                                            top: `${Math.min(Math.max(yPercent, 0), 100)}%`,
                                                                            left: '50%',
                                                                            marginLeft: '-6px',
                                                                            marginTop: '-6px'
                                                                        }}
                                                                    />

                                                                    {/* Tooltip Label */}
                                                                    <div className="absolute left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 bg-slate-800 text-white text-[10px] font-medium px-2 py-1 rounded shadow-lg whitespace-nowrap"
                                                                        style={{ top: `${Math.min(yPercent - 15, 80)}%` }}
                                                                    >
                                                                        <div className="font-semibold">{lineChartDays[i]}</div>
                                                                        <div className="text-teal-200">Images: {p}</div>
                                                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                        {/* X-axis labels */}
                                        <div className="flex justify-between text-[9px] text-slate-400 pt-1 shrink-0">
                                            {lineChartDays.map((day, i) => (
                                                <span key={i} className="text-center">{day}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bar Chart - Fills height */}
                            <div className="opacity-0 animate-fade-in-delay bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-slate-200 dark:border-gray-700 flex flex-col h-[200px] sm:h-[220px] lg:h-full hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center justify-between mb-3 shrink-0">
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-white">Daily Spending</h3>
                                    <div className="flex items-center gap-3 text-[9px]">
                                        <div className="flex items-center gap-1">
                                            <div className="size-2 rounded-full bg-gradient-to-t from-teal-600 to-teal-400" />
                                            <span className="text-slate-500 dark:text-gray-400">Paid</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="size-2 rounded-full bg-gradient-to-t from-emerald-200 to-emerald-100" />
                                            <span className="text-slate-500 dark:text-gray-400">Free</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 relative min-h-0">
                                    {/* Y-axis labels - Fixed scale: $0, $20, $40, $60, $80, $100 */}
                                    <div className="absolute left-0 top-0 bottom-4 w-8 flex flex-col justify-between text-[9px] text-slate-400 pr-1">
                                        <span>₹100</span>
                                        <span>₹80</span>
                                        <span>₹60</span>
                                        <span>₹40</span>
                                        <span>₹20</span>
                                        <span>₹0</span>
                                    </div>
                                    {/* Chart area */}
                                    <div className="ml-9 h-full flex flex-col">
                                        <div className="flex-1 flex items-end justify-between gap-2 relative">
                                            {/* Grid lines for fixed scale */}
                                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                                {[0, 1, 2, 3, 4, 5].map((i) => (
                                                    <div key={i} className="border-t border-slate-100 dark:border-gray-700/50 w-full" />
                                                ))}
                                            </div>
                                            {(() => {
                                                const FIXED_MAX = 100; // Fixed scale max

                                                return chartData.map((height, i) => {
                                                    // Get detailed split from real data if available
                                                    const dataPoint = spendingChartData[i];
                                                    const paidHeight = dataPoint ? (dataPoint.paid ?? 0) : 0;
                                                    const freeHeight = dataPoint ? (dataPoint.free ?? 0) : 0;
                                                    const dayLabel = chartDays[i] || '';

                                                    // Normalize height to percentage of FIXED_MAX (cap at 100%)
                                                    const normalizedHeight = Math.min((height / FIXED_MAX) * 100, 100);

                                                    return (
                                                        <div key={i} className="flex-1 flex flex-col justify-end h-full group cursor-pointer relative z-10 animate-grow-up origin-bottom" style={{ animationDelay: `${i * 0.1}s` }}>
                                                            {/* Stacked bar container */}
                                                            <div className="w-full flex flex-col justify-end" style={{ height: `${normalizedHeight}%` }}>
                                                                {/* Free segment (top) */}
                                                                <div
                                                                    className="w-full rounded-t-md bg-gradient-to-t from-emerald-200 to-emerald-100 group-hover:from-emerald-300 group-hover:to-emerald-200 transition-all"
                                                                    style={{ height: `${height > 0 ? (freeHeight / height) * 100 : 0}%`, minHeight: freeHeight > 0 ? '2px' : 0 }}
                                                                />
                                                                {/* Paid segment (bottom) */}
                                                                {paidHeight > 0 && (
                                                                    <div
                                                                        className="w-full bg-gradient-to-t from-teal-600 to-teal-500 group-hover:from-teal-700 group-hover:to-teal-500 transition-all shadow-sm"
                                                                        style={{ height: `${height > 0 ? (paidHeight / height) * 100 : 0}%` }}
                                                                    />
                                                                )}
                                                            </div>
                                                            {/* Hover tooltip */}
                                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-slate-800 text-white text-[10px] font-medium px-2 py-1.5 rounded shadow-lg whitespace-nowrap">
                                                                <div className="font-semibold">{dayLabel}</div>
                                                                <div>Total: ₹{height}</div>
                                                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                                                            </div>
                                                        </div>
                                                    );
                                                });
                                            })()}
                                        </div>
                                        {/* X-axis labels - Day + Date format */}
                                        <div className="flex justify-between text-[9px] text-slate-400 pt-1 shrink-0">
                                            {chartDays.map((day, i) => (
                                                <span key={i} className="flex-1 text-center">{day}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Generations - Compact */}
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-slate-200 dark:border-gray-700 shrink-0">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-bold text-slate-800 dark:text-white">Recent Generations</h3>
                                <Link href="/gallery" className="text-[10px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold flex items-center gap-0.5 uppercase">
                                    View All <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-9 gap-2 sm:gap-4">
                                {displayImages.map((img, i) => (
                                    <div
                                        key={i}
                                        className="aspect-square rounded bg-cover bg-center border border-slate-200 hover:border-teal-500 transition-all cursor-pointer group relative overflow-hidden"
                                        style={{ backgroundImage: `url('${img}')` }}
                                    >
                                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Eye className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                ))}
                                <div className="aspect-square rounded bg-slate-50 dark:bg-gray-700 border border-dashed border-slate-300 dark:border-gray-600 flex flex-col items-center justify-center text-slate-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500 hover:bg-white dark:hover:bg-gray-600 transition-all cursor-pointer">
                                    <Plus className="w-4 h-4" />
                                    <span className="text-[8px] font-bold uppercase">New</span>
                                </div>
                            </div>
                        </div>
                    </PageTransition>
                </div>
            </main>
        </div >
    );
}
