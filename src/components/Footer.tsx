
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
              src="/images/Untitled-46777.png"
              alt="PSH Solutions"
              width={180}
              height={180}
              style={{ objectFit: 'contain', display: 'block', margin: '0 0 1rem 0' }}
            />
          </div>
        </div>

        <div className={styles.footerCol}>
          <h3>TIMS</h3>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Mail size={16} color="#ffffff" className={styles.iconMargin} />
              <a href="mailto:info@findyouruniversity.com">info@findyouruniversity.com</a>
            </div>
            <div className={styles.contactItem}>
              <Phone size={16} color="#ffffff" className={styles.iconMargin} />
              <a href="tel:+9189435555592">+91 89435555592</a>
            </div>
            <div className={styles.contactItem} style={{ marginTop: '0.75rem', alignItems: 'flex-start' }}>
              <MapPin size={16} color="#ffffff" className={styles.iconMargin} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                Tirur, Malappuram,<br />
                Kerala
              </span>
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
              <Mail size={16} color="#ffffff" className={styles.iconMargin} />
              <a href="mailto:info@edumentora.in">info@edumentora.in</a>
            </div>
            <div className={styles.contactItem}>
              <Phone size={16} color="#ffffff" className={styles.iconMargin} />
              <a href="tel:+9189435555592">+91 89435555592</a>
            </div>
            <div className={styles.contactItem} style={{ marginTop: '0.75rem', alignItems: 'flex-start' }}>
              <MapPin size={16} color="#ffffff" className={styles.iconMargin} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                Calicut, Kerala
              </span>
            </div>
            <div className={styles.contactItem} style={{ marginTop: '0.75rem', alignItems: 'flex-start' }}>
              <MapPin size={16} color="#ffffff" className={styles.iconMargin} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                Kochi, Kerala
              </span>
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
              <Mail size={16} color="#ffffff" className={styles.iconMargin} />
              <a href="mailto:info@pscampus.in">info@pscampus.in</a>
            </div>
            <div className={styles.contactItem}>
              <Phone size={16} color="#ffffff" className={styles.iconMargin} />
              <a href="tel:+9189435555592">+91 89435555592</a>
            </div>
            <div className={styles.contactItem} style={{ marginTop: '0.75rem', alignItems: 'flex-start' }}>
              <MapPin size={16} color="#ffffff" className={styles.iconMargin} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                Tirur, Kerala
              </span>
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
              <Mail size={16} color="#ffffff" className={styles.iconMargin} />
              <a href="mailto:info@findyouruniversity.com">info@findyouruniversity.com</a>
            </div>
            <div className={styles.contactItem}>
              <Phone size={16} color="#ffffff" className={styles.iconMargin} />
              <a href="tel:+9189435555592">+91 89435555592</a>
            </div>
            <div className={styles.contactItem} style={{ marginTop: '0.75rem', alignItems: 'flex-start' }}>
              <MapPin size={16} color="#ffffff" className={styles.iconMargin} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                2nd floor Al madeela complex Calicut road Edappal 679576 MALAPPURAM DT Kerala
              </span>
            </div>
            <div className={styles.contactItem} style={{ marginTop: '0.75rem', alignItems: 'flex-start' }}>
              <MapPin size={16} color="#ffffff" className={styles.iconMargin} style={{ flexShrink: 0 }} />
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
