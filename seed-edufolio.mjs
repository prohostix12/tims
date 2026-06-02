// seed-edufolio.mjs
// Seeds exact programs from edufolio.org for only the universities already in Tims.
// Run: node seed-edufolio.mjs

const BASE = 'http://localhost:3000';

async function post(url, body) {
  const r = await fetch(BASE + url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json();
  if (!r.ok) throw new Error(JSON.stringify(j));
  return j;
}

function toSlug(t) { return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

function courseType(category) {
  if (['MBA', 'BBA'].includes(category)) return 'Management';
  if (['MCA', 'BCA'].includes(category)) return 'IT';
  if (['B.Com', 'M.Com'].includes(category)) return 'Commerce';
  if (['BA', 'MA'].includes(category)) return 'Arts';
  return 'Others';
}

function level(lvl) { return lvl === 'Postgraduate' ? 'PG' : 'UG'; }

async function main() {
  const unis = await fetch(BASE + '/api/admin/universities').then(r => r.json());
  const getId = name => {
    const u = unis.find(u => u.name === name);
    return u ? u._id : null;
  };

  // Amrita Vishwa Vidyapeetham maps to "Amrita University" in Tims
  const uniMap = {
    'Amrita Vishwa Vidyapeetham':              getId('Amrita University'),
    'Manipal University':                      getId('Manipal University'),
    'GLA University':                          getId('GLA University'),
    'Jain University':                         getId('Jain University'),
    'Andhra University':                       getId('Andhra University'),
    'Swami Vivekanand Subharti University':    getId('Swami Vivekanand Subharti University'),
    'Mizoram University':                      getId('Mizoram University'),
    'Aligarh Muslim University':               getId('Aligarh Muslim University'),
  };

  console.log('University ID mapping:');
  Object.entries(uniMap).forEach(([k, v]) => console.log(' ', k, '->', v || 'NOT FOUND'));

  // Clear existing programs
  const old = await fetch(BASE + '/api/admin/programs').then(r => r.json());
  for (const p of old) await fetch(BASE + '/api/admin/programs/' + p._id, { method: 'DELETE' });
  console.log('\nCleared', old.length, 'old programs');

  // Exact programs from edufolio.org API
  const EDUFOLIO_PROGRAMS = [
    // ── Manipal University ──────────────────────────────────────────────────────
    { name: 'BCA in Cloud Computing',                           category: 'BCA', level: 'Undergraduate', duration: '3 Years', fee: 135000,  uni: 'Manipal University' },
    { name: 'BCA Cyber Security',                               category: 'BCA', level: 'Undergraduate', duration: '3 Years', fee: 135000,  uni: 'Manipal University' },
    { name: 'BCA in Data Science & Analytics',                  category: 'BCA', level: 'Undergraduate', duration: '3 Years', fee: 135000,  uni: 'Manipal University' },
    { name: 'BBA in Digital Marketing',                         category: 'BBA', level: 'Undergraduate', duration: '3 Years', fee: 135000,  uni: 'Manipal University' },
    { name: 'BBA in Retail & E-Commerce',                       category: 'BBA', level: 'Undergraduate', duration: '3 Years', fee: 135000,  uni: 'Manipal University' },
    { name: 'BBA in Data Analytics',                            category: 'BBA', level: 'Undergraduate', duration: '3 Years', fee: 135000,  uni: 'Manipal University' },
    { name: 'BBA in Entrepreneurship Management & Family Business', category: 'BBA', level: 'Undergraduate', duration: '3 Years', fee: 135000,  uni: 'Manipal University' },
    { name: 'BBA in Finance and Accounting',                    category: 'BBA', level: 'Undergraduate', duration: '3 Years', fee: 135000,  uni: 'Manipal University' },
    { name: 'BBA in Marketing',                                 category: 'BBA', level: 'Undergraduate', duration: '3 Years', fee: 135000,  uni: 'Manipal University' },
    { name: 'BBA in Human Resource Management',                 category: 'BBA', level: 'Undergraduate', duration: '3 Years', fee: 135000,  uni: 'Manipal University' },
    { name: 'BCom in Economics',                                category: 'B.Com', level: 'Undergraduate', duration: '3 Years', fee: 99000,  uni: 'Manipal University' },
    { name: 'BCom in Accounting with AI',                       category: 'B.Com', level: 'Undergraduate', duration: '3 Years', fee: 99000,  uni: 'Manipal University' },
    { name: 'BCom in Business Accounting & Taxation',           category: 'B.Com', level: 'Undergraduate', duration: '3 Years', fee: 99000,  uni: 'Manipal University' },
    { name: 'BCom in Financial Analytics',                      category: 'B.Com', level: 'Undergraduate', duration: '3 Years', fee: 99000,  uni: 'Manipal University' },
    { name: 'BCom in Business Analytics',                       category: 'B.Com', level: 'Undergraduate', duration: '3 Years', fee: 99000,  uni: 'Manipal University' },
    { name: 'BCom in Banking & FinTech',                        category: 'B.Com', level: 'Undergraduate', duration: '3 Years', fee: 99000,  uni: 'Manipal University' },
    { name: 'BCom in E-Commerce',                               category: 'B.Com', level: 'Undergraduate', duration: '3 Years', fee: 99000,  uni: 'Manipal University' },
    { name: 'BCom in Digital Marketing with AI',                category: 'B.Com', level: 'Undergraduate', duration: '3 Years', fee: 99000,  uni: 'Manipal University' },
    { name: 'MCA in Comprehensive Emerging Technology',         category: 'MCA',   level: 'Postgraduate',  duration: '2 Years', fee: 158000, uni: 'Manipal University' },
    { name: 'MCA in Cyber Security',                            category: 'MCA',   level: 'Postgraduate',  duration: '2 Years', fee: 158000, uni: 'Manipal University' },
    { name: 'MCA in Cloud Computing',                           category: 'MCA',   level: 'Postgraduate',  duration: '2 Years', fee: 158000, uni: 'Manipal University' },
    { name: 'MCA in Data Science',                              category: 'MCA',   level: 'Postgraduate',  duration: '2 Years', fee: 158000, uni: 'Manipal University' },
    { name: 'MCA in Artificial Intelligence & Machine Learning',category: 'MCA',   level: 'Postgraduate',  duration: '2 Years', fee: 158000, uni: 'Manipal University' },
    { name: 'MBA in Finance',                                   category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 175000, uni: 'Manipal University' },
    { name: 'MBA in Marketing',                                 category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 175000, uni: 'Manipal University' },
    { name: 'MBA in Digital Marketing',                         category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 175000, uni: 'Manipal University' },
    { name: 'MBA in Human Resource Management',                 category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 175000, uni: 'Manipal University' },
    { name: 'MBA in Information System Management',             category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 175000, uni: 'Manipal University' },
    { name: 'MBA in Analytics & Data Science',                  category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 175000, uni: 'Manipal University' },
    { name: 'MBA in IT & FinTech',                              category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 175000, uni: 'Manipal University' },
    { name: 'MBA in Banking, Financial Services and Insurance', category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 175000, uni: 'Manipal University' },
    { name: 'MBA in Operations Management',                     category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 175000, uni: 'Manipal University' },
    { name: 'MBA in International Business',                    category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 175000, uni: 'Manipal University' },
    { name: 'MBA in Project Management',                        category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 175000, uni: 'Manipal University' },
    { name: 'MBA in Supply Chain Management',                   category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 175000, uni: 'Manipal University' },
    { name: 'MBA in Retail Management',                         category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 175000, uni: 'Manipal University' },
    { name: 'Master of Commerce',                               category: 'M.Com', level: 'Postgraduate',  duration: '2 Years', fee: 108000, uni: 'Manipal University' },
    { name: 'MA in Economics',                                  category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 80000,  uni: 'Manipal University' },
    { name: 'MA in Journalism and Mass Communication',          category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 140000, uni: 'Manipal University' },

    // ── Amrita Vishwa Vidyapeetham → Amrita University ──────────────────────────
    { name: 'BCA General',                                      category: 'BCA',   level: 'Undergraduate', duration: '3 Years', fee: 150500, uni: 'Amrita Vishwa Vidyapeetham' },
    { name: 'BCA Artificial Intelligence & Data Science',       category: 'BCA',   level: 'Undergraduate', duration: '3 Years', fee: 180500, uni: 'Amrita Vishwa Vidyapeetham' },
    { name: 'BBA General',                                      category: 'BBA',   level: 'Undergraduate', duration: '3 Years', fee: 150500, uni: 'Amrita Vishwa Vidyapeetham' },
    { name: 'Bachelor of Commerce',                             category: 'B.Com', level: 'Undergraduate', duration: '3 Years', fee: 135500, uni: 'Amrita Vishwa Vidyapeetham' },
    { name: 'MCA General',                                      category: 'MCA',   level: 'Postgraduate',  duration: '2 Years', fee: 150500, uni: 'Amrita Vishwa Vidyapeetham' },
    { name: 'MCA in Cyber Security',                            category: 'MCA',   level: 'Postgraduate',  duration: '2 Years', fee: 205500, uni: 'Amrita Vishwa Vidyapeetham' },
    { name: 'MCA Artificial Intelligence & Machine Learning',   category: 'MCA',   level: 'Postgraduate',  duration: '2 Years', fee: 205500, uni: 'Amrita Vishwa Vidyapeetham' },
    { name: 'MBA in Marketing',                                 category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 230500, uni: 'Amrita Vishwa Vidyapeetham' },
    { name: 'MBA in Finance',                                   category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 230500, uni: 'Amrita Vishwa Vidyapeetham' },
    { name: 'MBA in Operations Management',                     category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 230500, uni: 'Amrita Vishwa Vidyapeetham' },
    { name: 'MBA in Human Resource Management',                 category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 230500, uni: 'Amrita Vishwa Vidyapeetham' },
    { name: 'MBA in General Management',                        category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 180500, uni: 'Amrita Vishwa Vidyapeetham' },
    { name: 'MBA in Artificial Intelligence',                   category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 250500, uni: 'Amrita Vishwa Vidyapeetham' },
    { name: 'MBA in Business Analytics & Financial Technology', category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 230500, uni: 'Amrita Vishwa Vidyapeetham' },
    { name: 'MBA in Environmental, Social & Governance',        category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 270500, uni: 'Amrita Vishwa Vidyapeetham' },

    // ── GLA University ──────────────────────────────────────────────────────────
    { name: 'Bachelor of Computer Application',                 category: 'BCA',   level: 'Undergraduate', duration: '3 Years', fee: 99500,  uni: 'GLA University' },
    { name: 'BBA Banking and Insurance',                        category: 'BBA',   level: 'Undergraduate', duration: '3 Years', fee: 99500,  uni: 'GLA University' },
    { name: 'BBA Financial Management',                         category: 'BBA',   level: 'Undergraduate', duration: '3 Years', fee: 99500,  uni: 'GLA University' },
    { name: 'BBA Human Resource Management',                    category: 'BBA',   level: 'Undergraduate', duration: '3 Years', fee: 99500,  uni: 'GLA University' },
    { name: 'BBA Marketing Management',                         category: 'BBA',   level: 'Undergraduate', duration: '3 Years', fee: 99500,  uni: 'GLA University' },
    { name: 'Bachelor of Commerce',                             category: 'B.Com', level: 'Undergraduate', duration: '3 Years', fee: 71000,  uni: 'GLA University' },
    { name: 'Master of Computer Application',                   category: 'MCA',   level: 'Postgraduate',  duration: '2 Years', fee: 94000,  uni: 'GLA University' },
    { name: 'MBA Human Resource Management',                    category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 105000, uni: 'GLA University' },
    { name: 'MBA Financial Management',                         category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 105000, uni: 'GLA University' },
    { name: 'MBA in Information Technology',                    category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 105000, uni: 'GLA University' },
    { name: 'MBA in Operations Management',                     category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 105000, uni: 'GLA University' },
    { name: 'MBA in Banking & Financial Services',              category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 105000, uni: 'GLA University' },
    { name: 'MBA in Business Analytics',                        category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 105000, uni: 'GLA University' },
    { name: 'MBA in Supply Chain Management',                   category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 105000, uni: 'GLA University' },
    { name: 'MBA Marketing Management',                         category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 105000, uni: 'GLA University' },

    // ── Jain University ──────────────────────────────────────────────────────────
    { name: 'Bachelor of Computer Application',                 category: 'BCA',   level: 'Undergraduate', duration: '3 Years', fee: 74500,  uni: 'Jain University' },
    { name: 'Bachelor of Commerce',                             category: 'B.Com', level: 'Undergraduate', duration: '3 Years', fee: 66500,  uni: 'Jain University' },
    { name: 'Bachelor of Business Administration',              category: 'BBA',   level: 'Undergraduate', duration: '3 Years', fee: 77000,  uni: 'Jain University' },
    { name: 'Bachelor of Library and Information Science',      category: 'Other', level: 'Undergraduate', duration: '3 Years', fee: 28500,  uni: 'Jain University' },
    { name: 'Master of Computer Application',                   category: 'MCA',   level: 'Postgraduate',  duration: '2 Years', fee: 70500,  uni: 'Jain University' },
    { name: 'Master of Commerce',                               category: 'M.Com', level: 'Postgraduate',  duration: '2 Years', fee: 39500,  uni: 'Jain University' },
    { name: 'Master of Business Administration',                category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 100500, uni: 'Jain University' },
    { name: 'MA Economics',                                     category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 39500,  uni: 'Jain University' },
    { name: 'Master of Social Work',                            category: 'Other', level: 'Postgraduate',  duration: '2 Years', fee: 43500,  uni: 'Jain University' },

    // ── Andhra University ────────────────────────────────────────────────────────
    { name: 'BCom E-Accounting',                                category: 'B.Com', level: 'Undergraduate', duration: '3 Years', fee: 67000,  uni: 'Andhra University' },
    { name: 'Bachelor of Commerce',                             category: 'B.Com', level: 'Undergraduate', duration: '3 Years', fee: 43750,  uni: 'Andhra University' },
    { name: 'BA Politics',                                      category: 'BA',    level: 'Undergraduate', duration: '3 Years', fee: 43750,  uni: 'Andhra University' },
    { name: 'BA Economics',                                     category: 'BA',    level: 'Undergraduate', duration: '3 Years', fee: 43750,  uni: 'Andhra University' },
    { name: 'BA History',                                       category: 'BA',    level: 'Undergraduate', duration: '3 Years', fee: 43750,  uni: 'Andhra University' },
    { name: 'Master of Commerce',                               category: 'M.Com', level: 'Postgraduate',  duration: '2 Years', fee: 33700,  uni: 'Andhra University' },
    { name: 'MA English',                                       category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 33700,  uni: 'Andhra University' },
    { name: 'MA Political Science',                             category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 33700,  uni: 'Andhra University' },
    { name: 'MA Economics',                                     category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 33700,  uni: 'Andhra University' },
    { name: 'MA Human Resource Management',                     category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 40100,  uni: 'Andhra University' },
    { name: 'MA Journalism and Mass Communication',             category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 35800,  uni: 'Andhra University' },

    // ── Swami Vivekanand Subharti University ─────────────────────────────────────
    { name: 'Bachelor of Commerce',                             category: 'B.Com', level: 'Undergraduate', duration: '3 Years', fee: 55500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'Bachelor of Commerce (Honours)',                   category: 'B.Com', level: 'Undergraduate', duration: '3 Years', fee: 67500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'Bachelor of Business Administration',              category: 'BBA',   level: 'Undergraduate', duration: '3 Years', fee: 82500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'BA Hindi',                                         category: 'BA',    level: 'Undergraduate', duration: '3 Years', fee: 52500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'BA English',                                       category: 'BA',    level: 'Undergraduate', duration: '3 Years', fee: 52500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'BA Political Science',                             category: 'BA',    level: 'Undergraduate', duration: '3 Years', fee: 52500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'BA History',                                       category: 'BA',    level: 'Undergraduate', duration: '3 Years', fee: 52500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'BA Economics',                                     category: 'BA',    level: 'Undergraduate', duration: '3 Years', fee: 52500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'BA Sociology',                                     category: 'BA',    level: 'Undergraduate', duration: '3 Years', fee: 52500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'BA Maths',                                         category: 'BA',    level: 'Undergraduate', duration: '3 Years', fee: 52500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'BA Journalism and Mass Communication',             category: 'BA',    level: 'Undergraduate', duration: '3 Years', fee: 67500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'Bachelor of Library and Information Science',      category: 'Other', level: 'Undergraduate', duration: '3 Years', fee: 28500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'MBA in Human Resource Management',                 category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 77500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'MBA in Information Technology',                    category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 77500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'MBA in Marketing Management',                      category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 77500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'MBA in Financial Management',                      category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 77500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'MBA in Fashion Designing',                         category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 77500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'MBA in Operations Management',                     category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 77500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'MBA in Supply Chain Management',                   category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 77500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'MBA in Project Management',                        category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 77500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'Master of Commerce',                               category: 'M.Com', level: 'Postgraduate',  duration: '2 Years', fee: 47500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'MA Political Science',                             category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 46500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'MA History',                                       category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 46500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'MA Hindi',                                         category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 46500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'MA Economics',                                     category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 46500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'MA English',                                       category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 46500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'MA Sociology',                                     category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 46500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'MA Maths',                                         category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 46500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'MA Home Science',                                  category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 44500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'MA Public Administration',                         category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 46500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'MA Education',                                     category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 55500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'MA Buddhist Studies',                              category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 45500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'Master of Library and Information Sciences',       category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 33500,  uni: 'Swami Vivekanand Subharti University' },
    { name: 'MA Journalism and Mass Communication',             category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 57500,  uni: 'Swami Vivekanand Subharti University' },

    // ── Mizoram University ───────────────────────────────────────────────────────
    { name: 'BCom E-Commerce',                                  category: 'B.Com', level: 'Undergraduate', duration: '3 Years', fee: 67230,  uni: 'Mizoram University' },
    { name: 'BBA E-Business',                                   category: 'BBA',   level: 'Undergraduate', duration: '3 Years', fee: 76860,  uni: 'Mizoram University' },
    { name: 'Master of Commerce',                               category: 'M.Com', level: 'Postgraduate',  duration: '2 Years', fee: 56090,  uni: 'Mizoram University' },
    { name: 'MBA Marketing Management',                         category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 66050,  uni: 'Mizoram University' },
    { name: 'MBA Entrepreneurship',                             category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 66050,  uni: 'Mizoram University' },
    { name: 'MBA Financial Management',                         category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 66050,  uni: 'Mizoram University' },
    { name: 'MBA Big Data Analytics',                           category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 68690,  uni: 'Mizoram University' },
    { name: 'MBA Logistics and Supply Chain Management',        category: 'MBA',   level: 'Postgraduate',  duration: '2 Years', fee: 68690,  uni: 'Mizoram University' },

    // ── Aligarh Muslim University ────────────────────────────────────────────────
    { name: 'BA English with Internship',                       category: 'BA',    level: 'Undergraduate', duration: '3 Years', fee: 49800,  uni: 'Aligarh Muslim University' },
    { name: 'BA Economics with Internship',                     category: 'BA',    level: 'Undergraduate', duration: '3 Years', fee: 49800,  uni: 'Aligarh Muslim University' },
    { name: 'BA Hindi with Internship',                         category: 'BA',    level: 'Undergraduate', duration: '3 Years', fee: 49800,  uni: 'Aligarh Muslim University' },
    { name: 'BA History with Internship',                       category: 'BA',    level: 'Undergraduate', duration: '3 Years', fee: 49800,  uni: 'Aligarh Muslim University' },
    { name: 'BA Political Science with Internship',             category: 'BA',    level: 'Undergraduate', duration: '3 Years', fee: 49800,  uni: 'Aligarh Muslim University' },
    { name: 'BA Urdu with Internship',                          category: 'BA',    level: 'Undergraduate', duration: '3 Years', fee: 49800,  uni: 'Aligarh Muslim University' },
    { name: 'Bachelor of Commerce with Internship',             category: 'B.Com', level: 'Undergraduate', duration: '3 Years', fee: 52800,  uni: 'Aligarh Muslim University' },
    { name: 'MA English with Internship',                       category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 37300,  uni: 'Aligarh Muslim University' },
    { name: 'MA Economics with Internship',                     category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 37300,  uni: 'Aligarh Muslim University' },
    { name: 'MA Hindi with Internship',                         category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 37300,  uni: 'Aligarh Muslim University' },
    { name: 'MA History with Internship',                       category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 37300,  uni: 'Aligarh Muslim University' },
    { name: 'MA Political Science with Internship',             category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 37300,  uni: 'Aligarh Muslim University' },
    { name: 'MA in Urdu with Internship',                       category: 'MA',    level: 'Postgraduate',  duration: '2 Years', fee: 37300,  uni: 'Aligarh Muslim University' },
    { name: 'MCom with Internship',                             category: 'M.Com', level: 'Postgraduate',  duration: '2 Years', fee: 39300,  uni: 'Aligarh Muslim University' },
  ];

  console.log('\nSeeding', EDUFOLIO_PROGRAMS.length, 'programs from edufolio.org...');
  let ok = 0, fail = 0, skip = 0;

  for (const p of EDUFOLIO_PROGRAMS) {
    const universityId = uniMap[p.uni];
    if (!universityId) { skip++; continue; }

    const body = {
      name: p.name,
      university: universityId,
      category: p.category,
      courseType: courseType(p.category),
      level: level(p.level),
      duration: p.duration,
      fee: p.fee,
      type: 'Online',
      eligibility: p.level === 'Postgraduate' ? 'Graduation in any discipline' : '10+2 in any stream',
      slug: toSlug(p.uni.slice(0, 8) + '-' + p.name),
    };

    try {
      await post('/api/admin/programs', body);
      process.stdout.write('.');
      ok++;
    } catch (e) {
      console.error('\nFAIL', p.name, '-', e.message.slice(0, 100));
      fail++;
    }
  }

  console.log('\n\n━━━  Done  ━━━');
  console.log('  Seeded  :', ok);
  console.log('  Failed  :', fail);
  console.log('  Skipped :', skip, '(university not in Tims)');
}

main().catch(console.error);
