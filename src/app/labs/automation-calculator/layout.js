export const metadata = {
    title: "Process Automation Calculator | ROI & Capital Burn Analysis | Mr² Labs",
    description: "Quantify exactly how much capital your business burns on manual data entry and repetitive tasks per year. Get a custom AI automation architecture to eliminate it.",
    keywords: [
        "Process Automation Calculator",
        "Manual Task Cost Calculator",
        "AI Automation ROI",
        "Business Process Optimization",
        "Mr² Labs Diagnostic",
        "Eliminate Data Entry"
    ],
    openGraph: {
        title: "Process Automation Calculator | Capital Burn Analysis",
        description: "Calculate your exact financial loss to manual tasks and generate a custom AI automation blueprint.",
        url: "https://mr2labs.com/labs/automation-calculator",
        type: "website",
        images: [{ url: "/labs-hero-bg.png", width: 1200, height: 630, alt: "Automation ROI Calculator" }],
    },
    alternates: {
        canonical: "https://mr2labs.com/labs/automation-calculator",
    },
};

export default function AutomationCalculatorLayout({ children }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Process Automation Calculator",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "developer": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "founder": "Mohamed Rashard Rizmi"
        },
        "description": "An interactive financial and architectural diagnostic tool that quantifies capital burned on manual business processes and proposes specific AI and API automation infrastructures to solve them."
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {children}
        </>
    );
}
