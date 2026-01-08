import React, { useEffect, useRef, useState, Suspense, useCallback, useMemo } from "react";
import {
  Code,
  Zap,
  Key,
  Cpu,
  Shield,
  ExternalLink,
  CheckCircle,
  Rocket,
  Database,
  Layers,
  Monitor,
  ArrowLeft,
  Home,
  Send,
  Menu,
  X,
  Brain,
  BarChart,
  MessageSquare,
  Activity, // alternative for Box
  SmartphoneIcon, // if you want a phone icon
  LaptopIcon, // if you want a laptop icon
} from "lucide-react";
import { Helmet } from "react-helmet";

import "./WebApps.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const benefits = [
  {
    icon: <MessageSquare className="webapp__benefit-icon" />,
    title: "AI Chatbots & Virtual Assistants",
    description:
      "Intelligent conversational agents that understand context and provide human-like interactions for customer service and support.",
  },
  {
    icon: <Brain className="webapp__benefit-icon" />,
    title: "Natural Language Processing",
    description:
      "Advanced text analysis, sentiment detection, and language understanding for processing unstructured data.",
  },
  {
    icon: <BarChart className="webapp__benefit-icon" />,
    title: "Predictive Analytics & Models",
    description:
      "Machine learning models that forecast trends, identify patterns, and make data-driven predictions for business decisions.",
  },
  {
    icon: <Cpu className="webapp__benefit-icon" />,
    title: "Process Automation Solutions",
    description:
      "AI-powered automation tools that streamline workflows, reduce manual tasks, and increase operational efficiency.",
  },
  {
    icon: <Key className="webapp__benefit-icon" />,
    title: "AI Integrations with API Keys",
    description:
      "Securely connect with AI platforms like OpenAI, Gemini, and more using API keys to power advanced features in your apps.",
  },
  {
    icon: <SmartphoneIcon className="webapp__benefit-icon" />,
    title: "Mobile App Development",
    description:
      "Build responsive, high-performance mobile applications for iOS and Android, leveraging AI and modern frameworks.",
  },
  {
    icon: <LaptopIcon className="webapp__benefit-icon" />,
    title: "Web App & Software Development",
    description:
      "Custom web applications and software solutions, integrating AI functionalities, real-time features, and scalable architectures.",
  },
];

const techStack = [
  {
    name: "TensorFlow",
    description: "End-to-end open source platform for machine learning",
    icon: <Code className="webapp__tech-icon" />,
  },
  {
    name: "scikit-learn",
    description:
      "Machine learning library for Python with simple tools for data mining",
    icon: <Layers className="webapp__tech-icon" />,
  },
  {
    name: "XGBoost",
    description:
      "Optimized distributed gradient boosting library designed for efficiency",
    icon: <Database className="webapp__tech-icon" />,
  },
  {
    name: "Hugging Face",
    description:
      "Advanced natural language processing with state-of-the-art transformers",
    icon: <Monitor className="webapp__tech-icon" />,
  },
  {
    name: "OpenAI",
    description:
      "AI models and APIs for text, image, and code generation, enabling intelligent applications",
    icon: <Cpu className="webapp__tech-icon" />,
  },
  {
    name: "Gemini AI",
    description:
      "Next-generation AI models for conversational AI, reasoning, and multimodal tasks",
    icon: <Brain className="webapp__tech-icon" />,
  },
  {
    name: "PyTorch",
    description:
      "Deep learning framework for building neural networks with flexibility and speed",
    icon: <Code className="webapp__tech-icon" />,
  },
  {
    name: "LangChain",
    description:
      "Framework for building AI applications with LLMs, pipelines, and data integration",
    icon: <Layers className="webapp__tech-icon" />,
  },
  {
    name: "Random Forest",
    description:
      "Ensemble learning method for classification and regression using multiple decision trees",
    icon: <Zap className="webapp__tech-icon" />,
  },
  {
    name: "SVM (Support Vector Machine)",
    description:
      "Supervised learning algorithm for classification and regression by finding the optimal hyperplane",
    icon: <Activity className="webapp__tech-icon" />,
  },
  {
    name: "Neural Networks",
    description:
      "Computational models inspired by the human brain for deep learning and pattern recognition",
    icon: <Cpu className="webapp__tech-icon" />,
  },
];

