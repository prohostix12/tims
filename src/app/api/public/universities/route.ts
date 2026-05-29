import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import University from '@/models/University';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const universities = await University.find({ status: { $ne: 'inactive' } })
      .select('name _id')
      .sort({ name: 1 });
    return NextResponse.json(universities);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
