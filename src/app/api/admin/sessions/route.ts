import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Session from '@/models/Session';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const sessions = await Session.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(sessions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const session = await Session.create(body);
    return NextResponse.json(session, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
