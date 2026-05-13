'use client';

import React, { useEffect, useState } from 'react';
import styles from './UniversityLogoBanner.module.css';

interface UniversityLogo {
  _id: string;
  name: string;
  logoUrl: string;
}

const DEFAULT_UNI_LOGOS = [
  { name: 'Amity University',      logoUrl: '/images/universities/amity.png' },
  { name: 'Manipal University',    logoUrl: '/images/universities/manipal.png' },
  { name: 'LPU',                   logoUrl: '/images/universities/lpu.png' },
  { name: 'Jain University',       logoUrl: '/university_logos/jain-university.png' },
  { name: 'Chandigarh University', logoUrl: '/university_logos/chandigarh-university.png' },
  { name: 'Manipal University',    logoUrl: '/university_logos/manipal-university.png' },
  { name: 'Sikkim Manipal',        logoUrl: '/university_logos/sikkim-manipal-university.png' },
  { name: 'Vignan University',     logoUrl: '/university_logos/vignan-university.png' },
];

export default function UniversityLogoBanner() {
  const [logos, setLogos] = useState<UniversityLogo[]>([]);

  useEffect(() => {
    fetch('/api/public/university-logos')
      .then(r => r.ok ? r.json() : [])
      .then(data => { if (Array.isArray(data) && data.length > 0) setLogos(data); })
      .catch(() => {});
  }, []);

  const displayLogos = logos.length > 0 ? logos : DEFAULT_UNI_LOGOS;

  return (
    <div className={styles.bannerWrapper}>
      <div className={styles.bannerTrack}>
        {[...displayLogos, ...displayLogos, ...displayLogos].map((logo, i) => (
          <div key={i} className={styles.logoCard}>
            <img
              src={logo.logoUrl}
              alt={logo.name}
              className={styles.logoImg}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(logo.name)}&background=random&size=128`; }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
