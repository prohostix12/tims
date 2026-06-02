// seed.mjs — Run with: node seed.mjs
// Seeds universities + programs into the running Next.js app via its own API.

const BASE = 'http://localhost:3000';

async function post(url, body) {
  const res = await fetch(`${BASE}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${res.status}: ${JSON.stringify(json)}`);
  return json;
}

function toSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ═══════════════════════════════════════════════════════════════
//  UNIVERSITIES
// ═══════════════════════════════════════════════════════════════
const UNIVERSITIES = [
  {
    name: 'Amity University Online',
    code: 'AMI',
    description: 'Amity University Online offers industry-aligned programs with NAAC A+ accreditation and UGC-DEB approval, combining academic excellence with practical exposure.',
    location: 'Noida, Uttar Pradesh',
    type: 'private',
    status: 'active',
    establishedYear: 2005,
    accreditations: 'NAAC A+, UGC-DEB Approved, AICTE Approved',
    ranking: 'Ranked #1 Private University in India',
    features: ['NAAC A+ Grade', 'UGC-DEB Approved', 'Live Interactive Classes', 'Industry Mentors', 'Global Alumni Network'],
    facilities: ['Online Library', 'Virtual Labs', '24/7 LMS Access', 'Placement Cell'],
    website: 'https://amity.edu',
  },
  {
    name: 'LPU Online',
    code: 'LPU',
    description: 'Lovely Professional University Online delivers flexible, technology-driven education with NAAC A++ accreditation and one of India\'s strongest placement records.',
    location: 'Phagwara, Punjab',
    type: 'private',
    status: 'active',
    establishedYear: 2005,
    accreditations: 'NAAC A++, UGC-DEB Approved',
    ranking: 'NIRF Ranked, QS Top 500 Asia',
    features: ['NAAC A++', 'UGC-DEB Approved', 'Industry-driven Curriculum', 'Live Sessions', '500+ Hiring Partners'],
    facilities: ['Online Library', 'E-Resources', 'Career Services', 'Mentorship Program'],
    website: 'https://online.lpu.in',
  },
  {
    name: 'Manipal University Online',
    code: 'MUO',
    description: 'Manipal University Online delivers premium distance education with global perspective, NAAC A+ accreditation, and strong industry connections.',
    location: 'Manipal, Karnataka',
    type: 'private',
    status: 'active',
    establishedYear: 1953,
    accreditations: 'NAAC A+, UGC-DEB Approved, AIU Member',
    ranking: 'Top 10 Private Universities in India',
    features: ['NAAC A+', 'UGC-DEB Approved', 'Global Faculty', 'Industry Projects', 'Career Support'],
    facilities: ['Digital Library', 'Virtual Labs', 'LMS Platform', 'Alumni Network'],
    website: 'https://onlinemanipal.com',
  },
  {
    name: 'Jain University Online',
    code: 'JUO',
    description: 'Jain University Online provides NAAC A++ accredited programs with a strong focus on entrepreneurship, innovation, and employability.',
    location: 'Bengaluru, Karnataka',
    type: 'private',
    status: 'active',
    establishedYear: 2009,
    accreditations: 'NAAC A++, UGC-DEB Approved',
    ranking: 'Top Private University in South India',
    features: ['NAAC A++', 'UGC-DEB Approved', 'Entrepreneurship Focus', 'Industry Interface', 'Live Doubt Sessions'],
    facilities: ['E-Library', 'Virtual Classroom', 'Career Hub', 'Internship Portal'],
    website: 'https://online.jainuniversity.ac.in',
  },
  {
    name: 'Chandigarh University Online',
    code: 'CUO',
    description: 'Chandigarh University Online offers skill-oriented programs with QS and NAAC rankings, backed by one of the highest placement records in India.',
    location: 'Mohali, Punjab',
    type: 'private',
    status: 'active',
    establishedYear: 2012,
    accreditations: 'NAAC A+, UGC-DEB Approved, QS Ranked',
    ranking: 'QS Asia University Rankings 2024',
    features: ['NAAC A+', 'UGC-DEB Approved', 'Skill-based Learning', '800+ Hiring Partners', 'Doubt Clearing Sessions'],
    facilities: ['Online Library', 'Virtual Labs', 'Placement Cell', 'Mentorship Program'],
    website: 'https://online.chandigarhuniversity.ac.in',
  },
  {
    name: 'UPES Online',
    code: 'UPES',
    description: 'UPES Online delivers specialized programs in energy, logistics, business, and technology with a strong focus on industry-specific career readiness.',
    location: 'Dehradun, Uttarakhand',
    type: 'private',
    status: 'active',
    establishedYear: 2003,
    accreditations: 'NAAC A, UGC-DEB Approved',
    ranking: 'Ranked Among Top 100 Universities in India',
    features: ['NAAC A', 'UGC-DEB Approved', 'Industry Specializations', 'Expert Faculty', 'Career Services'],
    facilities: ['Digital Library', 'LMS Platform', 'Industry Connect', 'Placement Support'],
    website: 'https://online.upes.ac.in',
  },
  {
    name: 'Symbiosis Centre for Distance Learning',
    code: 'SCDL',
    description: 'SCDL is one of India\'s largest and most reputed distance learning institutions with over 5 lakh alumni worldwide and ISO-certified processes.',
    location: 'Pune, Maharashtra',
    type: 'private',
    status: 'active',
    establishedYear: 2001,
    accreditations: 'UGC-DEB Approved, ISO 9001:2015 Certified',
    ranking: 'Top Distance Learning Institution in India',
    features: ['UGC-DEB Approved', 'ISO Certified', 'Self-paced Learning', '5 Lakh+ Alumni', 'Global Recognition'],
    facilities: ['E-Library', 'Online Study Material', 'Discussion Forums', 'Alumni Network'],
    website: 'https://scdl.net',
  },
  {
    name: 'Sikkim Manipal University Online',
    code: 'SMU',
    description: 'Sikkim Manipal University is a pioneer in distance education with UGC-DEB approved programs and a pan-India network of study centers.',
    location: 'Gangtok, Sikkim',
    type: 'private',
    status: 'active',
    establishedYear: 1995,
    accreditations: 'NAAC B++, UGC-DEB Approved',
    ranking: 'Pioneer in Distance Education in Northeast India',
    features: ['UGC-DEB Approved', 'NAAC B++', 'Flexible Schedule', 'Online Examinations', 'Career Guidance'],
    facilities: ['Online Library', 'Study Centers', 'LMS Platform', 'Placement Assistance'],
    website: 'https://smu.edu.in',
  },
  {
    name: 'Pondicherry University',
    code: 'PU',
    description: 'Pondicherry University is a Central University offering quality, affordable distance education programs across a wide range of disciplines.',
    location: 'Puducherry',
    type: 'public',
    status: 'active',
    establishedYear: 1985,
    accreditations: 'NAAC A+, UGC Recognized, Central University of India',
    ranking: 'NIRF Ranked Among Top 50 Universities',
    features: ['Central University', 'NAAC A+', 'UGC Approved', 'Affordable Fees', 'Quality Education'],
    facilities: ['Digital Library', 'Study Centers', 'Online Portal', 'Research Facilities'],
    website: 'https://pondiuni.edu.in',
  },
  {
    name: 'DY Patil University Online',
    code: 'DYP',
    description: 'DY Patil University Online offers innovative online degree programs with strong industry partnerships and a focus on graduate employability.',
    location: 'Navi Mumbai, Maharashtra',
    type: 'private',
    status: 'active',
    establishedYear: 2002,
    accreditations: 'NAAC A+, UGC-DEB Approved',
    ranking: 'Top University in Maharashtra',
    features: ['NAAC A+', 'UGC-DEB Approved', 'Industry Partnerships', 'Expert Faculty', 'Career Services'],
    facilities: ['E-Library', 'Virtual Campus', 'Career Cell', 'Online Assessment'],
    website: 'https://dypatil.edu',
  },
];

