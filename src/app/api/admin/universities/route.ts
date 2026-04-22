
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import University from '@/models/University';

export async function GET() {
  try {
    await connectDB();
    const universities = await University.find({}).sort({ createdAt: -1 });
    return NextResponse.json(universities);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const university = await University.create(body);
    return NextResponse.json(university, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
