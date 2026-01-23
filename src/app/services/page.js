import Link from 'next/link';
import Image from 'next/image';
import { projectsData } from '../digital-assets/data';

export const metadata = {
    title: "Services - AI & Software Engineering",
    description: "Expert Software Development & AI Solutions by Mr² Labs (Colombo, Sri Lanka). We build scalable Web Apps, Mobile Solutions, and Custom AI Systems for global businesses.",
    keywords: [
        "Mr² Labs",
        "Mohamed Rashard Rizmi",
        "Software Company Colombo",
        "AI Engineering Sri Lanka",
        "Custom Web App Development",
        "SaaS Development",
        "Mobile App Developer",
        "Next.js Expert",
        "Full Stack Engineer",
        "MVP Development",
        "Freelance Software Engineer Sri Lanka"
    ],
    openGraph: {
        title: "Services - AI & Software Engineering | Mr² Labs",
        description: "Transform your business with high-performance Web Apps and AI Solutions from Mr² Labs. Led by Mohamed Rashard Rizmi.",
        url: "https://www.mohamedrashard.dev/services",
        type: "website",
        images: [
            {
                url: "/mr-squared-logo.png",
                width: 1200,
                height: 630,
                alt: "Mr² Labs Services",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Services - AI & Software Engineering | Mr² Labs",
        description: "Expert Software Engineering Services in Sri Lanka.",
        images: ["/mr-squared-logo.png"],
    },
    alternates: {
        canonical: "https://www.mohamedrashard.dev/services",
    },
};

export default function Services() {
    // Structured Data for SEO (Service + LocalBusiness)
    const jsonLdService = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Mr² Labs Software Engineering",
        "image": "https://www.mohamedrashard.dev/mr-squared-logo.png",
        "url": "https://www.mohamedrashard.dev/services",
        "telephone": "",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Colombo",
            "addressCountry": "Sri Lanka"
        },
        "priceRange": "$$",
        "description": "Professional Software Development, AI Integration, and Mobile App Development services.",
        "founder": {
            "@type": "Person",
            "name": "Mohamed Rashard Rizmi"
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-blue-500/30 overflow-x-hidden">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
            />

            {/* Background Decoration: Ocean Vibe (Darker & Optimized) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden will-change-transform">
                {/* Deep Ocean Gradient Base - Darkened */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#050505] to-[#0a1120] opacity-95"></div>

                {/* Ambient Deep Sea Glows - Optimized with Hardware Acceleration */}
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[80px] opacity-40 transform-gpu"></div>
                <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[80px] opacity-30 transform-gpu"></div>

                {/* Subtle Surface Caustics - Static for Performance */}
                <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[60px] opacity-20"></div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]"></div>
            </div>

            {/* Top Navigation */}
            <nav className="absolute top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
                <Link href="/" className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300">
                    <i className="fas fa-home text-slate-400 group-hover:text-white transition-all"></i>
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white">Home</span>
                </Link>

                <div className="flex items-center gap-4">
                    <Link href="/blog" className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(147,51,234,0.2)] transition-all duration-300">
                        <span className="text-sm font-semibold text-slate-300 group-hover:text-white">Read Blogs</span>
                        <i className="fas fa-book-open text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all"></i>
                    </Link>

                    <Link href="/labs" className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-white/10 backdrop-blur-md hover:border-white/20 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all duration-300">
                        <span className="text-sm font-semibold text-slate-300 group-hover:text-white">Visit Labs</span>
                        <i className="fas fa-flask text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all"></i>
                    </Link>
                </div>
            </nav>

            <main className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">

                {/* Hero Section */}
                <header className="mb-24 text-center">
                    <div className="relative w-24 h-24 mx-auto mb-6 hover:scale-105 transition-transform duration-500 rounded-3xl overflow-hidden border border-blue-500/30 shadow-[0_0_35px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)]">
                        <Image src="/mr-squared-logo.png" alt="Mr² Labs" fill className="object-cover" />
                    </div>
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest">
                        Engineering Excellence
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-tight">
                        Architecting the <br />
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">Future of Your Business</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light mb-12">
                        I specialize in building scalable, high-performance <strong className="text-white">Web Applications</strong>, <strong className="text-white">AI Solutions</strong>, and <strong className="text-white">Mobile Apps</strong>. Based in <strong className="text-white">Colombo, Sri Lanka</strong>, I deliver world-class engineering to global clients.
                    </p>
                    <a href="mailto:mohrashard@gmail.com" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 text-white font-bold uppercase tracking-wider hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all">
                        <i className="fas fa-rocket"></i>
                        <span>Start Your Project</span>
                    </a>
                </header>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-24">

                    {/* Web Development */}
                    <div className="group relative bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-12 overflow-hidden hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <i className="fas fa-laptop-code text-9xl text-blue-500"></i>
                        </div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-8 border border-blue-500/10">
                                <i className="fas fa-globe text-3xl"></i>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Custom Web Development</h2>
                            <p className="text-slate-400 leading-relaxed mb-8">
                                Scalable, SEO-optimized web applications built with **Next.js** and **React**. I engineer robust backends, interactive frontends, and seamless user experiences tailored to your brand.
                            </p>
                            <ul className="mb-8 space-y-3">
                                {['SaaS Platforms', 'E-commerce Solutions', 'Enterprise Dashboards', 'Progressive Web Apps (PWA)'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                        <i className="fas fa-check-circle text-blue-500"></i> {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-2 text-xs font-mono text-blue-400/80">
                                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/10">React</span>
                                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/10">Next.js</span>
                                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/10">Node.js</span>
                            </div>
                        </div>
                    </div>

                    {/* AI Integration */}
                    <div className="group relative bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-12 overflow-hidden hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-500">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <i className="fas fa-brain text-9xl text-purple-500"></i>
                        </div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-8 border border-purple-500/10">
                                <i className="fas fa-robot text-3xl"></i>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">AI & Machine Learning</h2>
                            <p className="text-slate-400 leading-relaxed mb-8">
                                Integrate intelligence into your business. From **Chatbots** to **Predictive Analytics**, I leverage models like GPT-4, Llama, and TensorFlow to automate workflows and unlock insights.
                            </p>
                            <ul className="mb-8 space-y-3">
                                {['Custom Chatbots', 'Automated Workflows', 'Data Analysis & Prediction', 'NLP Integration'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                        <i className="fas fa-check-circle text-purple-500"></i> {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-2 text-xs font-mono text-purple-400/80">
                                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/10">Python</span>
                                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/10">OpenAI API</span>
                                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/10">TensorFlow</span>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Development */}
                    <div className="group relative bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-12 overflow-hidden hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <i className="fas fa-mobile-alt text-9xl text-emerald-500"></i>
                        </div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-8 border border-emerald-500/10">
                                <i className="fas fa-mobile-screen text-3xl"></i>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Mobile App Development</h2>
                            <p className="text-slate-400 leading-relaxed mb-8">
                                Cross-platform mobile applications built with **React Native**. I deliver native-performance apps for iOS and Android with a single, efficient codebase.
                            </p>
                            <ul className="mb-8 space-y-3">
                                {['iOS & Android Apps', 'Cross-Platform Solutions', 'App Store Deployment', 'Responsive UI/UX'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                        <i className="fas fa-check-circle text-emerald-500"></i> {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-2 text-xs font-mono text-emerald-400/80">
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10">React Native</span>
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10">Expo</span>
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10">Firebase</span>
                            </div>
                        </div>
                    </div>

                    {/* Frontend & Portfolios */}
                    <div className="group relative bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-12 overflow-hidden hover:border-pink-500/30 hover:shadow-2xl hover:shadow-pink-900/10 transition-all duration-500">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <i className="fas fa-paint-brush text-9xl text-pink-500"></i>
                        </div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-400 mb-8 border border-pink-500/10">
                                <i className="fas fa-layer-group text-3xl"></i>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Frontend & Portfolios</h2>
                            <p className="text-slate-400 leading-relaxed mb-8">
                                Stunning, high-converting **Landing Pages**, **Portfolios**, and **Personal Websites**. I build pixel-perfect, responsive interfaces that showcase your brand and work to the world.
                            </p>
                            <ul className="mb-8 space-y-3">
                                {['Personal Portfolios', 'Business Landing Pages', 'Marketing Websites', 'Interactive UI/UX'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                        <i className="fas fa-check-circle text-pink-500"></i> {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-2 text-xs font-mono text-pink-400/80">
                                <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/10">Tailwind CSS</span>
                                <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/10">Framer Motion</span>
                                <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/10">React</span>
                            </div>
                        </div>
                    </div>

                    {/* Technical Consulting */}
                    <div className="group relative bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-12 overflow-hidden hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-500 md:col-span-2 lg:col-span-2">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <i className="fas fa-lightbulb text-9xl text-amber-500"></i>
                        </div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-8 border border-amber-500/10">
                                <i className="fas fa-comments text-3xl"></i>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Technical Consulting & Project Feasibility</h2>
                            <p className="text-slate-400 leading-relaxed mb-8 max-w-3xl">
                                Need expert advice before you build? I provide comprehensive **Technical Consulting** to help you validate your ideas, choose the right tech stack (MERN, SQL, etc.), and plan your architecture. Perfect for startups and businesses needing a roadmap.
                            </p>
                            <div className="grid md:grid-cols-2 gap-8">
                                <ul className="space-y-3">
                                    {['Project Feasibility Analysis', 'Tech Stack Selection', 'Architecture Planning', 'Code Reviews'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                            <i className="fas fa-check-circle text-amber-500"></i> {item}
                                        </li>
                                    ))}
                                </ul>
                                <ul className="space-y-3">
                                    {['Database Design (SQL/NoSQL)', 'API Strategy', 'Cloud & Deployment', 'Security Best Practices'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                            <i className="fas fa-check-circle text-amber-500"></i> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>


                {/* --------------------------------------------------------------------------------
                   PROJECTS / TRACK RECORD SECTION
                -------------------------------------------------------------------------------- */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest">
                            Proven Results
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Our Track Record</h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            We don't just talk; we deliver. Explore a selection of high-impact <strong className="text-white">projects</strong> and <strong className="text-white">case studies</strong> that demonstrate our engineering capabilities.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projectsData.map((project, idx) => (
                            <div key={idx} className="group flex flex-col bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2">
                                <div className="p-8 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/10">
                                            <i className="fas fa-folder-open text-xl"></i>
                                        </div>
                                        <div className="flex gap-4">
                                            {project.github && project.github !== "#" && (
                                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors text-xl" title="View Code">
                                                    <i className="fab fa-github"></i>
                                                </a>
                                            )}
                                            {project.liveDemo && (
                                                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors text-xl" title="Live Demo">
                                                    <i className="fas fa-external-link-alt"></i>
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                    <p className="text-xs font-semibold text-blue-400/80 uppercase tracking-widest mb-4">{project.subtitle}</p>

                                    <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.tags.map((tag, tIdx) => (
                                            <span key={tIdx} className="px-3 py-1 text-[11px] uppercase font-bold tracking-wider rounded-lg bg-blue-500/5 text-slate-300 border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ / Process Section (SEO Bait) */}
                <section className="max-w-4xl mx-auto mb-24">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Why Work With Me?</h2>
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        {[
                            { title: "Fast Delivery", desc: "Agile methodology ensures your MVP is live in weeks, not months.", icon: "fas fa-tachometer-alt" },
                            { title: "Transparent Pricing", desc: "No hidden fees. clear project scope and deliverables from day one.", icon: "fas fa-hand-holding-usd" },
                            { title: "Post-Launch Support", desc: "I don't just build and leave. I ensure your app runs smoothly.", icon: "fas fa-life-ring" }
                        ].map((item, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                                    <i className={`${item.icon} text-xl`}></i>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-slate-400 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Final CTA */}
                <section className="text-center bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-[3rem] p-12 md:p-20 border border-blue-500/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Have a project in mind?</h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                            Book a free consultation call. We'll discuss your requirements, budget, and timeline to find the perfect solution for you.
                        </p>
                        <a href="mailto:mohrashard@gmail.com" className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-blue-900 font-bold text-lg hover:scale-105 transition-transform shadow-xl">
                            <i className="fas fa-envelope"></i>
                            <span>Get a Free Quote</span>
                        </a>
                    </div>
                </section>

            </main >
        </div >
    );
}
