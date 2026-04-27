'use client';

import React, { useState, useEffect } from 'react';
import styles from './courses.module.css';
import Link from 'next/link';
import { Search, GraduationCap, Clock, BookOpen, ArrowRight, Loader2, ShieldCheck, Globe, Zap } from 'lucide-react';
import EnquiryModal from '@/components/EnquiryModal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CourseCard = ({ course, i, onEnquire }: { course: any, i: number, onEnquire: (interest: string) => void }) => {
  return (
    <div 
      className={styles.courseCard}
      style={{ animationDelay: `${i * 0.1}s` }}
    >
      <div className={styles.cardImage}>
        <img src={course.image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop'} alt={course.title} />
        <span className={styles.levelBadge}>{course.level}</span>
      </div>
      
      <div className={styles.cardContent}>
        <span className={styles.courseCategory}>{course.category}</span>
        <h3 className={styles.courseTitle}>{course.title}</h3>
        <p className={styles.courseDescription}>
          {course.description}
        </p>
        
        <div className={styles.courseMeta}>
          <div className={styles.metaItem}>
            <Clock size={16} color="#ef233c" />
            {course.duration}
          </div>
          <div className={styles.metaItem}>
            <BookOpen size={16} color="#ef233c" />
            {course.eligibility}
          </div>
        </div>
        
        <div className={styles.btnGroup}>
          <button 
            onClick={() => onEnquire(course.title)}
            className={styles.viewBtn}
          >
            ENQUIRE
          </button>
          <Link href={course.path || `/courses/${course._id || course.title.toLowerCase().replace(/ /g, '-')}`} className={styles.detailsBtn}>
            DETAILS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState('');

  const categories = ['All', 'SSLC', '+2', 'Degree', 'Post Graduate', 'Diploma', 'Others'];
  
  useEffect(() => {
    fetch('/api/admin/programs')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCourses(data.map(c => ({
            _id: c._id,
            title: c.name,
            level: c.level || '',
            category: c.category || '',
            description: c.description || '',
            duration: c.duration || '',
            eligibility: c.eligibility || '',
            image: c.image
          })));
        }
      })
      .catch(err => console.error('Error fetching programs:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleEnquire = (interest: string) => {
    setSelectedInterest(interest);
    setIsModalOpen(true);
  };

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <div className={styles.pageGlow} />

        {/* ===== UpGrad Style Hero Section ===== */}
        {/* ===== Red & White Centered Hero ===== */}
        <section className={styles.heroWrapper}>
          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <div className={styles.heroBreadcrumb}>
                Programs Directory
              </div>
              <h1 className={styles.heroTitle}>
                Explore Our <br />
                <span className={styles.heroTitleAccent}>Global Program Directory</span>
              </h1>
              <p className={styles.heroDesc}>
                Unlock your potential with our extensive catalog of globally recognized academic programs. From NIOS/SSLC to specialized Post-Graduate degrees, we offer path-breaking education designed to fast-track your career in today's competitive landscape.
              </p>
              <div className={styles.heroActions}>
                <Link href="/contact" className={styles.heroPrimaryBtn}>
                  ENROLL NOW
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Explorer Section ===== */}
        <section className={styles.explorerSection}>
          <div className={styles.stickyHeader}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5%' }}>
              <div className={styles.filterGlass}>
                <div className={styles.searchBar}>
                  <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={22} />
                    <input 
                      type="text" 
                      placeholder="Filter results..." 
                      className={styles.searchInput}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className={styles.categoryGroup}>
                    {categories.map(cat => (
                      <button 
                        key={cat} 
                        className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
                        onClick={() => setActiveCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5%' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '10rem 0', color: '#64748b' }}>
                 <Loader2 className="animate-spin" size={48} color="#ef233c" style={{ margin: '0 auto 1rem' }} />
                 <p style={{ fontWeight: 700, letterSpacing: '1px' }}>SYNCHRONIZING ACADEMIC DIRECTORY...</p>
              </div>
            ) : (
              <>
                <div className={styles.coursesGrid}>
                  {filteredCourses.slice(0, visibleCount).map((course, i) => (
                    <CourseCard key={course._id || i} course={course} i={i} onEnquire={handleEnquire} />
                  ))}
                </div>

                {filteredCourses.length > visibleCount && (
                  <div style={{ textAlign: 'center', marginTop: '6rem' }}>
                    <button 
                      onClick={() => setVisibleCount(prev => prev + 6)}
                      className={styles.viewBtn}
                      style={{ width: 'auto', padding: '1.25rem 4rem', fontSize: '1rem' }}
                    >
                      LOAD MORE PROGRAMS
                    </button>
                  </div>
                )}

                {filteredCourses.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '10rem 0' }}>
                    <h2 style={{ fontSize: '3rem', color: '#00122e', fontWeight: 900, letterSpacing: '-1px' }}>No programs found.</h2>
                    <p style={{ color: '#64748b', marginTop: '1rem', fontSize: '1.2rem', fontWeight: 500 }}>Try refining your search or selecting another category.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* ===== Institutional Final CTA ===== */}
        <section className={styles.institutionalSection}>
          <div className={styles.instContent}>
            <h2 className={styles.instTitle}>
              Your Future Starts With <br /> <span>The Right Choice</span>
            </h2>
            <p className={styles.instDesc}>
              Our academic consultants are here to guide you through the maze of educational options. Get a personalized roadmap for your career today.
            </p>
            <button 
              onClick={() => handleEnquire('General Consultation')}
              className={styles.instCta}
              style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              FREE CONSULTATION <ArrowRight size={24} />
            </button>
          </div>
        </section>

        <EnquiryModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title={`Enquire about ${selectedInterest}`}
          interest={selectedInterest}
          source="Courses Page"
        />
      </main>
      <Footer />
    </>
  );
}
