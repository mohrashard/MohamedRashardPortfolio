"use client";

import React from "react";

export default function SocialProofTicker() {
    const items = [
        "BizFinder AI shipped in 47 hours",
        "LiverLens ML model: 92% accuracy",
        "Mentora: 3,000 wellness assessments processed",
        "48hr MVP. Not a claim. A track record.",
        "BizFinder AI shipped in 47 hours",
        "LiverLens ML model: 92% accuracy",
        "Mentora: 3,000 wellness assessments processed",
        "48hr MVP. Not a claim. A track record.",
    ];

    // Double the items array to ensure seamless infinite scrolling loop
    const tickerItems = [...items, ...items, ...items];

    return (
        <div className="w-full bg-[#0a0a0a] border-y border-white/5 overflow-hidden flex items-center h-14 relative z-20">
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.333333%); } /* Since we repeated the array 3 times */
                }
                .animate-ticker {
                    display: flex;
                    width: max-content;
                    animation: ticker 40s linear infinite;
                }
                .animate-ticker:hover {
                    animation-play-state: paused;
                }
            `}} />
            
            <div className="animate-ticker">
                {tickerItems.map((item, index) => (
                    <div key={index} className="flex items-center px-8 whitespace-nowrap group cursor-default">
                        <i className="fas fa-bolt text-yellow-500/80 mr-3 text-sm group-hover:text-yellow-400 transition-colors"></i>
                        <span className="text-slate-400 text-sm font-semibold tracking-wide uppercase group-hover:text-white transition-colors">{item}</span>
                    </div>
                ))}
            </div>
            
            {/* Fade Out Edges */}
            <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none z-10"></div>
            <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-10"></div>
        </div>
    );
}
