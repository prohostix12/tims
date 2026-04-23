'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './universities.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, GraduationCap } from 'lucide-react';

const universities = [
  {
    name: "Amrita Vishwa Vidyapeetham",
    location: "Coimbatore, India",
    description: "A multi-disciplinary, research-intensive university ranked among the best in India.",
    features: ["NAAC A++", "UGC Approved", "Global Research"],
    programs: ["UG", "PG", "UG/PG"],
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "University of Greenwich",
    location: "London, United Kingdom",
    description: "Renowned for its academic excellence and stunning historic campus in the heart of London.",
    features: ["TEF Silver", "International Faculty", "Business Leader"],
    programs: ["UG", "PG", "UG/PG"],
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Arizona State University",
    location: "Phoenix, USA",
    description: "Consistently ranked as the #1 university for innovation in the United States.",
    features: ["#1 in Innovation", "Large Alumni", "Tech Hub"],
    programs: ["UG", "PG", "UG/PG"],
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe1?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Monash University",
    location: "Melbourne, Australia",
    description: "A member of the Group of Eight, recognized for its global outlook and research impact.",
    features: ["Top 100 Global", "Group of Eight", "Career Ready"],
    programs: ["UG", "PG", "UG/PG"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "University of Toronto",
    location: "Toronto, Canada",
    description: "Canada's top-ranked university and a global leader in higher education and research.",
    features: ["Diverse Culture", "Research Powerhouse", "Top Ranked"],
    programs: ["UG", "PG", "UG/PG"],
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Technical University of Munich",
    location: "Munich, Germany",
    description: "One of Europe's top universities for engineering, technology, and applied sciences.",
    features: ["STEM Leader", "Partner of Industry", "Top Ranked"],
    programs: ["UG", "PG", "UG/PG"],
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Manipal Academy of Higher Education",
    location: "Manipal, India",
    description: "A pioneer in private higher education with a world-class campus and global partnerships.",
    features: ["Green Campus", "Top Medical", "NRI Favorite"],
    programs: ["UG", "PG", "UG/PG"],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Lovely Professional University",
    location: "Punjab, India",
    description: "India's largest private university offering diverse programs with strong placement records.",
    features: ["NAAC A+", "Largest Private", "Strong Placements"],
    programs: ["10th/+2", "UG", "PG", "UG/PG"],
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Swami Vivekanand Subharti University",
    location: "Meerut, India",
    description: "A UGC-recognized university offering distance and regular programs across disciplines.",
    features: ["UGC Approved", "Distance Learning", "Affordable"],
    programs: ["10th/+2", "UG", "PG", "UG/PG"],
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=600&auto=format&fit=crop"
  },
];

const filters = ['All', '10th/+2', 'UG', 'PG', 'UG/PG'];

export default function UniversitiesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visible, setVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === 'All'
    ? universities
    : universities.filter(u => u.programs.includes(activeFilter));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [activeFilter]);

  return (
    <main className={styles.container}>

      {/* ===== Hero ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Global Network</span>
          <h1 className={styles.heroTitle}>Our Partner Universities</h1>
          <p className={styles.heroSub}>
            Explore our worldwide network of accredited, reputed institutions — handpicked to match your academic and career goals.
          </p>
        </div>
      </section>

      {/* ===== Filter Bar ===== */}
      <section className={styles.filterBar}>
        <div className={styles.filterInner}>
          <span className={styles.filterLabel}><GraduationCap size={16} /> Filter by Program</span>
          <div className={styles.filterBtns}>
            {filters.map(f => (
              <button
                key={f}
                className={`${styles.filterBtn} ${activeFilter === f ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== University Grid ===== */}
      <section className={styles.gridSection}>
        <div className={styles.gridWrap} ref={gridRef}>
          {filtered.map((uni, i) => (
            <div
              key={uni.name}
              className={`${styles.card} ${visible ? styles.cardVisible : ''}`}
              style={{ '--ci': i } as React.CSSProperties}
            >
              <div className={styles.cardImg}>
                <Image
                  src={uni.image}
                  alt={uni.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <span className={styles.cardRegion}>{uni.programs[0]}</span>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardLocation}>
                  <MapPin size={13} /> {uni.location}
                </p>
                <h3 className={styles.cardName}>{uni.name}</h3>
                <p className={styles.cardDesc}>{uni.description}</p>
                <div className={styles.cardTags}>
                  {uni.features.map((f, fi) => (
                    <span key={fi} className={styles.cardTag}>{f}</span>
                  ))}
                </div>
                <Link href="/contact" className={styles.cardBtn}>
                  Enquire Now <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Can't find the right university?</h2>
          <p className={styles.ctaSub}>Our counselors will match you with the perfect institution based on your profile, budget, and career goals.</p>
          <Link href="/contact" className={styles.ctaBtn}>
            Get Free Counseling <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </main>
  );
}
