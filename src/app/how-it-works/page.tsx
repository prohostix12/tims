'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  CheckCircle, 
  Target, 
  Sparkles, 
  ShieldCheck, 
  UserPlus,
  ArrowLeft
} from 'lucide-react';
import styles from './how-it-works.module.css';

export default function HowItWorksPage() {
  const openCourseFinder = () => window.dispatchEvent(new CustomEvent('open-course-finder'));

  return (
    <div className={styles.container}>

      {/* ===== Hero ===== */}
      <section className={styles.hero}>
        <span className={styles.heroTag}>The Process</span>
        <h1 className={styles.heroTitle}>Your Journey to the <br />Perfect Course</h1>
        <p className={styles.heroDesc}>
          Discover how our intelligent Course Finder algorithm matches your profile with 
          the best universities in India and abroad.
        </p>
      </section>

      {/* ===== Steps ===== */}
      <section className={styles.stepsSection}>
        
        {/* Step 1 */}
        <div className={styles.stepRow}>
          <div className={styles.stepImage}>
            <Image 
              src="/images/how-it-works/step1.png" 
              alt="Registration step"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.stepContent}>
            <span className={styles.stepNum}>Step 01</span>
            <h2 className={styles.stepTitle}>Tell Us Who You Are</h2>
            <p className={styles.stepDesc}>
              Begin your journey by sharing basic details. This helps us personalize the entire 
              experience and ensure our recommendations align with your identity.
            </p>
            <ul className={styles.stepDetailList}>
              <li className={styles.stepDetailItem}>
                <UserPlus size={20} className={styles.checkCircle} />
                <span>Quick Name & Contact verification</span>
              </li>
              <li className={styles.stepDetailItem}>
                <ShieldCheck size={20} className={styles.checkCircle} />
                <span>Secure and private lead handling</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step 2 */}
        <div className={styles.stepRow}>
          <div className={styles.stepImage}>
            <Image 
              src="/images/how-it-works/step2.png" 
              alt="Smart Quiz"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.stepContent}>
            <span className={styles.stepNum}>Step 02</span>
            <h2 className={styles.stepTitle}>The 10-Step Smart Quiz</h2>
            <p className={styles.stepDesc}>
              Our comprehensive quiz covers every aspect of your academic needs. We don&apos;t just 
              ask what you want to study—we ask how, where, and why.
            </p>
            <ul className={styles.stepDetailList}>
              <li className={styles.stepDetailItem}>
                <CheckCircle size={20} className={styles.checkCircle} />
                <span>Qualification & Current Status analysis</span>
              </li>
              <li className={styles.stepDetailItem}>
                <CheckCircle size={20} className={styles.checkCircle} />
                <span>Preferred Study Mode (Online, Distance, Campus)</span>
              </li>
              <li className={styles.stepDetailItem}>
                <CheckCircle size={20} className={styles.checkCircle} />
                <span>Budget & Duration preferences</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step 3 */}
        <div className={styles.stepRow}>
          <div className={styles.stepImage}>
            <Image 
              src="/images/how-it-works/step3.png" 
              alt="Matching Algorithm"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.stepContent}>
            <span className={styles.stepNum}>Step 03</span>
            <h2 className={styles.stepTitle}>Algorithmic Precision</h2>
            <p className={styles.stepDesc}>
              Our matching engine processes your data against 50+ UGC-approved universities 
              and 500+ specialized courses.
            </p>
            <ul className={styles.stepDetailList}>
              <li className={styles.stepDetailItem}>
                <Sparkles size={20} className={styles.checkCircle} />
                <span>Keyword-based interest scoring</span>
              </li>
              <li className={styles.stepDetailItem}>
                <Sparkles size={20} className={styles.checkCircle} />
                <span>Real-time fee and budget alignment</span>
              </li>
              <li className={styles.stepDetailItem}>
                <Sparkles size={20} className={styles.checkCircle} />
                <span>UGC & NAAC accreditation filtering</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step 4 */}
        <div className={styles.stepRow}>
          <div className={styles.stepImage}>
            <Image 
              src="/images/how-it-works/step4.png" 
              alt="Final Results"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.stepContent}>
            <span className={styles.stepNum}>Step 04</span>
            <h2 className={styles.stepTitle}>Your Curated Matches</h2>
            <p className={styles.stepDesc}>
              Finally, we present you with the top 6 courses that perfectly match your profile. 
              No clutter, just the best paths for your success.
            </p>
            <ul className={styles.stepDetailList}>
              <li className={styles.stepDetailItem}>
                <Target size={20} className={styles.checkCircle} />
                <span>Top 6 high-relevance recommendations</span>
              </li>
              <li className={styles.stepDetailItem}>
                <Target size={20} className={styles.checkCircle} />
                <span>Detailed course and university insights</span>
              </li>
              <li className={styles.stepDetailItem}>
                <Target size={20} className={styles.checkCircle} />
                <span>Instant link to expert counselors</span>
              </li>
            </ul>
          </div>
        </div>

      </section>

      {/* ===== Final CTA ===== */}
      <section className={styles.finalCta}>
        <h2 className={styles.finalCtaTitle}>Ready to Find Your Path?</h2>
        <p className={styles.finalCtaDesc}>
          Join thousands of students who found their ideal career through TIMS Education.
        </p>
        <button className={styles.ctaBtn} onClick={openCourseFinder}>
          Start Course Finder <ArrowRight size={20} />
        </button>
        <div style={{ marginTop: '2rem' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </section>

    </div>
  );
}
