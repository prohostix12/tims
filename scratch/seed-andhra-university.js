// Seed Andhra University + all programs from fee PDF
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const uniSchema = new mongoose.Schema({}, { strict: false });
const programSchema = new mongoose.Schema({}, { strict: false });
const University = mongoose.models.University || mongoose.model('University', uniSchema, 'universities');
const Program = mongoose.models.Program || mongoose.model('Program', programSchema, 'programs');

const UNI_DATA = {
  name: 'Andhra University',
  code: 'AU',
  type: 'Public',
  location: 'Visakhapatnam, Andhra Pradesh',
  website: 'https://www.andhrauniversity.edu.in',
  contactEmail: 'admissions@andhrauniversity.edu.in',
  description: 'Andhra University, established in 1926, is one of the oldest and most reputed public universities in India. Accredited with NAAC \'A\' Grade and ISO 9001:2015 certified, it offers a wide range of undergraduate, postgraduate, and doctoral programmes across arts, science, commerce, engineering, and professional disciplines.',
  accreditations: 'NAAC A Grade,ISO 9001:2015,UGC Recognised,AIU Member',
  ranking: 'NIRF Ranked | Top University in Andhra Pradesh',
  establishedYear: 1926,
  logo: 'https://upload.wikimedia.org/wikipedia/en/9/97/Andhra_University_logo.png',
  image: 'https://www.andhrauniversity.edu.in/images/AU-Campus.jpg',
  highlights: ['NAAC A Grade', 'ISO 9001:2015 Certified', 'Est. 1926', 'Online & Distance Education'],
};

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ MongoDB connected');

  // 1. Upsert Andhra University (avoid code collision)
  let uni = await University.findOneAndUpdate(
    { name: /andhra university/i },
    { $set: { ...UNI_DATA, code: 'ANDHRA-AU' } },
    { upsert: true, new: true }
  );
  console.log('✅ Upserted Andhra University:', uni._id);

  const UNI_OBJ = uni._id;

  // ─── program helpers ─────────────────────────────────────────
  const ba = (slug, spec, fee = 46000) => ({
    slug, fee, university: UNI_OBJ,
    name: `BA ${spec}`,
    duration: '3 Years', type: 'Degree', category: 'Degree',
    level: 'Undergraduate',
    eligibility: '10+2 in any stream with minimum 45% marks',
    courseType: 'Arts',
    image: '/images/student_book_cutout.png', brochure: '',
    description: `Online BA ${spec} from Andhra University is a three-year undergraduate programme delivered through distance/online mode. Accredited with NAAC 'A' Grade, it offers a flexible path to earn a UGC-recognised degree in ${spec}.`,
    highlights: ['NAAC A Grade Accredited', 'UGC Recognised Online Degree', 'Flexible Distance Learning', 'Affordable Fee Structure', 'Eligible for Government Jobs'],
    heroTitle: `Shape Your Future with BA ${spec}`,
    intro: `Andhra University's online BA ${spec} programme combines rigorous academic content with the flexibility of distance learning. Students receive study materials, access online lectures, and appear for university-supervised examinations to earn a fully recognised degree.`,
  });

  const ma = (slug, name, spec, fee, courseType = 'Arts') => ({
    slug, fee, university: UNI_OBJ,
    name,
    duration: '2 Years', type: 'Post Graduate', category: 'Post Graduate',
    level: 'Postgraduate',
    eligibility: "Any Bachelor's degree with minimum 50% marks",
    courseType,
    image: '/images/student_book_cutout.png', brochure: '',
    description: `${name} from Andhra University is a two-year postgraduate programme offered through distance/online mode. NAAC 'A' Grade accredited and UGC recognised, it provides advanced study in ${spec} for working professionals and graduates seeking career advancement.`,
    highlights: ['NAAC A Grade Accredited', 'UGC Recognised PG Degree', 'Online / Distance Mode', 'Experienced Faculty', 'Eligible for Lectureship / NET'],
    heroTitle: `Advance Your Career with ${name}`,
    intro: `Andhra University's ${name} programme offers in-depth knowledge in ${spec} through a structured distance-learning framework. Graduates are prepared for academic roles, civil services, and professional careers in their respective fields.`,
  });

  // ─── programs list ────────────────────────────────────────────
  const programs = [

    // ── BA PROGRAMMES (Online, fee 46,000 total) ──
    {
      ...ba('au-ba-history', 'History'),
      specializations: [
        { id: 'ancient', title: 'Ancient & Medieval History', description: 'Indus Valley Civilisation, Vedic Age, Mauryan empire, Gupta period, and the Delhi Sultanate through primary and secondary sources.', jobs: ['Historian', 'Archaeologist', 'Museum Curator', 'Civil Services Officer'] },
        { id: 'modern', title: 'Modern Indian History', description: 'Colonial India, the freedom struggle, partition, and post-independence developments with critical historiographical analysis.', jobs: ['Teacher', 'Heritage Consultant', 'Journalist', 'Research Assistant'] },
      ],
    },
    {
      ...ba('au-ba-economics', 'Economics'),
      courseType: 'Commerce',
      specializations: [
        { id: 'micro', title: 'Micro & Macroeconomics', description: 'Price theory, market structures, national income accounting, monetary policy, and fiscal policy frameworks.', jobs: ['Economic Analyst', 'Bank Officer', 'Policy Researcher', 'Data Analyst'] },
        { id: 'development', title: 'Development Economics', description: 'Indian economic planning, poverty, agriculture, international trade, and economic reforms post-1991.', jobs: ['Government Economist', 'NGO Analyst', 'Rural Development Officer', 'Financial Advisor'] },
      ],
    },
    {
      ...ba('au-ba-political-science', 'Political Science'),
      specializations: [
        { id: 'indian-polity', title: 'Indian Polity & Constitution', description: 'Structure of the Indian Constitution, fundamental rights, Directive Principles, Parliament, and the federal system.', jobs: ['IAS/IPS Officer', 'Political Analyst', 'Administrative Officer', 'Legal Advisor'] },
        { id: 'ir', title: 'International Relations', description: 'India\'s foreign policy, global organisations, cold war history, and contemporary geopolitics.', jobs: ['Diplomat', 'Foreign Affairs Officer', 'Journalist', 'Policy Analyst'] },
      ],
    },

    // ── B.COM (fee 49,000 total) ──
    {
      slug: 'au-bcom',
      name: 'Bachelor of Commerce (B.Com)',
      university: UNI_OBJ,
      duration: '3 Years', type: 'Degree', category: 'Degree',
      level: 'Undergraduate',
      eligibility: '10+2 in Commerce / any stream with minimum 45% marks',
      courseType: 'Commerce', fee: 49000,
      image: '/images/student_book_cutout.png', brochure: '',
      description: "B.Com from Andhra University is a three-year online/distance undergraduate programme accredited with NAAC 'A' Grade, covering accountancy, taxation, business law, economics, and management fundamentals.",
      highlights: ["NAAC A Grade Accredited", "UGC Recognised Degree", "Flexible Online Mode", "CA/CMA Foundation Pathway", "Placement & Career Support"],
      heroTitle: "Build a Strong Commerce Foundation — B.Com at Andhra University",
      intro: "Andhra University's B.Com programme offers a thorough grounding in financial accounting, business mathematics, taxation, and commerce law. Delivered through a flexible distance-learning model, it is ideal for working students and those preparing for professional certifications like CA and CMA.",
      specializations: [
        { id: 'accounting', title: 'Accountancy & Taxation', description: 'Advanced financial accounting, cost accounting, GST, income tax, and financial statement analysis.', jobs: ['Accountant', 'Tax Consultant', 'Audit Assistant', 'Finance Executive'] },
        { id: 'commerce-management', title: 'Commerce & Business Law', description: 'Company law, commercial law, banking theory, and principles of business management.', jobs: ['Company Secretary (Foundation)', 'Banking Officer', 'Legal Compliance Officer', 'Business Administrator'] },
      ],
    },

    // ── M.COM (fee 38,000 total) ──
    {
      ...ma('au-mcom', 'Master of Commerce (M.Com)', 'advanced accountancy and business finance', 38000, 'Commerce'),
      specializations: [
        { id: 'advanced-accounting', title: 'Advanced Accounting & Auditing', description: 'Corporate accounting, IFRS, internal audit, forensic accounting, and financial reporting standards.', jobs: ['Senior Accountant', 'Internal Auditor', 'Finance Manager', 'Tax Manager'] },
        { id: 'taxation-law', title: 'Taxation & Corporate Law', description: 'Direct and indirect tax, GST, company law, and compliance management for commerce professionals.', jobs: ['Tax Consultant', 'Compliance Officer', 'GST Practitioner', 'Company Secretary'] },
      ],
    },

    // ── MA POLITICAL SCIENCE (fee 38,000) ──
    {
      ...ma('au-ma-political-science', 'M.A. Political Science', 'political theory, governance, and international relations', 38000),
      specializations: [
        { id: 'political-theory', title: 'Political Theory & Indian Polity', description: 'Comparative politics, democratic theory, federalism, constitutional amendments, and political ideologies.', jobs: ['Lecturer', 'IAS Officer', 'Political Consultant', 'Policy Researcher'] },
        { id: 'ir', title: 'International Relations', description: 'India\'s foreign policy, UN system, South Asian geopolitics, and global security studies.', jobs: ['Diplomat', 'Foreign Policy Analyst', 'Think Tank Researcher', 'Journalist'] },
      ],
    },

    // ── MA ENGLISH (fee 38,000) ──
    {
      ...ma('au-ma-english', 'M.A. English', 'English literature and cultural theory', 38000),
      specializations: [
        { id: 'literature', title: 'British & Postcolonial Literature', description: 'Victorian, Modernist, and postcolonial texts with critical theory — feminism, poststructuralism, and cultural studies.', jobs: ['English Lecturer', 'Editor', 'Content Writer', 'Literary Researcher'] },
        { id: 'language', title: 'Language & Communication', description: 'Applied linguistics, ELT methodology, communication skills, and professional English for academic and corporate contexts.', jobs: ['Corporate Trainer', 'Language Teacher', 'Copywriter', 'Media Professional'] },
      ],
    },

    // ── MA ECONOMICS (fee 38,000) ──
    {
      ...ma('au-ma-economics', 'M.A. Economics', 'advanced economic theory and applied economics', 38000, 'Commerce'),
      specializations: [
        { id: 'theory', title: 'Economic Theory & Econometrics', description: 'Advanced micro/macroeconomics, game theory, econometric modelling, and quantitative research methods.', jobs: ['Economist', 'Policy Analyst', 'Research Fellow', 'University Lecturer'] },
        { id: 'development', title: 'Development & Agricultural Economics', description: 'Indian economic planning, rural development, poverty alleviation, and environmental economics.', jobs: ['Development Economist', 'NABARD Officer', 'Government Economist', 'NGO Researcher'] },
      ],
    },

    // ── MA HRM (fee 46,000) ──
    {
      ...ma('au-ma-hrm', 'M.A. Human Resource Management', 'human resources, organisational behaviour, and labour relations', 46000, 'Management'),
      specializations: [
        { id: 'talent', title: 'Talent & Performance Management', description: 'Recruitment strategy, performance appraisal systems, succession planning, and compensation design.', jobs: ['HR Manager', 'Talent Acquisition Lead', 'Performance Analyst', 'HRBP'] },
        { id: 'labour-relations', title: 'Labour Laws & Industrial Relations', description: 'Indian labour legislation, trade union dynamics, collective bargaining, and dispute resolution.', jobs: ['Labour Law Consultant', 'Industrial Relations Officer', 'HR Compliance Manager', 'OD Consultant'] },
      ],
    },

    // ── MA JMC (fee 42,000) ──
    {
      ...ma('au-ma-jmc', 'M.A. Journalism and Mass Communication', 'journalism, media studies, and digital communication', 42000),
      specializations: [
        { id: 'journalism', title: 'Journalism & Media Writing', description: 'News reporting, investigative journalism, feature writing, and media ethics for print and digital platforms.', jobs: ['News Reporter', 'Editor', 'Content Strategist', 'Correspondent'] },
        { id: 'digital-media', title: 'Digital & Broadcast Media', description: 'Social media management, video journalism, OTT content production, and media research methods.', jobs: ['Digital Journalist', 'Social Media Manager', 'Video Editor', 'Media Researcher'] },
      ],
    },
  ];

  // 2. Seed programs
  let added = 0, updated = 0;
  for (const prog of programs) {
    const existing = await Program.findOne({ slug: prog.slug });
    if (existing) {
      await Program.findByIdAndUpdate(existing._id, prog);
      console.log(`  ✏️  Updated : ${prog.name}`);
      updated++;
    } else {
      await Program.create(prog);
      console.log(`  ➕ Added   : ${prog.name}`);
      added++;
    }
  }

  console.log(`\n🎉 Done — ${added} added, ${updated} updated.`);
  await mongoose.disconnect();
}

run().catch(err => { console.error(err); process.exit(1); });
