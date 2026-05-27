import { NextResponse } from 'next/server';
import Program from '@/models/Program';
import University from '@/models/University';
import connectDB from '@/lib/db';

const FIELD_TO_COURSE_TYPE: Record<string, string> = {
  commerce: 'Commerce',
  arts: 'Arts',
  science: 'Science',
  technology: 'IT',
  tech: 'IT',
  management: 'Management',
  medical: 'Medical',
  law: 'Others',
};

const UG_NAME_PREFIXES = ['B\\.Com', 'BBA', 'BCA', 'B\\.A', 'B\\.Sc', 'BSc', 'B\\.Tech', 'BTech', 'BMS', 'BJMC', 'BHM', 'LLB', 'B\\.Pharm', 'B\\.Ed', 'BE '];
const PG_NAME_PREFIXES = ['MBA', 'MCA', 'M\\.Com', 'M\\.Sc', 'MSc', 'M\\.Tech', 'MTech', 'PGDM', 'MMS', 'LLM', 'M\\.Ed', 'M\\.Pharm', 'Ph\\.D', 'PhD', 'M\\.A\\.', 'M\\.A ', 'ME '];

function buildEduFilter(eduAnswer: string): Record<string, any> | null {
  if (eduAnswer === '12th') {
    return {
      $or: [
        { level: /^(UG|Under\s*Grad|Undergraduate|Bachelor|Diploma)/i },
        { name: { $in: UG_NAME_PREFIXES.map(p => new RegExp(`^${p}`, 'i')) } },
      ],
    };
  }
  if (eduAnswer === 'graduate') {
    return {
      $or: [
        { level: /^(PG|Post\s*Grad|Postgraduate|Master)/i },
        { name: { $in: PG_NAME_PREFIXES.map(p => new RegExp(`^${p}`, 'i')) } },
      ],
    };
  }
  return null;
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { answers = {}, questions = [] } = body;

    const query: Record<string, any> = {};

    // 1. Education level → UG/PG filter
    const eduQuestion = questions.find((q: any) => q.field === 'education');
    const eduAnswer = eduQuestion ? answers[eduQuestion.field] : answers['education'];
    const eduFilter = buildEduFilter(eduAnswer || '');
    if (eduFilter) {
      Object.assign(query, eduFilter);
    }

    // 2. Field → courseType filter
    const fieldQuestion = questions.find((q: any) => q.field === 'field');
    const fieldAnswer = fieldQuestion ? answers[fieldQuestion.field] : answers['field'];

    if (fieldAnswer && fieldAnswer !== 'skill' && fieldAnswer !== 'openschool') {
      const courseType = FIELD_TO_COURSE_TYPE[fieldAnswer];
      const fieldOption = fieldQuestion?.options?.find((o: any) => o.value === fieldAnswer);
      const categories: string[] = fieldOption?.categories || [];

      const fieldConditions: any[] = [];
      if (courseType) fieldConditions.push({ courseType });
      if (categories.length > 0) {
        fieldConditions.push({
          category: { $in: categories.map((c: string) => new RegExp(c, 'i')) },
        });
      }

      if (fieldConditions.length > 0) {
        if (eduFilter) {
          query.$and = [eduFilter, fieldConditions.length === 1 ? fieldConditions[0] : { $or: fieldConditions }];
          if (query.$or) delete query.$or;
        } else {
          if (fieldConditions.length === 1) Object.assign(query, fieldConditions[0]);
          else query.$or = fieldConditions;
        }
      }
    }

    // 3. Budget → fee range filter
    const budgetQuestion = questions.find((q: any) => q.field === 'budget');
    const budgetAnswer = budgetQuestion ? answers[budgetQuestion.field] : answers['budget'];

    if (budgetAnswer && budgetAnswer !== 'any') {
      const budgetOption = budgetQuestion?.options?.find((o: any) => o.value === budgetAnswer);
      if (budgetOption) {
        const feeQuery: Record<string, number> = {};
        if (budgetOption.min != null) feeQuery.$gte = budgetOption.min;
        if (budgetOption.max != null) feeQuery.$lte = budgetOption.max;
        if (Object.keys(feeQuery).length > 0) query.fee = feeQuery;
      }
    }

    const uniTypeAnswer = answers['university_type'];

    // Build relaxed queries upfront, then run all in parallel
    const relaxedNoFee = { ...query };
    delete relaxedNoFee.fee;

    const relaxedNoEdu = { ...relaxedNoFee };
    if (relaxedNoEdu.$and) {
      relaxedNoEdu.$and = relaxedNoEdu.$and.filter((c: any) => c !== eduFilter);
      if (relaxedNoEdu.$and.length === 0) delete relaxedNoEdu.$and;
    }
    if (relaxedNoEdu.$or && JSON.stringify(relaxedNoEdu.$or) === JSON.stringify(eduFilter?.$or)) {
      delete relaxedNoEdu.$or;
    }

    // Run primary program query and ALL universities in parallel (no type filter — show everything)
    const [primaryPrograms, allUnis] = await Promise.all([
      Program.find(query)
        .populate({ path: 'university', model: University, select: 'name _id slug type location logo' })
        .lean()
        .limit(20),
      University.find({ status: { $ne: 'inactive' } })
        .select('name _id slug type location logo')
        .lean()
        .limit(50),
    ]);

    let programs: any[] = primaryPrograms;

    // Relax fee filter if no results
    if (programs.length === 0 && query.fee) {
      programs = await Program.find(relaxedNoFee)
        .populate({ path: 'university', model: University, select: 'name _id slug type location logo' })
        .lean()
        .limit(20);
    }

    // Relax education filter if still nothing
    if (programs.length === 0 && eduFilter) {
      programs = await Program.find(relaxedNoEdu)
        .populate({ path: 'university', model: University, select: 'name _id slug type location logo' })
        .lean()
        .limit(20);
    }

    // Final fallback: return all programs
    if (programs.length === 0) {
      programs = await Program.find({})
        .populate({ path: 'university', model: University, select: 'name _id slug type location logo' })
        .lean()
        .limit(12);
    }

    // 4. University type post-filter
    if (uniTypeAnswer && uniTypeAnswer !== 'any') {
      const typeFiltered = programs.filter((p: any) => {
        const uType = (p.university?.type || '').toLowerCase();
        return uType.includes(uniTypeAnswer.toLowerCase());
      });
      if (typeFiltered.length > 0) programs = typeFiltered;
    }

    // Featured first
    programs.sort((a: any, b: any) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    const finalPrograms = programs.slice(0, 8);

    // Extract unique universities from matched programs first (most relevant)
    const uniMap = new Map<string, any>();
    finalPrograms.forEach((p: any) => {
      const u = p.university;
      if (u && u._id) uniMap.set(String(u._id), u);
    });

    // Merge ALL universities from DB, deduplicating
    allUnis.forEach((u: any) => {
      if (u && u._id && !uniMap.has(String(u._id))) {
        uniMap.set(String(u._id), u);
      }
    });

    let universities: any[] = Array.from(uniMap.values());

    // If user picked a university type, sort matching ones to the top
    if (uniTypeAnswer && uniTypeAnswer !== 'any') {
      universities.sort((a: any, b: any) => {
        const aMatch = (a.type || '').toLowerCase().includes(uniTypeAnswer.toLowerCase()) ? 0 : 1;
        const bMatch = (b.type || '').toLowerCase().includes(uniTypeAnswer.toLowerCase()) ? 0 : 1;
        return aMatch - bMatch;
      });
    }

    return NextResponse.json({
      programs: finalPrograms,
      universities: universities.slice(0, 10),
    });
  } catch (err) {
    console.error('course-finder-results error:', err);
    return NextResponse.json({ programs: [], universities: [] }, { status: 500 });
  }
}
