import { NextResponse } from 'next/server';
import Program from '@/models/Program';
import University from '@/models/University';
import connectDB from '@/lib/db';

// Maps "what course" answer → regex on program name/category
const COURSE_NAME_PATTERN: Record<string, string> = {
  mba:       'MBA',
  mca:       'MCA',
  m_com:     'M\\.?\\s*Com',
  ma:        'M\\.?\\s*A\\b',
  msc:       'M\\.?\\s*Sc',
  msw:       'MSW',
  bba:       'BBA',
  bca:       'BCA',
  b_com:     'B\\.?\\s*Com',
  ba:        '\\bBA\\b',
  bsc:       'B\\.?\\s*Sc',
  b_com_mba: '(?:B\\.?\\s*Com|MBA)',
  bba_mba:   '(?:BBA|MBA)',
  bca_mca:   '(?:BCA|MCA)',
};

const FIELD_TO_COURSE_TYPE: Record<string, string> = {
  commerce:   'Commerce',
  arts:       'Arts',
  science:    'Science',
  technology: 'IT',
  management: 'Management',
  medical:    'Medical',
  law:        'Others',
};

const UG_PREFIX = '^(B\\.?Com|BBA|BCA|B\\.?A|B\\.?Sc|BSc|B\\.?Tech|BTech|BMS|BJMC|BHM|LLB|B\\.?Pharm|B\\.?Ed|BE\\b|Diploma|Secondary|Senior Secondary|Adib|Fazil|Vocational)';
const PG_PREFIX = '^(MBA|MCA|M\\.?Com|M\\.?Sc|MSc|M\\.?Tech|MTech|PGDM|MMS|LLM|M\\.?Ed|M\\.?Pharm|Ph\\.?D|PhD|M\\.?A|MSW|ME\\b|Post Graduate)';

function getAnswer(answers: Record<string, string>, questions: any[], field: string): string {
  const q = questions.find((q: any) => q.field === field);
  return (q ? answers[q.field] : answers[field]) || '';
}

function getCourseFilter(val: string): Record<string, any> | null {
  const p = COURSE_NAME_PATTERN[val];
  if (!p) return null;
  // Match on both name and category fields
  return { $or: [{ name: { $regex: p, $options: 'i' } }, { category: { $regex: p, $options: 'i' } }] };
}

function getEduFilter(val: string): Record<string, any> | null {
  if (val === '12th') {
    return {
      $or: [
        { level: { $regex: '^(UG|Under|Bachelor|Diploma)', $options: 'i' } },
        { name:  { $regex: UG_PREFIX, $options: 'i' } },
      ],
    };
  }
  if (val === 'graduate' || val === 'postgraduate') {
    return {
      $or: [
        { level: { $regex: '^(PG|Post|Master|PhD|Doctoral)', $options: 'i' } },
        { name:  { $regex: PG_PREFIX, $options: 'i' } },
      ],
    };
  }
  return null; // below_12 → no level filter
}

function getFieldFilter(val: string, fieldOpt: any): Record<string, any> | null {
  if (!val || val === 'skill' || val === 'openschool') return null;
  const courseType = FIELD_TO_COURSE_TYPE[val];
  if (!courseType) return null;
  return { courseType };
}

function getSpecFilter(val: string): Record<string, any> | null {
  if (!val || val === 'general') return null;
  const specMap: Record<string, string[]> = {
    finance:     ['Finance', 'Accounting', 'Banking'],
    marketing:   ['Marketing', 'Sales', 'Advertising'],
    it_software: ['IT', 'Software', 'Computer', 'Information Technology'],
    hr:          ['HR', 'Human Resource'],
    operations:  ['Operations', 'Logistics', 'Supply Chain'],
  };
  const kw = specMap[val];
  if (!kw) return null;
  const rx = kw.map(k => new RegExp(k, 'i'));
  return { $or: [{ 'specializations.title': { $in: rx } }, { category: { $in: rx } }, { name: { $in: rx } }] };
}

function getBudgetFilter(val: string, budgetQ: any): Record<string, any> | null {
  if (!val || val === 'any') return null;
  const opt = budgetQ?.options?.find((o: any) => o.value === val);
  if (!opt) return null;
  const feeQ: Record<string, number> = {};
  if (opt.min != null) feeQ.$gte = opt.min;
  if (opt.max != null) feeQ.$lte = opt.max;
  return Object.keys(feeQ).length ? { fee: feeQ } : null;
}

function merge(...filters: (Record<string, any> | null)[]): Record<string, any> {
  const active = filters.filter(Boolean) as Record<string, any>[];
  if (active.length === 0) return {};
  if (active.length === 1) return { ...active[0] };
  return { $and: active };
}

