
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
    "10th Certificate Attestation", "AMIE Certificate Attestation", "Apprentice ship Certificate Attestation",
    "B.Com Certificate Attestation", "B.Ed Certificate Attestation", "B.Sc Nursing Certificate Attestation",
    "B.Tech Certificate Attestation", "BA Certificate Attestation", "BBA Certificate Attestation",
    "BCA Certificate Attestation", "BDS Certificate Attestation", "BE Certificate Attestation",
    "Birth Certificate Attestation", "Bonafied Certificate Attestation", "B.Sc Certificate Attestation",
    "CA Certificate Attestation", "CBSE Certificate Attestation", "Computer Diploma Certificate Attestation",
    "Course and Conduct Certificate Attestation", "Course Completion Certificate Attestation",
    "Death Certificate Attestation", "Divorce Certificate Attestation", "Engineering Diploma Certificate Attestation",
    "Foreign Certificate Attestation", "Heirship Certificate Attestation", "High School Certificate Attestation",
    "House Surgeon Certificate Attestation", "HSE Certificate Attestation", "Intermediate Certificate Attestation",
    "Internship Certificate Attestation", "ITI Certificate Attestation", "M.Tech Certificate Attestation",
    "M.Com Certificate Attestation", "M.Ed Certificate Attestation", "M.Sc Certificate Attestation",
    "M.Sc Nursing Certificate Attestation", "MA Certificate Attestation", "Marriage Certificate Attestation",
    "MBA Certificate Attestation", "MBBS Certificate Attestation", "MCA Certificate Attestation",
    "ME Certificate Attestation", "Medical Certificate Attestation", "Metric Certificate Attestation",
    "Migration Certificate Attestation", "MS Certificate Attestation", "NTC Certificate Attestation",
    "Nursing Diploma Certificate Attestation", "PCC Certificate Attestation", "PDC Certificate Attestation",
    "Plus Two Certificate Attestation", "Powerof Attorney Certificate Attestation", "Private Diploma Certificate Attestation",
    "PUC Certificate Attestation", "SSC Certificate Attestation", "SSLC Certificate Attestation",
    "Technicians Certificate Attestation", "Training Certificate Attestation", "Transfer Certificate Attestation",
    "Translated Certificate Attestation", "TTC Certificate Attestation", "VHSE Certificate Attestation"
  ].sort();

  const displayedCerts = isListExpanded ? allCerts : allCerts.slice(0, 10);

  return (
    <main className={styles.container}>
      {/* ===== Hero Section (Restored for Navbar Visibility) ===== */}
      <section className={styles.heroHeader}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Certificate Attestation</h1>
          <p className={styles.heroSubtitle}>Professional Legalization & Authentication</p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.serviceIntro}>
          <div className={styles.textCol}>
            <h2 className={styles.sectionTitle} style={{ color: '#00122e', fontSize: '2.4rem', fontWeight: 800, marginBottom: '2.5rem' }}>
              CERTIFICATE ATTESTATIONS SERVICES
            </h2>
            
            <p className={styles.descriptionText}>
              If you are planning to go abroad for higher education, employment, business or migration we can take care of your certificate attestation formalities
            </p>

            <p className={styles.descriptionText}>
              We provide certificate attestation services for Bahrain, Kuwait, Oman, Qatar, , and United Arab Emirates (UAE) from various departments like Notary, GAD, State Home Ministry, SDM, Human Resource Development Department(HRD), Ministry of External Affairs (MEA), Embassy and Consulate for all kind of certificate attestation requirements like business visit visa, employment visa or family visit visa or family resident visa, Driving License, etc…….
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

          <div className={styles.imageCol}>
             <img 
               src="/images/attestation-premium.jpg" 
               alt="Award diploma attestation" 
               className={styles.focalImage}
             />
          </div>
        </div>
      </section>

      {/* ===== Trust Section ===== */}
      <section style={{ padding: '8rem 2rem', borderTop: '1px solid #e2e8f0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            Trusted Certificate Attestation Services <br /> 
            <span style={{ color: 'var(--accent)' }}>for Students and Professionals</span>
          </h2>

          <div className={styles.trustSplit}>
            <div className={styles.trustSplitText}>
              <p>
                For a lot of students and professionals, the attestation process is the first thing they have to do before they can go abroad. 
                It can be a bit tough process, especially if you don’t know which office to go to or what each stamp means. 
                That’s why we make sure that our certificate attestation services are quick and easy. We help to get things done right, 
                which helps to avoid all related problems.
              </p>
              <p>
                At <span style={{ color: 'var(--accent)', fontWeight: 700 }}>TIMS Education</span>, we meet a lot of people who need certificate 
                attestation services for higher studies, job placement, or immigration procedures. Most of them simply want someone trustworthy 
                to handle the paperwork without delays. We collect the documents, process them through the right departments, and make sure everything is completed properly.
              </p>
              <p>
                If you’re unsure where to begin, our certificate attestation services give you a steady starting point. 
                With careful handling and clear updates, our certificate attestation services help you move ahead with confidence.
              </p>
            </div>
            
            <div className={styles.trustSplitImgBox}>
               <img 
                 src="/images/attestation-user-final.png" 
                 alt="Professional guidance for attestation" 
                 className={styles.trustSplitImg}
               />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Comprehensive List Section ===== */}
      <section className={styles.listSection}>
        <div className={styles.listContainer}>
          <h2 className={styles.listTitle}>CERTIFICATE ATTESTATION TYPES</h2>
          <div className={styles.certificatesGrid}>
            {displayedCerts.map((cert, i) => (
              <div key={i} className={styles.certItem}>
                <span className={styles.itemBullet}>•</span> {cert}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <button 
              className={styles.viewMoreBtn}
              onClick={() => setIsListExpanded(!isListExpanded)}
            >
              {isListExpanded ? 'VIEW LESS' : 'VIEW ALL SERVICES'}
            </button>
          </div>
        </div>
      </section>

      {/* ===== Footer CTA ===== */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, #00122e 0%, #001f3f 100%)', color: 'white' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Need Attestation Assistance?</h2>
        <p style={{ color: '#94a3b8', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Contact our specialist team today for a free consultation on your document legalization needs.
        </p>
        <Link href="/contact" style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '1rem 3rem', borderRadius: '50px', fontWeight: 700, fontSize: '1.1rem' }}>
          REQUEST A QUOTE
        </Link>
      </section>
    </main>
  );
}
