'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/app/admin/admin.module.css';
import { 
  Plus, 
  Search, 
  Trash2, 
  X, 
  CheckCircle2, 
  Loader2,
  AlertCircle,
  Award,
  BookOpen,
  Calendar,
  FileText,
  UploadCloud,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import ConfirmModal from '@/components/ConfirmModal';

export default function ResultsAdminPage() {
  const [results, setResults] = useState<any[]>([]);
  const [universities, setUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    course: '',
    university: '',
    marksheetUrl: '',
    type: 'file' as 'file' | 'link'
  });

  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: '' });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchResults();
    fetchUniversities();
  }, []);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/results');
      const data = await res.json();
      if (Array.isArray(data)) setResults(data);
    } catch (err) {
      console.error('Failed to fetch results', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUniversities = async () => {
    try {
      const res = await fetch('/api/admin/universities');
      const data = await res.json();
      if (Array.isArray(data)) setUniversities(data);
    } catch (err) {
      console.error('Failed to fetch universities', err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, marksheetUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId ? `/api/admin/results/${editingId}` : '/api/admin/results';
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setToast({ msg: `Result ${editingId ? 'updated' : 'uploaded'} successfully!`, type: 'success' });
        setIsFormOpen(false);
        setEditingId(null);
        setFormData({
          course: '',
          university: '',
          marksheetUrl: '',
          type: 'file'
        });
        fetchResults();
      } else {
        throw new Error('Failed to save result');
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
      course: item.course,
      university: item.university?._id || item.university,
      marksheetUrl: item.marksheetUrl,
      type: item.marksheetUrl?.startsWith('data:') ? 'file' : 'link'
    });
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/results/${deleteModal.id}`, { method: 'DELETE' });
      if (res.ok) {
        setToast({ msg: 'Result deleted successfully!', type: 'success' });
        fetchResults();
      }
    } catch (err) {
      setToast({ msg: 'Failed to delete result.', type: 'error' });
    } finally {
      setDeleteModal({ isOpen: false, id: '' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const filteredResults = results.filter(r => 
    r.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.university?.name && r.university.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Manage Examination Results</h1>
          <p style={{ color: '#64748b' }}>Upload course-wise examination results or digital marksheet links.</p>
        </div>
        <button className={styles.addBtn} onClick={() => setIsFormOpen(true)}>
          <Plus size={20} /> Upload New Result
        </button>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {toast.msg}
        </div>
      )}

      {/* Results List */}
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
            <span>Loading results...</span>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>University</th>
                <th>Entry Type</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.length > 0 ? filteredResults.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', background: '#fef2f2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef233c' }}>
                        <BookOpen size={20} />
                      </div>
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>{item.course}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <GraduationCap size={16} style={{ color: '#64748b' }} />
                      <span style={{ fontSize: '0.9rem', color: '#334155' }}>{item.university?.name || 'N/A'}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      background: item.marksheetUrl?.startsWith('data:') ? '#f0fdf4' : '#eff6ff', 
                      color: item.marksheetUrl?.startsWith('data:') ? '#16a34a' : '#2563eb', 
                      padding: '4px 8px', 
                      borderRadius: '4px' 
                    }}>
                      {item.marksheetUrl?.startsWith('data:') ? 'PDF FILE' : 'URL LINK'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <a href={item.marksheetUrl} target="_blank" rel="noopener noreferrer" className={styles.iconBtn} title="View Result">
                        {item.marksheetUrl?.startsWith('data:') ? <FileText size={18} /> : <ExternalLink size={18} />}
                      </a>
                      <button className={styles.iconBtn} onClick={() => handleEdit(item)} title="Edit">
                        <Plus size={18} style={{ transform: 'rotate(45deg)' }} />
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
                    No results found. Click "Upload New Result" to add one.
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
          <div className={styles.modalContent} style={{ maxWidth: '600px', width: '95%' }}>
            <div className={styles.modalHeader}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#00122e' }}>
                  {editingId ? 'Edit Result' : 'Upload Result'}
                </h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>Fill in the details to publish the examination results.</p>
              </div>
              <button className={styles.closeBtn} onClick={() => { setIsFormOpen(false); setEditingId(null); }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label className={styles.label}>University</label>
                  <select 
                    className={styles.input}
                    value={formData.university}
                    onChange={(e) => setFormData({...formData, university: e.target.value})}
                    required
                  >
                    <option value="">Select University</option>
                    {universities.map(u => (
                      <option key={u._id} value={u._id}>{u.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={styles.label}>Course / Program Name</label>
                  <input 
                    type="text" 
                    className={styles.input}
                    placeholder="e.g. MBA International Business - Sem 2"
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className={styles.label}>Entry Method</label>
                  <div style={{ display: 'flex', gap: '1rem', background: '#f8fafc', padding: '0.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, type: 'file'})}
                      style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: 'none', background: formData.type === 'file' ? '#ffffff' : 'transparent', boxShadow: formData.type === 'file' ? '0 4px 12px rgba(0,0,0,0.08)' : 'none', color: formData.type === 'file' ? '#ef233c' : '#64748b', fontWeight: 700, cursor: 'pointer' }}
                    >
                      File Upload
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, type: 'link'})}
                      style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: 'none', background: formData.type === 'link' ? '#ffffff' : 'transparent', boxShadow: formData.type === 'link' ? '0 4px 12px rgba(0,0,0,0.08)' : 'none', color: formData.type === 'link' ? '#ef233c' : '#64748b', fontWeight: 700, cursor: 'pointer' }}
                    >
                      External Link
                    </button>
                  </div>
                </div>

                <div>
                  <label className={styles.label}>{formData.type === 'file' ? 'Result Document (PDF)' : 'Result URL Link'}</label>
                  {formData.type === 'file' ? (
                    <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
                      <input 
                        type="file" 
                        accept=".pdf"
                        className={styles.input}
                        onChange={handleFileUpload}
                      />
                      {formData.marksheetUrl && formData.type === 'file' && (
                        <p style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '10px', fontWeight: 600 }}>
                          ✓ PDF File attached
                        </p>
                      )}
                    </div>
                  ) : (
                    <input 
                      type="url" 
                      className={styles.input}
                      placeholder="https://university.edu/results/mba-sem2.pdf"
                      value={formData.marksheetUrl}
                      onChange={(e) => setFormData({...formData, marksheetUrl: e.target.value})}
                      required
                    />
                  )}
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={() => { setIsFormOpen(false); setEditingId(null); }}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn} disabled={saving}>
                  {saving ? <><Loader2 className="animate-spin" size={20} /> Saving...</> : 'Save Result'}
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
        title="Delete Result"
        message="Are you sure you want to delete this result? This action cannot be undone."
      />
    </div>
  );
}
