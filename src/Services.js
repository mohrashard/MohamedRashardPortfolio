import { useEffect, useRef, useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Zap, Send, Menu, X } from "lucide-react";
import { Helmet } from "react-helmet";
import "./Services.css";

export default function Services() {
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const ctaRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Services | Mohamed Rashard";
    setIsLoaded(true);

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const cards = document.querySelectorAll(".service-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);
  

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navSections = [
    { label: 'Services', icon: <Zap className="services-nav-icon-small" />, ref: cardsRef },
    { label: 'Contact', icon: <Send className="services-nav-icon-small" />, ref: ctaRef }
  ];

  const services = [
    {
      icon: "💻",
      title: "Web Development",
      slug: "web-apps",
      description: "Custom React and Next.js applications with modern architecture, optimized performance, and scalable backends.",
      features: [
        "Lightning-fast React & Next.js development",
        "Scalable Node.js backend architecture",
        "SEO optimization & performance tuning",
        "Custom enterprise software solutions"
      ],
      gradient: "gradient-primary",
      tech: ["React", "Next.js", "Node.js", "TypeScript"]
    },
    {
      icon: "🌐",
      title: "Frontend Websites / Landing Pages Development",
      slug: "frontend-websites",
      description: "I build modern, responsive, SEO-friendly websites and landing pages for businesses, startups, and personal brands using React, HTML, CSS, JavaScript, and Tailwind.",
      features: [
        "Responsive design for all devices",
        "SEO-optimized structure & performance",
        "Modern UI/UX with Tailwind CSS",
        "Fast loading times & accessibility"
      ],
      gradient: "gradient-accent",
      tech: ["React", "HTML", "CSS", "Tailwind", "JavaScript"]
    },
    {
      icon: "📱",
      title: "Mobile Development",
      slug: "mobile-apps",
      description: "Cross-platform mobile applications using React Native, delivering native performance with shared codebase efficiency.",
      features: [
        "React Native cross-platform development",
        "Native iOS and Android performance",
        "App Store & Google Play deployment",
        "Offline functionality & push notifications"
      ],
      gradient: "gradient-secondary",
      tech: ["React Native", "iOS", "Android", "Firebase"]
    },
    {
      icon: "🤖",
      title: "AI & Machine Learning",
      slug: "ai-solutions",
      description: "Intelligent AI integrations including NLP, chatbots, and predictive analytics to automate processes.",
      features: [
        "Natural Language Processing integration",
        "Intelligent chatbots & virtual assistants",
        "Predictive analytics & data insights",
        "Custom AI solutions for automation"
      ],
      gradient: "gradient-accent",
      tech: ["Python", "TensorFlow", "OpenAI", "Machine Learning"]
    }
  ];

  const handleViewMore = (serviceSlug) => {
    navigate(`/services/${serviceSlug}`);
  };

  const handleStartProject = () => {
    const activeElement = document.activeElement;
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
      <div class="project-modal-content">
        <div class="modal-icon">🚀</div>
        <h3>Ready to Build Something Amazing?</h3>
        <p>Let's discuss your vision and create something extraordinary together!</p>
        <div class="modal-actions">
          <button class="modal-btn primary" data-action="email" aria-label="Send email inquiry">
            📧 Send Email
          </button>
          <button class="modal-btn secondary" data-action="call" aria-label="Call +94719382296">
            📞 Call Now
          </button>
          <button class="modal-btn tertiary" data-action="close" aria-label="Close modal">
            ✕ Close
          </button>
        </div>
      </div>
    `;

    const handleModalClick = (e) => {
      const action = e.target.closest('[data-action]')?.dataset.action;
      
      switch (action) {
        case 'email':
          const subject = encodeURIComponent('New Project Inquiry - Let\'s Build Something Amazing!');
          const body = encodeURIComponent(
            `Hi there,\n\nI'm ready to start a new project and would love to discuss my ideas with you.\n\nI'm particularly interested in:\n\n• Web Development\n• Mobile Development\n• AI Integration\n• Frontend Websites\n\nLet's schedule a call to bring my vision to life!\n\nBest regards`
          );
          window.open(`mailto:mohrashard@gmail.com?subject=${subject}&body=${body}`, '_blank');
          modal.remove();
          activeElement?.focus();
          break;
          
        case 'call':
          window.open('tel:+94719382296', '_self');
          modal.remove();
          activeElement?.focus();
          break;
          
        case 'close':
          modal.remove();
          activeElement?.focus();
          break;
      }
    };

    modal.addEventListener('click', handleModalClick);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
        activeElement?.focus();
      }
    });

    document.body.appendChild(modal);
    setTimeout(() => {
      modal.classList.add('show');
      modal.querySelector('button[data-action="email"]').focus();
    }, 10);
  };

  const TechGrid = ({ tech }) => (
    <div className="tech-stack">
      {tech.map((item, index) => (
        <span key={index} className="tech-badge">
          {item}
        </span>
      ))}
    </div>
  );

  const FloatingParticles = () => {
    const particles = Array.from({ length: 30 }, (_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 15}s`,
          animationDuration: `${20 + Math.random() * 15}s`,
        }}
      />
    ));
    return <div className="particles-container">{particles}</div>;
  };

  const pageDescription = "Expert React developer specializing in cutting-edge web applications, responsive frontend websites, cross-platform mobile solutions, and intelligent AI integrations that drive business growth and innovation.";
  const pageKeywords = "web development, mobile development, AI solutions, React, Next.js, React Native, frontend development, landing pages, machine learning";
  const ogImage = "https://mohamedrashard.vercel.app/assets/og-image.png";
  const currentUrl = window.location.href;
  const currentOrigin = window.location.origin;

  const personSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mohamed Rashard",
    "url": currentOrigin,
    "email": "mohrashard@gmail.com",
    "telephone": "+94719382296",
    "jobTitle": "Software Developer",
    "knowsAbout": ["Web Development", "Mobile Development", "AI", "Machine Learning"]
  });

  const webPageSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Services | Mohamed Rashard",
    "description": pageDescription,
    "url": currentUrl,
    "author": {
      "@type": "Person",
      "name": "Mohamed Rashard"
    }
  });

  return (
    <>
      <Helmet>
        <title>Services | Mohamed Rashard</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="author" content="Mohamed Rashard" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Mohamed Rashard | Services" />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Mohamed Rashard" />
        <meta name="twitter:title" content="Services | Mohamed Rashard" />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@mohrashard" />
        <link rel="canonical" href={currentUrl} />
        <link rel="preload" as="image" href={ogImage} />
        <link rel="manifest" href="/manifest.json" />
        <script type="application/ld+json">{personSchema}</script>
        <script type="application/ld+json">{webPageSchema}</script>
      </Helmet>
      <div className="services-page">
        
        <Suspense fallback={null}>
          <FloatingParticles />
        </Suspense>

        {/* Navigation */}
        <nav className="services-nav-bar">
          {/* Left: Back and Home */}
          <div className="services-nav-left">
            <button onClick={() => navigate(-1)} className="services-nav-btn services-nav-action-btn" aria-label="Go back">
              <ArrowLeft className="services-nav-icon" />
              <span>Back</span>
            </button>
            <a href="/" className="services-nav-btn services-nav-action-btn" aria-label="Go home">
              <Home className="services-nav-icon" />
              <span>Home</span>
            </a>
          </div>

          {/* Right: Hamburger for Mobile */}
          <button 
            onClick={toggleMenu} 
            className="services-nav-hamburger" 
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="services-nav-icon" /> : <Menu className="services-nav-icon" />}
          </button>

          {/* Center: Section Links (Desktop) */}
          <div className={`services-nav-center ${isMenuOpen ? 'services-nav-center--open' : ''}`}>
            {navSections.map((section, index) => (
              <button 
                key={index}
                onClick={() => scrollToSection(section.ref)}
                className="services-nav-btn services-nav-section-btn"
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
          <div className="services-nav-dropdown-overlay" onClick={toggleMenu}></div>
        )}

        {/* Hero Section */}
        <header 
          ref={heroRef}
          className="services-hero"
        >
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="floating-orb orb-3"></div>

          <div className="hero-content">
            <div className="hero-badge">
              ✨ Next-Generation Development Services
            </div>

            <h1 className="hero-title">
              Web, Mobile, Frontend & AI Solutions for Modern Businesses
            </h1>

            <p className="hero-description">
              Expert React developer specializing in cutting-edge web applications, responsive frontend websites, 
              cross-platform mobile solutions, and intelligent AI integrations that drive business growth and innovation.
            </p>

            <button 
              className="cta-button primary pulse" 
              onClick={handleStartProject}
              aria-label="Start your project with professional development services"
            >
              🚀 Start Your Project
            </button>
          </div>
        </header>

        {/* Services Section */}
        <main 
          ref={cardsRef}
          className="services-section"
          id="main-content"
        >
          <div className="services-container">
            <h2 className="section-title">
              Professional Development Services
            </h2>

            <div className="services-grid">
              {services.map((service, index) => (
                <article 
                  key={index}
                  className="service-card"
                  itemScope 
                  itemType="https://schema.org/Service"
                >
                  <meta itemProp="serviceType" content={service.tech.join(', ')} />
                  <div className={`service-icon ${service.gradient}`}>
                    <span role="img" aria-label={`${service.title} icon`}>{service.icon}</span>
                    <div className="icon-glow"></div>
                  </div>

                  <h3 className="service-title" itemProp="name">
                    {service.title}
                  </h3>

                  <p className="service-description" itemProp="description">
                    {service.description}
                  </p>

                  <TechGrid tech={service.tech} />

                  <ul className="service-features" itemProp="hasOfferCatalog">
                    {service.features.map((feature, i) => (
                      <li key={i} className="feature-item">
                        <span className="feature-check" aria-hidden="true">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button 
                    className="cta-button secondary glow" 
                    onClick={() => handleViewMore(service.slug)}
                    aria-label={`View more details about ${service.title}`}
                  >
                    👁️ View More
                  </button>
                </article>
              ))}
            </div>
          </div>
        </main>

        {/* Call to Action Section */}
        <section ref={ctaRef} className="cta-section" aria-labelledby="cta-heading">
          <div className="cta-bg-orb cta-orb-1"></div>
          <div className="cta-bg-orb cta-orb-2"></div>

          <div className="cta-content">
            <h2 id="cta-heading" className="cta-title">
              Ready to Transform Your Business?
            </h2>

            <p className="cta-description">
              Let's discuss your project and create innovative solutions that drive growth, enhance user experience, and 
              position your business at the forefront of technology.
            </p>

            <button 
              className="cta-button primary large pulse" 
              onClick={handleStartProject}
              aria-label="Contact me to start your transformative project"
            >
              🌟 Start Your Project Today
            </button>
          </div>
        </section>

        {/* Performance optimization: Preload critical images */}
        <link rel="preload" as="image" href="/favicon.ico" />

        {/* SEO Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Development Services",
            "description": "Professional web development, mobile app development, frontend websites, and AI solutions",
            "itemListElement": services.map((service, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Service",
                "name": service.title,
                "description": service.description,
                "serviceType": service.tech.join(", "),
                "provider": {
                  "@type": "Person",
                  "name": "Mohamed Rashard"
                }
              }
            }))
          })}
        </script>

        {/* Breadcrumb Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": window.location.origin
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": window.location.href
              }
            ]
          })}
        </script>
      </div>
    </>
  );
}