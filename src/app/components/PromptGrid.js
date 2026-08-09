"use client";

import React, { useState } from 'react';
import { Search, Copy, CheckCircle2, Code2, Cpu, BarChart3, Layers, Database } from 'lucide-react';
import promptsData from '../../data/prompts.json';

const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

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

export default function PromptGrid() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [copiedIndex, setCopiedIndex] = useState(null);
    
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

    return (
        <>
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
        </>
    );
}
