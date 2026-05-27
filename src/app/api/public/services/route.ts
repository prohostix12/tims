import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Service from '@/models/Service';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({ status: 'active' }).sort({ order: 1, createdAt: 1 });
    return NextResponse.json(services);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
