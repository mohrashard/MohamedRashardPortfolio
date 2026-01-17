"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Scroll Spy Logic
            const sections = ["home", "about", "skills", "projects", "contact"];
            const scrollPos = window.scrollY + 100;

            let current = "";
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPos) {
                    current = sections[i];
                    break;
                }
            }
            if (current && current !== activeSection) {
                setActiveSection(current);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [activeSection]);

    const scrollToSection = (id) => {
        setIsMenuOpen(false);
        if (pathname !== "/") {
            router.push("/");
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setActiveSection(id);
        }
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-[1000] px-6 md:px-12 transition-all duration-300 ${isScrolled ? 'h-[70px] bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'h-[90px] bg-transparent'}`}>
            <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
                {/* Logo */}
                <div
                    onClick={() => scrollToSection("home")}
                    className="cursor-pointer group flex items-center"
                >

                    <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent transition-all">
                        Mr²
                    </span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {["home", "about", "skills", "projects", "contact"].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative
                                ${activeSection === item
                                    ? 'text-white bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 shadow-[0_0_15px_rgba(33,150,243,0.2)]'
                                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </button>
                    ))}
                    <div className="w-px h-6 bg-white/10 mx-2"></div>
                    <Link href="/services" className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                        Services
                    </Link>
                    <Link href="/labs" className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                        Labs
                    </Link>
                    <Link href="/digital-assets" className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                        Digital Assets
                    </Link>
                    <Link href="/blog" className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                        Blog
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <div
                    className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 cursor-pointer z-[1001] bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2 bg-blue-400' : 'text-slate-200'}`}></div>
                    <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'text-slate-200'}`}></div>
                    <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2 bg-blue-400' : 'text-slate-200'}`}></div>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            <div className={`md:hidden absolute top-[100%] left-0 right-0 bg-black/95 backdrop-blur-3xl border-b border-white/10 overflow-hidden transition-all duration-500 ${isMenuOpen ? 'max-h-[500px] opacity-100 shadow-2xl' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col p-6 gap-2">
                    {["home", "about", "skills", "projects", "contact"].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item)}
                            className={`text-left p-4 rounded-xl text-sm font-medium transition-all
                                ${activeSection === item
                                    ? 'bg-gradient-to-r from-blue-500/20 to-transparent border-l-4 border-blue-500 text-blue-400'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-2'
                                }`}
                        >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </button>
                    ))}
                    <Link href="/services" className="text-left p-4 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-2 transition-all">
                        Services
                    </Link>
                    <Link href="/labs" className="text-left p-4 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-2 transition-all">
                        Labs
                    </Link>
                    <Link href="/digital-assets" className="text-left p-4 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-2 transition-all">
                        Digital Assets
                    </Link>
                    <Link href="/blog" className="text-left p-4 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-2 transition-all">
                        Blog
                    </Link>
                </div>
            </div>
        </header>
    );
}
