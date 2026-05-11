import { NextResponse } from 'next/server';
import MarqueeItem from '@/models/MarqueeItem';
import connectDB from '@/lib/db';

export async function GET() {
  try {
    await connectDB();
    const items = await MarqueeItem.find().sort({ order: 1 });
    return NextResponse.json(items);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const item = new MarqueeItem(body);
    await item.save();
    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
