'use client';

import React from 'react';
import Link from 'next/link';
import styles from '../sslc/sslc.module.css';
import { 
  BookOpen, 
  CheckCircle2, 
  ArrowLeft, 
  FileText, 
  GraduationCap, 
  ShieldCheck, 
  Award,
  Calendar,
  UserCheck
} from 'lucide-react';

export default function PlusTwoPage() {
  const [isExpanded1, setIsExpanded1] = React.useState(false);
  const [isExpanded2, setIsExpanded2] = React.useState(false);
  const [isExpanded3, setIsExpanded3] = React.useState(false);
  const [isExpandedValue, setIsExpandedValue] = React.useState(false);
  const [isExpandedSenior, setIsExpandedSenior] = React.useState(false);

  const stream1Text = "Students who have passed SSLC / Class 10th from any recognized board can take direct admission to Class 12th (Plus Two / Senior Secondary) through the NIOS board under Stream 1. This stream is designed for learners who wish to pursue higher secondary education in a flexible, open learning environment. TIMS counselors will guide you through the entire admission process and help you prepare for the board examinations with expert coaching and study materials.";

  const stream2Text = "This stream is for students who have failed in the Plus Two / Class 12th board exams from CBSE or any other recognized state board in India. Under NIOS Stream 2, a student who has failed in board exams can appear again within the same year only for the failed subjects. Under the credit transfer scheme of NIOS, subjects in which the student has passed (maximum 2 subjects) are transferred to the NIOS board, so the student only needs to appear in the failed subjects. This saves a precious academic year and allows students to move forward without delay.";

  const stream3Text = "NIOS On-Demand Examination (ODE) is available under Streams 3 and 4 for Plus Two students. This facility allows students to appear for examinations at their own convenience throughout the year, rather than waiting for the scheduled board exam dates. It is ideal for students who need to complete their Plus Two quickly or who have specific timing requirements due to employment, health, or other personal reasons. TIMS provides complete guidance and preparation support for ODE students.";

  const valueText = "The NIOS Senior Secondary (Plus Two) certificate is recognized by all central and state government bodies, universities, and institutions across India. It is equivalent to the CBSE Class 12 certificate and is accepted for admission to undergraduate courses in arts, science, and commerce streams. Students with NIOS Plus Two certificates are eligible to apply for central and state government jobs, professional entrance exams (NEET, JEE, etc.), and higher education programs both in India and abroad.";

  const seniorText = "Students who have completed Class 10 (SSLC) or equivalent can apply for the NIOS Senior Secondary (Plus Two) course. There is no upper age limit. The course offers subjects across Science, Commerce, and Humanities streams. Students must select 5 subjects including at least one language. Examinations can be written in English, Hindi, or regional languages. Students who complete this course are eligible for undergraduate admissions, government employment, and professional entrance examinations.";

  return (
    <main className={styles.container}>
      {/* ===== Hero Section ===== */}
      <section className={styles.heroHeader}>
        <div className={styles.heroContent}>
          <Link href="/courses" className={styles.backLink} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', fontWeight: 700 }}>
            <ArrowLeft size={18} /> BACK TO DIRECTORY
          </Link>
          <span className={styles.tag}>Senior Secondary Education</span>
          <h1 className={styles.title}>Plus Two / Senior Secondary Certificate (NIOS)</h1>
        </div>
      </section>

      {/* ===== Introduction Section ===== */}
      <section className={styles.section}>
        <div className={styles.contentContainer}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className={styles.mainColumn}>
              <h2 className={styles.sectionTitle}>ABOUT PLUS TWO (SENIOR SECONDARY)</h2>
              <div className={styles.description}>
                <p style={{ marginBottom: '1.5rem' }}>
                  The National Institute of Open Schooling (NIOS) offers the Senior Secondary Certificate (equivalent to Plus Two / Class 12) through its open and distance learning system. NIOS is an autonomous board under the Ministry of Education, Government of India, and its certificates are recognized by all universities, government bodies, and institutions across the country.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  The NIOS Plus Two program is designed for students who wish to complete their higher secondary education with maximum flexibility — whether they are working professionals, students who faced setbacks in regular schooling, or those seeking an alternative pathway to higher education.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  TIMS (Tirur Institute of Management Studies) is an authorized NIOS Academic Study Centre that provides complete support for Plus Two admissions, coaching, assignments, practicals, and board exam preparation.
                </p>
                <ul style={{ listStyle: 'none', padding: '0 0 2rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%' }}></div> Flexible subject selection across Science, Commerce, and Humanities</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%' }}></div> Up to 9 attempts over 5 years to clear all subjects</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%' }}></div> Credit transfer facility for students from other boards</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%' }}></div> On-Demand Examination available throughout the year</li>
                </ul>
              </div>

              {/* Admission Stream - 1 */}
              <div style={{ marginTop: '6rem', padding: '2rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '2.2rem', color: '#00122e', fontWeight: 800, marginBottom: '2rem' }}>
                      Admission Stream-1: Direct Plus Two Admission
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8, margin: 0 }}>
                      {isExpanded1 ? stream1Text : `${stream1Text.slice(0, 250)}...`}
                    </p>
                    <button onClick={() => setIsExpanded1(!isExpanded1)} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 800, cursor: 'pointer', marginTop: '1rem', padding: 0 }}>
                      {isExpanded1 ? 'See Less' : 'See More...'}
                    </button>
                  </div>
                  <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                    <img src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Plus Two study" style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                </div>
              </div>

              {/* Admission Stream - 2 */}
              <div style={{ marginTop: '4rem', padding: '2rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'flex-start' }}>
                  <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                    <img src="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Books" style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '2.2rem', color: '#00122e', fontWeight: 800, marginBottom: '2rem' }}>
                      Admission Stream-2: For Failed Plus Two Students
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8, margin: 0 }}>
                      {isExpanded2 ? stream2Text : `${stream2Text.slice(0, 250)}...`}
                    </p>
                    <button onClick={() => setIsExpanded2(!isExpanded2)} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 800, cursor: 'pointer', marginTop: '1rem', padding: 0 }}>
                      {isExpanded2 ? 'See Less' : 'See More...'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Admission Stream - 3 & 4 */}
              <div style={{ marginTop: '4rem', padding: '2rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '2.2rem', color: '#00122e', fontWeight: 800, marginBottom: '2rem' }}>
                      Admission Stream-3 & 4: On-Demand Examination
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8, margin: 0 }}>
                      {isExpanded3 ? stream3Text : `${stream3Text.slice(0, 250)}...`}
                    </p>
                    <button onClick={() => setIsExpanded3(!isExpanded3)} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 800, cursor: 'pointer', marginTop: '1rem', padding: 0 }}>
                      {isExpanded3 ? 'See Less' : 'See More...'}
                    </button>
                  </div>
                  <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                    <img src="https://images.pexels.com/photos/5905713/pexels-photo-5905713.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Exam" style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                </div>
              </div>

              {/* Value of Certificate */}
              <div style={{ marginTop: '4rem', padding: '2rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'flex-start' }}>
                  <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                    <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Graduation" style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '2.2rem', color: '#00122e', fontWeight: 800, marginBottom: '2rem' }}>
                      Value of NIOS Plus Two Certificate
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8, margin: 0 }}>
                      {isExpandedValue ? valueText : `${valueText.slice(0, 250)}...`}
                    </p>
                    <button onClick={() => setIsExpandedValue(!isExpandedValue)} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 800, cursor: 'pointer', marginTop: '1rem', padding: 0 }}>
                      {isExpandedValue ? 'See Less' : 'See More...'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Senior Secondary Course Details */}
              <div style={{ marginTop: '4rem', padding: '2rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '2.2rem', color: '#00122e', fontWeight: 800, marginBottom: '2rem' }}>
                      PLUS TWO (SENIOR SECONDARY COURSE)
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8, margin: 0 }}>
                      {isExpandedSenior ? seniorText : `${seniorText.slice(0, 250)}...`}
                    </p>
                    <button onClick={() => setIsExpandedSenior(!isExpandedSenior)} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 800, cursor: 'pointer', marginTop: '1rem', padding: 0 }}>
                      {isExpandedSenior ? 'See Less' : 'See More...'}
                    </button>
                  </div>
                  <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                    <img src="https://images.pexels.com/photos/5905700/pexels-photo-5905700.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Study" style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                </div>
              </div>

              {/* Additional Facilities */}
              <div style={{ marginTop: '8rem', paddingBottom: '6rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 800, letterSpacing: '4px', fontSize: '0.9rem', textTransform: 'uppercase' }}>Enhanced Support</span>
                  <h2 style={{ fontSize: '3rem', color: '#00122e', fontWeight: 900, marginTop: '1rem', letterSpacing: '-1.5px' }}>Additional Facilities</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '3rem' }}>
                  <div style={{ background: '#f8fafc', padding: '4rem', borderRadius: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', color: 'var(--accent)' }}>
                      <CheckCircle2 size={32} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '2rem', color: '#00122e', fontWeight: 800, marginBottom: '1.5rem' }}>Transfer of Credit (TOC)</h3>
                      <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8, margin: 0 }}>
                        Students who have failed in Plus Two from other boards can transfer marks for up to two passed subjects to NIOS. This means you only need to appear for the remaining failed subjects, saving your academic year and reducing exam burden significantly.
                      </p>
                    </div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '4rem', borderRadius: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', color: 'var(--accent)' }}>
                      <BookOpen size={32} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '2rem', color: '#00122e', fontWeight: 800, marginBottom: '1.5rem' }}>Subject Flexibility</h3>
                      <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8, margin: 0 }}>
                        Choose from Science, Commerce, or Humanities streams. You can change or add subjects within the first four years of your five-year admission window, ensuring your certificate aligns with your career goals and university requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* HOW TIMS HELPS */}
              <div style={{ marginTop: '6rem', padding: '2rem 0' }}>
                <h3 style={{ fontSize: '2.2rem', color: '#00122e', fontWeight: 800, marginBottom: '2rem' }}>HOW YOU ARE HELPED BY TIMS</h3>
                <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8, margin: 0 }}>
                  Both SSLC and Plus Two can be done as correspondence courses — part time or as distance education. After course registration, expert-designed study materials for your selected subjects will be delivered to you. TIMS provides 24 contact classes on Sundays for Plus Two NIOS board students in all batches. Our expert faculty offers coaching at our centers, and we provide sample papers, previous year question papers, and test series for all subjects. TIMS also assists students in preparing required Assignments, Records, and Practical works for both SSLC and Plus Two correspondence programs.
                </p>
              </div>

              {/* Documents Required */}
              <div style={{ marginTop: '8rem', padding: '4rem', background: '#f8fafc', borderRadius: '32px', border: '1px solid #e2e8f0' }}>
                <h2 style={{ fontSize: '2.2rem', color: '#00122e', fontWeight: 900, marginBottom: '3rem', letterSpacing: '-1px' }}>
                  DOCUMENTS REQUIRED FOR PLUS TWO ADMISSION
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {[
                      "Recent Passport Size Color Photograph",
                      "Scanned Signature (Black Ink)",
                      "Valid Identity Proof (Aadhaar Card/Passport)",
                      "Proof of Date of Birth (Birth Certificate/Aadhaar)"
                    ].map((doc, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(196, 30, 58, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <CheckCircle2 size={14} color="var(--accent)" />
                        </div>
                        <span style={{ color: '#64748b', fontSize: '1.05rem', fontWeight: 600 }}>{doc}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {[
                      "SSLC / Class 10 Marksheet & Certificate",
                      "Address Proof (Aadhaar/Utility Bill/Voter ID)",
                      "Social Category Certificate (SC/ST/OBC if applicable)",
                      "Original Marksheet (For TOC/Credit Transfer)"
                    ].map((doc, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(196, 30, 58, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <CheckCircle2 size={14} color="var(--accent)" />
                        </div>
                        <span style={{ color: '#64748b', fontSize: '1.05rem', fontWeight: 600 }}>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Official Recognitions */}
              <div style={{ marginTop: '8rem', paddingBottom: '6rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 800, letterSpacing: '4px', fontSize: '0.9rem', textTransform: 'uppercase' }}>Institutional Validity</span>
                  <h2 style={{ fontSize: '3rem', color: '#00122e', fontWeight: 900, marginTop: '1rem', letterSpacing: '-1.5px' }}>Official Recognitions & Gazettes</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                  {[
                    { title: "Gazette For NOS", url: "https://timseducation.com/wp-content/uploads/2024/11/gazettefornos.pdf" },
                    { title: "NCTE Recognition Order", url: "https://timseducation.com/wp-content/uploads/2024/11/gazettefornos.pdf" },
                    { title: "NIOS Equivalence Letter", url: "https://timseducation.com/wp-content/uploads/2024/11/NIOS-Equivalence-letter-1.pdf" },
                    { title: "NIOS in Gazette of India", url: "https://timseducation.com/wp-content/uploads/2024/11/gazettefornos-1.pdf" },
                    { title: "SOS Office Memorandum", url: "https://timseducation.com/wp-content/uploads/2024/11/SOSofficememorandum.pdf" },
                    { title: "TN Govt Order", url: "https://timseducation.com/wp-content/uploads/2024/11/TNgovt.pdf" },
                    { title: "UEB Cancellation Letter", url: "https://timseducation.com/wp-content/uploads/2024/11/UEBcancellationletter.pdf" }
                  ].map((item, i) => (
                    <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', flexDirection: 'column', padding: '2.5rem', background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', textDecoration: 'none', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative', overflow: 'hidden' }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(196, 30, 58, 0.08)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(196, 30, 58, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--accent)' }}>
                        <FileText size={24} />
                      </div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#00122e', marginBottom: '0.75rem', lineHeight: 1.3 }}>{item.title}</h3>
                      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Official government document for NIOS/Plus Two accreditation.</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: 800, fontSize: '0.9rem' }}>
                        VIEW <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
                      </div>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent)', opacity: 0.8 }}></div>
                    </a>
                  ))}
                </div>
              </div>

              <div className={styles.infoBox}>
                <h3 style={{ fontSize: '1.5rem', color: '#00122e', fontWeight: 800, marginBottom: '2rem' }}>Why Choose Our Plus Two Program?</h3>
                <div className={styles.featureList}>
                  <div className={styles.featureItem}><ShieldCheck className={styles.featureIcon} /> Government Recognized</div>
                  <div className={styles.featureItem}><GraduationCap className={styles.featureIcon} /> University Accepted</div>
                  <div className={styles.featureItem}><Calendar className={styles.featureIcon} /> Flexible Schedule</div>
                  <div className={styles.featureItem}><Award className={styles.featureIcon} /> CBSE Equivalent</div>
                  <div className={styles.featureItem}><UserCheck className={styles.featureIcon} /> Expert Counseling</div>
                  <div className={styles.featureItem}><BookOpen className={styles.featureIcon} /> Study Materials Provided</div>
                </div>
                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                  <Link href="/contact" style={{ display: 'inline-block', background: 'var(--accent)', color: 'white', padding: '1.25rem 3rem', borderRadius: '50px', fontWeight: 900, textDecoration: 'none', fontSize: '1rem', letterSpacing: '1px', transition: 'all 0.3s ease' }}>
                    ENQUIRE NOW
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
