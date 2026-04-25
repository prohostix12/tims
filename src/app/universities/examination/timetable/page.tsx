'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Clock, BookOpen, ChevronRight, Download, Loader2, FileText } from 'lucide-react';
import styles from './timetable.module.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Timetable {
  _id: string;
  examName: string;
  type: 'manual' | 'file';
  entries?: { code: string; subject: string; date: string; time: string; }[];
  fileUrl?: string;
  createdAt: string;
}

export default function TimetablePage() {
  const [timetables, setTimetables] = useState<Timetable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTimetables = async () => {
      try {
        const res = await fetch('/api/admin/timetable');
        const data = await res.json();
        if (Array.isArray(data)) {
          setTimetables(data);
        }
      } catch (err) {
        setError('Failed to load examination timetables.');
      } finally {
        setLoading(false);
      }
    };
    fetchTimetables();
  }, []);

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.heroCrumb}>
              <Link href="/">Home</Link> / <Link href="/universities">Universities</Link> / Time Table
            </p>
            <span className={styles.heroTag}>Official Schedule</span>
            <h1 className={styles.heroTitle}>
              <span style={{ color: '#ef233c' }}>Examination</span> Time Table
            </h1>
            <p className={styles.heroSub}>
              Stay updated with the latest board and university examination schedules for all our programs.
            </p>
          </div>
        </section>

        {/* Timetables */}
        <section className={styles.tableSection}>
          <div className={styles.tableWrap}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '5rem' }}>
                <Loader2 className="animate-spin" size={40} style={{ color: '#ef233c', marginBottom: '1rem' }} />
                <p style={{ color: '#64748b' }}>Fetching official schedules...</p>
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '5rem' }}>
                <p style={{ color: '#ef4444' }}>{error}</p>
              </div>
            ) : timetables.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {timetables.map((tt) => (
                  <div key={tt._id} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '3rem' }}>
                    <div className={styles.tableHeader}>
                      <h2 className={styles.tableTitle}>{tt.examName}</h2>
                      {tt.type === 'file' && (
                        <a href={tt.fileUrl} target="_blank" rel="noopener noreferrer" className={styles.downloadBtn}>
                          <Download size={15} /> Download PDF
                        </a>
                      )}
                    </div>

                    {tt.type === 'manual' && tt.entries && (
                      <div className={styles.table} style={{ marginTop: '1.5rem' }}>
                        <div className={styles.tableHeadRow}>
                          <span>Date</span>
                          <span>Time</span>
                          <span>Subject</span>
                          <span>Code</span>
                        </div>
                        {tt.entries.map((row, i) => (
                          <div key={i} className={`${styles.tableRow} ${i % 2 === 0 ? styles.tableRowAlt : ''}`}>
                            <div className={styles.dateCell}>
                              <span className={styles.dateMain}>{new Date(row.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <div className={styles.timeCell}>
                              <Clock size={14} />
                              {row.time}
                            </div>
                            <div className={styles.subjectCell}>{row.subject}</div>
                            <div className={styles.codeCell}>{row.code}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '6rem 2rem', background: '#ffffff', borderRadius: '24px', border: '1px dashed #cbd5e1' }}>
                <div style={{ width: '64px', height: '64px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#94a3b8' }}>
                  <Calendar size={32} />
                </div>
                <h3>No Examination Schedules Published</h3>
                <p style={{ color: '#64748b', maxWidth: '400px', margin: '1rem auto' }}>
                  There are currently no active exam timetables. Once published by the boards or universities, they will appear here.
                </p>
              </div>
            )}

            <p className={styles.note} style={{ marginTop: '2rem' }}>
              * All examination timings and dates are subject to official university/board confirmations.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <div className={styles.ctaInner}>
            <h2>Need help with exam preparation?</h2>
            <p>Our expert faculty provides coaching, sample papers, and test series for all our partner university subjects.</p>
            <Link href="/contact" className={styles.ctaBtn}>
              Contact Counselors <ChevronRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
