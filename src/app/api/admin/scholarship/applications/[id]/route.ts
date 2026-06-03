import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ScholarshipApplication } from '@/models/ScholarshipApplication';

export const dynamic = 'force-dynamic';

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await ScholarshipApplication.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
