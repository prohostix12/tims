'use client';

import { useState, useEffect } from 'react';
import {
  Plus, Pencil, Trash2, Save, X, ChevronDown, ChevronUp, ToggleLeft, ToggleRight,
} from 'lucide-react';
import adminStyles from '../admin.module.css';

const ICON_OPTIONS = [
  'GraduationCap','Monitor','BarChart2','FlaskConical','BookOpen','Cpu',
  'Briefcase','Database','Landmark','Globe','Music','Layers','PenTool',
  'Package','Stethoscope','ArrowRightLeft','HeartPulse','Award','Users',
  'Star','Code','FileText','Zap','TrendingUp',
];

const PRESET_TABS = [
  'Online PG',
  'Online UG',
  'Credit Transfer Programme',
  'SIDP (Skill Integrated Diploma Programs)',
  'Diploma',
];

interface Course {
  _id: string;
  tab: string;
  name: string;
  icon: string;
  order: number;
  isActive: boolean;
}

const emptyForm = { tab: '', name: '', icon: 'GraduationCap', order: 0, isActive: true };

export default function OnlineCoursesAdminPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [customTab, setCustomTab] = useState('');
  const [newTabInput, setNewTabInput] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchCourses = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/online-courses');
    const data = await res.json();
    setCourses(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchCourses(); }, []);

  // Derive all tabs from DB + preset tabs
  const allTabs = Array.from(new Set([
    ...PRESET_TABS,
    ...courses.map(c => c.tab),
  ]));

  useEffect(() => {
    if (!activeTab && allTabs.length > 0) setActiveTab(allTabs[0]);
  }, [allTabs.length]);

  const tabCourses = courses.filter(c => c.tab === activeTab);

  const openAdd = () => {
    setEditId(null);
    setForm({ ...emptyForm, tab: activeTab });
    setCustomTab('');
    setShowForm(true);
  };

  const openEdit = (c: Course) => {
    setEditId(c._id);
    setForm({ tab: c.tab, name: c.name, icon: c.icon, order: c.order, isActive: c.isActive });
    setCustomTab('');
    setShowForm(true);
  };

  const closeForm = () => { setShowForm(false); setEditId(null); };

  const handleSave = async () => {
    const payload = { ...form, tab: customTab || form.tab };
    if (!payload.tab || !payload.name) { showToast('Tab and name are required', 'error'); return; }
    setSaving(true);
    try {
      if (editId) {
        await fetch(`/api/admin/online-courses/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        showToast('Course updated');
      } else {
        await fetch('/api/admin/online-courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        showToast('Course added');
      }
      setActiveTab(payload.tab);
      closeForm();
      fetchCourses();
    } catch {
      showToast('Something went wrong', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this course?')) return;
    setDeletingId(id);
    await fetch(`/api/admin/online-courses/${id}`, { method: 'DELETE' });
    showToast('Course deleted');
    setDeletingId(null);
    fetchCourses();
  };

  const toggleActive = async (c: Course) => {
    await fetch(`/api/admin/online-courses/${c._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !c.isActive }),
    });
    fetchCourses();
  };

  const moveOrder = async (c: Course, dir: 'up' | 'down') => {
    const siblings = [...tabCourses].sort((a, b) => a.order - b.order);
    const idx = siblings.findIndex(x => x._id === c._id);
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= siblings.length) return;
    const other = siblings[swapIdx];
    await Promise.all([
      fetch(`/api/admin/online-courses/${c._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order: other.order }) }),
      fetch(`/api/admin/online-courses/${other._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order: c.order }) }),
    ]);
    fetchCourses();
  };

  const addNewTab = () => {
    const t = newTabInput.trim();
    if (!t) return;
    setActiveTab(t);
    setNewTabInput('');
    setForm({ ...emptyForm, tab: t });
    setEditId(null);
    setShowForm(true);
  };

  return (
    <div className={adminStyles.pageContainer}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 20, right: 20, zIndex: 9999,
          background: toast.type === 'success' ? '#22c55e' : '#ef4444',
          color: '#fff', padding: '12px 24px', borderRadius: 8,
          fontWeight: 700, boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}>{toast.msg}</div>
      )}

      <div className={adminStyles.pageHeader}>
        <div>
          <h1 className={adminStyles.pageTitle}>Online Courses Section</h1>
          <p className={adminStyles.pageSubtitle}>Manage the programme cards shown on the homepage</p>
        </div>
        <button className={adminStyles.primaryBtn} onClick={openAdd}>
          <Plus size={18} /> Add Course
        </button>
      </div>

      {/* Add new tab */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontWeight: 600, color: '#374151', fontSize: '0.9rem' }}>New tab:</span>
        <input
          style={{ border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '6px 14px', fontSize: '0.9rem', minWidth: 220 }}
          placeholder="Tab name (e.g. Short Courses)"
          value={newTabInput}
          onChange={e => setNewTabInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addNewTab()}
        />
        <button
          style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 18px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}
          onClick={addNewTab}
        >
          + Create Tab
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
        {allTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 20px', borderRadius: 100, border: 'none', fontWeight: 700, cursor: 'pointer',
              fontSize: '0.85rem', transition: 'all 0.2s',
              background: activeTab === tab ? '#E8502A' : '#f1f5f9',
              color: activeTab === tab ? '#fff' : '#64748b',
              boxShadow: activeTab === tab ? '0 4px 12px rgba(232,80,42,0.25)' : 'none',
            }}
          >
            {tab} <span style={{ opacity: 0.75, fontSize: '0.8em' }}>({courses.filter(c => c.tab === tab).length})</span>
          </button>
        ))}
      </div>

      {/* Course list */}
      {loading ? (
        <p style={{ color: '#64748b', textAlign: 'center', padding: '4rem 0' }}>Loading...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {tabCourses.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: '#94a3b8' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>No courses in this tab yet.</p>
              <button className={adminStyles.primaryBtn} style={{ marginTop: 16 }} onClick={openAdd}>
                <Plus size={16} /> Add First Course
              </button>
            </div>
          )}
          {[...tabCourses].sort((a, b) => a.order - b.order).map((c, idx, arr) => (
            <div key={c._id} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 12,
              padding: '14px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              opacity: c.isActive ? 1 : 0.55,
            }}>
              {/* Order arrows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <button onClick={() => moveOrder(c, 'up')} disabled={idx === 0}
                  style={{ background: 'none', border: 'none', cursor: idx === 0 ? 'default' : 'pointer', color: idx === 0 ? '#cbd5e1' : '#64748b', padding: 2 }}>
                  <ChevronUp size={16} />
                </button>
                <button onClick={() => moveOrder(c, 'down')} disabled={idx === arr.length - 1}
                  style={{ background: 'none', border: 'none', cursor: idx === arr.length - 1 ? 'default' : 'pointer', color: idx === arr.length - 1 ? '#cbd5e1' : '#64748b', padding: 2 }}>
                  <ChevronDown size={16} />
                </button>
              </div>

              {/* Icon preview */}
              <div style={{ width: 40, height: 40, background: '#fff5f2', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8502A', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0 }}>
                {c.icon.slice(0, 3)}
              </div>

              {/* Name */}
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>{c.name}</span>
                <span style={{ marginLeft: 10, fontSize: '0.78rem', color: '#94a3b8' }}>icon: {c.icon}</span>
              </div>

              {/* Toggle */}
              <button onClick={() => toggleActive(c)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.isActive ? '#22c55e' : '#94a3b8' }}>
                {c.isActive ? <ToggleRight size={26} /> : <ToggleLeft size={26} />}
              </button>

              {/* Edit */}
              <button onClick={() => openEdit(c)} style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', color: '#3b82f6', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem' }}>
                <Pencil size={14} /> Edit
              </button>

              {/* Delete */}
              <button onClick={() => handleDelete(c._id)} disabled={deletingId === c._id}
                style={{ background: '#fff1f2', border: 'none', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', color: '#ef4444', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem' }}>
                <Trash2 size={14} /> {deletingId === c._id ? '...' : 'Delete'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Form Modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: '100%', maxWidth: 520, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontWeight: 800, fontSize: '1.3rem', color: '#0f172a' }}>
                {editId ? 'Edit Course' : 'Add Course'}
              </h2>
              <button onClick={closeForm} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={22} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Tab */}
              <div>
                <label style={{ fontWeight: 700, fontSize: '0.85rem', color: '#374151', display: 'block', marginBottom: 6 }}>Tab *</label>
                <select
                  style={{ width: '100%', border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '10px 14px', fontSize: '0.95rem' }}
                  value={customTab || form.tab}
                  onChange={e => { setForm({ ...form, tab: e.target.value }); setCustomTab(''); }}
                >
                  {allTabs.map(t => <option key={t} value={t}>{t}</option>)}
                  <option value="__custom__">+ New custom tab</option>
                </select>
                {(form.tab === '__custom__' || customTab !== '') && (
                  <input
                    style={{ width: '100%', border: '1.5px solid #6366f1', borderRadius: 8, padding: '10px 14px', fontSize: '0.95rem', marginTop: 8, boxSizing: 'border-box' }}
                    placeholder="Enter tab name"
                    value={customTab}
                    onChange={e => setCustomTab(e.target.value)}
                  />
                )}
              </div>

              {/* Name */}
              <div>
                <label style={{ fontWeight: 700, fontSize: '0.85rem', color: '#374151', display: 'block', marginBottom: 6 }}>Course Name *</label>
                <input
                  style={{ width: '100%', border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '10px 14px', fontSize: '0.95rem', boxSizing: 'border-box' }}
                  placeholder="e.g. MBA"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>

              {/* Icon */}
              <div>
                <label style={{ fontWeight: 700, fontSize: '0.85rem', color: '#374151', display: 'block', marginBottom: 6 }}>Icon</label>
                <select
                  style={{ width: '100%', border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '10px 14px', fontSize: '0.95rem' }}
                  value={form.icon}
                  onChange={e => setForm({ ...form, icon: e.target.value })}
                >
                  {ICON_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>

              {/* Order */}
              <div>
                <label style={{ fontWeight: 700, fontSize: '0.85rem', color: '#374151', display: 'block', marginBottom: 6 }}>Order</label>
                <input
                  style={{ width: '100%', border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '10px 14px', fontSize: '0.95rem', boxSizing: 'border-box' }}
                  type="number"
                  value={form.order}
                  onChange={e => setForm({ ...form, order: Number(e.target.value) })}
                />
              </div>

              {/* Active */}
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', color: '#374151' }}>
                <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} style={{ width: 18, height: 18, cursor: 'pointer' }} />
                Active (visible on website)
              </label>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
              <button onClick={closeForm} style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#fff', color: '#64748b', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                style={{ flex: 2, padding: '12px', borderRadius: 10, border: 'none', background: '#E8502A', color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Save size={16} /> {saving ? 'Saving...' : editId ? 'Update Course' : 'Add Course'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
