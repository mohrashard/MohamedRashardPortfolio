import Link from 'next/link';
import Image from 'next/image';
import { assets } from './data';
import TrustBar from '../components/TrustBar';
import DigitalAssetsClient from './DigitalAssetsClient';
import DigitalAssetsHero from './DigitalAssetsHero';
import AvailabilityBadge from '../components/AvailabilityBadge';
import Navbar from '../components/Navbar';
import { Terminal } from 'lucide-react';

const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

export const metadata = {
    title: "Digital Assets Marketplace",
    description: "Premium Digital Assets by Mr² Labs. Deploy engineered Next.js 15 architectures, AI SaaS infrastructure, and automation scripts.",
    keywords: [
        "Mr² Labs Digital Assets",
        "Next.js 15 Templates",
        "AI SaaS Infrastructure",
        "Python Automation Scripts",
        "Developer Marketplace",
        "Premium Source Code",
        "Web App Architecture",
        "High-Velocity Engineering"
    ],
    openGraph: {
        title: "Digital Assets Marketplace | Mr² Labs",
        description: "Accelerate your development with production-grade architectures and automation pipelines from Mr² Labs.",
        url: "https://mr2labs.com/digital-assets",
        type: "website",
        images: [
            {
                url: "/mr-squared-logo.png",
                width: 1200,
                height: 630,
                alt: "Mr² Labs Digital Assets",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Digital Assets Marketplace | Mr² Labs",
        description: "Production-grade developer assets from Mr² Labs.",
        images: ["/mr-squared-logo.png"],
    },
    alternates: {
        canonical: "https://www.mr2labs.com/digital-assets",
    },
};

export default function DigitalAssets() {
    // Structured Data for the Marketplace
    const jsonLdMarketplace = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Mr² Labs Digital Assets",
        "description": "A curated collection of high-velocity code architectures, AI tools, and production-grade scripts.",
        "url": "https://mr2labs.com/digital-assets",
        "provider": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Colombo",
                "addressCountry": "LK"
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-purple-500/30 overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdMarketplace) }}
            />

            {/* Premium Background Image */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505] overflow-hidden">
                <Image
                    src="/digital-assets-bg.png"
                    alt="Background"
                    fill
                    priority
                    quality={100}
                    className="object-cover object-center opacity-100"
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/80" />
            </div>

            {/* Navigation */}
            <Navbar />

            <main className="relative z-10 pt-32">
                <div className="px-6 md:px-12 max-w-7xl mx-auto">
                    {/* Marketplace Header */}
                    <DigitalAssetsHero />
                </div>

                <div className="pb-20 px-6 md:px-12 max-w-7xl mx-auto mt-34">
                    <DigitalAssetsClient initialAssets={assets} />
                </div>
            </main>
        </div>
    );
}
