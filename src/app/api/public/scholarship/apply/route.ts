import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ScholarshipApplication } from '@/models/ScholarshipApplication';
import { ScholarshipQuestion } from '@/models/ScholarshipQuestion';
import { ScholarshipConfig } from '@/models/ScholarshipConfig';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, phone, email, course, university } = await req.json();

    if (!name || !phone || !email || !course || !university) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const existingPhone = await ScholarshipApplication.findOne({ phone: phone.trim() });
    if (existingPhone) {
      return NextResponse.json({ error: 'this number already used' }, { status: 409 });
    }

    const existingEmail = await ScholarshipApplication.findOne({
      email: email.trim().toLowerCase(),
    });
    if (existingEmail) {
      return NextResponse.json({ error: 'this email already used' }, { status: 409 });
    }

    const allQuestions = await ScholarshipQuestion.find({ isActive: true });
    if (allQuestions.length === 0) {
      return NextResponse.json({ error: 'Exam questions are not ready yet.' }, { status: 503 });
    }

    const config = await ScholarshipConfig.findOne({}) || await ScholarshipConfig.create({});
    const questionsPerExam: number = config.totalQuestionsForScore ?? 5;

    // Shuffle the full pool, then take the first N — each student gets a different random subset
    const shuffled = shuffle(allQuestions);
    const selected = shuffled.slice(0, Math.min(questionsPerExam, shuffled.length));

    const token = crypto.randomBytes(24).toString('hex');

    await ScholarshipApplication.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      course: course.trim(),
      university: university.trim(),
      token,
      questionIds: selected.map((q: any) => q._id),
    });

    return NextResponse.json({ token });
  } catch (error: any) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0];
      if (field === 'phone') return NextResponse.json({ error: 'this number already used' }, { status: 409 });
      if (field === 'email') return NextResponse.json({ error: 'this email already used' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
