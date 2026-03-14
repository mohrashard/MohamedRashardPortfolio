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
            <div className="flex flex-col gap-1.5 mt-6 px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-sm">
                <div className="h-4 w-32 bg-white/10 rounded animate-pulse"></div>
                <div className="h-3 w-48 bg-white/5 rounded animate-pulse mt-1"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1.5 px-4 py-3 rounded-xl bg-white/5 border border-white/20 backdrop-blur-md max-w-[340px] shadow-lg shadow-black/50 hover:border-blue-500/50 hover:bg-white/10 transition-all group cursor-default">
            <div className="flex items-center gap-2.5">
                <i className="far fa-clock text-blue-400 text-sm group-hover:text-blue-300 transition-colors"></i>
                <div className="flex items-baseline gap-2">
                    <span className="text-white font-bold text-sm tracking-tight">{time}</span>
                    <span className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider">Local Time (LK)</span>
                </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed group-hover:text-slate-300 transition-colors">
                <strong className="text-white font-medium">Async-friendly.</strong> I respond within 4 hrs during my day, and within 12 hrs globally.
            </p>
        </div>
    );
}
