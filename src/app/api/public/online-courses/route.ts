import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import OnlineCourse from '@/models/OnlineCourse';

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectDB();
  const courses = await OnlineCourse.find({ isActive: true }).sort({ tab: 1, order: 1, createdAt: 1 }).lean();
  return NextResponse.json(courses);
}
