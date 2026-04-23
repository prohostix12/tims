'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Download, ChevronRight, BookOpen } from 'lucide-react';

const syllabusData = [
  {
    program: 'SSLC (10th)',
    subjects: [
      { name: 'First Language (Malayalam/Hindi/English)', code: '101', url: '#' },
      { name: 'Second Language (English)',                code: '102', url: '#' },
      { name: 'Mathematics',                              code: '103', url: '#' },
      { name: 'Social Science',                           code: '104', url: '#' },
      { name: 'Science',                                  code: '105', url: '#' },
      { name: 'IT / Optional Subject',                    code: '106', url: '#' },
    ],
  },
  {
    program: 'Plus Two (+2)',
    subjects: [
      { name: 'English (Core)',                           code: '301', url: '#' },
      { name: 'Second Language',                          code: '302', url: '#' },
      { name: 'Mathematics',                              code: '303', url: '#' },
      { name: 'Physics / Accountancy / History',          code: '304', url: '#' },
      { name: 'Chemistry / Economics / Political Science',code: '305', url: '#' },
      { name: 'Biology / Computer Science / Geography',   code: '306', url: '#' },
    ],
  },
  {
    program: 'BBA',
    subjects: [
      { name: 'Business Communication',    code: 'BBA101', url: '#' },
      { name: 'Principles of Management',  code: 'BBA102', url: '#' },
      { name: 'Financial Accounting',      code: 'BBA103', url: '#' },
      { name: 'Business Economics',        code: 'BBA104', url: '#' },
    ],
  },
  {
    program: 'MBA',
    subjects: [
      { name: 'Marketing Management',      code: 'MBA101', url: '#' },
      { name: 'Organizational Behaviour',  code: 'MBA102', url: '#' },
      { name: 'Financial Management',      code: 'MBA103', url: '#' },
      { name: 'Human Resource Management', code: 'MBA104', url: '#' },
    ],
  },
];

export default function SyllabusPage() {
  const [active, setActive] = useState(syllabusData[0].program);
  const current = syllabusData.find(s => s.program === active)!;

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-light)' }}>

      {/* Hero */}
      <section style={{ background: 'var(--primary)', padding: '8rem 5% 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(239,35,60,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '700px', position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-block', background: 'rgba(239,35,60,0.15)', border: '1px solid rgba(239,35,60,0.3)', color: '#ff6b7a', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '0.35rem 1rem', borderRadius: '100px', marginBottom: '1.25rem' }}>Students</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, color: 'var(--white)', margin: '0 0 1rem', letterSpacing: '-1px' }}>Syllabus</h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: 0 }}>Download subject-wise syllabus for your enrolled program.</p>
        </div>
      </section>

      {/* Program Tabs */}
      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '1.25rem 5%', position: 'sticky', top: '70px', zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {syllabusData.map(s => (
            <button
              key={s.program}
              onClick={() => setActive(s.program)}
              style={{
                padding: '0.55rem 1.4rem',
                borderRadius: '8px',
                border: '1.5px solid',
                borderColor: active === s.program ? 'var(--primary)' : 'var(--border)',
                background: active === s.program ? 'var(--primary)' : 'transparent',
                color: active === s.program ? 'var(--white)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {s.program}
            </button>
          ))}
        </div>
      </section>

      {/* Subjects */}
      <section style={{ padding: '4rem 5%' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '2rem' }}>
            {current.program} — Subjects
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {current.subjects.map((sub, i) => (
              <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', transition: 'border-color 0.2s ease, box-shadow 0.2s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,18,46,0.07)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '44px', height: '44px', background: 'rgba(239,35,60,0.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, color: 'var(--primary)', fontSize: '0.95rem' }}>{sub.name}</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Code: {sub.code}</p>
                  </div>
                </div>
                <a href={sub.url} download style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--primary)', color: 'var(--white)', fontWeight: 700, fontSize: '0.82rem', padding: '0.5rem 1.25rem', borderRadius: '6px', textDecoration: 'none', transition: 'background 0.2s ease', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--primary)')}
                >
                  <Download size={14} /> Download
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--primary)', padding: '5rem 5%' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--white)', margin: 0 }}>Need academic guidance?</h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: 0 }}>Our counselors will help you understand the syllabus and plan your study schedule.</p>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent)', color: 'var(--white)', fontWeight: 700, fontSize: '1rem', padding: '0.9rem 2.5rem', borderRadius: '6px', textDecoration: 'none', marginTop: '0.5rem' }}>
            Contact Us <ChevronRight size={18} />
          </Link>
        </div>
      </section>

    </main>
  );
}
