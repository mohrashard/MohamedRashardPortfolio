"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
    Activity,
    Zap,
    Cpu,
    ShieldCheck,
    Terminal,
    Layers,
    ArrowUpRight,
    Clock,
    Code2,
} from "lucide-react";

// ── Font tokens ───────────────────────────────────────────────
const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody     = { fontFamily: "'Inter', sans-serif" };
const fontLabel    = { fontFamily: "'Geist Mono', 'Geist', monospace" };

// ── Animation variants ────────────────────────────────────────
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};
const cardVariants = {
    hidden:  { opacity: 0, y: 28, willChange: "opacity, transform" },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
    },
};

// ── Data ──────────────────────────────────────────────────────
// Hero row — 3 big punchy numbers
const heroMetrics = [
    { value: "48–72h", label: "Scope to Live URL",        accent: "#0066ff" },
    { value: "100%",   label: "Builder-Led Execution",    accent: "#38BDF8" },
    { value: "~0h",    label: "Useless Meetings",         accent: "#f59e0b" },
];

// Detail grid — 6 operational facts
const facts = [
    {
        Icon: Zap,
        accent: "#38BDF8",
        title: "Ruthless Sprint Velocity",
        body: "Core, functional MVPs from architecture lock to a live production URL. No scope bloat, no enterprise theatre.",
    },
    {
        Icon: Layers,
        accent: "#0066ff",
        title: "Scope-Driven Architecture",
        body: "We deploy the most dominant, high-performance tech stack tailored precisely to your product's requirements and scaling needs.",
    },
    {
        Icon: Activity,
        accent: "#a78bfa",
        title: "Async-First Workflow",
        body: "Daily staging links and Loom updates instead of 2-hour Zoom calls. You see progress every single day.",
    },
    {
        Icon: Cpu,
        accent: "#38BDF8",
        title: "Practical AI Integration",
        body: "Claude, Gemini, and local models wired into real business logic. No AI hype — just measurable automation leverage.",
    },
    {
        Icon: ShieldCheck,
        accent: "#10b981",
        title: "Direct Founder Access",
        body: "No project managers or account executives in the loop. You communicate directly with the engineer building your system.",
    },
    {
        Icon: Code2,
        accent: "#0066ff",
        title: "Beyond the MVP",
        body: "We don't just ship MVPs and vanish. When you're ready for full product scaling, we architect and develop the complete system in weeks, not months.",
    },
];

// ── Reusable fade wrapper ─────────────────────────────────────
function FadeUp({ children, className = "", delay = 0 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
            style={{ willChange: "opacity, transform" }}
        >
            {children}
        </motion.div>
    );
}

// ── Stagger group wrapper ─────────────────────────────────────
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

