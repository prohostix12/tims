'use client';

import React, { useState, useEffect } from 'react';
import styles from '../admin.module.css';
import {
  Layers, Plus, Trash2, Edit2, Save, X, ChevronDown, ChevronUp,
  GripVertical, Loader2, AlertTriangle, ToggleLeft, ToggleRight, Check
} from 'lucide-react';

const ICON_OPTIONS = [
  'GraduationCap','Monitor','BarChart2','FlaskConical','BookOpen','Cpu',
  'Briefcase','Database','Landmark','Globe','Music','Layers','PenTool',
  'Package','Stethoscope','ArrowRightLeft','HeartPulse','Award','Star',
  'Code','FileText','Calculator','Microscope','Palette','Camera',
];

interface Course { name: string; iconName: string; order: number }
interface Section { _id?: string; categoryName: string; order: number; isActive: boolean; courses: Course[] }

const blankSection = (): Section => ({ categoryName: '', order: 0, isActive: true, courses: [] });
const blankCourse  = (order: number): Course => ({ name: '', iconName: 'GraduationCap', order });

export default function ProgramSectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  /* Section edit modal */
  const [editSection, setEditSection] = useState<Section | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  /* Delete confirm */
  const [deleteId, setDeleteId] = useState<string | null>(null);

  /* ── Load ──────────────────────────────────────────────── */
  useEffect(() => { fetchSections(); }, []);

  async function fetchSections() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/program-sections');
      const data = await res.json();
      setSections(Array.isArray(data) ? data : []);
    } finally { setLoading(false); }
  }

  /* ── Toggle active ─────────────────────────────────────── */
  async function toggleActive(s: Section) {
    await fetch(`/api/admin/program-sections/${s._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...s, isActive: !s.isActive }),
    });
    fetchSections();
  }

  /* ── Open editor ───────────────────────────────────────── */
  function openNew() {
    setEditingId(null);
    setEditSection({ ...blankSection(), order: sections.length + 1 });
    setMsg('');
  }

  function openEdit(s: Section) {
    setEditingId(s._id || null);
    setEditSection({ ...s, courses: s.courses.map(c => ({ ...c })) });
    setMsg('');
  }

  /* ── Course helpers inside editor ─────────────────────── */
  function addCourse() {
    if (!editSection) return;
    setEditSection({ ...editSection, courses: [...editSection.courses, blankCourse(editSection.courses.length + 1)] });
  }

  function removeCourse(i: number) {
    if (!editSection) return;
    setEditSection({ ...editSection, courses: editSection.courses.filter((_, idx) => idx !== i) });
  }

  function updateCourse(i: number, field: keyof Course, val: any) {
    if (!editSection) return;
    const courses = [...editSection.courses];
    courses[i] = { ...courses[i], [field]: val };
    setEditSection({ ...editSection, courses });
  }

  function moveCourse(i: number, dir: -1 | 1) {
    if (!editSection) return;
    const courses = [...editSection.courses];
    const j = i + dir;
    if (j < 0 || j >= courses.length) return;
    [courses[i], courses[j]] = [courses[j], courses[i]];
    courses.forEach((c, idx) => { c.order = idx + 1; });
    setEditSection({ ...editSection, courses });
  }

  /* ── Save section ──────────────────────────────────────── */
  async function saveSection() {
    if (!editSection) return;
    if (!editSection.categoryName.trim()) { setMsg('Category name is required.'); return; }
    if (editSection.courses.some(c => !c.name.trim())) { setMsg('All course names must be filled.'); return; }
    setSaving(true); setMsg('');
    try {
      const url  = editingId ? `/api/admin/program-sections/${editingId}` : '/api/admin/program-sections';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editSection),
      });
      if (!res.ok) throw new Error('Save failed');
      setEditSection(null); setEditingId(null);
      fetchSections();
    } catch { setMsg('Error saving. Please try again.'); }
    finally { setSaving(false); }
  }

  /* ── Delete ────────────────────────────────────────────── */
  async function confirmDelete() {
    if (!deleteId) return;
    await fetch(`/api/admin/program-sections/${deleteId}`, { method: 'DELETE' });
    setDeleteId(null);
    fetchSections();
  }

  /* ── Render ────────────────────────────────────────────── */
  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Layers size={26} style={{ color: '#E8502A' }} />
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>50+ Programmes Section</h1>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>Manage homepage programme tabs and their courses</p>
          </div>
        </div>
        <button
          onClick={openNew}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#E8502A', color: '#fff', border: 'none', padding: '0.7rem 1.4rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}
        >
          <Plus size={16} /> Add Category Tab
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
          <Loader2 size={28} style={{ animation: 'spin 1s linear infinite' }} />
        </div>
      )}

      {!loading && sections.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #e2e8f0' }}>
          No programme categories yet. Click <strong>"Add Category Tab"</strong> to create the first one.
        </div>
      )}

      {/* Section list */}
      {!loading && sections.map((sec, si) => (
        <div key={sec._id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '0.85rem', overflow: 'hidden' }}>
          {/* Row header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem', cursor: 'pointer' }}
               onClick={() => setExpandedId(expandedId === sec._id ? null : sec._id!)}>
            <span style={{ minWidth: 26, height: 26, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', color: '#64748b' }}>
              {si + 1}
            </span>
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>{sec.categoryName}</span>
              <span style={{ marginLeft: '0.75rem', fontSize: '0.78rem', color: '#94a3b8' }}>{sec.courses.length} courses</span>
            </div>
            {/* Active toggle */}
            <button
              onClick={e => { e.stopPropagation(); toggleActive(sec); }}
              title={sec.isActive ? 'Visible on site' : 'Hidden from site'}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: sec.isActive ? '#22c55e' : '#94a3b8', fontWeight: 600 }}
            >
              {sec.isActive ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
              {sec.isActive ? 'Visible' : 'Hidden'}
            </button>
            <button onClick={e => { e.stopPropagation(); openEdit(sec); }} style={{ background: '#f1f5f9', border: 'none', borderRadius: '6px', padding: '0.4rem', cursor: 'pointer', color: '#475569' }}>
              <Edit2 size={15} />
            </button>
            <button onClick={e => { e.stopPropagation(); setDeleteId(sec._id!); }} style={{ background: '#fef2f2', border: 'none', borderRadius: '6px', padding: '0.4rem', cursor: 'pointer', color: '#ef4444' }}>
              <Trash2 size={15} />
            </button>
            {expandedId === sec._id ? <ChevronUp size={18} color="#94a3b8" /> : <ChevronDown size={18} color="#94a3b8" />}
          </div>

          {/* Expanded course list */}
          {expandedId === sec._id && (
            <div style={{ borderTop: '1px solid #f1f5f9', padding: '0.75rem 1.25rem 1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '0.6rem' }}>
                {sec.courses.map((c, ci) => (
                  <div key={ci} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#E8502A', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', flex: 1 }}>{c.name}</span>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{c.iconName}</span>
                  </div>
                ))}
                {sec.courses.length === 0 && <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>No courses in this tab.</span>}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* ── Edit / Create Modal ─────────────────────────────── */}
      {editSection && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '2rem 1rem', overflowY: 'auto' }}>
          <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: 680, padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontWeight: 800, fontSize: '1.1rem' }}>{editingId ? 'Edit Category' : 'New Category Tab'}</h3>
              <button onClick={() => setEditSection(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
            </div>

            {/* Category name + order */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.83rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>Tab Name *</label>
                <input
                  type="text"
                  value={editSection.categoryName}
                  onChange={e => setEditSection({ ...editSection, categoryName: e.target.value })}
                  className={styles.input}
                  placeholder="e.g. Online PG"
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.83rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>Order</label>
                <input
                  type="number"
                  value={editSection.order}
                  onChange={e => setEditSection({ ...editSection, order: Number(e.target.value) })}
                  className={styles.input}
                  style={{ width: 80 }}
                />
              </div>
            </div>

            {/* Active toggle */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.83rem', fontWeight: 600, color: '#374151' }}>Visible on homepage</label>
              <button
                onClick={() => setEditSection({ ...editSection, isActive: !editSection.isActive })}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', color: editSection.isActive ? '#22c55e' : '#94a3b8', fontWeight: 700 }}
              >
                {editSection.isActive ? <ToggleRight size={26} /> : <ToggleLeft size={26} />}
                {editSection.isActive ? 'Yes' : 'No'}
              </button>
            </div>

            {/* Courses */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <label style={{ fontSize: '0.83rem', fontWeight: 700, color: '#374151' }}>Courses in this tab ({editSection.courses.length})</label>
                <button onClick={addCourse} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.4rem 0.8rem', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>
                  <Plus size={13} /> Add Course
                </button>
              </div>

              {editSection.courses.map((c, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '24px 1fr 150px auto auto', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <GripVertical size={14} color="#cbd5e1" />
                  <input
                    type="text"
                    value={c.name}
                    onChange={e => updateCourse(i, 'name', e.target.value)}
                    className={styles.input}
                    placeholder="Course name (e.g. MBA)"
                  />
                  <select
                    value={c.iconName}
                    onChange={e => updateCourse(i, 'iconName', e.target.value)}
                    className={styles.input}
                    style={{ fontSize: '0.82rem' }}
                  >
                    {ICON_OPTIONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    <button onClick={() => moveCourse(i, -1)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '3px', padding: '1px 4px', cursor: 'pointer', color: '#64748b' }}><ChevronUp size={12} /></button>
                    <button onClick={() => moveCourse(i, 1)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '3px', padding: '1px 4px', cursor: 'pointer', color: '#64748b' }}><ChevronDown size={12} /></button>
                  </div>
                  <button onClick={() => removeCourse(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '0.2rem' }}><X size={15} /></button>
                </div>
              ))}
              {editSection.courses.length === 0 && (
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', fontStyle: 'italic' }}>No courses yet. Click "Add Course" to add courses to this tab.</p>
              )}
            </div>

            {msg && (
              <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <AlertTriangle size={14} /> {msg}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setEditSection(null)} style={{ padding: '0.65rem 1.3rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontWeight: 600, color: '#64748b' }}>Cancel</button>
              <button onClick={saveSection} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#E8502A', color: '#fff', border: 'none', padding: '0.65rem 1.6rem', borderRadius: '8px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
                {saving ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={15} />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirm ──────────────────────────────────── */}
      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '14px', padding: '2rem', maxWidth: 380, width: '90%' }}>
            <AlertTriangle size={28} style={{ color: '#ef4444', marginBottom: '1rem' }} />
            <h3 style={{ margin: '0 0 0.5rem', fontWeight: 800 }}>Delete Category?</h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>This will remove the tab and all its courses from the homepage. This cannot be undone.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteId(null)} style={{ padding: '0.6rem 1.2rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={confirmDelete} style={{ padding: '0.6rem 1.3rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
