"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
    ArrowUpRight,
    Award,
    Globe,
    Zap,
    Layers,
    BrainCircuit,
    BarChart2,
    Terminal,
} from "lucide-react";

// ── Font tokens ───────────────────────────────────────────────
const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

// ── Animation variants (stagger via parent) ───────────────────
const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.09, delayChildren: 0.05 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 28, willChange: "opacity, transform" },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
    },
};

const itemLeft = {
    hidden: { opacity: 0, x: -20, willChange: "opacity, transform" },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
    },
};

// ── Lightweight scroll-reveal wrapper ────────────────────────
// One IntersectionObserver per visible section — far cheaper than per-element.
function ScrollReveal({ children, className = "", delay = 0, direction = "up" }) {
    const ref = useRef(null);
    // margin tuned for mobile: trigger 40px before entering viewport
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const from = direction === "left" ? { opacity: 0, x: -20 } : { opacity: 0, y: 24 };
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={from}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : from}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
            style={{ willChange: "opacity, transform" }}
        >
            {children}
        </motion.div>
    );
}

// ── Staggered container — one observer for the whole group ───
function StaggerGroup({ children, className = "" }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    return (
        <motion.div
            ref={ref}
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            {children}
        </motion.div>
    );
}

// ── Data ──────────────────────────────────────────────────────
const stats = [
    { value: "< 72h", label: "Sprint Velocity" },
    { value: "10+", label: "Systems Deployed" },
    { value: "100%", label: "Client IP Ownership" },
    { value: "3", label: "Core Stacks" },
];

const milestones = [
    {
        date: "2026 →",
        badge: "Active Operations",
        title: "Global Systems Deployment",
        body: "Architecting high-ticket AI tools, SaaS platforms, and intelligent automation for enterprises across the US, UK, Canada, and Australia.",
        accent: true,
    },
    {
        date: "2026",
        badge: "Genesis",
        title: "Mr² Labs Founded",
        body: "Established as a rapid AI & software labs with a singular focus: shipping production-ready systems in 72 hours with zero corporate bloat.",
        accent: false,
    },
    {
        date: "2026",
        badge: "Engineering Standard",
        title: "Academic Rigor Meets Agile Execution",
        body: "Studio leadership secured First Class Honours in Software Engineering (B.Sc. Cardiff Metropolitan), embedding strict architectural standards into our rapid delivery pipelines.",
        accent: false,
    },
    {
        date: "Core",
        badge: "Philosophy",
        title: "Local-First Architecture",
        body: "Pioneered a strict engineering thesis focusing on $0-subscription AI, deploying localized database models, and ensuring 100% client code ownership.",
        accent: false,
    },
];

const expertise = [
    {
        Icon: BrainCircuit,
        title: "AI Integration",
        desc: "Custom models trained on your data, local-first video pipelines, prediction engines, and background worker automation.",
        accent: "#0066ff",
    },
    {
        Icon: Layers,
        title: "Systems Architecture",
        desc: "End-to-end infrastructure ownership. Heavy-duty backend logic engineered in Python, Rust, and Next.js.",
        accent: "#38BDF8",
    },
    {
        Icon: Zap,
        title: "72-Hour Sprints",
        desc: "Tight scope, hyper-fast execution. Real users testing your product in days instead of months.",
        accent: "#f59e0b",
    },
    {
        Icon: BarChart2,
        title: "Revenue Operations",
        desc: "Architecting for scale from day one — automated systems designed to process high-ticket volumes securely.",
        accent: "#10b981",
    },
];

