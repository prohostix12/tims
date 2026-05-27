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
import EnquiryModal from '@/components/EnquiryModal';

import UniversityLogoBanner from '@/components/UniversityLogoBanner';

export default function UniversityDetailPage() {
  const { id } = useParams();
  const [uni, setUni] = useState<any>(null);
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/admin/universities/${id}`)
        .then((r) => r.json())
        .then((data) => {
          if (!data.error) setUni(data);
        })
        .catch(() => {})
        .finally(() => setLoading(false));

      fetch(`/api/admin/programs?universityId=${id}`)
        .then((r) => r.json())
        .then((data) => { if (Array.isArray(data)) setPrograms(data); })
        .catch(() => {});
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', background: '#F0E6CE' }}>
        <Loader2 className="animate-spin" size={48} color="#00122e" />
        <p style={{ color: '#64748b', fontWeight: 600 }}>Loading university profile...</p>
      </div>
    );
  }

  if (!uni) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F0E6CE', padding: '20px' }}>
        <h1 style={{ color: '#00122e' }}>University Not Found</h1>
        <p style={{ color: '#64748b', marginBottom: '20px' }}>The university profile you are looking for does not exist.</p>
        <Link href="/universities" style={{ padding: '12px 24px', background: '#00122e', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 700 }}>Back to Universities</Link>
      </div>
    );
  }

  return (
    <>
      <main style={{ minHeight: '100vh', background: '#F0E6CE', paddingBottom: '100px' }}>
        <UniversityLogoBanner />
        {/* Hero Section */}
        <div style={{ position: 'relative', minHeight: '550px', width: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
          <Image 
            src={uni.image || 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop'} 
            alt={uni.name} 
            fill 
            style={{ objectFit: 'cover' }} 
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,18,46,0.4), rgba(0,18,46,0.85))' }} />
          
          <div style={{ position: 'relative', width: '100%', padding: '40px 20px', color: 'white', zIndex: 1 }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              
              {uni.logo && (
                <div style={{ width: '100px', height: '100px', background: 'white', borderRadius: '20px', padding: '15px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                  <img src={uni.logo} alt={`${uni.name} Logo`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(uni.name)}&background=random&size=128`; }} />
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
                <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                <ChevronRight size={14} />
                <Link href="/universities" style={{ color: 'inherit', textDecoration: 'none' }}>Universities</Link>
                <ChevronRight size={14} />
                <span style={{ color: 'white', fontWeight: 700 }}>{uni.name}</span>
              </div>
              
              <span style={{ display: 'inline-block', background: '#ef233c', color: 'white', padding: '4px 16px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '1rem' }}>{uni.type?.toUpperCase() || 'INSTITUTION'}</span>
              <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, margin: 0, lineHeight: 1.1, color: 'white' }}>{uni.name}</h1>
              <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginTop: '1rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <MapPin size={20} style={{ color: '#ef233c' }} /> {uni.location}
              </p>
              
              <button 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsModalOpen(true)}
                style={{ background: isHovered ? '#002060' : '#ef233c', color: 'white', border: 'none', padding: '1.2rem 2.5rem', borderRadius: '12px', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.3s ease', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
              >
                Quick Enquiry <ArrowRight size={20} />
              </button>
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
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem', color: 'white' }}>Contact Information</h3>
                
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

        {/* ===== Programs Offered Section ===== */}
        {programs.length > 0 && (
          <div style={{ padding: '0 20px 80px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#00122e', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ width: '8px', height: '40px', background: '#ef233c', borderRadius: '4px', flexShrink: 0 }} />
              Programs Offered
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
              {programs.map((prog: any) => {
                const uniInitials = uni?.name?.split(' ').map((w: string) => w[0]).slice(0, 2).join('') || 'U';
                return (
                  <Link
                    key={prog._id}
                    href={`/courses/${prog.slug || prog._id}`}
                    style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', borderRadius: '20px', overflow: 'hidden', background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', border: '1px solid #e2e8f0', transition: 'transform 0.2s, box-shadow 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.07)'; }}
                  >
                    {/* Orange image panel */}
                    <div style={{ position: 'relative', height: '160px', background: '#E8502A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 1rem 1rem 4.5rem', overflow: 'hidden' }}>
                      {/* decorative circles */}
                      <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '130px', height: '130px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                      <div style={{ position: 'absolute', bottom: '-20px', left: '20px', width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                      {/* course name */}
                      <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', textAlign: 'center', lineHeight: 1.2, zIndex: 1, textShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>{prog.name}</span>
                      {/* university logo corner */}
                      <div style={{ position: 'absolute', bottom: '12px', left: '12px', zIndex: 2, width: '52px', height: '52px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        {uni?.logo
                          ? <img src={uni.logo} alt={uni.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />
                          : <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#E8502A' }}>{uniInitials}</span>
                        }
                      </div>
                      {/* level badge */}
                      {prog.level && (
                        <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(20,8,3,0.72)', color: '#fff', padding: '4px 10px', borderRadius: '50px', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2px', textTransform: 'uppercase', whiteSpace: 'nowrap', maxWidth: 'calc(100% - 20px)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prog.level}</span>
                      )}
                    </div>
                    {/* card body */}
                    <div style={{ padding: '1.1rem 1.25rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {prog.duration && <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>⏱ {prog.duration}</span>}
                      {prog.fee && <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>₹{Number(prog.fee).toLocaleString('en-IN')} / year</span>}
                      <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#E8502A', fontWeight: 800, fontSize: '0.85rem' }}>
                          View Details <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </main>

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
