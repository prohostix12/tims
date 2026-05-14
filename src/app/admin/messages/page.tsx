'use client';
import React, { useEffect, useState } from 'react';
import styles from '../admin.module.css';
import { Loader2, Trash2, MailOpen, Mail } from 'lucide-react';

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/messages');
      if (!res.ok) throw new Error('Failed to fetch messages');
      setMessages(await res.json());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const markRead = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      });
      if (res.ok) setMessages(msgs => msgs.map(m => m._id === id ? { ...m, read: true } : m));
    } catch { /* silent */ }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' });
      if (res.ok) setMessages(msgs => msgs.filter(m => m._id !== id));
    } catch { /* silent */ } finally {
      setDeleting(null);
    }
  };

  const toggleExpand = async (id: string, read: boolean) => {
    setExpanded(prev => (prev === id ? null : id));
    if (!read) await markRead(id);
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const unread = messages.filter(m => !m.read).length;

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Contact Messages</h1>
          <p style={{ color: '#64748b' }}>
            {unread > 0 ? <><strong style={{ color: '#ef233c' }}>{unread} unread</strong> messages</> : 'All messages read'}
          </p>
        </div>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>AD</div>
          <span>Admin</span>
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
                <th style={{ width: 32 }}></th>
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
                <React.Fragment key={msg._id}>
                  <tr
                    style={{ cursor: 'pointer', backgroundColor: !msg.read ? 'rgba(239,35,60,0.03)' : undefined, fontWeight: !msg.read ? 600 : 400 }}
                    onClick={() => toggleExpand(msg._id, msg.read)}
                  >
                    <td>
                      {msg.read
                        ? <MailOpen size={16} color="#94a3b8" />
                        : <Mail size={16} color="#ef233c" />}
                    </td>
                    <td style={{ fontWeight: msg.read ? 500 : 700 }}>{msg.name}</td>
                    <td style={{ color: '#64748b' }}>{msg.email}</td>
                    <td>{msg.subject}</td>
                    <td style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{formatDate(msg.createdAt)}</td>
                    <td>
                      <span className={`${styles.badge} ${msg.read ? styles.badgeActive : styles.badgePending}`}>
                        {msg.read ? 'Read' : 'New'}
                      </span>
                    </td>
                    <td onClick={e => e.stopPropagation()}>
                      {!msg.read && (
                        <button
                          onClick={() => markRead(msg._id)}
                          style={{ color: '#00122e', fontWeight: 600, fontSize: '0.85rem', marginRight: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => deleteMessage(msg._id)}
                        disabled={deleting === msg._id}
                        style={{ color: '#ef233c', background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                      >
                        {deleting === msg._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={15} />}
                      </button>
                    </td>
                  </tr>
                  {expanded === msg._id && (
                    <tr>
                      <td colSpan={7} style={{ background: '#f8fafc', padding: '1.25rem 1.5rem', borderBottom: '2px solid #e2e8f0' }}>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#334155', lineHeight: 1.7 }}>{msg.message}</p>
                        {msg.phone && <p style={{ margin: '0.5rem 0 0', fontSize: '0.82rem', color: '#64748b' }}>Phone: {msg.phone}</p>}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              )) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>
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
