'use client';

import React from 'react';
import Link from 'next/link';
import styles from './sslc.module.css';
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

export default function SSLCPage() {
  const [isExpanded1, setIsExpanded1] = React.useState(false);
  const [isExpanded2, setIsExpanded2] = React.useState(false);
  const [isExpanded3, setIsExpanded3] = React.useState(false);
  const [isExpandedValue, setIsExpandedValue] = React.useState(false);
  const [isExpandedSecondary, setIsExpandedSecondary] = React.useState(false);

  const stream1Text = "If you were a regular school student who faced setbacks in Class 9th, you can take direct admission to Class 10th (SSLC) through the NIOS board. This stream is specifically designed to provide a secondary academic pathway for students who need a flexible and supportive environment to complete their schooling. If you want to take admission contact us immediately; our counselors will help you in your admission procedure and classes for board exam preparation.";
  
  const stream2Text = "This stream is only for the students failed in board exams of class 10th and 12th from cbse board or any other recognized state board in india. If you have failed in board exam of class 10th and 12th then according to the rules, you can appear again the next year from the same board. In this every student's one precious year is lost as he/she has to re-appear in the next year for the same exam for all the subjects even if he/she has passed in 2 or more subjects. Nios admission stream-2 is the way to save the precious year as under this stream a student failed from any recognized board can appear in board exams of class 10th or 12th within the same year only in failed subjects. Under the credit transfer scheme of nios the subjects in which the student is passed are transferred to nios board(maximum 2 sujects) so that the student has to appear in failed subjects only within the same year.";

  const stream3Text = "This stream is only for the students failed in board exams of class 10th and 12th from cbse board or any other recognized state board in india. If you have failed in board exam of class 10th and 12th then according to the rules, you can appear again the next year from the same board. In this every student's one precious year is lost as he/she has to re-appear in the next year for the same exam for all the subjects even if he/she has passed in 2 or more subjects. Nios admission stream-2 is the way to save the precious year as under this stream a student failed from any recognized board can appear in board exams of class 10th or 12th within the same year only in failed subjects. Under the credit transfer scheme of nios the subjects in which the student is passed are transferred to nios board(maximum 2 sujects) so that the student has to appear in failed subjects only within the same year.";

  const valueText = "NIOS Is an autonomous board under hr ministry, government of india. So the certificates of pass issued for nios 10th standard exams is merited equal to central board of secondary education. All the states of india have recognized these certificates issued to academia study center students. Those passing 10th class can join any school in india for 11th class for further studies in any faculty courses for a bright future, opened up by academia study center. They Can Get Employment In State And Central Government Vacancies (PSC,UPSC), As Equal To Other Candidates Of Formal Schooling.";

  const secondaryText = "Those who had completed 14 years in age can apply. There is no age limit for this course. There will be 13 subjects including multi languages. Of these, every student can select 5 subjects. 2 languages are compulsory and the other 3 subjects are free to choose. These three exams can be written either in English or in Malayalam. Students who complete this course successfully are eligible to apply for both state and central government jobs";

  return (
    <main className={styles.container}>
      {/* ===== Hero Section ===== */}
      <section className={styles.heroHeader}>
        <div className={styles.heroContent}>
          <Link href="/courses" className={styles.backLink} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', fontWeight: 700 }}>
            <ArrowLeft size={18} /> BACK TO DIRECTORY
          </Link>
          <span className={styles.tag}>Secondary Education</span>
          <h1 className={styles.title}>Secondary School Leaving Certificate (SSLC)</h1>
        </div>
      </section>

      {/* ===== Introduction Section ===== */}
      <section className={styles.section}>
        <div className={styles.contentContainer}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className={styles.mainColumn}>
              <h2 className={styles.sectionTitle}>ABOUT SSLC</h2>
              <div className={styles.description}>
                <p style={{ marginBottom: '1.5rem' }}>
                  NIOS is “Open School” to cater to the needs of a heterogeneous group of learners up to pre-degree level. It was started as a project with in-built flexibilities by the Central Board of Secondary Education (CBSE) in 1979. In 1986, the National Policy on Education suggested strengthening of Open School System for extending open learning facilities in a phased manner at secondary level all over the country as an independent system with its own curriculum and examination leading to certification.
                </p>
                
                <p style={{ marginBottom: '1.5rem' }}>
                  Consequently, the Ministry of Human Resource Development (MHRD), Government of India set up the National Open School (NOS) in November 1989. The pilot project of CBSE on Open School was amalgamated with NOS. Through a Resolution, the National Open School (NOS) was vested with the authority to register, examine and certify students registered with it up to pre-degree level courses.
                </p>

                <p style={{ marginBottom: '1.5rem' }}>
                  In July 2002, the Ministry of Human Resource Development amended the nomenclature of the organisation from the National Open School (NOS) to the National Institute of Open Schooling (NIOS) with a mission to provide relevant continuing education at school stage, up to pre-degree level through Open Learning system. This system aims:
                </p>
                
                <ul style={{ listStyle: 'none', padding: '0 0 2rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%' }}></div> To universalisation of education</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%' }}></div> To greater equity and justice in society</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%' }}></div> To the evolution of a learning society</li>
                </ul>

                <p style={{ marginBottom: '1.5rem' }}>
                  At the Secondary and Senior Secondary levels, NIOS provides flexibility in the choice of subjects/courses, pace of learning, and transfer of credits from CBSE, some Board of School Education and State Open Schools to enable learner’s continuation. A learner is extended as many as nine chances to appear in public examinations spread over a period of five years.
                </p>

                <p>
                  The learning strategies include; learning through printed self-instructional material, audio and video programmes, participating in personal contact programme (PCP), and Tutor Marked Assignments (TMA).
                </p>
              </div>

              {/* Admission Stream - 1 */}
              <div style={{ marginTop: '6rem', padding: '2rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '2.2rem', color: '#00122e', fontWeight: 800, marginBottom: '2rem' }}>
                      Admission Stream -1: For SSLC
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8, margin: 0 }}>
                      {isExpanded1 ? stream1Text : `${stream1Text.slice(0, 250)}...`}
                    </p>
                    <button 
                      onClick={() => setIsExpanded1(!isExpanded1)}
                      style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 800, cursor: 'pointer', marginTop: '1rem', padding: 0 }}
                    >
                      {isExpanded1 ? 'See Less' : 'See More...'}
                    </button>
                  </div>
                  <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                    <img 
                      src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800" 
                      alt="Study concept" 
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>
                </div>
              </div>

              {/* Admission Stream - 2 */}
              <div style={{ marginTop: '4rem', padding: '2rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'flex-start' }}>
                  <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                    <img 
                      src="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=800" 
                      alt="Academic success concept" 
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '2.2rem', color: '#00122e', fontWeight: 800, marginBottom: '2rem' }}>
                      Admission Stream-2: For SSLC & Plus Two
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8, margin: 0 }}>
                      {isExpanded2 ? stream2Text : `${stream2Text.slice(0, 250)}...`}
                    </p>
                    <button 
                      onClick={() => setIsExpanded2(!isExpanded2)}
                      style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 800, cursor: 'pointer', marginTop: '1rem', padding: 0 }}
                    >
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
                      Admission Stream- 3&4(Nios On Demand Exam)
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8, margin: 0 }}>
                      {isExpanded3 ? stream3Text : `${stream3Text.slice(0, 250)}...`}
                    </p>
                    <button 
                      onClick={() => setIsExpanded3(!isExpanded3)}
                      style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 800, cursor: 'pointer', marginTop: '1rem', padding: 0 }}
                    >
                      {isExpanded3 ? 'See Less' : 'See More...'}
                    </button>
                  </div>
                  <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                    <img 
                      src="https://images.pexels.com/photos/5905713/pexels-photo-5905713.jpeg?auto=compress&cs=tinysrgb&w=800" 
                      alt="On-demand exam student" 
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>
                </div>
              </div>

              {/* Value of NIOS Certificates */}
              <div style={{ marginTop: '4rem', padding: '2rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'flex-start' }}>
                  <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                    <img 
                      src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800" 
                      alt="Graduation success" 
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '2.2rem', color: '#00122e', fontWeight: 800, marginBottom: '2rem' }}>
                      Value Of NIOS Board SSLC Certificate
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8, margin: 0 }}>
                      {isExpandedValue ? valueText : `${valueText.slice(0, 250)}...`}
                    </p>
                    <button 
                      onClick={() => setIsExpandedValue(!isExpandedValue)}
                      style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 800, cursor: 'pointer', marginTop: '1rem', padding: 0 }}
                    >
                      {isExpandedValue ? 'See Less' : 'See More...'}
                    </button>
                  </div>
                </div>
              </div>

              {/* SSLC (Secondary Course) Details */}
              <div style={{ marginTop: '4rem', padding: '2rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '2.2rem', color: '#00122e', fontWeight: 800, marginBottom: '2rem' }}>
                      SSLC (SECONDARY COURSE)
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8, margin: 0 }}>
                      {isExpandedSecondary ? secondaryText : `${secondaryText.slice(0, 250)}...`}
                    </p>
                    <button 
                      onClick={() => setIsExpandedSecondary(!isExpandedSecondary)}
                      style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 800, cursor: 'pointer', marginTop: '1rem', padding: 0 }}
                    >
                      {isExpandedSecondary ? 'See Less' : 'See More...'}
                    </button>
                  </div>
                  <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                    <img 
                      src="https://images.pexels.com/photos/5905700/pexels-photo-5905700.jpeg?auto=compress&cs=tinysrgb&w=800" 
                      alt="Time to study concept" 
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>
                </div>
              </div>

              {/* Redesigned Additional Facility Section */}
              <div style={{ marginTop: '8rem', paddingBottom: '6rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 800, letterSpacing: '4px', fontSize: '0.9rem', textTransform: 'uppercase' }}>Enhanced Support</span>
                  <h2 style={{ fontSize: '3rem', color: '#00122e', fontWeight: 900, marginTop: '1rem', letterSpacing: '-1.5px' }}>
                    Additional Facilities
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '3rem' }}>
                  {/* TOC Card */}
                  <div style={{ 
                    background: '#f8fafc', 
                    padding: '4rem', 
                    borderRadius: '32px', 
                    position: 'relative',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem'
                  }}>
                    <div style={{ 
                      width: '64px', 
                      height: '64px', 
                      background: 'white', 
                      borderRadius: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                      color: 'var(--accent)'
                    }}>
                      <CheckCircle2 size={32} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '2rem', color: '#00122e', fontWeight: 800, marginBottom: '1.5rem' }}>
                        Transfer of Credit (TOC)
                      </h3>
                      <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8, margin: 0 }}>
                        The most significant advantage of NIOS is the <span style={{ color: '#00122e', fontWeight: 700 }}>Transfer of Credit</span> facility. Students who have previously failed in SSLC or Plus Two exams under other boards don't need to retake every subject. We facilitate the transfer of marks for up to two passed subjects, allowing you to focus solely on the remaining requirements.
                      </p>
                    </div>
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent)', fontWeight: 800, fontSize: '0.9rem' }}>
                      LEARN ABOUT ELIGIBILITY <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
                    </div>
                  </div>

                  {/* Change of Subject Card */}
                  <div style={{ 
                    background: '#f8fafc', 
                    padding: '4rem', 
                    borderRadius: '32px', 
                    position: 'relative',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem'
                  }}>
                    <div style={{ 
                      width: '64px', 
                      height: '64px', 
                      background: 'white', 
                      borderRadius: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                      color: 'var(--accent)'
                    }}>
                      <BookOpen size={32} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '2rem', color: '#00122e', fontWeight: 800, marginBottom: '1.5rem' }}>
                        Dynamic Subject Flexibility
                      </h3>
                      <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8, margin: 0 }}>
                        NIOS provides unparalleled flexibility during your five-year admission window. You can <span style={{ color: '#00122e', fontWeight: 700 }}>change or add subjects</span> as your interests evolve, provided the total doesn't exceed seven. This window is open for the first four years, ensuring your final certification perfectly matches your future goals.
                      </p>
                    </div>
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent)', fontWeight: 800, fontSize: '0.9rem' }}>
                      VIEW SUBJECT LIST <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* HOW YOU ARE HELPED BY TIMS */}
              <div style={{ marginTop: '6rem', padding: '2rem 0' }}>
                <h3 style={{ fontSize: '2.2rem', color: '#00122e', fontWeight: 800, marginBottom: '2rem' }}>
                  HOW YOU ARE HELPED BY TIMS
                </h3>
                <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8, margin: 0 }}>
                  Both SSLC and Plus Two can be done as correspondence courses. It can be done as part time course as well as distant education course. Those who cannot attend regular classes can do home study. After the course registration, The Expert Educationalists designed study materials for the five subjects that you selected will reach you through courier or collect directly by the respective centers. The expert faculties at our institutes will offer coaching at our centers, and every Plus two NIOS board student in all batches will be provided with 24 contact classes on respective Sundays. The date of contact class will be informed you earlier. TIMS provides you with Sample papers designed by expert qualified teachers and finally we complete the course with practice of previous year question papers and test series for all subjects. It helps the students to understand properly by usual questions asked in each subjects. Those who are doing SSLC and Plus Two correspondence will be assisted by TIMS for prepare required Assignments, Records and Practical works.
                </p>
              </div>

              {/* DOCUMENT REQUIRED Section */}
              <div style={{ marginTop: '8rem', padding: '4rem', background: '#f8fafc', borderRadius: '32px', border: '1px solid #e2e8f0' }}>
                <h2 style={{ fontSize: '2.2rem', color: '#00122e', fontWeight: 900, marginBottom: '3rem', letterSpacing: '-1px' }}>
                  DOCUMENT REQUIRED FOR SSLC ADMISSION
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
                      "Address Proof (Aadhaar/Utility Bill/Voter ID)",
                      "Class 8th Marksheet or Self-Certificate",
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

              {/* Official Recognitions & Gazette Links */}
              <div style={{ marginTop: '8rem', paddingBottom: '6rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 800, letterSpacing: '4px', fontSize: '0.9rem', textTransform: 'uppercase' }}>Institutional Validity</span>
                  <h2 style={{ fontSize: '3rem', color: '#00122e', fontWeight: 900, marginTop: '1rem', letterSpacing: '-1.5px' }}>
                    Official Recognitions & Gazettes
                  </h2>
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
                    <a 
                      key={i} 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        padding: '2.5rem', 
                        background: 'white', 
                        borderRadius: '24px', 
                        border: '1px solid #e2e8f0',
                        textDecoration: 'none',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.borderColor = 'var(--accent)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(196, 30, 58, 0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(196, 30, 58, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--accent)' }}>
                        <FileText size={24} />
                      </div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#00122e', marginBottom: '0.75rem', lineHeight: 1.3 }}>{item.title}</h3>
                      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Official government document for NIOS/SSLC accreditation.</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: 800, fontSize: '0.9rem' }}>
                        VIEW <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
                      </div>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent)', opacity: 0.8 }}></div>
                    </a>
                  ))}
                </div>
              </div>

              <div className={styles.infoBox}>
                <h3 style={{ fontSize: '1.5rem', color: '#00122e', fontWeight: 800, marginBottom: '2rem' }}>
                  Why Choose Our SSLC Program?
                </h3>
                <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                    <ShieldCheck className={styles.featureIcon} /> Government Recognized
                  </div>
                  <div className={styles.featureItem}>
                    <Calendar className={styles.featureIcon} /> Flexible Exam Schedule
                  </div>
                  <div className={styles.featureItem}>
                    <UserCheck className={styles.featureIcon} /> Expert Mentorship
                  </div>
                  <div className={styles.featureItem}>
                    <Award className={styles.featureIcon} /> 100% Passing Support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Boards Section ===== */}
      <section className={styles.altSection}>
        <div className={styles.contentContainer}>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>Accredited Board Options</h2>
          <p style={{ textAlign: 'center', color: '#64748b', maxWidth: '700px', margin: '0 auto 4rem', fontSize: '1.1rem' }}>
            We offer multiple pathways to help you achieve your 10th-grade certification through nationally and state-recognized boards.
          </p>
          
          <div className={styles.boardGrid}>
            <div className={styles.boardCard}>
              <div className={styles.boardTitle}><GraduationCap className={styles.featureIcon} /> NIOS (10th)</div>
              <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem' }}>
                National Institute of Open Schooling is a government-recognized board offering high flexibility and a wide range of subjects for private candidates.
              </p>
            </div>

            <div className={styles.boardCard}>
              <div className={styles.boardTitle}><GraduationCap className={styles.featureIcon} /> Kerala State (Private)</div>
              <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem' }}>
                Pursue your SSLC through the Kerala State Board as a private candidate, maintaining the same prestige as regular school students.
              </p>
            </div>

            <div className={styles.boardCard}>
              <div className={styles.boardTitle}><GraduationCap className={styles.featureIcon} /> Other State Boards</div>
              <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem' }}>
                We also facilitate admissions for various other recognized state boards across India based on your requirements and location.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
