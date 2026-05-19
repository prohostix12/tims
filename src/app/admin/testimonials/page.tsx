'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/app/admin/admin.module.css';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  X, 
  CheckCircle2, 
  Loader2,
  AlertCircle,
  Star,
  MessageSquare
} from 'lucide-react';
import ConfirmModal from '@/components/ConfirmModal';

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    avatar: '',
    rating: 5,
    text: '',
    status: 'active'
  });
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: '' });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/testimonials');
      const data = await res.json();
      if (Array.isArray(data)) setTestimonials(data);
    } catch (err) {
      console.error('Failed to fetch testimonials', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: name === 'rating' ? Number(value) : value };
      // Auto-generate avatar from first letter of name
      if (name === 'name' && value.length > 0) {
        newData.avatar = value.charAt(0).toUpperCase();
      }
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId ? `/api/admin/testimonials/${editingId}` : '/api/admin/testimonials';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setToast({ msg: `Testimonial ${editingId ? 'updated' : 'created'} successfully!`, type: 'success' });
        setIsFormOpen(false);
        setEditingId(null);
        setFormData({
          name: '',
          role: '',
          avatar: '',
          rating: 5,
          text: '',
          status: 'active'
        });
        fetchTestimonials();
      } else {
        throw new Error('Failed to save testimonial');
      }
    } catch (err) {
      setToast({ msg: 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setFormData({
      name: item.name,
      role: item.role,
      avatar: item.avatar || '',
      rating: item.rating || 5,
      text: item.text,
      status: item.status || 'active'
    });
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/testimonials/${deleteModal.id}`, { method: 'DELETE' });
      if (res.ok) {
        setToast({ msg: 'Testimonial deleted successfully!', type: 'success' });
        fetchTestimonials();
      }
    } catch (err) {
      setToast({ msg: 'Failed to delete testimonial.', type: 'error' });
    } finally {
      setDeleteModal({ isOpen: false, id: '' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const filteredTestimonials = testimonials.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Success Stories Management</h1>
          <p style={{ color: '#64748b' }}>Manage student testimonials displayed on the homepage.</p>
        </div>
        <button className={styles.addBtn} onClick={() => setIsFormOpen(true)}>
          <Plus size={20} /> Add Testimonial
        </button>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {toast.msg}
        </div>
      )}

      {/* Testimonials List */}
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search testimonials..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
            <Loader2 className="animate-spin" size={32} />
            <span>Loading testimonials...</span>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Testimonial</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTestimonials.length > 0 ? filteredTestimonials.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '40px', height: '40px', borderRadius: '50%', 
                        background: 'linear-gradient(135deg, #e74c3c, #c0392b)', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        color: '#fff', fontWeight: 700, fontSize: '1rem' 
                      }}>
                        {item.avatar}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, color: '#0f172a' }}>{item.name}</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.role}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p style={{ fontSize: '0.85rem', color: '#475569', maxWidth: '350px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0 }}>
                      {item.text}
                    </p>
                  </td>
                  <td>
                    <span style={{ color: '#f59e0b', letterSpacing: '2px' }}>
                      {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${item.status === 'active' ? styles.badgeActive : styles.badgeInactive}`}>
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className={styles.iconBtn} onClick={() => handleEdit(item)} title="Edit">
                        <Edit size={18} />
                      </button>
                      <button className={styles.iconBtn} style={{ color: '#ef233c' }} onClick={() => setDeleteModal({ isOpen: true, id: item._id })} title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                    No testimonials found. Click &quot;Add Testimonial&quot; to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Create/Edit Modal */}
      {isFormOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} style={{ maxWidth: '700px' }}>
            <div className={styles.modalHeader}>
              <div>
                <h2 style={{ margin: 0 }}>{editingId ? 'Edit Testimonial' : 'Add New Testimonial'}</h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>Add a student success story to showcase on the homepage.</p>
              </div>
              <button className={styles.closeBtn} onClick={() => { setIsFormOpen(false); setEditingId(null); }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGrid} style={{ padding: 0 }}>
                  <div>
                    <label className={styles.label}>Student Name</label>
                    <input 
                      type="text" 
                      name="name"
                      className={styles.input}
                      placeholder="e.g. Aisha Raheem"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className={styles.label}>Role / Program</label>
                    <input 
                      type="text" 
                      name="role"
                      className={styles.input}
                      placeholder="e.g. MBA Graduate, Dubai"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className={styles.label}>Avatar Letter</label>
                    <input 
                      type="text" 
                      name="avatar"
                      className={styles.input}
                      placeholder="e.g. A"
                      maxLength={2}
                      value={formData.avatar}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className={styles.label}><Star size={16} /> Rating (1-5)</label>
                    <select name="rating" className={styles.input} value={formData.rating} onChange={handleInputChange}>
                      <option value={5}>★★★★★ (5)</option>
                      <option value={4}>★★★★☆ (4)</option>
                      <option value={3}>★★★☆☆ (3)</option>
                      <option value={2}>★★☆☆☆ (2)</option>
                      <option value={1}>★☆☆☆☆ (1)</option>
                    </select>
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}><MessageSquare size={16} /> Testimonial Text</label>
                    <textarea 
                      name="text"
                      className={styles.input}
                      rows={4}
                      placeholder="Write the student's testimonial here..."
                      value={formData.text}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className={styles.label}>Status</label>
                    <select name="status" className={styles.input} value={formData.status} onChange={handleInputChange}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={() => { setIsFormOpen(false); setEditingId(null); }}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn} disabled={saving} style={{ padding: '0.8rem 2.5rem' }}>
                  {saving ? <><Loader2 className="animate-spin" size={20} /> Saving...</> : editingId ? 'Update Testimonial' : 'Add Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: '' })}
        onConfirm={handleDelete}
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
      />
    </div>
  );
}
