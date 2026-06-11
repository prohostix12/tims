'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './course-details.module.css';
import { ArrowLeft, CheckCircle2, GraduationCap, Clock, IndianRupee, BookOpen } from 'lucide-react';
import EnquiryModal from '@/components/EnquiryModal';
import { getCourseData } from './courseData';

// Merge DB program with static fallback so the page always has content to render
function buildCourseView(dbProgram: any, slug: string) {
  const staticData = getCourseData(slug) || getCourseData(slug.replace(/-/g, '_'));
  return {
    heroTitle: dbProgram?.heroTitle || staticData?.heroTitle || dbProgram?.name || '',
    intro: dbProgram?.intro || staticData?.intro || dbProgram?.description || '',
    specializations: (dbProgram?.specializations?.length ? dbProgram.specializations : staticData?.specializations) || [],
    universityName: dbProgram?.university?.name || '',
    universitySlug: dbProgram?.university?.slug || '',
    name: dbProgram?.name || '',
    fee: dbProgram?.fee,
    duration: dbProgram?.duration,
    eligibility: dbProgram?.eligibility || '',
    mode: dbProgram?.mode || dbProgram?.type || '',
  };
}

export default function CourseDetailsPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug ?? '';
  const [courseData, setCourseData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      // Try to load from cache first for instant render
      try {
        const cached = sessionStorage.getItem(`course_${slug}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          const view = buildCourseView(parsed, slug);
          setCourseData(view);
          if (view.specializations.length) setActiveTab(view.specializations[0].id);
        }
      } catch (e) {}

      try {
        const res = await fetch(`/api/courses/${encodeURIComponent(slug)}`);
        if (!res.ok) {
          // API returned error — try static data only
          const staticOnly = getCourseData(slug) || getCourseData(slug.replace(/-/g, '_'));
          if (staticOnly) {
            setCourseData({ heroTitle: staticOnly.heroTitle, intro: staticOnly.intro, specializations: staticOnly.specializations });
            if (staticOnly.specializations.length) setActiveTab(staticOnly.specializations[0].id);
            return;
          }
          if (!sessionStorage.getItem(`course_${slug}`)) {
            throw new Error('Course not found');
          }
          return;
        }
        const data = await res.json();
        const view = buildCourseView(data, slug);
        setCourseData(view);
        if (view.specializations.length) setActiveTab(view.specializations[0].id);
        try { sessionStorage.setItem(`course_${slug}`, JSON.stringify(data)); } catch (e) {}
      } catch (e: any) {
        if (!sessionStorage.getItem(`course_${slug}`)) {
          setError(e.message || 'Failed to load course');
        }
      }
    }
    if (slug) fetchData();
  }, [slug]);


  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Failed to load course</h2>
        <p>{error}</p>
        <Link href="/courses" className={styles.backBtn}>
          <ArrowLeft size={18} /> Back to Courses
        </Link>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading course data…</p>
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

      {/* ===== Quick Info Bar ===== */}
      {(courseData.universityName || courseData.fee || courseData.duration || courseData.eligibility) && (
        <div className={styles.infoBar}>
          {courseData.universityName && (
            <div className={styles.infoItem}>
              <GraduationCap size={18} className={styles.infoIcon} />
              <div>
                <span className={styles.infoLabel}>University</span>
                <span className={styles.infoValue}>{courseData.universityName}</span>
              </div>
            </div>
          )}
          {courseData.duration && (
            <div className={styles.infoItem}>
              <Clock size={18} className={styles.infoIcon} />
              <div>
                <span className={styles.infoLabel}>Duration</span>
                <span className={styles.infoValue}>{courseData.duration}</span>
              </div>
            </div>
          )}
          {courseData.fee && (
            <div className={styles.infoItem}>
              <IndianRupee size={18} className={styles.infoIcon} />
              <div>
                <span className={styles.infoLabel}>Annual Fee</span>
                <span className={styles.infoValue}>₹{Number(courseData.fee).toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}
          {courseData.eligibility && (
            <div className={styles.infoItem}>
              <BookOpen size={18} className={styles.infoIcon} />
              <div>
                <span className={styles.infoLabel}>Eligibility</span>
                <span className={styles.infoValue}>{courseData.eligibility}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== Tab Nav ===== */}
      <nav className={styles.tabNav}>
        <div className={styles.tabInner}>
          {courseData.specializations.map((s: any) => (
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
        {courseData.specializations.map((s: any) => (
          <section key={s.id} id={s.id} className={styles.specSection}>
            <h2 className={styles.specTitle}>{s.title}</h2>
            <p className={styles.specDesc}>{s.description}</p>
            <ul className={styles.jobList}>
              {s.jobs.map((job: string, i: number) => (
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
