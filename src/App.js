import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet"; // Added for SEO meta tags and structured data
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolling, setIsScrolling] = useState(false);
  const titleRef = useRef(null);

  const location = useLocation();
  // Updated JavaScript for typing effect with cursor
  useEffect(() => {
    const titles = [
      "Software Engineer",
      "Web Developer",
      "Full-Stack Developer",
      "Front-End Designer",
      "Content Creator",
      "AI/ML Engineer",
    ];

    let currentIndex = 0;
    let currentText = "";
    let isDeleting = false;
    let typeSpeed = 100;
    const titleElement = titleRef.current;

    if (!titleElement) return;

    // Set initial title with cursor
    titleElement.innerHTML = titles[0] + '<span class="typing-cursor">|</span>';

    const typeWriter = () => {
      const currentTitle = titles[currentIndex];

      if (isDeleting) {
        currentText = currentTitle.substring(0, currentText.length - 1);
        typeSpeed = 50; // Faster when deleting
      } else {
        currentText = currentTitle.substring(0, currentText.length + 1);
        typeSpeed = 100; // Normal typing speed
      }

      // Update text with animated cursor
      titleElement.innerHTML =
        currentText + '<span class="typing-cursor">|</span>';

      if (!isDeleting && currentText === currentTitle) {
        // Pause at end of typing
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && currentText === "") {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % titles.length;
        typeSpeed = 200; // Pause before starting new word
      }

      setTimeout(typeWriter, typeSpeed);
    };

    // Start the typing effect after a small delay
    const timer = setTimeout(() => {
      typeWriter();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sections = [
      "home",
      "about",
      // "experience",
      "skills",
      "projects",
      "contact",
    ];

    // Throttle function for better performance
    const throttle = (func, limit) => {
      let inThrottle;
      return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };

    const handleScroll = throttle(() => {
      // Don't interfere during programmatic scrolling, but allow immediate updates
      if (isScrolling) {
        // Still update active section even during programmatic scroll
        // but with a shorter delay to prevent conflicts
        setTimeout(() => {
          updateActiveSection();
        }, 50);
        return;
      }

      updateActiveSection();
    }, 16); // ~60fps for smooth updates

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Handle edge case: if at bottom of page, set last section as active
      if (scrollPosition + windowHeight >= documentHeight - 10) {
        setActiveSection(sections[sections.length - 1]);
        return;
      }

      // Get all section elements with their positions
      const sectionData = sections
        .map((sectionId) => {
          const element = document.getElementById(sectionId);
          if (!element) return null;

          const rect = element.getBoundingClientRect();
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          return {
            id: sectionId,
            offsetTop,
            height,
            top: rect.top,
            bottom: rect.bottom,
          };
        })
        .filter(Boolean);

      // Find the section that's most visible in viewport
      let activeSection = sections[0]; // default to first section
      let maxVisibility = 0;

      sectionData.forEach((section) => {
        // Calculate how much of the section is visible
        const viewportTop = 0;
        const viewportBottom = windowHeight;
        const sectionTop = Math.max(section.top, viewportTop);
        const sectionBottom = Math.min(section.bottom, viewportBottom);

        if (sectionBottom > sectionTop) {
          const visibleHeight = sectionBottom - sectionTop;
          const visibilityRatio =
            visibleHeight / Math.min(section.height, windowHeight);

          // Also consider if section is near the top of viewport
          const distanceFromTop = Math.abs(section.top);
          const proximityBonus = distanceFromTop < 100 ? 0.3 : 0;

          const totalScore = visibilityRatio + proximityBonus;

          if (totalScore > maxVisibility) {
            maxVisibility = totalScore;
            activeSection = section.id;
          }
        }
      });

      // Alternative simpler approach: section that crosses the middle of viewport
      const middleOfViewport = windowHeight / 2;
      for (let i = sectionData.length - 1; i >= 0; i--) {
        const section = sectionData[i];
        if (
          section.top <= middleOfViewport &&
          section.bottom >= middleOfViewport
        ) {
          activeSection = section.id;
          break;
        }
      }

      setActiveSection(activeSection);
    };

    // Initial call to set active section on mount
    updateActiveSection();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Also listen to resize events to recalculate positions
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [isScrolling]); // Keep isScrolling dependency

  // Enhanced smooth scroll function
  const scrollToSection = useCallback((sectionId, e) => {
    if (e) e.preventDefault(); // Prevent default anchor behavior
    const element = document.getElementById(sectionId);
    if (!element) return;

    setIsScrolling(true);

    // Immediately set active section for instant feedback
    setActiveSection(sectionId);

    const headerHeight = 80; // Your fixed header height
    const targetPosition = element.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    // Reset isScrolling flag after scroll completes
    setTimeout(() => {
      setIsScrolling(false);
      // Ensure correct section is still active after scroll
      setTimeout(() => {
        const sections = [
          "home",
          "about",
          "experience",
          "skills",
          "projects",
          "contact",
        ];
        const scrollPos = window.scrollY + headerHeight + 50;

        for (let i = sections.length - 1; i >= 0; i--) {
          const sec = document.getElementById(sections[i]);
          if (sec && sec.offsetTop <= scrollPos) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }, 100);
    }, 1000); // Smooth scroll typically takes ~1 second
  }, []);

  const handleDownloadResume = () => {
    const resumeUrl = process.env.PUBLIC_URL + "/Mohamed_Rashard_Rizmi_CV.pdf";

    const link = document.createElement("a");
    link.href = resumeUrl;
    link.setAttribute("download", "Mohamed_Rashard_Rizmi_CV.pdf");
    link.setAttribute("target", "_blank");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      const fallbackMessage =
        "If the download doesn't start automatically, please contact me directly for my resume.";
      console.log(fallbackMessage);
    }, 2000);
  };

  return (
    <div className="app">
      <Helmet>
        {/* Page Title */}
        <title>
          Mohamed Rashard Rizmi | Software Engineer | Web, Mobile & AI Solutions
        </title>

        {/* Canonical URL */}
        <link rel="canonical" href="https://mohamedrashard.vercel.app" />

        {/* SEO Meta Tags */}
        <meta
          name="description"
          content="Mohamed Rashard Rizmi - Experienced Software Engineer specializing in web development, full-stack development, AI/ML engineering, React, Python, Java, and more. Based in Colombo, Sri Lanka. Explore my portfolio, skills, projects, and contact for collaborations."
        />
        <meta
          name="keywords"
          content="Software Engineer, Web Developer, Full-Stack Developer, AI/ML Engineer, React Developer, Python Developer, Java Developer, Colombo Software Engineer, Sri Lanka Developer, Portfolio Website, Mohamed Rashard Rizmi"
        />
        <meta name="author" content="Mohamed Rashard Rizmi" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Mohamed Rashard Rizmi | Software Engineer Portfolio"
        />
        <meta
          property="og:description"
          content="Professional software engineer offering web app development, mobile app development, AI solutions, and custom software in Colombo, Sri Lanka."
        />
        <meta property="og:url" content="https://mohamedrashard.vercel.app" />
        <meta
          property="og:image"
          content="https://mohamedrashard.vercel.app/assets/og-image.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Mohamed Rashard Rizmi | Software Engineer"
        />
        <meta
          name="twitter:description"
          content="Explore my skills in full-stack development, AI/ML, and more. Contact for projects in Colombo, Sri Lanka."
        />
        <meta
          name="twitter:image"
          content="https://mohamedrashard.vercel.app/assets/og-image.png"
        />

        {/* Schema.org - Person */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Mohamed Rashard Rizmi",
            jobTitle: "Software Engineer",
            url: "https://mohamedrashard.vercel.app",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Colombo",
              addressCountry: "Sri Lanka",
            },
            email: "mohrashard@gmail.com",
            telephone: "+94 71 938 2296",
            sameAs: [
              "https://www.linkedin.com/in/mohamedrashard",
              "https://github.com/mohrashard/",
              "https://www.instagram.com/moh_.rashaxd",
              "https://www.tiktok.com/@mohh.rasharrd",
              "https://www.facebook.com/share/1EnKfVXh1z/",
              "https://youtube.com/@moh_rashard",
            ],
            knowsAbout: [
              "Software Engineering",
              "Web Development",
              "Full-Stack Development",
              "AI/ML Engineering",
              "React",
              "Python",
              "Java",
              "C++",
              "Databases",
              "Cloud Computing",
            ],
          })}
        </script>

        {/* Schema.org - CreativeWork */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Mohamed Rashard Rizmi Portfolio",
            author: {
              "@type": "Person",
              name: "Mohamed Rashard Rizmi",
            },
            description:
              "Portfolio showcasing projects in AI, web development, full-stack applications, and more.",
            url: "https://mohamedrashard.vercel.app/",
          })}
        </script>

        {/* Content Security Policy (example - customize as needed) */}
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://www.googletagmanager.com; connect-src 'self' https://analytics.google.com; img-src 'self' data: https://mohamedrashard.vercel.app;" />


      </Helmet>

      {/* Header/Navigation */}

      <header className="header">
        <div className="logo">
          <span className="logo-text">MRR</span>
        </div>
        <nav className={`nav ${isMenuOpen ? "open" : ""}`} aria-label="Main navigation">
          <ul className="nav-links">
            <li>
              <button
                className={activeSection === "home" ? "active" : ""}
                onClick={() => {
                  scrollToSection("home");
                  setIsMenuOpen(false); // ✅ close menu
                }}
                aria-label="Navigate to Home section"
              >
                Home
              </button>
            </li>
            <li>
              <button
                className={activeSection === "about" ? "active" : ""}
                onClick={() => {
                  scrollToSection("about");
                  setIsMenuOpen(false);
                }}
                aria-label="Navigate to About section"
              >
                About
              </button>
            </li>
            <li>
              <button
                className={activeSection === "skills" ? "active" : ""}
                onClick={() => {
                  scrollToSection("skills");
                  setIsMenuOpen(false);
                }}
                aria-label="Navigate to Skills section"
              >
                Skills
              </button>
            </li>
            <li>
              <button
                className={activeSection === "projects" ? "active" : ""}
                onClick={() => {
                  scrollToSection("projects");
                  setIsMenuOpen(false);
                }}
                aria-label="Navigate to Projects section"
              >
                Projects
              </button>
            </li>
            <li>
              <button
                className={activeSection === "contact" ? "active" : ""}
                onClick={() => {
                  scrollToSection("contact");
                  setIsMenuOpen(false);
                }}
                aria-label="Navigate to Contact section"
              >
                Contact
              </button>
            </li>

            {/* ✅ Services with same style */}
            <li>
              <Link
                to="/services"
                className={location.pathname === "/services" ? "active" : ""}
                aria-label="Navigate to Services page"
              >
                Services
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mobile-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={`hamburger ${isMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

    

      
        {/* SEO-Optimized Home Section */}
        <section id="home" className="home-section">
          <div className="home-content">
            <div className="home-text">
              <h1 className="glitch-effect" data-text="Mohamed Rashard">
                Mohamed Rashard Rizmi
              </h1>
              <div className="title-wrapper">
                <h2 className="typing-effect" ref={titleRef}>

                </h2>
              </div>
              <p className="hero-description">
                Specializing in <strong>web app development</strong>,{" "}
                <strong>mobile app development</strong>, and cutting-edge{" "}
                <strong>AI solutions</strong>. Transform your ideas into powerful
                digital experiences.
              </p>

              {/* Service Highlights */}
              <div className="service-highlights">
                <div className="service-item">
                  <div className="service-icon">
                    <i className="fab fa-react" aria-hidden="true"></i>
                  </div>
                  <div className="service-content">
                    <h3>React & Next.js Development</h3>
                    <p>Modern web applications with optimal performance</p>
                  </div>
                </div>
                <div className="service-item">
                  <div className="service-icon">
                    <i className="fas fa-mobile-alt" aria-hidden="true"></i>
                  </div>
                  <div className="service-content">
                    <h3>React Native Apps</h3>
                    <p>Cross-platform mobile solutions</p>
                  </div>
                </div>
                <div className="service-item">
                  <div className="service-icon">
                    <i className="fas fa-robot" aria-hidden="true"></i>
                  </div>
                  <div className="service-content">
                    <h3>AI Integration</h3>
                    <p>Smart automation and machine learning</p>
                  </div>
                </div>
                <div className="service-item">
                  <div className="service-icon">
                    <i className="fas fa-code" aria-hidden="true"></i>
                  </div>
                  <div className="service-content">
                    <h3>Custom Software</h3>
                    <p>Tailored solutions for your business needs</p>
                  </div>
                </div>
              </div>

              <div className="cta-buttons">
                <button
                  className="primary-btn"
                  onClick={() => scrollToSection("projects")}
                  aria-label="View my portfolio and projects"
                >
                  <i className="fas fa-rocket" aria-hidden="true"></i>
                  Explore My Work
                </button>
                <button
                  className="secondary-btn"
                  onClick={() => scrollToSection("contact")}
                  aria-label="Contact me for project collaboration"
                >
                  <i className="fas fa-handshake" aria-hidden="true"></i>
                  Hire Me
                </button>
                <button
                  className="accent-btn"
                  onClick={handleDownloadResume}
                  aria-label="Download my resume PDF"
                >
                  <i className="fas fa-download" aria-hidden="true"></i>
                  Download CV
                </button>
              </div>

              <div className="social-links">
                <a
                  href="https://www.linkedin.com/in/mohamedrashard"
                  className="social-icon linkedin"
                  aria-label="Connect on LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin-in" aria-hidden="true"></i>
                  <span className="tooltip">LinkedIn</span>
                </a>
                <a
                  href="https://github.com/mohrashard/"
                  className="social-icon github"
                  aria-label="View GitHub Profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github" aria-hidden="true"></i>
                  <span className="tooltip">GitHub</span>
                </a>
                <a
                  href="https://www.instagram.com/moh_.rashaxd?igsh=MW81NndsYnFjZXlvdg=="
                  className="social-icon instagram"
                  aria-label="Follow on Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                  <span className="tooltip">Instagram</span>
                </a>
                <a
                  href="https://www.tiktok.com/@mohh.rasharrd?_t=ZS-8uoMDC9PJTu&_r=1"
                  className="social-icon tiktok"
                  aria-label="Follow on TikTok"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-tiktok" aria-hidden="true"></i>
                  <span className="tooltip">TikTok</span>
                </a>
                <a
                  href="https://www.facebook.com/share/1EnKfVXh1z/"
                  className="social-icon facebook"
                  aria-label="Connect on Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook-f" aria-hidden="true"></i>
                  <span className="tooltip">Facebook</span>
                </a>
                <a
                  href="https://youtube.com/@moh_rashard?feature=shared"
                  className="social-icon youtube"
                  aria-label="Subscribe on YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-youtube" aria-hidden="true"></i>
                  <span className="tooltip">YouTube</span>
                </a>
              </div>
            </div>

            <div className="home-graphic">
              <div className="illustration">
                <div className="tech-orbit">
                  <div className="tech-icon tech-react">
                    <i className="fab fa-react" aria-hidden="true"></i>
                  </div>
                  <div className="tech-icon tech-js">
                    <i className="fab fa-js-square" aria-hidden="true"></i>
                  </div>
                  <div className="tech-icon tech-node">
                    <i className="fab fa-node-js" aria-hidden="true"></i>
                  </div>
                  <div className="tech-icon tech-python">
                    <i className="fab fa-python" aria-hidden="true"></i>
                  </div>
                </div>
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
                <div className="code-lines">
                  <div className="code-line code-react">
                    <span className="code-text">const</span>
                    <span className="code-var">solution</span>
                    <span className="code-text">= </span>
                    <span className="code-string">'innovative'</span>
                  </div>
                  <div className="code-line code-function">
                    <span className="code-text">function </span>
                    <span className="code-func">buildApp</span>
                    <span className="code-text">() </span>
                  </div>
                  <div className="code-line code-return">
                    <span className="code-text"> return </span>
                    <span className="code-string">&lt;Success /&gt;</span>
                  </div>
                  <div className="code-line code-close">
                    <span className="code-text"></span>
                  </div>
                  <div className="code-line code-ai">
                    <span className="code-text">AI.</span>
                    <span className="code-func">integrate</span>
                    <span className="code-text">(solution)</span>
                  </div>
                </div>
                <div className="floating-elements">
                  <div className="floating-element element-1">
                    <i className="fas fa-code" aria-hidden="true"></i>
                  </div>
                  <div className="floating-element element-2">
                    <i className="fas fa-brain" aria-hidden="true"></i>
                  </div>
                  <div className="floating-element element-3">
                    <i className="fas fa-mobile-alt" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="particles-container"></div>
        </section>

        {/* About Section */}
        <section id="about" class="about-section">
          <div class="section-header">
            <h2>About Me</h2>
            <div class="underline"></div>
          </div>
          <div class="about-content">
            <div class="about-text">
              <p>
                Aspiring Software Engineer with a strong foundation in full-stack
                development, object-oriented programming (OOP), and database
                management. Currently pursuing a B.Sc. (Hons) in Software
                Engineering at Cardiff Metropolitan University. Residing in
                Colombo, Sri Lanka, I am passionate about developing innovative
                software solutions that drive efficiency and scalability.
              </p>
              <p>
                Proficient in HTML, CSS, JavaScript, PHP, C++, Java, Python, and
                C#, with hands-on experience in React for frontend development, as
                well as ASP.NET, SOAP client integration, and Java Servlets.
                Skilled in developing scalable web applications, RESTful APIs, and
                enterprise-level solutions. Experienced in both frontend and
                backend development, with a focus on server-side programming, web
                services, and cloud-based deployments.
              </p>
              <p>
                Familiar with collaborative environments using Git, CI/CD, and
                DevOps practices. I have a strong interest in Artificial
                Intelligence and Networking, and am eager to apply my skills in
                real-world projects while continuing to grow in cloud computing,
                performance optimization, and software engineering best practices.
              </p>
            </div>

            <div class="about-details">
              <div class="about-education">
                <h3>Education</h3>
                <div class="education-item">
                  <h4>B.Sc. (Hons) in Software Engineering</h4>
                  <p>Cardiff Metropolitan University</p>
                  <span class="date">Mar 2023 -Nov 2026</span>
                </div>
                <div class="education-item">
                  <h4>Diploma in Computing</h4>
                  <p>ICBT Campus, Colombo</p>
                  <span class="date">Dec 2022</span>
                </div>
                <div class="education-item">
                  <h4>G.C.E. Advanced Level</h4>
                  <p>Private Candidate</p>
                  <span class="date">Dec 2024</span>
                </div>
                <div class="education-item">
                  <h4>G.C.E. Ordinary Level</h4>
                  <p>Zahira College, Colombo</p>
                  <span class="date">Mar 2022</span>
                </div>
              </div>

              <div class="about-languages">
                <h3>Languages</h3>
                <div class="language-item">
                  <div class="language-info">
                    <span class="language-name">English</span>
                    <span class="language-level">Fluent</span>
                  </div>
                  <div class="progress-container">
                    <div class="progress-bar fluent"></div>
                  </div>
                </div>
                <div class="language-item">
                  <div class="language-info">
                    <span class="language-name">Tamil</span>
                    <span class="language-level">Fluent</span>
                  </div>
                  <div class="progress-container">
                    <div class="progress-bar fluent"></div>
                  </div>
                </div>
                <div class="language-item">
                  <div class="language-info">
                    <span class="language-name">Sinhala</span>
                    <span class="language-level">Fluent</span>
                  </div>
                  <div class="progress-container">
                    <div class="progress-bar fluent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience Section */}
        {/* <section id="experience" className="experience-section">
          <div className="section-header">
            <h2>Work Experience</h2>
            <div className="underline"></div>
          </div> */}

        {/* Internship Status Banner */}
        {/* <div className="seeking-status">
            <div className="seeking-badge">
              <span className="pulse-dot"></span>
              <span>Actively Seeking Software Engineering Internships</span>
            </div> */}

        {/* <p className="seeking-description">
              I am currently looking for opportunities to apply my skills in a
              professional environment. Interested in roles involving full-stack
              development, backend systems, or AI applications.
            </p>
          </div>

          {/* Add Experience Template Here */}
        {/* </section>  */}

        {/* Skills Section */}
        <section id="skills" className="skills-section">
          <div className="section-header">
            <h2>Skills</h2>
            <div className="underline"></div>
          </div>
          <div className="skills-content">
            {/* Programming Languages */}
            <div className="skills-category">
              <h3>Programming Languages</h3>
              <div className="skills-grid">
                {[
                  { name: "C++", icon: "devicon-cplusplus-plain" },
                  { name: "Java", icon: "devicon-java-plain" },
                  { name: "Python", icon: "devicon-python-plain" },
                  { name: "C#", icon: "devicon-csharp-plain" },
                  { name: "PHP", icon: "devicon-php-plain" },
                  {
                    name: "TypeScript",
                    icon: "devicon-typescript-plain colored",
                  },
                ].map((skill, index) => (
                  <div
                    className="skill-item"
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="skill-card-content">
                      <i className={`skill-icon ${skill.icon}`} aria-hidden="true"></i>
                      <span className="skill-name">{skill.name}</span>
                      <div
                        className="skill-progress"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <div className="skill-card-bg"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Web Development */}
            <div className="skills-category">
              <h3>Web Development</h3>
              <div className="skills-grid">
                {[
                  { name: "HTML", icon: "devicon-html5-plain colored" },
                  { name: "CSS", icon: "devicon-css3-plain colored" },
                  {
                    name: "JavaScript",
                    icon: "devicon-javascript-plain colored",
                  },
                ].map((skill, index) => (
                  <div
                    className="skill-item"
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="skill-card-content">
                      <i className={`skill-icon ${skill.icon}`} aria-hidden="true"></i>
                      <span className="skill-name">{skill.name}</span>
                      <div
                        className="skill-progress"
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                    <div className="skill-card-bg"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frameworks */}
            <div className="skills-category">
              <h3>Frameworks</h3>
              <div className="skills-grid">
                {[
                  { name: "ASP.NET", icon: "devicon-dot-net-plain colored" },
                  { name: "Java Servlet", icon: "devicon-tomcat-line colored" },
                  { name: "React", icon: "devicon-react-original" },
                  { name: "Flask", icon: "devicon-flask-original colored" },
                  { name: "Express", icon: "devicon-express-original" },
                  { name: "Node", icon: "devicon-nodejs-plain colored" },
                  { name: "Laravel", icon: "devicon-laravel-plain colored" },
                ].map((skill, index) => (
                  <div
                    className="skill-item"
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="skill-card-content">
                      <i className={`skill-icon ${skill.icon}`} aria-hidden="true"></i>
                      <span className="skill-name">{skill.name}</span>
                      <div
                        className="skill-progress"
                        style={{ width: "80%" }}
                      ></div>
                    </div>
                    <div className="skill-card-bg"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div className="skills-category">
              <h3>Databases</h3>
              <div className="skills-grid">
                {[
                  { name: "MySQL", icon: "devicon-mysql-plain colored" },
                  {
                    name: "MSSQL",
                    icon: "devicon-microsoftsqlserver-plain colored",
                  },
                  { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
                  {
                    name: "PostgreSQL",
                    icon: "devicon-postgresql-plain colored",
                  },
                ].map((skill, index) => (
                  <div
                    className="skill-item"
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="skill-card-content">
                      <i className={`skill-icon ${skill.icon}`} aria-hidden="true"></i>
                      <span className="skill-name">{skill.name}</span>
                      <div
                        className="skill-progress"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <div className="skill-card-bg"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Technologies */}
            <div className="skills-category">
              <h3>Tools & Technologies</h3>
              <div className="skills-grid">
                {[
                  { name: "VS Code", icon: "devicon-vscode-plain colored" },
                  {
                    name: "Visual Studio",
                    icon: "devicon-visualstudio-plain colored",
                  },
                  {
                    name: "Android Studio",
                    icon: "devicon-android-plain colored",
                  },
                  { name: "NetBeans", icon: "devicon-apache-plain colored" },
                  {
                    name: "IntelliJ IDEA",
                    icon: "devicon-intellij-plain colored",
                  },
                  { name: "Python IDLE", icon: "devicon-python-plain" },
                  {
                    name: "MS SQL Server Studio",
                    icon: "devicon-microsoftsqlserver-plain colored",
                  },
                  { name: "Git", icon: "devicon-git-plain colored" },
                  { name: "GitHub", icon: "devicon-github-original" },
                  {
                    name: "Jupyter Notebook",
                    icon: "devicon-jupyter-plain colored",
                  },
                  { name: "Google Colab", icon: "devicon-google-plain colored" },
                ].map((skill, index) => (
                  <div
                    className="skill-item"
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="skill-card-content">
                      <i className={`skill-icon ${skill.icon}`} aria-hidden="true"></i>
                      <span className="skill-name">{skill.name}</span>
                      <div
                        className="skill-progress"
                        style={{ width: "88%" }}
                      ></div>
                    </div>
                    <div className="skill-card-bg"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI/ML Skills */}
            <div className="skills-category">
              <h3>AI/ML Skills</h3>
              <div className="skills-grid">
                {[
                  {
                    name: "Machine Learning",
                    icon: "devicon-python-plain colored",
                  },
                  {
                    name: "Artificial Intelligence",
                    icon: "devicon-tensorflow-original colored",
                  },
                  {
                    name: "Random Forest",
                    icon: "fas fa-tree",
                    color: "#228B22",
                  },
                  {
                    name: "Hugging Face",
                    icon: "devicon-pytorch-original colored",
                  },
                  { name: "scikit-learn", icon: "fas fa-cogs", color: "#F7931E" },
                  { name: "XGBoost", icon: "devicon-anaconda-original colored" },
                  {
                    name: "Neural Networks",
                    icon: "fas fa-project-diagram",
                    color: "#9932CC",
                  },
                  { name: "Pandas", icon: "fas fa-table", color: "#150458" },
                  {
                    name: "TensorFlow",
                    icon: "devicon-tensorflow-original colored",
                  },
                ].map((skill, index) => (
                  <div
                    className="skill-item"
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="skill-card-content">
                      <i
                        className={`skill-icon ${skill.icon}`}
                        style={skill.color ? { color: skill.color } : {}}
                        aria-hidden="true"
                      ></i>
                      <span className="skill-name">{skill.name}</span>
                      <div
                        className="skill-progress"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <div className="skill-card-bg"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Tools */}
            <div className="skills-category">
              <h3>AI Tools</h3>
              <div className="skills-grid">
                {[
                  { name: "ChatGPT", iconClass: "ai-icon chatgpt-icon" },
                  { name: "Gemini", iconClass: "ai-icon gemini-icon" },
                  { name: "Claude", iconClass: "ai-icon claude-icon" },
                  { name: "Blackbox", iconClass: "ai-icon blackbox-icon" },
                  { name: "Perplexity", iconClass: "ai-icon perplexity-icon" },
                  { name: "DeepSeek", iconClass: "ai-icon deepseek-icon" },
                ].map((skill, index) => (
                  <div
                    className="skill-item"
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="skill-card-content">
                      <div className={skill.iconClass} aria-hidden="true"></div>
                      <span className="skill-name">{skill.name}</span>
                      <div
                        className="skill-progress"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <div className="skill-card-bg"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects-section">
          <div className="section-container">
            <div className="section-header">
              <h2>Projects</h2>
              <div className="section-underline"></div>
              <p className="section-description">
                A collection of my latest work in software development
              </p>
            </div>

            <div className="projects-grid">
              {[
                {
                  title: "LiverLens",
                  subtitle:
                    "AI-Powered Liver Disease Prediction & Clinical Data Platform",
                  description:
                    "A full-stack React and Flask web application integrating an XGBoost AI model for liver disease risk prediction. Features secure multi-role authentication, personalized dashboards, bulk prediction uploads, report generation, advanced data visualization, and a learning module tailored to Doctors, Researchers, and Students.",
                  github: "https://github.com/mohrashard/LiverLens",
                  liveDemo: null,
                  tags: [
                    "React",
                    "Flask",
                    "Python",
                    "XGBoost",
                    "AI/ML",
                    "MongoDB",
                    "Data Visualization",
                    "Role-Based Access",
                    "Medical AI",
                  ],
                },

                {
                  title: "Mentora",
                  subtitle:
                    "An AI-Powered Web Platform for Mental Wellness Assessment Using Lifestyle and Digital Behavior",
                  description:
                    "An AI web platform assesses mental wellness by analyzing lifestyle and digital behavior. It generates personalized mental wellness scores and context-aware recommendations to promote positive behavioral changes. Designed for individuals, parents, counselors, and educators, the platform uses Flask, React, machine learning, and MongoDB to securely provide proactive support, bridging the gap between digital habits and mental health.",
                  github: "https://github.com/mohrashard/mentora.git",
                  liveDemo: null,
                  tags: [
                    "React",
                    "Flask",
                    "Python",
                    "AI/ML",
                    "MongoDB",
                    "Jupyter Notebook",
                    "Randon Forest",
                  ],
                },

                {
                  title: "OceansFlixx",
                  subtitle: "Movie Explorer Web Application",
                  description:
                    "A responsive web application that allows users to search for movies, view details, and discover trending films. Features real-time data from TMDb API with user authentication and all essential movie website functionalities.",
                  github: "https://github.com/mohrashard/movie-explorer",
                  liveDemo: "https://oceansflixx.vercel.app/",
                  tags: [
                    "React",
                    "Material-UI",
                    "TMDb API",
                    "Responsive Design",
                    "Authentication",
                    "Movie Database",
                  ],
                },
                {
                  title: "MegaCityCab",
                  subtitle: "Ride Booking Management System",
                  description:
                    "Built a ride booking system for Colombo's cab service using Java, AJAX, and MSSQL. Implemented secure login, role-based access, customizable bookings, and payment methods for passengers, drivers, and admins.",
                  github: "https://github.com/mohrashard/MegaCityCab.git",
                  liveDemo: null,
                  tags: [
                    "Java",
                    "AJAX",
                    "JASON",
                    "MSSQL",
                    "Web Application",
                    "Servlet",
                    "Solid Principles",
                  ],
                },
                {
                  title: "Amber Bakery System",
                  subtitle: "C++ Application",
                  description:
                    "Developed a C++ application to manage inventory, billing, and sales for a bakery.",
                  github: "https://github.com/mohrashard/Amber-Bakery-System.git",
                  liveDemo: null,
                  tags: [
                    "C++",
                    "Console Application",
                    "Inventory Management",
                    "Billing",
                  ],
                },
                {
                  title: "Student Management System",
                  subtitle: "Java OOP Project",
                  description:
                    "Developed a scalable University Management System using OOP concepts, featuring modular functionalities for records management and a user-friendly interface.",
                  github:
                    "https://github.com/mohrashard/Student-Management-System.git",
                  liveDemo: null,
                  tags: ["Java", "OOP", "UI/UX", "JFrame"],
                },
                {
                  title: "Gallery Cafe Website",
                  subtitle: "Full-Stack Web Development",
                  description:
                    "Designed and developed a responsive website for a café using HTML, CSS, JavaScript, and PHP.",
                  github:
                    "https://github.com/mohrashard/Gallery-Cafe-Web-Developement-.git",
                  liveDemo: null,
                  tags: ["HTML", "CSS", "JavaScript", "PHP", "JASON"],
                },
                {
                  title: "Dog App",
                  subtitle: "Android Mobile Application",
                  description:
                    "Built an Android app with Java to provide user-friendly features for a specific domain.",
                  github: "https://github.com/mohrashard/Dog-App.git",
                  liveDemo: null,
                  tags: ["Java", "Android", "Mobile Development"],
                },
                {
                  title: "Inventory Management System",
                  subtitle: "C# Service-Oriented Application",
                  description:
                    "Created a service-oriented application utilizing C# to demonstrate modularity and web service integration.",
                  github:
                    "https://github.com/mohrashard/Inventory-Management-System.git",
                  liveDemo: null,
                  tags: ["C#", "Web Services", "SOA"],
                },
                {
                  title: "Tasknet: Crowd-Sourced Marketplace",
                  subtitle: "Team Collaboration Project",
                  description:
                    "Collaborated in a team to develop a web platform using HTML, CSS, JavaScript, and PHP to connect local buyers and service providers.",
                  github: "https://github.com/mohrashard/TaskNet.git",
                  liveDemo: null,
                  tags: [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "JSON",
                    "PHP",
                    "Team Project",
                  ],
                },
              ].map((project, index) => (
                <div className="project-card" key={index}>
                  <div className="project-content">
                    <div className="project-header">
                      <h3>{project.title}</h3>
                      <span className="project-subtitle">{project.subtitle}</span>
                    </div>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag, tagIndex) => (
                        <span className="project-tag" key={tagIndex}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.github === "#" ? (
                        <div className="project-link disabled">
                          <span>Coming Soon</span>
                        </div>
                      ) : (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <span>View on GitHub</span>
                          <svg
                            className="project-link-arrow"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12H19M19 12L12 5M19 12L12 19"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      )}
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link live-demo"
                          aria-label={`View live demo of ${project.title}`}
                        >
                          <span>Live Demo</span>
                          <svg
                            className="project-link-arrow"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <polyline
                              points="15,3 21,3 21,9"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <line
                              x1="10"
                              y1="14"
                              x2="21"
                              y2="3"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="section-header">
            <h2>Contact</h2>
            <div className="underline"></div>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <a href="mailto:mohrashard@gmail.com" aria-label="Email me at mohrashard@gmail.com">mohrashard@gmail.com</a>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <a
                  href="https://www.linkedin.com/in/mohamedrashard"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with Mohamed Rashard on LinkedIn"
                >
                  Mohamed Rashard
                </a>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </div>
                <a
                  href="https://github.com/mohrashard/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View GitHub profile of mohrashard"
                >
                  mohrashard
                </a>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <a href="tel:+94719382296" aria-label="Call me at +94 71 938 2296">(+94) 71 938 2296</a>
              </div>
            </div>
          </div>
        </section>
     
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} Mohamed Rashard. All rights
            reserved.
          </p>
          <button
            className="top-button"
            onClick={() => scrollToSection("home")}
            aria-label="Scroll back to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;