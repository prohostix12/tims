'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './universities.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, GraduationCap, Loader2, Search, Info } from 'lucide-react';
import EnquiryModal from '@/components/EnquiryModal';

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const gridRef = useRef<HTMLDivElement>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState('');

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/universities');
      const data = await res.json();
      if (Array.isArray(data)) setUniversities(data);
    } catch (err) {
      console.error('Failed to fetch universities', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnquire = (interest: string) => {
    setSelectedInterest(interest);
    setIsModalOpen(true);
  };

  const filtered = universities.filter(u => {
    const matchesFilter = activeFilter === 'All' || (u.type && u.type.toLowerCase() === activeFilter.toLowerCase());
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [activeFilter, searchTerm]);

  return (
    <main className={styles.container}>

      {/* ===== Hero ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <p className={styles.heroCrumb}>
            <Link href="/">Home</Link> / Universities
          </p>
          <span className={styles.heroTag}>Global Network</span>
          <h1 className={styles.heroTitle}>Our Partner Universities</h1>
          <p className={styles.heroSub}>
            Explore our worldwide network of accredited, reputed institutions — handpicked to match your academic and career goals.
          </p>
        </div>
      </section>

      {/* ===== Filter & Search Bar ===== */}
      <section className={styles.filterBar}>
        <div className={styles.filterInner}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
            <span className={styles.filterLabel}><GraduationCap size={16} /> Filter</span>
            <div className={styles.filterBtns}>
              {['All', 'Private', 'Public', 'Deemed', 'State'].map(f => (
                <button
                  key={f}
                  className={`${styles.filterBtn} ${activeFilter === f ? styles.filterBtnActive : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search university or city..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* ===== University Grid ===== */}
      <section className={styles.gridSection}>
        {loading ? (
          <div style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: '#64748b' }}>
            <Loader2 className="animate-spin" size={48} />
            <p style={{ fontWeight: 600 }}>Discovering opportunities...</p>
          </div>
        ) : (
          <>
            {filtered.length > 0 ? (
              <div className={styles.gridWrap} ref={gridRef}>
                {filtered.map((uni, i) => (
                  <div
                    key={uni._id || i}
                    className={`${styles.card} ${visible ? styles.cardVisible : ''}`}
                    style={{ '--ci': i } as React.CSSProperties}
                  >
                    <div className={styles.cardImg}>
                      <Image
                        src={uni.image || 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop'}
                        alt={uni.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <span className={styles.cardRegion}>{uni.type || 'Institutional'}</span>
                    </div>
                    <div className={styles.cardBody}>
                      <p className={styles.cardLocation}>
                        <MapPin size={13} /> {uni.location}
                      </p>
                      <h3 className={styles.cardName}>{uni.name}</h3>
                      <p className={styles.cardDesc}>{uni.description || 'Global education partner offering a wide range of accredited programs and career-oriented learning.'}</p>
                      <div className={styles.cardTags}>
                        {uni.accreditations ? uni.accreditations.split(',').slice(0, 3).map((f: string, fi: number) => (
                          <span key={fi} className={styles.cardTag}>{f.trim()}</span>
                        )) : (
                          <>
                            <span className={styles.cardTag}>UGC Approved</span>
                            <span className={styles.cardTag}>Top Ranked</span>
                          </>
                        )}
                      </div>
                      
                      <div className={styles.cardActions}>
                        <Link href={`/universities/${uni._id || i}`} className={styles.detailsBtn}>
                          View Details
                        </Link>
                        <button 
                          onClick={() => handleEnquire(uni.name)}
                          className={styles.enquiryBtn}
                        >
                          Enquire <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '5rem 2rem', background: '#f8fafc', borderRadius: '24px', border: '1px dashed #cbd5e1' }}>
                <Info size={48} style={{ color: '#94a3b8', marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#00122e', margin: '0 0 0.5rem' }}>No Universities Found</h3>
                <p style={{ color: '#64748b', maxWidth: '400px', margin: '0 auto' }}>We couldn't find any universities matching your current filters. Try resetting them or searching for something else.</p>
                <button onClick={() => { setActiveFilter('All'); setSearchTerm(''); }} style={{ marginTop: '1.5rem', background: '#00122e', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Reset All Filters</button>
              </div>
            )}
          </>
        )}
      </section>

      {/* ===== CTA ===== */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Can't find the right university?</h2>
          <p className={styles.ctaSub}>Our counselors will match you with the perfect institution based on your profile, budget, and career goals.</p>
          <button 
            onClick={() => handleEnquire('General University Guidance')}
            className={styles.ctaBtn}
            style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Get Free Counseling <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={`Enquire about ${selectedInterest}`}
        interest={selectedInterest}
        source="Universities Page"
      />
    </main>
  );
}
