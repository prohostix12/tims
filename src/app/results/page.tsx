'use client';

import React, { useState } from 'react';
import styles from './results.module.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, GraduationCap, FileText, ClipboardCheck, ArrowRight, Download, Award } from 'lucide-react';

export default function ResultsPage() {
  const [registerNumber, setRegisterNumber] = useState('');
  const [dob, setDob] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API fetch
    setTimeout(() => {
      setIsSearching(false);
      setShowResult(true);
    }, 1500);
  };

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

        {/* ===== Results Retrieval Section ===== */}
        <section className={styles.resultsSection}>
          <div className={styles.searchCard}>
            <div className={styles.cardHeader}>
              <h2>Check Your Result</h2>
              <p>Enter your credentials below to view your performance summary</p>
            </div>

            <form className={styles.searchForm} onSubmit={handleSearch}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Register Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. TIMS2024001" 
                  className={styles.inputField}
                  value={registerNumber}
                  onChange={(e) => setRegisterNumber(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Date of Birth</label>
                <input 
                  type="date" 
                  className={styles.inputField}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={isSearching}>
                {isSearching ? 'SEARCHING ARCHIVES...' : (
                  <>
                    VIEW RESULTS <Search size={20} />
                  </>
                )}
              </button>
            </form>

            {/* Result Placeholder / Result Area */}
            <div className={styles.resultDisplay}>
              {!showResult ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>
                    <ClipboardCheck size={32} />
                  </div>
                  <p>Awaiting input. Please enter your register number and DOB to proceed.</p>
                </div>
              ) : (
                <div className="fade-in">
                  {/* Mock Result UI */}
                  <div style={{ background: '#f1f5f9', padding: '2rem', borderRadius: '16px', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
                      <div>
                        <h3 style={{ margin: 0, color: '#00122e' }}>Provisional Marksheet</h3>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Ref: {registerNumber}</p>
                      </div>
                      <div style={{ background: '#ef233c', color: '#fff', padding: '0.4rem 1rem', borderRadius: '50px', fontWeight: 700 }}>
                        PASSED
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                      <div style={{ padding: '1rem', background: '#fff', borderRadius: '8px' }}>
                        <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b' }}>STUDENT NAME</span>
                        <strong style={{ fontSize: '1.1rem' }}>SIVAPRASAD K</strong>
                      </div>
                      <div style={{ padding: '1rem', background: '#fff', borderRadius: '8px' }}>
                        <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b' }}>COURSE</span>
                        <strong style={{ fontSize: '1.1rem' }}>MBA - International Business</strong>
                      </div>
                    </div>

                    <button 
                      style={{ 
                        width: '100%', 
                        padding: '1rem', 
                        background: '#00122e', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '8px', 
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                      }}
                    >
                      DOWNLOAD OFFICIAL MARKSHEET <Download size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
