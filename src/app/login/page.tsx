
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

    // Hardcoded credentials for testing
    if (email === 'admin@tims.edu' && password === 'admin123') {
      // Success! Redirect to admin
      router.push('/admin');
    } else {
      alert('Invalid credentials. Hint: use admin@tims.edu / admin123');
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <div className={styles.logo}>
            TIMS<span>.</span>
          </div>
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
            <div className={styles.labelRow}>
              <label>Password</label>
              <Link href="/forgot-password" className={styles.forgotPass}>Forgot?</Link>
            </div>
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

      <div className={styles.bgGlow1}></div>
      <div className={styles.bgGlow2}></div>
    </div>
  );
}
