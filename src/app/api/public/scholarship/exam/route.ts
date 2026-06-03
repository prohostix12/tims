import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ScholarshipApplication } from '@/models/ScholarshipApplication';
import { ScholarshipQuestion } from '@/models/ScholarshipQuestion';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) return NextResponse.json({ error: 'Token required' }, { status: 400 });

    const application = await ScholarshipApplication.findOne({ token });
    if (!application) return NextResponse.json({ error: 'Invalid token' }, { status: 404 });
    if (application.examCompleted) {
      return NextResponse.json({ error: 'Exam already completed' }, { status: 400 });
    }

    const allQuestions = await ScholarshipQuestion.find({ _id: { $in: application.questionIds } });
    const questionMap = new Map();
    allQuestions.forEach((q: any) => questionMap.set(String(q._id), q));

    const shuffle = <T,>(arr: T[]): T[] => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    const questions = application.questionIds
      .map((id: any) => questionMap.get(String(id)))
      .filter(Boolean)
      .map((q: any) => ({
        _id: q._id,
        question: q.question,
        options: shuffle(q.options.map((o: any) => ({ text: o.text, isCorrect: o.isCorrect }))),
      }));

    return NextResponse.json({ questions, applicantName: application.name });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
