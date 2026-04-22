
'use client';
import React, { useState } from 'react';
import styles from '../../admin.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function NewUniversity() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    location: '',
    establishedYear: '',
    status: 'active',
    website: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/universities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create university');
      }

      router.push('/admin/universities');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/universities" style={{ color: '#64748b' }}>← Back</Link>
          <h2 className={styles.tableTitle}>Add New University</h2>
        </div>
      </div>

      {error && (
        <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '10px', marginBottom: '1.5rem', maxWidth: '800px' }}>
          {error}
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>University Name</label>
            <input 
              name="name"
              type="text" 
              placeholder="e.g. Aligarh Muslim University" 
              className={styles.input} 
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Short Code</label>
            <input 
              name="code"
              type="text" 
              placeholder="e.g. AMU" 
              className={styles.input} 
              required
              value={formData.code}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea 
            name="description"
            rows={4} 
            placeholder="Brief introduction of the university..." 
            className={styles.textarea}
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Location</label>
            <input 
              name="location"
              type="text" 
              placeholder="City, State" 
              className={styles.input}
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Establishing Year</label>
            <input 
              name="establishedYear"
              type="number" 
              placeholder="e.g. 1920" 
              className={styles.input}
              value={formData.establishedYear}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Status</label>
            <select 
              name="status"
              className={styles.select}
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Website URL</label>
            <input 
              name="website"
              type="url" 
              placeholder="https://example.edu" 
              className={styles.input}
              value={formData.website}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Loader2 className="animate-spin" size={20} />
              <span>Saving...</span>
            </div>
          ) : 'Create University Profile'}
        </button>
      </form>
    </div>
  );
}
