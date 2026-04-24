
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
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '1.5rem', color: 'white' }}>
            TIMS<span style={{ color: '#ef233c' }}>.</span>
          </h2>
          <p>
            Tirur Institute of Management Studies is a premier educational consultancy 
            dedicated to providing high-quality management education and distance learning 
            pathways for over a decade.
          </p>
        </div>

        <div className={styles.footerCol}>
          <h3>Navigation</h3>
          <div className={styles.footerLinks}>
            <Link href="/about" className={styles.footerLink}>About Us</Link>
            <Link href="/universities" className={styles.footerLink}>Universities</Link>
            <Link href="/courses" className={styles.footerLink}>Programs</Link>
            <Link href="/services" className={styles.footerLink}>Services</Link>
            <Link href="/contact" className={styles.footerLink}>Contact</Link>
          </div>
        </div>

        <div className={styles.footerCol}>
          <h3>Student Hub</h3>
          <div className={styles.footerLinks}>
            <button 
              className={styles.footerLink}
              onClick={() => window.dispatchEvent(new CustomEvent('open-course-finder'))}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', font: 'inherit' }}
            >
              Course Finder
            </button>
            <Link href="/services/attestation" className={styles.footerLink}>Attestation</Link>
            <Link href="/services/distance-education" className={styles.footerLink}>Online Degrees</Link>
            <Link href="/login" className={styles.footerLink}>Admin Login</Link>
          </div>
        </div>

        <div className={styles.footerCol}>
          <h3>Contact Us</h3>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <MapPin size={20} color="#ef233c" />
              <span>Tirur, Malappuram, Kerala, India</span>
            </div>
            <div className={styles.contactItem}>
              <Phone size={20} color="#ef233c" />
              <span>+91 98765 43210</span>
            </div>
            <div className={styles.contactItem}>
              <Mail size={20} color="#ef233c" />
              <span>info@timseducation.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} TIRUR INSTITUTE OF MANAGEMENT STUDIES. ALL RIGHTS RESERVED.</p>
        <div className={styles.socials}>
          <a href="#" className={styles.socialBtn} aria-label="Facebook"><Facebook size={20} /></a>
          <a href="#" className={styles.socialBtn} aria-label="Instagram"><Instagram size={20} /></a>
          <a href="#" className={styles.socialBtn} aria-label="Twitter"><Twitter size={20} /></a>
          <a href="#" className={styles.socialBtn} aria-label="Mail"><Mail size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
