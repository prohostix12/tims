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
  X,
  Users,
  Image as ImageIcon,
  MessageSquare,
  HelpCircle,
  Layers,
  UserSquare2,
  Award,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Universities', path: '/admin/universities', icon: <GraduationCap size={20} /> },
    { name: 'Programs', path: '/admin/programs', icon: <BookOpen size={20} /> },
    { name: 'Programme Sections', path: '/admin/program-sections', icon: <Layers size={20} /> },
    { name: 'News', path: '/admin/news', icon: <Newspaper size={20} /> },
    { name: 'Blogs', path: '/admin/blogs', icon: <PenTool size={20} /> },
    { name: 'Course Finder', path: '/admin/course-finder', icon: <Search size={20} /> },
    { name: 'Scholarship', path: '/admin/scholarship', icon: <Award size={20} /> },
    { name: 'Leads', path: '/admin/leads', icon: <ClipboardList size={20} /> },
    { name: 'Enrollments', path: '/admin/enrollments', icon: <Users size={20} /> },
    { name: 'University Logos', path: '/admin/university-logos', icon: <ImageIcon size={20} /> },
    { name: 'Success Stories', path: '/admin/testimonials', icon: <MessageSquare size={20} /> },
    { name: 'FAQs', path: '/admin/faqs', icon: <HelpCircle size={20} /> },
    { name: 'Services', path: '/admin/services', icon: <Layers size={20} /> },

    { name: 'Directors', path: '/admin/directors', icon: <UserSquare2 size={20} /> },
    { name: 'Messages', path: '/admin/messages', icon: <Mail size={20} /> },
    { name: 'SEO Settings', path: '/admin/seo', icon: <Globe size={20} /> },
  ];

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <Image 
            src="/images/Untitled-46777.png"
            alt="Logo" 
            width={240} 
            height={80} 
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <button className={styles.mobileClose} onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link 
            key={item.path}
            href={item.path}
            onClick={() => { if (window.innerWidth < 1024) onClose(); }}
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