const caseStudies = [
  {
    title: "LiverLens",
    type: "Web Application",
    problem:
      "Healthcare providers needed accurate liver disease risk prediction tools",
    solution:
      "Developed a machine learning model using clinical data for early detection",
    result:
      "AI-powered diagnostic tool that helps doctors assess liver disease risk with 92% accuracy",
    technologies: [
      "Python",
      "scikit-learn",
      "Medical AI",
      "Predictive Modeling",
    ],
    github: "https://github.com/mohrashard/LiverLens.git",
  },
  {
    title: "Mentora AI",
    type: "Web Application",
    problem: "Lack of personalized mental wellness insights for users",
    solution:
      "Built an AI platform that analyzes user input to provide mental health insights",
    result:
      "Mental wellness platform with AI-powered personalized recommendations and tracking",
    technologies: [
      "Python",
      "scikit-learn",
      "Medical AI",
      "Predictive Modeling",
      "Recommendation Engine",
    ],
    github: "https://github.com/mohrashard/mentora.git",
  },
];

const structuredDataService = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI & Machine Learning Solutions",
  description:
    "Custom AI development including chatbots, predictive models, and NLP applications",
  provider: {
    "@type": "Person",
    name: "Mohamed Rashard",
    email: "mohrashard@gmail.com",
  },
  serviceType: "AI & Machine Learning Development",
  areaServed: "Worldwide",
};

const structuredDataCreativeWork = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "AI & Machine Learning Solutions Page",
  description:
    "Custom AI and Machine Learning solutions including chatbots, predictive models, NLP applications, and automation tools. Expertise in scikit-learn, XGBoost, TensorFlow, and Hugging Face.",
  author: {
    "@type": "Person",
    name: "Mohamed Rashard",
    email: "mohrashard@gmail.com",
    url: "https://www.mohamedrashard.dev/",
  },
  url: "https://www.mohamedrashard.dev/services/ai-solutions",
};

const structuredDataPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohamed Rashard",
  email: "mohrashard@gmail.com",
  url: "https://www.mohamedrashard.dev/",
  jobTitle: "AI & Machine Learning Developer",
};

const structuredDataWebPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI & Machine Learning Solutions",
  description:
    "Custom AI and Machine Learning solutions including chatbots, predictive models, NLP applications, and automation tools. Expertise in scikit-learn, XGBoost, TensorFlow, and Hugging Face.",
  url: "https://www.mohamedrashard.dev/services/ai-solutions",
  publisher: {
    "@type": "Person",
    name: "Mohamed Rashard",
  },
  mainEntity: {
    "@type": "Service",
    name: "AI & Machine Learning Solutions",
    description:
      "Custom AI development including chatbots, predictive models, and NLP applications",
  },
};

const structuredDataItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AI Project Case Studies",
  description: "Showcase of AI and Machine Learning projects",
  numberOfItems: caseStudies.length,
  itemListElement: caseStudies.map((study, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      "@id": study.github,
      name: study.title,
      description: `${study.solution}. ${study.result}`,
      url: study.github,
      author: {
        "@type": "Person",
        name: "Mohamed Rashard",
      },
      datePublished: "2023",
      keywords: study.technologies.join(", "),
    },
  })),
};

