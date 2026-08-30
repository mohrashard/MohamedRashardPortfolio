// Main CSS and font imports
import "./globals.css";
import { Montserrat, Plus_Jakarta_Sans, Inter, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Footer from "./components/Footer";
import ScrollObserver from "./services/ScrollObserver";
import ChunkLoadHandler from "./components/ChunkLoadHandler";
import { GoogleAnalytics } from '@next/third-parties/google';

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
    variable: '--font-montserrat',
});

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
    variable: '--font-jakarta',
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
    variable: '--font-inter',
});

const geistMono = Geist_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    display: "swap",
    variable: '--font-geist-mono',
});

// Comprehensive SEO Metadata migrated from App.js for High Ranking
export const metadata = {
    metadataBase: new URL("https://mr2labs.com"),
    title: {
        default: "Mr² Labs - AI and Software Development Agency",
        template: "%s | Mr² Labs"
    },
    description: "We build and ship high-performance software, mobile apps, and AI products for founders. MVPs in days, not months.",
    keywords: [
        "software development agency",
        "AI development agency",
        "MVP development",
        "React Native app development",
        "startup software agency",
        "rapid MVP delivery",
        "EdTech app development",
        "PWA development",
        "mobile app development Sri Lanka",
        "AI integration services"
    ],
    authors: [{ name: "Mr² Labs", url: "https://mr2labs.com" }],
    creator: "Mr² Labs",
    publisher: "Mr² Labs",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: "https://mr2labs.com",
    },
    openGraph: {
        type: "website",
        title: "Mr² Labs - AI and Software Development Agency",
        description: "We build and ship high-performance software, mobile apps, and AI products for founders. MVPs in days, not months.",
        url: "https://mr2labs.com",
        siteName: "Mr² Labs",
        images: [
            {
                url: "https://mr2labs.com/og/home.png",
                width: 1200,
                height: 630,
                alt: "Mr² Labs - Home",
            },
        ],
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Mr² Labs - AI and Software Development Agency",
        description: "We build and ship high-performance software, mobile apps, and AI products for founders. MVPs in days, not months.",
        images: ["https://mr2labs.com/og/home.png"],
        creator: "@mrr_labs",
    },
    icons: {
        icon: "/mr-squared-logo.webp",
        apple: "/mr-squared-logo.webp",
    },
    manifest: "/manifest.json",
    other: {
        "p:domain_verify": "7587ab8c715605f4950b54a684ce500d",
    },
};

export default function RootLayout({ children }) {
    // Structured Data (JSON-LD) for B2B Firm Identity
    const jsonLdOrganization = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Mr² Labs",
        "url": "https://mr2labs.com",
        "logo": "https://mr2labs.com/mr-squared-logo.webp",
        "description": "AI and software development agency specializing in rapid MVP delivery for founders.",
        "email": "growth@mr2labs.com",
        "foundingDate": "2024",
        "sameAs": [
            "https://www.linkedin.com/company/mr2labs",
            "https://x.com/mrr_labs",
            "https://web.facebook.com/profile.php?id=61575921543570",
            "https://www.instagram.com/mrr_labs/",
            "https://www.linkedin.com/in/mohamedrashard",
            "https://medium.com/@mohrashard",
            "https://github.com/mohrashard/"
        ],
        "knowsAbout": [
            "Software Development",
            "AI Integration",
            "React Native",
            "MVP Development",
            "EdTech",
            "PWA Development"
        ],
        "founder": {
            "@type": "Person",
            "name": "Mohamed Rashard Rizmi",
            "jobTitle": "Lead Architect & Founder"
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Colombo",
            "addressCountry": "LK"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How fast can you build a SaaS MVP?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We ship production-ready MVPs in as little as 48 to 72 hours, depending on the complexity of the feature set and AI integrations required."
                }
            },
            {
                "@type": "Question",
                "name": "Do you use local AI models or API integrations?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We deploy both. We engineer local, subscription-free AI pipelines where possible, and integrate with top-tier APIs like Claude, OpenAI, and Gemini when necessary."
                }
            },
            {
                "@type": "Question",
                "name": "What tech stack do you specialize in?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our core architecture relies on Next.js, React Native, Supabase, and advanced AI agent frameworks, ensuring scalable and highly performant applications."
                }
            }
        ]
    };

    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <head>
                {/* External CSS Links - Preconnect & DNS Prefetch */}
                <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />

                
                {/* High Priority Preload for LCP Hero Background */}
                <link rel="preload" as="image" href="/hero-bg.webp" type="image/webp" fetchPriority="high" />


                {/* Inline ChunkLoadError Early Catch Script */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                function checkAndReload(msg) {
                                    var str = String(msg || '').toLowerCase();
                                    if (
                                        str.indexOf('chunkloaderror') !== -1 ||
                                        str.indexOf('loading chunk') !== -1 ||
                                        str.indexOf('failed to fetch dynamically imported module') !== -1 ||
                                        str.indexOf('css chunk') !== -1 ||
                                        (str.indexOf('/_next/static/') !== -1 && (str.indexOf('404') !== -1 || str.indexOf('failed') !== -1))
                                    ) {
                                        var lastReload = sessionStorage.getItem('mr2_chunk_err_reload');
                                        var now = Date.now();
                                        if (!lastReload || (now - parseInt(lastReload, 10)) > 8000) {
                                            sessionStorage.setItem('mr2_chunk_err_reload', String(now));
                                            var search = window.location.search || '';
                                            var cleanSearch = search.replace(/([?&])nocache=[^&]*(&|$)/, '$1').replace(/[?&]$/, '');
                                            var sep = cleanSearch ? '&' : '?';
                                            window.location.href = window.location.pathname + cleanSearch + sep + 'nocache=' + now;
                                        }
                                    }
                                }

                                window.addEventListener('error', function(e) {
                                    var target = e.target || e.srcElement;
                                    if (target && (target.tagName === 'SCRIPT' || target.tagName === 'LINK')) {
                                        var src = target.src || target.href || '';
                                        if (src.indexOf('/_next/static/') !== -1) {
                                            checkAndReload('ChunkLoadError: static asset failed to load');
                                            return;
                                        }
                                    }
                                    if (e.message) checkAndReload(e.message);
                                }, true);

                                window.addEventListener('unhandledrejection', function(e) {
                                    if (e && e.reason) {
                                        checkAndReload(e.reason.message || e.reason.name || String(e.reason));
                                    }
                                });
                            })();
                        `,
                    }}
                />

                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
                <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js-enabled');" }} />
            </head>
            <body className={`${montserrat.variable} ${jakarta.variable} ${inter.variable} ${geistMono.variable} font-[var(--font-inter)] bg-[#050505] text-zinc-300 antialiased selection:bg-[#0066FF]/30`}>
                <ChunkLoadHandler />
                <ScrollObserver />
                {children}
                <Footer />
                <GoogleAnalytics gaId="G-3F63E7EG0D" />
            </body>
        </html>
    );
}