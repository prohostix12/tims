import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Stat from '@/models/Stat';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await request.json();
    const stat = await Stat.findByIdAndUpdate(id, body, { new: true });
    if (!stat) return NextResponse.json({ error: 'Stat not found' }, { status: 404 });
    return NextResponse.json(stat);
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
    const stat = await Stat.findByIdAndDelete(id);
    if (!stat) return NextResponse.json({ error: 'Stat not found' }, { status: 404 });
    return NextResponse.json({ message: 'Stat deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
