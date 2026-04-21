
import React from 'react';
import styles from '../../admin.module.css';
import Link from 'next/link';

export default function NewUniversity() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/universities" style={{ color: '#64748b' }}>← Back</Link>
          <h2 className={styles.tableTitle}>Add New University</h2>
        </div>
      </div>

      <form className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>University Name</label>
            <input 
              type="text" 
              placeholder="e.g. Aligarh Muslim University" 
              className={styles.input} 
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Short Code</label>
            <input 
              type="text" 
              placeholder="e.g. AMU" 
              className={styles.input} 
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea 
            rows={4} 
            placeholder="Brief introduction of the university..." 
            className={styles.textarea}
          ></textarea>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Location</label>
            <input 
              type="text" 
              placeholder="City, State" 
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Establishing Year</label>
            <input 
              type="number" 
              placeholder="e.g. 1920" 
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Status</label>
            <select className={styles.select}>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Website URL</label>
            <input 
              type="url" 
              placeholder="https://example.edu" 
              className={styles.input}
            />
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Create University Profile
        </button>
      </form>
    </div>
  );
}
