"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page redirects to the upload step
export default function CreativeBuilderPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/creative-builder/upload');
    }, [router]);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
        </div>
    );
}
