// src/pages/Post.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Helmet } from "react-helmet";
import "./Blog.css";

const parseFrontmatter = (content) => {
  const fmRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(fmRegex);

  if (!match) {
    return { data: {}, content };
  }

  const frontmatterString = match[1];
  let bodyContent = match[2];

  const frontmatter = {};
  const lines = frontmatterString.split("\n");

  lines.forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      const value = line
        .substring(colonIndex + 1)
        .trim()
        .replace(/['"]/g, "");
      frontmatter[key] = value;
    }
  });

  // Strip leading # heading if it exactly matches the title (trim whitespace)
  if (frontmatter.title) {
    const titleRegex = new RegExp(`^#\\s*${frontmatter.title.trim()}\\s*\n`, 'i');
    bodyContent = bodyContent.replace(titleRegex, '');
  }

  return { data: frontmatter, content: bodyContent.trim() };  // Trim any extra whitespace
};


const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await fetch(`/posts/${slug}.md`);
        if (response.ok) {
          const text = await response.text();
          const { data: frontmatter, content } = parseFrontmatter(text);

          if (frontmatter.title) {
            setPost({ frontmatter, content });
          } else {
            console.error(`Post ${slug} is missing required frontmatter (title)`);
            setPost(null);
          }
        } else {
          console.error(`Could not fetch post: ${slug} (${response.status})`);
          setPost(null);
        }
      } catch (error) {
        console.error("Error loading post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  const handleCopyLink = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="blog-container">
        <Helmet>
          <title>Loading Post - Mohamed Rashard Rizmi</title>
        </Helmet>
        
        <div className="blog-background"></div>
        
        <nav className="blog-nav">
          <div className="blog-nav-container">
            <Link to="/blog" className="blog-nav-logo">
              Blog
            </Link>
            <div className="blog-nav-links">
              <Link to="/blog" className="blog-nav-link">All Posts</Link>
              <Link to="/" className="blog-nav-home-btn">🏠 Home</Link>
            </div>
          </div>
        </nav>
        
        <div className="post-page">
          <div className="loading">Loading post...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-container">
        <Helmet>
          <title>Post Not Found - Mohamed Rashard Rizmi</title>
        </Helmet>
        
        <div className="blog-background"></div>
        
        <nav className="blog-nav">
          <div className="blog-nav-container">
            <Link to="/blog" className="blog-nav-logo">
              Blog
            </Link>
            <div className="blog-nav-links">
              <Link to="/blog" className="blog-nav-link">All Posts</Link>
              <Link to="/" className="blog-nav-home-btn">🏠 Home</Link>
            </div>
          </div>
        </nav>

        <div className="post-page">
          <div className="not-found">
            <h2>Post not found</h2>
            <p>The post you're looking for doesn't exist or has been moved.</p>
            <p><small>Debug: Check if {slug}.md exists in public/posts/ and has proper frontmatter</small></p>
            <Link to="/blog" className="back-btn">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { frontmatter, content } = post;
  const defaultOgImage = 'https://mohamedrashard.vercel.app/images/og-image.jpg';
  const ogImage = frontmatter.image || defaultOgImage; // Use post-specific if available, else default

  return (
    <div className="blog-container">
      <Helmet>
        <title>{frontmatter.title} - Mohamed Rashard Rizmi</title>
        <meta name="description" content={frontmatter.description || frontmatter.title} />
        <meta name="keywords" content={frontmatter.tags || 'web development, technology, programming'} />
        <meta name="author" content="Mohamed Rashard Rizmi" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description || frontmatter.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://mohamedrashard.vercel.app/blog/${slug}`} />
        <meta property="og:site_name" content="Mohamed Rashard Rizmi's Blog" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="article:published_time" content={frontmatter.date} />
        <meta property="article:author" content="Mohamed Rashard Rizmi" />
        {frontmatter.tags && frontmatter.tags.split(',').map(tag => (
          <meta key={tag.trim()} property="article:tag" content={tag.trim()} />
        ))}
        <link rel="canonical" href={`https://mohamedrashard.vercel.app/blog/${slug}`} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description || frontmatter.title} />
        <meta name="twitter:image" content={ogImage} />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": frontmatter.title,
            "description": frontmatter.description || frontmatter.title,
            "author": {
              "@type": "Person",
              "name": "Mohamed Rashard Rizmi"
            },
            "datePublished": frontmatter.date,
            "url": `https://mohamedrashard.vercel.app/blog/${slug}`
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
            <Link to="/blog" className="blog-nav-link">All Posts</Link>
            <Link to="/" className="blog-nav-home-btn">🏠 Home</Link>
          </div>
        </div>
      </nav>

      <div className="post-page">
        <div className="post-actions">
          <Link to="/blog" className="back-btn">
            ← Back to Blog
          </Link>
          <button 
            onClick={handleCopyLink}
            className={`copy-link-btn ${copySuccess ? 'copied' : ''}`}
            title="Copy link to this post"
            aria-label="Copy link to this post"
          >
            {copySuccess ? (
              <>📋 Copied!</>
            ) : (
              <>🔗 Copy Link</>
            )}
          </button>
        </div>

        <article id="main-content" className="post-content">
          <header className="post-header">
            <h1>{frontmatter.title}</h1>
            {frontmatter.date && (
              <p className="post-date">
                  {new Date(frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
            {frontmatter.readingTime && (
              <p className="post-reading-time">
                ⏱️ {frontmatter.readingTime} min read
              </p>
            )}
          </header>

          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({children}) => <h2 className="markdown-h1">{children}</h2>,
                h2: ({children}) => <h2 className="markdown-h2">{children}</h2>,
                h3: ({children}) => <h3 className="markdown-h3">{children}</h3>,
                a: ({href, children}) => (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
                img: ({src, alt, ...props}) => (
                  <img 
                    src={src} 
                    alt={alt || 'Image in post'} 
                    loading="lazy" 
                    crossOrigin="anonymous"
                    {...props} 
                  />
                ),
                code: ({inline, className, children}) => {
                  if (inline) {
                    return <code className="inline-code">{children}</code>;
                  }
                  return <code className={className}>{children}</code>;
                },
                table: ({children}) => (
                  <div className="markdown-table-container">
                    <table className="markdown-table">{children}</table>
                  </div>
                ),
                th: ({children}) => <th className="markdown-th">{children}</th>,
                td: ({children}) => <td className="markdown-td">{children}</td>,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          <footer className="post-footer">
            <div className="post-footer-actions">
              <button 
                onClick={handleCopyLink}
                className={`copy-link-btn ${copySuccess ? 'copied' : ''}`}
                aria-label="Share this post by copying the link"
              >
                {copySuccess ? (
                  <>📋 Link Copied!</>
                ) : (
                  <>🔗 Share this post</>
                )}
              </button>
              <Link to="/blog" className="back-btn">
                ← More Posts
              </Link>
            </div>
            
            <div className="post-meta">
              <p>Written by <strong>Mohamed Rashard Rizmi</strong></p>
              {frontmatter.tags && (
                <div className="post-tags">
                  {frontmatter.tags.split(',').map(tag => (
                    <span key={tag.trim()} className="post-tag">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default Post;