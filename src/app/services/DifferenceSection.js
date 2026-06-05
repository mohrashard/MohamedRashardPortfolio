'use client';

import { useEffect, useRef, useState } from 'react';
import { Terminal, Zap, Cpu, ShieldCheck, Layers, Clock } from 'lucide-react';

const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

export default function DifferenceSection() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="mb-24 relative z-10 px-4 sm:px-6 md:px-0"
            aria-label="Operational Advantage"
        >
            <div className="max-w-6xl mx-auto">

                {/* Outer card */}
                <div className="relative rounded-[2.5rem] border border-white/[0.07] bg-[#080808]/90 backdrop-blur-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">

                    {/* Ambient glows */}
                    <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-[var(--primary)]/10 rounded-full blur-[130px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[380px] h-[380px] bg-[var(--accent)]/6 rounded-full blur-[110px] pointer-events-none" />

                    {/* ── Book-opening divider (center bar that grows in height) ── */}
                    <div
                        className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent transition-all duration-[1200ms] ease-in-out"
                        style={{ height: visible ? '100%' : '0%' }}
                        aria-hidden="true"
                    />

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2">

                        {/* ── LEFT PANEL — slides in from left ── */}
                        <div
                            className="p-8 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-center transition-all duration-[900ms] ease-out border-b md:border-b-0 border-white/[0.06]"
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateX(0)' : 'translateX(-56px)',
                                transitionDelay: '150ms',
                            }}
                        >
                            {/* Badge */}
                            <div
                                className="inline-flex items-center gap-2 mb-8 self-start px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-zinc-400 text-[10px] font-bold uppercase tracking-[0.22em]"
                                style={fontLabel}
                            >
                                <Terminal size={13} className="text-[var(--accent)]" />
                                <span>Operational Advantage</span>
                            </div>

                            <h2
                                className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-zinc-50 mb-5 leading-[1.1] tracking-tight"
                                style={fontHeadline}
                            >
                                Where agencies invoice<br className="hidden sm:block" /> for months,
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] mt-1">
                                    We deploy in hours.
                                </span>
                            </h2>

                            <p
                                className="text-zinc-400 text-sm sm:text-[0.9rem] leading-relaxed mb-9 max-w-md"
                                style={fontBody}
                            >
                                Mr² Labs bypasses corporate lag. We engineer Next.js and Supabase architectures powered by custom AI workflows. No endless discovery phases, just production-grade systems shipped in rapid sprints.
                            </p>

                            {/* Feature list */}
                            <ul className="space-y-3.5 text-sm">
                                {[
                                    { icon: <Zap size={15} />, text: "Production-ready MVPs shipped in 48-72 hours.", color: "text-[var(--accent)] border-[var(--accent)]/20 bg-[var(--accent)]/8" },
                                    { icon: <Cpu size={15} />, text: "AI-native infrastructure via Gemini and local models.", color: "text-[var(--primary)] border-[var(--primary)]/20 bg-[var(--primary)]/8" },
                                    { icon: <ShieldCheck size={15} />, text: "Direct founder-level engineering. Zero middlemen.", color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/8" },
                                    { icon: <Layers size={15} />, text: "Fixed-scope architecture with zero hidden overhead.", color: "text-zinc-300 border-white/10 bg-white/4" },
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-3.5 text-zinc-300 font-medium"
                                        style={{
                                            ...fontBody,
                                            opacity: visible ? 1 : 0,
                                            transform: visible ? 'translateX(0)' : 'translateX(-24px)',
                                            transition: `opacity 600ms ease ${350 + i * 80}ms, transform 600ms ease ${350 + i * 80}ms`,
                                        }}
                                    >
                                        <div className={`mt-0.5 w-[26px] h-[26px] rounded-lg flex items-center justify-center border flex-shrink-0 ${item.color}`}>
                                            {item.icon}
                                        </div>
                                        <span className="leading-snug pt-0.5">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ── RIGHT PANEL — slides in from right ── */}
                        <div
                            className="p-8 sm:p-10 md:p-12 lg:p-14 bg-white/[0.01] flex flex-col justify-center transition-all duration-[900ms] ease-out"
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateX(0)' : 'translateX(56px)',
                                transitionDelay: '150ms',
                            }}
                        >
                            {/* Badge */}
                            <div
                                className="inline-flex items-center gap-2 mb-8 self-start px-3 py-1.5 rounded border border-white/[0.08] bg-white/[0.02] text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]"
                                style={fontLabel}
                            >
                                <Clock size={14} className="text-[var(--primary)]" />
                                <span>[ ] Sprint Telemetry</span>
                            </div>

                            {/* Timeline */}
                            <div className="space-y-2 relative">
                                {/* Vertical connector line */}
                                <div
                                    className="absolute left-[52px] top-6 bottom-8 w-px bg-gradient-to-b from-[var(--primary)]/40 via-white/[0.06] to-transparent transition-all duration-[1400ms] ease-in-out"
                                    style={{ opacity: visible ? 1 : 0, transitionDelay: '600ms' }}
                                    aria-hidden="true"
                                />

                                {[
                                    { phase: "T-00h", label: "Architecture Lock", desc: "Scope frozen, cloud infrastructure spin-up begins immediately.", active: true },
                                    { phase: "T-48h", label: "Production Deployment", desc: "Core system deployed to a live, secure URL. Ready for testing.", active: true },
                                    { phase: "W-02+", label: "System Scaling", desc: "Feature expansion, UI polish, and complex AI workflow integration.", active: false },
                                    { phase: "Ongoing", label: "Infrastructure Ops", desc: "Continuous telemetry, server maintenance, and scale operations.", active: false },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/[0.025] border border-transparent hover:border-white/[0.05] transition-all duration-300 relative z-10 cursor-default"
                                        style={{
                                            opacity: visible ? 1 : 0,
                                            transform: visible ? 'translateX(0)' : 'translateX(32px)',
                                            transition: `opacity 600ms ease ${500 + i * 100}ms, transform 600ms ease ${500 + i * 100}ms`,
                                        }}
                                    >
                                        {/* Phase badge */}
                                        <div
                                            className={`flex-shrink-0 mt-0.5 w-[72px] flex items-center justify-center py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-wider border transition-all duration-300 ${item.active
                                                ? 'text-[var(--accent)] bg-[var(--accent)]/10 border-[var(--accent)]/25 shadow-[0_0_18px_rgba(56,189,248,0.12)] group-hover:shadow-[0_0_28px_rgba(56,189,248,0.22)]'
                                                : 'text-zinc-500 bg-white/[0.03] border-white/[0.08]'
                                                }`}
                                            style={fontLabel}
                                        >
                                            {item.phase}
                                        </div>
                                        <div>
                                            <div
                                                className="text-zinc-100 font-bold text-sm mb-1 group-hover:text-[var(--primary)] transition-colors duration-300"
                                                style={fontHeadline}
                                            >
                                                {item.label}
                                            </div>
                                            <div className="text-zinc-500 text-xs leading-relaxed" style={fontBody}>
                                                {item.desc}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
