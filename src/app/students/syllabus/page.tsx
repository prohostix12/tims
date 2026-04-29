'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Download, ChevronRight, BookOpen, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './syllabus.module.css';

interface Syllabus {
  _id: string;
  courseName: string;
  universityName: string;
  fileUrl: string;
  createdAt: string;
}

export default function SyllabusPage() {
  const [syllabusList, setSyllabusList] = useState<Syllabus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const res = await fetch('/api/admin/syllabus');
        const data = await res.json();
        if (Array.isArray(data)) {
          setSyllabusList(data);
        }
      } catch (err) {
        setError('Failed to load syllabus data.');
      } finally {
        setLoading(false);
      }
    };
    fetchSyllabus();
  }, []);

  return (
    <main className={styles.container}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <span className={styles.heroTag}>Academic Resources</span>
            <h1 className={styles.heroTitle}>
              Academic <span style={{ color: '#ef233c' }}>Syllabus Repository</span>
            </h1>
            <p className={styles.heroDesc}>
              Stay on track with your academic goals by accessing the most up-to-date curriculum and syllabi for our diverse range of programs. From core foundational subjects to advanced specializations, our repository provides everything you need to master your field.
            </p>
            <div className={styles.heroActions}>
              <div className={styles.searchBox}>
                <input type="text" placeholder="Search by course or university..." className={styles.searchInput} />
              </div>
              <Link href="/courses" className={styles.heroBtn}>
                Browse All Programs <ChevronRight size={18} />
              </Link>
            </div>
          </div>
          <div className={styles.heroRight}>
            <img src="/images/courses-hero-bg.png" alt="Syllabus" className={styles.heroImg} />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className={styles.gridSection}>
        <div className={styles.gridContainer}>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem' }}>
              <Loader2 className="animate-spin" size={40} style={{ color: '#ef233c', marginBottom: '1rem' }} />
              <p style={{ color: '#64748b' }}>Loading syllabus repository...</p>
            </div>
          ) : error ? (
            <div className={styles.emptyState}>
              <p style={{ color: '#ef4444' }}>{error}</p>
            </div>
          ) : syllabusList.length > 0 ? (
            <div className={styles.syllabusGrid}>
              {syllabusList.map((item) => (
                <div key={item._id} className={styles.syllabusCard}>
                  <div className={styles.cardIcon}>
                    <BookOpen size={30} />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{item.courseName}</h3>
                    <p>{item.universityName}</p>
                  </div>
                  <a 
                    href={item.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.downloadBtn}
                  >
                    <Download size={18} /> Download Syllabus
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <FileText size={40} />
              </div>
              <h2>Syllabus Repository Empty</h2>
              <p>
                We are currently updating our syllabus database. Please check back soon or contact our support team for immediate assistance.
              </p>
              <Link href="/contact" className={styles.requestLink}>
                Request Syllabus via Email <ChevronRight size={18} />
              </Link>
            </div>
          )}

        </div>
      </section>

      {/* Support Section */}
      <section className={styles.supportSection}>
        <div className={styles.supportContent}>
          <h2>Need academic guidance?</h2>
          <p>
            Our expert counselors are here to help you understand the curriculum and choose the right path for your career.
          </p>
          <Link href="/contact" className={styles.counselBtn}>
            Get Free Counseling <ChevronRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
