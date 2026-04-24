'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogPostPage() {
  const params = useParams();
  const id = params.id as string;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/blogs/${id}`);
        if (!res.ok) throw new Error('Article not found');
        const data = await res.json();
        setPost(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#f8fafc', padding: '120px 20px 60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link href="/about/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#64748b', textDecoration: 'none', marginBottom: '2rem', fontWeight: 600, transition: 'color 0.2s' }}>
            <ArrowLeft size={18} /> Back to Blog
          </Link>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>Loading article...</div>
          ) : error || !post ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#dc2626', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h2>{error || 'Blog post not found'}</h2>
            </div>
          ) : (
            <article style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              
              <div style={{ width: '100%', maxHeight: '450px', overflow: 'hidden', position: 'relative' }}>
                <img src={post.image || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div style={{ padding: 'clamp(2rem, 5vw, 4rem)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#eff6ff', color: '#2563eb', padding: '4px 12px', borderRadius: '50px' }}>
                    <Tag size={14} /> {post.category}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} /> {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} /> {post.readTime || '5 min read'}
                  </span>
                </div>

                <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, margin: '0 0 1.5rem' }}>
                  {post.title}
                </h1>

                <div style={{ 
                  fontSize: '1.1rem', 
                  lineHeight: 1.8, 
                  color: '#334155',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}>
                  {/* The excerpt is shown first as an intro paragraph */}
                  <p style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 500, fontStyle: 'italic', borderLeft: '4px solid #ef233c', paddingLeft: '1rem' }}>
                    {post.excerpt}
                  </p>
                  
                  {/* Render the full HTML content */}
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
              </div>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
