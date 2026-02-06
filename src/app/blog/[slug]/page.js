import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { getAllPostIds, getPostData } from '../../../lib/posts';

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
    const canonicalUrl = `https://www.mohamedrashard.dev/blog/${slug}`;

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
        "image": postData.image ? `https://www.mohamedrashard.dev${postData.image}` : "https://www.mohamedrashard.dev/services-tech.png",
        "author": {
            "@type": "Person",
            "name": "Mohamed Rashard Rizmi",
            "url": "https://www.mohamedrashard.dev/"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.mohamedrashard.dev/mr-squared-logo.png"
            }
        },
        "datePublished": postData.date,
        "description": postData.excerpt || postData.description,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.mohamedrashard.dev/blog/${slug}`
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-blue-500/30 overflow-x-hidden">

            {/* Structured Data Script */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
            />

            {/* Background Decoration - Optimized */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
                <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse transform-gpu will-change-transform"></div>
                <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-700 transform-gpu will-change-transform"></div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]"></div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto w-full transition-all duration-300">
                <Link href="/blog" className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <i className="fas fa-arrow-left text-slate-400 group-hover:text-white group-hover:-translate-x-1 transition-all"></i>
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white">All Articles</span>
                </Link>

                <div className="flex items-center gap-4">
                    <Link href="/labs" className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all duration-300">
                        <span className="text-sm font-semibold text-slate-300 group-hover:text-white">Labs</span>
                        <i className="fas fa-flask text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all"></i>
                    </Link>

                    <div className="relative group">
                        <Link href="/services" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600/20 border border-blue-500/30 backdrop-blur-md hover:bg-blue-600 hover:text-white transition-all duration-300">
                            <span className="text-sm font-bold text-blue-400 group-hover:text-white">Build With Me</span>
                        </Link>
                        {/* Tooltip */}
                        <div className="absolute top-full right-0 mt-4 w-64 p-4 rounded-2xl bg-[#0f0f0f] border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50 pointer-events-none">
                            <div className="absolute -top-2 right-8 w-4 h-4 bg-[#0f0f0f] border-t border-l border-white/10 transform rotate-45"></div>
                            <div className="relative z-10 text-center">
                                <p className="text-xs font-bold text-white mb-1">Let's Build Something Great</p>
                                <p className="text-[11px] text-slate-400 leading-relaxed">
                                    Ready to turn this idea into a reality? <span className="text-blue-400">Hire me</span> to engineer your next big project.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">

                {/* Header / Meta */}
                <header className="mb-12 text-center">
                    <div className="relative w-24 h-24 mx-auto mb-6 hover:scale-110 transition-transform duration-500 rounded-3xl overflow-hidden border border-blue-500/30 shadow-[0_0_35px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)]">
                        <Image src="/mr-squared-logo.png" alt="Mr² Labs" fill className="object-cover" />
                    </div>
                    <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
                        <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-blue-400">
                            {postData.category || "Technology"}
                        </span>
                        <span>{String(postData.date)}</span>
                        <span>5 min read</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                        {postData.title}
                    </h1>
                </header>

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
                <article className="prose prose-invert prose-lg max-w-none 
                prose-headings:text-white prose-headings:font-bold prose-headings:leading-tight
                prose-p:text-slate-300 prose-p:leading-relaxed prose-p:font-light
                prose-strong:text-blue-400 prose-a:text-blue-400 hover:prose-a:text-blue-300
                prose-ul:text-slate-300 prose-li:marker:text-blue-500
                prose-blockquote:border-l-blue-500 prose-blockquote:bg-white/5 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-white
                prose-img:rounded-2xl prose-img:border prose-img:border-white/10
                prose-code:text-purple-300 prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl
                ">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                    >
                        {postData.contentHtml}
                    </ReactMarkdown>
                </article>

                {/* Author Bio (SEO Trust Signal) */}
                <div className="mt-20 p-8 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-6">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                        <Image src="/mr-squared-logo.png" alt="Mr² Labs" fill className="object-cover" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1">Written by <span className="text-blue-400">Mohamed Rashard</span></h3>
                        <p className="text-sm text-slate-400">
                            Software Engineer & AI Specialist based in <strong className="text-slate-300">Colombo, Sri Lanka</strong>. Passionate about building scalable web applications and helping businesses grow with technology.
                        </p>
                    </div>
                </div>

            </main>
        </div>
    );
}
