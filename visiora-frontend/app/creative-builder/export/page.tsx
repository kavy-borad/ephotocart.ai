// "use client";

// import React from 'react';
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
