
'use client';

import React, { useState } from 'react';
import styles from './login.module.css';
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (email === 'admin@tims.edu' && password === 'admin123') {
      router.push('/admin');
    } else {
      alert('Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      {/* Left branding panel */}
      <div className={styles.leftPanel}>
        <div className={styles.brandContent}>
          <div className={styles.logo}>
            TIMS<span>.</span>
          </div>
          <p className={styles.brandTagline}>Transforming Education, Shaping Futures</p>
          <div className={styles.brandDivider}></div>
          <h2 className={styles.brandTitle}>Your Gateway to Academic Excellence</h2>
          <p className={styles.brandDesc}>
            Access the TIMS administration panel to manage courses, students, results, and institutional resources — all in one secure place.
          </p>
          <div className={styles.brandBadge}>
            <span className={styles.brandBadgeDot}></span>
            Admin Portal
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className={styles.rightPanel}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <h1>Welcome Back</h1>
            <p>Please enter your credentials to access the admin panel.</p>
          </div>

          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} size={20} />
                <input
                  type="email"
                  placeholder="admin@tims.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} size={20} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.loginBtn} disabled={loading}>
              <LogIn size={20} />
              {loading ? 'Authenticating...' : 'Sign In to Admin'}
            </button>
          </form>

          <div className={styles.backToHomeWrapper}>
            <Link href="/" className={styles.backToHome}>
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className={styles.loginFooter}>
            <p>Secure administrative access only. Restricted to TIMS staff.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
