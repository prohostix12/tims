'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';
import { Mail, Facebook, Instagram, Phone, MapPin, Linkedin } from 'lucide-react';

interface FooterSection {
  heading: string;
  email: string;
  phone: string;
  addresses: string[];
  socialFacebook: string;
  socialInstagram: string;
  socialLinkedin: string;
  showSocial: boolean;
}

interface FooterData {
  sections: FooterSection[];
  copyrightText: string;
}

const DEFAULT: FooterData = {
  copyrightText: 'TIMS Education',
  sections: [
    {
      heading: 'TIMS',
      email: 'info@findyouruniversity.com',
      phone: '+91 8943555592',
      addresses: ['Tirur, Malappuram, Kerala'],
      socialFacebook: 'https://facebook.com',
      socialInstagram: 'https://www.instagram.com/find_youruniversity?igsh=YW55NmE0czY3dncz&utm_source=qr',
      socialLinkedin: 'https://linkedin.com',
      showSocial: true,
    },
    {
      heading: 'EDUMENTORA',
      email: 'info@edumentora.in',
      phone: '+91 8943555592',
      addresses: ['Calicut, Kerala', 'Kochi, Kerala'],
      socialFacebook: 'https://facebook.com',
      socialInstagram: 'https://www.instagram.com/find_youruniversity?igsh=YW55NmE0czY3dncz&utm_source=qr',
      socialLinkedin: 'https://linkedin.com',
      showSocial: true,
    },
    {
      heading: 'PROFESSIONAL SKILL CAMPUS',
      email: 'info@pscampus.in',
      phone: '+91 8943555592',
      addresses: ['Tirur, Kerala'],
      socialFacebook: 'https://facebook.com',
      socialInstagram: 'https://www.instagram.com/find_youruniversity?igsh=YW55NmE0czY3dncz&utm_source=qr',
      socialLinkedin: 'https://linkedin.com',
      showSocial: true,
    },
    {
      heading: 'CONTACT US',
      email: 'info@findyouruniversity.com',
      phone: '+91 8943555592',
      addresses: [
        '2nd floor Al madeela complex Calicut road Edappal 679576 MALAPPURAM DT Kerala',
        'TIMS Tower, Thazhepalam, Tirur, Kerala 676101',
      ],
      socialFacebook: '',
      socialInstagram: '',
      socialLinkedin: '',
      showSocial: false,
    },
  ],
};

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterData>(DEFAULT);

  useEffect(() => {
    fetch('/api/public/footer')
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d && Array.isArray(d.sections) && d.sections.length > 0) {
          setFooterData({ sections: d.sections, copyrightText: d.copyrightText || 'TIMS Education' });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid} style={{ gridTemplateColumns: `1.2fr ${footerData.sections.map(() => '1fr').join(' ')}` }}>

        {/* Logo column */}
        <div className={styles.footerCol}>
          <div style={{ marginBottom: '1rem', marginTop: '-3rem' }}>
            <Image
              src="/images/Untitled-46777.png"
              alt="PSH Solutions"
              width={180}
              height={180}
              style={{ objectFit: 'contain', display: 'block', margin: '0 0 1rem 0' }}
            />
          </div>
        </div>

        {/* Dynamic sections */}
        {footerData.sections.map((sec, i) => (
          <div key={i} className={styles.footerCol}>
            <h3>{sec.heading}</h3>
            <div className={styles.contactInfo}>
              {sec.email && (
                <div className={styles.contactItem}>
                  <Mail size={16} color="#ffffff" className={styles.iconMargin} />
                  <a href={`mailto:${sec.email}`}>{sec.email}</a>
                </div>
              )}
              {sec.phone && (
                <div className={styles.contactItem}>
                  <Phone size={16} color="#ffffff" className={styles.iconMargin} />
                  <a href={`tel:${sec.phone.replace(/\s/g, '')}`}>{sec.phone}</a>
                </div>
              )}
              {sec.addresses.filter(a => a.trim()).map((addr, ai) => (
                <div key={ai} className={styles.contactItem} style={{ marginTop: '0.75rem', alignItems: 'flex-start' }}>
                  <MapPin size={16} color="#ffffff" className={styles.iconMargin} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>{addr}</span>
                </div>
              ))}
            </div>
            {sec.showSocial && (
              <div className={styles.socialIcons}>
                {sec.socialFacebook && (
                  <a href={sec.socialFacebook} aria-label="Facebook" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                    <Facebook size={18} />
                  </a>
                )}
                {sec.socialInstagram && (
                  <a href={sec.socialInstagram} aria-label="Instagram" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                    <Instagram size={18} />
                  </a>
                )}
                {sec.socialLinkedin && (
                  <a href={sec.socialLinkedin} aria-label="LinkedIn" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                    <Linkedin size={18} />
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.footerBottom}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <p>© Copyright {new Date().getFullYear()} by {footerData.copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
