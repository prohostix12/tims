export interface Specialization {
  id: string;
  title: string;
  description: string;
  jobs: string[];
}

export interface CoursePageData {
  heroTitle: string;
  intro: string;
  specializations: Specialization[];
}

const data: Record<string, CoursePageData> = {
  mba: {
    heroTitle: 'Top Career Opportunities after MBA',
    intro:
      'An MBA opens doors to leadership roles across every major industry. Whether you specialise in Finance, Marketing, HR or Operations, the degree equips you with strategic thinking, analytical skills and business acumen that employers actively seek.',
    specializations: [
      {
        id: 'finance',
        title: 'Finance',
        description:
          'MBA Finance graduates are among the most sought-after professionals in banking, investment and corporate finance. The curriculum covers financial modelling, risk management and capital markets, preparing you for high-impact roles in top financial institutions.',
        jobs: [
          'Financial Analyst',
          'Investment Banker',
          'Portfolio Manager',
          'Risk Manager',
          'Chief Financial Officer (CFO)',
          'Credit Analyst',
          'Treasury Manager',
          'Wealth Manager',
        ],
      },
      {
        id: 'marketing',
        title: 'Marketing',
        description:
          'Marketing MBA graduates drive brand strategy, digital campaigns and customer acquisition for companies across FMCG, e-commerce, media and tech. With a strong foundation in consumer behaviour and data analytics, they shape how companies communicate and grow.',
        jobs: [
          'Brand Manager',
          'Digital Marketing Manager',
          'Product Marketing Manager',
          'Market Research Analyst',
          'Advertising Manager',
          'Sales Manager',
          'Content Strategy Lead',
          'Growth Hacker',
        ],
      },
      {
        id: 'hr',
        title: 'Human Resources',
        description:
          'HR professionals trained at the MBA level take on strategic people-management roles. From talent acquisition to organisational development, they influence company culture and workforce planning at the highest level.',
        jobs: [
          'HR Manager',
          'Talent Acquisition Specialist',
          'Compensation & Benefits Manager',
          'Learning & Development Manager',
          'HR Business Partner',
          'Organisational Development Consultant',
          'Employee Relations Manager',
        ],
      },
      {
        id: 'operations',
        title: 'Operations & Supply Chain',
        description:
          'Operations MBA graduates optimise the backbone of any business — from manufacturing and logistics to procurement and quality management. They are critical to industries like retail, manufacturing, e-commerce and healthcare.',
        jobs: [
          'Operations Manager',
          'Supply Chain Manager',
          'Logistics Manager',
          'Quality Assurance Manager',
          'Procurement Manager',
          'Plant Manager',
          'Business Process Manager',
        ],
      },
      {
        id: 'it',
        title: 'Information Technology',
        description:
          'MBA in IT bridges business strategy and technology. Graduates are equipped to lead digital transformation projects, manage tech teams and align IT goals with business outcomes in consulting firms, tech companies and large enterprises.',
        jobs: [
          'IT Manager',
          'IT Project Manager',
          'Business Analyst',
          'ERP Consultant',
          'Systems Analyst',
          'Technology Consultant',
          'CTO (with experience)',
        ],
      },
      {
        id: 'entrepreneurship',
        title: 'Entrepreneurship',
        description:
          'MBA graduates with an entrepreneurship focus are equipped to launch startups, lead innovation within established companies, or advise businesses as consultants. They understand venture capital, product development and market entry strategy.',
        jobs: [
          'Startup Founder',
          'Business Consultant',
          'Venture Capital Analyst',
          'Product Manager',
          'Innovation Manager',
          'Strategy Consultant',
        ],
      },
    ],
  },

  mca: {
    heroTitle: 'Top Career Opportunities after MCA',
    intro:
      'MCA (Master of Computer Applications) is one of the most career-oriented postgraduate degrees in India. It combines advanced programming, database management and software engineering to prepare graduates for the ever-growing IT industry.',
    specializations: [
      {
        id: 'software',
        title: 'Software Development',
        description:
          'MCA graduates are highly skilled in full-stack development, mobile apps and enterprise software. They find roles in product companies, IT services firms and startups worldwide.',
        jobs: [
          'Software Engineer',
          'Full Stack Developer',
          'Mobile App Developer (Android/iOS)',
          'Backend Developer',
          'Frontend Developer',
          'Java/Python/.NET Developer',
        ],
      },
      {
        id: 'data',
        title: 'Data Science & Analytics',
        description:
          'With strong programming and mathematics foundations, MCA graduates can transition into data-driven roles that are among the highest-paying in the tech industry.',
        jobs: [
          'Data Analyst',
          'Data Scientist',
          'Machine Learning Engineer',
          'Business Intelligence Developer',
          'Data Engineer',
          'AI Research Associate',
        ],
      },
      {
        id: 'cloud',
        title: 'Cloud & DevOps',
        description:
          'Cloud computing and DevOps are transforming how companies deploy and manage software. MCA graduates with cloud certifications are in high demand across sectors.',
        jobs: [
          'Cloud Engineer',
          'DevOps Engineer',
          'AWS/Azure/GCP Solutions Architect',
          'Site Reliability Engineer',
          'Platform Engineer',
        ],
      },
      {
        id: 'cybersecurity',
        title: 'Cybersecurity',
        description:
          'As cyber threats grow, so does the demand for security experts. MCA graduates are well-positioned to enter the cybersecurity domain with additional certifications.',
        jobs: [
          'Cybersecurity Analyst',
          'Ethical Hacker / Penetration Tester',
          'Network Security Engineer',
          'SOC Analyst',
          'Information Security Manager',
        ],
      },
      {
        id: 'management',
        title: 'IT Management & Consulting',
        description:
          'MCA graduates with leadership skills move into management and consulting roles, bridging the gap between technical teams and business stakeholders.',
        jobs: [
          'IT Project Manager',
          'Technical Consultant',
          'Systems Analyst',
          'ERP Consultant',
          'IT Manager',
        ],
      },
    ],
  },

  mcom: {
    heroTitle: 'Top Career Opportunities after M.Com',
    intro:
      'M.Com (Master of Commerce) is the gateway to advanced careers in finance, accounting, taxation and academic research. It deepens your understanding of economic systems, business law and financial management.',
    specializations: [
      {
        id: 'accounting',
        title: 'Accounting & Auditing',
        description:
          'M.Com graduates are well-prepared for roles in statutory auditing, internal auditing and financial reporting, especially in conjunction with CA or CMA qualifications.',
        jobs: [
          'Chartered Accountant (with ICAI)',
          'Internal Auditor',
          'Statutory Auditor',
          'Financial Accountant',
          'Cost Accountant',
          'Audit Manager',
        ],
      },
      {
        id: 'taxation',
        title: 'Taxation & GST',
        description:
          'Taxation is a critical area for every business. M.Com graduates specialising in taxation handle GST compliance, income tax planning and regulatory filings for corporations and individuals.',
        jobs: [
          'Tax Consultant',
          'GST Practitioner',
          'Income Tax Officer (Govt)',
          'Tax Analyst',
          'Direct Tax Manager',
          'Indirect Tax Specialist',
        ],
      },
      {
        id: 'banking',
        title: 'Banking & Finance',
        description:
          'With a solid grounding in financial instruments and markets, M.Com graduates secure roles across banking, insurance and financial services.',
        jobs: [
          'Bank Officer / PO (after IBPS/SBI exam)',
          'Financial Analyst',
          'Investment Advisor',
          'Insurance Manager',
          'Treasury Analyst',
          'Loan Officer',
        ],
      },
      {
        id: 'academia',
        title: 'Teaching & Research',
        description:
          'M.Com with NET/SET qualification opens up a rewarding career in education. Commerce lecturers are in demand at degree colleges and universities across India.',
        jobs: [
          'Assistant Professor (Commerce)',
          'Commerce Lecturer',
          'Research Associate',
          'UGC-NET Qualified Faculty',
          'Academic Coordinator',
        ],
      },
    ],
  },

  bba: {
    heroTitle: 'Top Career Opportunities after BBA',
    intro:
      'BBA (Bachelor of Business Administration) equips graduates with a strong foundation in management principles. It opens up immediate career options in business, marketing and operations, or serves as a stepping stone to an MBA.',
    specializations: [
      {
        id: 'marketing',
        title: 'Sales & Marketing',
        description:
          'BBA graduates with a flair for communication and strategy find great opportunities in sales management, digital marketing and brand promotion across FMCG, retail and media.',
        jobs: [
          'Sales Executive',
          'Marketing Coordinator',
          'Digital Marketing Executive',
          'Brand Associate',
          'Business Development Executive',
          'Retail Manager',
        ],
      },
      {
        id: 'hr',
        title: 'Human Resources',
        description:
          'Entry-level HR roles are well-suited for BBA graduates. With experience and further education, they grow into strategic HR business partners.',
        jobs: [
          'HR Executive',
          'Recruiter / Talent Acquisition',
          'Payroll Executive',
          'Training Coordinator',
          'HR Assistant Manager',
        ],
      },
      {
        id: 'finance',
        title: 'Banking & Finance',
        description:
          'BBA graduates enter the banking sector through competitive exams or private bank recruitment drives, taking on roles in retail banking, insurance and financial advisory.',
        jobs: [
          'Banking Associate',
          'Insurance Advisor',
          'Financial Analyst (Junior)',
          'Accounts Executive',
          'Loan Officer',
        ],
      },
      {
        id: 'higher',
        title: 'Higher Studies',
        description:
          'Many BBA graduates choose to pursue higher education for better career prospects and specialisation.',
        jobs: ['MBA', 'PGDM', 'M.Com', 'CA Foundation', 'CFA', 'CMA'],
      },
    ],
  },

  bca: {
    heroTitle: 'Top Career Opportunities after BCA',
    intro:
      'BCA (Bachelor of Computer Applications) is the most popular undergraduate IT degree in India. It equips students with programming, networking and database skills, opening doors to the booming tech industry and higher studies like MCA or M.Tech.',
    specializations: [
      {
        id: 'software',
        title: 'Software Development',
        description:
          'BCA graduates are job-ready for entry-level development roles in IT companies, startups and product firms. With the right skills, they grow quickly into senior engineering positions.',
        jobs: [
          'Junior Software Developer',
          'Web Developer',
          'Mobile App Developer',
          'Python/Java Developer',
          'React/Angular Frontend Developer',
          'QA / Test Engineer',
        ],
      },
      {
        id: 'networking',
        title: 'Networking & Infrastructure',
        description:
          'BCA graduates with networking knowledge find roles in IT support, systems administration and network management across enterprises and government organisations.',
        jobs: [
          'Network Administrator',
          'System Administrator',
          'IT Support Engineer',
          'Hardware & Networking Technician',
          'Cloud Support Associate',
        ],
      },
      {
        id: 'higher',
        title: 'Higher Studies',
        description:
          'BCA is a direct pathway to advanced IT careers through further education.',
        jobs: ['MCA', 'M.Tech (CSE)', 'MBA (IT)', 'MSc Computer Science', 'PG Diploma in Data Science'],
      },
    ],
  },

  bcom: {
    heroTitle: 'Top Career Opportunities after B.Com',
    intro:
      'B.Com (Bachelor of Commerce) is one of the most versatile undergraduate degrees in India. It lays a strong foundation in accounting, finance and business law, opening up diverse career paths in commerce, banking and further professional qualifications.',
    specializations: [
      {
        id: 'accounting',
        title: 'Accounting & Finance',
        description:
          'B.Com graduates are ready for accounting roles in small, medium and large enterprises. Many pursue CA, CMA or CPA for global opportunities.',
        jobs: [
          'Accountant / Junior Accountant',
          'Accounts Executive',
          'Finance Analyst (Entry Level)',
          'Bookkeeper',
          'Payroll Executive',
          'CA Articleship (with ICAI)',
        ],
      },
      {
        id: 'banking',
        title: 'Banking & Insurance',
        description:
          'The banking sector recruits B.Com graduates through IBPS, SBI PO and other competitive exams, as well as through private bank campus drives.',
        jobs: [
          'Bank PO / Clerk (via IBPS/SBI)',
          'Insurance Agent / Manager',
          'Loan Officer',
          'Banking Associate',
          'Mutual Fund Executive',
        ],
      },
      {
        id: 'taxation',
        title: 'Taxation & GST',
        description:
          'Taxation offers steady, recession-proof careers. B.Com graduates with Tally, GST and income tax knowledge are in demand at CA firms and corporate finance teams.',
        jobs: [
          'Tax Assistant',
          'GST Executive',
          'TDS Manager',
          'Income Tax Practitioner',
          'Accounts & Tax Associate',
        ],
      },
      {
        id: 'higher',
        title: 'Higher Studies',
        description:
          'B.Com is an excellent springboard to professional qualifications and postgraduate degrees.',
        jobs: ['M.Com', 'MBA (Finance/Marketing)', 'CA', 'CMA', 'CS', 'CFA', 'ACCA'],
      },
    ],
  },

  'sslc-plus-two': {
    heroTitle: 'Top Career Opportunities after SSLC / Plus Two',
    intro:
      'SSLC and Plus Two mark critical turning points in a student\'s academic journey. The right choice of stream and course after 10th or 12th can shape a lifetime of career growth. Here are the most promising paths available to students.',
    specializations: [
      {
        id: 'science',
        title: 'Science Stream (PCM / PCB)',
        description:
          'Science stream students have access to the widest range of professional and technical courses. Engineering, medicine and pure sciences offer high-earning and prestigious careers.',
        jobs: [
          'Engineering (B.Tech / BE) — All branches',
          'MBBS / BDS / BAMS / BHMS',
          'B.Sc (Physics, Chemistry, Maths, Biology)',
          'B.Pharm / Pharm.D',
          'B.Sc Nursing',
          'Architecture (B.Arch)',
          'NDA / Indian Armed Forces',
        ],
      },
      {
        id: 'commerce',
        title: 'Commerce Stream',
        description:
          'Commerce stream opens up rewarding careers in business, finance, accounting and management through both degree courses and professional qualifications.',
        jobs: [
          'B.Com / B.Com (Hons)',
          'BBA / BMS',
          'CA Foundation (ICAI)',
          'CMA Foundation',
          'CS Foundation',
          'Bachelor of Economics',
          'BBA LLB',
        ],
      },
      {
        id: 'arts',
        title: 'Arts / Humanities Stream',
        description:
          'Arts students have diverse options in law, design, social sciences and government services. Many of India\'s top civil servants and lawyers come from humanities backgrounds.',
        jobs: [
          'BA (English, History, Political Science, Sociology)',
          'BA LLB / LLB',
          'B.Des (Design)',
          'BJMC (Journalism & Mass Communication)',
          'BA Psychology',
          'B.Ed (after graduation)',
          'UPSC / State PSC preparation',
        ],
      },
      {
        id: 'vocational',
        title: 'Vocational & Diploma Courses',
        description:
          'Short-term vocational and diploma courses offer fast entry into skilled jobs with strong earning potential.',
        jobs: [
          'Diploma in Engineering (Polytechnic)',
          'ITI Trades (Electrician, Fitter, Welder, etc.)',
          'Diploma in Hotel Management',
          'Diploma in Fashion Design',
          'Animation & Multimedia Diploma',
          'Digital Marketing Certification',
        ],
      },
    ],
  },

  ba: {
    heroTitle: 'Top Career Opportunities after BA',
    intro:
      'BA (Bachelor of Arts) is one of the most flexible undergraduate degrees available. It builds critical thinking, communication and research skills — qualities valued across government, media, education and the corporate world.',
    specializations: [
      {
        id: 'civil',
        title: 'Civil Services & Government Jobs',
        description:
          'BA graduates are among the most successful civil services aspirants. The humanities curriculum directly supports UPSC, State PSC and other government examinations.',
        jobs: [
          'IAS / IPS / IFS (UPSC)',
          'State Civil Service Officer',
          'Defence Officer (CDS/NDA)',
          'SSC CGL / CHSL Roles',
          'Bank PO (via IBPS)',
          'Railway / Post Office Officer',
        ],
      },
      {
        id: 'media',
        title: 'Media, Journalism & Communication',
        description:
          'BA graduates in English, Journalism or Mass Communication build careers in digital media, broadcasting and content creation — a rapidly growing field.',
        jobs: [
          'Journalist / Reporter',
          'Content Writer / Blogger',
          'Editor (Print / Digital)',
          'Public Relations Officer',
          'Social Media Manager',
          'Copywriter',
          'News Anchor (with training)',
        ],
      },
      {
        id: 'education',
        title: 'Teaching & Education',
        description:
          'BA + B.Ed qualifies graduates to teach at school level. With M.A. and NET/SET, they can become college lecturers — one of the most stable professions in India.',
        jobs: [
          'Primary / Secondary School Teacher (B.Ed required)',
          'Government School Teacher (TET/CTET)',
          'College Lecturer (MA + NET/SET)',
          'Tutor / Coaching Faculty',
          'Education Administrator',
        ],
      },
      {
        id: 'law',
        title: 'Law',
        description:
          'After BA, a 3-year LLB degree opens a broad legal career. Law graduates practice across corporate law, litigation, judiciary and policy.',
        jobs: [
          'Advocate / Litigation Lawyer',
          'Corporate Lawyer',
          'Legal Advisor',
          'Judicial Services Officer',
          'Legal Researcher',
          'Human Rights Lawyer',
        ],
      },
      {
        id: 'higher',
        title: 'Higher Studies',
        description:
          'BA graduates widely pursue postgraduate education for specialisation and better career prospects.',
        jobs: ['MA (any subject)', 'MBA', 'LLB', 'B.Ed + M.Ed', 'MSW (Social Work)', 'PGDM'],
      },
    ],
  },

  engineering: {
    heroTitle: 'Top Career Opportunities after B.Tech / M.Tech',
    intro:
      'Engineering graduates are among the most in-demand professionals globally. Whether you choose to join industry, pursue research or build your own startup, a B.Tech or M.Tech opens up world-class opportunities across every sector.',
    specializations: [
      {
        id: 'software',
        title: 'Software & IT',
        description:
          'The majority of engineering graduates, regardless of branch, find lucrative careers in the software industry. Top companies across India and abroad actively recruit engineering talent.',
        jobs: [
          'Software Engineer / Developer',
          'Full Stack Developer',
          'Data Scientist / ML Engineer',
          'Cloud Engineer',
          'DevOps Engineer',
          'Cybersecurity Analyst',
          'Product Manager',
        ],
      },
      {
        id: 'core',
        title: 'Core Engineering',
        description:
          'Core engineering roles in civil, mechanical, electrical and chemical sectors offer career paths in infrastructure, manufacturing, energy and government PSUs.',
        jobs: [
          'Civil Engineer (Construction / Infrastructure)',
          'Mechanical Engineer (Manufacturing / Automotive)',
          'Electrical Engineer (Power / Energy)',
          'Chemical Engineer (Oil & Gas / Pharma)',
          'PSU Officer (GATE — BHEL, ONGC, NTPC, etc.)',
        ],
      },
      {
        id: 'research',
        title: 'Research & Higher Studies',
        description:
          'Engineers with a passion for innovation pursue postgraduate research and academic careers that put them at the forefront of technology.',
        jobs: [
          'M.Tech / MS (India or Abroad)',
          'PhD / Research Scholar',
          'MBA (for management roles)',
          'GATE for PSUs and M.Tech admissions',
          'GRE/GMAT for international universities',
        ],
      },
      {
        id: 'govt',
        title: 'Government & Defence',
        description:
          'Engineering graduates are eligible for prestigious government and defence roles through competitive examinations.',
        jobs: [
          'IES (Indian Engineering Services)',
          'Defence Officer — Technical Branch (Army/Navy/Air Force)',
          'DRDO / ISRO Scientist',
          'PWD / CPWD Engineer',
          'State Government Engineer',
        ],
      },
      {
        id: 'entrepreneurship',
        title: 'Entrepreneurship & Startups',
        description:
          'India\'s startup ecosystem thrives on engineering talent. Many of the country\'s top founders and innovators come from engineering backgrounds.',
        jobs: [
          'Startup Co-Founder / CTO',
          'Product Designer',
          'Tech Lead',
          'Innovation Manager',
          'Freelance Developer / Consultant',
        ],
      },
    ],
  },
};

export function getCourseData(slug: string): CoursePageData | null {
  return data[slug] ?? null;
}
