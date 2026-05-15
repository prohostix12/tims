'use client';

import React from 'react';
import styles from './terms.module.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Scale, FileText, Info } from 'lucide-react';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className={styles.container}>
        {/* Cinematic Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.heroTag}>Policies</span>
            <h1 className={styles.heroTitle}>
              Terms & <span style={{ color: '#ef233c' }}>Conditions</span>
            </h1>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.lastUpdated}>
            <Info size={20} color="#ef233c" />
            Last Updated: April 25, 2026
          </div>

          <div className={styles.legalGrid}>
            <div className={styles.legalBlock}>
              <h2>Agreement to Terms</h2>
              <p>
                By accessing and using the TIMS Educational platform, you agree to be bound by these Terms and Conditions. 
                Our services are designed to provide academic counseling and institutional support, and your use of these services 
                constitutes your acceptance of our operational policies.
              </p>
            </div>

            <div className={styles.legalBlock}>
              <h2>Service Usage</h2>
              <p>Our platform facilitates academic processes including:</p>
              <ul>
                <li>Degree attestation and verification assistance</li>
                <li>Credit transfer counseling and documentation</li>
                <li>University admission guidance and support</li>
                <li>Access to official syllabus and study materials</li>
              </ul>
            </div>

            <div className={styles.legalBlock}>
              <h2>User Responsibilities</h2>
              <p>
                As a user of our services, you are responsible for providing accurate and truthful documentation. 
                TIMS Education reserves the right to terminate service if fraudulent information is detected. 
                All academic credentials must be verified through official institutional channels.
              </p>
            </div>

            <div className={styles.legalBlock}>
              <h2>Intellectual Property</h2>
              <p>
                All content, including logos, text, graphics, and software available on the TIMS platform, 
                is the property of TIMS Education or its licensors and is protected by copyright laws. 
                Unauthorized reproduction or distribution is strictly prohibited.
              </p>
            </div>

            <div className={styles.legalBlock}>
              <h2>Liability Disclaimer</h2>
              <p>
                While we strive for 100% accuracy in our guidance, TIMS Education acts as a facilitator. 
                Final decisions regarding admissions, attestation, or credit transfers rest with the 
                respective universities and government authorities.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
