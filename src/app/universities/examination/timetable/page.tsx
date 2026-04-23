'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, BookOpen, ChevronRight, Download } from 'lucide-react';
import styles from './timetable.module.css';

const sslcTimetable = [
  { date: "March 3, 2025", day: "Monday",    time: "10:00 AM – 1:00 PM", subject: "First Language (Malayalam/Hindi/English)", code: "101" },
  { date: "March 5, 2025", day: "Wednesday", time: "10:00 AM – 1:00 PM", subject: "Second Language (English)",                  code: "102" },
  { date: "March 7, 2025", day: "Friday",    time: "10:00 AM – 1:00 PM", subject: "Mathematics",                                code: "103" },
  { date: "March 10, 2025", day: "Monday",   time: "10:00 AM – 1:00 PM", subject: "Social Science",                             code: "104" },
  { date: "March 12, 2025", day: "Wednesday",time: "10:00 AM – 1:00 PM", subject: "Science",                                    code: "105" },
  { date: "March 14, 2025", day: "Friday",   time: "10:00 AM – 1:00 PM", subject: "IT / Optional Subject",                      code: "106" },
];

const plusTwoTimetable = [
  { date: "March 3, 2025",  day: "Monday",    time: "10:00 AM – 1:00 PM", subject: "English (Core)",                            code: "301" },
  { date: "March 5, 2025",  day: "Wednesday", time: "10:00 AM – 1:00 PM", subject: "Second Language",                           code: "302" },
  { date: "March 7, 2025",  day: "Friday",    time: "10:00 AM – 1:00 PM", subject: "Mathematics / Business Studies",            code: "303" },
  { date: "March 10, 2025", day: "Monday",    time: "10:00 AM – 1:00 PM", subject: "Physics / Accountancy / History",           code: "304" },
  { date: "March 12, 2025", day: "Wednesday", time: "10:00 AM – 1:00 PM", subject: "Chemistry / Economics / Political Science", code: "305" },
  { date: "March 14, 2025", day: "Friday",    time: "10:00 AM – 1:00 PM", subject: "Biology / Computer Science / Geography",    code: "306" },
];

export default function TimetablePage() {
  const [active, setActive] = useState<'sslc' | 'plus2'>('sslc');
  const timetable = active === 'sslc' ? sslcTimetable : plusTwoTimetable;
  const title = active === 'sslc' ? 'SSLC (Secondary) — March 2025' : 'Plus Two (Senior Secondary) — March 2025';

  const handleDownload = () => {
    const printContent = `
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 2rem; color: #000; }
            h1 { font-size: 1.5rem; margin-bottom: 0.5rem; color: #00122e; }
            p { font-size: 0.85rem; color: #666; margin-bottom: 1.5rem; }
            table { width: 100%; border-collapse: collapse; }
            th { background: #00122e; color: white; padding: 0.75rem 1rem; text-align: left; font-size: 0.85rem; }
            td { padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; font-size: 0.9rem; }
            tr:nth-child(even) td { background: #f8fafc; }
            .code { background: #fff0f0; color: #ef233c; font-weight: bold; padding: 0.2rem 0.5rem; border-radius: 4px; }
            @media print { body { padding: 1rem; } }
          </style>
        </head>
        <body>
          <h1>TIMS — ${title}</h1>
          <p>NIOS Board Examination Schedule · Tirur Institute of Management Studies</p>
          <table>
            <thead>
              <tr><th>Date</th><th>Day</th><th>Time</th><th>Subject</th><th>Code</th></tr>
            </thead>
            <tbody>
              ${timetable.map(row => `
                <tr>
                  <td>${row.date}</td>
                  <td>${row.day}</td>
                  <td>${row.time}</td>
                  <td>${row.subject}</td>
                  <td><span class="code">${row.code}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <p style="margin-top:1.5rem;font-size:0.8rem;color:#999;">* Timings are subject to change. Please verify with your study centre before the exam date.</p>
        </body>
      </html>
    `;
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(printContent);
      win.document.close();
      win.focus();
      setTimeout(() => { win.print(); win.close(); }, 500);
    }
  };

  return (
    <main className={styles.container}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Examination</span>
          <h1 className={styles.heroTitle}>Exam Time Table</h1>
          <p className={styles.heroSub}>
            NIOS Board examination schedule for SSLC (10th) and Plus Two (+2) — March 2025 session.
          </p>
        </div>
      </section>

      {/* Tab Toggle */}
      <section className={styles.tabSection}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${active === 'sslc' ? styles.tabActive : ''}`}
            onClick={() => setActive('sslc')}
          >
            <BookOpen size={16} /> SSLC (10th)
          </button>
          <button
            className={`${styles.tab} ${active === 'plus2' ? styles.tabActive : ''}`}
            onClick={() => setActive('plus2')}
          >
            <BookOpen size={16} /> Plus Two (+2)
          </button>
        </div>
      </section>

      {/* Timetable */}
      <section className={styles.tableSection}>
        <div className={styles.tableWrap}>
          <div className={styles.tableHeader}>
            <h2 className={styles.tableTitle}>{title}</h2>
            <button onClick={handleDownload} className={styles.downloadBtn}>
              <Download size={15} /> Download PDF
            </button>
          </div>

          <div className={styles.table}>
            {/* Head */}
            <div className={styles.tableHeadRow}>
              <span>Date & Day</span>
              <span>Time</span>
              <span>Subject</span>
              <span>Code</span>
            </div>

            {/* Rows */}
            {timetable.map((row, i) => (
              <div key={i} className={`${styles.tableRow} ${i % 2 === 0 ? styles.tableRowAlt : ''}`}>
                <div className={styles.dateCell}>
                  <span className={styles.dateMain}>{row.date}</span>
                  <span className={styles.dateDay}>{row.day}</span>
                </div>
                <div className={styles.timeCell}>
                  <Clock size={14} />
                  {row.time}
                </div>
                <div className={styles.subjectCell}>{row.subject}</div>
                <div className={styles.codeCell}>{row.code}</div>
              </div>
            ))}
          </div>

          <p className={styles.note}>
            * Timings are subject to change. Please verify with your study centre before the exam date.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2>Need help with exam preparation?</h2>
          <p>Our expert faculty provides coaching, sample papers, and test series for all NIOS subjects.</p>
          <Link href="/contact" className={styles.ctaBtn}>
            Contact Us <ChevronRight size={18} />
          </Link>
        </div>
      </section>

    </main>
  );
}
