'use client';

import React, { useState, useMemo, useEffect } from 'react';
import styles from './services.module.css';
import Link from 'next/link';
import { 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Award, 
  Repeat, 
  GraduationCap,
  BookOpen,
  Briefcase,
  FileCheck,
  CheckCircle,
  Monitor,
  Users
} from 'lucide-react';

export default function ServicesPage() {
  // Attestation states
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const [serviceDescs, setServiceDescs] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('/api/public/services')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          const map: Record<string, string> = {};
          data.forEach((s: any) => { if (s.title && s.description) map[s.title] = s.description; });
          setServiceDescs(map);
        }
      })
      .catch(() => {});
  }, []);

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

      {/* ==========================================
          SECTION 0: OUR PROGRAMS OVERVIEW
          ========================================== */}
      <div id="programs" style={{ position: 'relative', zIndex: 5 }}>
        {/* Programs Hero */}
        <section className={styles.heroWrapper}>
          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <div className={styles.heroBadge}>
                <div className={styles.badgeDot} />
                Academic Excellence
              </div>
              
              <h1 className={styles.heroTitle}>
                Our <span>Programs</span> <br /> 
                & Services
              </h1>
              
              <p className={styles.heroSubtext}>
                From undergraduate degrees to professional diplomas, TIMS Education offers a comprehensive range of UGC-approved online and distance learning programs designed to accelerate your career. Explore our offerings below.
              </p>

              <div className={styles.heroCTAGroup}>
                <Link href="/contact" className={styles.heroSecondaryBtn}>
                  Get Free Counselling
                  <ArrowRight size={20} style={{ marginLeft: '10px' }} />
                </Link>
              </div>
            </div>

            <div className={styles.heroRight}>
              <div className={styles.imageCard}>
                <img
                  src="/images/hero-girl-new.png"
                  alt="Student Success Programs"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className={styles.programsOverview}>
          <div className={styles.programsContainer}>

            {/* Online UG */}
            <div className={styles.programCard}>
              <div className={styles.programIconWrap}>
                <GraduationCap size={28} />
              </div>
              <h3 className={styles.programCardTitle}>Online UG Programs</h3>
              <p className={styles.programCardDesc}>
                {serviceDescs['Online UG Programs'] || 'Earn a recognized undergraduate degree from top UGC-approved universities — entirely online. Our Online UG programs include BA, B.Com, BBA, BCA, and B.Sc, designed for students who want flexibility without compromising on quality. Study at your own pace with digital learning resources, live sessions, and dedicated mentor support.'}
              </p>
              <ul className={styles.programHighlights}>
                <li><CheckCircle size={14} /> UGC & NAAC Approved Universities</li>
                <li><CheckCircle size={14} /> 100% Online — No Campus Visits</li>
                <li><CheckCircle size={14} /> Affordable EMI Options Available</li>
                <li><CheckCircle size={14} /> Industry-Relevant Curriculum</li>
              </ul>
              <Link href="/courses" className={styles.programCardLink}>
                Explore UG Programs <ArrowRight size={16} />
              </Link>
            </div>

            {/* Online PG */}
            <div className={styles.programCard}>
              <div className={styles.programIconWrap}>
                <BookOpen size={28} />
              </div>
              <h3 className={styles.programCardTitle}>Online PG Programs</h3>
              <p className={styles.programCardDesc}>
                {serviceDescs['Online PG Programs'] || "Advance your career with a postgraduate degree from India's leading universities. Our Online PG programs — MBA, MCA, M.Com, MA, and M.Sc — are tailored for working professionals seeking career growth. Gain specialized knowledge in your field with flexible schedules and expert faculty guidance."}
              </p>
              <ul className={styles.programHighlights}>
                <li><CheckCircle size={14} /> Globally Recognized Degrees</li>
                <li><CheckCircle size={14} /> Specializations in 20+ Domains</li>
                <li><CheckCircle size={14} /> Weekend & Evening Batches</li>
                <li><CheckCircle size={14} /> Placement Assistance Included</li>
              </ul>
              <Link href="/courses" className={styles.programCardLink}>
                Explore PG Programs <ArrowRight size={16} />
              </Link>
            </div>

            {/* Credit Transfer Program */}
            <div className={styles.programCard}>
              <div className={styles.programIconWrap}>
                <Repeat size={28} />
              </div>
              <h3 className={styles.programCardTitle}>Credit Transfer Program</h3>
              <p className={styles.programCardDesc}>
                {serviceDescs['Credit Transfer Program'] || "Don't let incomplete degrees hold you back. Our Credit Transfer Program allows you to transfer previously earned academic credits to a new university and complete your degree faster. Whether you dropped out or want to switch institutions, we evaluate your transcripts and map credits to an equivalent program."}
              </p>
              <ul className={styles.programHighlights}>
                <li><CheckCircle size={14} /> Recognize Prior Learning Credits</li>
                <li><CheckCircle size={14} /> Save Time & Tuition Costs</li>
                <li><CheckCircle size={14} /> Partnered with 50+ Universities</li>
                <li><CheckCircle size={14} /> Personalized Academic Plan</li>
              </ul>
              <Link href="#credit-transfer" className={styles.programCardLink}>
                Learn About Credit Transfer <ArrowRight size={16} />
              </Link>
            </div>

            {/* SIDP */}
            <div className={styles.programCard}>
              <div className={styles.programIconWrap}>
                <Briefcase size={28} />
              </div>
              <h3 className={styles.programCardTitle}>SIDP — Skill Integrated Degree Program</h3>
              <p className={styles.programCardDesc}>
                {serviceDescs['SIDP — Skill Integrated Degree Program'] || 'The Skill Integrated Degree Program (SIDP) combines a formal degree with hands-on skill training, preparing students for the real-world job market from day one. Offered in collaboration with top universities, SIDP ensures you graduate with both academic credentials and industry-ready skills in areas like Digital Marketing, Data Science, Full-Stack Development, and more.'}
              </p>
              <ul className={styles.programHighlights}>
                <li><CheckCircle size={14} /> Degree + Skill Certificate Together</li>
                <li><CheckCircle size={14} /> Industry Mentors & Live Projects</li>
                <li><CheckCircle size={14} /> Job-Ready in 3 Years</li>
                <li><CheckCircle size={14} /> Internship & Placement Support</li>
              </ul>
              <Link href="/courses" className={styles.programCardLink}>
                Explore SIDP Programs <ArrowRight size={16} />
              </Link>
            </div>

            {/* Diploma Programs */}
            <div className={styles.programCard}>
              <div className={styles.programIconWrap}>
                <FileCheck size={28} />
              </div>
              <h3 className={styles.programCardTitle}>Diploma & Certification Programs</h3>
              <p className={styles.programCardDesc}>
                {serviceDescs['Diploma & Certification Programs'] || "Fast-track your career with our professionally designed Diploma programs. Whether you're looking to upskill or enter a new field entirely, our short-term diploma courses in Data Science, Cyber Security, Hospital Management, Logistics, and more give you the credentials employers value — in as little as 6 to 12 months."}
              </p>
              <ul className={styles.programHighlights}>
                <li><CheckCircle size={14} /> 6–12 Month Completion</li>
                <li><CheckCircle size={14} /> Practical, Job-Focused Curriculum</li>
                <li><CheckCircle size={14} /> NSDC & Industry Recognized</li>
                <li><CheckCircle size={14} /> Ideal for Career Switchers</li>
              </ul>
              <Link href="/courses" className={styles.programCardLink}>
                Explore Diplomas <ArrowRight size={16} />
              </Link>
            </div>

          </div>
        </section>
      </div>

      {/* ==========================================
          SECTION 1: DOCUMENT ATTESTATION
          ========================================== */}
      <div id="attestation" style={{ position: 'relative', zIndex: 5, borderTop: '1px solid rgba(28, 13, 7, 0.1)', paddingTop: '4rem' }}>
        {/* Hero Section */}
        <section className={styles.heroWrapper}>
          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <div className={styles.heroBadge}>
                <div className={styles.badgeDot} />
                Official Document Legalization
              </div>
              
              <h1 className={styles.heroTitle}>
                Official <span>Attestation</span> <br /> 
                for Global Success 
              </h1>
              
              <p className={styles.heroSubtext}>
                Authorized Embassy Legalization & Authentication services for Global Education, Employment, and Migration. Trusted by professionals worldwide.
              </p>

              <div className={styles.heroCTAGroup}>
                <Link href="#directory" className={styles.heroSecondaryBtn}>
                  Explore Directory
                </Link>
              </div>
            </div>

            <div className={styles.heroRight}>
              <div className={styles.imageCard}>
                <img
                  src="/images/attestation-hero.png.jpg"
                  alt="Document Verification"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Paragraph Showcase Section */}
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
                If you are planning to go abroad for higher education, employment, business or migration we can take care of your certificate attestation formalities.
              </p>
              <p className={styles.showcaseParagraph}>
                We provide certificate attestation services for Bahrain, Kuwait, Oman, Qatar, and United Arab Emirates (UAE) from various departments like Notary, GAD, State Home Ministry, SDM, Human Resource Development Department (HRD), Ministry of External Affairs (MEA), Embassy and Consulate for all kinds of certificate attestation requirements like business visit visas, employment visas, family visit visas, family residency visas, Driving Licenses, etc.
              </p>
              
              {isTextExpanded && (
                <>
                  <p className={styles.showcaseParagraph}>
                    HRD, MEA, Embassy, Consulate, GAD, RAC, Notary, Home Ministry, SDM, Foreign Ministry, Secretariat, Mantralaya, External Affairs, MOFA, Indian Embassy, Education Ministry, Health Ministry, Ministry of Justice, Chamber of Commerce, University / College / School / Institute Attestation from India, HRD/MEA from Abroad, Notary/Home Ministry/Education Ministry/Health Ministry from Abroad, Embassy/Consulate from Abroad, Chamber of Commerce/Ministry of Justice/Foreign Ministry/MOFA from Abroad, University/School/College/Institute Attestation from Abroad, Magistrate’s/Commissioner’s/Resident Commissioner’s Attestation from India, State Notary/Local Notary Attestation from India, Education Officer’s/ Assistant Education Officer’s Attestation from India, Board/Technical Board /Council/CBSE Board Attestation from India, Head Master’s/Head Mistress’s/Principal’s Attestation from India, Home Department/General Administration Department/Human Resource Development Department/:Higher Education Department/District Education Department/Office of the Commissioner – Higher Education/Education Administrator’s Office ‘s Attestation, Government of GOA/ Directorate of Technical Education/Education Department of SACHIVALAYA/ Government of Gujarat’s/ Higher Education Commissioner’s Office’s Attestation, Director Higher Education Office/Director of Public Instruction’s/Board of School Education/State Board of School
                  </p>
                  <p className={styles.showcaseParagraph}>
                    Education’s Attestation. Passport and Foreigners Department’s Attestation, VIDHANA SOUDHA / Regional Authentication office/Government of MEGHALAYA / Government of MIZORAM Attestation, Higher & Technical Education Department/Secretary Assistant to Special Secretary’s Attestation. Government of ORISSA/ Government of Puducherry Attestation. Department of Non-Resident Indian Affair’s Attestation, Government of Punjab’s Attestation, Mini Secretariat – CHANDIGARH Punjab’s Attestation, Government Secretariat’s Attestation. Joint Directors (Examination) offices/Deputy Directors (Examination) Offices Attestation, Government Public (Foreigners) Department’s Attestation, Government of TAMILNADU Attestation. Government of Uttar Pradesh ‘s Attestation, Home (Foreigner & NRI) Attestation , Immunization Certificate/Vaccination Certificate/Health Certificate Attestation for pet animals etc.
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

        {/* Certificate Directory Search Section */}
        <section id="directory" className={styles.directorySection}>
          <div className={styles.directoryContainer}>
            <div className={styles.directoryHeader}>
              <div>
                <h2 className={styles.directoryTitle}>Certificate Attestation Search</h2>
                <p style={{ color: 'rgba(28,13,7,0.6)', marginTop: '0.5rem', fontWeight: 600 }}>Search for your specific document type below</p>
              </div>
              <div className={styles.searchBox}>
                <Search size={20} color="#E8502A" />
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
              <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(28,13,7,0.5)', fontWeight: 600 }}>
                No matching certificates found. Please contact us for custom requirements.
              </div>
            )}
          </div>
        </section>

        {/* Trusted Section */}
        <section className={styles.trustedSection}>
          <div className={styles.trustedContainer}>
            <h2 className={styles.trustedTitle}>Trusted Certificate Attestation Services for Students and Professionals</h2>
            <div className={styles.trustedContent}>
              <div className={styles.trustedTextCol}>
                <p className={styles.trustedParagraph}>
                  For many students and professionals, the attestation process is the first thing they have to do before they can go abroad. It can be a challenging process, especially if you don't know which office to visit or what each stamp means. That's why we make sure that our <strong>certificate attestation services</strong> are quick and easy. We help to get things done right, which helps to avoid all related issues.
                </p>
                <p className={styles.trustedParagraph}>
                  At TIMS Education, we meet many people who need <strong>certificate attestation services</strong> for higher studies, job placements, or immigration procedures. Most of them simply want someone trustworthy to handle the paperwork without delays. We collect the documents, process them through the correct departments, and make sure everything is completed properly. With careful handling and clear updates, our <strong>certificate attestation services</strong> help you move ahead with confidence.
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
      </div>

      {/* ==========================================
          SECTION 2: CREDIT TRANSFER
          ========================================== */}
      <div id="credit-transfer" style={{ position: 'relative', zIndex: 5, borderTop: '1px solid rgba(28, 13, 7, 0.1)', paddingTop: '4rem' }}>
        {/* Hero Section */}
        <section className={styles.heroWrapper}>
          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <div className={styles.heroBadge}>
                <div className={styles.badgeDot} />
                Fast-Track Your Degree
              </div>
              
              <h1 className={styles.heroTitle}>
                Seamless <span>Credit Transfer</span> <br /> 
                for Academic Growth
              </h1>
              
              <p className={styles.heroSubtext}>
                Leverage your previous academic accomplishments to accelerate your progress toward a degree with our professional credit evaluation and transfer services.
              </p>

              <div className={styles.heroCTAGroup}>
                <Link href="#potential" className={styles.heroSecondaryBtn}>
                  Explore Benefits
                  <GraduationCap size={20} style={{ marginLeft: '10px' }} />
                </Link>
              </div>
            </div>

            <div className={styles.heroRight}>
              <div className={styles.imageCard}>
                {/* 
                <img
                  src="/images/credit-transfer-hero.png"
                  alt="Credit Transfer Success"
                />
                */}
              </div>
            </div>
          </div>
        </section>

        {/* Potential of Credit Transfer Section */}
        <section id="potential" className={styles.potentialSection}>
          <div className={styles.potentialContainer}>
            <h2 className={styles.potentialTitle}>
              Credit Transfer Services: Seamlessly Continue Your Academic Journey <br />
              Unlocking the Potential of Credit Transfer
            </h2>
            <p className={styles.potentialIntro}>
              Credit transfer allows you to make the most of your educational investments. Here's why it matters:
            </p>

            <div className={styles.potentialGrid}>
              <div className={styles.potentialItem}>
                <div className={styles.potentialIcon}>
                  <div className={styles.redCircle} />
                </div>
                <div className={styles.potentialText}>
                  <h4>Recognizing Your Prior Learning:</h4>
                  <p>We acknowledge the academic efforts you've put into your previous studies. Credit transfer allows recognition of your prior learning, ensuring you don't have to start from scratch.</p>
                </div>
              </div>

              <div className={styles.potentialItem}>
                <div className={styles.potentialIcon}>
                  <div className={styles.redCircle} />
                </div>
                <div className={styles.potentialText}>
                  <h4>Cost-Efficient Education:</h4>
                  <p>Credit transfer can result in significant cost savings. You won't need to pay for courses you've already studied, making education more affordable and accessible.</p>
                </div>
              </div>

              <div className={styles.potentialItem}>
                <div className={styles.potentialIcon}>
                  <div className={styles.redCircle} />
                </div>
                <div className={styles.potentialText}>
                  <h4>Accelerating Your Progress:</h4>
                  <p>By transferring credits, you can accelerate your academic progress. This means completing your program faster and moving closer to your educational goals efficiently.</p>
                </div>
              </div>

              <div className={styles.potentialItem}>
                <div className={styles.potentialIcon}>
                  <div className={styles.redCircle} />
                </div>
                <div className={styles.potentialText}>
                  <h4>Tailored Academic Pathways:</h4>
                  <p>Transfer credits strategically to tailor your academic pathway. Choose courses that align with your interests and career aspirations, creating a personalized learning journey.</p>
                </div>
              </div>

              <div className={styles.potentialItem}>
                <div className={styles.potentialIcon}>
                  <div className={styles.redCircle} />
                </div>
                <div className={styles.potentialText}>
                  <h4>Enabling Higher Degree Pursuits:</h4>
                  <p>Take your education to the next level by leveraging your existing credits for advanced degrees and specialized certifications across global universities.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Procedural Step List Section */}
        <section className={styles.howSection}>
          <div className={styles.splitSection}>
            <div className={styles.imageSide}>
              <img 
                src="https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=2000" 
                alt="Student Success"
              />
            </div>
            <div className={styles.contentSide}>
              <span className={styles.sectionTag}>PROCEDURAL EXCELLENCE</span>
              <h2 className={styles.howTitle}>How Our Credit Transfer Services Work</h2>
              <p className={styles.howSubtext}>
                Our Credit Transfer Services follow a streamlined process to ensure maximum recognition of your prior learning.
              </p>

              <div className={styles.stepList}>
                <div className={styles.stepItem}>
                  <h4>1. Credit Evaluation:</h4>
                  <ul>
                    <li>Submit your academic transcripts and relevant documents for evaluation.</li>
                    <li>Our expert team will review your credits and determine the transferable courses.</li>
                  </ul>
                </div>

                <div className={styles.stepItem}>
                  <h4>2. Credit Approval and Mapping:</h4>
                  <ul>
                    <li>Once evaluated, we'll approve the transferable credits and map them to equivalent courses in your chosen program.</li>
                  </ul>
                </div>

                <div className={styles.stepItem}>
                  <h4>3. Customized Academic Plan:</h4>
                  <ul>
                    <li>Receive a customized academic plan detailing the courses you need to complete to fulfill the program requirements.</li>
                  </ul>
                </div>

                <div className={styles.stepItem}>
                  <h4>4. Seamless Integration:</h4>
                  <ul>
                    <li>Your approved credits seamlessly integrate into your academic journey, allowing you to progress efficiently.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner / Transition Section */}
        <section className={styles.partnerSection}>
          <div className={styles.partnerContainer}>
            <div className={styles.partnerContentCentered}>
              <h2 className={styles.partnerTitle}>Partner with TIMS Education for a Smooth Transition</h2>
              <p className={styles.partnerParagraph}>
                At TIMS Education, we’re committed to making your academic journey as seamless as possible. Our <strong>Credit Transfer Services</strong> are tailored to ensure that your prior learning is recognized and contributes to your current educational pursuits.
              </p>
              <p className={styles.partnerParagraph}>
                Explore our Credit Transfer Services and make the most of your academic achievements. Your progress matters, and we’re here to support your educational aspirations! We work closely with leading institutions to ensure your credits are mapped accurately and recognized globally.
              </p>
              <div style={{ marginTop: '1rem' }}>
                <a 
                  href="https://www.glocaluniversity.edu.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.partnerButton}
                >
                  GLOCAL UNIVERSITY <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ===== Premium Final CTA ===== */}
      <section className={styles.finalCta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaHeadline}>Ready to Accelerate Your Global Journey?</h2>
          <p className={styles.ctaSub}>Join thousands of successful candidates who trusted TIMS for their academic evaluation and legalizations. Get a free consultation today.</p>
          <Link href="/contact" className={styles.ctaButton}>
            Get Free Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
