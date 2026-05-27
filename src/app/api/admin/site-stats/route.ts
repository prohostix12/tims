import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Stat from '@/models/Stat';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const stats = await Stat.find({}).sort({ order: 1, createdAt: 1 });
    return NextResponse.json(stats);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const stat = await Stat.create(body);
    return NextResponse.json(stat, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
