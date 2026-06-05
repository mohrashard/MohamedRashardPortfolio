"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Terminal, ArrowLeft, Activity, ChevronRight, CheckCircle2, Zap, Mail, Users, MessageSquare, Download, Copy, Check } from 'lucide-react';

// ── Shared font tokens ──────────────────────────────────────
const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

const QUESTIONS = [
    { id: "product", label: "What is your product or service? (e.g., A SaaS tool that automates accounting)" },
    { id: "audience", label: "Who is your exact target customer? (e.g., CFOs at mid-sized logistics companies)" },
    { id: "pain", label: "What is the primary pain point you solve for them?" },
    { id: "cta", label: "What is your call to action? (e.g., Book a 15-min discovery call)" }
];

const TERMINAL_STEPS = [
    "Analyzing target demographic psychology...",
    "Parsing value proposition & pain points...",
    "Drafting direct approach variant...",
    "Structuring story-based narrative variant...",
    "Formulating question-led hook variant...",
    "Finalizing high-converting outreach campaign..."
];

export default function ColdEmailGenerator() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [currentInput, setCurrentInput] = useState("");
    const [status, setStatus] = useState("idle"); 
    const [result, setResult] = useState(null);
    const [email, setEmail] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
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
            const res = await fetch('/api/cold-email', {
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

    const handleSendBlueprint = async (e) => {
        e.preventDefault();
        if (!email.trim() || !email.includes("@")) return;
        setIsSending(true);
        try {
            await fetch('/api/cold-email-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, emailResult: result, answers })
            });
        } catch (error) {
            console.error(error);
        }
        setIsSending(false);
        setEmailSent(true);
    };

    const handleCopy = (subject, body, index) => {
        const textToCopy = `Subject: ${subject}\n\n${body}`;
        navigator.clipboard.writeText(textToCopy);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
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
            <div className="print:hidden fixed bottom-[10%] left-[10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

            <div className="max-w-4xl mx-auto relative z-10 print:max-w-none">
                <Link href="/labs" className="print:hidden inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 text-[10px] font-bold uppercase tracking-widest transition-colors mb-10 group" style={fontLabel}>
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Labs
                </Link>

                <div className="rounded-[2.5rem] bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/[0.06] overflow-hidden shadow-2xl print:bg-transparent print:border-none">
                    
                    <div className="print:hidden p-8 md:px-12 md:py-10 border-b border-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-[80px] pointer-events-none" />
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 text-[var(--primary)] text-[9px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                                <Users size={12}/> Sales Automation
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight" style={fontHeadline}>
                                Cold Email Generator
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
                        
                        {status === "idle" && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-2xl mx-auto">
                                <h2 className="text-2xl md:text-3xl font-medium text-white mb-10 leading-tight" style={fontHeadline}>
                                    {QUESTIONS[step].label}
                                </h2>
                                <div className="relative group">
                                    <textarea 
                                        ref={inputRef}
                                        className="w-full bg-white/[0.02] border-2 border-white/[0.05] rounded-2xl p-6 text-zinc-100 text-lg md:text-xl focus:outline-none focus:border-[var(--primary)]/50 transition-all resize-none shadow-inner"
                                        rows={3}
                                        placeholder="Type your answer here..."
                                        value={currentInput}
                                        onChange={(e) => setCurrentInput(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleNext(); } }}
                                    />
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button onClick={handleNext} disabled={!currentInput.trim()} className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-[0.15em] hover:bg-zinc-200 disabled:opacity-30 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]" style={fontLabel}>
                                        {step === QUESTIONS.length - 1 ? "Generate Sequences" : "Next Parameter"} <ChevronRight size={16}/>
                                    </button>
                                </div>
                            </div>
                        )}

                        {status === "analyzing" && (
                            <div className="flex flex-col items-center justify-center py-12 max-w-lg mx-auto w-full animate-in fade-in">
                                <Mail size={40} className="text-[var(--primary)] animate-pulse mb-8"/>
                                <div className="w-full bg-[#050505] border border-white/[0.05] rounded-xl p-6 font-mono text-xs sm:text-sm shadow-2xl relative">
                                    <div className="space-y-3">
                                        {TERMINAL_STEPS.map((text, idx) => (
                                            <div key={idx} style={{ display: idx <= terminalStep + 1 ? 'flex' : 'none' }} className={`items-center gap-3 transition-all duration-300 ${idx <= terminalStep ? 'opacity-100' : 'opacity-0'}`}>
                                                <span className="text-[var(--primary)]">{'>'}</span>
                                                <span className={idx === terminalStep ? 'text-white animate-pulse' : 'text-zinc-500'}>{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {status === "complete" && result && (
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 w-full">
                                
                                <div className="hidden print:block mb-8 pb-4 border-b border-white/[0.1]">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <h1 className="text-3xl font-black text-white uppercase tracking-tight" style={fontHeadline}>Outreach Blueprint</h1>
                                            <p className="text-zinc-400 text-sm mt-2" style={fontBody}>Confidential Sales Sequences by Mr² Labs</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-white font-black text-xl" style={fontHeadline}>Mr² Labs</div>
                                            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1" style={fontLabel}>{new Date().toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mb-8 print:mb-4">
                                    <Terminal size={18} className="text-[var(--primary)]"/>
                                    <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em]" style={fontLabel}>
                                        Generated Frameworks
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 gap-8 mb-16 print:gap-4 print:mb-6">
                                    {result.variants.map((variant, i) => (
                                        <div key={i} className="rounded-[2rem] print:rounded-xl bg-white/[0.02] border border-white/[0.05] overflow-hidden print:break-inside-avoid print:border-white/[0.1]">
                                            <div className="px-6 py-4 print:px-5 print:py-2.5 bg-white/[0.02] border-b border-white/[0.05] print:border-white/[0.1] flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <MessageSquare size={14} className="text-[var(--primary)] print:text-[var(--primary)]"/>
                                                    <span className="text-[10px] font-bold text-[var(--primary)] print:text-[var(--primary)] uppercase tracking-widest" style={fontLabel}>{variant.strategy}</span>
                                                </div>
                                                <button 
                                                    onClick={() => handleCopy(variant.subject, variant.body, i)}
                                                    className="print:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.06] text-zinc-400 hover:text-white transition-colors"
                                                >
                                                    {copiedIndex === i ? <Check size={14} className="text-emerald-500"/> : <Copy size={14}/>}
                                                    <span className="text-[10px] font-bold uppercase tracking-widest" style={fontLabel}>{copiedIndex === i ? 'Copied' : 'Copy'}</span>
                                                </button>
                                            </div>
                                            <div className="p-6 md:p-8 print:p-5">
                                                <div className="mb-6 print:mb-3">
                                                    <span className="text-zinc-500 text-sm print:text-[11px] font-medium mr-2">Subject:</span>
                                                    <span className="text-white font-bold text-lg print:text-sm">{variant.subject}</span>
                                                </div>
                                                <div className="text-zinc-300 print:text-zinc-200 leading-relaxed print:leading-normal whitespace-pre-wrap font-medium print:text-[11px]" style={fontBody}>
                                                    {variant.body}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Lead Capture Footer */}
                                <div className="print:hidden p-8 md:p-10 rounded-[2rem] bg-[#050505] border border-[var(--primary)]/20 shadow-[0_10px_40px_-10px_rgba(0,102,255,0.15)] relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-50 pointer-events-none" />
                                    
                                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
                                        <div className="flex-1 text-center lg:text-left">
                                            <h4 className="text-2xl font-bold text-white mb-3" style={fontHeadline}>Ready to launch your campaign?</h4>
                                            <p className="text-zinc-400 text-sm max-w-md mx-auto lg:mx-0 leading-relaxed" style={fontBody}>These emails will get replies. Do you have the landing pages and infrastructure ready to catch the traffic? Let's build your pipeline.</p>
                                        </div>
                                        
                                        <div className="w-full lg:w-[420px]">
                                            {emailSent ? (
                                                <div className="flex flex-col gap-3 animate-in fade-in">
                                                    <div className="flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] mb-1">
                                                        <CheckCircle2 size={18} />
                                                        <span className="text-[11px] font-bold tracking-widest uppercase" style={fontLabel}>Email Confirmed</span>
                                                    </div>
                                                    <button onClick={() => window.print()} className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all text-center w-full shadow-[0_5px_20px_rgba(255,255,255,0.15)]" style={fontLabel}>
                                                        <Download size={14}/> Download Templates
                                                    </button>
                                                    <a href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/mohrashard/30min"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[var(--primary)] text-black text-[10px] font-bold uppercase tracking-widest hover:bg-[#0055d4] transition-all shadow-[0_5px_20px_rgba(0,102,255,0.3)] text-center w-full" style={fontLabel}>
                                                        Book Infrastructure Call
                                                    </a>
                                                </div>
                                            ) : (
                                                <form onSubmit={handleSendBlueprint} className="relative flex flex-col gap-4">
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                                            <Mail size={18} className="text-zinc-500"/>
                                                        </div>
                                                        <input 
                                                            type="email" 
                                                            placeholder="founder@startup.com" 
                                                            required 
                                                            value={email} 
                                                            onChange={(e) => setEmail(e.target.value)} 
                                                            className="w-full pl-14 pr-5 py-4 bg-[#0A0A0A] border border-white/[0.1] rounded-xl text-white text-base focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all placeholder:text-zinc-600" 
                                                        />
                                                    </div>
                                                    <button 
                                                        type="submit" 
                                                        disabled={isSending || !email.trim()} 
                                                        className="w-full relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[var(--primary)] text-black text-xs font-bold uppercase tracking-widest hover:bg-[#0055d4] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 transition-all shadow-[0_5px_20px_rgba(0,102,255,0.3)]" 
                                                        style={fontLabel}
                                                    >
                                                        {isSending ? (
                                                            <><Activity size={18} className="animate-spin"/><span>Compiling...</span></>
                                                        ) : (
                                                            <><Zap size={18}/><span>Unlock Full Report</span></>
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
