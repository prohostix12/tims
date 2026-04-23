'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Download, Search, FileText, Video, ChevronRight } from 'lucide-react';
import styles from './study-material.module.css';

const materials = [
  {
    university: "Amrita Vishwa Vidyapeetham",
    program: "BBA",
    semester: "Semester 1",
    subject: "Business Communication",
    type: "PDF",
    size: "2.4 MB",
    url: "#"
  },
  {
    university: "Lovely Professional University",
    program: "MBA",
    semester: "Semester 2",
    subject: "Marketing Management",
    type: "PDF",
    size: "3.1 MB",
    url: "#"
  },
  {
    university: "Manipal Academy",
    program: "BCA",
    semester: "Semester 1",
    subject: "Introduction to Programming",
    type: "PDF",
    size: "1.8 MB",
    url: "#"
  },
  {
    university: "Swami Vivekanand Subharti University",
    program: "BA",
    semester: "Semester 3",
    subject: "English Literature",
    type: "PDF",
    size: "2.2 MB",
    url: "#"
  },
  {
    university: "Amrita Vishwa Vidyapeetham",
    program: "MCA",
    semester: "Semester 1",
    subject: "Data Structures",
    type: "PDF",
    size: "4.0 MB",
    url: "#"
  },
  {
    university: "Lovely Professional University",
    program: "BBA",
    semester: "Semester 2",
    subject: "Financial Accounting",
    type: "PDF",
    size: "2.7 MB",
    url: "#"
  },
  {
    university: "Manipal Academy",
    program: "MBA",
    semester: "Semester 1",
    subject: "Organizational Behaviour",
    type: "PDF",
    size: "3.5 MB",
    url: "#"
  },
  {
    university: "Swami Vivekanand Subharti University",
    program: "BCom",
    semester: "Semester 2",
    subject: "Business Law",
    type: "PDF",
    size: "2.0 MB",
    url: "#"
  },
];

const universities = ['All', 'Amrita Vishwa Vidyapeetham', 'Lovely Professional University', 'Manipal Academy', 'Swami Vivekanand Subharti University'];

export default function StudyMaterialPage() {
  const [search, setSearch] = useState('');
  const [activeUniversity, setActiveUniversity] = useState('All');

  const filtered = materials.filter(m => {
    const matchUniversity = activeUniversity === 'All' || m.university === activeUniversity;
    const matchSearch = search === '' ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.university.toLowerCase().includes(search.toLowerCase()) ||
      m.program.toLowerCase().includes(search.toLowerCase());
    return matchUniversity && matchSearch;
  });

  return (
    <main className={styles.container}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Resources</span>
          <h1 className={styles.heroTitle}>Study Materials</h1>
          <p className={styles.heroSub}>
            Download subject-wise study materials, notes, and guides for your enrolled university programs.
          </p>
        </div>
      </section>

      {/* Search + Filter */}
      <section className={styles.filterSection}>
        <div className={styles.filterInner}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by subject, university or program..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.programFilters}>
            {universities.map(u => (
              <button
                key={u}
                className={`${styles.filterBtn} ${activeUniversity === u ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveUniversity(u)}
              >
                {u === 'All' ? 'All Universities' : u}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Grid */}
      <section className={styles.gridSection}>
        <div className={styles.grid}>
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <BookOpen size={48} />
              <p>No materials found. Try a different search or filter.</p>
            </div>
          ) : filtered.map((m, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardIcon}>
                <FileText size={28} />
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardProgram}>{m.program} · {m.semester}</span>
                <h3 className={styles.cardSubject}>{m.subject}</h3>
                <p className={styles.cardUniversity}>{m.university}</p>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.cardSize}>{m.type} · {m.size}</span>
                <a href={m.url} className={styles.downloadBtn} download>
                  <Download size={15} /> Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2>Can't find your material?</h2>
          <p>Contact our academic team and we'll provide the study material for your specific program and university.</p>
          <Link href="/contact" className={styles.ctaBtn}>
            Request Material <ChevronRight size={18} />
          </Link>
        </div>
      </section>

    </main>
  );
}
