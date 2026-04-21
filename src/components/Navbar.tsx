'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={`${styles.logo} ${styles.animateSlideDown} ${styles.delay0}`}>
          TIMS<span className={styles.dot}>.</span>
        </Link>
        
        <ul className={styles.navLinks}>
          <li className={`${styles.animateSlideDown} ${styles.delay1}`}><Link href="/">Home</Link></li>
          <li className={`${styles.dropdownContainer} ${styles.animateSlideDown} ${styles.delay2}`}>
            <Link href="/about">About ▾</Link>
            <ul className={styles.dropdownMenu}>

              <li><Link href="/about/blog">Blog</Link></li>
              <li><Link href="/about/news">News</Link></li>
            </ul>
          </li>
          <li className={`${styles.animateSlideDown} ${styles.delay3}`}><Link href="/courses">Courses</Link></li>
          <li className={`${styles.dropdownContainer} ${styles.animateSlideDown} ${styles.delay4}`}>
            <Link href="/services">Services ▾</Link>
            <ul className={styles.dropdownMenu}>
              <li><Link href="/services/attestation">Attestation</Link></li>
              <li><Link href="/services/credit-transfer">Credit Transfer</Link></li>
            </ul>
          </li>
          <li className={`${styles.animateSlideDown} ${styles.delay5}`}><Link href="/universities">Universities</Link></li>
          <li className={`${styles.dropdownContainer} ${styles.animateSlideDown} ${styles.delay6}`}>
            <Link href="/students">Students ▾</Link>
            <ul className={styles.dropdownMenu}>
              <li><Link href="/students/syllabus">Syllabus</Link></li>

            </ul>
          </li>
          <li className={`${styles.animateSlideDown} ${styles.delay6}`}><Link href="/contact">Contact</Link></li>
        </ul>
        
        <div className={`${styles.actions} ${styles.animateSlideDown} ${styles.delay6}`}>
          <Link href="/course-finder" className={`${styles.courseFinderBtn} ${styles.pulseEffect}`}>
            Course Finder
          </Link>
        </div>
      </div>
    </header>
  );
}
