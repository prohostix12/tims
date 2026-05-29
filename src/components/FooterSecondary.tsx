'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './FooterSecondary.module.css';
import { Mail, Facebook, Instagram, Twitter, Phone, MapPin, Linkedin, Youtube } from 'lucide-react';

const FooterSecondary = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        {/* Branding Section */}
        <div className={styles.footerCol}>
          <div className={styles.brandSection}>
            <div className={styles.brandLogo}>
              <Image
                src="/images/Untitled-46777.png"
                alt="PSH Solutions"
                width={160}
                height={52}
                style={{ objectFit: 'contain', objectPosition: 'left top' }}
              />
            </div>
          </div>
        </div>



        {/* Head Office Section */}
        <div className={styles.footerCol}>
          <h3>Head Office</h3>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Mail className={styles.icon} size={18} />
              <div className={styles.contactText}>
                <a href="mailto:info@findyouruniversity.com">info@findyouruniversity.com</a>
              </div>
            </div>
            <div className={styles.contactItem}>
              <Phone className={styles.icon} size={18} />
              <div className={styles.contactText}>
                <a href="tel:+9189435555592">+91 89435555592</a>
              </div>
            </div>
            <div className={styles.contactItem}>
              <MapPin className={styles.icon} size={18} />
              <div className={styles.contactText}>
                Delhi | UAE | Kochi | Malappuram | Calicut
              </div>
            </div>
          </div>
          <div className={styles.socialIcons} style={{ marginTop: '1.5rem' }}>
            <a href="#" className={styles.socialIcon} aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#" className={styles.socialIcon} aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" className={styles.socialIcon} aria-label="Youtube"><Youtube size={18} /></a>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className={styles.footerCol}>
          <h3>Newsletter</h3>
          <p className={styles.newsletterText}>
            Stay updated with the latest news, courses, and university announcements.
          </p>
          <div className={styles.subscribeBox}>
            <input type="email" placeholder="Enter your email" className={styles.emailInput} />
            <button className={styles.subscribeBtn}>Subscribe</button>
          </div>

        </div>


      </div>

      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Find Your University. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default FooterSecondary;
