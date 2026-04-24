
'use client';
import React, { useState, useEffect } from 'react';
import styles from '@/app/admin/admin.module.css';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Loader2, Plus, X, ArrowLeft, GraduationCap, Globe, Mail, MapPin, Award } from 'lucide-react';

export default function EditUniversity() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [facilitiesList, setFacilitiesList] = useState<string[]>(['']);
  
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    location: '',
    establishedYear: '',
    status: 'active',
    website: '',
    ranking: '',
    accreditations: '',
    type: 'private',
    contactEmail: '',
    image: '',
    logo: '',
    features: ''
  });

  useEffect(() => {
    if (id) {
      fetch(`/api/admin/universities/${id}`)
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setFormData({
              name: data.name || '',
              code: data.code || '',
              description: data.description || '',
              location: data.location || '',
              establishedYear: data.establishedYear || '',
              status: data.status || 'active',
              website: data.website || '',
              ranking: data.ranking || '',
              accreditations: data.accreditations || '',
              type: data.type || 'private',
              contactEmail: data.contactEmail || '',
              image: data.image || '',
              logo: data.logo || '',
              features: Array.isArray(data.features) ? data.features.join(', ') : (data.features || '')
            });
            if (data.facilities && data.facilities.length > 0) {
              setFacilitiesList(data.facilities);
            }
          }
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        features: formData.features ? formData.features.split(',').map((f: string) => f.trim()).filter(Boolean) : [],
        facilities: facilitiesList.filter(f => f.trim() !== ''),
      };

      const response = await fetch(`/api/admin/universities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update university');
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
      <header className={styles.header}>
        <div>
          <Link href="/admin/universities" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#64748b', textDecoration: 'none', marginBottom: '0.5rem', fontWeight: 600 }}>
            <ArrowLeft size={18} /> Back to Universities
          </Link>
          <h1 className={styles.title}>Edit University</h1>
        </div>
      </header>

      {error && (
        <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #fecaca' }}>
          <X size={18} /> {error}
        </div>
      )}

      <div className={styles.modalContent} style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div className={styles.formGrid} style={{ padding: 0 }}>
              <div>
                <label className={styles.label}><GraduationCap size={16} /> University Name</label>
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
              <div>
                <label className={styles.label}>Short Code</label>
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

            <div>
              <label className={styles.label}>Description</label>
              <textarea 
                name="description"
                rows={4} 
                placeholder="Brief introduction of the university..." 
                className={styles.textarea}
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className={styles.formGrid} style={{ padding: 0 }}>
              <div>
                <label className={styles.label}><MapPin size={16} /> Location</label>
                <input 
                  name="location"
                  type="text" 
                  placeholder="City, State" 
                  className={styles.input}
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className={styles.label}>Establishing Year</label>
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

            <div className={styles.formGrid} style={{ padding: 0 }}>
              <div>
                <label className={styles.label}>Status</label>
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
              <div>
                <label className={styles.label}><Globe size={16} /> Website URL</label>
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

            <div className={styles.formGrid} style={{ padding: 0 }}>
              <div>
                <label className={styles.label}>Ranking</label>
                <input 
                  name="ranking"
                  type="text" 
                  placeholder="e.g. NIRF Rank 15" 
                  className={styles.input}
                  value={formData.ranking}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className={styles.label}><Award size={16} /> Accreditations</label>
                <input 
                  name="accreditations"
                  type="text" 
                  placeholder="e.g. NAAC A++, UGC Approved" 
                  className={styles.input}
                  value={formData.accreditations}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGrid} style={{ padding: 0 }}>
              <div>
                <label className={styles.label}>Institution Type</label>
                <select 
                  name="type"
                  className={styles.select}
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                  <option value="deemed">Deemed-to-be</option>
                  <option value="state">State</option>
                </select>
              </div>
              <div>
                <label className={styles.label}><Mail size={16} /> Contact Email</label>
                <input 
                  name="contactEmail"
                  type="email" 
                  placeholder="admissions@example.edu" 
                  className={styles.input}
                  value={formData.contactEmail}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGrid} style={{ padding: 0 }}>
              <div>
                <label className={styles.label}>Main Image URL</label>
                <input 
                  name="image"
                  type="url" 
                  placeholder="https://example.edu/image.jpg" 
                  className={styles.input}
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className={styles.label}>Logo URL</label>
                <input 
                  name="logo"
                  type="url" 
                  placeholder="https://example.edu/logo.png" 
                  className={styles.input}
                  value={formData.logo}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button type="submit" className={styles.saveBtn} disabled={loading} style={{ padding: '0.8rem 3rem' }}>
              {loading ? <><Loader2 className="animate-spin" size={20} /> Updating...</> : 'Update University Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
