import React from 'react';
import Link from 'next/link';
import { Terminal, ArrowLeft, Sparkles } from 'lucide-react';
import PromptGrid from '../../components/PromptGrid';
import PromptCrafter from '../../components/PromptCrafter';

const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

export default function PromptLibrary() {
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
                    <a 
                        href="#crafter"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] text-white text-xs font-bold uppercase tracking-widest transition-all"
                        style={fontLabel}
                    >
                        <Sparkles size={14} className="text-[var(--primary)]" /> Jump to Custom AI Crafter
                    </a>
                </header>

                <PromptGrid />

                <PromptCrafter />

            </div>
        </div>
    );
}
