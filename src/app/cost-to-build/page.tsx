import React from 'react';
import Image from 'next/image';
import pseoData from '@/data/pseo-slugs.json';
import CostToBuildClient from './CostToBuildClient';
import { PSEOSlug } from '@/types/pseo';
import { Metadata } from 'next';
import Navbar from '../components/Navbar';

const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

export const metadata: Metadata = {
    title: 'How Much Does It Cost to Build Your App? | Mr² Labs',
    description: 'Discover realistic development costs, tech stack requirements, and timelines for building AI-powered SaaS and enterprise applications in 2026.',
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/cost-to-build`,
    }
};

export default function CostToBuildPage() {
    // Cast the imported data to our new type
    const typedData = pseoData as PSEOSlug[];

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-blue-500/30 overflow-x-hidden pt-32 pb-24">

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            "name": "How Much Does It Cost to Build an App?",
                            "description": "Free AI-powered cost estimator for founders. See what traditional agencies charge vs what Mr² Labs ships in 72 hours.",
                            "url": `${process.env.NEXT_PUBLIC_SITE_URL}/cost-to-build`,
                            "breadcrumb": {
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
                                    }
                                ]
                            }
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "How much does it cost to build an app in 2026?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "App development costs range from $5,000 for simple MVPs to $150,000+ for enterprise platforms. Mr² Labs ships production-ready MVPs in 72 hours at a fraction of traditional agency rates."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "How long does it take to build an MVP?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Traditional agencies take 3-6 months. Mr² Labs delivers working MVPs in under 72 hours using an AI-accelerated sprint methodology."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "What is the cheapest way to build a startup MVP?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "The cheapest approach is to build only the single core feature that validates your idea. Using modern stacks like Next.js and Supabase, Mr² Labs ships focused MVPs faster and cheaper than any traditional agency."
                                    }
                                }
                            ]
                        }
                    ])
                }}
            />
            <Navbar />

            {/* Background Decoration */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
                <Image
                    src="/cost-to-build-bg.png"
                    alt="Background"
                    fill
                    priority
                    quality={100}
                    className="object-cover object-center opacity-60"
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/25" />
            </div>

            {/* Client Component Island (Now includes Hero) */}
            <CostToBuildClient data={typedData} />

        </div>
    );
}
