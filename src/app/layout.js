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
        default: "Mr² Labs | Systems Architecture & Revenue Ecosystems",
        template: "%s | Mr² Labs"
    },
    description: "Mr² Labs (Mr2 Labs) architects high-ticket automated revenue ecosystems and custom AI solutions. Led by Mohamed Rashad Rizmi, we build digital dominance.",
    keywords: [
        "Mohamed Rashad Rizmi",
        "Mr2 Labs",
        "Mr 2 Labs",
        "mrr labs",
        "Mr Squared Labs",
        "Software Engineer Sri Lanka",
        "AI Integration",
        "Next.js Developer",
        "Web Developer",
        "Mobile App Developer",
        "Saas developer",
        "E-commerce Developer",
        "AI Developer",
        "Systems Architecture",
        "High-Ticket Web Architecture",
        "Automated Revenue Systems"
    ],
    authors: [{ name: "Mohamed Rashad Rizmi" }],
    creator: "Mohamed Rashad Rizmi",
    publisher: "Mohamed Rashad Rizmi",
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
        canonical: "https://www.mohamedrashard.dev/",
    },
    openGraph: {
        type: "website",
        title: "Mr² Labs | Systems Architecture & AI",
        description: "Mr² Labs (Mr2 Labs) architects high-ticket automated revenue ecosystems and custom AI solutions combined with cutting-edge Web & Mobile Development.",
        url: "https://www.mohamedrashard.dev/",
        siteName: "Mr² Labs",
        images: [
            {
                url: "https://www.mohamedrashard.dev/mr-squared-logo.png",
                width: 1200,
                height: 630,
                alt: "Mr² Labs - Mohamed Rashad Rizmi",
            },
        ],
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Mr² Labs | Systems Architecture & AI",
        description: "We build high-ticket automated revenue ecosystems. Stop competing, start dominating. Led by Mohamed Rashad Rizmi.",
        images: ["https://www.mohamedrashard.dev/mr-squared-logo.png"],
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
    // Structured Data (JSON-LD)
    const jsonLdPerson = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Mohamed Rashad Rizmi",
        alternateName: "Mohamed Rashard",
        jobTitle: "Systems Architect & AI Engineer",
        worksFor: {
            "@type": "ProfessionalService",
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
            "React", "Next.js", "Python", "Java", "Mobile App Development", "SaaS Development"
        ],
    };

    const jsonLdOrganization = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Mr² Labs",
        "alternateName": ["Mr2 Labs", "Mr 2 Labs", "Mister 2 Labs", "Mr Squared Labs", "mrr labs"],
        "founder": {
            "@type": "Person",
            "name": "Mohamed Rashad Rizmi"
        },
        "url": "https://www.mohamedrashard.dev/",
        "logo": "https://www.mohamedrashard.dev/mr-squared-logo.png",
        "image": "https://www.mohamedrashard.dev/assets/og-image.png",
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
        "knowsAbout": ["Systems Architecture", "AI Integration", "NextJS", "Revenue Operations", "High-Ticket Sales Infrastructures"],
        "priceRange": "$$$",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Colombo",
            "addressCountry": "Sri Lanka"
        }
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