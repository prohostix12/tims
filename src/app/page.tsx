
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
  logo?: string;
  status: string;
}

export default function Home() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
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

  // Fetch universities, news, blogs, and courses from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [uniRes, newsRes, blogRes, courseRes] = await Promise.all([
          fetch('/api/admin/universities'),
          fetch('/api/admin/news'),
          fetch('/api/admin/blogs'),
          fetch('/api/admin/programs')
        ]);
        
        const uniData = await uniRes.json();
        const newsData = await newsRes.json();
        const blogData = await blogRes.json();
        const courseData = await courseRes.json();

        // Set data from API
        console.log('API Response:', { uniData, newsData, blogData, courseData });

        if (Array.isArray(uniData)) {
          setUniversities(uniData.filter((u) => !u.status || u.status.toLowerCase() === 'active').slice(0, 6));
        }
        if (Array.isArray(newsData)) {
          setNewsItems(newsData.filter((n) => !n.status || n.status.toLowerCase() === 'published').slice(0, 6));
        }
        if (Array.isArray(blogData)) {
          setBlogs(blogData.filter((b) => !b.status || b.status.toLowerCase() === 'published').slice(0, 4));
        }
        if (Array.isArray(courseData)) {
          setCourses(courseData.slice(0, 3));
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
      { threshold: 0.1 }
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
  }, [courses, universities, newsItems, blogs]); // Re-run when data changes

  return (
    <main className={styles.container}>

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
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                priority
              />
              <div className={styles.heroImageOverlay}>
                <p className={styles.overlayWhite}>Study in</p>
                <p className={styles.overlayHighlight}>Top Universities</p>
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
          <span className={styles.uniSectionTag}>Global Network</span>
          <h2 className={styles.uniSectionTitle}>
            <span style={{ color: '#ef233c' }}>Partner</span> Universities
          </h2>
          <p className={styles.uniSectionSub}>
            Collaborating with world-class institutions to provide you with the best educational opportunities and global recognition.
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  onError={(e) => { e.currentTarget.srcset = ''; e.currentTarget.src = UNI_PLACEHOLDER; }}
                />
                {uni.logo && (
                  <div style={{ position: 'absolute', top: '15px', left: '15px', width: '45px', height: '45px', borderRadius: '8px', overflow: 'hidden', border: '2px solid white', background: 'white', boxShadow: '0 4px 10px rgba(0,0,0,0.15)', zIndex: 10 }}>
                    <img src={uni.logo} alt={`${uni.name} logo`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(uni.name)}&background=random&size=128`; }} />
                  </div>
                )}
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
          {courses.map((course, i) => (
            <div key={course._id} className={styles.courseMiniCard} style={{ '--i': i } as React.CSSProperties}>
              <div className={styles.courseMiniImg}>
                <Image src={course.image || 'https://images.unsplash.com/photo-1523240715639-99f84db47d0e?q=80&w=800'} alt={course.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} unoptimized={true} />
                <span className={styles.courseTag}>{course.level}</span>
              </div>
              <div className={styles.courseMiniBody}>
                <h3>{course.name}</h3>
                <p>{course.duration} • Full-time</p>
                <Link href={`/courses/${course._id}`} className={styles.courseLink}>
                  Explore Program <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
          {courses.length === 0 && !loading && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#64748b', background: '#f1f5f9', borderRadius: '16px' }}>
              <p>New academic programs are being added. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== Testimonials Section ===== */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsSectionHeader}>
          <span className={styles.uniSectionTag}>Success Stories</span>
          <h2 className={styles.uniSectionTitle}>What Our Students Say</h2>
          <p className={styles.uniSectionSub}>
            Join thousands of successful alumni who have transformed their careers through TIMS.
          </p>
        </div>

        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {[
              { name: 'Aisha Raheem', role: 'MBA Graduate, Dubai', avatar: 'A', rating: 5, text: 'TIMS transformed my career. The distance MBA program was incredibly flexible and the faculty support was world-class. I went from a junior executive to a regional manager within a year of graduating.' },
              { name: 'Rahul Nair', role: 'B.Tech Graduate, Bangalore', avatar: 'R', rating: 5, text: 'The credit transfer guidance from TIMS was exceptional. They helped me transition my Indian engineering degree to a Canadian university seamlessly. Couldn\'t have done it without their team.' },
              { name: 'Priya Menon', role: 'BBA Graduate, Kochi', avatar: 'P', rating: 5, text: 'I completed my BBA through distance learning while working full-time. TIMS made it possible with their structured study materials and responsive support. Highly recommended for working professionals.' },
              { name: 'Mohammed Ashik', role: 'NIOS Graduate, Thrissur', avatar: 'M', rating: 5, text: 'I had failed my board exams twice. TIMS guided me through the NIOS pathway and I passed with distinction. Their coaching and mock tests gave me the confidence I needed to succeed.' },
              { name: 'Sreeja Thomas', role: 'MCA Graduate, Trivandrum', avatar: 'S', rating: 5, text: 'The attestation services at TIMS are outstanding. They handled all my documents for UAE employment, from state authentication to Embassy legalisation, within 7 days as promised.' },
              { name: 'Arjun Pillai', role: 'MBA Graduate, Abu Dhabi', avatar: 'A', rating: 5, text: 'TIMS opened doors I never knew existed. Their international university partnerships gave me access to a globally recognised MBA that is respected by employers across the Gulf.' },
              { name: 'Fatima Al Rashid', role: 'B.Com Graduate, Calicut', avatar: 'F', rating: 5, text: 'I chose TIMS for their reputation and was not disappointed. The admission counsellors were honest, helpful and guided me to the right program without pushing unnecessary courses.' },
              { name: 'Vineeth Kumar', role: 'Diploma in Data Science', avatar: 'V', rating: 5, text: 'The Data Science diploma from TIMS gave me practical skills that I applied immediately at my workplace. The curriculum is modern, relevant and delivered by industry experts.' },
            ].concat([
              { name: 'Aisha Raheem', role: 'MBA Graduate, Dubai', avatar: 'A', rating: 5, text: 'TIMS transformed my career. The distance MBA program was incredibly flexible and the faculty support was world-class. I went from a junior executive to a regional manager within a year of graduating.' },
              { name: 'Rahul Nair', role: 'B.Tech Graduate, Bangalore', avatar: 'R', rating: 5, text: 'The credit transfer guidance from TIMS was exceptional. They helped me transition my Indian engineering degree to a Canadian university seamlessly. Couldn\'t have done it without their team.' },
              { name: 'Priya Menon', role: 'BBA Graduate, Kochi', avatar: 'P', rating: 5, text: 'I completed my BBA through distance learning while working full-time. TIMS made it possible with their structured study materials and responsive support. Highly recommended for working professionals.' },
              { name: 'Mohammed Ashik', role: 'NIOS Graduate, Thrissur', avatar: 'M', rating: 5, text: 'I had failed my board exams twice. TIMS guided me through the NIOS pathway and I passed with distinction. Their coaching and mock tests gave me the confidence I needed to succeed.' },
            ]).map((t, i) => (
              <div key={i} className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>
                  {'★'.repeat(t.rating)}
                </div>
                <p className={styles.testimonialText}>"{t.text}"</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>{t.avatar}</div>
                  <div>
                    <p className={styles.testimonialName}>{t.name}</p>
                    <p className={styles.testimonialRole}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
        <div className={styles.newsHeader} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 5rem' }}>
          <span className={styles.uniSectionTag}>Stay Informed</span>
          <h2 className={styles.uniSectionTitle}>
            <span style={{ color: '#ef233c' }}>Latest</span> News
          </h2>
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
