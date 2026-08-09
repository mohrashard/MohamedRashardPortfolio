import React from 'react';
import Navbar from '../../components/Navbar';
import IgniteEdCaseStudy from '../components/IgniteEdCaseStudy';
import GrabMeCaseStudy from '../components/GrabMeCaseStudy';

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    
    if (slug === 'ignite-ed') {
        return {
            title: "Ignite Ed Case Study | Mr² Labs — EdTech App in 14 Days",
            description: "How Mr² Labs built a trilingual AI-powered EdTech mobile app in 14 days for Sri Lankan students. Full case study.",
            openGraph: {
                title: "Ignite Ed Case Study | Mr² Labs — EdTech App in 14 Days",
                description: "How Mr² Labs built a trilingual AI-powered EdTech mobile app in 14 days for Sri Lankan students. Full case study.",
                url: `https://mr2labs.com/case-studies/${slug}`,
                siteName: "Mr² Labs",
                images: [{ url: `https://mr2labs.com/og/${slug}.png`, width: 1200, height: 630, alt: "Ignite Ed Case Study" }],
                locale: "en_US",
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: "Ignite Ed Case Study | Mr² Labs — EdTech App in 14 Days",
                description: "How Mr² Labs built a trilingual AI-powered EdTech mobile app in 14 days for Sri Lankan students. Full case study.",
                images: [`https://mr2labs.com/og/${slug}.png`],
                creator: "@mr2labs",
            },
            alternates: { canonical: `https://mr2labs.com/case-studies/${slug}` }
        };
    }
    if (slug === 'grabme') {
        return {
            title: "Grab Me Case Study | Mr² Labs — PWA MVP in 72 Hours",
            description: "How Mr² Labs built a scalable commission-free PWA marketplace in 72 hours. Zero marketing spend. Live on day 3.",
            openGraph: {
                title: "Grab Me Case Study | Mr² Labs — PWA MVP in 72 Hours",
                description: "How Mr² Labs built a scalable commission-free PWA marketplace in 72 hours. Zero marketing spend. Live on day 3.",
                url: `https://mr2labs.com/case-studies/${slug}`,
                siteName: "Mr² Labs",
                images: [{ url: `https://mr2labs.com/og/${slug}.png`, width: 1200, height: 630, alt: "Grab Me Case Study" }],
                locale: "en_US",
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: "Grab Me Case Study | Mr² Labs — PWA MVP in 72 Hours",
                description: "How Mr² Labs built a scalable commission-free PWA marketplace in 72 hours. Zero marketing spend. Live on day 3.",
                images: [`https://mr2labs.com/og/${slug}.png`],
                creator: "@mr2labs",
            },
            alternates: { canonical: `https://mr2labs.com/case-studies/${slug}` }
        };
    }
    return { title: "Case Study | Mr² Labs" };
}

export default async function CaseStudy({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    const caseStudySchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": slug === 'ignite-ed' ? "How Mr² Labs Built an AI EdTech App in 14 Days" : "How Mr² Labs Built a Scalable PWA Marketplace in 72 Hours",
        "description": slug === 'ignite-ed' ? "Full case study of Ignite Ed — a trilingual AI-powered EdTech platform built in 14 days." : "Full case study of Grab Me — a commission-free PWA marketplace built in 72 hours.",
        "author": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "url": "https://mr2labs.com"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "logo": {
                "@type": "ImageObject",
                "url": "https://mr2labs.com/logo.png"
            }
        },
        "datePublished": "2026-08-09",
        "dateModified": "2026-08-09",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://mr2labs.com/case-studies/${slug}`
        }
    };

    // You can add more case studies here by checking the slug!
    if (slug === 'ignite-ed') {
        return (
            <>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />
                <IgniteEdCaseStudy />
            </>
        );
    }
    if (slug === 'grabme') {
        return (
            <>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />
                <GrabMeCaseStudy />
            </>
        );
    }

    // 404 Fallback
    return (
        <main className="min-h-screen bg-[#050505] text-[#e0e0e0] flex items-center justify-center font-['Plus_Jakarta_Sans',sans-serif]">
            <Navbar />
            <div className="text-center mt-20">
                <h1 className="text-5xl font-bold text-white mb-4">Case Study Not Found</h1>
                <p className="text-zinc-500">The case study "{slug}" does not exist or has been moved.</p>
            </div>
        </main>
    );
}
