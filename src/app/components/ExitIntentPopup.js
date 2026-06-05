"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Terminal, CheckCircle } from 'lucide-react';

const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

export default function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const hasTriggered = useRef(false);
    const active = useRef(false);

    useEffect(() => {
        // Only trigger once per session (Disable this line if you are testing repeatedly!)
        // if (sessionStorage.getItem("exitIntentShownSession")) return;

        const trigger = () => {
            if (hasTriggered.current) return;
            hasTriggered.current = true;
            sessionStorage.setItem("exitIntentShownSession", "true");
            setIsVisible(true);
        };

        const onMouseLeave = (e) => {
            if (e.clientY <= 0) trigger();
        };

        // Fallback: Detect mouse moving quickly to the top of the browser (tabs area)
        const onMouseMove = (e) => {
            if (e.clientY <= 15) trigger();
        };

        const timer = setTimeout(() => {
            active.current = true;
            document.addEventListener('mouseleave', onMouseLeave);
            document.addEventListener('mousemove', onMouseMove);
        }, 3000); // Changed back to 3s. 5s is too long, users will leave before the listener attaches!

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
            setStatus('success');
            setTimeout(() => setIsVisible(false), 3000);
        } catch {
            setStatus('error');
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setIsVisible(false)}
                        className="fixed inset-0 bg-[#050505]/90 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                        className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-[#080808] border border-white/[0.08] shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-white/[0.05]">
                            <div className="flex items-center gap-3">
                                <Terminal size={16} className="text-[var(--primary)]" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400" style={fontLabel}>
                                    Mr² Labs // Diagnostic Portal
                                </span>
                            </div>
                            <button onClick={() => setIsVisible(false)} className="text-zinc-600 hover:text-white transition-colors">
                                <X size={16} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8 md:p-10">
                            {status === 'success' ? (
                                <div className="text-center py-10">
                                    <CheckCircle size={48} className="text-emerald-500 mx-auto mb-6" />
                                    <h3 className="text-2xl font-bold text-white mb-2" style={fontHeadline}>Architecture Initiated</h3>
                                    <p className="text-zinc-400 text-sm">Your technical audit request has been logged. Expect our engineering brief within 48 hours.</p>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-extrabold text-zinc-50 mb-4 tracking-tight" style={fontHeadline}>
                                        Request Your Architecture Audit
                                    </h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                                        Before you finalize your stack, let us map your technical infrastructure. We’ll deliver a production-grade deployment roadmap tailored to your specific business logic.
                                    </p>

                                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="engineering@your-company.com"
                                            className="w-full bg-[#0A0A0A] border border-white/[0.1] rounded-xl px-5 py-4 text-sm text-white focus:border-[var(--primary)] outline-none transition-all placeholder:text-zinc-700"
                                        />
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full py-4 rounded-xl bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                                            style={fontLabel}
                                        >
                                            {status === 'loading' ? 'Processing...' : (
                                                <> <Zap size={14} /> Initiate Technical Audit</>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}