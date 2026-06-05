"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Layers, Network, Zap, Terminal } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger once globally
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// ── Font tokens ───────────────────────────────────────────────
const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody     = { fontFamily: "'Inter', sans-serif" };
const fontLabel    = { fontFamily: "'Geist Mono', 'Geist', monospace" };

// ── Pillar Data ───────────────────────────────────────────────
const pillars = [
    {
        id: "ai-pipelines",
        num: "I",
        title: "Local-First AI & Automation",
        icon: <Cpu size={20} />,
        accent: "#0066ff",
        description:
            "We engineer zero-subscription, fully localized AI models. By bypassing bloated cloud APIs, we deploy secure, on-premise generative AI, autonomous workflow nodes, and complex media processing pipelines that you own 100%.",
        tags: ["Python", "Hugging Face", "Local LLMs", "Computer Vision"],
    },
    {
        id: "infrastructure",
        num: "II",
        title: "Scalable Platform Infrastructure",
        icon: <Layers size={20} />,
        accent: "#38BDF8",
        description:
            "Architecting heavy-duty web applications and relational databases. From verified directory platforms to secure user authentication and cron-job automation, we build foundations that refuse to break under load.",
        tags: ["Next.js", "Rust", "Supabase", "PWA"],
    },
    {
        id: "revenue-systems",
        num: "III",
        title: "Data & Revenue Ecosystems",
        icon: <Network size={20} />,
        accent: "#7c3aed",
        description:
            "We convert static interfaces into dynamic revenue engines. Implementing algorithmic sorting, predictive data regression, and automated database keep-alive systems to ensure continuous operational uptime.",
        tags: ["Predictive Modeling", "PostgreSQL", "System Telemetry"],
    },
    {
        id: "sprint-velocity",
        num: "IV",
        title: "72-Hour Sprint Cycles",
        icon: <Zap size={20} />,
        accent: "#f59e0b",
        description:
            "Corporate agencies take 6 months to ship; we take 72 hours. We engineer, test, and deploy minimal, production-ready software products in rapid, ruthless sprint cycles. Zero fluff. Immediate market validation.",
        tags: ["Agile Deployment", "MVP Architecture", "Rapid Iteration"],
    },
];

// ── Fade helper ───────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
        >
            {children}
        </motion.div>
    );
}

