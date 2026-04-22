
import React from 'react';
import styles from '../admin.module.css';

export default function EnrollmentsPage() {
  const enrollments: any[] = [];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Student Enrollments</h1>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>A</div>
          <span>Admin</span>
        </div>
      </header>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Recent Submissions</h2>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Program</th>
              <th>University</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length > 0 ? enrollments.map((enroll) => (
              <tr key={enroll.id}>
                <td style={{ fontWeight: 600 }}>{enroll.student}</td>
                <td>{enroll.program}</td>
                <td>{enroll.university}</td>
                <td>{enroll.date}</td>
                <td>
                  <span className={`${styles.badge} ${
                    enroll.status === 'Approved' ? styles.badgeActive : 
                    enroll.status === 'Pending' ? styles.badgePending : 
                    styles.badgeInactive
                  }`}>
                    {enroll.status}
                  </span>
                </td>
                <td>
                  <button style={{ color: '#00122e', fontWeight: 600, fontSize: '0.9rem', marginRight: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>View</button>
                  <button style={{ color: '#ef233c', fontWeight: 600, fontSize: '0.9rem', background: 'none', border: 'none', cursor: 'pointer' }}>Status</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>
                  No enrollments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
