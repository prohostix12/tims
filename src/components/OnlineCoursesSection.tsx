'use client';

import { useState, useEffect } from 'react';
import {
  GraduationCap, Monitor, BarChart2, FlaskConical, BookOpen, Cpu,
  Briefcase, Database, Landmark, Globe, Music, Layers, PenTool, Package, Stethoscope,
  ArrowRightLeft, HeartPulse,
} from 'lucide-react';
import styles from './OnlineCoursesSection.module.css';

// ── Icon map (string key → Lucide component) ──────────────────────────────────
const ICON_MAP: Record<string, React.ReactNode> = {
  GraduationCap:  <GraduationCap size={32} />,
  Monitor:        <Monitor size={32} />,
  BarChart2:      <BarChart2 size={32} />,
  FlaskConical:   <FlaskConical size={32} />,
  BookOpen:       <BookOpen size={32} />,
  Cpu:            <Cpu size={32} />,
  Briefcase:      <Briefcase size={32} />,
  Database:       <Database size={32} />,
  Landmark:       <Landmark size={32} />,
  Globe:          <Globe size={32} />,
  Music:          <Music size={32} />,
  Layers:         <Layers size={32} />,
  PenTool:        <PenTool size={32} />,
  Package:        <Package size={32} />,
  Stethoscope:    <Stethoscope size={32} />,
  ArrowRightLeft: <ArrowRightLeft size={32} />,
  HeartPulse:     <HeartPulse size={32} />,
};

const FALLBACK_COURSE_DATA: Record<string, { name: string; icon: React.ReactNode }[]> = {
  'Online PG': [
    { name: 'MBA',    icon: ICON_MAP.GraduationCap },
    { name: 'MCA',    icon: ICON_MAP.Monitor },
    { name: 'M.Com',  icon: ICON_MAP.BarChart2 },
    { name: 'M.Sc',   icon: ICON_MAP.FlaskConical },
    { name: 'MA',     icon: ICON_MAP.BookOpen },
  ],
  'Online UG': [
    { name: 'BBA',   icon: ICON_MAP.Briefcase },
    { name: 'BCA',   icon: ICON_MAP.Database },
    { name: 'B.Com', icon: ICON_MAP.Landmark },
    { name: 'B.Sc',  icon: ICON_MAP.FlaskConical },
    { name: 'BA',    icon: ICON_MAP.Globe },
  ],
  'Credit Transfer Programme': [
    { name: 'B.Tech Credit Transfer',   icon: ICON_MAP.ArrowRightLeft },
    { name: 'UG Credit Transfer',       icon: ICON_MAP.ArrowRightLeft },
    { name: 'PG Credit Transfer',       icon: ICON_MAP.ArrowRightLeft },
    { name: 'Diploma Credit Transfer',  icon: ICON_MAP.GraduationCap },
  ],
  'SIDP (Skill Integrated Diploma Programs)': [
    { name: 'BBA + HR MANAGEMENT',           icon: ICON_MAP.Briefcase },
    { name: 'BBA + HOSPITAL ADMINISTRATION', icon: ICON_MAP.HeartPulse },
    { name: 'BBA + DIGITAL MARKETING',       icon: ICON_MAP.Globe },
    { name: 'BBA + LOGISTICS',               icon: ICON_MAP.Package },
    { name: 'BBA + BUSINESS MANAGEMENT',     icon: ICON_MAP.BarChart2 },
    { name: 'BA + MTTC',                     icon: ICON_MAP.Globe },
    { name: 'BCOM + ACCA',                   icon: ICON_MAP.Landmark },
    { name: 'BCOM + ADVANCED ACCOUNTANTS',   icon: ICON_MAP.Database },
  ],
  'Diploma': [
    { name: 'Data Science',   icon: ICON_MAP.BarChart2 },
    { name: 'Cyber Security', icon: ICON_MAP.Cpu },
    { name: 'Fashion Design', icon: ICON_MAP.PenTool },
    { name: 'Supply Chain',   icon: ICON_MAP.Package },
    { name: 'Nutrition',      icon: ICON_MAP.Stethoscope },
    { name: 'Music',          icon: ICON_MAP.Music },
    { name: 'IT',             icon: ICON_MAP.Layers },
  ],
};

interface FormState { name: string; email: string; phone: string; }

interface UniversityLogo {
  _id: string;
  name: string;
  logoUrl: string;
}

