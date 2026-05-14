'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Loader2, X } from 'lucide-react';
import styles from './RegisterModal.module.css';

export default function RegisterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    program: '',
    university: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-register-modal', handleOpen);
    return () => window.removeEventListener('open-register-modal', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset form when closed
      setTimeout(() => {
        setSuccess(false);
        setError('');
        setFormData({
          studentName: '',
          email: '',
          phone: '',
          program: '',
          university: '',
        });
      }, 300);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/public/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>

        {success ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>
              <CheckCircle size={40} />
            </div>
            <h2 className={styles.title}>Registration <span>Successful!</span></h2>
            <p className={styles.subtitle} style={{ marginTop: '1rem' }}>
              Thank you for registering. Our academic counselor will contact you shortly to guide you through the next steps.
            </p>
            <button className={styles.homeLink} onClick={() => setIsOpen(false)}>
              Close Window
            </button>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <h1 className={styles.title}>Start Your <span>Journey</span></h1>
              <p className={styles.subtitle}>
                Register now to get expert guidance on choosing the right program and university for your career goals.
              </p>
            </div>

            {error && (
              <div style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', padding: '12px', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="studentName">Full Name</label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  className={styles.input}
                  placeholder="Enter your full name"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.input}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={styles.input}
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="program">Interested Program</label>
                <select
                  id="program"
                  name="program"
                  className={`${styles.input} ${styles.select}`}
                  value={formData.program}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select a program</option>
                  <option value="MBA">MBA</option>
                  <option value="BBA">BBA</option>
                  <option value="MCA">MCA</option>
                  <option value="BCA">BCA</option>
                  <option value="B.Com">B.Com</option>
                  <option value="M.Com">M.Com</option>
                  <option value="BA">BA</option>
                  <option value="MA">MA</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="M.Sc">M.Sc</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="university">Preferred University (Optional)</label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  className={styles.input}
                  placeholder="E.g. Jain University, etc."
                  value={formData.university}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Register Now'}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
