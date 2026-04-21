
'use client';

import React from 'react';
import styles from './news.module.css';
import Link from 'next/link';

export default function NewsPage() {
  const [showAll, setShowAll] = React.useState(false);

  const newsItems = [
    {
      day: "21",
      month: "OCT",
      category: "Academic",
      title: "Enrollment Open for Winter 2024 Semester",
      excerpt: "TIMS Education announces the commencement of admissions for undergraduate and postgraduate distance learning programs. Apply before Nov 15th.",
    },
    {
      day: "15",
      month: "OCT",
      category: "Achievement",
      title: "TIMS Education Partners with Top Ranked National University",
      excerpt: "We are proud to announce a new partnership that will provide our students with expanded access to specialized management certifications.",
    },
    {
      day: "05",
      month: "OCT",
      category: "Campus",
      title: "New Student Orientation Scheduled for Next Month",
      excerpt: "A comprehensive virtual orientation will be held to guide new students through our online learning portal and student support services.",
    },
    {
      day: "28",
      month: "SEP",
      category: "Important",
      title: "Exam Schedule Released for Distance Education Board",
      excerpt: "The final examination schedule for the current semester is now available on the student dashboard. Please check your subject dates.",
    },
    {
      day: "12",
      month: "SEP",
      category: "Event",
      title: "Annual Educational Career Fair 2024",
      excerpt: "Join us for our biggest career fair yet, featuring over 30 university partners and recruitment agencies from across India and abroad.",
    }
  ];

  const displayedItems = showAll ? newsItems : newsItems.slice(0, 4);

  return (
    <main className={styles.container}>
      {/* ===== Hero Section ===== */}
      <section className={styles.heroHeader}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Our News</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
            Stay informed with the latest institutional announcements, partnerships, and key academic updates from Kerala.
          </p>
        </div>
      </section>

      <section className={styles.newsSection}>
        {displayedItems.map((item, i) => (
          <article key={i} className={styles.newsItem}>
            <div className={styles.dateBox}>
              <span className={styles.dateDay}>{item.day}</span>
              <span className={styles.dateMonth}>{item.month}</span>
            </div>
            <div className={styles.newsContent}>
              <span className={styles.categoryTag}>{item.category}</span>
              <h2 className={styles.newsHeading}>{item.title}</h2>
              <p className={styles.newsExcerpt}>{item.excerpt}</p>
              <Link href="#" className={styles.readButton}>
                READ FULL ANNOUNCEMENT
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </article>
        ))}

        {!showAll && newsItems.length > 4 && (
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <button 
              onClick={() => setShowAll(true)}
              className={styles.viewMoreBtn}
            >
              VIEW ALL NEWS 
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 9l-7 7-7-7"/></svg>
            </button>
          </div>
        )}
      </section>

      {/* ===== Bottom Info ===== */}
      <section style={{ backgroundColor: '#f8fafc', padding: '4rem 2rem', textAlign: 'center' }}>
        <p style={{ color: '#64748b' }}>
          For press inquiries, please contact our media relations department at <Link href="mailto:media@timsedu.in" style={{ color: 'var(--accent)', fontWeight: 600 }}>media@timsedu.in</Link>
        </p>
      </section>
    </main>
  );
}
