
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
  Search,
  Phone,
  CheckCircle,
  Headphones,
  CreditCard
} from 'lucide-react';
import OnlineCoursesSection from '@/components/OnlineCoursesSection';

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
  description?: string;
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
          fetch('/api/admin/universities', { cache: 'no-store' }),
          fetch('/api/admin/news', { cache: 'no-store' }),
          fetch('/api/admin/blogs', { cache: 'no-store' }),
          fetch('/api/admin/programs', { cache: 'no-store' })
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
    if (imageCol) observer.observe(imageCol);
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

      {/* ===== Hero Section - DevSkill eLearning Style ===== */}
      <section className={styles.heroWrapper}>

        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <span className={styles.heroBadge}>🎓 Education Platform</span>

            <h1 className={styles.heroTitle}>
              Shaping Global Careers <br />
              <span className={styles.heroTitleAccent}>Through Excellence.</span>
            </h1>

            <p className={styles.heroSubtext}>
              Providing accessible, high-quality education and guidance — accredited online degrees, attestation services, and career-oriented programs for learners worldwide.
            </p>

            <div className={styles.heroCTAGroup}>
              <button
                className={styles.heroCTABtn}
                onClick={() => window.dispatchEvent(new CustomEvent('open-course-finder'))}
              >
                Suggest Me a University <ArrowRight size={16} />
              </button>
              <Link href="/courses" className={styles.heroPlayBtn}>
                <span className={styles.playCircle}>▶</span>
                <span>Explore Courses</span>
              </Link>
            </div>

            {/* Credential Badges */}
            <div className={styles.credBadgesRow}>
              {['UGC-DEB Approved', 'NAAC Accredited', 'AICTE Approved'].map(b => (
                <span key={b} className={styles.credBadge}>{b}</span>
              ))}
            </div>
          </div>

          <div className={styles.heroRight}>
            {/* Arrow/chevron shapes */}
            <div className={styles.heroArrow1} />
            <div className={styles.heroArrow2} />

            {/* Decorative ring */}
            <div className={styles.heroRing} />

            {/* Student image */}
            <div className={styles.heroStudentWrap}>
              <Image
                src="/images/hero-student-v3.png"
                alt="Student ready for success"
                width={480}
                height={580}
                className={styles.heroCutoutImg}
                priority
              />
            </div>

            {/* ── 4 Floating Stat Cards around the image ── */}

            {/* Top-left */}
            <div className={styles.floatStatCard} style={{ top: '5%', left: '-5%', animationDelay: '0s' }}>
              <div className={styles.floatStatIcon} style={{ background: 'linear-gradient(135deg,#002060,#0a3a8c)' }}>
                <Users size={16} />
              </div>
              <div>
                <p className={styles.floatStatNum}>20,000+</p>
                <p className={styles.floatStatLabel}>Active Alumni</p>
              </div>
            </div>

            {/* Top-right */}
            <div className={styles.floatStatCard} style={{ top: '5%', right: '-5%', animationDelay: '0.3s' }}>
              <div className={styles.floatStatIcon} style={{ background: 'linear-gradient(135deg,#ef233c,#d01a2e)' }}>
                <Award size={16} />
              </div>
              <div>
                <p className={styles.floatStatNum}>18+ Yrs</p>
                <p className={styles.floatStatLabel}>Experience</p>
              </div>
            </div>

            {/* Bottom-left */}
            <div className={styles.floatStatCard} style={{ bottom: '10%', left: '-5%', animationDelay: '0.6s' }}>
              <div className={styles.floatStatIcon} style={{ background: 'linear-gradient(135deg,#0ea5e9,#0284c7)' }}>
                <Globe size={16} />
              </div>
              <div>
                <p className={styles.floatStatNum}>60+</p>
                <p className={styles.floatStatLabel}>Universities</p>
              </div>
            </div>

            {/* Bottom-right */}
            <div className={styles.floatStatCard} style={{ bottom: '10%', right: '-5%', animationDelay: '0.9s' }}>
              <div className={styles.floatStatIcon} style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)' }}>
                <Star size={16} />
              </div>
              <div>
                <p className={styles.floatStatNum}>95%+</p>
                <p className={styles.floatStatLabel}>Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ===== Online Courses Section (Tabbed) ===== */}
      <OnlineCoursesSection />

      {/* ===== Stats Trust Bar ===== */}
      <section className={styles.statsTrustBar}>
        {[
          { num: '5,000+', label: 'Happy Alumni' },
          { num: '100+',   label: 'Expert Mentors' },
          { num: '90+',    label: 'Partner Universities' },
          { num: '18+',    label: 'Years Experience' },
        ].map((s, i) => (
          <div key={i} className={styles.statsTrustItem}>
            <span className={styles.statsTrustNum}>{s.num}</span>
            <span className={styles.statsTrustLabel}>{s.label}</span>
          </div>
        ))}
      </section>

      {/* ===== Career Guidance Section ===== */}
      <section className={styles.careerSection}>
        <div className={styles.careerHeader}>
          <span className={styles.uniSectionTag}>Plan Your Future</span>
          <h2 className={styles.careerTitle}>Career Guidance</h2>
          <p className={styles.careerSub}>Know what career paths open up after completing your degree</p>
        </div>
        <div className={styles.careerGrid}>
          {[
            { degree: 'After MBA',   desc: 'Management, Consulting, Banking & Finance roles', href: '/courses' },
            { degree: 'After MCA',   desc: 'Software Development, Cloud, AI & IT Management', href: '/courses' },
            { degree: 'After M.Com', desc: 'Accounting, Taxation, Finance & Academia', href: '/courses' },
            { degree: 'After BBA',   desc: 'Marketing, HR, Entrepreneurship & Sales', href: '/courses' },
            { degree: 'After BCA',   desc: 'Web Development, Data Science & Tech Support', href: '/courses' },
            { degree: 'After B.Com', desc: 'CA, Banking, E-Commerce & Government Jobs', href: '/courses' },
          ].map((item, i) => (
            <Link key={i} href={item.href} className={styles.careerCard}>
              <div className={styles.careerCardNum}>{String(i + 1).padStart(2, '0')}</div>
              <h3 className={styles.careerCardDegree}>{item.degree}</h3>
              <p className={styles.careerCardDesc}>{item.desc}</p>
              <span className={styles.careerCardCta}>Know More <ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== What We Do For You ===== */}
      <section className={styles.whatWeDoSection}>
        <div className={styles.whatWeDoInner}>
          <div className={styles.whatWeDoHeader}>
            <span className={styles.uniSectionTag}>Our Process</span>
            <h2 className={styles.whatWeDoTitle}>What We Do For You</h2>
            <p className={styles.whatWeDoPara}>End-to-end support — from choosing the right university to completing your admission successfully.</p>
          </div>
          <div className={styles.whatWeDoGrid}>
            {[
              { step: '01', title: 'Understand Your Goals', desc: 'We start by understanding your background, budget, and career aspirations through a free consultation.' },
              { step: '02', title: 'Suggest the Right Program', desc: 'Our mentors match you with the best UGC-approved university and program that fits your profile.' },
              { step: '03', title: 'Hassle-Free Admission', desc: 'We guide you through the entire admission process — forms, documents, and fee payments.' },
              { step: '04', title: 'Ongoing Support', desc: 'After joining, we provide study materials, exam guidance, and career counselling throughout your course.' },
            ].map((item, i) => (
              <div key={i} className={styles.whatWeDoCard}>
                <div className={styles.whatWeDoStep}>{item.step}</div>
                <h3 className={styles.whatWeDoCardTitle}>{item.title}</h3>
                <p className={styles.whatWeDoCardDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              className={styles.confusedBtn}
              onClick={() => window.dispatchEvent(new CustomEvent('open-course-finder'))}
            >
              Get Free Guidance <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ===== Value Proposition Section (Edufolio-inspired) ===== */}
      <section className={styles.valuePropSection}>
        <div className={styles.valuePropGrid}>
          {[
            { icon: <CheckCircle size={34} />, title: 'UGC Approved', desc: 'Nationwide recognition for all programs' },
            { icon: <Globe size={34} />, title: '100% Online', desc: 'Learn from anywhere, anytime, at your pace' },
            { icon: <CreditCard size={34} />, title: 'Affordable Fees', desc: 'Competitive pricing with flexible EMI options' },
            { icon: <Headphones size={34} />, title: '24/7 Support', desc: 'Dedicated guidance always at your side' },
          ].map((item, i) => (
            <div key={i} className={styles.valuePropCard}>
              <div className={styles.valuePropIcon}>{item.icon}</div>
              <h3 className={styles.valuePropTitle}>{item.title}</h3>
              <p className={styles.valuePropDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Confused / Help Section (IndianEduHub-inspired) ===== */}
      <section className={styles.confusedSection}>
        <div className={styles.confusedInner}>
          <div className={styles.confusedContent}>
            <span className={styles.uniSectionTag} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>We&apos;re Here to Help</span>
            <h2 className={styles.confusedTitle}>Are You Confused About <br /><span>Choosing the Right University?</span></h2>
            <p className={styles.confusedText}>Our experienced mentors guide you through every step — from selecting the right program to completing your admission successfully.</p>
            <button
              className={styles.confusedBtn}
              onClick={() => window.dispatchEvent(new CustomEvent('open-course-finder'))}
            >
              Suggest Me a University <ArrowRight size={18} />
            </button>
          </div>
          <div className={styles.confusedStats}>
            {[
              { num: '20,000+', label: 'Alumni' },
              { num: '100+', label: 'Expert Mentors' },
              { num: '18+', label: 'Years Experience' },
              { num: '60+', label: 'Partner Universities' },
            ].map((s, i) => (
              <div key={i} className={styles.confusedStat}>
                <span className={styles.confusedStatNum}>{s.num}</span>
                <span className={styles.confusedStatLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Partner Universities Section (Redesigned) ===== */}
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

        <div className={styles.premiumUniGrid}>
          {universities.map((uni, i) => (
            <div key={uni._id} className={styles.premiumUniCard}>
              <div className={styles.premiumUniImg}>
                <Image
                  src={uni.image || UNI_PLACEHOLDER}
                  alt={uni.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  onError={(e) => { e.currentTarget.srcset = ''; e.currentTarget.src = UNI_PLACEHOLDER; }}
                />
                {uni.logo && (
                  <div className={styles.premiumUniLogo}>
                    <img src={uni.logo} alt={`${uni.name} logo`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                )}
              </div>
              <div className={styles.premiumUniContent}>
                <h3>{uni.name}</h3>
                {uni.description && (
                  <p className={styles.premiumUniDesc}>
                    {uni.description.length > 100 ? uni.description.substring(0, 100) + '...' : uni.description}
                  </p>
                )}
                <Link href={`/universities/${uni._id}`} className={styles.premiumUniBtn}>
                  Explore Programs <ArrowRight size={16} />
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

      {/* ===== Consultation CTA Block (Edufolio-inspired) ===== */}
      <section className={styles.consultSection}>
        <div className={styles.consultInner}>
          <div>
            <h2 className={styles.consultTitle}>Need Help Choosing the Right Course?</h2>
            <p className={styles.consultText}>Talk to our experts and get personalised guidance — completely free.</p>
          </div>
          <div className={styles.consultActions}>
            <a href="tel:+919961967777" className={styles.consultPhoneBtn}>
              <Phone size={20} />
              +91 9961967777
            </a>
            <Link href="/contact" className={styles.consultContactBtn}>
              Get Free Guidance <ArrowRight size={16} />
            </Link>
          </div>
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

      {/* ===== Blog Section (Redesigned) ===== */}
      <section className={styles.premiumBlogSection}>
        <div className={styles.uniSectionHeader}>
          <span className={styles.uniSectionTag}>Expert Insights</span>
          <h2 className={styles.uniSectionTitle}>From Our Blog</h2>
        </div>

        <div className={styles.premiumBlogGrid}>
          {blogs.map((post, i) => (
            <Link href={`/blogs/${post._id}`} key={post._id} className={styles.premiumBlogCard}>
              <Image
                src={post.image || '/images/blog-placeholder.png'}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                style={{ objectFit: 'cover' }}
                unoptimized={true}
              />
              <div className={styles.premiumBlogOverlay}>
                <span className={styles.premiumBlogDate}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
                <h3>{post.title}</h3>
              </div>
            </Link>
          ))}
          {blogs.length === 0 && !loading && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#64748b' }}>
              <p>Our educational blog posts are coming soon!</p>
            </div>
          )}
        </div>

        <div className={styles.uniSectionFooter}>
          <Link href="/blogs" className={styles.uniViewAllBtn}>
            View All Blogs <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ===== Latest News Section (Redesigned) ===== */}
      <section className={styles.premiumNewsSection}>
        <div className={styles.premiumNewsHeader}>
          <h2>Latest News & Updates</h2>
        </div>

        <div className={styles.premiumNewsGrid}>
          {newsItems.map((item, i) => (
            <Link href={`/news/${item._id}`} key={item._id} className={styles.premiumNewsItem}>
              <div className={styles.premiumNewsDateBox}>
                <span className={styles.newsDay}>{new Date(item.publishedAt).getDate()}</span>
                <span className={styles.newsMonth}>{new Date(item.publishedAt).toLocaleString('en-US', { month: 'short' })}</span>
              </div>
              <div className={styles.premiumNewsContent}>
                {item.category && <span className={styles.premiumNewsCategory}>{item.category}</span>}
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </div>
              <div className={styles.premiumNewsIcon}>
                <ArrowRight size={24} />
              </div>
            </Link>
          ))}
          {newsItems.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
              <p>No recent news available.</p>
            </div>
          )}
        </div>
        <div className={styles.uniSectionFooter}>
          <Link href="/news" className={styles.uniViewAllBtn}>
            View All News <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ===== Ready to Start CTA (Edufolio-inspired) ===== */}
      <section className={styles.readySection}>
        <div className={styles.readyInner}>
          <p className={styles.readyTagline}>learn.grow.succeed.</p>
          <h2 className={styles.readyTitle}>Ready to Start Your Journey?</h2>
          <p className={styles.readySub}>Join thousands of successful alumni who have transformed their careers through TIMS.</p>
          <div className={styles.readyBtns}>
            <Link href="/courses" className={styles.readyBtnPrimary}>Explore Programs <ArrowRight size={16} /></Link>
            <Link href="/contact" className={styles.readyBtnSecondary}>Contact Us</Link>
          </div>
        </div>
      </section>

      {/* ===== SEO Section: Best Distance Education Centre ===== */}
      <section className={styles.seoSection}>
        <div className={styles.seoContainer}>
          <h2 className={styles.seoTitle}>
            Best Distance Education Centre in Kerala – Building Futures with Flexible Learning
          </h2>
          <div className={styles.seoGrid}>
            <div className={styles.seoImageWrapper}>
              <Image
                src="https://timseducation.com/wp-content/uploads/2025/11/A-beautiful-girl-student-smiling-holding-a-book-photography-_-Premium-AI-generated-image.webp"
                alt="Student smiling"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'contain' }}
                unoptimized={true}
              />
            </div>
            <div className={styles.seoContent}>
              <p>
                TIMS Education has grown by helping students and working professionals complete their studies without disturbing their daily routine. Over the years, many learners have trusted us because they feel comfortable learning at their own pace with the right guidance beside them. That&apos;s one of the reasons people often call us the <strong>best distance education centre in Kerala</strong>.
              </p>
              <p>
                We focus on simple admission procedures, clear support, and courses that genuinely help in building a career. We try to make the process as easy as possible for people who want to finish a degree they dropped years ago or get a better job by getting a higher level of education. Many who studied with us say they chose TIMS because it felt like the <strong>best distance education centre in Kerala</strong> for their needs.
              </p>
              <p>
                With experienced mentors and reliable university tie-ups, we continue to be the <strong>best distance education centre in Kerala</strong> for learners who want steady progress. If you&apos;re planning your next step, you&apos;ll understand why so many consider us the <strong>best distance education centre in Kerala</strong>.
              </p>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/services/attestation" className={styles.uniViewAllBtn}>
                  Embassy Attestation <ArrowRight size={18} />
                </Link>
                <Link href="/services/credit-transfer" className={styles.uniViewAllBtn} style={{ background: 'transparent', border: '2px solid #002060', color: '#002060' }}>
                  Credit Transfer <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
