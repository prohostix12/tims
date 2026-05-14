'use client';
import React, { useEffect, useState } from 'react';
import styles from '../admin.module.css';
import { Loader2, User, Mail, Phone, Book, School, Calendar, Search } from 'lucide-react';

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [enrollRes, batchRes] = await Promise.all([
        fetch('/api/admin/enrollments'),
        fetch('/api/admin/batches')
      ]);

      if (enrollRes.ok && batchRes.ok) {
        const enrollData = await enrollRes.json();
        const batchData = await batchRes.json();
        setEnrollments(enrollData);
        setBatches(batchData);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateEnrollment = async (id: string, updates: any) => {
    try {
      const response = await fetch(`/api/admin/enrollments?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (response.ok) {
        const updated = await response.json();
        setEnrollments(enrollments.map(e => e._id === id ? { ...e, ...updates, batchId: batches.find(b => b._id === updates.batchId) || e.batchId } : e));
        // Refresh data to get populated fields correctly if needed, or just update local state
        if (updates.batchId) fetchData(); 
      }
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const formatDate = (dateString: string) => {
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
          <h1 className={styles.title}>Student Enrollments</h1>
          <p style={{ color: '#64748b' }}>Manage registered students and assign them to academic batches.</p>
        </div>
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
            <span style={{ fontWeight: 600 }}>Loading enrollments...</span>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student Info</th>
                <th>Program / University</th>
                <th>Assigned Batch</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.length > 0 ? enrollments.map((enroll) => (
                <tr key={enroll._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '36px', height: '36px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                        <User size={18} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, color: '#00122e' }}>{enroll.studentName}</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Mail size={12} /> {enroll.email}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                          <Phone size={12} /> {enroll.phone}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
                        <Book size={14} color="#ef233c" /> {enroll.program}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#64748b' }}>
                        <School size={14} /> {enroll.university}
                      </div>
                    </div>
                  </td>
                  <td>
                    <select 
                      value={enroll.batchId?._id || ''} 
                      onChange={(e) => updateEnrollment(enroll._id, { batchId: e.target.value })}
                      style={{ 
                        padding: '6px 10px', 
                        borderRadius: '8px', 
                        border: '1px solid #e2e8f0', 
                        fontSize: '0.85rem', 
                        width: '180px',
                        backgroundColor: enroll.batchId ? '#f0f9ff' : 'white',
                        color: enroll.batchId ? '#0369a1' : '#64748b',
                        fontWeight: enroll.batchId ? 600 : 400
                      }}
                    >
                      <option value="">Not Assigned</option>
                      {batches.map(batch => (
                        <option key={batch._id} value={batch._id}>{batch.name}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${
                      enroll.status === 'Approved' ? styles.badgeActive : 
                      enroll.status === 'Pending' ? styles.badgePending : styles.badgeInactive
                    }`}>
                      {enroll.status}
                    </span>
                  </td>
                  <td>
                    <select 
                      value={enroll.status} 
                      onChange={(e) => updateEnrollment(enroll._id, { status: e.target.value })}
                      style={{ padding: '6px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: '#94a3b8', padding: '5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                      <Search size={48} opacity={0.2} />
                      <p>No student enrollments found.</p>
                    </div>
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
