'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/app/admin/admin.module.css';
import { Plus, Search, Edit, Trash2, X, CheckCircle2, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import ConfirmModal from '@/components/ConfirmModal';

export default function ServicesAdminPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', icon: '', order: 0, status: 'active' });
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: '' });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      if (Array.isArray(data)) setServices(data);
    } catch (err) {
      console.error('Failed to fetch services', err);
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
      const url = editingId ? `/api/admin/services/${editingId}` : '/api/admin/services';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        showToast(`Service ${editingId ? 'updated' : 'created'} successfully!`, 'success');
        closeForm();
        fetchServices();
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
    setFormData({ title: item.title, description: item.description, icon: item.icon ?? '', order: item.order ?? 0, status: item.status });
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/services/${deleteModal.id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Service deleted successfully!', 'success');
        fetchServices();
      }
    } catch {
      showToast('Failed to delete service.', 'error');
    } finally {
      setDeleteModal({ isOpen: false, id: '' });
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ title: '', description: '', icon: '', order: 0, status: 'active' });
  };

  const seedDefaults = async () => {
    if (!confirm('This will add 6 default services from the website. Continue?')) return;
    setSeeding(true);
    try {
      const res = await fetch('/api/admin/services/seed', { method: 'POST' });
      if (res.ok) {
        showToast('Default services loaded!', 'success');
        fetchServices();
      } else {
        throw new Error();
      }
    } catch {
      showToast('Failed to load defaults.', 'error');
    } finally {
      setSeeding(false);
    }
  };

  const filtered = services.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Services Management</h1>
          <p style={{ color: '#64748b' }}>Manage service cards displayed on the website.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className={styles.addBtn}
            onClick={seedDefaults}
            disabled={seeding}
            style={{ background: '#fff', color: '#E8502A', border: '1.5px solid #E8502A' }}
          >
            <RefreshCw size={18} /> {seeding ? 'Loading...' : 'Load Defaults'}
          </button>
          <button className={styles.addBtn} onClick={() => setIsFormOpen(true)}>
            <Plus size={20} /> Add Service
          </button>
        </div>
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
            <input type="text" placeholder="Search services..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
            <Loader2 className="animate-spin" size={32} />
            <span>Loading services...</span>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map(item => (
                <tr key={item._id}>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>{item.order}</td>
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
                    No services found.{' '}
                    <button onClick={seedDefaults} style={{ color: '#E8502A', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, textDecoration: 'underline' }}>
                      Load defaults from website
                    </button>{' '}or click &quot;Add Service&quot; to create one.
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
                <h2 style={{ margin: 0 }}>{editingId ? 'Edit Service' : 'Add New Service'}</h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>Add a service card for the website.</p>
              </div>
              <button className={styles.closeBtn} onClick={closeForm}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGrid} style={{ padding: 0 }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Title</label>
                    <input type="text" className={styles.input} placeholder="e.g. Online UG Programs" value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} required />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Description</label>
                    <textarea className={styles.input} rows={4} placeholder="Describe this service..." value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} required />
                  </div>
                  <div>
                    <label className={styles.label}>Icon (optional)</label>
                    <input type="text" className={styles.input} placeholder="e.g. GraduationCap" value={formData.icon} onChange={e => setFormData(p => ({ ...p, icon: e.target.value }))} />
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
                  {saving ? <><Loader2 className="animate-spin" size={20} /> Saving...</> : editingId ? 'Update Service' : 'Add Service'}
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
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone."
      />
    </div>
  );
}
