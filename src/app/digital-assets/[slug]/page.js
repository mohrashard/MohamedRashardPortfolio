import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { assets } from '../data';

// Generate static params for static site generation (SSG)
export async function generateStaticParams() {
    return assets.map((asset) => ({
        slug: asset.slug,
    }));
}

// Generate dynamic metadata for HIGHEST SEO Ranking
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const asset = assets.find((p) => p.slug === slug);
    if (!asset) {
        return { title: 'Product Not Found' };
    }

    // Schema Markup for Product (Rich Snippets)
    const productSchema = JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "SoftwareApplication",
        "name": asset.title,
        "image": `https://www.mohamedrashard.dev${asset.image}`,
        "description": asset.description,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web, Windows, Mac, Linux",
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": asset.price.replace('$', ''),
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Person",
                "name": "Mohamed Rashard"
            }
        }
    });

    return {
        title: `${asset.title} | Premium Source Code & Templates`,
        description: `Download ${asset.title}. ${asset.description} Optimized for performance and SEO. Best for developers and agencies.`,
        keywords: [...asset.tech, asset.category, "Source Code", "Next.js Template", "Developer Tools", "Mohamed Rashard"],
        openGraph: {
            title: asset.title,
            description: asset.description,
            url: `https://www.mohamedrashard.dev/digital-assets/${asset.slug}`,
            images: [asset.image],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: asset.title,
            description: asset.description,
            images: [asset.image],
        },
        other: {
            'script:ld+json': productSchema // Inject structured data
        }
    };
}

