
'use client';

import styles from './about.module.css';
import Link from 'next/link';

export default function About() {
  return (
    <main className={styles.container}>

      {/* ===== Cinematic About Hero Section ===== */}
      <section className={styles.heroHeader}>
        <div className={styles.heroContent}>
          <p className={styles.heroCrumb}>
            <Link href="/">Home</Link> / About
          </p>
          <span className={styles.heroTag}>Discover TIMS</span>
          <h1 className={styles.heroTitle}>
            <span style={{ color: '#ef233c' }}>About</span> Us
          </h1>
          <p className={styles.heroSub}>Empowering learners through flexible, high-quality, and accessible education since 2009.</p>
        </div>
      </section>

      {/* ===== About Content Section ===== */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutGrid}>
          <div className={`${styles.aboutTextContent} ${styles.slideInLeft}`}>
            <span className={styles.badge}>Get to know us</span>
            <h2 className={styles.sectionHeading}>Welcome to <span className={styles.redText}>TIMS Education</span></h2>
            <p className={styles.bodyText}>
              Founded in 2009, Tirur Institute of Management Studies (TIMS) is dedicated to providing high-quality education that's accessible to all segments of society. Our institution believes that every individual deserves the chance to pursue academic and career excellence, regardless of financial background. To support this vision, we offer scholarships for financially disadvantaged and high-achieving students, ensuring that cost is not a barrier to quality education.
            </p>
            <p className={styles.bodyText}>
              TIMS focuses on personalized guidance and counseling, helping students navigate their academic paths with clarity and confidence. Our programs aim to cultivate skilled professionals, blending theoretical knowledge with practical application, preparing students to meet the challenges of the modern world.
            </p>
            <p className={styles.bodyText}>
              Our faculty and staff are deeply committed to nurturing each student's potential, fostering an environment that promotes lifelong learning, integrity, and professionalism. At TIMS, we empower students not only to excel academically but also to make meaningful contributions to society.
            </p>
          </div>

          <div className={`${styles.aboutImageContainer} ${styles.slideInRight}`} style={{ animationDelay: '0.2s' }}>
            <div className={styles.aboutImgGlow} />
            <img
              src="/images/about-students.png"
              alt="TIMS students collaborating in a modern learning environment"
              className={styles.aboutImg}
            />
          </div>
        </div>
      </section>

      {/* ===== Stats Counter Section ===== */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {[
            { number: "15+", label: "Years of Excellence" },
            { number: "25+", label: "University Partners" },
            { number: "98%", label: "Success Rate" },
            { number: "100%", label: "Recognized Degrees" },
          ].map((stat, idx) => (
            <div key={idx} className={`${styles.statCard} ${styles.zoomIn}`} style={{ animationDelay: `${0.1 + idx * 0.15}s` }}>
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Mission & Vision Section (Spiral Book Layout) ===== */}
      <section className={styles.missionSection}>
        <div className={`${styles.missionBookContainer} ${styles.fadeInUp}`}>
          <div className={styles.missionBook}>
            <div className={styles.bookSpine}></div>
            
            {/* Left Page - Mission */}
            <div className={`${styles.bookPage} ${styles.pageLeft}`}>
              <div className={styles.pageContent}>
                <div className={styles.missionIcon}>
                  <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <h3 className={styles.missionTitle}>Our Mission</h3>
                <p className={styles.missionText}>
                  To provide affordable, flexible, and high-quality education to learners across all backgrounds. We aim to bridge the gap between aspiration and achievement by offering personalized academic guidance, robust university partnerships, and career-focused programs that prepare students for a global workforce.
                </p>
                <div className={styles.pageMarker}>1</div>
              </div>
            </div>

            {/* Right Page - Vision */}
            <div className={`${styles.bookPage} ${styles.pageRight}`}>
              <div className={styles.pageContent}>
                <div className={styles.missionIcon}>
                  <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className={styles.missionTitle}>Our Vision</h3>
                <p className={styles.missionText}>
                  To become the most trusted and accessible distance education centre in India, empowering every learner — regardless of location, age, or financial status — to unlock their full academic and professional potential. We envision a future where quality education knows no boundaries.
                </p>
                <div className={styles.pageMarker}>2</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Testimonials Section ===== */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsHeader}>
          <span className={styles.badge} style={{ color: 'var(--accent)', background: 'rgba(217,4,41,0.05)' }}>Success Stories</span>
          <h2 className={styles.sectionHeading}>What our <span className={styles.redText}>Students say</span></h2>
          <p className={styles.bodyText} style={{ textAlign: 'center', margin: '1rem auto 1.5rem' }}>
            Empowering thousands of learners across Kerala to achieve their professional dreams through flexible education.
          </p>
          <a href="https://admin.trustindex.io/api/googleWriteReview?place-id=ChIJ42gGBe6xpzsRfUBsYiL8KeQ" target="_blank" rel="noopener noreferrer" className={styles.writeReviewBtn}>
            Write a Review on Google
          </a>
        </div>

        <div className={styles.testimonialsScrollWrapper}>
          <div className={styles.testimonialsContainer}>
            <div style={{ width: '100%', textAlign: 'center', padding: '4rem', background: 'rgba(255,255,255,0.5)', borderRadius: '24px', border: '1px dashed #cbd5e1' }}>
               <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Success stories from our graduates will be featured here soon.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Our Directors Section ===== */}
      <section className={styles.directorsSection}>
        <div className={styles.directorsWrapper}>
          <div className={styles.directorsHeader}>
            <span className={styles.badge} style={{ color: 'var(--accent)', background: 'rgba(217,4,41,0.05)' }}>Leadership</span>
            <h2 className={styles.sectionHeading}>Meet Our <span className={styles.redText}>Directors</span></h2>
            <p className={styles.bodyText} style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
              The visionary leaders who built TIMS Education from the ground up — committed to making quality education accessible to all.
            </p>
          </div>

          <div className={styles.directorsGrid}>
            {[
              {
                name: "Adv. ShoukathAli Pootheri",
                role: "Founder & Director",
                img: "/images/Adv-ShoukathAli-pootheri.jpg",
                bio: "A visionary legal professional and educator, Adv. ShoukathAli Pootheri founded TIMS Education in 2009 with a bold mission — to make higher education accessible to every segment of society in Kerala.",
                accentDelay: "0s"
              },
              {
                name: "Nabeel CM",
                role: "Managing Director",
                img: "/images/Nabeel-cm.jpg",
                bio: "Driving the day-to-day operations and strategic growth of TIMS Education, Nabeel CM brings exceptional leadership in institutional management and student success initiatives.",
                accentDelay: "0.15s"
              },
              {
                name: "Mohamed Shameem",
                role: "CEO & Director",
                img: "/images/Mohamed-shameem.jpg",
                bio: "As CEO, Mohamed Shameem leads TIMS Education's expansion and innovation efforts, forging partnerships with renowned universities to deliver career-focused programs across Kerala.",
                accentDelay: "0.3s"
              },
            ].map((director, idx) => (
              <div key={idx} className={`${styles.directorCard} ${styles.fadeInUp}`} style={{ animationDelay: director.accentDelay }}>
                <div className={styles.directorAvatarWrap}>
                  <div className={styles.directorAvatar}>
                    <img src={director.img} alt={director.name} className={styles.directorPhoto} />
                  </div>
                  <div className={styles.directorAvatarRing} />
                </div>
                <div className={styles.directorInfo}>
                  <h3 className={styles.directorName}>{director.name}</h3>
                  <span className={styles.directorRole}>{director.role}</span>
                  <div className={styles.directorDivider} />
                  <p className={styles.directorBio}>{director.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Trusted Partner Section ===== */}
      <section className={styles.trustedPartnerSection}>
        <div className={styles.trustedPartnerWrapper}>
          <h2 className={`${styles.trustedPartnerTitle} ${styles.fadeInUp}`}>
            Your Trusted Partner for Management Studies in Kerala
          </h2>
          
          <div className={styles.trustedPartnerGrid}>
            <div className={`${styles.trustedImageCol} ${styles.slideInLeft}`} style={{ animationDelay: '0.1s' }}>
              <img 
                src="/images/trusted-partner.png" 
                alt="Student smiling" 
                className={styles.trustedImage}
              />
            </div>
            
            <div className={`${styles.trustedTextCol} ${styles.slideInRight}`} style={{ animationDelay: '0.2s' }}>
              <p className={styles.trustedText}>
                TIMS Education was started with a simple idea — learning should not stop because of work, family, or time limits. Our focus on <strong>management studies in Kerala</strong> grew naturally as more learners looked for practical, career-focused programs that fit into their daily lives.
              </p>
              <p className={styles.trustedText}>
                We try to keep things straightforward: honest guidance, clear communication, and support that actually helps. Many students join because they feel understood here. We work closely with recognised universities so anyone can move forward with confidence.
              </p>
              <p className={styles.trustedText}>
                At TIMS Education, we continue to help learners shape better careers and brighter futures. You'll find a steady and supportive place to begin your journey with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ Section ===== */}
      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <h2 className={`${styles.sectionHeading} ${styles.fadeInUp}`}>Frequently asked questions</h2>
        </div>

        <div className={styles.faqGrid}>
          <div className={`${styles.faqImageContainer} ${styles.slideInLeft}`} style={{ animationDelay: '0.2s' }}>
            <img 
              src="/images/faq-support.png" 
              alt="Support advisor" 
              className={styles.faqImage}
            />
          </div>

          <div className={`${styles.faqAccordion} ${styles.slideInRight}`} style={{ animationDelay: '0.3s' }}>
            <details className={styles.faqItem} open>
              <summary className={styles.faqQuestion}>
                <span>What is TIMS Education?</span>
                <span className={styles.faqIcon}></span>
              </summary>
              <div className={styles.faqAnswer}>
                TIMS Education (Tirur Institute of Management Studies) is a distance and online education centre in Kerala focused on providing flexible, accessible academic programs—from SSLC/Plus Two to UG, PG, Diploma, and professional certifications. It also offers guidance for credit transfer and attestation services.
              </div>
            </details>

            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span>Do you help with university affiliations and recognised degrees?</span>
                <span className={styles.faqIcon}></span>
              </summary>
              <div className={styles.faqAnswer}>
                Yes. TIMS Education partners with recognised universities (like Aligarh Muslim University, Andhra University, Guru Kashi University and more) to guide students through programme selection and admission.
              </div>
            </details>

            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span>How does distance education work here?</span>
                <span className={styles.faqIcon}></span>
              </summary>
              <div className={styles.faqAnswer}>
                Distance education lets you study remotely without attending a physical classroom. You get access to study materials, academic support, and guidance while balancing work or personal responsibilities.
              </div>
            </details>

            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span>Are your degrees recognized and valid for employment?</span>
                <span className={styles.faqIcon}></span>
              </summary>
              <div className={styles.faqAnswer}>
                Degrees are valid and recognized if they’re completed from accredited universities partnered with TIMS Education. Recognition depends on the specific university or board.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Start Your Journey?</h2>
          <div className={styles.ctaButtons}>
            <Link href="/courses" className={styles.ctaPrimary}>Explore Courses</Link>
            <Link href="#" className={styles.ctaSecondary}>Contact Us</Link>
          </div>
        </div>
      </section>

    </main>
  );
}
