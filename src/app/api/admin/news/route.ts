import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import News from '@/models/News';

export async function GET() {
  try {
    await connectDB();
    const news = await News.find({}).sort({ publishedAt: -1 });
    return NextResponse.json(news);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const item = await News.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
