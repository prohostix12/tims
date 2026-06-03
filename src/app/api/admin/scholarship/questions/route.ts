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
    // Temporary debug logs to trace category persistence issues
    try {
      // eslint-disable-next-line no-console
      console.log('[scholarship/questions POST] url=', req.url);
      // eslint-disable-next-line no-console
      console.log('[scholarship/questions POST] received body=', JSON.stringify(body));
    } catch (e) {}
    // Allow category override via query param (safer when client state is out-of-sync)
    const url = new URL(req.url);
    const categoryParam = url.searchParams.get('category');
    if (categoryParam) body.category = categoryParam;

    // Normalize incoming category (accept variants like 'online ug', 'online-ug', etc.)
    const normalizeCategory = (c: any) => {
      if (!c) return null;
      const s = String(c).trim().toLowerCase();
      if (s.includes('online') && s.includes('ug')) return 'Online UG';
      if (s.includes('online') && s.includes('pg')) return 'Online PG';
      if (s.includes('credit')) return 'Credit Transfer';
      return 'General';
    };

    if (categoryParam) body.category = normalizeCategory(categoryParam);
    body.category = normalizeCategory(body.category || '');

    const validCategories = ['Online UG', 'Online PG', 'Credit Transfer', 'General'];
    if (!validCategories.includes(body.category)) {
      body.category = 'General';
    }

    const q = await ScholarshipQuestion.create(body);
    return NextResponse.json(q, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
