"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger once globally
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

const cases = [
    {
        id: "ignite-ed",
        num: "01",
        label: "EdTech Infrastructure",
        accent: "#0066ff", // Primary Blue
        title: "Ignite Ed",
        tagline: "Trilingual AI education ecosystem for Sri Lankan students.",
        description: "Partnered with a top Sri Lankan creator to engineer a production-ready educational platform. We architected the administrative data-entry panel in 48 hours and built a React Native mobile application powered by Gemini to natively support Sinhala, Tamil, and English.",
        metric: "48h",
        metricLabel: "Admin Architecture",
        result: "Production-Ready (Pending Launch)",
        stack: ["React Native", "Next.js", "Gemini API", "Supabase"]
    },
    {
        id: "bizfinder",
        num: "02",
        label: "Internal System // Automation",
        accent: "#38bdf8", // Accent Cyan
        title: "BizFinder AI",
        tagline: "Zero-touch automated prospecting pipeline for design agencies.",
        description: "An intelligent lead generation engine engineered in-house to automate manual B2B prospecting. Architected entirely without a database for high-speed execution, utilizing Gemini to autonomously discover, qualify, and route high-intent leads.",
        metric: "Stateless",
        metricLabel: "Database-Free Architecture",
        result: "Zero Manual Prospecting",
        stack: ["Next.js", "Gemini API", "Tailwind CSS"]
    },
    {
        id: "grabme",
        num: "03",
        label: "Marketplace // PWA",
        accent: "#10b981", // Emerald/Success
        title: "GrabMe",
        tagline: "Sri Lanka's premiere local home services marketplace.",
        description: "Went from raw concept to a fully secured, live Progressive Web App architecture in under 48 hours. Built as a proprietary Mr² Labs platform to validate the local service-matching market with zero agency bloat.",
        metric: "< 48h",
        metricLabel: "Concept to Live URL",
        result: "MVP Production Deployment",
        stack: ["Next.js", "Supabase", "Tailwind CSS"]
    },
    {
        id: "bypass",
        num: "04",
        label: "Open Source // Pipeline",
        accent: "#f59e0b", // Amber/Warning
        title: "Bypass",
        tagline: "Local AI video editing automation for system marketing.",
        description: "An internal, open-source automation tool built exclusively to handle the heavy lifting of content creation. It runs automated workflows to scale Mr² Labs product marketing without the overhead of recurring SaaS subscriptions.",
        metric: "Local",
        metricLabel: "Execution Environment",
        result: "Zero External SaaS Costs",
        stack: ["Python", "Local AI", "Video Automation"]
    },
    {
        id: "sonic-portal",
        num: "05",
        label: "Open Source // Audio Studio",
        accent: "#8b5cf6", // Violet
        title: "Sonic Portal",
        tagline: "Zero-cost local AI audio production and enhancement studio.",
        description: "A custom, offline desktop setup engineered to process high-fidelity TTS, voice enhancement, and audio workflows entirely on local hardware. Eliminates reliance on external cloud processing and subscription bottlenecks.",
        metric: "100%",
        metricLabel: "Local Hardware Processing",
        result: "Zero Latency Workflows",
        stack: ["Python", "Local Models", "Audio Pipelines"]
    },
    {
        id: "alt-cut",
        num: "06",
        label: "Open Source // In-Dev",
        accent: "#ef4444", // Red/Active
        title: "Alt Cut",
        tagline: "The 'Cursor' for video editors. AI-native timeline replacement.",
        description: "Currently under active development to replace legacy, subscription-heavy tools like CapCut. Alt Cut is being engineered as an AI-powered, context-aware video editing platform designed for extreme speed and precision.",
        metric: "Alpha",
        metricLabel: "System Status",
        result: "Active Engineering Phase",
        stack: ["Next.js", "Local AI", "Video Engineering"]
    }
];

// ── Shared fade helper ────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div ref={ref} className={className}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
        >{children}</motion.div>
    );
}

