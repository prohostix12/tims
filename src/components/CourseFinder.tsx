'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import './CourseFinder.css';

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const IconCompass = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
);
const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8502A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8502A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8502A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconLock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconStar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconBuilding = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconClock = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconMonitor = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const IconRefresh = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
  </svg>
);
const IconChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const IconFrown = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E8502A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);
const IconWand = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8 19 13"/><path d="M15 9h0"/><path d="M17.8 6.2 19 5"/><path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/>
  </svg>
);
// ── New icons ──────────────────────────────────────────────────────────────────
const IconBook = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const IconGradCap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);
const IconLaptop = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M1 21h22"/>
  </svg>
);
const IconWifi = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>
  </svg>
);
const IconMap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
  </svg>
);
const IconSchool = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconBriefcase = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12.01"/>
  </svg>
);
const IconTrendUp = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);
const IconShuffle = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/>
  </svg>
);
const IconTarget = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconCoin = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const IconAtom = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z"/>
  </svg>
);
const IconCode = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const IconChart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);
const IconGavel = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m14 13-7.5 7.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L11 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconTimer = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

// ── Option icon map (value → icon component) ───────────────────────────────────
const OPTION_ICON_MAP: Record<string, React.ReactNode> = {
  // Education
  below_12: <IconBook />,
  '12th': <IconGradCap />,
  graduate: <IconGradCap />,
  postgraduate: <IconTarget />,
  // Current status
  student: <IconBook />,
  working: <IconBriefcase />,
  fresher: <IconTarget />,
  other: <IconStar />,
  // Mode
  online: <IconWifi />,
  distance: <IconMap />,
  hybrid: <IconLaptop />,
  campus: <IconSchool />,
  // Field
  commerce: <IconCoin />,
  arts: <IconBook />,
  science: <IconAtom />,
  technology: <IconCode />,
  management: <IconChart />,
  law: <IconGavel />,
  skill: <IconWand />,
  openschool: <IconBook />,
  // Specialization
  finance: <IconCoin />,
  marketing: <IconTrendUp />,
  it_software: <IconCode />,
  hr: <IconUsers />,
  operations: <IconChart />,
  general: <IconStar />,
  // Goal
  get_job: <IconBriefcase />,
  advance_career: <IconTrendUp />,
  switch_field: <IconShuffle />,
  higher_studies: <IconGradCap />,
  // University type
  indian: <IconSchool />,
  international: <IconGlobe />,
  both: <IconStar />,
  private: <IconSchool />,
  public: <IconBuilding />,
  state: <IconMap />,
  // Experience
  no_experience: <IconBook />,
  less_2: <IconTarget />,
  two_five: <IconTrendUp />,
  five_plus: <IconBriefcase />,
  // Duration
  less_1_year: <IconTimer />,
  one_two_years: <IconTimer />,
  two_three_years: <IconTimer />,
  flexible: <IconStar />,
  // Budget
  low: <IconCoin />,
  mid1: <IconCoin />,
  mid2: <IconCoin />,
  any: <IconStar />,
};

// ── EnquiryGate ────────────────────────────────────────────────────────────────
function EnquiryGate({ onSuccess }: { onSuccess: (data: { name: string, email: string, phone: string }) => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', countryCode: '+91' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError('Please enter a valid email address.'); return; }
    if (!/^\d{10}$/.test(form.phone)) { setError('Please enter exactly a 10-digit phone number.'); return; }
    setLoading(true);
    try {
      const fullPhone = `${form.countryCode} ${form.phone}`;
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: fullPhone, source: 'Course Finder' }),
      });
      onSuccess({ ...form, phone: fullPhone });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cf-gate">
      <div className="cf-gate-icon"><IconCompass /></div>
      <h2 className="cf-gate-title">Find Your Perfect Course</h2>
      <p className="cf-gate-sub">Enter your details to get personalised course recommendations</p>
      {error && <div className="cf-error">{error}</div>}
      <form onSubmit={handleSubmit} className="cf-gate-form">
        <div className="cf-field">
          <span className="cf-field-icon"><IconUser /></span>
          <input className="cf-input" type="text" placeholder="Your Full Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="cf-field">
          <span className="cf-field-icon"><IconMail /></span>
          <input className="cf-input" type="email" placeholder="Email Address" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="cf-field">
          <span className="cf-field-icon"><IconPhone /></span>
          <div className="cf-phone-group">
            <select
              className="cf-country-select"
              value={form.countryCode}
              onChange={e => setForm({ ...form, countryCode: e.target.value })}
            >
              <option value="+91">+91 (IN)</option>
              <option value="+971">+971 (AE)</option>
              <option value="+966">+966 (SA)</option>
              <option value="+965">+965 (KW)</option>
              <option value="+968">+968 (OM)</option>
              <option value="+974">+974 (QA)</option>
              <option value="+973">+973 (BH)</option>
            </select>
            <input
              className="cf-input cf-phone-input"
              type="tel"
              placeholder="10-Digit Phone Number"
              required
              maxLength={10}
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
            />
          </div>
        </div>
        <button type="submit" className="cf-submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : <><IconArrow /> Continue to Quiz</>}
        </button>
      </form>
      <p className="cf-privacy"><IconLock /> Your info is secure with us</p>
    </div>
  );
}

