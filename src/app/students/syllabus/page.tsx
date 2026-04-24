'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Download, ChevronRight, BookOpen, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Syllabus {
  _id: string;
  courseName: string;
  universityName: string;
  fileUrl: string;
  createdAt: string;
}

export default function SyllabusPage() {
  const [syllabusList, setSyllabusList] = useState<Syllabus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const res = await fetch('/api/admin/syllabus');
        const data = await res.json();
        if (Array.isArray(data)) {
          setSyllabusList(data);
        }
      } catch (err) {
        setError('Failed to load syllabus data.');
      } finally {
        setLoading(false);
      }
    };
    fetchSyllabus();
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#f8fafc' }}>
        {/* Hero */}
        <section style={{ 
          backgroundColor: '#00122e', 
          backgroundImage: 'linear-gradient(to bottom, rgba(0,18,46,0.72) 0%, rgba(0,18,46,0.88) 100%), url("https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=2000&auto=format&fit=crop")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          padding: '12rem 5% 8rem', 
          position: 'relative', 
          overflow: 'hidden', 
          textAlign: 'center' 
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <span style={{ 
              display: 'inline-block', 
              background: 'rgba(239,35,60,0.15)', 
              border: '1px solid rgba(239,35,60,0.3)', 
              color: '#ff6b7a', 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              letterSpacing: '2px', 
              textTransform: 'uppercase', 
              padding: '0.4rem 1.2rem', 
              borderRadius: '100px', 
              marginBottom: '1.5rem' 
            }}>Academic Resources</span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 1.5rem', letterSpacing: '-1px' }}>Official Syllabus</h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
              Access and download the latest curriculum and syllabus documents for all our partner universities and programs.
            </p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: '5rem 5%' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            {loading ? (
              <div style={{ textAlign: 'center', padding: '5rem' }}>
                <Loader2 className="animate-spin" size={40} style={{ color: '#ef233c', marginBottom: '1rem' }} />
                <p style={{ color: '#64748b' }}>Loading syllabus repository...</p>
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '5rem', background: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                <p style={{ color: '#ef4444' }}>{error}</p>
              </div>
            ) : syllabusList.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {syllabusList.map((item) => (
                  <div key={item._id} style={{ 
                    background: '#ffffff', 
                    borderRadius: '20px', 
                    padding: '1.5rem', 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)', 
                    border: '1px solid #f1f5f9',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                    transition: 'transform 0.3s ease, border-color 0.3s ease'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = '#ef233c'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#f1f5f9'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '48px', height: '48px', background: 'rgba(239,35,60,0.08)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef233c' }}>
                        <BookOpen size={24} />
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#00122e', fontWeight: 700 }}>{item.courseName}</h3>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{item.universityName}</p>
                      </div>
                    </div>
                    
                    <div style={{ marginTop: 'auto' }}>
                      <a 
                        href={item.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          gap: '8px', 
                          width: '100%', 
                          background: '#00122e', 
                          color: '#ffffff', 
                          padding: '0.8rem', 
                          borderRadius: '10px', 
                          textDecoration: 'none', 
                          fontSize: '0.9rem', 
                          fontWeight: 600,
                          transition: 'background 0.2s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#ef233c'}
                        onMouseLeave={e => e.currentTarget.style.background = '#00122e'}
                      >
                        <Download size={18} /> Download Syllabus
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '8rem 2rem', background: '#ffffff', borderRadius: '32px', border: '1px dashed #cbd5e1' }}>
                <div style={{ width: '80px', height: '80px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#94a3b8' }}>
                  <FileText size={40} />
                </div>
                <h2 style={{ fontSize: '1.5rem', color: '#00122e', marginBottom: '0.5rem' }}>Syllabus Repository Empty</h2>
                <p style={{ color: '#64748b', maxWidth: '400px', margin: '0 auto' }}>
                  We are currently updating our syllabus database. Please check back soon or contact our support team for immediate assistance.
                </p>
                <Link href="/contact" style={{ display: 'inline-block', marginTop: '2rem', color: '#ef233c', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
                  Request Syllabus via Email →
                </Link>
              </div>
            )}

          </div>
        </section>

        {/* Support Section */}
        <section style={{ background: '#00122e', padding: '6rem 5%', textAlign: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>Need academic guidance?</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              Our expert counselors are here to help you understand the curriculum and choose the right path for your career.
            </p>
            <Link href="/contact" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              background: '#ef233c', 
              color: '#ffffff', 
              padding: '1rem 2.5rem', 
              borderRadius: '12px', 
              textDecoration: 'none', 
              fontWeight: 700,
              fontSize: '1.1rem',
              transition: 'transform 0.2s ease, background 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Get Free Counseling <ChevronRight size={20} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
