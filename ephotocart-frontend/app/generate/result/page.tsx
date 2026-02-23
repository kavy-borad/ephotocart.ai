"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/components/useRouter";
import Link from "@/components/Link";
import {
    Download,
    Image as ImageIcon,
    ArrowRight,
    Sparkles,
    Check,
    Loader2,
    RefreshCw,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Sidebar, Header } from "@/components/layout";
import { motion } from "framer-motion";

// Backend base URL for image storage
const STORAGE_BASE_URL = "https://api.ephotocart.com";

// Normalize image URL
const normalizeImageUrl = (url: string | null | undefined): string => {
    if (!url || url.trim() === '') return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
    if (url.startsWith('/storage/') || url.startsWith('/uploads/') || url.startsWith('/images/')) {
        return `${STORAGE_BASE_URL}${url}`;
    }
    if (!url.includes('/')) return `${STORAGE_BASE_URL}/storage/gallery/${url}`;
    return `${STORAGE_BASE_URL}/${url.replace(/^\//, '')}`;
};

interface GeneratedImage {
    url: string;
    gallery_id?: number;
    has_branding?: boolean;
    original_url?: string;
    id?: string;
    index?: number;
    filename?: string;
}

interface GenerationResult {
    success: boolean;
    message: string;
    request_id?: string;
    data: {
        request_id?: string;
        generated_images: GeneratedImage[];
        model_id?: string;
        category_used?: string;
        show_model?: boolean;
        credits_used?: number;
        remaining_credits?: {
            free: number;
            paid: number;
        };
    };
}

export default function ResultPage() {
    const router = useRouter();
    const [result, setResult] = useState<GenerationResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    useEffect(() => {
        // Load generated result from localStorage
        const storedResult = localStorage.getItem('generatedResult');
        if (storedResult) {
            try {
                const parsed = JSON.parse(storedResult);
                setResult(parsed);
            } catch (e) {
                console.error('Failed to parse generated result:', e);
            }
        }
        setLoading(false);
    }, []);

    const images = result?.data?.generated_images || [];
    const creditsUsed = result?.data?.credits_used || 0;
    const remainingCredits = result?.data?.remaining_credits;

    const handleDownload = async (imageUrl: string, index: number) => {
        const id = `img-${index}`;
        setDownloadingId(id);
        try {
            const normalizedUrl = normalizeImageUrl(imageUrl);
            const response = await fetch(normalizedUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `generated_image_${index + 1}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            window.open(normalizeImageUrl(imageUrl), '_blank');
        } finally {
            setDownloadingId(null);
        }
    };

    const handleDownloadAll = async () => {
        for (let i = 0; i < images.length; i++) {
            await handleDownload(images[i].url, i);
            // Small delay between downloads
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    };

    const handleGenerateMore = () => {
        // Clear the stored result
        localStorage.removeItem('generatedResult');
        router.push('/generate/upload');
    };

    const handleGoToGallery = () => {
        // Clear the stored result
        localStorage.removeItem('generatedResult');
        router.push('/gallery');
    };

    // Lightbox navigation
    const openLightbox = (index: number) => setSelectedImageIndex(index);
    const closeLightbox = () => setSelectedImageIndex(null);
    const prevImage = () => setSelectedImageIndex(prev => prev !== null ? (prev - 1 + images.length) % images.length : null);
    const nextImage = () => setSelectedImageIndex(prev => prev !== null ? (prev + 1) % images.length : null);

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center bg-slate-50 dark:bg-gray-900">
                <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
            </div>
        );
    }

    if (!result || images.length === 0) {
        return (
            <div className="h-full flex overflow-x-hidden bg-slate-50 dark:bg-gray-900">
                <Sidebar activeNav="generate" />
                <main className="flex-1 flex flex-col min-w-0 h-full">
                    <Header
                        breadcrumbs={[
                            { label: "Home", href: "/dashboard" },
                            { label: "Generate", href: "/generate" },
                            { label: "Result" }
                        ]}
                    />
                    <div className="flex-1 flex items-center justify-center p-8">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-gray-800 flex items-center justify-center">
                                <ImageIcon className="w-8 h-8 text-slate-400" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Generated Images</h2>
                            <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">
                                Start by generating some images first.
                            </p>
                            <Link
                                href="/generate/upload"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white text-sm font-medium rounded-lg hover:from-teal-500 hover:to-teal-400 transition-all"
                            >
                                <Sparkles className="w-4 h-4" />
                                Generate Images
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="h-full flex overflow-x-hidden bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
            <Sidebar activeNav="generate" />

            <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                <Header
                    breadcrumbs={[
                        { label: "Home", href: "/dashboard" },
                        { label: "Generate", href: "/generate" },
                        { label: "Result" }
                    ]}
                />

                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {/* Success Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                                <Check className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                                    Images Generated Successfully!
                                </h1>
                                <p className="text-sm text-slate-500 dark:text-gray-400">
                                    {images.length} image{images.length > 1 ? 's' : ''} generated
                                    {creditsUsed > 0 && ` • ${creditsUsed} credit${creditsUsed > 1 ? 's' : ''} used`}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Images Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                        {images.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative aspect-square rounded-xl overflow-hidden bg-white dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 shadow-md hover:shadow-xl hover:border-teal-500 transition-all duration-300 cursor-pointer"
                                onClick={() => openLightbox(index)}
                            >
                                <img
                                    src={normalizeImageUrl(image.url)}
                                    alt={`Generated image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-between p-3">
                                    <span className="text-white text-xs font-medium">
                                        Image {index + 1}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDownload(image.url, index);
                                        }}
                                        disabled={downloadingId === `img-${index}`}
                                        className="size-8 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-colors disabled:opacity-50"
                                    >
                                        {downloadingId === `img-${index}` ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Download className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>

                                {/* Branding Badge */}
                                {image.has_branding && (
                                    <div className="absolute top-2 left-2 bg-teal-500/90 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded font-medium">
                                        Branded
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap items-center justify-center gap-3"
                    >
                        {images.length > 1 && (
                            <button
                                onClick={handleDownloadAll}
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-300 text-sm font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-all shadow-sm"
                            >
                                <Download className="w-4 h-4" />
                                Download All
                            </button>
                        )}

                        <button
                            onClick={handleGenerateMore}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-300 text-sm font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-all shadow-sm"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Generate More
                        </button>

                        <button
                            onClick={handleGoToGallery}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 text-white text-sm font-medium rounded-xl hover:from-teal-500 hover:to-teal-400 transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30"
                        >
                            Go to Gallery
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            </main>

            {/* Lightbox Modal */}
            {selectedImageIndex !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Navigation */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    {/* Image */}
                    <motion.img
                        key={selectedImageIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        src={normalizeImageUrl(images[selectedImageIndex].url)}
                        alt={`Generated image ${selectedImageIndex + 1}`}
                        className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                    />

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                        {selectedImageIndex + 1} / {images.length}
                    </div>

                    {/* Download Button */}
                    <button
                        onClick={() => handleDownload(images[selectedImageIndex].url, selectedImageIndex)}
                        disabled={downloadingId === `img-${selectedImageIndex}`}
                        className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                        {downloadingId === `img-${selectedImageIndex}` ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Download className="w-4 h-4" />
                        )}
                        Download
                    </button>
                </div>
            )}
        </div>
    );
}
