import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import HowItWorksStep from '@/models/HowItWorksStep';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const steps = await HowItWorksStep.find({}).sort({ order: 1, stepNumber: 1 });
    return NextResponse.json(steps);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const step = await HowItWorksStep.create(body);
    return NextResponse.json(step, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
