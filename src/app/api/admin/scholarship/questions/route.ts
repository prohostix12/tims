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
    // Allow category override via query param (safer when client state is out-of-sync)
    const url = new URL(req.url);
    const categoryParam = url.searchParams.get('category');
    if (categoryParam) body.category = categoryParam;

    // Ensure category is set, default to 'General' only if not provided
    if (!body.category) body.category = 'General';

    // Validate category is one of the allowed values
    const validCategories = ['Online UG', 'Online PG', 'Credit Transfer', 'General'];
    if (!validCategories.includes(body.category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    const q = await ScholarshipQuestion.create(body);
    return NextResponse.json(q, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
