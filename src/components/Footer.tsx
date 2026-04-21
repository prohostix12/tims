import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Company Section */}
        <div className={styles.footerCol}>
          <h3 className={styles.colTitle}>Company</h3>
          <p className={styles.companyDesc}>
            TIMS ( Tirur Institute of Management Studies) is an educational institution. 
            It was established in 2009 with the sole purpose of providing education 
            accessible to every section of society, ... <Link href="/about" className={styles.readMore}>[Read More]</Link>
          </p>
        </div>

        {/* Explore Section */}
        <div className={styles.footerCol}>
          <h3 className={styles.colTitle}>Explore</h3>
          <ul className={styles.footerLinks}>
            <li><Link href="/" className={styles.activeLink}>Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="#">Blog</Link></li>
            <li><Link href="#">News</Link></li>
            <li><Link href="#">Contact</Link></li>
            <li><Link href="#">Terms and Conditions</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Sections */}
        <div className={styles.footerCol}>
          <h3 className={styles.colTitle}>Head Office</h3>
          <div className={styles.contactItem}>
            <span className={styles.icon}>✉</span> 
            <a href="mailto:info@timseducation.com">info@timseducation.com</a>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.icon}>📞</span> 
            <a href="tel:+919961967777">+91 9961967777</a>
          </div>
          <p className={styles.address}>
            2nd Floor, Pamls Tower, near Central Bank, Thazhepalam, Tirur, Kerala 676101
          </p>
        </div>

        <div className={styles.footerCol}>
          <h3 className={styles.colTitle}>Edapal Office</h3>
          <div className={styles.contactItem}>
            <span className={styles.icon}>✉</span> 
            <a href="mailto:info@timseducation.com">info@timseducation.com</a>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.icon}>📞</span> 
            <a href="tel:+919526387777">+91 9526387777</a>
          </div>
          <p className={styles.address}>
            2nd floor Al madeela complex Calicut road Edappal 679576 MALAPPURAM DT Kerala
          </p>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>© Copyright 2026 by TIMS Education</p>
      </div>
    </footer>
  );
}
