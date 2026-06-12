
'use client';

import styles from './about.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  GraduationCap,
  Globe,
  Users,
  Award,
  CheckCircle2,
  Target,
  Eye,
  Quote,
  ArrowRight,
  ShieldCheck,
  Zap,
  BookOpen
} from 'lucide-react';

const DEFAULT_DIRECTORS = [
  {
    name: "Adv. ShoukathAli Pootheri",
    role: "Founder & Director",
    image: "/images/Adv-ShoukathAli-pootheri.jpg",
    bio: "A visionary legal professional and educator, Adv. ShoukathAli Pootheri founded TIMS Education in 2009 with a bold mission to make higher education accessible to all."
  },
  {
    name: "Nabeel CM",
    role: "Managing Director",
    image: "/images/Nabeel-cm.jpg",
    bio: "Driving the strategic growth of TIMS Education, Nabeel CM brings exceptional leadership in institutional management and student success initiatives."
  },
  {
    name: "Mohamed Shameem",
    role: "CEO & Director",
    image: "/images/Mohamed-shameem.jpg",
    bio: "As CEO, Mohamed Shameem leads TIMS Education's expansion efforts, forging partnerships with renowned global universities."
  },
];

const DEFAULT_FAQS = [
  { question: "What is Find Your University?", answer: "Find Your University is a leading distance and online higher education platform that simplifies the university discovery process. We partner with over 90 UGC-approved universities to connect students with flexible, accessible, and high-quality academic programs that fit their career goals, eligibility, and budget." },
  { question: "Are degrees recognized?", answer: "Yes, we partner with UGC-recognized universities to ensure your degrees are valid for employment and higher studies." },
  { question: "Do you offer scholarships?", answer: "Yes, we offer scholarships for financially disadvantaged and high-achieving students." },
];

export default function About() {
  const [directors, setDirectors] = useState(DEFAULT_DIRECTORS);
  const [faqs, setFaqs] = useState(DEFAULT_FAQS);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/public/directors')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setDirectors(data); })
      .catch(() => {});

    fetch('/api/public/faqs')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setFaqs(data); })
      .catch(() => {});
  }, []);

  return (
    <main className={styles.container}>

      {/* ===== High-Authority Light Blue Hero ===== */}
      <section className={styles.heroWrapper}>
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <span className={styles.heroBadge}>
              <Award size={16} /> 15 Years of Academic Excellence
            </span>
            <h1 className={styles.heroTitle}>
              Architecting the <br />
              <span>Future Leaders</span> of Tomorrow
            </h1>
            <p className={styles.heroSub}>
              For over a decade, TIMS Education has been at the forefront of global academic excellence, bridging the gap between potential and world-class opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Stats Bento Grid ===== */}
      <section className={styles.statsContainer}>
        {[
          { number: "20,000+", label: "Happy Alumni", icon: <Users /> },
          { number: "100+", label: "Expert Mentors", icon: <GraduationCap /> },
          { number: "90+", label: "Partner Universities", icon: <Globe /> },
          { number: "18+", label: "Years Experience", icon: <Award /> },
        ].map((stat, idx) => (
          <div key={idx} className={styles.statCard}>
            <span className={styles.statNumber}>{stat.number}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* ===== Why This? Section ===== */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutTextCol}>
            <span className={styles.sectionBadge}>WHY THIS?</span>
            <h2 className={styles.sectionTitle}>
              Your Ultimate Guide to <span style={{ color: '#E8502A' }}>Academic Success</span>
            </h2>
            <p className={styles.sectionDesc}>
              Choosing a university is one of the most important decisions of your life — yet most students make it with incomplete information. Find Your University was built to change that. We aggregate verified data on 90+ UGC-approved universities and match you to the right programme in minutes.
            </p>
            <p className={styles.sectionDesc}>
              No sales pressure. No hidden fees. Just honest, personalised guidance so every student — whether in a metro city or a remote village — can make a confident, informed decision about their future.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Vision & Mission Bento Cards ===== */}
      <section className={styles.visionSection}>
        <div className={styles.visionGrid}>
          <div className={styles.visionCard}>
            <div className={styles.cardIcon}><Target size={32} /></div>
            <h3 className={styles.cardTitle}>Our Mission</h3>
            <p className={styles.cardText}>
              To simplify the university discovery process for every student in India. We connect learners with the right UGC-approved programme — based on their goals, eligibility, and budget — through intelligent matching, honest guidance, and zero cost to the student.
            </p>
          </div>
          <div className={styles.visionCard}>
            <div className={styles.cardIcon}><Eye size={32} /></div>
            <h3 className={styles.cardTitle}>Our Vision</h3>
            <p className={styles.cardText}>
              To become India's most trusted platform for higher education decisions — where every student, regardless of background or location, can find the perfect university and course with confidence, clarity, and complete transparency.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Meet Our Directors ===== */}
      <section className={styles.directorsSection}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className={styles.sectionBadge}>Our Leadership</span>
          <h2 className={styles.sectionTitle}>The Visionary <span style={{ color: '#ef233c' }}>Directors</span></h2>
        </div>
        <div className={styles.directorsGrid}>
          {directors.map((director: any, idx: number) => (
            <div key={idx} className={styles.directorCard}>
              <div className={styles.directorAvatar}>
                <img src={director.image || director.img} alt={director.name} className={styles.directorImage} />
              </div>
              <h3 className={styles.directorName}>{director.name}</h3>
              <span className={styles.directorRole}>{director.role}</span>
              <p className={styles.directorBio}>{director.bio}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ===== Testimonials Section ===== */}
      <section className={styles.testimonialsSection}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className={styles.sectionTitle}>Alumni <span style={{ color: '#ef233c' }}>Impact</span></h2>
        </div>
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {[
              { name: 'Aisha Raheem', role: 'MBA Graduate', text: 'TIMS transformed my career. The flexibility was world-class.' },
              { name: 'Rahul Nair', role: 'B.Tech Graduate', text: 'The credit transfer guidance was exceptional and seamless.' },
              { name: 'Priya Menon', role: 'BBA Graduate', text: 'I completed my degree while working full-time. Highly recommended!' },
              { name: 'Mohammed Ashik', role: 'NIOS Graduate', text: 'The coaching gave me the confidence I needed to succeed.' },
            ].concat([
              { name: 'Aisha Raheem', role: 'MBA Graduate', text: 'TIMS transformed my career. The flexibility was world-class.' },
              { name: 'Rahul Nair', role: 'B.Tech Graduate', text: 'The credit transfer guidance was exceptional and seamless.' },
            ]).map((t, i) => (
              <div key={i} className={styles.testimonialCard}>
                <Quote size={24} className={styles.quoteIcon} />
                <p className={styles.testimonialText}>"{t.text}"</p>
                <div>
                  <p className={styles.testimonialName}>{t.name}</p>
                  <p className={styles.testimonialRole}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ Section ===== */}
      <section className={styles.faqSection}>
        <div className={styles.faqWrapper}>
          <div className={styles.faqImageCol}>
            <img src="/images/faq-support.png" alt="FAQ" />
          </div>
          <div className={styles.faqAccordion}>
             <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            {faqs.map((faq: any, i: number) => (
              <details key={faq._id || i} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{faq.question || faq.q}</summary>
                <div className={styles.faqAnswer}>{faq.answer || faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to Define Your Future?</h2>
        <div className={styles.ctaButtons}>
          <Link href="/courses" className={styles.ctaPrimary}>Explore All Courses</Link>
          <Link href="/contact" className={styles.ctaOutline}>Contact Us Now</Link>
        </div>
      </section>

    </main>
  );
}