export default async function ProductPage({ params }) {
    const { slug } = await params;
    const asset = assets.find((p) => p.slug === slug);

    if (!asset) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-purple-500/30 overflow-x-hidden">

            {/* Background Decoration: Gradient Vibes */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Dynamic Mesh Gradient */}
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-orange-500/20 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-700"></div>

                <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-b from-cyan-500/10 via-blue-600/20 to-purple-600/20 rounded-full blur-[80px] mix-blend-screen animate-pulse duration-1000"></div>

                <div className="absolute bottom-[-20%] left-[20%] w-[900px] h-[500px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-[100px] mix-blend-screen"></div>

                {/* Subtle sweeping conic gradient for movement */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-10 blur-[100px] rounded-full"
                    style={{ background: 'conic-gradient(from 0deg, transparent, #a855f7, #ec4899, transparent)' }}>
                </div>

                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.04]"></div>
            </div>

            {/* Navigation */}
            <nav className="absolute top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
                <Link href="/digital-assets" className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300">
                    <i className="fas fa-arrow-left text-slate-400 group-hover:text-white group-hover:-translate-x-1 transition-all"></i>
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white">Shop</span>
                </Link>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Link href="/services" className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                            <span className="text-sm font-semibold text-slate-300 group-hover:text-white">Hire Custom Dev</span>
                        </Link>

                        {/* Professional Tooltip */}
                        <div className="absolute top-full right-0 mt-4 w-64 p-4 rounded-2xl bg-[#0f0f0f] border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50 pointer-events-none">
                            <div className="absolute -top-2 right-8 w-4 h-4 bg-[#0f0f0f] border-t border-l border-white/10 transform rotate-45"></div>
                            <div className="relative z-10 text-center">
                                <p className="text-xs font-bold text-white mb-1">Start Your Own Tech Company?</p>
                                <p className="text-[11px] text-slate-400 leading-relaxed">
                                    Don't just buy templates. <span className="text-purple-400">Hire me</span> to build your custom SaaS or Dream Project from scratch.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav >

            <main className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">

                {/* Product Hero */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-24 items-center animate-in fade-in slide-in-from-bottom-8 duration-700">

                    {/* Left Column: Carousel/Image */}
                    <div className="relative group perspective-1000">
                        <div className="absolute inset-0 bg-purple-600/20 blur-[80px] rounded-full opacity-60"></div>
                        <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-purple-900/30 transform transition-transform duration-700 hover:rotate-y-1 hover:scale-[1.01]">
                            <div className="aspect-[16/10] relative">
                                <Image
                                    src={asset.image}
                                    alt={asset.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-40"></div>
                            </div>
                        </div>

                        {/* Tech Stack Floating Badges */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-3 p-2 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-xl w-max max-w-[90%] overflow-x-auto no-scrollbar">
                            {asset.tech.map((t, i) => (
                                <div key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-slate-200 flex items-center gap-2 whitespace-nowrap">
                                    <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Key Info & CTA */}
                    <div className="lg:pl-8">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                                {asset.category}
                            </span>
                            <span className="flex items-center gap-1 text-xs font-bold text-green-400">
                                <i className="fas fa-check-circle"></i> Instant Download
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1]">{asset.title}</h1>
                        <p className="text-xl text-slate-300 mb-8 leading-relaxed font-light border-l-4 border-purple-500/20 pl-6">
                            {asset.description}
                        </p>

                        <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-md mb-8">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Price</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black text-white">{asset.price}</span>
                                        <span className="text-lg text-slate-500 line-through decoration-red-500 decoration-2 opacity-60">$999</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end text-right">
                                    <div className="flex text-yellow-500 text-sm mb-1">
                                        {[1, 2, 3, 4, 5].map(i => <i key={i} className="fas fa-star"></i>)}
                                    </div>
                                    <span className="text-xs text-slate-500 font-bold">5.0 (42 Reviews)</span>
                                </div>
                            </div>

                            <Link href={asset.buyLink || "#"} target="_blank" className="relative group w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white text-black font-black text-lg overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-1">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                <i className="fas fa-download"></i>
                                <span>Get Instant Access</span>
                            </Link>
                            <p className="text-center text-[10px] text-slate-500 mt-4 flex items-center justify-center gap-4 uppercase font-bold tracking-wider">
                                <span><i className="fas fa-shield-alt text-green-500 mr-1"></i> Secure Checkout</span>
                                <span><i className="fas fa-clock text-blue-500 mr-1"></i> Lifetime Access</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Detailed Description & Features */}
                <div className="grid lg:grid-cols-3 gap-12 pt-12 border-t border-white/10">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                                <i className="fas fa-align-left text-purple-500"></i> Description
                            </h2>
                            <div className="prose prose-invert prose-lg max-w-none 
                        prose-headings:text-white prose-p:text-slate-400 prose-li:text-slate-400 
                        prose-strong:text-purple-300 prose-a:text-blue-400 hover:prose-a:text-blue-300
                        prose-blockquote:border-l-purple-500 prose-blockquote:bg-white/5 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic
                        ">
                                <div dangerouslySetInnerHTML={{ __html: asset.longDescription }} />
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Features */}
                    <div className="space-y-8">
                        <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 sticky top-32">
                            <h3 className="text-xl font-bold text-white mb-6">What You Get</h3>
                            <ul className="space-y-4">
                                {[
                                    { text: "Source Code (GitHub)", icon: "fab fa-github" },
                                    { text: "Documentation PDF", icon: "fas fa-file-pdf" },
                                    { text: "Figma Assets", icon: "fab fa-figma" },
                                    { text: "Free Updates", icon: "fas fa-sync" }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-slate-300 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-purple-400">
                                            <i className={item.icon}></i>
                                        </div>
                                        <span className="text-sm font-semibold">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {asset.tech.map((t, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold text-slate-400">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Similar Products (Upsell) */}
                <section className="mt-24 pt-12 border-t border-white/10">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white">
                            <span className="text-purple-400">Frequently Bought</span> Together
                        </h2>
                        <Link href="/digital-assets" className="text-sm font-bold text-slate-500 hover:text-white transition-colors">
                            View Market <i className="fas fa-arrow-right ml-1"></i>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {assets.filter(a => a.slug !== asset.slug).slice(0, 3).map((item) => (
                            <Link href={`/digital-assets/${item.slug}`} key={item.id} className="group flex flex-col bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/40 hover:shadow-lg transition-all">
                                <div className="relative h-40 w-full overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/10">
                                        {item.price}
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-sm font-bold text-white mb-1 group-hover:text-purple-400 transition-colors line-clamp-1">{item.title}</h3>
                                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{item.description}</p>
                                    <div className="mt-auto flex items-center text-[10px] font-bold text-green-400">
                                        <i className="fas fa-bolt mr-1"></i> Instant Delivery
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Ultimate Persuasion / Risk Reversal */}
                <div className="mt-24 mb-12 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-purple-900/10 to-blue-900/10 border border-white/10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <i className="fas fa-certificate text-9xl text-white"></i>
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                            100% Satisfaction Guarantee
                        </h3>
                        <p className="text-slate-400 max-w-2xl mx-auto mb-8 text-lg">
                            We are so confident that this asset will save you <span className="text-white font-bold">100+ hours of development</span> that we offer a full money-back guarantee if the code is broken or doesn't match the description.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-slate-500 uppercase tracking-widest">
                            <span className="flex items-center gap-2"><i className="fas fa-lock text-green-500"></i> Secure Payment</span>
                            <span className="flex items-center gap-2"><i className="fas fa-headset text-blue-500"></i> 24/7 Support</span>
                            <span className="flex items-center gap-2"><i className="fas fa-infinity text-purple-500"></i> Lifetime Updates</span>
                        </div>
                    </div>
                </div>

            </main>

        </div >
    );
}
