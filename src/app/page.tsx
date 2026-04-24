
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';
import { 
  ArrowRight,
  Award, 
  BookOpen, 
  Globe,
  Star,
  Lightbulb,
  PieChart,
  Settings,
  Target,
  MessageSquare,
  FileText,
  Users,
  Search
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
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/courses?search=${encodeURIComponent(q)}`);
    } else {
      router.push('/courses');
    }
  }, [searchQuery, router]);

  // Fetch universities, news, and blogs from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [uniRes, newsRes, blogRes] = await Promise.all([
          fetch('/api/admin/universities'),
          fetch('/api/admin/news'),
          fetch('/api/admin/blogs')
        ]);
        
        const uniData = await uniRes.json();
        const newsData = await newsRes.json();
        const blogData = await blogRes.json();

        // Set data from API
        if (Array.isArray(uniData)) {
          setUniversities(uniData.filter((u) => u.status === 'active').slice(0, 6));
        }
        if (Array.isArray(newsData)) {
          setNewsItems(newsData.filter((n) => n.status === 'published').slice(0, 6));
        }
        if (Array.isArray(blogData)) {
          setBlogs(blogData.filter((b) => b.status === 'published').slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      {/* ===== Category Icon Strip ===== */}
      <div className={styles.categoryStrip}>
        <div className={styles.categoryInner}>
          {[
            { emoji: '🎓', label: 'BBA' },
            { emoji: '📊', label: 'MBA' },
            { emoji: '📜', label: 'Attestation' },
            { emoji: '🌐', label: 'Credit Transfer' },
            { emoji: '💻', label: 'Online Studies' },
            { emoji: '📚', label: 'Distance Ed.' },
            { emoji: '🏫', label: 'SSLC / NIOS' },
            { emoji: '✈️', label: 'Study Abroad' },
          ].map((cat, i) => (
            <Link key={i} href="/courses" className={styles.categoryItem}>
              <span className={styles.categoryEmoji}>{cat.emoji}</span>
              <span className={styles.categoryLabel}>{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ===== Hero Section - UpGrad Style ===== */}
      <section className={styles.heroWrapper}>
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <h1 className={styles.heroTitle}>
              Shaping Global Careers <br />
              <span className={styles.heroTitleDark}>Through Excellence.</span>
            </h1>

            <form onSubmit={handleSearch} className={styles.heroSearch}>
              <input
                type="text"
                placeholder="Tell us what you're looking for..."
                className={styles.heroSearchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
              <button type="submit" className={styles.heroSearchBtn}>
                <Search size={18} />
              </button>
            </form>

            <div className={styles.goalSection}>
              <p className={styles.goalLabel}>Or select your goal 🎯</p>
              <div className={styles.goalChips}>
                {['Embassy Attestation', 'Online Degree', 'Credit Transfer', 'SSLC / NIOS', 'BBA / MBA', 'Study Abroad', 'Distance Education', 'Free Counselling'].map((g, i) => (
                  <Link key={i} href="/courses" className={styles.goalChip}>{g}</Link>
                ))}
              </div>
            </div>

            <p className={styles.communityCount}>
              Join the community of <span>15,000+</span> learners.
            </p>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.heroImageCard}>
              <Image
                src="/images/hero-campus.png"
                alt="Students on University Campus"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div className={styles.heroImageOverlay}>
                <p className={styles.overlayWhite}>Study in</p>
                <p className={styles.overlayHighlight}>Top Universities Abroad</p>
                <Link href="/universities" className={styles.overlayLink}>Explore programs →</Link>
              </div>
            </div>
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
          {universities.map((uni, i) => (
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
                <Link href={`/universities/${uni._id}`} className={styles.uniCardBtn}>
                  View Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
          {universities.length === 0 && !loading && (
             <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#64748b', background: '#f1f5f9', borderRadius: '16px' }}>
                <p>Stay tuned! Our partner universities will be listed here soon.</p>
             </div>
          )}
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
              desc: 'Global document verification and authentication services.',
              href: '/services/attestation',
              color: 'blue',
            },
            {
              icon: <Globe size={36} />,
              title: 'Online Studies',
              desc: 'Accredited online degrees from top-tier universities.',
              href: '/courses',
              color: 'red',
            },
            {
              icon: <BookOpen size={36} />,
              title: 'Distance Education',
              desc: 'Flexible learning programs for students worldwide.',
              href: '/services/distance-education',
              color: 'blue',
            },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={`${styles.dreamCard} ${item.color === 'red' ? styles.dreamCardRed : styles.dreamCardBlue}`}
              style={{ '--di': i } as React.CSSProperties}
            >
              <div className={styles.dreamCardIcon}>{item.icon}</div>
              <h3 className={styles.dreamCardTitle}>{item.title}</h3>
              <p className={styles.dreamCardDesc}>{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== Trending Courses Section ===== */}
      <section className={styles.coursesSection}>
        <div className={styles.uniSectionHeader}>
          <span className={styles.uniSectionTag}>Top Programs</span>
          <h2 className={styles.uniSectionTitle}>Trending Courses</h2>
          <p className={styles.uniSectionSub}>
            Discover our most sought-after programs designed to fast-track your career in management and technology.
          </p>
        </div>

        <div className={styles.coursesGrid}>
          {[
            { title: 'BBA Global Business', level: 'Bachelor Degree', duration: '3 Years', image: 'https://images.unsplash.com/photo-1523240715639-99f84db47d0e?q=80&w=800' },
            { title: 'MBA Strategic Management', level: 'Master Degree', duration: '2 Years', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800' },
            { title: 'Diploma in HR Management', level: 'Professional Diploma', duration: '1 Year', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800' },
          ].map((course, i) => (
            <div key={i} className={styles.courseMiniCard} style={{ '--i': i } as React.CSSProperties}>
              <div className={styles.courseMiniImg}>
                <Image src={course.image} alt={course.title} fill style={{ objectFit: 'cover' }} unoptimized={true} />
                <span className={styles.courseTag}>{course.level}</span>
              </div>
              <div className={styles.courseMiniBody}>
                <h3>{course.title}</h3>
                <p>{course.duration} • Full-time</p>
                <Link href="/courses" className={styles.courseLink}>
                  Explore Program <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Testimonials Section ===== */}
      <section className={styles.testimonialsSection}>
        <div className={styles.uniSectionHeader}>
          <span className={styles.uniSectionTag}>Success Stories</span>
          <h2 className={styles.uniSectionTitle}>What Our Students Say</h2>
          <p className={styles.uniSectionSub}>
            Join thousands of successful alumni who have transformed their careers through TIMS.
          </p>
        </div>

        <div className={styles.testimonialsGrid}>
          {[
            { name: 'Sarah Ahmed', role: 'MBA Graduate', text: 'TIMS provided the flexibility I needed to balance my career and studies. The mentorship was top-notch.', avatar: 'https://i.pravatar.cc/100?u=sarah' },
            { name: 'Kevin Joseph', role: 'BBA Alumni', text: 'The global network of partner universities at TIMS opened doors I never thought possible.', avatar: 'https://i.pravatar.cc/100?u=kevin' },
            { name: 'Meera Nair', role: 'Diploma Student', text: 'The practical approach to learning and the embassy attestation support made my transition overseas seamless.', avatar: 'https://i.pravatar.cc/100?u=meera' },
          ].map((t, i) => (
            <div key={i} className={styles.testimonialCard} style={{ '--i': i } as React.CSSProperties}>
              <div className={styles.quoteIcon}><MessageSquare size={24} fill="#ef233c" stroke="none" /></div>
              <p className={styles.testimonialText}>"{t.text}"</p>
              <div className={styles.testimonialUser}>
                <Image src={t.avatar} alt={t.name} width={50} height={50} className={styles.userAvatar} unoptimized={true} />
                <div className={styles.userInfo}>
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Blog Section ===== */}
      <section className={styles.blogSection}>
        <div className={styles.uniSectionHeader}>
          <span className={styles.uniSectionTag}>Expert Insights</span>
          <h2 className={styles.uniSectionTitle}>From Our Blog</h2>
          <p className={styles.uniSectionSub}>
            Stay ahead with the latest trends in global education, career tips, and institutional updates.
          </p>
        </div>

        <div className={styles.blogGrid}>
          {blogs.map((post, i) => (
            <div key={post._id} className={styles.blogMiniCard} style={{ '--i': i } as React.CSSProperties}>
              <div className={styles.blogMiniImg}>
                <Image 
                  src={post.image || '/images/blog-placeholder.png'} 
                  alt={post.title} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  unoptimized={true} 
                />
              </div>
              <div className={styles.blogMiniBody}>
                <span className={styles.blogDate}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
                <h3>{post.title}</h3>
                <Link href={`/blogs/${post._id}`} className={styles.blogLink}>
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
          {blogs.length === 0 && !loading && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#64748b', background: '#f1f5f9', borderRadius: '16px' }}>
              <p>Our educational blog posts are coming soon!</p>
            </div>
          )}
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
          {newsItems.map((item, i) => (
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
                <Link href={`/news/${item._id}`} className={styles.newsCardBtn}>
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
          {newsItems.length === 0 && !loading && (
             <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#64748b', background: '#f1f5f9', borderRadius: '16px' }}>
                <p>New updates and announcements are on their way!</p>
             </div>
          )}
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
