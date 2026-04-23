
'use client';
import React, { useState, useEffect } from 'react';
import styles from '@/app/admin/admin.module.css';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Loader2, Plus, X } from 'lucide-react';

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

  const handleFacilityChange = (index: number, value: string) => {
    const newFacilities = [...facilitiesList];
    newFacilities[index] = value;
    setFacilitiesList(newFacilities);
  };

  const addFacility = () => {
    setFacilitiesList([...facilitiesList, '']);
  };

  const removeFacility = (index: number) => {
    const newFacilities = facilitiesList.filter((_, i) => i !== index);
    setFacilitiesList(newFacilities);
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
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/universities" style={{ color: '#64748b' }}>← Back</Link>
          <h2 className={styles.tableTitle}>Edit University</h2>
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

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Ranking</label>
            <input 
              name="ranking"
              type="text" 
              placeholder="e.g. NIRF Rank 15" 
              className={styles.input}
              value={formData.ranking}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Accreditations</label>
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

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Institution Type</label>
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
          <div className={styles.formGroup}>
            <label>Contact Email</label>
            <input 
              name="contactEmail"
              type="email" 
              placeholder="e.g. admissions@example.edu" 
              className={styles.input}
              value={formData.contactEmail}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Main Image URL</label>
            <input 
              name="image"
              type="url" 
              placeholder="https://example.edu/image.jpg" 
              className={styles.input}
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Logo URL</label>
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

        <div className={styles.formGroup}>
          <label>Features (Comma separated)</label>
          <textarea 
            name="features"
            rows={3} 
            placeholder="e.g. Smart Classrooms, Library, Wi-Fi Campus..." 
            className={styles.textarea}
            value={formData.features}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label>Facilities</label>
          {facilitiesList.map((facility, index) => (
            <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="e.g. Hostel, Transport..."
                className={styles.input}
                value={facility}
                onChange={(e) => handleFacilityChange(index, e.target.value)}
              />
              {facilitiesList.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFacility(index)}
                  style={{ padding: '0.5rem', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addFacility}
            style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0.5rem 1rem', background: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '5px', cursor: 'pointer', width: 'fit-content', marginTop: '0.5rem', fontSize: '14px' }}
          >
            <Plus size={16} /> Add Facility
          </button>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Loader2 className="animate-spin" size={20} />
              <span>Saving...</span>
            </div>
          ) : 'Update University Profile'}
        </button>
      </form>
    </div>
  );
}
