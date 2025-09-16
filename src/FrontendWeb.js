import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Code, Zap, Globe, Shield, ExternalLink, CheckCircle, Rocket, Database, Layers, Monitor, ArrowLeft, Home, Send, Menu, X } from 'lucide-react';
import './WebApps.css';

const FrontendWeb = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const benefitsRef = useRef(null);
  const techRef = useRef(null);
  const casesRef = useRef(null);
  const contentRef = useRef(null);
  const ctaRef = useRef(null);

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

  const mailtoLink = "mailto:mohrashard@gmail.com?subject=Request%20for%20Frontend%20Website%20Development&body=Hello%20Mohamed,%20I%20would%20like%20to%20discuss%20a%20new%20frontend%20website%20or%20landing%20page%20project.%20Please%20get%20back%20to%20me%20with%20more%20details.";

  const handleBack = () => {
    window.history.back();
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false); // Close menu after scroll
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCaseStudyClick = (link, title) => {
    if (window.gtag) {
      window.gtag('event', 'click', {
        'event_category': 'Case Study',
        'event_label': title,
        'value': 1
      });
    }
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleCTAClick = () => {
    if (window.gtag) {
      window.gtag('event', 'click', {
        'event_category': 'CTA',
        'event_label': 'Request Quote',
        'value': 1
      });
    }
  };

  const benefits = [
    {
      icon: <Zap className="webapp__benefit-icon" />,
      title: "Responsive Design for All Devices",
      description: "Websites that look perfect on desktop, tablet, and mobile with adaptive layouts"
    },
    {
      icon: <Globe className="webapp__benefit-icon" />,
      title: "SEO-Optimized Structure & Performance", 
      description: "Search engine friendly websites with fast loading speeds and proper semantic markup"
    },
    {
      icon: <Database className="webapp__benefit-icon" />,
      title: "Modern UI/UX with Tailwind CSS",
      description: "Beautiful, accessible interfaces with modern design principles and frameworks"
    },
    {
      icon: <Shield className="webapp__benefit-icon" />,
      title: "Fast Loading & Accessibility Focused",
      description: "Performance-optimized websites that follow accessibility standards (WCAG)"
    }
  ];

  const techStack = [
    {
      name: "React",
      description: "Modern UI library for interactive user interfaces",
      icon: <Code className="webapp__tech-icon" />
    },
    {
      name: "HTML5", 
      description: "Semantic markup for SEO and accessibility",
      icon: <Layers className="webapp__tech-icon" />
    },
    {
      name: "CSS3 & Tailwind",
      description: "Modern styling with utility-first CSS framework", 
      icon: <Database className="webapp__tech-icon" />
    },
    {
      name: "JavaScript",
      description: "Interactive functionality and dynamic content",
      icon: <Monitor className="webapp__tech-icon" />
    }
  ];

  const caseStudies = [
    {
      title: "Wanthem Landing Page",
      problem: "Need a minimalist, high-impact landing page to showcase a luxury watch brand",
      solution: "Single React landing page with Tailwind CSS, smooth animations, and clear call-to-action",
      result: "Clean, visually appealing landing page that effectively communicates brand value and drives user engagement",
      technologies: ["React", "Tailwind CSS", "UX/UI Design", "Animation"],
      link: "https://wanthem.vercel.app/"
    },
    {
      title: "OceansFlixx Movie Platform",
      problem: "Users need an engaging platform to discover trending movies and filter by genre or category",
      solution: "React application with JavaScript, movie API integration, dynamic content rendering, and filtering options",
      result: "Interactive movie recommendation platform showing trending films, with filters for genres and categories, improving user engagement and discovery",
      technologies: ["React", "JavaScript", "API Integration", "Dynamic Content", "Filtering" , "CSS" ,"MUI"],
      link: "https://oceansflixx.vercel.app/"
    },
    {
      title: "Mohamed Rashard Portfolio",
      problem: "Building a modern personal portfolio to showcase skills, projects, and professional experience",
      solution: "Single-page React application with Tailwind CSS, interactive sections, and performance optimization",
      result: "Fast-loading, visually appealing portfolio that effectively presents personal brand and professional work",
      technologies: ["React", "CSS", "Responsive Design", "Performance Optimization"],
      link: "https://mohamedrashard.vercel.app/"
    }
  ];

  const navSections = [
    { label: 'Services', icon: <Zap className="webapp__nav-icon-small" />, ref: benefitsRef },
    { label: 'Tech', icon: <Layers className="webapp__nav-icon-small" />, ref: techRef },
    { label: 'Cases', icon: <ExternalLink className="webapp__nav-icon-small" />, ref: casesRef },
    { label: 'Why Us', icon: <Shield className="webapp__nav-icon-small" />, ref: contentRef },
    { label: 'Quote', icon: <Send className="webapp__nav-icon-small" />, ref: ctaRef }
  ];

  return (
    <>
      <Helmet>
        <title>Frontend Website & Landing Page Development | React, Tailwind, SEO | Mohamed Rashard</title>
        <meta name="description" content="Modern, responsive, SEO-friendly websites and landing pages for businesses, startups, and personal brands using React, Tailwind CSS, HTML, CSS, and JavaScript." />
        <meta name="keywords" content="react development, tailwind css, frontend website, landing page development, seo friendly website, responsive web design, javascript developer, html css" />
        <meta name="author" content="Mohamed Rashard" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Frontend Website & Landing Page Development | React, Tailwind, SEO | Mohamed Rashard" />
        <meta property="og:description" content="Modern, responsive, SEO-friendly websites and landing pages for businesses, startups, and personal brands using React, Tailwind CSS, HTML, CSS, and JavaScript." />
        <meta property="og:url" content="https://mohamedrashard.vercel.app/services/frontend-websites" />
        <meta property="og:image" content="https://mohamedrashard.vercel.app/assets/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Frontend Website & Landing Page Development | React, Tailwind, SEO | Mohamed Rashard" />
        <meta name="twitter:description" content="Modern, responsive, SEO-friendly websites and landing pages for businesses, startups, and personal brands using React, Tailwind CSS, HTML, CSS, and JavaScript." />
        <meta name="twitter:image" content="https://mohamedrashard.vercel.app/assets/og-image.png" />
        <link rel="canonical" href="https://mohamedrashard.vercel.app/services/frontend-websites" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Mohamed Rashard",
            "email": "mohrashard@gmail.com",
            "url": "https://mohamedrashard.vercel.app/"
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Frontend Website & Landing Page Development",
            "description": "Modern, responsive, SEO-friendly websites and landing pages using React, Tailwind CSS, HTML, CSS, and JavaScript",
            "url": "https://mohamedrashard.vercel.app/services/frontend-websites",
            "author": {
              "@type": "Person",
              "name": "Mohamed Rashard",
              "email": "mohrashard@gmail.com"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://mohamedrashard.vercel.app/"
            }, {
              "@type": "ListItem",
              "position": 2,
              "name": "Frontend Development",
              "item": "https://mohamedrashard.vercel.app/services/frontend-websites"
            }]
          })}
        </script>
      </Helmet>
      <div className="webapp__webapp-container">
        {/* Enhanced Navigation Bar */}
        <nav className="webapp__nav-bar">
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
                Modern Frontend Development for{' '}
                <span className="webapp__gradient-text webapp__modern-tech-glow">
                  Websites & Landing Pages
                </span>
              </h1>
              <div className="webapp__title-underline"></div>
            </div>
            <p className="webapp__hero-subtitle webapp__animate-on-load">
              Build responsive, SEO-optimized, and visually stunning websites for startups, businesses, and personal brands.
            </p>
            <a href={mailtoLink} className="webapp__cta-btn webapp__cyber-btn webapp__animate-on-load" onClick={handleCTAClick}>
              <Rocket className="webapp__btn-icon" />
              <span>Request a Quote</span>
              <div className="webapp__btn-glow"></div>
            </a>
          </div>
          <div className="webapp__hero-bg-effect"></div>
          <div className="webapp__hero-overlay"></div>
        </section>

        {/* Service Overview Section */}
        <section ref={benefitsRef} className="webapp__section webapp__benefits-section">
          <div className="webapp__section-content">
            <h2 className="webapp__section-title webapp__animate-on-scroll">
              Why Choose Our Frontend Development Services?
            </h2>
            <div className="webapp__benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="webapp__benefit-card webapp__animate-on-scroll webapp__hover-glow">
                  <div className="webapp__card-border"></div>
                  <div className="webapp__benefit-icon-wrapper">
                    {benefit.icon}
                  </div>
                  <h3 className="webapp__benefit-title">{benefit.title}</h3>
                  <p className="webapp__benefit-description">{benefit.description}</p>
                  <div className="webapp__card-glow"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section ref={techRef} className="webapp__section webapp__tech-section">
          <div className="webapp__section-content">
            <h2 className="webapp__section-title webapp__animate-on-scroll">
              Modern Frontend Technology Stack
            </h2>
            <div className="webapp__tech-grid">
              {techStack.map((tech, index) => (
                <div key={index} className="webapp__tech-card webapp__animate-on-scroll webapp__cyber-card">
                  <div className="webapp__tech-icon-wrapper">
                    {tech.icon}
                  </div>
                  <h3 className="webapp__tech-name">{tech.name}</h3>
                  <p className="webapp__tech-description">{tech.description}</p>
                  <div className="webapp__tech-border"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section ref={casesRef} className="webapp__section webapp__cases-section">
          <div className="webapp__section-content">
            <h2 className="webapp__section-title webapp__animate-on-scroll">
              Success Stories & Case Studies
            </h2>
            <div className="webapp__cases-grid">
              {caseStudies.map((study, index) => (
                <div
                  key={index}
                  className="webapp__case-card webapp__animate-on-scroll"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCaseStudyClick(study.link, study.title)}
                  aria-label={`View ${study.title} case study`}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && handleCaseStudyClick(study.link, study.title)}
                >
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
                  <div className="webapp__case-border"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO-Friendly Content Block */}
        <section ref={contentRef} className="webapp__section webapp__content-section">
          <div className="webapp__section-content">
            <h2 className="webapp__section-title webapp__animate-on-scroll">
              Why Choose Frontend Development with React & Tailwind?
            </h2>
            <div className="webapp__content-text webapp__animate-on-scroll">
              <p>
                Custom React applications with Tailwind CSS provide unmatched flexibility and modern design capabilities 
                for businesses seeking an impactful online presence. Our expertise in responsive web design ensures your 
                website looks perfect on all devices while maintaining excellent search engine visibility through semantic 
                HTML structure and performance optimization. With clean, maintainable code architecture, your website will 
                be future-proof and easily extensible as your business grows.
              </p>
              <p>
                Professional landing page development requires careful planning, conversion-focused design, and technical 
                excellence. Our development approach focuses on creating visually stunning, fast-loading websites that 
                effectively communicate your brand message and drive user engagement. From personal portfolios to corporate 
                websites and startup landing pages, we deliver solutions that help you stand out in the digital landscape.
              </p>
            </div>
            
            <div className="webapp__features-grid webapp__animate-on-scroll">
              <div className="webapp__feature-item">
                <CheckCircle className="webapp__feature-icon" />
                <span className="webapp__feature-text">Responsive Web Design</span>
              </div>
              <div className="webapp__feature-item">
                <CheckCircle className="webapp__feature-icon" />
                <span className="webapp__feature-text">SEO-Friendly Structure</span>
              </div>
              <div className="webapp__feature-item">
                <CheckCircle className="webapp__feature-icon" />
                <span className="webapp__feature-text">Modern UI/UX</span>
              </div>
              <div className="webapp__feature-item">
                <CheckCircle className="webapp__feature-icon" />
                <span className="webapp__feature-text">Fast Loading Performance</span>
              </div>
            </div>
          </div>
        </section>

        {/* Final Call to Action */}
        <section ref={ctaRef} className="webapp__cta-section">
          <div className="webapp__cta-content">
            <h2 className="webapp__cta-title webapp__animate-on-scroll">
              Ready to Launch Your Website or Landing Page?
            </h2>
            <p className="webapp__cta-subtitle webapp__animate-on-scroll">
              Let's discuss your project requirements and create something amazing together.
            </p>
            <a href={mailtoLink} className="webapp__cta-btn webapp__cyber-btn webapp__final-cta webapp__animate-on-scroll" onClick={handleCTAClick}>
              <Rocket className="webapp__btn-icon" />
              <span>Request a Quote</span>
              <div className="webapp__btn-glow"></div>
            </a>
          </div>
          <div className="webapp__cta-bg-effect"></div>
        </section>
      </div>
      <noscript>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Frontend Website & Landing Page Development</h1>
          <p>Modern, responsive, SEO-friendly websites and landing pages for businesses, startups, and personal brands using React, Tailwind CSS, HTML, CSS, and JavaScript.</p>
          <a href={mailtoLink}>Request a Quote</a>
        </div>
      </noscript>
    </>
  );
};

export default FrontendWeb;