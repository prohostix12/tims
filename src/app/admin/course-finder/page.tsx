'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Search, X, RefreshCw } from 'lucide-react';
import ConfirmModal from '@/components/ConfirmModal';
import { FALLBACK_QUESTIONS } from '@/components/CourseFinder';

const ACCENT = '#E8502A';
const BLANK_Q = { question: '', options: [{ label: '' }], field: '', order: 0, isActive: true };

export default function CourseFinderAdminPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  
  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: '', text: '' });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getHeaders = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
    return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  };

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/course-finder-questions', { headers: getHeaders() });
      const data = await res.json();
      setQuestions(Array.isArray(data) ? data.sort((a,b) => (a.order || 0) - (b.order || 0)) : []);
    } catch { showToast('Failed to load questions', 'error'); }
    finally { setLoading(false); }
  };

  const openAdd = () => setModal({ mode: 'add', data: { ...BLANK_Q, order: questions.length + 1 } });
  const openEdit = (q: any) => setModal({ mode: 'edit', data: JSON.parse(JSON.stringify(q)) });

  const saveQuestion = async () => {
    const { data, mode } = modal;
    if (!data.question.trim() || data.options.length === 0 || data.options.some((o: any) => !o.label.trim())) {
      showToast('Question and all options are required', 'error'); return;
    }
    setSaving(true);
    try {
      const url = mode === 'add' ? '/api/admin/course-finder-questions' : `/api/admin/course-finder-questions/${data._id}`;
      const method = mode === 'add' ? 'POST' : 'PUT';
      
      const payload = {
        ...data,
        field: data.field || data.question.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 30),
        options: data.options.map((o: any) => {
          const cleanOpt: Record<string, any> = {
            label: o.label,
            value: o.value || o.label.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
          };
          // Preserve numeric range fields and category arrays if present
          if (o.min != null && o.min !== '') cleanOpt.min = Number(o.min);
          if (o.max != null && o.max !== '') cleanOpt.max = Number(o.max);
          if (Array.isArray(o.categories) && o.categories.length > 0) cleanOpt.categories = o.categories;
          return cleanOpt;
        }),
      };

      const res = await fetch(url, { method, headers: getHeaders(), body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('Save failed');
      showToast(mode === 'add' ? 'Question added!' : 'Question updated!');
      setModal(null);
      loadQuestions();
    } catch { showToast('Error saving question', 'error'); }
    finally { setSaving(false); }
  };

  const deleteQ = (id: string, text: string) => {
    setDeleteModal({ isOpen: true, id, text });
  };

  const confirmDelete = async () => {
    if (!deleteModal.id) return;
    setIsDeleting(true);
    try {
      const url = `/api/admin/course-finder-questions/${deleteModal.id}`;
      
      const res = await fetch(url, { method: 'DELETE', headers: getHeaders() });
      if (!res.ok) throw new Error();
      showToast('Deleted successfully');
      setDeleteModal({ isOpen: false, id: '', text: '' });
      loadQuestions();
    } catch { showToast('Delete failed', 'error'); }
    finally { setIsDeleting(false); }
  };

  const [seeding, setSeeding] = useState(false);

  const seedDefaults = async () => {
    if (!confirm('This will add any missing default questions to the database. Existing questions will not be changed. Continue?')) return;
    setSeeding(true);
    let added = 0;
    try {
      const existing = new Set(questions.map((q: any) => q.field));
      for (const fq of FALLBACK_QUESTIONS) {
        if (!existing.has(fq.field)) {
          const payload = {
            ...fq,
            _id: undefined,
            options: fq.options.map((o: any) => ({
              label: o.label,
              value: o.value,
              ...(o.min !== undefined ? { min: o.min } : {}),
              ...(o.max !== undefined ? { max: o.max } : {}),
              ...(o.categories ? { categories: o.categories } : {}),
            })),
          };
          const res = await fetch('/api/admin/course-finder-questions', { method: 'POST', headers: getHeaders(), body: JSON.stringify(payload) });
          if (res.ok) added++;
        }
      }
      showToast(added > 0 ? `Added ${added} default question(s)!` : 'All default questions already exist.');
      loadQuestions();
    } catch {
      showToast('Error seeding questions', 'error');
    } finally {
      setSeeding(false);
    }
  };

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (q.field || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 10000, padding: '12px 24px', background: toast.type === 'error' ? '#ef4444' : '#10b981', color: '#fff', borderRadius: 12, fontWeight: 600, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          {toast.msg}
        </div>
      )}

      {/* Modern Header */}
      <div style={{ background: '#fff', padding: 'clamp(1rem, 4vw, 2rem)', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#6b7280', textDecoration: 'none', marginBottom: 16, fontSize: '0.9rem' }}>
            <ArrowLeft size={18} /> Back to Dashboard
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.25rem)', fontWeight: 700, margin: '0 0 6px', color: '#111827' }}>Course Finder Questions</h1>
              <p style={{ color: '#6b7280', margin: 0 }}>Manage the quiz questions shown to students ({questions.length} of 10 configured)</p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={seedDefaults} disabled={seeding} style={{ padding: '12px 20px', background: '#fff', color: ACCENT, border: `2px solid ${ACCENT}`, borderRadius: 10, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                <RefreshCw size={16} /> {seeding ? 'Loading…' : 'Load Default Questions'}
              </button>
              <button onClick={openAdd} style={{ padding: '12px 24px', background: ACCENT, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Plus size={20} color="#fff" /> Add Question
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 4vw, 2rem)' }}>
        {/* Search */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', position: 'relative' }}>
          <Search size={20} color="#94a3b8" style={{ position: 'absolute', left: 28, top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            placeholder="Search questions..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: 10, border: '2px solid #e2e8f0', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }} 
            onFocus={e => e.target.style.borderColor = ACCENT} 
            onBlur={e => e.target.style.borderColor = '#e2e8f0'} 
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>Loading...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filteredQuestions.length === 0 ? (
              <div style={{ background: '#f8fafc', padding: '4rem', borderRadius: 12, textAlign: 'center', color: '#64748b', border: '2px dashed #e2e8f0' }}>No questions found.</div>
            ) : (
              filteredQuestions.map((q, i) => (
                <div key={q._id} style={{ background: '#fff', borderRadius: 16, padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                      <span style={{ padding: '4px 10px', background: '#eff6ff', color: ACCENT, borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>Step {q.order || i + 1}</span>
                      <span style={{ padding: '4px 10px', background: q.isActive ? '#dcfce7' : '#fee2e2', color: q.isActive ? '#16a34a' : '#dc2626', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>{q.isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                    <h3 style={{ margin: '0 0 12px', fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', lineHeight: 1.4 }}>{q.question}</h3>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {q.options.map((o: any, idx: number) => (
                        <span key={idx} style={{ padding: '6px 12px', background: '#f1f5f9', color: '#475569', borderRadius: 8, fontSize: '0.8rem', border: '1px solid #e2e8f0' }}>{o.label}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => openEdit(q)} style={{ width: 40, height: 40, background: '#eff6ff', border: 'none', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Edit size={18} color={ACCENT} />
                    </button>
                    <button onClick={() => deleteQ(q._id, q.question)} style={{ width: 40, height: 40, background: '#fff1f2', border: 'none', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Trash2 size={18} color="#ef4444" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9000, padding: 20 }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: 500, borderRadius: 24, padding: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{modal.mode === 'add' ? 'New Question' : 'Edit Question'}</h2>
              <button onClick={() => setModal(null)} style={{ background: '#f1f5f9', border: 'none', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={16} color="#64748b" /></button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 8 }}>Question Text</label>
                <input value={modal.data.question} onChange={e => setModal({...modal, data: {...modal.data, question: e.target.value}})} style={{ width: '100%', padding: '12px', borderRadius: 10, border: '2px solid #e2e8f0', outline: 'none', fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor = ACCENT} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                 <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 8 }}>Step Order</label>
                    <input type="number" value={modal.data.order} onChange={e => setModal({...modal, data: {...modal.data, order: e.target.value === '' ? '' : parseInt(e.target.value)}})} style={{ width: '100%', padding: '12px', borderRadius: 10, border: '2px solid #e2e8f0', outline: 'none' }} />
                 </div>
                 <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 8 }}>Internal Field</label>
                    <input value={modal.data.field} onChange={e => setModal({...modal, data: {...modal.data, field: e.target.value}})} placeholder="Auto-generated if empty" style={{ width: '100%', padding: '12px', borderRadius: 10, border: '2px solid #e2e8f0', outline: 'none' }} />
                 </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, flex: 1, cursor: 'pointer' }} htmlFor="cf-active-toggle">Active (visible to users)</label>
                <button
                  id="cf-active-toggle"
                  type="button"
                  onClick={() => setModal({...modal, data: {...modal.data, isActive: !modal.data.isActive}})}
                  style={{ width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', background: modal.data.isActive ? ACCENT : '#d1d5db', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}
                  aria-pressed={modal.data.isActive}
                >
                  <span style={{ position: 'absolute', top: 3, left: modal.data.isActive ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
                </button>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Options</label>
                  <button onClick={() => setModal({...modal, data: {...modal.data, options: [...modal.data.options, {label:''}]}})} style={{ background: '#eff6ff', color: ACCENT, border: 'none', padding: '6px 12px', borderRadius: 8, fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>+ Add Option</button>
                </div>
                {modal.data.options.map((o: any, idx: number) => (
                  <div key={idx} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <input
                        value={o.label}
                        onChange={e => {
                          const opts = [...modal.data.options];
                          opts[idx] = { ...opts[idx], label: e.target.value };
                          setModal({...modal, data: {...modal.data, options: opts}});
                        }}
                        placeholder={`Label (e.g. MBA)`}
                        style={{ flex: 2, padding: '9px 10px', borderRadius: 8, border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.9rem' }}
                      />
                      <input
                        value={o.value || ''}
                        onChange={e => {
                          const opts = [...modal.data.options];
                          opts[idx] = { ...opts[idx], value: e.target.value };
                          setModal({...modal, data: {...modal.data, options: opts}});
                        }}
                        placeholder={`value (auto)`}
                        style={{ flex: 1, padding: '9px 10px', borderRadius: 8, border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.85rem', color: '#64748b' }}
                      />
                      <button
                        onClick={() => {
                          const opts = modal.data.options.filter((_: any, i: number) => i !== idx);
                          setModal({...modal, data: {...modal.data, options: opts}});
                        }}
                        style={{ background: '#fff1f2', border: 'none', padding: '8px', borderRadius: 8, cursor: 'pointer', flexShrink: 0 }}
                      >
                        <X size={14} color="#ef4444" />
                      </button>
                    </div>
                    {/* Show min/max hint if already set on this option */}
                    {(o.min != null || o.max != null) && (
                      <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                        <input
                          type="number"
                          value={o.min ?? ''}
                          onChange={e => {
                            const opts = [...modal.data.options];
                            opts[idx] = { ...opts[idx], min: e.target.value === '' ? undefined : Number(e.target.value) };
                            setModal({...modal, data: {...modal.data, options: opts}});
                          }}
                          placeholder="Min fee (₹)"
                          style={{ flex: 1, padding: '7px 10px', borderRadius: 8, border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.8rem' }}
                        />
                        <input
                          type="number"
                          value={o.max ?? ''}
                          onChange={e => {
                            const opts = [...modal.data.options];
                            opts[idx] = { ...opts[idx], max: e.target.value === '' ? undefined : Number(e.target.value) };
                            setModal({...modal, data: {...modal.data, options: opts}});
                          }}
                          placeholder="Max fee (₹)"
                          style={{ flex: 1, padding: '7px 10px', borderRadius: 8, border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.8rem' }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
               <button onClick={() => setModal(null)} style={{ flex: 1, padding: '12px', background: '#f1f5f9', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
               <button onClick={saveQuestion} disabled={saving} style={{ flex: 2, padding: '12px', background: ACCENT, color: '#fff', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>{saving ? 'Saving...' : 'Save Question'}</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title={"Delete Question?"}
        message={`Are you sure you want to delete "${deleteModal.text}"? This action cannot be undone.`}
        confirmLabel="Delete"
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onClose={() => !isDeleting && setDeleteModal({ ...deleteModal, isOpen: false })}
      />
    </div>
  );
}
