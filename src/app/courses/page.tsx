'use client';

import { useState } from 'react';
import styles from './courses.module.css';
import Link from 'next/link';

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'SSLC', '+2', 'Degree', 'Post Graduate', 'Diploma', 'Others'];

  const courses = [
    {
      title: "Master of Business Administration (MBA)",
      category: "Post Graduate",
      level: "Management",
      duration: "2 Years",
      eligibility: "Any Degree",
      description: "Comprehensive management program covering Strategic Planning, Finance, and Global Operations."
    },
    {
      title: "B.Tech in Computer Science",
      category: "Degree",
      level: "Engineering",
      duration: "4 Years",
      eligibility: "12th Science",
      description: "Advanced engineering course focusing on Software Development, AI, and Systems Architecture."
    },
    {
      title: "Plus Two Science / Commerce",
      category: "+2",
      level: "Secondary",
      duration: "2 Years",
      eligibility: "SSLC / 10th",
      description: "Higher secondary education with a focus on core subjects for university preparation."
    },
    {
      title: "Secondary School Leaving Certificate",
      category: "SSLC",
      level: "Primary",
      duration: "1 Year",
      eligibility: "9th Standard",
      description: "Fundamental secondary education leading to the SSLC certification."
    },
    {
      title: "Executive Diploma in Marketing",
      category: "Diploma",
      level: "Professional",
      duration: "1 Year",
      eligibility: "12th Pass",
      description: "Fast-track professional diploma focusing on digital marketing and sales strategies."
    },
    {
      title: "M.Sc in Information Technology",
      category: "Post Graduate",
      level: "Science",
      duration: "2 Years",
      eligibility: "B.Sc / BCA",
      description: "Technical mastery in Network Security, Data Science, and Cloud Platforms."
    },
    {
      title: "Bachelor of Business Administration (BBA)",
      category: "Degree",
      level: "Management",
      duration: "3 Years",
      eligibility: "12th Pass",
      description: "Foundational business degree exploring Marketing, Human Resources, and Entrepreneurship."
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className={styles.container}>
      {/* ===== Hero Section ===== */}
      <section className={styles.heroHeader}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Our Courses</h1>
          <p className={styles.heroSubtitle}>Find the perfect program to accelerate your career</p>
        </div>
      </section>

      {/* ===== Explorer Section ===== */}
      <section className={styles.explorerSection}>
        <div className={styles.searchBar}>
          <div className={styles.searchIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <input 
            type="text" 
            placeholder="Search for courses (e.g. MBA, B.Tech...)" 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
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

        <div className={styles.coursesGrid}>
          {filteredCourses.map((course, i) => (
            <div key={i} className={styles.courseCard}>
              <div className={styles.courseHeader}>
                <div className={styles.levelBadge}>{course.level}</div>
                <div style={{ color: 'var(--accent)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </div>
              </div>
              
              <div className={styles.courseInfo}>
                <span className={styles.courseLevel}>{course.category}</span>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <p className={styles.courseSnippet}>{course.description}</p>
                
                <div className={styles.courseMeta}>
                  <div className={styles.metaItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {course.duration}
                  </div>
                  <div className={styles.metaItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    {course.eligibility}
                  </div>
                </div>
              </div>
              
              <Link href="/contact" className={styles.viewBtn}>
                ENQUIRE NOW
              </Link>
            </div>
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
            <h3 style={{ fontSize: '2rem', color: '#00122e' }}>No courses found matching your criteria.</h3>
            <p style={{ color: '#64748b', marginTop: '1rem' }}>Try searching for a different keyword or category.</p>
          </div>
        )}
      </section>

      {/* ===== Footer CTA ===== */}
      <section style={{ padding: '8rem 2rem', textAlign: 'center', background: '#00122e', color: 'white' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Tailored Education for You</h2>
        <p style={{ color: '#94a3b8', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto' }}>
          Don't see your target course? Contact our advisors to explore personalized study pathways.
        </p>
        <Link href="/contact" style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '1rem 3rem', borderRadius: '50px', fontWeight: 700, fontSize: '1.1rem' }}>
          TALK TO AN ADVISOR
        </Link>
      </section>
    </main>
  );
}
