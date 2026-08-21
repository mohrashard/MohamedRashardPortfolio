import "./globals.css"; // Import your main CSS here
import { Montserrat } from "next/font/google";
import Script from "next/script";
import Footer from "./components/Footer";
import ExitIntentPopup from "./components/ExitIntentPopup";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
    variable: '--font-montserrat',
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
        icon: "/mr-squared-logo.png",
        apple: "/mr-squared-logo.png",
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
        "logo": "https://mr2labs.com/logo.png",
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
                {/* External CSS Links */}
                {/* Preconnect to external asset domains for faster DNS resolution */}
                <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
                
                {/* Standard Stylesheet Loads */}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
                <link 
                    rel="stylesheet" 
                    href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" 
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
            <body className={`${montserrat.variable} font-[var(--font-montserrat)] bg-[#050505] text-zinc-400 antialiased selection:bg-[#0066FF]/30`}>
                {children}
                <Footer />
                <ExitIntentPopup />

                {/* Google Analytics Script */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-3F63E7EG0D"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3F63E7EG0D', {
              page_title: 'Mr² Labs',
            });
          `}
                </Script>
            </body>
        </html>
    );
}