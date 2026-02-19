"use client";

import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ExportPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-teal-900/20 p-6">
            <div className="max-w-2xl w-full text-center space-y-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/25">
                    <Sparkles className="w-10 h-10 text-white" />
                </div>
                
                <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-teal-800 to-slate-900 dark:from-white dark:via-teal-300 dark:to-white">
                        Creative Builder
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300">
                        Coming Soon
                    </p>
                </div>

                <div className="max-w-md mx-auto space-y-4">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        We're working on an amazing ad creative builder tool. Create stunning ads with AI-powered templates, smart editing, and instant optimization.
                    </p>
                    
                    <div className="pt-4">
                        <Link 
                            href="/dashboard"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Link>
                    </div>
                </div>

                <div className="pt-8 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                    <span>Feature under development</span>
                </div>
            </div>
        </div>
    );
}

// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import { useCreativeBuilder } from '../layout';
// import {
//     CheckCircle2,
//     Download,
//     History
// } from 'lucide-react';

// // --- Animation Variants ---
// const fadeUp = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//     exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
// };

// // --- Default Concept ---
// const DEFAULT_CONCEPT = {
//     id: 1,
//     headline: 'Elevate Your Style',
//     cta: 'Shop Now',
//     score: 98,
//     img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
// };

// export default function ExportPage() {
//     const router = useRouter();
//     const {
//         selectedConcept,
//         setCurrentStep
//     } = useCreativeBuilder();

//     const concept = selectedConcept || DEFAULT_CONCEPT;

//     const handleStartNew = () => {
//         setCurrentStep('UPLOAD');
//         router.push('/creative-builder/upload');
//     };

//     return (
//         <motion.div
//             key="export"
//             variants={fadeUp}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="w-full h-full flex items-center justify-center p-4"
//         >
//             <div className="flex flex-col items-center text-center space-y-4 relative z-10 w-full max-w-lg">
//                 <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
//                     <CheckCircle2 className="w-6 h-6" strokeWidth={2.5} />
//                 </div>
//                 <div className="w-full flex justify-center">
//                     <div className="w-full max-w-[220px] flex flex-col gap-4">
//                         <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-[4/5] w-full border border-slate-200/50 dark:border-white/10 group">
//                             <img src={concept?.img} className="w-full h-full object-cover" />
//                             <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
//                                 <h3 className="text-[10px] font-black text-white leading-tight mb-1">{concept?.headline || "Elevate Your Style"}</h3>
//                                 <span className="px-2 py-0.5 bg-white text-slate-900 rounded-full font-black text-[8px] uppercase tracking-tighter inline-block shadow-lg">{concept?.cta || "Shop Now"}</span>
//                             </div>
//                         </div>
//                         <button className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-xs shadow-xl flex items-center justify-center gap-2"><Download className="w-3 h-3" /> Download Result</button>
//                     </div>
//                 </div>
//                 <button onClick={handleStartNew} className="text-slate-400 font-bold text-[10px] flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-wider"><History className="w-3 h-3" /> Start New</button>
//             </div>
//         </motion.div>
//     );
// }
