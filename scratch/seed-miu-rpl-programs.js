// seed-miu-rpl-programs.js — Manipur International University RPL
// Run with: node scratch/seed-miu-rpl-programs.js
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
  fee: { type: Number, default: 0 },
}, { timestamps: true });

const University = mongoose.models.University || mongoose.model('University', universitySchema);
const Program    = mongoose.models.Program    || mongoose.model('Program',    programSchema);

// Helper: turn "Marketing Management" → "marketing-management"
function toSlug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ── Build all programs ──────────────────────────────────────────────────────────

// BA — Bachelor of Arts (Combination of any Three subjects)
const BA_STREAMS = ['Political Science','History','Geography','Sociology','English','Hindi','Sanskrit','Philosophy','Mathematics'];
const ba = BA_STREAMS.map(s => ({
  name: `BA (${s})`,
  slug: `miu-rpl-ba-${toSlug(s)}`,
  duration: '6 Months', type: 'RPL / Recognition of Prior Learning',
  category: 'Degree', level: 'Undergraduate',
  eligibility: '10+2',
  courseType: 'Arts',
  description: `Bachelor of Arts — ${s} from Manipur International University (RPL programme). Combination of any three subjects. Student Fee: ₹48,500 | Processing: ₹28,000.`,
  highlights: ['Combination of any Three Subjects', 'Political Science', 'History', 'Geography', 'Sociology', 'English', 'Hindi', 'Sanskrit', 'Philosophy', 'Mathematics'],
  fee: 48500,
}));

// MA — Master of Arts
const MA_STREAMS = ['Economics','English','Geography','Hindi','History','Home Science','Psychology','Public Administration','Political Science','Social Science','Sociology'];
const ma = MA_STREAMS.map(s => ({
  name: `MA (${s})`,
  slug: `miu-rpl-ma-${toSlug(s)}`,
  duration: '6 Months', type: 'RPL / Recognition of Prior Learning',
  category: 'Post Graduate', level: 'Postgraduate',
  eligibility: 'Graduation',
  courseType: 'Arts',
  description: `Master of Arts — ${s} from Manipur International University (RPL programme). Student Fee: ₹55,000 | Processing: ₹32,500.`,
  highlights: [s],
  fee: 55000,
}));

// MBA — Master of Business Administration
const MBA_STREAMS = [
  'Supply Chain Management','Event Management','Fire And Safety Management',
  'Hospital and Health Care Management','Hotel Management',
  'Hotel Management, Hospitality & Tourism','Agribusiness Management',
  'Aviation','Advertising Management','Banking & Finance','E-Commerce',
  'Finance','Human Resource','Information Technology','International Business',
  'Marketing Management','Operation Management','Pharmaceutical Management',
  'Production Management','Project Management','Retail Management',
  'Digital Marketing Management',
];
const mba = MBA_STREAMS.map(s => ({
  name: `MBA (${s})`,
  slug: `miu-rpl-mba-${toSlug(s)}`,
  duration: '6 Months', type: 'RPL / Recognition of Prior Learning',
  category: 'Post Graduate', level: 'Postgraduate',
  eligibility: 'Graduation in any discipline',
  courseType: 'Management',
  description: `Master of Business Administration — ${s} from Manipur International University (RPL programme). Student Fee: ₹85,000 | Processing: ₹50,000.`,
  highlights: [s],
  fee: 85000,
}));

// BBA — Bachelor of Business Administration
const bba = [{
  name: 'BBA (General)',
  slug: 'miu-rpl-bba-general',
  duration: '6 Months', type: 'RPL / Recognition of Prior Learning',
  category: 'Degree', level: 'Undergraduate',
  eligibility: '10+2 or equivalent',
  courseType: 'Management',
  description: 'Bachelor of Business Administration (General) from Manipur International University (RPL programme). Student Fee: ₹56,000 | Processing: ₹33,000.',
  highlights: ['General'],
  fee: 56000,
}];

