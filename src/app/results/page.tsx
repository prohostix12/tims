'use client';

import React, { useState } from 'react';
import styles from './results.module.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GraduationCap, FileText, ArrowRight, Award } from 'lucide-react';

export default function ResultsPage() {
  return (
    <div className={styles.container}>
      <Navbar />
      
      <main>
        <div className={styles.pageGlow} />

        {/* ===== Cinematic Hero Section ===== */}
        <section className={styles.heroWrapper}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <div className={styles.heroBreadcrumb}>
                <Award size={16} /> Examination Results 2024
              </div>
              <h1 className={styles.heroTitle}>
                Your Academic <br />
                <span className={styles.heroTitleAccent}>Achievement Portal</span>
              </h1>
              <p className={styles.heroDesc}>
                Access your official examination results, digital marksheets, and academic credentials. Our secure portal ensures that your hard-earned success is just a few clicks away.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
