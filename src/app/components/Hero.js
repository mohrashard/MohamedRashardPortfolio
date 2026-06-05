"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Cpu,
    Layers,
    Network,
    LineChart,
    ArrowUpRight,
    Activity,
    Terminal,
    Workflow
} from "lucide-react";
import AvailabilityBadge from "./AvailabilityBadge";
import Link from "next/link";

const MotionLink = motion.create(Link);

// Global Font Inline Fallbacks to map your requested typography perfectly
const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

export default function Hero() {
    return (
        <section id="home" className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col justify-between pt-24 border-b border-white/[0.04]">

            {/* ── Premium Background Image ── */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-bg.png"
                    alt=""
                    fill
                    priority
                    quality={90}
                    className="object-cover object-center opacity-60"
                    aria-hidden="true"
                />
                {/* Darken the edges so content stays readable */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />
            </div>

            {/* Structural Engineering Blueprint Grid Lines */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_60%,transparent_100%)]" />

            {/* Concentric Ring Accents */}
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/[0.025] rounded-full pointer-events-none z-0" />
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/[0.035] border-dashed rounded-full pointer-events-none z-0" />

            {/* Core Brand & Typography Header Section */}
            <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 text-center flex flex-col items-center space-y-6 pt-24">

                {/* Tactical Status Pill */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-wrap justify-center items-center gap-2 sm:gap-3"
                >
                    <AvailabilityBadge />
                    <span className="hidden sm:block w-1 h-1 bg-zinc-700 rounded-full" />
                    <div className="hidden sm:flex items-center gap-1.5 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-bold text-zinc-400" style={fontLabel}>
                        <Terminal size={10} className="text-[var(--accent)]" /> AI Systems. Real Outcomes.
                    </div>
                </motion.div>

                {/* Main Command Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold text-zinc-50 tracking-tight leading-[1.1] sm:leading-[1.02] max-w-4xl"
                    style={fontHeadline}
                >
                    We Ship Your MVP <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-zinc-50">
                        in 48 Hours.
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.h2
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="text-lg sm:text-xl md:text-2xl font-medium text-zinc-300"
                >
                    <span className="text-[var(--primary)] font-semibold">Rapid Software & AI Labs.</span> <span className="block sm:inline">Architecting systems from Sri Lanka.</span>
                </motion.h2>

                {/* Sub-description */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-zinc-400 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed font-normal opacity-90 mx-auto px-2 sm:px-0"
                    style={fontBody}
                >
                    High-performance AI tools, SaaS platforms, and tailored web apps for founders who are done waiting. Trusted by global startups to deliver scalable revenue ecosystems.
                </motion.p>

                {/* Primary Action Row */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-4 w-full sm:w-auto"
                >
                    <MotionLink
                        href="/services#audit-form"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 bg-[var(--primary)] hover:bg-[#0055d4] text-white text-[10px] sm:text-[11px] md:text-xs font-bold tracking-[0.15em] uppercase rounded-full sm:rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(0,102,255,0.5)] hover:shadow-[0_0_60px_rgba(0,102,255,0.7)]"
                        style={fontLabel}
                    >
                        <span>Build Your AI System</span>
                        <ArrowUpRight size={14} />
                    </MotionLink>

                    <MotionLink
                        href="#work"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent hover:from-white/[0.08] hover:to-white/[0.02] text-zinc-400 hover:text-white text-[10px] sm:text-[11px] md:text-xs font-bold tracking-[0.15em] uppercase rounded-full sm:rounded-lg backdrop-blur-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                        style={fontLabel}
                    >
                        <span>Explore Solutions</span>
                    </MotionLink>
                </motion.div>
            </div>

            {/* Central Interactive Neural Topology Diagram Area */}
            <div className="relative z-20 max-w-6xl mx-auto w-full px-6 mt-12 md:mt-20 h-[380px] hidden md:flex items-center justify-center">

                {/* SVG Vector Connection Circuit Paths */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    {/* Static connection lines */}
                    <motion.path
                        d="M 150 90 Q 300 90, 320 190 M 150 290 Q 300 290, 320 190"
                        fill="none" stroke="rgba(0, 102, 255, 0.15)" strokeWidth="1.5"
                    />
                    <motion.path
                        d="M 950 90 Q 800 90, 800 190 M 950 290 Q 800 290, 800 190"
                        fill="none" stroke="rgba(0, 102, 255, 0.15)" strokeWidth="1.5"
                    />
                    {/* Animated Data Pulses */}
                    <motion.path
                        d="M 150 90 Q 300 90, 320 190" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6"
                        strokeDasharray="20 100" animate={{ strokeDashoffset: [120, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    />
                    <motion.path
                        d="M 950 290 Q 800 290, 800 190" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6"
                        strokeDasharray="20 100" animate={{ strokeDashoffset: [0, 120] }} transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
                    />
                </svg>

                {/* Left Tier: Inputs & Workers */}
                <div className="absolute left-0 flex flex-col gap-12">
                    {/* Node A: 72-Hour MVP Engine */}
                    <div className="relative overflow-hidden border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-5 rounded-2xl w-56 space-y-2 transition-all duration-500 hover:border-[var(--primary)]/40 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,102,255,0.15)] group">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <div className="relative z-10 flex items-center gap-2 text-xs font-semibold text-zinc-100" style={fontHeadline}>
                            <Network size={14} className="text-[var(--primary)]" /> 72-Hour MVP Engine
                        </div>
                        <p className="relative z-10 text-[11px] text-zinc-400 font-light" style={fontBody}>Deploying minimal software products and automated revenue systems in rapid engineering sprint cycles.</p>
                        <div className="relative z-10 flex items-center gap-1 text-[9px] text-emerald-400 font-medium uppercase tracking-wider mt-2" style={fontLabel}>
                            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" /> ACTIVE SPRINTS
                        </div>
                    </div>

                    {/* Node B: Local-First AI Architecture */}
                    <div className="relative overflow-hidden border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-5 rounded-2xl w-56 space-y-2 transition-all duration-500 hover:border-[var(--primary)]/40 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,102,255,0.15)] group">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <div className="relative z-10 flex items-center gap-2 text-xs font-semibold text-zinc-100" style={fontHeadline}>
                            <LineChart size={14} className="text-[var(--primary)]" /> Local-First AI Architecture
                        </div>
                        <p className="relative z-10 text-[11px] text-zinc-400 font-light" style={fontBody}>Engineering $0-subscription, localized AI pipelines for complex media, video, and data processing.</p>
                        <div className="relative z-10 flex items-center gap-1 text-[9px] text-emerald-400 font-medium uppercase tracking-wider mt-2" style={fontLabel}>
                            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" /> MODELS DEPLOYED
                        </div>
                    </div>
                </div>

                {/* Center Absolute Core: Orchestrator Node */}
                <div className="absolute z-30 flex flex-col items-center">
                    <motion.div
                        whileHover={{ scale: 1.04 }}
                        className="w-20 h-20 border border-[var(--primary)]/50 bg-[var(--primary)]/[0.05] backdrop-blur-2xl shadow-[0_0_40px_rgba(0,102,255,0.3)] rounded-2xl flex items-center justify-center cursor-pointer group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <div className="absolute inset-0 bg-[var(--accent)]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />
                        <Cpu size={32} className="relative z-10 text-zinc-100 group-hover:text-[var(--accent)] transition-colors" />
                    </motion.div>
                    <div className="text-center mt-3 space-y-0.5">
                        <span className="text-xs font-bold text-zinc-100 uppercase tracking-widest block" style={fontHeadline}>Orchestrator</span>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold" style={fontLabel}>Core Architecture</span>
                    </div>
                </div>

                {/* Right Tier: Functional Infrastructure */}
                <div className="absolute right-0 flex flex-col gap-12 items-end">
                    {/* Node C: Scalable Platform Infrastructure */}
                    <div className="relative overflow-hidden border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-5 rounded-2xl w-56 space-y-2 transition-all duration-500 hover:border-[var(--primary)]/40 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,102,255,0.15)] group">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <div className="relative z-10 flex items-center gap-2 text-xs font-semibold text-zinc-100" style={fontHeadline}>
                            <Workflow size={14} className="text-[var(--primary)]" /> Scalable Platform Infrastructure
                        </div>
                        <p className="relative z-10 text-[11px] text-zinc-400 font-light" style={fontBody}>Architecting secure directories, robust relational databases, and automated web platforms.</p>
                        <div className="relative z-10 flex items-center gap-1 text-[9px] text-emerald-400 font-medium uppercase tracking-wider mt-2" style={fontLabel}>
                            <span className="w-1 h-1 rounded-full bg-emerald-500" /> OPERATIONAL
                        </div>
                    </div>

                    {/* Node D: Studio Metrics */}
                    <div className="relative overflow-hidden border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-5 rounded-2xl w-56 space-y-3 transition-all duration-500 hover:border-[var(--primary)]/40 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,102,255,0.15)] group">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <div className="relative z-10 flex justify-between items-center border-b border-white/[0.08] pb-2">
                            <span className="text-[9px] tracking-[0.2em] font-bold text-zinc-400 uppercase" style={fontLabel}>STUDIO VELOCITY</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                        </div>
                        <div className="relative z-10 grid grid-cols-2 gap-2 text-left pt-1">
                            <div>
                                <div className="text-xs font-bold text-zinc-100" style={fontHeadline}>&lt; 72h</div>
                                <div className="text-[9px] text-zinc-400 font-medium" style={fontBody}>Sprint Cycles</div>
                            </div>
                            <div>
                                <div className="text-xs font-bold text-zinc-100" style={fontHeadline}>100%</div>
                                <div className="text-[9px] text-zinc-400 font-medium" style={fontBody}>Local & Owned</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom fade into next section */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />
        </section>
    );
}