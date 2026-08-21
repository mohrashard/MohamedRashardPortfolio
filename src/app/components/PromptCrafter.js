"use client";

import React, { useState, useEffect } from 'react';
import { Terminal, Copy, CheckCircle2, Zap, Activity, Mail, Sparkles } from 'lucide-react';

const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

export default function PromptCrafter() {
    const [email, setEmail] = useState("");
    const [isSendingLead, setIsSendingLead] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const [crafterInput, setCrafterInput] = useState("");
    const [isCrafting, setIsCrafting] = useState(false);
    const [craftedPrompt, setCraftedPrompt] = useState("");
    const [copiedCrafted, setCopiedCrafted] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const hasUnlocked = localStorage.getItem('prompt_crafter_unlocked');
            if (hasUnlocked === 'true') {
                setEmailSent(true);
            }
        }
    }, []);

    const handleUnlockCrafter = async (e) => {
        e.preventDefault();
        if (!email.trim() || !email.includes("@")) return;
        setIsSendingLead(true);
        try {
            await fetch('/api/prompt-library-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            setEmailSent(true);
            if (typeof window !== "undefined") {
                localStorage.setItem('prompt_crafter_unlocked', 'true');
            }
        } catch (error) {
            console.error(error);
        }
        setIsSendingLead(false);
    };

    const handleCraftPrompt = async (e) => {
        e.preventDefault();
        if (!crafterInput.trim()) return;
        setIsCrafting(true);
        setCraftedPrompt("");
        
        try {
            const res = await fetch('/api/prompt-crafter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ request: crafterInput })
            });
            const data = await res.json();
            if (data.success) {
                setCraftedPrompt(data.prompt);
            } else {
                alert("Generation failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
        }
        setIsCrafting(false);
    };

    const handleCopyCrafted = () => {
        navigator.clipboard.writeText(craftedPrompt);
        setCopiedCrafted(true);
        setTimeout(() => setCopiedCrafted(false), 2000);
    };

    return (
        <div id="crafter" className="p-8 md:p-12 rounded-[2.5rem] bg-[#0A0A0A]/90 border border-[var(--primary)]/20 relative overflow-hidden group shadow-[0_10px_40px_-10px_rgba(0,102,255,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent opacity-50 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10">
                {!emailSent ? (
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] text-[10px] font-bold uppercase tracking-widest" style={fontLabel}>
                                <Sparkles size={14} /> AI Generator Unlocked
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-3 tracking-tight" style={fontHeadline}>
                                Need a Custom Master Prompt?
                            </h4>
                            <p className="text-zinc-400 text-sm leading-relaxed max-w-md mx-auto lg:mx-0" style={fontBody}>
                                Tell our AI what you are trying to build or achieve. It will instantly engineer a highly-structured, elite meta-prompt that you can feed into Claude or ChatGPT. Drop your email to unlock the generator.
                            </p>
                        </div>
                        
                        <div className="w-full lg:w-[400px]">
                            <form onSubmit={handleUnlockCrafter} className="flex flex-col gap-4">
                                <div className="relative">
                                    <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600" />
                                    <input 
                                        type="email" 
                                        placeholder="founder@startup.com" 
                                        required 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        className="w-full pl-14 pr-5 py-4 bg-[#050505] border border-white/[0.08] rounded-xl text-white focus:border-[var(--primary)] outline-none transition-all text-sm placeholder:text-zinc-700" 
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={isSendingLead || !email} 
                                    className="w-full flex justify-center items-center gap-2 py-4 rounded-xl bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#0055d4] disabled:opacity-50 transition-all shadow-md border border-white/5" 
                                    style={fontLabel}
                                >
                                    {isSendingLead ? <><Activity size={16} className="animate-spin" /> Unlocking...</> : <><Zap size={14} /> Unlock Custom Crafter</>}
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/20 border border-[var(--primary)]/30 flex items-center justify-center text-[var(--primary)]">
                                <Sparkles size={20} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white" style={fontHeadline}>Custom Prompt Crafter</h4>
                                <p className="text-xs text-[var(--primary)] font-mono tracking-widest uppercase mt-1">Engineered by Mr² Labs</p>
                            </div>
                        </div>

                        <form onSubmit={handleCraftPrompt} className="mb-8">
                            <div className="relative group">
                                <textarea 
                                    className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 text-zinc-200 text-sm focus:outline-none focus:border-[var(--primary)]/50 transition-all resize-none placeholder:text-zinc-600 shadow-inner"
                                    rows={3}
                                    placeholder="Example: I need a prompt to generate a beautiful, high-converting Next.js landing page for a SaaS product..."
                                    value={crafterInput}
                                    onChange={(e) => setCrafterInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleCraftPrompt(e); } }}
                                />
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button 
                                    type="submit" 
                                    disabled={isCrafting || !crafterInput.trim()} 
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#0055d4] disabled:opacity-30 transition-all shadow-md border border-white/5" 
                                    style={fontLabel}
                                >
                                    {isCrafting ? <><Activity size={14} className="animate-spin" /> Engineering Prompt...</> : <><Terminal size={14} /> Generate Master Prompt</>}
                                </button>
                            </div>
                        </form>

                        {craftedPrompt && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center justify-between mb-3 px-1">
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Your Meta-Prompt</span>
                                    <button 
                                        onClick={handleCopyCrafted}
                                        className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors ${copiedCrafted ? 'text-[var(--accent)]' : 'text-zinc-400 hover:text-white'}`}
                                    >
                                        {copiedCrafted ? <><CheckCircle2 size={12} /> Copied to Clipboard</> : <><Copy size={12} /> Copy Prompt</>}
                                    </button>
                                </div>
                                <div className="p-6 rounded-xl bg-[#050505] border border-white/[0.08] text-sm font-mono text-[var(--accent)] leading-relaxed max-h-64 overflow-y-auto select-all shadow-inner border-l-2 border-l-[var(--accent)]">
                                    {craftedPrompt}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
