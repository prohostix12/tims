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
  Calendar,
  Clock,
  Edit,
  Layers,
  UploadCloud,
  ChevronLeft,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import ConfirmModal from '@/components/ConfirmModal';

export default function TimetableAdminPage() {
  const [timetables, setTimetables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formType, setFormType] = useState<'manual' | 'file'>('manual');
  
  const [formData, setFormData] = useState({
    university: '',
    course: '',
    semester: '',
    examName: '',
    type: 'manual' as 'manual' | 'file',
    fileUrl: '',
    entries: [{ code: '', subject: '', date: '', time: '' }]
  });

  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: '' });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [universities, setUniversities] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);

  useEffect(() => {
    fetchTimetables();
    fetchUniversitiesAndPrograms();
  }, []);

  const fetchUniversitiesAndPrograms = async () => {
    try {
      const [uniRes, progRes] = await Promise.all([
        fetch('/api/admin/universities'),
        fetch('/api/admin/programs')
      ]);
      const uniData = await uniRes.json();
      const progData = await progRes.json();
      if (Array.isArray(uniData)) setUniversities(uniData);
      if (Array.isArray(progData)) setPrograms(progData);
    } catch (err) {
      console.error('Failed to fetch dependencies', err);
    }
  };

  const fetchTimetables = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/timetable');
      const data = await res.json();
      if (Array.isArray(data)) setTimetables(data);
    } catch (err) {
      console.error('Failed to fetch timetables', err);
    } finally {
      setLoading(false);
    }
  };

  const addEntry = () => {
    setFormData({
      ...formData,
      entries: [...formData.entries, { code: '', subject: '', date: '', time: '' }]
    });
  };

  const removeEntry = (index: number) => {
    const newEntries = formData.entries.filter((_, i) => i !== index);
    setFormData({ ...formData, entries: newEntries });
  };

  const handleEntryChange = (index: number, field: string, value: string) => {
    const newEntries = [...formData.entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setFormData({ ...formData, entries: newEntries });
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
      const url = editingId ? `/api/admin/timetable/${editingId}` : '/api/admin/timetable';
      const method = editingId ? 'PUT' : 'POST';
      
      const payload = { ...formData, type: formType };
      if (formType === 'file') payload.entries = [];
      else payload.fileUrl = '';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setToast({ msg: `Timetable ${editingId ? 'updated' : 'created'} successfully!`, type: 'success' });
        setIsFormOpen(false);
        setEditingId(null);
        setFormData({
          university: '',
          course: '',
          semester: '',
          examName: '',
          type: 'manual',
          fileUrl: '',
          entries: [{ code: '', subject: '', date: '', time: '' }]
        });
        fetchTimetables();
      } else {
        throw new Error('Failed to save timetable');
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
    setFormType(item.type);
    setFormData({
      university: item.university?._id || item.university || '',
      course: item.course?._id || item.course || '',
      semester: item.semester || '',
      examName: item.examName,
      type: item.type,
      fileUrl: item.fileUrl || '',
      entries: item.entries.length > 0 ? item.entries : [{ code: '', subject: '', date: '', time: '' }]
    });
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/timetable/${deleteModal.id}`, { method: 'DELETE' });
      if (res.ok) {
        setToast({ msg: 'Timetable deleted successfully!', type: 'success' });
        fetchTimetables();
      }
    } catch (err) {
      setToast({ msg: 'Failed to delete timetable.', type: 'error' });
    } finally {
      setDeleteModal({ isOpen: false, id: '' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const filteredTimetables = timetables.filter(t => 
    t.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.course?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.semester?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Exam Timetables</h1>
          <p style={{ color: '#64748b' }}>Manage examination schedules by selecting University, Course, and Semester.</p>
        </div>
        <button className={styles.addBtn} onClick={() => { setIsFormOpen(true); setEditingId(null); setFormType('manual'); }}>
          <Plus size={20} /> New Timetable
        </button>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {toast.msg}
        </div>
      )}

      {/* Timetable List */}
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search schedules..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
            <Loader2 className="animate-spin" size={32} />
            <span>Loading timetables...</span>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Exam & Semester</th>
                <th>Course & University</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTimetables.length > 0 ? filteredTimetables.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', background: '#eff6ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                        <Calendar size={20} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{item.examName}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>SEM: {item.semester}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.course?.name || '-'}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <GraduationCap size={14} /> {item.university?.name || '-'}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, background: item.type === 'manual' ? '#f0fdf4' : '#fef2f2', color: item.type === 'manual' ? '#16a34a' : '#dc2626', padding: '4px 8px', borderRadius: '4px' }}>
                      {item.type.toUpperCase()}
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
                  <td colSpan={4} style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                    No timetables found.
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
          <div className={styles.modalContent} style={{ maxWidth: '1100px', width: '95%' }}>
            <div className={styles.modalHeader}>
              <div>
                <h2 style={{ margin: 0 }}>
                  {editingId ? 'Edit Timetable' : 'Create Timetable'}
                </h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>Publish exam schedules organized by academic criteria.</p>
              </div>
              <button className={styles.closeBtn} onClick={() => { setIsFormOpen(false); setEditingId(null); }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                  {/* 1. University */}
                  <div>
                    <label className={styles.label}>University</label>
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

                  {/* 2. Course */}
                  <div>
                    <label className={styles.label}>Course / Program</label>
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

                  {/* 3. Semester */}
                  <div>
                    <label className={styles.label}>Semester</label>
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
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label className={styles.label}>Examination Name</label>
                    <input 
                      type="text" 
                      className={styles.input}
                      placeholder="e.g. Regular Theory Examinations - June 2024"
                      value={formData.examName}
                      onChange={(e) => setFormData({...formData, examName: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className={styles.label}>Entry Method</label>
                    <div style={{ display: 'flex', gap: '1rem', background: '#f8fafc', padding: '0.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <button 
                        type="button" 
                        onClick={() => setFormType('manual')}
                        style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: 'none', background: formType === 'manual' ? '#ffffff' : 'transparent', boxShadow: formType === 'manual' ? '0 4px 12px rgba(0,0,0,0.08)' : 'none', color: formType === 'manual' ? '#ef233c' : '#64748b', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s ease' }}
                      >
                        <Layers size={18} /> Manual Entry
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setFormType('file')}
                        style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: 'none', background: formType === 'file' ? '#ffffff' : 'transparent', boxShadow: formType === 'file' ? '0 4px 12px rgba(0,0,0,0.08)' : 'none', color: formType === 'file' ? '#ef233c' : '#64748b', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s ease' }}
                      >
                        <UploadCloud size={18} /> PDF Upload
                      </button>
                    </div>
                  </div>

                  {formType === 'manual' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label className={styles.label} style={{ margin: 0 }}>Subject Wise Schedule</label>
                        <button type="button" onClick={addEntry} style={{ background: '#00122e', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                          <Plus size={16} /> Add Subject
                        </button>
                      </div>
                      
                      <div style={{ maxHeight: '450px', overflowY: 'auto', paddingRight: '10px', background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 180px 180px 40px', gap: '15px', marginBottom: '10px', padding: '0 10px', color: '#64748b', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                          <span>Code</span>
                          <span>Subject Name</span>
                          <span>Date</span>
                          <span>Time</span>
                          <span></span>
                        </div>

                        {formData.entries.map((entry, idx) => (
                          <div key={idx} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 180px 180px 40px', gap: '15px', marginBottom: '12px', alignItems: 'center', background: 'white', padding: '10px', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                            <input type="text" placeholder="e.g. BC101" className={styles.input} style={{ padding: '8px 12px' }} value={entry.code} onChange={(e) => handleEntryChange(idx, 'code', e.target.value)} required />
                            <input type="text" placeholder="Subject Name" className={styles.input} style={{ padding: '8px 12px' }} value={entry.subject} onChange={(e) => handleEntryChange(idx, 'subject', e.target.value)} required />
                            <input type="date" className={styles.input} style={{ padding: '8px 12px' }} value={entry.date} onChange={(e) => handleEntryChange(idx, 'date', e.target.value)} required />
                            <input type="text" placeholder="10AM - 1PM" className={styles.input} style={{ padding: '8px 12px' }} value={entry.time} onChange={(e) => handleEntryChange(idx, 'time', e.target.value)} required />
                            <button type="button" onClick={() => removeEntry(idx)} style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Trash2 size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div style={{ background: '#f8fafc', padding: '3rem 2rem', borderRadius: '16px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
                      <UploadCloud size={48} style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
                      <label className={styles.label} style={{ justifyContent: 'center' }}>Timetable Document (PDF)</label>
                      <input 
                        type="file" 
                        accept=".pdf,application/pdf"
                        className={styles.input}
                        onChange={handleFileUpload}
                        style={{ maxWidth: '600px', margin: '0 auto' }}
                      />
                      {formData.fileUrl && (
                        <p style={{ fontSize: '0.85rem', color: '#10b981', marginTop: '10px', fontWeight: 600 }}>
                          ✓ Timetable PDF attached successfully
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={() => { setIsFormOpen(false); setEditingId(null); }}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn} disabled={saving} style={{ padding: '0.8rem 2.5rem' }}>
                  {saving ? <><Loader2 className="animate-spin" size={20} /> Saving...</> : 'Save Timetable'}
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
        title="Delete Timetable"
        message="Are you sure you want to delete this examination schedule?"
      />
    </div>
  );
}
