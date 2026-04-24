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
      {/* ===== Cinematic Split Hero Section ===== */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContentGrid}>
          <div className={styles.heroTextContent}>
            <div className={styles.heroBreadcrumb}>
              <Link href="/">Home</Link> <span>/</span> <Link href="#">Services</Link> <span>/</span> Credit Transfer
            </div>
            <div className={styles.heroTagline}>
              <span className={styles.tagLine}>Fast-Track Your Graduation</span>
            </div>
            <h1 className={styles.heroMainTitle}>
              Credit Transfer & <br />
              <span className={styles.accentText}>Academic Mobility</span>
            </h1>
            <p className={styles.heroDescription}>
              Leverage your previous academic accomplishments and accelerate your progress toward a globally recognized degree with our professional credit evaluation services.
            </p>
            <div className={styles.heroActionGroup}>
              <Link href="/contact" className={styles.heroPrimaryBtn}>
                Start Your Transfer
              </Link>
              <button className={styles.heroSecondaryBtn}>
                Credit Evaluation
              </button>
            </div>
            <div className={styles.heroTrustInfo}>
              <div className={styles.trustItem}>
                <span className={styles.trustNum}>Save up to</span>
                <span className={styles.trustLab}>2 Years of Study</span>
              </div>
              <div className={styles.trustDivider} />
              <div className={styles.trustItem}>
                <span className={styles.trustNum}>UGC/AIU</span>
                <span className={styles.trustLab}>Approved Programs</span>
              </div>
            </div>
          </div>
          <div className={styles.heroVisualContent}>
            <div className={styles.visualCard}>
              <img
                src="/images/hero-credit-transfer.png"
                alt="Credit Transfer Student"
                className={styles.visualImg}
              />
              <div className={styles.visualOverlay}>
                <div className={styles.overlayBadge}>Academic Recognition</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Institutional Header Section with Background ===== */}
      <section style={{ 
        padding: '6rem 0 0', 
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url("https://images.unsplash.com/photo-1523050335102-c325091d53fb?q=80&w=2000&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5%', textAlign: 'left' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#00122e', fontWeight: 900, marginBottom: '0.5rem', lineHeight: 1.1 }}>
            Strategic Credit Transfer for Global Academic Mobility
          </h2>
          <p className={styles.descriptionText} style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.8, maxWidth: '850px' }}>
            Leverage your previous academic accomplishments to accelerate your progress toward a degree with our professional credit evaluation and transfer services.
          </p>
        </div>
      </section>

      {/* ===== The Journey Section (Aligned & Tightened) ===== */}
      <section style={{ padding: '4rem 0 2rem', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5%' }}>
          <div className={styles.journeyGrid}>
            {benefits.map((benefit, i) => (
              <div 
                key={i} 
                className={styles.journeyCard}
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <span className={styles.cardNum}>0{i + 1}</span>
                <div className={styles.iconBox}>
                   <svg viewBox="0 0 100 100" fill="var(--accent)"><circle cx="50" cy="50" r="40" /></svg>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginTop: '1rem' }}>{benefit.title.replace(':', '')}</h3>
                <p style={{ fontSize: '0.9rem' }}>{benefit.description}</p>
              </div>
            ))}
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
      {/* ===== Institutional Closing Section (Aligned) ===== */}
      <section style={{ padding: '6rem 0 10rem', backgroundColor: '#ffffff', color: '#00122e' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5%', textAlign: 'left' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Partner with TIMS Education <br/> for a Smooth Transition
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '900px' }}>
            At TIMS Education, we’re committed to making your academic journey as seamless as possible. Our Credit Transfer Services are tailored to ensure that your prior learning is recognized and contributes to your current educational pursuits.
          </p>
          <p style={{ fontSize: '1.2rem', color: '#00122e', fontWeight: 600, lineHeight: 1.8, maxWidth: '900px' }}>
            Explore our Credit Transfer Services and make the most of your academic achievements. Your progress matters, and we’re here to support your educational aspirations!
          </p>
          <div style={{ marginTop: '3rem' }}>
             <Link 
               href="https://www.glocaluniversity.edu.in/" 
               target="_blank" 
               rel="noopener noreferrer" 
               className={styles.primaryBtn}
             >
               GLOCAL UNIVERSITY <ArrowRight size={20} style={{ marginLeft: '10px' }} />
             </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
