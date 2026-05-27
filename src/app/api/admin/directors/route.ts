import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Director from '@/models/Director';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const directors = await Director.find({}).sort({ order: 1, createdAt: 1 });
    return NextResponse.json(directors);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const director = await Director.create(body);
    return NextResponse.json(director, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
