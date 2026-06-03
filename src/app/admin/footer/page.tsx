'use client';

import React, { useState, useEffect } from 'react';
import styles from '../admin.module.css';
import {
  LayoutTemplate, Save, Plus, Trash2, Loader2, AlertTriangle,
  Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ChevronDown, ChevronUp,
} from 'lucide-react';

interface FooterSection {
  heading: string;
  email: string;
  phone: string;
  addresses: string[];
  socialFacebook: string;
  socialInstagram: string;
  socialLinkedin: string;
  showSocial: boolean;
}

interface FooterData {
  sections: FooterSection[];
  copyrightText: string;
}

const DEFAULT_SECTION: FooterSection = {
  heading: '',
  email: '',
  phone: '',
  addresses: [''],
  socialFacebook: '',
  socialInstagram: '',
  socialLinkedin: '',
  showSocial: true,
};

export default function AdminFooterPage() {
  const [data, setData] = useState<FooterData>({ sections: [], copyrightText: 'TIMS Education' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});

  useEffect(() => {
    fetch('/api/admin/footer')
      .then(r => r.json())
      .then(d => {
        setData({
          sections: d.sections || [],
          copyrightText: d.copyrightText || 'TIMS Education',
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const updateSection = (i: number, field: keyof FooterSection, value: any) => {
    setData(prev => {
      const sections = [...prev.sections];
      sections[i] = { ...sections[i], [field]: value };
      return { ...prev, sections };
    });
  };

  const updateAddress = (si: number, ai: number, value: string) => {
    setData(prev => {
      const sections = [...prev.sections];
      const addresses = [...sections[si].addresses];
      addresses[ai] = value;
      sections[si] = { ...sections[si], addresses };
      return { ...prev, sections };
    });
  };

  const addAddress = (si: number) => {
    setData(prev => {
      const sections = [...prev.sections];
      sections[si] = { ...sections[si], addresses: [...sections[si].addresses, ''] };
      return { ...prev, sections };
    });
  };

  const removeAddress = (si: number, ai: number) => {
    setData(prev => {
      const sections = [...prev.sections];
      sections[si] = { ...sections[si], addresses: sections[si].addresses.filter((_, idx) => idx !== ai) };
      return { ...prev, sections };
    });
  };

  const addSection = () => {
    setData(prev => ({ ...prev, sections: [...prev.sections, { ...DEFAULT_SECTION, addresses: [''] }] }));
  };

  const removeSection = (i: number) => {
    setData(prev => ({ ...prev, sections: prev.sections.filter((_, idx) => idx !== i) }));
  };

  const toggleCollapse = (i: number) => {
    setCollapsed(prev => ({ ...prev, [i]: !prev[i] }));
  };

  const save = async () => {
    setSaving(true); setMsg('');
    try {
      const res = await fetch('/api/admin/footer', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setMsg('Saved successfully!');
      else setMsg('Error saving.');
    } catch {
      setMsg('Error saving.');
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(''), 3000);
    }
  };

  if (loading) return (
    <div className={styles.pageContainer} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
      <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: '#E8502A' }} />
    </div>
  );

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <LayoutTemplate size={28} style={{ color: '#E8502A' }} />
        <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800, color: '#1e293b' }}>Footer Editor</h1>
      </div>
      <p style={{ color: '#64748b', marginBottom: '1.5rem', marginTop: 0 }}>
        Edit the footer columns displayed on all public pages.
      </p>

      {/* Copyright */}
      <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>
          Copyright Text
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>© Copyright {new Date().getFullYear()} by</span>
          <input
            type="text"
            value={data.copyrightText}
            onChange={e => setData(d => ({ ...d, copyrightText: e.target.value }))}
            className={styles.input}
            style={{ flex: 1 }}
            placeholder="TIMS Education"
          />
        </div>
      </div>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {data.sections.map((sec, si) => (
          <div key={si} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            {/* Section header */}
            <div
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 1.25rem', cursor: 'pointer',
                background: collapsed[si] ? '#f8fafc' : '#fff',
                borderBottom: collapsed[si] ? 'none' : '1px solid #f1f5f9',
              }}
              onClick={() => toggleCollapse(si)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{
                  minWidth: 28, height: 28, borderRadius: '50%', background: '#fff5f0',
                  border: '1.5px solid rgba(232,80,42,.3)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', color: '#E8502A',
                }}>{si + 1}</span>
                <span style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.95rem' }}>
                  {sec.heading || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Untitled Column</span>}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button
                  onClick={e => { e.stopPropagation(); removeSection(si); }}
                  style={{ background: '#fef2f2', border: 'none', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#ef4444', display: 'flex' }}
                  title="Remove column"
                >
                  <Trash2 size={14} />
                </button>
                {collapsed[si] ? <ChevronDown size={18} style={{ color: '#94a3b8' }} /> : <ChevronUp size={18} style={{ color: '#94a3b8' }} />}
              </div>
            </div>

            {/* Section body */}
            {!collapsed[si] && (
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Heading */}
                <div>
                  <label style={labelStyle}>Column Heading</label>
                  <input
                    type="text"
                    value={sec.heading}
                    onChange={e => updateSection(si, 'heading', e.target.value)}
                    className={styles.input}
                    style={{ width: '100%' }}
                    placeholder="e.g. TIMS"
                  />
                </div>

                {/* Email & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}><Mail size={12} style={{ display: 'inline', marginRight: 4 }} />Email</label>
                    <input
                      type="email"
                      value={sec.email}
                      onChange={e => updateSection(si, 'email', e.target.value)}
                      className={styles.input}
                      style={{ width: '100%' }}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}><Phone size={12} style={{ display: 'inline', marginRight: 4 }} />Phone</label>
                    <input
                      type="text"
                      value={sec.phone}
                      onChange={e => updateSection(si, 'phone', e.target.value)}
                      className={styles.input}
                      style={{ width: '100%' }}
                      placeholder="+91 XXXXXXXXXX"
                    />
                  </div>
                </div>

                {/* Addresses */}
                <div>
                  <label style={labelStyle}><MapPin size={12} style={{ display: 'inline', marginRight: 4 }} />Address(es)</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {sec.addresses.map((addr, ai) => (
                      <div key={ai} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input
                          type="text"
                          value={addr}
                          onChange={e => updateAddress(si, ai, e.target.value)}
                          className={styles.input}
                          style={{ flex: 1 }}
                          placeholder="Street, City, State"
                        />
                        <button
                          onClick={() => removeAddress(si, ai)}
                          disabled={sec.addresses.length <= 1}
                          style={{ background: 'none', border: 'none', cursor: sec.addresses.length <= 1 ? 'not-allowed' : 'pointer', color: '#ef4444', opacity: sec.addresses.length <= 1 ? 0.3 : 1, padding: '0.25rem', display: 'flex' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addAddress(si)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '0.4rem 0.9rem', cursor: 'pointer', color: '#64748b', fontSize: '0.82rem', width: 'fit-content' }}
                    >
                      <Plus size={13} /> Add Address
                    </button>
                  </div>
                </div>

                {/* Social */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                    <label style={{ ...labelStyle, margin: 0 }}>Social Links</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#64748b', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={sec.showSocial}
                        onChange={e => updateSection(si, 'showSocial', e.target.checked)}
                        style={{ accentColor: '#E8502A' }}
                      />
                      Show social icons
                    </label>
                  </div>
                  {sec.showSocial && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 4 }}><Facebook size={12} />Facebook URL</label>
                        <input type="url" value={sec.socialFacebook} onChange={e => updateSection(si, 'socialFacebook', e.target.value)} className={styles.input} style={{ width: '100%' }} placeholder="https://facebook.com/..." />
                      </div>
                      <div>
                        <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 4 }}><Instagram size={12} />Instagram URL</label>
                        <input type="url" value={sec.socialInstagram} onChange={e => updateSection(si, 'socialInstagram', e.target.value)} className={styles.input} style={{ width: '100%' }} placeholder="https://instagram.com/..." />
                      </div>
                      <div>
                        <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 4 }}><Linkedin size={12} />LinkedIn URL</label>
                        <input type="url" value={sec.socialLinkedin} onChange={e => updateSection(si, 'socialLinkedin', e.target.value)} className={styles.input} style={{ width: '100%' }} placeholder="https://linkedin.com/..." />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Column button */}
      <button
        onClick={addSection}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: '#f8fafc', border: '1.5px dashed #cbd5e1', borderRadius: '10px',
          padding: '0.8rem 1.5rem', cursor: 'pointer', color: '#64748b',
          fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem', width: '100%',
          justifyContent: 'center', transition: 'border-color .15s, color .15s',
        }}
      >
        <Plus size={16} /> Add Footer Column
      </button>

      {/* Save */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={save}
          disabled={saving}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: '#E8502A', color: '#fff', border: 'none',
            padding: '0.75rem 2rem', borderRadius: '8px',
            fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
          Save Footer
        </button>
        {msg && (
          <span style={{ fontWeight: 600, color: msg.includes('Error') ? '#ef4444' : '#22c55e' }}>
            {msg}
          </span>
        )}
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.78rem', fontWeight: 700,
  color: '#374151', textTransform: 'uppercase', letterSpacing: '0.04em',
  marginBottom: '0.35rem',
};
