import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ScholarshipApplication } from '@/models/ScholarshipApplication';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const apps = await ScholarshipApplication.find({})
      .sort({ createdAt: -1 })
      .select('-token -questionIds')
      .lean();
    return NextResponse.json(apps);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
