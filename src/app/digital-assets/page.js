import Link from 'next/link';
import Image from 'next/image';
import DigitalAssetsClient from './DigitalAssetsClient';

export const metadata = {
    metadataBase: new URL("https://www.mohamedrashard.dev"),
    title: "Digital Assets Marketplace | Mr² Labs | Colombo, Sri Lanka",
    description: "Premium Digital Assets by Mr² Labs. Download engineered Next.js templates, AI SaaS tools, and Python scripts. Powered by Mohamed Rashard Rizmi, Sri Lanka.",
    keywords: [
        "Mr² Labs Store",
        "Mohamed Rashard Digital Assets",
        "Next.js Templates Sri Lanka",
        "AI SaaS Source Code",
        "Python Automation Scripts",
        "Developer Marketplace Colombo",
        "Premium Source Code",
        "Web App Templates",
        "React Native UI Kits"
    ],
    openGraph: {
        title: "Digital Assets Store | Mr² Labs | Colombo",
        description: "Accelerate your development with professionally engineered templates, AI tools, and automation scripts from Mr² Labs.",
        url: "https://www.mohamedrashard.dev/digital-assets",
        type: "website",
        images: [
            {
                url: "/mr-squared-logo.png",
                width: 1200,
                height: 630,
                alt: "Mr² Labs Assets",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Digital Assets Store | Mr² Labs",
        description: "Premium Developer Assets from Sri Lanka.",
        images: ["/mr-squared-logo.png"],
    },
    alternates: {
        canonical: "https://www.mohamedrashard.dev/digital-assets",
    },
};

export default function DigitalAssets() {
    // Structured Data for the Marketplace
    const jsonLdMarketplace = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Mr² Labs Digital Assets",
        "description": "A curated collection of high-quality code templates, AI tools, and scripts.",
        "url": "https://www.mohamedrashard.dev/digital-assets",
        "provider": {
            "@type": "Person",
            "name": "Mohamed Rashard Rizmi",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Colombo",
                "addressCountry": "Sri Lanka"
            }
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdMarketplace) }}
            />
            <DigitalAssetsClient />
        </>
    );
}