// ═══════════════════════════════════════════════════════════════
export default function SystemTelemetry() {
    return (
        <section
            id="telemetry"
            className="relative w-full bg-[#050505] border-t border-white/[0.04] overflow-hidden"
            style={{ contain: "paint" }}
        >
            {/* ── Background decoration ── */}
            {/* Fine grid */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.014) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.014) 1px, transparent 1px)
                    `,
                    backgroundSize: "4rem 4rem",
                    maskImage: "radial-gradient(ellipse 75% 65% at 50% 50%, #000 55%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 50%, #000 55%, transparent 100%)",
                }}
            />
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[var(--primary)]/8 rounded-full blur-[130px] pointer-events-none z-0" />
            <div className="absolute bottom-0 left-0 w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-[var(--accent)]/5 rounded-full blur-[110px] pointer-events-none z-0" />

            <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-20 sm:py-28">

                {/* ════════════════════════════════════════
                      HEADER
                    ════════════════════════════════════════ */}
                <FadeUp className="text-center flex flex-col items-center mb-14 sm:mb-16">
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded border border-white/[0.06] bg-[#0A0A0A]/80 text-[10px] uppercase tracking-[0.2em] font-semibold text-zinc-400"
                        style={fontLabel}
                    >
                        <Terminal size={11} className="text-[var(--accent)]" />
                        <span>[ ] Studio Telemetry</span>
                    </div>

                    <h2
                        className="text-[clamp(2rem,5.5vw,3.5rem)] font-extrabold text-zinc-50 tracking-tight leading-[1.08] mb-4"
                        style={fontHeadline}
                    >
                        Operational reality.{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">
                            No fluff. Just the facts.
                        </span>
                    </h2>

                    <p
                        className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed"
                        style={fontBody}
                    >
                        We don't sell bloated agency timelines. Here's exactly how we operate, build, and ship.
                    </p>
                </FadeUp>

                {/* ════════════════════════════════════════
                      HERO METRICS ROW
                    ════════════════════════════════════════ */}
                <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    {heroMetrics.map((m, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariants}
                            className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.025] p-5 sm:p-8 flex flex-col justify-between group"
                            style={{ minHeight: "120px" }}
                        >
                            {/* CSS-only hover glow — no JS state needed */}
                            <div
                                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: `radial-gradient(ellipse 80% 70% at 50% 0%, ${m.accent}18, transparent 70%)`,
                                    boxShadow: `inset 0 0 0 1px ${m.accent}22`,
                                }}
                            />
                            {/* Top accent line */}
                            <div
                                className="absolute top-0 left-8 right-8 h-px opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: `linear-gradient(to right, transparent, ${m.accent}, transparent)` }}
                            />

                            <div className="relative z-10">
                                <div
                                    className="text-[clamp(2.4rem,5vw,3.5rem)] font-black tracking-tighter leading-none mb-2"
                                    style={{ ...fontHeadline, color: m.accent }}
                                >
                                    {m.value}
                                </div>
                                <div
                                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500"
                                    style={fontLabel}
                                >
                                    {m.label}
                                </div>
                            </div>

                            {/* Corner pulse dot */}
                            <span
                                className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full opacity-30 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"
                                style={{ background: m.accent }}
                            />
                        </motion.div>
                    ))}
                </StaggerGroup>

                {/* ════════════════════════════════════════
                      FACTS GRID
                    ════════════════════════════════════════ */}
                <StaggerGroup className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-12 sm:mb-16">
                    {facts.map(({ Icon, accent, title, body }, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariants}
                            className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-6 group transition-all duration-400 hover:-translate-y-0.5"
                        >
                            {/* CSS hover glow */}
                            <div
                                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ background: `radial-gradient(circle at 25% 0%, ${accent}14, transparent 60%)` }}
                            />
                            {/* Left accent bar */}
                            <div
                                className="absolute left-0 top-5 bottom-5 w-px opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                                style={{ background: `linear-gradient(to bottom, transparent, ${accent}, transparent)` }}
                            />

                            <div className="relative z-10">
                                {/* Icon row */}
                                <div className="flex items-center justify-between mb-4">
                                    <div
                                        className="w-9 h-9 rounded-lg border border-white/[0.07] flex items-center justify-center"
                                        style={{ background: `${accent}16`, color: accent }}
                                    >
                                        <Icon size={17} />
                                    </div>
                                    <span
                                        className="text-[10px] text-zinc-600 font-bold tabular-nums"
                                        style={fontLabel}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <h3
                                    className="text-[15px] font-bold text-zinc-100 tracking-tight mb-2 leading-snug"
                                    style={fontHeadline}
                                >
                                    {title}
                                </h3>
                                <p
                                    className="text-[13px] text-zinc-500 leading-relaxed"
                                    style={fontBody}
                                >
                                    {body}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </StaggerGroup>

                {/* ════════════════════════════════════════
                      FOOTER ROW
                    ════════════════════════════════════════ */}
                <FadeUp
                    className="pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-5"
                    delay={0.05}
                >
                    {/* Capability note */}
                    <p
                        className="text-zinc-600 text-[11px] text-center sm:text-left leading-relaxed max-w-xs"
                        style={fontLabel}
                    >
                        [!] We partner with founders who need to validate ideas and ship fast.
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6">
                        {[
                            { Icon: ShieldCheck, text: "Honest metrics only" },
                            { Icon: Clock,       text: "Zero agency overhead" },
                            { Icon: Layers,      text: "Production-ready output" },
                        ].map(({ Icon, text }, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-[0.14em]"
                                style={fontLabel}
                            >
                                <Icon size={12} className="text-zinc-600 shrink-0" />
                                {text}
                            </span>
                        ))}
                    </div>
                </FadeUp>

                {/* ════════════════════════════════════════
                      CTA
                    ════════════════════════════════════════ */}
                <FadeUp className="mt-12 sm:mt-16 text-center" delay={0.08}>
                    <Link
                        href="/services#audit-form"
                        className="group inline-flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl bg-[var(--primary)] hover:bg-[#0055d4] active:scale-[0.98] text-white text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 shadow-[0_0_28px_rgba(0,102,255,0.35)] hover:shadow-[0_0_48px_rgba(0,102,255,0.55)]"
                        style={fontLabel}
                    >
                        <span>Initiate a System Build</span>
                        <ArrowUpRight
                            size={15}
                            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                        />
                    </Link>
                    <p className="mt-4 text-zinc-600 text-[11px]" style={fontLabel}>
                        No obligation. Free diagnostic within 48h.
                    </p>
                </FadeUp>
            </div>
        </section>
    );
}