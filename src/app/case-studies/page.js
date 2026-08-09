import React from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import AvailabilityBadge from '../components/AvailabilityBadge';

export const metadata = {
    title: "Case Studies | Mr² Labs — Real Products We've Built",
    description: "Explore how Mr² Labs built an AI EdTech platform in 14 days and a PWA marketplace in 72 hours for real founders.",
    openGraph: {
        title: "Case Studies | Mr² Labs — Real Products We've Built",
        description: "Explore how Mr² Labs built an AI EdTech platform in 14 days and a PWA marketplace in 72 hours for real founders.",
        url: "https://mr2labs.com/case-studies",
        siteName: "Mr² Labs",
        images: [
            {
                url: "https://mr2labs.com/og/case-studies.png",
                width: 1200,
                height: 630,
                alt: "Mr² Labs — Case Studies",
            }
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Case Studies | Mr² Labs — Real Products We've Built",
        description: "Explore how Mr² Labs built an AI EdTech platform in 14 days and a PWA marketplace in 72 hours for real founders.",
        images: ["https://mr2labs.com/og/case-studies.png"],
        creator: "@mr2labs",
    },
    alternates: { canonical: "https://mr2labs.com/case-studies" },
};

export default function CaseStudiesIndex() {
    const caseStudies = [
        {
            slug: 'ignite-ed',
            title: 'Ignite Ed',
            tag: 'EdTech Platform',
            desc: 'A trilingual, AI-powered educational platform built and deployed in just 14 days to democratize education in Sri Lanka.',
            logo: '/igniteed.webp',
            color: 'var(--primary)',
            bgClasses: 'hover:border-[var(--primary)] shadow-[0_0_0_rgba(0,102,255,0)] hover:shadow-[0_15px_40px_rgba(0,102,255,0.15)]',
            gradient: 'from-[var(--primary)]/20'
        },
        {
            slug: 'grabme',
            title: 'Grab Me',
            tag: 'PWA Marketplace',
            desc: 'A scalable, commission-free marketplace for local technicians built as a PWA MVP in a record-breaking 72-hour sprint.',
            logo: '/grabme.png',
            color: 'var(--primary)', 
            bgClasses: 'hover:border-[var(--primary)] shadow-[0_0_0_rgba(0,102,255,0)] hover:shadow-[0_15px_40px_rgba(0,102,255,0.15)]',
            gradient: 'from-[var(--primary)]/20'
        }
    ];

    return (
        <main className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans pt-[120px] pb-24 overflow-x-hidden relative">
            {/* Premium Background Image */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505] overflow-hidden">
                <Image
                    src="/digital-assets-bg.png"
                    alt="Background"
                    fill
                    priority
                    quality={100}
                    className="object-cover object-center opacity-100"
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-[#050505]" />
            </div>

            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-24 mt-8">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
                        <AvailabilityBadge />
                        <span className="hidden sm:block text-zinc-700 text-xs">•</span>
                        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-zinc-400 font-mono">
                            <span className="text-[var(--primary)] mr-1">&gt;_</span> HIGH-VELOCITY ARCHITECTURES. PROVEN SCALE.
                        </span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] font-['Plus_Jakarta_Sans',sans-serif] mb-6">
                        <span className="text-white block mb-2">Our</span>
                        <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-transparent bg-clip-text">Case Studies.</span>
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-['Inter',sans-serif] leading-relaxed">
                        Explore how we partner with ambitious founders to build and scale high-performance digital products at unprecedented speeds.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
                    {caseStudies.map((study) => (
                        <Link 
                            href={`/case-studies/${study.slug}`} 
                            key={study.slug} 
                            className={`group block relative bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 sm:p-10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${study.bgClasses}`}
                        >
                            {/* Hover Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                            
                            <div className="relative z-10 flex flex-col h-full">
                                {/* Top row: Logo & Tag */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center p-1.5 border border-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500 bg-black/50 backdrop-blur-md">
                                        <img src={study.logo} alt={study.title} className="w-full h-full object-contain rounded-lg" />
                                    </div>
                                    <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-zinc-300 group-hover:bg-white/10 transition-colors">
                                        {study.tag}
                                    </span>
                                </div>
                                
                                {/* Content */}
                                <h2 className="text-3xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] mb-4">
                                    {study.title}
                                </h2>
                                
                                <p className="text-zinc-400 font-['Inter',sans-serif] leading-relaxed mb-12 flex-1">
                                    {study.desc}
                                </p>
                                
                                {/* CTA */}
                                <div 
                                    className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase mt-auto group-hover:gap-5 transition-all duration-300" 
                                    style={{ color: study.color }}
                                >
                                    <span>Read Case Study</span>
                                    <i className="fa-solid fa-arrow-right"></i>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
