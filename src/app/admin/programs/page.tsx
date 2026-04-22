
'use client';
import React, { useEffect, useState } from 'react';
import styles from '../admin.module.css';
import Link from 'next/link';
import { Loader2, Trash2, Edit } from 'lucide-react';

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [universities, setUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUni, setSelectedUni] = useState('all');

  useEffect(() => {
    fetchUniversities();
    fetchPrograms();
  }, [selectedUni]);

  const fetchUniversities = async () => {
    try {
      const response = await fetch('/api/admin/universities');
      if (response.ok) {
        const data = await response.json();
        setUniversities(data);
      }
    } catch (error) {
      console.error('Failed to fetch universities:', error);
    }
  };

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const url = selectedUni === 'all' 
        ? '/api/admin/programs' 
        : `/api/admin/programs?universityId=${selectedUni}`;
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPrograms(data);
      }
    } catch (error) {
      console.error('Failed to fetch programs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.tableTitle}>Academic Programs</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select 
            className={styles.select} 
            style={{ width: '220px', backgroundColor: 'white' }}
            value={selectedUni}
            onChange={(e) => setSelectedUni(e.target.value)}
          >
            <option value="all">All Universities</option>
            {universities.map(uni => (
              <option key={uni._id} value={uni._id}>{uni.name}</option>
            ))}
          </select>
          <button className={styles.actionBtn}>+ New Program</button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div style={{ padding: '5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
            <Loader2 className="animate-spin" />
            <span>Loading programs...</span>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Program Name</th>
                <th>University</th>
                <th>Duration</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.length > 0 ? programs.map((program) => (
                <tr key={program._id}>
                  <td style={{ fontWeight: 600 }}>{program.name}</td>
                  <td>{program.university?.name || 'N/A'}</td>
                  <td>{program.duration}</td>
                  <td>
                    <span className={styles.badge} style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>
                      {program.type}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button style={{ color: '#00122e', border: 'none', background: 'none', cursor: 'pointer' }} title="Edit">
                        <Edit size={18} />
                      </button>
                      <button style={{ color: '#ef233c', border: 'none', background: 'none', cursor: 'pointer' }} title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>
                    No programs found for the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
