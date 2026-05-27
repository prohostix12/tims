'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/app/admin/admin.module.css';
import { Plus, Search, Edit, Trash2, X, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import ConfirmModal from '@/components/ConfirmModal';

export default function DirectorsAdminPage() {
  const [directors, setDirectors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', role: '', bio: '', image: '', order: 0, status: 'active' });
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: '' });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { fetchDirectors(); }, []);

  const fetchDirectors = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/directors');
      const data = await res.json();
      if (Array.isArray(data)) setDirectors(data);
    } catch (err) {
      console.error('Failed to fetch directors', err);
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
      const url = editingId ? `/api/admin/directors/${editingId}` : '/api/admin/directors';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        showToast(`Director ${editingId ? 'updated' : 'created'} successfully!`, 'success');
        closeForm();
        fetchDirectors();
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
    setFormData({ name: item.name, role: item.role, bio: item.bio, image: item.image ?? '', order: item.order ?? 0, status: item.status });
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/directors/${deleteModal.id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Director deleted successfully!', 'success');
        fetchDirectors();
      }
    } catch {
      showToast('Failed to delete director.', 'error');
    } finally {
      setDeleteModal({ isOpen: false, id: '' });
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ name: '', role: '', bio: '', image: '', order: 0, status: 'active' });
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Directors Management</h1>
          <p style={{ color: '#64748b' }}>Manage the leadership team shown on the About page.</p>
        </div>
        <button className={styles.addBtn} onClick={() => setIsFormOpen(true)}>
          <Plus size={20} /> Add Director
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
            <span>Loading directors...</span>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order</th>
                <th>Director</th>
                <th>Role</th>
                <th>Bio</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {directors.length > 0 ? directors.map(item => (
                <tr key={item._id}>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>{item.order}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {item.image && (
                        <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                      )}
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>{item.name}</span>
                    </div>
                  </td>
                  <td style={{ color: '#475569' }}>{item.role}</td>
                  <td style={{ color: '#475569', fontSize: '0.85rem', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.bio}</td>
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
                  <td colSpan={6} style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                    No directors found. Click &quot;Add Director&quot; to get started.
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
                <h2 style={{ margin: 0 }}>{editingId ? 'Edit Director' : 'Add New Director'}</h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>Add a leadership team member for the About page.</p>
              </div>
              <button className={styles.closeBtn} onClick={closeForm}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGrid} style={{ padding: 0 }}>
                  <div>
                    <label className={styles.label}>Full Name</label>
                    <input type="text" className={styles.input} placeholder="e.g. Adv. ShoukathAli Pootheri" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required />
                  </div>
                  <div>
                    <label className={styles.label}>Role / Title</label>
                    <input type="text" className={styles.input} placeholder="e.g. Founder & Director" value={formData.role} onChange={e => setFormData(p => ({ ...p, role: e.target.value }))} required />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Bio</label>
                    <textarea className={styles.input} rows={3} placeholder="Short biography..." value={formData.bio} onChange={e => setFormData(p => ({ ...p, bio: e.target.value }))} required />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Image Path</label>
                    <input type="text" className={styles.input} placeholder="e.g. /images/director-name.jpg" value={formData.image} onChange={e => setFormData(p => ({ ...p, image: e.target.value }))} />
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
                  {saving ? <><Loader2 className="animate-spin" size={20} /> Saving...</> : editingId ? 'Update Director' : 'Add Director'}
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
        title="Delete Director"
        message="Are you sure you want to delete this director? This action cannot be undone."
      />
    </div>
  );
}
