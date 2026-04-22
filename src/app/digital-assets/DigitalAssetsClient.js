"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DigitalAssetsClient({ initialAssets }) {
    const [activeFilter, setActiveFilter] = useState('All Assets');

    const filters = ['All Assets', 'Website Templates', 'AI Tools', 'Python Scripts', 'SaaS Kits'];

    const filteredAssets = activeFilter === 'All Assets'
        ? initialAssets
        : initialAssets.filter(asset => asset.category === activeFilter);

    return (
        <>
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-16 relative z-10">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
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
                                    <div className="px-5 py-2 rounded-xl bg-white text-black font-bold text-sm hover:bg-purple-500 hover:text-white transition-all shadow-lg transform group-hover:translate-x-1">
                                        View Details
                                    </div>
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
        </>
    );
}
