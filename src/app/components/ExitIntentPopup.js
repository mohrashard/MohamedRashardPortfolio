"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, CheckCircle, Zap, AlertTriangle, Terminal } from 'lucide-react';

const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

export default function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const hasTriggered = useRef(false);
    const lastY = useRef(0);
    const active = useRef(false); // becomes true after initial delay

    useEffect(() => {
        // Persistence Guard: Only show once every 24 hours
        const lastShown = localStorage.getItem("exitIntentLastShown");
        const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
        if (lastShown && parseInt(lastShown) > oneDayAgo) return;

        // Session Guard: Only once per browser session
        if (sessionStorage.getItem("exitIntentShownSession")) return;

        const trigger = () => {
            if (hasTriggered.current) return;
            hasTriggered.current = true;
            sessionStorage.setItem("exitIntentShownSession", "true");
            setIsVisible(true);
        };

        // Strategy 1: document.mouseleave — fires when cursor exits the browser viewport entirely
        const onMouseLeave = () => trigger();

        // Strategy 2: Predictive upward velocity — fires when the mouse moves quickly
        // toward the very top of the viewport (≤ 15px from top) at speed.
        const onMouseMove = (e) => {
            if (!active.current) return;
            const velocity = lastY.current - e.clientY; // positive = moving up
            lastY.current = e.clientY;

            if (e.clientY < 15 && velocity > 8) {
                trigger();
            }
        };

        // Safety: activate both listeners only after 3 seconds on page
        const timer = setTimeout(() => {
            active.current = true;
            document.addEventListener('mouseleave', onMouseLeave);
            document.addEventListener('mousemove', onMouseMove);
        }, 3000);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch('/api/exit-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) throw new Error();
            localStorage.setItem("exitIntentLastShown", Date.now().toString());
            setStatus('success');
            setTimeout(() => setIsVisible(false), 4000);
        } catch {
            setStatus('error');
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                            setIsVisible(false);
                            localStorage.setItem("exitIntentLastShown", Date.now().toString());
                        }}
                        className="fixed inset-0 bg-[#030d12]/85 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/[0.08] shadow-[0_0_80px_rgba(0,102,255,0.15)] p-8 md:p-12 z-10"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => {
                                setIsVisible(false);
                                localStorage.setItem("exitIntentLastShown", Date.now().toString());
                            }}
                            className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-500 hover:text-white transition-all border border-white/5 hover:border-white/10 z-20"
                        >
                            <X size={16} />
                        </button>

                        {/* Glow orbs */}
                        <div className="absolute -top-32 -left-32 w-64 h-64 bg-[var(--primary)]/10 blur-[80px] rounded-full pointer-events-none"></div>
                        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[var(--accent)]/10 blur-[80px] rounded-full pointer-events-none"></div>

                        <div className="relative z-10 text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--accent)] text-[10px] font-bold uppercase tracking-[0.2em] mb-6" style={fontLabel}>
                                <Terminal size={12} /> Execution Audit
                            </div>

                            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5 leading-tight tracking-tight" style={fontHeadline}>
                                Before you deploy...
                            </h2>

                            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 font-light" style={fontBody}>
                                Secure a complimentary <strong className="text-white font-medium">Technical Architecture Audit</strong>. No sales calls. No bloated discovery.<br /><br />
                                Input your email. Our lead engineers will analyze your infrastructure and deliver a definitive execution blueprint within <strong className="text-white font-medium">48 hours</strong>.
                            </p>

                            {status === 'success' ? (
                                <div className="p-5 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--accent)] font-semibold text-sm flex items-center justify-center gap-2" style={fontBody}>
                                    <CheckCircle size={18} /> Telemetry captured. Check your inbox.
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Engineering contact email..."
                                        className="w-full bg-[#050505] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-[var(--primary)]/50 focus:ring-1 focus:ring-[var(--primary)]/50 transition-all font-medium text-sm"
                                        style={fontBody}
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full px-8 py-4 rounded-xl bg-[var(--primary)] text-white font-bold text-[11px] uppercase tracking-widest hover:bg-[#0055d4] shadow-[0_0_20px_rgba(0,102,255,0.2)] hover:-translate-y-0.5 transition-all disabled:opacity-70 flex justify-center items-center gap-2"
                                        style={fontLabel}
                                    >
                                        {status === 'loading' ? (
                                            <span className="flex items-center gap-2"><Zap className="animate-pulse" size={14} /> Initializing...</span>
                                        ) : (
                                            <><Zap size={14} /> Request System Audit</>
                                        )}
                                    </button>
                                </form>
                            )}
                            {status === 'error' && (
                                <p className="text-red-400 text-xs mt-4 flex items-center justify-center gap-1" style={fontLabel}><AlertTriangle size={12} /> System fault. Try again.</p>
                            )}

                            <p className="text-slate-600 text-[10px] uppercase tracking-widest mt-6 font-bold" style={fontLabel}>
                                ZERO SPAM. DETERMINISTIC ENGINEERING ONLY.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
