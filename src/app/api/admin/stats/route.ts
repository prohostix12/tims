import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Stat from '@/models/Stat';
import Program from '@/models/Program';
import Lead from '@/models/Lead';
import Enrollment from '@/models/Enrollment';
import University from '@/models/University';
import Batch from '@/models/Batch';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    // Check if this is a request for site stats (impact numbers) or dashboard stats
    // We return dashboard stats here (existing behaviour)
    const [programs, leads, enrollments, universities, batches] = await Promise.all([
      Program.countDocuments(),
      Lead.countDocuments(),
      Enrollment.countDocuments(),
      University.countDocuments(),
      Batch.countDocuments(),
    ]);

    return NextResponse.json({ programs, leads, enrollments, universities, batches });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
