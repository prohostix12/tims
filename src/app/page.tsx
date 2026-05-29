
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
  CheckCircle,
  Headphones,
  CreditCard,
  Play,
  Phone,
  Target,
  Sparkles,
  UserPlus,
} from 'lucide-react';
import OnlineCoursesSection from '@/components/OnlineCoursesSection';

const NEWS_PLACEHOLDER = '/images/news-hero-bg.png';
const UNI_PLACEHOLDER = '/images/university-success.png';

interface NewsItem {
  _id: string;
  title: string;
  excerpt: string;
  image?: string;
  category?: string;
  publishedAt: string;
  status: string;
}

interface University {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  logo?: string;
  status: string;
}

const DEFAULT_TESTIMONIALS = [
  { name: 'Aisha Raheem', role: 'MBA Graduate, Dubai', avatar: 'A', rating: 5, text: 'TIMS transformed my career. The distance MBA program was incredibly flexible and the faculty support was world-class. I went from a junior executive to a regional manager within a year of graduating.' },
  { name: 'Rahul Nair', role: 'B.Tech Graduate, Bangalore', avatar: 'R', rating: 5, text: "The credit transfer guidance from TIMS was exceptional. They helped me transition my Indian engineering degree to a Canadian university seamlessly. Couldn't have done it without their team." },
  { name: 'Priya Menon', role: 'BBA Graduate, Kochi', avatar: 'P', rating: 5, text: 'I completed my BBA through distance learning while working full-time. TIMS made it possible with their structured study materials and responsive support. Highly recommended for working professionals.' },
  { name: 'Mohammed Ashik', role: 'NIOS Graduate, Thrissur', avatar: 'M', rating: 5, text: 'I had failed my board exams twice. TIMS guided me through the NIOS pathway and I passed with distinction. Their coaching and mock tests gave me the confidence I needed to succeed.' },
  { name: 'Sreeja Thomas', role: 'MCA Graduate, Trivandrum', avatar: 'S', rating: 5, text: 'The attestation services at TIMS are outstanding. They handled all my documents for UAE employment, from state authentication to Embassy legalisation, within 7 days as promised.' },
  { name: 'Arjun Pillai', role: 'MBA Graduate, Abu Dhabi', avatar: 'A', rating: 5, text: 'TIMS opened doors I never knew existed. Their international university partnerships gave me access to a globally recognised MBA that is respected by employers across the Gulf.' },
  { name: 'Fatima Al Rashid', role: 'B.Com Graduate, Calicut', avatar: 'F', rating: 5, text: 'I chose TIMS for their reputation and was not disappointed. The admission counsellors were honest, helpful and guided me to the right program without pushing unnecessary courses.' },
  { name: 'Vineeth Kumar', role: 'Diploma in Data Science', avatar: 'V', rating: 5, text: 'The Data Science diploma from TIMS gave me practical skills that I applied immediately at my workplace. The curriculum is modern, relevant and delivered by industry experts.' },
];

const DEFAULT_IMPACT_CARDS = [
  { num: '50K', label: 'Learners' },
  { num: '20K', label: 'Alumnees' },
  { num: '50', label: 'Universities' },
  { num: '100', label: 'Mentors' },
];

const DEFAULT_STATS_BAR = [
  { num: '20,000+', label: 'Happy Alumni' },
  { num: '100+', label: 'Expert Mentors' },
  { num: '90+', label: 'Partner Universities' },
  { num: '18+', label: 'Years Experience' },
];

const DEFAULT_PROCESS_STEPS = [
  { step: '01', title: 'Understand Your Goals', desc: 'We start by understanding your background, budget, and career aspirations through a free consultation.' },
  { step: '02', title: 'Suggest the Right Program', desc: 'Our mentors match you with the best UGC-approved university and program that fits your profile.' },
  { step: '03', title: 'Hassle-Free Admission', desc: 'We guide you through the entire admission process — forms, documents, and fee payments.' },
  { step: '04', title: 'Ongoing Support', desc: 'After joining, we provide study materials, exam guidance, and career counselling throughout your course.' },
];

const TYPING_WORDS = ['University', 'Online University', 'Programmes', 'Courses', 'Credit Transfer'];

const DEFAULT_MARQUEE = ['BA', 'B.Com', 'BBA', 'MBA', 'BCA', 'MCA', 'B.Sc', 'M.Sc', 'B.Tech', 'M.Tech', 'LLB', 'PGDM', 'M.Com'];

