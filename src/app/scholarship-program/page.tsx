'use client';

import React, { useState, useEffect } from 'react';
import styles from './scholarship.module.css';
import {
  Award, CheckCircle, Trophy, Tag, Clock, BookOpen,
  Building2, ChevronRight, Copy, Check, ArrowRight, Star
} from 'lucide-react';

interface Option { text: string; isCorrect: boolean }
interface Question { _id: string; question: string; options: Option[]; order: number }
interface ScoreTier { minScore: number; amount: number; label: string }
interface PartnerCompany { name: string; description: string }
interface Voucher { code: string; amount: number; label: string; validUntil: string; validityDays: number }
interface SubmitResult {
  score: number; total: number; scorePercent: number; passed: boolean;
  voucher: Voucher | null;
}
interface Program { _id: string; name: string; category: string; courseType?: string; fee?: number; duration?: string; university?: { name: string } }

type Phase = 'landing' | 'exam' | 'result';

export default function ScholarshipPage() {
  const [content, setContent] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [config, setConfig] = useState<any>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [phase, setPhase] = useState<Phase>('landing');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/public/scholarship/content').then(r => r.json()),
      fetch('/api/public/scholarship/questions').then(r => r.json()),
      fetch('/api/public/scholarship/config').then(r => r.json()),
      fetch('/api/public/scholarship/programs').then(r => r.json()),
    ]).then(([c, q, cfg, progs]) => {
      setContent(c);
      setQuestions(Array.isArray(q) ? q : []);
      setConfig(cfg);
      setPrograms(Array.isArray(progs) ? progs : []);
    }).finally(() => setLoading(false));
  }, []);

  const startExam = () => {
    if (questions.length === 0) {
      alert('Exam questions are being prepared. Please check back soon.');
      return;
    }
    setPhase('exam');
    setCurrentQ(0);
    setAnswers({});
    setSelected(null);
    setAnswered(false);
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelect = (opt: Option) => {
    if (answered) return;
    const q = questions[currentQ];
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
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      setResult(data);
      setPhase('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
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

  const q = questions[currentQ];
  const progress = questions.length ? ((currentQ + 1) / questions.length) * 100 : 0;

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.spinner} />
        <p>Loading Scholarship Program…</p>
      </div>
    );
  }

  return (
    <main className={styles.page}>

      {/* ── LANDING PHASE ─────────────────────────────────────────────── */}
      {phase === 'landing' && (
        <>
          <section className={styles.hero}>
            <div className={styles.heroBg} />
            <div className={styles.heroInner}>
              <span className={styles.badge}>
                <Award size={16} /> {content?.badge || 'Scholarship Program'}
              </span>
              <h1 className={styles.heroTitle}>{content?.heading || 'Earn a Scholarship & Study Smarter'}</h1>
              <p className={styles.heroSub}>{content?.subheading || 'Test your knowledge and unlock exclusive fee discounts'}</p>
              <p className={styles.heroDesc}>{content?.description}</p>

              {config?.tiers?.length > 0 && (
                <div className={styles.tiersPreview}>
                  {[...config.tiers].sort((a: ScoreTier, b: ScoreTier) => a.minScore - b.minScore).map((t: ScoreTier, i: number) => (
                    <div key={i} className={styles.tierCard}>
                      <Star size={18} className={styles.tierStar} />
                      <span className={styles.tierLabel}>{t.label || `Level ${i + 1}`}</span>
                      <span className={styles.tierScore}>Score ≥ {t.minScore}%</span>
                      <span className={styles.tierAmount}>₹{t.amount.toLocaleString('en-IN')} voucher</span>
                    </div>
                  ))}
                </div>
              )}

              <button className={styles.startBtn} onClick={startExam}>
                {content?.buttonText || 'Get Started – Take the Scholarship Exam'}
                <ArrowRight size={18} />
              </button>
            </div>
          </section>

          {programs.length > 0 && (
            <section className={styles.section}>
              <div className={styles.sectionInner}>
                <div className={styles.sectionHead}>
                  <BookOpen size={22} className={styles.sectionIcon} />
                  <h2>Courses Eligible for Scholarship Discount</h2>
                </div>
                <p className={styles.partnerSub}>
                  Earn your scholarship voucher and get fee discounts on any of these courses at the time of admission.
                </p>
                <div className={styles.programGrid}>
                  {programs.map((p, i) => (
                    <div key={i} className={styles.programCard}>
                      <span className={styles.programName}>{p.name}</span>
                      <span className={styles.programMeta}>{p.category}{p.duration ? ` · ${p.duration}` : ''}</span>
                      {p.fee ? (
                        <span className={styles.programFee}>₹{p.fee.toLocaleString('en-IN')}</span>
                      ) : null}
                      {p.university?.name && (
                        <span className={styles.programUniv}>{p.university.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {config?.partnerCompanies?.length > 0 && (
            <section className={styles.section + ' ' + styles.sectionAlt}>
              <div className={styles.sectionInner}>
                <div className={styles.sectionHead}>
                  <Building2 size={22} className={styles.sectionIcon} />
                  <h2>Our Admission Partner Organisations</h2>
                </div>
                <p className={styles.partnerSub}>
                  These are our trusted education partners providing admissions with this scholarship discount.
                </p>
                <div className={styles.companyGrid}>
                  {config.partnerCompanies.map((co: PartnerCompany, i: number) => (
                    <div key={i} className={styles.companyCard}>
                      <h3>{co.name}</h3>
                      {co.description && <p>{co.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* ── EXAM PHASE ─────────────────────────────────────────────────── */}
      {phase === 'exam' && q && (
        <section className={styles.examSection}>
          <div className={styles.examCard}>
            <div className={styles.progressWrap}>
              <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            </div>
            <div className={styles.examMeta}>
              <span className={styles.qCounter}>Question {currentQ + 1} of {questions.length}</span>
              <span className={styles.qAnswered}>{Object.keys(answers).length} answered</span>
            </div>

            <h2 className={styles.questionText}>{q.question}</h2>

            <div className={styles.optionsList}>
              {q.options.map((opt, i) => {
                let cls = styles.optionBtn;
                if (answered && selected === opt.text) {
                  cls += ' ' + (opt.isCorrect ? styles.optionCorrect : styles.optionWrong);
                } else if (answered && opt.isCorrect) {
                  cls += ' ' + styles.optionCorrect;
                } else if (!answered) {
                  cls += ' ' + styles.optionIdle;
                } else {
                  cls += ' ' + styles.optionDim;
                }
                return (
                  <button
                    key={i}
                    className={cls}
                    onClick={() => handleSelect(opt)}
                    disabled={answered}
                  >
                    <span className={styles.optionLetter}>{String.fromCharCode(65 + i)}</span>
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {answered && (
              <button className={styles.nextBtn} onClick={handleNext} disabled={submitting}>
                {submitting ? 'Submitting…' : currentQ < questions.length - 1
                  ? <><span>Next Question</span><ChevronRight size={18} /></>
                  : <><span>Submit & See Results</span><Trophy size={18} /></>}
              </button>
            )}
          </div>
        </section>
      )}

      {/* ── RESULT PHASE ───────────────────────────────────────────────── */}
      {phase === 'result' && result && (
        <section className={styles.resultSection}>
          <div className={styles.resultCard}>

            {/* Score circle */}
            <div className={result.passed ? styles.scoreCirclePass : styles.scoreCircleFail}>
              <span className={styles.scoreNum}>{result.scorePercent}%</span>
              <span className={styles.scoreLabel}>Your Score</span>
            </div>

            <h2 className={styles.resultTitle}>
              {result.passed ? '🎉 Congratulations! You Qualify for a Scholarship!' : 'Keep Practising — Almost There!'}
            </h2>
            <p className={styles.resultSub}>
              You answered <strong>{result.score}</strong> out of <strong>{result.total}</strong> questions correctly.
            </p>

            {/* Voucher */}
            {result.voucher && (
              <div className={styles.voucherBox}>
                <div className={styles.voucherTop}>
                  <Tag size={20} /> <span>Your Scholarship Voucher</span>
                </div>
                <div className={styles.voucherLabel}>{result.voucher.label}</div>
                <div className={styles.voucherAmount}>₹{result.voucher.amount.toLocaleString('en-IN')} Discount</div>
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
              </div>
            )}

            {/* Real programs from DB */}
            {programs.length > 0 && (
              <div className={styles.eligibleBox}>
                <h3><BookOpen size={18} /> Courses Available with Scholarship Fee Discount</h3>
                <p className={styles.eligibleNote}>
                  The following courses are eligible for your scholarship discount at the time of admission.
                </p>
                <div className={styles.programGrid}>
                  {programs.map((p, i) => (
                    <div key={i} className={styles.programCard}>
                      <span className={styles.programName}>{p.name}</span>
                      <span className={styles.programMeta}>{p.category}{p.duration ? ` · ${p.duration}` : ''}</span>
                      {p.fee ? (
                        <span className={styles.programFee}>
                          ₹{p.fee.toLocaleString('en-IN')}
                          <span className={styles.feeAfter}> after discount</span>
                        </span>
                      ) : null}
                      {p.university?.name && (
                        <span className={styles.programUniv}>{p.university.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Partner companies from footer — always shown */}
            {config?.partnerCompanies?.length > 0 && (
              <div className={styles.partnerBoxResult}>
                <h3><Building2 size={18} /> We Provide Admissions with This Discount Through</h3>
                <p className={styles.eligibleNote}>
                  These are our trusted admission partner organisations. Present your voucher code at the time of admission.
                </p>
                <div className={styles.companyGrid}>
                  {config.partnerCompanies.map((co: PartnerCompany, i: number) => (
                    <div key={i} className={styles.companyCard}>
                      <h3>{co.name}</h3>
                      {co.description && <p>{co.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button className={styles.retryBtn} onClick={() => setPhase('landing')}>
              Back to Scholarship Page
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
