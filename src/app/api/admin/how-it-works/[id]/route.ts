import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import HowItWorksStep from '@/models/HowItWorksStep';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await request.json();
    const step = await HowItWorksStep.findByIdAndUpdate(id, body, { new: true });
    if (!step) return NextResponse.json({ error: 'Step not found' }, { status: 404 });
    return NextResponse.json(step);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const step = await HowItWorksStep.findByIdAndDelete(id);
    if (!step) return NextResponse.json({ error: 'Step not found' }, { status: 404 });
    return NextResponse.json({ message: 'Step deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
