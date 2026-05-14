import { NextResponse } from 'next/server';
import Program from '@/models/Program';
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

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { answers = {}, questions = [] } = body;

    const query: Record<string, any> = {};

    // 1. Field → courseType filter (primary)
    const fieldQuestion = questions.find((q: any) => q.field === 'field');
    const fieldAnswer = fieldQuestion ? answers[fieldQuestion.field] : answers['field'];

    if (fieldAnswer && fieldAnswer !== 'skill' && fieldAnswer !== 'openschool') {
      const courseType = FIELD_TO_COURSE_TYPE[fieldAnswer];
      const fieldOption = fieldQuestion?.options?.find((o: any) => o.value === fieldAnswer);
      const categories: string[] = fieldOption?.categories || [];

      const orConditions: any[] = [];
      if (courseType) orConditions.push({ courseType });
      if (categories.length > 0) {
        orConditions.push({
          category: { $in: categories.map((c: string) => new RegExp(c, 'i')) },
        });
      }
      if (orConditions.length === 1) Object.assign(query, orConditions[0]);
      else if (orConditions.length > 1) query.$or = orConditions;
    }

    // 2. Budget → fee range filter
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

    // Fetch with courseType/category filter + fee filter
    let programs = await Program.find(query)
      .populate('university', 'name')
      .lean()
      .limit(20);

    // If fee filter eliminated all results, relax it
    if (programs.length === 0 && query.fee) {
      const relaxed = { ...query };
      delete relaxed.fee;
      programs = await Program.find(relaxed)
        .populate('university', 'name')
        .lean()
        .limit(20);
    }

    // If still nothing, return all programs as fallback
    if (programs.length === 0) {
      programs = await Program.find({})
        .populate('university', 'name')
        .lean()
        .limit(12);
    }

    // Featured programs first
    programs.sort((a: any, b: any) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    return NextResponse.json({ programs: programs.slice(0, 8) });
  } catch (err) {
    console.error('course-finder-results error:', err);
    return NextResponse.json({ programs: [] }, { status: 500 });
  }
}
