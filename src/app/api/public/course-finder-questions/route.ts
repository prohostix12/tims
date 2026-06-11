import { NextResponse } from 'next/server';
import { CourseFinderQuestion } from '@/models/CourseFinderQuestion';
import connectDB from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const questions = await CourseFinderQuestion.find({}).sort({ order: 1 });
    return NextResponse.json(questions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
