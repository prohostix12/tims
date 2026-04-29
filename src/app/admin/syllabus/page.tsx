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
  GraduationCap,
  Layers
} from 'lucide-react';
import ConfirmModal from '@/components/ConfirmModal';

export default function SyllabusAdminPage() {
  const [syllabi, setSyllabi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    university: '',
    course: '',
    semester: '',
    fileUrl: ''
  });

  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: '' });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [universities, setUniversities] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);

  useEffect(() => {
    fetchSyllabi();
    fetchUniversitiesAndPrograms();
  }, []);

  const fetchUniversitiesAndPrograms = async () => {
    try {
      const [uniRes, progRes] = await Promise.all([
        fetch('/api/admin/universities'),
        fetch('/api/admin/programs', { cache: 'no-store' })
      ]);
      const uniData = await uniRes.json();
      const progData = await progRes.json();
      if (Array.isArray(uniData)) setUniversities(uniData);
      if (Array.isArray(progData)) setPrograms(progData);
    } catch (err) {
      console.error('Failed to fetch dependencies', err);
    }
  };

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, fileUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
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
          university: '',
          course: '',
          semester: '',
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
      university: item.university?._id || item.university || '',
      course: item.course?._id || item.course || '',
      semester: item.semester || '',
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
    s.course?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.university?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.semester?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Course Syllabus</h1>
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
              placeholder="Search syllabus..." 
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
                <th>Semester</th>
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
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>{item.course?.name || '-'}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                      <GraduationCap size={16} /> {item.university?.name || '-'}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontWeight: 600 }}>
                      <Layers size={16} /> {item.semester || 'N/A'}
                    </div>
                  </td>
                  <td>
                    <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#2563eb', fontWeight: 600, fontSize: '0.85rem' }}>
                      <Download size={16} /> View PDF
                    </a>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button className={styles.iconBtn} onClick={() => handleEdit(item)} title="Edit" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#00122e', fontWeight: 600 }}>
                        <Edit size={16} /> Edit
                      </button>
                      <button className={styles.iconBtn} style={{ color: '#ef233c', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }} onClick={() => setDeleteModal({ isOpen: true, id: item._id })} title="Delete">
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
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
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>Fill in academic criteria and attach PDF.</p>
              </div>
              <button className={styles.closeBtn} onClick={() => { setIsFormOpen(false); setEditingId(null); }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label className={styles.label}>1. University</label>
                    <select 
                      className={styles.input} 
                      value={formData.university} 
                      onChange={(e) => setFormData({...formData, university: e.target.value, course: ''})}
                      required
                    >
                      <option value="">Select University</option>
                      {universities.map(u => (
                        <option key={u._id} value={u._id}>{u.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={styles.label}>2. Course</label>
                    <select 
                      className={styles.input} 
                      value={formData.course} 
                      onChange={(e) => setFormData({...formData, course: e.target.value})}
                      required
                      disabled={!formData.university}
                    >
                      <option value="">Select Course</option>
                      {programs.filter(p => {
                        const uniId = p.university?._id || p.university;
                        return String(uniId) === String(formData.university);
                      }).map(p => (
                        <option key={p._id} value={p._id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={styles.label}>3. Semester</label>
                    <select 
                      className={styles.input} 
                      value={formData.semester} 
                      onChange={(e) => setFormData({...formData, semester: e.target.value})}
                      required
                    >
                      <option value="">Select Semester</option>
                      <option value="1st Semester">1st Semester</option>
                      <option value="2nd Semester">2nd Semester</option>
                      <option value="3rd Semester">3rd Semester</option>
                      <option value="4th Semester">4th Semester</option>
                      <option value="5th Semester">5th Semester</option>
                      <option value="6th Semester">6th Semester</option>
                      <option value="7th Semester">7th Semester</option>
                      <option value="8th Semester">8th Semester</option>
                      <option value="Annual System">Annual System</option>
                      <option value="Full Curriculum">Full Curriculum</option>
                    </select>
                  </div>

                  <div>
                    <label className={styles.label}><FileText size={16} /> 4. Syllabus Document (PDF)</label>
                    <input 
                      type="file" 
                      accept=".pdf,application/pdf"
                      className={styles.input}
                      onChange={handleFileUpload}
                    />
                    {formData.fileUrl && (
                      <p style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '6px', fontWeight: 600 }}>
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
