// seed-miu-programs.js
// Run with: node scratch/seed-miu-programs.js
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

const programs = [
  {
    name: 'BA',
    slug: 'miu-ba',
    duration: '3 Years',
    type: 'Credit Transfer',
    category: 'Degree',
    level: 'Undergraduate',
    eligibility: '10+2 (any stream)',
    courseType: 'Arts',
    image: '/images/student_book_cutout.png',
    description: 'Bachelor of Arts (BA) through MIU Credit Transfer programme — a flexible, UGC-recognised pathway for students to complete their undergraduate arts degree while earning academic credits recognised by Mangalayatan International University.',
    highlights: [
      'UGC-recognised Credit Transfer programme',
      'Flexible study schedule for working students',
      'Recognised degree for government and private sector jobs',
      'Wide range of arts subjects available',
    ],
    fee: 68000,
  },
  {
    name: 'MA',
    slug: 'miu-ma',
    duration: '2 Years',
    type: 'Credit Transfer',
    category: 'Post Graduate',
    level: 'Postgraduate',
    eligibility: 'Any Bachelor\'s Degree',
    courseType: 'Arts',
    image: '/images/student_book_cutout.png',
    description: 'Master of Arts (MA) through MIU Credit Transfer programme — a postgraduate arts degree offering advanced study in humanities and social sciences, with credits recognised by Mangalayatan International University.',
    highlights: [
      'UGC-recognised postgraduate programme',
      'Specialised humanities and social sciences curriculum',
      'Ideal for teaching and research careers',
      'Flexible credit transfer model',
    ],
    fee: 72000,
  },
  {
    name: 'M.Sc',
    slug: 'miu-msc',
    duration: '2 Years',
    type: 'Credit Transfer',
    category: 'Post Graduate',
    level: 'Postgraduate',
    eligibility: 'B.Sc or equivalent Bachelor\'s Degree',
    courseType: 'Science',
    image: '/images/student_book_cutout.png',
    description: 'Master of Science (M.Sc) through MIU Credit Transfer programme — a postgraduate science degree covering advanced topics in natural and applied sciences, recognised by Mangalayatan International University.',
    highlights: [
      'UGC-recognised postgraduate science degree',
      'Advanced curriculum in applied and natural sciences',
      'Research and industry-oriented coursework',
      'Credit transfer flexibility',
    ],
    fee: 85000,
  },
  {
    name: 'B.Sc',
    slug: 'miu-bsc',
    duration: '3 Years',
    type: 'Credit Transfer',
    category: 'Degree',
    level: 'Undergraduate',
    eligibility: '10+2 with Science (Physics/Chemistry/Maths/Biology)',
    courseType: 'Science',
    image: '/images/student_book_cutout.png',
    description: 'Bachelor of Science (B.Sc) through MIU Credit Transfer programme — an undergraduate science degree providing a strong foundation in mathematics, physics, chemistry or life sciences, with credits recognised by Mangalayatan International University.',
    highlights: [
      'UGC-recognised undergraduate science degree',
      'Strong foundation in core science subjects',
      'Pathway to M.Sc, MBA or IT careers',
      'Flexible credit transfer model',
    ],
    fee: 85000,
  },
  {
    name: 'MBA',
    slug: 'miu-mba',
    duration: '2 Years',
    type: 'Credit Transfer',
    category: 'Post Graduate',
    level: 'Postgraduate',
    eligibility: 'Any Bachelor\'s Degree with minimum 50% marks',
    courseType: 'Management',
    image: '/images/hero-campus.png',
    description: 'Master of Business Administration (MBA) through MIU Credit Transfer programme — a postgraduate management degree developing leadership, strategic thinking and business management skills, recognised by Mangalayatan International University.',
    highlights: [
      'UGC-recognised MBA programme',
      'Specialisations in Finance, Marketing, HR and Operations',
      'Industry-oriented curriculum',
      'Ideal for working professionals seeking career advancement',
    ],
    fee: 97000,
  },
  {
    name: 'BBA',
    slug: 'miu-bba',
    duration: '3 Years',
    type: 'Credit Transfer',
    category: 'Degree',
    level: 'Undergraduate',
    eligibility: '10+2 (any stream)',
    courseType: 'Management',
    image: '/images/hero-campus.png',
    description: 'Bachelor of Business Administration (BBA) through MIU Credit Transfer programme — an undergraduate management degree building foundational skills in business, marketing, finance and human resources, recognised by Mangalayatan International University.',
    highlights: [
      'UGC-recognised undergraduate management degree',
      'Core subjects in marketing, finance and HR',
      'Direct pathway to MBA',
      'Flexible credit transfer model',
    ],
    fee: 85000,
  },
  {
    name: 'B.Com',
    slug: 'miu-bcom',
    duration: '3 Years',
    type: 'Credit Transfer',
    category: 'Degree',
    level: 'Undergraduate',
    eligibility: '10+2 (any stream)',
    courseType: 'Commerce',
    image: '/images/student_book_cutout.png',
    description: 'Bachelor of Commerce (B.Com) through MIU Credit Transfer programme — a three-year undergraduate commerce degree covering accounting, taxation, finance and business law, recognised by Mangalayatan International University.',
    highlights: [
      'UGC-recognised undergraduate commerce degree',
      'Covers accounting, taxation and business law',
      'Foundation for CA, CMA and MBA',
      'Flexible credit transfer model',
    ],
    fee: 72500,
  },
  {
    name: 'M.Com',
    slug: 'miu-mcom',
    duration: '2 Years',
    type: 'Credit Transfer',
    category: 'Post Graduate',
    level: 'Postgraduate',
    eligibility: 'B.Com or equivalent Bachelor\'s Degree',
    courseType: 'Commerce',
    image: '/images/student_book_cutout.png',
    description: 'Master of Commerce (M.Com) through MIU Credit Transfer programme — a postgraduate commerce degree providing advanced knowledge in accounting, finance, economics and taxation, recognised by Mangalayatan International University.',
    highlights: [
      'UGC-recognised postgraduate commerce degree',
      'Advanced accounting, finance and taxation curriculum',
      'Opens pathway to Ph.D and teaching careers',
      'Credit transfer flexibility',
    ],
    fee: 75000,
  },
  {
    name: 'BCA',
    slug: 'miu-bca',
    duration: '3 Years',
    type: 'Credit Transfer',
    category: 'Degree',
    level: 'Undergraduate',
    eligibility: '10+2 with Mathematics',
    courseType: 'IT',
    image: '/images/student-laptop.png',
    description: 'Bachelor of Computer Applications (BCA) through MIU Credit Transfer programme — an undergraduate IT degree covering programming, software development, database management and networking, recognised by Mangalayatan International University.',
    highlights: [
      'UGC-recognised undergraduate IT degree',
      'Programming in Python, Java and Web Technologies',
      'Database and networking fundamentals',
      'Pathway to MCA and senior IT roles',
    ],
    fee: 95000,
  },
  {
    name: 'MCA',
    slug: 'miu-mca',
    duration: '2 Years',
    type: 'Credit Transfer',
    category: 'Post Graduate',
    level: 'Postgraduate',
    eligibility: 'BCA / B.Sc (CS/IT) / Any Graduate with Mathematics',
    courseType: 'IT',
    image: '/images/student-laptop.png',
    description: 'Master of Computer Applications (MCA) through MIU Credit Transfer programme — an advanced postgraduate IT degree covering full-stack development, cloud computing and AI, recognised by Mangalayatan International University.',
    highlights: [
      'UGC-recognised postgraduate IT degree',
      'Advanced programming and software engineering',
      'AI/ML and cloud computing curriculum',
      'High placement potential in top IT companies',
    ],
    fee: 90000,
  },
  {
    name: 'Diploma Engineering',
    slug: 'miu-diploma-engineering',
    duration: '3 Years',
    type: 'Credit Transfer',
    category: 'Diploma',
    level: 'Diploma',
    eligibility: '10th Pass (SSLC/SSC)',
    courseType: 'Others',
    image: '/images/student_book_cutout.png',
    description: 'Diploma in Engineering through MIU Credit Transfer programme — a technical diploma equipping students with practical engineering skills across multiple disciplines, recognised by Mangalayatan International University.',
    highlights: [
      'UGC-recognised technical diploma',
      'Practical engineering skills training',
      'Lateral entry pathway to B.Tech',
      'Affordable fee with credit transfer flexibility',
    ],
    fee: 119000,
  },
  {
    name: 'B.Tech',
    slug: 'miu-btech',
    duration: '4 Years',
    type: 'Credit Transfer',
    category: 'Degree',
    level: 'Undergraduate',
    eligibility: '10+2 with Physics, Chemistry and Mathematics',
    courseType: 'Others',
    image: '/images/student_book_cutout.png',
    description: 'Bachelor of Technology (B.Tech) through MIU Credit Transfer programme — a four-year undergraduate engineering degree covering core and applied engineering disciplines, recognised by Mangalayatan International University.',
    highlights: [
      'UGC-recognised undergraduate engineering degree',
      'Core engineering disciplines with practical training',
      'Pathway to M.Tech and industry engineering roles',
      'Credit transfer model for working students',
    ],
    fee: 185000,
  },
  {
    name: 'B.Tech (Lateral Entry)',
    slug: 'miu-btech-lateral',
    duration: '3 Years',
    type: 'Credit Transfer',
    category: 'Degree',
    level: 'Undergraduate',
    eligibility: 'Diploma in Engineering (3-year)',
    courseType: 'Others',
    image: '/images/student_book_cutout.png',
    description: 'Bachelor of Technology — Lateral Entry through MIU Credit Transfer programme — a three-year B.Tech pathway for Diploma holders, allowing direct admission into the second year, recognised by Mangalayatan International University.',
    highlights: [
      'UGC-recognised lateral entry B.Tech pathway',
      'Direct admission to 2nd year for Diploma holders',
      'Complete B.Tech in 3 years instead of 4',
      'Recognised for government and private engineering roles',
    ],
    fee: 185000,
  },
  {
    name: 'M.Tech',
    slug: 'miu-mtech',
    duration: '2 Years',
    type: 'Credit Transfer',
    category: 'Post Graduate',
    level: 'Postgraduate',
    eligibility: 'B.Tech / B.E. or equivalent engineering degree',
    courseType: 'Others',
    image: '/images/student_book_cutout.png',
    description: 'Master of Technology (M.Tech) through MIU Credit Transfer programme — a postgraduate engineering degree providing specialised knowledge in advanced engineering domains, recognised by Mangalayatan International University.',
    highlights: [
      'UGC-recognised postgraduate engineering degree',
      'Advanced specialisation in engineering disciplines',
      'Research and industry-focused curriculum',
      'Gateway to senior engineering and teaching positions',
    ],
    fee: 185000,
  },
];

async function seed() {
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');

    const miu = await University.findOne({ $or: [{ code: 'MIU' }, { name: /MIU|Mangalayatan International/i }] });
    if (!miu) {
      console.error('❌ MIU University not found. Please ensure the university is seeded first.');
      process.exit(1);
    }
    console.log(`✅ Found university: ${miu.name} (${miu._id})`);

    let added = 0, updated = 0;
    for (const prog of programs) {
      const doc = { ...prog, university: miu._id };
      const result = await Program.findOneAndUpdate(
        { slug: prog.slug },
        doc,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      const isNew = result.createdAt.getTime() === result.updatedAt.getTime();
      if (isNew) { added++; console.log(`  ➕ Added   : ${prog.name} (₹${prog.fee.toLocaleString('en-IN')})`); }
      else        { updated++; console.log(`  ✏️  Updated : ${prog.name} (₹${prog.fee.toLocaleString('en-IN')})`); }
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
