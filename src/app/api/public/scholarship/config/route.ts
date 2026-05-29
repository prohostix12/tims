import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ScholarshipConfig } from '@/models/ScholarshipConfig';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    let config = await ScholarshipConfig.findOne({});
    if (!config) {
      config = await ScholarshipConfig.create({});
    }
    return NextResponse.json(config);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
