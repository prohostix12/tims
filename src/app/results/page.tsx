'use client';

import React, { useState, useEffect } from 'react';
import styles from './results.module.css';
import { Award, GraduationCap, ArrowUpRight, Loader2, ClipboardCheck } from 'lucide-react';

export default function ResultsPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/results');
      const data = await res.json();
      if (Array.isArray(data)) setResults(data);
    } catch (err) {
      console.error('Failed to fetch results', err);
    } finally {
      setLoading(false);
    }
  };

  // Group results by university
  const groupedResults = results.reduce((acc: any, result) => {
    const uniName = result.university?.name || 'Other Universities';
    if (!acc[uniName]) acc[uniName] = [];
    acc[uniName].push(result);
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <main>
        <div className={styles.pageGlow} />

        {/* ===== Cinematic Hero Section ===== */}
        <section className={styles.heroWrapper}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <div className={styles.heroBreadcrumb}>
                <Award size={16} /> Official Results Portal
              </div>
              <h1 className={styles.heroTitle}>
                Academic <br />
                <span className={styles.heroTitleAccent}>Achievement Hub</span>
              </h1>
              <p className={styles.heroDesc}>
                Access your examination results, digital marksheets, and academic credentials from various universities. Click on your course name to view and download your result document.
              </p>
            </div>
            <div className={styles.heroRight}>
              <img src="/images/hero-campus.png" alt="Results" className={styles.heroImg} />
            </div>
          </div>
        </section>

        {/* ===== Results List Section ===== */}
        <section className={styles.resultsListSection}>
          <div className={styles.resultsListContainer}>
            {loading ? (
              <div className={styles.loadingWrapper}>
                <Loader2 className="animate-spin" size={40} />
                <p>Retrieving latest results...</p>
              </div>
            ) : results.length > 0 ? (
              Object.keys(groupedResults).map((uniName) => (
                <div key={uniName} className={styles.universitySection}>
                  <h2 className={styles.uniTitle}>
                    <GraduationCap size={28} /> {uniName}
                  </h2>
                  <div className={styles.resultsGrid}>
                    {groupedResults[uniName].map((result: any) => (
                      <div key={result._id} className={styles.resultItem}>
                        <div className={styles.semesterTag}>{result.semester}</div>
                        <a 
                          href={result.marksheetUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={styles.courseLink}
                        >
                          {result.course?.name || 'Result Document'}
                          <ArrowUpRight size={20} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <ClipboardCheck size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <h3>No results published yet</h3>
                <p>Please check back later for the latest examination updates.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
