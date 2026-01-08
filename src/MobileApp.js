import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Code, Zap, Globe, Shield, ExternalLink, CheckCircle, Rocket, Database, Layers, Monitor, ArrowLeft, Home, Send, Menu, X, Smartphone, Settings, Users } from "lucide-react";
import { Helmet } from "react-helmet";
import "./WebApps.css";

const benefits = [
  {
    icon: <Smartphone className="webapp__benefit-icon" />,
    title: "Cross-Platform Development",
    description: "Build iOS and Android apps simultaneously with React Native for faster delivery and cost efficiency."
  },
  {
    icon: <Rocket className="webapp__benefit-icon" />,
    title: "Fast & User-Friendly UI/UX",
    description: "Stunning, intuitive interfaces optimized for performance and seamless user experience."
  },
  {
    icon: <Settings className="webapp__benefit-icon" />,
    title: "Scalable Architecture",
    description: "Designed to scale with your growing business needs, easy to maintain and upgrade."
  },
  {
    icon: <Users className="webapp__benefit-icon" />,
    title: "Startup-Friendly Solutions",
    description: "Tailored mobile solutions for startups and small businesses to launch quickly and efficiently."
  }
];

const techStack = [
  {
    name: "React Native",
    description: "Framework for building native mobile apps using React",
    icon: <Code className="webapp__tech-icon" />
  },
  {
    name: "Expo",
    description: "Platform and toolset for building universal React Native apps quickly",
    icon: <Layers className="webapp__tech-icon" />
  },
  {
    name: "TypeScript",
    description: "Type-safe development for maintainable and scalable mobile apps",
    icon: <Monitor className="webapp__tech-icon" />
  },
  {
    name: "Firebase",
    description: "Backend services for authentication, real-time database, and cloud functions",
    icon: <Database className="webapp__tech-icon" />
  },
  {
    name: "Flutter",
    description: "UI toolkit from Google for building natively compiled, cross-platform mobile apps",
    icon: <Globe className="webapp__tech-icon" />
  }
];

const caseStudies = [
  {
    title: "PawPal Nutritions",
    type: "Mobile App Demo",
    problem: "Dog owners needed an easy way to browse and purchase dog food online",
    solution: "Android app prototype built with Java, showcasing a dog food marketplace with product listing, categories, and basic cart functionality",
    result: "Interactive demo demonstrating app workflow, product browsing, and marketplace features for potential clients",
    technologies: ["Java", "Android Studio", "UI/UX Design", "Marketplace Prototype"]
  }
];

const personData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mohamed Rashard",
  "email": "mohrashard@gmail.com",
  "url": "https://www.mohamedrashard.dev/",
  "jobTitle": "Mobile App Developer"
};

const creativeWorkData = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Mobile App Development Services",
  "description": "Cross-platform mobile app development with React Native and Expo. iOS and Android apps for startups and small businesses.",
  "url": "https://www.mohamedrashard.dev/services/mobile-apps",
  "author": {
    "@type": "Person",
    "name": "Mohamed Rashard"
  }
};

const serviceData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Mobile App Development",
  "name": "Cross-Platform Mobile App Development",
  "description": "Professional React Native and Expo mobile app development services for iOS and Android platforms",
  "provider": {
    "@type": "Person",
    "name": "Mohamed Rashard",
    "email": "mohrashard@gmail.com"
  },
  "areaServed": "Worldwide",
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://www.mohamedrashard.dev/services/mobile-apps"
  }
};

