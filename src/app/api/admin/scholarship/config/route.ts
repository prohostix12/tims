import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ScholarshipConfig } from '@/models/ScholarshipConfig';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    let config = await ScholarshipConfig.findOne({});
    if (!config) config = await ScholarshipConfig.create({});
    return NextResponse.json(config);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    let config = await ScholarshipConfig.findOne({});
    if (!config) {
      config = await ScholarshipConfig.create(body);
    } else {
      Object.assign(config, body);
      await config.save();
    }
    return NextResponse.json(config);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
