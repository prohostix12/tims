
'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { Mail, Facebook, Instagram, Twitter, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerCol}>
          <h3>Company</h3>
          <p>
            TIMS ( Tirur Institute of Management Studies) is an 
            educational institution. It was established in 2009 
            with the sole purpose of providing education 
            accessible to every section of society, ... <Link href="/about" className={styles.readMore}>[Read More]</Link>
          </p>
        </div>

        <div className={styles.footerCol}>
          <h3>Explore</h3>
          <div className={styles.footerLinks}>
            <Link href="/" className={styles.footerLink}>Home</Link>
            <Link href="/about" className={styles.footerLink}>About</Link>
            <Link href="/blogs" className={styles.footerLink}>Blog</Link>
            <Link href="/news" className={styles.footerLink}>News</Link>
            <Link href="/contact" className={styles.footerLink}>Contact</Link>
            <Link href="/terms" className={styles.footerLink}>Terms and Conditions</Link>
            <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
          </div>
        </div>

        <div className={styles.footerCol}>
          <h3>Head Office</h3>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Mail size={16} color="#ef233c" className={styles.iconMargin} />
              <a href="mailto:info@timseducation.com">info@timseducation.com</a>
            </div>
            <div className={styles.contactItem}>
              <Phone size={16} color="#ef233c" className={styles.iconMargin} />
              <a href="tel:+919961967777">+91 9961967777</a>
            </div>
            <div className={styles.contactItem} style={{ marginTop: '1rem', alignItems: 'flex-start' }}>
              <span>2nd Floor, Pamls Tower, near<br/>Central Bank, Thazhepalam,<br/>Tirur, Kerala 676101</span>
            </div>
          </div>
        </div>

        <div className={styles.footerCol}>
          <h3>Edapal Office</h3>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Mail size={16} color="#ef233c" className={styles.iconMargin} />
              <a href="mailto:info@timseducation.com">info@timseducation.com</a>
            </div>
            <div className={styles.contactItem}>
              <Phone size={16} color="#ef233c" className={styles.iconMargin} />
              <a href="tel:+919526387777">+91 9526387777</a>
            </div>
            <div className={styles.contactItem} style={{ marginTop: '1rem', alignItems: 'flex-start' }}>
              <span>2nd floor Al madeela complex<br/>Calicut road Edappal 679576<br/>MALAPPURAM DT Kerala</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <p>© Copyright {new Date().getFullYear()} by TIMS Education</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
