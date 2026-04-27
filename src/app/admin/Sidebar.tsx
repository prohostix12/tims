
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './admin.module.css';
import { 
  LayoutDashboard, 
  GraduationCap, 
  BookOpen, 
  Search, 
  ClipboardList, 
  Mail, 
  Globe, 
  ExternalLink, 
  LogOut,
  Newspaper,
  PenTool,
  FileText,
  Book,
  CalendarDays
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Universities', path: '/admin/universities', icon: <GraduationCap size={20} /> },
    { name: 'Programs', path: '/admin/programs', icon: <BookOpen size={20} /> },
    { name: 'News', path: '/admin/news', icon: <Newspaper size={20} /> },
    { name: 'Blogs', path: '/admin/blogs', icon: <PenTool size={20} /> },
    { name: 'Syllabus', path: '/admin/syllabus', icon: <FileText size={20} /> },
    { name: 'Study Materials', path: '/admin/study-materials', icon: <Book size={20} /> },
    { name: 'Time Table', path: '/admin/timetable', icon: <CalendarDays size={20} /> },
    { name: 'Results', path: '/admin/results', icon: <ClipboardList size={20} /> },
    { name: 'Course Finder', path: '/admin/course-finder', icon: <Search size={20} /> },
    { name: 'Leads', path: '/admin/leads', icon: <ClipboardList size={20} /> },
    { name: 'Enrollments', path: '/admin/enrollments', icon: <ClipboardList size={20} /> },
    { name: 'Messages', path: '/admin/messages', icon: <Mail size={20} /> },
    { name: 'SEO Settings', path: '/admin/seo', icon: <Globe size={20} /> },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo} style={{ padding: '1rem', display: 'flex', justifyContent: 'center' }}>
        <Image 
          src="/images/tims-logo-3.png" 
          alt="TIMS Logo" 
          width={180} 
          height={50} 
          style={{ objectFit: 'contain' }}
        />
      </div>
      
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link 
            key={item.path}
            href={item.path}
            className={`${styles.navItem} ${pathname === item.path ? styles.activeNavItem : ''}`}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navText}>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <Link href="/" className={`${styles.secondaryBtn} ${styles.viewWebsite}`}>
          <ExternalLink size={18} />
          <span className={styles.navText}>View Website</span>
        </Link>
        <button className={`${styles.secondaryBtn} ${styles.logoutBtn}`}>
          <LogOut size={18} />
          <span className={styles.navText}>Logout</span>
        </button>
      </div>
    </aside>
  );
}
