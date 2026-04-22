
'use client';
import React, { useEffect, useState } from 'react';
import styles from './admin.module.css';
import Link from 'next/link';
import { Users, Book, School, MessageSquare, TrendingUp, TrendingDown, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const [statsData, setStatsData] = useState({
    universities: 0,
    pendingMessages: 0,
    students: 0,
    programs: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStatsData(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Total Students', value: statsData.students, trend: '0%', isUp: true, icon: <Users size={24} color="#1e293b" /> },
    { label: 'Active Programs', value: statsData.programs, trend: '0%', isUp: true, icon: <Book size={24} color="#1e293b" /> },
    { label: 'Universities', value: statsData.universities, trend: '0%', isUp: true, icon: <School size={24} color="#1e293b" /> },
    { label: 'Pending Inquiry', value: statsData.pendingMessages, trend: '0%', isUp: true, icon: <MessageSquare size={24} color="#1e293b" /> },
  ];

  const quickActions = [
    { name: 'Add University', link: '/admin/universities/new', color: '#00122e' },
    { name: 'New Program', link: '/admin/programs', color: '#ef233c' },
    { name: 'View Leads', link: '/admin/enrollments', color: '#10b981' },
    { name: 'SEO Check', link: '/admin/seo', color: '#f59e0b' },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome back, Administrator</h1>
          <p style={{ color: '#64748b', marginTop: '0.25rem' }}>Here's what's happening today.</p>
        </div>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>AD</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Admin User</span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Super Admin</span>
          </div>
        </div>
      </header>

      <div className={styles.dashboardGrid}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
            </div>
            {loading ? (
              <Loader2 className="animate-spin" size={24} style={{ margin: '0.5rem 0' }} />
            ) : (
              <span className={styles.statValue}>{stat.value}</span>
            )}
            <div className={`${styles.statTrend} ${stat.isUp ? styles.trendUp : styles.trendDown}`}>
              <span style={{ 
                background: stat.isUp ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                padding: '4px 10px',
                borderRadius: '50px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {stat.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {stat.trend}
              </span>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <h2 className={styles.tableTitle}>Recent Activities</h2>
            <Link href="/admin/enrollments" className={styles.actionBtn}>View All</Link>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Activity</th>
                <th>Category</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>
                  No recent activities found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.tableContainer} style={{ background: '#00122e', border: 'none' }}>
           <div className={styles.tableHeader} style={{ borderBottomColor: 'rgba(255,255,255,0.1)' }}>
            <h2 className={styles.tableTitle} style={{ color: 'white' }}>Quick Actions</h2>
          </div>
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {quickActions.map((action, i) => (
              <Link 
                key={i} 
                href={action.link}
                className={styles.quickActionLink}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: action.color }}></div>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{action.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