// ── Fallback questions (10 steps) — used when DB has no questions ──────────────
export const FALLBACK_QUESTIONS = [
  {
    _id: 'fq1', field: 'what_course_are_you_interested', order: 1, isActive: true,
    question: 'What course are you interested in pursuing?',
    options: [
      { value: 'mba', label: 'MBA' },
      { value: 'mca', label: 'MCA' },
      { value: 'm_com', label: 'M.COM' },
      { value: 'ma', label: 'MA' },
      { value: 'msc', label: 'MSC' },
      { value: 'msw', label: 'MSW' },
      { value: 'bba', label: 'BBA' },
      { value: 'bca', label: 'BCA' },
      { value: 'b_com', label: 'B.COM' },
      { value: 'ba', label: 'BA' },
      { value: 'bsc', label: 'BSC' },
      { value: 'b_com_mba', label: 'B.COM+MBA' },
      { value: 'bba_mba', label: 'BBA+MBA' },
      { value: 'bca_mca', label: 'BCA+MCA' },
    ],
  },
  {
    _id: 'fq2', field: 'education', order: 2, isActive: true,
    question: 'What is your highest qualification?',
    options: [
      { value: 'below_12',     label: 'Below 12th' },
      { value: '12th',         label: '12th Pass'  },
      { value: 'graduate',     label: 'Graduate (Bachelors)' },
      { value: 'postgraduate', label: 'Post Graduate' },
    ],
  },
  {
    _id: 'fq3', field: 'current_status', order: 3, isActive: true,
    question: 'What are you currently doing?',
    options: [
      { value: 'student', label: 'Studying / Student' },
      { value: 'working', label: 'Working Professional' },
      { value: 'fresher', label: 'Fresher / Job Seeking' },
      { value: 'other',   label: 'Homemaker / Other' },
    ],
  },
  {
    _id: 'fq4', field: 'field', order: 4, isActive: true,
    question: 'Which field of study interests you?',
    options: [
      { value: 'commerce',   label: 'Commerce',    categories: ['B.Com', 'M.Com', 'BBA', 'MBA', 'Commerce'] },
      { value: 'arts',       label: 'Arts',         categories: ['BA', 'MA', 'Arts'] },
      { value: 'science',    label: 'Science',      categories: ['B.Sc', 'M.Sc', 'Science'] },
      { value: 'technology', label: 'Technology',   categories: ['BCA', 'MCA', 'B.Tech', 'M.Tech', 'Computer'] },
      { value: 'management', label: 'Management',   categories: ['MBA', 'BBA', 'PGDM', 'Management'] },
      { value: 'law',        label: 'Law',          categories: ['LLB', 'LLM', 'Law'] },
    ],
  },
  {
    _id: 'fq5', field: 'specialization', order: 5, isActive: true,
    question: 'Which specialization interests you most?',
    options: [
      { value: 'finance',     label: 'Finance & Accounting' },
      { value: 'marketing',   label: 'Marketing & Sales' },
      { value: 'it_software', label: 'IT & Software' },
      { value: 'hr',          label: 'Human Resources' },
      { value: 'operations',  label: 'Operations & Logistics' },
      { value: 'general',     label: 'General / Not Sure' },
    ],
  },
  {
    _id: 'fq6', field: 'goal', order: 6, isActive: true,
    question: 'What is your primary career goal?',
    options: [
      { value: 'get_job',        label: 'Get a Job' },
      { value: 'advance_career', label: 'Advance My Career' },
      { value: 'switch_field',   label: 'Switch Career Field' },
      { value: 'higher_studies', label: 'Pursue Higher Studies' },
    ],
  },
  {
    _id: 'fq7', field: 'pref_university_location', order: 7, isActive: true,
    question: 'Do you prefer Indian or International Universities?',
    options: [
      { value: 'indian', label: 'Indian University' },
      { value: 'international', label: 'International University' },
      { value: 'both', label: 'Open to Both' },
    ],
  },
  {
    _id: 'fq8', field: 'university_type', order: 8, isActive: true,
    question: 'What type of university do you prefer?',
    options: [
      { value: 'private', label: 'Private University' },
      { value: 'public',  label: 'Public / Government' },
      { value: 'state',   label: 'State University' },
      { value: 'any',     label: 'No Preference' },
    ],
  },
  {
    _id: 'fq9', field: 'experience', order: 9, isActive: true,
    question: 'How much work experience do you have?',
    options: [
      { value: 'no_experience', label: 'No Experience (Fresher)' },
      { value: 'less_2',        label: 'Less than 2 Years' },
      { value: 'two_five',      label: '2 – 5 Years' },
      { value: 'five_plus',     label: '5+ Years' },
    ],
  },
  {
    _id: 'fq10', field: 'budget', order: 10, isActive: true,
    question: 'What is your preferred fee range?',
    options: [
      { value: 'low',  label: 'Under ₹50,000',  max: 50000 },
      { value: 'mid1', label: '₹50K – ₹1 Lakh', min: 50000,  max: 100000 },
      { value: 'mid2', label: '₹1L – ₹2 Lakh',  min: 100000, max: 200000 },
      { value: 'any',  label: 'No Preference' },
    ],
  },
];

