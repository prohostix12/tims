
'use client';
import React, { useEffect, useState } from 'react';
import styles from '../admin.module.css';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/universities');
      if (!response.ok) throw new Error('Failed to fetch universities');
      const data = await response.json();
      setUniversities(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.tableTitle}>Managed Universities</h2>
        <Link href="/admin/universities/new" className={styles.actionBtn}>
          + Add University
        </Link>
      </div>

      {error && (
        <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '10px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div className={styles.tableContainer}>
        {loading ? (
          <div style={{ padding: '5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
            <Loader2 className="animate-spin" />
            <span>Loading universities...</span>
          </div>
        ) : (
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
              {universities.length > 0 ? universities.map((uni) => (
                <tr key={uni._id}>
                  <td style={{ fontWeight: 600 }}>{uni.name}</td>
                  <td>{uni.code}</td>
                  <td>{uni.location || 'N/A'}</td>
                  <td>
                    <span className={`${styles.badge} ${
                      uni.status === 'active' ? styles.badgeActive : 
                      uni.status === 'pending' ? styles.badgePending : styles.badgeInactive
                    }`}>
                      {uni.status.charAt(0).toUpperCase() + uni.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <button style={{ color: '#00122e', fontSize: '0.9rem', marginRight: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Manage</button>
                    <button style={{ color: '#64748b', fontSize: '0.9rem', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>
                    No universities found. Add your first university to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
