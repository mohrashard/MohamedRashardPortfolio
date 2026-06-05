"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function DigitalAssetsClient({ initialAssets }) {
    const [activeFilter, setActiveFilter] = useState('All Assets');

    const filters = ['All Assets', 'Website Templates', 'AI Tools', 'Python Scripts', 'SaaS Kits'];

    const filteredAssets = activeFilter === 'All Assets'
        ? initialAssets
        : initialAssets.filter(asset => asset.category === activeFilter);

    // Magic container variants for staggering
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    // Item variants for fading and sliding up
    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        show: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
    };

    return (
        <>
            {/* Filters */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-3 mb-16 relative z-10"
            >
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-6 py-2 rounded-full text-sm font-semibold border transition-all 
                        ${activeFilter === filter
                                ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                                : 'bg-transparent text-slate-400 border-white/10 hover:border-white/30 hover:text-white'
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </motion.div>

            {/* Product Grid */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
            >
                <AnimatePresence mode="popLayout">
                    {filteredAssets.length > 0 ? (
                        filteredAssets.map((asset) => (
                            <motion.div 
                                key={asset.id}
                                layout
                                variants={itemVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                            >
                                <Link href={`/digital-assets/${asset.slug}`} className="group relative flex flex-col h-full bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden hover:border-[var(--primary)]/50 hover:shadow-[0_0_30px_rgba(0,102,255,0.15)] transition-all duration-500">

                                    {/* Image Container */}
                                    <div className="relative h-60 w-full overflow-hidden bg-gray-900/50">
                                        <Image
                                            src={asset.image}
                                            alt={asset.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60"></div>
                                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-bold text-white shadow-xl">
                                            {asset.category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-grow p-6">
                                        <div className="mb-4">
                                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors">{asset.title}</h3>
                                            <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">{asset.description}</p>
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Price</span>
                                                <span className="text-xl font-bold text-white">{asset.price}</span>
                                            </div>
                                            <div className="px-5 py-2 rounded-xl bg-white text-black font-bold text-sm hover:bg-[var(--primary)] hover:text-white transition-all shadow-lg transform group-hover:translate-x-1">
                                                View Details
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="col-span-full text-center py-20 text-slate-500"
                        >
                            <i className="fas fa-search text-4xl mb-4 opacity-50"></i>
                            <p>No assets found in this category yet.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
