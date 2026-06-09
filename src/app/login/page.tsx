'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './login.module.css';
import { Mail, Lock, LogIn, ArrowLeft, CheckCircle, KeyRound, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMsg, setForgotMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid email or password.');
        setLoading(false);
        return;
      }
      router.push('/admin');
    } catch {
      setError('Connection error. Please try again.');
      setLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotMsg('');
    try {
      const res = await fetch('/api/admin/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      setForgotMsg(data.message || 'If that email exists, a reset link has been sent.');
    } catch {
      setForgotMsg('Something went wrong. Please try again.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      {/* Forgot Password Modal */}
      {showForgot && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <button className={styles.modalClose} onClick={() => { setShowForgot(false); setForgotMsg(''); setForgotEmail(''); }}>
              <X size={18} />
            </button>
            <div className={styles.modalIcon}><KeyRound size={28} /></div>
            <h2 className={styles.modalTitle}>Forgot Password?</h2>
            <p className={styles.modalSub}>Enter your admin email and we will send you a reset link.</p>
            {forgotMsg ? (
              <div className={styles.successMsg}>{forgotMsg}</div>
            ) : (
              <form onSubmit={handleForgot} className={styles.modalForm}>
                <div className={styles.inputGroup}>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIcon} size={18} />
                    <input
                      type="email"
                      placeholder="Admin email address"
                      value={forgotEmail}
                      onChange={e => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className={styles.loginBtn} disabled={forgotLoading}>
                  {forgotLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Left branding panel */}
      <div className={styles.leftPanel}>
        <div className={styles.brandContent}>
          <div className={styles.logoWrap}>
            <Image
              src="/images/Untitled-46777.png"
              alt="Find Your University"
              width={200}
              height={68}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <p className={styles.brandTagline}>Connecting Students to the Right University</p>
          <div className={styles.brandDivider}></div>
          <h2 className={styles.brandTitle}>Your Gateway to Academic Excellence</h2>
          <p className={styles.brandDesc}>
            Access the Find Your University administration panel to manage programs, universities, scholarships, and student resources — all in one secure place.
          </p>
          <div className={styles.brandFeatures}>
            {['UGC-DEB Approved Universities', 'Online & Distance Programs', 'Scholarship Management', 'Student Counselling'].map(f => (
              <div key={f} className={styles.brandFeatureItem}>
                <CheckCircle size={15} className={styles.brandFeatureIcon} />
                <span>{f}</span>
              </div>
            ))}
          </div>
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
            {error && <div className={styles.errorMessage}>{error}</div>}
            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} size={20} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
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
                  onChange={(e) => { setPassword(e.target.value); if (error) setError(''); }}
                  required
                />
              </div>
            </div>

            <div className={styles.forgotRow}>
              <button type="button" className={styles.forgotLink} onClick={() => setShowForgot(true)}>
                Forgot password?
              </button>
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
