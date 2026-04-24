'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/app/admin/admin.module.css';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Image as ImageIcon, 
  X, 
  CheckCircle2, 
  Loader2,
  AlertCircle,
  User,
  Clock,
  BookOpen
} from 'lucide-react';
import ConfirmModal from '@/components/ConfirmModal';

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Education',
    image: '',
    author: 'TIMS Admin',
    readTime: '5 min read',
    status: 'published'
  });
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: '' });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/blogs');
      const data = await res.json();
      if (Array.isArray(data)) setBlogs(data);
    } catch (err) {
      console.error('Failed to fetch blogs', err);
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
      const url = editingId ? `/api/admin/blogs/${editingId}` : '/api/admin/blogs';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setToast({ msg: `Blog ${editingId ? 'updated' : 'created'} successfully!`, type: 'success' });
        setIsFormOpen(false);
        setEditingId(null);
        setFormData({
          title: '',
          slug: '',
          excerpt: '',
          content: '',
          category: 'Education',
          image: '',
          author: 'TIMS Admin',
          readTime: '5 min read',
          status: 'published'
        });
        fetchBlogs();
      } else {
        throw new Error('Failed to save blog');
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
      content: item.content,
      category: item.category || 'Education',
      image: item.image || '',
      author: item.author || 'TIMS Admin',
      readTime: item.readTime || '5 min read',
      status: item.status || 'published'
    });
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/blogs/${deleteModal.id}`, { method: 'DELETE' });
      if (res.ok) {
        setToast({ msg: 'Blog deleted successfully!', type: 'success' });
        fetchBlogs();
      }
    } catch (err) {
      setToast({ msg: 'Failed to delete blog.', type: 'error' });
    } finally {
      setDeleteModal({ isOpen: false, id: '' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Academic Blog Management</h1>
          <p style={{ color: '#64748b' }}>Create, edit and manage academic insights and student career guides.</p>
        </div>
        <button className={styles.addBtn} onClick={() => setIsFormOpen(true)}>
          <Plus size={20} /> Write Blog Post
        </button>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {toast.msg}
        </div>
      )}

      {/* Blog List */}
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search blogs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
            <Loader2 className="animate-spin" size={32} />
            <span>Loading articles...</span>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Article</th>
                <th>Author & Category</th>
                <th>Status</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.length > 0 ? filteredBlogs.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {item.image ? (
                        <img src={item.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                          <BookOpen size={20} />
                        </div>
                      )}
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, color: '#0f172a' }}>{item.title}</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>/{item.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>{item.author}</span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{item.category}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${item.status === 'published' ? styles.badgeActive : styles.badgeInactive}`}>
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    {new Date(item.publishedAt).toLocaleDateString()}
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
                    No blog posts found. Click "Write Blog Post" to get started.
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
                <h2 style={{ margin: 0 }}>{editingId ? 'Edit Article' : 'Write New Article'}</h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>Share academic insights and career guidance with students.</p>
              </div>
              <button className={styles.closeBtn} onClick={() => { setIsFormOpen(false); setEditingId(null); }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGrid} style={{ padding: 0 }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Article Title</label>
                    <input 
                      type="text" 
                      name="title"
                      className={styles.input}
                      placeholder="e.g. Top 5 Benefits of Distance Learning"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className={styles.label}>URL Slug</label>
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
                      <option value="Education">Education</option>
                      <option value="Career Guide">Career Guide</option>
                      <option value="Academic">Academic</option>
                      <option value="Exam Prep">Exam Prep</option>
                      <option value="Lifestyle">Lifestyle</option>
                      <option value="Management">Management</option>
                    </select>
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Excerpt (Short Summary)</label>
                    <textarea 
                      name="excerpt"
                      className={styles.input}
                      rows={2}
                      placeholder="Quick summary for the blog listing page..."
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Full Article Content (HTML Support)</label>
                    <textarea 
                      name="content"
                      className={styles.input}
                      rows={10}
                      placeholder="Write your blog post here. You can use <p>, <h3>, <strong> tags for formatting."
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className={styles.label}><ImageIcon size={16} /> Main Article Image URL</label>
                    <input 
                      type="text" 
                      name="image"
                      className={styles.input}
                      placeholder="https://images.unsplash.com/photo-..."
                      value={formData.image}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label className={styles.label}><User size={16} /> Author Name</label>
                      <input 
                        type="text" 
                        name="author"
                        className={styles.input}
                        value={formData.author}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className={styles.label}><Clock size={16} /> Read Time</label>
                      <input 
                        type="text" 
                        name="readTime"
                        className={styles.input}
                        value={formData.readTime}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={() => { setIsFormOpen(false); setEditingId(null); }}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn} disabled={saving} style={{ padding: '0.8rem 2.5rem' }}>
                  {saving ? <><Loader2 className="animate-spin" size={20} /> Publishing...</> : 'Publish Article'}
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
        title="Delete Blog Post"
        message="Are you sure you want to delete this article? This action cannot be undone."
      />
    </div>
  );
}
