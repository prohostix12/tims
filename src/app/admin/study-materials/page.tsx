'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/app/admin/admin.module.css';
import { 
  Plus, 
  Search, 
  Trash2, 
  FileText, 
  X, 
  CheckCircle2, 
  Loader2,
  AlertCircle,
  Download,
  Book
} from 'lucide-react';
import ConfirmModal from '@/components/ConfirmModal';

export default function StudyMaterialsAdminPage() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    fileUrl: '',
    category: 'General',
    fileType: 'PDF'
  });
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: '' });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/study-materials');
      const data = await res.json();
      if (Array.isArray(data)) setMaterials(data);
    } catch (err) {
      console.error('Failed to fetch materials', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/study-materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setToast({ msg: 'Study material uploaded successfully!', type: 'success' });
        setIsFormOpen(false);
        setFormData({
          subject: '',
          fileUrl: '',
          category: 'General',
          fileType: 'PDF'
        });
        fetchMaterials();
      } else {
        throw new Error('Failed to save material');
      }
    } catch (err) {
      setToast({ msg: 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/study-materials/${deleteModal.id}`, { method: 'DELETE' });
      if (res.ok) {
        setToast({ msg: 'Material removed successfully!', type: 'success' });
        fetchMaterials();
      }
    } catch (err) {
      setToast({ msg: 'Failed to remove material.', type: 'error' });
    } finally {
      setDeleteModal({ isOpen: false, id: '' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const filteredMaterials = materials.filter(m => 
    m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Study Materials</h1>
          <p style={{ color: '#64748b' }}>Upload and manage educational resources and PDFs for students.</p>
        </div>
        <button className={styles.addBtn} onClick={() => setIsFormOpen(true)}>
          <Plus size={20} /> Upload Material
        </button>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {toast.msg}
        </div>
      )}

      {/* Materials List */}
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by subject..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
            <Loader2 className="animate-spin" size={32} />
            <span>Loading materials...</span>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Subject Name</th>
                <th>Category</th>
                <th>Format</th>
                <th>Upload Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMaterials.length > 0 ? filteredMaterials.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', background: '#ecfdf5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                        <Book size={20} />
                      </div>
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>{item.subject}</span>
                    </div>
                  </td>
                  <td>{item.category}</td>
                  <td>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#f1f5f9', color: '#64748b', padding: '4px 8px', borderRadius: '4px' }}>
                      {item.fileType}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className={styles.iconBtn} title="Download">
                        <Download size={18} />
                      </a>
                      <button className={styles.iconBtn} style={{ color: '#ef233c' }} onClick={() => setDeleteModal({ isOpen: true, id: item._id })} title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                    No study materials found. Click "Upload Material" to add your first resource.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Upload Modal */}
      {isFormOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} style={{ maxWidth: '500px' }}>
            <div className={styles.modalHeader}>
              <div>
                <h2 style={{ margin: 0 }}>Upload Study Material</h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>Add educational resources for student download.</p>
              </div>
              <button className={styles.closeBtn} onClick={() => setIsFormOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label className={styles.label}>Subject Name</label>
                    <input 
                      type="text" 
                      className={styles.input}
                      placeholder="e.g. Business Administration"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className={styles.label}>Category</label>
                    <select 
                      className={styles.input} 
                      value={formData.category} 
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="General">General</option>
                      <option value="UG Programs">UG Programs</option>
                      <option value="PG Programs">PG Programs</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Competitive Exams">Competitive Exams</option>
                    </select>
                  </div>

                  <div>
                    <label className={styles.label}><FileText size={16} /> File / Document URL</label>
                    <input 
                      type="text" 
                      className={styles.input}
                      placeholder="https://example.com/material.pdf"
                      value={formData.fileUrl}
                      onChange={(e) => setFormData({...formData, fileUrl: e.target.value})}
                      required
                    />
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                      Provide a direct link to the PDF document.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsFormOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn} disabled={saving} style={{ padding: '0.8rem 2.5rem' }}>
                  {saving ? <><Loader2 className="animate-spin" size={20} /> Uploading...</> : 'Upload Resource'}
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
        title="Remove Material"
        message="Are you sure you want to remove this study material? Students will no longer be able to access it."
      />
    </div>
  );
}
