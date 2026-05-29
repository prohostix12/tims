import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ScholarshipQuestion } from '@/models/ScholarshipQuestion';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const questions = await ScholarshipQuestion.find({}).sort({ order: 1 });
    return NextResponse.json(questions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const q = await ScholarshipQuestion.create(body);
    return NextResponse.json(q, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