// ── Step label map ─────────────────────────────────────────────────────────────
const STEP_LABELS = [
  'Course Interest',     // step 1 – what_course_are_you_interested
  'Qualification',       // step 2 – education
  'Current Status',      // step 3 – current_status
  'Field of Study',      // step 4 – field
  'Specialization',      // step 5 – specialization
  'Career Goal',         // step 6 – goal
  'University Location', // step 7 – pref_university_location
  'University Type',     // step 8 – university_type
  'Experience',          // step 9 – experience
  'Budget',              // step 10 – budget
];

export default function CourseFinder() {
  const [isOpen, setIsOpen] = useState(false);
  const [gateCleared, setGateCleared] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });
  const [questions, setQuestions] = useState<any[]>(FALLBACK_QUESTIONS);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<any[]>([]);
  const [fallbackResults, setFallbackResults] = useState<any[]>([]);
  const [matchedUniversities, setMatchedUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [questionsLoading] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-course-finder', handleOpen);
    return () => window.removeEventListener('open-course-finder', handleOpen);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) closeModal(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [isOpen]);

  // Pre-fetch DB questions on mount with a 3s timeout.
  // FALLBACK_QUESTIONS are already loaded as default state — zero wait for users.
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    fetch('/api/public/course-finder-questions', { cache: 'no-store', signal: controller.signal })
      .then(r => {
        if (!r.ok) throw new Error();
        const ct = r.headers.get('content-type');
        if (!ct?.includes('application/json')) throw new Error();
        return r.json();
      })
      .then(data => {
        const arr = Array.isArray(data) ? data : [];
        if (arr.length > 0) {
          setQuestions([...arr].sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0)));
        }
        // If DB is empty, keep FALLBACK_QUESTIONS already in state
      })
      .catch(() => { /* keep FALLBACK_QUESTIONS */ })
      .finally(() => clearTimeout(timer));
    return () => { controller.abort(); clearTimeout(timer); };
  }, []);

  const closeModal = () => { setIsOpen(false); reset(); };
  const reset = () => {
    setGateCleared(false); setUserData({ name: '', email: '', phone: '' }); setStep(1);
    setAnswers({}); setResults([]); setFallbackResults([]); setMatchedUniversities([]); setShowResults(false); setAnimate(true);
    // Keep questions in state — they were fetched on mount and don't need reloading
  };

  const handleOption = (field: string, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    if (step < questions.length) {
      setAnimate(false);
      setTimeout(() => { setStep(s => s + 1); setAnimate(true); }, 250);
    }
  };

  const handleBack = () => {
    setAnimate(false);
    setTimeout(() => { setStep(s => s - 1); setAnimate(true); }, 150);
  };

  const findCourses = async () => {
    setLoading(true);
    try {
      // Save quiz answers as lead in background
      const formattedAnswers = questions.map(q => { const opt = q.options.find((o: any) => o.value === answers[q.field]); return opt ? opt.label : ''; }).filter(Boolean).join(' | ');
      fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: userData.name, email: userData.email, phone: userData.phone || 'N/A', source: 'Course Finder Quiz', description: `Preferences: ${formattedAnswers}` }) }).catch(() => {});

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const res = await fetch('/api/public/course-finder-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, questions }),
        signal: controller.signal,
      }).catch(() => null);

      clearTimeout(timeout);

      let programs: any[] = [];
      let universities: any[] = [];
      if (res && res.ok) {
        const data = await res.json();
        programs = data.programs || [];
        universities = data.universities || [];
      }

      // ── Last-resort fallback: fetch all universities so we NEVER show nothing ──
      if (programs.length === 0 && universities.length === 0) {
        try {
          const uniRes = await fetch('/api/public/universities', { cache: 'no-store' }).catch(() => null);
          if (uniRes && uniRes.ok) {
            const uniData = await uniRes.json().catch(() => []);
            universities = (Array.isArray(uniData) ? uniData : []).slice(0, 10);
          }
        } catch { /* ignore */ }
      }

      setResults(programs);
      setFallbackResults([]);
      setMatchedUniversities(universities);
      setShowResults(true);
    } catch (err) {
      console.error(err);
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };

  const currentQ = questions[step - 1];

  // Determine options based on education selection
  let currentOptions = currentQ?.options || [];

  const allAnswered = currentQ && answers[currentQ.field];

  const trackCourseClick = async (program: any) => {
    try {
      await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: userData.name, email: userData.email, phone: userData.phone || 'N/A', source: 'Course Finder Click', course: `${program.name} at ${program.university?.name || program.university || program.universityId?.name || 'Unknown'}` }) });
    } catch { /* fire and forget */ }
  };

  const optionIcon = (value: string) => OPTION_ICON_MAP[value] ?? <IconStar />;

  return (
    <>
      {isOpen && (
        <div className="cf-overlay" onClick={closeModal} role="dialog" aria-modal="true">
          <div className="cf-modal" onClick={e => e.stopPropagation()}>
            <button className="cf-close-btn" onClick={closeModal} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            {questionsLoading && (
              <div className="cf-loading-screen"><p>Loading questions…</p></div>
            )}

            {!questionsLoading && step === 4 && !gateCleared && (
              <EnquiryGate onSuccess={(data) => { setUserData(data); setGateCleared(true); }} />
            )}

            {!questionsLoading && !(step === 4 && !gateCleared) && !showResults && questions.length > 0 && currentQ && (
              <>
                {/* Header */}
                <div className="cf-header">
                  <div className="cf-header-icon"><IconCompass /></div>
                  <h2 className="cf-title">{userData.name ? `Hi ${userData.name}! Let's find your course` : "Let's find your perfect course"}</h2>
                  <p className="cf-subtitle">Answer a few questions for personalised recommendations</p>
                </div>

                {/* Compact step indicator */}
                <div className="cf-step-compact">
                  <div className="cf-step-pips">
                    {questions.map((_, i) => {
                      const s = i + 1 < step ? 'done' : i + 1 === step ? 'active' : '';
                      return <div key={i} className={`cf-step-pip${s ? ' ' + s : ''}`} />;
                    })}
                  </div>
                  <span className="cf-step-current-label">
                    Step <strong>{step}</strong> of {questions.length} &mdash; <strong>{STEP_LABELS[step - 1] || `Step ${step}`}</strong>
                  </span>
                </div>

                {/* Progress bar */}
                <div className="cf-progress-container">
                  <div className="cf-progress-bar">
                    <div className="cf-progress-fill" style={{ width: `${(step / questions.length) * 100}%` }} />
                  </div>
                  <span className="cf-progress-text">Step {step} of {questions.length}</span>
                </div>

                {/* Question */}
                <div className={`cf-question-container ${animate ? 'animate' : ''}`}>
                  <h3 className="cf-question">{currentQ.question}</h3>
                  <div className={`cf-options-grid ${currentOptions.length > 4 ? 'cf-options-grid--3col' : ''}`}>
                    {currentOptions.map((opt: any) => (
                      <button
                        key={opt.value}
                        className={`cf-option-btn ${answers[currentQ.field] === opt.value ? 'selected' : ''}`}
                        onClick={() => handleOption(currentQ.field, opt.value)}
                      >
                        <span className="cf-option-icon">{optionIcon(opt.value)}</span>
                        <span>{opt.label}</span>
                        {opt.sublabel && <span className="cf-option-sublabel">{opt.sublabel}</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="cf-navigation">
                  {step > 1 && (
                    <button className="cf-back-btn" onClick={handleBack}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                      Back
                    </button>
                  )}
                  {step === questions.length && allAnswered && (
                    <button className="cf-find-btn" onClick={findCourses} disabled={loading}>
                      {loading ? 'Finding…' : <><IconSearch /> Find Courses</>}
                    </button>
                  )}
                </div>
              </>
            )}

            {!questionsLoading && !showResults && questions.length === 0 && (
              <div className="cf-loading-screen">
                <p>No questions configured yet. Please ask an admin to set up the course finder.</p>
              </div>
            )}

            {showResults && (
              <>
                <div className="cf-results-header">
                  <div className="cf-results-icon"><IconStar /></div>
                  <h2 className="cf-results-title">
                    {results.length > 0
                      ? 'Recommended Courses For You!'
                      : matchedUniversities.length > 0
                        ? 'Explore These Universities'
                        : fallbackResults.length > 0
                          ? 'Similar Courses You May Like'
                          : 'Browse Our Catalog'}
                  </h2>
                  <p className="cf-results-subtitle">
                    {results.length > 0
                      ? `Found ${results.length} course${results.length > 1 ? 's' : ''} matching your preferences`
                      : matchedUniversities.length > 0
                        ? 'These universities offer programs that match your interests'
                        : fallbackResults.length > 0
                          ? 'Here are some similar courses based on your choices'
                          : 'Explore our full range of programs and universities'}
                  </p>
                </div>
                <div className="cf-results-list">
                  {/* University results — shown first */}
                  {matchedUniversities.length > 0 && (
                    <div className="cf-universities-section">
                      <p className="cf-section-heading">{results.length > 0 ? 'Matched Universities' : 'Related Universities'}</p>
                      {matchedUniversities.map((uni: any) => (
                        <Link key={uni._id} href={`/universities/${uni.slug || uni._id}`} className="cf-result-card" onClick={() => setIsOpen(false)}>
                          <div className="cf-result-info">
                            <h4 className="cf-result-name">{uni.name}</h4>
                            {uni.location && <p className="cf-result-university"><IconBuilding /> {uni.location}</p>}
                            <div className="cf-result-meta">
                              {uni.type && <span className="cf-result-badge">{uni.type}</span>}
                            </div>
                          </div>
                          <div style={{ color: '#E8502A', flexShrink: 0, marginLeft: 10 }}><IconChevronRight /></div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Course results */}
                  {(results.length > 0 ? results : (matchedUniversities.length === 0 ? fallbackResults : [])).map(program => {
                    const uniName = program.university?.name || program.university || program.universityId?.name || 'University';
                    const courseHref = program.slug ? `/courses/${program.slug}` : '/courses';
                    return (
                      <Link key={program._id} href={courseHref} className="cf-result-card" onClick={() => { trackCourseClick(program); setIsOpen(false); }}>
                        <div className="cf-result-info">
                          <h4 className="cf-result-name">{program.name}</h4>
                          <p className="cf-result-university"><IconBuilding /> {uniName}</p>
                          <div className="cf-result-meta">
                            {program.duration && <span className="cf-result-badge"><IconClock /> {program.duration}</span>}
                            <span className="cf-result-badge"><IconMonitor /> {program.mode || program.type || program.level || 'Program'}</span>
                          </div>
                        </div>
                        {(
                          <div className="cf-result-price">
                            <span className="cf-price-label">Fee</span>
                            <span className="cf-price-value">₹{Number(program.fee).toLocaleString('en-IN')}</span>
                          </div>
                        )}
                      </Link>
                    );
                  })}

                  {/* No results at all — show helpful navigation, never a dead end */}
                  {results.length === 0 && fallbackResults.length === 0 && matchedUniversities.length === 0 && (
                    <div className="cf-no-results">
                      <span className="cf-no-results-icon"><IconFrown /></span>
                      <p style={{ fontWeight: 600, color: '#1e293b', marginBottom: 4 }}>We couldn't load personalised results right now.</p>
                      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 20 }}>Browse our full catalog — your perfect course is waiting.</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
                        <Link href="/courses" className="cf-browse-all-btn" onClick={() => setIsOpen(false)} style={{ textAlign: 'center' }}>
                          Browse All Programs
                        </Link>
                        <Link href="/universities" className="cf-browse-all-btn" onClick={() => setIsOpen(false)} style={{ textAlign: 'center', background: '#fff', color: '#E8502A', border: '2px solid #E8502A' }}>
                          Browse All Universities
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <div className="cf-results-actions">
                  <button className="cf-restart-btn" onClick={reset}><IconRefresh /> Start Over</button>
                  <Link href="/courses" className="cf-view-all-btn" onClick={() => setIsOpen(false)}>View All Programs <IconChevronRight /></Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

