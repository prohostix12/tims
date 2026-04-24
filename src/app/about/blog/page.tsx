
'use client';

import React, { useState, useEffect } from 'react';
import styles from './blog.module.css';
import Link from 'next/link';

export default function BlogPage() {
  const [showAll, setShowAll] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/public/blogs');
        const data = await res.json();
        if (Array.isArray(data)) setPosts(data);
      } catch (err) {
        console.error('Failed to fetch blogs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const displayedPosts = showAll ? posts : posts.slice(0, 6);
  const featuredPost = posts.find(p => p.status === 'published'); // Use the latest published post as featured

  return (
    <main className={styles.container}>
      {/* ===== Hero Section ===== */}
      <section className={styles.heroHeader}>
        <div className={styles.heroContent}>
          <p className={styles.heroCrumb}>
            <Link href="/">Home</Link> / <Link href="/about">About</Link> / Academic Blog
          </p>
          <span className={styles.heroTag}>Insights</span>
          <h1 className={styles.heroTitle}>Our Blog</h1>
          <p className={styles.heroSubtitle}>
            Expert perspectives, educational news, and student success stories from the heart of TIMS.
          </p>
        </div>
      </section>

      <section className={styles.blogSection}>
        {/* ===== Featured Post ===== */}
        {featuredPost && (
          <div className={styles.featuredPost}>
            <div className={styles.featuredImgBox}>
              <img 
                src={featuredPost.image || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"} 
                alt="Featured Post" 
                className={styles.featuredImg}
              />
            </div>
            <div className={styles.featuredContent}>
              <span className={styles.categoryBadge}>FEATURED</span>
              <span className={styles.featuredDate}>
                {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
              <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: '2rem' }}>
                {featuredPost.excerpt}
              </p>
              <Link href={`/about/blog/${featuredPost._id}`} className={styles.readMore}>
                Read Full Article 
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        )}

        {/* ===== Latest Posts Grid ===== */}
        <h2 style={{ fontSize: '2rem', color: '#00122e', marginBottom: '3rem', fontWeight: 800 }}>Latest Articles</h2>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: '#64748b' }}>Loading articles...</div>
        ) : (
          <div className={styles.postsGrid}>
            {displayedPosts.map((post, i) => (
              <article key={post._id} className={styles.postCard}>
                <div className={styles.postImgBox}>
                  <img src={post.image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"} alt={post.title} className={styles.postImg} />
                </div>
                <div className={styles.postInfo}>
                  <div className={styles.postMeta}>
                    <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{post.category}</span>
                    <span>•</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {post.excerpt}
                  </p>
                  <Link href={`/about/blog/${post._id}`} className={styles.readMore}>
                    Continue Reading
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {!showAll && posts.length > 6 && (
          <div style={{ textAlign: 'center', marginTop: '5rem' }}>
            <button 
              onClick={() => setShowAll(true)}
              className={styles.viewMoreBtn}
            >
              VIEW ALL ARTICLES 
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 9l-7 7-7-7"/></svg>
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
