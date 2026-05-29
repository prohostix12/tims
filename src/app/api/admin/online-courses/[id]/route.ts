import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import OnlineCourse from '@/models/OnlineCourse';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const body = await req.json();
  const updated = await OnlineCourse.findByIdAndUpdate(id, body, { new: true, runValidators: true });
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  await OnlineCourse.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
