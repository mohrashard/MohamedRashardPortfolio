import "./globals.css"; // Import your main CSS here
import { Poppins } from "next/font/google"; // Using Poppins as requested
import Script from "next/script";
import Footer from "./components/Footer";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
    variable: '--font-poppins',
});

// Comprehensive SEO Metadata migrated from App.js for High Ranking
export const metadata = {
    metadataBase: new URL("https://www.mohamedrashard.dev"),
    title: {
        default: "Mr2 Labs | Systems Architecture & Revenue Ecosystems (Mr²)",
        template: "%s | Mr2 Labs (Mr²)"
    },
    description: "Mr2 Labs architects high-ticket automated revenue ecosystems and custom AI solutions. Led by Mohamed Rashard Rizmi, we build digital dominance.",
    keywords: ["Mr2 Labs", "Mr 2 Labs", "Mister 2 Labs", "Mr Squared Labs", "Mohamed Rashard Labs", "Systems Architecture", "High-Ticket Web Architecture", "Custom AI Systems Sri Lanka", "Automated Revenue Systems", "Next.js", "AI Integration"],
    authors: [{ name: "Mohamed Rashard Rizmi" }],
    creator: "Mohamed Rashard Rizmi",
    publisher: "Mohamed Rashard Rizmi",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://www.mohamedrashard.dev/",
    },
    openGraph: {
        type: "website",
        title: "Mr2 Labs | High-Ticket Systems Architecture & AI (Mr²)",
        description: "Mr2 Labs architects high-ticket automated revenue ecosystems and custom AI solutions for global visionaries.",
        url: "https://www.mohamedrashard.dev/",
        siteName: "Mr2 Labs (Mr Squared)",
        images: [
            {
                url: "https://www.mohamedrashard.dev/assets/og-image.png",
                width: 1200,
                height: 630,
                alt: "Mohamed Rashard Rizmi Portfolio",
            },
        ],
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Mr2 Labs | Systems Architecture & AI",
        description: "We build high-ticket automated revenue ecosystems. Stop competing, start dominating.",
        images: ["https://www.mohamedrashard.dev/assets/og-image.png"],
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
    // Structured Data (JSON-LD)
    const jsonLdPerson = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Mohamed Rashard Rizmi",
        alternateName: "Mohamed Rashard",
        jobTitle: "Systems Architect & AI Engineer",
        worksFor: {
            "@type": "Organization",
            name: "Mr² Labs",
        },
        url: "https://www.mohamedrashard.dev/",
        image: "https://www.mohamedrashard.dev/assets/og-image.png",
        logo: "https://www.mohamedrashard.dev/mr-squared-logo.png",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Colombo",
            "addressCountry": "Sri Lanka",
        },
        email: "mohrashard@gmail.com",
        sameAs: [
            "https://x.com/mrr_labs",
            "https://web.facebook.com/profile.php?id=61575921543570",
            "https://www.instagram.com/mrr_labs/",
            "https://www.linkedin.com/in/mohamedrashard",
            "https://medium.com/@mohrashard",
            "https://dev.to/mohrashard",
            "https://github.com/mohrashard/",
            "https://www.mohamedrashard.dev/"
        ],
        alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Cardiff Metropolitan University",
        },
        knowsAbout: [
            "Software Engineering", "Web Development", "Full-Stack Development",
            "Artificial Intelligence", "Custom Web Development", "E-commerce Development",
            "React", "Next.js", "Python", "Java"
        ],
    };

    const jsonLdOrganization = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Mr² Labs",
        "alternateName": ["Mr2 Labs", "Mr 2 Labs", "Mister 2 Labs", "Mr Squared Labs", "Mohamed Rashard Labs"],
        "founder": {
            "@type": "Person",
            "name": "Mohamed Rashard Rizmi"
        },
        "url": "https://www.mohamedrashard.dev/",
        "logo": "https://www.mohamedrashard.dev/mr-squared-logo.png",
        "sameAs": [
            "https://x.com/mrr_labs",
            "https://web.facebook.com/profile.php?id=61575921543570",
            "https://www.instagram.com/mrr_labs/",
            "https://www.linkedin.com/in/mohamedrashard",
            "https://medium.com/@mohrashard",
            "https://dev.to/mohrashard",
            "https://github.com/mohrashard/",
            "https://www.mohamedrashard.dev/"
        ],
        "knowsAbout": ["Systems Architecture", "AI Integration", "NextJS", "Revenue Operations", "High-Ticket Sales Infrastructures"]
    };

    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <head>
                {/* External CSS Links */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />

                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
                />
            </head>
            <body className={`${poppins.className} bg-[#050505] text-[#e0e0e0]`}>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                {children}
                <Footer />

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
              page_title: 'Mohamed Rashard',
            });
          `}
                </Script>
            </body>
        </html>
    );
}