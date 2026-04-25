'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight,
  Newspaper,
  Loader2,
  ChevronRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './news.module.css';

interface NewsItem {
  _id: string;
  title: string;
  excerpt: string;
  image?: string;
  category?: string;
  publishedAt: string;
  status: string;
}

export default function AllNewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/news')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNewsItems(data.filter((n) => n.status === 'published'));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const featuredNews = newsItems[0];
  const otherNews = newsItems.slice(1);

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        {/* Editorial Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <div className={styles.heroTag}>Latest Updates</div>
              <h1 className={styles.heroTitle}>
                Institutional <span style={{ color: '#ef233c' }}>Journal</span>
              </h1>
              <p className={styles.heroDesc}>
                Stay connected with the pulse of TIMS — from academic breakthroughs to global institutional updates.
              </p>
            </div>
            <div className={styles.heroRight}>
              <Image
                src="/images/news-hero-bg.png"
                alt="Institutional News"
                className={styles.heroImage}
                fill
                priority
              />
            </div>
          </div>
        </section>

        {/* Magazine Grid */}
        <section className={styles.newsSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLeft}>
              <h2><span style={{ color: '#ef233c' }}>Editor's</span> Choice</h2>
              <p>Handpicked stories from our community.</p>
            </div>
          </div>

          <div className={styles.newsGrid}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '10rem 0' }}>
                <Loader2 className="animate-spin" size={48} style={{ color: '#ef233c', marginBottom: '1rem' }} />
                <p style={{ fontWeight: 700, color: '#002060' }}>Curating latest stories...</p>
              </div>
            ) : newsItems.length > 0 ? (
              newsItems.map((item, i) => (
                <article key={item._id} className={styles.newsArticle}>
                  <div className={styles.imageBox}>
                    <Image
                      src={item.image || '/images/news-hero-bg.png'}
                      alt={item.title}
                      className={styles.articleImage}
                      fill
                    />
                  </div>
                  <div className={styles.articleContent}>
                    <span className={styles.articleCategory}>{item.category || 'ACADEMIC'}</span>
                    <h3 className={styles.articleTitle}>{item.title}</h3>
                    <p className={styles.articleExcerpt}>{item.excerpt}</p>
                    <Link href={`/news/${item._id}`} className={styles.readMore}>
                      READ STORY <ArrowRight size={20} />
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div className={styles.emptyState}>
                <Newspaper size={64} style={{ color: '#e2e8f0', marginBottom: '2rem' }} />
                <h2>No articles published yet</h2>
                <p>Check back soon for the latest institutional updates.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
