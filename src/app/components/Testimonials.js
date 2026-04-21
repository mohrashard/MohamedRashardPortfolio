"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function SocialProof() {

    const [hovered, setHovered] = useState(null);

    const stats = [
        {
            icon: "fas fa-graduation-cap",
            headline: "First Class Honours",
            subtitle: "Cardiff Metropolitan University",
            detail: "B.Sc. Software Engineering with highest distinction in full-stack architecture and AI systems.",
            color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
            glow: "rgba(59,130,246,0.1)",
        },
        {
            icon: "fas fa-bolt",
            headline: "72 Hours",
            subtitle: "Average MVP Delivery Time",
            detail: "From initial scope lock to a live, working product on a real URL. Fast-track execution without quality compromise.",
            color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
            glow: "rgba(245,158,11,0.1)",
        },
        {
            icon: "fas fa-robot",
            headline: "10+",
            subtitle: "AI Platforms Shipped",
            detail: "Intelligent systems integrating LLMs (Gemini/GPT), vector databases (Pinecone), and automated RAG pipelines.",
            color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
            glow: "rgba(6,182,212,0.1)",
        },
        {
            icon: "fas fa-tools",
            headline: "15+ Technologies",
            subtitle: "Battle-Tested Tech Stack",
            detail: "Next.js, React, Python, Flask, JavaScript, AI/ML, TypeScript, SQL, Supabase, Tailwind, REST APIs, and more.",
            color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
            glow: "rgba(168,85,247,0.1)",
        },
        {
            icon: "fas fa-check-circle",
            headline: "100%",
            subtitle: "On-Time Delivery Rate",
            detail: "A zero-latency commitment to client deadlines through streamlined development and direct-to-expert communication.",
            color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
            glow: "rgba(16,185,129,0.1)",
        },
        {
            icon: "fas fa-globe-americas",
            headline: "3 Continents",
            subtitle: "Clients Served Globally",
            detail: "Active partnerships and live software solutions deployed across the UK, Asia, and the Middle East.",
            color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
            glow: "rgba(244,63,94,0.1)",
        },
    ];

    return (
        <section className="py-24 px-6 md:px-12 bg-[#050505] border-t border-white/5 relative overflow-hidden">

            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* ── HEADER ── */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <i className="fas fa-shield-check"></i> Proof Over Promises
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white tracking-tight leading-[1.1]">
                        Why Founders Trust<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Mr² Labs</span>
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        The metrics that define our speed, expertise, and commitment to shipping high-impact software.
                    </p>
                </div>

                {/* ── METRICS BOARD GRID ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {stats.map((s, i) => (
                        <div key={i}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            className={`relative bg-[#0a0a0a] rounded-2xl p-8 border ${s.color.split(' ').slice(1).join(' ')} overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.02]`}>

                            {/* glow on hover */}
                            <div className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-500"
                                style={{
                                    background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${s.glow} 0%, transparent 70%)`,
                                    opacity: hovered === i ? 1 : 0
                                }}></div>

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-8">
                                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${s.color}`}>
                                        <i className={`${s.icon} text-xl`}></i>
                                    </div>
                                </div>

                                <div className={`font-black tracking-tighter mb-1 ${s.color.split(' ')[0]}`}
                                    style={{ fontSize: '2.5rem', lineHeight: 1 }}>
                                    {s.headline}
                                </div>
                                <div className="text-sm font-bold text-white mb-2 uppercase tracking-wide">
                                    {s.subtitle}
                                </div>
                                <div className="h-px w-12 bg-white/10 mb-4"></div>
                                <p className="text-slate-400 text-sm leading-relaxed font-light">
                                    {s.detail}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── TRUST FOOTER ── */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-slate-500 text-sm text-center md:text-left font-light">
                        Verified achievement based on active shipping history and academic records across 3 continents.
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-6">
                        {[
                            { icon: "fas fa-shield-halved", text: "Honest metrics only" },
                            { icon: "fas fa-code-branch", text: "Trackable build history" },
                            { icon: "fas fa-user-check", text: "References on request" },
                        ].map((item, i) => (
                            <span key={i} className="inline-flex items-center gap-2 text-xs text-slate-500 font-light uppercase tracking-widest">
                                <i className={`${item.icon} text-slate-600`}></i>
                                {item.text}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Secondary CTA */}
                <div className="mt-12 text-center">
                    <Link href="/services#audit-form" 
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-slate-300 font-bold hover:bg-white/10 hover:border-white/20 transition-all group">
                        <span>Build your project with these standards</span>
                        <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                    </Link>
                </div>

            </div>
        </section>
    );
}