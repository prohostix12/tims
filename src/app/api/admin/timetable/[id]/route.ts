import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Timetable from '@/models/Timetable';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const timetable = await Timetable.findByIdAndUpdate(params.id, body, { new: true });
    if (!timetable) return NextResponse.json({ error: 'Timetable not found' }, { status: 404 });
    return NextResponse.json(timetable);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const timetable = await Timetable.findByIdAndDelete(params.id);
    if (!timetable) return NextResponse.json({ error: 'Timetable not found' }, { status: 404 });
    return NextResponse.json({ message: 'Timetable deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
