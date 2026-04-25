'use client';

import React from 'react';
import { Wand2 } from 'lucide-react';
import styles from './FloatingCourseFinder.module.css';

export default function FloatingCourseFinder() {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('open-course-finder'));
  };

  return (
    <button 
      className={styles.fab} 
      onClick={handleClick}
      aria-label="Open Course Finder"
    >
      <Wand2 size={22} />
      <span className={styles.fabText}>Course Finder</span>
    </button>
  );
}
