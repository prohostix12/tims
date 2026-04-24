'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/app/admin/admin.module.css';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Image as ImageIcon, 
  FileText, 
  X, 
  CheckCircle2, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import ConfirmModal from '@/components/ConfirmModal';

export default function NewsAdminPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'General',
    image: '',
    pdfUrl: '',
    status: 'published'
  });
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: '' });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/news');
      const data = await res.json();
      if (Array.isArray(data)) setNews(data);
    } catch (err) {
      console.error('Failed to fetch news', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      if (name === 'title' && !editingId) {
        newData.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId ? `/api/admin/news/${editingId}` : '/api/admin/news';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setToast({ msg: `News ${editingId ? 'updated' : 'created'} successfully!`, type: 'success' });
        setIsFormOpen(false);
        setEditingId(null);
        setFormData({
          title: '',
          slug: '',
          excerpt: '',
          content: '',
          category: 'General',
          image: '',
          pdfUrl: '',
          status: 'published'
        });
        fetchNews();
      } else {
        throw new Error('Failed to save news');
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
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      content: item.content || '',
      category: item.category || 'General',
      image: item.image || '',
      pdfUrl: item.pdfUrl || '',
      status: item.status || 'published'
    });
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/news/${deleteModal.id}`, { method: 'DELETE' });
      if (res.ok) {
        setToast({ msg: 'News deleted successfully!', type: 'success' });
        fetchNews();
      }
    } catch (err) {
      setToast({ msg: 'Failed to delete news.', type: 'error' });
    } finally {
      setDeleteModal({ isOpen: false, id: '' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const filteredNews = news.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>News Management</h1>
          <p style={{ color: '#64748b' }}>Create and manage institutional news, updates, and paper cuttings.</p>
        </div>
        <button className={styles.addBtn} onClick={() => setIsFormOpen(true)}>
          <Plus size={20} /> Create News
        </button>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {toast.msg}
        </div>
      )}

      {/* News List */}
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search news..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
            <Loader2 className="animate-spin" size={32} />
            <span>Loading news...</span>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>News Item</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNews.length > 0 ? filteredNews.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {item.image ? (
                        <img src={item.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                          <ImageIcon size={20} />
                        </div>
                      )}
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, color: '#0f172a' }}>{item.title}</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td>{item.category}</td>
                  <td>{new Date(item.publishedAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`${styles.badge} ${item.status === 'published' ? styles.badgeActive : styles.badgeInactive}`}>
                      {item.status.toUpperCase()}
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
                  <td colSpan={5} style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                    No news found. Click "Create News" to get started.
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
          <div className={styles.modalContent} style={{ maxWidth: '900px' }}>
            <div className={styles.modalHeader}>
              <div>
                <h2 style={{ margin: 0 }}>{editingId ? 'Edit News' : 'Create New News'}</h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>Fill in the details to publish a new institutional announcement.</p>
              </div>
              <button className={styles.closeBtn} onClick={() => { setIsFormOpen(false); setEditingId(null); }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGrid} style={{ padding: 0 }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>News Title / Heading</label>
                    <input 
                      type="text" 
                      name="title"
                      className={styles.input}
                      placeholder="e.g. TIMS Awarded Best Admission Partner 2024"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className={styles.label}>Slug (URL ID)</label>
                    <input 
                      type="text" 
                      name="slug"
                      className={styles.input}
                      value={formData.slug}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className={styles.label}>Category</label>
                    <select name="category" className={styles.input} value={formData.category} onChange={handleInputChange}>
                      <option value="General">General</option>
                      <option value="Awards">Awards</option>
                      <option value="Programs">Programs</option>
                      <option value="Services">Services</option>
                      <option value="Events">Events</option>
                    </select>
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Short Excerpt (Brief Summary)</label>
                    <textarea 
                      name="excerpt"
                      className={styles.input}
                      rows={2}
                      placeholder="A quick summary for the news listing page..."
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Full Content / Description</label>
                    <textarea 
                      name="content"
                      className={styles.input}
                      rows={6}
                      placeholder="The complete news story..."
                      value={formData.content}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className={styles.label}><ImageIcon size={16} /> Main Cover Image URL</label>
                    <input 
                      type="text" 
                      name="image"
                      className={styles.input}
                      placeholder="https://example.com/image.jpg"
                      value={formData.image}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className={styles.label}><FileText size={16} /> PDF / Document URL</label>
                    <input 
                      type="text" 
                      name="pdfUrl"
                      className={styles.input}
                      placeholder="https://example.com/document.pdf"
                      value={formData.pdfUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={() => { setIsFormOpen(false); setEditingId(null); }}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn} disabled={saving} style={{ padding: '0.8rem 2.5rem' }}>
                  {saving ? <><Loader2 className="animate-spin" size={20} /> Saving...</> : 'Save News'}
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
        title="Delete News"
        message="Are you sure you want to delete this news item? This action cannot be undone."
      />
    </div>
  );
}
