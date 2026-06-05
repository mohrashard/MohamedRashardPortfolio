"use client";
import React from "react";
import { motion } from "framer-motion";
import TimezoneWidget from "./TimezoneWidget";

// ── Shared font tokens ──────────────────────────────────────
const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

export default function Contact() {
    return (
        <section id="contact" className="relative w-full bg-[#030303] overflow-hidden py-32 flex flex-col items-center justify-center min-h-[90vh]">
            
            {/* ── CSS Planet Horizon Background ── */}
            {/* Dark void at the top, planet horizon starts down a bit */}
            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[250vw] sm:w-[150vw] lg:w-[120vw] h-[1500px] rounded-[100%] bg-gradient-to-b from-[#0044ff]/10 via-[#001144]/5 to-transparent border-t border-[var(--primary)]/30 shadow-[inset_0_80px_120px_rgba(0,102,255,0.15)] pointer-events-none" />
            
            {/* Central core glow */}
            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[60vw] h-[300px] bg-[var(--primary)]/20 blur-[120px] rounded-[100%] pointer-events-none" />
            
            {/* Subtle grid on the planet surface */}
            <div 
                className="absolute inset-0 pointer-events-none" 
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)
                    `,
                    backgroundSize: "4rem 4rem",
                    maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 100%)",
                }}
            />

            <div className="relative z-10 w-full max-w-3xl mx-auto px-5 sm:px-8">
                
                {/* ── Header ── */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-10"
                >
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold text-[var(--primary)] mb-5" style={fontLabel}>
                        INITIATE PROTOCOL
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-5" style={fontHeadline}>
                        Let's build your system.
                    </h2>
                    
                    <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed" style={fontBody}>
                        Whether you need a full technical audit, a custom engineering build, or just want to connect—reach out directly.
                    </p>
                </motion.div>

                {/* ── Contact Options Container ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="relative bg-[#0A0A0A]/60 backdrop-blur-xl border border-white/[0.06] rounded-[24px] p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto"
                >
                    {/* Inner subtle glow border */}
                    <div className="absolute inset-0 rounded-[24px] pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)" }} />

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Audit Card */}
                        <a 
                            href="/services#audit-form"
                            className="flex flex-col items-center justify-center gap-4 bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 border border-[var(--primary)]/30 hover:border-[var(--primary)]/60 rounded-xl px-6 py-10 transition-all duration-300 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10 w-14 h-14 rounded-2xl bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-2xl group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(0,102,255,0.4)] transition-all duration-300">
                                <i className="fas fa-magnifying-glass"></i>
                            </div>
                            <div className="relative z-10 text-center mt-2">
                                <h4 className="text-[15px] font-bold text-white mb-1 tracking-tight" style={fontHeadline}>System Audit</h4>
                                <p className="text-[13px] text-[var(--primary)] font-medium" style={fontBody}>Free technical teardown</p>
                            </div>
                        </a>

                        {/* Email Card */}
                        <a 
                            href={`mailto:${process.env.NEXT_PUBLIC_REPLY_TO_EMAIL}`}
                            className="flex flex-col items-center justify-center gap-4 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-[var(--primary)]/50 rounded-xl px-6 py-10 transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white/[0.05] text-zinc-300 group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary)] flex items-center justify-center text-2xl group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,102,255,0.2)] transition-all duration-300">
                                <i className="far fa-envelope"></i>
                            </div>
                            <div className="text-center mt-2">
                                <h4 className="text-[15px] font-bold text-zinc-100 mb-1 tracking-tight" style={fontHeadline}>Email Directly</h4>
                                <p className="text-[13px] text-zinc-500" style={fontBody}>{process.env.NEXT_PUBLIC_REPLY_TO_EMAIL}</p>
                            </div>
                        </a>

                        {/* LinkedIn Card */}
                        <a 
                            href="https://www.linkedin.com/in/mohamedrashard" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center gap-4 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-[#0077b5]/50 rounded-xl px-6 py-10 transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-[#0077b5]/10 text-[#0077b5] flex items-center justify-center text-2xl group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,119,181,0.2)] transition-all duration-300">
                                <i className="fab fa-linkedin-in"></i>
                            </div>
                            <div className="text-center mt-2">
                                <h4 className="text-[15px] font-bold text-zinc-100 mb-1 tracking-tight" style={fontHeadline}>LinkedIn</h4>
                                <p className="text-[13px] text-zinc-500" style={fontBody}>Connect and message</p>
                            </div>
                        </a>
                        
                    </div>

                    {/* Live Timezone Widget */}
                    <div className="relative z-10 mt-10 pt-8 border-t border-white/[0.06] flex justify-center">
                        <TimezoneWidget />
                    </div>
                </motion.div>
                
            </div>
        </section>
    );
}