// ── Pillar Column SVG Background ──────────────────────────────
// Renders architectural Greek/Roman columns rising from the bottom.
function PillarBackground() {
    const cols = [
        { x: "6%",  h: "62%", delay: 0 },
        { x: "18%", h: "78%", delay: 0.15 },
        { x: "30%", h: "55%", delay: 0.05 },
        { x: "42%", h: "85%", delay: 0.2 },
        { x: "54%", h: "60%", delay: 0.1 },
        { x: "66%", h: "80%", delay: 0.25 },
        { x: "78%", h: "58%", delay: 0.08 },
        { x: "90%", h: "72%", delay: 0.18 },
    ];

    return (
        <div
            className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
            style={{
                maskImage:
                    "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)",
                WebkitMaskImage:
                    "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)",
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 1000 700"
                preserveAspectRatio="xMidYMax meet"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-0 left-0 w-full h-full"
            >
                <defs>
                    <linearGradient id="colBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0066ff" stopOpacity="0" />
                        <stop offset="70%" stopColor="#0066ff" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#0066ff" stopOpacity="0.35" />
                    </linearGradient>
                    <linearGradient id="colWhite" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                        <stop offset="70%" stopColor="#ffffff" stopOpacity="0.07" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.14" />
                    </linearGradient>
                    {/* subtle flute highlight on left side of each column */}
                    <linearGradient id="fluteHighlight" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
                        <stop offset="40%" stopColor="#ffffff" stopOpacity="0.04" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {cols.map((col, i) => {
                    const cx = parseFloat(col.x) * 10; // 0-1000 coordinate
                    const colW = 18;
                    const capH = 14;
                    const baseH = 18;
                    const shaftH = parseFloat(col.h) * 7; // map % to 0-700
                    const totalH = shaftH + capH + baseH;
                    const yTop = 700 - totalH;
                    const fill = i % 3 === 0 ? "url(#colBlue)" : "url(#colWhite)";
                    const strokeC = i % 3 === 0 ? "rgba(0,102,255,0.3)" : "rgba(255,255,255,0.08)";

                    return (
                        <g key={i}>
                            {/* ─ Base (stylobate) ─ */}
                            <rect
                                x={cx - colW / 2 - 8}
                                y={700 - baseH}
                                width={colW + 16}
                                height={baseH}
                                fill={fill}
                                stroke={strokeC}
                                strokeWidth="0.5"
                                rx="1"
                            />

                            {/* ─ Shaft with fluting lines ─ */}
                            <rect
                                x={cx - colW / 2}
                                y={yTop + capH}
                                width={colW}
                                height={shaftH}
                                fill={fill}
                                stroke={strokeC}
                                strokeWidth="0.5"
                            />

                            {/* Fluting highlight (3 vertical lines) */}
                            {[-5, 0, 5].map((offset, fi) => (
                                <line
                                    key={fi}
                                    x1={cx + offset}
                                    y1={yTop + capH + 4}
                                    x2={cx + offset}
                                    y2={700 - baseH - 4}
                                    stroke="rgba(255,255,255,0.05)"
                                    strokeWidth="0.8"
                                />
                            ))}

                            {/* ─ Capital (Doric cap) ─ */}
                            <rect
                                x={cx - colW / 2 - 5}
                                y={yTop}
                                width={colW + 10}
                                height={capH * 0.45}
                                fill={fill}
                                stroke={strokeC}
                                strokeWidth="0.5"
                                rx="1"
                            />
                            <rect
                                x={cx - colW / 2}
                                y={yTop + capH * 0.45}
                                width={colW}
                                height={capH * 0.55}
                                fill={fill}
                                stroke={strokeC}
                                strokeWidth="0.5"
                            />

                            {/* Capital glow dot */}
                            <circle
                                cx={cx}
                                cy={yTop}
                                r={i % 3 === 0 ? 3 : 1.5}
                                fill={i % 3 === 0 ? "rgba(0,102,255,0.5)" : "rgba(255,255,255,0.15)"}
                                filter={i % 3 === 0 ? "url(#blueGlow)" : undefined}
                            />
                        </g>
                    );
                })}

                {/* Ground line */}
                <line x1="0" y1="700" x2="1000" y2="700" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            </svg>
        </div>
    );
}

// ── Desktop Pillar Card (forwardRef for GSAP) ─────────────────
const DesktopPillarCard = React.forwardRef(function DesktopPillarCard({ p }, ref) {
    return (
        <div
            ref={ref}
            className="relative flex-shrink-0 flex flex-col
                       w-[min(480px,88vw)] min-h-[420px]
                       rounded-2xl border border-white/[0.08] bg-white/[0.025]
                       p-8 overflow-hidden backdrop-blur-md"
            style={{ willChange: "transform, opacity" }}
        >
            {/* Glow (driven by GSAP) */}
            <div
                className="card-glow absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity"
                style={{
                    boxShadow: `0 0 80px 20px ${p.accent}30, inset 0 0 0 1px ${p.accent}40`,
                    background: `radial-gradient(circle at 30% 10%, ${p.accent}18, transparent 60%)`,
                }}
            />

            {/* Top accent bar */}
            <div
                className="absolute top-0 left-12 right-12 h-px"
                style={{
                    background: `linear-gradient(to right, transparent, ${p.accent}70, transparent)`,
                }}
            />

            <div className="relative z-10 flex flex-col h-full">
                {/* Roman numeral + icon */}
                <div className="flex items-center justify-between mb-6">
                    <div
                        className="w-11 h-11 rounded-lg flex items-center justify-center border border-white/[0.08]"
                        style={{ background: `${p.accent}15`, color: p.accent }}
                    >
                        {p.icon}
                    </div>
                    <span
                        className="text-[13px] font-bold text-white/15"
                        style={fontLabel}
                    >
                        {p.num}
                    </span>
                </div>

                {/* Title */}
                <h3
                    className="text-2xl font-extrabold text-white tracking-tight mb-3 leading-snug"
                    style={fontHeadline}
                >
                    {p.title}
                </h3>

                {/* Description */}
                <p
                    className="text-[14px] text-white/45 leading-relaxed flex-1 mb-7"
                    style={fontBody}
                >
                    {p.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-5 border-t border-white/[0.06]">
                    {p.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/50 bg-white/[0.04] border border-white/[0.07] rounded-sm"
                            style={fontLabel}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
});

// ══════════════════════════════════════════════════════════════
export default function Capabilities() {
    const pinRef   = useRef(null);
    const trackRef = useRef(null);
    const cardRefs = useRef([]);
    const gsapCtx  = useRef(null);
    const [desktopActive, setDesktopActive] = useState(0);

    const scrollRef = useRef(null);
    const mobileCardRefs = useRef([]);
    const [mobileActive, setMobileActive] = useState(0);

    // Mobile Intersection Observer
    useEffect(() => {
        if (window.innerWidth >= 1024) return;
        const scroller = scrollRef.current;
        if (!scroller) return;

        const observers = [];
        mobileCardRefs.current.forEach((card, i) => {
            if (!card) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        setMobileActive(i);
                    }
                },
                { root: scroller, threshold: 0.5 }
            );
            obs.observe(card);
            observers.push(obs);
        });

        return () => observers.forEach(o => o.disconnect());
    }, []);

    const scrollToMobile = useCallback((i) => {
        const card = mobileCardRefs.current[i];
        if (!card || !scrollRef.current) return;
        const scroller = scrollRef.current;
        const cardLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const scrollerWidth = scroller.offsetWidth;
        scroller.scrollTo({ left: cardLeft - (scrollerWidth - cardWidth) / 2, behavior: "smooth" });
    }, []);

    // GSAP vertical pin — desktop only
    useEffect(() => {
        if (window.innerWidth < 1024) return;

        // ── Guard 3: Use a small timeout to let Next.js finish layout shifts ──
        const timer = setTimeout(() => {
            const pin   = pinRef.current;
            const track = trackRef.current;
            const cards = cardRefs.current.filter(Boolean);
            if (!pin || !track || !cards.length) return;

            gsapCtx.current = gsap.context(() => {
                const cardH = cards[0].offsetHeight;
                const gap   = 32;
                const step  = cardH + gap;
                const n     = cards.length;
                const travel = step * (n - 1);

                // Centre the first card vertically in the viewport
                const vh     = window.innerHeight;
                const startY = vh / 2 - cardH / 2;

                // Initial states
                gsap.set(track, { y: startY });
                cards.forEach((card, i) => {
                    gsap.set(card, {
                        scale:   i === 0 ? 1 : 0.85,
                        opacity: i === 0 ? 1 : 0.3,
                        // Start below viewport; each subsequent card further down
                        y: i === 0 ? 0 : 60 * (i),
                    });
                    const glow = card.querySelector(".card-glow");
                    if (glow) gsap.set(glow, { opacity: i === 0 ? 1 : 0 });
                });

                const tl = gsap.timeline({ paused: true });

                // Scroll the whole track upward
                tl.to(track, { y: startY - travel, ease: "none", duration: n - 1 }, 0);

                // Per-card: spotlight the card coming into focus, dim the one leaving
                cards.forEach((card, i) => {
                    const glow = card.querySelector(".card-glow");
                    // Incoming card (rises to spotlight)
                    if (i > 0) {
                        tl.fromTo(
                            card,
                            { scale: 0.85, opacity: 0.3, y: 60 },
                            { scale: 1,    opacity: 1,   y: 0, ease: "none", duration: 1 },
                            i - 1
                        );
                        if (glow) tl.fromTo(glow, { opacity: 0 }, { opacity: 1, ease: "none", duration: 1 }, i - 1);
                    }
                    // Outgoing card (shrinks away)
                    if (i < n - 1) {
                        tl.fromTo(
                            card,
                            { scale: 1,    opacity: 1,   y: 0 },
                            { scale: 0.85, opacity: 0.3, y: -40, ease: "none", duration: 1 },
                            i
                        );
                        if (glow) tl.fromTo(glow, { opacity: 1 }, { opacity: 0, ease: "none", duration: 1 }, i);
                    }
                });

                ScrollTrigger.create({
                    trigger: pin,
                    pin: true,
                    start: "top top",
                    end:   () => `+=${travel}`,
                    scrub: 1,
                    animation: tl,
                    onUpdate: (self) => {
                        const idx = Math.round(self.progress * (n - 1));
                        setDesktopActive(Math.min(idx, n - 1));
                    },
                    snap: {
                        snapTo:   1 / (n - 1),
                        duration: { min: 0.3, max: 0.7 },
                        delay:    0.05,
                        ease:     "power2.inOut",
                    },
                    invalidateOnRefresh: true,
                });
                
                // Force a refresh after creation to catch any late layout shifts
                ScrollTrigger.refresh();
            }, pin);
        }, 100);

        return () => { 
            clearTimeout(timer);
            if (gsapCtx.current) gsapCtx.current.revert(); 
        };
    }, []);

    return (
        <section
            id="capabilities"
            className="relative bg-[#050505] border-t border-white/[0.04]"
        >
            {/* ── Section header (always visible) ── */}
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 pt-20 pb-12 relative z-10">
                <FadeUp>
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[10px] tracking-[0.25em] uppercase font-semibold text-zinc-400 mb-5"
                        style={fontLabel}
                    >
                        <Terminal size={11} className="text-[var(--accent)]" />
                        System Capabilities
                    </div>
                </FadeUp>
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
                    <FadeUp delay={0.05}>
                        <h2
                            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-zinc-50 tracking-tight leading-[1.05] max-w-3xl"
                            style={fontHeadline}
                        >
                            Engineering pillars we deploy in{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-zinc-300">
                                every build.
                            </span>
                        </h2>
                    </FadeUp>
                    <FadeUp delay={0.1} className="lg:pb-1">
                        <p
                            className="text-zinc-500 text-sm leading-relaxed max-w-sm lg:text-right"
                            style={fontBody}
                        >
                            We do not build templates. We architect secure, hyper-scalable
                            infrastructures and localized AI systems.{" "}
                            <span className="lg:hidden">Swipe to explore each pillar.</span>
                            <span className="hidden lg:inline">Scroll to raise each pillar.</span>
                        </p>
                    </FadeUp>
                </div>
            </div>

            {/* ══ MOBILE: snap-scroll row (hidden on lg+) ══ */}
            <div className="lg:hidden">
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-4 px-5 sm:px-8 pb-10 pt-2
                               snap-x snap-mandatory scroll-smooth
                               [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    style={{ touchAction: "pan-x" }}
                >
                    {pillars.map((p, i) => (
                        <div
                            key={p.id}
                            ref={(el) => { mobileCardRefs.current[i] = el; }}
                            className="relative flex-shrink-0 snap-center
                                       w-[min(85vw,340px)]
                                       rounded-2xl border border-white/[0.08] bg-white/[0.025]
                                       p-6 overflow-hidden"
                        >
                            {/* top accent */}
                            <div
                                className="absolute top-0 left-10 right-10 h-px"
                                style={{ background: `linear-gradient(to right, transparent, ${p.accent}70, transparent)` }}
                            />
                            <div
                                className="absolute inset-0 rounded-2xl pointer-events-none"
                                style={{ background: `radial-gradient(circle at 30% 10%, ${p.accent}10, transparent 60%)` }}
                            />
                            <div className="relative z-10 flex flex-col">
                                <div className="flex items-center justify-between mb-5">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/[0.08]"
                                        style={{ background: `${p.accent}15`, color: p.accent }}
                                    >
                                        {p.icon}
                                    </div>
                                    <span className="text-[12px] font-bold text-white/15" style={fontLabel}>{p.num}</span>
                                </div>
                                <h3 className="text-xl font-extrabold text-white tracking-tight mb-3 leading-snug" style={fontHeadline}>
                                    {p.title}
                                </h3>
                                <p className="text-[13px] text-white/45 leading-relaxed mb-6" style={fontBody}>
                                    {p.description}
                                </p>
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                                    {p.tags.map((tag) => (
                                        <span key={tag} className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/50 bg-white/[0.04] border border-white/[0.07] rounded-sm" style={fontLabel}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Swipe dots */}
                <div className="flex justify-center gap-2 pb-10">
                    {pillars.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollToMobile(i)}
                            className="rounded-full transition-all duration-300"
                            style={{
                                width: mobileActive === i ? "20px" : "6px",
                                height: "6px",
                                background: mobileActive === i ? "var(--primary)" : "rgba(255,255,255,0.2)",
                            }}
                            aria-label={`Go to pillar ${i + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* ══ DESKTOP: GSAP vertical pin (hidden on mobile) ══ */}
            <div
                ref={pinRef}
                className="hidden lg:flex relative overflow-hidden bg-[#050505]"
                style={{ height: "100vh" }}
            >
                {/* ── Pillar column background ── */}
                <PillarBackground />

                {/* Top/bottom vignettes */}
                <div className="absolute inset-x-0 top-0 h-32 z-10 pointer-events-none bg-gradient-to-b from-[#050505] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-32 z-10 pointer-events-none bg-gradient-to-t from-[#050505] to-transparent" />

                {/* Progress dots */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2">
                        {pillars.map((_, i) => (
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
                    <span className="text-[9px] text-white/25 uppercase tracking-[0.2em]" style={fontLabel}>
                        Scroll to raise each pillar
                    </span>
                </div>

                {/* GSAP track — cards stack vertically */}
                <div
                    ref={trackRef}
                    className="absolute inset-x-0 flex flex-col items-center gap-8"
                    style={{ willChange: "transform", top: 0 }}
                >
                    {pillars.map((p, i) => (
                        <DesktopPillarCard
                            key={p.id}
                            p={p}
                            ref={(el) => { cardRefs.current[i] = el; }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}