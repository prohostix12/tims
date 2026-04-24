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
  BookOpen,
  Edit,
  GraduationCap
} from 'lucide-react';
import ConfirmModal from '@/components/ConfirmModal';

export default function SyllabusAdminPage() {
  const [syllabi, setSyllabi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    courseName: '',
    universityName: '',
    fileUrl: ''
  });

  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: '' });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchSyllabi();
  }, []);

  const fetchSyllabi = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/syllabus');
      const data = await res.json();
      if (Array.isArray(data)) setSyllabi(data);
    } catch (err) {
      console.error('Failed to fetch syllabi', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId ? `/api/admin/syllabus/${editingId}` : '/api/admin/syllabus';
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setToast({ msg: `Syllabus ${editingId ? 'updated' : 'uploaded'} successfully!`, type: 'success' });
        setIsFormOpen(false);
        setEditingId(null);
        setFormData({
          courseName: '',
          universityName: '',
          fileUrl: ''
        });
        fetchSyllabi();
      } else {
        throw new Error('Failed to save syllabus');
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
      courseName: item.courseName,
      universityName: item.universityName,
      fileUrl: item.fileUrl
    });
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/syllabus/${deleteModal.id}`, { method: 'DELETE' });
      if (res.ok) {
        setToast({ msg: 'Syllabus removed successfully!', type: 'success' });
        fetchSyllabi();
      }
    } catch (err) {
      setToast({ msg: 'Failed to remove syllabus.', type: 'error' });
    } finally {
      setDeleteModal({ isOpen: false, id: '' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const filteredSyllabi = syllabi.filter(s => 
    s.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.universityName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Course Syllabi</h1>
          <p style={{ color: '#64748b' }}>Upload and manage official curriculum documents for all programs.</p>
        </div>
        <button className={styles.addBtn} onClick={() => { setIsFormOpen(true); setEditingId(null); }}>
          <Plus size={20} /> Upload Syllabus
        </button>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {toast.msg}
        </div>
      )}

      {/* Syllabus List */}
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by course or university..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
            <Loader2 className="animate-spin" size={32} />
            <span>Loading documents...</span>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>University</th>
                <th>Document</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSyllabi.length > 0 ? filteredSyllabi.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', background: '#fff1f2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef233c' }}>
                        <BookOpen size={20} />
                      </div>
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>{item.courseName}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                      <GraduationCap size={16} /> {item.universityName}
                    </div>
                  </td>
                  <td>
                    <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#2563eb', fontWeight: 600, fontSize: '0.85rem' }}>
                      <Download size={16} /> View PDF
                    </a>
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
                  <td colSpan={4} style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                    No syllabi found. Click "Upload Syllabus" to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Upload/Edit Modal */}
      {isFormOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} style={{ maxWidth: '500px' }}>
            <div className={styles.modalHeader}>
              <div>
                <h2 style={{ margin: 0 }}>{editingId ? 'Edit Syllabus' : 'Upload New Syllabus'}</h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>Upload official program curriculum docs.</p>
              </div>
              <button className={styles.closeBtn} onClick={() => { setIsFormOpen(false); setEditingId(null); }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label className={styles.label}>Course Name</label>
                    <input 
                      type="text" 
                      className={styles.input}
                      placeholder="e.g. Bachelor of Commerce (B.Com)"
                      value={formData.courseName}
                      onChange={(e) => setFormData({...formData, courseName: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className={styles.label}>University Name</label>
                    <input 
                      type="text" 
                      className={styles.input}
                      placeholder="e.g. Mahatma Gandhi University"
                      value={formData.universityName}
                      onChange={(e) => setFormData({...formData, universityName: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className={styles.label}><FileText size={16} /> Syllabus PDF URL</label>
                    <input 
                      type="text" 
                      className={styles.input}
                      placeholder="https://example.com/syllabus.pdf"
                      value={formData.fileUrl}
                      onChange={(e) => setFormData({...formData, fileUrl: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={() => { setIsFormOpen(false); setEditingId(null); }}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn} disabled={saving} style={{ padding: '0.8rem 2.5rem' }}>
                  {saving ? <><Loader2 className="animate-spin" size={20} /> Saving...</> : editingId ? 'Update Syllabus' : 'Upload Syllabus'}
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
        title="Remove Syllabus"
        message="Are you sure you want to remove this syllabus document? This action cannot be undone."
      />
    </div>
  );
}
