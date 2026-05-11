'use client';

import { useState, useEffect } from 'react';
import {
  GraduationCap, Monitor, BarChart2, FlaskConical, BookOpen, Cpu,
  Briefcase, Database, Landmark, Globe, Music, Layers, PenTool, Package, Stethoscope,
  ArrowRightLeft,
} from 'lucide-react';
import styles from './OnlineCoursesSection.module.css';

const courseData: Record<string, { name: string; icon: React.ReactNode }[]> = {
  'Online PG': [
    { name: 'MBA',    icon: <GraduationCap size={32} /> },
    { name: 'MCA',    icon: <Monitor size={32} /> },
    { name: 'M.Com',  icon: <BarChart2 size={32} /> },
    { name: 'M.Sc',   icon: <FlaskConical size={32} /> },
    { name: 'MA',     icon: <BookOpen size={32} /> },
    { name: 'M.Tech', icon: <Cpu size={32} /> },
  ],
  'Online UG': [
    { name: 'BBA',   icon: <Briefcase size={32} /> },
    { name: 'BCA',   icon: <Database size={32} /> },
    { name: 'B.Com', icon: <Landmark size={32} /> },
    { name: 'B.Sc',  icon: <FlaskConical size={32} /> },
    { name: 'BA',    icon: <Globe size={32} /> },
    { name: 'B.Ed',  icon: <BookOpen size={32} /> },
  ],
  'Diploma': [
    { name: 'Data Science',   icon: <BarChart2 size={32} /> },
    { name: 'Cyber Security', icon: <Cpu size={32} /> },
    { name: 'Fashion Design', icon: <PenTool size={32} /> },
    { name: 'Supply Chain',   icon: <Package size={32} /> },
    { name: 'Nutrition',      icon: <Stethoscope size={32} /> },
    { name: 'Music',          icon: <Music size={32} /> },
    { name: 'IT',             icon: <Layers size={32} /> },
  ],
  'Credit Transfer Programme': [
    { name: 'B.Tech Credit Transfer', icon: <ArrowRightLeft size={32} /> },
    { name: 'UG Credit Transfer', icon: <ArrowRightLeft size={32} /> },
    { name: 'PG Credit Transfer', icon: <ArrowRightLeft size={32} /> },
    { name: 'Diploma Credit Transfer', icon: <GraduationCap size={32} /> },
  ],
};

const tabs = Object.keys(courseData);

interface FormState { name: string; email: string; phone: string; }

interface UniversityLogo {
  _id: string;
  name: string;
  logoUrl: string;
}

const WIKI_PROXY = (path: string) => `/api/proxy-image?url=${encodeURIComponent('https://upload.wikimedia.org/wikipedia/' + path)}`;

const DEFAULT_UNI_LOGOS = [
  { name: 'IGNOU',                 logoUrl: WIKI_PROXY('en/thumb/d/d8/Ignou_logo.svg/200px-Ignou_logo.svg.png') },
  { name: 'Amity University',      logoUrl: WIKI_PROXY('en/thumb/5/5d/Amity_University_logo.svg/200px-Amity_University_logo.svg.png') },
  { name: 'LPU',                   logoUrl: WIKI_PROXY('en/thumb/3/3b/Lovely_Professional_University_logo.svg/200px-Lovely_Professional_University_logo.svg.png') },
  { name: 'Chandigarh University', logoUrl: WIKI_PROXY('en/thumb/b/b3/Chandigarh_University_Logo.svg/200px-Chandigarh_University_Logo.svg.png') },
  { name: 'Manipal Academy',       logoUrl: WIKI_PROXY('en/thumb/4/40/Manipal_Academy_of_Higher_Education_logo.png/200px-Manipal_Academy_of_Higher_Education_logo.png') },
  { name: 'VIT University',        logoUrl: WIKI_PROXY('en/thumb/c/c5/Vellore_Institute_of_Technology_seal_2017.svg/200px-Vellore_Institute_of_Technology_seal_2017.svg.png') },
  { name: 'BITS Pilani',           logoUrl: WIKI_PROXY('en/thumb/d/d3/BITS_Pilani-Logo.svg/200px-BITS_Pilani-Logo.svg.png') },
  { name: 'Symbiosis',             logoUrl: WIKI_PROXY('en/thumb/2/2b/Symbiosis_International_University_logo.png/200px-Symbiosis_International_University_logo.png') },
  { name: 'Sikkim Manipal',        logoUrl: WIKI_PROXY('en/thumb/a/af/Sikkim_Manipal_University_logo.png/200px-Sikkim_Manipal_University_logo.png') },
  { name: 'Jain University',       logoUrl: WIKI_PROXY('en/thumb/5/5f/Jain_University_logo.svg/200px-Jain_University_logo.svg.png') },
  { name: 'Shoolini University',   logoUrl: WIKI_PROXY('en/thumb/3/3f/Shoolini_University_Logo.png/200px-Shoolini_University_Logo.png') },
  { name: 'Anna University',       logoUrl: WIKI_PROXY('en/thumb/c/cc/Anna_University_Logo.svg/200px-Anna_University_Logo.svg.png') },
];

export default function OnlineCoursesSection() {
  const [activeTab, setActiveTab] = useState('Online PG');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [logos, setLogos] = useState<UniversityLogo[]>([]);

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
