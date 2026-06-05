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
    metadataBase: new URL("https://www.mr2labs.com"),
    title: {
        default: "Mr² Labs | High-Velocity Software Engineering & AI Deployment",
        template: "%s | Mr² Labs"
    },
    description: "Mr² Labs is an elite software engineering firm. We architect, secure, and deploy production-grade AI applications and SaaS MVPs in 48-72 hour sprints.",
    keywords: [
        "Mr2 Labs",
        "Mr Squared Labs",
        "High-Velocity Software Engineering",
        "SaaS MVP Deployment",
        "Custom AI Architecture",
        "Next.js 15 Infrastructure",
        "Codebase Rescue",
        "B2B software engineering",
        "White-label engineering",
        "Database-free architecture"
    ],
    authors: [{ name: "Mr² Labs" }],
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
        canonical: "https://www.mr2labs.com",
    },
    openGraph: {
        type: "website",
        title: "Mr² Labs | High-Velocity Software Engineering",
        description: "We architect and ship production-grade MVPs for funded founders in 48-72 hours. Elite AI development and deployment.",
        url: "https://www.mr2labs.com",
        siteName: "Mr² Labs",
        images: [
            {
                url: "https://www.mr2labs.com/assets/og-image.png",
                width: 1200,
                height: 630,
                alt: "Mr² Labs - Elite Software Engineering Firm",
            },
        ],
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Mr² Labs | High-Velocity Software Engineering",
        description: "Production-grade MVPs shipped in 48-72 hours. Fixed-scope, zero scope creep.",
        images: ["https://www.mr2labs.com/assets/og-image.png"],
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
        "alternateName": ["Mr2 Labs", "Mr 2 Labs", "Mister 2 Labs", "Mr Squared Labs"],
        "url": "https://www.mr2labs.com",
        "logo": "https://www.mr2labs.com/mr-squared-logo.png",
        "image": "https://www.mr2labs.com/assets/og-image.png",
        "description": "An elite software engineering and digital systems firm specializing in rapid 48 to 72-hour MVP deployment, AI architecture, and codebase rescue.",
        "founder": {
            "@type": "Person",
            "name": "Mohamed Rashard Rizmi",
            "jobTitle": "Lead Architect & Founder"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "email": process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
            "contactType": "technical support and sales"
        },
        "sameAs": [
            "https://x.com/mrr_labs",
            "https://web.facebook.com/profile.php?id=61575921543570",
            "https://www.instagram.com/mrr_labs/",
            "https://www.linkedin.com/in/mohamedrashard",
            "https://medium.com/@mohrashard",
            "https://github.com/mohrashard/"
        ],
        "knowsAbout": [
            "High-Velocity Software Engineering",
            "SaaS MVP Deployment",
            "Custom AI Architecture",
            "Next.js 15 Infrastructure",
            "Codebase Rescue"
        ],
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Colombo",
            "addressCountry": "LK"
        }
    };

    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <head>
                {/* External CSS Links */}
                {/* Font Awesome - Standard Reliable Load */}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />

                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
                />
                <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js-enabled');" }} />
            </head>
            <body className={`${montserrat.variable} font-[var(--font-montserrat)] bg-[#050505] text-zinc-400 antialiased selection:bg-[#0066FF]/30`}>
                <noscript>You need to enable JavaScript to run this app.</noscript>
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