// ═══════════════════════════════════════════════════════════════
//  PROGRAMS
//  prog(name, univCode, category, courseType, level, duration, eligibility, fee)
// ═══════════════════════════════════════════════════════════════
function prog(name, univCode, category, courseType, level, duration, eligibility, fee) {
  return { name, univCode, category, courseType, level, duration, eligibility, fee, type: 'Online' };
}

const PROGRAMS = [
  // ── Amity University Online (AMI) ───────────────────────────
  prog('MBA', 'AMI', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 95000),
  prog('MBA - Finance', 'AMI', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 95000),
  prog('MBA - Marketing', 'AMI', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 95000),
  prog('MBA - Human Resource Management', 'AMI', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 95000),
  prog('MBA - Operations Management', 'AMI', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 95000),
  prog('MBA - Business Analytics', 'AMI', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 105000),
  prog('MBA - International Business', 'AMI', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 105000),
  prog('MCA', 'AMI', 'MCA', 'IT', 'PG', '2 Years', 'BCA / B.Sc (IT/CS) or any graduation with Mathematics', 85000),
  prog('BBA', 'AMI', 'BBA', 'Management', 'UG', '3 Years', '10+2 in any stream', 75000),
  prog('BCA', 'AMI', 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 65000),
  prog('B.Com', 'AMI', 'B.Com', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 55000),
  prog('M.Com', 'AMI', 'M.Com', 'Commerce', 'PG', '2 Years', 'B.Com or equivalent graduation', 65000),
  prog('B.Sc (Information Technology)', 'AMI', 'B.Sc', 'IT', 'UG', '3 Years', '10+2 with Science / Maths', 65000),
  prog('M.Sc (Information Technology)', 'AMI', 'M.Sc', 'IT', 'PG', '2 Years', 'B.Sc (IT / CS) or BCA', 75000),

  // ── LPU Online (LPU) ────────────────────────────────────────
  prog('MBA', 'LPU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline with 50% marks', 120000),
  prog('MBA - Finance', 'LPU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 120000),
  prog('MBA - Marketing', 'LPU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 120000),
  prog('MBA - Human Resource Management', 'LPU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 120000),
  prog('MBA - Logistics & Supply Chain Management', 'LPU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 125000),
  prog('MBA - Business Analytics', 'LPU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation with Maths / Stats background', 125000),
  prog('MCA', 'LPU', 'MCA', 'IT', 'PG', '2 Years', 'BCA / B.Sc (IT/CS) or any graduation with Mathematics', 110000),
  prog('BBA', 'LPU', 'BBA', 'Management', 'UG', '3 Years', '10+2 in any stream', 90000),
  prog('BCA', 'LPU', 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 90000),
  prog('B.Com (Hons.)', 'LPU', 'B.Com', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 75000),
  prog('M.Com', 'LPU', 'M.Com', 'Commerce', 'PG', '2 Years', 'B.Com or equivalent graduation', 85000),
  prog('B.Sc (Computer Science)', 'LPU', 'B.Sc', 'IT', 'UG', '3 Years', '10+2 with PCM', 90000),
  prog('M.Sc (Computer Science)', 'LPU', 'M.Sc', 'IT', 'PG', '2 Years', 'B.Sc (CS/IT) or BCA', 95000),
  prog('BA (English)', 'LPU', 'BA', 'Arts', 'UG', '3 Years', '10+2 in any stream', 60000),
  prog('MA (English)', 'LPU', 'MA', 'Arts', 'PG', '2 Years', 'Graduation in any discipline', 65000),

  // ── Manipal University Online (MUO) ─────────────────────────
  prog('MBA', 'MUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 145000),
  prog('MBA - Finance', 'MUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 145000),
  prog('MBA - Marketing', 'MUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 145000),
  prog('MBA - Human Resource Management', 'MUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 145000),
  prog('MBA - Information Technology', 'MUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 150000),
  prog('MBA - Business Analytics & Data Science', 'MUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation with Maths / Stats', 155000),
  prog('MCA', 'MUO', 'MCA', 'IT', 'PG', '2 Years', 'BCA / B.Sc (IT/CS) or graduation with Mathematics', 130000),
  prog('BBA', 'MUO', 'BBA', 'Management', 'UG', '3 Years', '10+2 in any stream', 105000),
  prog('BCA', 'MUO', 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 95000),
  prog('B.Com', 'MUO', 'B.Com', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 85000),
  prog('M.Com', 'MUO', 'M.Com', 'Commerce', 'PG', '2 Years', 'B.Com or equivalent graduation', 95000),
  prog('M.Sc (Data Science)', 'MUO', 'M.Sc', 'IT', 'PG', '2 Years', 'B.Sc / B.E / B.Tech with Maths', 150000),

  // ── Jain University Online (JUO) ────────────────────────────
  prog('MBA', 'JUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 90000),
  prog('MBA - Finance', 'JUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 90000),
  prog('MBA - Marketing', 'JUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 90000),
  prog('MBA - Human Resource Management', 'JUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 90000),
  prog('MBA - International Business', 'JUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 95000),
  prog('MCA', 'JUO', 'MCA', 'IT', 'PG', '2 Years', 'BCA or graduation with Mathematics', 80000),
  prog('BBA', 'JUO', 'BBA', 'Management', 'UG', '3 Years', '10+2 in any stream', 65000),
  prog('BCA', 'JUO', 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 60000),
  prog('B.Com', 'JUO', 'B.Com', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 55000),
  prog('B.Sc (Information Technology)', 'JUO', 'B.Sc', 'IT', 'UG', '3 Years', '10+2 with Science / Maths', 60000),

  // ── Chandigarh University Online (CUO) ──────────────────────
  prog('MBA', 'CUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 80000),
  prog('MBA - Finance', 'CUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 80000),
  prog('MBA - Marketing', 'CUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 80000),
  prog('MBA - Human Resource Management', 'CUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 80000),
  prog('MBA - Business Analytics', 'CUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 85000),
  prog('MCA', 'CUO', 'MCA', 'IT', 'PG', '2 Years', 'BCA or graduation with Mathematics', 75000),
  prog('BBA', 'CUO', 'BBA', 'Management', 'UG', '3 Years', '10+2 in any stream', 60000),
  prog('BCA', 'CUO', 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 55000),
  prog('B.Com', 'CUO', 'B.Com', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 50000),
  prog('B.Sc (Computer Science)', 'CUO', 'B.Sc', 'IT', 'UG', '3 Years', '10+2 with PCM', 60000),

  // ── UPES Online (UPES) ──────────────────────────────────────
  prog('MBA', 'UPES', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 115000),
  prog('MBA - Oil & Gas Management', 'UPES', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 125000),
  prog('MBA - Logistics & Supply Chain Management', 'UPES', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 120000),
  prog('MBA - Energy Management', 'UPES', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 125000),
  prog('MBA - Business Analytics', 'UPES', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 120000),
  prog('MCA', 'UPES', 'MCA', 'IT', 'PG', '2 Years', 'BCA or graduation with Mathematics', 105000),
  prog('BBA', 'UPES', 'BBA', 'Management', 'UG', '3 Years', '10+2 in any stream', 85000),

  // ── Symbiosis Centre for Distance Learning (SCDL) ───────────
  prog('PGDBA (MBA Equivalent)', 'SCDL', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 55000),
  prog('PGDBA - Finance', 'SCDL', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 55000),
  prog('PGDBA - Marketing', 'SCDL', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 55000),
  prog('PGDBA - Human Resource Management', 'SCDL', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 55000),
  prog('PGDBA - Operations Management', 'SCDL', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 55000),
  prog('PGDIT (Information Technology)', 'SCDL', 'PGDIT', 'IT', 'PG', '2 Years', 'Graduation with Science / IT / Engineering', 55000),
  prog('B.Com', 'SCDL', 'B.Com', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 35000),

  // ── Sikkim Manipal University Online (SMU) ──────────────────
  prog('MBA', 'SMU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 70000),
  prog('MBA - Finance', 'SMU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 70000),
  prog('MBA - Marketing', 'SMU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 70000),
  prog('MBA - Human Resource Management', 'SMU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 70000),
  prog('MCA', 'SMU', 'MCA', 'IT', 'PG', '2 Years', 'BCA or graduation with Mathematics', 65000),
  prog('BBA', 'SMU', 'BBA', 'Management', 'UG', '3 Years', '10+2 in any stream', 50000),
  prog('BCA', 'SMU', 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 45000),
  prog('B.Sc (Information Technology)', 'SMU', 'B.Sc', 'IT', 'UG', '3 Years', '10+2 with Science / Maths', 45000),
  prog('M.Sc (Information Technology)', 'SMU', 'M.Sc', 'IT', 'PG', '2 Years', 'B.Sc (IT/CS) or BCA', 55000),

  // ── Pondicherry University (PU) ─────────────────────────────
  prog('MBA', 'PU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline with 50% marks', 45000),
  prog('MCA', 'PU', 'MCA', 'IT', 'PG', '3 Years', 'BCA / B.Sc (IT/CS) or graduation with Mathematics', 40000),
  prog('BBA', 'PU', 'BBA', 'Management', 'UG', '3 Years', '10+2 in any stream', 30000),
  prog('BCA', 'PU', 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 28000),
  prog('B.Com', 'PU', 'B.Com', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 25000),
  prog('M.Com', 'PU', 'M.Com', 'Commerce', 'PG', '2 Years', 'B.Com or equivalent graduation', 30000),
  prog('MA (English)', 'PU', 'MA', 'Arts', 'PG', '2 Years', 'Graduation in any discipline', 25000),
  prog('MA (Economics)', 'PU', 'MA', 'Arts', 'PG', '2 Years', 'Graduation in any discipline', 25000),
  prog('M.Sc (Mathematics)', 'PU', 'M.Sc', 'Science', 'PG', '2 Years', 'B.Sc with Mathematics', 28000),

  // ── DY Patil University Online (DYP) ────────────────────────
  prog('MBA', 'DYP', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 100000),
  prog('MBA - Finance', 'DYP', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 100000),
  prog('MBA - Marketing', 'DYP', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 100000),
  prog('MBA - Human Resource Management', 'DYP', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 100000),
  prog('MCA', 'DYP', 'MCA', 'IT', 'PG', '2 Years', 'BCA or graduation with Mathematics', 90000),
  prog('BBA', 'DYP', 'BBA', 'Management', 'UG', '3 Years', '10+2 in any stream', 75000),
  prog('BCA', 'DYP', 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 70000),
  prog('B.Com', 'DYP', 'B.Com', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 65000),
  prog('M.Com', 'DYP', 'M.Com', 'Commerce', 'PG', '2 Years', 'B.Com or equivalent graduation', 75000),
];

// ═══════════════════════════════════════════════════════════════
//  SEED
// ═══════════════════════════════════════════════════════════════
async function main() {
  console.log('━━━  Seeding Universities  ━━━');
  const uniMap = {};   // code → _id

  for (const uni of UNIVERSITIES) {
    try {
      const created = await post('/api/admin/universities', uni);
      uniMap[uni.code] = created._id;
      console.log(`  ✓  ${uni.name}`);
    } catch (e) {
      console.error(`  ✗  ${uni.name} → ${e.message}`);
    }
  }

  console.log(`\n━━━  Seeding Programs (${PROGRAMS.length} total)  ━━━`);
  let ok = 0, fail = 0;

  for (const { univCode, ...rest } of PROGRAMS) {
    const universityId = uniMap[univCode];
    if (!universityId) {
      console.error(`  ✗  ${rest.name} → no university for code "${univCode}"`);
      fail++;
      continue;
    }
    try {
      await post('/api/admin/programs', {
        ...rest,
        university: universityId,
        slug: `${toSlug(univCode)}-${toSlug(rest.name)}`,
      });
      console.log(`  ✓  [${univCode}] ${rest.name}`);
      ok++;
    } catch (e) {
      console.error(`  ✗  [${univCode}] ${rest.name} → ${e.message}`);
      fail++;
    }
  }

  console.log(`\n━━━  Done  ━━━`);
  console.log(`  Universities : ${Object.keys(uniMap).length} / ${UNIVERSITIES.length}`);
  console.log(`  Programs     : ${ok} ok, ${fail} failed`);
}

main().catch(console.error);
