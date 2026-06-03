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

const VALID_CATEGORIES = ['Online UG', 'Online PG', 'Credit Transfer', 'General'] as const;

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Trust the body category if it's a known value; otherwise fall back to query param
    if (!VALID_CATEGORIES.includes(body.category)) {
      const { searchParams } = new URL(req.url);
      const qp = searchParams.get('category') ?? '';
      body.category = VALID_CATEGORIES.includes(qp as any) ? qp : 'General';
    }

    const q = await ScholarshipQuestion.create(body);
    return NextResponse.json(q, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
