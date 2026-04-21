import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      {/* ===== Hero Section ===== */}
      <div className={styles.heroWrapper}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroSection}>
          <h1 className={styles.title}>
            {[
              "Your", "Way", "to", "Success", "Begins", "With", "Us"
            ].map((word, i) => (
              <span key={i} className={styles.wordWrapper}>
                <span 
                  className={`${styles.word} ${["Way", "to", "Success"].includes(word) ? styles.redText : ''}`} 
                  style={{ animationDelay: `${0.2 + (i * 0.1)}s` }}
                >
                  {word}{" "}
                </span>
              </span>
            ))}
          </h1>
          <p className={`${styles.subtitle} ${styles.premiumFadeUp}`} style={{ animationDelay: '1.2s' }}>
            Discover top programs and personalized pathways to elevate your career. 
            Unlock a brighter future and achieve your dreams today with TIMS.
          </p>

          <div className={`${styles.ctaGroup} ${styles.premiumFadeUp}`} style={{ animationDelay: '1.4s' }}>
            <Link href="/courses" className={styles.primaryBtn}>
              Browse Courses
            </Link>
            <Link href="/universities" className={styles.secondaryBtn}>
              View Universities
            </Link>
          </div>
        </div>
      </div>

      {/* ===== Service Cards Section ===== */}
      <div className={styles.serviceCardsWrapper}>
        <div className={styles.serviceGrid}>
          {[
            { 
              title: "Online Degree", 
              icon: <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M12 3L1 9l11 6 9.22-5.03V18h2V9L12 3zm.45 10.49l-8.45-4.61 8-4.36 8 4.36-7.55 4.61zM4.1 12.04l1.32.72 6.58 3.59 6.58-3.59 1.32-.72V15l-1.32.72-6.58 3.59-6.58-3.59-1.32-.72v-2.96z"/></svg> 
            },
            { 
              title: "UG / PG", 
              icon: <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M12 2L1 7l11 5 11-5-11-5zM2 7l10 4.5L22 7l-10-4.5L2 7zm10 8.5c-2.33 0-4.4-.81-6-2.12V18c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-4.62c-1.6 1.31-3.67 2.12-6 2.12z"/></svg> 
            },
            { 
              title: "SSLC/PLUS TWO", 
              icon: <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm5 14.09l-5 2.73-5-2.73v-4.73L12 15l5-2.73v4.82zM12 13l-8-4.36 8-4.37 8 4.37L12 13z"/></svg> 
            },
            { 
              title: "Diploma", 
              icon: <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M12 2 1 7l11 5 11-5L12 2Zm0 2.22 7.74 3.52L12 11.27 4.26 7.74 12 4.22ZM12 14c-2.33 0-4.4-.81-6-2.12V16.5c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-4.62c-1.6 1.31-3.67 2.12-6 2.12Z"/></svg> 
            },
            { 
              title: "Credit Transfer", 
              icon: <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm1-5C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg> 
            }
          ].map((service, idx) => (
            <div 
              key={idx} 
              className={styles.serviceCard} 
              style={{ animationDelay: `${2.0 + (idx * 0.15)}s` }}
            >
              <div className={styles.serviceIcon}>{service.icon}</div>
              <div className={styles.serviceText}>{service.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== About / Get to Know Us Section ===== */}
      <div className={styles.aboutGridWrapper}>
        <div className={styles.aboutContent}>
          <div className={`${styles.badgeSmall} ${styles.premiumFadeUp}`}>
            Get to know us
          </div>
          <h2 className={`${styles.aboutTitle} ${styles.premiumFadeUp}`} style={{ animationDelay: '0.2s' }}>
            Learning <span className={styles.redText}>Anytime, Anywhere</span> for Success
          </h2>
          <p className={`${styles.aboutDescription} ${styles.premiumFadeUp}`} style={{ animationDelay: '0.4s' }}>
            Providing accessible, high-quality education and guidance, Tirur Institute of Management Studies fosters academic excellence, professional growth, and societal impact for every learner.
          </p>
          
          <ul className={styles.aboutList}>
            <li className={styles.premiumFadeUp} style={{ animationDelay: '0.5s' }}>
              <div className={styles.listIcon}>✓</div>
              Accredited Attestation and Certification Services
            </li>
            <li className={styles.premiumFadeUp} style={{ animationDelay: '0.6s' }}>
              <div className={styles.listIcon}>✓</div>
              Flexible Online and Credit Transfer Options
            </li>
            <li className={styles.premiumFadeUp} style={{ animationDelay: '0.7s' }}>
              <div className={styles.listIcon}>✓</div>
              Comprehensive Course and Degree Programs
            </li>
          </ul>
        </div>
        
        <div className={`${styles.aboutImageContainer} ${styles.premiumFadeUp}`} style={{ animationDelay: '0.9s' }}>
           <div className={styles.aboutImgGlow}></div>
           <div className={styles.imageFrame}>
              <img 
                src="https://timseducation.com/wp-content/uploads/2026/01/503763549_1160511306089086_2462340164066734349_n.jpg" 
                alt="TIMS Education - Learning Excellence" 
                className={styles.aboutMainImg}
              />
           </div>
        </div>
      </div>

      {/* ===== Dream Section (Core Services) ===== */}
      <div className={styles.dreamSection}>
        <div className={styles.dreamHeader}>
          <h2 className={styles.dreamTitle}>Make Your Dream Come True!</h2>
          <p className={styles.dreamSubtitle}>Provide better education to the society in an affordable cost</p>
        </div>
        
        <div className={styles.dreamGrid}>
          <div className={`${styles.dreamCard} ${styles.redCard} ${styles.animateDreamCard}`} style={{ animationDelay: '0.1s' }}>
            <h3>Embassy Attestation</h3>
            <p>Attest your educational and non-educational documents.</p>
          </div>
          
          <div className={`${styles.dreamCard} ${styles.navyCard} ${styles.animateDreamCard}`} style={{ animationDelay: '0.3s' }}>
            <h3>Online Studies</h3>
            <p>Assistance for Admission in Best Institutes of India and Abroad.</p>
          </div>
          
          <div className={`${styles.dreamCard} ${styles.redCard} ${styles.animateDreamCard}`} style={{ animationDelay: '0.5s' }}>
            <h3>Distance Education</h3>
            <p>We provide educational services to students all across World.</p>
          </div>
        </div>
      </div>

      {/* ===== Deep Dive Section ===== */}
      <div className={styles.deepDiveWrapper}>
        <div className={styles.deepDiveInner}>
          {/* Centered heading at top */}
          <h2 className={styles.deepDiveTitle}>
            Best Distance Education Centre in Kerala – Building Futures with <span className={styles.redText}>Flexible Learning</span>
          </h2>

          {/* Two-column: image left, text right */}
          <div className={styles.deepDiveGrid}>
            <div className={styles.deepDiveImgCol}>
              <img
                src="/images/student-white-v2.png"
                alt="Successful TIMS Student"
                className={styles.deepDiveImg}
              />
            </div>

            <div className={styles.deepDiveTextCol}>
              <p className={styles.deepDiveText}>
                TIMS Education has grown by helping students and working professionals complete their studies without disturbing their daily routine. Over the years, many learners have trusted us because they feel comfortable learning at their own pace with the right guidance beside them. That's one of the reasons people often call us the <strong>best distance education centre in Kerala</strong>.
              </p>
              <p className={styles.deepDiveText}>
                We focus on simple admission procedures, clear support, and courses that genuinely help in building a career. We try to make the process as easy as possible for people who want to finish a degree they dropped years ago or get a better job by getting a higher level of education. Many who studied with us say they chose TIMS because it felt like the <strong>best distance education centre in Kerala</strong> for their needs.
              </p>
              <p className={styles.deepDiveText}>
                With experienced mentors and reliable university tie-ups, we continue to be the <strong>best distance education centre in Kerala</strong> for learners who want steady progress. If you're planning your next step, you'll understand why so many consider us the best distance education centre in Kerala.
              </p>
            </div>
          </div>
        </div>
      </div>


    </main>
  );
}
