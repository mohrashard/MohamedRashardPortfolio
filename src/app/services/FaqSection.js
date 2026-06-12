'use client';

import { useState } from 'react';
import { Terminal, ChevronDown } from 'lucide-react';

const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

export default function FaqSection() {
    const faqs = [
        {
            q: "Can you actually deploy an MVP in 48-72 hours?",
            a: "Yes. We bypass standard agency lag by utilizing a strict, highly-optimized core stack (Next.js & Supabase). We architect and deploy the core business logic and database schema to a live URL within 72 hours. Advanced feature scaling follows in subsequent sprints."
        },
        {
            q: "How does your pricing model work?",
            a: "We operate on fixed-scope execution. Zero hidden retainers and zero scope creep. Following our initial architecture audit, you receive a precise technical blueprint and a locked execution cost before a single line of code is written."
        },
        {
            q: "How long does it take to scale the full product after the MVP?",
            a: "Continuous integration takes a few weeks, depending on system complexity. We execute via rapid, transparent sprints. You receive live staging links and direct code updates weekly, ensuring zero dead time."
        },
        {
            q: "Do you engineer systems for international clients?",
            a: "Yes. We engineer digital infrastructure for founders and teams globally. Our async workflow and daily telemetry logs mean time zones never bottleneck our deployment speed."
        },
        {
            q: "What is your operational advantage over traditional agencies?",
            a: "Traditional agencies sell you months of discovery phases, account managers, and communication bloat. We sell direct, founder-led engineering. You work strictly with the engineers architecting your systems, allowing for extreme execution speed."
        },
        {
            q: "What happens during the Technical Architecture Audit?",
            a: "It is a comprehensive technical diagnostic. We analyze your business bottlenecks and deliver a custom blueprint—delivered via a Loom video walkthrough—detailing exactly how custom software and AI workflows can eliminate your manual overhead. Zero obligation."
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="mb-32 relative z-10 px-4 sm:px-6 md:px-0">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16 flex flex-col items-center" data-animate="slide-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded border border-white/[0.08] bg-white/[0.02] text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                        <Terminal size={14} className="text-[var(--primary)]" />
                        <span>[ ] Operations & Parameters</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-50 tracking-tight leading-[1.1]" style={fontHeadline}>
                        System Diagnostics.
                    </h2>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-3">
                    {faqs.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div key={i} data-animate="slide-up" data-delay={String((i % 4) + 1)}>
                                <div
                                    className={`group relative rounded-2xl bg-[#0A0A0A]/80 backdrop-blur-md border transition-all duration-300 overflow-hidden cursor-pointer ${isOpen
                                        ? "border-[#38BDF8]/30 shadow-[0_10px_30px_rgba(56,189,248,0.05)]"
                                        : "border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.02]"
                                        }`}
                                    onClick={() => toggleOpen(i)}
                                >
                                    {/* Left Active Glow Bar */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0066FF] to-[#38BDF8] transition-transform duration-500 origin-top ${isOpen ? "scale-y-100" : "scale-y-0"
                                        }`} />

                                    {/* Question Summary */}
                                    <div className="p-6 md:p-8 flex items-center justify-between gap-6">
                                        <h3 className={`font-extrabold text-base md:text-lg transition-colors ${isOpen ? "text-[#38BDF8]" : "text-zinc-50 group-hover:text-zinc-200"
                                            }`} style={fontHeadline}>
                                            {item.q}
                                        </h3>
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen
                                            ? "border-[#38BDF8]/30 bg-[#38BDF8]/10 text-[#38BDF8] rotate-180"
                                            : "border-white/[0.08] bg-white/[0.02] text-zinc-500"
                                            }`}>
                                            <ChevronDown size={16} />
                                        </div>
                                    </div>

                                    {/* Expandable Answer */}
                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-6 md:px-8 pb-8 pt-0 text-zinc-400 text-sm md:text-base leading-relaxed" style={fontBody}>
                                                <div className="h-px w-12 bg-white/[0.08] mb-6" />
                                                {item.a}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
