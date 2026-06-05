"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Terminal, ArrowLeft, Activity, ChevronRight, CheckCircle2, Zap, Lightbulb, Mail, Target, ShieldAlert, Cpu, Download } from 'lucide-react';

// ── Shared font tokens ──────────────────────────────────────
const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

const QUESTIONS = [
    { id: "problem", label: "In one clear sentence, what is the exact problem you are solving?" },
    { id: "solution", label: "How does your proposed software/product actually solve this?" },
    { id: "customer", label: "Who is your exact target customer, and how will you monetize them?" }
];

const TERMINAL_STEPS = [
    "Initializing market analysis protocols...",
    "Cross-referencing TAM/SAM market data...",
    "Evaluating technical rendering feasibility...",
    "Simulating competitive threats...",
    "Compiling final VC-grade viability score..."
];

export default function IdeaValidator() {
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
            }, 800);
            return () => clearInterval(interval);
        }
    }, [status]);

    const handleSendReport = async (e) => {
        e.preventDefault();
        if (!email.trim() || !email.includes("@")) return;
        setIsSending(true);
        try {
            await fetch('/api/idea-validator-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, valResult: result, answers })
            });
        } catch (error) {
            console.error(error);
        }
        setIsSending(false);
        setEmailSent(true);
    };

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
            const res = await fetch('/api/idea-validator', {
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
                    alert("Validation failed.");
                    setStatus("idle");
                }
            }, 2000);
        } catch (error) {
            console.error(error);
            setStatus("idle");
        }
    };

    const progress = ((step) / QUESTIONS.length) * 100;

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] relative selection:bg-[var(--primary)]/30 py-24 px-4 sm:px-6 overflow-hidden print:p-8 print:bg-[#050505]">
            <style dangerouslySetInnerHTML={{__html: `
                @media print { 
                    @page { margin: 0; size: auto; } 
                    body { 
                        background-color: #050505 !important; 
                        -webkit-print-color-adjust: exact !important; 
                        print-color-adjust: exact !important;
                    } 
                    header, footer, nav { display: none !important; } 
                    ::-webkit-scrollbar { display: none; }
                }
            `}} />

            <div className="print:hidden fixed top-[10%] right-[10%] w-[600px] h-[600px] bg-[var(--primary)]/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
            <div className="print:hidden fixed bottom-[10%] left-[10%] w-[500px] h-[500px] bg-[var(--accent)]/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
            <div className="print:hidden fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

            <div className="max-w-4xl mx-auto relative z-10 print:max-w-none">
                <Link href="/labs" className="print:hidden inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 text-[10px] font-bold uppercase tracking-widest transition-colors mb-10 group" style={fontLabel}>
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Labs
                </Link>

                <div className="rounded-[2.5rem] bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/[0.06] overflow-hidden shadow-2xl print:bg-transparent print:border-none">
                    
                    <div className="print:hidden p-8 md:px-12 md:py-10 border-b border-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-[80px] pointer-events-none" />
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 text-[var(--primary)] text-[9px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                                <Lightbulb size={12}/> Concept Analysis
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight" style={fontHeadline}>
                                Startup Idea Validator
                            </h1>
                        </div>
                        {status === "idle" && (
                            <div className="w-full md:w-48 text-right">
                                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-3" style={fontLabel}>Parameter {step + 1} of {QUESTIONS.length}</div>
                                <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-all duration-700" style={{ width: `${progress}%` }} />
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
                                        className="w-full bg-white/[0.02] border-2 border-white/[0.05] rounded-2xl p-6 text-zinc-100 text-lg md:text-xl focus:outline-none focus:border-[var(--primary)]/50 focus:bg-white/[0.04] transition-all resize-none shadow-inner"
                                        rows={3}
                                        placeholder="Type your answer here..."
                                        value={currentInput}
                                        onChange={(e) => setCurrentInput(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleNext(); } }}
                                    />
                                    <div className="absolute bottom-4 right-4 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:flex items-center gap-2 text-zinc-500 text-[10px] font-bold tracking-widest uppercase" style={fontLabel}>
                                        Press <kbd className="px-2 py-1 rounded bg-white/10 text-zinc-300 border border-white/20">Enter ↵</kbd>
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button onClick={handleNext} disabled={!currentInput.trim()} className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-[0.15em] hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:hover:scale-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]" style={fontLabel}>
                                        {step === QUESTIONS.length - 1 ? "Analyze Viability" : "Next Parameter"} <ChevronRight size={16}/>
                                    </button>
                                </div>
                            </div>
                        )}

                        {status === "analyzing" && (
                            <div className="flex flex-col items-center justify-center py-12 max-w-lg mx-auto w-full animate-in fade-in">
                                <div className="relative w-24 h-24 mb-10 flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-[var(--primary)] animate-spin" style={{ animationDuration: '3s' }} />
                                    <div className="absolute inset-2 rounded-full border-r-2 border-b-2 border-[var(--accent)] animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
                                    <Lightbulb size={32} className="text-white animate-pulse" />
                                </div>
                                <div className="w-full bg-[#050505] border border-white/[0.05] rounded-xl p-6 font-mono text-xs sm:text-sm shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--primary)]/50 to-transparent" />
                                    <div className="space-y-3">
                                        {TERMINAL_STEPS.map((text, idx) => (
                                            <div key={idx} style={{ display: idx <= terminalStep + 1 ? 'flex' : 'none' }} className={`items-center gap-3 transition-all duration-300 ${idx <= terminalStep ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                                                <span className="text-[var(--primary)] font-bold">{'>'}</span>
                                                <span className={idx === terminalStep ? 'text-white animate-pulse' : 'text-zinc-500'}>{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {status === "complete" && result && (
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 w-full">
                                
                                {/* Print Only Document Header */}
                                <div className="hidden print:block mb-10 pb-6 border-b border-white/[0.1]">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <h1 className="text-4xl font-black text-white uppercase tracking-tight" style={fontHeadline}>Startup Viability Report</h1>
                                            <p className="text-zinc-400 text-sm mt-2" style={fontBody}>Confidential VC Diagnostic</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-white font-black text-2xl" style={fontHeadline}>Mr² Labs</div>
                                            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1" style={fontLabel}>{new Date().toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-center gap-10 mb-12 print:mb-6 p-10 print:p-6 rounded-[2rem] bg-[var(--primary)]/5 border border-[var(--primary)]/20 relative overflow-hidden print:border-white/[0.1] print:bg-transparent">
                                    <div className="relative w-36 h-36 print:w-28 print:h-28 flex-shrink-0 flex items-center justify-center">
                                        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/[0.05]" />
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" className="text-[var(--primary)] transition-all duration-1000 ease-out" 
                                                strokeDasharray="283" strokeDashoffset={283 - (283 * result.score) / 100} strokeLinecap="round" 
                                            />
                                        </svg>
                                        <div className="flex flex-col items-center">
                                            <span className="text-4xl print:text-3xl font-black text-white tabular-nums">{result.score}</span>
                                            <span className="text-[9px] text-[var(--primary)] font-bold uppercase tracking-widest mt-1" style={fontLabel}>/ 100</span>
                                        </div>
                                    </div>
                                    <div className="text-center md:text-left z-10">
                                        <div className="inline-flex items-center gap-2 mb-4 print:mb-2">
                                            <Terminal size={16} className="text-[var(--primary)]"/>
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest" style={fontLabel}>Architectural Verdict</span>
                                        </div>
                                        <p className="text-lg md:text-xl print:text-base text-zinc-100 leading-snug font-medium" style={fontHeadline}>{result.verdict}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-4 mb-16 print:mb-6">
                                    {result.dimensions.map((dim, i) => (
                                        <div key={i} className="p-6 print:p-4 rounded-xl bg-[#050505] border border-white/[0.04] print:border-white/[0.1] print:break-inside-avoid">
                                            <div className="flex items-center justify-between mb-3 print:mb-2">
                                                <h4 className="text-zinc-100 font-bold text-sm uppercase tracking-widest" style={fontLabel}>{dim.name}</h4>
                                                <span className={`text-xs font-bold ${dim.score >= 80 ? 'text-emerald-400' : dim.score >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>{dim.score}/100</span>
                                            </div>
                                            <p className="text-zinc-400 text-sm print:text-xs leading-relaxed" style={fontBody}>{dim.feedback}</p>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="print:hidden p-8 md:p-10 rounded-[2rem] bg-[#050505] border border-[var(--primary)]/20 shadow-[0_10px_40px_-10px_rgba(0,102,255,0.15)] relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    
                                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
                                        <div className="flex-1 text-center lg:text-left">
                                            <h4 className="text-2xl font-bold text-white mb-3 tracking-tight" style={fontHeadline}>Idea Validated. Let's Build.</h4>
                                            <p className="text-zinc-400 text-sm max-w-md mx-auto lg:mx-0 leading-relaxed" style={fontBody}>You have the concept. We have the infrastructure. Enter your email to download your validation report and scope your MVP build.</p>
                                        </div>
                                        
                                        <div className="w-full lg:w-[420px]">
                                            {emailSent ? (
                                                <div className="flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-500">
                                                    <div className="flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] mb-1">
                                                        <CheckCircle2 size={18} />
                                                        <span className="text-[11px] font-bold tracking-widest uppercase" style={fontLabel}>Email Confirmed</span>
                                                    </div>
                                                    <button onClick={() => window.print()} className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all text-center w-full shadow-[0_5px_20px_rgba(255,255,255,0.15)]" style={fontLabel}>
                                                        <Download size={14}/> Download Report
                                                    </button>
                                                    <a href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/mohrashard/30min"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[var(--primary)] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#0055d4] transition-all shadow-[0_5px_20px_rgba(0,102,255,0.3)] text-center w-full" style={fontLabel}>
                                                        Scope Your MVP
                                                    </a>
                                                </div>
                                            ) : (
                                                <form onSubmit={handleSendReport} className="relative flex flex-col gap-4">
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                                            <Mail size={18} className="text-zinc-500" />
                                                        </div>
                                                        <input 
                                                            type="email" 
                                                            placeholder="founder@startup.com" 
                                                            required 
                                                            value={email} 
                                                            onChange={(e) => setEmail(e.target.value)} 
                                                            className="w-full pl-14 pr-5 py-4 bg-[#0A0A0A] border border-white/[0.1] rounded-2xl text-white text-base focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all placeholder:text-zinc-600" 
                                                        />
                                                    </div>
                                                    <button 
                                                        type="submit" 
                                                        disabled={isSending || !email.trim()} 
                                                        className="w-full relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#0055d4] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 transition-all shadow-[0_5px_20px_rgba(0,102,255,0.3)]" 
                                                        style={fontLabel}
                                                    >
                                                        {isSending ? (
                                                            <><Activity size={18} className="animate-spin"/><span>Processing...</span></>
                                                        ) : (
                                                            <><Zap size={18}/><span>Unlock Final Report</span></>
                                                        )}
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
