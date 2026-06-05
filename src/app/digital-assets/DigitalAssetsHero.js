"use client";

import React from 'react';
import { motion } from 'framer-motion';
import AvailabilityBadge from '../components/AvailabilityBadge';
import { Terminal } from 'lucide-react';

const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

export default function DigitalAssetsHero() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        show: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <motion.header 
            variants={container}
            initial="hidden"
            animate="show"
            className="mb-20 text-center flex flex-col items-center space-y-7 mt-8"
        >
            <motion.div variants={item} className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
                <AvailabilityBadge />
                <span className="hidden sm:block w-1 h-1 bg-zinc-700 rounded-full" />
                <div className="hidden sm:flex items-center gap-1.5 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-bold text-zinc-400" style={fontLabel}>
                    <Terminal size={10} className="text-[var(--accent)]" />
                    Premium Source Code.
                </div>
            </motion.div>

            <motion.h1 variants={item} className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold text-zinc-50 tracking-tight leading-[1.1] sm:leading-[1.02] max-w-4xl" style={fontHeadline}>
                High-Velocity Assets to <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-zinc-50">
                    Accelerate Your Workflow.
                </span>
            </motion.h1>

            <motion.h2 variants={item} className="text-lg sm:text-xl md:text-2xl font-medium text-zinc-300 max-w-3xl" style={fontBody}>
                <span className="text-[var(--primary)] font-semibold">Stop building from scratch.</span> Download production-grade Next.js templates, AI SaaS source code, and Python automation scripts.
            </motion.h2>

            <motion.p variants={item} className="text-zinc-400 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed font-light opacity-90 mx-auto px-2 sm:px-0" style={fontBody}>
                High-quality codebases engineered by Mr² Labs. Deploy scalable architectures in minutes, not months.
            </motion.p>
        </motion.header>
    );
}
