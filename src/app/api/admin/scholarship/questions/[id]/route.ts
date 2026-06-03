import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ScholarshipQuestion } from '@/models/ScholarshipQuestion';

export const dynamic = 'force-dynamic';

const VALID_CATEGORIES = ['Online UG', 'Online PG', 'Credit Transfer', 'General'] as const;

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    // Keep the category as-is if valid; otherwise default to General
    if (!VALID_CATEGORIES.includes(body.category)) {
      body.category = 'General';
    }

    const q = await ScholarshipQuestion.findByIdAndUpdate(id, body, { new: true });
    if (!q) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(q);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await ScholarshipQuestion.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
