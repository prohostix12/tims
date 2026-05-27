'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/app/admin/admin.module.css';
import { Plus, Edit, Trash2, X, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import ConfirmModal from '@/components/ConfirmModal';

export default function SiteStatsAdminPage() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ number: '', label: '', order: 0, status: 'active' });
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: '' });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/site-stats');
      const data = await res.json();
      if (Array.isArray(data)) setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats', err);
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
      const url = editingId ? `/api/admin/site-stats/${editingId}` : '/api/admin/site-stats';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        showToast(`Stat ${editingId ? 'updated' : 'created'} successfully!`, 'success');
        closeForm();
        fetchStats();
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
    setFormData({ number: item.number, label: item.label, order: item.order ?? 0, status: item.status });
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/site-stats/${deleteModal.id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Stat deleted successfully!', 'success');
        fetchStats();
      }
    } catch {
      showToast('Failed to delete stat.', 'error');
    } finally {
      setDeleteModal({ isOpen: false, id: '' });
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ number: '', label: '', order: 0, status: 'active' });
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Site Stats Management</h1>
          <p style={{ color: '#64748b' }}>Manage impact numbers shown on the homepage and about page (e.g. 50K Learners).</p>
        </div>
        <button className={styles.addBtn} onClick={() => setIsFormOpen(true)}>
          <Plus size={20} /> Add Stat
        </button>
      </header>

      {toast && (
        <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {toast.msg}
        </div>
      )}

      <div className={styles.tableContainer}>
        {loading ? (
          <div style={{ padding: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
            <Loader2 className="animate-spin" size={32} />
            <span>Loading stats...</span>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order</th>
                <th>Number</th>
                <th>Label</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats.length > 0 ? stats.map(item => (
                <tr key={item._id}>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>{item.order}</td>
                  <td style={{ fontWeight: 700, fontSize: '1.2rem', color: '#ef233c' }}>{item.number}</td>
                  <td style={{ color: '#0f172a' }}>{item.label}</td>
                  <td>
                    <span className={`${styles.badge} ${item.status === 'active' ? styles.badgeActive : styles.badgeInactive}`}>
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
                  <td colSpan={5} style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                    No stats found. Click &quot;Add Stat&quot; to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isFormOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} style={{ maxWidth: '500px' }}>
            <div className={styles.modalHeader}>
              <div>
                <h2 style={{ margin: 0 }}>{editingId ? 'Edit Stat' : 'Add New Stat'}</h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>e.g. Number: &quot;50K&quot;, Label: &quot;Learners&quot;</p>
              </div>
              <button className={styles.closeBtn} onClick={closeForm}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGrid} style={{ padding: 0 }}>
                  <div>
                    <label className={styles.label}>Number / Value</label>
                    <input type="text" className={styles.input} placeholder="e.g. 50K" value={formData.number} onChange={e => setFormData(p => ({ ...p, number: e.target.value }))} required />
                  </div>
                  <div>
                    <label className={styles.label}>Label</label>
                    <input type="text" className={styles.input} placeholder="e.g. Learners" value={formData.label} onChange={e => setFormData(p => ({ ...p, label: e.target.value }))} required />
                  </div>
                  <div>
                    <label className={styles.label}>Display Order</label>
                    <input type="number" className={styles.input} value={formData.order} onChange={e => setFormData(p => ({ ...p, order: Number(e.target.value) }))} min={0} />
                  </div>
                  <div>
                    <label className={styles.label}>Status</label>
                    <select className={styles.input} value={formData.status} onChange={e => setFormData(p => ({ ...p, status: e.target.value }))}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={closeForm}>Cancel</button>
                <button type="submit" className={styles.saveBtn} disabled={saving}>
                  {saving ? <><Loader2 className="animate-spin" size={20} /> Saving...</> : editingId ? 'Update Stat' : 'Add Stat'}
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
        title="Delete Stat"
        message="Are you sure you want to delete this stat? This action cannot be undone."
      />
    </div>
  );
}
