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

    // Map the student's program to a question bank category
    const prog = university.trim().toLowerCase();
    let category: string;
    if (prog.includes('online ug')) category = 'Online UG';
    else if (prog.includes('online pg')) category = 'Online PG';
    else if (prog.includes('credit transfer')) category = 'Credit Transfer';
    else if (prog.includes('sidp') || prog.includes('skill')) category = 'SIDP (Skill Integrated Diploma Programs)';
    else if (prog.includes('diploma')) category = 'Diploma';
    else category = 'General';

    // Try to get questions from the matching bank; fall back to General
    let allQuestions = await ScholarshipQuestion.find({ isActive: true, category });
    if (allQuestions.length === 0) {
      allQuestions = await ScholarshipQuestion.find({ isActive: true });
    }
    if (allQuestions.length === 0) {
      return NextResponse.json({ error: 'Exam questions are not ready yet.' }, { status: 503 });
    }

    const config = await ScholarshipConfig.findOne({}) || await ScholarshipConfig.create({});
    const questionsPerExam: number = config.totalQuestionsForScore ?? 10;

    // Shuffle the category pool, then take the first N — each student gets a different random subset
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
