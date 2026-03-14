"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AvailabilityBadge() {
    const [availabilityText, setAvailabilityText] = useState("Currently accepting new projects");

    useEffect(() => {
        const getNextMonthText = () => {
            const date = new Date();
            // Move to the next month
            date.setMonth(date.getMonth() + 1);
            
            const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            
            const nextMonth = monthNames[date.getMonth()];
            const year = date.getFullYear();

            // We randomize slightly or keep it fixed at 2 or 3 to maintain scarcity.
            // Keeping it fixed at 2 creates a permanent, authentic-feeling scarcity loop.
            return `Currently accepting 2 new projects for ${nextMonth} ${year}`;
        };

        setAvailabilityText(getNextMonthText());
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs md:text-sm font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(74,222,128,0.15)] backdrop-blur-sm"
        >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            {availabilityText}
        </motion.div>
    );
}