const AIAndML = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const benefitsRef = useRef(null);
  const techRef = useRef(null);
  const casesRef = useRef(null);
  const contentRef = useRef(null);
  const ctaRef = useRef(null);

  const navSections = useMemo(() => [
    {
      label: "Solutions",
      icon: <Zap className="webapp__nav-icon-small" />,
      ref: benefitsRef,
    },
    {
      label: "Technologies",
      icon: <Layers className="webapp__nav-icon-small" />,
      ref: techRef,
    },
    {
      label: "Projects",
      icon: <ExternalLink className="webapp__nav-icon-small" />,
      ref: casesRef,
    },
    {
      label: "Expertise",
      icon: <Shield className="webapp__nav-icon-small" />,
      ref: contentRef,
    },
    {
      label: "Contact",
      icon: <Send className="webapp__nav-icon-small" />,
      ref: ctaRef,
    },
  ], []);

  useEffect(() => {
    // Add page entrance animations
    const elements = document.querySelectorAll(".webapp__animate-on-load");
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`;
      el.classList.add("webapp__fade-in-up");
    });

    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("webapp__animate-in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    const scrollElements = document.querySelectorAll(
      ".webapp__animate-on-scroll"
    );
    scrollElements.forEach((el) => observer.observe(el));

    return () => {
      scrollElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const mailtoLink =
    "mailto:mohrashard@gmail.com?subject=Request%20for%20AI%20%26%20ML%20Development&body=Hello%20Mohamed,%20I%20would%20like%20to%20discuss%20a%20new%20AI%20or%20Machine%20Learning%20project.%20Please%20get%20back%20to%20me%20with%20more%20details.";

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  const scrollToSection = useCallback((ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false); // Close menu after scroll
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleCaseKeyDown = useCallback((e, githubUrl, title) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.open(githubUrl, '_blank', 'noopener,noreferrer');
    }
  }, []);

  return (
    <ErrorBoundary>
      <Helmet>
        <html lang="en" />
        <title>
          AI & Machine Learning Solutions | Custom AI Development | Mohamed
          Rashard
        </title>
        <meta
          name="description"
          content="Custom AI and Machine Learning solutions including chatbots, predictive models, NLP applications, and automation tools. Expertise in scikit-learn, XGBoost, TensorFlow, and Hugging Face."
        />
        <meta
          name="keywords"
          content="Mohamed Rashard Rizmi, Software Developer, Affordable Software Developer, AI Engineer, Web Developer, Custom Web Developer, E-commerce Developer, Social Media Marketing, Video Editing, Full Stack Developer, React Developer, Next.js Developer, Sri Lanka, Colombo, AI development, machine learning solutions, NLP, predictive analytics"
        />
        <meta name="author" content="Mohamed Rashard" />
        <meta
          property="og:title"
          content="AI & Machine Learning Solutions | Custom AI Development | Mohamed Rashard"
        />
        <meta
          property="og:description"
          content="Custom AI and Machine Learning solutions including chatbots, predictive models, NLP applications, and automation tools. Expertise in scikit-learn, XGBoost, TensorFlow, and Hugging Face."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Mohamed Rashard" />
        <meta
          property="og:url"
          content="https://www.mohamedrashard.dev/services/ai-solutions"
        />
        <meta
          property="og:image"
          content="https://www.mohamedrashard.dev/assets/og-image.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="AI & Machine Learning Solutions by Mohamed Rashard" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="AI & Machine Learning Solutions | Custom AI Development | Mohamed Rashard"
        />
        <meta
          name="twitter:description"
          content="Custom AI and Machine Learning solutions including chatbots, predictive models, NLP applications, and automation tools. Expertise in scikit-learn, XGBoost, TensorFlow, and Hugging Face."
        />
        <meta
          name="twitter:image"
          content="https://www.mohamedrashard.dev/assets/og-image.png"
        />
        <meta name="twitter:creator" content="@mohrashard" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.mohamedrashard.dev/services/ai-solutions" />
        <script type="application/ld+json">
          {JSON.stringify(structuredDataService)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(structuredDataCreativeWork)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(structuredDataPerson)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(structuredDataWebPage)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(structuredDataItemList)}
        </script>
      </Helmet>
      <div className="webapp__webapp-container">
        {/* Enhanced Navigation Bar */}
        <nav role="navigation" className="webapp__nav-bar">
          {/* Left: Back and Home */}
          <div className="webapp__nav-left">
            <button
              onClick={handleBack}
              className="webapp__nav-btn webapp__nav-action-btn"
              aria-label="Go back"
            >
              <ArrowLeft className="webapp__nav-icon" aria-hidden="true" />
              <span>Back</span>
            </button>
            <a
              href="/"
              className="webapp__nav-btn webapp__nav-action-btn"
              aria-label="Go home"
            >
              <Home className="webapp__nav-icon" aria-hidden="true" />
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
            {isMenuOpen ? (
              <X className="webapp__nav-icon" aria-hidden="true" />
            ) : (
              <Menu className="webapp__nav-icon" aria-hidden="true" />
            )}
          </button>

          {/* Center: Section Links (Desktop) */}
          <div
            className={`webapp__nav-center ${isMenuOpen ? "webapp__nav-center--open" : ""
              }`}
          >
            {navSections.map((section, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(section.ref)}
                className="webapp__nav-btn webapp__nav-section-btn"
                aria-label={`Scroll to ${section.label} section`}
              >
                {React.cloneElement(section.icon, { "aria-hidden": true })}
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile Dropdown Overlay */}
        {isMenuOpen && (
          <div
            className="webapp__nav-dropdown-overlay"
            onClick={toggleMenu}
          ></div>
        )}

        {/* Futuristic Background Effects */}
        <div className="webapp__cyber-grid"></div>
        <div className="webapp__floating-particles"></div>


        {/* Hero Section */}
        <section role="banner" className="webapp__hero-section">
          <div className="webapp__hero-content webapp__animate-on-load">
            <div className="webapp__hero-title-wrapper">
              <h1 className="webapp__hero-title">
                Advanced{" "}
                <span className="webapp__gradient-text webapp__modern-tech-glow">
                  AI & Machine Learning
                </span>{" "}
                Solutions
              </h1>
              <div className="webapp__title-underline"></div>
            </div>
            <p className="webapp__hero-subtitle webapp__animate-on-load">
              Intelligent applications powered by cutting-edge AI, machine
              learning, and natural language processing.
            </p>
            <a
              href={mailtoLink}
              className="webapp__cta-btn webapp__cyber-btn webapp__animate-on-load"
              rel="noopener noreferrer"
            >
              <Rocket className="webapp__btn-icon" aria-hidden="true" />
              <span>Discuss Your Project</span>
              <div className="webapp__btn-glow"></div>
            </a>
          </div>
          <div className="webapp__hero-bg-effect"></div>
          <div className="webapp__hero-overlay"></div>
        </section>

        {/* Benefits Section */}
        <section
          ref={benefitsRef}
          className="webapp__section webapp__benefits-section"
          aria-labelledby="benefits-heading"
        >
          <div className="webapp__section-content">
            <h2 id="benefits-heading" className="webapp__section-title webapp__animate-on-scroll">
              AI & Machine Learning Solutions
            </h2>
            <div className="webapp__benefits-grid">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="webapp__benefit-card webapp__animate-on-scroll webapp__hover-glow"
                >
                  <div className="webapp__card-border"></div>
                  <div className="webapp__benefit-icon-wrapper">
                    {React.cloneElement(benefit.icon, { "aria-hidden": true })}
                  </div>
                  <h3 className="webapp__benefit-title">{benefit.title}</h3>
                  <p className="webapp__benefit-description">
                    {benefit.description}
                  </p>
                  <div className="webapp__card-glow"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section ref={techRef} className="webapp__section webapp__tech-section" aria-labelledby="tech-heading">
          <div className="webapp__section-content">
            <h2 id="tech-heading" className="webapp__section-title webapp__animate-on-scroll">
              AI & ML Technology Expertise
            </h2>
            <div className="webapp__tech-grid">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="webapp__tech-card webapp__animate-on-scroll webapp__cyber-card"
                >
                  <div className="webapp__tech-icon-wrapper">{React.cloneElement(tech.icon, { "aria-hidden": true })}</div>
                  <h3 className="webapp__tech-name">{tech.name}</h3>
                  <p className="webapp__tech-description">{tech.description}</p>
                  <div className="webapp__tech-border"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={<div></div>}>
          <section
            ref={casesRef}
            className="webapp__section webapp__cases-section"
            aria-labelledby="cases-heading"
          >
            <div className="webapp__section-content">
              <h2 id="cases-heading" className="webapp__section-title webapp__animate-on-scroll">
                AI Project Success Stories
              </h2>
              <div className="webapp__cases-grid">
                {caseStudies.map((study, index) => (
                  <div
                    key={index}
                    className="webapp__case-card webapp__animate-on-scroll"
                    role="button"
                    tabIndex={0}
                    onClick={() => window.open(study.github, '_blank', 'noopener,noreferrer')}
                    onKeyDown={(e) => handleCaseKeyDown(e, study.github, study.title)}
                    aria-label={`View ${study.title} project on GitHub`}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="webapp__case-header">
                      <h3 className="webapp__case-title">
                        {study.title}{" "}
                        <span className="webapp__case-type">({study.type})</span>
                      </h3>
                      <ExternalLink className="webapp__case-link-icon" aria-hidden="true" />
                    </div>

                    <div className="webapp__case-content">
                      <div className="webapp__case-section">
                        <h4 className="webapp__case-label webapp__problem-label">
                          Challenge:
                        </h4>
                        <p className="webapp__case-text">{study.problem}</p>
                      </div>

                      <div className="webapp__case-section">
                        <h4 className="webapp__case-label webapp__solution-label">
                          AI Solution:
                        </h4>
                        <p className="webapp__case-text">{study.solution}</p>
                      </div>

                      <div className="webapp__case-section">
                        <h4 className="webapp__case-label webapp__result-label">
                          Impact:
                        </h4>
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
        </Suspense>

        {/* SEO-Friendly Content Block */}
        <Suspense fallback={<div></div>}>
          <section
            ref={contentRef}
            className="webapp__section webapp__content-section"
            aria-labelledby="content-heading"
          >
            <div className="webapp__section-content">
              <h2 id="content-heading" className="webapp__section-title webapp__animate-on-scroll">
                Why Invest in AI & Machine Learning?
              </h2>
              <div className="webapp__content-text webapp__animate-on-scroll">
                <p>
                  Artificial Intelligence and Machine Learning are transforming
                  industries by enabling intelligent automation, predictive
                  insights, and enhanced user experiences. With expertise in
                  developing custom AI solutions, I help businesses leverage these
                  technologies to solve complex problems, optimize operations, and
                  create innovative products.
                </p>
                <p>
                  From developing sophisticated NLP applications that understand
                  and process human language to building predictive models that
                  forecast trends and identify patterns, my approach combines
                  cutting-edge algorithms with practical business understanding.
                  The result is AI solutions that are not just technologically
                  advanced but also deliver measurable business value.
                </p>
              </div>

              <div className="webapp__features-grid webapp__animate-on-scroll">
                <div className="webapp__feature-item">
                  <CheckCircle className="webapp__feature-icon" aria-hidden="true" />
                  <span className="webapp__feature-text">
                    Custom AI Development
                  </span>
                </div>
                <div className="webapp__feature-item">
                  <CheckCircle className="webapp__feature-icon" aria-hidden="true" />
                  <span className="webapp__feature-text">
                    Data-driven Insights
                  </span>
                </div>
                <div className="webapp__feature-item">
                  <CheckCircle className="webapp__feature-icon" aria-hidden="true" />
                  <span className="webapp__feature-text">Process Automation</span>
                </div>
                <div className="webapp__feature-item">
                  <CheckCircle className="webapp__feature-icon" aria-hidden="true" />
                  <span className="webapp__feature-text">
                    Predictive Analytics
                  </span>
                </div>
              </div>
            </div>
          </section>
        </Suspense>

        {/* Final Call to Action */}
        <Suspense fallback={<div></div>}>
          <section ref={ctaRef} className="webapp__cta-section" aria-labelledby="cta-heading">
            <div className="webapp__cta-content">
              <h2 id="cta-heading" className="webapp__cta-title webapp__animate-on-scroll">
                Ready to Implement AI in Your Business?
              </h2>
              <p className="webapp__cta-subtitle webapp__animate-on-scroll">
                Let's discuss how AI and machine learning can transform your
                operations and create new opportunities.
              </p>
              <a
                href={mailtoLink}
                className="webapp__cta-btn webapp__cyber-btn webapp__final-cta webapp__animate-on-scroll"
                rel="noopener noreferrer"
              >
                <Rocket className="webapp__btn-icon" aria-hidden="true" />
                <span>Start a Conversation</span>
                <div className="webapp__btn-glow"></div>
              </a>
            </div>
            <div className="webapp__cta-bg-effect"></div>
          </section>
        </Suspense>

      </div>
    </ErrorBoundary>
  );
}

export default React.memo(AIAndML);