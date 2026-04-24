'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Edit, Globe, Mail, MapPin, Calendar, Award, CheckCircle, Shield, Building2 } from 'lucide-react';

export default function UniversityDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const [uni, setUni] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    const fetchUniversity = async () => {
      try {
        const res = await fetch(`/api/admin/universities/${id}`);
        if (!res.ok) throw new Error('Failed to load university details');
        const data = await res.json();
        setUni(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUniversity();
  }, [id]);

  if (loading) {
    return <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading details...</div>;
  }

  if (error || !uni) {
    return <div style={{ padding: '2rem', color: '#dc2626' }}>{error || 'University not found.'}</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', background: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/universities" style={{ padding: '0.5rem', background: '#e2e8f0', borderRadius: '50%', color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft size={20} />
          </Link>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0, color: '#0f172a' }}>University Details</h1>
        </div>
        <Link href={`/admin/universities/${id}/edit`} style={{ padding: '0.75rem 1.5rem', background: '#0f172a', color: '#fff', borderRadius: '8px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
          <Edit size={16} /> Edit
        </Link>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Basic Info Card */}
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {uni.logo ? (
              <img src={uni.logo} alt={`${uni.name} Logo`} style={{ width: '80px', height: '80px', objectFit: 'contain', background: '#f1f5f9', borderRadius: '12px', padding: '0.5rem' }} />
            ) : (
              <div style={{ width: '80px', height: '80px', background: '#f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>No Logo</div>
            )}
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem', color: '#0f172a' }}>{uni.name}</h2>
              <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: '#f1f5f9', color: '#475569', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600, border: '1px solid #e2e8f0' }}>Code: {uni.code}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#475569', fontSize: '0.95rem' }}>
              <MapPin size={18} color="#94a3b8" /> <span>{uni.location || 'Location not specified'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#475569', fontSize: '0.95rem' }}>
              <Building2 size={18} color="#94a3b8" /> <span style={{ textTransform: 'capitalize' }}>{uni.type || 'Private'} Institution</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#475569', fontSize: '0.95rem' }}>
              <Calendar size={18} color="#94a3b8" /> <span>Established: {uni.establishedYear || 'N/A'}</span>
            </div>
            {uni.website && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#475569', fontSize: '0.95rem' }}>
                <Globe size={18} color="#94a3b8" /> <a href={uni.website} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>{uni.website}</a>
              </div>
            )}
            {uni.contactEmail && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#475569', fontSize: '0.95rem' }}>
                <Mail size={18} color="#94a3b8" /> <a href={`mailto:${uni.contactEmail}`} style={{ color: '#2563eb', textDecoration: 'none' }}>{uni.contactEmail}</a>
              </div>
            )}
          </div>
          
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '0.75rem' }}>Status</h3>
            <span style={{ 
              display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600,
              background: uni.status === 'active' ? '#dcfce7' : uni.status === 'pending' ? '#fef9c3' : '#fee2e2',
              color: uni.status === 'active' ? '#16a34a' : uni.status === 'pending' ? '#a16207' : '#dc2626'
            }}>
              {uni.status.charAt(0).toUpperCase() + uni.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Detailed Info Card */}
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               Description
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6, margin: 0, fontSize: '0.95rem' }}>
              {uni.description || 'No description provided.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
             <div>
               <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <Award size={18} color="#2563eb" /> Ranking
               </h3>
               <p style={{ color: '#475569', margin: 0, fontSize: '0.95rem' }}>{uni.ranking || 'N/A'}</p>
             </div>
             <div>
               <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <Shield size={18} color="#16a34a" /> Accreditations
               </h3>
               <p style={{ color: '#475569', margin: 0, fontSize: '0.95rem' }}>{uni.accreditations || 'N/A'}</p>
             </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: 0 }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a', marginBottom: '1rem' }}>Features</h3>
              {uni.features && uni.features.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {uni.features.map((feature: string, idx: number) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#475569', fontSize: '0.95rem' }}>
                      <CheckCircle size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem' }}>None specified</p>
              )}
            </div>

            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a', marginBottom: '1rem' }}>Facilities</h3>
              {uni.facilities && uni.facilities.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {uni.facilities.map((facility: string, idx: number) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#475569', fontSize: '0.95rem' }}>
                      <CheckCircle size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{facility}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem' }}>None specified</p>
              )}
            </div>
          </div>

          {uni.image && (
            <div style={{ marginTop: '1rem' }}>
               <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a', marginBottom: '1rem' }}>Cover Image</h3>
               <img src={uni.image} alt="University Cover" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
