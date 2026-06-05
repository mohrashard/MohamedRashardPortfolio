"use client";

import React, { useState, useEffect } from "react";

export default function TimezoneWidget() {
    const [time, setTime] = useState("");

    useEffect(() => {
        // Function to get current time in Colombo, Sri Lanka (Asia/Colombo)
        const updateColomboTime = () => {
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Colombo',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            setTime(formatter.format(new Date()));
        };

        // Initial call
        updateColomboTime();

        // Update every minute to keep it live
        const intervalId = setInterval(updateColomboTime, 60000);

        return () => clearInterval(intervalId);
    }, []);

    // Prevent hydration mismatch by returning empty structure until mounted
    if (!time) {
        return (
            <div className="flex flex-col gap-1.5 px-4 py-3 rounded-xl bg-white/5 border border-[var(--primary)]/20 backdrop-blur-sm max-w-[340px] mx-auto">
                <div className="h-4 w-32 bg-white/10 rounded animate-pulse"></div>
                <div className="h-3 w-48 bg-white/5 rounded animate-pulse mt-1"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1.5 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md max-w-[340px] mx-auto shadow-lg shadow-black/50 hover:border-[var(--primary)]/40 hover:bg-[var(--primary)]/5 transition-all group cursor-default">
            <div className="flex items-center justify-center gap-2.5">
                <i className="far fa-clock text-[var(--primary)] text-sm group-hover:text-[#3388ff] transition-colors"></i>
                <div className="flex items-baseline gap-2">
                    <span className="text-white font-bold text-sm tracking-tight">{time}</span>
                    <span className="text-zinc-500 text-[11px] font-semibold uppercase tracking-wider">Local Time (LK)</span>
                </div>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed group-hover:text-zinc-300 transition-colors font-normal text-center">
                <strong className="text-white font-medium">Async-friendly.</strong> We respond within 4 hrs during our day, and within 12 hrs globally.
            </p>
        </div>
    );
}
