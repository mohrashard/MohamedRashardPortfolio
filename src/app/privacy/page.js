import React from 'react';
import Navbar from '../components/Navbar';
import ScrollObserver from '../services/ScrollObserver';

export const metadata = {
    title: "Privacy Policy | Mr² Labs",
    description: "Mr² Labs privacy policy — how we collect, use, and protect your data across our software and AI services.",
    alternates: { canonical: "https://mr2labs.com/privacy" },
};

const sections = [
    { id: "information-we-collect", label: "01", title: "Information We Collect" },
    { id: "how-we-use", label: "02", title: "How We Use Your Information" },
    { id: "data-sharing", label: "03", title: "Data Sharing & Subprocessors" },
    { id: "security-retention", label: "04", title: "Security & Retention" },
    { id: "your-rights", label: "05", title: "Your Data Rights" },
    { id: "cookies", label: "06", title: "Cookies & Analytics" },
    { id: "international", label: "07", title: "International Data Transfers" },
    { id: "third-party-links", label: "08", title: "Third-Party Links" },
    { id: "changes", label: "09", title: "Policy Changes" },
    { id: "contact", label: "10", title: "Contact Us" },
];

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-[#0066FF]/30 pt-[120px] pb-24 overflow-x-hidden relative">
            {/* Background glow */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-5%] left-[-10%] w-[50%] h-[40%] bg-[#0066FF]/5 blur-[150px] rounded-full" />
                <div className="absolute top-[40%] right-[-10%] w-[30%] h-[40%] bg-[#00BFFF]/4 blur-[120px] rounded-full" />
            </div>

            <Navbar />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

                {/* Header */}
                <div className="mb-16 pb-10 border-b border-white/[0.06]" data-animate="slide-up">
                    <p className="text-[#0066FF] text-xs font-['Geist_Mono',monospace] tracking-[0.2em] uppercase mb-4">Legal</p>
                    <h1 className="text-5xl sm:text-6xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif] mb-6 leading-none">
                        Privacy<br />
                        <span className="text-[#0066FF]">Policy.</span>
                    </h1>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 text-zinc-500 text-xs font-['Geist_Mono',monospace] mt-6">
                        <span><span className="text-zinc-600">EFFECTIVE</span> &nbsp;August 9, 2026</span>
                        <span className="hidden sm:block text-zinc-700">·</span>
                        <span><span className="text-zinc-600">UPDATED</span> &nbsp;August 9, 2026</span>
                        <span className="hidden sm:block text-zinc-700">·</span>
                        <span><span className="text-zinc-600">VERSION</span> &nbsp;1.0</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 lg:gap-16">

                    {/* Sticky sidebar TOC */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-28">
                            <p className="text-zinc-600 text-[10px] font-['Geist_Mono',monospace] tracking-widest uppercase mb-4">Contents</p>
                            <nav className="flex flex-col gap-1">
                                {sections.map((s) => (
                                    <a
                                        key={s.id}
                                        href={`#${s.id}`}
                                        className="group flex items-center gap-3 py-1.5 text-zinc-500 hover:text-white transition-colors duration-150"
                                    >
                                        <span className="text-[10px] font-['Geist_Mono',monospace] text-zinc-700 group-hover:text-[#0066FF] transition-colors">{s.label}</span>
                                        <span className="text-xs font-['Inter',sans-serif]">{s.title}</span>
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main content */}
                    <div className="min-w-0">
                        <p className="text-zinc-400 font-['Inter',sans-serif] leading-relaxed mb-12 text-base">
                            At <strong className="text-zinc-200">Mr² Labs</strong> ("we," "us," or "our"), accessible from{' '}
                            <a href="https://mr2labs.com" className="text-[#0066FF] hover:underline">https://mr2labs.com</a>,
                            protecting the privacy and security of our visitors, clients, and partners is a top priority.
                            This Privacy Policy outlines how we collect, use, and safeguard your information when you visit
                            our website or engage our software development and AI consulting services.
                        </p>

                        <Divider />

                        {/* Section 1 */}
                        <Section id="information-we-collect" number="01" title="Information We Collect">
                            <SubHeading>A. Information You Provide Directly</SubHeading>
                            <ul className="space-y-3 mb-8">
                                <Li>
                                    <strong className="text-zinc-200">Inquiries & Onboarding:</strong> When you fill out a contact form,
                                    request an audit, or communicate with us, we collect your name, email address, company name,
                                    project specifications, and any details you choose to share.
                                </Li>
                                <Li>
                                    <strong className="text-zinc-200">Billing & Payments:</strong> If you engage our services, invoicing
                                    and payment processing are handled through <strong className="text-zinc-200">PayPal</strong>. We do
                                    not store raw payment credentials or card numbers on our servers. PayPal's privacy policy governs
                                    how they handle your financial data.
                                </Li>
                            </ul>

                            <SubHeading>B. Client Data & Intellectual Property</SubHeading>
                            <ul className="space-y-3 mb-8">
                                <Li>
                                    <strong className="text-zinc-200">Project Assets:</strong> Any code, design assets, database schemas,
                                    or proprietary business logic you provide during the scope of a project remains strictly your property.
                                </Li>
                                <Li>
                                    <strong className="text-zinc-200">AI Model Safety:</strong> We do not use client-provided proprietary
                                    data, codebases, or API payloads to train public artificial intelligence or machine learning models.
                                </Li>
                            </ul>

                            <SubHeading>C. Automatically Collected Information</SubHeading>
                            <ul className="space-y-3">
                                <Li>
                                    <strong className="text-zinc-200">Technical Logs:</strong> Our servers automatically log standard web
                                    data including your IP address, browser type, operating system, referring pages, and access times.
                                </Li>
                                <Li>
                                    <strong className="text-zinc-200">Analytics:</strong> We use <strong className="text-zinc-200">Google Analytics</strong> to
                                    understand site traffic and usage patterns. This tool collects anonymised data such as pages visited,
                                    session duration, and device type. You can opt out via the{' '}
                                    <a href="https://tools.google.com/dlpage/gaoptout" className="text-[#0066FF] hover:underline" target="_blank" rel="noopener noreferrer">
                                        Google Analytics Opt-out Browser Add-on
                                    </a>.
                                </Li>
                            </ul>
                        </Section>

                        <Divider />

                        {/* Section 2 */}
                        <Section id="how-we-use" number="02" title="How We Use Your Information">
                            <p className="text-zinc-400 font-['Inter',sans-serif] leading-relaxed mb-4">
                                We use the collected information for the following operational purposes:
                            </p>
                            <ul className="space-y-3">
                                <Li>To deliver, maintain, and improve our website, software products, and engineering services.</Li>
                                <Li>To communicate regarding project updates, quotes, technical inquiries, and support.</Li>
                                <Li>To process payments and manage invoicing through PayPal.</Li>
                                <Li>To ensure network security, detect technical errors, and prevent fraudulent activity.</Li>
                                <Li>To comply with legal, tax, and accounting obligations.</Li>
                                <Li>To analyse website performance and improve user experience via Google Analytics.</Li>
                            </ul>
                        </Section>

                        <Divider />

                        {/* Section 3 */}
                        <Section id="data-sharing" number="03" title="Data Sharing & Subprocessors">
                            <p className="text-zinc-400 font-['Inter',sans-serif] leading-relaxed mb-6">
                                We do not sell, rent, or trade your personal information. We only share data with trusted
                                third-party service providers strictly necessary to operate our business:
                            </p>

                            <div className="overflow-x-auto rounded-lg border border-white/[0.06] mb-6">
                                <table className="w-full text-sm font-['Inter',sans-serif]">
                                    <thead>
                                        <tr className="border-b border-white/[0.06]">
                                            <th className="text-left text-zinc-500 font-medium px-4 py-3 text-xs uppercase tracking-wider">Provider</th>
                                            <th className="text-left text-zinc-500 font-medium px-4 py-3 text-xs uppercase tracking-wider">Purpose</th>
                                            <th className="text-left text-zinc-500 font-medium px-4 py-3 text-xs uppercase tracking-wider">Location</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.04]">
                                        {[
                                            { provider: "Vercel", purpose: "Website hosting & deployment", location: "USA" },
                                            { provider: "Supabase", purpose: "Database & backend infrastructure", location: "USA" },
                                            { provider: "Cloudflare", purpose: "CDN, DNS & security", location: "USA" },
                                            { provider: "Google Workspace", purpose: "Email & internal communication", location: "USA" },
                                            { provider: "Resend", purpose: "Transactional email delivery", location: "USA" },
                                            { provider: "PayPal", purpose: "Payment processing & invoicing", location: "USA" },
                                            { provider: "Google Analytics", purpose: "Website analytics & traffic reporting", location: "USA" },
                                        ].map((row) => (
                                            <tr key={row.provider} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="px-4 py-3 text-zinc-200 font-medium">{row.provider}</td>
                                                <td className="px-4 py-3 text-zinc-400">{row.purpose}</td>
                                                <td className="px-4 py-3 text-zinc-500">{row.location}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-zinc-500 text-sm font-['Inter',sans-serif]">
                                Each subprocessor is bound by data processing agreements and is obligated to maintain the
                                confidentiality and security of your data.
                            </p>
                        </Section>

                        <Divider />

                        {/* Section 4 */}
                        <Section id="security-retention" number="04" title="Security & Retention">
                            <ul className="space-y-3">
                                <Li>
                                    <strong className="text-zinc-200">Security:</strong> We employ SSL/TLS encryption for all data in
                                    transit, secure API credential handling, environment-variable secret management, and restricted
                                    access protocols across our infrastructure.
                                </Li>
                                <Li>
                                    <strong className="text-zinc-200">Retention:</strong> We retain personal information only as long as
                                    necessary to fulfil the purposes outlined in this policy, or as required to comply with legal, tax,
                                    and accounting obligations. Project data is deleted or returned upon completion of the engagement
                                    unless otherwise agreed in writing.
                                </Li>
                                <Li>
                                    <strong className="text-zinc-200">Breach Notification:</strong> In the unlikely event of a data
                                    breach affecting your personal information, we will notify affected parties in accordance with
                                    applicable law, including GDPR's 72-hour notification requirement where applicable.
                                </Li>
                            </ul>
                        </Section>

                        <Divider />

                        {/* Section 5 */}
                        <Section id="your-rights" number="05" title="Your Data Rights">
                            <p className="text-zinc-400 font-['Inter',sans-serif] leading-relaxed mb-6">
                                Depending on your location, you have the following rights regarding your personal data:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                {[
                                    { right: "Right to Access", desc: "Request a copy of the personal data we hold about you." },
                                    { right: "Right to Rectification", desc: "Request corrections to inaccurate or incomplete data." },
                                    { right: "Right to Erasure", desc: 'Request deletion of your personal data ("Right to be Forgotten").' },
                                    { right: "Right to Portability", desc: "Request your data in a structured, machine-readable format." },
                                    { right: "Right to Object", desc: "Object to processing based on legitimate interests." },
                                    { right: "Right to Withdraw Consent", desc: "Withdraw consent for analytics or marketing at any time." },
                                ].map((item) => (
                                    <div key={item.right} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                                        <p className="text-zinc-200 text-sm font-semibold font-['Plus_Jakarta_Sans',sans-serif] mb-1">{item.right}</p>
                                        <p className="text-zinc-500 text-xs font-['Inter',sans-serif] leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <p className="text-zinc-400 font-['Inter',sans-serif] text-sm">
                                To exercise any of these rights, contact us at{' '}
                                <a href="mailto:growth@mr2labs.com" className="text-[#0066FF] hover:underline">growth@mr2labs.com</a>.
                                We will respond within 30 days. EU/EEA residents also have the right to lodge a complaint with their
                                local data protection authority.
                            </p>
                        </Section>

                        <Divider />

                        {/* Section 6 */}
                        <Section id="cookies" number="06" title="Cookies & Analytics">
                            <p className="text-zinc-400 font-['Inter',sans-serif] leading-relaxed mb-6">
                                Our website uses cookies - small text files stored on your device - to ensure functionality and
                                analyse performance.
                            </p>
                            <div className="overflow-x-auto rounded-lg border border-white/[0.06] mb-6">
                                <table className="w-full text-sm font-['Inter',sans-serif]">
                                    <thead>
                                        <tr className="border-b border-white/[0.06]">
                                            <th className="text-left text-zinc-500 font-medium px-4 py-3 text-xs uppercase tracking-wider">Type</th>
                                            <th className="text-left text-zinc-500 font-medium px-4 py-3 text-xs uppercase tracking-wider">Purpose</th>
                                            <th className="text-left text-zinc-500 font-medium px-4 py-3 text-xs uppercase tracking-wider">Essential?</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.04]">
                                        {[
                                            { type: "Functional", purpose: "Enable core site features and navigation", essential: "Yes" },
                                            { type: "Analytics (Google Analytics)", purpose: "Track page views, sessions, and traffic sources", essential: "No" },
                                            { type: "Preference", purpose: "Remember user settings and preferences", essential: "No" },
                                        ].map((row) => (
                                            <tr key={row.type} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="px-4 py-3 text-zinc-200 font-medium">{row.type}</td>
                                                <td className="px-4 py-3 text-zinc-400">{row.purpose}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`text-xs font-['Geist_Mono',monospace] px-2 py-0.5 rounded-full ${row.essential === "Yes" ? "bg-[#0066FF]/10 text-[#0066FF]" : "bg-white/[0.05] text-zinc-500"}`}>
                                                        {row.essential}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-zinc-500 text-sm font-['Inter',sans-serif]">
                                You can control or disable cookies through your browser settings. Disabling non-essential cookies
                                will not affect your ability to use core site features. To opt out of Google Analytics tracking
                                specifically, use the{' '}
                                <a href="https://tools.google.com/dlpage/gaoptout" className="text-[#0066FF] hover:underline" target="_blank" rel="noopener noreferrer">
                                    Google Analytics Opt-out Add-on
                                </a>.
                            </p>
                        </Section>

                        <Divider />

                        {/* Section 7 */}
                        <Section id="international" number="07" title="International Data Transfers">
                            <p className="text-zinc-400 font-['Inter',sans-serif] leading-relaxed mb-4">
                                Mr² Labs is operated from Sri Lanka. When you interact with our website or services, your personal
                                data may be transferred to and processed in countries outside your own, including the United States,
                                where our subprocessors are primarily located.
                            </p>
                            <p className="text-zinc-400 font-['Inter',sans-serif] leading-relaxed mb-4">
                                For visitors from the European Economic Area (EEA) or United Kingdom, these transfers are conducted
                                under appropriate safeguards, including Standard Contractual Clauses (SCCs) as required under GDPR
                                Article 46, implemented by our respective subprocessors.
                            </p>
                            <p className="text-zinc-400 font-['Inter',sans-serif] leading-relaxed">
                                For California residents, we comply with the California Consumer Privacy Act (CCPA). You have the
                                right to know what personal information we collect, request its deletion, and opt out of any sale
                                of your data. We do not sell personal information.
                            </p>
                        </Section>

                        <Divider />

                        {/* Section 8 */}
                        <Section id="third-party-links" number="08" title="Third-Party Links">
                            <p className="text-zinc-400 font-['Inter',sans-serif] leading-relaxed">
                                Our website may contain links to external sites, code repositories (e.g., GitHub), social media
                                platforms, or media channels. We have no control over and assume no responsibility for the content,
                                privacy policies, or practices of any third-party sites. We encourage you to review the privacy
                                policy of every site you visit.
                            </p>
                        </Section>

                        <Divider />

                        {/* Section 9 */}
                        <Section id="changes" number="09" title="Policy Changes">
                            <p className="text-zinc-400 font-['Inter',sans-serif] leading-relaxed">
                                We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
                                or legal requirements. Any material changes will be posted on this page with an updated "Last Updated"
                                date. Where required by law, we will notify affected users directly. Continued use of our website
                                after changes are posted constitutes acceptance of the updated policy.
                            </p>
                        </Section>

                        <Divider />

                        {/* Section 10 */}
                        <Section id="contact" number="10" title="Contact Us">
                            <p className="text-zinc-400 font-['Inter',sans-serif] leading-relaxed mb-6">
                                If you have questions, concerns, or requests regarding this Privacy Policy or your personal data,
                                please reach out - we typically respond within 2 business days.
                            </p>
                            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 flex flex-col sm:flex-row gap-6">
                                <div>
                                    <p className="text-zinc-600 text-[10px] font-['Geist_Mono',monospace] tracking-widest uppercase mb-1">Email</p>
                                    <a href="mailto:growth@mr2labs.com" className="text-[#0066FF] hover:underline font-['Inter',sans-serif] text-sm">
                                        growth@mr2labs.com
                                    </a>
                                </div>
                                <div className="hidden sm:block w-px bg-white/[0.06]" />
                                <div>
                                    <p className="text-zinc-600 text-[10px] font-['Geist_Mono',monospace] tracking-widest uppercase mb-1">Website</p>
                                    <a href="https://mr2labs.com" className="text-[#0066FF] hover:underline font-['Inter',sans-serif] text-sm">
                                        https://mr2labs.com
                                    </a>
                                </div>
                                <div className="hidden sm:block w-px bg-white/[0.06]" />
                                <div>
                                    <p className="text-zinc-600 text-[10px] font-['Geist_Mono',monospace] tracking-widest uppercase mb-1">Response Time</p>
                                    <p className="text-zinc-400 font-['Inter',sans-serif] text-sm">Within 2 business days</p>
                                </div>
                            </div>
                        </Section>

                    </div>
                </div>
            </div>

            <ScrollObserver />
        </main>
    );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function Divider() {
    return <hr className="border-white/[0.05] my-12" />;
}

function Section({ id, number, title, children }) {
    return (
        <section id={id} className="scroll-mt-32 mb-2" data-animate="slide-up">
            <div className="flex items-baseline gap-3 mb-6">
                <span className="text-[#0066FF] text-xs font-['Geist_Mono',monospace] shrink-0">{number}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">{title}</h2>
            </div>
            {children}
        </section>
    );
}

function SubHeading({ children }) {
    return (
        <h3 className="text-base font-semibold text-zinc-200 font-['Plus_Jakarta_Sans',sans-serif] mb-3 mt-8 first:mt-0">
            {children}
        </h3>
    );
}

function Li({ children }) {
    return (
        <li className="flex gap-3 text-zinc-400 font-['Inter',sans-serif] leading-relaxed text-sm">
            <span className="text-[#0066FF] mt-1.5 shrink-0 text-xs">▸</span>
            <span>{children}</span>
        </li>
    );
}