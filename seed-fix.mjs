// One-shot: seed programs using existing universities in the DB
const BASE = 'http://localhost:3000';

const post = async (url, body) => {
  const r = await fetch(BASE + url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(JSON.stringify(j).slice(0, 100));
  return j;
};

const toSlug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function p(name, code, cat, ct, lv, dur, elig, fee) {
  return { name, code, category: cat, courseType: ct, level: lv, duration: dur, eligibility: elig, fee, type: 'Online' };
}

const PROGRAMS = [
  // AMI - Amity University Online
  p('MBA', 'AMI', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 95000),
  p('MBA - Finance', 'AMI', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 95000),
  p('MBA - Marketing', 'AMI', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 95000),
  p('MBA - Human Resource Management', 'AMI', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 95000),
  p('MBA - Operations Management', 'AMI', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 95000),
  p('MBA - Business Analytics', 'AMI', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 100000),
  p('MBA - International Business', 'AMI', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 100000),
  p('MCA', 'AMI', 'MCA', 'IT', 'PG', '2 Years', 'BCA or graduation with Mathematics', 85000),
  p('BBA', 'AMI', 'BBA', 'Management', 'UG', '3 Years', '10+2 in any stream', 60000),
  p('BCA', 'AMI', 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 55000),
  p('B.Com', 'AMI', 'B.Com', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 50000),
  p('M.Com', 'AMI', 'M.Com', 'Commerce', 'PG', '2 Years', 'B.Com or equivalent', 70000),
  p('B.Sc (Information Technology)', 'AMI', 'B.Sc', 'IT', 'UG', '3 Years', '10+2 in any stream', 60000),
  p('M.Sc (Information Technology)', 'AMI', 'M.Sc', 'IT', 'PG', '2 Years', 'B.Sc (IT/CS) or BCA', 75000),
  // LPU - LPU Online
  p('MBA', 'LPU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 105000),
  p('MBA - Finance', 'LPU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 105000),
  p('MBA - Marketing', 'LPU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 105000),
  p('MBA - Human Resource Management', 'LPU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 105000),
  p('MBA - Logistics & Supply Chain Management', 'LPU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 110000),
  p('MBA - Business Analytics', 'LPU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 110000),
  p('MCA', 'LPU', 'MCA', 'IT', 'PG', '2 Years', 'BCA or graduation with Mathematics', 95000),
  p('BBA', 'LPU', 'BBA', 'Management', 'UG', '3 Years', '10+2 in any stream', 70000),
  p('BCA', 'LPU', 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 65000),
  p('B.Com (Hons.)', 'LPU', 'B.Com', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 60000),
  p('M.Com', 'LPU', 'M.Com', 'Commerce', 'PG', '2 Years', 'B.Com or equivalent', 75000),
  p('B.Sc (Computer Science)', 'LPU', 'B.Sc', 'IT', 'UG', '3 Years', '10+2 in any stream', 65000),
  p('M.Sc (Computer Science)', 'LPU', 'M.Sc', 'IT', 'PG', '2 Years', 'B.Sc (IT/CS) or BCA', 80000),
  p('BA (English)', 'LPU', 'BA', 'Arts', 'UG', '3 Years', '10+2 in any stream', 50000),
  p('MA (English)', 'LPU', 'MA', 'Arts', 'PG', '2 Years', 'Graduation in any discipline', 60000),
  // MUO - Manipal University Online
  p('MBA', 'MUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 145000),
  p('MBA - Finance', 'MUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 145000),
  p('MBA - Marketing', 'MUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 145000),
  p('MBA - Human Resource Management', 'MUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 145000),
  p('MBA - Information Technology', 'MUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 150000),
  p('MBA - Business Analytics & Data Science', 'MUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 155000),
  p('MCA', 'MUO', 'MCA', 'IT', 'PG', '2 Years', 'BCA or graduation with Mathematics', 130000),
  p('BBA', 'MUO', 'BBA', 'Management', 'UG', '3 Years', '10+2 in any stream', 95000),
  p('BCA', 'MUO', 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 90000),
  p('B.Com', 'MUO', 'B.Com', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 85000),
  p('M.Com', 'MUO', 'M.Com', 'Commerce', 'PG', '2 Years', 'B.Com or equivalent', 95000),
  p('M.Sc (Data Science)', 'MUO', 'M.Sc', 'IT', 'PG', '2 Years', 'B.Sc/B.Tech with Maths', 150000),
  // JUO - Jain University Online
  p('MBA', 'JUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 120000),
  p('MBA - Finance', 'JUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 120000),
  p('MBA - Marketing', 'JUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 120000),
  p('MBA - Human Resource Management', 'JUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 120000),
  p('MBA - International Business', 'JUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 125000),
  p('MCA', 'JUO', 'MCA', 'IT', 'PG', '2 Years', 'BCA or graduation with Mathematics', 110000),
  p('BBA', 'JUO', 'BBA', 'Management', 'UG', '3 Years', '10+2 in any stream', 80000),
  p('BCA', 'JUO', 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 75000),
  p('B.Com', 'JUO', 'B.Com', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 70000),
  p('B.Sc (Information Technology)', 'JUO', 'B.Sc', 'IT', 'UG', '3 Years', '10+2 in any stream', 75000),
  // CUO - Chandigarh University Online
  p('MBA', 'CUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 100000),
  p('MBA - Finance', 'CUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 100000),
  p('MBA - Marketing', 'CUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 100000),
  p('MBA - Human Resource Management', 'CUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 100000),
  p('MBA - Business Analytics', 'CUO', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 105000),
  p('MCA', 'CUO', 'MCA', 'IT', 'PG', '2 Years', 'BCA or graduation with Mathematics', 90000),
  p('BBA', 'CUO', 'BBA', 'Management', 'UG', '3 Years', '10+2 in any stream', 65000),
  p('BCA', 'CUO', 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 60000),
  p('B.Com', 'CUO', 'B.Com', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 55000),
  p('B.Sc (Computer Science)', 'CUO', 'B.Sc', 'IT', 'UG', '3 Years', '10+2 in any stream', 60000),
  // UPES
  p('MBA', 'UPES', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 120000),
  p('MBA - Oil & Gas Management', 'UPES', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 130000),
  p('MBA - Logistics & Supply Chain Management', 'UPES', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 125000),
  p('MBA - Energy Management', 'UPES', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 130000),
  p('MBA - Business Analytics', 'UPES', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 125000),
  p('MCA', 'UPES', 'MCA', 'IT', 'PG', '2 Years', 'BCA or graduation with Mathematics', 105000),
  p('BBA', 'UPES', 'BBA', 'Management', 'UG', '3 Years', '10+2 in any stream', 75000),
  // SCDL - Symbiosis Centre for Distance Learning
  p('PGDBA (MBA Equivalent)', 'SCDL', 'PGDBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 40000),
  p('PGDBA - Finance', 'SCDL', 'PGDBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 40000),
  p('PGDBA - Marketing', 'SCDL', 'PGDBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 40000),
  p('PGDBA - Human Resource Management', 'SCDL', 'PGDBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 40000),
  p('PGDBA - Operations Management', 'SCDL', 'PGDBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 40000),
  p('PGDIT (Information Technology)', 'SCDL', 'PGDIT', 'IT', 'PG', '2 Years', 'Graduation in any discipline', 35000),
  p('B.Com', 'SCDL', 'B.Com', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 30000),
  // SMU - Sikkim Manipal University Online
  p('MBA', 'SMU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 80000),
  p('MBA - Finance', 'SMU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 80000),
  p('MBA - Marketing', 'SMU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 80000),
  p('MBA - Human Resource Management', 'SMU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 80000),
  p('MCA', 'SMU', 'MCA', 'IT', 'PG', '2 Years', 'BCA or graduation with Mathematics', 70000),
  p('BBA', 'SMU', 'BBA', 'Management', 'UG', '3 Years', '10+2 in any stream', 55000),
  p('BCA', 'SMU', 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 50000),
  p('B.Sc (Information Technology)', 'SMU', 'B.Sc', 'IT', 'UG', '3 Years', '10+2 in any stream', 50000),
  p('M.Sc (Information Technology)', 'SMU', 'M.Sc', 'IT', 'PG', '2 Years', 'B.Sc (IT/CS) or BCA', 65000),
  // PU - Pondicherry University
  p('MBA', 'PU', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 30000),
  p('MCA', 'PU', 'MCA', 'IT', 'PG', '2 Years', 'BCA or graduation with Mathematics', 28000),
  p('BBA', 'PU', 'BBA', 'Management', 'UG', '3 Years', '10+2 in any stream', 22000),
  p('BCA', 'PU', 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 20000),
  p('B.Com', 'PU', 'B.Com', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 18000),
  p('M.Com', 'PU', 'M.Com', 'Commerce', 'PG', '2 Years', 'B.Com or equivalent', 25000),
  p('MA (English)', 'PU', 'MA', 'Arts', 'PG', '2 Years', 'Graduation in any discipline', 22000),
  p('MA (Economics)', 'PU', 'MA', 'Arts', 'PG', '2 Years', 'Graduation in any discipline', 22000),
  p('M.Sc (Mathematics)', 'PU', 'M.Sc', 'Science', 'PG', '2 Years', 'B.Sc with Mathematics', 25000),
  // DYP - DY Patil University Online
  p('MBA', 'DYP', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 100000),
  p('MBA - Finance', 'DYP', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 100000),
  p('MBA - Marketing', 'DYP', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 100000),
  p('MBA - Human Resource Management', 'DYP', 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 100000),
  p('MCA', 'DYP', 'MCA', 'IT', 'PG', '2 Years', 'BCA or graduation with Mathematics', 90000),
  p('BBA', 'DYP', 'BBA', 'Management', 'UG', '3 Years', '10+2 in any stream', 75000),
  p('BCA', 'DYP', 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 70000),
  p('B.Com', 'DYP', 'B.Com', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 65000),
  p('M.Com', 'DYP', 'M.Com', 'Commerce', 'PG', '2 Years', 'B.Com or equivalent', 75000),
];

async function main() {
  // Fetch existing universities
  const unis = await fetch(BASE + '/api/admin/universities').then(r => r.json());
  const uniMap = {};
  for (const u of unis) uniMap[u.code] = u._id;
  console.log('Universities in DB:', Object.keys(uniMap).join(', '));

  // Clear existing programs
  const existing = await fetch(BASE + '/api/admin/programs').then(r => r.json()).catch(() => []);
  const list = Array.isArray(existing) ? existing : [];
  for (const prog of list) {
    await fetch(BASE + '/api/admin/programs/' + prog._id, { method: 'DELETE' }).catch(() => {});
  }
  console.log('Cleared', list.length, 'old programs');

  // Seed programs
  let ok = 0, fail = 0;
  for (const { code, ...rest } of PROGRAMS) {
    const universityId = uniMap[code];
    if (!universityId) { console.error('No uni for code:', code); fail++; continue; }
    try {
      await post('/api/admin/programs', {
        ...rest,
        university: universityId,
        slug: toSlug(code) + '-' + toSlug(rest.name),
      });
      process.stdout.write('.');
      ok++;
    } catch (e) {
      console.error('\nFAIL', rest.name, '-', e.message);
      fail++;
    }
  }
  console.log(`\nPrograms: ${ok} seeded, ${fail} failed`);
}

main().catch(console.error);
