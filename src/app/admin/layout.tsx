
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './admin.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Universities', path: '/admin/universities', icon: '🎓' },
    { name: 'Programs', path: '/admin/programs', icon: '📚' },
    { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          TIMS <span>ADMIN</span>
        </div>
        
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link 
              key={item.path}
              href={item.path}
              className={`${styles.navItem} ${pathname === item.path ? styles.activeNavItem : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
