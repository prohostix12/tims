'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, ToggleLeft, ToggleRight, Image as ImageIcon, RefreshCw } from 'lucide-react';

const ACCENT = '#E8502A';

const DEFAULT_LOGOS = [
  { name: 'Amity University',          logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Amity_University_logo.svg/320px-Amity_University_logo.svg.png' },
  { name: 'Manipal University',        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Manipal_Academy_of_Higher_Education_logo.svg/320px-Manipal_Academy_of_Higher_Education_logo.svg.png' },
  { name: 'LPU',                       logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Lovely_Professional_University_logo.png/320px-Lovely_Professional_University_logo.png' },
  { name: 'Jain University',           logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Jain_University_logo.png/320px-Jain_University_logo.png' },
  { name: 'Chandigarh University',     logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Chandigarh_University_logo.png/320px-Chandigarh_University_logo.png' },
  { name: 'IGNOU',                     logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/25/Indira_Gandhi_National_Open_University_logo.png/240px-Indira_Gandhi_National_Open_University_logo.png' },
  { name: 'Symbiosis',                 logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Symbiosis_International_University_logo.png/320px-Symbiosis_International_University_logo.png' },
  { name: 'Annamalai University',      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Annamalai_University_logo.png/240px-Annamalai_University_logo.png' },
  { name: 'Andhra University',         logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/Andhra_University_logo.png/240px-Andhra_University_logo.png' },
  { name: 'Sikkim Manipal University', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/Sikkim_Manipal_University_logo.png/240px-Sikkim_Manipal_University_logo.png' },
  { name: 'Venkateshwara',             logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Sri_Venkateshwara_University_logo.png/240px-Sri_Venkateshwara_University_logo.png' },
  { name: 'Karnataka State',          logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Karnataka_State_Open_University_logo.png/240px-Karnataka_State_Open_University_logo.png' },
];

export default function UniversityLogosAdminPage() {
  const [logos, setLogos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ mode: 'add' | 'edit'; data: any } | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: string; name: string }>({ open: false, id: '', name: '' });
  const [deleting, setDeleting] = useState(false);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => { loadLogos(); }, []);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadLogos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/university-logos');
      const data = await res.json();
      setLogos(Array.isArray(data) ? data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) : []);
    } catch {
      showToast('Failed to load logos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const seedDefaults = async () => {
    if (!confirm(`Add ${DEFAULT_LOGOS.length} default university logos?`)) return;
    setSeeding(true);
    try {
      await Promise.all(
        DEFAULT_LOGOS.map((logo, i) =>
          fetch('/api/admin/university-logos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...logo, order: i + 1, isActive: true }),
          })
        )
      );
      showToast('Default logos added!');
      loadLogos();
    } catch {
      showToast('Failed to seed defaults', 'error');
    } finally {
      setSeeding(false);
    }
  };

  const saveLogo = async () => {
    if (!modal) return;
    const { data, mode } = modal;
    if (!data.name?.trim() || !data.logoUrl?.trim()) {
      showToast('Name and Logo URL are required', 'error');
      return;
    }
    setSaving(true);
    try {
      const url = mode === 'add' ? '/api/admin/university-logos' : `/api/admin/university-logos/${data._id}`;
      const method = mode === 'add' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name.trim(), logoUrl: data.logoUrl.trim(), order: Number(data.order) || 0, isActive: !!data.isActive }),
      });
      if (!res.ok) throw new Error();
      showToast(mode === 'add' ? 'Logo added!' : 'Logo updated!');
      setModal(null);
      loadLogos();
    } catch {
      showToast('Error saving logo', 'error');
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (item: any) => {
    try {
      await fetch(`/api/admin/university-logos/${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, isActive: !item.isActive }),
      });
      loadLogos();
    } catch {
      showToast('Failed to update', 'error');
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/university-logos/${deleteModal.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      showToast('Deleted!');
      setDeleteModal({ open: false, id: '', name: '' });
      loadLogos();
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
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>University Logos</h1>
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.85rem' }}>Manage logos shown in the scrolling banner</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={seedDefaults}
            disabled={seeding}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.2rem', borderRadius: '8px', border: `1px solid ${ACCENT}`, background: '#fff', color: ACCENT, fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}
          >
            <RefreshCw size={14} /> {seeding ? 'Loading...' : 'Load Defaults'}
          </button>
          <button
            onClick={() => setModal({ mode: 'add', data: { name: '', logoUrl: '', order: logos.length + 1, isActive: true } })}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.2rem', borderRadius: '8px', border: 'none', background: ACCENT, color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}
          >
            <Plus size={15} /> Add Logo
          </button>
        </div>
      </div>

      {/* Live Preview */}
      {logos.filter(l => l.isActive).length > 0 && (
        <div style={{ background: '#fff', borderRadius: '12px', padding: '1.25rem 1.5rem', marginBottom: '2rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.75rem', margin: '0 0 1rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Live Preview — Scrolling Banner</p>
          <div style={{ display: 'flex', gap: '2rem', overflowX: 'auto', alignItems: 'center', paddingBottom: '0.5rem' }}>
            {logos.filter(l => l.isActive).map((logo: any) => (
              <img
                key={logo._id}
                src={`/api/proxy-image?url=${encodeURIComponent(logo.logoUrl)}`}
                alt={logo.name}
                style={{ height: '44px', width: 'auto', maxWidth: '120px', objectFit: 'contain', flexShrink: 0, filter: 'grayscale(20%)', opacity: 0.85 }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9' }}>
          <span style={{ fontWeight: 700, color: '#0f172a' }}>{logos.length} logo{logos.length !== 1 ? 's' : ''}</span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>Loading...</div>
        ) : logos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
            <ImageIcon size={40} style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.3 }} />
            <p>No logos yet. Add university logos to display in the scrolling banner.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '0.9rem 1.5rem', textAlign: 'left', color: '#64748b', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>Logo</th>
                <th style={{ padding: '0.9rem 1rem', textAlign: 'left', color: '#64748b', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>University Name</th>
                <th style={{ padding: '0.9rem 1rem', textAlign: 'center', color: '#64748b', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>Order</th>
                <th style={{ padding: '0.9rem 1rem', textAlign: 'center', color: '#64748b', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '0.9rem 1.5rem', textAlign: 'right', color: '#64748b', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {logos.map((logo: any) => (
                <tr key={logo._id} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ width: '80px', height: '44px', background: '#f8fafc', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                      <img
                        src={logo.logoUrl}
                        alt={logo.name}
                        style={{ height: '36px', width: 'auto', maxWidth: '72px', objectFit: 'contain' }}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 700, color: '#0f172a' }}>{logo.name}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>{logo.order}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <button onClick={() => toggleActive(logo)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: logo.isActive ? '#10b981' : '#94a3b8', fontWeight: 600, fontSize: '0.8rem' }}>
                      {logo.isActive ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                      {logo.isActive ? 'Visible' : 'Hidden'}
                    </button>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => setModal({ mode: 'edit', data: { ...logo } })} style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#475569', fontSize: '0.8rem', fontWeight: 600 }}>
                        <Edit size={13} /> Edit
                      </button>
                      <button onClick={() => setDeleteModal({ open: true, id: logo._id, name: logo.name })} style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid #fecaca', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#ef4444', fontSize: '0.8rem', fontWeight: 600 }}>
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
          <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '480px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h2 style={{ margin: '0 0 1.5rem', fontWeight: 800, color: '#0f172a', fontSize: '1.2rem' }}>
              {modal.mode === 'add' ? 'Add University Logo' : 'Edit University Logo'}
            </h2>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#374151', marginBottom: '0.4rem' }}>University Name *</label>
              <input
                type="text"
                value={modal.data.name}
                onChange={e => setModal(m => m ? { ...m, data: { ...m.data, name: e.target.value } } : m)}
                placeholder="e.g. Amity University"
                style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#374151', marginBottom: '0.4rem' }}>Logo URL *</label>
              <input
                type="url"
                value={modal.data.logoUrl}
                onChange={e => setModal(m => m ? { ...m, data: { ...m.data, logoUrl: e.target.value } } : m)}
                placeholder="https://example.com/logo.png"
                style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
              />
              {modal.data.logoUrl && (
                <div style={{ marginTop: '0.75rem', background: '#f8fafc', borderRadius: '8px', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0', minHeight: '64px' }}>
                  <img
                    src={modal.data.logoUrl}
                    alt="Preview"
                    style={{ height: '48px', width: 'auto', maxWidth: '180px', objectFit: 'contain' }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#374151', marginBottom: '0.4rem' }}>Display Order</label>
              <input
                type="number"
                value={modal.data.order}
                onChange={e => setModal(m => m ? { ...m, data: { ...m.data, order: Number(e.target.value) } } : m)}
                style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <label style={{ fontWeight: 600, fontSize: '0.85rem', color: '#374151' }}>Visible in banner</label>
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
              <button onClick={saveLogo} disabled={saving} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', background: ACCENT, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                {saving ? 'Saving...' : modal.mode === 'add' ? 'Add Logo' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteModal.open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h2 style={{ margin: '0 0 0.75rem', fontWeight: 800, color: '#0f172a' }}>Remove Logo?</h2>
            <p style={{ color: '#64748b', margin: '0 0 1.5rem' }}>
              Remove <strong style={{ color: '#0f172a' }}>{deleteModal.name}</strong> from the banner?
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setDeleteModal({ open: false, id: '', name: '' })} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', fontWeight: 700, cursor: 'pointer', color: '#64748b' }}>
                Cancel
              </button>
              <button onClick={confirmDelete} disabled={deleting} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', background: '#ef4444', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                {deleting ? 'Removing...' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
