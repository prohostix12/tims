
'use client';
import React, { useState, useEffect } from 'react';
import styles from '@/app/admin/admin.module.css';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Loader2, ArrowLeft, BookOpen, GraduationCap, Clock, FileText, ImageIcon } from 'lucide-react';

export default function EditProgram() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [universities, setUniversities] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    university: '',
    duration: '',
    type: '',
    category: '',
    level: '',
    eligibility: '',
    courseType: '',
    image: '',
    brochure: '',
    description: ''
  });

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch('/api/admin/universities');
        if (response.ok) {
          const data = await response.json();
          setUniversities(data);
        }
      } catch (err) {
        console.error('Failed to load universities', err);
      }
    };
    fetchUniversities();

    if (id) {
      fetch(`/api/admin/programs/${id}`)
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setFormData({
              name: data.name || '',
              university: data.university?._id || data.university || '',
              duration: data.duration || '',
              type: data.type || '',
              category: data.category || '',
              level: data.level || '',
              eligibility: data.eligibility || '',
              courseType: data.courseType || '',
              image: data.image || '',
              brochure: data.brochure || '',
              description: data.description || ''
            });
          }
        })
        .catch(err => console.error('Failed to load program data', err));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [fieldName]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.university) {
      setError('Please select a university');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/admin/programs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update program');
      }

      router.push('/admin/programs');
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
          <Link href="/admin/programs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#64748b', textDecoration: 'none', marginBottom: '0.5rem', fontWeight: 600 }}>
            <ArrowLeft size={18} /> Back to Programs
          </Link>
          <h1 className={styles.title}>Edit Program</h1>
        </div>
      </header>

      {error && (
        <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #fecaca' }}>
          <FileText size={18} /> {error}
        </div>
      )}

      <div className={styles.modalContent} style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div className={styles.formGrid} style={{ padding: 0 }}>
              <div>
                <label className={styles.label}><BookOpen size={16} /> Program Name</label>
                <input 
                  name="name"
                  type="text" 
                  placeholder="e.g. Master of Business Administration (MBA)" 
                  className={styles.input} 
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className={styles.label}><GraduationCap size={16} /> University</label>
                <select
                  name="university"
                  className={styles.select}
                  value={formData.university}
                  onChange={handleChange}
                  required
                >
                  {universities.map(uni => (
                    <option key={uni._id} value={uni._id}>{uni.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={styles.label}>Description</label>
              <textarea 
                name="description"
                rows={4} 
                placeholder="Brief description of the program..." 
                className={styles.textarea}
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className={styles.formGrid} style={{ padding: 0 }}>
              <div>
                <label className={styles.label}>Category</label>
                <select
                  name="category"
                  className={styles.select}
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Post Graduate">Post Graduate</option>
                  <option value="Degree">Degree</option>
                  <option value="+2">+2</option>
                  <option value="SSLC">SSLC</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div>
                <label className={styles.label}><Clock size={16} /> Duration</label>
                <input 
                  name="duration"
                  type="text" 
                  placeholder="e.g. 2 Years" 
                  className={styles.input}
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGrid} style={{ padding: 0 }}>
              <div>
                <label className={styles.label}>Level</label>
                <input 
                  name="level"
                  type="text" 
                  placeholder="e.g. Management, Engineering..." 
                  className={styles.input}
                  value={formData.level}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className={styles.label}>Eligibility</label>
                <input 
                  name="eligibility"
                  type="text" 
                  placeholder="e.g. Any Degree, 12th Science" 
                  className={styles.input}
                  value={formData.eligibility}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className={styles.formGrid} style={{ padding: 0 }}>
              <div>
                <label className={styles.label}>Course Stream / Type</label>
                <select
                  name="courseType"
                  className={styles.select}
                  value={formData.courseType}
                  onChange={handleChange}
                >
                  <option value="">Select Stream</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Science">Science</option>
                  <option value="Arts">Arts</option>
                  <option value="IT">IT</option>
                  <option value="Management">Management</option>
                  <option value="Medical">Medical</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div>
                <label className={styles.label}>Type / Keyword</label>
                <input 
                  name="type"
                  type="text" 
                  placeholder="e.g. Degree, Diploma..." 
                  className={styles.input}
                  value={formData.type}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGrid} style={{ padding: 0 }}>
              <div>
                <label className={styles.label}><ImageIcon size={16} /> Program Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  className={styles.input}
                  onChange={(e) => handleFileUpload(e, 'image')}
                />
                {formData.image && <p style={{fontSize: '12px', color: '#10b981', marginTop: '5px', fontWeight: 600}}>✓ Image attached successfully</p>}
              </div>
              <div>
                <label className={styles.label}><FileText size={16} /> Brochure (PDF)</label>
                <input 
                  type="file" 
                  accept=".pdf,application/pdf"
                  className={styles.input}
                  onChange={(e) => handleFileUpload(e, 'brochure')}
                />
                {formData.brochure && <p style={{fontSize: '12px', color: '#10b981', marginTop: '5px', fontWeight: 600}}>✓ Brochure attached successfully</p>}
              </div>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button type="submit" className={styles.saveBtn} disabled={loading} style={{ padding: '0.8rem 3rem' }}>
              {loading ? <><Loader2 className="animate-spin" size={20} /> Updating...</> : 'Update Program Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
