'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, RefreshCw, ToggleLeft, ToggleRight } from 'lucide-react';

const ACCENT = '#E8502A';

const DEFAULT_ITEMS = [
  'BA', 'B.Com', 'BBA', 'MBA', 'BCA', 'MCA', 'B.Sc', 'M.Sc',
  'B.Tech', 'M.Tech', 'LLB', 'PGDM', 'M.Com',
];

export default function MarqueeAdminPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [modal, setModal] = useState<{ mode: 'add' | 'edit'; data: any } | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: string; text: string }>({ open: false, id: '', text: '' });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { loadItems(); }, []);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/marquee');
      const data = await res.json();
      setItems(Array.isArray(data) ? data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) : []);
    } catch {
      showToast('Failed to load items', 'error');
    } finally {
      setLoading(false);
    }
  };

  const seedDefaults = async () => {
    if (!confirm(`This will add ${DEFAULT_ITEMS.length} default course names. Continue?`)) return;
    setSeeding(true);
    try {
      await Promise.all(
        DEFAULT_ITEMS.map((text, i) =>
          fetch('/api/admin/marquee', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, order: i + 1, isActive: true }),
          })
        )
      );
      showToast('Default courses added!');
      loadItems();
    } catch {
      showToast('Failed to seed defaults', 'error');
    } finally {
      setSeeding(false);
    }
  };

  const saveItem = async () => {
    if (!modal) return;
    const { data, mode } = modal;
    if (!data.text?.trim()) {
      showToast('Course name is required', 'error');
      return;
    }
    setSaving(true);
    try {
      const url = mode === 'add' ? '/api/admin/marquee' : `/api/admin/marquee/${data._id}`;
      const method = mode === 'add' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: data.text.trim(), order: Number(data.order) || 0, isActive: !!data.isActive }),
      });
      if (!res.ok) throw new Error();
      showToast(mode === 'add' ? 'Course added!' : 'Course updated!');
      setModal(null);
      loadItems();
    } catch {
      showToast('Error saving item', 'error');
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (item: any) => {
    try {
      await fetch(`/api/admin/marquee/${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, isActive: !item.isActive }),
      });
      loadItems();
    } catch {
      showToast('Failed to update', 'error');
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/marquee/${deleteModal.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      showToast('Deleted!');
      setDeleteModal({ open: false, id: '', text: '' });
      loadItems();
    } catch {
      showToast('Delete failed', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem' }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999,
          padding: '0.9rem 1.5rem', borderRadius: '10px', fontWeight: 600,
          background: toast.type === 'success' ? '#10b981' : '#ef4444', color: '#fff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
            <ArrowLeft size={18} /> Back
          </Link>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Marquee Course Names</h1>
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.85rem' }}>Manage scrolling course names in the hero banner</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={seedDefaults}
            disabled={seeding}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', borderRadius: '8px', border: `1px solid ${ACCENT}`, background: '#fff', color: ACCENT, fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}
          >
            <RefreshCw size={15} className={seeding ? 'animate-spin' : ''} />
            {seeding ? 'Loading...' : 'Load Defaults'}
          </button>
          <button
            onClick={() => setModal({ mode: 'add', data: { text: '', order: items.length + 1, isActive: true } })}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', borderRadius: '8px', border: 'none', background: ACCENT, color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}
          >
            <Plus size={15} /> Add Course
          </button>
        </div>
      </div>

      {/* Preview */}
      <div style={{ background: '#00122e', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '2rem', overflow: 'hidden' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', margin: '0 0 0.5rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Live Preview</p>
        <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {items.filter(i => i.isActive).map((item: any) => (
            <span key={item._id} style={{ color: '#E8502A', fontWeight: 700, whiteSpace: 'nowrap', fontSize: '0.9rem' }}>
              {item.text}
            </span>
          ))}
          {items.filter(i => i.isActive).length === 0 && (
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>No active items — add some below</span>
          )}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, color: '#0f172a' }}>{items.length} course{items.length !== 1 ? 's' : ''}</span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>Loading...</div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
            <p>No courses yet.</p>
            <button onClick={seedDefaults} style={{ marginTop: '1rem', padding: '0.6rem 1.2rem', borderRadius: '8px', border: 'none', background: ACCENT, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
              Load Default Courses
            </button>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '0.9rem 1.5rem', textAlign: 'left', color: '#64748b', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Course Name</th>
                <th style={{ padding: '0.9rem 1rem', textAlign: 'center', color: '#64748b', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Order</th>
                <th style={{ padding: '0.9rem 1rem', textAlign: 'center', color: '#64748b', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                <th style={{ padding: '0.9rem 1.5rem', textAlign: 'right', color: '#64748b', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any, idx: number) => (
                <tr key={item._id} style={{ borderTop: '1px solid #f1f5f9', transition: 'background 0.15s' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem' }}>{item.text}</span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>{item.order}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <button onClick={() => toggleActive(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: item.isActive ? '#10b981' : '#94a3b8', fontWeight: 600, fontSize: '0.8rem' }}>
                      {item.isActive ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                      {item.isActive ? 'Active' : 'Hidden'}
                    </button>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => setModal({ mode: 'edit', data: { ...item } })} style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#475569', fontSize: '0.8rem', fontWeight: 600 }}>
                        <Edit size={13} /> Edit
                      </button>
                      <button onClick={() => setDeleteModal({ open: true, id: item._id, text: item.text })} style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid #fecaca', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#ef4444', fontSize: '0.8rem', fontWeight: 600 }}>
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '440px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h2 style={{ margin: '0 0 1.5rem', fontWeight: 800, color: '#0f172a', fontSize: '1.2rem' }}>
              {modal.mode === 'add' ? 'Add Course Name' : 'Edit Course Name'}
            </h2>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#374151', marginBottom: '0.4rem' }}>Course Name *</label>
              <input
                type="text"
                value={modal.data.text}
                onChange={e => setModal(m => m ? { ...m, data: { ...m.data, text: e.target.value } } : m)}
                placeholder="e.g. MBA, B.Tech, PGDM"
                style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#374151', marginBottom: '0.4rem' }}>Order</label>
              <input
                type="number"
                value={modal.data.order}
                onChange={e => setModal(m => m ? { ...m, data: { ...m.data, order: Number(e.target.value) } } : m)}
                style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <label style={{ fontWeight: 600, fontSize: '0.85rem', color: '#374151' }}>Active</label>
              <button
                onClick={() => setModal(m => m ? { ...m, data: { ...m.data, isActive: !m.data.isActive } } : m)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: modal.data.isActive ? '#10b981' : '#94a3b8', display: 'flex', alignItems: 'center' }}
              >
                {modal.data.isActive ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setModal(null)} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', fontWeight: 700, cursor: 'pointer', color: '#64748b' }}>
                Cancel
              </button>
              <button onClick={saveItem} disabled={saving} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', background: ACCENT, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                {saving ? 'Saving...' : modal.mode === 'add' ? 'Add Course' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h2 style={{ margin: '0 0 0.75rem', fontWeight: 800, color: '#0f172a' }}>Delete Course?</h2>
            <p style={{ color: '#64748b', margin: '0 0 1.5rem' }}>
              Remove <strong style={{ color: '#0f172a' }}>{deleteModal.text}</strong> from the marquee?
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setDeleteModal({ open: false, id: '', text: '' })} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', fontWeight: 700, cursor: 'pointer', color: '#64748b' }}>
                Cancel
              </button>
              <button onClick={confirmDelete} disabled={deleting} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', background: '#ef4444', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
