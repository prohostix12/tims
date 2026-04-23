'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, CheckCircle2, XCircle, ChevronRight, Download, AlertCircle } from 'lucide-react';
import styles from './results.module.css';

// Mock result data — replace with real API call
const mockResults: Record<string, {
  name: string;
  rollNo: string;
  program: string;
  board: string;
  session: string;
  subjects: { code: string; name: string; marks: number; max: number; grade: string; status: string }[];
}> = {
  'NIOS2025001': {
    name: 'Rahul Sharma',
    rollNo: 'NIOS2025001',
    program: 'SSLC (Secondary)',
    board: 'NIOS',
    session: 'March 2025',
    subjects: [
      { code: '101', name: 'First Language (Malayalam)', marks: 78, max: 100, grade: 'B+', status: 'Pass' },
      { code: '102', name: 'Second Language (English)',  marks: 82, max: 100, grade: 'A',  status: 'Pass' },
      { code: '103', name: 'Mathematics',                marks: 91, max: 100, grade: 'A+', status: 'Pass' },
      { code: '104', name: 'Social Science',             marks: 74, max: 100, grade: 'B+', status: 'Pass' },
      { code: '105', name: 'Science',                    marks: 88, max: 100, grade: 'A',  status: 'Pass' },
    ],
  },
  'NIOS2025002': {
    name: 'Priya Nair',
    rollNo: 'NIOS2025002',
    program: 'Plus Two (Senior Secondary)',
    board: 'NIOS',
    session: 'March 2025',
    subjects: [
      { code: '301', name: 'English (Core)',             marks: 85, max: 100, grade: 'A',  status: 'Pass' },
      { code: '302', name: 'Second Language',            marks: 79, max: 100, grade: 'B+', status: 'Pass' },
      { code: '303', name: 'Mathematics',                marks: 92, max: 100, grade: 'A+', status: 'Pass' },
      { code: '304', name: 'Physics',                    marks: 76, max: 100, grade: 'B+', status: 'Pass' },
      { code: '305', name: 'Chemistry',                  marks: 45, max: 100, grade: 'D',  status: 'Fail' },
    ],
  },
};

function getTotal(subjects: { marks: number; max: number }[]) {
  return subjects.reduce((a, s) => a + s.marks, 0);
}
function getMaxTotal(subjects: { marks: number; max: number }[]) {
  return subjects.reduce((a, s) => a + s.max, 0);
}
function getOverallStatus(subjects: { status: string }[]) {
  return subjects.every(s => s.status === 'Pass') ? 'Pass' : 'Fail';
}

