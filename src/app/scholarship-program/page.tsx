'use client';

import React, { useState, useEffect } from 'react';
import styles from './scholarship.module.css';
import {
  Award, Trophy, Tag, Clock,
  ArrowRight, X, User, Phone, Mail, GraduationCap, Building2,
  Download, ChevronRight, Copy, Check, CheckCircle, XCircle, FileText
} from 'lucide-react';

interface Option { text: string; isCorrect: boolean }
interface Question { _id: string; question: string; options: Option[] }
interface Voucher {
  code: string; amount: number; label: string;
  validUntil: string; validityDays: number;
}
interface SubmitResult {
  score: number; total: number; scorePercent: number; passed: boolean;
  voucher: Voucher | null; applicantName: string; course: string; university: string;
  minCorrectToPass: number; passingScorePercent: number;
}
interface ProgramSection { categoryName: string; courses: { name: string; iconName?: string; order?: number }[] }

type Phase = 'landing' | 'form' | 'otp' | 'exam' | 'result';

function getVoucherBrand(program: string): string {
  const p = program.toLowerCase();
  if (p.includes('online ug') || p.includes('online pg')) return 'TIMS Education';
  if (p.includes('credit transfer')) return 'Edumentora';
  if (p.includes('skill') || p.includes('diploma')) return 'Professional Skill Campus';
  return '';
}

