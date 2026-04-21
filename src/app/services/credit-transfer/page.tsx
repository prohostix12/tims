'use client';

import React from 'react';
import styles from './credit-transfer.module.css';
import Link from 'next/link';

export default function CreditTransferPage() {
  const benefits = [
    { 
      title: "Prior Learning Recognition", 
      description: "We acknowledge the academic efforts you’ve put into your previous studies. Credit transfer ensures you don’t have to start from scratch.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      )
    },
    { 
      title: "Accelerating Your Progress", 
      description: "By transferring credits, you can accelerate your academic progress, completing your program faster and reaching your goals efficiently.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
      )
    },
    { 
      title: "Higher Degree Pursuits", 
      description: "Credit transfer makes pursuing master's or higher-level programs more feasible by providing a solid stepping stone for advancement.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
      )
    },
    { 
      title: "Cost-Efficient Education", 
      description: "Save significantly on tuition. You won’t need to pay for courses you’ve already studied, making your education more affordable.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
      )
    },
    { 
      title: "Tailored Academic Pathways", 
      description: "Strategically transfer credits to choose courses that align with your career aspirations, creating a personalized learning journey.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
      )
    }
  ];

  return (
    <main className={styles.container}>
      {/* ===== Hero Section ===== */}
      <section className={styles.heroHeader}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Credit Transfer Services</h1>
          <p className={styles.heroSubtitle}>Seamlessly Continue Your Academic Journey</p>
        </div>
      </section>

      {/* ===== Intro Section ===== */}
      <section className={styles.contentSection}>
        <div className={styles.serviceIntro}>
          <div className={styles.textCol}>
            <h2 className={styles.sectionTitle}>Unlocking the Potential of Credit Transfer</h2>
            <p className={styles.descriptionText}>
              Credit transfer allows you to make the most of your educational investments. At <span style={{ color: 'var(--accent)', fontWeight: 700 }}>TIMS Education</span>, we ensure that your previous academic achievements pave the way for your future success.
            </p>
            <p className={styles.descriptionText}>
              Whether you are bridging between institutions or moving toward international degree completion, our mapping services identify the most efficient pathway for your progression.
            </p>
          </div>

          <div className={styles.imageCol}>
             <img 
               src="/images/credit-transfer-hero.png" 
               alt="Global academic progression" 
               className={styles.focalImage}
             />
          </div>
        </div>

        {/* ===== Benefits Section ===== */}
        <div className={styles.processSection}>
           <div className={styles.processContainer}>
              <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '4rem' }}>
                Why It Matters
              </h2>
              <div className={styles.processGrid}>
                 {benefits.map((benefit, i) => (
                   <div key={i} className={styles.processCard}>
                     <div className={styles.stepIcon}>
                        {benefit.icon}
                     </div>
                     <h3>{benefit.title}</h3>
                     <p>{benefit.description}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* ===== Footer CTA ===== */}
      <section style={{ padding: '8rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, #00122e 0%, #001f3f 100%)', color: 'white' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to Take the Next Step?</h2>
        <p style={{ color: '#94a3b8', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto' }}>
          Schedule a consultation with our academic advisors to evaluate your credits today.
        </p>
        <Link href="/contact" style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '1rem 3rem', borderRadius: '50px', fontWeight: 700, fontSize: '1.1rem' }}>
          REQUEST EVALUATION
        </Link>
      </section>
    </main>
  );
}
