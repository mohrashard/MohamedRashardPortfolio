"use client";

import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 bg-[#050505] border-t border-white/5 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6 group">
                            <span className="text-2xl font-black tracking-tighter text-white">
                                Mr<sup className="text-blue-500 text-lg top-[-0.5em]">2</sup> Labs
                            </span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed max-w-sm mb-8">
                            Mr² Labs – The innovation hub of Mohamed Rashard Rizmi. Pioneering AI solutions, custom software ecosystems, and futuristic digital experiences from Colombo to the world.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <a href="https://x.com/mrr_labs" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-black hover:text-white transition-all border border-white/5">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://web.facebook.com/profile.php?id=61575921543570" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#1877F2] hover:text-white transition-all border border-white/5">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://www.instagram.com/mrr_labs/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white transition-all border border-white/5">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/mohamedrashard" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#0077b5] hover:text-white transition-all border border-white/5">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a href="https://github.com/mohrashard/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white hover:text-black transition-all border border-white/5">
                                <i className="fab fa-github"></i>
                            </a>
                        </div>
                    </div>

                    {/* Shortcuts / Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Shortcuts</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                    <i className="fas fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0"></i>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                    <i className="fas fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0"></i>
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/labs" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                    <i className="fas fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0"></i>
                                    Labs
                                </Link>
                            </li>
                            <li>
                                <Link href="/digital-assets" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                    <i className="fas fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0"></i>
                                    Digital Assets
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                    <i className="fas fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0"></i>
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal / Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Contact & Legal</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li className="flex items-start gap-3">
                                <i className="fas fa-map-marker-alt mt-1 text-blue-500"></i>
                                <span>Colombo, Sri Lanka</span>
                            </li>

                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        &copy; {currentYear} Mr² Labs. All rights reserved.
                    </p>
                    <p className="text-slate-600 text-xs flex items-center gap-2">
                        Designed & Built with <i className="fas fa-heart text-red-500 animate-pulse"></i> by MRR
                    </p>
                </div>
            </div>
        </footer>
    );
}
