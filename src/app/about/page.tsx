
'use client';

import styles from './about.module.css';
import Link from 'next/link';
import Image from 'next/image';
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

export default function About() {
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
          <div className={styles.heroRight}>
            <div className={styles.heroImageWrap}>
              <img 
                src="/images/about-hero-bg-v2.png" 
                alt="TIMS Modern Campus" 
                className={styles.heroImage}
              />
              <div className={styles.heroGlow} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats Bento Grid ===== */}
      <section className={styles.statsContainer}>
        {[
          { number: "15,000+", label: "Success Stories", icon: <Users /> },
          { number: "13+", label: "University Partners", icon: <Globe /> },
          { number: "98%", label: "Employment Rate", icon: <Target /> },
          { number: "100%", label: "Degree Recognition", icon: <ShieldCheck /> },
        ].map((stat, idx) => (
          <div key={idx} className={styles.statCard}>
            <span className={styles.statNumber}>{stat.number}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
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
            <h2 className={styles.getKnowTitle}>Learning Anytime,<br />Anywhere for Success</h2>
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
            <Link href="/contact" className={styles.getKnowBtn}>
              Discover More
            </Link>
          </div>
        </div>
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
              This platform is designed to simplify the overwhelming process of choosing the right education path. We help students discover the best universities and courses tailored to their career goals.
            </p>
            <p className={styles.sectionDesc}>
              By providing comprehensive information and personalized guidance, we ensure that every student can identify which course is truly suitable for them, empowering them to make informed decisions for a brighter future.
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
              To provide affordable, flexible, and high-quality education to learners across all backgrounds. We aim to bridge the gap between aspiration and achievement by offering personalized academic guidance and robust university partnerships.
            </p>
          </div>
          <div className={styles.visionCard}>
            <div className={styles.cardIcon}><Eye size={32} /></div>
            <h3 className={styles.cardTitle}>Our Vision</h3>
            <p className={styles.cardText}>
              To become the most trusted and accessible distance education centre in India, empowering every learner to unlock their full academic and professional potential. We envision a future where quality education knows no boundaries.
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
          {[
            {
              name: "Adv. ShoukathAli Pootheri",
              role: "Founder & Director",
              img: "/images/Adv-ShoukathAli-pootheri.jpg",
              bio: "A visionary legal professional and educator, Adv. ShoukathAli Pootheri founded TIMS Education in 2009 with a bold mission to make higher education accessible to all."
            },
            {
              name: "Nabeel CM",
              role: "Managing Director",
              img: "/images/Nabeel-cm.jpg",
              bio: "Driving the strategic growth of TIMS Education, Nabeel CM brings exceptional leadership in institutional management and student success initiatives."
            },
            {
              name: "Mohamed Shameem",
              role: "CEO & Director",
              img: "/images/Mohamed-shameem.jpg",
              bio: "As CEO, Mohamed Shameem leads TIMS Education&apos;s expansion efforts, forging partnerships with renowned global universities."
            },
          ].map((director, idx) => (
            <div key={idx} className={styles.directorCard}>
              <div className={styles.directorAvatar}>
                <img src={director.img} alt={director.name} className={styles.directorImage} />
              </div>
              <h3 className={styles.directorName}>{director.name}</h3>
              <span className={styles.directorRole}>{director.role}</span>
              <p className={styles.directorBio}>{director.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Success Section ===== */}
      <section className={styles.successSection}>
        <div className={styles.successContent}>
          <div className={styles.successImageCol}>
            <img src="/images/trusted-partner.png" alt="Success" />
          </div>
          <div className={styles.successTextCol}>
            <h2 className={styles.sectionTitle}>Your Trusted Partner for Management Studies</h2>
            <p className={styles.sectionDesc}>
              TIMS Education was started with a simple idea — learning should not stop because of work, family, or time limits. We provide the support that actually helps, working closely with recognised universities so anyone can move forward with confidence.
            </p>
            <Link href="/contact" className={styles.ctaPrimary} style={{ width: 'fit-content' }}>
              Speak with an Advisor
            </Link>
          </div>
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
            {[
              { q: "What is TIMS Education?", a: "TIMS Education is a distance and online education centre in Kerala focused on providing flexible, accessible academic programs." },
              { q: "Are degrees recognized?", a: "Yes, we partner with UGC-recognized universities to ensure your degrees are valid for employment and higher studies." },
              { q: "Do you offer scholarships?", a: "Yes, we offer scholarships for financially disadvantaged and high-achieving students." }
            ].map((faq, i) => (
              <details key={i} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{faq.q}</summary>
                <div className={styles.faqAnswer}>{faq.a}</div>
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
