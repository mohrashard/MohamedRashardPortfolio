"use client";

import React from "react";
import { Activity } from "lucide-react";

// ── Shared font tokens ──────────────────────────────────────
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

export default function SocialProofTicker() {
    // ── Firm-Level Telemetry Logs ──────────────────────────────
    const items = [
        "Ignite Ed: AI-powered education ecosystem & production admin panel built in 48 hours",
        "BizFinder AI: Zero-touch automated prospecting deployed for design agencies",
        "GrabMe: Sri Lanka's premiere home services marketplace MVP shipped in <48h",
        "48-Hour Architectures. Not a claim. An engineered track record.",
    ];

    // Array repeated to ensure a seamless infinite scrolling loop
    const tickerItems = [...items, ...items, ...items];

    return (
        <div className="w-full bg-[#050505] border-y border-white/[0.04] overflow-hidden flex items-center h-12 relative z-20">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.333333%); }
                }
                .animate-ticker {
                    display: flex;
                    width: max-content;
                    animation: ticker 40s linear infinite;
                }
                .animate-ticker:hover {
                    animation-play-state: paused;
                }
            `}} />

            <div className="animate-ticker">
                {tickerItems.map((item, index) => (
                    <div key={index} className="flex items-center px-8 whitespace-nowrap group cursor-default" style={fontLabel}>
                        <Activity size={14} className="text-[var(--primary)] mr-3 group-hover:text-[var(--accent)] transition-colors" />
                        <span className="text-zinc-500 text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase group-hover:text-zinc-50 transition-colors duration-300">
                            {item}
                        </span>
                    </div>
                ))}
            </div>

            {/* Fade Out Edges - Updated to match the dark zinc background */}
            <div className="absolute top-0 left-0 w-24 sm:w-32 h-full bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent pointer-events-none z-10"></div>
            <div className="absolute top-0 right-0 w-24 sm:w-32 h-full bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent pointer-events-none z-10"></div>
        </div>
    );
}
