import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ScholarshipQuestion } from '@/models/ScholarshipQuestion';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const questions = await ScholarshipQuestion.find({ isActive: true }).sort({ order: 1 });
    const sanitized = questions.map(q => ({
      _id: q._id,
      question: q.question,
      order: q.order,
      options: q.options.map((o: any) => ({ text: o.text, isCorrect: o.isCorrect })),
    }));
    return NextResponse.json(sanitized);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
