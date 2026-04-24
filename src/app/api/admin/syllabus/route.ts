import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Syllabus from '@/models/Syllabus';

export async function GET() {
  try {
    await connectDB();
    const syllabi = await Syllabus.find({}).sort({ createdAt: -1 });
    return NextResponse.json(syllabi);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const syllabus = await Syllabus.create(body);
    return NextResponse.json(syllabus, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
