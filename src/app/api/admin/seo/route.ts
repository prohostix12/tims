import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import SeoSettings from '@/models/SeoSettings';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    let settings = await SeoSettings.findOne();
    if (!settings) settings = await SeoSettings.create({});
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    let settings = await SeoSettings.findOne();
    if (settings) {
      settings = await SeoSettings.findByIdAndUpdate(settings._id, body, { new: true });
    } else {
      settings = await SeoSettings.create(body);
    }
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
