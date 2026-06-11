'use client';

import React, { useState, useEffect } from 'react';
import styles from './courses.module.css';
import Link from 'next/link';
import { Search, GraduationCap, Clock, BookOpen, ArrowRight, Loader2, ShieldCheck, Globe, Zap, Check, FileText } from 'lucide-react';
import EnquiryModal from '@/components/EnquiryModal';

const CourseCard = ({ course, i, onEnquire }: { course: any, i: number, onEnquire: (interest: string) => void }) => {
  const initials = course.universityName
    ? course.universityName.split(' ').map((w: string) => w[0]).slice(0, 2).join('')
    : 'U';

  return (
    <div
      className={styles.courseCard}
      style={{ animationDelay: `${i * 0.1}s` }}
    >
      <div className={styles.cardImage}>
        {course.level && <span className={styles.levelBadge}>{course.level}</span>}
        <span className={styles.cardCourseName}>{course.title}</span>
        <div className={styles.uniLogoCorner}>
          {course.universityLogo
            ? <img src={course.universityLogo} alt={course.universityName} className={styles.uniLogoImg} />
            : <span className={styles.uniLogoInitials}>{initials}</span>
          }
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <span className={styles.courseCategory}>{course.category}</span>
        <h3 className={styles.courseTitle}>{course.title}</h3>
        <p className={styles.courseDescription}>
          {course.description}
        </p>
        
        
        <div className={styles.btnGroup}>
          <button 
            onClick={() => onEnquire(course.title)}
            className={styles.viewBtn}
          >
            ENQUIRE
          </button>
          <Link href={`/courses/${course.slug || course._id}`} className={styles.detailsBtn}>
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
  const [selectedUniversity, setSelectedUniversity] = useState('All');
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState('');

  const categories = ['All', 'SSLC', '+2', 'Degree', 'Post Graduate', 'Diploma', 'Others'];
  
  useEffect(() => {
    fetch('/api/admin/programs', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCourses(data.map(c => ({
            _id: c._id,
            slug: c.slug || '',
            title: c.name || c.title || '',
            level: c.level || '',
            category: c.category || '',
            courseType: c.courseType || '',
            description: c.description || '',
            duration: c.duration || '',
            eligibility: c.eligibility || '',
            image: c.image,
            universityName: c.university?.name || '',
            universityLogo: c.university?.logo || '',
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

  const universities = ['All', ...Array.from(new Set(courses.map(c => c.universityName).filter(Boolean))).sort()];

  const categoryMatches = (course: any) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Degree') return course.level === 'UG' || course.category === 'Online UG';
    if (activeCategory === 'Post Graduate') return course.level === 'PG' || course.category === 'Online PG';
    if (activeCategory === 'Others') return course.courseType === 'Others' || course.category === 'Others';
    return course.category === activeCategory;
  };

  const filteredCourses = courses.filter(course => {
    const matchesCategory = categoryMatches(course);
    const matchesSearch = (course.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUniversity = selectedUniversity === 'All' || course.universityName === selectedUniversity;
    return matchesCategory && matchesSearch && matchesUniversity;
  });

  const showAll = activeCategory === 'All' && !searchQuery && selectedUniversity === 'All';
  const visibleCourses = showAll ? filteredCourses : filteredCourses.slice(0, visibleCount);

  return (
    <>
      <main className={styles.container}>
        <div className={styles.pageGlow} />

        {/* ===== UpGrad Style Hero Section ===== */}
        {/* ===== Skillhub Inspired Hero - Courses ===== */}
        <section className={styles.heroWrapper}>
          <div className={styles.heroContent}>
            
            <div className={styles.heroLeft}>
              <span className={styles.heroBadge}>Academic Directory</span>
              
              <h1 className={styles.heroTitle}>
                Explore Our Global <br />
                Program Directory
              </h1>
              
              <p className={styles.heroSubtext}>
                Unlock your potential with our extensive catalog of globally recognized academic programs. From NIOS/SSLC to specialized Post-Graduate degrees, we offer path-breaking education designed to fast-track your career in today's competitive landscape.
              </p>

              <div className={styles.heroSearch}>
                <div className={styles.searchIconWrapper}>
                  <Search size={20} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search course title" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={() => {
                  const explorer = document.getElementById('explorer-section');
                  if(explorer) explorer.scrollIntoView({behavior: 'smooth'});
                }}>Search</button>
              </div>
            </div>

            <div className={styles.heroRight}>
              <div className={styles.bgLines} />
              <div className={styles.dotGrid} />
              
              <div className={styles.imageWrapper}>
                <img src="/images/courses-hero-new.png" alt="Student" className={styles.studentImg} />
                
                <div className={styles.orangeBadge}>
                  <FileText size={24} style={{ marginBottom: '4px' }} />
                  <h3>2M+</h3>
                  <p>Students</p>
                </div>
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
                  <div className={styles.categoryGroup}>
                    {categories.map(cat => (
                      <button
                        key={cat}
                        className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
                        onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <select
                    className={styles.universitySelect}
                    value={selectedUniversity}
                    onChange={e => { setSelectedUniversity(e.target.value); setVisibleCount(6); }}
                  >
                    {universities.map(u => (
                      <option key={u} value={u}>{u === 'All' ? 'All Universities' : u}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className={styles.gridWrapper}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '10rem 0', color: '#64748b' }}>
                 <Loader2 className="animate-spin" size={48} color="#ef233c" style={{ margin: '0 auto 1rem' }} />
                 <p style={{ fontWeight: 700, letterSpacing: '1px' }}>SYNCHRONIZING ACADEMIC DIRECTORY...</p>
              </div>
            ) : (
              <>
                <div className={styles.coursesGrid}>
                  {visibleCourses.map((course, i) => (
                    <CourseCard key={course._id || i} course={course} i={i} onEnquire={handleEnquire} />
                  ))}
                </div>

                {!showAll && filteredCourses.length > visibleCount && (
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
    </>
  );
}
