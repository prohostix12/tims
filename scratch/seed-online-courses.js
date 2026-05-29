// seed-online-courses.js
// Run with: node scratch/seed-online-courses.js
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tims_db';

const schema = new mongoose.Schema({
  tab: String, name: String, icon: String, order: Number, isActive: Boolean,
}, { timestamps: true });
const OnlineCourse = mongoose.models.OnlineCourse || mongoose.model('OnlineCourse', schema);

const data = [
  // Online PG
  { tab: 'Online PG', name: 'MBA',   icon: 'GraduationCap', order: 1 },
  { tab: 'Online PG', name: 'MCA',   icon: 'Monitor',       order: 2 },
  { tab: 'Online PG', name: 'M.Com', icon: 'BarChart2',     order: 3 },
  { tab: 'Online PG', name: 'M.Sc',  icon: 'FlaskConical',  order: 4 },
  { tab: 'Online PG', name: 'MA',    icon: 'BookOpen',      order: 5 },
  // Online UG
  { tab: 'Online UG', name: 'BBA',   icon: 'Briefcase',     order: 1 },
  { tab: 'Online UG', name: 'BCA',   icon: 'Database',      order: 2 },
  { tab: 'Online UG', name: 'B.Com', icon: 'Landmark',      order: 3 },
  { tab: 'Online UG', name: 'B.Sc',  icon: 'FlaskConical',  order: 4 },
  { tab: 'Online UG', name: 'BA',    icon: 'Globe',         order: 5 },
  // Credit Transfer
  { tab: 'Credit Transfer Programme', name: 'B.Tech Credit Transfer',  icon: 'ArrowRightLeft', order: 1 },
  { tab: 'Credit Transfer Programme', name: 'UG Credit Transfer',      icon: 'ArrowRightLeft', order: 2 },
  { tab: 'Credit Transfer Programme', name: 'PG Credit Transfer',      icon: 'ArrowRightLeft', order: 3 },
  { tab: 'Credit Transfer Programme', name: 'Diploma Credit Transfer', icon: 'GraduationCap',  order: 4 },
  // SIDP
  { tab: 'SIDP (Skill Integrated Diploma Programs)', name: 'BBA + HR MANAGEMENT',           icon: 'Briefcase',  order: 1 },
  { tab: 'SIDP (Skill Integrated Diploma Programs)', name: 'BBA + HOSPITAL ADMINISTRATION', icon: 'HeartPulse', order: 2 },
  { tab: 'SIDP (Skill Integrated Diploma Programs)', name: 'BBA + DIGITAL MARKETING',       icon: 'Globe',      order: 3 },
  { tab: 'SIDP (Skill Integrated Diploma Programs)', name: 'BBA + LOGISTICS',               icon: 'Package',    order: 4 },
  { tab: 'SIDP (Skill Integrated Diploma Programs)', name: 'BBA + BUSINESS MANAGEMENT',     icon: 'BarChart2',  order: 5 },
  { tab: 'SIDP (Skill Integrated Diploma Programs)', name: 'BA + MTTC',                     icon: 'Globe',      order: 6 },
  { tab: 'SIDP (Skill Integrated Diploma Programs)', name: 'BCOM + ACCA',                   icon: 'Landmark',   order: 7 },
  { tab: 'SIDP (Skill Integrated Diploma Programs)', name: 'BCOM + ADVANCED ACCOUNTANTS',   icon: 'Database',   order: 8 },
  // Diploma
  { tab: 'Diploma', name: 'Data Science',   icon: 'BarChart2',    order: 1 },
  { tab: 'Diploma', name: 'Cyber Security', icon: 'Cpu',          order: 2 },
  { tab: 'Diploma', name: 'Fashion Design', icon: 'PenTool',      order: 3 },
  { tab: 'Diploma', name: 'Supply Chain',   icon: 'Package',      order: 4 },
  { tab: 'Diploma', name: 'Nutrition',      icon: 'Stethoscope',  order: 5 },
  { tab: 'Diploma', name: 'Music',          icon: 'Music',        order: 6 },
  { tab: 'Diploma', name: 'IT',             icon: 'Layers',       order: 7 },
];

async function seed() {
  await mongoose.connect(uri);
  console.log('✅ Connected');
  let added = 0, skipped = 0;
  for (const d of data) {
    const existing = await OnlineCourse.findOne({ tab: d.tab, name: d.name });
    if (existing) { skipped++; continue; }
    await OnlineCourse.create({ ...d, isActive: true });
    console.log(`  ➕ ${d.tab} → ${d.name}`);
    added++;
  }
  console.log(`\n🎉 Done — ${added} added, ${skipped} already existed.`);
  await mongoose.disconnect();
  process.exit(0);
}
seed().catch(e => { console.error(e); process.exit(1); });