async function queryPrograms(q: Record<string, any>, limit = 20): Promise<any[]> {
  return Program.find(q)
    .populate({ path: 'university', model: University, select: 'name _id slug type location logo' })
    .lean()
    .limit(limit) as Promise<any[]>;
}

export async function POST(req: Request) {
  // Universities and programs are fetched independently so a program-query
  // failure never prevents universities from being returned.
  let allUnis: any[] = [];
  let programs: any[] = [];

  try {
    await connectDB();

    const body   = await req.json();
    const { answers = {}, questions = [] } = body;

    const courseAns  = getAnswer(answers, questions, 'what_course_are_you_interested');
    const eduAns     = getAnswer(answers, questions, 'education');
    const fieldAns   = getAnswer(answers, questions, 'field');
    const specAns    = getAnswer(answers, questions, 'specialization');
    const budgetAns  = getAnswer(answers, questions, 'budget');
    const uniTypeAns = getAnswer(answers, questions, 'university_type');

    const fieldQ  = questions.find((q: any) => q.field === 'field');
    const fieldOpt = fieldQ?.options?.find((o: any) => o.value === fieldAns);
    const budgetQ  = questions.find((q: any) => q.field === 'budget');

    const courseF  = getCourseFilter(courseAns);
    const eduF     = getEduFilter(eduAns);
    const fieldF   = getFieldFilter(fieldAns, fieldOpt);
    const specF    = getSpecFilter(specAns);
    const budgetF  = getBudgetFilter(budgetAns, budgetQ);

    // ── Fetch universities independently (always returned even if programs fail) ──
    try {
      allUnis = await University.find({ status: { $ne: 'inactive' } })
        .select('name _id slug type location logo')
        .lean()
        .limit(50) as any[];
    } catch { /* universities unavailable — return empty list */ }

    // ── Progressive relaxation: most specific → least specific ───────────────
    // Each stage builds on the answers given; if a stage returns results, we stop.
    const stages: Array<Record<string, any>> = [];

    if (courseF) {
      // Most specific: exact course + all refinements
      stages.push(merge(courseF, eduF, fieldF, specF, budgetF));
      stages.push(merge(courseF, eduF, fieldF, budgetF));
      stages.push(merge(courseF, eduF, fieldF));
      stages.push(merge(courseF, eduF));
      stages.push(courseF); // course name alone — always catches something
    }

    if (eduF || fieldF) {
      if (specF) stages.push(merge(eduF, fieldF, specF, budgetF));
      stages.push(merge(eduF, fieldF, budgetF));
      stages.push(merge(eduF, fieldF));
      if (eduF) stages.push(eduF);
      if (fieldF) stages.push(fieldF);
    }

    // Deduplicate identical query objects before running them
    const seen = new Set<string>();
    const uniqueStages = stages.filter(q => {
      const k = JSON.stringify(q);
      if (seen.has(k) || k === '{}') return false;
      seen.add(k);
      return true;
    });

    for (const q of uniqueStages) {
      if (programs.length > 0) break;
      try { programs = await queryPrograms(q, 20); } catch { /* try next stage */ }
    }

    // Final fallback: ALL programs (never empty if DB has data)
    if (programs.length === 0) {
      try { programs = await queryPrograms({}, 12); } catch { /* DB may be down */ }
    }

    // ── University type post-filter ──────────────────────────────────────────
    const normType = uniTypeAns && uniTypeAns !== 'any' ? uniTypeAns.toLowerCase() : null;
    if (normType && programs.length > 0) {
      const typed = programs.filter((p: any) => (p.university?.type || '').toLowerCase() === normType);
      if (typed.length > 0) programs = typed;
    }

    programs.sort((a: any, b: any) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    const finalPrograms = programs.slice(0, 8);

    // ── Build university list: matched universities first, then all others ────
    const uniMap = new Map<string, any>();
    finalPrograms.forEach((p: any) => {
      const u = p.university;
      if (u?._id) uniMap.set(String(u._id), u);
    });
    allUnis.forEach((u: any) => {
      if (u?._id && !uniMap.has(String(u._id))) uniMap.set(String(u._id), u);
    });

    let universities = Array.from(uniMap.values());
    if (normType) {
      universities.sort((a: any, b: any) => {
        const aM = (a.type || '').toLowerCase() === normType ? 0 : 1;
        const bM = (b.type || '').toLowerCase() === normType ? 0 : 1;
        return aM - bM;
      });
    }

    return NextResponse.json({
      programs: finalPrograms,
      universities: universities.slice(0, 10),
    });

  } catch (err) {
    console.error('course-finder-results error:', err);
    // Even on total failure, return whatever universities we managed to fetch
    return NextResponse.json({ programs: [], universities: allUnis.slice(0, 10) });
  }
}
