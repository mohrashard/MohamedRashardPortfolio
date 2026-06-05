import React from 'react';
import { Terminal, ShieldCheck, Zap, Globe } from 'lucide-react';

// ── Shared font tokens ──────────────────────────────────────
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

export default function TrustBar() {
    return (
        <div className="w-full bg-[#050505] border-y border-white/[0.04] py-3 relative z-20 overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary)]/5 to-transparent opacity-50 pointer-events-none" />

            <div
                className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center lg:justify-between items-center text-[10px] sm:text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em] gap-y-4 gap-x-8"
                style={fontLabel}
            >
                {/* 1. Establishing the Firm */}
                <span className="flex items-center gap-2.5 group">
                    <Terminal size={14} className="text-[var(--primary)] group-hover:text-white transition-colors" />
                    <span>High-Velocity Software Lab</span>
                </span>

                <span className="hidden lg:inline text-white/[0.08]">•</span>

                {/* 2. The Operational Guarantee */}
                <span className="flex items-center gap-2.5 group">
                    <ShieldCheck size={14} className="text-[var(--accent)] group-hover:text-white transition-colors" />
                    <span>Founder-Led Engineering</span>
                </span>

                <span className="hidden lg:inline text-white/[0.08]">•</span>

                {/* 3. The Proof of Execution */}
                <span className="flex items-center gap-2.5 group">
                    <Zap size={14} className="text-[var(--primary)] group-hover:text-white transition-colors" />
                    <span>10+ Production Systems Shipped</span>
                </span>

                <span className="hidden lg:inline text-white/[0.08]">•</span>

                {/* 4. The Global Reach */}
                <span className="flex items-center gap-2.5 group">
                    <Globe size={14} className="text-[var(--accent)] group-hover:text-white transition-colors" />
                    <span>Global Infrastructure Reach</span>
                </span>
            </div>
        </div>
    );
}