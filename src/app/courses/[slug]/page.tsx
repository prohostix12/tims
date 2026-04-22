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

export default function CourseDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  // Format slug back to title for display
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // Mock course data lookup
  // Mock course data lookup (simplified for demonstration)
  const courseImages: { [key: string]: string } = {
    'master-of-business-administration-(mba)': "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200",
    'b.tech-in-computer-science': "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200",
    'plus-two-science-/-commerce': "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1200",
    'secondary-school-leaving-certificate': "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1200",
    'executive-diploma-in-marketing': "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200",
    'm.sc-in-information-technology': "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=1200",
    'bachelor-of-business-administration-(bba)': "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1200"
  };

  const courseData = {
    title: title,
    image: courseImages[slug] || "https://images.unsplash.com/photo-1523050853063-bd8012fec046?q=80&w=1200",
    category: title.includes('MBA') || title.includes('M.Sc') ? 'Post Graduate' : 'Undergraduate',
    duration: "24 Months",
    eligibility: "Bachelor's Degree in relevant field",
    level: "Advanced Professional",
    description: `The ${title} is a premier academic program designed to equip students with the advanced skills and strategic mindset required in today's competitive global landscape. This curriculum blends theoretical foundations with practical, industry-aligned case studies to ensure graduates are ready for high-impact leadership roles.`,
    highlights: [
      "Industry-aligned curriculum",
      "Expert faculty mentorship",
      "Global networking opportunities",
      "Practical project-based learning",
      "Comprehensive career support",
      "Accredited certification"
    ],
    curriculum: [
      "Strategic Management & Leadership",
      "Advanced Analytical Techniques",
      "Organizational Behavior",
      "Global Market Dynamics",
      "Digital Transformation Strategies"
    ]
  };

  return (
    <main className={styles.container}>
      {/* ===== Hero Section ===== */}
      <section 
        className={styles.heroHeader}
        style={{ backgroundImage: `linear-gradient(rgba(0, 18, 46, 0.6), rgba(0, 18, 46, 0.8)), url('${courseData.image}')` }}
      >
        <div className={styles.heroContent}>
          <Link href="/courses" className={styles.backLink}>
            <ArrowLeft size={18} /> BACK TO DIRECTORY
          </Link>
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

                <Link href="/contact" className={styles.enquireBtn}>
                  ENQUIRE NOW
                </Link>
                
                <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>
                  * Academic scholarships available
                </p>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ===== Institutional Footer CTA ===== */}
      <section style={{ padding: '8rem 0', backgroundColor: '#f8fafc', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 5%' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#00122e', fontWeight: 900, marginBottom: '1.5rem' }}>Ready to Take the Next Step?</h2>
          <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '3rem', lineHeight: 1.6 }}>
            Our admissions team is here to guide you through the enrollment process and answer any questions about the {courseData.title} program.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link href="/contact" style={{ background: '#00122e', color: 'white', padding: '1.25rem 3rem', borderRadius: '50px', fontWeight: 900, textDecoration: 'none' }}>
              CONTACT ADMISSIONS
            </Link>
            <Link href="/universities" style={{ border: '2px solid #00122e', color: '#00122e', padding: '1.25rem 3rem', borderRadius: '50px', fontWeight: 900, textDecoration: 'none' }}>
              BROWSE UNIVERSITIES
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
