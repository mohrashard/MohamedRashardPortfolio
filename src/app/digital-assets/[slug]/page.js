import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { assets } from '../data';
import Navbar from '../../components/Navbar';
import AnimatedSection from '../../components/AnimatedSection';

const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

const filterText = (text) => {
    if (!text || typeof text !== 'string') return text;
    let filtered = text.replace(/[\u2013\u2014]/g, '-');
    filtered = filtered.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '');
    return filtered;
};

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
        "image": `https://mr2labs.com${asset.image}`,
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
        alternates: {
            canonical: `https://mr2labs.com/digital-assets/${asset.slug}`,
        },
        openGraph: {
            title: asset.title,
            description: asset.description,
            url: `https://mr2labs.com/digital-assets/${asset.slug}`,
            images: [asset.image],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: asset.title,
            description: asset.description,
            images: [asset.image],
        }
    };
}

export default async function ProductPage({ params }) {
    const { slug } = await params;
    const asset = assets.find((p) => p.slug === slug);

    if (!asset) {
        notFound();
    }

    const productSchema = JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "SoftwareApplication",
        "name": asset.title,
        "image": `https://mr2labs.com${asset.image}`,
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

    const priceNum = parseFloat(asset.price.replace(/[^0-9.]/g, '')) || 0;
    const originalPriceStr = asset.originalPrice || "$999";
    const originalPriceNum = parseFloat(originalPriceStr.replace(/[^0-9.]/g, '')) || 0;
    const saveAmount = Math.max(0, originalPriceNum - priceNum);
    const savePercentage = originalPriceNum > 0 ? Math.round((saveAmount / originalPriceNum) * 100) : 0;

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-purple-500/30 overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: productSchema }}
            />

            {/* Background Decoration: Gradient Vibes */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
                <Image
                    src="/digital-assets-bg.png"
                    alt="Background"
                    fill
                    priority
                    quality={100}
                    className="object-cover object-center opacity-60"
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/80" />
            </div>

            {/* Navigation */}
            <Navbar position="absolute" />

            <main className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                <AnimatedSection delay={0} slideDirection="left" className="mt-18 mb-6">
                    <Link href="/digital-assets" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all group" style={fontLabel}>
                        <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i> BACK TO MARKETPLACE
                    </Link>
                </AnimatedSection>

                {/* Product Hero - High Conversion Layout (Psychology/Bezos Style) */}
                <AnimatedSection delay={0.1} className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-24 items-start">

                    {/* Left Column: Product Image (lg:col-span-7) */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <div className="relative group perspective-1000 w-full">
                            <div className="absolute inset-0 bg-[var(--primary)]/20 blur-[80px] rounded-full opacity-60"></div>
                            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-blue-900/30 transform transition-transform duration-700 hover:scale-[1.01]">
                                <div className="aspect-[16/10] relative w-full">
                                    <Image
                                        src={asset.image}
                                        alt={asset.title}
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 60vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-40"></div>
                                </div>
                            </div>
                        </div>

                        {/* Tech Stack Bar (Visual Evidence) */}
                        <div className="flex flex-wrap items-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 w-full backdrop-blur-sm">
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest" style={fontLabel}>Built with</span>
                            <div className="w-px h-4 bg-white/20"></div>
                            {asset.tech.map((t, i) => (
                                <div key={i} className="px-3 py-1.5 rounded-lg bg-[#0a0a0a] border border-white/5 text-[11px] font-bold text-slate-200 flex items-center gap-2" style={fontLabel}>
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_rgba(56,189,248,0.8)]"></div>
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Buy Box (lg:col-span-5) */}
                    <div className="lg:col-span-5 flex flex-col justify-start">
                        {/* Breadcrumb / Category */}
                        <div className="flex items-center gap-3 mb-4" style={fontLabel}>
                            <span className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest bg-[var(--primary)]/10 px-3 py-1 rounded-full border border-[var(--primary)]/20 shadow-[0_0_15px_rgba(0,102,255,0.2)]">
                                {asset.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-[1.1] tracking-tight" style={fontHeadline}>
                            {filterText(asset.title)}
                        </h1>

                        {/* Social Proof (Psychology: Authority & Consensus) */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex text-yellow-500 text-sm">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                            <a href="#reviews" className="text-sm text-slate-400 hover:text-white transition-colors font-bold" style={fontBody}>
                                (4.9/5 Average Rating)
                            </a>
                        </div>

                        {/* Value Proposition (Psychology: Clear Benefit) */}
                        <p className="text-base text-slate-300 mb-8 leading-relaxed font-light" style={fontBody}>
                            {filterText(asset.description)}
                        </p>

                        {/* The "Buy Box" (Psychology: Scarcity, Price Anchoring, Frictionless CTA) */}
                        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden">
                            {/* Decorative glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/20 blur-[50px] -mr-10 -mt-10 pointer-events-none"></div>

                            {/* Price Anchor */}
                            <div className="flex flex-col mb-6">
                                {asset.originalPrice && (
                                    <div className="text-emerald-400 text-sm font-black uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <i className="fas fa-tags"></i> Limited Time Offer (Save {savePercentage}%)
                                    </div>
                                )}
                                <div className="flex items-baseline gap-4">
                                    <span className="text-6xl font-black text-white tracking-tighter">{asset.price}</span>
                                    {asset.originalPrice && (
                                        <div className="flex flex-col">
                                            <span className="text-xl text-slate-500 line-through decoration-red-500/70 decoration-2 font-bold">{originalPriceStr}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col gap-3 mb-6">
                                <Link href={asset.buyLink || "#"} target="_blank" className="relative group w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-[var(--primary)] hover:bg-[#0055d4] text-white font-black text-lg tracking-wide overflow-hidden shadow-[0_0_30px_rgba(0,102,255,0.4)] hover:shadow-[0_0_50px_rgba(0,102,255,0.6)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95" style={fontHeadline}>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    <i className="fas fa-unlock-alt"></i>
                                    <span>Get Instant Access Now</span>
                                </Link>

                                {asset.productLink && (
                                    <Link href={asset.productLink} target="_blank" className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all text-sm font-bold bg-white/5">
                                        <span>Read More on Whop</span>
                                        <i className="fas fa-external-link-alt text-xs opacity-70"></i>
                                    </Link>
                                )}
                            </div>

                            {/* Trust Signals & Micro-copy */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-center gap-2 text-sm text-emerald-400 font-bold" style={fontBody}>
                                    <i className="fas fa-bolt"></i> Delivered instantly to your email
                                </div>
                                <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 font-bold uppercase tracking-wider" style={fontLabel}>
                                    <span className="flex items-center gap-1.5"><i className="fas fa-lock"></i> Secure Checkout</span>
                                    <span className="flex items-center gap-1.5"><i className="fas fa-sync"></i> Free Updates</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Detailed Description & Features */}
                <AnimatedSection delay={0.2} className="grid lg:grid-cols-12 gap-12 pt-16 border-t border-white/10">
                    
                    {/* Main Content (lg:col-span-8) */}
                    <div className="lg:col-span-8 space-y-16">
                        <section>
                            <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3" style={fontHeadline}>
                                <i className="fas fa-chart-line text-[var(--accent)]"></i> Why Choose This?
                            </h2>
                            <div className="prose prose-invert prose-lg max-w-none 
                                prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300 
                                prose-strong:text-cyan-300 prose-a:text-[var(--primary)] hover:prose-a:text-[#0055d4]
                                prose-blockquote:border-l-[var(--primary)] prose-blockquote:bg-white/5 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic
                                leading-relaxed
                                " style={fontBody}>
                                <div dangerouslySetInnerHTML={{ __html: filterText(asset.longDescription) }} />
                            </div>
                        </section>

                        {/* Reviews Section */}
                        <section id="reviews" className="pt-12 border-t border-white/10">
                            <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3" style={fontHeadline}>
                                <i className="fas fa-heart text-red-500"></i> Loved by Developers
                            </h3>
                            <div className="p-10 rounded-3xl bg-white/5 border border-white/10 text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <i className="fas fa-quote-right text-8xl"></i>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-center text-yellow-500 text-xl gap-1 mb-4">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">Be the first to leave a review!</h4>
                                <p className="text-slate-400 text-sm">Join the community of developers who have leveled up their workflow.</p>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Features (lg:col-span-4) */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 sticky top-32 shadow-2xl">
                            <h3 className="text-xl font-black text-white mb-6" style={fontHeadline}>What's Included</h3>
                            <ul className="space-y-4">
                                {(asset.whatYouGet || [
                                    { text: "Production-Ready Source Code", icon: "fas fa-code" },
                                    { text: "Comprehensive Documentation", icon: "fas fa-book-open" },
                                    { text: "Lifetime Free Updates", icon: "fas fa-sync" },
                                    { text: "Premium Support Access", icon: "fas fa-headset" }
                                ]).map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 text-slate-300 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="w-10 h-10 shrink-0 rounded-full bg-black/50 flex items-center justify-center text-[var(--accent)] border border-white/5">
                                            <i className={item.icon}></i>
                                        </div>
                                        <span className="text-sm font-bold leading-tight mt-0.5" style={fontBody}>{filterText(item.text)}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4" style={fontLabel}>Technical Details</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                                        <span className="text-slate-400">Framework</span>
                                        <span className="text-white font-bold">Next.js 15</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                                        <span className="text-slate-400">Styling</span>
                                        <span className="text-white font-bold">Tailwind CSS</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm pb-2">
                                        <span className="text-slate-400">License</span>
                                        <span className="text-white font-bold">Personal & Commercial</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </AnimatedSection>

                {/* Risk Reversal / Money Back Guarantee (Psychology) */}
                <AnimatedSection delay={0.1} className="mt-24 p-10 md:p-14 rounded-[2.5rem] bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 blur-[100px] pointer-events-none"></div>
                    
                    <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.3)]">
                        <i className="fas fa-award text-5xl md:text-6xl text-white"></i>
                    </div>
                    
                    <div className="flex-1 text-center md:text-left relative z-10">
                        <h3 className="text-2xl md:text-4xl font-black text-white mb-4" style={fontHeadline}>
                            100% Satisfaction Guarantee
                        </h3>
                        <p className="text-slate-300 mb-6 text-lg" style={fontBody}>
                            If this asset doesn't save you at least <strong className="text-white">100 hours of development time</strong> or fails to meet your expectations, we'll refund your purchase in full. No questions asked.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-bold text-slate-400 uppercase tracking-widest" style={fontLabel}>
                            <span className="flex items-center gap-2"><i className="fas fa-lock text-emerald-500"></i> SSL Secure Payment</span>
                            <span className="flex items-center gap-2"><i className="fas fa-undo text-blue-500"></i> 14-Day Refund</span>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Similar Products (Upsell) */}
                <AnimatedSection component="section" delay={0.2} className="mt-24 pt-12 border-t border-white/10">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl md:text-3xl font-black text-white" style={fontHeadline}>
                            <span className="text-[var(--primary)]">Frequently Bought</span> Together
                        </h2>
                        <Link href="/digital-assets" className="text-sm font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                            View Market <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {assets.filter(a => a.slug !== asset.slug).slice(0, 3).map((item) => (
                            <Link href={`/digital-assets/${item.slug}`} key={item.id} className="group flex flex-col bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden hover:border-[var(--primary)]/50 hover:shadow-[0_0_30px_rgba(0,102,255,0.15)] transition-all duration-500">
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80"></div>
                                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-xs font-black text-white border border-white/10 shadow-lg">
                                        {item.price}
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-lg font-black text-white group-hover:text-[var(--accent)] transition-colors line-clamp-1" style={fontHeadline}>{filterText(item.title)}</h3>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <p className="text-sm text-slate-400 line-clamp-2 mb-6 font-light" style={fontBody}>{filterText(item.description)}</p>
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex items-center text-xs font-bold text-emerald-400">
                                            <i className="fas fa-bolt mr-2"></i> Instant Access
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                                            <i className="fas fa-arrow-right text-xs"></i>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </AnimatedSection>

            </main>

        </div>
    );
}
