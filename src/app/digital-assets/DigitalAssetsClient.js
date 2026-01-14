"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { assets } from './data';

export default function DigitalAssetsClient() {
    const [activeFilter, setActiveFilter] = useState('All Assets');

    const filters = ['All Assets', 'Website Templates', 'AI Tools', 'Python Scripts', 'SaaS Kits'];

    const filteredAssets = activeFilter === 'All Assets'
        ? assets
        : assets.filter(asset => asset.category === activeFilter);

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-purple-500/30 overflow-x-hidden">

            {/* Background Decoration: Gradient Vibes - Optimized with Hardware Acceleration */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
                {/* Dynamic Mesh Gradient */}
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-orange-500/20 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-700 transform-gpu will-change-transform"></div>

                <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-b from-cyan-500/10 via-blue-600/20 to-purple-600/20 rounded-full blur-[80px] mix-blend-screen animate-pulse duration-1000 transform-gpu will-change-transform"></div>

                <div className="absolute bottom-[-20%] left-[20%] w-[900px] h-[500px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-[100px] mix-blend-screen transform-gpu will-change-transform"></div>

                {/* Subtle sweeping conic gradient for movement */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-10 blur-[100px] rounded-full transform-gpu"
                    style={{ background: 'conic-gradient(from 0deg, transparent, #a855f7, #ec4899, transparent)' }}>
                </div>

                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.04]"></div>
            </div>

            {/* Navigation */}
            <nav className="absolute top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
                <Link href="/labs" className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300">
                    <i className="fas fa-arrow-left text-slate-400 group-hover:text-white group-hover:-translate-x-1 transition-all"></i>
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white">Back to Labs</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/blog" className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(147,51,234,0.2)] transition-all duration-300">
                        <span className="text-sm font-semibold text-slate-300 group-hover:text-white">Read Blogs</span>
                        <i className="fas fa-book-open text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all"></i>
                    </Link>

                    <div className="relative group">
                        <Link href="/services" className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                            <span className="text-sm font-semibold text-slate-300 group-hover:text-white">Hire Me</span>
                        </Link>
                        {/* Professional Tooltip */}
                        <div className="absolute top-full right-0 mt-4 w-64 p-4 rounded-2xl bg-[#0f0f0f] border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50 pointer-events-none">
                            <div className="absolute -top-2 right-8 w-4 h-4 bg-[#0f0f0f] border-t border-l border-white/10 transform rotate-45"></div>
                            <div className="relative z-10 text-center">
                                <p className="text-xs font-bold text-white mb-1">Start Your Own Tech Company?</p>
                                <p className="text-slate-400 text-[11px] leading-relaxed">
                                    Don't just buy templates. <span className="text-purple-400">Hire me</span> to build your custom SaaS or Dream Project from scratch.
                                </p>
                            </div>
                        </div>
                    </div>
                    <Link href="/" className="w-10 h-10 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 hover:bg-purple-600 hover:text-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        <i className="fas fa-home"></i>
                    </Link>
                </div>
            </nav>

            <main className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">

                {/* Marketplace Header */}
                <header className="mb-20 text-center">
                    <div className="relative w-24 h-24 mx-auto mb-6 hover:scale-105 transition-transform duration-500 rounded-3xl overflow-hidden border border-purple-500/30 shadow-[0_0_35px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)]">
                        <Image src="/mr-squared-logo.png" alt="Mr² Labs" fill className="object-cover" />
                    </div>
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-widest">
                        Digital Marketplace
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
                        Premium Assets to <br />
                        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">Accelerate Your Workflow</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
                        High-quality <strong className="text-white">Source Code</strong>, <strong className="text-white">Templates</strong>, and <strong className="text-white">AI Tools</strong> engineered to save you time and help you build faster.
                    </p>
                </header>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
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
                </div>

                {/* Product Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAssets.length > 0 ? (
                        filteredAssets.map((asset) => (
                            <Link href={`/digital-assets/${asset.slug}`} key={asset.id} className="group relative flex flex-col bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-500">

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
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{asset.title}</h3>
                                        <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">{asset.description}</p>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Price</span>
                                            <span className="text-xl font-bold text-white">{asset.price}</span>
                                        </div>
                                        <button className="px-5 py-2 rounded-xl bg-white text-black font-bold text-sm hover:bg-purple-500 hover:text-white transition-all shadow-lg transform group-hover:translate-x-1">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-slate-500">
                            <i className="fas fa-search text-4xl mb-4 opacity-50"></i>
                            <p>No assets found in this category yet.</p>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}
