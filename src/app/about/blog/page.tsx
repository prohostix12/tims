'use client';

import React, { useState, useEffect } from 'react';
import styles from './blog.module.css';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        {/* Editorial Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <div className={styles.heroTag}>Knowledge Base</div>
              <h1 className={styles.heroTitle}>
                The <span style={{ color: '#ef233c' }}>Academic</span> <br /> Insights
              </h1>
              <p className={styles.heroDesc}>
                Expert perspectives, educational news, and student success stories from the heart of TIMS.
              </p>
            </div>
            <div className={styles.heroRight}>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
                alt="Academic Insights" 
                className={styles.heroImage}
              />
            </div>
          </div>
        </section>

        <section className={styles.blogSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLeft}>
              <h2>Our <span style={{ color: '#ef233c' }}>Stories</span></h2>
              <p>Explore the latest articles from our academic community</p>
            </div>
          </div>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '10rem 0', color: '#002060', fontWeight: 800 }}>
              LOADING STORIES...
            </div>
          ) : (
            <div className={styles.blogGrid}>
              {displayedPosts.map((post, i) => (
                <Link key={post._id} href={`/about/blog/${post._id}`} className={styles.blogArticle}>
                  <div className={styles.imageBox}>
                    <img 
                      src={post.image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"} 
                      alt={post.title} 
                      className={styles.articleImage} 
                    />
                  </div>
                  <div className={styles.articleContent}>
                    <div className={styles.articleCategory}>{post.category || 'INSIGHTS'}</div>
                    <h3 className={styles.articleTitle}>{post.title}</h3>
                    <p className={styles.articleExcerpt}>{post.excerpt}</p>
                    <div className={styles.readMore}>
                      READ ARTICLE <ArrowRight size={18} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!showAll && posts.length > 6 && (
            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={() => setShowAll(true)}
                className={styles.viewMoreBtn}
              >
                VIEW ALL ARTICLES <ChevronDown size={20} />
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
