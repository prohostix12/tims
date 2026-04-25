'use client';

import React from 'react';
import styles from './credit-transfer.module.css';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CreditTransferPage() {
  const benefits = [
    { 
      title: "Recognizing Your Prior Learning:", 
      description: "We acknowledge the academic efforts you've put into your previous studies. Credit transfer allows recognition of your prior learning, ensuring you don't have to start from scratch.",
      icon: (
        <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" /></svg>
      )
    },
    { 
      title: "Cost-Efficient Education:", 
      description: "Credit transfer can result in significant cost savings. You won't need to pay for courses you've already studied, making education more affordable and accessible.",
      icon: (
        <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" /></svg>
      )
    },
    { 
      title: "Accelerating Your Progress:", 
      description: "By transferring credits, you can accelerate your academic progress. This means completing your program faster and moving closer to your educational goals efficiently.",
      icon: (
        <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" /></svg>
      )
    },
    { 
      title: "Tailored Academic Pathways:", 
      description: "Transfer credits strategically to tailor your academic pathway. Choose courses that align with your interests and career aspirations, creating a personalized learning journey.",
      icon: (
        <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" /></svg>
      )
    }
  ];

  return (
    <main className={styles.container}>
      {/* ===== Standard Hero Section (Like Attestation Page) ===== */}
      <section className={styles.heroWrapper}>
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <nav className={styles.heroBreadcrumb}>
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="#">Services</Link>
              <span>/</span>
              <span>Credit Transfer</span>
            </nav>
            <h1 className={styles.heroTitle}>
              Fast-Track Your <br />
              <span className={styles.heroTitleAccent}>Credit Transfer</span>
            </h1>
            <p className={styles.heroDesc}>
              Leverage your previous academic accomplishments to accelerate your progress toward a degree with our professional credit evaluation and transfer services.
            </p>
            <div className={styles.heroActions}>
              <Link href="/contact" className={styles.heroPrimaryBtn}>
                Get Started
              </Link>
              <button className={styles.heroSecondaryBtn}>
                Credit Evaluation
              </button>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statNum}>Save up to</span>
                <span className={styles.statLabel}>2 Years of Study</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <span className={styles.statNum}>UGC/AIU</span>
                <span className={styles.statLabel}>Approved Programs</span>
              </div>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.heroImageCard}>
              <img
                src="/images/hero-credit-transfer.png"
                alt="Credit Transfer"
                className={styles.heroImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Potential of Credit Transfer Section ===== */}
      <section className={styles.potentialSection}>
        <div className={styles.potentialContainer}>
          <h2 className={styles.potentialTitle}>
            Credit Transfer Services: Seamlessly Continue Your Academic Journey <br />
            Unlocking the Potential of Credit Transfer
          </h2>
          <p className={styles.potentialIntro}>
            Credit transfer allows you to make the most of your educational investments. Here's why it matters:
          </p>

          <div className={styles.potentialGrid}>
            <div className={styles.potentialItem}>
              <div className={styles.potentialIcon}>
                <div className={styles.redCircle} />
              </div>
              <div className={styles.potentialText}>
                <h4>Recognizing Your Prior Learning:</h4>
                <p>We acknowledge the academic efforts you've put into your previous studies. Credit transfer allows recognition of your prior learning, ensuring you don't have to start from scratch.</p>
              </div>
            </div>

            <div className={styles.potentialItem}>
              <div className={styles.potentialIcon}>
                <div className={styles.redCircle} />
              </div>
              <div className={styles.potentialText}>
                <h4>Cost-Efficient Education:</h4>
                <p>Credit transfer can result in significant cost savings. You won't need to pay for courses you've already studied, making education more affordable and accessible.</p>
              </div>
            </div>

            <div className={styles.potentialItem}>
              <div className={styles.potentialIcon}>
                <div className={styles.redCircle} />
              </div>
              <div className={styles.potentialText}>
                <h4>Accelerating Your Progress:</h4>
                <p>By transferring credits, you can accelerate your academic progress. This means completing your program faster and moving closer to your educational goals efficiently.</p>
              </div>
            </div>

            <div className={styles.potentialItem}>
              <div className={styles.potentialIcon}>
                <div className={styles.redCircle} />
              </div>
              <div className={styles.potentialText}>
                <h4>Tailored Academic Pathways:</h4>
                <p>Transfer credits strategically to tailor your academic pathway. Choose courses that align with your interests and career aspirations, creating a personalized learning journey.</p>
              </div>
            </div>

            <div className={styles.potentialItem}>
              <div className={styles.potentialIcon}>
                <div className={styles.redCircle} />
              </div>
              <div className={styles.potentialText}>
                <h4>Enabling Higher Degree Pursuits:</h4>
                <p>Take your education to the next level by leveraging your existing credits for advanced degrees and specialized certifications across global universities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== How Our Credit Transfer Services Work (Deconstructed) ===== */}
      <section style={{ padding: '6rem 0', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5%' }}>
          <div className={styles.splitSection} style={{ background: 'transparent' }}>
            <div className={styles.imageSide} style={{ borderRadius: '24px' }}>
              <img 
                src="https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=2000" 
                alt="Student Success"
                style={{ borderRadius: '24px' }}
              />
            </div>
            <div className={styles.contentSide} style={{ padding: '0 0 0 4rem' }}>
              <span className={styles.sectionTag} style={{ fontSize: '0.75rem' }}>PROCEDURAL EXCELLENCE</span>
              <h2 style={{ fontSize: '2.2rem', color: '#00122e', fontWeight: 900, lineHeight: 1.2 }}>
                How Our Credit Transfer Services Work
              </h2>
              <p style={{ color: '#64748b', marginTop: '1rem', fontSize: '1rem', lineHeight: 1.7 }}>
                Our Credit Transfer Services follow a streamlined process to ensure maximum recognition of your prior learning.
              </p>

              <div className={styles.stepList} style={{ marginTop: '2.5rem' }}>
                <div className={styles.stepItem}>
                  <h4>1. Credit Evaluation:</h4>
                  <ul>
                    <li>Submit your academic transcripts and relevant documents for evaluation.</li>
                    <li>Our expert team will review your credits and determine the transferable courses.</li>
                  </ul>
                </div>

                <div className={styles.stepItem}>
                  <h4>2. Credit Approval and Mapping:</h4>
                  <ul>
                    <li>Once evaluated, we'll approve the transferable credits and map them to equivalent courses in your chosen program.</li>
                  </ul>
                </div>

                <div className={styles.stepItem}>
                  <h4>3. Customized Academic Plan:</h4>
                  <ul>
                    <li>Receive a customized academic plan detailing the courses you need to complete to fulfill the program requirements.</li>
                  </ul>
                </div>

                <div className={styles.stepItem}>
                  <h4>4. Seamless Integration:</h4>
                  <ul>
                    <li>Your approved credits seamlessly integrate into your academic journey, allowing you to progress efficiently.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== Partner with TIMS Section ===== */}
      <section className={styles.partnerSection}>
        <div className={styles.partnerContainer}>
          <div className={styles.partnerContentCentered}>
            <h2 className={styles.partnerTitle}>Partner with TIMS Education for a Smooth Transition</h2>
            <p className={styles.partnerParagraph}>
              At TIMS Education, we’re committed to making your academic journey as seamless as possible. Our <strong>Credit Transfer Services</strong> are tailored to ensure that your prior learning is recognized and contributes to your current educational pursuits.
            </p>
            <p className={styles.partnerParagraph}>
              Explore our Credit Transfer Services and make the most of your academic achievements. Your progress matters, and we’re here to support your educational aspirations! We work closely with leading institutions to ensure your credits are mapped accurately and recognized globally.
            </p>
            <div style={{ marginTop: '2.5rem' }}>
              <Link 
                href="https://www.glocaluniversity.edu.in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.heroPrimaryBtn}
              >
                GLOCAL UNIVERSITY <ArrowRight size={20} style={{ marginLeft: '10px' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
