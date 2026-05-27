'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/app/admin/admin.module.css';
import { Plus, Edit, Trash2, X, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import ConfirmModal from '@/components/ConfirmModal';

export default function HowItWorksAdminPage() {
  const [steps, setSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ stepNumber: 1, title: '', description: '', order: 0, status: 'active' });
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: '' });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { fetchSteps(); }, []);

  const fetchSteps = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/how-it-works');
      const data = await res.json();
      if (Array.isArray(data)) setSteps(data);
    } catch (err) {
      console.error('Failed to fetch steps', err);
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
      const url = editingId ? `/api/admin/how-it-works/${editingId}` : '/api/admin/how-it-works';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        showToast(`Step ${editingId ? 'updated' : 'created'} successfully!`, 'success');
        closeForm();
        fetchSteps();
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
    setFormData({ stepNumber: item.stepNumber, title: item.title, description: item.description, order: item.order ?? 0, status: item.status });
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/how-it-works/${deleteModal.id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Step deleted successfully!', 'success');
        fetchSteps();
      }
    } catch {
      showToast('Failed to delete step.', 'error');
    } finally {
      setDeleteModal({ isOpen: false, id: '' });
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ stepNumber: 1, title: '', description: '', order: 0, status: 'active' });
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>How It Works</h1>
          <p style={{ color: '#64748b' }}>Manage the step-by-step process shown on the homepage.</p>
        </div>
        <button className={styles.addBtn} onClick={() => setIsFormOpen(true)}>
          <Plus size={20} /> Add Step
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
            <span>Loading steps...</span>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Step #</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {steps.length > 0 ? steps.map(item => (
                <tr key={item._id}>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: '#ef233c', color: '#fff', fontWeight: 700 }}>
                      {item.stepNumber}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>{item.title}</td>
                  <td style={{ color: '#475569', fontSize: '0.85rem', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.description}</td>
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
                    No steps found. Click &quot;Add Step&quot; to get started.
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
                <h2 style={{ margin: 0 }}>{editingId ? 'Edit Step' : 'Add New Step'}</h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>Add a step to the &quot;How It Works&quot; section.</p>
              </div>
              <button className={styles.closeBtn} onClick={closeForm}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGrid} style={{ padding: 0 }}>
                  <div>
                    <label className={styles.label}>Step Number</label>
                    <input type="number" className={styles.input} value={formData.stepNumber} onChange={e => setFormData(p => ({ ...p, stepNumber: Number(e.target.value) }))} min={1} required />
                  </div>
                  <div>
                    <label className={styles.label}>Display Order</label>
                    <input type="number" className={styles.input} value={formData.order} onChange={e => setFormData(p => ({ ...p, order: Number(e.target.value) }))} min={0} />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Title</label>
                    <input type="text" className={styles.input} placeholder="e.g. Choose Your Course" value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} required />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Description</label>
                    <textarea className={styles.input} rows={3} placeholder="Describe this step..." value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} required />
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
                  {saving ? <><Loader2 className="animate-spin" size={20} /> Saving...</> : editingId ? 'Update Step' : 'Add Step'}
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
        title="Delete Step"
        message="Are you sure you want to delete this step? This action cannot be undone."
      />
    </div>
  );
}
