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

type Phase = 'landing' | 'form' | 'exam' | 'result';

function getVoucherBrand(program: string): string {
  const p = program.toLowerCase();
  if (p.includes('online ug')) return 'TIMS Education';
  if (p.includes('credit transfer')) return 'Edumentora';
  if (p.includes('skill')) return 'Professional Skill Campus';
  return '';
}

export default function ScholarshipPage() {
  const [programSections, setProgramSections] = useState<Record<string, { name: string; iconName?: string; order?: number }[]>>({});
  const [programCategories, setProgramCategories] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>('landing');
  const [token, setToken] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState('');

  const [form, setForm] = useState({ name: '', phone: '', email: '', course: '', program: '' });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [examLoading, setExamLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTnC, setShowTnC] = useState(false);

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
    });
    setProgramCategories(['Online PG', 'Online UG', 'Credit Transfer Programme']);

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
      const res = await fetch('/api/public/scholarship/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, course, university: program }),
      });
      const data = await res.json();
      if (!res.ok) { setFormError(data.error || 'Something went wrong.'); return; }
      setToken(data.token);
      await loadExam(data.token);
    } finally {
      setFormLoading(false);
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

  const downloadVoucher = () => {
    if (!result?.voucher) return;
    const { voucher, applicantName: aName, course, university, score, total } = result;
    const validDate = new Date(voucher.validUntil).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
    const brand = getVoucherBrand(university);
    const brandHtml = brand
      ? `<div class="brand">${brand}</div>`
      : '';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Scholarship Voucher – ${aName}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',Arial,sans-serif;background:#f3f4f6;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px}
  .wrap{background:#fff;border:3px solid #E8502A;border-radius:20px;padding:40px 44px;max-width:560px;width:100%;box-shadow:0 12px 40px rgba(232,80,42,.18)}
  .org{font-size:.82rem;font-weight:700;letter-spacing:.1em;color:#94a3b8;text-transform:uppercase;margin-bottom:6px}
  .title{font-size:1.55rem;font-weight:900;color:#002060;margin-bottom:4px}
  .sub{font-size:.88rem;color:#64748b;margin-bottom:28px}
  .divider{height:1px;background:#e2e8f0;margin:22px 0}
  .amount-wrap{text-align:center;margin:24px 0 10px}
  .amount{font-size:4.2rem;font-weight:900;color:#E8502A;line-height:1}
  .amount-label{font-size:.95rem;color:#64748b;margin-top:4px}
  .code-wrap{background:#fff5f0;border:2px dashed #E8502A;border-radius:12px;padding:14px 20px;text-align:center;margin:20px 0}
  .code-label{font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:#94a3b8;font-weight:700;margin-bottom:4px}
  .code{font-family:'Courier New',monospace;font-size:1.45rem;letter-spacing:.14em;color:#002060;font-weight:700}
  .details{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:18px 0}
  .det{background:#f8fafc;border-radius:10px;padding:12px 14px}
  .det-l{font-size:.72rem;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px}
  .det-v{font-size:.92rem;color:#002060;font-weight:700}
  .valid{text-align:center;color:#94a3b8;font-size:.8rem;margin-top:20px}
  .badge{display:inline-block;background:#fff5f0;border:1.5px solid rgba(232,80,42,.3);color:#E8502A;font-size:.78rem;font-weight:700;padding:3px 12px;border-radius:999px;margin-bottom:18px}
  .brand{text-align:center;font-size:.85rem;font-weight:700;color:#002060;margin-top:16px;letter-spacing:.04em;padding-top:12px;border-top:1px solid #e2e8f0}
  @media print{body{background:#fff;padding:0} .wrap{box-shadow:none}}
</style>
</head>
<body>
<div class="wrap">
  <div class="org">Find Your University</div>
  <div class="title">Scholarship Voucher</div>
  <div class="sub">Congratulations on qualifying for our scholarship program!</div>
  <div class="badge">${voucher.label}</div>
  <div class="amount-wrap">
    <div class="amount">₹${voucher.amount.toLocaleString('en-IN')}</div>
    <div class="amount-label">Scholarship Discount</div>
  </div>
  <div class="code-wrap">
    <div class="code-label">Voucher Code</div>
    <div class="code">${voucher.code}</div>
  </div>
  <div class="details">
    <div class="det"><div class="det-l">Student Name</div><div class="det-v">${aName}</div></div>
    <div class="det"><div class="det-l">Score</div><div class="det-v">${score} / ${total} correct</div></div>
    <div class="det"><div class="det-l">Course Applied</div><div class="det-v">${course}</div></div>
    <div class="det"><div class="det-l">Program</div><div class="det-v">${university}</div></div>
  </div>
  <div class="divider"></div>
  <div class="valid">Valid until: <strong>${validDate}</strong> &nbsp;·&nbsp; ${voucher.validityDays} days from issue &nbsp;·&nbsp; Present at the time of admission</div>
  ${brandHtml}
</div>
<script>window.onload=()=>{window.print()}</script>
</body>
</html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 10000);
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
                ₹20,000 Maximum Scholarship Available &nbsp;&nbsp;•&nbsp;&nbsp; Free Exam &nbsp;&nbsp;•&nbsp;&nbsp; Instant Results &nbsp;&nbsp;•&nbsp;&nbsp; Downloadable Voucher &nbsp;&nbsp;•&nbsp;&nbsp; Score High & Earn More &nbsp;&nbsp;•&nbsp;&nbsp; UGC-DEB Approved Universities &nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;
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
            disabled={formLoading || examLoading}
          >
            {formLoading || examLoading ? 'Please wait…' : <>Start Exam <ArrowRight size={16} /></>}
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
