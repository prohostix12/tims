
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { 
  ArrowRight,
  Award, 
  BookOpen, 
  Globe,
} from 'lucide-react';

const NEWS_PLACEHOLDER = '/images/news-hero-bg.png';

interface NewsItem {
  _id: string;
  title: string;
  excerpt: string;
  image?: string;
  category?: string;
  publishedAt: string;
  status: string;
}

const UNI_PLACEHOLDER = '/images/university-success.png';

interface University {
  _id: string;
  name: string;
  image?: string;
  status: string;
}

export default function Home() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  // Fetch universities from API
  useEffect(() => {
    fetch('/api/admin/universities')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUniversities(data.filter((u) => u.status === 'active').slice(0, 6));
        }
      })
      .catch(() => {});
  }, []);

  // Fetch news from API
  useEffect(() => {
    fetch('/api/admin/news')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNewsItems(data.filter((n) => n.status === 'published').slice(0, 6));
        }
      })
      .catch(() => {});
  }, []);
  // Scroll animations for Get To Know Us section
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Stat cards stagger
    const cards = document.querySelectorAll(`.${styles.statCard}`);
    if (prefersReduced) {
      cards.forEach((c) => c.classList.add(styles.statCardVisible));
    }

    // Get To Know Us — columns slide in from sides
    const imageCol = document.querySelector(`.${styles.getKnowImageCol}`);
    const contentCol = document.querySelector(`.${styles.getKnowContentCol}`);
    const listItems = document.querySelectorAll(`.${styles.getKnowList} li`);

    if (prefersReduced) {
      imageCol?.classList.add(styles.getKnowVisible);
      contentCol?.classList.add(styles.getKnowVisible);
      listItems.forEach((li) => li.classList.add(styles.getKnowItemVisible));
      cards.forEach((c) => c.classList.add(styles.statCardVisible));
      document.querySelectorAll(`.${styles.uniCard}`).forEach((c) => c.classList.add(styles.uniCardVisible));
      document.querySelectorAll(`.${styles.dreamCard}`).forEach((c) => c.classList.add(styles.dreamCardVisible));
      document.querySelectorAll(`.${styles.newsCard}`).forEach((c) => c.classList.add(styles.newsCardVisible));
      document.querySelectorAll(`.${styles.testimonialCard}`).forEach((c) => c.classList.add(styles.testimonialCardVisible));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;

          if (el.classList.contains(styles.statCard)) {
            el.classList.add(styles.statCardVisible);
          }
          if (el.classList.contains(styles.getKnowImageCol)) {
            el.classList.add(styles.getKnowVisible);
          }
          if (el.classList.contains(styles.getKnowContentCol)) {
            el.classList.add(styles.getKnowVisible);
            listItems.forEach((li) => li.classList.add(styles.getKnowItemVisible));
          }
          if (el.classList.contains(styles.uniCard)) {
            el.classList.add(styles.uniCardVisible);
          }
          if (el.classList.contains(styles.dreamCard)) {
            el.classList.add(styles.dreamCardVisible);
          }
          if (el.classList.contains(styles.newsCard)) {
            el.classList.add(styles.newsCardVisible);
          }
          if (el.classList.contains(styles.testimonialCard)) {
            el.classList.add(styles.testimonialCardVisible);
          }
          observer.unobserve(el);
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((c) => observer.observe(c));
    if (imageCol)  observer.observe(imageCol);
    if (contentCol) observer.observe(contentCol);

    // University cards
    const uniCards = document.querySelectorAll(`.${styles.uniCard}`);
    uniCards.forEach((c) => observer.observe(c));

    // Dream service cards
    const dreamCards = document.querySelectorAll(`.${styles.dreamCard}`);
    dreamCards.forEach((c) => observer.observe(c));

    // News cards
    const newsCards = document.querySelectorAll(`.${styles.newsCard}`);
    newsCards.forEach((c) => observer.observe(c));

    // Testimonial cards
    const testimonialCards = document.querySelectorAll(`.${styles.testimonialCard}`);
    testimonialCards.forEach((c) => observer.observe(c));

    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.container}>
      {/* ===== Hero Section ===== */}
      <section className={styles.heroWrapper}>
        <div className={styles.heroBgImage} aria-hidden="true" />
        {/* Animated background particles */}
        <div className={styles.heroBgOverlay} aria-hidden="true" />

        <div className={styles.heroContent}>
          {/* Badge */}
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Trusted by 15,000+ Students Globally
          </div>

          {/* Headline */}
          <h1 className={styles.heroTitle}>
            <span className={styles.heroLine1}>Your Future Starts</span>
            <span className={styles.heroLine2}>
              With the <em className={styles.heroAccent}>Right</em> Education
            </span>
          </h1>

          {/* Subtext */}
          <p className={styles.heroSub}>
            TIMS connects ambitious students with accredited universities, 
            seamless credit transfers, and expert attestation services — 
            all under one roof.
          </p>

          {/* CTA row */}
          <div className={styles.heroActions}>
            <Link href="/courses" className={styles.heroPrimaryBtn}>
              Explore Programs <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className={styles.heroSecondaryBtn}>
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Floating Stats Section ===== */}
      <section className={styles.statsSection}>
        <h2 className={styles.srOnly}>Our Impact in Numbers</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>15K+</span>
            <span className={styles.statLabel}>Global Alumni</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>25+</span>
            <span className={styles.statLabel}>Partner Universities</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>98%</span>
            <span className={styles.statLabel}>Success Rate</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Accreditation</span>
          </div>
        </div>
      </section>

      {/* ===== Get To Know Us Section ===== */}
      <section className={styles.getKnowSection}>
        <div className={styles.getKnowGrid}>
          <div className={styles.getKnowImageCol}>
            <Image
              src="/images/tims poster.jpg"
              alt="Honored with Excellence"
              width={600}
              height={500}
              className={styles.getKnowImage}
            />
          </div>
          <div className={styles.getKnowContentCol}>
            <span className={styles.getKnowSub}>GET TO KNOW US</span>
            <h2 className={styles.getKnowTitle}>Learning Anytime,<br/>Anywhere for Success</h2>
            <p className={styles.getKnowText}>
              Providing accessible, high-quality education and guidance, Tirur Institute of Management Studies fosters academic excellence, professional growth, and societal impact for every learner.
            </p>
            <ul className={styles.getKnowList}>
              <li>
                <span className={styles.checkIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span className={styles.listItemText}>Accredited Attestation and Certification Services</span>
              </li>
              <li>
                <span className={styles.checkIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span className={styles.listItemText}>Flexible Online and Credit Transfer Options</span>
              </li>
              <li>
                <span className={styles.checkIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span className={styles.listItemText}>Comprehensive Course and Degree Programs</span>
              </li>
            </ul>
            <Link href="/about" className={styles.getKnowBtn}>
              Discover More
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Partner Universities Section ===== */}
      <section className={styles.uniSection}>
        <div className={styles.uniSectionHeader}>
          <span className={styles.uniSectionTag}>Our Network</span>
          <h2 className={styles.uniSectionTitle}>Partner Universities</h2>
          <p className={styles.uniSectionSub}>
            We connect you with world-class institutions across the globe — accredited, reputed, and career-focused.
          </p>
        </div>

        <div className={styles.uniGrid}>
          {(universities.length > 0 ? universities : [
            { _id: '1', name: "Amrita Vishwa Vidyapeetham", status: 'active' },
            { _id: '2', name: "University of Greenwich", status: 'active' },
            { _id: '3', name: "Arizona State University", status: 'active' },
            { _id: '4', name: "Monash University", status: 'active' },
            { _id: '5', name: "University of Toronto", status: 'active' },
            { _id: '6', name: "TU Munich", status: 'active' },
          ] as University[]).map((uni, i) => (
            <div key={uni._id} className={styles.uniCard} style={{ '--i': i } as React.CSSProperties}>
              <div className={styles.uniCardImgWrapper}>
                <Image
                  src={uni.image || UNI_PLACEHOLDER}
                  alt={uni.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.uniCardBody}>
                <h3 className={styles.uniCardName}>{uni.name}</h3>
                <Link href="/universities" className={styles.uniCardBtn}>
                  View Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.uniSectionFooter}>
          <Link href="/universities" className={styles.uniViewAllBtn}>
            View All Universities <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ===== Services Dream Section ===== */}
      <section className={styles.dreamSection}>
        <div className={styles.dreamHeader}>
          <h2 className={styles.dreamTitle}>Make Your Dream Come True!</h2>
          <p className={styles.dreamSub}>Provide better education to the society at an affordable cost</p>
        </div>

        <div className={styles.dreamGrid}>
          {[
            {
              icon: <Award size={36} />,
              title: 'Embassy Attestation',
              desc: 'Attest your educational and non-educational documents with speed and reliability.',
              href: '/services/attestation',
              accent: true,
            },
            {
              icon: <Globe size={36} />,
              title: 'Online Studies',
              desc: 'Assistance for admission in the best institutes of India and abroad.',
              href: '/courses',
              accent: false,
            },
            {
              icon: <BookOpen size={36} />,
              title: 'Distance Education',
              desc: 'We provide educational services to students all across the world.',
              href: '/services/distance-education',
              accent: true,
            },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={`${styles.dreamCard} ${item.accent ? styles.dreamCardAccent : styles.dreamCardDark}`}
              style={{ '--di': i } as React.CSSProperties}
            >
              <div className={styles.dreamCardIcon}>{item.icon}</div>
              <h3 className={styles.dreamCardTitle}>{item.title}</h3>
              <p className={styles.dreamCardDesc}>{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== Latest News Section ===== */}
      <section className={styles.newsSection}>
        <div className={styles.uniSectionHeader}>
          <span className={styles.uniSectionTag}>Stay Updated</span>
          <h2 className={styles.uniSectionTitle}>Latest News</h2>
          <p className={styles.uniSectionSub}>
            Stay informed with the latest updates, announcements, and insights from TIMS.
          </p>
        </div>

        <div className={styles.newsGrid}>
          {(newsItems.length > 0 ? newsItems : [
            { _id: '1', title: 'TIMS Awarded Best Admission Partner 2024', excerpt: 'Tirur Institute of Management Studies has been recognized as the Best Admission Partner by Swami Vivekanand Subharti University.', category: 'Awards', publishedAt: '2024-03-15', status: 'published' },
            { _id: '2', title: 'New Distance Learning Programs Launched', excerpt: 'TIMS introduces new UG and PG distance learning programs in partnership with top accredited universities across India.', category: 'Programs', publishedAt: '2024-02-20', status: 'published' },
            { _id: '3', title: 'Embassy Attestation Services Now Faster', excerpt: 'Our attestation team has streamlined the process, reducing turnaround time to just 3-5 working days for most documents.', category: 'Services', publishedAt: '2024-01-10', status: 'published' },
            { _id: '4', title: 'Credit Transfer Program Expansion', excerpt: 'TIMS expands its credit transfer program with 5 new partner universities, giving students more flexibility in completing their degrees.', category: 'Programs', publishedAt: '2023-12-05', status: 'published' },
            { _id: '5', title: 'Student Success Stories 2023', excerpt: 'Over 2,000 students successfully completed their degree programs through TIMS guidance in 2023, achieving career milestones.', category: 'Success', publishedAt: '2023-11-18', status: 'published' },
            { _id: '6', title: 'TIMS Joins Global Education Network', excerpt: 'TIMS becomes a member of the Global Education Network, opening doors to international university partnerships and student exchange programs.', category: 'Partnerships', publishedAt: '2023-10-22', status: 'published' },
          ] as NewsItem[]).map((item, i) => (
            <div key={item._id} className={styles.newsCard} style={{ '--i': i } as React.CSSProperties}>
              <div className={styles.newsCardImgWrapper}>
                <Image
                  src={item.image || NEWS_PLACEHOLDER}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                {item.category && (
                  <span className={styles.newsCardCategory}>{item.category}</span>
                )}
              </div>
              <div className={styles.newsCardBody}>
                <p className={styles.newsCardDate}>
                  {new Date(item.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
                <h3 className={styles.newsCardTitle}>{item.title}</h3>
                <p className={styles.newsCardExcerpt}>{item.excerpt}</p>
                <Link href="/news" className={styles.newsCardBtn}>
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.uniSectionFooter}>
          <Link href="/news" className={styles.uniViewAllBtn}>
            View All News <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </main>
  );
}
