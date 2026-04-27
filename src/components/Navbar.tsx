
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

interface SubItem {
  name: string;
  path: string;
  submenu?: SubItem[];
}

interface NavLink {
  name: string;
  path: string;
  submenu?: SubItem[];
}

const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  {
    name: 'Services',
    path: '/services',
    submenu: [
      { name: 'Attestation', path: '/services/attestation' },
      { name: 'Credit Transfer', path: '/services/credit-transfer' },
    ],
  },
  { name: 'Courses', path: '/courses' },
  {
    name: 'Universities',
    path: '/universities',
    submenu: [
      { name: 'All Universities', path: '/universities' },
      { name: 'Study Material', path: '/universities/study-material' },
      {
        name: 'Examination',
        path: '/universities/examination',
        submenu: [
          { name: 'Time Table', path: '/universities/examination/timetable' },
          { name: 'Results', path: '/results' },
        ],
      },
    ],
  },
  {
    name: 'Students',
    path: '/students',
    submenu: [
      { name: 'Syllabus', path: '/students/syllabus' },
    ],
  },
  {
    name: 'About',
    path: '/about',
    submenu: [
      { name: 'Latest News', path: '/news' },
      { name: 'Academic Blog', path: '/blogs' },
    ],
  },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileItem, setOpenMobileItem] = useState<string | null>(null);
  const [openMobileSubItem, setOpenMobileSubItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenMobileItem(null);
    setOpenMobileSubItem(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleMobileItem = (name: string) => {
    setOpenMobileItem(prev => (prev === name ? null : name));
    setOpenMobileSubItem(null);
  };

  const toggleMobileSubItem = (name: string) => {
    setOpenMobileSubItem(prev => (prev === name ? null : name));
  };

  const isActive = (link: NavLink) =>
    pathname === link.path ||
    (link.path !== '/' && pathname.startsWith(link.path));

  return (
    <>
      <div className={`${styles.navWrapper} ${scrolled ? styles.scrolled : ''}`}>
        <nav className={styles.navbar}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="Go to homepage">
            <div className={styles.logoBadge}>
              <Image
                src="/images/tims-logo-admin.png"
                alt="Times Online Logo"
                width={200}
                height={60}
                priority
                className={styles.logoImage}
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className={styles.navLinks} role="menubar">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className={`${styles.navItem} ${link.submenu ? styles.hasDropdown : ''}`}
                role="none"
              >
                {link.submenu && ['Services', 'Students'].includes(link.name) ? (
                  <span
                    className={`${styles.navLink} ${styles.navLinkLabel} ${isActive(link) ? styles.activeLink : ''}`}
                    role="menuitem"
                    aria-haspopup="true"
                  >
                    {link.name}
                    <ChevronDown size={14} className={styles.chevron} aria-hidden="true" />
                  </span>
                ) : link.submenu ? (
                  <Link
                    href={link.path}
                    className={`${styles.navLink} ${isActive(link) ? styles.activeLink : ''}`}
                    role="menuitem"
                    aria-haspopup="true"
                  >
                    {link.name}
                    <ChevronDown size={14} className={styles.chevron} aria-hidden="true" />
                  </Link>
                ) : (
                  <Link
                    href={link.path}
                    className={`${styles.navLink} ${isActive(link) ? styles.activeLink : ''}`}
                    role="menuitem"
                  >
                    {link.name}
                  </Link>
                )}

                {link.submenu && (
                  <div className={styles.dropdown} role="menu">
                    {link.submenu.map((sub) => (
                      <div key={sub.path} className={styles.dropdownItemWrapper} role="none">
                        {sub.submenu ? (
                          <>
                            <span className={`${styles.dropdownItem} ${styles.hasSubDropdown}`} role="menuitem" aria-haspopup="true">
                              {sub.name}
                              <ChevronDown size={13} className={styles.subArrow} aria-hidden="true" />
                            </span>
                            <div className={styles.subDropdown} role="menu">
                              {sub.submenu.map((child) => (
                                <Link
                                  key={child.path}
                                  href={child.path}
                                  className={styles.dropdownItem}
                                  role="menuitem"
                                >
                                  {child.name}
                                  <ArrowRight size={13} className={styles.subChevron} aria-hidden="true" />
                                </Link>
                              ))}
                            </div>
                          </>
                        ) : (
                          <Link href={sub.path} className={styles.dropdownItem} role="menuitem">
                            {sub.name}
                            <ArrowRight size={13} className={styles.subChevron} aria-hidden="true" />
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className={styles.actions}>
            <button
              className={styles.secondaryAction}
              onClick={() => window.dispatchEvent(new CustomEvent('open-course-finder'))}
              aria-label="Open Course Finder"
            >
              Course Finder
            </button>
            <Link href="/login" className={styles.primaryAction}>
              Login
            </Link>

            {/* Hamburger */}
            <button
              className={styles.menuToggle}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOverlayOpen : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div
        className={`${styles.mobileDrawer} ${mobileOpen ? styles.mobileDrawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className={styles.drawerHeader}>
          <Link href="/" className={styles.logo} onClick={() => setMobileOpen(false)}>
            <Image
              src="/images/tims-logo-admin.png"
              alt="Times Online Logo"
              width={140}
              height={42}
              className={styles.logoImage}
            />
          </Link>
          <button
            className={styles.drawerClose}
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={26} />
          </button>
        </div>

        {/* Drawer links */}
        <nav className={styles.drawerNav}>
          {navLinks.map((link) => (
            <div key={link.name} className={styles.drawerItem}>
              {link.submenu ? (
                <>
                  <button
                    className={`${styles.drawerLink} ${isActive(link) ? styles.drawerLinkActive : ''}`}
                    onClick={() => toggleMobileItem(link.name)}
                    aria-expanded={openMobileItem === link.name}
                  >
                    {link.name}
                    <ChevronDown
                      size={18}
                      className={`${styles.drawerChevron} ${openMobileItem === link.name ? styles.drawerChevronOpen : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div className={`${styles.drawerSub} ${openMobileItem === link.name ? styles.drawerSubOpen : ''}`}>
                    {link.submenu.map((sub) => (
                      <div key={sub.path} className={styles.drawerSubItem}>
                        {sub.submenu ? (
                          <>
                            <button
                              className={styles.drawerSubLink}
                              onClick={() => toggleMobileSubItem(sub.name)}
                              aria-expanded={openMobileSubItem === sub.name}
                            >
                              {sub.name}
                              <ChevronDown
                                size={15}
                                className={`${styles.drawerChevron} ${openMobileSubItem === sub.name ? styles.drawerChevronOpen : ''}`}
                                aria-hidden="true"
                              />
                            </button>
                            <div className={`${styles.drawerNested} ${openMobileSubItem === sub.name ? styles.drawerNestedOpen : ''}`}>
                              {sub.submenu.map((child) => (
                                <Link
                                  key={child.path}
                                  href={child.path}
                                  className={styles.drawerNestedLink}
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          </>
                        ) : (
                          <Link
                            href={sub.path}
                            className={styles.drawerSubLink}
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={link.path}
                  className={`${styles.drawerLink} ${isActive(link) ? styles.drawerLinkActive : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Drawer Footer Actions */}
        <div className={styles.drawerActions}>
          <button
            className={styles.drawerActionSecondary}
            onClick={() => {
              setMobileOpen(false);
              window.dispatchEvent(new CustomEvent('open-course-finder'));
            }}
          >
            Course Finder
          </button>
          <Link href="/login" className={styles.drawerActionPrimary} onClick={() => setMobileOpen(false)}>
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
