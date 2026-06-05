'use client';

import { useRef, useEffect, useState } from 'react';
import { Terminal, FileCode2, Zap, Network, ShieldCheck, Workflow } from 'lucide-react';

const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

const steps = [
    {
        step: "01",
        title: "Architecture Audit",
        desc: "We analyse your business bottlenecks and map out a high-leverage software or AI architecture. No sales pitches — just technical feasibility and a clear decision framework.",
        icon: <Terminal size={18} />,
        accent: "var(--primary)",
    },
    {
        step: "02",
        title: "Scope Lock & Infrastructure Spin-Up",
        desc: "You receive a fixed-scope blueprint with zero hidden overhead. Once approved, cloud environments, databases, and repositories are initialised immediately.",
        icon: <FileCode2 size={18} />,
        accent: "var(--primary)",
    },
    {
        step: "03",
        title: "48-Hour Production Deployment",
        desc: "We bypass corporate lag. Core business logic, UI, and database schemas are engineered and deployed to a live, secured URL within 48 to 72 hours.",
        icon: <Zap size={18} />,
        accent: "var(--accent)",
        featured: true,
    },
    {
        step: "04",
        title: "Scale & AI Integration",
        desc: "We scale the MVP through rapid, transparent sprints — integrating complex AI workflows, edge functions, and third-party APIs on demand.",
        icon: <Network size={18} />,
        accent: "var(--primary)",
    },
    {
        step: "05",
        title: "Handoff & Infrastructure Ops",
        desc: "Production environments go live. Clean, strongly-typed code handoffs and continuous telemetry monitoring ensure zero-latency performance post-launch.",
        icon: <ShieldCheck size={18} />,
        accent: "var(--primary)",
    },
];

function PipelineStep({ step, index, isVisible }) {
    const isEven = index % 2 === 0;

    return (
        <div
            className="relative flex items-start gap-0"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
            }}
        >
            {/* Left gutter: step number + node */}
            <div className="flex flex-col items-center w-16 flex-shrink-0">
                {/* Step number */}
                <span
                    className="text-[10px] font-black text-zinc-700 tracking-[0.2em] mb-2 tabular-nums"
                    style={fontLabel}
                >
                    {step.step}
                </span>

                {/* Node dot */}
                <div
                    className="relative w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-500"
                    style={{
                        background: step.featured
                            ? `radial-gradient(circle, rgba(56,189,248,0.25) 0%, transparent 70%)`
                            : `rgba(255,255,255,0.04)`,
                        border: step.featured
                            ? `1px solid rgba(56,189,248,0.4)`
                            : `1px solid rgba(255,255,255,0.08)`,
                        color: step.featured ? 'var(--accent)' : 'rgb(113 113 122)',
                        boxShadow: step.featured ? '0 0 20px rgba(56,189,248,0.2)' : 'none',
                    }}
                >
                    {step.icon}
                </div>
            </div>

            {/* Content */}
            <div
                className="flex-1 pb-12 pl-6 group cursor-default"
            >
                <div
                    className="p-7 rounded-2xl border transition-all duration-500"
                    style={{
                        background: step.featured
                            ? 'linear-gradient(135deg, rgba(56,189,248,0.05) 0%, rgba(0,102,255,0.03) 100%)'
                            : 'rgba(255,255,255,0.018)',
                        borderColor: step.featured
                            ? 'rgba(56,189,248,0.2)'
                            : 'rgba(255,255,255,0.05)',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.borderColor = step.featured
                            ? 'rgba(56,189,248,0.4)'
                            : 'rgba(255,255,255,0.12)';
                        e.currentTarget.style.background = step.featured
                            ? 'linear-gradient(135deg, rgba(56,189,248,0.08) 0%, rgba(0,102,255,0.05) 100%)'
                            : 'rgba(255,255,255,0.03)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.borderColor = step.featured
                            ? 'rgba(56,189,248,0.2)'
                            : 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.background = step.featured
                            ? 'linear-gradient(135deg, rgba(56,189,248,0.05) 0%, rgba(0,102,255,0.03) 100%)'
                            : 'rgba(255,255,255,0.018)';
                    }}
                >
                    {/* Title row */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                        <h3
                            className="text-base sm:text-lg font-extrabold text-zinc-100 tracking-tight leading-snug"
                            style={fontHeadline}
                        >
                            {step.title}
                        </h3>
                        {step.featured && (
                            <span
                                className="flex-shrink-0 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.2em] text-[var(--accent)] border border-[var(--accent)]/30 bg-[var(--accent)]/10"
                                style={fontLabel}
                            >
                                Critical Path
                            </span>
                        )}
                    </div>

                    <p
                        className="text-zinc-500 text-sm leading-relaxed"
                        style={fontBody}
                    >
                        {step.desc}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function PipelineSection() {
    const sectionRef = useRef(null);
    const lineRef = useRef(null);
    const [visibleSteps, setVisibleSteps] = useState([]);
    const [lineHeight, setLineHeight] = useState(0);
    const stepRefs = useRef([]);

    useEffect(() => {
        const observers = [];

        stepRefs.current.forEach((el, i) => {
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisibleSteps(prev => prev.includes(i) ? prev : [...prev, i]);
                        obs.disconnect();
                    }
                },
                { threshold: 0.2 }
            );
            obs.observe(el);
            observers.push(obs);
        });

        // Grow the line based on scroll
        const lineEl = lineRef.current;
        if (lineEl) {
            const lineObs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setLineHeight(100);
                    }
                },
                { threshold: 0.05 }
            );
            lineObs.observe(lineEl);
            observers.push(lineObs);
        }

        return () => observers.forEach(o => o.disconnect());
    }, []);

    return (
        <section className="mb-32 relative z-10 px-4 sm:px-6 md:px-0">
            <div className="max-w-3xl mx-auto">

                {/* Section Header */}
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded border border-white/[0.08] bg-white/[0.02] text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                        <Workflow size={14} className="text-[var(--primary)]" />
                        <span>[ ] Execution Protocol</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <h2
                            className="text-4xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-[1.05]"
                            style={fontHeadline}
                        >
                            Raw Concept to<br />
                            <span
                                className="text-transparent bg-clip-text"
                                style={{ backgroundImage: 'linear-gradient(to right, #60a5fa, var(--primary), var(--accent))' }}
                            >
                                Live Infrastructure.
                            </span>
                        </h2>
                        <p className="text-zinc-600 text-sm max-w-[200px] leading-relaxed sm:text-right" style={fontBody}>
                            Five phases. Zero delays. Production-first from day one.
                        </p>
                    </div>
                </div>

                {/* Pipeline */}
                <div className="relative" ref={sectionRef}>

                    {/* Animated vertical connector line */}
                    <div
                        className="absolute left-[31px] top-[52px] w-px pointer-events-none hidden sm:block"
                        style={{
                            height: `calc(100% - 96px)`,
                            background: 'linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(56,189,248,0.3), rgba(0,102,255,0.2), rgba(255,255,255,0.04))',
                        }}
                        ref={lineRef}
                    >
                        {/* Animated travelling dot */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"
                            style={{
                                top: `${lineHeight}%`,
                                transition: 'top 2.5s cubic-bezier(0.22, 1, 0.36, 1)',
                            }}
                        />
                    </div>

                    {/* Steps */}
                    {steps.map((step, i) => (
                        <div key={i} ref={el => (stepRefs.current[i] = el)}>
                            <PipelineStep
                                step={step}
                                index={i}
                                isVisible={visibleSteps.includes(i)}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
