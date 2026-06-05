export const metadata = {
    title: "Website SEO & Technical Audit | Mr² Labs",
    description: "Deep technical analysis of metadata, tags, and indexing configurations. Ping any live URL for real-time SEO grading and optimization strategies.",
    keywords: [
        "SEO Audit Tool",
        "Technical SEO Analyzer",
        "Metadata Extractor",
        "Website Performance Audit",
        "Mr² Labs Diagnostic Tools"
    ],
    openGraph: {
        title: "Website SEO & Technical Audit | Mr² Labs",
        description: "Analyze your website's technical SEO architecture in real-time.",
        url: "https://mr2labs.com/labs/site-audit",
        type: "website",
        images: [{ url: "/labs-hero-bg.png", width: 1200, height: 630, alt: "SEO Audit Tool" }],
    },
    alternates: {
        canonical: "https://mr2labs.com/labs/site-audit",
    },
};

export default function SeoAuditLayout({ children }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Website SEO Audit",
        "operatingSystem": "Web",
        "applicationCategory": "DeveloperApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "developer": {
            "@type": "Organization",
            "name": "Mr² Labs"
        }
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {children}
            <article className="sr-only">
                <h2>About the SEO Technical Audit</h2>
                <p>Deep technical analysis of metadata, tags, and indexing configurations by Mr² Labs.</p>
            </article>
        </>
    );
}
