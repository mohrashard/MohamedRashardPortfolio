import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { getAllPostIds, getPostData } from '../../../lib/posts';
import ScrollReveal from '../components/ScrollReveal';
import Navbar from '../../components/Navbar';

export async function generateStaticParams() {
    const paths = getAllPostIds();
    return paths.map((path) => path.params);
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const postData = await getPostData(slug);

    if (!postData) {
        return { title: "Article Not Found" };
    }

    const title = postData.title; // Using template
    const canonicalUrl = `https://mr2labs.com/blog/${slug}`;

    return {
        title: title,
        description: postData.excerpt || postData.description,
        keywords: [postData.category, "Software Engineering", "Tech Blog", "Sri Lanka", "Tutorial"],
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${title} | Mr² Labs`,
            description: postData.excerpt || postData.description,
            url: canonicalUrl,
            images: [
                {
                    url: postData.image || '/services-tech.png',
                    width: 1200,
                    height: 630,
                    alt: postData.title,
                }
            ],
            type: 'article',
            authors: ['Mohamed Rashard'],
            publishedTime: postData.date,
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | Mr² Labs`,
            description: postData.excerpt || postData.description,
            images: [postData.image || '/services-tech.png'],
        },
    };
}

export default async function Post({ params }) {
    const { slug } = await params;
    let postData;

    try {
        postData = await getPostData(slug);
    } catch (error) {
        notFound();
    }

    // Structured Data (Article Schema)
    const jsonLdArticle = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": postData.title,
        "image": postData.image ? `https://mr2labs.com${postData.image}` : "https://mr2labs.com/services-tech.png",
        "author": {
            "@type": "Person",
            "name": "Mohamed Rashard Rizmi",
            "url": "https://mr2labs.com/"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "logo": {
                "@type": "ImageObject",
                "url": "https://mr2labs.com/mr-squared-logo.png"
            }
        },
        "datePublished": postData.date,
        "description": postData.excerpt || postData.description,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://mr2labs.com/blog/${slug}`
        }
    };

    // FAQ Schema — dynamic from post frontmatter
    const jsonLdFaq = postData.faqs && Array.isArray(postData.faqs) ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": postData.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    } : null;

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-blue-500/30 overflow-x-hidden">

            {/* Structured Data Script */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
            />

            {/* FAQ Schema — Dynamic from postData.faqs */}
            {jsonLdFaq && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
                />
            )}

            {/* Background Decoration - Matched to Home Page */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
                <Image
                    src="/blog-hero-bg-v2.png"
                    alt=""
                    fill
                    priority
                    quality={90}
                    className="object-cover object-center opacity-60"
                    aria-hidden="true"
                />
                {/* Darken the edges so content stays readable */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />

                {/* Structural Engineering Blueprint Grid Lines */}
                <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_60%,transparent_100%)]" />

                {/* Concentric Ring Accents */}
                <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/[0.025] rounded-full pointer-events-none z-0" />
                <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/[0.035] border-dashed rounded-full pointer-events-none z-0" />
            </div>

            {/* Navigation */}
            <Navbar position="absolute" />

            <main className="relative z-10 pt-24 md:pt-48 pb-20 px-6 md:px-12 max-w-4xl mx-auto">

                {/* Header / Meta */}
                <header className="mb-12 md:mb-54 text-center flex flex-col items-center">
                    <ScrollReveal delay={0}>
                        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse"></span>
                            <span className="text-blue-300 text-xs font-bold uppercase tracking-widest">{postData.category || "Technology"}</span>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-300 mb-6 md:mb-8 leading-[1.1] tracking-tighter drop-shadow-sm max-w-4xl mx-auto px-2">
                            {postData.title}
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-[9px] sm:text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-widest px-4">
                            <span className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                {new Date(postData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span className="text-slate-700 hidden sm:inline">•</span>
                            <span className="flex items-center gap-1.5">
                                5 min read
                            </span>
                        </div>
                    </ScrollReveal>

                    {/* Scroll to Read Pill */}
                    <ScrollReveal delay={0.3}>
                        <div className="flex justify-center mt-12 mb-5">
                            <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm text-blue-300 text-[10px] font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(0,102,255,0.15)]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse"></span>
                                Scroll to read
                                <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </div>
                        </div>
                    </ScrollReveal>

                </header>


                {/* Main Post Container - Glassmorphic Sheet */}
                <div className="relative rounded-[2.5rem] bg-[#00102a]/40 backdrop-blur-[40px] border border-blue-500/20 shadow-[0_0_80px_rgba(0,102,255,0.07)] p-6 md:p-10 lg:p-14 mb-20 overflow-hidden">
                    {/* Ambient glow inside the post card */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/15 blur-[120px] rounded-full pointer-events-none -mt-40 -mr-40" />

                    {/* Featured Image - Optimized */}
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-16 group">
                        <Image
                            src={postData.image || '/services-tech.png'}
                            alt={postData.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 1200px) 100vw, 1200px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-20"></div>
                    </div>

                    {/* Content Body */}
                    <article className="prose prose-invert prose-lg md:prose-xl max-w-none 
                prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight prose-headings:leading-tight
                prose-p:text-slate-300 prose-p:leading-relaxed prose-p:font-light
                prose-strong:text-white prose-strong:font-bold
                prose-a:text-[var(--accent)] hover:prose-a:text-cyan-300 prose-a:transition-colors prose-a:no-underline hover:prose-a:underline
                prose-ul:text-slate-300 prose-li:marker:text-[var(--primary)]
                prose-blockquote:border-l-[var(--primary)] prose-blockquote:bg-white/[0.02] prose-blockquote:p-8 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-slate-200 prose-blockquote:shadow-inner
                prose-img:rounded-[2rem] prose-img:border prose-img:border-white/10 prose-img:shadow-2xl
                prose-code:text-[var(--accent)] prose-code:bg-white/[0.03] prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-code:font-mono prose-code:text-sm
                prose-pre:bg-[#050505]/80 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:backdrop-blur-md prose-pre:shadow-[0_20px_40px_rgba(0,0,0,0.5)]
                ">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                p: ({ node, ...props }) => <ScrollReveal><p {...props} /></ScrollReveal>,
                                h2: ({ node, ...props }) => <ScrollReveal><h2 {...props} /></ScrollReveal>,
                                h3: ({ node, ...props }) => <ScrollReveal><h3 {...props} /></ScrollReveal>,
                                h4: ({ node, ...props }) => <ScrollReveal><h4 {...props} /></ScrollReveal>,
                                ul: ({ node, ...props }) => <ScrollReveal><ul {...props} /></ScrollReveal>,
                                ol: ({ node, ...props }) => <ScrollReveal><ol {...props} /></ScrollReveal>,
                                blockquote: ({ node, ...props }) => <ScrollReveal><blockquote {...props} /></ScrollReveal>,
                                pre: ({ node, ...props }) => <ScrollReveal><pre {...props} /></ScrollReveal>,
                                img: ({ node, ...props }) => <ScrollReveal><img {...props} /></ScrollReveal>,
                                div: ({ node, className, children, ...props }) => {
                                    if (className === 'cta-banner') {
                                        return (
                                            <ScrollReveal>
                                                <div className="not-prose my-16 relative overflow-hidden rounded-[2rem] border border-[var(--primary)]/30 bg-[#050505]/80 backdrop-blur-xl p-10 md:p-14 text-center shadow-[0_0_60px_-10px_rgba(0,102,255,0.2)]" {...props}>
                                                    {/* Glow accents */}
                                                    <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-96 -translate-x-1/2 rounded-full bg-[var(--primary)]/20 blur-[100px]" />
                                                    <div className="pointer-events-none absolute -bottom-12 right-0 h-32 w-64 rounded-full bg-[var(--accent)]/15 blur-[80px]" />

                                                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5">
                                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 m-0">Free Technical Diagnostic</p>
                                                    </div>

                                                    <h2 className="relative mb-6 text-3xl font-black text-white md:text-5xl tracking-tighter">
                                                        Building an AI Product with Next.js?
                                                    </h2>
                                                    <p className="relative mx-auto mb-10 max-w-xl text-lg text-slate-400 font-light leading-relaxed">
                                                        Get a free technical estimate and 72-hour architecture blueprint for your exact idea.
                                                    </p>
                                                    <a
                                                        href="/cost-to-build"
                                                        className="relative inline-flex items-center gap-3 rounded-xl bg-[var(--primary)] px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_0_30px_rgba(0,102,255,0.4)] transition-all duration-300 hover:bg-[#0055d4] hover:shadow-[0_0_45px_rgba(0,102,255,0.6)] hover:-translate-y-1 active:scale-95"
                                                    >
                                                        Calculate Build Cost
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </ScrollReveal>
                                        );
                                    }
                                    return <div className={className} {...props}>{children}</div>;
                                }
                            }}
                        >
                            {postData.contentHtml ? postData.contentHtml.replace(/—/g, ' ') : ''}
                        </ReactMarkdown>
                    </article>

                    {/* Author Bio (SEO Trust Signal) */}
                    <div className="mt-20 p-8 rounded-[2rem] bg-[#050b14]/50 border border-[var(--primary)]/20 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 shadow-inner">
                        <div className="relative shrink-0 w-20 h-20 rounded-3xl overflow-hidden shadow-[0_0_25px_rgba(0,102,255,0.25)] border border-white/10 ring-2 ring-[var(--primary)]/20">
                            <Image src="/mr-squared-logo.png" alt="Mr² Labs" fill className="object-cover" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white mb-2">Written by <span className="text-[var(--accent)]">Mohamed Rashard</span></h3>
                            <p className="text-base text-slate-300 leading-relaxed font-light">
                                Founder & Lead Engineer at <strong className="text-white font-bold">Mr² Labs</strong>, based in Colombo, Sri Lanka. We architect and build high-performance SaaS applications and AI-driven systems for visionary founders and businesses.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Visible FAQ Section */}
                {postData.faqs && postData.faqs.length > 0 && (
                    <section className="mt-20">
                        <div className="flex items-center gap-4 mb-10">
                            <h2 className="text-3xl md:text-4xl font-black text-white">Frequently Asked <span className="text-blue-400">Questions</span></h2>
                            <div className="flex-grow h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                        </div>
                        <div className="space-y-4">
                            {postData.faqs.map((faq, index) => (
                                <details key={index} className="group relative rounded-[2rem] bg-[#00102a]/40 backdrop-blur-[20px] border border-blue-500/20 overflow-hidden transition-all duration-300 hover:bg-[#00102a]/60 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(0,102,255,0.1)]">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none -mt-16 -mr-16" />
                                    <summary className="relative flex items-center justify-between p-6 md:p-8 cursor-pointer list-none text-lg font-bold text-slate-200 group-open:text-blue-400">
                                        <span className="pr-6">{faq.question}</span>
                                        <span className="flex-shrink-0 w-8 h-8 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center transition-transform duration-300 group-open:rotate-180 group-hover:bg-blue-500/20">
                                            <i className="fas fa-chevron-down text-xs text-blue-400"></i>
                                        </span>
                                    </summary>
                                    <div className="relative px-6 md:px-8 pb-6 md:pb-8 text-slate-400 leading-relaxed text-base border-t border-blue-500/10 pt-6">
                                        {faq.answer ? faq.answer.replace(/—/g, ' ') : ''}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </section>
                )}

                {/* Global Lead Capture CTA */}
                <section className="mt-20 p-8 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] -mr-48 -mt-48 transition-colors group-hover:bg-blue-600/10"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/5 rounded-full blur-[100px] -ml-32 -mb-32"></div>

                    <div className="relative z-10 text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                            Got an app idea you want to build fast?
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl mb-10 leading-relaxed">
                            See what it costs to build vs what Mr² Labs charges for a 72-hour sprint.
                            <span className="block mt-2 text-blue-400 font-bold">Free estimate, no call needed.</span>
                        </p>
                        <div className="flex flex-col items-center gap-6">
                            <Link
                                href="/cost-to-build"
                                className="w-full sm:w-auto px-12 py-5 rounded-full bg-blue-600 text-white font-extrabold text-xl hover:bg-blue-500 transition-all duration-300 shadow-[0_15px_35px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_20px_45px_-10px_rgba(37,99,235,0.6)] transform hover:-translate-y-1"
                            >
                                Get My Free Estimate →
                            </Link>
                            <a
                                href="https://calendly.com/mohrashard/30min"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-500 hover:text-white transition-all text-sm font-bold uppercase tracking-widest border-b border-white/10 hover:border-blue-500 pb-1"
                            >
                                Or book a free 15-min strategy call
                            </a>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
