
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'About', 
      path: '/about',
      submenu: [
        { name: 'Latest News', path: '/about/news' },
        { name: 'Academic Blog', path: '/about/blog' },
      ]
    },
    { 
      name: 'Services', 
      path: '/services',
      submenu: [
        { name: 'Attestation', path: '/services/attestation' },
        { name: 'Credit Transfer', path: '/services/credit-transfer' },
      ]
    },
    { name: 'Courses', path: '/courses' },
    { name: 'Universities', path: '/universities' },
    { 
      name: 'Students', 
      path: '/students',
      submenu: [
        { name: 'Success Stories', path: '/students' },
        { name: 'Student Portal', path: '/login' },
        { name: 'FAQ', path: '/contact' },
      ]
    },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className={`${styles.navWrapper} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          TIMS<span>.</span>
        </Link>

        {/* Desktop Nav */}
        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <div key={link.name} className={styles.navItemWrapper}>
              {link.name === 'Services' ? (
                <div 
                  className={`${styles.navLink} ${pathname.startsWith(link.path) ? styles.activeLink : ''}`}
                  style={{ cursor: 'default' }}
                >
                  {link.name}
                  <ChevronDown size={14} className={styles.chevron} />
                </div>
              ) : (
                <Link 
                  href={link.path} 
                  className={`${styles.navLink} ${pathname === link.path || (link.submenu && pathname.startsWith(link.path)) ? styles.activeLink : ''}`}
                >
                  {link.name}
                  {link.submenu && <ChevronDown size={14} className={styles.chevron} />}
                </Link>
              )}
              
              {link.submenu && (
                <div className={styles.dropdown}>
                  {link.submenu.map((sub) => (
                    <Link key={sub.path} href={sub.path} className={styles.dropdownItem}>
                      {sub.name}
                      <ArrowRight size={14} className={styles.subChevron} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <Link href="/course-finder" className={styles.secondaryAction}>
            Course Finder
          </Link>
          <Link href="/login" className={styles.primaryAction}>
            Login
          </Link>
          <button 
            className={styles.menuToggle} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
        {navLinks.map((link) => (
          <div key={link.name} className={styles.mobileItem}>
            {link.name === 'Services' ? (
              <div className={styles.mobileLink}>
                {link.name}
              </div>
            ) : (
              <Link 
                href={link.path} 
                className={styles.mobileLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            )}
            {link.submenu && (
              <div className={styles.mobileSub}>
                {link.submenu.map((sub) => (
                  <Link 
                    key={sub.path} 
                    href={sub.path} 
                    className={styles.mobileSubLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