// BCOM — Bachelor of Commerce
const bcom = [{
  name: 'B.Com (General)',
  slug: 'miu-rpl-bcom-general',
  duration: '6 Months', type: 'RPL / Recognition of Prior Learning',
  category: 'Degree', level: 'Undergraduate',
  eligibility: '10+2 or equivalent',
  courseType: 'Commerce',
  description: 'Bachelor of Commerce (General) from Manipur International University (RPL programme). Student Fee: ₹53,000 | Processing: ₹30,000.',
  highlights: ['General'],
  fee: 53000,
}];

// MCOM — Master of Commerce
const mcom = [{
  name: 'M.Com (General)',
  slug: 'miu-rpl-mcom-general',
  duration: '6 Months', type: 'RPL / Recognition of Prior Learning',
  category: 'Post Graduate', level: 'Postgraduate',
  eligibility: 'B.Com or equivalent',
  courseType: 'Commerce',
  description: 'Master of Commerce (General) from Manipur International University (RPL programme). Student Fee: ₹53,500 | Processing: ₹31,000.',
  highlights: ['General'],
  fee: 53500,
}];

// MSC (Science streams)
const MSC_SCI_STREAMS = ['Chemistry','Physics','Mathematics','Environmental Science','Botany','Zoology'];
const mscSci = MSC_SCI_STREAMS.map(s => ({
  name: `M.Sc (${s})`,
  slug: `miu-rpl-msc-${toSlug(s)}`,
  duration: '6 Months', type: 'RPL / Recognition of Prior Learning',
  category: 'Post Graduate', level: 'Postgraduate',
  eligibility: 'Graduation with respective subjects',
  courseType: 'Science',
  description: `Master of Science — ${s} from Manipur International University (RPL programme). Student Fee: ₹64,400 | Processing: ₹36,000.`,
  highlights: [s],
  fee: 64400,
}));

// BSC General
const BSC_GEN_STREAMS = ['Chemistry','Physics','Mathematics','Environmental Science'];
const bscGen = BSC_GEN_STREAMS.map(s => ({
  name: `B.Sc General (${s})`,
  slug: `miu-rpl-bsc-gen-${toSlug(s)}`,
  duration: '6 Months', type: 'RPL / Recognition of Prior Learning',
  category: 'Degree', level: 'Undergraduate',
  eligibility: '10+2 with respective subjects',
  courseType: 'Science',
  description: `Bachelor of Science (General) — ${s} from Manipur International University (RPL programme). Student Fee: ₹60,500 | Processing: ₹31,000.`,
  highlights: [s],
  fee: 60500,
}));

// BSC-IT
const BSC_IT_STREAMS = ['Science','Botany','Zoology'];
const bscIt = BSC_IT_STREAMS.map(s => ({
  name: `B.Sc IT (${s})`,
  slug: `miu-rpl-bscit-${toSlug(s)}`,
  duration: '6 Months', type: 'RPL / Recognition of Prior Learning',
  category: 'Degree', level: 'Undergraduate',
  eligibility: '10+2 with respective subjects',
  courseType: 'Science',
  description: `Bachelor of Science (IT) — ${s} from Manipur International University (RPL programme). Student Fee: ₹61,500 | Processing: ₹36,000.`,
  highlights: [s],
  fee: 61500,
}));

// BCA
const bca = [{
  name: 'BCA (General)',
  slug: 'miu-rpl-bca-general',
  duration: '6 Months', type: 'RPL / Recognition of Prior Learning',
  category: 'Degree', level: 'Undergraduate',
  eligibility: '10+2 with Maths or equivalent',
  courseType: 'IT',
  description: 'Bachelor of Computer Application (General) from Manipur International University (RPL programme). Student Fee: ₹64,500 | Processing: ₹42,000.',
  highlights: ['General'],
  fee: 64500,
}];

