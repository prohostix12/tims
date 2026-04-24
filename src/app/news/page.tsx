'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  ArrowRight,
  Calendar,
  Tag,
  Newspaper,
  Loader2,
  Clock,
  ChevronRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface NewsItem {
  _id: string;
  title: string;
  excerpt: string;
  image?: string;
  category?: string;
  publishedAt: string;
  status: string;
}

export default function AllNewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/news')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNewsItems(data.filter((n) => n.status === 'published'));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#ffffff' }}>
        {/* Cinematic Full-Screen Hero Section */}
        <section style={{ 
          background: '#ffffff', 
          minHeight: '40vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          textAlign: 'center',
          color: '#1a1a1a',
          overflow: 'hidden',
          borderBottom: '1px solid #e5e7eb',
          paddingTop: '100px',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.9rem', color: '#4b5563', marginBottom: '1.5rem', fontWeight: 600 }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              <ChevronRight size={14} />
              <span style={{ color: '#1a1a1a' }}>News</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 800, color: '#1a1a1a', margin: 0, letterSpacing: '-1.5px', lineHeight: 1.1 }}>Latest News & <br/> Announcements</h1>
            <p style={{ color: '#4b5563', fontSize: '1.1rem', marginTop: '1.5rem', maxWidth: '800px', margin: '1.5rem auto 0', lineHeight: 1.6, fontWeight: 400 }}>Stay connected with the pulse of TIMS — from academic breakthroughs to institutional updates.</p>
          </div>
        </section>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px' }}>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '8rem 0', color: '#64748b' }}>
               <Loader2 className="animate-spin" size={48} color="#2563eb" style={{ marginBottom: '1rem' }} />
               <p style={{ fontWeight: 600 }}>Fetching latest updates...</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
              {newsItems.length > 0 ? newsItems.map((item, i) => (
                <div key={item._id} style={{ background: 'white', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', transition: 'all 0.3s ease' }}>
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <Image
                      src={item.image || '/images/news-hero-bg.png'}
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    {item.category && (
                      <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(0,18,46,0.85)', backdropFilter: 'blur(4px)', color: 'white', padding: '4px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.5px' }}>{item.category.toUpperCase()}</span>
                    )}
                  </div>
                  <div style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                       <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> {new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.3, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</h3>
                    <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.excerpt}</p>
                    
                    <Link href={`/news/${item._id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#ef233c', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.2s ease' }}>
                      Read Story <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              )) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '6rem 2rem', background: '#fff', borderRadius: '32px', border: '1px dashed #cbd5e1' }}>
                   <Newspaper size={48} style={{ color: '#cbd5e1', marginBottom: '1.5rem' }} />
                   <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#00122e', margin: '0 0 0.5rem' }}>No News Articles Yet</h3>
                   <p style={{ color: '#64748b' }}>Our team is working on new updates. Please check back later.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
