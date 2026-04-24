'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  ArrowRight,
  Calendar,
  User,
  BookOpen,
  Clock,
  PenTool
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface BlogItem {
  _id: string;
  title: string;
  excerpt: string;
  image?: string;
  category?: string;
  author?: string;
  readTime?: string;
  publishedAt: string;
  status: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/blogs')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogs(data.filter((b) => b.status === 'published'));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#ffffff' }}>
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
            <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 800, color: '#1a1a1a', margin: 0, letterSpacing: '-1.5px', lineHeight: 1.1 }}>TIMS Educational <br/> Blog</h1>
            <p style={{ color: '#4b5563', fontSize: '1.1rem', marginTop: '1.5rem', maxWidth: '800px', margin: '1.5rem auto 0', lineHeight: 1.6, fontWeight: 400 }}>Expert guidance, career advice, and academic insights to help you navigate your journey with clarity.</p>
          </div>
        </section>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px' }}>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem', color: '#64748b' }}>
               <PenTool size={48} className="animate-pulse" style={{ opacity: 0.2, marginBottom: '1rem' }} />
               <p style={{ fontWeight: 600 }}>Curating our latest articles...</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2rem' }}>
              {blogs.length > 0 ? blogs.map((item, i) => (
                <div key={item._id} style={{ background: 'white', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', transition: 'all 0.3s ease' }}>
                  <div style={{ position: 'relative', height: '240px' }}>
                    <Image
                      src={item.image || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop'}
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    {item.category && (
                      <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#ef233c', color: 'white', padding: '4px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800 }}>{item.category.toUpperCase()}</span>
                    )}
                  </div>
                  <div style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', gap: '15px', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem' }}>
                       <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={14} /> {new Date(item.publishedAt).toLocaleDateString()}</span>
                       <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={14} /> {item.readTime || '5 min'}</span>
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.3, marginBottom: '1rem' }}>{item.title}</h3>
                    <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>{item.excerpt}</p>
                    
                    <Link href={`/blogs/${item._id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#ef233c', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
                      Read Post <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              )) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem', background: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                   <p style={{ color: '#64748b' }}>Our academic team is currently preparing new articles. Check back soon!</p>
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
