
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { Mail, Facebook, Instagram, Twitter, Phone, MapPin, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerCol}>
          <div style={{ marginBottom: '1rem' }}>
            <Image
              src="/images/demo logo5.png"
              alt="Find Your University"
              width={280}
              height={90}
              style={{ objectFit: 'contain', display: 'block', marginLeft: '-60px' }}
            />
            <p className={styles.footerBrandName}>Find Your University</p>
          </div>
        </div>

        <div className={styles.footerCol}>
          <h3>TIMS</h3>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Mail size={16} color="#E8502A" className={styles.iconMargin} />
              <a href="mailto:info@timseducation.com">info@timseducation.com</a>
            </div>
            <div className={styles.contactItem}>
              <Phone size={16} color="#E8502A" className={styles.iconMargin} />
              <a href="tel:+919961967777">+91 9961967777</a>
            </div>
          </div>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" aria-label="Facebook" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><Facebook size={18} /></a>
            <a href="https://instagram.com" aria-label="Instagram" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><Instagram size={18} /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><Linkedin size={18} /></a>
          </div>
        </div>

        <div className={styles.footerCol}>
          <h3>EDUMENTORA</h3>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Mail size={16} color="#E8502A" className={styles.iconMargin} />
              <a href="mailto:info@edumentora.in">info@edumentora.in</a>
            </div>
            <div className={styles.contactItem}>
              <Phone size={16} color="#E8502A" className={styles.iconMargin} />
              <a href="tel:+919961967777">+91 9961967777</a>
            </div>
          </div>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" aria-label="Facebook" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><Facebook size={18} /></a>
            <a href="https://instagram.com" aria-label="Instagram" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><Instagram size={18} /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><Linkedin size={18} /></a>
          </div>
        </div>

        <div className={styles.footerCol}>
          <h3>PROFESSIONAL SKILL CAMPUS</h3>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Mail size={16} color="#E8502A" className={styles.iconMargin} />
              <a href="mailto:info@pscampus.in">info@pscampus.in</a>
            </div>
            <div className={styles.contactItem}>
              <Phone size={16} color="#E8502A" className={styles.iconMargin} />
              <a href="tel:+919961967777">+91 9961967777</a>
            </div>
          </div>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" aria-label="Facebook" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><Facebook size={18} /></a>
            <a href="https://instagram.com" aria-label="Instagram" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><Instagram size={18} /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><Linkedin size={18} /></a>
          </div>
        </div>

        <div className={styles.footerCol}>
          <h3>CONTACT US</h3>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Mail size={16} color="#E8502A" className={styles.iconMargin} />
              <a href="mailto:info@timseducation.com">info@timseducation.com</a>
            </div>
            <div className={styles.contactItem}>
              <Phone size={16} color="#E8502A" className={styles.iconMargin} />
              <a href="tel:+919961967777">+91 9961967777</a>
            </div>
            <div className={styles.contactItem} style={{ marginTop: '0.75rem', alignItems: 'flex-start' }}>
              <MapPin size={16} color="#E8502A" className={styles.iconMargin} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                2nd floor Al madeela complex Calicut road Edappal 679576 MALAPPURAM DT Kerala
              </span>
            </div>
            <div className={styles.contactItem} style={{ marginTop: '0.75rem', alignItems: 'flex-start' }}>
              <MapPin size={16} color="#E8502A" className={styles.iconMargin} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                TIMS Tower, Thazhepalam, Tirur, Kerala 676101
              </span>
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
