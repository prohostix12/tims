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
  if (val === 'credit_transfer_program') return { category: { $regex: 'Credit Transfer', $options: 'i' } };
  if (val === 'diploma') return { level: 'Diploma' };
  if (val === 'sslc_plus_two' || val === 'sslc,plus_two' || val === 'sslc' || val === 'plus_two') {
    return {
      $or: [
        { category: { $in: ['SSLC', '+2', 'Others'] } },
        { level: { $in: ['Secondary', 'Sr Secondary', 'Senior Secondary'] } }
      ]
    };
  }
  return null;
}

function getInterestFilter(val: string): Record<string, any> | null {
  if (!val || val === 'any') return null;
  const map: Record<string, string> = {
    management: 'Management|Commerce',
    technology: 'IT',
    'arts-science': 'Arts|Science',
    foundation: 'Others|Arts|Science|Commerce',
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
  if (val === 'campus') return { type: { $regex: 'Campus|Offline|Credit Transfer', $options: 'i' } };
  return null;
}

function getBudgetFilter(val: string, budgetQ: any): Record<string, any> | null {
  if (!val || val === 'any') return null;
  const opt = budgetQ?.options?.find((o: any) => o.value === val);
  
  // Hardcoded fallback limits for robustness
  const fallbackOpts: Record<string, { min?: number, max?: number }> = {
    low: { max: 50000 },
    mid1: { min: 50000, max: 100000 },
    mid2: { min: 100000, max: 200000 },
    high: { min: 200000 },
  };

  const limits = opt || fallbackOpts[val];
  if (!limits) return null;

  const feeQ: Record<string, number> = {};
  if (limits.min != null) feeQ.$gte = limits.min;
  if (limits.max != null) feeQ.$lte = limits.max;
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

    const isSslcPlusTwo = ['sslc_plus_two', 'sslc,plus_two', 'sslc', 'plus_two'].includes(categoryAns);

    const eduF      = getEduFilter(eduAns);
    const catF      = getCategoryFilter(categoryAns);
    const interestF = isSslcPlusTwo ? null : getInterestFilter(interestAns);
    const modeF     = isSslcPlusTwo ? null : getModeFilter(modeAns);
    const budgetF   = getBudgetFilter(budgetAns, budgetQ);

    // ── Fetch universities independently (always returned even if programs fail) ──
    try {
      allUnis = await University.find({ status: { $ne: 'inactive' } })
        .select('name _id slug type location logo')
        .lean()
        .limit(50) as any[];
    } catch { /* universities unavailable — return empty list */ }

    const dedup = (qs: (Record<string, any> | null)[]) => {
      const seen = new Set<string>();
      return qs.filter((q): q is Record<string, any> => {
        if (!q) return false;
        const k = JSON.stringify(q);
        if (seen.has(k) || k === '{}') return false;
        seen.add(k);
        return true;
      });
    };

    const firstMatch = async (stages: Record<string, any>[], limit: number) => {
      for (const q of stages) {
        const res = await queryPrograms(q, limit).catch(() => []);
        if (res.length > 0) return res;
      }
      return [];
    };

    // ── Step 1: fetch programs that match the selected price range ──────────
    let inRangePrograms: any[] = [];
    if (budgetF) {
      const stages = [
        merge(catF, eduF, interestF, modeF, budgetF),
        merge(catF, eduF, interestF, budgetF),
        merge(catF, budgetF),
      ];
      if (!catF) {
        stages.push(budgetF);
      }
      inRangePrograms = await firstMatch(dedup(stages), 20);
    }

    // ── Step 2: fetch programs without budget constraint (broader pool) ──────
    const broadStages = [
      merge(catF, eduF, interestF, modeF),
      merge(catF, eduF, interestF),
      merge(catF, eduF),
    ];
    if (catF) {
      broadStages.push(catF);
    } else {
      if (eduF) broadStages.push(eduF);
    }
    const broadPrograms = await firstMatch(dedup(broadStages), 30);

    // ── Step 3: merge — in-range first, then the rest (deduped) ─────────────
    const seenIds = new Set<string>();
    const merged: any[] = [];
    const addAll = (list: any[]) => {
      for (const p of list) {
        const id = String(p._id);
        if (!seenIds.has(id)) { seenIds.add(id); merged.push(p); }
      }
    };
    addAll(inRangePrograms);
    addAll(broadPrograms);

    programs = merged.length > 0 ? merged : await queryPrograms(catF || {}, 12).catch(() => []);

    // ── Step 4: sort — in-range → priority unis → featured ──────────────────
    const inRangeIds = new Set(inRangePrograms.map((p: any) => String(p._id)));
    const PRIORITY_UNIS = ['gla', 'manipur international'];
    const uniPriority = (p: any) => {
      const name = (p.university?.name || '').toLowerCase();
      if (name.includes('jamia')) return 2;
      if (PRIORITY_UNIS.some(u => name.includes(u))) return 1;
      return 0;
    };

    programs.sort((a: any, b: any) => {
      const aIn = inRangeIds.has(String(a._id)) ? 1 : 0;
      const bIn = inRangeIds.has(String(b._id)) ? 1 : 0;
      if (bIn !== aIn) return bIn - aIn;
      const byPriority = uniPriority(b) - uniPriority(a);
      if (byPriority !== 0) return byPriority;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
    const finalPrograms = programs.slice(0, 8);

    // ── Build university list: matched universities first, then all others ────
    // Deduplicate by name to resolve duplicates in the database
    const uniMap = new Map<string, any>();
    
    const addUni = (u: any) => {
      if (!u || !u.name) return;
      const key = u.name.trim().toLowerCase();
      const existing = uniMap.get(key);
      if (!existing) {
        uniMap.set(key, u);
      } else {
        const preferNew = (!existing.slug && u.slug) || (existing.status !== 'active' && u.status === 'active');
        if (preferNew) {
          uniMap.set(key, u);
        }
      }
    };

    finalPrograms.forEach((p: any) => {
      addUni(p.university);
    });
    allUnis.forEach((u: any) => {
      addUni(u);
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