// ── Card inner content ─────────────────────────────────────────────────────────
function CardInner({ c }) {
    return (
        <>
            <div className="relative z-10 flex flex-col h-full">
                {/* Header row */}
                <div className="flex items-start justify-between mb-5">
                    <span className="text-[9px] tracking-[0.3em] uppercase font-bold px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-white/70" style={fontLabel}>
                        {c.label}
                    </span>
                    <span className="text-[12px] font-bold text-white/20" style={fontLabel}>{c.num}</span>
                </div>

                {/* Body */}
                <div className="flex-grow min-h-0">
                    <h3 className="text-xl font-extrabold text-white tracking-tight mb-2" style={fontHeadline}>{c.title}</h3>
                    <p className="text-sm font-semibold text-white/80 mb-3 leading-snug" style={fontHeadline}>&ldquo;{c.tagline}&rdquo;</p>
                    <p className="text-[12px] text-white/40 leading-relaxed mb-4" style={fontBody}>{c.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                        {c.stack.map(s => (
                            <span key={s} className="text-[9px] px-2 py-1 rounded border border-white/10 bg-white/[0.03] text-white/40" style={fontLabel}>{s}</span>
                        ))}
                    </div>
                </div>

                {/* Bottom — metric + CTA */}
                <div className="flex flex-col gap-3 border-t border-white/[0.08] pt-4 mt-4 shrink-0">
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="text-xl font-black tracking-tight" style={{ ...fontHeadline, color: c.accent }}>{c.metric}</div>
                            <div className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-semibold mt-0.5" style={fontLabel}>{c.metricLabel}</div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: c.accent }} />
                            <span className="text-[10px] text-white/50 font-bold" style={fontLabel}>{c.result}</span>
                        </div>
                    </div>
                    <Link
                        href="/services#audit-form"
                        className="group/cta flex items-center justify-between w-full p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/[0.12] active:scale-[0.98] transition-all duration-200"
                    >
                        <span className="text-[10px] uppercase font-bold tracking-[0.18em] text-white/60 group-hover/cta:text-white transition-colors duration-200" style={fontLabel}>
                            Build Similar System
                        </span>
                        <ArrowUpRight size={13} className="text-white/30 group-hover/cta:text-white transition-all duration-200" />
                    </Link>
                </div>
            </div>
        </>
    );
}

// ── Desktop card (forwardRef for GSAP) ────────────────────────────────────────
const DesktopCard = React.forwardRef(function DesktopCard({ c }, ref) {
    return (
        <div
            ref={ref}
            className="relative flex-shrink-0 flex flex-col rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-7 overflow-hidden"
            style={{ width: "420px", height: "500px", willChange: "transform, opacity" }}
        >
            {/* Glow - GSAP controlled */}
            <div
                className="card-glow absolute inset-0 rounded-[2rem] pointer-events-none opacity-0"
                style={{
                    boxShadow: `0 0 80px 16px ${c.accent}35, inset 0 0 0 1px ${c.accent}55`,
                    background: `radial-gradient(circle at 70% 20%, ${c.accent}20, transparent 60%)`,
                }}
            />
            <CardInner c={c} />
        </div>
    );
});

// ── Desktop CTA card ──────────────────────────────────────────────────────────
const DesktopCTA = React.forwardRef(function DesktopCTA(_, ref) {
    return (
        <div
            ref={ref}
            className="relative flex-shrink-0 flex flex-col items-center justify-center text-center rounded-[2rem] border border-[var(--primary)]/25 bg-gradient-to-br from-[var(--primary)]/[0.06] to-transparent px-10 overflow-hidden"
            style={{ width: "420px", height: "500px", willChange: "transform, opacity" }}
        >
            <div className="card-glow absolute inset-0 rounded-[2rem] pointer-events-none opacity-0"
                style={{ boxShadow: "0 0 80px 16px rgba(0,102,255,0.25), inset 0 0 0 1px rgba(0,102,255,0.45)" }}
            />
            <div className="relative z-10 flex flex-col items-center gap-5">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--primary)] font-bold" style={fontLabel}>Ready to build?</p>
                <h3 className="text-3xl font-extrabold text-white tracking-tight" style={fontHeadline}>Your system could be next.</h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-[260px]" style={fontBody}>
                    Tell us your problem. We&rsquo;ll deliver a technical teardown in 48 hours.
                </p>
                <Link
                    href="/services#audit-form"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--primary)] hover:bg-[#0055d4] text-white text-[11px] font-bold tracking-[0.15em] uppercase rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(0,102,255,0.4)] hover:shadow-[0_0_50px_rgba(0,102,255,0.6)] hover:-translate-y-0.5 active:scale-[0.98]"
                    style={fontLabel}
                >
                    Initiate System Audit <ArrowUpRight size={14} />
                </Link>
            </div>
        </div>
    );
});

