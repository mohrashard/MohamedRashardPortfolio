"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const hasTriggered = useRef(false);
    const lastY = useRef(0);
    const active = useRef(false); // becomes true after initial delay

    useEffect(() => {
        const trigger = () => {
            if (hasTriggered.current) return;
            hasTriggered.current = true;
            setIsVisible(true);
        };

        // Strategy 1: document.mouseleave — fires when cursor exits the browser viewport entirely
        const onMouseLeave = () => trigger();

        // Strategy 2: Predictive upward velocity — fires when the mouse moves quickly
        // toward the very top of the viewport (≤ 15px from top) at speed.
        // This catches the intent BEFORE the cursor leaves the document,
        // which is what happens when someone rapidly moves to click the tab X.
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
                        onClick={() => setIsVisible(false)}
                        className="fixed inset-0 bg-[#020202]/85 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0a0f1c] to-[#0f0a1c] border border-blue-500/20 shadow-[0_0_120px_rgba(59,130,246,0.25)] p-8 md:p-12 z-10"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-500 hover:text-white transition-all border border-white/5 hover:border-white/10 z-20"
                        >
                            <i className="fas fa-times text-sm"></i>
                        </button>

                        {/* Glow orbs */}
                        <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none"></div>
                        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none"></div>

                        <div className="relative z-10 text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-6">
                                <i className="fas fa-gift text-[10px]"></i> Free Audit — No Forms
                            </div>

                            <h2 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight">
                                Before you go...
                            </h2>

                            <p className="text-slate-300 text-base leading-relaxed mb-8">
                                Get a free <strong className="text-white">AI Opportunity Audit</strong>. No lengthy forms, no calls.<br /><br />
                                Drop your email below. I'll reply, you send your website URL, and I'll send back a custom Loom video within <strong className="text-white">48 hours</strong>.
                            </p>

                            {status === 'success' ? (
                                <div className="p-5 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-400 font-bold text-base">
                                    <i className="fas fa-check-circle mr-2"></i> Email sent! Check your inbox and reply with your website URL.
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email to claim..."
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium"
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-base hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-70 flex justify-center items-center gap-2"
                                    >
                                        {status === 'loading' ? (
                                            <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                                        ) : (
                                            <><i className="fas fa-bolt"></i> Send My Free Audit</>
                                        )}
                                    </button>
                                </form>
                            )}
                            {status === 'error' && (
                                <p className="text-red-400 text-sm mt-4"><i className="fas fa-exclamation-triangle mr-1"></i> Something went wrong. Please try again.</p>
                            )}

                            <p className="text-slate-600 text-xs mt-5">
                                No spam. Just one audit, personally from me.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
