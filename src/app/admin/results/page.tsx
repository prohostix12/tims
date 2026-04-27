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
  User,
  Hash,
  BookOpen,
  Calendar,
  FileText,
  UploadCloud
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
    studentName: '',
    registerNumber: '',
    dob: '',
    course: '',
    university: '',
    status: 'PASSED',
    marksheetUrl: ''
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
          studentName: '',
          registerNumber: '',
          dob: '',
          course: '',
          university: '',
          status: 'PASSED',
          marksheetUrl: ''
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
      studentName: item.studentName,
      registerNumber: item.registerNumber,
      dob: item.dob,
      course: item.course,
      university: item.university?._id || item.university,
      status: item.status,
      marksheetUrl: item.marksheetUrl
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
    r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.registerNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Student Results</h1>
          <p style={{ color: '#64748b' }}>Upload and manage examination results and digital marksheets.</p>
        </div>
        <button className={styles.addBtn} onClick={() => setIsFormOpen(true)}>
          <Plus size={20} /> Upload Result
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
              placeholder="Search by name or register number..." 
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
                <th>Student</th>
                <th>Register No</th>
                <th>Course / University</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.length > 0 ? filteredResults.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', background: '#fef2f2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef233c' }}>
                        <User size={20} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{item.studentName}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>DOB: {item.dob}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <code style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontWeight: 700 }}>{item.registerNumber}</code>
                  </td>
                  <td>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.course}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.university?.name || 'N/A'}</div>
                    </div>
                  </td>
                  <td>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      background: item.status === 'PASSED' ? '#f0fdf4' : item.status === 'FAILED' ? '#fef2f2' : '#fff7ed', 
                      color: item.status === 'PASSED' ? '#16a34a' : item.status === 'FAILED' ? '#dc2626' : '#ea580c', 
                      padding: '4px 8px', 
                      borderRadius: '4px' 
                    }}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <a href={item.marksheetUrl} target="_blank" rel="noopener noreferrer" className={styles.iconBtn} title="View Marksheet">
                        <FileText size={18} />
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
                    No results found. Click "Upload Result" to add one.
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
          <div className={styles.modalContent} style={{ maxWidth: '700px', width: '95%' }}>
            <div className={styles.modalHeader}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#00122e' }}>
                  {editingId ? 'Edit Result' : 'Upload Result'}
                </h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>Enter student details and attach the digital marksheet.</p>
              </div>
              <button className={styles.closeBtn} onClick={() => { setIsFormOpen(false); setEditingId(null); }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label className={styles.label}>Student Full Name</label>
                  <input 
                    type="text" 
                    className={styles.input}
                    placeholder="e.g. Sivaprasad K"
                    value={formData.studentName}
                    onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className={styles.label}>Register Number</label>
                  <input 
                    type="text" 
                    className={styles.input}
                    placeholder="e.g. TIMS2024001"
                    value={formData.registerNumber}
                    onChange={(e) => setFormData({...formData, registerNumber: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className={styles.label}>Date of Birth</label>
                  <input 
                    type="date" 
                    className={styles.input}
                    value={formData.dob}
                    onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className={styles.label}>Course Name</label>
                  <input 
                    type="text" 
                    className={styles.input}
                    placeholder="e.g. MBA International Business"
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                    required
                  />
                </div>

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
                  <label className={styles.label}>Result Status</label>
                  <select 
                    className={styles.input}
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    required
                  >
                    <option value="PASSED">PASSED</option>
                    <option value="FAILED">FAILED</option>
                    <option value="WITHHELD">WITHHELD</option>
                    <option value="PENDING">PENDING</option>
                  </select>
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label className={styles.label}>Digital Marksheet (PDF/Image)</label>
                  <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
                    <input 
                      type="file" 
                      accept=".pdf,image/*"
                      className={styles.input}
                      onChange={handleFileUpload}
                    />
                    {formData.marksheetUrl && (
                      <p style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '10px', fontWeight: 600 }}>
                        ✓ File attached successfully
                      </p>
                    )}
                  </div>
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
