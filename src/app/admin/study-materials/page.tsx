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
  Book,
  Edit,
  Layers
} from 'lucide-react';
import ConfirmModal from '@/components/ConfirmModal';

export default function StudyMaterialsAdminPage() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    university: '',
    course: '',
    semester: '',
    subject: '',
    fileUrl: '',
    category: 'General',
    fileType: 'PDF'
  });
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: '' });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [universities, setUniversities] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);

  useEffect(() => {
    fetchMaterials();
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

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setFormData({
      university: item.university?._id || item.university || '',
      course: item.course?._id || item.course || '',
      semester: item.semester || '',
      subject: item.subject,
      fileUrl: item.fileUrl,
      category: item.category || 'General',
      fileType: item.fileType || 'PDF'
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId ? `/api/admin/study-materials/${editingId}` : '/api/admin/study-materials';
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setToast({ msg: `Material ${editingId ? 'updated' : 'uploaded'} successfully!`, type: 'success' });
        setIsFormOpen(false);
        setEditingId(null);
        setFormData({
          university: '',
          course: '',
          semester: '',
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
    m.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.semester?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Study Materials</h1>
          <p style={{ color: '#64748b' }}>Upload and manage educational resources and PDFs for students.</p>
        </div>
        <button className={styles.addBtn} onClick={() => { setIsFormOpen(true); setEditingId(null); }}>
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
              placeholder="Search by subject or semester..." 
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
                <th>Subject & Semester</th>
                <th>University</th>
                <th>Course</th>
                <th>Category</th>
                <th>Format</th>
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
                      <div>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{item.subject}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Layers size={12} /> {item.semester || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.university?.name || '-'}</td>
                  <td>{item.course?.name || '-'}</td>
                  <td>{item.category}</td>
                  <td>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#f1f5f9', color: '#64748b', padding: '4px 8px', borderRadius: '4px' }}>
                      {item.fileType}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className={styles.iconBtn} title="Download">
                        <Download size={18} />
                      </a>
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
                  <td colSpan={6} style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
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
          <div className={styles.modalContent} style={{ maxWidth: '600px' }}>
            <div className={styles.modalHeader}>
              <div>
                <h2 style={{ margin: 0 }}>{editingId ? 'Edit Study Material' : 'Upload Study Material'}</h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>Fill in academic criteria and attach resource.</p>
              </div>
              <button className={styles.closeBtn} onClick={() => { setIsFormOpen(false); setEditingId(null); }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
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
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
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
                        <option value="General Material">General Material</option>
                      </select>
                    </div>

                    <div>
                      <label className={styles.label}>4. Subject Name</label>
                      <input 
                        type="text" 
                        className={styles.input}
                        placeholder="e.g. Financial Accounting"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label className={styles.label}>5. Category</label>
                      <select 
                        className={styles.input} 
                        value={formData.category} 
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        <option value="General">General</option>
                        <option value="Core Subject">Core Subject</option>
                        <option value="Elective">Elective</option>
                        <option value="Practical">Practical</option>
                        <option value="Reference">Reference</option>
                      </select>
                    </div>

                    <div>
                      <label className={styles.label}>6. Resource Format</label>
                      <select 
                        className={styles.input} 
                        value={formData.fileType} 
                        onChange={(e) => setFormData({...formData, fileType: e.target.value})}
                      >
                        <option value="PDF">PDF Document</option>
                        <option value="Video">Video Lecture</option>
                        <option value="Notes">Handwritten Notes</option>
                        <option value="PPT">Presentation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={styles.label}><FileText size={16} /> 7. Upload Resource</label>
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx,application/pdf,video/*,.ppt,.pptx"
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
                  {saving ? <><Loader2 className="animate-spin" size={20} /> Saving...</> : editingId ? 'Update Material' : 'Upload Material'}
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
