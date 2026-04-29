'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Download, Search, FileText, ChevronRight, Loader2 } from 'lucide-react';
import styles from './study-material.module.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface StudyMaterial {
  _id: string;
  subject: string;
  fileUrl: string;
  createdAt: string;
}

export default function StudyMaterialPage() {
  const [search, setSearch] = useState('');
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await fetch('/api/admin/study-materials');
        const data = await res.json();
        if (Array.isArray(data)) {
          setMaterials(data);
        }
      } catch (err) {
        setError('Failed to load study materials.');
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  const filtered = materials.filter(m => 
    m.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className={styles.container}>

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <p className={styles.heroCrumb}>
                <Link href="/">Home</Link> / <Link href="/universities">Universities</Link> / Study Material
              </p>
              <span className={styles.heroTag}>Academic Support</span>
              <h1 className={styles.heroTitle}>
                <span style={{ color: '#ef233c' }}>Premium</span> Study Resources
              </h1>
              <p className={styles.heroSub}>
                Empower your learning with our comprehensive digital library. Access high-quality subject notes, academic guides, and success-oriented resources meticulously curated by our expert faculty to help you master your curriculum and excel in your examinations.
              </p>
            </div>
            <div className={styles.heroRight}>
              <img src="/images/student-laptop.png" alt="Study Material" className={styles.heroImg} />
            </div>
          </div>
        </section>

        {/* Search */}
        <section className={styles.filterSection}>
          <div className={styles.filterInner}>
            <div className={styles.searchBox} style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by subject name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>
        </section>

        {/* Materials Grid */}
        <section className={styles.gridSection}>
          <div className={styles.grid}>
            {loading ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem' }}>
                <Loader2 className="animate-spin" size={40} style={{ color: '#ef233c', marginBottom: '1rem' }} />
                <p style={{ color: '#64748b' }}>Fetching academic resources...</p>
              </div>
            ) : error ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem' }}>
                <p style={{ color: '#ef4444' }}>{error}</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className={styles.empty}>
                <BookOpen size={48} style={{ opacity: 0.2, marginBottom: '1.5rem' }} />
                <h3>No Materials Available</h3>
                <p>The study material repository is currently empty. Our team is working on uploading new resources.</p>
                <Link href="/contact" style={{ color: '#ef233c', fontWeight: 700, textDecoration: 'none', marginTop: '1.5rem', display: 'inline-block' }}>
                   Request specific material →
                </Link>
              </div>
            ) : (
              filtered.map((m) => (
                <div key={m._id} className={styles.card}>
                  <div className={styles.cardIcon}>
                    <FileText size={28} />
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.cardProgram}>Educational Resource</span>
                    <h3 className={styles.cardSubject}>{m.subject}</h3>
                    <p className={styles.cardUniversity}>TIMS Official Material</p>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardSize}>DOC/PDF</span>
                    <a 
                      href={m.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.downloadBtn}
                    >
                      <Download size={15} /> View / Download
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <div className={styles.ctaInner}>
            <h2>Can't find your material?</h2>
            <p>Our academic counselors can provide personalized study guides and resources for your specific program.</p>
            <Link href="/contact" className={styles.ctaBtn}>
              Talk to a Counselor <ChevronRight size={18} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
