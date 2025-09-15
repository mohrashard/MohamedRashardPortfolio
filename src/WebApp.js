import React, { useEffect, useRef, useState } from 'react';
import { Code, Zap, Globe, Shield, ExternalLink,Cpu, CheckCircle, Rocket, Database, Layers, Monitor, ArrowLeft, Home, Send, Menu, X } from 'lucide-react';
import './WebApps.css';

const WebApp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const benefitsRef = useRef(null);
  const techRef = useRef(null);
  const casesRef = useRef(null);
  const contentRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "Web Development Services | React, Next.js, Node.js | Mohamed Rashard";
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Custom React and Next.js applications with scalable Node.js backends, SEO optimization, and modern architecture for startups and enterprises.');
    
    // Add structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Web Development Services",
      "description": "Custom React and Next.js applications with scalable Node.js backends",
      "provider": {
        "@type": "Person",
        "name": "Mohamed Rashard",
        "email": "mohrashard@gmail.com"
      },
      "serviceType": "Web App Development",
      "areaServed": "Worldwide"
    };
    
    let scriptTag = document.getElementById('web-dev-structured-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'web-dev-structured-data';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

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

  const mailtoLink = "mailto:mohrashard@gmail.com?subject=Request%20for%20Web%20Application%20Development&body=Hello%20Mohamed,%20I%20would%20like%20to%20discuss%20a%20new%20web%20application%20project.%20Please%20get%20back%20to%20me%20with%20more%20details.";

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

const benefits = [
  {
    icon: <Zap className="webapp__benefit-icon" />,
    title: "Lightning-fast Frontend Development",
    description: "Build modern, high-performance web applications using React.js and Next.js with optimized UI/UX and seamless interactivity"
  },
  {
    icon: <Database className="webapp__benefit-icon" />,
    title: "Robust Backend Solutions",
    description: "Scalable backend architectures using Node.js with Express, Python with Flask, or Java with Spring Boot for reliable server-side functionality"
  },
  {
    icon: <Code className="webapp__benefit-icon" />,
    title: "Full-Stack Application Development",
    description: "Integrate frontend and backend seamlessly to create complete applications with efficient data flow and responsive design"
  },
  {
    icon: <Shield className="webapp__benefit-icon" />,
    title: "Custom Enterprise Software Solutions",
    description: "Tailored software for complex business workflows, combining backend APIs, databases, and secure frontend interfaces"
  },
  {
    icon: <Globe className="webapp__benefit-icon" />,
    title: "SEO Optimization & Performance Tuning",
    description: "Ensure search engine visibility and blazing fast loading speeds with optimized code and modern web practices"
  }
];

const techStack = [
  {
    name: "HTML5",
    description: "Standard markup language for structuring web content",
    icon: <Code className="webapp__tech-icon" />
  },
  {
    name: "CSS3",
    description: "Styling language for designing responsive and visually appealing interfaces",
    icon: <Layers className="webapp__tech-icon" />
  },
  {
    name: "JavaScript",
    description: "Programming language for interactive and dynamic web applications",
    icon: <Zap className="webapp__tech-icon" />
  },
  {
    name: "PHP",
    description: "Server-side scripting language for building dynamic web applications",
    icon: <Database className="webapp__tech-icon" />
  },
  {
    name: "React",
    description: "Modern UI library for building interactive user interfaces",
    icon: <Code className="webapp__tech-icon" />
  },
  {
    name: "Next.js",
    description: "Full-stack React framework for production-ready web applications",
    icon: <Layers className="webapp__tech-icon" />
  },
  {
    name: "Node.js",
    description: "Scalable backend runtime for high-performance APIs",
    icon: <Database className="webapp__tech-icon" />
  },
  {
    name: "TypeScript",
    description: "Type-safe JavaScript for maintainable and scalable codebases",
    icon: <Monitor className="webapp__tech-icon" />
  },
  {
    name: "Python/Flask",
    description: "Lightweight Python framework for building APIs and backend services",
    icon: <Cpu className="webapp__tech-icon" />
  },
  {
    name: "Java/Spring Boot",
    description: "Robust Java framework for building enterprise-grade backend applications",
    icon: <Globe className="webapp__tech-icon" />
  }
];

const caseStudies = [
  {
    title: "LiverLens",
    type: "Web Application",
    problem: "Healthcare providers needed accurate liver disease risk prediction tools",
    solution: "Developed a machine learning model using clinical data for early detection",
    result: "AI-powered diagnostic tool that helps doctors assess liver disease risk with 92% accuracy",
    technologies: ["Python", "scikit-learn", "Medical AI", "Predictive Modeling"],
    github: "https://github.com/mohrashard/LiverLens.git"
  },
  {
    title: "Mentora AI",
    type: "Web Application",
    problem: "Lack of personalized mental wellness insights for users",
    solution: "Built an AI platform that analyzes user input to provide mental health insights",
    result: "Mental wellness platform with AI-powered personalized recommendations and tracking",
    technologies: ["Python", "scikit-learn", "Medical AI", "Predictive Modeling", "Recommendation Engine"],
    github: "https://github.com/mohrashard/mentora.git"
  },
  {
    title: "Tasknet",
    type: "Web Platform",
    problem: "Local buyers and service providers lacked a unified platform for collaboration",
    solution: "Collaborated in a team to develop a web platform using HTML, CSS, JavaScript, and PHP",
    result: "User-friendly system with secure transactions and location-based service matching",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "Web Development"],
    github: "https://github.com/mohrashard/TaskNet" // replace with actual GitHub link if available
  },
  {
    title: "MegaCityCab",
    type: "Ride Booking Management System",
    problem: "Colombo's cab service needed a secure and manageable booking system",
    solution: "Built a ride booking system using Java, AJAX, and MSSQL with secure login and role-based access",
    result: "Customizable bookings, multiple payment options, and streamlined management for passengers, drivers, and admins",
    technologies: ["Java", "AJAX", "MSSQL", "Web Development", "Database Management"],
    github: "https://github.com/mohrashard/MegaCityCab" // replace with actual GitHub link if available
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
      <div className="webapp__cyber-grid"></div>
      <div className="webapp__floating-particles"></div>
      
      {/* Hero Section */}
      <section className="webapp__hero-section">
        <div className="webapp__hero-content webapp__animate-on-load">
          <div className="webapp__hero-title-wrapper">
            <h1 className="webapp__hero-title">
              Custom Web Development with{' '}
              <span className="webapp__gradient-text webapp__modern-tech-glow">
                Modern Technologies
              </span>
            </h1>
            <div className="webapp__title-underline"></div>
          </div>
          <p className="webapp__hero-subtitle webapp__animate-on-load">
            Scalable, SEO-friendly web applications built with cutting-edge tools for businesses and startups.
          </p>
          <a href={mailtoLink} className="webapp__cta-btn webapp__cyber-btn webapp__animate-on-load">
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
            Why Choose Our Web App Development Services?
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
            Cutting-Edge Technology Stack
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
  Web App Success Stories
    </h2>
    <div className="webapp__cases-grid">
      {caseStudies.map((study, index) => (
        <div
          key={index}
          className="webapp__case-card webapp__animate-on-scroll"
          onClick={() => window.open(study.github, "_blank")}
          style={{ cursor: "pointer" }}
        >
          <div className="webapp__case-header">
            <h3 className="webapp__case-title">
              {study.title} <span className="webapp__case-type">({study.type})</span>
            </h3>
            <ExternalLink className="webapp__case-link-icon" />
          </div>

          <div className="webapp__case-content">
            <div className="webapp__case-section">
              <h4 className="webapp__case-label webapp__problem-label">Challenge:</h4>
              <p className="webapp__case-text">{study.problem}</p>
            </div>

            <div className="webapp__case-section">
              <h4 className="webapp__case-label webapp__solution-label">AI Solution:</h4>
              <p className="webapp__case-text">{study.solution}</p>
            </div>

            <div className="webapp__case-section">
              <h4 className="webapp__case-label webapp__result-label">Impact:</h4>
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
            Why Choose Custom Web App Development?
          </h2>
          <div className="webapp__content-text webapp__animate-on-scroll">
            <p>
              Custom React applications provide unmatched flexibility and performance for modern businesses seeking digital transformation. 
              Our expertise in Next.js performance optimization ensures your web applications load instantly while maintaining excellent 
              search engine visibility. With scalable backend architecture built on Node.js, your application can handle growing user 
              demands without compromising on speed or reliability.
            </p>
            <p>
              Enterprise-grade software solutions require careful planning, robust architecture, and future-proof technology choices. 
              Our development approach focuses on creating maintainable, secure, and scalable applications that serve as the foundation 
              for your digital growth strategy. From startup MVPs to complex enterprise systems, we deliver solutions that drive 
              business success.
            </p>
          </div>
          
          <div className="webapp__features-grid webapp__animate-on-scroll">
            <div className="webapp__feature-item">
              <CheckCircle className="webapp__feature-icon" />
              <span className="webapp__feature-text">Custom React Applications</span>
            </div>
            <div className="webapp__feature-item">
              <CheckCircle className="webapp__feature-icon" />
              <span className="webapp__feature-text">Next.js Performance</span>
            </div>
            <div className="webapp__feature-item">
              <CheckCircle className="webapp__feature-icon" />
              <span className="webapp__feature-text">Scalable Backend</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section ref={ctaRef} className="webapp__cta-section">
        <div className="webapp__cta-content">
          <h2 className="webapp__cta-title webapp__animate-on-scroll">
            Ready to Build Your Next Web App?
          </h2>
          <p className="webapp__cta-subtitle webapp__animate-on-scroll">
            Let's discuss your project requirements and create something amazing together.
          </p>
          <a href={mailtoLink} className="webapp__cta-btn webapp__cyber-btn webapp__final-cta webapp__animate-on-scroll">
            <Rocket className="webapp__btn-icon" />
            <span>Request a Quote</span>
            <div className="webapp__btn-glow"></div>
          </a>
        </div>
        <div className="webapp__cta-bg-effect"></div>
      </section>
    </div>
  );
};

export default WebApp;