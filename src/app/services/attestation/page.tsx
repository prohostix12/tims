
'use client';

import React from 'react';
import styles from './attestation.module.css';
import Link from 'next/link';

export default function AttestationPage() {
  const steps = [
    { title: "Document Submission", description: "Submit your original documents and required copies to our authorized TIMS centers." },
    { title: "Verification", description: "Our experts primary verify the documents and initiate the authentication process." },
    { title: "HRD/MEA Attestation", description: "We manage the formal attestation from the State HRD and Ministry of External Affairs." },
    { title: "Embassy Legalization", description: "Final legalization from the respective Embassy/Consulate for your destination country." }
  ];
  const [isListExpanded, setIsListExpanded] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const allCerts = [
    "10th Attestation", "AMIE Attestation", "Apprentice ship Attestation",
    "B.Com Attestation", "B.Ed Attestation", "B.Sc Nursing Attestation",
    "B.Tech Attestation", "BA Attestation", "BBA Attestation",
    "BCA Attestation", "BDS Attestation", "BE Attestation",
    "Birth Attestation", "Bonafied Attestation", "B.Sc Attestation",
    "CA Attestation", "CBSE Attestation", "Computer Diploma Attestation",
    "Course and Conduct Attestation", "Course Completion Attestation",
    "Death Attestation", "Divorce Attestation", "Engineering Diploma Attestation",
    "Foreign Attestation", "Heirship Attestation", "High School Attestation",
    "House Surgeon Attestation", "HSE Attestation", "Intermediate Attestation",
    "Internship Attestation", "ITI Attestation", "M.Tech Attestation",
    "M.Com Attestation", "M.Ed Attestation", "M.Sc Attestation",
    "M.Sc Nursing Attestation", "MA Attestation", "Marriage Attestation",
    "MBA Attestation", "MBBS Attestation", "MCA Attestation",
    "ME Attestation", "Medical Attestation", "Metric Attestation",
    "Migration Attestation", "MS Attestation", "NTC Attestation",
    "Nursing Diploma Attestation", "PCC Attestation", "PDC Attestation",
    "Plus Two Attestation", "Powerof Attorney Attestation", "Private Diploma Attestation",
    "PUC Attestation", "SSC Attestation", "SSLC Attestation",
    "Technicians Attestation", "Training Attestation", "Transfer Attestation",
    "Translated Attestation", "TTC Attestation", "VHSE Attestation"
  ].sort();

  const displayedCerts = isListExpanded ? allCerts : allCerts.slice(0, 12);

  return (
    <main className={styles.container}>
      {/* ===== Cinematic Attestation Hero Section ===== */}
      <section className={styles.heroHeader}>
        <img 
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000&auto=format&fit=crop" 
          alt="Certificate Attestation" 
          className={`${styles.heroBgImage} ${styles.parallaxImage}`}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroSubtitle}>Professional Legalization & Authentication</p>
          <h1 className={`${styles.heroTitle} ${styles.revealText}`}>Attestation</h1>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.serviceIntro}>
          <div className={`${styles.textCol} ${styles.textSideEntry}`}>
            <h2 className={`${styles.sectionTitle} ${styles.revealText}`} style={{ color: '#00122e', fontSize: '2.4rem', fontWeight: 800, marginBottom: '2.5rem' }}>
              ATTESTATIONS SERVICES
            </h2>
            
            <p className={styles.descriptionText}>
              If you are planning to go abroad for higher education, employment, business or migration we can take care of your certificate attestation formalities
            </p>

            <p className={styles.descriptionText}>
              We provide attestation services for Bahrain, Kuwait, Oman, Qatar, and United Arab Emirates (UAE) from various departments like Notary, GAD, State Home Ministry, SDM, Human Resource Development Department(HRD), Ministry of External Affairs (MEA), Embassy and Consulate for all kind of attestation requirements like business visit visa, employment visa or family visit visa or family resident visa, Driving License, etc…….
            </p>

            {isExpanded && (
              <p className={styles.descriptionText}>
                HRD, MEA, Embassy, Consulate, GAD, RAC, Notary, Home Ministry, SDM, Foreign Ministry, Secretariat, Mantralaya, External Affairs, MOFA, Indian Embassy, Education Ministry, Health Ministry, Ministry of Justice, Chamber of Commerce, University / Collage/ School/Institute Attestation from India, HRD/MEA from Abroad, Notary/Home Ministry/Education Ministry/Health Ministry from Abroad, Embassy/Consulate from Abroad, Chamber of Commerce/Ministry of Justice/Foreign Ministry/MOFA from Abroad, University/School/Collage/Institute Attestation from Abroad, Magistrate’s/Commissioner’s/Resident Commissioner’s Attestation from India, State Notary/Local Notary Attestation from India, Education Officer’s/ Assistant Education Officer’s Attestation from India, Board/Technical Board /Council/CBSE Board Attestation from India, Head Master’s/Head Mistress’s/Principal’s Attestation from India, Home Department/General Administration Department/Human Resource Development Department/:Higher Education Department/District Education Department/Office of the Commissioner – Higher Education/Education Administrator’s Office ‘s Attestation, Government of GOA/ Directorate of Technical Education/Education Department of SACHIVALAYA/ Government of Gujarat’s/ Higher Education Commissioner’s Office’s Attestation, Director Higher Education Office/Director of Public Instruction’s/Board of School Education/State Board of School Education’s Attestation. Passport and Foreigners Department’s Attestation, VIDHANA SOUDHA / Regional Authentication office/Government of MEGHALAYA / Government of MIZORAM Attestation, Higher & Technical Education Department/Secretary Assistant to Special Secretary’s Attestation. Government of ORISSA/ Government of Puducherry Attestation. Department of Non- Resident Indian Affair’s Attestation, Government of Punjab’s Attestation, Mini Secretariat – CHANDIGARH Punjab’s Attestation, Government Secretariat’s Attestation. Joint Directors (Examination) offices/Deputy Directors (Examination) Offices Attestation, Government Public (Foreigners)Department’s Attestation, Government of TAMILNADU Attestation. Government of Uttar Pradesh ‘s Attestation, Home (Foreigner & NRI) Attestation , Immunization Certificate/Vaccination Certificate/Health Certificate Attestation for pet animals etc.
              </p>
            )}

            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ 
                alignSelf: 'flex-start',
                backgroundColor: 'transparent',
                color: 'var(--accent)',
                border: 'none',
                fontWeight: 800,
                cursor: 'pointer',
                padding: '0.5rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.95rem'
              }}
            >
              {isExpanded ? 'READ LESS ↑' : 'READ MORE ↓'}
            </button>
          </div>

          <div className={`${styles.imageCol} ${styles.floating} ${styles.imageSideEntry}`}>
             <img 
               src="/images/attestation-premium.jpg" 
               alt="Award diploma attestation" 
               className={`${styles.focalImage} ${styles.glowEffect}`}
             />
          </div>
        </div>
      </section>

      {/* ===== Trust Section ===== */}
      <section style={{ padding: '8rem 2rem', borderTop: '1px solid #e2e8f0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className={`${styles.sectionTitle} ${styles.revealText}`} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            Trusted Attestation Services <br /> 
            <span style={{ color: 'var(--accent)' }}>for Students and Professionals</span>
          </h2>

          <div className={styles.trustSplit}>
            <div className={`${styles.trustSplitText} ${styles.textSideEntry}`}>
              <p>
                For a lot of students and professionals, the attestation process is the first thing they have to do before they can go abroad. 
                It can be a bit tough process, especially if you don’t know which office to go to or what each stamp means. 
                That’s why we make sure that our attestation services are quick and easy. We help to get things done right, 
                which helps to avoid all related problems.
              </p>
              <p>
                At <span style={{ color: 'var(--accent)', fontWeight: 700 }}>TIMS Education</span>, we meet a lot of people who need 
                attestation services for higher studies, job placement, or immigration procedures. Most of them simply want someone trustworthy 
                to handle the paperwork without delays. We collect the documents, process them through the right departments, and make sure everything is completed properly.
              </p>
              <p>
                If you’re unsure where to begin, our attestation services give you a steady starting point. 
                With careful handling and clear updates, our attestation services help you move ahead with confidence.
              </p>
            </div>
            
            <div className={`${styles.trustSplitImgBox} ${styles.floating} ${styles.imageSideEntry}`}>
               <img 
                 src="/images/attestation-user-final.png" 
                 alt="Professional guidance for attestation" 
                 className={`${styles.trustSplitImg} ${styles.glowEffect}`}
                 style={{ animationDelay: '1s' }}
               />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Comprehensive List Section ===== */}
      <section className={styles.listSection}>
        <div className={styles.listContainer}>
          <h2 className={`${styles.listTitle} ${styles.revealText}`}>ATTESTATION TYPES</h2>
          <div className={styles.certificatesGrid}>
            {displayedCerts.map((cert, i) => (
              <div 
                key={i} 
                className={`${styles.certItem} ${styles.staggerFadeIn}`}
                style={{ animationDelay: `${0.1 + i * 0.05}s` }}
              >
                <span className={styles.itemBullet}>•</span> {cert}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <button 
              className={styles.viewMoreBtn}
              onClick={() => setIsListExpanded(!isListExpanded)}
            >
              {isListExpanded ? 'VIEW LESS ↑' : 'VIEW ALL SERVICES ↓'}
            </button>
          </div>


        </div>
      </section>

    </main>
  );
}
