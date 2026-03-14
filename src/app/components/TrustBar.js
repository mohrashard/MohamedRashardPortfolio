import React from 'react';

export default function TrustBar() {
    return (
        <div className="w-full bg-[#0a0a0a] border-y border-white/5 py-4 relative z-20 mt-1">
            <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center lg:justify-between items-center text-xs md:text-sm font-medium text-slate-400 gap-y-3 gap-x-6 tracking-wide">
                <span className="flex items-center gap-2"><i className="fas fa-graduation-cap text-blue-500"></i> First Class Honours, Cardiff Metropolitan</span>
                <span className="hidden lg:inline text-white/20">•</span>
                <span className="flex items-center gap-2"><i className="fas fa-rocket text-blue-500"></i> 10+ AI Projects Shipped</span>
                <span className="hidden lg:inline text-white/20">•</span>
                <span className="flex items-center gap-2"><i className="fas fa-globe text-blue-500"></i> Clients in US, Europe, Middle East</span>
                <span className="hidden lg:inline text-white/20">•</span>
                <span className="flex items-center gap-2"><i className="fas fa-clock text-blue-500"></i> 48hr MVP Guarantee</span>
            </div>
        </div>
    );
}