const MobileApps = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const benefitsRef = useRef(null);
  const techRef = useRef(null);
  const casesRef = useRef(null);
  const contentRef = useRef(null);
  const ctaRef = useRef(null);

  const navSections = useMemo(() => [
    { label: 'Benefits', icon: <Zap className="webapp__nav-icon-small" />, ref: benefitsRef },
    { label: 'Tech', icon: <Layers className="webapp__nav-icon-small" />, ref: techRef },
    { label: 'Cases', icon: <ExternalLink className="webapp__nav-icon-small" />, ref: casesRef },
    { label: 'Why Us', icon: <Shield className="webapp__nav-icon-small" />, ref: contentRef },
    { label: 'Quote', icon: <Send className="webapp__nav-icon-small" />, ref: ctaRef }
  ], []);

  useEffect(() => {
    // Add page entrance animations
    const elements = document.querySelectorAll('.webapp__animate-on-load');
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`;
      el.classList.add('webapp__fade-in-up');
    });

    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('webapp__animate-in-view');
        }
      });
    }, { threshold: 0.1 });

    const scrollElements = document.querySelectorAll('.webapp__animate-on-scroll');
    scrollElements.forEach(el => observer.observe(el));

    return () => {
      scrollElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const mailtoLink = "mailto:mohrashard@gmail.com?subject=Request%20for%20Mobile%20App%20Development&body=Hello%20Mohamed,%20I%20would%20like%20to%20discuss%20a%20new%20mobile%20app%20project.%20Please%20get%20back%20to%20me%20with%20more%20details.";

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  const scrollToSection = useCallback((ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false); // Close menu after scroll
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Mobile App Development Services | React Native, Expo | Mohamed Rashard</title>
        <meta name="description" content="Cross-platform mobile app development with React Native and Expo. iOS and Android apps for startups and small businesses." />
        <meta name="keywords" content="Mohamed Rashard Rizmi, Software Developer, Affordable Software Developer, AI Engineer, Web Developer, Custom Web Developer, E-commerce Developer, Social Media Marketing, Video Editing, Full Stack Developer, React Developer, Next.js Developer, Sri Lanka, Colombo, React Native, Mobile Apps" />
        <meta name="author" content="Mohamed Rashard" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="canonical" href="https://www.mohamedrashard.dev/services/mobile-apps" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Mobile App Development Services | React Native, Expo | Mohamed Rashard" />
        <meta property="og:description" content="Cross-platform mobile app development with React Native and Expo. iOS and Android apps for startups and small businesses." />
        <meta property="og:url" content="https://www.mohamedrashard.dev/services/mobile-apps" />
        <meta property="og:image" content="https://www.mohamedrashard.dev/assets/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Mohamed Rashard" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mobile App Development Services | React Native, Expo | Mohamed Rashard" />
        <meta name="twitter:description" content="Cross-platform mobile app development with React Native and Expo. iOS and Android apps for startups and small businesses." />
        <meta name="twitter:image" content="https://www.mohamedrashard.dev/assets/og-image.png" />
        <meta name="twitter:creator" content="@mohamedrashard" />

        <script type="application/ld+json">
          {JSON.stringify(personData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(creativeWorkData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(serviceData)}
        </script>
      </Helmet>
      <div className="webapp__webapp-container">
        {/* Enhanced Navigation Bar */}
        <nav className="webapp__nav-bar" aria-label="Navigation">
          {/* Left: Back and Home */}
          <div className="webapp__nav-left">
            <button onClick={handleBack} className="webapp__nav-btn webapp__nav-action-btn" aria-label="Go back">
              <ArrowLeft className="webapp__nav-icon" />
              <span>Back</span>
            </button>
            <a href="/" className="webapp__nav-btn webapp__nav-action-btn" aria-label="Go home">
              <Home className="webapp__nav-icon" />
              <span>Home</span>
            </a>
          </div>

          {/* Right: Hamburger for Mobile */}
          <button
            onClick={toggleMenu}
            className="webapp__nav-hamburger"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="webapp__nav-icon" /> : <Menu className="webapp__nav-icon" />}
          </button>

          {/* Center: Section Links (Desktop) */}
          <div className={`webapp__nav-center ${isMenuOpen ? 'webapp__nav-center--open' : ''}`}>
            {navSections.map((section, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(section.ref)}
                className="webapp__nav-btn webapp__nav-section-btn"
                aria-label={`Scroll to ${section.label}`}
              >
                {section.icon}
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile Dropdown Overlay */}
        {isMenuOpen && (
          <div className="webapp__nav-dropdown-overlay" onClick={toggleMenu}></div>
        )}

        {/* Futuristic Background Effects */}
        <div className="webapp__cyber-grid" aria-hidden="true"></div>
        <div className="webapp__floating-particles" aria-hidden="true"></div>

        {/* Hero Section */}
        <section className="webapp__hero-section">
          <div className="webapp__hero-content webapp__animate-on-load">
            <div className="webapp__hero-title-wrapper">
              <h1 className="webapp__hero-title">
                Build High-Performance{' '}
                <span className="webapp__gradient-text webapp__modern-tech-glow">
                  Mobile Apps
                </span>
              </h1>
              <div className="webapp__title-underline" aria-hidden="true"></div>
            </div>
            <p className="webapp__hero-subtitle webapp__animate-on-load">
              Cross-platform apps designed for startups and small businesses.
            </p>
            <a href={mailtoLink} className="webapp__cta-btn webapp__cyber-btn webapp__animate-on-load">
              <Rocket className="webapp__btn-icon" />
              <span>Request a Quote</span>
              <div className="webapp__btn-glow" aria-hidden="true"></div>
            </a>
          </div>
          <div className="webapp__hero-bg-effect" aria-hidden="true"></div>
          <div className="webapp__hero-overlay" aria-hidden="true"></div>
        </section>

        {/* Benefits Section */}
        <section ref={benefitsRef} className="webapp__section webapp__benefits-section">
          <div className="webapp__section-content">
            <h2 className="webapp__section-title webapp__animate-on-scroll">
              Why Choose Our Mobile App Services
            </h2>
            <div className="webapp__benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="webapp__benefit-card webapp__animate-on-scroll webapp__hover-glow">
                  <div className="webapp__card-border" aria-hidden="true"></div>
                  <div className="webapp__benefit-icon-wrapper">
                    {benefit.icon}
                  </div>
                  <h3 className="webapp__benefit-title">{benefit.title}</h3>
                  <p className="webapp__benefit-description">{benefit.description}</p>
                  <div className="webapp__card-glow" aria-hidden="true"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section ref={techRef} className="webapp__section webapp__tech-section">
          <div className="webapp__section-content">
            <h2 className="webapp__section-title webapp__animate-on-scroll">
              Our Mobile Technology Stack
            </h2>
            <div className="webapp__tech-grid">
              {techStack.map((tech, index) => (
                <div key={index} className="webapp__tech-card webapp__animate-on-scroll webapp__cyber-card">
                  <div className="webapp__tech-icon-wrapper">
                    {tech.icon}
                  </div>
                  <h3 className="webapp__tech-name">{tech.name}</h3>
                  <p className="webapp__tech-description">{tech.description}</p>
                  <div className="webapp__tech-border" aria-hidden="true"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section ref={casesRef} className="webapp__section webapp__cases-section">
          <div className="webapp__section-content">
            <h2 className="webapp__section-title webapp__animate-on-scroll">
              Mobile App Case Studies
            </h2>
            <div className="webapp__cases-grid">
              {caseStudies.map((study, index) => (
                <div key={index} className="webapp__case-card webapp__animate-on-scroll">
                  <div className="webapp__case-header">
                    <h3 className="webapp__case-title">
                      {study.title}
                    </h3>
                    <ExternalLink className="webapp__case-link-icon" />
                  </div>

                  <div className="webapp__case-content">
                    <div className="webapp__case-section">
                      <h4 className="webapp__case-label webapp__problem-label">Problem:</h4>
                      <p className="webapp__case-text">{study.problem}</p>
                    </div>

                    <div className="webapp__case-section">
                      <h4 className="webapp__case-label webapp__solution-label">Solution:</h4>
                      <p className="webapp__case-text">{study.solution}</p>
                    </div>

                    <div className="webapp__case-section">
                      <h4 className="webapp__case-label webapp__result-label">Result:</h4>
                      <p className="webapp__case-text">{study.result}</p>
                    </div>

                    <div className="webapp__tech-tags">
                      {study.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="webapp__tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="webapp__case-border" aria-hidden="true"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO-Friendly Content Block */}
        <section ref={contentRef} className="webapp__section webapp__content-section">
          <div className="webapp__section-content">
            <h2 className="webapp__section-title webapp__animate-on-scroll">
              Why Choose React Native for Your Mobile App?
            </h2>
            <div className="webapp__content-text webapp__animate-on-scroll">
              <p>
                React Native allows us to create cross-platform mobile apps with a single codebase,
                delivering fast and responsive user experiences on both iOS and Android. Startups
                benefit from reduced development time while retaining a native look and feel. Our
                solutions ensure scalable architecture, smooth UX, and cutting-edge features for
                your mobile business needs.
              </p>
              <p>
                With performance optimization and access to native device features, React Native
                provides the perfect balance between development efficiency and app performance.
                Our expertise ensures your mobile application will be maintainable, scalable, and
                ready for future enhancements as your business grows.
              </p>
            </div>

            <div className="webapp__features-grid webapp__animate-on-scroll">
              <div className="webapp__feature-item">
                <CheckCircle className="webapp__feature-icon" />
                <span className="webapp__feature-text">Cross-Platform Development</span>
              </div>
              <div className="webapp__feature-item">
                <CheckCircle className="webapp__feature-icon" />
                <span className="webapp__feature-text">Native Performance</span>
              </div>
              <div className="webapp__feature-item">
                <CheckCircle className="webapp__feature-icon" />
                <span className="webapp__feature-text">Cost Efficiency</span>
              </div>
            </div>
          </div>
        </section>

        {/* Final Call to Action */}
        <section ref={ctaRef} className="webapp__cta-section">
          <div className="webapp__cta-content">
            <h2 className="webapp__cta-title webapp__animate-on-scroll">
              Ready to Launch Your Mobile App?
            </h2>
            <p className="webapp__cta-subtitle webapp__animate-on-scroll">
              Contact me today to discuss your project and get a tailored quote.
            </p>
            <a href={mailtoLink} className="webapp__cta-btn webapp__cyber-btn webapp__final-cta webapp__animate-on-scroll">
              <Rocket className="webapp__btn-icon" />
              <span>Request a Quote</span>
              <div className="webapp__btn-glow" aria-hidden="true"></div>
            </a>
          </div>
          <div className="webapp__cta-bg-effect" aria-hidden="true"></div>
        </section>
      </div>
    </>
  );
};
export default React.memo(MobileApps);