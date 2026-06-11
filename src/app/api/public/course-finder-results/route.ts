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

const UG_PREFIX = '^(B\\.?Com|BBA|BCA|B\\.?A|B\\.?Sc|BSc|B\\.?Tech|BTech|BMS|BJMC|BHM|LLB|B\\.?Pharm|B\\.?Ed|BE\\b|Diploma|Secondary|Senior Secondary|Adib|Fazil|Vocational)';
const PG_PREFIX = '^(MBA|MCA|M\\.?Com|M\\.?Sc|MSc|M\\.?Tech|MTech|PGDM|MMS|LLM|M\\.?Ed|M\\.?Pharm|Ph\\.?D|PhD|M\\.?A|MSW|ME\\b|Post Graduate)';

function getAnswer(answers: Record<string, string>, questions: any[], field: string): string {
  const q = questions.find((q: any) => q.field === field || q.stepId === field);
  return (q ? answers[q.field || q.stepId] : answers[field]) || '';
}

function getEduFilter(val: string): Record<string, any> | null {
  if (!val) return null;
  if (val === 'plus-two' || val === '12th') {
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
  return null;
}

function getCategoryFilter(val: string): Record<string, any> | null {
  if (!val) return null;
  if (val === 'online_ug') return { $or: [{ level: 'UG' }, { category: { $regex: 'UG|Degree', $options: 'i' } }] };
  if (val === 'online_pg') return { $or: [{ level: 'PG' }, { category: { $regex: 'PG|Post Graduate', $options: 'i' } }] };
  if (val === 'credit_transfer_program') return { category: 'Credit Transfer' };
  if (val === 'diploma') return { category: 'Diploma' };
  if (val === 'sslc') return { category: 'SSLC' };
  if (val === 'plus_two') return { category: '+2' };
  return null;
}

function getInterestFilter(val: string): Record<string, any> | null {
  if (!val || val === 'any') return null;
  const map: Record<string, string> = {
    management: 'Management|Commerce',
    technology: 'IT',
    'arts-science': 'Arts|Science',
    foundation: 'Others',
    skill: 'Others'
  };
  const type = map[val];
  if (!type) return null;
  return { courseType: { $regex: type, $options: 'i' } };
}

function getModeFilter(val: string): Record<string, any> | null {
  if (!val) return null;
  if (val === 'online') return { type: 'Online' };
  if (val === 'distance') return { type: { $regex: 'Distance|Open', $options: 'i' } };
  return null;
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
  let allUnis: any[] = [];
  let programs: any[] = [];

  try {
    await connectDB();

    const body   = await req.json();
    const { answers = {}, questions = [] } = body;

    const eduAns      = getAnswer(answers, questions, 'qualification');
    const categoryAns = getAnswer(answers, questions, 'category');
    const interestAns = getAnswer(answers, questions, 'interest');
    const modeAns     = getAnswer(answers, questions, 'mode');
    const budgetAns   = getAnswer(answers, questions, 'budget');

    const budgetQ  = questions.find((q: any) => q.field === 'budget' || q.stepId === 'budget');

    const eduF      = getEduFilter(eduAns);
    const catF      = getCategoryFilter(categoryAns);
    const interestF = getInterestFilter(interestAns);
    const modeF     = getModeFilter(modeAns);
    const budgetF   = getBudgetFilter(budgetAns, budgetQ);

    // ── Fetch universities independently (always returned even if programs fail) ──
    try {
      allUnis = await University.find({ status: { $ne: 'inactive' } })
        .select('name _id slug type location logo')
        .lean()
        .limit(50) as any[];
    } catch { /* universities unavailable — return empty list */ }

    // ── Progressive relaxation: most specific → least specific ───────────────
    const stages: Array<Record<string, any>> = [];

    stages.push(merge(catF, eduF, interestF, modeF, budgetF));
    stages.push(merge(catF, eduF, interestF, budgetF));
    stages.push(merge(catF, eduF, interestF));
    stages.push(merge(catF, eduF));
    if (catF) stages.push(catF);
    if (eduF) stages.push(eduF);

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

    const universities = Array.from(uniMap.values());

    return NextResponse.json({
      programs: finalPrograms,
      universities: universities.slice(0, 10),
    });

  } catch (err) {
    console.error('course-finder-results error:', err);
    return NextResponse.json({ programs: [], universities: allUnis.slice(0, 10) });
  }
}
