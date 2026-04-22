'use client';

import { useState } from 'react';
import styles from './courses.module.css';
import Link from 'next/link';
import { Search, GraduationCap, Clock, BookOpen, ArrowRight } from 'lucide-react';

const CourseCard = ({ course, i }: { course: any, i: number }) => {
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
        <img src={course.image} alt={course.title} />
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
        {course.description.length > 100 && (
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
          <Link href="/contact" className={styles.viewBtn}>
            ENQUIRE NOW
          </Link>
          <Link href={course.path || `/courses/${course.title.toLowerCase().replace(/ /g, '-')}`} className={styles.detailsBtn}>
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

  const categories = ['All', 'SSLC', '+2', 'Degree', 'Post Graduate', 'Diploma', 'Others'];

  const courses = [
    {
      title: "Master of Business Administration (MBA)",
      category: "Post Graduate",
      level: "Management",
      duration: "2 Years",
      eligibility: "Any Degree",
      description: "Comprehensive management program covering Strategic Planning, Finance, and Global Operations.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "B.Tech in Computer Science",
      category: "Degree",
      level: "Engineering",
      duration: "4 Years",
      eligibility: "12th Science",
      description: "Advanced engineering course focusing on Software Development, AI, and Systems Architecture.",
      image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "Plus Two Science / Commerce",
      category: "+2",
      level: "Secondary",
      duration: "2 Years",
      eligibility: "SSLC / 10th",
      description: "Higher secondary education with a focus on core subjects for university preparation.",
      image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "Secondary School Leaving Certificate",
      category: "SSLC",
      level: "Primary",
      duration: "1 Year",
      eligibility: "9th Standard",
      description: "Fundamental secondary education leading to the SSLC certification.",
      image: "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=800",
      path: "/courses/sslc"
    },
    {
      title: "Executive Diploma in Marketing",
      category: "Diploma",
      level: "Professional",
      duration: "1 Year",
      eligibility: "12th Pass",
      description: "Fast-track professional diploma focusing on digital marketing and sales strategies.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "M.Sc in Information Technology",
      category: "Post Graduate",
      level: "Science",
      duration: "2 Years",
      eligibility: "B.Sc / BCA",
      description: "Technical mastery in Network Security, Data Science, and Cloud Platforms.",
      image: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "Bachelor of Business Administration (BBA)",
      category: "Degree",
      level: "Management",
      duration: "3 Years",
      eligibility: "12th Pass",
      description: "Foundational business degree exploring Marketing, Human Resources, and Entrepreneurship.",
      image: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800"
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
          <h1 className={styles.heroTitle}>Courses</h1>
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
          <div className={styles.coursesGrid}>
            {filteredCourses.slice(0, visibleCount).map((course, i) => (
              <CourseCard key={i} course={course} i={i} />
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
          <Link href="/contact" style={{ background: 'var(--accent)', color: 'white', padding: '1.25rem 3.5rem', borderRadius: '50px', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '1px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            CONSULT AN ADVISOR <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
