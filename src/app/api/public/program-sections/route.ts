import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ProgramSection } from '@/models/ProgramSection';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const sections = await ProgramSection.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json(sections);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
