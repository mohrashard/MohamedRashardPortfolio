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
    title: "Mohamed Rashard Rizmi | Software Engineer in Colombo, Sri Lanka | AI & Web Developer",
    description: "Hire Mohamed Rashard Rizmi, a top-rated affordable Software Developer, AI Engineer, and Web Developer in Sri Lanka. Expert in Custom Web Apps, E-commerce, and AI Solutions.",
    keywords: ["Mohamed Rashard Rizmi", "Software Developer", "Affordable Software Developer", "AI Engineer", "Web Developer", "Custom Web Developer", "E-commerce Developer", "Full Stack Developer", "React Developer", "Next.js", "Sri Lanka", "Colombo"],
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
        type: "profile",
        title: "Mohamed Rashard Rizmi | Affordable Software Developer & AI Engineer",
        description: "Looking for an affordable & expert Software Developer? Mohamed Rashard specializes in AI, Custom Web Development, E-commerce, and Digital Marketing.",
        url: "https://www.mohamedrashard.dev/",
        siteName: "Mohamed Rashard Portfolio",
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
        title: "Mohamed Rashard Rizmi | Top Software Developer & AI Engineer",
        description: "Hire Mohamed Rashard for affordable Software Development, AI Engineering, Web Apps, and Social Media Marketing.",
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
        jobTitle: "Software Developer & AI Engineer",
        worksFor: {
            "@type": "Organization",
            name: "Freelance",
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
            "https://www.linkedin.com/in/mohamedrashard",
            "https://github.com/mohrashard/",
            "https://www.instagram.com/moh_.rashaxd",
            "https://www.tiktok.com/@mohh.rasharrd",
            "https://www.facebook.com/share/1EnKfVXh1z/",
            "https://youtube.com/@moh_rashard",
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

    const jsonLdWebsite = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: "https://www.mohamedrashard.dev/",
        name: "Mohamed Rashard Rizmi Portfolio",
        author: {
            "@type": "Person",
            "name": "Mohamed Rashard Rizmi"
        },
        description: "Official Portfolio of Mohamed Rashard Rizmi - Affordable Software Developer, AI Engineer, and Web Specialist in Colombo, Sri Lanka."
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
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
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