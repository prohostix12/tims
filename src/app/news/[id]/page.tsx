'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Calendar, 
  Tag, 
  Share2, 
  Clock, 
  ChevronRight,
  Loader2,
  Newspaper
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface NewsItem {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  category?: string;
  publishedAt: string;
}

export default function NewsDetailPage() {
  const { id } = useParams();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/admin/news/${id}`)
        .then((r) => r.json())
        .then((data) => {
          if (!data.error) setNews(data);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', background: '#f8fafc' }}>
        <Loader2 className="animate-spin" size={48} color="#2563eb" />
        <p style={{ color: '#64748b', fontWeight: 600 }}>Loading news article...</p>
      </div>
    );
  }

  if (!news) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '20px' }}>
        <h1 style={{ color: '#00122e' }}>Article Not Found</h1>
        <p style={{ color: '#64748b', marginBottom: '20px' }}>The news article you are looking for does not exist or has been removed.</p>
        <Link href="/news" style={{ padding: '12px 24px', background: '#2563eb', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 700 }}>Back to News</Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#ffffff', paddingBottom: '100px' }}>
        {/* Header Section */}
        <div style={{ background: '#f8fafc', paddingTop: '120px', paddingBottom: '60px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              <ChevronRight size={14} />
              <Link href="/news" style={{ color: 'inherit', textDecoration: 'none' }}>News</Link>
              <ChevronRight size={14} />
              <span style={{ color: '#2563eb', fontWeight: 700 }}>{news.category || 'General'}</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#00122e', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              {news.title}
            </h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', color: '#64748b', fontWeight: 600, fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} />
                {new Date(news.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Tag size={18} />
                {news.category || 'General'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} />
                {Math.ceil(news.content?.split(' ').length / 200 || 1)} min read
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
          {news.image && (
            <div style={{ position: 'relative', width: '100%', height: '500px', borderRadius: '24px', overflow: 'hidden', marginBottom: '60px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <Image 
                src={news.image} 
                alt={news.title} 
                fill 
                style={{ objectFit: 'cover' }} 
              />
            </div>
          )}

          <div 
            style={{ 
              fontSize: '1.2rem', 
              lineHeight: 1.8, 
              color: '#334155',
              whiteSpace: 'pre-wrap'
            }}
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          <div style={{ marginTop: '80px', padding: '40px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h4 style={{ margin: '0 0 8px', color: '#00122e' }}>Share this article</h4>
              <p style={{ margin: 0, color: '#64748b' }}>Spread the word with your academic network.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ width: '45px', height: '45px', borderRadius: '12px', border: 'none', background: '#00122e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Share2 size={20} /></button>
            </div>
          </div>

          <div style={{ marginTop: '60px', textAlign: 'center' }}>
            <Link href="/news" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#2563eb', fontWeight: 800, textDecoration: 'none', fontSize: '1.1rem' }}>
              <ArrowLeft size={20} /> Back to All News
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
