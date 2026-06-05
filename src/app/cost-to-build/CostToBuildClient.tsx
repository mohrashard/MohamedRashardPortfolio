"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PSEOSlug } from '@/types/pseo';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import AvailabilityBadge from '../components/AvailabilityBadge';
import { Terminal } from 'lucide-react';

interface CostToBuildClientProps {
    data: PSEOSlug[];
}

const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

export default function CostToBuildClient({ data }: CostToBuildClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Extract unique categories from the data
    const categories = useMemo(() => {
        const cats = new Set(data.map(item => item.category));
        return ["All", ...Array.from(cats)];
    }, [data]);

    // Filter the items based on search and category
    const filteredData = useMemo(() => {
        return data.filter(item => {
            const matchesSearch = item.h1Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.seoDescription.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [data, searchQuery, selectedCategory]);

    // Magic container variants for staggering
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    // Item variants for fading and sliding up
    const itemVariants: Variants = {
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
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            {/* Animated Header Section */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 100, damping: 20 }}
                className="w-full max-w-4xl mx-auto text-center mb-16 mt-8 flex flex-col items-center space-y-7"
            >
                <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
                    <AvailabilityBadge />
                    <span className="hidden sm:block w-1 h-1 bg-zinc-700 rounded-full" />
                    <div className="hidden sm:flex items-center gap-1.5 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-bold text-zinc-400" style={fontLabel}>
                        <Terminal size={10} className="text-[var(--accent)]" />
                        MVP Pricing & Architecture.
                    </div>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold text-zinc-50 tracking-tight leading-[1.1] sm:leading-[1.02] max-w-4xl mx-auto" style={fontHeadline}>
                    How Much Does It Cost to <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-zinc-50">
                        Build Your App?
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-light" style={fontBody}>
                    Select your project type below to see the exact tech stack required, bloated traditional agency quotes, and how <span className="text-[var(--primary)] font-semibold">Mr² Labs ships it in under 72 hours.</span>
                </p>
            </motion.div>

            {/* Search and Filters Block */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12 w-full flex flex-col gap-8"
            >

                {/* Search Bar - Premium & Centered */}
                <div className="relative w-full max-w-2xl mx-auto" style={fontBody}>
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                        <i className="fas fa-search text-slate-500 text-lg"></i>
                    </div>
                    <input
                        type="text"
                        placeholder="Search SaaS type (e.g. CRM, AI Agents, Logistics)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 rounded-full bg-[#111] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] hover:border-white/20 transition-all text-base shadow-2xl"
                    />
                </div>

                {/* Category Filtering */}
                <div className="w-full relative max-w-5xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-3 mb-8 relative z-10">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                style={fontLabel}
                                className={`px-6 py-2 rounded-full text-[11px] uppercase tracking-wide font-bold transition-all duration-300 border ${selectedCategory === cat
                                        ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] transform md:-translate-y-0.5"
                                        : "bg-transparent text-slate-400 border-white/10 hover:border-white/30 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Results Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {filteredData.length > 0 ? (
                        filteredData.map(item => (
                            <motion.div
                                key={item.slug}
                                layout
                                variants={itemVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                            >
                                <Link
                                    href={`/cost-to-build/${item.slug}`}
                                    className="group relative flex flex-col h-full bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden hover:border-[var(--primary)]/50 hover:shadow-[0_0_30px_rgba(0,102,255,0.15)] transition-all duration-500"
                                >
                                    <div className="p-6 flex flex-col flex-grow">
                                        <span className="inline-block px-3 py-1 mb-4 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--accent)] text-[10px] font-bold uppercase tracking-wider w-max" style={fontLabel}>
                                            {item.category}
                                        </span>
                                        <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-[var(--accent)] transition-colors" style={fontHeadline}>
                                            {item.h1Title.replace('Cost to Build a ', '').replace('Cost to Build an ', '')}
                                        </h3>
                                        <p className="text-sm text-slate-400 mb-6 flex-grow leading-relaxed" style={fontBody}>
                                            {item.seoDescription}
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider" style={fontLabel}>Estimate</span>
                                                <span className="text-xl font-bold text-white" style={fontBody}>Free Report</span>
                                            </div>
                                            <div className="px-4 py-1.5 rounded-lg bg-[var(--primary)] text-white font-black text-[11px] uppercase tracking-wider hover:bg-[#0055d4] transition-all shadow-[0_0_15px_rgba(0,102,255,0.4)] border border-[var(--primary)] transform group-hover:translate-x-1 flex items-center gap-1.5" style={fontLabel}>
                                                See Cost Breakdown <i className="fas fa-arrow-right text-[10px]"></i>
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
                            className="col-span-full py-24 text-center border border-white/10 rounded-3xl bg-white/5 backdrop-blur-md px-6"
                        >
                            <div className="w-20 h-20 mx-auto bg-[#111] rounded-full border border-white/10 flex items-center justify-center mb-6 shadow-xl">
                                <i className="fas fa-lightbulb text-3xl text-[var(--accent)]"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3" style={fontHeadline}>Have a unique idea?</h3>
                            <p className="text-slate-400 max-w-md mx-auto mb-8 leading-relaxed" style={fontBody}>
                                If you couldn't find your exact industry, don't worry. We build fully custom AI, Web, and Mobile applications from scratch.
                            </p>
                            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/cost-to-build/custom-saas-web-mobile-app"
                                    className="px-8 py-3.5 rounded-full bg-[var(--primary)] font-bold text-white shadow-[0_4px_20px_rgba(0,102,255,0.4)] hover:bg-[#0055d4] hover:border-[#0055d4] transition-all border border-[var(--primary)] transform hover:-translate-y-1 flex items-center gap-2"
                                    style={fontHeadline}
                                >
                                    Describe Custom Idea <i className="fas fa-arrow-right text-xs"></i>
                                </Link>
                                <button
                                    onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                                    className="px-8 py-3.5 rounded-full border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors font-medium text-sm"
                                    style={fontHeadline}
                                >
                                    Clear Search
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
