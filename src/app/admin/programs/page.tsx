
import React from 'react';
import styles from '../admin.module.css';
import Link from 'next/link';

export default function ProgramsPage() {
  const programs: any[] = [];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.tableTitle}>Academic Programs</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select className={styles.select} style={{ width: '200px', backgroundColor: 'white' }}>
            <option>All Universities</option>
            <option>Andhra University</option>
            <option>AMU</option>
          </select>
          <button className={styles.actionBtn}>+ New Program</button>
        </div>
      </div>

      <div className={styles.tableContainer}>
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
            {programs.map((program) => (
              <tr key={program.id}>
                <td style={{ fontWeight: 600 }}>{program.name}</td>
                <td>{program.university}</td>
                <td>{program.duration}</td>
                <td>
                  <span className={styles.badge} style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>
                    {program.type}
                  </span>
                </td>
                <td>
                  <button style={{ color: '#ef233c', fontSize: '0.9rem', marginRight: '1rem' }}>Delete</button>
                  <button style={{ color: '#00122e', fontSize: '0.9rem' }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
