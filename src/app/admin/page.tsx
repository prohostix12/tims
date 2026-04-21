
import React from 'react';
import styles from './admin.module.css';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Students', value: '1,280', trend: '+12%', isUp: true },
    { label: 'Active Programs', value: '45', trend: '+4', isUp: true },
    { label: 'Universities', value: '12', trend: '0', isUp: true },
    { label: 'Inquiries', value: '89', trend: '+25%', isUp: true },
  ];

  const recentUniversities: any[] = [];

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardGrid}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <span className={styles.statLabel}>{stat.label}</span>
            <span className={styles.statValue}>{stat.value}</span>
            <div className={`${styles.statTrend} ${stat.isUp ? styles.trendUp : styles.trendDown}`}>
              {stat.isUp ? '↑' : '↓'} {stat.trend} this month
            </div>
          </div>
        ))}
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Recent Universities</h2>
          <Link href="/admin/universities/new" className={styles.actionBtn}>
            + Add University
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>University Name</th>
              <th>Code</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentUniversities.map((uni) => (
              <tr key={uni.id}>
                <td style={{ fontWeight: 600 }}>{uni.name}</td>
                <td>{uni.code}</td>
                <td>
                  <span className={`${styles.badge} ${uni.status === 'Active' ? styles.badgeActive : styles.badgePending}`}>
                    {uni.status}
                  </span>
                </td>
                <td>
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
