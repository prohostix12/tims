import React from 'react';
import styles from '../admin.module.css';
import { TrendingUp } from 'lucide-react';

export default function CourseFinderAdmin() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Course Finder Management</h1>
          <p style={{ color: '#64748b' }}>Configure the logic and suggestions for the student course finder tool.</p>
        </div>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>A</div>
          <span>Admin</span>
        </div>
      </header>

      <div className={styles.dashboardGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Searches</span>
          <span className={styles.statValue}>1,452</span>
          <div className={`${styles.statTrend} ${styles.trendUp}`}>
            <TrendingUp size={16} /> 15% this week
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Conversion Rate</span>
          <span className={styles.statValue}>8.4%</span>
          <div className={`${styles.statTrend} ${styles.trendUp}`}>
            <TrendingUp size={16} /> 2% this week
          </div>
        </div>
      </div>

      <div className={styles.form}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#00122e' }}>Algorithm Settings</h2>
        
        <div className={styles.formGroup}>
          <label>Preference Weighting</label>
          <div style={{ display: 'flex', gap: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
              <input type="checkbox" defaultChecked /> Location
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
              <input type="checkbox" defaultChecked /> Budget
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
              <input type="checkbox" defaultChecked /> Specialization
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Top Recommended University (Featured)</label>
          <select className={styles.select}>
            <option>Amrita University</option>
            <option>Jain University</option>
            <option>Manipal Academy</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Custom Suggestion Prompt</label>
          <textarea 
            className={styles.textarea} 
            rows={3} 
            placeholder="e.g. Based on your interest in Finance, we recommend these top-tier MBA programs..."
          />
        </div>

        <button className={styles.submitBtn}>Update Course Finder Logic</button>
      </div>

      <div className={styles.tableContainer} style={{ marginTop: '2rem' }}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Recent Student Queries</h2>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Interest</th>
              <th>Location Pref.</th>
              <th>Recommendation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>
                No recent student queries found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
