'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  MapPin, 
  Globe, 
  Mail, 
  Award, 
  Calendar, 
  GraduationCap, 
  CheckCircle2, 
  Loader2,
  ChevronRight,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EnquiryModal from '@/components/EnquiryModal';

export default function UniversityDetailPage() {
  const { id } = useParams();
  const [uni, setUni] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/admin/universities/${id}`)
        .then((r) => r.json())
        .then((data) => {
          if (!data.error) setUni(data);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', background: '#f8fafc' }}>
        <Loader2 className="animate-spin" size={48} color="#00122e" />
        <p style={{ color: '#64748b', fontWeight: 600 }}>Loading university profile...</p>
      </div>
    );
  }

  if (!uni) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '20px' }}>
        <h1 style={{ color: '#00122e' }}>University Not Found</h1>
        <p style={{ color: '#64748b', marginBottom: '20px' }}>The university profile you are looking for does not exist.</p>
        <Link href="/universities" style={{ padding: '12px 24px', background: '#00122e', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 700 }}>Back to Universities</Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#ffffff', paddingBottom: '100px' }}>
        {/* Hero Section */}
        <div style={{ position: 'relative', height: '500px', width: '100%', overflow: 'hidden' }}>
          <Image 
            src={uni.image || 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop'} 
            alt={uni.name} 
            fill 
            style={{ objectFit: 'cover' }} 
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,18,46,0.3), rgba(0,18,46,0.9))' }} />
          
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '60px 20px', color: 'white' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
                <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                <ChevronRight size={14} />
                <Link href="/universities" style={{ color: 'inherit', textDecoration: 'none' }}>Universities</Link>
                <ChevronRight size={14} />
                <span style={{ color: 'white', fontWeight: 700 }}>{uni.name}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <span style={{ display: 'inline-block', background: '#ef233c', color: 'white', padding: '4px 16px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '1rem' }}>{uni.type?.toUpperCase() || 'INSTITUTION'}</span>
                  <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, margin: 0, lineHeight: 1.1 }}>{uni.name}</h1>
                  <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <MapPin size={20} style={{ color: '#ef233c' }} /> {uni.location}
                  </p>
                </div>
                
                <button 
                  onClick={() => setIsModalOpen(true)}
                  style={{ background: 'white', color: '#00122e', border: 'none', padding: '1.2rem 2.5rem', borderRadius: '12px', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s ease', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
                >
                  Quick Enquiry <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '60px' }}>
            
            {/* Left Column: Details */}
            <div>
              <section style={{ marginBottom: '60px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#00122e', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ width: '8px', height: '40px', background: '#ef233c', borderRadius: '4px' }} />
                  About the University
                </h2>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#475569' }}>
                  {uni.description || 'This esteemed institution is a global leader in higher education, recognized for its commitment to academic excellence, innovative research, and student success. With a diverse campus culture and world-class facilities, it provides an ideal environment for students to thrive and achieve their professional goals.'}
                </p>
              </section>

              <section style={{ marginBottom: '60px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#00122e', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ width: '8px', height: '40px', background: '#ef233c', borderRadius: '4px' }} />
                  Accreditations & Recognition
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                  {uni.accreditations ? uni.accreditations.split(',').map((acc: string, i: number) => (
                    <div key={i} style={{ padding: '24px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckCircle2 size={24} />
                      </div>
                      <span style={{ fontWeight: 700, color: '#1e293b' }}>{acc.trim()}</span>
                    </div>
                  )) : (
                    <>
                      <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><CheckCircle2 size={24} /></div>
                        <span style={{ fontWeight: 700, color: '#1e293b' }}>UGC Approved</span>
                      </div>
                      <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><CheckCircle2 size={24} /></div>
                        <span style={{ fontWeight: 700, color: '#1e293b' }}>NAAC Accredited</span>
                      </div>
                    </>
                  )}
                </div>
              </section>

              <section>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#00122e', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ width: '8px', height: '40px', background: '#ef233c', borderRadius: '4px' }} />
                  Key Highlights
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00122e', flexShrink: 0 }}><Award size={24} /></div>
                    <div>
                      <h4 style={{ margin: '0 0 5px', fontWeight: 800 }}>Ranking</h4>
                      <p style={{ margin: 0, color: '#64748b' }}>{uni.ranking || 'Top 50 Global Innovation'}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00122e', flexShrink: 0 }}><Calendar size={24} /></div>
                    <div>
                      <h4 style={{ margin: '0 0 5px', fontWeight: 800 }}>Established</h4>
                      <p style={{ margin: 0, color: '#64748b' }}>Since {uni.establishedYear || '1965'}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00122e', flexShrink: 0 }}><GraduationCap size={24} /></div>
                    <div>
                      <h4 style={{ margin: '0 0 5px', fontWeight: 800 }}>Institution Type</h4>
                      <p style={{ margin: 0, color: '#64748b' }}>{uni.type || 'Private Research University'}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00122e', flexShrink: 0 }}><Globe size={24} /></div>
                    <div>
                      <h4 style={{ margin: '0 0 5px', fontWeight: 800 }}>Global Presence</h4>
                      <p style={{ margin: 0, color: '#64748b' }}>International campus & partners</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Sidebar info */}
            <div>
              <div style={{ padding: '40px', background: '#00122e', borderRadius: '32px', color: 'white', position: 'sticky', top: '100px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem' }}>Contact Information</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Globe size={20} /></div>
                    <div>
                      <p style={{ margin: '0 0 4px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase' }}>Official Website</p>
                      <a href={uni.website} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', fontWeight: 700, wordBreak: 'break-all' }}>{uni.website || 'www.university.edu'}</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Mail size={20} /></div>
                    <div>
                      <p style={{ margin: '0 0 4px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase' }}>Admission Support</p>
                      <p style={{ margin: 0, fontWeight: 700 }}>{uni.contactEmail || 'admissions@university.edu'}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><BookOpen size={20} /></div>
                    <div>
                      <p style={{ margin: '0 0 4px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase' }}>Programs Offered</p>
                      <p style={{ margin: 0, fontWeight: 700 }}>UG, PG, PhD, Diploma</p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '40px', padding: '25px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ margin: '0 0 15px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>Need guidance for admission or credit transfer to this university?</p>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    style={{ width: '100%', background: '#ef233c', color: 'white', border: 'none', padding: '1rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}
                  >
                    Consult an Advisor
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />

      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={`Enquire about ${uni.name}`}
        interest={uni.name}
        source="University Detail Page"
      />
    </>
  );
}