const DEFAULT_UNI_LOGOS = [
  { name: 'Amity University',      logoUrl: '/images/universities/amity.png' },
  { name: 'Manipal University',    logoUrl: '/images/universities/manipal.png' },
  { name: 'LPU',                   logoUrl: '/images/universities/lpu.png' },
  { name: 'Jain University',       logoUrl: '/images/universities/jain.png' },
  { name: 'Chandigarh University', logoUrl: '/images/universities/chandigarh.png' },
  { name: 'IGNOU',                 logoUrl: '/images/universities/ignou.png' },
];

export default function OnlineCoursesSection() {
  const [courseData, setCourseData] = useState<Record<string, { name: string; icon: React.ReactNode }[]>>(FALLBACK_COURSE_DATA);
  const [tabs, setTabs] = useState(Object.keys(FALLBACK_COURSE_DATA));
  const [activeTab, setActiveTab] = useState('Online PG');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [logos, setLogos] = useState<UniversityLogo[]>([]);

  useEffect(() => {
    fetch('/api/public/online-courses')
      .then(r => r.ok ? r.json() : [])
      .then((data: { tab: string; name: string; icon: string }[]) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const grouped: Record<string, { name: string; icon: React.ReactNode }[]> = {};
        data.forEach(c => {
          if (!grouped[c.tab]) grouped[c.tab] = [];
          grouped[c.tab].push({ name: c.name, icon: ICON_MAP[c.icon] || ICON_MAP.GraduationCap });
        });
        const orderedTabs = Object.keys(grouped);
        setCourseData(grouped);
        setTabs(orderedTabs);
        if (!orderedTabs.includes(activeTab)) setActiveTab(orderedTabs[0]);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('/api/public/university-logos')
      .then(r => r.ok ? r.json() : [])
      .then(data => { if (Array.isArray(data) && data.length > 0) setLogos(data); })
      .catch(() => {});
  }, []);

  const openModal = (courseName: string) => {
    setSelectedCourse(courseName);
    setSubmitted(false);
    setError('');
    setForm({ name: '', email: '', phone: '' });
  };

  const closeModal = () => setSelectedCourse(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          interest: selectedCourse,
          source: 'Course Card – Get Details',
          description: `Interested in ${selectedCourse}`,
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.title}>50+ Programmes</h2>
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {courseData[activeTab].map((course) => (
            <div key={course.name} className={styles.card} onClick={() => openModal(course.name)}>
              <div className={styles.cardTop}>
                <div className={styles.cardIcon}>{course.icon}</div>
                <p className={styles.cardName}>{course.name}</p>
              </div>
              <div className={styles.cardBottom}>
                <span className={styles.cardCta}>Suggest Me</span>
              </div>
            </div>
          ))}
        </div>

        {/* Universities count + CTA */}
        <div className={styles.uniRow}>
          <p className={styles.uniCount}>Available 90+ Universities</p>

          {/* Moving logo banner — always visible */}
          <div className={styles.logoBannerWrapper}>
            <div className={styles.logoBannerTrack}>
              {[...(logos.length > 0 ? logos : DEFAULT_UNI_LOGOS),
                 ...(logos.length > 0 ? logos : DEFAULT_UNI_LOGOS),
                 ...(logos.length > 0 ? logos : DEFAULT_UNI_LOGOS)].map((logo, i) => (
                  <div key={i} className={styles.logoItem}>
                    <img
                      src={logo.logoUrl}
                      alt={logo.name}
                      className={styles.logoImg}
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                ))}
            </div>
          </div>

          <a href="/universities" className={styles.uniBtn}>View All Universities</a>
        </div>
      </section>

      {/* ===== Lead Form Modal ===== */}
      {selectedCourse && (
        <div className={styles.modalOverlay} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className={styles.modal}>
            <button className={styles.modalClose} onClick={closeModal}>✕</button>

            {submitted ? (
              <div className={styles.successMsg}>
                <div className={styles.successIcon}>✅</div>
                <h3>Thank You!</h3>
                <p>Our team will contact you shortly with details about <strong>{selectedCourse}</strong>.</p>
              </div>
            ) : (
              <>
                <h2 className={styles.modalTitle}>Get Course Details</h2>
                <p className={styles.modalSubtitle}>Fill in your details and we'll reach out to you.</p>
                <span className={styles.courseBadge}>{selectedCourse}</span>

                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Full Name *"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                    <input
                      className={styles.input}
                      type="email"
                      placeholder="Email Address *"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                    <input
                      className={styles.input}
                      type="tel"
                      placeholder="Phone Number *"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      required
                    />
                  </div>
                  {error && <p style={{ color: '#ef233c', fontSize: '0.9rem', marginBottom: '1rem' }}>{error}</p>}
                  <button className={styles.submitBtn} type="submit" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Get Details Now'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
