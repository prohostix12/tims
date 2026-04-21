
'use client';

import React from 'react';
import styles from './blog.module.css';
import Link from 'next/link';

export default function BlogPage() {
  const [showAll, setShowAll] = React.useState(false);

  const posts = [
    {
      title: "Top 5 Benefits of Distance Learning in Kerala",
      excerpt: "Discover why more students in Kerala are choosing distance education for their career growth...",
      category: "Education",
      date: "Oct 12, 2024",
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "How to Choose the Right Management Course",
      excerpt: "MBA vs PGDM? We break down which management path suits your career aspirations best...",
      category: "Career Guide",
      date: "Oct 08, 2024",
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Understanding Credit Transfer Systems",
      excerpt: "A complete guide on how to safely transfer your academic credits between recognized universities...",
      category: "Academic",
      date: "Sep 28, 2024",
      img: "https://images.unsplash.com/photo-1454165833767-027ffae10c67?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Preparing for Online Competitive Exams",
      excerpt: "Expert tips and strategy sessions on how to prepare for your university examinations online...",
      category: "Exam Prep",
      date: "Sep 15, 2024",
      img: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Career Paths After a Distance B.Com Degree",
      excerpt: "Exploring the wide range of private and government sector jobs available for B.Com graduates...",
      category: "Career",
      date: "Sep 02, 2024",
      img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Balance Work and Study Like a Pro",
      excerpt: "Practical advice for working professionals pursuing higher education alongside their full-time jobs...",
      category: "Lifestyle",
      date: "Aug 20, 2024",
      img: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "The Importance of Soft Skills in Management",
      excerpt: "Why emotional intelligence and communication are just as vital as your academic scores...",
      category: "Management",
      date: "Aug 05, 2024",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const displayedPosts = showAll ? posts : posts.slice(0, 6);

  return (
    <main className={styles.container}>
      {/* ===== Hero Section ===== */}
      <section className={styles.heroHeader}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Our Blog</h1>
          <p className={styles.heroSubtitle}>
            Expert perspectives, educational news, and student success stories from the heart of TIMS.
          </p>
        </div>
      </section>

      <section className={styles.blogSection}>
        {/* ===== Featured Post ===== */}
        <div className={styles.featuredPost}>
          <div className={styles.featuredImgBox}>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
              alt="Featured Post" 
              className={styles.featuredImg}
            />
          </div>
          <div className={styles.featuredContent}>
            <span className={styles.categoryBadge}>FEATURED</span>
            <span className={styles.featuredDate}>October 21, 2024</span>
            <h2 className={styles.featuredTitle}>The Future of Online Learning in the Modern Workforce</h2>
            <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: '2rem' }}>
              As industries evolve, the demand for flexible, high-quality education has never been higher. Explore how TIMS Education is leading the way in Kerala with technology-driven distance programs that fit your lifestyle.
            </p>
            <Link href="#" className={styles.readMore}>
              Read Full Article 
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* ===== Latest Posts Grid ===== */}
        <h2 style={{ fontSize: '2rem', color: '#00122e', marginBottom: '3rem', fontWeight: 800 }}>Latest Articles</h2>
        <div className={styles.postsGrid}>
          {displayedPosts.map((post, i) => (
            <article key={i} className={styles.postCard}>
              <div className={styles.postImgBox}>
                <img src={post.img} alt={post.title} className={styles.postImg} />
              </div>
              <div className={styles.postInfo}>
                <div className={styles.postMeta}>
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {post.excerpt}
                </p>
                <Link href="#" className={styles.readMore}>
                  Continue Reading
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

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
