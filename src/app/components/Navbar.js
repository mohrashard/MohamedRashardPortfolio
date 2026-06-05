"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ── Shared font tokens ──────────────────────────────────────
const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

export default function Navbar({ position = "fixed" }) {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Labs", href: "/labs" },
        { name: "Digital Assets", href: "/digital-assets" },
        { name: "Blog", href: "/blog" },
    ];

    return (
        <header className={`${position} top-0 left-0 right-0 z-[1000] px-4 sm:px-6 pt-4 sm:pt-6 transition-all duration-500 flex justify-center pointer-events-none`}>
            {/* The wrapper allows the header to be pointer-events-none so users can click 'through' the empty space around the floating nav, while the inner div has pointer-events-auto */}
            <div className={`w-full max-w-7xl rounded-2xl sm:rounded-full flex justify-between items-center px-5 sm:px-8 transition-all duration-500 pointer-events-auto ${isScrolled ? 'h-[64px] bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.6)]' : 'h-[80px] bg-transparent border border-transparent'}`}>

                {/* Logo */}
                <Link href="/" className="group flex items-center gap-1.5" onClick={() => setIsMenuOpen(false)}>
                    <span className="text-2xl font-black text-white tracking-tighter group-hover:text-[var(--primary)] transition-colors" style={fontHeadline}>
                        Mr² Labs
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 relative
                                    ${isActive
                                        ? 'text-white bg-white/[0.06] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]'
                                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
                                    }`}
                                style={fontBody}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Desktop Right CTA */}
                <div className="hidden md:flex items-center">
                    <Link
                        href="/services#audit-form"
                        className="px-6 py-2.5 rounded-full text-[13px] font-extrabold text-white bg-[#0055FF] hover:bg-[#0044CC] transition-all duration-300 shadow-[0_0_25px_rgba(0,85,255,0.5)] hover:shadow-[0_0_40px_rgba(0,85,255,0.8)] hover:-translate-y-0.5 active:translate-y-0"
                        style={fontHeadline}
                    >
                        Request Audit
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden w-11 h-11 flex flex-col justify-center items-center gap-[5px] z-[1001] bg-white/[0.03] rounded-full hover:bg-white/[0.06] transition-colors border border-white/[0.08]"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div className={`h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'w-5 rotate-45 translate-y-[7px]' : 'w-5'}`}></div>
                    <div className={`h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0 w-5' : 'w-4'}`}></div>
                    <div className={`h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'w-5 -rotate-45 -translate-y-[7px]' : 'w-3'}`}></div>
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <div className={`md:hidden absolute top-[110%] left-4 right-4 rounded-3xl bg-[#0A0A0A]/95 backdrop-blur-3xl border border-white/[0.08] overflow-hidden transition-all duration-500 origin-top pointer-events-auto ${isMenuOpen ? 'scale-y-100 opacity-100 shadow-[0_30px_60px_rgba(0,0,0,0.6)]' : 'scale-y-0 opacity-0'}`}>
                <div className="flex flex-col p-4 gap-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`text-left p-4 rounded-2xl text-sm font-bold transition-all
                                    ${isActive
                                        ? 'bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20'
                                        : 'text-zinc-400 hover:bg-white/[0.03] hover:text-white border border-transparent'
                                    }`}
                                style={fontBody}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                    <div className="w-full h-px bg-white/[0.05] my-2"></div>
                    <Link
                        href="/services#audit-form"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-center p-4 rounded-2xl text-sm font-extrabold text-white bg-[#0055FF] shadow-[0_0_25px_rgba(0,85,255,0.5)]"
                        style={fontHeadline}
                    >
                        Request Audit
                    </Link>
                </div>
            </div>
        </header>
    );
}
