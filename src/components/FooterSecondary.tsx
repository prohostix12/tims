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
                src="/images/demo logo5.png"
                alt="Find My Course"
                width={150}
                height={50}
                style={{ objectFit: 'contain' }}
              />
              <p className={styles.brandName}>Find Your University</p>
            </div>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon} aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" className={styles.socialIcon} aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" className={styles.socialIcon} aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="#" className={styles.socialIcon} aria-label="Youtube"><Youtube size={18} /></a>
            </div>
          </div>
        </div>

        {/* Explore Section */}
        <div className={styles.footerCol}>
          <h3>Explore</h3>
          <ul className={styles.linkList}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/news">News</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/terms">Terms and Conditions</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
          </ul>
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
                <a href="tel:+919961967777">+91 9961967777</a>
              </div>
            </div>
            <div className={styles.contactItem}>
              <MapPin className={styles.icon} size={18} />
              <div className={styles.contactText}>
                2nd Floor, Pamls Tower, near Central Bank,<br />
                Thazhepalam, Tirur, Kerala 676101
              </div>
            </div>
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
          <div className={styles.badges}>
            <span className={styles.badge}>UGC-DEB</span>
            <span className={styles.badge}>NAAC</span>
            <span className={styles.badge}>AICTE</span>
            <span className={styles.badge}>AIU</span>
          </div>
        </div>

        {/* Edapal Office Section */}
        <div className={styles.footerCol}>
          <h3>Edapal Office</h3>
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
                <a href="tel:+919526387777">+91 9526387777</a>
              </div>
            </div>
            <div className={styles.contactItem}>
              <MapPin className={styles.icon} size={18} />
              <div className={styles.contactText}>
                2nd floor Al madeela complex<br />
                Calicut road Edappal 679576<br />
                MALAPPURAM DT Kerala
              </div>
            </div>
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
