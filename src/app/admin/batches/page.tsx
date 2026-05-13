'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import Link from 'next/link';
import { Loader2, Trash2, Edit, Calendar, Book, School } from 'lucide-react';

export default function BatchesPage() {
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/batches');
      if (!response.ok) throw new Error('Failed to fetch batches');
      const data = await response.json();
      setBatches(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBatch = async (id: string) => {
    if (!confirm('Are you sure you want to delete this batch?')) return;
    try {
      const response = await fetch(`/api/admin/batches/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setBatches(batches.filter(b => b._id !== id));
      }
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Academic Batches</h1>
          <p style={{ color: '#64748b' }}>Manage student cohorts and their academic schedules.</p>
        </div>
        <Link href="/admin/batches/new" className={styles.actionBtn}>
          + New Batch
        </Link>
      </header>

      {error && (
        <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '10px', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      <div className={styles.tableContainer}>
        {loading ? (
          <div style={{ padding: '5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
            <Loader2 className="animate-spin" size={32} />
            <span style={{ fontWeight: 600 }}>Loading batches...</span>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Batch Name</th>
                <th>University</th>
                <th>Program</th>
                <th>Timeline</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {batches.length > 0 ? batches.map((batch) => (
                <tr key={batch._id}>
                  <td>
                    <span style={{ fontWeight: 600, color: '#00122e' }}>{batch.name}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                      <School size={14} color="#64748b" />
                      {batch.universityId?.name || 'Unknown University'}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                      <Book size={14} color="#64748b" />
                      {batch.programId?.name || 'Unknown Program'}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.85rem', color: '#64748b' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={12} /> {formatDate(batch.startDate)}
                      </div>
                      <span style={{ marginLeft: '18px', fontSize: '0.75rem' }}>to {formatDate(batch.endDate)}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${
                      batch.status === 'Active' ? styles.badgeActive : 
                      batch.status === 'Upcoming' ? styles.badgePending : styles.badgeInactive
                    }`}>
                      {batch.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <Link href={`/admin/batches/${batch._id}/edit`} style={{ color: '#00122e' }} title="Edit">
                        <Edit size={18} />
                      </Link>
                      <button onClick={() => deleteBatch(batch._id)} style={{ color: '#ef233c', background: 'none', border: 'none', cursor: 'pointer' }} title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', color: '#94a3b8', padding: '5rem' }}>
                    No batches found. Create a new batch to start organizing students.
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
