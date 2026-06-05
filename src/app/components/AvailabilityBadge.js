"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

export default function AvailabilityBadge() {
    const [longText, setLongText] = useState("Currently accepting new projects");
    const [shortText, setShortText] = useState("Accepting projects");

    useEffect(() => {
        const date = new Date();
        // Move to the next month
        date.setMonth(date.getMonth() + 1);
        
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const fullMonthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        
        const nextMonth = fullMonthNames[date.getMonth()];
        const shortMonth = monthNames[date.getMonth()];
        const year = date.getFullYear();

        // Keeping it fixed at 2 creates a permanent, authentic-feeling scarcity loop.
        setLongText(`Accepting 2 new projects for ${nextMonth} ${year}`);
        setShortText(`2 slots open for ${shortMonth}`);
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.15)] backdrop-blur-sm whitespace-nowrap"
            style={fontLabel}
        >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="hidden sm:inline">{longText}</span>
            <span className="inline sm:hidden">{shortText}</span>
        </motion.div>
    );
}
