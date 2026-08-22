'use client';

import { useState, useEffect, useRef } from 'react';
import { getPendingIdeas, draftPostAction, runScoutAction, getRecentActivity, validateIdeaInsights } from './actions';
import { Copy, Terminal, Activity, FileText, Search, TrendingUp } from 'lucide-react';

export default function AdminContentDashboard() {
    const [ideas, setIdeas] = useState([]);
    const [selectedIdea, setSelectedIdea] = useState(null);
    const [markdownDraft, setMarkdownDraft] = useState('');
    const [imageBase64, setImageBase64] = useState(null);
    const [imageName, setImageName] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [timeframe, setTimeframe] = useState('day');
    const [isScouting, setIsScouting] = useState(false);
    const [viewMode, setViewMode] = useState('queue');
    const [recentActivity, setRecentActivity] = useState([]);
    const [validationInsights, setValidationInsights] = useState(null);
    const [isValidating, setIsValidating] = useState(false);
    const fileInputRef = useRef(null);

    const loadIdeas = async () => {
        const [pendingData, activityData] = await Promise.all([
            getPendingIdeas(),
            getRecentActivity()
        ]);
        setIdeas(pendingData);
        setRecentActivity(activityData);
        setIsLoading(false);
    };

    useEffect(() => {
        loadIdeas();
        const interval = setInterval(() => {
            loadIdeas();
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleRunScout = async () => {
        setIsScouting(true);
        const res = await runScoutAction(timeframe);
        alert(res.message);
        setTimeout(() => setIsScouting(false), 3000); 
    };

    const handleGenerateDraft = async (idea) => {
        setIsGenerating(true);
        setSelectedIdea(idea);
        setMarkdownDraft('Generating drafting via AI... Please wait.');
        setImageBase64(null); 
        setImageName('');
        
        const response = await draftPostAction(idea.id, validationInsights);
        if (response.success) {
            setMarkdownDraft(response.markdown);
        } else {
            setMarkdownDraft(`Error generating draft: ${response.error}`);
        }
        setIsGenerating(false);
    };

    const handleValidateDemand = async () => {
        const queryTarget = selectedIdea?.editorial_brief?.search_seed || selectedIdea?.editorial_brief?.target_keyword;
        if (!queryTarget) return;
        
        setIsValidating(true);
        try {
            const insights = await validateIdeaInsights(queryTarget);
            setValidationInsights(insights);
        } catch (err) {
            console.error(err);
        } finally {
            setIsValidating(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageName(file.name);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageBase64(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handlePublish = async () => {
        if (!selectedIdea || !markdownDraft) return;
        
        const slug = selectedIdea.editorial_brief.proposed_slug;
        if (!slug) {
            alert("No slug found in the brief!");
            return;
        }

        setIsPublishing(true);
        try {
            const res = await fetch('/api/publish', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slug,
                    markdown: markdownDraft,
                    imageBase64
                })
            });

            const data = await res.json();
            
            if (!res.ok) {
                alert(`Publish failed: ${data.error}`);
            } else {
                alert(`Successfully published to GitHub! Vercel is building it now.`);
                setIdeas(ideas.filter(i => i.id !== selectedIdea.id));
                setSelectedIdea(null);
                setMarkdownDraft('');
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            setIsPublishing(false);
        }
    };

    const copySEOPrompt = () => {
        if (!selectedIdea) return;
        const b = selectedIdea.editorial_brief;
        const prompt = `You are an elite Technical Writer and SEO Content Strategist using the claude-seo framework.
Your task is to write a highly-optimized, production-ready blog post in Markdown format for the MR² Labs blog.

Context for the Post:
- Proposed Title/Slug: ${b.proposed_slug || ''}
- Target Keyword: ${b.target_keyword || ''}
- Target Audience: ${b.target_audience || ''}
- Core Objection to Overcome: ${b.core_objection || ''}
- Category: ${b.category || ''}
- Suggested H2s: ${(b.suggested_h2s || []).join(", ")}

Source Thread Context (HN / DEV.to / Lobste.rs discussions):
${selectedIdea.raw_source || 'No raw source available.'}

Google Search Validation Insights (weave these in naturally):
Frequency Score: ${validationInsights?.frequencyScore ?? 'Not Pulled'}
Breakout Virality Keywords: ${validationInsights?.viralityKeywords?.join(', ') || 'None'}
User Expectations (Autocomplete): ${validationInsights?.userExpectations?.join(', ') || 'None'}

### Execution Instructions:
1. Act as an authoritative, senior engineer writing for other founders and engineers.
2. Avoid generic AI fluff, introductions like "In today's digital landscape", or robotic conclusions. Dive straight into the value.
3. Use the Source Thread Context to pull real pain points, quotes, or perspectives that make the post feel grounded and human.
4. Structure the post using standard Markdown with SEO-optimized H2s and H3s. Include the target keyword naturally in the H1 and early in the body.
5. Provide a Next.js MDX compatible Frontmatter block at the very top (title, date, excerpt, author, category).
6. The content must be deeply technical, practical, heavily optimized for search intent, and pass all E-E-A-T guidelines.

Please analyze the context, research any necessary technical gaps, and write the complete, final Markdown blog post now.`;

        navigator.clipboard.writeText(prompt);
        alert("Claude SEO Prompt copied to clipboard! Paste this directly into Claude.");
    };

    return (
        <div className="min-h-screen bg-[#030303] text-zinc-300 font-sans p-6 sm:p-10 flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar: Idea Queue */}
            <div className="w-full lg:w-1/3 bg-[#0a0a0a] rounded-[1.5rem] border border-white/5 p-6 sm:p-8 flex flex-col max-h-[calc(100vh-5rem)] shadow-2xl">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight text-white mb-6">Orchestration</h1>
                    
                    {/* Scout Controls */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <select 
                            value={timeframe} 
                            onChange={(e) => setTimeframe(e.target.value)}
                            className="bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-xs font-medium text-zinc-300 focus:outline-none focus:border-white/20 transition-colors"
                        >
                            <option value="day">Past 24 Hours</option>
                            <option value="48h">Past 48 Hours</option>
                            <option value="72h">Past 72 Hours</option>
                            <option value="week">Past Week</option>
                            <option value="month">Past Month</option>
                        </select>
                        <button 
                            onClick={handleRunScout}
                            disabled={isScouting}
                            className="flex-1 bg-white text-black hover:bg-zinc-200 font-medium text-xs py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <Activity size={14} />
                            {isScouting ? 'Executing...' : 'Run Scout'}
                        </button>
                    </div>
                </div>

                <div className="flex gap-2 mb-4 border-b border-white/10 pb-2">
                    <button 
                        onClick={() => setViewMode('queue')}
                        className={`text-xs font-bold uppercase tracking-widest px-2 py-1 ${viewMode === 'queue' ? 'text-white border-b-2 border-white' : 'text-zinc-600 hover:text-zinc-400'}`}
                    >
                        Actionable Queue ({ideas.length})
                    </button>
                    <button 
                        onClick={() => setViewMode('feed')}
                        className={`text-xs font-bold uppercase tracking-widest px-2 py-1 ${viewMode === 'feed' ? 'text-white border-b-2 border-white' : 'text-zinc-600 hover:text-zinc-400'}`}
                    >
                        Live Scout Feed
                    </button>
                </div>

                <div className="overflow-y-auto flex-1 pr-2 -mr-2 space-y-3">
                {isLoading ? (
                    <div className="text-zinc-500 text-sm">Synchronizing queue...</div>
                ) : viewMode === 'queue' ? (
                    ideas.length === 0 ? (
                        <div className="text-zinc-500 text-sm">Queue is empty.</div>
                    ) : (
                        ideas.map((idea) => (
                            <div 
                                key={idea.id}
                                onClick={() => {
                                    setSelectedIdea(idea);
                                    
                                    // If it has the new Unified Pipeline data, map it directly!
                                    if (idea.editorial_brief?.demand_score !== undefined) {
                                        setValidationInsights({
                                            status: idea.editorial_brief.demand_score > 15 ? 'approved' : 'low_volume',
                                            frequencyScore: idea.editorial_brief.demand_score,
                                            viralityKeywords: idea.editorial_brief.breakout_keywords || [],
                                            userExpectations: idea.editorial_brief.user_expectations || []
                                        });
                                    } else {
                                        // Legacy fallback
                                        setValidationInsights(idea.editorial_brief?.searchInsights || null);
                                    }
                                    
                                    setMarkdownDraft('');
                                }}
                                className={`p-5 rounded-xl border cursor-pointer transition-all ${
                                    selectedIdea?.id === idea.id 
                                    ? 'bg-white/5 border-white/20 shadow-sm' 
                                    : 'bg-transparent border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                                }`}
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                                        SCORE // {idea.intent_score}/40
                                    </span>
                                    <span className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-white/5 text-zinc-300">
                                        {idea.status}
                                    </span>
                                </div>
                                <h3 className="text-sm font-semibold text-white mb-2 leading-snug">
                                    {idea.editorial_brief?.target_keyword || 'Untitled Idea'}
                                </h3>
                                <p className="text-xs text-zinc-500 line-clamp-2">
                                    {idea.editorial_brief?.core_objection || 'No core objection parsed.'}
                                </p>
                            </div>
                        ))
                    )
                ) : (
                    recentActivity.length === 0 ? (
                        <div className="text-zinc-500 text-sm">No activity recorded yet.</div>
                    ) : (
                        recentActivity.map((activity) => (
                            <div key={activity.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm ${
                                        activity.status === 'rejected' ? 'bg-red-500/10 text-red-400' : 
                                        activity.status === 'pending' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-500/10 text-zinc-400'
                                    }`}>
                                        {activity.status}
                                    </span>
                                    <span className="text-[10px] font-mono text-zinc-500">
                                        {new Date(activity.created_at).toLocaleTimeString()}
                                    </span>
                                </div>
                                <p className="text-xs font-semibold text-zinc-300 mb-1 truncate">
                                    {activity.source_url ? new URL(activity.source_url).pathname.split('/').filter(Boolean).pop() : 'Unknown Source'}
                                </p>
                                {activity.status === 'rejected' ? (
                                    <p className="text-[10px] text-zinc-500 font-mono line-clamp-2">
                                        Reason: {activity.editorial_brief?.rejection_reason || 'Low intent score.'}
                                    </p>
                                ) : (
                                    <p className="text-[10px] text-zinc-500 font-mono">
                                        Score: {activity.intent_score}/40 | Keyword: {activity.editorial_brief?.target_keyword}
                                    </p>
                                )}
                            </div>
                        ))
                    )
                )}
                </div>
            </div>

            {/* Right Panel: Editor */}
            <div className="w-full lg:w-2/3 bg-[#0a0a0a] rounded-[1.5rem] border border-white/5 p-6 sm:p-10 flex flex-col h-[calc(100vh-5rem)] shadow-2xl overflow-y-auto">
                {selectedIdea ? (
                    <>
                        {/* Header & Actions */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 gap-6 border-b border-white/5 pb-8">
                            <div className="flex-1">
                                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-3">
                                    {selectedIdea.editorial_brief.proposed_slug}
                                </h2>
                                <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
                                    <span className="flex items-center gap-1.5"><Terminal size={14} /> {selectedIdea.editorial_brief.target_audience}</span>
                                    {selectedIdea.editorial_brief.estimated_search_volume && (
                                        <span className="flex items-center gap-1.5"><Activity size={14} /> {selectedIdea.editorial_brief.estimated_search_volume}</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button 
                                    onClick={handleValidateDemand}
                                    disabled={isValidating || isGenerating || isPublishing}
                                    className="px-4 py-2.5 rounded-lg bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20 text-xs font-medium hover:bg-[#0066FF]/20 transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                    <Search size={14} /> {isValidating ? 'Validating...' : 'Validate Demand'}
                                </button>
                                <button 
                                    onClick={copySEOPrompt}
                                    className="px-4 py-2.5 rounded-lg bg-white/5 text-zinc-300 border border-white/10 text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
                                >
                                    <Copy size={14} /> Copy Brief Prompt
                                </button>
                                <button 
                                    onClick={() => handleGenerateDraft(selectedIdea)}
                                    disabled={isGenerating || isPublishing}
                                    className="px-4 py-2.5 rounded-lg bg-white/5 text-zinc-300 border border-white/10 text-xs font-medium hover:bg-white/10 transition-colors disabled:opacity-50"
                                >
                                    {isGenerating ? 'Generating...' : 'AI Draft'}
                                </button>
                                <button 
                                    onClick={handlePublish}
                                    disabled={isGenerating || isPublishing || !markdownDraft}
                                    className="px-5 py-2.5 rounded-lg bg-white text-black text-xs font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50"
                                >
                                    {isPublishing ? 'Deploying...' : 'Publish'}
                                </button>
                            </div>
                        </div>
                        
                        {/* Metrics & Context (New) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white/[0.02] border border-white/5 p-4 sm:p-5 rounded-xl flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase">Commercial Intent Scorecard</h4>
                                    <span className="text-lg font-semibold text-emerald-400">{selectedIdea.intent_score} <span className="text-xs text-zinc-600">/ 40</span></span>
                                </div>
                                <p className="text-[11px] text-zinc-400 leading-relaxed mb-4">{selectedIdea.editorial_brief.score_reasoning}</p>
                                
                                {selectedIdea.editorial_brief.scores && (
                                    <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/5 mt-auto">
                                        <div className="text-center">
                                            <div className="text-white font-mono text-sm mb-0.5">{selectedIdea.editorial_brief.scores.pain}</div>
                                            <div className="text-[9px] uppercase text-zinc-500 tracking-widest">Pain</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-white font-mono text-sm mb-0.5">{selectedIdea.editorial_brief.scores.budget}</div>
                                            <div className="text-[9px] uppercase text-zinc-500 tracking-widest">Budget</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-white font-mono text-sm mb-0.5">{selectedIdea.editorial_brief.scores.alignment}</div>
                                            <div className="text-[9px] uppercase text-zinc-500 tracking-widest">Align</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-white font-mono text-sm mb-0.5">{selectedIdea.editorial_brief.scores.evergreen}</div>
                                            <div className="text-[9px] uppercase text-zinc-500 tracking-widest">Life</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {selectedIdea.raw_source && (
                                <div className="bg-white/[0.02] border border-white/5 p-4 sm:p-5 rounded-xl flex flex-col h-[200px]">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase">Raw Context</h4>
                                        <span className={`text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm ${
                                            selectedIdea.source_url?.includes('reddit') ? 'bg-[#FF4500]/10 text-[#FF4500]' : 'bg-[#FF6600]/10 text-[#FF6600]'
                                        }`}>
                                            {selectedIdea.source_url?.includes('reddit') ? 'Reddit' : 'Hacker News'}
                                        </span>
                                    </div>
                                    <div className="overflow-y-auto overflow-x-hidden text-[11px] text-zinc-400 font-mono whitespace-pre-wrap break-words flex-1 pr-2 custom-scrollbar">
                                        {selectedIdea.raw_source.length > 800 ? selectedIdea.raw_source.substring(0, 800) + '...' : selectedIdea.raw_source}
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Google Search Validation Insights */}
                        {validationInsights && validationInsights.status !== 'error' && (
                            <div className="mb-8 bg-[#0066FF]/[0.02] border border-[#0066FF]/20 p-5 rounded-xl">
                                <div className="flex items-center gap-2 mb-4">
                                    <TrendingUp size={16} className="text-[#0066FF]" />
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">Google Search Insights</h4>
                                    <span className={`ml-auto text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm ${
                                        validationInsights.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                                    }`}>
                                        {validationInsights.status === 'approved' ? 'HIGH VOLUME' : 'LOW VOLUME'}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div>
                                        <div className="text-[10px] font-mono text-zinc-500 mb-1 tracking-wider uppercase">Live Frequency</div>
                                        <div className="text-2xl font-semibold text-white">{validationInsights.frequencyScore} <span className="text-xs font-normal text-zinc-500">/ 100</span></div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-mono text-zinc-500 mb-1 tracking-wider uppercase">Breakout Virality</div>
                                        <div className="flex flex-wrap gap-1.5 mt-1">
                                            {validationInsights.viralityKeywords?.length > 0 ? validationInsights.viralityKeywords.map((k, i) => (
                                                <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-sm bg-white/5 text-zinc-300 border border-white/10">{k}</span>
                                            )) : <span className="text-xs text-zinc-500">No breakouts detected</span>}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-mono text-zinc-500 mb-1 tracking-wider uppercase">User Expectations</div>
                                        <div className="flex flex-wrap gap-1.5 mt-1">
                                            {validationInsights.userExpectations?.length > 0 ? validationInsights.userExpectations.slice(0, 3).map((k, i) => (
                                                <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-sm bg-white/5 text-zinc-300 border border-white/10">{k}</span>
                                            )) : <span className="text-xs text-zinc-500">No predictions</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-[#0066FF]/10 text-xs text-zinc-400 leading-relaxed">
                                    <strong>AI Strategy:</strong> When drafting, the Engine will natively weave these breakout keywords and expectations into the H2s and problem-statements so you effortlessly capture the related search volume.
                                </div>
                            </div>
                        )}

                        {/* Image Upload */}
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="mb-8 p-6 border border-white/10 border-dashed rounded-xl flex items-center justify-center bg-white/[0.02] cursor-pointer hover:bg-white/5 transition-colors group"
                        >
                            <input 
                                type="file" 
                                accept="image/png, image/jpeg, image/webp" 
                                className="hidden" 
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                            />
                            <div className="text-center flex flex-col items-center">
                                {imageBase64 ? (
                                    <div className="text-white font-medium text-sm">
                                        Cover attached: {imageName}
                                    </div>
                                ) : (
                                    <>
                                        <FileText size={24} className="text-zinc-600 mb-3 group-hover:text-zinc-400 transition-colors" />
                                        <p className="text-sm font-medium text-zinc-300">Attach cover image</p>
                                        <p className="text-xs text-zinc-500 mt-1">.png, .jpg (pushed to repository)</p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Markdown Editor */}
                        <div className="flex-1 flex flex-col min-h-[500px] mt-4">
                            <label className="text-[10px] font-mono text-zinc-500 mb-3 tracking-wider uppercase">
                                Editor
                            </label>
                            <textarea
                                value={markdownDraft}
                                onChange={(e) => setMarkdownDraft(e.target.value)}
                                className="flex-1 w-full bg-[#050505] border border-white/10 rounded-xl p-6 text-[13px] font-mono text-zinc-300 focus:outline-none focus:border-white/20 transition-colors resize-none overflow-y-auto"
                                placeholder="Raw markdown content..."
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-zinc-600 flex-col h-full">
                        <Terminal size={32} className="mb-4 opacity-50" />
                        <p className="text-sm font-medium text-zinc-400">Idle</p>
                        <p className="text-xs text-zinc-600 mt-1">Select an intent signal to begin synthesis.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
