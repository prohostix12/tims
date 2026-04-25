'use client';

import React, { useState, useMemo } from 'react';
import styles from './attestation.module.css';
import Link from 'next/link';
import { Search, ArrowRight, ShieldCheck, Globe, Award } from 'lucide-react';

export default function AttestationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [isTextExpanded, setIsTextExpanded] = useState(false);

  const steps = [
    { title: "Document Submission", description: "Securely submit original documents and valid identification at our authorized TIMS centers." },
    { title: "Technical Verification", description: "Our authentication experts conduct rigorous primary validation of all submitted credentials." },
    { title: "Ministry Legalization", description: "Formal endorsement through State HRD and the Ministry of External Affairs (MEA) hierarchy." },
    { title: "Embassy Certification", description: "Final jurisdictional legalization from the destination country's Embassy or Consulate." }
  ];

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
    "Plus Two Attestation", "Power of Attorney Attestation", "Private Diploma Attestation",
    "PUC Attestation", "SSC Attestation", "SSLC Attestation",
    "Technicians Attestation", "Training Attestation", "Transfer Attestation",
    "Translated Attestation", "TTC Attestation", "VHSE Attestation"
  ].sort();

  const filteredCerts = useMemo(() => {
    return allCerts.filter(cert => 
      cert.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const displayedCerts = showAll || searchTerm !== '' ? filteredCerts : filteredCerts.slice(0, 12);

  return (
    <main className={styles.container}>
      <div className={styles.pageGlow} />

      {/* ===== Standard Hero Section (Like Home Page) ===== */}
      <section className={styles.heroWrapper}>
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <nav className={styles.heroBreadcrumb}>
              <Link href="/">Home</Link> <span>/</span> <span>Attestation</span>
            </nav>
            <h1 className={styles.heroTitle}>
              Official <span className={styles.heroTitleDark}>Document Attestation</span> <br />
              & Global Legalization.
            </h1>
            <p className={styles.heroDesc}>
              Authorized Embassy Legalization & Authentication services for Global Education, Employment, and Migration. Trusted by 15,000+ professionals worldwide.
            </p>

            <div className={styles.heroSearch}>
              <input 
                type="text" 
                placeholder="What document do you need to attest?" 
                className={styles.heroSearchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className={styles.heroSearchBtn}>
                <Search size={20} />
              </button>
            </div>

            <div className={styles.goalSection}>
              <p className={styles.goalLabel}>Popular Services:</p>
              <div className={styles.goalChips}>
                {['Degree Attestation', 'Birth Certificate', 'Marriage Certificate', 'HRD Attestation', 'MEA Legalization'].map((g, i) => (
                  <button 
                    key={i} 
                    className={styles.goalChip}
                    onClick={() => setSearchTerm(g.split(' ')[0])}
                    style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.heroImageCard}>
              <img 
                src="/images/hero-attestation.png" 
                alt="Verification Excellence" 
              />
              <div className={styles.heroImageOverlay}>
                <div className={styles.overlayIconBox}>
                  <ShieldCheck size={28} color="#ef233c" />
                </div>
                <div>
                  <p className={styles.overlayWhite}>Authorized By</p>
                  <p className={styles.overlayHighlight}>MEA & Global Embassies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ===== Certificate Attestations Services ===== */}
      <section className={styles.showcaseSection}>
        <div className={styles.servicesContainer}>
          <h2 className={styles.servicesTitle}>CERTIFICATE ATTESTATIONS SERVICES</h2>
          
          <div className={styles.servicesFloatContent}>
            <img 
              src="/images/attestation-user-final.png" 
              alt="Professional Certificate Attestation Service" 
              className={styles.floatImage}
            />
            <p className={styles.showcaseParagraph}>
              If you are planning to go abroad for higher education, employment, business or migration we can take care of your certificate attestation formalities
            </p>
            <p className={styles.showcaseParagraph}>
              We provide certificate attestation services for Bahrain, Kuwait, Oman, Qatar, and United Arab Emirates (UAE) from various departments like Notary, GAD, State Home Ministry, SDM, Human Resource Development Department(HRD), Ministry of External Affairs (MEA), Embassy and Consulate for all kind of certificate attestation requirements like business visit visa, employment visa or family visit visa or family resident visa, Driving License, etc…….
            </p>
            
            {isTextExpanded && (
              <>
                <p className={styles.showcaseParagraph}>
                  HRD, MEA, Embassy, Consulate, GAD, RAC, Notary, Home Ministry, SDM, Foreign Ministry, Secretariat, Mantralaya, External Affairs, MOFA, Indian Embassy, Education Ministry, Health Ministry, Ministry of Justice, Chamber of Commerce, University / Collage/ School/Institute Attestation from India, HRD/MEA from Abroad, Notary/Home Ministry/Education Ministry/Health Ministry from Abroad, Embassy/Consulate from Abroad, Chamber of Commerce/Ministry of Justice/Foreign Ministry/MOFA from Abroad, University/School/Collage/Institute Attestation from Abroad, Magistrate’s/Commissioner’s/Resident Commissioner’s Attestation from India, State Notary/Local Notary Attestation from India, Education Officer’s/ Assistant Education Officer’s Attestation from India, Board/Technical Board /Council/CBSE Board Attestation from India, Head Master’s/Head Mistress’s/Principal’s Attestation from India, Home Department/General Administration Department/Human Resource Development Department/:Higher Education Department/District Education Department/Office of the Commissioner – Higher Education/Education Administrator’s Office ‘s Attestation, Government of GOA/ Directorate of Technical Education/Education Department of SACHIVALAYA/ Government of Gujarat’s/ Higher Education Commissioner’s Office’s Attestation, Director Higher Education Office/Director of Public Instruction’s/Board of School Education/State Board of School
                </p>
                <p className={styles.showcaseParagraph}>
                  Education’s Attestation. Passport and Foreigners Department’s Attestation, VIDHANA SOUDHA / Regional Authentication office/Government of MEGHALAYA / Government of MIZORAM Attestation, Higher & Technical Education Department/Secretary Assistant to Special Secretary’s Attestation. Government of ORISSA/ Government of Puducherry Attestation. Department of Non- Resident Indian Affair’s Attestation, Government of Punjab’s Attestation, Mini Secretariat – CHANDIGARH Punjab’s Attestation, Government Secretariat’s Attestation. Joint Directors (Examination) offices/Deputy Directors (Examination) Offices Attestation, Government Public (Foreigners)Department’s Attestation, Government of TAMILNADU Attestation. Government of Uttar Pradesh ‘s Attestation, Home (Foreigner & NRI) Attestation , Immunization Certificate/Vaccination Certificate/Health Certificate Attestation for pet animals etc.
                </p>
              </>
            )}

            <button 
              className={styles.readMoreBtn} 
              onClick={() => setIsTextExpanded(!isTextExpanded)}
            >
              {isTextExpanded ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>
      </section>

      {/* ===== Categorized Directory ===== */}
      <section className={styles.directorySection}>
        <div className={styles.directoryContainer}>
          <div className={styles.directoryHeader}>
            <div>
              <h2 className={styles.directoryTitle}>Certificate Attestation</h2>
              <p style={{ color: '#64748b', marginTop: '1rem', fontWeight: 500 }}>Search for your specific document type</p>
            </div>
            <div className={styles.searchBox}>
              <Search size={20} color="#94a3b8" />
              <input 
                type="text" 
                placeholder="Search certificate type..." 
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.directoryGrid}>
            {displayedCerts.map((cert, i) => (
              <div key={i} className={styles.directoryItem}>
                <div className={styles.itemDot} />
                {cert}
              </div>
            ))}
          </div>

          {!showAll && searchTerm === '' && filteredCerts.length > 12 && (
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <button 
                onClick={() => setShowAll(true)}
                className={styles.viewAllBtn}
              >
                View All Certificates
              </button>
            </div>
          )}
          
          {filteredCerts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8', fontWeight: 600 }}>
              No matching certificates found. Please contact us for custom requirements.
            </div>
          )}
        </div>
      </section>

      {/* ===== Trusted Services Section ===== */}
      <section className={styles.trustedSection}>
        <div className={styles.trustedContainer}>
          <h2 className={styles.trustedTitle}>Trusted Certificate Attestation Services for Students and Professionals</h2>
          <div className={styles.trustedContent}>
            <div className={styles.trustedTextCol}>
              <p className={styles.trustedParagraph}>
                For a lot of students and professionals, the attestation process is the first thing they have to do before they can go abroad. It can be a bit tough process, especially if you don't know which office to go to or what each stamp means. That's why we make sure that our <strong>certificate attestation services</strong> are quick and easy. We help to get things done right, which helps to avoid all related problems.
              </p>
              <p className={styles.trustedParagraph}>
                At TIMS Education, we meet a lot of people who need <strong>certificate attestation services</strong> for higher studies, job placement, or immigration procedures. Most of them simply want someone trustworthy to handle the paperwork without delays. We collect the documents, process them through the right departments, and make sure everything is completed properly. If you're unsure where to begin, our <strong>certificate attestation services</strong> give you a steady starting point. With careful handling and clear updates, our <strong>certificate attestation services</strong> help you move ahead with confidence.
              </p>
            </div>
            <div className={styles.trustedImageCol}>
              <img
                src="/images/attestation-seal.png"
                alt="Certificate Attestation Services"
                className={styles.trustedImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Premium Final CTA ===== */}
      <section className={styles.finalCta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaHeadline}>Ready to Authenticate Your Documents?</h2>
          <p className={styles.ctaSub}>Join thousands of successful candidates who trusted TIMS for their global journey. Get a free consultation today.</p>
          <Link href="/contact" className={styles.ctaButton}>
            Get Free Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
