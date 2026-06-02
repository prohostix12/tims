// seed-programs.mjs — node seed-programs.mjs
const BASE = 'http://localhost:3000';

async function post(url, body) {
  const r = await fetch(BASE + url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json();
  if (!r.ok) throw new Error(JSON.stringify(j));
  return j;
}

function toSlug(t) { return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

function prog(name, uniId, category, courseType, level, duration, eligibility, fee) {
  return { name, university: uniId, category, courseType, level, duration, eligibility, fee, type: 'Online', slug: toSlug(uniId.slice(-6) + '-' + name) };
}

async function main() {
  const unis = await fetch(BASE + '/api/admin/universities').then(r => r.json());
  const id = name => { const u = unis.find(u => u.name === name); return u ? u._id : null; };

  // Clear old programs
  const old = await fetch(BASE + '/api/admin/programs').then(r => r.json());
  for (const p of old) {
    await fetch(BASE + '/api/admin/programs/' + p._id, { method: 'DELETE' });
  }
  console.log('Cleared', old.length, 'old programs');

  const PROGRAMS = [
    // ── Amrita University ─────────────────────────────────────────────
    prog('MBA', id('Amrita University'), 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 95000),
    prog('MBA - Finance', id('Amrita University'), 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 95000),
    prog('MBA - Marketing', id('Amrita University'), 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 95000),
    prog('MBA - Human Resource Management', id('Amrita University'), 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 95000),
    prog('MCA', id('Amrita University'), 'MCA', 'IT', 'PG', '2 Years', 'BCA / B.Sc (IT/CS) or Graduation with Maths', 85000),
    prog('BCA', id('Amrita University'), 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 65000),
    prog('B.Tech (Computer Science)', id('Amrita University'), 'Degree', 'IT', 'UG', '4 Years', '10+2 with PCM', 150000),
    prog('B.Tech (Electronics & Communication)', id('Amrita University'), 'Degree', 'IT', 'UG', '4 Years', '10+2 with PCM', 145000),
    prog('B.Sc (Computer Science)', id('Amrita University'), 'Degree', 'IT', 'UG', '3 Years', '10+2 with Science', 60000),
    prog('M.Sc (Computer Science)', id('Amrita University'), 'Post Graduate', 'IT', 'PG', '2 Years', 'B.Sc (CS/IT) or BCA', 75000),

    // ── Manipal University ────────────────────────────────────────────
    prog('MBA', id('Manipal University'), 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 145000),
    prog('MBA - Finance', id('Manipal University'), 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 145000),
    prog('MBA - Marketing', id('Manipal University'), 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 145000),
    prog('MCA', id('Manipal University'), 'MCA', 'IT', 'PG', '2 Years', 'BCA / B.Sc (IT/CS) or Graduation with Maths', 130000),
    prog('BCA', id('Manipal University'), 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 95000),
    prog('B.Com', id('Manipal University'), 'Degree', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 85000),
    prog('M.Com', id('Manipal University'), 'Post Graduate', 'Commerce', 'PG', '2 Years', 'B.Com or equivalent', 95000),
    prog('B.Sc (Information Technology)', id('Manipal University'), 'Degree', 'IT', 'UG', '3 Years', '10+2 with Science', 90000),
    prog('M.Sc (Data Science)', id('Manipal University'), 'Post Graduate', 'IT', 'PG', '2 Years', 'B.Sc / B.Tech with Maths', 150000),

    // ── GLA University ────────────────────────────────────────────────
    prog('MBA', id('GLA University'), 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 80000),
    prog('MBA - Finance', id('GLA University'), 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 80000),
    prog('MCA', id('GLA University'), 'MCA', 'IT', 'PG', '2 Years', 'BCA / B.Sc or Graduation with Maths', 75000),
    prog('BCA', id('GLA University'), 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 55000),
    prog('BBA', id('GLA University'), 'Degree', 'Management', 'UG', '3 Years', '10+2 in any stream', 60000),
    prog('B.Com', id('GLA University'), 'Degree', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 50000),
    prog('B.Tech (Computer Science)', id('GLA University'), 'Degree', 'IT', 'UG', '4 Years', '10+2 with PCM', 120000),

    // ── Jain University ───────────────────────────────────────────────
    prog('MBA', id('Jain University'), 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 90000),
    prog('MBA - Finance', id('Jain University'), 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 90000),
    prog('MBA - Marketing', id('Jain University'), 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 90000),
    prog('MBA - International Business', id('Jain University'), 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 95000),
    prog('MCA', id('Jain University'), 'MCA', 'IT', 'PG', '2 Years', 'BCA or Graduation with Maths', 80000),
    prog('BCA', id('Jain University'), 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 60000),
    prog('BBA', id('Jain University'), 'Degree', 'Management', 'UG', '3 Years', '10+2 in any stream', 65000),
    prog('B.Com', id('Jain University'), 'Degree', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 55000),

    // ── Andhra University ─────────────────────────────────────────────
    prog('MBA', id('Andhra University'), 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 45000),
    prog('MCA', id('Andhra University'), 'MCA', 'IT', 'PG', '2 Years', 'BCA / B.Sc or Graduation with Maths', 40000),
    prog('BBA', id('Andhra University'), 'Degree', 'Management', 'UG', '3 Years', '10+2 in any stream', 30000),
    prog('BCA', id('Andhra University'), 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 28000),
    prog('B.Com', id('Andhra University'), 'Degree', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 25000),
    prog('M.Com', id('Andhra University'), 'Post Graduate', 'Commerce', 'PG', '2 Years', 'B.Com or equivalent', 30000),
    prog('BA', id('Andhra University'), 'Degree', 'Arts', 'UG', '3 Years', '10+2 in any stream', 22000),
    prog('MA (English)', id('Andhra University'), 'Post Graduate', 'Arts', 'PG', '2 Years', 'Graduation in any discipline', 25000),

    // ── Swami Vivekanand Subharti University ──────────────────────────
    prog('MBA', id('Swami Vivekanand Subharti University'), 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 60000),
    prog('MBA - Hospital Administration', id('Swami Vivekanand Subharti University'), 'MBA', 'Medical', 'PG', '2 Years', 'Graduation in any discipline', 65000),
    prog('MCA', id('Swami Vivekanand Subharti University'), 'MCA', 'IT', 'PG', '2 Years', 'BCA or Graduation with Maths', 55000),
    prog('BBA', id('Swami Vivekanand Subharti University'), 'Degree', 'Management', 'UG', '3 Years', '10+2 in any stream', 45000),
    prog('BCA', id('Swami Vivekanand Subharti University'), 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 40000),
    prog('B.Com', id('Swami Vivekanand Subharti University'), 'Degree', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 35000),
    prog('Diploma in Computer Applications', id('Swami Vivekanand Subharti University'), 'Diploma', 'IT', 'UG', '1 Year', '10+2 in any stream', 20000),

    // ── Guru Kashi University ─────────────────────────────────────────
    prog('MBA', id('Guru Kashi University'), 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 55000),
    prog('MBA - Finance', id('Guru Kashi University'), 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 55000),
    prog('BBA', id('Guru Kashi University'), 'Degree', 'Management', 'UG', '3 Years', '10+2 in any stream', 45000),
    prog('BCA', id('Guru Kashi University'), 'BCA', 'IT', 'UG', '3 Years', '10+2 in any stream', 40000),
    prog('B.Com', id('Guru Kashi University'), 'Degree', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 35000),
    prog('Diploma in Management', id('Guru Kashi University'), 'Diploma', 'Management', 'UG', '1 Year', '10+2 in any stream', 18000),

    // ── Mizoram University ────────────────────────────────────────────
    prog('MBA', id('Mizoram University'), 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 40000),
    prog('MA (English)', id('Mizoram University'), 'Post Graduate', 'Arts', 'PG', '2 Years', 'Graduation in any discipline', 22000),
    prog('MA (Political Science)', id('Mizoram University'), 'Post Graduate', 'Arts', 'PG', '2 Years', 'Graduation in any discipline', 22000),
    prog('M.Sc (Mathematics)', id('Mizoram University'), 'Post Graduate', 'Science', 'PG', '2 Years', 'B.Sc with Mathematics', 25000),
    prog('BA', id('Mizoram University'), 'Degree', 'Arts', 'UG', '3 Years', '10+2 in any stream', 18000),
    prog('B.Com', id('Mizoram University'), 'Degree', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 20000),

    // ── Aligarh Muslim University ─────────────────────────────────────
    prog('MBA', id('Aligarh Muslim University'), 'MBA', 'Management', 'PG', '2 Years', 'Graduation in any discipline', 45000),
    prog('MA (English)', id('Aligarh Muslim University'), 'Post Graduate', 'Arts', 'PG', '2 Years', 'Graduation in any discipline', 20000),
    prog('MA (Economics)', id('Aligarh Muslim University'), 'Post Graduate', 'Arts', 'PG', '2 Years', 'Graduation in any discipline', 20000),
    prog('B.Com', id('Aligarh Muslim University'), 'Degree', 'Commerce', 'UG', '3 Years', '10+2 in any stream', 22000),
    prog('BA', id('Aligarh Muslim University'), 'Degree', 'Arts', 'UG', '3 Years', '10+2 in any stream', 18000),
    prog('Diploma in Urdu', id('Aligarh Muslim University'), 'Diploma', 'Others', 'UG', '1 Year', '10+2 in any stream', 10000),

    // ── Board of Open Schooling & Skill Education (BOSE) ─────────────
    prog('Secondary (Class 10)', id('Board of Open Schooling & Skill Education'), 'SSLC', 'Others', 'UG', '1 Year', 'Class 8 pass', 5000),
    prog('Senior Secondary - Science (Class 12)', id('Board of Open Schooling & Skill Education'), '+2', 'Science', 'UG', '1 Year', 'Class 10 pass', 6000),
    prog('Senior Secondary - Commerce (Class 12)', id('Board of Open Schooling & Skill Education'), '+2', 'Commerce', 'UG', '1 Year', 'Class 10 pass', 6000),
    prog('Senior Secondary - Arts (Class 12)', id('Board of Open Schooling & Skill Education'), '+2', 'Arts', 'UG', '1 Year', 'Class 10 pass', 6000),
    prog('Diploma in Vocational Studies', id('Board of Open Schooling & Skill Education'), 'Diploma', 'Others', 'UG', '1 Year', 'Class 10 pass', 8000),

    // ── Jamia Urdu Aligarh ────────────────────────────────────────────
    prog('Adib (Urdu Language Certificate)', id('Jamia Urdu Aligarh'), 'Diploma', 'Arts', 'UG', '1 Year', '10+2 or equivalent', 8000),
    prog('Adib Mahir (Urdu Advanced)', id('Jamia Urdu Aligarh'), 'Diploma', 'Arts', 'UG', '1 Year', '10+2 or equivalent', 10000),
    prog('Fazil Urdu (Degree)', id('Jamia Urdu Aligarh'), 'Degree', 'Arts', 'UG', '3 Years', '10+2 or equivalent', 15000),
    prog('Diploma in Urdu Journalism', id('Jamia Urdu Aligarh'), 'Diploma', 'Arts', 'UG', '1 Year', '10+2 or equivalent', 12000),

    // ── National Institute of Open Schooling (NIOS) ───────────────────
    prog('Secondary (Class 10)', id('National Institute of Open Schooling'), 'SSLC', 'Others', 'UG', '1 Year', 'Class 8 pass', 3500),
    prog('Senior Secondary - Science (Class 12)', id('National Institute of Open Schooling'), '+2', 'Science', 'UG', '1 Year', 'Class 10 pass', 4500),
    prog('Senior Secondary - Commerce (Class 12)', id('National Institute of Open Schooling'), '+2', 'Commerce', 'UG', '1 Year', 'Class 10 pass', 4500),
    prog('Senior Secondary - Humanities (Class 12)', id('National Institute of Open Schooling'), '+2', 'Arts', 'UG', '1 Year', 'Class 10 pass', 4500),
    prog('Vocational Course - Information Technology', id('National Institute of Open Schooling'), 'Diploma', 'IT', 'UG', '1 Year', 'Class 10 pass', 6000),
    prog('Vocational Course - Healthcare', id('National Institute of Open Schooling'), 'Diploma', 'Medical', 'UG', '1 Year', 'Class 10 pass', 6000),
  ].filter(p => p.university);

  console.log('Seeding', PROGRAMS.length, 'programs...');
  let ok = 0, fail = 0;
  for (const p of PROGRAMS) {
    try {
      await post('/api/admin/programs', p);
      process.stdout.write('.');
      ok++;
    } catch (e) {
      console.error('\nFAIL', p.name, '-', e.message.slice(0, 80));
      fail++;
    }
  }
  console.log('\nDone:', ok, 'seeded,', fail, 'failed');
}

main().catch(console.error);
