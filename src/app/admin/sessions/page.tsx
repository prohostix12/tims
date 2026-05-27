'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/app/admin/admin.module.css';
import { Plus, Search, Edit, Trash2, X, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import ConfirmModal from '@/components/ConfirmModal';

export default function SessionsAdminPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', date: '', time: '', link: '', status: 'upcoming', order: 0 });
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: '' });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { fetchSessions(); }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/sessions');
      const data = await res.json();
      if (Array.isArray(data)) setSessions(data);
    } catch (err) {
      console.error('Failed to fetch sessions', err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId ? `/api/admin/sessions/${editingId}` : '/api/admin/sessions';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        showToast(`Session ${editingId ? 'updated' : 'created'} successfully!`, 'success');
        closeForm();
        fetchSessions();
      } else {
        throw new Error('Failed to save');
      }
    } catch {
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setFormData({
      title: item.title,
      description: item.description ?? '',
      date: item.date ?? '',
      time: item.time ?? '',
      link: item.link ?? '',
      status: item.status,
      order: item.order ?? 0,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/sessions/${deleteModal.id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Session deleted successfully!', 'success');
        fetchSessions();
      }
    } catch {
      showToast('Failed to delete session.', 'error');
    } finally {
      setDeleteModal({ isOpen: false, id: '' });
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ title: '', description: '', date: '', time: '', link: '', status: 'upcoming', order: 0 });
  };

  const statusColor: Record<string, string> = {
    upcoming: styles.badgeActive,
    completed: styles.badgeInactive,
    cancelled: styles.badgeInactive,
  };

  const filtered = sessions.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.description ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Sessions</h1>
          <p style={{ color: '#64748b' }}>Manage live sessions, webinars, and classes.</p>
        </div>
        <button className={styles.addBtn} onClick={() => setIsFormOpen(true)}>
          <Plus size={20} /> Add Session
        </button>
      </header>

      {toast && (
        <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {toast.msg}
        </div>
      )}

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input type="text" placeholder="Search sessions..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
            <Loader2 className="animate-spin" size={32} />
            <span>Loading sessions...</span>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order</th>
                <th>Title</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map(item => (
                <tr key={item._id}>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>{item.order}</td>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>{item.title}</td>
                  <td style={{ color: '#475569', fontSize: '0.85rem' }}>{item.date || '—'}</td>
                  <td style={{ color: '#475569', fontSize: '0.85rem' }}>{item.time || '—'}</td>
                  <td>
                    <span className={`${styles.badge} ${statusColor[item.status] ?? styles.badgeInactive}`}>
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className={styles.iconBtn} onClick={() => handleEdit(item)} title="Edit"><Edit size={18} /></button>
                      <button className={styles.iconBtn} style={{ color: '#ef233c' }} onClick={() => setDeleteModal({ isOpen: true, id: item._id })} title="Delete"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                    No sessions found. Click &quot;Add Session&quot; to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isFormOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} style={{ maxWidth: '700px' }}>
            <div className={styles.modalHeader}>
              <div>
                <h2 style={{ margin: 0 }}>{editingId ? 'Edit Session' : 'Add New Session'}</h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>Fill in the session details below.</p>
              </div>
              <button className={styles.closeBtn} onClick={closeForm}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGrid} style={{ padding: 0 }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Title *</label>
                    <input type="text" className={styles.input} placeholder="e.g. MBA Orientation Session" value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} required />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Description</label>
                    <textarea className={styles.input} rows={3} placeholder="Brief description of the session..." value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} />
                  </div>
                  <div>
                    <label className={styles.label}>Date</label>
                    <input type="date" className={styles.input} value={formData.date} onChange={e => setFormData(p => ({ ...p, date: e.target.value }))} />
                  </div>
                  <div>
                    <label className={styles.label}>Time</label>
                    <input type="time" className={styles.input} value={formData.time} onChange={e => setFormData(p => ({ ...p, time: e.target.value }))} />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Session Link</label>
                    <input type="url" className={styles.input} placeholder="https://meet.google.com/..." value={formData.link} onChange={e => setFormData(p => ({ ...p, link: e.target.value }))} />
                  </div>
                  <div>
                    <label className={styles.label}>Status</label>
                    <select className={styles.input} value={formData.status} onChange={e => setFormData(p => ({ ...p, status: e.target.value }))}>
                      <option value="upcoming">Upcoming</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className={styles.label}>Display Order</label>
                    <input type="number" className={styles.input} value={formData.order} onChange={e => setFormData(p => ({ ...p, order: Number(e.target.value) }))} min={0} />
                  </div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={closeForm}>Cancel</button>
                <button type="submit" className={styles.saveBtn} disabled={saving}>
                  {saving ? <><Loader2 className="animate-spin" size={20} /> Saving...</> : editingId ? 'Update Session' : 'Add Session'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: '' })}
        onConfirm={handleDelete}
        title="Delete Session"
        message="Are you sure you want to delete this session? This action cannot be undone."
      />
    </div>
  );
}
