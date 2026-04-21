
import React from 'react';
import styles from '../admin.module.css';
import Link from 'next/link';

export default function UniversitiesPage() {
  const universities: any[] = [];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.tableTitle}>Managed Universities</h2>
        <Link href="/admin/universities/new" className={styles.actionBtn}>
          + Add University
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>University Name</th>
              <th>Code</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((uni) => (
              <tr key={uni.id}>
                <td style={{ fontWeight: 600 }}>{uni.name}</td>
                <td>{uni.code}</td>
                <td>{uni.location}</td>
                <td>
                  <span className={`${styles.badge} ${
                    uni.status === 'Active' ? styles.badgeActive : 
                    uni.status === 'Pending' ? styles.badgePending : styles.badgeInactive
                  }`}>
                    {uni.status}
                  </span>
                </td>
                <td>
                  <button style={{ color: '#00122e', fontSize: '0.9rem', marginRight: '1rem' }}>Manage</button>
                  <button style={{ color: '#64748b', fontSize: '0.9rem' }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
