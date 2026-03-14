"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function SocialProof() {

    const [hovered, setHovered] = useState(null);

    const outcomes = [
        {
            icon: "fas fa-magnifying-glass-dollar",
            project: "BizFinder AI",
            metric: "5hrs",
            metricLabel: "saved per week",
            detail: "Replaced manual lead research with an AI pipeline that finds and qualifies high-intent business leads automatically using Gemini API.",
            tag: "Verified outcome",
            color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
            glow: "rgba(59,130,246,0.1)",
        },
        {
            icon: "fas fa-heart-pulse",
            project: "LiverLens",
            metric: "92%",
            metricLabel: "prediction accuracy",
            detail: "XGBoost ML model trained and integrated into a full-stack React and Flask platform for liver disease risk prediction with real-time visualization.",
            tag: "Measured result",
            color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
            glow: "rgba(6,182,212,0.1)",
        },
        {
            icon: "fas fa-bolt",
            project: "MVP Standard",
            metric: "48hrs",
            metricLabel: "to live product",
            detail: "Every MVP I take on ships as a live, testable product within 48 to 72 hours. Not a prototype. Not a mockup. A working app with a real URL.",
            tag: "Delivery standard",
            color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
            glow: "rgba(245,158,11,0.1)",
        },
    ];

    const academicRef = {
        quote: "Mohamed demonstrated exceptional ability in architecting full-stack systems with AI integration - well beyond standard expectations for the program.",
        name: "Academic Assessment",
        role: "B.Sc. Software Engineering",
        institution: "Cardiff Metropolitan University, 2026",
        badge: "First Class Honours",
        icon: "fas fa-graduation-cap",
        note: "Paraphrased from academic feedback. Available on request."
    };

    return (
        <section className="py-24 px-6 md:px-12 bg-[#050505] border-t border-white/5 relative overflow-hidden">

            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* ── HEADER ── */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <i className="fas fa-chart-bar"></i> Proof
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white tracking-tight leading-[1.1]">
                        Results speak.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Numbers do not lie.</span>
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        Verified outcomes from shipped projects. Every metric is real and traceable to a live build.
                    </p>
                </div>

                {/* ── PROJECT OUTCOME CARDS ── */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {outcomes.map((o, i) => (
                        <div key={i}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            className={`relative bg-[#0a0a0a] rounded-2xl p-8 border ${o.color.split(' ').slice(1).join(' ')} overflow-hidden cursor-default transition-transform duration-300 hover:-translate-y-1`}>

                            {/* glow on hover */}
                            <div className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-500"
                                style={{
                                    background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${o.glow} 0%, transparent 70%)`,
                                    opacity: hovered === i ? 1 : 0
                                }}></div>

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-8">
                                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${o.color}`}>
                                        <i className={`${o.icon} text-xl`}></i>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest ${o.color}`}>
                                        {o.tag}
                                    </span>
                                </div>

                                <div className={`font-black tracking-tight mb-1 ${o.color.split(' ')[0]}`}
                                    style={{ fontSize: '3rem', lineHeight: 1 }}>
                                    {o.metric}
                                </div>
                                <div className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">
                                    {o.metricLabel}
                                </div>
                                <div className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest">
                                    {o.project}
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed font-light">
                                    {o.detail}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── BOTTOM ROW: Academic ref + Testimonial slot ── */}
                <div className="grid md:grid-cols-2 gap-6">

                    {/* Academic reference */}
                    <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-white/5 relative overflow-hidden transition-colors hover:border-white/10">
                        <i className="fas fa-quote-left absolute top-6 right-6 text-white/[0.03]"
                            style={{ fontSize: '5rem' }}></i>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                                    <i className={`${academicRef.icon} text-cyan-400 text-lg`}></i>
                                </div>
                                <div>
                                    <div className="text-white font-bold text-base">{academicRef.name}</div>
                                    <div className="text-slate-500 text-xs">{academicRef.institution}</div>
                                </div>
                                <span className="ml-auto text-[10px] font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-widest flex-shrink-0">
                                    {academicRef.badge}
                                </span>
                            </div>
                            <p className="text-slate-300 leading-relaxed font-light mb-6 italic text-lg">
                                "{academicRef.quote}"
                            </p>
                            <p className="text-slate-500 text-xs font-light">
                                <i className="fas fa-circle-info mr-2"></i>
                                {academicRef.note}
                            </p>
                        </div>
                    </div>

                    {/* Testimonial slot */}
                    <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-dashed border-white/10 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
                        <div className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.05) 0%, transparent 70%)' }}></div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                                    <i className="fas fa-star text-blue-400 text-lg"></i>
                                </div>
                                <p className="text-white font-bold text-xl mb-3 tracking-tight">
                                    Be the first client to leave a review.
                                </p>
                                <p className="text-slate-400 text-sm leading-relaxed font-light mb-8">
                                    I am actively taking on new projects and building my client track record.
                                    Claim a free AI Audit - if I deliver value, I will ask for one honest sentence in return.
                                    That is the deal.
                                </p>
                            </div>
                            <Link href="/services#audit-form"
                                className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors group/cta">
                                <i className="fas fa-magnifying-glass text-xs"></i>
                                Claim your free audit
                                <i className="fas fa-arrow-right text-xs group-hover/cta:translate-x-1 transition-transform"></i>
                            </Link>
                        </div>
                    </div>

                </div>

                {/* ── TRUST FOOTER ── */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-slate-500 text-sm text-center md:text-left font-light">
                        All metrics are sourced from real project builds. No paid testimonials. No fabricated reviews.
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-6">
                        {[
                            { icon: "fas fa-shield-halved", text: "Honest metrics only" },
                            { icon: "fas fa-code-branch", text: "Open source projects" },
                            { icon: "fas fa-envelope", text: "References on request" },
                        ].map((item, i) => (
                            <span key={i} className="inline-flex items-center gap-2 text-sm text-slate-500 font-light">
                                <i className={`${item.icon} text-slate-600`}></i>
                                {item.text}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}