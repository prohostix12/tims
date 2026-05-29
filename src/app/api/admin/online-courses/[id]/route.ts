import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import OnlineCourse from '@/models/OnlineCourse';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const updated = await OnlineCourse.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await OnlineCourse.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
