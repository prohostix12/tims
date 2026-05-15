'use client';

import React, { useState, useEffect } from 'react';
import styles from './blogs.module.css';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogsPage() {
  const [showAll, setShowAll] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/admin/blogs', { cache: 'no-store' });
        const data = await res.json();
        if (Array.isArray(data)) {
          setPosts(data.filter((b) => b.status === 'published'));
        }
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
    <main className={styles.container}>
      {/* Editorial Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div className={styles.heroTag}>Knowledge Base</div>
            <h1 className={styles.heroTitle}>
              Expert <span style={{ color: '#ef233c' }}>Educational Insights</span>
            </h1>
            <p className={styles.heroDesc}>
              Dive deep into our curated collection of expert articles, career roadmaps, and educational trends. Our blog is dedicated to empowering students with the knowledge needed to navigate the complexities of global education and professional growth.
            </p>
            <div className={styles.heroSearch}>
              <input type="text" placeholder="Search insights..." className={styles.heroInput} />
              <button className={styles.heroSearchBtn}><ArrowRight size={20} /></button>
            </div>
            <div className={styles.trendingTags}>
              <span className={styles.trendingLabel}>TRENDING:</span>
              <Link href="/blogs" className={styles.tag}>Career Growth</Link>
              <Link href="/blogs" className={styles.tag}>University Life</Link>
              <Link href="/blogs" className={styles.tag}>Scholarships</Link>
            </div>
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
              <Link key={post._id} href={`/blogs/${post._id}`} className={styles.blogArticle}>
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
  );
}
