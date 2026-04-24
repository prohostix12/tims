'use client';

import React, { useState, useEffect } from 'react';
import styles from './courses.module.css';
import Link from 'next/link';
import { Search, GraduationCap, Clock, BookOpen, ArrowRight, Loader2 } from 'lucide-react';
import EnquiryModal from '@/components/EnquiryModal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CourseCard = ({ course, i, onEnquire }: { course: any, i: number, onEnquire: (interest: string) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={styles.courseCard}
      style={{ 
        animationDelay: `${i * 0.1}s`,
        height: isExpanded ? 'auto' : '550px',
        minHeight: '550px'
      }}
    >
      <div className={styles.cardImage}>
        <img src={course.image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop'} alt={course.title} />
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.courseHeader}>
          <span className={styles.levelBadge}>{course.level}</span>
          <GraduationCap size={20} color="var(--accent)" />
        </div>
        
        <span className={styles.courseCategory}>{course.category}</span>
        <h3 className={styles.courseTitle}>{course.title}</h3>
        <p className={`${styles.courseDescription} ${isExpanded ? styles.expanded : ''}`}>
          {course.description}
        </p>
        {course.description?.length > 100 && (
          <button 
            className={styles.seeMoreLink}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'See Less' : 'See More...'}
          </button>
        )}
        
        <div className={styles.courseMeta}>
          <div className={styles.metaItem}>
            <Clock size={14} />
            {course.duration}
          </div>
          <div className={styles.metaItem}>
            <BookOpen size={14} />
            {course.eligibility}
          </div>
        </div>
        
        <div className={styles.btnGroup}>
          <button 
            onClick={() => onEnquire(course.title)}
            className={styles.viewBtn}
            style={{ border: 'none', cursor: 'pointer', width: '100%', fontFamily: 'inherit' }}
          >
            ENQUIRE NOW
          </button>
          <Link href={course.path || `/courses/${course._id || course.title.toLowerCase().replace(/ /g, '-')}`} className={styles.detailsBtn}>
            VIEW DETAILS
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
  
  // Modal state
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
            level: c.level || 'Degree',
            category: c.category || 'General',
            description: c.description || 'Professional academic program designed for excellence.',
            duration: c.duration || '3 Years',
            eligibility: c.eligibility || 'Plus Two',
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
        <section className={styles.heroHeader}>
          <div className={styles.heroContent}>
            <p className={styles.heroCrumb}>
              <Link href="/">Home</Link> / Courses
            </p>
            <span className={styles.heroTag}>Programs</span>
            <h1 className={styles.heroTitle}>Explore Our Courses</h1>
            <p className={styles.heroSub}>Discover our comprehensive range of academic and professional programs tailored for your success.</p>

            {/* Quick stats */}
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>50+</span>
                <span className={styles.heroStatLabel}>Programs</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>98%</span>
                <span className={styles.heroStatLabel}>Success Rate</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>24/7</span>
                <span className={styles.heroStatLabel}>Student Support</span>
              </div>
            </div>

            <Link href="/contact" className={styles.heroCta}>
              Talk to an Advisor <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* ===== Explorer Section ===== */}
        <section className={styles.explorerSection}>
          {/* Sticky Filter Bar */}
          <div className={styles.stickyHeader}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5%' }}>
              <div className={styles.searchBar}>
                <div className={styles.searchWrapper}>
                  <Search className={styles.searchIcon} size={22} />
                  <input 
                    type="text" 
                    placeholder="Search program directory..." 
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

          {/* Courses Grid */}
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5%' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '10rem 0', color: '#64748b' }}>
                 <Loader2 className="animate-spin" size={48} color="var(--accent)" style={{ margin: '0 auto 1rem' }} />
                 <p>Fetching academic programs...</p>
              </div>
            ) : (
              <>
                <div className={styles.coursesGrid}>
                  {filteredCourses.slice(0, visibleCount).map((course, i) => (
                    <CourseCard key={course._id || i} course={course} i={i} onEnquire={handleEnquire} />
                  ))}
                </div>

                {filteredCourses.length > visibleCount && (
                  <div style={{ textAlign: 'center', marginTop: '5rem' }}>
                    <button 
                      onClick={() => setVisibleCount(prev => prev + 6)}
                      className={styles.loadMoreBtn}
                    >
                      LOAD MORE PROGRAMS
                    </button>
                  </div>
                )}

                {filteredCourses.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '10rem 0' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#00122e', fontWeight: 900 }}>No results matched.</h2>
                    <p style={{ color: '#64748b', marginTop: '1rem', fontSize: '1.2rem' }}>Refine your search or explore a different category.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* ===== Institutional Footer CTA ===== */}
        <section style={{ padding: '8rem 0', backgroundColor: '#00122e', color: '#ffffff' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 5%', textAlign: 'center' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '2rem', lineHeight: 1.1 }}>
              Find Your Path to Excellence
            </h2>
            <p style={{ fontSize: '1.3rem', color: '#94a3b8', lineHeight: 1.8, marginBottom: '4rem', maxWidth: '750px', margin: '0 auto 4rem' }}>
              Our academic advisors are ready to help you map out a personalized study pathway that aligns with your professional aspirations.
            </p>
            <button 
              onClick={() => handleEnquire('General Consultation')}
              style={{ background: 'var(--accent)', color: 'white', padding: '1.25rem 3.5rem', borderRadius: '50px', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '1px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              CONSULT AN ADVISOR <ArrowRight size={20} />
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