export default function Home() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<{name:string;role:string;avatar:string;rating:number;text:string}[]>(DEFAULT_TESTIMONIALS);
  const [marqueeItems, setMarqueeItems] = useState<string[]>(DEFAULT_MARQUEE);
  const [impactCards, setImpactCards] = useState<{num:string;label:string}[]>(DEFAULT_IMPACT_CARDS);
  const [statsBar, setStatsBar] = useState<{num:string;label:string}[]>(DEFAULT_STATS_BAR);
  const [processSteps, setProcessSteps] = useState<{step:string;title:string;desc:string}[]>(DEFAULT_PROCESS_STEPS);
  const [loading, setLoading] = useState(true);
  const [activeImpactIdx, setActiveImpactIdx] = useState(0);
  const [mustKnowIdx, setMustKnowIdx] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showFloating, setShowFloating] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const router = useRouter();

  const MUST_KNOW_SLIDES = [
    'Are you confused about the best University?',
    'Doubt about the value of the certificate?',
    'Looking for the best university and less fees?',
    'Going Abroad? Which university is right for you?',
    'Which is the best Online & Distance university?',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImpactIdx((prev) => (prev + 1) % impactCards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [impactCards.length]);

  // Typewriter cycle: type → pause → backspace → next word
  useEffect(() => {
    const current = TYPING_WORDS[wordIdx];

    if (!isDeleting && displayText.length < current.length) {
      // Still typing forward
      const t = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 110);
      return () => clearTimeout(t);
    }

    if (!isDeleting && displayText.length === current.length) {
      // Fully typed — pause 1.8 s then start deleting
      const t = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(t);
    }

    if (isDeleting && displayText.length > 0) {
      // Backspace one letter at a time (faster)
      const t = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 65);
      return () => clearTimeout(t);
    }

    if (isDeleting && displayText.length === 0) {
      // Fully deleted — brief pause then move to next word
      const t = setTimeout(() => {
        setIsDeleting(false);
        setWordIdx((prev) => (prev + 1) % TYPING_WORDS.length);
      }, 350);
      return () => clearTimeout(t);
    }
  }, [displayText, isDeleting, wordIdx]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMustKnowIdx((prev) => (prev + 1) % MUST_KNOW_SLIDES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Fetching initial data...');

        // Helper to fetch with a small timeout/retry or better error reporting
        const safeFetch = async (url: string) => {
          try {
            const res = await fetch(url, { cache: 'no-store' });
            if (!res.ok) {
              console.error(`API Error for ${url}:`, res.status, res.statusText);
              return null;
            }
            return await res.json();
          } catch (err) {
            console.error(`Network Error for ${url}:`, err);
            return null;
          }
        };

        const [uniData, newsData, blogData, marqueeData, testimonialData, siteStatsData, howItWorksData] = await Promise.all([
          safeFetch('/api/admin/universities'),
          safeFetch('/api/admin/news'),
          safeFetch('/api/admin/blogs'),
          safeFetch('/api/public/marquee'),
          safeFetch('/api/public/testimonials'),
          safeFetch('/api/admin/site-stats'),
          safeFetch('/api/admin/how-it-works'),
        ]);

        if (Array.isArray(uniData)) {
          setUniversities(uniData.filter((u) => !u.status || u.status.toLowerCase() === 'active').slice(0, 6));
        }
        if (Array.isArray(newsData)) {
          setNewsItems(newsData.filter((n) => !n.status || n.status.toLowerCase() === 'published').slice(0, 6));
        }
        if (Array.isArray(blogData)) {
          setBlogs(blogData.filter((b) => !b.status || b.status.toLowerCase() === 'published').slice(0, 4));
        }
        if (Array.isArray(marqueeData) && marqueeData.length > 0) {
          setMarqueeItems(marqueeData.map((m: any) => m.text));
        }
        if (Array.isArray(testimonialData) && testimonialData.length > 0) {
          setTestimonials(testimonialData);
        }
        if (Array.isArray(siteStatsData) && siteStatsData.length > 0) {
          const active = siteStatsData.filter((s: any) => s.status === 'active');
          if (active.length > 0) {
            setImpactCards(active.map((s: any) => ({ num: s.number, label: s.label })));
            setStatsBar(active.map((s: any) => ({ num: s.number, label: s.label })));
          }
        }
        if (Array.isArray(howItWorksData) && howItWorksData.length > 0) {
          const active = howItWorksData.filter((s: any) => s.status === 'active');
          if (active.length > 0) {
            setProcessSteps(active.map((s: any, i: number) => ({
              step: String(s.stepNumber).padStart(2, '0'),
              title: s.title,
              desc: s.description,
            })));
          }
        }
      } catch (error) {
        console.error('Fatal error in fetchData:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowFloating(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openCourseFinder = () => window.dispatchEvent(new CustomEvent('open-course-finder'));
  const openRegisterModal = () => window.dispatchEvent(new CustomEvent('open-register-modal'));

  return (
    <main className={styles.page}>

      {/* ===== HERO WRAPPER — locks hero + impact to 100dvh ===== */}
      <div className={styles.heroWrapper}>

        {/* ===== HERO — Dark 3-column Educore layout ===== */}
        <section className={styles.hero}>

          {/* Left panel */}
          <div className={styles.heroLeft}>
            <div className={styles.heroIconCircle}>
              <BookOpen size={26} />
            </div>
            <Image
              src="/images/Untitled-46777.png"
              alt="Logo"
              width={150}
              height={50}
              style={{ objectFit: 'contain', maxWidth: '100%' }}
              priority
            />
            <div className={styles.heroStack}>
              <span style={{ fontSize: '0.85rem' }}>India&apos;s No.1</span>
              <span style={{ fontSize: '0.85rem' }}>Course finding</span>
              <span style={{ fontSize: '0.85rem' }}>platform</span>
            </div>
            <Link href="/scholarship-program" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: '#fff',
              color: '#E8502A',
              border: 'none',
              padding: '0.5rem 1.1rem',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '0.82rem',
              textDecoration: 'none',
              boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
              whiteSpace: 'nowrap',
            }}>
              🎓 Scholarship Program <ArrowRight size={13} />
            </Link>
            <div className={styles.heroLeftOrangeBar} />
          </div>

          {/* Center — student image */}
          <div className={styles.heroCenter}>
            <img
              src="/images/hero-girl-new.png"
              alt="Student ready for success"
              className={styles.heroImg}
            />
          </div>

          {/* Right panel — headline + CTAs */}
          <div className={styles.heroRight}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroAccentTop}>Find Your Best</span>
              <span className={styles.heroUniversityWrap}>
                <span className={styles.heroAccent}>
                  {displayText}
                  <span className={styles.typeCursor}>|</span>
                  <span className={styles.letterSpacer} aria-hidden="true">
                    {TYPING_WORDS[wordIdx].slice(displayText.length)}
                  </span>
                </span>
              </span>
            </h1>
            <div className={styles.heroBtns}>
              <button className={styles.heroBtnPrimary} onClick={openRegisterModal}>
                Register Now
              </button>
              <button className={styles.heroBtnFinder} onClick={openCourseFinder}>
                Course Finder <ArrowRight size={16} />
              </button>
            </div>
            <div className={styles.heroMarqueeWrapper}>
              <div className={styles.heroMarqueeTrack}>
                {[...Array(4)].map((_, i) => (
                  <React.Fragment key={i}>
                    {marqueeItems.map((name, j) => (
                      <Link key={j} href="/courses" className={styles.heroMarqueeItem}>{name}</Link>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== IMPACT — bottom row of hero fold ===== */}
        <section className={styles.impact}>

          {/* Left — orange panel */}
          <div className={styles.impactLeft}>
            <div className={styles.impactTopRow}>
              <div className={styles.impactBadge}>Our Impact</div>
              <div className={styles.impactDots}>
                 {impactCards.map((_, i) => (
                   <span key={i} className={i === activeImpactIdx ? styles.dotWhite : styles.dotGrey}></span>
                 ))}
              </div>
            </div>
            <hr className={styles.impactDivider} />
            
            <div key={activeImpactIdx} className={styles.impactCardContent}>
              <div className={styles.impactMiddleRow}>
                <div className={styles.impactStatBlock}>
                  <p className={styles.impactNum}>{impactCards[activeImpactIdx]?.num}</p>
                  <div className={styles.impactTextStack}>
                    <span className={styles.impactPlus}>+</span>
                    <p className={styles.impactLabel}>{impactCards[activeImpactIdx]?.label}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center — cream panel */}
          <div className={styles.impactCenter}>
            <div className={styles.impactCenterLeft}>
              <h2 className={styles.impactTitle}>
                Ready To Find<br />Your University?
              </h2>
              <button className={styles.impactCTA} onClick={openCourseFinder}>
                Suggest Me a University
              </button>
            </div>
            <div className={styles.impactCenterRight}>
              <p className={styles.impactStep}>/ Step 1</p>
              <p className={styles.impactDesc}>
                Access our expert guidance to unlock your potential and build a solid
                foundation for sustainable, long-term growth starting today.
              </p>
            </div>
          </div>

          {/* Right — dark panel */}
          <div className={styles.impactRight}>
              <div className={styles.impactPlayBtn}>
                <Play size={18} fill="currentColor" style={{ marginLeft: '3px' }} />
              </div>
            <p className={styles.impactExpertText}>
              Perfect your learning with expert faculties
            </p>
            <Link href="/about" className={styles.impactViewMore}>
              View Demo <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </div>

      {/* ===== ONLINE COURSES ===== */}
      <OnlineCoursesSection />

      {/* ===== STATS BAR ===== */}
      <section className={styles.statsBar}>
        {statsBar.map((s, i) => (
          <div key={i} className={styles.statsItem}>
            <span className={styles.statsNum}>{s.num}</span>
            <span className={styles.statsLabel}>{s.label}</span>
          </div>
        ))}
      </section>

      {/* ===== CAREER GUIDANCE ===== */}
      <section className={styles.careerWrapper}>
        <div className={styles.careerLeft}>
          <h2 className={styles.careerLeftTitle}>Top Career Opportunities</h2>
          <div className={styles.careerSmallGrid}>
            {[
              { degree: 'After MBA', href: '/courses/mba' },
              { degree: 'After MCA', href: '/courses/mca' },
              { degree: 'After M.Com', href: '/courses/mcom' },
              { degree: 'After BBA', href: '/courses/bba' },
              { degree: 'After BCA', href: '/courses/bca' },
              { degree: 'After B.Com', href: '/courses/bcom' },
              { degree: 'After SSLC/Plus Two', href: '/courses/sslc-plus-two' },
              { degree: 'After BA', href: '/courses/ba' },
              { degree: 'After B.Tech/M.Tech', href: '/courses/engineering' },
            ].map((item, i) => (
              <div key={i} className={styles.careerSmallCard}>
                <h3 className={styles.careerSmallDegree}>{item.degree}</h3>
                <Link href={item.href} className={styles.careerSmallBtn}>
                  Know More
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.careerRight}>
          <div className={styles.careerFeatured}>
            <div className={styles.careerBadge}>MUST KNOW BEFORE CHOOSE</div>
            <div className={styles.mustKnowSlider}>
              {MUST_KNOW_SLIDES.map((slide, i) => (
                <h2
                  key={i}
                  className={`${styles.careerMainTitle} ${i === mustKnowIdx ? styles.mustKnowActive : styles.mustKnowHidden}`}
                >
                  {slide}
                </h2>
              ))}
            </div>
            <div className={styles.mustKnowDots}>
              {MUST_KNOW_SLIDES.map((_, i) => (
                <span
                  key={i}
                  className={`${styles.mustKnowDot} ${i === mustKnowIdx ? styles.mustKnowDotActive : ''}`}
                />
              ))}
            </div>
            <button className={styles.careerSuggestBtn} onClick={openCourseFinder}>
              Suggest me a University
            </button>
          </div>
        </div>
      </section>

      {/* ===== WHAT WE DO ===== */}
      <section className={styles.processSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Our Process</span>
          <h2 className={styles.sectionTitle}>What We Do For You</h2>
          <p className={styles.sectionSub}>
            End-to-end support — from choosing the right university to completing your admission successfully.
          </p>
        </div>
        <div className={styles.processGrid}>
          {processSteps.map((item, i) => (
            <div key={i} className={styles.processCard}>
              <div className={styles.processStep}>{item.step}</div>
              <h3 className={styles.processTitle}>{item.title}</h3>
              <p className={styles.processDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button className={styles.redBtn} onClick={openCourseFinder}>
            Get Free Guidance <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ===== CONSULTATION CTA ===== */}
      <section className={styles.consultSection}>
        <div className={styles.consultInner}>
          <div>
            <h2 className={styles.consultTitle}>Need Help Choosing the Right Course?</h2>
            <p className={styles.consultText}>Talk to our experts and get personalised guidance — completely free.</p>
          </div>
          <div className={styles.consultBtns}>
            <a href="tel:+9189435555592" className={styles.consultPhone}>
              <Phone size={20} />
              +91 89435555592
            </a>
            <Link href="/contact" className={styles.consultContact}>
              Get Free Guidance <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>
            Success Stories
          </span>
          <h2 className={styles.sectionTitle}>What Our Students Say</h2>
          <p className={styles.sectionSub}>
            Join thousands of successful alumni who have transformed their careers through TIMS.
          </p>
        </div>
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {[...testimonials, ...testimonials.slice(0, 4)].map((t, i) => (
              <div key={i} className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>{'★'.repeat(t.rating)}</div>
                <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>{t.avatar}</div>
                  <div>
                    <h4 className={styles.testimonialName}>{t.name}</h4>
                    <p className={styles.testimonialRole}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== READY CTA ===== */}
      <section className={styles.readySection}>
        <div className={styles.readyInner}>
          <p className={styles.readyTag}>learn.grow.succeed.</p>
          <h2 className={styles.readyTitle}>Ready to Start Your Journey?</h2>
          <p className={styles.readySub}>
            Join thousands of successful alumni who have transformed their careers through TIMS.
          </p>
          <div className={styles.readyBtns}>
            <button className={styles.heroBtnPrimary} onClick={openCourseFinder}>
              Explore Programs <ArrowRight size={16} />
            </button>
            <Link href="/contact" className={styles.heroBtnOutline}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS — interactive accordion ===== */}
      <section id="how-it-works" className={styles.howItWorksSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>The Process</span>
          <h2 className={styles.sectionTitle}>Your Journey to the Perfect Course</h2>
          <p className={styles.sectionSub}>
            Discover how our intelligent Course Finder algorithm matches your profile
            with the best universities in India and abroad.
          </p>
        </div>

        <div className={styles.howItWorksGrid}>
          {/* Left — step accordion */}
          <div className={styles.stepSelectors}>
            {[
              {
                id: 1,
                title: 'Identity & Interest',
                icon: <UserPlus size={22} />,
                desc: 'Tell us who you are. We verify your basic details to personalise every recommendation from the start.',
                bullets: ['Quick Name & Contact entry', 'Secure and private lead handling'],
              },
              {
                id: 2,
                title: 'Smart 10-Step Quiz',
                icon: <BookOpen size={22} />,
                desc: 'Answer 10 targeted questions covering your qualification, preferred study mode, field of interest, budget, and career goals.',
                bullets: ['Qualification & Status analysis', 'Study Mode, Field & Budget preferences'],
              },
              {
                id: 3,
                title: 'Algorithmic Matching',
                icon: <Sparkles size={22} />,
                desc: 'Our engine scores every program across 50+ UGC-approved universities in real-time against your answers.',
                bullets: ['Keyword-based interest scoring', 'Real-time fee & accreditation filtering'],
              },
              {
                id: 4,
                title: 'Curated Results',
                icon: <Target size={22} />,
                desc: 'We present your personalised course matches ranked by relevance. No clutter — just the best paths for your success.',
                bullets: ['Personalised course recommendations', 'Instant link to expert counselors'],
              },
            ].map((s) => (
              <div
                key={s.id}
                className={`${styles.stepSelectorItem} ${activeStep === s.id ? styles.stepActive : ''}`}
                onClick={() => setActiveStep(s.id)}
              >
                <div className={styles.stepSelectorHeader}>
                  <div className={styles.stepIconBox}>{s.icon}</div>
                  <div className={styles.stepHeaderText}>
                    <span className={styles.stepMiniTag}>Step 0{s.id}</span>
                    <h3 className={styles.stepTitleLabel}>{s.title}</h3>
                  </div>
                  <div className={`${styles.stepChevron} ${activeStep === s.id ? styles.stepChevronOpen : ''}`}>
                    <ArrowRight size={16} />
                  </div>
                </div>
                <div className={`${styles.stepRevealContent} ${activeStep === s.id ? styles.stepRevealOpen : ''}`}>
                  <p className={styles.stepRevealDesc}>{s.desc}</p>
                  <ul className={styles.stepBulletList}>
                    {s.bullets.map((b, bi) => (
                      <li key={bi}><CheckCircle size={14} /><span>{b}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Right — image panel */}
          <div className={styles.howItWorksDisplay}>
            <div className={styles.displayFrame}>
              {[1, 2, 3, 4].map((id) => (
                <div
                  key={id}
                  className={`${styles.displayImage} ${activeStep === id ? styles.displayActive : ''}`}
                >
                  <Image
                    src={`/images/how-it-works/step${id}.png`}
                    alt={`Step ${id} visual`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <button className={styles.redBtn} onClick={openCourseFinder}>
            Start Course Finder Now <ArrowRight size={18} />
          </button>
        </div>
      </section>


      <button
        className={`${styles.floatingFinderBtn}${showFloating ? ` ${styles.floatingFinderBtnVisible}` : ''}`}
        onClick={openCourseFinder}
      >
        Course Finder <ArrowRight size={20} />
      </button>
    </main>
  );
}
