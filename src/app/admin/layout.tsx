'use client';

import React, { useState } from 'react';
import styles from './admin.module.css';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.adminLayout}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className={styles.sidebarOverlay} 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Toggle Button for Mobile */}
      <button 
        className={styles.sidebarToggle}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Menu"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className={`${styles.mainContent} ${isSidebarOpen ? styles.mainShifted : ''}`}>
        {children}
      </main>
    </div>
  );
}
