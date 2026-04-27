import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Timetable from '@/models/Timetable';

export async function GET() {
  try {
    await connectDB();
    const timetables = await Timetable.find({}).populate('university', 'name').populate('course', 'name').sort({ createdAt: -1 });
    return NextResponse.json(timetables);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const timetable = await Timetable.create(body);
    return NextResponse.json(timetable, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
