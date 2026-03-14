"use client";

import React, { useState } from 'react';

export default function LeadMagnetBanner() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        
        try {
            const res = await fetch('/api/blueprint-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            
            if (!res.ok) throw new Error('Failed to submit');
            
            setStatus('success');
            setEmail('');
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="mt-28 mb-12 max-w-4xl mx-auto relative z-20">
            <div className="rounded-3xl bg-gradient-to-br from-[#0a0f1c] to-[#0f0a1c] border border-white/10 p-8 md:p-12 text-center overflow-hidden relative shadow-2xl">
                {/* Background Glows */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none"></div>
                
                <div className="relative z-10">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-widest">
                        <i className="fas fa-gift mr-2"></i> Free Resource
                    </div>
                    
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-5 tracking-tight">Not ready to hire yet?</h3>
                    <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        Get the free <strong className="text-white">72-Hour MVP Blueprint</strong>. A PDF walkthrough of exactly how I ship a working product in 3 days.
                    </p>
                    
                    {status === 'success' ? (
                        <div className="inline-block px-10 py-5 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-400 font-bold text-lg shadow-[0_0_30px_rgba(34,197,94,0.15)] animate-in fade-in zoom-in duration-300">
                            <i className="fas fa-check-circle mr-3 text-xl"></i> Blueprint sent! Check your inbox.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto">
                            <input 
                                type="email" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your best email..." 
                                className="flex-grow bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-medium text-lg"
                            />
                            <button 
                                type="submit" 
                                disabled={status === 'loading'}
                                className="px-8 py-4 rounded-2xl bg-white text-black font-black text-lg hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-3 whitespace-nowrap min-w-[240px]"
                            >
                                {status === 'loading' ? (
                                    <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                                ) : (
                                    <>Send Me the Blueprint <i className="fas fa-arrow-right text-sm"></i></>
                                )}
                            </button>
                        </form>
                    )}
                    {status === 'error' && (
                        <p className="text-red-400 text-sm mt-5"><i className="fas fa-exclamation-triangle mr-2"></i>Something went wrong. Please try again.</p>
                    )}
                    
                    <p className="text-slate-500 text-xs mt-6">
                        No spam. No fluff. Just pure engineering value.
                    </p>
                </div>
            </div>
        </div>
    );
}