// ══════════════════════════════════════════════════════════════════════════════
// Mobile spotlight carousel — uses IntersectionObserver for spotlight effect
// ══════════════════════════════════════════════════════════════════════════════
function MobileCarousel({ allCases }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef(null);
    const cardRefs = useRef([]);
    const totalCards = allCases.length + 1; // +1 CTA

    // IntersectionObserver — detects which card is most centered
    useEffect(() => {
        const scroller = scrollRef.current;
        if (!scroller) return;

        const observers = [];
        cardRefs.current.forEach((card, i) => {
            if (!card) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        setActiveIndex(i);
                    }
                },
                { root: scroller, threshold: 0.5 }
            );
            obs.observe(card);
            observers.push(obs);
        });

        return () => observers.forEach(o => o.disconnect());
    }, []);

    const scrollTo = useCallback((i) => {
        const card = cardRefs.current[i];
        if (!card || !scrollRef.current) return;
        const scroller = scrollRef.current;
        const cardLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const scrollerWidth = scroller.offsetWidth;
        scroller.scrollTo({ left: cardLeft - (scrollerWidth - cardWidth) / 2, behavior: "smooth" });
    }, []);

    return (
        <div className="relative">
            {/* Scroll track */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory pb-6 pt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                style={{
                    WebkitOverflowScrolling: "touch",
                    overscrollBehaviorX: "contain",
                    /* give first/last card equal leading/trailing space so they center */
                    paddingLeft: "calc(50vw - min(40vw, 160px))",
                    paddingRight: "calc(50vw - min(40vw, 160px))",
                    gap: "16px",
                }}
            >
                {allCases.map((c, i) => {
                    const isActive = activeIndex === i;
                    return (
                        <div
                            key={c.id}
                            ref={el => { cardRefs.current[i] = el; }}
                            onClick={() => !isActive && scrollTo(i)}
                            className="relative flex-shrink-0 flex flex-col snap-center rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] overflow-hidden"
                            style={{
                                width: "min(80vw, 340px)",
                                height: "480px",
                                padding: "20px",
                                /* CSS transitions for spotlight — GPU composited */
                                transform: isActive ? "scale(1)" : "scale(0.88)",
                                opacity: isActive ? 1 : 0.45,
                                transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease",
                                willChange: "transform, opacity",
                                /* Accent glow on active */
                                boxShadow: isActive
                                    ? `0 0 60px 8px ${c.accent}30, inset 0 0 0 1px ${c.accent}40`
                                    : "none",
                            }}
                        >
                            {/* Radial accent on active */}
                            <div
                                className="absolute inset-0 rounded-[1.75rem] pointer-events-none"
                                style={{
                                    background: isActive
                                        ? `radial-gradient(circle at 70% 20%, ${c.accent}18, transparent 60%)`
                                        : "none",
                                    transition: "background 0.4s ease",
                                }}
                            />
                            <CardInner c={c} />
                        </div>
                    );
                })}

                {/* CTA card */}
                {(() => {
                    const ctaIndex = allCases.length;
                    const isActive = activeIndex === ctaIndex;
                    return (
                        <div
                            key="cta"
                            ref={el => { cardRefs.current[ctaIndex] = el; }}
                            onClick={() => !isActive && scrollTo(ctaIndex)}
                            className="relative flex-shrink-0 flex flex-col items-center justify-center text-center snap-center rounded-[1.75rem] border border-[var(--primary)]/25 bg-gradient-to-br from-[var(--primary)]/[0.06] to-transparent overflow-hidden"
                            style={{
                                width: "min(80vw, 340px)",
                                height: "480px",
                                padding: "24px",
                                transform: isActive ? "scale(1)" : "scale(0.88)",
                                opacity: isActive ? 1 : 0.45,
                                transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease",
                                willChange: "transform, opacity",
                                boxShadow: isActive
                                    ? "0 0 60px 8px rgba(0,102,255,0.2), inset 0 0 0 1px rgba(0,102,255,0.35)"
                                    : "none",
                            }}
                        >
                            <div className="absolute inset-0 rounded-[1.75rem] pointer-events-none"
                                style={{ background: "radial-gradient(circle at 50% 40%, rgba(0,102,255,0.08), transparent 60%)" }}
                            />
                            <div className="relative z-10 flex flex-col items-center gap-4">
                                <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--primary)] font-bold" style={fontLabel}>Ready to build?</p>
                                <h3 className="text-2xl font-extrabold text-white tracking-tight" style={fontHeadline}>Your system could be next.</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed" style={fontBody}>
                                    Tell us your problem. We&rsquo;ll deliver a technical teardown in 48 hours.
                                </p>
                                <Link
                                    href="/services#audit-form"
                                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--primary)] text-white text-[11px] font-bold tracking-[0.15em] uppercase rounded-xl shadow-[0_0_24px_rgba(0,102,255,0.4)] active:scale-95 transition-transform"
                                    style={fontLabel}
                                >
                                    Initiate System Audit <ArrowUpRight size={13} />
                                </Link>
                            </div>
                        </div>
                    );
                })()}
            </div>

            {/* Animated dot indicators */}
            <div className="flex justify-center gap-2 pb-10">
                {Array.from({ length: totalCards }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => scrollTo(i)}
                        className="rounded-full transition-all duration-300"
                        style={{
                            width: activeIndex === i ? "20px" : "6px",
                            height: "6px",
                            background: activeIndex === i ? "var(--primary)" : "rgba(255,255,255,0.2)",
                        }}
                        aria-label={`Go to card ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
export default function Projects() {
    const pinRef = useRef(null);
    const trackRef = useRef(null);
    const cardRefs = useRef([]);
    const gsapCtx = useRef(null);
    const isMounted = useRef(false);
    const [desktopActive, setDesktopActive] = useState(0);

    const allCases = cases;
    const totalCards = allCases.length + 1;

    useEffect(() => {
        // ── Guard 1: SSR safety (window may not exist) ──────────────────────
        if (typeof window === "undefined") return;
        // ── Guard 2: Skip GSAP entirely on mobile/tablet ────────────────────
        if (window.innerWidth < 1024) return;

        isMounted.current = true;

        // ── Guard 3: Use a small timeout to let Next.js finish layout shifts ──
        const timer = setTimeout(() => {
            if (!isMounted.current) return;

            const pin = pinRef.current;
            const track = trackRef.current;
            const cards = cardRefs.current.filter(Boolean);
            if (!pin || !track || cards.length < 2) return;

            const cardW = cards[0].offsetWidth;
            if (!cardW || cardW <= 0) return;

            gsapCtx.current = gsap.context(() => {
                const vw = window.innerWidth;
                const gap = 32;
                const step = cardW + gap;
                const n = cards.length;
                const travel = step * (n - 1);
                const startX = vw / 2 - cardW / 2;

                gsap.set(track, { x: startX });
                cards.forEach((card, i) => {
                    gsap.set(card, {
                        scale: i === 0 ? 1 : 0.82,
                        opacity: i === 0 ? 1 : 0.45,
                    });
                    const glow = card.querySelector(".card-glow");
                    if (glow) gsap.set(glow, { opacity: i === 0 ? 1 : 0 });
                });

                const tl = gsap.timeline({ paused: true });
                if (travel > 0) {
                    tl.to(track, { x: startX - travel, ease: "none", duration: n - 1 }, 0);
                }

                cards.forEach((card, i) => {
                    const glow = card.querySelector(".card-glow");
                    if (i > 0) {
                        tl.fromTo(card, { scale: 0.82, opacity: 0.45 }, { scale: 1, opacity: 1, ease: "none", duration: 1 }, i - 1);
                        if (glow) tl.fromTo(glow, { opacity: 0 }, { opacity: 1, ease: "none", duration: 1 }, i - 1);
                    }
                    if (i < n - 1) {
                        tl.fromTo(card, { scale: 1, opacity: 1 }, { scale: 0.82, opacity: 0.45, ease: "none", duration: 1 }, i);
                        if (glow) tl.fromTo(glow, { opacity: 1 }, { opacity: 0, ease: "none", duration: 1 }, i);
                    }
                });

                const snapConfig = n >= 2
                    ? { snapTo: 1 / (n - 1), duration: { min: 0.3, max: 0.6 }, delay: 0.05, ease: "power2.inOut" }
                    : undefined;

                ScrollTrigger.create({
                    trigger: pin,
                    pin: true,
                    start: "top top",
                    end: () => `+=${Math.max(travel, 1)}`,
                    scrub: 1.2,
                    animation: tl,
                    onUpdate: (self) => {
                        if (!isMounted.current) return;
                        const idx = Math.round(self.progress * (n - 1));
                        setDesktopActive(Math.min(Math.max(idx, 0), n - 1));
                    },
                    ...(snapConfig ? { snap: snapConfig } : {}),
                    invalidateOnRefresh: true,
                });
                
                // Force a refresh after creation to catch any late layout shifts
                ScrollTrigger.refresh();
            }, pin);
        }, 100);

        return () => {
            isMounted.current = false;
            clearTimeout(timer);
            // Safely revert GSAP context on unmount
            try {
                if (gsapCtx.current) {
                    gsapCtx.current.revert();
                    gsapCtx.current = null;
                }
            } catch (_) { /* ignore cleanup errors */ }
        };
    }, []);

    return (
        <section id="work" className="bg-[#050505] border-t border-white/[0.04]">

            {/* ── Section Header ── */}
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 pt-16 sm:pt-20 pb-10 sm:pb-12">
                <FadeUp>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[10px] tracking-[0.25em] uppercase font-semibold text-zinc-400 mb-5" style={fontLabel}>
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                        Systems Ledger
                    </div>
                </FadeUp>
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                    <FadeUp delay={0.05}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-zinc-50 tracking-tight leading-[1.05] max-w-3xl" style={fontHeadline}>
                            Systems we&rsquo;ve engineered.{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-zinc-300">
                                Results that speak.
                            </span>
                        </h2>
                    </FadeUp>
                    <FadeUp delay={0.1} className="lg:pb-1">
                        <p className="text-zinc-500 text-sm leading-relaxed max-w-sm lg:text-right" style={fontBody}>
                            Real problems. Real engineering.{" "}
                            <span className="lg:hidden">Swipe to explore each build.</span>
                            <span className="hidden lg:inline">Scroll to step through each build.</span>
                        </p>
                    </FadeUp>
                </div>
            </div>

            {/* ══ MOBILE / TABLET: IntersectionObserver spotlight carousel ══ */}
            <div className="lg:hidden">
                <MobileCarousel allCases={allCases} />
            </div>

            {/* ══ DESKTOP: GSAP pinned spotlight (lg+) ══ */}
            <div
                ref={pinRef}
                className="hidden lg:block relative overflow-hidden bg-[#050505]"
                style={{ height: "100vh" }}
            >
                <div className="absolute inset-y-0 left-0 w-40 z-10 pointer-events-none bg-gradient-to-r from-[#050505] to-transparent" />
                <div className="absolute inset-y-0 right-0 w-40 z-10 pointer-events-none bg-gradient-to-l from-[#050505] to-transparent" />

                {/* Animated dot indicators + hint */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalCards }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-full transition-all duration-300"
                                style={{
                                    width: desktopActive === i ? "20px" : "6px",
                                    height: "6px",
                                    background: desktopActive === i ? "var(--primary)" : "rgba(255,255,255,0.2)",
                                }}
                            />
                        ))}
                    </div>
                    <span className="text-[9px] text-white/20 uppercase tracking-[0.2em]" style={fontLabel}>Scroll to explore</span>
                </div>

                {/* GSAP track */}
                <div
                    ref={trackRef}
                    className="absolute inset-y-0 left-0 flex items-center gap-8"
                    style={{ willChange: "transform" }}
                >
                    {allCases.map((c, i) => (
                        <DesktopCard key={c.id} c={c} ref={el => { cardRefs.current[i] = el; }} />
                    ))}
                    <DesktopCTA ref={el => { cardRefs.current[allCases.length] = el; }} />
                </div>
            </div>
        </section>
    );
}
