"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Terminal, ArrowLeft, Activity, ChevronRight, Linkedin, Copy, CheckCircle2, Zap, UserCircle } from 'lucide-react';

// ── Shared font tokens ──────────────────────────────────────
const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

const QUESTIONS = [
    { id: "role", label: "What is your current role or title? (e.g., Fractional CMO, SaaS Founder)" },
    { id: "industry", label: "What industry do you operate in? (e.g., B2B Software, Healthcare, E-commerce)" },
    { id: "value", label: "What is your core value proposition? (e.g., I help retail brands scale past $1M using automated email marketing)" }
];

const TERMINAL_STEPS = [
    "Analyzing LinkedIn search algorithms...",
    "Extracting high-volume industry keywords...",
    "Structuring psychological copywriting frameworks...",
    "Optimizing character counts for mobile view...",
    "Finalizing profile headline permutations..."
];

export default function LinkedinHeadlineGenerator() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [currentInput, setCurrentInput] = useState("");
    const [status, setStatus] = useState("idle"); 
    const [result, setResult] = useState(null);
    const [copiedIndex, setCopiedIndex] = useState(null);
    
    const [terminalStep, setTerminalStep] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
        if (status === "idle" && inputRef.current) inputRef.current.focus();
    }, [step, status]);

    useEffect(() => {
        if (status === "analyzing") {
            const interval = setInterval(() => {
                setTerminalStep(prev => (prev < TERMINAL_STEPS.length - 1 ? prev + 1 : prev));
            }, 600);
            return () => clearInterval(interval);
        }
    }, [status]);

    const handleNext = async () => {
        if (!currentInput.trim()) return;
        const currentQ = QUESTIONS[step].label;
        const newAnswers = { ...answers, [currentQ]: currentInput };
        setAnswers(newAnswers);
        setCurrentInput("");

        if (step < QUESTIONS.length - 1) {
            setStep(step + 1);
        } else {
            await executeDiagnostic(newAnswers);
        }
    };

    const executeDiagnostic = async (finalAnswers) => {
        setStatus("analyzing");
        setTerminalStep(0);
        
        try {
            const res = await fetch('/api/linkedin-headline', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers: finalAnswers })
            });
            const data = await res.json();
            setTimeout(() => {
                if (data.success) {
                    setResult(data.data);
                    setStatus("complete");
                } else {
                    alert("Generation failed. Please try again.");
                    setStatus("idle");
                }
            }, 1000);
        } catch (error) {
            console.error(error);
            setStatus("idle");
        }
    };

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const progress = ((step) / QUESTIONS.length) * 100;

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] relative selection:bg-[#0a66c2]/30 py-24 px-4 sm:px-6 overflow-hidden print:p-8">
            <style dangerouslySetInnerHTML={{__html: `@media print { @page { margin: 0; } body { background-color: #050505 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; } header, footer, nav { display: none !important; } }`}} />

            
            <div className="print:hidden fixed top-[10%] right-[10%] w-[600px] h-[600px] bg-[#0a66c2]/15 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
            <div className="print:hidden fixed bottom-[10%] left-[10%] w-[500px] h-[500px] bg-[var(--primary)]/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

            <div className="max-w-4xl mx-auto relative z-10 print:max-w-none">
                <Link href="/labs" className="print:hidden inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 text-[10px] font-bold uppercase tracking-widest transition-colors mb-10 group" style={fontLabel}>
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Labs
                </Link>

                <div className="rounded-[2.5rem] bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/[0.06] overflow-hidden shadow-2xl print:bg-transparent print:border-none">
                    
                    <div className="print:hidden p-8 md:px-12 md:py-10 border-b border-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-[#0a66c2]/30 bg-[#0a66c2]/10 text-[#0a66c2] text-[9px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                                <Linkedin size={12} /> Branding Utility
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight" style={fontHeadline}>
                                LinkedIn Headline Generator
                            </h1>
                        </div>
                        {status === "idle" && (
                            <div className="w-full md:w-48 text-right">
                                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-3" style={fontLabel}>Parameter {step + 1} of {QUESTIONS.length}</div>
                                <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-[#0a66c2] to-[var(--primary)] transition-all duration-700" style={{ width: `${progress}%` }} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
                        
                        
                        {status === "idle" && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-2xl mx-auto">
                                <h2 className="text-2xl md:text-3xl font-medium text-white mb-10 leading-tight" style={fontHeadline}>
                                    {QUESTIONS[step].label}
                                </h2>
                                <div className="relative group">
                                    <textarea 
                                        ref={inputRef}
                                        className="w-full bg-white/[0.02] border-2 border-white/[0.05] rounded-2xl p-6 text-zinc-100 text-lg md:text-xl focus:outline-none focus:border-[#0a66c2]/50 transition-all resize-none shadow-inner"
                                        rows={3}
                                        placeholder="Type your answer here..."
                                        value={currentInput}
                                        onChange={(e) => setCurrentInput(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleNext(); } }}
                                    />
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button onClick={handleNext} disabled={!currentInput.trim()} className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-[0.15em] hover:bg-zinc-200 disabled:opacity-30 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]" style={fontLabel}>
                                        {step === QUESTIONS.length - 1 ? "Generate Headlines" : "Next"} <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                        
                        {status === "analyzing" && (
                            <div className="flex flex-col items-center justify-center py-12 max-w-lg mx-auto w-full animate-in fade-in">
                                <UserCircle size={40} className="text-[#0a66c2] animate-pulse mb-8" />
                                <div className="w-full bg-[#050505] border border-white/[0.05] rounded-xl p-6 font-mono text-xs sm:text-sm shadow-2xl relative">
                                    <div className="space-y-3">
                                        {TERMINAL_STEPS.map((text, idx) => (
                                            <div key={idx} style={{ display: idx <= terminalStep + 1 ? 'flex' : 'none' }} className={`items-center gap-3 transition-all duration-300 ${idx <= terminalStep ? 'opacity-100' : 'opacity-0'}`}>
                                                <span className="text-[#0a66c2]">{'>'}</span>
                                                <span className={idx === terminalStep ? 'text-white animate-pulse' : 'text-zinc-500'}>{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        
                        {status === "complete" && result && (
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 w-full">
                                
                                <div className="flex items-center gap-3 mb-8">
                                    <Terminal size={18} className="text-[#0a66c2]"/>
                                    <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em]" style={fontLabel}>
                                        Search-Optimized Profiles
                                    </h3>
                                </div>

                                
                                <div className="space-y-6 mb-16">
                                    {result.headlines.map((item, i) => (
                                        <div key={i} className="group relative p-6 md:p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors overflow-hidden">
                                            
                                            
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0a66c2]" style={fontLabel}>
                                                    {item.framework}
                                                </span>
                                                <span className="text-[10px] font-mono text-zinc-500">
                                                    {item.character_count}/220
                                                </span>
                                            </div>

                                            
                                            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 pr-12 leading-snug" style={fontHeadline}>
                                                {item.text}
                                            </h3>

                                            
                                            <button 
                                                onClick={() => handleCopy(item.text, i)}
                                                className={`absolute right-6 top-1/2 -translate-y-1/2 md:flex hidden items-center justify-center w-12 h-12 rounded-xl transition-all ${
                                                    copiedIndex === i ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/[0.05] text-zinc-400 border border-white/[0.1] hover:bg-white/[0.1] hover:text-white'
                                                }`}
                                                title="Copy to clipboard"
                                            >
                                                {copiedIndex === i ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                                            </button>

                                            
                                            <button 
                                                onClick={() => handleCopy(item.text, i)}
                                                className={`md:hidden flex items-center justify-center gap-2 w-full py-3 mb-6 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${
                                                    copiedIndex === i ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/[0.05] text-zinc-300 border border-white/[0.1]'
                                                }`}
                                            >
                                                {copiedIndex === i ? <><CheckCircle2 size={16} /> Copied</> : <><Copy size={16} /> Copy Headline</>}
                                            </button>

                                            
                                            <p className="text-sm text-zinc-400 bg-[#050505] p-4 rounded-xl border border-white/[0.04]" style={fontBody}>
                                                <strong className="text-zinc-300">Why it works:</strong> {item.why_it_works}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                
                                <div className="p-8 md:p-10 rounded-[2rem] bg-gradient-to-br from-[#0a66c2]/10 to-[#050505] border border-[#0a66c2]/30 shadow-[0_10px_40px_-10px_rgba(10,102,194,0.2)] text-center relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#0a66c2]/20 rounded-full blur-[80px] pointer-events-none" />
                                    
                                    <div className="relative z-10 max-w-2xl mx-auto">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-white/[0.05] border border-white/[0.1] text-zinc-300 text-[10px] font-bold uppercase tracking-widest" style={fontLabel}>
                                            <Zap size={12} className="text-[#0a66c2]"/> Open Source Tool
                                        </div>
                                        <h4 className="text-2xl md:text-3xl font-extrabold text-white mb-4" style={fontHeadline}>
                                            Want a viral tool like this for your brand?
                                        </h4>
                                        <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-8" style={fontBody}>
                                            Free tools are the highest-converting lead magnets on the internet. Mr² Labs engineers and deploys custom micro-SaaS and AI utilities like this one in 48 hours.
                                        </p>
                                        
                                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                            <a href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/mohrashard/30min"} target="_blank" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0a66c2] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#004182] transition-all shadow-[0_0_20px_rgba(10,102,194,0.4)]" style={fontLabel}>
                                                Build Your Tool
                                            </a>
                                            <Link href="/cost-to-build" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white/[0.1] transition-all" style={fontLabel}>
                                                Estimate Cost
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
