import Link from 'next/link';

export default function ExaminationPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', padding: '8rem 5%' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <span style={{ color: 'var(--accent)', fontWeight: 700, letterSpacing: '2px', fontSize: '0.8rem', textTransform: 'uppercase' }}>Academics</span>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--primary)', margin: '1rem 0 1.5rem', letterSpacing: '-0.5px' }}>Examination</h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: 1.7, marginBottom: '3rem' }}>
          Find examination schedules, hall ticket information, result announcements, and guidelines for your university programs. Reach out to our team for exam-related assistance.
        </p>
        <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent)', color: 'white', padding: '0.9rem 2.5rem', borderRadius: '6px', fontWeight: 700, textDecoration: 'none' }}>
          Get Exam Assistance
        </Link>
      </div>
    </main>
  );
}