// MCA
const mca = [{
  name: 'MCA (General)',
  slug: 'miu-rpl-mca-general',
  duration: '6 Months', type: 'RPL / Recognition of Prior Learning',
  category: 'Post Graduate', level: 'Postgraduate',
  eligibility: 'Graduation in Relevant Stream',
  courseType: 'IT',
  description: 'Master of Computer Application (General) from Manipur International University (RPL programme). Student Fee: ₹66,000 | Processing: ₹42,000.',
  highlights: ['General'],
  fee: 66000,
}];

// BSc (CS/IT)
const BSC_CS_STREAMS = ['Computer Science','Information Technology'];
const bscCS = BSC_CS_STREAMS.map(s => ({
  name: `B.Sc (${s})`,
  slug: `miu-rpl-bsc-cs-${toSlug(s)}`,
  duration: '6 Months', type: 'RPL / Recognition of Prior Learning',
  category: 'Degree', level: 'Undergraduate',
  eligibility: '10+2 with Maths, min 50% marks',
  courseType: 'IT',
  description: `Bachelor of Science — ${s} from Manipur International University (RPL programme). Student Fee: ₹64,000 | Processing: ₹42,000.`,
  highlights: [s],
  fee: 64000,
}));

// MSc (CS/IT)
const MSC_CS_STREAMS = ['Computer Science','Information Technology'];
const mscCS = MSC_CS_STREAMS.map(s => ({
  name: `M.Sc (${s})`,
  slug: `miu-rpl-msc-cs-${toSlug(s)}`,
  duration: '6 Months', type: 'RPL / Recognition of Prior Learning',
  category: 'Post Graduate', level: 'Postgraduate',
  eligibility: 'B. Tech / B.Sc (IT/CS) / PGDCA',
  courseType: 'IT',
  description: `Master of Science — ${s} from Manipur International University (RPL programme). Student Fee: ₹57,000 | Processing: ₹37,000.`,
  highlights: [s],
  fee: 57000,
}));

// BSW
const bsw = [{
  name: 'BSW (Social Work)',
  slug: 'miu-rpl-bsw',
  duration: '6 Months', type: 'RPL / Recognition of Prior Learning',
  category: 'Degree', level: 'Undergraduate',
  eligibility: '10+2',
  courseType: 'Others',
  description: 'Bachelor of Social Work from Manipur International University (RPL programme). Student Fee: ₹55,000 | Processing: ₹30,000.',
  highlights: ['Social Work'],
  fee: 55000,
}];

// MSW
const msw = [{
  name: 'MSW (Social Work)',
  slug: 'miu-rpl-msw',
  duration: '6 Months', type: 'RPL / Recognition of Prior Learning',
  category: 'Post Graduate', level: 'Postgraduate',
  eligibility: 'BSW',
  courseType: 'Others',
  description: 'Master of Social Work from Manipur International University (RPL programme). Student Fee: ₹62,000 | Processing: ₹31,000.',
  highlights: ['Social Work'],
  fee: 62000,
}];

// BA Psychology
const baPsych = [{
  name: 'BA Psychology',
  slug: 'miu-rpl-ba-psychology',
  duration: '6 Months', type: 'RPL / Recognition of Prior Learning',
  category: 'Degree', level: 'Undergraduate',
  eligibility: '10+2',
  courseType: 'Arts',
  description: 'Bachelor of Arts — Psychology (6 Semesters) from Manipur International University (RPL programme). Student Fee: ₹55,000 | Processing: ₹34,000.',
  highlights: ['Psychology', '6 Semesters'],
  fee: 55000,
}];

