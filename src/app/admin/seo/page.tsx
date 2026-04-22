
import React from 'react';
import styles from '../admin.module.css';

export default function SEOPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>SEO Settings</h1>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>A</div>
          <span>Admin</span>
        </div>
      </header>

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label>Global Default Title</label>
          <input type="text" className={styles.input} defaultValue="TIMS - The Institute of Management Studies" />
        </div>
        
        <div className={styles.formGroup}>
          <label>Global Meta Description</label>
          <textarea className={styles.textarea} rows={4} defaultValue="TIMS provides world-class education and management programs for aspiring professionals." />
        </div>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Google Analytics ID</label>
            <input type="text" className={styles.input} placeholder="UA-XXXXXXXXX-X" />
          </div>
          <div className={styles.formGroup}>
            <label>Sitemap URL</label>
            <input type="text" className={styles.input} placeholder="https://example.com/sitemap.xml" />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Keywords (Comma separated)</label>
          <input type="text" className={styles.input} defaultValue="education, management, courses, university, TIMS" />
        </div>

        <button className={styles.submitBtn}>Save SEO Configuration</button>
      </div>
    </div>
  );
}
