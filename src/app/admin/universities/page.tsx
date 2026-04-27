
'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import Link from 'next/link';
import { Loader2, Trash2, X, AlertTriangle } from 'lucide-react';

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/universities/${deleteId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete university');
      setUniversities((prev) => prev.filter((uni) => uni._id !== deleteId));
      setDeleteId(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
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
                    <td style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <Link href={`/admin/universities/${uni._id}`} style={{ color: '#00122e', fontSize: '0.9rem', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, textDecoration: 'none' }}>View Details</Link>
                      <Link href={`/admin/universities/${uni._id}/edit`} style={{ color: '#64748b', fontSize: '0.9rem', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'none' }}>Edit</Link>
                      <button onClick={() => setDeleteId(uni._id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Trash2 size={16} />
                      </button>
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

      {deleteId && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', maxWidth: '400px', width: '90%', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ef4444' }}>
                <AlertTriangle size={24} />
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>Delete University</h3>
              </div>
              <button onClick={() => setDeleteId(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '0.25rem' }}>
                <X size={20} />
              </button>
            </div>
            
            <p style={{ color: '#475569', marginBottom: '2rem', lineHeight: 1.5 }}>
              Are you sure you want to delete this university? This action cannot be undone and will permanently remove all associated data.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setDeleteId(null)} 
                disabled={isDeleting}
                style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', fontWeight: 500, cursor: isDeleting ? 'not-allowed' : 'pointer' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete} 
                disabled={isDeleting}
                style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', background: '#ef4444', color: 'white', fontWeight: 500, cursor: isDeleting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                {isDeleting ? 'Deleting...' : 'Delete University'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
