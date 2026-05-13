'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function NewBatchPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [universities, setUniversities] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    universityId: '',
    programId: '',
    startDate: '',
    endDate: '',
    status: 'Active'
  });

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const response = await fetch('/api/admin/universities');
      if (response.ok) {
        const data = await response.json();
        setUniversities(data);
      }
    } catch (error) {
      console.error('Failed to fetch universities', error);
    }
  };

  const fetchPrograms = async (uniId: string) => {
    try {
      const response = await fetch(`/api/admin/programs?universityId=${uniId}`);
      if (response.ok) {
        const data = await response.json();
        setPrograms(data);
      }
    } catch (error) {
      console.error('Failed to fetch programs', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'universityId' && value) {
      fetchPrograms(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/batches');
      } else {
        alert('Failed to create batch');
      }
    } catch (error) {
      console.error('Submit failed', error);
      alert('Error creating batch');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/batches" className={styles.actionBtn} style={{ background: '#f1f5f9', color: '#64748b', padding: '0.5rem' }}>
            <ArrowLeft size={20} />
          </Link>
          <h1 className={styles.title}>Create New Batch</h1>
        </div>
      </header>

      <div className={styles.tableContainer} style={{ padding: '2rem', maxWidth: '800px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ gridColumn: '1 / span 2' }}>
            <label className={styles.label}>Batch Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="e.g. June 2024 Morning Batch"
              className={styles.input} 
              required 
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={styles.label}>University</label>
            <select 
              name="universityId" 
              className={styles.select} 
              required 
              value={formData.universityId}
              onChange={handleChange}
            >
              <option value="">Select University</option>
              {universities.map(uni => (
                <option key={uni._id} value={uni._id}>{uni.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={styles.label}>Program</label>
            <select 
              name="programId" 
              className={styles.select} 
              required 
              value={formData.programId}
              onChange={handleChange}
              disabled={!formData.universityId}
            >
              <option value="">Select Program</option>
              {programs.map(prog => (
                <option key={prog._id} value={prog._id}>{prog.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={styles.label}>Start Date</label>
            <input 
              type="date" 
              name="startDate" 
              className={styles.input} 
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={styles.label}>End Date</label>
            <input 
              type="date" 
              name="endDate" 
              className={styles.input} 
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={styles.label}>Status</label>
            <select 
              name="status" 
              className={styles.select} 
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div style={{ gridColumn: '1 / span 2', marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              type="submit" 
              className={styles.saveBtn} 
              disabled={loading}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {loading ? 'Creating...' : 'Create Batch'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
