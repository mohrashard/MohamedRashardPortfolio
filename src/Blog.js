// src/pages/Blog.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./Blog.css";

const parseFrontmatter = (content) => {
  const fmRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(fmRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const frontmatterString = match[1];
  const bodyContent = match[2];
  
  const frontmatter = {};
  const lines = frontmatterString.split('\n');
  
  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/['"]/g, '');
      frontmatter[key] = value;
    }
  });
  
  return { data: frontmatter, content: bodyContent };
};

const POSTS_PER_PAGE = 5;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Google Analytics pageview tracking

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postSlugs = [
          'web-app-cost',
          'building-professional-website',
          'ai-in-software-development-guide',
        ];
        
        const loadedPosts = [];

        for (const slug of postSlugs) {
          try {
            const response = await fetch(`/posts/${slug}.md`);
            if (response.ok) {
              const text = await response.text();
              let { data: frontmatter } = parseFrontmatter(text);
              
              // Handle missing frontmatter fields to ensure all posts load
              if (!frontmatter.title) {
                frontmatter.title = slug
                  .split('-')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');
              }
              if (!frontmatter.date) {
                frontmatter.date = new Date().toISOString().split('T')[0];
                console.warn(`Post ${slug} missing date; using current date`);
              }
              if (!frontmatter.description) {
                frontmatter.description = 'No description available.';
              }
              
              loadedPosts.push({ slug, frontmatter });
            } else {
              console.warn(`Could not fetch post: ${slug} (${response.status})`);
            }
          } catch (error) {
            console.warn(`Error loading post ${slug}:`, error);
          }
        }

        // Sort by date descending, with invalid dates at the end
        loadedPosts.sort((a, b) => {
          const timeA = new Date(a.frontmatter.date).getTime();
          const timeB = new Date(b.frontmatter.date).getTime();
          if (isNaN(timeA) && isNaN(timeB)) return 0;
          if (isNaN(timeA)) return 1; // a invalid -> after b
          if (isNaN(timeB)) return -1; // b invalid -> a before b
          return timeB - timeA; // descending
        });

        setPosts(loadedPosts);
        setTotalPages(Math.ceil(loadedPosts.length / POSTS_PER_PAGE));
      } catch (err) {
        console.error("Error loading blog posts:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const getCurrentPagePosts = () => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return posts.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="pagination" role="navigation" aria-label="Blog post pagination">
        <button
          className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          ← Previous
        </button>

        {startPage > 1 && (
          <>
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(1)}
              aria-label={`Go to page 1`}
            >
              1
            </button>
            {startPage > 2 && <span className="pagination-info" aria-hidden="true">...</span>}
          </>
        )}

        {pages.map(page => (
          <button
            key={page}
            className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
            onClick={() => handlePageChange(page)}
            aria-label={`Go to page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="pagination-info" aria-hidden="true">...</span>}
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(totalPages)}
              aria-label={`Go to page ${totalPages}`}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
        >
          Next →
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="blog-container">
        <Helmet>
          <html lang="en" />
          <title>Blog - Mohamed Rashard Rizmi</title>
          <meta
            name="description"
            content="Latest blog posts on web development, mobile apps, and AI solutions by Mohamed Rashard Rizmi."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />
          
          {/* Open Graph */}
          <meta property="og:title" content="Blog - Mohamed Rashard Rizmi" />
          <meta property="og:description" content="Latest blog posts on web development, mobile apps, and AI solutions." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://mohamedrashard.vercel.app/blog" />
          <meta property="og:image" content="https://mohamedrashard.vercel.app/images/og-image.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content="@yourhandle" />
          <meta name="twitter:title" content="Blog - Mohamed Rashard Rizmi" />
          <meta name="twitter:description" content="Latest blog posts on web development, mobile apps, and AI solutions." />
          <meta name="twitter:image" content="https://mohamedrashard.vercel.app/images/twitter-card-image.jpg" />
          
          {/* Preconnect to important domains */}
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <link rel="preconnect" href="https://vercel.live" />
        </Helmet>
        
        <div className="blog-background"></div>
        
        <nav className="blog-nav">
          <div className="blog-nav-container">
            <Link to="/blog" className="blog-nav-logo">
              Blog
            </Link>
            <div className="blog-nav-links">
              <Link to="/" className="blog-nav-home-btn">
                🏠 Home
              </Link>
            </div>
          </div>
        </nav>
        
        <div className="blog-page" id="main-content">
          <div className="blog-header">
            <h1>Blog</h1>
            <div className="loading" aria-live="polite">Loading posts...</div>
          </div>
        </div>
      </div>
    );
  }

  const currentPagePosts = getCurrentPagePosts();

  return (
    <div className="blog-container">
      <Helmet>
        <html lang="en" />
        <title>Blog - Mohamed Rashard Rizmi</title>
        <meta
          name="description"
          content="Latest blog posts on web development, mobile apps, and AI solutions by Mohamed Rashard Rizmi."
        />
        <meta name="keywords" content="web development, mobile apps, AI, technology, programming, blog" />
        <meta name="author" content="Mohamed Rashard Rizmi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Blog - Mohamed Rashard Rizmi" />
        <meta property="og:description" content="Latest blog posts on web development, mobile apps, and AI solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mohamedrashard.vercel.app/blog" />
        <meta property="og:image" content="https://mohamedrashard.vercel.app/images/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@yourhandle" />
        <meta name="twitter:title" content="Blog - Mohamed Rashard Rizmi" />
        <meta name="twitter:description" content="Latest blog posts on web development, mobile apps, and AI solutions." />
        <meta name="twitter:image" content="https://mohamedrashard.vercel.app/images/twitter-card-image.jpg" />
        
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://vercel.live" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Mohamed Rashard Rizmi's Blog",
            "description": "Latest blog posts on web development, mobile apps, and AI solutions",
            "url": "https://mohamedrashard.vercel.app/blog",
            "author": {
              "@type": "Person",
              "name": "Mohamed Rashard Rizmi"
            }
          })}
        </script>
      </Helmet>
      
      <div className="blog-background"></div>

      <nav className="blog-nav">
        <div className="blog-nav-container">
          <Link to="/blog" className="blog-nav-logo">
            Blog
          </Link>
          <div className="blog-nav-links">
            <Link to="/blog" className="blog-nav-link">
              All Posts
            </Link>
            <Link to="/" className="blog-nav-home-btn">
              🏠 Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="blog-page" id="main-content">
        <div className="blog-header">
          <h1>Blog</h1>
          <p>Thoughts on tech, startups, and building the future of Software development.</p>
        </div>

        <div className="blog-list">
          {currentPagePosts.length === 0 ? (
            <div className="not-found">
              <h2>No posts found</h2>
              <p>Check back soon for new content!</p>
              <p><small>Debug: Make sure your markdown files are in public/posts/ and have proper frontmatter</small></p>
            </div>
          ) : (
            currentPagePosts.map(({ slug, frontmatter }, index) => (
              <div 
                key={slug} 
                className="post-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link to={`/blog/${slug}`} className="post-title-link">
                  <h2 className="post-title">{frontmatter.title}</h2>
                </Link>
                <p className="post-date">
                  {new Date(frontmatter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="post-description">{frontmatter.description}</p>
                <Link to={`/blog/${slug}`} className="read-more-btn">
                  Read More →
                </Link>
              </div>
            ))
          )}
        </div>

        {renderPagination()}

        {posts.length > 0 && (
          <div className="pagination-info" style={{ textAlign: 'center', marginTop: '2rem' }} aria-live="polite">
            Showing {((currentPage - 1) * POSTS_PER_PAGE) + 1} - {Math.min(currentPage * POSTS_PER_PAGE, posts.length)} of {posts.length} posts
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;