export default function ResultsPage() {
  const [rollNo, setRollNo] = useState('');
  const [result, setResult] = useState<typeof mockResults[string] | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!rollNo.trim()) return;
    setLoading(true);
    setSearched(false);
    setTimeout(() => {
      setResult(mockResults[rollNo.trim().toUpperCase()] || null);
      setSearched(true);
      setLoading(false);
    }, 800);
  };

  const handlePrint = () => {
    if (!result) return;
    const total = getTotal(result.subjects);
    const maxTotal = getMaxTotal(result.subjects);
    const status = getOverallStatus(result.subjects);
    const printContent = `
      <html><head><title>Result — ${result.name}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 2rem; color: #000; }
        h1 { color: #00122e; font-size: 1.4rem; margin-bottom: 0.25rem; }
        .meta { font-size: 0.85rem; color: #666; margin-bottom: 1.5rem; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
        th { background: #00122e; color: white; padding: 0.6rem 1rem; text-align: left; font-size: 0.82rem; }
        td { padding: 0.6rem 1rem; border-bottom: 1px solid #e2e8f0; font-size: 0.88rem; }
        tr:nth-child(even) td { background: #f8fafc; }
        .pass { color: green; font-weight: bold; }
        .fail { color: red; font-weight: bold; }
        .total { font-weight: bold; background: #f1f5f9; }
      </style></head>
      <body>
        <h1>TIMS — Examination Result</h1>
        <div class="meta">
          <strong>Name:</strong> ${result.name} &nbsp;|&nbsp;
          <strong>Roll No:</strong> ${result.rollNo} &nbsp;|&nbsp;
          <strong>Program:</strong> ${result.program} &nbsp;|&nbsp;
          <strong>Session:</strong> ${result.session}
        </div>
        <table>
          <thead><tr><th>Code</th><th>Subject</th><th>Marks</th><th>Max</th><th>Grade</th><th>Status</th></tr></thead>
          <tbody>
            ${result.subjects.map(s => `
              <tr>
                <td>${s.code}</td><td>${s.name}</td><td>${s.marks}</td><td>${s.max}</td>
                <td>${s.grade}</td>
                <td class="${s.status === 'Pass' ? 'pass' : 'fail'}">${s.status}</td>
              </tr>
            `).join('')}
            <tr class="total">
              <td colspan="2">Total</td><td>${total}</td><td>${maxTotal}</td>
              <td>${Math.round((total/maxTotal)*100)}%</td>
              <td class="${status === 'Pass' ? 'pass' : 'fail'}">${status}</td>
            </tr>
          </tbody>
        </table>
        <p style="font-size:0.78rem;color:#999;">* This is a provisional result. Official marksheet will be issued by the board.</p>
      </body></html>
    `;
    const win = window.open('', '_blank');
    if (win) { win.document.write(printContent); win.document.close(); win.focus(); setTimeout(() => { win.print(); win.close(); }, 500); }
  };

  const overallStatus = result ? getOverallStatus(result.subjects) : null;
  const total = result ? getTotal(result.subjects) : 0;
  const maxTotal = result ? getMaxTotal(result.subjects) : 0;

  return (
    <main className={styles.container}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Examination</span>
          <h1 className={styles.heroTitle}>Check Your Results</h1>
          <p className={styles.heroSub}>Enter your NIOS roll number to view your SSLC or Plus Two examination results.</p>
        </div>
      </section>

      {/* Search */}
      <section className={styles.searchSection}>
        <div className={styles.searchCard}>
          <h2 className={styles.searchTitle}>Enter Roll Number</h2>
          <p className={styles.searchHint}>Try: <strong>NIOS2025001</strong> or <strong>NIOS2025002</strong></p>
          <div className={styles.searchRow}>
            <input
              type="text"
              placeholder="e.g. NIOS2025001"
              value={rollNo}
              onChange={e => setRollNo(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              className={styles.searchInput}
            />
            <button onClick={handleSearch} className={styles.searchBtn} disabled={loading}>
              {loading ? 'Searching...' : <><Search size={16} /> Search</>}
            </button>
          </div>
        </div>
      </section>

      {/* Result */}
      {searched && (
        <section className={styles.resultSection}>
          {!result ? (
            <div className={styles.notFound}>
              <AlertCircle size={48} />
              <h3>No result found</h3>
              <p>No record found for roll number <strong>{rollNo}</strong>. Please check and try again.</p>
            </div>
          ) : (
            <div className={styles.resultCard}>
              {/* Student Info */}
              <div className={styles.resultHeader}>
                <div className={styles.resultInfo}>
                  <h3 className={styles.studentName}>{result.name}</h3>
                  <div className={styles.metaRow}>
                    <span>Roll No: <strong>{result.rollNo}</strong></span>
                    <span>Program: <strong>{result.program}</strong></span>
                    <span>Session: <strong>{result.session}</strong></span>
                    <span>Board: <strong>{result.board}</strong></span>
                  </div>
                </div>
                <div className={`${styles.statusBadge} ${overallStatus === 'Pass' ? styles.statusPass : styles.statusFail}`}>
                  {overallStatus === 'Pass' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                  {overallStatus}
                </div>
              </div>

              {/* Subjects Table */}
              <div className={styles.tableWrap}>
                <div className={styles.tableHeadRow}>
                  <span>Code</span>
                  <span>Subject</span>
                  <span>Marks</span>
                  <span>Grade</span>
                  <span>Status</span>
                </div>
                {result.subjects.map((s, i) => (
                  <div key={i} className={`${styles.tableRow} ${i % 2 === 0 ? styles.tableRowAlt : ''}`}>
                    <span className={styles.codeCell}>{s.code}</span>
                    <span className={styles.subjectCell}>{s.name}</span>
                    <span className={styles.marksCell}>{s.marks} / {s.max}</span>
                    <span className={styles.gradeCell}>{s.grade}</span>
                    <span className={`${styles.statusCell} ${s.status === 'Pass' ? styles.cellPass : styles.cellFail}`}>
                      {s.status === 'Pass' ? <CheckCircle2 size={14} /> : <XCircle size={14} />} {s.status}
                    </span>
                  </div>
                ))}
                {/* Total row */}
                <div className={styles.totalRow}>
                  <span></span>
                  <span>Total</span>
                  <span>{total} / {maxTotal} ({Math.round((total/maxTotal)*100)}%)</span>
                  <span></span>
                  <span className={`${styles.statusCell} ${overallStatus === 'Pass' ? styles.cellPass : styles.cellFail}`}>
                    {overallStatus === 'Pass' ? <CheckCircle2 size={14} /> : <XCircle size={14} />} {overallStatus}
                  </span>
                </div>
              </div>

              <div className={styles.resultActions}>
                <button onClick={handlePrint} className={styles.downloadBtn}>
                  <Download size={15} /> Download Result
                </button>
                <p className={styles.disclaimer}>* This is a provisional result. Official marksheet will be issued by the board.</p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2>Need help with your result?</h2>
          <p>Contact our team for result verification, re-evaluation requests, or marksheet collection assistance.</p>
          <Link href="/contact" className={styles.ctaBtn}>
            Contact Us <ChevronRight size={18} />
          </Link>
        </div>
      </section>

    </main>
  );
}
