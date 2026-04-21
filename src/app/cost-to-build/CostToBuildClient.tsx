"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PSEOSlug } from '@/types/pseo';

interface CostToBuildClientProps {
    data: PSEOSlug[];
}

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

    return (
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Search and Filters Block */}
            <div className="mb-12 w-full flex flex-col gap-8">
                
                {/* Search Bar - Premium & Centered */}
                <div className="relative w-full max-w-2xl mx-auto">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                        <i className="fas fa-search text-slate-500 text-lg"></i>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search SaaS type (e.g. CRM, AI Agents, Logistics)..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 rounded-full bg-[#111] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:border-white/20 transition-all text-base shadow-2xl"
                    />
                </div>
                
                {/* Category Filtering: Scrollable on Mobile, Tag Cloud on Desktop */}
                <div className="w-full relative max-w-5xl mx-auto">
                    {/* Right-side fade mask (Mobile only to indicate scrolling) */}
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none md:hidden z-10"></div>
                    
                    <div className="flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 justify-start md:justify-center gap-2.5 snap-x md:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`flex-shrink-0 snap-center md:snap-none px-4 py-2 rounded-full text-[11px] uppercase tracking-wide font-bold transition-all duration-300 ${
                                    selectedCategory === cat 
                                    ? "bg-blue-600 text-white shadow-[0_4px_15px_rgba(37,99,235,0.4)] border border-blue-500 transform md:-translate-y-0.5" 
                                    : "bg-[#111] text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            {filteredData.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.map(item => (
                        <Link 
                            href={`/cost-to-build/${item.slug}`} 
                            key={item.slug}
                            className="group flex flex-col h-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 transform hover:-translate-y-1 relative"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="p-6 flex flex-col flex-grow">
                                <span className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider w-max">
                                    {item.category}
                                </span>
                                <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors">
                                    {item.h1Title.replace('Cost to Build a ', '').replace('Cost to Build an ', '')}
                                </h3>
                                <p className="text-sm text-slate-400 mb-6 flex-grow leading-relaxed">
                                    {item.seoDescription}
                                </p>
                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-white font-semibold">
                                    <span className="text-sm">Get Free Estimate</span>
                                    <i className="fas fa-arrow-right text-blue-400 transform group-hover:translate-x-1 transition-transform"></i>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="py-24 text-center border border-white/10 rounded-3xl bg-white/5 backdrop-blur-md px-6">
                    <div className="w-20 h-20 mx-auto bg-[#111] rounded-full border border-white/10 flex items-center justify-center mb-6 shadow-xl">
                        <i className="fas fa-lightbulb text-3xl text-blue-500"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Have a unique idea?</h3>
                    <p className="text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
                        If you couldn't find your exact industry, don't worry. We build fully custom AI, Web, and Mobile applications from scratch.
                    </p>
                    <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/cost-to-build/custom-saas-web-mobile-app"
                            className="px-8 py-3.5 rounded-full bg-blue-600 font-bold text-white shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:border-blue-400 transition-all border border-blue-500 transform hover:-translate-y-1 flex items-center gap-2"
                        >
                            Describe Custom Idea <i className="fas fa-arrow-right text-xs"></i>
                        </Link>
                        <button 
                            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                            className="px-8 py-3.5 rounded-full border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors font-medium text-sm"
                        >
                            Clear Search
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