// BSc Psychology
const bscPsych = [{
  name: 'B.Sc Psychology',
  slug: 'miu-rpl-bsc-psychology',
  duration: '6 Months', type: 'RPL / Recognition of Prior Learning',
  category: 'Degree', level: 'Undergraduate',
  eligibility: '10+2 with respective subjects',
  courseType: 'Science',
  description: 'Bachelor of Science — Psychology (6 Semesters) from Manipur International University (RPL programme). Student Fee: ₹64,500 | Processing: ₹46,000.',
  highlights: ['Psychology', '6 Semesters'],
  fee: 64500,
}];

// MA Psychology
const maPsych = [{
  name: 'MA Psychology',
  slug: 'miu-rpl-ma-psychology',
  duration: '6 Months', type: 'RPL / Recognition of Prior Learning',
  category: 'Post Graduate', level: 'Postgraduate',
  eligibility: 'Graduation',
  courseType: 'Arts',
  description: 'Master of Arts — Psychology (4 Semesters) from Manipur International University (RPL programme). Student Fee: ₹56,000 | Processing: ₹34,000.',
  highlights: ['Psychology', '4 Semesters'],
  fee: 56000,
}];

// MSc Psychology
const mscPsych = [{
  name: 'M.Sc Psychology',
  slug: 'miu-rpl-msc-psychology',
  duration: '6 Months', type: 'RPL / Recognition of Prior Learning',
  category: 'Post Graduate', level: 'Postgraduate',
  eligibility: 'Graduation with respective subjects',
  courseType: 'Science',
  description: 'Master of Science — Psychology (4 Semesters) from Manipur International University (RPL programme). Student Fee: ₹65,500 | Processing: ₹47,000.',
  highlights: ['Psychology', '4 Semesters'],
  fee: 65500,
}];

// ── Combine all ────────────────────────────────────────────────────────────────
const programs = [
  ...ba, ...ma, ...mba,
  ...bba, ...bcom, ...mcom,
  ...mscSci, ...bscGen, ...bscIt,
  ...bca, ...mca, ...bscCS, ...mscCS,
  ...bsw, ...msw,
  ...baPsych, ...bscPsych, ...maPsych, ...mscPsych,
];

// ── Seed ───────────────────────────────────────────────────────────────────────
async function seed() {
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');

    // Find or create Manipur International University
    let miu = await University.findOne({
      $or: [
        { code: 'MIU-RPL' },
        { name: /Manipur International/i },
        { code: 'MIU' },
      ],
    });

    if (!miu) {
      console.log('University not found — creating Manipur International University...');
      miu = await University.create({
        name: 'Manipur International University',
        code: 'MIU-RPL',
        description: 'Manipur International University offers RPL (Recognition of Prior Learning) programmes across Arts, Science, Commerce, Management, IT and Social Work disciplines.',
        location: 'Manipur, India',
        type: 'private',
        status: 'active',
        slug: 'manipur-international-university',
        features: [
          'RPL (Recognition of Prior Learning) programmes',
          'Wide range of UG and PG courses',
          '6-Month fast-track degree programmes',
          'UGC recognised university',
        ],
      });
      console.log(`✅ Created: ${miu.name} (${miu._id})`);
    } else {
      console.log(`✅ Found: ${miu.name} (${miu._id})`);
    }

    let added = 0, updated = 0, errors = 0;
    for (const prog of programs) {
      try {
        const doc = { ...prog, university: miu._id };
        const result = await Program.findOneAndUpdate(
          { slug: prog.slug },
          doc,
          { upsert: true, new: true, runValidators: false }
        );
        const isNew = result.createdAt.getTime() === result.updatedAt.getTime();
        if (isNew) { added++; process.stdout.write(`  ➕ ${prog.name}\n`); }
        else        { updated++; process.stdout.write(`  ✏️  ${prog.name}\n`); }
      } catch (e) {
        errors++;
        console.error(`  ❌ ${prog.name}: ${e.message}`);
      }
    }

    console.log(`\n🎉 Done — ${added} added, ${updated} updated, ${errors} errors.`);
    console.log(`   Total programs: ${programs.length}`);
  } catch (err) {
    console.error('❌ Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
