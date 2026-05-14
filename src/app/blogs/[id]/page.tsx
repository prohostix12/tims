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
  BookOpen,
  User
} from 'lucide-react';

interface BlogItem {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  category?: string;
  author?: string;
  readTime?: string;
  publishedAt: string;
}

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const title = blog?.title || 'TIMS Blog';
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (_) {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  useEffect(() => {
    if (id) {
      fetch(`/api/admin/blogs/${id}`)
        .then((r) => r.json())
        .then((data) => {
          if (!data.error) setBlog(data);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', background: '#F0E6CE' }}>
        <Loader2 className="animate-spin" size={48} color="#ef233c" />
        <p style={{ color: '#64748b', fontWeight: 600 }}>Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F0E6CE', padding: '20px' }}>
        <h1 style={{ color: '#00122e' }}>Article Not Found</h1>
        <p style={{ color: '#64748b', marginBottom: '20px' }}>The article you are looking for does not exist or has been removed.</p>
        <Link href="/blogs" style={{ padding: '12px 24px', background: '#ef233c', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 700 }}>Back to Blog</Link>
      </div>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: '#F0E6CE', paddingBottom: '100px' }}>
      {/* Header Section */}
      <div style={{ background: '#F0E6CE', paddingTop: '120px', paddingBottom: '60px', borderBottom: '1px solid rgba(232, 80, 42, 0.1)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <Link href="/blogs" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link>
            <ChevronRight size={14} />
            <span style={{ color: '#ef233c', fontWeight: 700 }}>{blog.category || 'Education'}</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, color: '#00122e', lineHeight: 1.1, marginBottom: '2rem' }}>
            {blog.title}
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', color: '#475569', fontWeight: 700, fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#00122e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>{blog.author?.charAt(0) || 'A'}</div>
              {blog.author || 'TIMS Admin'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} style={{ color: '#ef233c' }} />
              {new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} style={{ color: '#ef233c' }} />
              {blog.readTime || '5 min read'}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
        {blog.image && (
          <div style={{ position: 'relative', width: '100%', height: '520px', borderRadius: '32px', overflow: 'hidden', marginBottom: '60px', boxShadow: '0 30px 60px rgba(0,0,0,0.12)' }}>
            <Image 
              src={blog.image} 
              alt={blog.title} 
              fill 
              style={{ objectFit: 'cover' }} 
            />
          </div>
        )}

        <div 
          style={{ 
            fontSize: '1.25rem', 
            lineHeight: 1.9, 
            color: '#1e293b',
            whiteSpace: 'pre-wrap'
          }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div style={{ marginTop: '80px', padding: '48px', background: '#F0E6CE', borderRadius: '32px', border: '1px solid rgba(28, 13, 7, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
             <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#00122e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800 }}>{blog.author?.charAt(0) || 'A'}</div>
             <div>
                <h4 style={{ margin: '0 0 4px', color: '#00122e', fontSize: '1.2rem', fontWeight: 800 }}>{blog.author || 'TIMS Admin'}</h4>
                <p style={{ margin: 0, color: '#64748b', fontWeight: 600 }}>Academic Counselor & Contributor</p>
             </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleShare}
              style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', background: '#00122e', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 700, transition: 'background 0.2s' }}
            >
              <Share2 size={18} /> {copied ? 'Link Copied! ✓' : 'Share Article'}
            </button>
          </div>
        </div>

        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <Link href="/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#ef233c', fontWeight: 900, textDecoration: 'none', fontSize: '1.2rem' }}>
            <ArrowLeft size={24} /> Back to All Articles
          </Link>
        </div>
      </div>
    </main>
  );
}
