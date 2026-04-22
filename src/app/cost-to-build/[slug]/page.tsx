import React from 'react';
import { notFound } from 'next/navigation';
import pseoData from '@/data/pseo-slugs.json';
import EstimatorForm from '../components/EstimatorForm';
import { PSEOSlug } from '@/types/pseo';
import { Metadata } from 'next';
import Navbar from '../../components/Navbar';

const typedData = pseoData as PSEOSlug[];

export async function generateStaticParams() {
    return typedData.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = typedData.find((p) => p.slug === slug);
    
    if (!project) return { title: 'Not Found' };

    return {
        title: `${project.h1Title} | Mr² Labs Fast-Track MVPs`,
        description: project.seoDescription,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/cost-to-build/${project.slug}`,
        }
    };
}

export default async function CostToBuildSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = typedData.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    const rawCost = parseInt(project.traditionalAgencyEstimate.costRange.replace(/[^0-9]/g, ''));
    const complexityTier = rawCost > 40000 ? "Enterprise / Heavy Data" : "Advanced / SaaS Logic";

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans overflow-x-hidden pt-36 pb-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "Service",
                                "name": project.h1Title,
                                "description": project.seoDescription,
                                "provider": {
                                    "@type": "Person",
                                    "name": "Mohamed Rashard",
                                    "url": process.env.NEXT_PUBLIC_SITE_URL
                                },
                                "areaServed": "Worldwide",
                                "offers": {
                                    "@type": "Offer",
                                    "description": project.mr2LabsHook,
                                    "url": `${process.env.NEXT_PUBLIC_SITE_URL}/cost-to-build/${project.slug}`
                                }
                            },
                            {
                                "@type": "FAQPage",
                                "mainEntity": [
                                    {
                                        "@type": "Question",
                                        "name": `How much does it cost to build a ${project.h1Title}?`,
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": `${project.seoDescription} Building this with a traditional agency typically costs around ${project.traditionalAgencyEstimate.costRange}.`
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": `How long does it take to build a ${project.h1Title}?`,
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Traditional agencies take 2-6 months. Mr² Labs ships a production-ready MVP in under 72 hours using an AI-accelerated development sprint."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": `What technology is used to build a ${project.h1Title}?`,
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": project.technicalArchitecture && project.technicalArchitecture.length > 0
                                                ? `Built using ${project.technicalArchitecture.join(', ')}.`
                                                : "Next.js 15, Supabase, TypeScript, and Tailwind CSS — the fastest modern stack for production-grade MVPs."
                                        }
                                    }
                                ]
                            },
                            {
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    {
                                        "@type": "ListItem",
                                        "position": 1,
                                        "name": "Home",
                                        "item": process.env.NEXT_PUBLIC_SITE_URL
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 2,
                                        "name": "Cost to Build",
                                        "item": `${process.env.NEXT_PUBLIC_SITE_URL}/cost-to-build`
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 3,
                                        "name": project.h1Title,
                                        "item": `${process.env.NEXT_PUBLIC_SITE_URL}/cost-to-build/${project.slug}`
                                    }
                                ]
                            }
                        ]
                    })
                }}
            />
            <Navbar />
            
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-transparent rounded-full blur-[100px] mix-blend-screen opacity-50"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-t from-purple-500/10 via-blue-500/5 to-transparent rounded-full blur-[120px] mix-blend-screen"></div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]"></div>
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    
                    <div className="lg:col-span-7 flex flex-col gap-10">
                        
                        <header>
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest">
                                    {project.category}
                                </span>
                                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 text-xs font-semibold">
                                    <i className="fas fa-layer-group text-slate-500"></i>
                                    {complexityTier} Tier
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                                {project.h1Title}
                            </h1>
                            <p className="text-xl text-slate-400 font-light leading-relaxed border-l-4 border-blue-500/50 pl-5">
                                {project.seoDescription}
                            </p>
                        </header>

                        <section className="p-8 rounded-3xl bg-red-950/20 border border-red-500/20 relative overflow-hidden">
                            <i className="fas fa-exclamation-triangle absolute -top-10 -right-10 text-9xl text-red-500/5"></i>
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                                    <i className="fas fa-building"></i>
                                </span>
                                The "Traditional Agency" Trap
                            </h2>
                            <div className="grid sm:grid-cols-3 gap-6 text-center">
                                <div className="p-4 rounded-xl bg-black/40 border border-red-500/10">
                                    <span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Quoted Cost</span>
                                    <span className="text-xl font-bold text-red-400">{project.traditionalAgencyEstimate.costRange}</span>
                                </div>
                                <div className="p-4 rounded-xl bg-black/40 border border-red-500/10">
                                    <span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Time To Build</span>
                                    <span className="text-xl font-bold text-red-400">{project.traditionalAgencyEstimate.timeToBuild}</span>
                                </div>
                                <div className="p-4 rounded-xl bg-black/40 border border-red-500/10">
                                    <span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Team Bloat</span>
                                    <span className="text-sm font-semibold text-slate-300">{project.traditionalAgencyEstimate.teamRequired}</span>
                                </div>
                            </div>
                            <p className="mt-6 text-center text-sm font-semibold text-white/90 bg-white/5 py-3 rounded-lg border border-white/10">
                                {project.mr2LabsHook}
                            </p>
                        </section>

                        <section className="mb-10 lg:mb-0">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <i className="fas fa-server text-blue-500"></i> Under The Hood Architecture
                            </h2>
                            <p className="text-slate-400 mb-6 text-sm">
                                To build this properly and securely, here are the core technical primitives and infrastructural components needed:
                            </p>
                            <div className="grid gap-3">
                                {project.technicalArchitecture.map((tech, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                                        <div className="w-6 h-6 mt-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0 text-blue-400 text-xs shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                                            <i className="fas fa-code-branch"></i>
                                        </div>
                                        <div className="text-slate-200 font-medium">
                                            {tech}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>

                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32">
                            <EstimatorForm 
                                appTitle={project.h1Title} 
                                baseFeatures={project.technicalArchitecture} 
                                slug={project.slug}
                            />
                        </div>
                    </div>
                    
                </div>
            </main>
        </div>
    );
}