// ── Milestone Card ────────────────────────────────────────────
function MilestoneItem({ m, last }) {
    return (
        <motion.div
            variants={itemLeft}
            className={`relative flex gap-4 sm:gap-6 group ${last ? "" : "pb-8 sm:pb-10"}`}
        >
            {/* Timeline spine */}
            {!last && (
                <div className="absolute left-[22px] sm:left-[26px] top-8 bottom-0 w-px bg-gradient-to-b from-white/[0.08] to-transparent" />
            )}

            {/* Node dot */}
            <div className="flex-shrink-0 w-11 sm:w-13 flex flex-col items-center pt-1">
                <span
                    className={`w-3 h-3 rounded-full border flex-shrink-0 transition-all duration-500 ${m.accent
                        ? "bg-[var(--primary)] border-[var(--primary)] shadow-[0_0_14px_rgba(0,102,255,0.55)]"
                        : "bg-zinc-800 border-zinc-700 group-hover:border-[var(--primary)]/50"
                        }`}
                />
                <span
                    className="text-[10px] text-zinc-600 font-semibold tracking-wider mt-2 hidden sm:block"
                    style={fontLabel}
                >
                    {m.date}
                </span>
            </div>

            {/* Card */}
            <div
                className={`flex-1 rounded-xl border p-5 sm:p-6 transition-all duration-400 group-hover:-translate-y-0.5 ${m.accent
                    ? "border-[var(--primary)]/25 bg-gradient-to-br from-[var(--primary)]/[0.07] via-white/[0.015] to-transparent shadow-[0_6px_32px_rgba(0,102,255,0.10)]"
                    : "border-white/[0.07] bg-white/[0.025] group-hover:border-white/[0.12]"
                    }`}
            >
                {/* Mobile date */}
                <span className="text-[10px] text-zinc-600 font-semibold tracking-wider sm:hidden block mb-1" style={fontLabel}>
                    {m.date}
                </span>
                <span
                    className={`inline-block text-[9px] tracking-[0.2em] uppercase font-bold px-2.5 py-0.5 rounded-full mb-2.5 border ${m.accent
                        ? "text-[var(--primary)] bg-[var(--primary)]/10 border-[var(--primary)]/20"
                        : "text-zinc-500 bg-white/[0.04] border-white/[0.07]"
                        }`}
                    style={fontLabel}
                >
                    {m.badge}
                </span>
                <h3
                    className={`text-base sm:text-lg font-bold tracking-tight mb-1.5 leading-snug ${m.accent ? "text-zinc-50" : "text-zinc-200"}`}
                    style={fontHeadline}
                >
                    {m.title}
                </h3>
                <p className="text-[13px] text-zinc-500 leading-relaxed" style={fontBody}>
                    {m.body}
                </p>
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════
export default function About() {
    return (
        <section
            id="about"
            className="relative w-full overflow-hidden bg-[#050505] border-t border-white/[0.04]"
            // CSS containment: reduces browser repaint scope
            style={{ contain: "paint" }}
        >
            {/* ── Background image (lazy, low-priority) ── */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src="/about-bg.png"
                    alt=""
                    fill
                    quality={75}
                    priority={false}
                    className="object-cover object-center opacity-50"
                    aria-hidden="true"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-[#050505]/60" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/50 via-transparent to-[#050505]/50" />
            </div>

            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.012) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(255,255,255,0.012) 1px, transparent 1px)`,
                    backgroundSize: "5rem 5rem",
                    maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, #000 50%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, #000 50%, transparent 100%)",
                }}
            />

            {/* ════════════════════════════════════════════
                  HERO COPY
                ════════════════════════════════════════════ */}
            <div className="relative z-10 max-w-4xl mx-auto w-full px-5 sm:px-8 md:px-12 pt-20 sm:pt-24 pb-16 sm:pb-20 text-center flex flex-col items-center gap-5 sm:gap-6">

                <ScrollReveal>
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[10px] tracking-[0.25em] uppercase font-semibold text-zinc-400"
                        style={fontLabel}
                    >
                        <Terminal size={10} className="text-[var(--accent)]" />
                        Our Thesis
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.06}>
                    <h2
                        className="text-[clamp(2rem,6vw,3.75rem)] font-extrabold text-zinc-50 tracking-tight leading-[1.05]"
                        style={fontHeadline}
                    >
                        We engineer{" "}
                        <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-zinc-200">
                            intelligent infrastructure
                        </em>{" "}
                        for founders who scale.
                    </h2>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                    <p
                        className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl"
                        style={fontBody}
                    >
                        <strong className="text-zinc-200 font-semibold">Mr² Labs</strong> is an elite systems
                        architecture firm based in{" "}
                        <strong className="text-zinc-200 font-semibold">Colombo, Sri Lanka</strong>. Founded by
                        Mohamed Rashard, we bypass corporate bloat to deliver production-ready software and AI
                        ecosystems at 72-hour sprint velocity.
                    </p>
                </ScrollReveal>

                {/* Stats row — stagger as group */}
                <StaggerGroup className="flex flex-wrap justify-center gap-6 sm:gap-10 pt-4">
                    {stats.map((s, i) => (
                        <motion.div key={i} variants={itemVariants} className="flex flex-col items-center gap-1">
                            <span className="text-2xl sm:text-3xl font-black text-zinc-50" style={fontHeadline}>
                                {s.value}
                            </span>
                            <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-semibold" style={fontLabel}>
                                {s.label}
                            </span>
                        </motion.div>
                    ))}
                </StaggerGroup>
            </div>

            <Divider />

            {/* ════════════════════════════════════════════
                  TIMELINE
                ════════════════════════════════════════════ */}
            <div className="relative z-10 max-w-3xl mx-auto w-full px-5 sm:px-8 md:px-12 py-14 sm:py-20">

                <ScrollReveal className="text-center mb-10 sm:mb-12">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-semibold" style={fontLabel}>
                        Firm Chronicle
                    </p>
                </ScrollReveal>

                {/* Each milestone triggers itself */}
                <StaggerGroup className="space-y-0">
                    {milestones.map((m, i) => (
                        <MilestoneItem key={i} m={m} last={i === milestones.length - 1} />
                    ))}
                </StaggerGroup>
            </div>

            <Divider />

            {/* ════════════════════════════════════════════
                  EXPERTISE GRID
                ════════════════════════════════════════════ */}
            <div className="relative z-10 max-w-6xl mx-auto w-full px-5 sm:px-8 md:px-12 py-14 sm:py-20">

                <ScrollReveal className="text-center mb-10 sm:mb-12">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-semibold mb-3" style={fontLabel}>
                        Firm Capabilities
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight" style={fontHeadline}>
                        Engineering pillars we bring to every build
                    </h3>
                </ScrollReveal>

                <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {expertise.map(({ Icon, title, desc, accent }, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-xl border p-5 sm:p-6 transition-all duration-400 hover:-translate-y-1 group"
                            style={{
                                borderColor: `${accent}25`,
                                background: `linear-gradient(135deg, ${accent}12, transparent)`,
                            }}
                        >
                            {/* Hover glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-xl"
                                style={{ background: `radial-gradient(circle at 30% 20%, ${accent}14, transparent 65%)` }}
                            />
                            <div className="relative z-10">
                                <div
                                    className="w-10 h-10 rounded-lg border border-white/[0.07] flex items-center justify-center mb-4"
                                    style={{ background: `${accent}18`, color: accent }}
                                >
                                    <Icon size={18} />
                                </div>
                                <h4 className="text-sm font-bold text-zinc-100 mb-2 tracking-tight" style={fontHeadline}>
                                    {title}
                                </h4>
                                <p className="text-[12px] sm:text-[13px] text-zinc-500 leading-relaxed" style={fontBody}>
                                    {desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </StaggerGroup>
            </div>

            <Divider />

            {/* ════════════════════════════════════════════
                  GLOBAL REACH + CTA
                ════════════════════════════════════════════ */}
            <div className="relative z-10 max-w-6xl mx-auto w-full px-5 sm:px-8 md:px-12 py-14 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

                {/* Global card */}
                <ScrollReveal>
                    <div className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.025] p-6 sm:p-8 h-full">
                        <div className="space-y-5">
                            <div className="flex items-center gap-3">
                                <Globe size={15} className="text-[var(--primary)] shrink-0" />
                                <span className="text-xs font-bold text-zinc-300 tracking-wider uppercase" style={fontLabel}>
                                    Global Infrastructure.
                                </span>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed" style={fontBody}>
                                Headquartered in{" "}
                                <strong className="text-zinc-200">Colombo, Sri Lanka (UTC+5:30)</strong>. Our systems
                                architecture team responds to technical issues within 4 hours locally and within 12 hours
                                globally. Every partner gets direct engineer-to-client communication.
                            </p>
                            <div className="space-y-3.5 pt-2 border-t border-white/[0.05]">
                                <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-semibold" style={fontLabel}>
                                    Global Communication Standards
                                </p>
                                {[
                                    { lang: "English", note: "Primary Engineering Language" },
                                    { lang: "Tamil", note: "Native" },
                                    { lang: "Sinhala", note: "Native" },
                                ].map((l, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-xs font-semibold text-zinc-300" style={fontBody}>{l.lang}</span>
                                            <span className="text-[10px] text-[var(--primary)] font-medium" style={fontLabel}>{l.note}</span>
                                        </div>
                                        <div className="h-px bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] w-full rounded-full opacity-60" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* CTA card */}
                <ScrollReveal delay={0.08}>
                    <div className="relative overflow-hidden rounded-xl border border-[var(--primary)]/20 bg-gradient-to-br from-[var(--primary)]/[0.07] via-white/[0.015] to-transparent p-6 sm:p-8 h-full shadow-[0_8px_40px_rgba(0,102,255,0.10)] group hover:shadow-[0_12px_50px_rgba(0,102,255,0.18)] transition-shadow duration-500">
                        <div className="h-full flex flex-col justify-between gap-6 sm:gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Award size={15} className="text-[var(--accent)] shrink-0" />
                                    <span className="text-xs font-bold text-zinc-300 tracking-wider uppercase" style={fontLabel}>
                                        Engineering Diagnostics
                                    </span>
                                </div>
                                <p className="text-zinc-400 text-sm leading-relaxed" style={fontBody}>
                                    Unsure if your infrastructure is scalable? Our architects will run a full diagnostic on
                                    your current software and deliver a technical teardown video within 48 hours.{" "}
                                    <strong className="text-zinc-200">Zero cost. Zero obligations.</strong>
                                </p>
                            </div>
                            <Link
                                href="/services#audit-form"
                                className="inline-flex items-center justify-center gap-2 w-full px-7 py-3.5 bg-[var(--primary)] hover:bg-[#0055d4] active:scale-[0.98] text-white text-[11px] font-bold tracking-[0.15em] uppercase rounded-xl transition-all duration-300 shadow-[0_0_28px_rgba(0,102,255,0.4)] hover:shadow-[0_0_48px_rgba(0,102,255,0.6)]"
                                style={fontLabel}
                            >
                                <span>Initiate System Audit</span>
                                <ArrowUpRight size={14} />
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
        </section>
    );
}

// ── Section divider ───────────────────────────────────────────
function Divider() {
    return (
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-12">
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>
    );
}