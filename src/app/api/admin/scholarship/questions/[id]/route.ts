import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ScholarshipQuestion } from '@/models/ScholarshipQuestion';

export const dynamic = 'force-dynamic';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    
    // Normalize and validate category
    const normalizeCategory = (c: any) => {
      if (!c) return null;
      const s = String(c).trim().toLowerCase();
      if (s.includes('online') && s.includes('ug')) return 'Online UG';
      if (s.includes('online') && s.includes('pg')) return 'Online PG';
      if (s.includes('credit')) return 'Credit Transfer';
      return 'General';
    };

    body.category = normalizeCategory(body.category || '');
    const validCategories = ['Online UG', 'Online PG', 'Credit Transfer', 'General'];
    if (!validCategories.includes(body.category)) body.category = 'General';
    
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
