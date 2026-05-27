import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Director from '@/models/Director';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const directors = await Director.find({ status: 'active' }).sort({ order: 1, createdAt: 1 });
    return NextResponse.json(directors);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
