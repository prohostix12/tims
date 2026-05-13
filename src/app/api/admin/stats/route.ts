import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import University from '@/models/University';
import Program from '@/models/Program';
import Lead from '@/models/Lead';
import Enrollment from '@/models/Enrollment';

import Batch from '@/models/Batch';

export async function GET() {
  try {
    await connectDB();
    
    const [universityCount, programCount, leadCount, enrollmentCount, batchCount] = await Promise.all([
      University.countDocuments(),
      Program.countDocuments(),
      Lead.countDocuments(),
      Enrollment.countDocuments(),
      Batch.countDocuments()
    ]);

    return NextResponse.json({
      universities: universityCount,
      programs: programCount,
      leads: leadCount,
      enrollments: enrollmentCount,
      batches: batchCount
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
