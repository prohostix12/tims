'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './course-details.module.css';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import EnquiryModal from '@/components/EnquiryModal';
import { getCourseData } from './courseData';

export default function CourseDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const courseData = getCourseData(slug);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('');

  React.useEffect(() => {
    if (courseData && courseData.specializations.length > 0) {
      setActiveTab(courseData.specializations[0].id);
    }
  }, [slug]);

  if (!courseData) {
    return (
      <div className={styles.errorContainer}>
        <h2>Course Profile Not Found</h2>
        <p>The program you are looking for might have been moved or renamed.</p>
        <Link href="/courses" className={styles.backBtn}>
          <ArrowLeft size={18} /> Back to Courses
        </Link>
      </div>
    );
  }

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 90;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <main className={styles.container}>
      {/* ===== Hero ===== */}
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <h1 className={styles.mainTitle}>{courseData.heroTitle}</h1>
          <p className={styles.heroIntro}>{courseData.intro}</p>
          <button className={styles.heroBtn} onClick={() => setIsModalOpen(true)}>
            Enquire Now
          </button>
        </div>
      </section>

      {/* ===== Tab Nav ===== */}
      <nav className={styles.tabNav}>
        <div className={styles.tabInner}>
          {courseData.specializations.map((s) => (
            <button
              key={s.id}
              className={`${styles.tabBtn} ${activeTab === s.id ? styles.tabBtnActive : ''}`}
              onClick={() => scrollToSection(s.id)}
            >
              {s.title}
            </button>
          ))}
        </div>
      </nav>

      {/* ===== Content ===== */}
      <div className={styles.contentWrapper}>
        {courseData.specializations.map((s) => (
          <section key={s.id} id={s.id} className={styles.specSection}>
            <h2 className={styles.specTitle}>{s.title}</h2>
            <p className={styles.specDesc}>{s.description}</p>
            <ul className={styles.jobList}>
              {s.jobs.map((job, i) => (
                <li key={i} className={styles.jobItem}>
                  <CheckCircle2 size={18} className={styles.checkIcon} />
                  <span>{job}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* ===== CTA ===== */}
        <div className={styles.ctaBox}>
          <h3 className={styles.ctaTitle}>Not sure which course suits you?</h3>
          <p className={styles.ctaText}>
            Our academic counsellors help you choose the right university and programme based on your goals and budget — completely free.
          </p>
          <button className={styles.ctaBtn} onClick={() => setIsModalOpen(true)}>
            Get Free Guidance
          </button>
        </div>
      </div>

      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Get Free Career Guidance"
        interest={courseData.heroTitle}
        source="Course Details Page"
      />
    </main>
  );
}
