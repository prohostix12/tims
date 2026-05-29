'use client';

import { useState, useEffect } from 'react';
import {
  GraduationCap, Monitor, BarChart2, FlaskConical, BookOpen, Cpu,
  Briefcase, Database, Landmark, Globe, Music, Layers, PenTool, Package,
  Stethoscope, ArrowRightLeft, HeartPulse, Award, Star, Code,
  FileText, Calculator, Microscope, Palette, Camera,
} from 'lucide-react';
import styles from './OnlineCoursesSection.module.css';

/* ── Icon map ───────────────────────────────────────────── */
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
  Award:          <Award size={32} />,
  Star:           <Star size={32} />,
  Code:           <Code size={32} />,
  FileText:       <FileText size={32} />,
  Calculator:     <Calculator size={32} />,
  Microscope:     <Microscope size={32} />,
  Palette:        <Palette size={32} />,
  Camera:         <Camera size={32} />,
};

function getIcon(name: string) { return ICON_MAP[name] ?? <GraduationCap size={32} />; }

/* ── Fallback (used when DB is empty) ───────────────────── */
const FALLBACK: Record<string, { name: string; iconName: string }[]> = {
  'Online PG': [
    { name: 'MBA',   iconName: 'GraduationCap' },
    { name: 'MCA',   iconName: 'Monitor' },
    { name: 'M.Com', iconName: 'BarChart2' },
    { name: 'M.Sc',  iconName: 'FlaskConical' },
    { name: 'MA',    iconName: 'BookOpen' },
  ],
  'Online UG': [
    { name: 'BBA',   iconName: 'Briefcase' },
    { name: 'BCA',   iconName: 'Database' },
    { name: 'B.Com', iconName: 'Landmark' },
    { name: 'B.Sc',  iconName: 'FlaskConical' },
    { name: 'BA',    iconName: 'Globe' },
  ],
  'Credit Transfer Programme': [
    { name: 'B.Tech Credit Transfer',   iconName: 'ArrowRightLeft' },
    { name: 'UG Credit Transfer',       iconName: 'ArrowRightLeft' },
    { name: 'PG Credit Transfer',       iconName: 'ArrowRightLeft' },
    { name: 'Diploma Credit Transfer',  iconName: 'GraduationCap' },
  ],
  'SIDP (Skill Integrated Diploma Programs)': [
    { name: 'BBA + HR MANAGEMENT',            iconName: 'Briefcase' },
    { name: 'BBA + HOSPITAL ADMINISTRATION',  iconName: 'HeartPulse' },
    { name: 'BBA + DIGITAL MARKETING',        iconName: 'Globe' },
    { name: 'BBA + LOGISTICS',                iconName: 'Package' },
    { name: 'BBA + BUSINESS MANAGEMENT',      iconName: 'BarChart2' },
    { name: 'BA + MTTC',                      iconName: 'Globe' },
    { name: 'BCOM + ACCA',                    iconName: 'Landmark' },
    { name: 'BCOM + ADVANCED ACCOUNTANTS',    iconName: 'Database' },
  ],
  'Diploma': [
    { name: 'Data Science',   iconName: 'BarChart2' },
    { name: 'Cyber Security', iconName: 'Cpu' },
    { name: 'Fashion Design', iconName: 'PenTool' },
    { name: 'Supply Chain',   iconName: 'Package' },
    { name: 'Nutrition',      iconName: 'Stethoscope' },
    { name: 'Music',          iconName: 'Music' },
    { name: 'IT',             iconName: 'Layers' },
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
  const [courseData, setCourseData] = useState<Record<string, { name: string; iconName: string }[]>>(FALLBACK);
  const [tabs, setTabs] = useState<string[]>(Object.keys(FALLBACK));
  const [activeTab, setActiveTab] = useState('Online PG');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [logos, setLogos] = useState<UniversityLogo[]>([]);

  useEffect(() => {
    fetch('/api/public/program-sections')
      .then(r => r.ok ? r.json() : [])
      .then((data: any[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const map: Record<string, { name: string; iconName: string }[]> = {};
          data.forEach(sec => { map[sec.categoryName] = sec.courses || []; });
          setCourseData(map);
          const tabNames = data.map(s => s.categoryName);
          setTabs(tabNames);
          setActiveTab(tabNames[0]);
        }
      })
      .catch(() => {});

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
          {(courseData[activeTab] || []).map((course) => (
            <div key={course.name} className={styles.card} onClick={() => openModal(course.name)}>
              <div className={styles.cardTop}>
                <div className={styles.cardIcon}>{getIcon(course.iconName)}</div>
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
