import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ProgramSection } from '@/models/ProgramSection';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const sections = await ProgramSection.find({}).sort({ order: 1 });
    return NextResponse.json(sections);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const section = await ProgramSection.create(body);
    return NextResponse.json(section, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