export default function ScholarshipPage() {
  const [programSections, setProgramSections] = useState<Record<string, { name: string; iconName?: string; order?: number }[]>>({});
  const [programCategories, setProgramCategories] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>('landing');
  const [token, setToken] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState('');
  const [tickerText, setTickerText] = useState('₹20,000 Maximum Scholarship Available • Free Exam • Instant Results • Downloadable Voucher • Score High & Earn More • UGC-DEB Approved Universities');

  const [form, setForm] = useState({ name: '', phone: '', email: '', course: '', program: '' });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [examLoading, setExamLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTnC, setShowTnC] = useState(false);

  // OTP state
  const [otp, setOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [applicantName, setApplicantName] = useState('');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [result, setResult] = useState<SubmitResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setProgramSections({
      'Online PG': [
        { name: 'MBA' }, { name: 'MCA' }, { name: 'M.Com' }, { name: 'M.Sc' }, { name: 'MA' },
      ],
      'Online UG': [
        { name: 'BBA' }, { name: 'BCA' }, { name: 'B.Com' }, { name: 'B.Sc' }, { name: 'BA' },
      ],
      'Credit Transfer Programme': [
        { name: 'B.Tech Credit Transfer' }, { name: 'UG Credit Transfer' },
        { name: 'PG Credit Transfer' }, { name: 'Diploma Credit Transfer' },
      ],
      'SIDP (Skill Integrated Diploma Programs)': [
        { name: 'BBA + HR MANAGEMENT' }, { name: 'BBA + HOSPITAL ADMINISTRATION' },
        { name: 'BBA + DIGITAL MARKETING' }, { name: 'BBA + LOGISTICS' },
        { name: 'BBA + BUSINESS MANAGEMENT' }, { name: 'BA + MTTC' },
        { name: 'BCOM + ACCA' }, { name: 'BCOM + ADVANCED ACCOUNTANTS' },
      ],
      'Diploma': [
        { name: 'Data Science' }, { name: 'Cyber Security' }, { name: 'Fashion Design' },
        { name: 'Supply Chain' }, { name: 'Nutrition' }, { name: 'Music' }, { name: 'IT' },
      ],
    });
    setProgramCategories([
      'Online PG',
      'Online UG',
      'Credit Transfer Programme',
      'SIDP (Skill Integrated Diploma Programs)',
      'Diploma',
    ]);

    fetch('/api/public/program-sections')
      .then(r => r.ok ? r.json() : [])
      .then((d: any) => {
        if (Array.isArray(d) && d.length > 0) {
          const sections: Record<string, { name: string; iconName?: string; order?: number }[]> = {};
          d.forEach((sec: any) => { sections[sec.categoryName] = sec.courses || []; });
          setProgramSections(sections);
          setProgramCategories(d.map((sec: any) => sec.categoryName));
        }
      })
      .catch(() => {});

    fetch('/api/public/scholarship/content')
      .then(r => r.ok ? r.json() : {})
      .then((d: any) => {
        if (d?.termsAndConditions) setTermsAndConditions(d.termsAndConditions);
        if (d?.tickerText) setTickerText(d.tickerText);
      })
      .catch(() => {});
  }, []);

  const filteredCourses = form.program ? programSections[form.program] ?? [] : [];

  const handleProgramChange = (val: string) => {
    setForm(f => ({ ...f, program: val, course: '' }));
  };

  const submitForm = async () => {
    if (!termsAccepted) {
      setFormError('Please read and accept the Terms & Conditions to continue.');
      return;
    }
    const { name, phone, email, course, program } = form;
    if (!name.trim() || !phone.trim() || !email.trim() || !course || !program) {
      setFormError('Please fill in all fields.');
      return;
    }
    if (!/^\d{10}$/.test(phone.trim())) {
      setFormError('Enter a valid 10-digit phone number.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('Enter a valid email address.');
      return;
    }
    setFormLoading(true);
    setFormError('');
    try {
      const res = await fetch('/api/public/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setFormError(data.error || 'Failed to send OTP. Please try again.'); return; }
      setOtp('');
      setOtpError('');
      setResendCooldown(30);
      setPhase('otp');
    } finally {
      setFormLoading(false);
    }
  };

  const verifyOtpAndApply = async () => {
    if (otp.length !== 6) { setOtpError('Please enter the 6-digit OTP.'); return; }
    setOtpLoading(true);
    setOtpError('');
    try {
      const verifyRes = await fetch('/api/public/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email.trim(), code: otp }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) { setOtpError(verifyData.error || 'Invalid OTP. Please try again.'); return; }

      const { name, phone, email, course, program } = form;
      const applyRes = await fetch('/api/public/scholarship/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, course, university: program }),
      });
      const applyData = await applyRes.json();
      if (!applyRes.ok) { setOtpError(applyData.error || 'Something went wrong. Please try again.'); return; }
      setToken(applyData.token);
      await loadExam(applyData.token);
    } finally {
      setOtpLoading(false);
    }
  };

  const resendOtp = async () => {
    if (resendCooldown > 0) return;
    setOtpError('');
    try {
      await fetch('/api/public/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email.trim(), name: form.name.trim() }),
      });
      setResendCooldown(30);
      setOtp('');
    } catch {
      setOtpError('Failed to resend OTP. Please try again.');
    }
  };

  const loadExam = async (tok: string) => {
    setExamLoading(true);
    try {
      const res = await fetch(`/api/public/scholarship/exam?token=${tok}`);
      const data = await res.json();
      if (!res.ok) { setFormError(data.error || 'Failed to load exam.'); return; }
      setQuestions(data.questions || []);
      setApplicantName(data.applicantName || form.name);
      setCurrentQ(0);
      setAnswers({});
      setSelected(null);
      setAnswered(false);
      setPhase('exam');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setExamLoading(false);
    }
  };

  const q = questions[currentQ];
  const progress = questions.length ? ((currentQ + 1) / questions.length) * 100 : 0;

  const handleSelect = (opt: Option) => {
    if (answered || !q) return;
    setSelected(opt.text);
    setAnswered(true);
    setAnswers(prev => ({ ...prev, [q._id]: opt.text }));
  };

  const handleNext = async () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      await submitExam();
    }
  };

  const submitExam = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/public/scholarship/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, answers }),
      });
      const data = await res.json();
      setResult(data);
      setPhase('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  const downloadVoucher = async () => {
    if (!result?.voucher) return;
    const { voucher, applicantName: aName, course, university, score, total } = result;
    const validDate = new Date(voucher.validUntil).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric',
    });

    // Build a hidden div, capture with html2canvas, export with jsPDF
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed;left:-9999px;top:0;width:560px;background:#fff;font-family:Segoe UI,Arial,sans-serif;padding:0;z-index:-1';
    div.innerHTML = `
      <div style="background:#fff;border:3px solid #E8502A;border-radius:20px;padding:40px 44px;width:560px;box-sizing:border-box">
        <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#94a3b8;text-transform:uppercase;margin-bottom:6px">Find Your University</div>
        <div style="font-size:26px;font-weight:900;color:#002060;margin-bottom:4px">Scholarship Voucher</div>
        <div style="font-size:13px;color:#64748b;margin-bottom:20px">Congratulations on qualifying for our scholarship program!</div>
        <div style="display:inline-block;background:#fff5f0;border:1.5px solid rgba(232,80,42,.3);color:#E8502A;font-size:12px;font-weight:700;padding:4px 14px;border-radius:999px;margin-bottom:18px">${voucher.label}</div>
        <div style="text-align:center;margin:16px 0 8px">
          <div style="font-size:62px;font-weight:900;color:#E8502A;line-height:1">&#8377;${voucher.amount.toLocaleString('en-IN')}</div>
          <div style="font-size:14px;color:#64748b;margin-top:4px">Scholarship Discount</div>
        </div>
        <div style="background:#fff5f0;border:2px dashed #E8502A;border-radius:12px;padding:14px 20px;text-align:center;margin:18px 0">
          <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#94a3b8;font-weight:700;margin-bottom:4px">Voucher Code</div>
          <div style="font-family:Courier New,monospace;font-size:22px;letter-spacing:3px;color:#002060;font-weight:700">${voucher.code}</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0">
          <div style="background:#f8fafc;border-radius:10px;padding:12px 14px"><div style="font-size:10px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">Student Name</div><div style="font-size:13px;color:#002060;font-weight:700">${aName}</div></div>
          <div style="background:#f8fafc;border-radius:10px;padding:12px 14px"><div style="font-size:10px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">Score</div><div style="font-size:13px;color:#002060;font-weight:700">${score} / ${total} correct</div></div>
          <div style="background:#f8fafc;border-radius:10px;padding:12px 14px"><div style="font-size:10px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">Course Applied</div><div style="font-size:13px;color:#002060;font-weight:700">${course}</div></div>
          <div style="background:#f8fafc;border-radius:10px;padding:12px 14px"><div style="font-size:10px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">Program</div><div style="font-size:13px;color:#002060;font-weight:700">${university}</div></div>
        </div>
        <div style="height:1px;background:#e2e8f0;margin:18px 0"></div>
        <div style="text-align:center;color:#94a3b8;font-size:12px">Valid until: <strong style="color:#475569">${validDate}</strong> &nbsp;·&nbsp; ${voucher.validityDays} days &nbsp;·&nbsp; Present at time of admission</div>
      </div>`;
    document.body.appendChild(div);

    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      const canvas = await html2canvas(div.firstElementChild as HTMLElement, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [canvas.width / 2, canvas.height / 2] });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`Scholarship-Voucher-${aName.replace(/\s+/g, '-')}.pdf`);
    } finally {
      document.body.removeChild(div);
    }
  };

  const copyCode = () => {
    if (result?.voucher?.code) {
      navigator.clipboard.writeText(result.voucher.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  /* ══════════════════════════ RENDER ══════════════════════════ */

  /* ── T&C MODAL ─────────────────────────────────────────────── */
  const TnCModal = () => (
    <div className={styles.tncOverlay} onClick={() => setShowTnC(false)}>
      <div className={styles.tncModal} onClick={e => e.stopPropagation()}>
        <div className={styles.tncHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={18} style={{ color: '#E8502A' }} />
            <h3 className={styles.tncTitle}>Terms &amp; Conditions</h3>
          </div>
          <button className={styles.tncClose} onClick={() => setShowTnC(false)}>
            <X size={18} />
          </button>
        </div>
        <div className={styles.tncBody}>
          {termsAndConditions
            ? termsAndConditions.split('\n').filter(l => l.trim()).map((line, i) => (
                <p key={i} className={styles.tncLine}>{line}</p>
              ))
            : <p className={styles.tncLine}>No terms and conditions set.</p>}
        </div>
        <div className={styles.tncFooter}>
          <label className={styles.tncCheckLabel}>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={e => setTermsAccepted(e.target.checked)}
              className={styles.tncCheckbox}
            />
            <span>I have read and agree to the Terms &amp; Conditions</span>
          </label>
          <button
            className={styles.tncAcceptBtn}
            onClick={() => { if (termsAccepted) setShowTnC(false); }}
            disabled={!termsAccepted}
          >
            {termsAccepted ? 'Continue' : 'Accept to Continue'}
          </button>
        </div>
      </div>
    </div>
  );

  /* ── LANDING ───────────────────────────────────────────────── */
  if (phase === 'landing') return (
    <main className={styles.page}>
      {showTnC && <TnCModal />}

      {/* ── TICKER BAR ────────────────────────────────────────── */}
      <div className={styles.tickerBar}>
        <span className={styles.tickerLabel}><Trophy size={13} /> Scholarship</span>
        <div className={styles.tickerDivider} />
        <div className={styles.ticker}>
          <div className={styles.tickerTrack}>
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className={styles.tickerContent}>
                {tickerText} &nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBlob1} />
        <div className={styles.heroBlob2} />

        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            Earn a Scholarship &<br /><span>Study Smarter</span>
          </h1>

          <p className={styles.heroSub}>
            Take a short exam and unlock exclusive fee discounts on your chosen program.
          </p>

          <div className={styles.featureChips}>
            {['Free exam', 'Instant result', 'Downloadable voucher'].map(f => (
              <span key={f} className={styles.featureChip}>
                <CheckCircle size={13} /> {f}
              </span>
            ))}
          </div>

          <button className={styles.startBtn} onClick={() => setPhase('form')}>
            Apply Now <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className={styles.howSection}>
        <div className={styles.howInner}>
          <p className={styles.howEyebrow}>Simple 3-Step Process</p>
          <h2 className={styles.howTitle}>How It Works</h2>

          <div className={styles.steps}>
            {[
              { n: '01', icon: <User size={22} />,          title: 'Register',         desc: 'Fill in your details and choose your university & program.' },
              { n: '02', icon: <GraduationCap size={22} />, title: 'Take the Exam',    desc: 'Answer a short set of multiple-choice questions online.' },
              { n: '03', icon: <Award size={22} />,         title: 'Get Your Voucher', desc: 'Download your scholarship voucher and present it at admission.' },
            ].map(s => (
              <div key={s.n} className={styles.step}>
                <div className={styles.stepIconWrap}>{s.icon}</div>
                <span className={styles.stepNum}>{s.n}</span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );

  /* ── FORM PHASE ─────────────────────────────────────────────── */
  if (phase === 'form') return (
    <main className={styles.page}>
      {showTnC && <TnCModal />}
      <section className={styles.formSection}>
        <div className={styles.formCard}>
          <button className={styles.formBack} onClick={() => setPhase('landing')}>
            <X size={18} />
          </button>

          <div className={styles.formHeader}>
            <Award size={24} className={styles.formIcon} />
            <h2>Apply for Scholarship</h2>
            <p>Fill in your details to access the exam.</p>
          </div>

          <div className={styles.formFields}>
            <div className={styles.formRow}>
              <div className={styles.fieldWrap}>
                <label><User size={12} /> Full Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className={styles.fieldInput}
                />
              </div>
              <div className={styles.fieldWrap}>
                <label><Phone size={12} /> Phone</label>
                <input
                  type="tel"
                  placeholder="10-digit number"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className={styles.fieldInput}
                  maxLength={10}
                />
              </div>
            </div>

            <div className={styles.fieldWrap}>
              <label><Mail size={12} /> Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className={styles.fieldInput}
              />
            </div>

            <div className={styles.fieldWrap}>
              <label><Building2 size={12} /> Program</label>
              <select
                value={form.program}
                onChange={e => handleProgramChange(e.target.value)}
                className={styles.fieldInput}
              >
                <option value="">Select program…</option>
                {programCategories.map(program => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
            </div>

            <div className={styles.fieldWrap}>
              <label><GraduationCap size={12} /> Course</label>
              <select
                value={form.course}
                onChange={e => setForm(f => ({ ...f, course: e.target.value }))}
                className={styles.fieldInput}
                disabled={!form.program}
              >
                <option value="">
                  {form.program ? 'Select course…' : 'Select program first'}
                </option>
                {filteredCourses.map(p => (
                  <option key={p.name} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className={styles.tncRow}>
            <input
              type="checkbox"
              id="tnc-check"
              checked={termsAccepted}
              onChange={e => setTermsAccepted(e.target.checked)}
              className={styles.tncCheckbox}
            />
            <label htmlFor="tnc-check" className={styles.tncInlineLabel}>
              I agree to the{' '}
              <button
                type="button"
                className={styles.tncLink}
                onClick={() => setShowTnC(true)}
              >
                Terms &amp; Conditions
              </button>
            </label>
          </div>

          {formError && <div className={styles.formError}>{formError}</div>}

          <button
            className={styles.applyBtn}
            onClick={submitForm}
            disabled={formLoading}
          >
            {formLoading ? 'Sending OTP…' : <>Send OTP & Continue <ArrowRight size={16} /></>}
          </button>
        </div>
      </section>
    </main>
  );

  /* ── OTP PHASE ──────────────────────────────────────────────── */
  if (phase === 'otp') return (
    <main className={styles.page}>
      <section className={styles.formSection}>
        <div className={styles.formCard}>
          <button className={styles.formBack} onClick={() => { setPhase('form'); setOtpError(''); }}>
            <X size={18} />
          </button>

          <div className={styles.formHeader}>
            <Mail size={24} className={styles.formIcon} />
            <h2>Verify Your Email</h2>
            <p>
              We sent a 6-digit OTP to <strong>{form.email}</strong>.<br />
              Enter it below to start the exam.
            </p>
          </div>

          {otpError && <div className={styles.formError}>{otpError}</div>}

          <div className={styles.otpWrap}>
            <input
              className={styles.otpInput}
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="• • • • • •"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              autoFocus
            />
          </div>

          <button
            className={styles.applyBtn}
            onClick={verifyOtpAndApply}
            disabled={otpLoading || otp.length !== 6}
          >
            {otpLoading ? 'Verifying…' : <>Verify & Start Exam <ArrowRight size={16} /></>}
          </button>

          <button
            className={styles.resendBtn}
            onClick={resendOtp}
            disabled={resendCooldown > 0}
          >
            {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP'}
          </button>
        </div>
      </section>
    </main>
  );

  /* ── EXAM PHASE ─────────────────────────────────────────────── */
  if (phase === 'exam' && q) return (
    <main className={styles.page}>
      <section className={styles.examSection}>
        <div className={styles.examCard}>
          <div className={styles.examTopBar}>
            <span className={styles.examStudentName}>Hi, {applicantName}</span>
            <span className={styles.qCounter}>Q {currentQ + 1} / {questions.length}</span>
          </div>
          <div className={styles.progressWrap}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
          </div>

          <h2 className={styles.questionText}>{q.question}</h2>

          <div className={styles.optionsList}>
            {q.options.map((opt, i) => {
              let cls = styles.optionBtn;
              if (answered) {
                if (opt.isCorrect) {
                  cls += ' ' + styles.optionCorrect;
                } else if (selected === opt.text && !opt.isCorrect) {
                  cls += ' ' + styles.optionWrong;
                } else {
                  cls += ' ' + styles.optionDim;
                }
              } else {
                cls += ' ' + styles.optionIdle;
              }
              return (
                <button key={i} className={cls} onClick={() => handleSelect(opt)} disabled={answered}>
                  <span className={styles.optionLetter}>{String.fromCharCode(65 + i)}</span>
                  <span style={{ flex: 1 }}>{opt.text}</span>
                  {answered && opt.isCorrect && <CheckCircle size={18} className={styles.answerIcon} />}
                  {answered && selected === opt.text && !opt.isCorrect && <XCircle size={18} className={styles.answerIconWrong} />}
                </button>
              );
            })}
          </div>

          {answered && (
            <button className={styles.nextBtn} onClick={handleNext} disabled={submitting}>
              {submitting ? 'Submitting…' : currentQ < questions.length - 1
                ? <><span>Next Question</span><ChevronRight size={18} /></>
                : <><span>Submit Exam</span><Trophy size={18} /></>}
            </button>
          )}
        </div>
      </section>
    </main>
  );

  /* ── RESULT PHASE ────────────────────────────────────────────── */
  if (phase === 'result' && result) {
    const voucherBrand = getVoucherBrand(result.university);
    return (
      <main className={styles.page}>
        <section className={styles.resultSection}>
          <div className={styles.resultCard}>

            <div className={result.passed ? styles.scoreCirclePass : styles.scoreCircleFail}>
              <span className={styles.scoreNum}>{result.score}/{result.total}</span>
              <span className={styles.scoreLabel}>Your Score</span>
            </div>

            <h2 className={styles.resultTitle}>
              {result.passed
                ? '🎉 Congratulations! You\'ve Earned a Scholarship!'
                : 'Keep Practising — Almost There!'}
            </h2>
            <p className={styles.resultSub}>
              {result.applicantName}, you answered <strong>{result.score}</strong> out of <strong>{result.total}</strong> questions correctly.
            </p>

            {result.voucher ? (
              <div className={styles.voucherBox}>
                <div className={styles.voucherTop}>
                  <Tag size={20} /> <span>Your Scholarship Voucher</span>
                </div>
                <div className={styles.voucherLabel}>{result.voucher.label}</div>
                <div className={styles.voucherAmount}>₹{result.voucher.amount.toLocaleString('en-IN')}</div>
                <div className={styles.voucherSubLabel}>Scholarship Discount</div>

                <div className={styles.voucherCodeWrap}>
                  <code className={styles.voucherCode}>{result.voucher.code}</code>
                  <button className={styles.copyBtn} onClick={copyCode}>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <div className={styles.voucherValidity}>
                  <Clock size={14} />
                  Valid until: <strong>{formatDate(result.voucher.validUntil)}</strong>
                  &nbsp;({result.voucher.validityDays} days)
                </div>

                <button className={styles.downloadBtn} onClick={downloadVoucher}>
                  <Download size={16} /> Download Voucher
                </button>

                <p className={styles.voucherInstruction}>
                  Present this voucher code at the time of admission to avail your scholarship discount.
                </p>

                {voucherBrand && (
                  <div className={styles.voucherBrand}>{voucherBrand}</div>
                )}
              </div>
            ) : (
              <div className={styles.noVoucherBox}>
                <p>You scored {result.score} out of {result.total}.</p>
                <p>
                  You need at least{' '}
                  <strong>{result.minCorrectToPass ?? Math.ceil((result.passingScorePercent ?? 50) / 100 * result.total)} correct answer{(result.minCorrectToPass ?? 1) !== 1 ? 's' : ''}</strong>{' '}
                  ({result.passingScorePercent ?? 50}% passing score) to earn a scholarship voucher.
                  Better luck next time!
                </p>
              </div>
            )}

            <button className={styles.retryBtn} onClick={() => setPhase('landing')}>
              Back to Scholarship Page
            </button>
          </div>
        </section>
      </main>
    );
  }

  return null;
}
