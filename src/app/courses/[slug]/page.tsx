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
  Users
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
              duration: data.duration || "24 Months",
              eligibility: data.eligibility || "Bachelor's Degree in relevant field",
              level: data.level || "Advanced Professional",
              description: data.description || `The ${data.name} is a premier academic program designed to equip students with the advanced skills and strategic mindset required in today's competitive global landscape.`,
              highlights: [
                "Industry-aligned curriculum",
                "Expert faculty mentorship",
                "Global networking opportunities",
                "Practical project-based learning"
              ],
              curriculum: [
                "Strategic Management & Leadership",
                "Advanced Analytical Techniques",
                "Organizational Behavior",
                "Global Market Dynamics"
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '1.2rem', color: '#64748b', fontWeight: 600 }}>Loading course details...</p>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Course not found</h2>
        <Link href="/courses" style={{ marginTop: '1rem', color: '#ef233c', textDecoration: 'underline' }}>Back to Courses</Link>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      {/* ===== Hero Section ===== */}
      <section 
        className={styles.heroHeader}
        style={{ backgroundImage: `linear-gradient(rgba(0, 18, 46, 0.6), rgba(0, 18, 46, 0.8)), url('${courseData.image}')` }}
      >
        <div className={styles.heroContent}>
          <p className={styles.heroCrumb}>
            <Link href="/">Home</Link> / <Link href="/courses">Courses</Link> / {courseData.title}
          </p>
          <span className={styles.tag}>{courseData.category}</span>
          <h1 className={styles.title}>{courseData.title}</h1>
        </div>
      </section>

      {/* ===== Content Section ===== */}
      <section className={styles.contentSection}>
        <div className={styles.contentContainer}>
          <div className={styles.grid}>
            
            {/* Main Content */}
            <div className={styles.mainColumn}>
              <h2>Program Overview</h2>
              <p className={styles.description}>
                {courseData.description}
              </p>

              <div className={styles.sectionBox}>
                <h3><Award className={styles.featureIcon} /> Key Highlights</h3>
                <div className={styles.featureList}>
                  {courseData.highlights.map((item, idx) => (
                    <div key={idx} className={styles.featureItem}>
                      <CheckCircle2 size={20} className={styles.featureIcon} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.sectionBox}>
                <h3><BookOpen className={styles.featureIcon} /> Curriculum Preview</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {courseData.curriculum.map((item, idx) => (
                    <div key={idx} style={{ padding: '1.75rem', border: '1.5px solid #f1f5f9', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '20px', color: '#00122e', fontWeight: 700, fontSize: '1.1rem' }}>
                      <span style={{ width: '36px', height: '36px', background: '#00122e', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>{idx + 1}</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>Program Essentials</h3>
                
                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}><Clock size={18} /> Duration</div>
                  <div className={styles.infoValue}>{courseData.duration}</div>
                </div>
                
                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}><GraduationCap size={18} /> Level</div>
                  <div className={styles.infoValue}>{courseData.level}</div>
                </div>
                
                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}><Users size={18} /> Eligibility</div>
                  <div className={styles.infoValue}>{courseData.eligibility}</div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}><Calendar size={18} /> Intake</div>
                  <div className={styles.infoValue}>Rolling Enrollment</div>
                </div>

                <button 
                  onClick={() => setIsModalOpen(true)}
                  className={styles.enquireBtn}
                  style={{ width: '100%', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  ENQUIRE NOW
                </button>
                
                <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>
                  * Academic scholarships available
                </p>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ===== Institutional Footer CTA ===== */}
      <section style={{ padding: '8rem 0', backgroundColor: '#000000', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 5%' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#ffffff', fontWeight: 900, marginBottom: '1.5rem' }}>Ready to Take the Next Step?</h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '3rem', lineHeight: 1.6 }}>
            Our admissions team is here to guide you through the enrollment process and answer any questions about the {courseData.title} program.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{ background: '#ef233c', color: 'white', padding: '1.25rem 3rem', borderRadius: '50px', fontWeight: 900, textDecoration: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.3s ease' }}>
              CONTACT ADMISSIONS
            </button>
            <Link href="/universities" style={{ border: '2px solid #ffffff', color: '#ffffff', padding: '1.25rem 3rem', borderRadius: '50px', fontWeight: 900, textDecoration: 'none', transition: 'all 0.3s ease' }}>
              BROWSE UNIVERSITIES
            </Link>
          </div>
        </div>
      </section>

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
