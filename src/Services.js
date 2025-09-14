import { useEffect, useRef, useState } from "react";
import "./Services.css";

export default function Services() {
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
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

  const services = [
    {
      icon: "💻",
      title: "Web Development",
      description: "Custom React and Next.js applications with modern architecture, optimized performance, and scalable backends.",
      features: [
        "Lightning-fast React & Next.js development",
        "Scalable Node.js backend architecture", 
        "SEO optimization & performance tuning",
        "Custom enterprise software solutions"
      ],
      gradient: "gradient-primary",
      tech: ["React", "Next.js", "Node.js", "TypeScript"],
      emailSubject: "Request for Web Development Services"
    },
    {
      icon: "📱", 
      title: "Mobile Development",
      description: "Cross-platform mobile applications using React Native, delivering native performance with shared codebase efficiency.",
      features: [
        "React Native cross-platform development",
        "Native iOS and Android performance",
        "App Store & Google Play deployment", 
        "Offline functionality & push notifications"
      ],
      gradient: "gradient-secondary",
      tech: ["React Native", "iOS", "Android", "Firebase"],
      emailSubject: "Request for Mobile Development Services"
    },
    {
      icon: "🤖",
      title: "AI & Machine Learning",
      description: "Intelligent AI integrations including NLP, chatbots, and predictive analytics to automate processes.",
      features: [
        "Natural Language Processing integration",
        "Intelligent chatbots & virtual assistants",
        "Predictive analytics & data insights",
        "Custom AI solutions for automation"
      ],
      gradient: "gradient-accent",
      tech: ["Python", "TensorFlow", "OpenAI", "Machine Learning"],
      emailSubject: "Request for AI & Machine Learning Services"
    }
  ];

  const handleServiceInquiry = (service) => {
    const subject = encodeURIComponent(service.emailSubject);
    const body = encodeURIComponent(
      `Hi there,\n\nI'm interested in your ${service.title} services.\n\nSpecifically, I'm looking for:\n\n${service.features.map(feature => `• ${feature}`).join('\n')}\n\nCould we schedule a consultation to discuss my project requirements?\n\nBest regards`
    );
    
    window.open(`mailto:your-email@example.com?subject=${subject}&body=${body}`, '_blank');
  };

  const handleStartProject = () => {
    // Create a cool modal or action
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
      <div class="project-modal-content">
        <div class="modal-icon">🚀</div>
        <h3>Ready to Build Something Amazing?</h3>
        <p>Let's discuss your vision and create something extraordinary together!</p>
        <div class="modal-actions">
          <button class="modal-btn primary" data-action="email">
            📧 Send Email
          </button>
          <button class="modal-btn secondary" data-action="call">
            📞 Call Now
          </button>
          <button class="modal-btn tertiary" data-action="close">
            ✕ Close
          </button>
        </div>
      </div>
    `;
    
    // Add event listeners for modal buttons
    const handleModalClick = (e) => {
      const action = e.target.closest('[data-action]')?.dataset.action;
      
      switch (action) {
        case 'email':
          const subject = encodeURIComponent('New Project Inquiry - Let\'s Build Something Amazing!');
          const body = encodeURIComponent(
            `Hi there,\n\nI'm ready to start a new project and would love to discuss my ideas with you.\n\nI'm particularly interested in:\n\n• Web Development\n• Mobile Development\n• AI Integration\n\nLet's schedule a call to bring my vision to life!\n\nBest regards`
          );
          window.open(`mailto:mohrashard@gmail.com?subject=${subject}&body=${body}`, '_blank');
          modal.remove();
          break;
          
        case 'call':
          window.open('tel:+1234567890', '_self');
          modal.remove();
          break;
          
        case 'close':
          modal.remove();
          break;
      }
    };
    
    modal.addEventListener('click', handleModalClick);
    
    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
    
    document.body.appendChild(modal);
    
    // Animate modal in
    setTimeout(() => modal.classList.add('show'), 10);
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

  return (
    <>
      <div className="services-page">
        <FloatingParticles />

        {/* Navigation */}
        <nav className="services-nav" role="navigation" aria-label="Services page navigation">
          <a href="/" className="nav-link" aria-label="Return to homepage">
            ← Home
          </a>
        </nav>

        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Professional Development Services",
            "description": "Expert React developer specializing in cutting-edge web applications, cross-platform mobile solutions, and intelligent AI integrations",
            "serviceType": ["Web Development", "Mobile Development", "AI & Machine Learning"],
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Development Services",
              "itemListElement": services.map((service, index) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": service.title,
                  "description": service.description
                }
              }))
            }
          })}
        </script>

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
              Web, Mobile & AI Solutions for Modern Businesses
            </h1>

            <p className="hero-description">
              Expert React developer specializing in cutting-edge web applications, cross-platform mobile solutions, and 
              intelligent AI integrations that drive business growth and innovation.
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
                  <div className={`service-icon ${service.gradient}`}>
                    <span role="img" aria-label={service.title}>{service.icon}</span>
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
                    onClick={() => handleServiceInquiry(service)}
                    aria-label={`Request ${service.title} services`}
                  >
                    📧 Get Started
                  </button>
                </article>
              ))}
            </div>
          </div>
        </main>

        {/* Call to Action Section */}
        <section className="cta-section" aria-labelledby="cta-heading">
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
      </div>
    </>
  );
}