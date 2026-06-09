'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Lock, Save, CheckCircle, AlertCircle, Eye, EyeOff, Shield } from 'lucide-react';
import styles from './settings.module.css';

export default function AdminSettingsPage() {
  const [currentEmail, setCurrentEmail] = useState('');
  const [loading, setLoading] = useState(true);

  // Change credentials form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/auth/me')
      .then(r => r.json())
      .then(d => { if (d.email) setCurrentEmail(d.email); })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);

    if (newPassword && newPassword !== confirmPassword) {
      setResult({ type: 'error', msg: 'New passwords do not match.' });
      return;
    }
    if (newPassword && newPassword.length < 6) {
      setResult({ type: 'error', msg: 'New password must be at least 6 characters.' });
      return;
    }
    if (!newEmail && !newPassword) {
      setResult({ type: 'error', msg: 'Please enter a new email or new password to update.' });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/auth/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newEmail: newEmail || undefined,
          newPassword: newPassword || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult({ type: 'error', msg: data.error || 'Update failed.' });
      } else {
        setCurrentEmail(data.email);
        setCurrentPassword('');
        setNewEmail('');
        setNewPassword('');
        setConfirmPassword('');
        setResult({ type: 'success', msg: 'Credentials updated successfully!' });
      }
    } catch {
      setResult({ type: 'error', msg: 'Connection error. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerIcon}><Shield size={24} /></div>
        <div>
          <h1 className={styles.title}>Account Settings</h1>
          <p className={styles.subtitle}>Manage your admin login credentials</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.currentInfo}>
          <Mail size={16} />
          <span>Logged in as <strong>{loading ? '...' : currentEmail}</strong></span>
        </div>

        <form onSubmit={handleSave} className={styles.form}>
          <h2 className={styles.sectionTitle}>Change Credentials</h2>
          <p className={styles.sectionNote}>Leave new email or new password blank to keep them unchanged.</p>

          {result && (
            <div className={`${styles.alert} ${result.type === 'success' ? styles.alertSuccess : styles.alertError}`}>
              {result.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              {result.msg}
            </div>
          )}

          {/* Current password — always required */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Current Password <span className={styles.required}>*</span></label>
            <div className={styles.inputWrap}>
              <Lock size={16} className={styles.inputIcon} />
              <input
                type={showCurrent ? 'text' : 'password'}
                className={styles.input}
                placeholder="Enter current password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                required
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowCurrent(v => !v)}>
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* New email */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>New Email Address</label>
            <div className={styles.inputWrap}>
              <Mail size={16} className={styles.inputIcon} />
              <input
                type="email"
                className={styles.input}
                placeholder={loading ? '...' : currentEmail}
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
              />
            </div>
          </div>

          {/* New password */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>New Password</label>
            <div className={styles.inputWrap}>
              <Lock size={16} className={styles.inputIcon} />
              <input
                type={showNew ? 'text' : 'password'}
                className={styles.input}
                placeholder="Min. 6 characters"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowNew(v => !v)}>
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm new password */}
          {newPassword && (
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Confirm New Password</label>
              <div className={styles.inputWrap}>
                <Lock size={16} className={styles.inputIcon} />
                <input
                  type="password"
                  className={styles.input}
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          )}

          <button type="submit" className={styles.saveBtn} disabled={saving}>
            <Save size={16} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
