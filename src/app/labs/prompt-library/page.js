"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, ArrowLeft, Search, Copy, CheckCircle2, Zap, Code2, Cpu, BarChart3, Mail, Layers, Database, Activity, Sparkles } from 'lucide-react';
import promptsData from '../../../data/prompts.json';

// ── Shared font tokens ──────────────────────────────────────
const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

// Dynamic category extraction
const categories = ["All", ...new Set(promptsData.map(p => p.category))];

const getIconForCategory = (category) => {
    switch(category.toLowerCase()) {
        case 'engineering': return <Code2 size={16} />;
        case 'infrastructure': return <Database size={16} />;
        case 'marketing': return <BarChart3 size={16} />;
        case 'automation': return <Cpu size={16} />;
        default: return <Layers size={16} />;
    }
};

export default function PromptLibrary() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [copiedIndex, setCopiedIndex] = useState(null);
    
    // Lead Capture State
    const [email, setEmail] = useState("");
    const [isSendingLead, setIsSendingLead] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    // Custom Crafter State
    const [crafterInput, setCrafterInput] = useState("");
    const [isCrafting, setIsCrafting] = useState(false);
    const [craftedPrompt, setCraftedPrompt] = useState("");
    const [copiedCrafted, setCopiedCrafted] = useState(false);

    const filteredPrompts = promptsData.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.prompt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const handleCopyCrafted = () => {
        navigator.clipboard.writeText(craftedPrompt);
        setCopiedCrafted(true);
        setTimeout(() => setCopiedCrafted(false), 2000);
    };

    // Check if previously unlocked
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

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] relative selection:bg-[var(--primary)]/30 py-24 px-4 sm:px-6 overflow-hidden">
            
            <div className="fixed top-[10%] right-[5%] w-[700px] h-[700px] bg-zinc-800/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
            <div className="fixed bottom-[10%] left-[5%] w-[500px] h-[500px] bg-[var(--primary)]/10 rounded-full blur-[130px] pointer-events-none mix-blend-screen" />

            <div className="max-w-5xl mx-auto relative z-10">
                
                <Link href="/labs" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 text-[10px] font-bold uppercase tracking-widest transition-colors mb-12 group" style={fontLabel}>
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Labs
                </Link>

                <header className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded border border-white/[0.08] bg-white/[0.02] text-[var(--accent)] text-[10px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                        <Terminal size={12} className="text-[var(--accent)]" /> 99+ PROMPTS
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4" style={fontHeadline}>
                        AI Prompt Library
                    </h1>
                    <p className="text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed mb-8" style={fontBody}>
                        Production-grade, copy-pasteable system prompts and context frameworks engineered to eliminate output fragmentation across LLM models.
                    </p>
                    <button 
                        onClick={() => document.getElementById('crafter')?.scrollIntoView({ behavior: 'smooth' })}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] text-white text-xs font-bold uppercase tracking-widest transition-all"
                        style={fontLabel}
                    >
                        <Sparkles size={14} className="text-[var(--primary)]" /> Jump to Custom AI Crafter
                    </button>
                </header>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-white/[0.06] pb-8">
                    <div className="relative w-full md:w-80">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input 
                            type="text" 
                            placeholder="Filter structural keys..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white/[0.02] border border-white/[0.08] rounded-xl text-zinc-200 text-xs focus:outline-none focus:border-zinc-500 transition-all placeholder:text-zinc-600"
                            style={fontLabel}
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
                                    selectedCategory === cat 
                                        ? 'bg-zinc-100 text-black border-white' 
                                        : 'bg-white/[0.02] text-zinc-500 border-white/[0.05] hover:text-zinc-300'
                                }`}
                                style={fontLabel}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-6 mb-20">
                    {filteredPrompts.length > 0 ? (
                        filteredPrompts.map((item, i) => (
                            <div key={i} className="p-6 md:p-8 rounded-[2rem] bg-[#0A0A0A]/80 border border-white/[0.05] relative overflow-hidden group flex flex-col md:flex-row md:items-start justify-between gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-7 h-7 rounded bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-400">
                                            {getIconForCategory(item.category)}
                                        </div>
                                        <h3 className="text-lg font-bold text-white tracking-tight" style={fontHeadline}>{item.title}</h3>
                                        <span className="text-[9px] font-bold uppercase tracking-widest bg-white/[0.05] border border-white/[0.05] px-2 py-0.5 rounded text-[var(--primary)] font-mono">{item.category}</span>
                                    </div>
                                    <p className="text-xs text-zinc-500 mb-6 max-w-2xl" style={fontBody}>{item.summary}</p>
                                    
                                    <div className="p-4 rounded-xl bg-[#050505] border border-white/[0.04] text-xs font-mono text-zinc-400 leading-relaxed max-h-32 overflow-y-auto select-all shadow-inner border-l-2 border-l-[var(--primary)]">
                                        {item.prompt}
                                    </div>
                                </div>

                                <button 
                                    onClick={() => handleCopy(item.prompt, i)}
                                    className={`w-full md:w-12 h-12 rounded-xl transition-all flex items-center justify-center border shrink-0 ${
                                        copiedIndex === i 
                                            ? 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/30' 
                                            : 'bg-white/[0.03] text-zinc-500 border-white/[0.06] hover:bg-[var(--primary)]/20 hover:text-[var(--primary)] hover:border-[var(--primary)]/50'
                                    }`}
                                >
                                    {copiedIndex === i ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-zinc-600 text-xs font-mono animate-in fade-in">No structural fragments match your search parameters.</div>
                    )}
                </div>

                {/* AI Prompt Crafter Block */}
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
                                            className="w-full flex justify-center items-center gap-2 py-4 rounded-xl bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#0055d4] disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)]" 
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
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#0055d4] disabled:opacity-30 transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)]" 
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

            </div>
        </div>
    );
}
