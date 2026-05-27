// seed-gla-programs-full.js
// Run with: node scratch/seed-gla-programs-full.js
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tims_db';

const universitySchema = new mongoose.Schema({
  name: String, code: String, description: String, location: String,
  establishedYear: Number, status: String, website: String, image: String,
  logo: String, ranking: String, accreditations: String, features: [String],
  facilities: [String], type: String, contactEmail: String,
}, { timestamps: true });

const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
  slug: { type: String, unique: true, sparse: true },
  duration: String, type: String,
  category: { type: String, required: true },
  level: String, eligibility: String,
  courseType: String,
  image: String, brochure: String,
  description: String,
  highlights: { type: [String], default: [] },
  heroTitle: String, intro: String,
  specializations: { type: Array, default: [] },
  fee: { type: Number, default: 0 },
}, { timestamps: true });

const University = mongoose.models.University || mongoose.model('University', universitySchema);
const Program    = mongoose.models.Program    || mongoose.model('Program',    programSchema);

// ── Program data ───────────────────────────────────────────────────────────────
const programs = [
  // ── B.Com ──────────────────────────────────────────────────────────────────
  {
    name: 'B.Com',
    slug: 'bcom',
    duration: '3 Years',
    type: 'Online / Distance Degree',
    category: 'Degree',
    level: 'Undergraduate',
    eligibility: '10+2 (any stream) with minimum 45% marks',
    courseType: 'Commerce',
    image: '/images/student_book_cutout.png',
    brochure: '',
    description: 'Bachelor of Commerce (B.Com) is a three-year undergraduate degree programme that provides comprehensive knowledge in accounting, finance, economics, business law and taxation. GLA University\'s B.Com programme is UGC-approved and designed for students seeking strong careers in commerce, finance and allied sectors.',
    highlights: [
      'UGC-approved online/distance programme',
      'Industry-relevant curriculum covering Accounting, Taxation & Finance',
      'Flexible learning with self-paced study materials',
      'Recognized by all major employers and higher education institutions',
      'Affordable fee structure with EMI facility',
      'Dedicated academic mentors and doubt-clearing sessions',
    ],
    fee: 45000,
    heroTitle: 'Top Career Opportunities after B.Com',
    intro: 'B.Com (Bachelor of Commerce) is one of the most versatile undergraduate degrees in India. It lays a strong foundation in accounting, finance and business law, opening up diverse career paths in commerce, banking and further professional qualifications like CA, CMA and MBA.',
    specializations: [
      {
        id: 'accounting',
        title: 'Accounting & Finance',
        description: 'B.Com graduates are ready for accounting roles in small, medium and large enterprises. Many pursue CA, CMA or CPA for global opportunities.',
        jobs: ['Accountant / Junior Accountant', 'Accounts Executive', 'Finance Analyst (Entry Level)', 'Bookkeeper', 'Payroll Executive', 'CA Articleship (with ICAI)'],
      },
      {
        id: 'banking',
        title: 'Banking & Insurance',
        description: 'The banking sector recruits B.Com graduates through IBPS, SBI PO and other competitive exams, as well as through private bank campus drives.',
        jobs: ['Bank PO / Clerk (via IBPS/SBI)', 'Insurance Agent / Manager', 'Loan Officer', 'Banking Associate', 'Mutual Fund Executive'],
      },
      {
        id: 'taxation',
        title: 'Taxation & GST',
        description: 'Taxation offers steady, recession-proof careers. B.Com graduates with Tally, GST and income tax knowledge are in demand at CA firms and corporate finance teams.',
        jobs: ['Tax Assistant', 'GST Executive', 'TDS Manager', 'Income Tax Practitioner', 'Accounts & Tax Associate'],
      },
      {
        id: 'higher',
        title: 'Higher Studies',
        description: 'B.Com is an excellent springboard to professional qualifications and postgraduate degrees that open senior career paths.',
        jobs: ['M.Com', 'MBA (Finance/Marketing)', 'CA', 'CMA', 'CS', 'CFA', 'ACCA'],
      },
    ],
  },

  // ── BBA ────────────────────────────────────────────────────────────────────
  {
    name: 'BBA',
    slug: 'bba',
    duration: '3 Years',
    type: 'Online / Distance Degree',
    category: 'Degree',
    level: 'Undergraduate',
    eligibility: '10+2 (any stream) with minimum 45% marks',
    courseType: 'Management',
    image: '/images/hero-campus.png',
    brochure: '',
    description: 'Bachelor of Business Administration (BBA) is a three-year undergraduate management degree that equips students with leadership, entrepreneurial and organisational skills. GLA University\'s BBA programme blends core business subjects with real-world case studies, preparing graduates for both industry roles and advanced management studies.',
    highlights: [
      'UGC-approved programme with NAAC accreditation',
      'Covers Marketing, Finance, HR and Operations Management',
      'Case study & project-based learning approach',
      'Industry mentorship and internship support',
      'Direct pathway to MBA at GLA University',
      'Flexible online mode — study from anywhere',
    ],
    fee: 50000,
    heroTitle: 'Top Career Opportunities after BBA',
    intro: 'BBA (Bachelor of Business Administration) equips graduates with a strong foundation in management principles. It opens up immediate career options in business, marketing and operations, or serves as a stepping stone to an MBA for senior leadership roles.',
    specializations: [
      {
        id: 'marketing',
        title: 'Sales & Marketing',
        description: 'BBA graduates with a flair for communication and strategy find great opportunities in sales management, digital marketing and brand promotion across FMCG, retail and media.',
        jobs: ['Sales Executive', 'Marketing Coordinator', 'Digital Marketing Executive', 'Brand Associate', 'Business Development Executive', 'Retail Manager'],
      },
      {
        id: 'hr',
        title: 'Human Resources',
        description: 'Entry-level HR roles are well-suited for BBA graduates. With experience and further education, they grow into strategic HR business partners.',
        jobs: ['HR Executive', 'Recruiter / Talent Acquisition', 'Payroll Executive', 'Training Coordinator', 'HR Assistant Manager'],
      },
      {
        id: 'finance',
        title: 'Banking & Finance',
        description: 'BBA graduates enter the banking sector through competitive exams or private bank recruitment drives, taking on roles in retail banking, insurance and financial advisory.',
        jobs: ['Banking Associate', 'Insurance Advisor', 'Financial Analyst (Junior)', 'Accounts Executive', 'Loan Officer'],
      },
      {
        id: 'higher',
        title: 'Higher Studies',
        description: 'Many BBA graduates choose to pursue higher education for better career prospects and specialisation in a chosen field.',
        jobs: ['MBA', 'PGDM', 'M.Com', 'CA Foundation', 'CFA', 'CMA'],
      },
    ],
  },

  // ── BCA ────────────────────────────────────────────────────────────────────
  {
    name: 'BCA',
    slug: 'bca',
    duration: '3 Years',
    type: 'Online / Distance Degree',
    category: 'Degree',
    level: 'Undergraduate',
    eligibility: '10+2 with Mathematics (minimum 45% marks)',
    courseType: 'IT',
    image: '/images/student-laptop.png',
    brochure: '',
    description: 'Bachelor of Computer Applications (BCA) is a three-year undergraduate IT degree that provides in-depth knowledge of programming, software development, database management and networking. GLA University\'s BCA programme is industry-aligned, featuring practical projects, coding labs and placement-focused training to prepare students for top IT companies.',
    highlights: [
      'UGC-approved programme — valid for all government & private sector jobs',
      'Hands-on coding in Python, Java, C++ and Web Technologies',
      'Database management, Networking and Cybersecurity fundamentals',
      'Direct pathway to MCA at GLA University',
      'Placement assistance with leading IT companies',
      'Online/distance mode — flexible for working students',
    ],
    fee: 55000,
    heroTitle: 'Top Career Opportunities after BCA',
    intro: 'BCA (Bachelor of Computer Applications) is the most popular undergraduate IT degree in India. It equips students with programming, networking and database skills, opening doors to the booming tech industry and higher studies like MCA or M.Tech.',
    specializations: [
      {
        id: 'software',
        title: 'Software Development',
        description: 'BCA graduates are job-ready for entry-level development roles in IT companies, startups and product firms. With the right skills, they grow quickly into senior engineering positions.',
        jobs: ['Junior Software Developer', 'Web Developer', 'Mobile App Developer', 'Python / Java Developer', 'React / Angular Frontend Developer', 'QA / Test Engineer'],
      },
      {
        id: 'networking',
        title: 'Networking & Infrastructure',
        description: 'BCA graduates with networking knowledge find roles in IT support, systems administration and network management across enterprises and government organisations.',
        jobs: ['Network Administrator', 'System Administrator', 'IT Support Engineer', 'Hardware & Networking Technician', 'Cloud Support Associate'],
      },
      {
        id: 'higher',
        title: 'Higher Studies',
        description: 'BCA is a direct pathway to advanced IT careers through further education and specialised postgraduate programmes.',
        jobs: ['MCA', 'M.Tech (CSE)', 'MBA (IT)', 'MSc Computer Science', 'PG Diploma in Data Science'],
      },
    ],
  },

  // ── MBA ────────────────────────────────────────────────────────────────────
  {
    name: 'MBA',
    slug: 'mba',
    duration: '2 Years',
    type: 'Online / Distance Degree',
    category: 'Post Graduate',
    level: 'Postgraduate',
    eligibility: 'Any Bachelor\'s Degree with minimum 50% marks',
    courseType: 'Management',
    image: '/images/hero-campus.png',
    brochure: '',
    description: 'Master of Business Administration (MBA) is a two-year postgraduate management programme that develops strategic thinking, leadership and analytical skills. GLA University\'s MBA is UGC-approved and NAAC-accredited, offering specialisations in Finance, Marketing, HR and Operations with a strong focus on industry relevance and career advancement.',
    highlights: [
      'UGC-approved & NAAC-accredited programme',
      'Specialisations in Finance, Marketing, HR, Operations & IT',
      'Live industry projects and case study methodology',
      'Globally recognised degree accepted by top employers',
      'Weekend/online classes — ideal for working professionals',
      'Dedicated placement cell with 500+ corporate tie-ups',
    ],
    fee: 85000,
    heroTitle: 'Top Career Opportunities after MBA',
    intro: 'An MBA opens doors to leadership roles across every major industry. Whether you specialise in Finance, Marketing, HR or Operations, the degree equips you with strategic thinking, analytical skills and business acumen that employers actively seek.',
    specializations: [
      {
        id: 'finance',
        title: 'Finance',
        description: 'MBA Finance graduates are among the most sought-after professionals in banking, investment and corporate finance. The curriculum covers financial modelling, risk management and capital markets, preparing you for high-impact roles in top financial institutions.',
        jobs: ['Financial Analyst', 'Investment Banker', 'Portfolio Manager', 'Risk Manager', 'Chief Financial Officer (CFO)', 'Credit Analyst', 'Treasury Manager', 'Wealth Manager'],
      },
      {
        id: 'marketing',
        title: 'Marketing',
        description: 'Marketing MBA graduates drive brand strategy, digital campaigns and customer acquisition for companies across FMCG, e-commerce, media and tech. With a strong foundation in consumer behaviour and data analytics, they shape how companies communicate and grow.',
        jobs: ['Brand Manager', 'Digital Marketing Manager', 'Product Marketing Manager', 'Market Research Analyst', 'Advertising Manager', 'Sales Manager', 'Content Strategy Lead', 'Growth Hacker'],
      },
      {
        id: 'hr',
        title: 'Human Resources',
        description: 'HR professionals trained at the MBA level take on strategic people-management roles. From talent acquisition to organisational development, they influence company culture and workforce planning at the highest level.',
        jobs: ['HR Manager', 'Talent Acquisition Specialist', 'Compensation & Benefits Manager', 'Learning & Development Manager', 'HR Business Partner', 'Organisational Development Consultant', 'Employee Relations Manager'],
      },
      {
        id: 'operations',
        title: 'Operations & Supply Chain',
        description: 'Operations MBA graduates optimise the backbone of any business — from manufacturing and logistics to procurement and quality management. They are critical to industries like retail, manufacturing, e-commerce and healthcare.',
        jobs: ['Operations Manager', 'Supply Chain Manager', 'Logistics Manager', 'Quality Assurance Manager', 'Procurement Manager', 'Plant Manager', 'Business Process Manager'],
      },
      {
        id: 'it',
        title: 'Information Technology',
        description: 'MBA in IT bridges business strategy and technology. Graduates are equipped to lead digital transformation projects, manage tech teams and align IT goals with business outcomes in consulting firms, tech companies and large enterprises.',
        jobs: ['IT Manager', 'IT Project Manager', 'Business Analyst', 'ERP Consultant', 'Systems Analyst', 'Technology Consultant', 'CTO (with experience)'],
      },
      {
        id: 'entrepreneurship',
        title: 'Entrepreneurship',
        description: 'MBA graduates with an entrepreneurship focus are equipped to launch startups, lead innovation within established companies, or advise businesses as consultants. They understand venture capital, product development and market entry strategy.',
        jobs: ['Startup Founder', 'Business Consultant', 'Venture Capital Analyst', 'Product Manager', 'Innovation Manager', 'Strategy Consultant'],
      },
    ],
  },

  // ── MCA ────────────────────────────────────────────────────────────────────
  {
    name: 'MCA',
    slug: 'mca',
    duration: '2 Years',
    type: 'Online / Distance Degree',
    category: 'Post Graduate',
    level: 'Postgraduate',
    eligibility: 'BCA / B.Sc (CS/IT) / Any Graduate with Mathematics',
    courseType: 'IT',
    image: '/images/student-laptop.png',
    brochure: '',
    description: 'Master of Computer Applications (MCA) is a two-year postgraduate programme that combines advanced programming, software engineering, cloud computing and AI to prepare graduates for senior roles in the IT industry. GLA University\'s MCA is UGC-approved with a curriculum designed in collaboration with industry experts from leading tech companies.',
    highlights: [
      'UGC-approved postgraduate IT programme',
      'Advanced training in Full Stack Development, AI/ML and Cloud Computing',
      'Industry-live projects and hackathon participation',
      'Placement assistance with 200+ IT company partners',
      'Flexible online mode — suitable for BCA/B.Sc graduates',
      'Strong alumni network in top MNCs like TCS, Infosys, Wipro & HCL',
    ],
    fee: 75000,
    heroTitle: 'Top Career Opportunities after MCA',
    intro: 'MCA (Master of Computer Applications) is one of the most career-oriented postgraduate degrees in India. It combines advanced programming, database management and software engineering to prepare graduates for the ever-growing IT industry.',
    specializations: [
      {
        id: 'software',
        title: 'Software Development',
        description: 'MCA graduates are highly skilled in full-stack development, mobile apps and enterprise software. They find roles in product companies, IT services firms and startups worldwide.',
        jobs: ['Software Engineer', 'Full Stack Developer', 'Mobile App Developer (Android/iOS)', 'Backend Developer', 'Frontend Developer', 'Java / Python / .NET Developer'],
      },
      {
        id: 'data',
        title: 'Data Science & Analytics',
        description: 'With strong programming and mathematics foundations, MCA graduates can transition into data-driven roles that are among the highest-paying in the tech industry.',
        jobs: ['Data Analyst', 'Data Scientist', 'Machine Learning Engineer', 'Business Intelligence Developer', 'Data Engineer', 'AI Research Associate'],
      },
      {
        id: 'cloud',
        title: 'Cloud & DevOps',
        description: 'Cloud computing and DevOps are transforming how companies deploy and manage software. MCA graduates with cloud certifications are in high demand across sectors.',
        jobs: ['Cloud Engineer', 'DevOps Engineer', 'AWS / Azure / GCP Solutions Architect', 'Site Reliability Engineer', 'Platform Engineer'],
      },
      {
        id: 'cybersecurity',
        title: 'Cybersecurity',
        description: 'As cyber threats grow, so does the demand for security experts. MCA graduates are well-positioned to enter the cybersecurity domain with additional certifications.',
        jobs: ['Cybersecurity Analyst', 'Ethical Hacker / Penetration Tester', 'Network Security Engineer', 'SOC Analyst', 'Information Security Manager'],
      },
      {
        id: 'management',
        title: 'IT Management & Consulting',
        description: 'MCA graduates with leadership skills move into management and consulting roles, bridging the gap between technical teams and business stakeholders.',
        jobs: ['IT Project Manager', 'Technical Consultant', 'Systems Analyst', 'ERP Consultant', 'IT Manager'],
      },
    ],
  },
];

// ── Run ───────────────────────────────────────────────────────────────────────
async function seed() {
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');

    const gla = await University.findOne({ $or: [{ code: 'GLA' }, { name: /GLA/i }] });
    if (!gla) { console.error('❌ GLA University not found. Please seed the university first.'); process.exit(1); }
    console.log(`✅ Found university: ${gla.name} (${gla._id})`);

    let added = 0, updated = 0;
    for (const prog of programs) {
      const doc = { ...prog, university: gla._id };
      const result = await Program.findOneAndUpdate(
        { slug: prog.slug },
        doc,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      const isNew = result.createdAt.getTime() === result.updatedAt.getTime();
      if (isNew) { added++; console.log(`  ➕ Added   : ${prog.name}`); }
      else        { updated++; console.log(`  ✏️  Updated : ${prog.name}`); }
    }

    console.log(`\n🎉 Done — ${added} added, ${updated} updated.`);
  } catch (err) {
    console.error('❌ Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
