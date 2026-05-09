
'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './course-details.module.css';
import { 
  GraduationCap, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  ArrowLeft,
  Calendar,
  Award,
  Users,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import EnquiryModal from '@/components/EnquiryModal';

interface CourseData {
  title: string;
  image: string;
  category: string;
  duration: string;
  eligibility: string;
  level: string;
  description: string;
  highlights: string[];
  curriculum: string[];
}

export default function CourseDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [courseData, setCourseData] = React.useState<CourseData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (slug) {
      fetch(`/api/admin/programs/${slug}`)
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setCourseData({
              title: data.name,
              image: data.image || "https://images.unsplash.com/photo-1523050853063-bd8012fec046?q=80&w=1200",
              category: data.category || 'Program',
              duration: data.duration || "Not specified",
              eligibility: data.eligibility || "Contact admissions for details",
              level: data.level || "Professional",
              description: data.description || `Explore the comprehensive curriculum and global opportunities offered by the ${data.name} program at TIMS.`,
              highlights: (Array.isArray(data.highlights) && data.highlights.length > 0) ? data.highlights : [
                "Nationally Recognized Certification",
                "Flexible Learning Schedule",
                "Expert Faculty Support",
                "Career-Focused Curriculum"
              ],
              curriculum: (Array.isArray(data.curriculum) && data.curriculum.length > 0) ? data.curriculum : [
                "Foundational Concepts",
                "Advanced Methodologies",
                "Practical Case Studies",
                "Final Project & Assessment"
              ]
            });
          }
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading course details...</p>
      </div>
    );
  }

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

  return (
    <main className={styles.container}>
      {/* ===== Page Header ===== */}
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link> <ChevronRight size={14} /> 
            <Link href="/courses">Courses</Link> <ChevronRight size={14} /> 
            <span>{courseData.title}</span>
          </div>
          <span className={styles.categoryBadge}>{courseData.category}</span>
          <h1 className={styles.mainTitle}>{courseData.title}</h1>
        </div>
      </section>

      {/* ===== Main Content ===== */}
      <div className={styles.contentWrapper}>
        <div className={styles.mainGrid}>
          
          {/* Left: Course Info */}
          <div className={styles.leftCol}>
            <div className={styles.glassCard}>
              <h2 className={styles.sectionHeading}>Program Overview</h2>
              <p className={styles.courseDescription}>{courseData.description}</p>
              
              <div className={styles.highlightsGrid}>
                {courseData.highlights.map((h, i) => (
                  <div key={i} className={styles.highlightItem}>
                    <CheckCircle2 size={20} className={styles.checkIcon} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.glassCard} style={{ marginTop: '2rem' }}>
              <h2 className={styles.sectionHeading}><BookOpen size={24} style={{ marginRight: '10px' }} /> Curriculum Preview</h2>
              <div className={styles.curriculumList}>
                {courseData.curriculum.map((c, i) => (
                  <div key={i} className={styles.curriculumItem}>
                    <span className={styles.stepNum}>{i + 1}</span>
                    <span className={styles.stepText}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sidebar Stats */}
          <aside className={styles.sidebar}>
            <div className={styles.stickySidebar}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoCardTitle}>Quick Facts</h3>
                
                <div className={styles.factRow}>
                  <div className={styles.factIcon}><Clock size={20} /></div>
                  <div className={styles.factContent}>
                    <span className={styles.factLabel}>Duration</span>
                    <span className={styles.factValue}>{courseData.duration}</span>
                  </div>
                </div>

                <div className={styles.factRow}>
                  <div className={styles.factIcon}><GraduationCap size={20} /></div>
                  <div className={styles.factContent}>
                    <span className={styles.factLabel}>Level</span>
                    <span className={styles.factValue}>{courseData.level}</span>
                  </div>
                </div>

                <div className={styles.factRow}>
                  <div className={styles.factIcon}><Users size={20} /></div>
                  <div className={styles.factContent}>
                    <span className={styles.factLabel}>Eligibility</span>
                    <span className={styles.factValue}>{courseData.eligibility}</span>
                  </div>
                </div>

                <div className={styles.factRow}>
                  <div className={styles.factIcon}><ShieldCheck size={20} /></div>
                  <div className={styles.factContent}>
                    <span className={styles.factLabel}>Recognition</span>
                    <span className={styles.factValue}>UGC-DEB Approved</span>
                  </div>
                </div>

                <button className={styles.enquireBtn} onClick={() => setIsModalOpen(true)}>
                  Enquire Now
                </button>
              </div>

              <div className={styles.supportCard}>
                <h4>Need Help?</h4>
                <p>Speak to our academic counselors for personalized guidance.</p>
                <a href="tel:+919961967777" className={styles.callBtn}>
                  Call +91 9961967777
                </a>
              </div>
            </div>
          </aside>

        </div>
      </div>

      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={`Enquire about ${courseData.title}`}
        interest={courseData.title}
        source="Course Details Page"
      />
    </main>
  );
}
