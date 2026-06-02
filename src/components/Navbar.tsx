
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
  { name: 'Services', path: '/services' },
  { name: 'Courses', path: '/courses' },
  { name: 'Universities', path: '/universities' },
  { name: 'Scholarship Program', path: '/scholarship-program' },
  { name: 'About', path: '/about' },
  { name: 'Latest News', path: '/news' },
  { name: 'Academic Blog', path: '/blogs' },
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

  useEffect(() => {
    setMobileOpen(false);
    setOpenMobileItem(null);
    setOpenMobileSubItem(null);
  }, [pathname]);

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

  const isCourseDetail = /^\/courses\/.+/.test(pathname);

  return (
    <>
      <div className={`${styles.navWrapper} ${scrolled ? styles.scrolled : ''} ${['/scholarship-program', '/universities'].includes(pathname) && !scrolled ? styles.scholarshipNav : ''}`}>
        <nav className={styles.navbar}>

          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="Go to homepage">
            <Image src="/images/Untitled-46777.png" alt="PSH Solutions" width={160} height={52} style={{ objectFit: 'contain' }} priority />
          </Link>

          {/* Desktop Links — Only Home + Course Finder */}
          <ul className={styles.navLinks} role="menubar">
            {navLinks.filter(link => link.name === 'Home').map((link) => (
              <li key={link.name} className={styles.navItem} role="none">
                <Link
                  href={link.path}
                  className={`${styles.navLink} ${isActive(link) ? styles.activeLink : ''} ${isCourseDetail ? styles.navLinkWhite : ''}`}
                  role="menuitem"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className={styles.navItem} role="none">
              <button
                className={styles.courseFinderBtn}
                onClick={() => window.dispatchEvent(new CustomEvent('open-course-finder'))}
              >
                Course Finder
              </button>
            </li>
          </ul>

          {/* Desktop Actions — Hamburger */}
          <div className={styles.actions}>
            <button
              className={styles.menuToggle}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
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
            <Image src="/images/Untitled-46777.png" alt="PSH Solutions" width={140} height={46} style={{ objectFit: 'contain' }} />
          </Link>
          <button
            className={styles.drawerClose}
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer links — all nav items */}
        <nav className={styles.drawerNav}>
          {navLinks.map((link) => (
            <div key={link.name} className={styles.drawerItem}>
              {link.submenu ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Link
                      href={link.path}
                      className={`${styles.drawerLink} ${isActive(link) ? styles.drawerLinkActive : ''}`}
                      onClick={() => setMobileOpen(false)}
                      style={{ flex: 1, display: 'flex', justifyContent: 'space-between', width: 'auto', borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                    >
                      {link.name}
                    </Link>
                    <button
                      onClick={() => toggleMobileItem(link.name)}
                      aria-label={`Toggle ${link.name} submenu`}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'inherit',
                        padding: '0.75rem 1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        width: 'auto',
                        borderLeft: '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                      className={styles.drawerLink}
                    >
                      <span className={`${styles.drawerChevron} ${openMobileItem === link.name ? styles.drawerChevronOpen : ''}`}>
                        <ChevronDown size={16} />
                      </span>
                    </button>
                  </div>
                  {openMobileItem === link.name && (
                    <div className={styles.drawerSub}>
                      {link.submenu.map((sub) => (
                        <div key={sub.name}>
                          {sub.submenu ? (
                            <>
                              <button
                                className={`${styles.drawerSubLink} ${openMobileSubItem === sub.name ? styles.drawerLinkActive : ''}`}
                                onClick={() => toggleMobileSubItem(sub.name)}
                                style={{ width: '100%', textAlign: 'left', border: 'none', background: 'none', fontFamily: 'inherit', cursor: 'pointer' }}
                              >
                                {sub.name}
                                <ChevronDown size={14} />
                              </button>
                              {openMobileSubItem === sub.name && (
                                <div className={styles.drawerSub} style={{ paddingLeft: '1rem' }}>
                                  {sub.submenu.map((nested) => (
                                    <Link
                                      key={nested.name}
                                      href={nested.path}
                                      className={styles.drawerSubLink}
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      {nested.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
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
                  )}
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

        {/* Drawer Footer */}
        <div className={styles.drawerActions}>
          <Link
            href="/login"
            className={styles.drawerActionPrimary}
            onClick={() => setMobileOpen(false)}
          >
            Login
          </Link>
          <button
            className={styles.drawerActionSecondary}
            onClick={() => {
              setMobileOpen(false);
              window.dispatchEvent(new CustomEvent('open-course-finder'));
            }}
          >
            Course Finder
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
