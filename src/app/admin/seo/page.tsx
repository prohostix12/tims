
import React from 'react';
import styles from '../admin.module.css';
import { Globe, Save, Loader2, Info } from 'lucide-react';

export default function SEOPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>SEO Settings</h1>
          <p style={{ color: '#64748b' }}>Configure global search engine optimization and analytics.</p>
        </div>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>A</div>
          <span>Admin</span>
        </div>
      </header>

      <div className={styles.modalContent} style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className={styles.modalBody}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label className={styles.label}><Globe size={16} /> Global Default Title</label>
              <input type="text" className={styles.input} defaultValue="TIMS - The Institute of Management Studies" />
            </div>
            
            <div>
              <label className={styles.label}>Global Meta Description</label>
              <textarea className={styles.textarea} rows={4} defaultValue="TIMS provides world-class education and management programs for aspiring professionals." />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label className={styles.label}>Google Analytics ID</label>
                <input type="text" className={styles.input} placeholder="UA-XXXXXXXXX-X" />
              </div>
              <div>
                <label className={styles.label}>Sitemap URL</label>
                <input type="text" className={styles.input} placeholder="https://example.com/sitemap.xml" />
              </div>
            </div>

            <div>
              <label className={styles.label}>Keywords (Comma separated)</label>
              <input type="text" className={styles.input} defaultValue="education, management, courses, university, TIMS" />
            </div>
            
            <div style={{ padding: '1rem', background: '#eff6ff', borderRadius: '12px', border: '1px solid #dbeafe', color: '#1e40af', fontSize: '0.85rem', display: 'flex', gap: '10px' }}>
              <Info size={18} style={{ flexShrink: 0 }} />
              <p style={{ margin: 0 }}>These settings apply globally to all pages unless specific SEO overrides are defined for a particular course or university profile.</p>
            </div>
          </div>
        </div>
        
        <div className={styles.modalFooter}>
          <button className={styles.saveBtn} style={{ padding: '0.8rem 2rem' }}>
            <Save size={18} /> Save SEO Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
