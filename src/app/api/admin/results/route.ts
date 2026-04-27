import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Result from '@/models/Result';

export async function GET() {
  try {
    await connectDB();
    const results = await Result.find({}).populate('university', 'name').sort({ createdAt: -1 });
    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const result = await Result.create(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
