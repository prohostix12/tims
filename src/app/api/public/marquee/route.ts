import { NextResponse } from 'next/server';
import MarqueeItem from '@/models/MarqueeItem';
import connectDB from '@/lib/db';

export async function GET() {
  try {
    await connectDB();
    const items = await MarqueeItem.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json(items);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
