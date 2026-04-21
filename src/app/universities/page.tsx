'use client';

import { useState } from 'react';
import styles from './universities.module.css';
import Link from 'next/link';

export default function UniversitiesPage() {
  const [activeRegion, setActiveRegion] = useState('All');

  const regions = ['All', 'India', 'UK', 'USA', 'Australia', 'Canada', 'Europe'];

  const universities = [
    {
      name: "Amrita Vishwa Vidyapeetham",
      region: "India",
      location: "Coimbatore, India",
      description: "A multi-disciplinary, research-intensive university ranked among the best in India.",
      features: ["NAAC A++", "UGC Approved", "Global Research"]
    },
    {
      name: "University of Greenwich",
      region: "UK",
      location: "London, United Kingdom",
      description: "Renowned for its academic excellence and stunning historic campus in the heart of London.",
      features: ["TEF Silver", "International Faculty", "Business Leader"]
    },
    {
      name: "Arizona State University",
      region: "USA",
      location: "Phoenix, USA",
      description: "Consistently ranked as the #1 university for innovation in the United States.",
      features: ["#1 in Innovation", "Large Alumni", "Tech Hub"]
    },
    {
      name: "Monash University",
      region: "Australia",
      location: "Melbourne, Australia",
      description: "A member of the Group of Eight, recognized for its global outlook and research impact.",
      features: ["Top 100 Global", "Group of Eight", "Career Ready"]
    },
    {
      name: "University of Toronto",
      region: "Canada",
      location: "Toronto, Canada",
      description: "Canada's top-ranked university and a global leader in higher education and research.",
      features: ["Diverse Culture", "Research Powerhouse", "Top Ranked"]
    },
    {
      name: "Technical University of Munich",
      region: "Europe",
      location: "Munich, Germany",
      description: "One of Europe's top universities for engineering, technology, and applied sciences.",
      features: ["STEM Leader", "Partner of Industry", "No Tuition (mostly)"]
    },
    {
      name: "Manipal Academy of Higher Education",
      region: "India",
      location: "Manipal, India",
      description: "A pioneer in private higher education with a world-class campus and global partnerships.",
      features: ["Green Campus", "Top Medical", "NRI Favorite"]
    }
  ];

  const filteredUnis = activeRegion === 'All' 
    ? universities 
    : universities.filter(uni => uni.region === activeRegion);

  return (
    <main className={styles.container}>
      {/* ===== Hero Section ===== */}
      <section className={styles.heroHeader}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Our University Partners</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            Explore our network of world-class educational institutions across the globe
          </p>
        </div>
      </section>

      {/* ===== Filters Section ===== */}
      <section className={styles.filterSection}>
        <div className={styles.countryGrid}>
          {regions.map(region => (
            <button 
              key={region} 
              className={`${styles.countryBtn} ${activeRegion === region ? styles.active : ''}`}
              onClick={() => setActiveRegion(region)}
            >
              {region}
            </button>
          ))}
        </div>
      </section>

      {/* ===== University Grid ===== */}
      <section className={styles.uniGrid}>
        {filteredUnis.map((uni, i) => (
          <div key={i} className={styles.uniCard}>
            <div className={styles.uniLogoBox}>
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            
            <div className={styles.uniLocation}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {uni.location}
            </div>
            
            <h3 className={styles.uniName}>{uni.name}</h3>
            <p className={styles.uniDescription}>{uni.description}</p>
            
            <div className={styles.uniFeatures}>
               {uni.features.map((feature, fidx) => (
                 <span key={fidx} className={styles.featureTag}>{feature}</span>
               ))}
            </div>
          </div>
        ))}
      </section>

      {/* ===== Footer CTA ===== */}
      <section style={{ padding: '8rem 2rem', textAlign: 'center', background: '#00122e', color: 'white' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Your Journey Starts Here</h2>
        <p style={{ color: '#94a3b8', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto' }}>
          Consult with our experts to find the right university that fits your profile and career goals.
        </p>
        <Link href="/contact" style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '1rem 3rem', borderRadius: '50px', fontWeight: 700, fontSize: '1.1rem' }}>
          FREE CONSULTATION
        </Link>
      </section>
    </main>
  );
}
