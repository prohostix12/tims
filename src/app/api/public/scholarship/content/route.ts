import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ScholarshipContent } from '@/models/ScholarshipContent';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    let content = await ScholarshipContent.findOne({});
    if (!content) {
      content = await ScholarshipContent.create({});
    }
    return NextResponse.json(content);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
