'use client';
import React, { useEffect, useState } from 'react';
import styles from '../admin.module.css';
import { Globe, Save, Loader2, Info, CheckCircle } from 'lucide-react';

const DEFAULT: Record<string, string> = {
  siteTitle: '',
  metaDescription: '',
  keywords: '',
  googleAnalyticsId: '',
  sitemapUrl: '',
};

export default function SEOPage() {
  const [form, setForm] = useState(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/seo')
      .then(r => r.json())
      .then(data => {
        if (!data.error) setForm({
          siteTitle: data.siteTitle || '',
          metaDescription: data.metaDescription || '',
          keywords: data.keywords || '',
          googleAnalyticsId: data.googleAnalyticsId || '',
          sitemapUrl: data.sitemapUrl || '',
        });
      })
      .catch(() => setError('Failed to load SEO settings'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/admin/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to save');
      setSaved(true);
    } catch {
      setError('Failed to save SEO settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>SEO Settings</h1>
          <p style={{ color: '#64748b' }}>Configure global search engine optimisation and analytics.</p>
        </div>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>A</div>
          <span>Admin</span>
        </div>
      </header>

      {error && (
        <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '10px', marginBottom: '1.5rem', border: '1px solid #fecaca' }}>
          {error}
        </div>
      )}

      {saved && (
        <div style={{ padding: '1rem', background: '#f0fdf4', color: '#166534', borderRadius: '10px', marginBottom: '1.5rem', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle size={18} /> SEO settings saved successfully.
        </div>
      )}

      {loading ? (
        <div style={{ padding: '5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
          <Loader2 className="animate-spin" size={28} />
          <span>Loading settings...</span>
        </div>
      ) : (
        <div className={styles.modalContent} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit}>
            <div className={styles.modalBody}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                <div>
                  <label className={styles.label}><Globe size={15} style={{ display: 'inline', marginRight: 6 }} />Global Default Title</label>
                  <input
                    name="siteTitle"
                    type="text"
                    className={styles.input}
                    value={form.siteTitle}
                    onChange={handleChange}
                    placeholder="e.g. TIMS Education – Best Distance Learning Centre"
                  />
                </div>

                <div>
                  <label className={styles.label}>Global Meta Description</label>
                  <textarea
                    name="metaDescription"
                    className={styles.textarea}
                    rows={4}
                    value={form.metaDescription}
                    onChange={handleChange}
                    placeholder="A brief description shown in Google search results (150–160 characters recommended)"
                  />
                  <p style={{ fontSize: '0.78rem', color: form.metaDescription.length > 160 ? '#ef4444' : '#94a3b8', marginTop: 4 }}>
                    {form.metaDescription.length} / 160 characters
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label className={styles.label}>Google Analytics ID</label>
                    <input
                      name="googleAnalyticsId"
                      type="text"
                      className={styles.input}
                      value={form.googleAnalyticsId}
                      onChange={handleChange}
                      placeholder="G-XXXXXXXXXX or UA-XXXXXXX-X"
                    />
                  </div>
                  <div>
                    <label className={styles.label}>Sitemap URL</label>
                    <input
                      name="sitemapUrl"
                      type="text"
                      className={styles.input}
                      value={form.sitemapUrl}
                      onChange={handleChange}
                      placeholder="https://yourdomain.com/sitemap.xml"
                    />
                  </div>
                </div>

                <div>
                  <label className={styles.label}>Keywords (comma separated)</label>
                  <input
                    name="keywords"
                    type="text"
                    className={styles.input}
                    value={form.keywords}
                    onChange={handleChange}
                    placeholder="e.g. distance education, online MBA, university courses Kerala"
                  />
                </div>

                <div style={{ padding: '1rem', background: '#eff6ff', borderRadius: '12px', border: '1px solid #dbeafe', color: '#1e40af', fontSize: '0.85rem', display: 'flex', gap: '10px' }}>
                  <Info size={18} style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ margin: 0 }}>These settings apply globally to all pages unless page-specific SEO is defined for a course or university profile.</p>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button type="submit" className={styles.saveBtn} disabled={saving} style={{ padding: '0.8rem 2.5rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save SEO Configuration</>}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
