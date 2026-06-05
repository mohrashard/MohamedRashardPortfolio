"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Terminal, ArrowLeft, Activity, ChevronRight, CheckCircle2, Zap, DollarSign, CreditCard, Code, Download, Mail } from 'lucide-react';

// ── Shared font tokens ──────────────────────────────────────
const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

const QUESTIONS = [
    { id: "name", label: "What is the name of your product?" },
    { id: "features", label: "List your core features (e.g., unlimited projects, AI generation, team seats)." },
    { id: "customer", label: "Who is your exact target customer? (e.g., Freelancers, Enterprise sales teams)" }
];

const TERMINAL_STEPS = [
    "Analyzing product value propositions...",
    "Cross-referencing B2B SaaS pricing models...",
    "Calculating optimal psychological price points...",
    "Segmenting feature limits by tier...",
    "Generating conversion-optimized copy...",
    "Compiling pricing architecture..."
];

export default function PricingGenerator() {
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
            const res = await fetch('/api/pricing-generator', {
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

    const handleSendReport = async (e) => {
        e.preventDefault();
        if (!email.trim() || !email.includes("@")) return;
        setIsSending(true);
        try {
            await fetch('/api/pricing-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, pricingResult: result, answers })
            });
        } catch (error) {
            console.error(error);
        }
        setIsSending(false);
        setEmailSent(true);
    };

    const handleDownloadHTML = () => {
        if (!result) return;
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SaaS Pricing Strategy</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#050505] text-white p-10 md:p-20 font-sans antialiased">
    <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-black tracking-tight mb-4">${result.page_headline}</h1>
            <p class="text-zinc-400 text-lg">${result.page_subheadline}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            ${result.tiers.map(tier => `
                <div class="p-8 rounded-3xl border ${tier.is_popular ? 'border-[#0066ff]/50 bg-[#0066ff]/10 relative' : 'border-white/10 bg-[#0A0A0A]'}">
                    ${tier.is_popular ? '<div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-[#0066ff] text-white text-[10px] font-bold tracking-widest uppercase rounded-full">Most Popular</div>' : ''}
                    <h3 class="text-lg font-bold mb-2">${tier.name}</h3>
                    <p class="text-sm text-zinc-400 mb-6 h-10">${tier.description}</p>
                    <div class="mb-8">
                        <span class="text-5xl font-black">${tier.price !== 'Custom' ? '$' : ''}${tier.price}</span>
                        <span class="text-zinc-500 font-medium">${tier.billing_cycle}</span>
                    </div>
                    <button class="w-full py-3 px-4 rounded-xl text-sm font-bold mb-8 transition-colors ${tier.is_popular ? 'bg-[#0066ff] text-white hover:bg-[#0055d4]' : 'bg-white/5 text-white hover:bg-white/10'}">${tier.cta_text}</button>
                    <div class="space-y-4">
                        ${tier.features.map(feat => `
                            <div class="flex items-start gap-3">
                                <span class="${tier.is_popular ? 'text-[#0066ff]' : 'text-zinc-500'}">✓</span>
                                <span class="text-sm text-zinc-300">${feat}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
</body>
</html>`;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pricing-strategy.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const progress = ((step) / QUESTIONS.length) * 100;

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] relative selection:bg-[var(--primary)]/30 py-24 px-4 sm:px-6 overflow-hidden print:p-8">
            <style dangerouslySetInnerHTML={{__html: `@media print { @page { margin: 0; } body { background-color: #050505 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; } header, footer, nav { display: none !important; } }`}} />

            
            <div className="print:hidden fixed top-[10%] right-[10%] w-[600px] h-[600px] bg-[var(--accent)]/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
            <div className="print:hidden fixed bottom-[10%] left-[10%] w-[500px] h-[500px] bg-[var(--primary)]/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

            <div className="max-w-6xl mx-auto relative z-10 print:max-w-none">
                <Link href="/labs" className="print:hidden inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 text-[10px] font-bold uppercase tracking-widest transition-colors mb-10 group" style={fontLabel}>
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Labs
                </Link>

                <div className="rounded-[2.5rem] bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/[0.06] overflow-hidden shadow-2xl print:bg-transparent print:border-none">
                    
                    <div className="print:hidden p-8 md:px-12 md:py-10 border-b border-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 text-[var(--accent)] text-[9px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                                <DollarSign size={12} /> Monetization Tool
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight" style={fontHeadline}>
                                SaaS Pricing Generator
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
                                        className="w-full bg-white/[0.02] border-2 border-white/[0.05] rounded-2xl p-6 text-zinc-100 text-lg md:text-xl focus:outline-none focus:border-[var(--accent)]/50 transition-all resize-none shadow-inner"
                                        rows={3}
                                        placeholder="Type your answer here..."
                                        value={currentInput}
                                        onChange={(e) => setCurrentInput(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleNext(); } }}
                                    />
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button onClick={handleNext} disabled={!currentInput.trim()} className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-[0.15em] hover:bg-zinc-200 disabled:opacity-30 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]" style={fontLabel}>
                                        {step === QUESTIONS.length - 1 ? "Generate Pricing" : "Next"} <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                        
                        {status === "analyzing" && (
                            <div className="flex flex-col items-center justify-center py-12 max-w-lg mx-auto w-full animate-in fade-in">
                                <CreditCard size={40} className="text-[var(--accent)] animate-bounce mb-8" />
                                <div className="w-full bg-[#050505] border border-white/[0.05] rounded-xl p-6 font-mono text-xs sm:text-sm shadow-2xl relative">
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

                        
                        {status === "complete" && result && (
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 w-full">
                                
                                <div className="text-center mb-16">
                                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4" style={fontHeadline}>{result.page_headline}</h2>
                                    <p className="text-zinc-400 text-lg" style={fontBody}>{result.page_subheadline}</p>
                                </div>

                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20 print:grid-cols-3 print:gap-4">
                                    {result.tiers.map((tier, i) => (
                                        <div key={i} className={`relative flex flex-col p-8 rounded-3xl print:break-inside-avoid ${
                                            tier.is_popular 
                                            ? 'bg-gradient-to-b from-[var(--primary)]/10 to-transparent border-2 border-[var(--primary)]/50 shadow-[0_0_40px_rgba(0,102,255,0.15)] transform md:-translate-y-4' 
                                            : 'bg-[#050505] border border-white/[0.08]'
                                        }`}>
                                            {tier.is_popular && (
                                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-[var(--primary)] text-white text-[10px] font-bold uppercase tracking-widest" style={fontLabel}>
                                                    Most Popular
                                                </div>
                                            )}
                                            
                                            <h3 className="text-lg font-bold text-white mb-2" style={fontHeadline}>{tier.name}</h3>
                                            <p className="text-sm text-zinc-400 mb-6 min-h-[40px]" style={fontBody}>{tier.description}</p>
                                            
                                            <div className="mb-8">
                                                <span className="text-5xl font-black text-white tracking-tighter" style={fontHeadline}>
                                                    {tier.price !== "Custom" && "$"}
                                                    {tier.price}
                                                </span>
                                                <span className="text-zinc-500 ml-1 font-medium">{tier.billing_cycle}</span>
                                            </div>

                                            <button className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all mb-8 ${
                                                tier.is_popular 
                                                ? 'bg-[var(--primary)] text-white hover:bg-[#0055d4]' 
                                                : 'bg-white/[0.05] text-white hover:bg-white/[0.1]'
                                            }`}>
                                                {tier.cta_text}
                                            </button>

                                            <div className="flex-1 space-y-4">
                                                {tier.features.map((feat, idx) => (
                                                    <div key={idx} className="flex items-start gap-3">
                                                        <CheckCircle2 size={16} className={`flex-shrink-0 mt-0.5 ${tier.is_popular ? 'text-[var(--accent)]' : 'text-zinc-500'}`} />
                                                        <span className="text-sm text-zinc-300" style={fontBody}>{feat}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                
                                <div className="print:hidden p-8 md:p-10 rounded-[2rem] bg-[#050505] border border-[var(--primary)]/20 shadow-[0_10px_40px_-10px_rgba(0,102,255,0.15)] relative overflow-hidden group max-w-5xl mx-auto">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-50 pointer-events-none" />
                                    
                                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
                                        <div className="flex-1 text-center lg:text-left">
                                            <h4 className="text-2xl font-bold text-white mb-3" style={fontHeadline}>Need this coded and live?</h4>
                                            <p className="text-zinc-400 text-sm max-w-md mx-auto lg:mx-0" style={fontBody}>Having the strategy is step one. Step two is building it. Enter your email to download this pricing data, and let's get Stripe integrated.</p>
                                        </div>
                                        
                                        <div className="w-full lg:w-[420px]">
                                            {emailSent ? (
                                                <div className="flex flex-col gap-3 animate-in fade-in">
                                                    <div className="flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl border border-[var(--primary)]/30 bg-[var(--accent)]/10 text-[var(--accent)] mb-1">
                                                        <CheckCircle2 size={18} />
                                                        <span className="text-[11px] font-bold tracking-widest uppercase" style={fontLabel}>Email Confirmed</span>
                                                    </div>
                                                    <button onClick={handleDownloadHTML} className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all w-full" style={fontLabel}>
                                                        <Code size={14} /> Download HTML Code
                                                    </button>
                                                    <a href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/mohrashard/30min"} target="_blank" className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[var(--primary)] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#0055d4] transition-all" style={fontLabel}>
                                                        Book Stripe Integration
                                                    </a>
                                                </div>
                                            ) : (
                                                <form onSubmit={handleSendReport} className="flex flex-col gap-4">
                                                    <div className="relative">
                                                        <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"/>
                                                        <input type="email" placeholder="founder@startup.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-14 pr-5 py-4 bg-[#0A0A0A] border border-white/[0.1] rounded-xl text-white focus:border-[var(--primary)] outline-none transition-all" />
                                                    </div>
                                                    <button type="submit" disabled={isSending || !email} className="w-full flex justify-center items-center gap-2 py-4 rounded-xl bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#0055d4] disabled:opacity-50 transition-all shadow-[0_5px_20px_rgba(0,102,255,0.3)]" style={fontLabel}>
                                                        {isSending ? <><Activity size={18} className="animate-spin"/> Saving...</> : <><Zap size={18}/> Save Strategy</>}
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
