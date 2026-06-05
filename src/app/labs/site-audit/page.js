"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Terminal, ArrowLeft, Activity, ChevronRight, CheckCircle2, Zap, Globe, Download, Mail, AlertTriangle, Code2 } from 'lucide-react';

// ── Shared font tokens ──────────────────────────────────────
const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

const QUESTIONS = [
    { id: "url", type: "url", label: "Enter your website URL to audit:", placeholder: "https://yourstartup.com" }
];

const TERMINAL_STEPS = [
    "Establishing secure server connection...",
    "Crawling initial DOM structure...",
    "Parsing <head> metadata parameters...",
    "Analyzing H1 semantic taxonomy...",
    "Computing technical SEO score...",
    "Generating architectural verdict..."
];

export default function SeoAudit() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [currentInput, setCurrentInput] = useState("");
    const [status, setStatus] = useState("idle"); 
    const [result, setResult] = useState(null);
    const [email, setEmail] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
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
            const res = await fetch('/api/site-audit', {
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
                    alert(data.error || "Diagnostic failed. Endpoint may be unreachable.");
                    setStatus("idle");
                }
            }, 1000);
        } catch (error) {
            console.error(error);
            setStatus("idle");
        }
    };

    const handleSendBlueprint = async (e) => {
        e.preventDefault();
        if (!email.trim() || !email.includes("@")) return;
        setIsSending(true);
        try {
            await fetch('/api/site-audit-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, testResult: result })
            });
        } catch (error) {
            console.error(error);
        }
        setIsSending(false);
        setEmailSent(true);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] relative selection:bg-[var(--primary)]/30 py-24 px-4 sm:px-6 overflow-hidden print:p-8">
            <style dangerouslySetInnerHTML={{__html: `@media print { @page { margin: 0; } body { background-color: #050505 !important; -webkit-print-color-adjust: exact; } header, footer, nav { display: none !important; } }`}} />

            {/* Ambient Background - Utilizing primary/accent tokens exclusively */}
            <div className="print:hidden fixed top-[10%] right-[10%] w-[600px] h-[600px] bg-[var(--accent)]/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
            <div className="print:hidden fixed bottom-[10%] left-[10%] w-[500px] h-[500px] bg-[var(--primary)]/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

            <div className="max-w-4xl mx-auto relative z-10 print:max-w-none">
                <Link href="/labs" className="print:hidden inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 text-[10px] font-bold uppercase tracking-widest transition-colors mb-10 group" style={fontLabel}>
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Labs
                </Link>

                <div className="rounded-[2.5rem] bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/[0.06] overflow-hidden shadow-2xl print:bg-transparent print:border-none">
                    
                    <div className="print:hidden p-8 md:px-12 md:py-10 border-b border-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-[80px] pointer-events-none" />
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 text-[var(--accent)] text-[9px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                                <Activity size={12} /> Technical SEO
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight" style={fontHeadline}>
                                SEO Architecture Audit
                            </h1>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center print:p-0">
                        
                        {/* STATE 1: Questions */}
                        {status === "idle" && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-2xl mx-auto">
                                <h2 className="text-xl md:text-2xl font-medium text-white mb-10 leading-tight" style={fontHeadline}>
                                    {QUESTIONS[step].label}
                                </h2>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                        <Globe size={24} className="text-zinc-500" />
                                    </div>
                                    <input 
                                        type={QUESTIONS[step].type}
                                        ref={inputRef}
                                        className="w-full bg-white/[0.02] border-2 border-white/[0.05] rounded-2xl py-6 pr-6 pl-14 text-zinc-100 text-lg md:text-xl focus:outline-none focus:border-[var(--accent)]/50 transition-all shadow-inner"
                                        placeholder={QUESTIONS[step].placeholder}
                                        value={currentInput}
                                        onChange={(e) => setCurrentInput(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleNext(); } }}
                                    />
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button onClick={handleNext} disabled={!currentInput.trim()} className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-[0.15em] hover:bg-zinc-200 disabled:opacity-30 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]" style={fontLabel}>
                                        Analyze Site <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STATE 2: Analyzing */}
                        {status === "analyzing" && (
                            <div className="flex flex-col items-center justify-center py-12 max-w-lg mx-auto w-full animate-in fade-in">
                                <Activity size={40} className="text-[var(--accent)] animate-pulse mb-8" />
                                <div className="w-full bg-[#050505] border border-white/[0.05] rounded-xl p-6 font-mono text-xs sm:text-sm shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent" />
                                    <div className="space-y-3">
                                        {TERMINAL_STEPS.map((text, idx) => (
                                            <div key={idx} style={{ display: idx <= terminalStep + 1 ? 'flex' : 'none' }} className={`items-center gap-3 transition-all duration-300 ${idx <= terminalStep ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                                                <span className="text-[var(--accent)]">{'>'}</span>
                                                <span className={idx === terminalStep ? 'text-white animate-pulse' : 'text-zinc-500'}>{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STATE 3: Complete Blueprint */}
                        {status === "complete" && result && (
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 w-full">
                                
                                <div className="hidden print:block mb-6 pb-4 border-b border-white/[0.1]">
                                    <h1 className="text-4xl print:text-3xl font-black text-white uppercase tracking-tight" style={fontHeadline}>SEO Audit Report</h1>
                                    <p className="text-zinc-400 text-sm print:text-xs mt-1" style={fontBody}>Target: {result.metrics.targetUrl}</p>
                                </div>

                                {/* Grade Header */}
                                <div className="flex flex-col md:flex-row items-center gap-8 mb-12 print:mb-4 p-8 rounded-[2rem] bg-gradient-to-r from-white/[0.03] to-transparent border border-white/[0.05] print:border-white/[0.1] print:p-5 print:rounded-xl">
                                    <div className={`w-28 h-28 print:w-20 print:h-20 flex-shrink-0 rounded-full border-4 print:border-2 flex items-center justify-center ${
                                        result.metrics.grade === 'A' || result.metrics.grade === 'B' ? 'border-emerald-500 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] print:shadow-none' : 
                                        result.metrics.grade === 'C' ? 'border-amber-500 text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)] print:shadow-none' : 
                                        'border-rose-500 text-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.3)] print:shadow-none'
                                    }`}>
                                        <span className="text-5xl print:text-3xl font-black tabular-nums" style={fontHeadline}>{result.metrics.grade}</span>
                                    </div>
                                    <div className="text-center md:text-left print:text-left">
                                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2" style={fontLabel}>SEO Health Score: {result.metrics.score}/100</div>
                                        <p className="text-zinc-200 text-sm md:text-base print:text-sm leading-relaxed font-medium" style={fontBody}>{result.architecture.verdict}</p>
                                    </div>
                                </div>

                                {/* Raw Data Grid */}
                                <div className="grid grid-cols-1 gap-4 mb-12 print:mb-4 print:gap-3">
                                    <div className="p-5 print:p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col md:flex-row md:items-start gap-4 print:gap-3 print:border-white/[0.1]">
                                        <Code2 size={20} className="text-[var(--accent)] flex-shrink-0 mt-1" />
                                        <div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2" style={fontLabel}>Title Tag ({result.metrics.title.length} chars)</div>
                                            <div className="text-base text-white font-medium" style={fontBody}>{result.metrics.title}</div>
                                        </div>
                                    </div>
                                    <div className="p-5 print:p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col md:flex-row md:items-start gap-4 print:gap-3 print:border-white/[0.1]">
                                        <Code2 size={20} className="text-[var(--accent)] flex-shrink-0 mt-1" />
                                        <div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2" style={fontLabel}>Meta Description ({result.metrics.description.length} chars)</div>
                                            <div className="text-sm text-zinc-300 leading-relaxed" style={fontBody}>{result.metrics.description}</div>
                                        </div>
                                    </div>
                                    <div className="p-5 print:p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col md:flex-row md:items-start gap-4 print:gap-3 print:border-white/[0.1]">
                                        <Code2 size={20} className="text-[var(--accent)] flex-shrink-0 mt-1" />
                                        <div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2" style={fontLabel}>Primary H1 Tag</div>
                                            <div className="text-base text-white font-medium" style={fontBody}>{result.metrics.h1}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recommendation */}
                                <div className="p-6 md:p-8 print:p-4 rounded-2xl bg-[var(--primary)]/5 border border-[var(--primary)]/20 mb-16 print:mb-4 print:break-inside-avoid">
                                    <div className="flex items-center gap-3 mb-4 print:mb-2">
                                        <Terminal size={16} className="text-[var(--primary)] print:w-3.5 print:h-3.5" />
                                        <h4 className="text-sm print:text-xs font-bold text-white uppercase tracking-[0.15em]" style={fontLabel}>Growth Recommendation</h4>
                                    </div>
                                    <p className="text-zinc-300 print:text-zinc-400 text-sm print:text-xs leading-relaxed" style={fontBody}>{result.architecture.recommendation}</p>
                                </div>

                                {/* Lead Capture Footer */}
                                <div className="print:hidden p-8 md:p-10 rounded-[2rem] bg-[#050505] border border-[var(--accent)]/20 shadow-[0_10px_40px_-10px_rgba(56,189,248,0.15)] relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    
                                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
                                        <div className="flex-1 text-center lg:text-left">
                                            <h4 className="text-2xl font-bold text-white mb-3" style={fontHeadline}>Fix your organic pipeline.</h4>
                                            <p className="text-zinc-400 text-sm max-w-md mx-auto lg:mx-0" style={fontBody}>Bad technical SEO bleeds revenue. Enter your email to download this report and book a strategy call to deploy a programmatic SEO architecture.</p>
                                        </div>
                                        
                                        <div className="w-full lg:w-[420px]">
                                            {emailSent ? (
                                                <div className="flex flex-col gap-3 animate-in fade-in">
                                                    <div className="flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] mb-1">
                                                        <CheckCircle2 size={18} />
                                                        <span className="text-[11px] font-bold tracking-widest uppercase" style={fontLabel}>Email Confirmed</span>
                                                    </div>
                                                    <button onClick={() => window.print()} className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all w-full" style={fontLabel}>
                                                        <Download size={14} /> Download Report
                                                    </button>
                                                    <a href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/mohrashard/30min"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[var(--primary)] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#0055d4] transition-all" style={fontLabel}>
                                                        Book SEO Review
                                                    </a>
                                                </div>
                                            ) : (
                                                <form onSubmit={handleSendBlueprint} className="flex flex-col gap-4">
                                                    <div className="relative">
                                                        <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" />
                                                        <input type="email" placeholder="founder@startup.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-14 pr-5 py-4 bg-[#0A0A0A] border border-white/[0.1] rounded-xl text-white focus:border-[var(--accent)] outline-none transition-all" />
                                                    </div>
                                                    <button type="submit" disabled={isSending || !email} className="w-full flex justify-center items-center gap-2 py-4 rounded-xl bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#0055d4] disabled:opacity-50 transition-all shadow-[0_5px_20px_rgba(0,102,255,0.3)]" style={fontLabel}>
                                                        {isSending ? <><Activity size={18} className="animate-spin" /> Compiling...</> : <><Zap size={18} /> Unlock Full Report</>}
                                                    </button>
                                                </form>
                                            )}
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
