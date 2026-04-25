'use client';
import { useState } from 'react';
import styles from './contact.module.css';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');
    
    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('invalid_email');
      return;
    }

    // Validate Phone (10 digits minimum, optional + and country code)
    const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      setStatus('invalid_phone');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.phone, // Store phone number in the subject field
          message: formData.message
        }),
      });
      if (!res.ok) throw new Error('Failed to send message');
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus(''), 4000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus(''), 4000);
    }
  };

  return (
    <main className={styles.container}>
      {/* ===== Cinematic Hero Section ===== */}
      <section className={styles.heroHeader}>
        <div className={styles.heroContent}>
          <p className={styles.heroCrumb}>
            <Link href="/">Home</Link> / Contact
          </p>
          <span className={styles.heroTag}>Support Center</span>
          <h1 className={styles.heroTitle}>
            Get in <span style={{ color: '#ef233c' }}>Touch</span>
          </h1>
          <p className={styles.heroSub}>
            Have questions? Our academic counselors are here to help you navigate your educational journey with clarity and confidence.
          </p>
        </div>
      </section>

      {/* ===== Contact Layout ===== */}
      <section className={styles.contactSplit}>
        {/* Form Column */}
        <div className={styles.formCard}>
          <h2 style={{ fontSize: '2.5rem', color: '#00122e', marginBottom: '2rem', fontWeight: 800 }}>
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className={styles.formInput} placeholder="Your Name" />
            </div>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className={styles.formInput} placeholder="your.email@example.com" />
            </div>
            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={styles.formInput} placeholder="+91 98765 43210" />
            </div>
            <div className={styles.formGroup}>
              <label>Your Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} required className={styles.formInput} rows={5} placeholder="How can we help you?"></textarea>
            </div>
            <button type="submit" disabled={status === 'submitting'} className={styles.submitBtn}>
              {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
            {status === 'invalid_email' && <p style={{ color: '#ef233c', marginTop: '1rem', fontWeight: 600, textAlign: 'center' }}>Please enter a valid email address.</p>}
            {status === 'invalid_phone' && <p style={{ color: '#ef233c', marginTop: '1rem', fontWeight: 600, textAlign: 'center' }}>Please enter a valid 10-digit phone number.</p>}
            {status === 'success' && <p style={{ color: 'green', marginTop: '1rem', fontWeight: 600, textAlign: 'center' }}>Message sent successfully!</p>}
            {status === 'error' && <p style={{ color: '#ef233c', marginTop: '1rem', fontWeight: 600, textAlign: 'center' }}>Failed to send message. Please try again.</p>}
          </form>
        </div>

        {/* Info Column */}
        <div className={styles.infoCard}>
           <div>
             <h2 style={{ fontSize: '2.5rem', color: '#00122e', marginBottom: '1rem', fontWeight: 800 }}>Contact Information</h2>
             <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2.5rem' }}>Reach out to our academic counselors for personalized guidance and support.</p>
           </div>
           
           <div className={styles.infoItem}>
             <div className={styles.iconBox}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
             </div>
             <div className={styles.infoText}>
               <h3>Phone Number</h3>
               <p>+91 98765 43210<br/>Mon-Sat 9:00 AM - 6:00 PM</p>
             </div>
           </div>

           <div className={styles.infoItem}>
             <div className={styles.iconBox}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
             </div>
             <div className={styles.infoText}>
               <h3>Email Address</h3>
               <p>info@timseducation.com<br/>admissions@timseducation.com</p>
             </div>
           </div>

           <div className={styles.infoItem}>
             <div className={styles.iconBox}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
             </div>
             <div className={styles.infoText}>
               <h3>Office Location</h3>
               <p>TIMS Education Center<br/>Global Academic City, India</p>
             </div>
           </div>
        </div>
      </section>
    </main>
  );
}
