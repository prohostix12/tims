import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Program from '@/models/Program';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const programs = await Program.find({})
      .populate('university', 'name')
      .sort({ fee: 1 })
      .select('name category courseType fee duration university');
    return NextResponse.json(programs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
