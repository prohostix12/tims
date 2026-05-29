import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import OnlineCourse from '@/models/OnlineCourse';

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectDB();
  const courses = await OnlineCourse.find({}).sort({ tab: 1, order: 1, createdAt: 1 }).lean();
  return NextResponse.json(courses);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const { tab, name, icon, order, isActive } = body;
  if (!tab || !name) return NextResponse.json({ error: 'tab and name are required' }, { status: 400 });
  const course = await OnlineCourse.create({ tab, name, icon: icon || 'GraduationCap', order: order ?? 0, isActive: isActive ?? true });
  return NextResponse.json(course, { status: 201 });
}
