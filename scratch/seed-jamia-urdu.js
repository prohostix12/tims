// seed-jamia-urdu.js
// Run with: node scratch/seed-jamia-urdu.js
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tims_db';

const universitySchema = new mongoose.Schema({
  name: String, code: String, description: String, location: String,
  establishedYear: Number, status: String, website: String, image: String,
  logo: String, ranking: String, accreditations: String, features: [String],
  facilities: [String], type: String, contactEmail: String, slug: String,
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
  // ── Secondary (10th) ──────────────────────────────────────────────────────────
  {
    name: 'Secondary (10th)',
    slug: 'jamia-urdu-secondary-10th',
    duration: '1 Year',
    type: 'Open School / Distance',
    category: 'SSLC',
    level: 'Secondary',
    eligibility: 'Students who have not passed 10th standard',
    courseType: 'Others',
    image: '/images/student_book_cutout.png',
    description: 'Secondary (10th) programme from Jamia Urdu, a Govt. Registered Minority Educational Institution. Offers 10th-level education in Urdu medium with subjects including Science, Mathematics, and Social Science. Course + Exam Fee: ₹19,000 | Processing Fee: ₹12,000.',
    highlights: [
      'Urdu',
      'Hindi / RL',
      'English',
      'Science',
      'Mathematics / Home Science',
      'Social Science',
    ],
    fee: 19000,
  },

  // ── Sr Secondary 12th Arts ────────────────────────────────────────────────────
  {
    name: 'Sr. Secondary 12th — Arts',
    slug: 'jamia-urdu-12th-arts',
    duration: '1 Year',
    type: 'Open School / Distance',
    category: '+2',
    level: 'Senior Secondary',
    eligibility: '10th Pass',
    courseType: 'Arts',
    image: '/images/student_book_cutout.png',
    description: 'Senior Secondary (12th) Arts stream from Jamia Urdu. Covers History, Geography and Political Science in Urdu medium. Course + Exam Fee: ₹20,000 | Processing Fee: ₹13,000.',
    highlights: [
      'Urdu',
      'Hindi / RL',
      'English',
      'History',
      'Geography',
      'Political Science',
    ],
    fee: 20000,
  },

  // ── Sr Secondary 12th Science ─────────────────────────────────────────────────
  {
    name: 'Sr. Secondary 12th — Science',
    slug: 'jamia-urdu-12th-science',
    duration: '1 Year',
    type: 'Open School / Distance',
    category: '+2',
    level: 'Senior Secondary',
    eligibility: '10th Pass',
    courseType: 'Science',
    image: '/images/student_book_cutout.png',
    description: 'Senior Secondary (12th) Science stream from Jamia Urdu. Covers Physics, Chemistry, and Mathematics/Biology in Urdu medium. Course + Exam Fee: ₹22,000 | Processing Fee: ₹13,000.',
    highlights: [
      'Urdu',
      'Hindi / RL',
      'English',
      'Physics',
      'Chemistry',
      'Mathematics / Biology',
    ],
    fee: 22000,
  },

  // ── Sr Secondary 12th Commerce ────────────────────────────────────────────────
  {
    name: 'Sr. Secondary 12th — Commerce',
    slug: 'jamia-urdu-12th-commerce',
    duration: '1 Year',
    type: 'Open School / Distance',
    category: '+2',
    level: 'Senior Secondary',
    eligibility: '10th Pass',
    courseType: 'Commerce',
    image: '/images/student_book_cutout.png',
    description: 'Senior Secondary (12th) Commerce stream from Jamia Urdu. Covers Economics, Commerce (Business Studies), and Accountancy in Urdu medium. Course + Exam Fee: ₹21,000 | Processing Fee: ₹13,000.',
    highlights: [
      'Urdu',
      'Hindi / RL',
      'English',
      'Economics',
      'Commerce (Business Studies)',
      'Accountancy',
    ],
    fee: 21000,
  },
];

async function seed() {
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');

    // Find or create Jamia Urdu university
    let jamia = await University.findOne({ $or: [{ code: 'JAMIA-URDU' }, { name: /Jamia Urdu/i }] });

    if (!jamia) {
      console.log('University not found — creating Jamia Urdu...');
      jamia = await University.create({
        name: 'Jamia Urdu',
        code: 'JAMIA-URDU',
        description: 'Jamia Urdu is a Govt. Registered Minority Educational Institution offering Secondary and Senior Secondary education in Urdu medium through open/distance mode.',
        location: 'India',
        type: 'Open School',
        status: 'active',
        slug: 'jamia-urdu',
        features: [
          'Govt. Registered Minority Institution',
          'Urdu Medium Education',
          'Open School / Distance Mode',
          'Secondary & Senior Secondary Programmes',
        ],
      });
      console.log(`✅ Created: ${jamia.name} (${jamia._id})`);
    } else {
      console.log(`✅ Found: ${jamia.name} (${jamia._id})`);
    }

    let added = 0, updated = 0;
    for (const prog of programs) {
      const doc = { ...prog, university: jamia._id };
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
