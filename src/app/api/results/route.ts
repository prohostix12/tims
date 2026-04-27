import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Result from '@/models/Result';

export async function GET() {
  try {
    await connectDB();
    const results = await Result.find({})
      .populate('university', 'name')
      .populate('course', 'name')
      .sort({ createdAt: -1 });
    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
