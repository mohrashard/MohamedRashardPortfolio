"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Terminal, ArrowLeft, Activity, ChevronRight, CheckCircle2, Zap, DollarSign, CalendarDays, TrendingDown, Mail, Download, ShieldCheck } from 'lucide-react';

// ── Shared font tokens ──────────────────────────────────────
const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

const QUESTIONS = [
    { id: "cash", type: "number", label: "What is your current total cash in bank? ($)" },
    { id: "burn", type: "number", label: "What is your total monthly burn rate? ($)" },
    { id: "agency", type: "number", label: "How much of that monthly burn goes to agency retainers or slow contractors? ($)" }
];

const TERMINAL_STEPS = [
    "Analyzing capital reserves...",
    "Calculating standard burn velocity...",
    "Isolating agency overhead deficit...",
    "Projecting optimized survival timeline...",
    "Compiling capital efficiency strategy..."
];

export default function RunwayCalculator() {
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
            }, 700);
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
            const res = await fetch('/api/runway-calculator', {
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
                    alert("Diagnostic failed.");
                    setStatus("idle");
                }
            }, 1500);
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
            await fetch('/api/runway-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, runwayResult: result })
            });
        } catch (error) {
            console.error(error);
        }
        setIsSending(false);
        setEmailSent(true);
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

            {/* Ambient Background */}
            <div className="print:hidden fixed top-[10%] right-[10%] w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
            <div className="print:hidden fixed bottom-[10%] left-[10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
            <div className="print:hidden fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

            <div className="max-w-4xl mx-auto relative z-10 print:max-w-none">
                <Link href="/labs" className="print:hidden inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 text-[10px] font-bold uppercase tracking-widest transition-colors mb-10 group" style={fontLabel}>
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Labs
                </Link>

                <div className="rounded-[2.5rem] bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/[0.06] overflow-hidden shadow-2xl print:bg-transparent print:border-none">
                    
                    <div className="print:hidden p-8 md:px-12 md:py-10 border-b border-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-[80px] pointer-events-none" />
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 text-[var(--primary)] text-[9px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                                <TrendingDown size={12} /> Capital Diagnostic
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight" style={fontHeadline}>
                                Startup Runway Calculator
                            </h1>
                        </div>
                        {status === "idle" && (
                            <div className="w-full md:w-48 text-right">
                                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-3" style={fontLabel}>Parameter {step + 1} of {QUESTIONS.length}</div>
                                <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-[var(--primary)] to-emerald-500 transition-all duration-700" style={{ width: `${progress}%` }} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
                        
                        {/* STATE 1: Questions */}
                        {status === "idle" && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-2xl mx-auto">
                                <h2 className="text-2xl md:text-3xl font-medium text-white mb-10 leading-tight" style={fontHeadline}>
                                    {QUESTIONS[step].label}
                                </h2>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                        <DollarSign size={24} className="text-zinc-500" />
                                    </div>
                                    <input 
                                        type="number"
                                        ref={inputRef}
                                        className="w-full bg-white/[0.02] border-2 border-white/[0.05] rounded-2xl pl-14 pr-6 py-6 text-zinc-100 text-xl focus:outline-none focus:border-[var(--primary)]/50 transition-all shadow-inner [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        placeholder="0"
                                        value={currentInput}
                                        onChange={(e) => setCurrentInput(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleNext(); } }}
                                    />
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button onClick={handleNext} disabled={!currentInput.trim()} className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-[0.15em] hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:hover:scale-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]" style={fontLabel}>
                                        {step === QUESTIONS.length - 1 ? "Calculate Runway" : "Next Parameter"} <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STATE 2: Analyzing */}
                        {status === "analyzing" && (
                            <div className="flex flex-col items-center justify-center py-12 max-w-lg mx-auto w-full animate-in fade-in">
                                <div className="relative w-24 h-24 mb-10 flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-[var(--primary)] animate-spin" style={{ animationDuration: '3s' }} />
                                    <div className="absolute inset-2 rounded-full border-r-2 border-b-2 border-emerald-500 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
                                    <Activity size={32} className="text-white animate-pulse" />
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

                        {/* STATE 3: Complete Blueprint */}
                        {status === "complete" && result && (
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 w-full">
                                
                                {/* Print Only Document Header */}
                                <div className="hidden print:block mb-8 pb-4 border-b border-white/[0.1]">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <h1 className="text-3xl font-black text-white uppercase tracking-tight" style={fontHeadline}>Runway & Burn Report</h1>
                                            <p className="text-zinc-400 text-sm mt-2" style={fontBody}>Confidential Financial Diagnostic</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-white font-black text-xl" style={fontHeadline}>Mr² Labs</div>
                                            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1" style={fontLabel}>{new Date().toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-6 print:gap-4 mb-10 print:mb-6">
                                    {/* Standard Runway */}
                                    <div className="p-6 print:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col items-center justify-center text-center print:break-inside-avoid">
                                        <CalendarDays size={20} className="text-zinc-500 mb-3 print:mb-2" />
                                        <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-2 print:mb-1" style={fontLabel}>Current Runway</div>
                                        <h3 className="text-3xl print:text-2xl font-black text-zinc-100 tabular-nums" style={fontHeadline}>{result.metrics.standardRunwayMonths} <span className="text-lg text-zinc-500">mo</span></h3>
                                    </div>

                                    {/* Optimized Runway */}
                                    <div className="p-6 print:p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center justify-center text-center relative overflow-hidden print:break-inside-avoid shadow-[0_0_30px_rgba(16,185,129,0.15)] print:shadow-none print:border-emerald-500/50">
                                        <div className="print:hidden absolute top-0 right-0 w-20 h-20 bg-emerald-500/20 rounded-full blur-2xl" />
                                        <ShieldCheck size={20} className="text-emerald-400 mb-3 print:mb-2 relative z-10" />
                                        <div className="text-[9px] font-bold uppercase tracking-widest text-emerald-300 mb-2 print:mb-1 relative z-10" style={fontLabel}>Runway w/o Agency</div>
                                        <h3 className="text-3xl print:text-2xl font-black text-white tabular-nums relative z-10" style={fontHeadline}>{result.metrics.optimizedRunwayMonths} <span className="text-lg text-emerald-500">mo</span></h3>
                                    </div>

                                    {/* Capital Saved */}
                                    <div className="p-6 print:p-4 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/30 flex flex-col items-center justify-center text-center print:break-inside-avoid shadow-[0_0_30px_rgba(0,102,255,0.15)] print:shadow-none print:border-[var(--primary)]/50">
                                        <DollarSign size={20} className="text-[var(--primary)] mb-3 print:mb-2" />
                                        <div className="text-[9px] font-bold uppercase tracking-widest text-[var(--accent)] mb-2 print:mb-1" style={fontLabel}>Annual Capital Saved</div>
                                        <h3 className="text-3xl print:text-2xl font-black text-white tabular-nums" style={fontHeadline}>${Number(result.metrics.capitalSavedAnnually).toLocaleString()}</h3>
                                    </div>
                                </div>

                                {/* Architecture Proposal */}
                                <div className="p-8 print:p-6 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent print:from-transparent border border-white/[0.05] print:border-white/[0.1] mb-12 print:mb-6">
                                    <div className="flex items-center gap-3 mb-4 print:mb-2">
                                        <Terminal size={18} className="text-[var(--primary)]" />
                                        <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-[0.2em]" style={fontLabel}>
                                            Capital Efficiency Strategy
                                        </h3>
                                    </div>
                                    <p className="text-zinc-300 print:text-sm leading-relaxed md:text-lg mb-8 print:mb-4" style={fontBody}>{result.strategy.strategic_verdict}</p>
                                    
                                    <div className="space-y-4 print:space-y-2">
                                        {result.strategy.execution_plan.map((plan, i) => (
                                            <div key={i} className="flex gap-4 p-4 print:p-3 rounded-xl bg-[#050505] border border-white/[0.04] print:border-white/[0.1]">
                                                <div className="flex-shrink-0 mt-0.5"><CheckCircle2 size={16} className="text-emerald-500" /></div>
                                                <div>
                                                    <h4 className="text-zinc-100 font-bold text-sm print:text-xs mb-1" style={fontHeadline}>{plan.phase}</h4>
                                                    <p className="text-zinc-400 text-sm print:text-xs leading-relaxed" style={fontBody}>{plan.action}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Lead Capture Footer */}
                                <div className="print:hidden p-8 md:p-10 rounded-[2rem] bg-[#050505] border border-[var(--primary)]/20 shadow-2xl relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-50 pointer-events-none" />
                                    
                                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
                                        <div className="flex-1 text-center lg:text-left">
                                            <h4 className="text-2xl font-bold text-white mb-3" style={fontHeadline}>Extend your runway today.</h4>
                                            <p className="text-zinc-400 text-sm max-w-md mx-auto lg:mx-0 leading-relaxed" style={fontBody}>Stop bleeding capital on slow development retainers. Enter your email to download this strategy and book a fixed-scope execution call.</p>
                                        </div>
                                        
                                        <div className="w-full lg:w-[420px]">
                                            {emailSent ? (
                                                <div className="flex flex-col gap-3 animate-in fade-in">
                                                    <div className="flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] mb-1">
                                                        <CheckCircle2 size={18} />
                                                        <span className="text-[11px] font-bold tracking-widest uppercase" style={fontLabel}>Email Confirmed</span>
                                                    </div>
                                                    <button onClick={() => window.print()} className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all text-center w-full shadow-[0_5px_20px_rgba(255,255,255,0.15)]" style={fontLabel}>
                                                        <Download size={14} /> Download Strategy Report
                                                    </button>
                                                    <a href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/mohrashard/30min"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[var(--primary)] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#0055d4] transition-all shadow-[0_5px_20px_rgba(0,102,255,0.3)] text-center w-full" style={fontLabel}>
                                                        Book Deployment Call
                                                    </a>
                                                </div>
                                            ) : (
                                                <form onSubmit={handleSendBlueprint} className="relative flex flex-col gap-4">
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
                                                            <><Activity size={18} className="animate-spin" /><span>Processing...</span></>
                                                        ) : (
                                                            <><Zap size={18} /><span>Unlock Final Strategy</span></>
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
