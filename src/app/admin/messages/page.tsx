
'use client';
import React, { useEffect, useState } from 'react';
import styles from '../admin.module.css';
import { Loader2 } from 'lucide-react';

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/messages');
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Contact Messages</h1>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>AD</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>Admin</span>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Messages</span>
          </div>
        </div>
      </header>

      {error && (
        <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '10px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Inbox ({messages.length})</h2>
        </div>
        
        {loading ? (
          <div style={{ padding: '5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
            <Loader2 className="animate-spin" />
            <span>Loading inbox...</span>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Sender</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.length > 0 ? messages.map((msg) => (
                <tr key={msg._id} style={!msg.read ? { backgroundColor: 'rgba(239, 35, 60, 0.02)' } : {}}>
                  <td style={{ fontWeight: 600 }}>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.subject}</td>
                  <td>{formatDate(msg.createdAt)}</td>
                  <td>
                    <span className={`${styles.badge} ${msg.read ? styles.badgeActive : styles.badgePending}`}>
                      {msg.read ? 'Read' : 'New'}
                    </span>
                  </td>
                  <td>
                    <button style={{ color: '#00122e', fontWeight: 600, fontSize: '0.9rem', marginRight: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>Read</button>
                    <button style={{ color: '#ef233c', fontWeight: 600, fontSize: '0.9rem', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>
                    No messages found.
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
