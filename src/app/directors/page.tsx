
'use client';

import React from 'react';
import styles from './directors.module.css';
import Link from 'next/link';

export default function DirectorsPage() {
  const directors = [
    {
      name: "Adv. K.P. Majeed",
      role: "Managing Director",
      avatar: "https://i.pravatar.cc/300?u=majeed",
      description: "Leading the administrative and strategic growth of TIMS with over two decades of educational leadership."
    },
    {
      name: "Prof. P. Mohamed",
      role: "Academic Director",
      avatar: "https://i.pravatar.cc/300?u=mohamed",
      description: "Ensuring academic excellence and maintaining high standards in distance education programs."
    },
    {
      name: "Mr. Abdul Rasheed",
      role: "Operations Director",
      avatar: "https://i.pravatar.cc/300?u=rasheed",
      description: "Managing university partnerships and student support systems across our Kerala centers."
    }
  ];

  return (
    <main className={styles.container}>
      {/* ===== Hero Section ===== */}
      <section className={styles.heroHeader}>
        <div className={styles.heroContent}>
          <p className={styles.heroSubtitle}>Leading with Vision</p>
          <h1 className={styles.heroTitle}>Our Leadership</h1>
        </div>
      </section>

      {/* ===== Chairman Message Section ===== */}
      <section className={styles.chairmanSection}>
        <div className={styles.chairmanGrid}>
          <div className={styles.chairmanImageWrapper}>
            <div className={styles.chairmanImgBox}>
              <img 
                src="https://i.pravatar.cc/600?u=chairman" 
                alt="Chairman" 
                className={styles.chairmanImg}
              />
            </div>
            <div className={styles.chairmanFrame}></div>
          </div>
          
          <div className={styles.chairmanContent}>
            <span className={styles.chairmanTitle}>Chairman's Message</span>
            <h2 className={styles.chairmanName}>Fostering Excellence in Every Learner</h2>
            <div className={styles.chairmanMessage}>
              <p>
                Welcome to TIMS Education. Since our inception in 2009, our singular focus has been to bridge the gap between educational aspirations and accessibility. We believe that distance is no longer a barrier to quality learning, and our mission is to empower students through recognized, flexible academic pathways.
              </p>
              <p>
                Our commitment goes beyond traditional teaching; we aim to provide a supportive ecosystem for every student—from counseling to final certification. At TIMS, we don't just grant degrees; we build futures.
              </p>
              <p style={{ fontWeight: 700, color: '#00122e' }}>
                Dr. Sayed Mohammed <br />
                <span style={{ fontSize: '0.9rem', color: 'var(--accent)' }}>Chairman, TIMS Education</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Board of Directors Section ===== */}
      <section className={styles.directorsGridSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionHeading}>The Board of Directors</h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
            A dedicated team committed to transforming the landscape of distance education in Kerala.
          </p>
        </div>

        <div className={styles.directorsGrid}>
          {directors.map((director, i) => (
            <div key={i} className={styles.directorCard}>
              <div className={styles.directorAvatar}>
                <img src={director.avatar} alt={director.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className={styles.directorInfo}>
                <h3>{director.name}</h3>
                <p>{director.role}</p>
                <p style={{ textTransform: 'none', color: '#64748b', fontSize: '0.9rem', marginTop: '1rem', fontWeight: 400 }}>
                  {director.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Call to Action ===== */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', backgroundColor: '#ffffff' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#00122e', marginBottom: '2rem' }}>Get in touch with us</h2>
        <Link 
          href="/contact" 
          style={{ 
            backgroundColor: 'var(--accent)', 
            color: 'white', 
            padding: '1rem 2.5rem', 
            borderRadius: '50px', 
            textDecoration: 'none', 
            fontWeight: 700 
          }}
        >
          Contact Administration
        </Link>
      </section>
    </main>
  );
}
