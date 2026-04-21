import React from 'react';
import pseoData from '@/data/pseo-slugs.json';
import CostToBuildClient from './CostToBuildClient';
import { PSEOSlug } from '@/types/pseo';
import { Metadata } from 'next';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
    title: 'How Much Does It Cost to Build Your App? | Mr² Labs',
    description: 'Discover realistic development costs, tech stack requirements, and timelines for building AI-powered SaaS and enterprise applications in 2026.',
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/cost-to-build`,
    }
};

export default function CostToBuildPage() {
    // Cast the imported data to our new type
    const typedData = pseoData as PSEOSlug[];

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-blue-500/30 overflow-x-hidden pt-32 pb-24">
            <Navbar />
            
            {/* Background Decoration */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-b from-blue-600/10 via-indigo-600/10 to-purple-600/10 rounded-full blur-[80px] mix-blend-screen opacity-50"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-[100px] mix-blend-screen"></div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]"></div>
            </div>

            {/* Header Section */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    MVP PRICING & ARCHITECTURE
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                    How Much Does It Cost to <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
                        Build Your App?
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto font-light">
                    Select your project type below to see the exact tech stack required, bloated traditional agency quotes, and how <strong className="text-white">Mr² Labs ships it in under 72 hours.</strong>
                </p>
            </div>

            {/* Client Component Island */}
            <CostToBuildClient data={typedData} />
            
        </div>
    );
}
