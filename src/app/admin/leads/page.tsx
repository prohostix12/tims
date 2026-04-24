'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import { Loader2, User, Mail, Phone, Calendar, Search } from 'lucide-react';

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/leads');
      if (!response.ok) throw new Error('Failed to fetch leads');
      const data = await response.json();
      setLeads(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/leads?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setLeads(leads.map(l => l._id === id ? { ...l, status: newStatus } : l));
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Student Leads</h1>
          <p style={{ color: '#64748b' }}>Manage and track enquiries from Course Finder and Contact forms.</p>
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
            <span style={{ fontWeight: 600 }}>Loading leads...</span>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student Info</th>
                <th>Contact Details</th>
                <th>Interest / Course</th>
                <th>Source</th>
                <th>Date Received</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.length > 0 ? leads.map((lead) => (
                <tr key={lead._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '36px', height: '36px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', flexShrink: 0 }}>
                        <User size={18} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, color: '#00122e' }}>{lead.name}</span>
                        {lead.description && (
                          <span style={{ fontSize: '0.75rem', color: '#64748b', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={lead.description}>
                            {lead.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#64748b' }}>
                        <Mail size={14} /> {lead.email}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#64748b' }}>
                        <Phone size={14} /> {lead.phone}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#00122e' }}>
                      {lead.interest || 'N/A'}
                    </span>
                  </td>
                  <td>
                    <span style={{ 
                      padding: '4px 10px', 
                      background: lead.source === 'Enquiry Form' ? '#ecfdf5' : '#eff6ff', 
                      color: lead.source === 'Enquiry Form' ? '#059669' : '#2563eb', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: 700 
                    }}>
                      {lead.source}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.85rem' }}>
                      <Calendar size={14} /> {formatDate(lead.createdAt)}
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${
                      lead.status === 'new' ? styles.badgeActive : 
                      lead.status === 'contacted' ? styles.badgePending : styles.badgeInactive
                    }`}>
                      {lead.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <select 
                      value={lead.status} 
                      onChange={(e) => updateStatus(lead._id, e.target.value)}
                      style={{ padding: '6px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.85rem', cursor: 'pointer' }}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="lost">Lost</option>
                      <option value="won">Won</option>
                    </select>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', color: '#94a3b8', padding: '5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                      <Search size={48} opacity={0.2} />
                      <p>No leads found. Enquiries from the website will appear here.</p>
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
