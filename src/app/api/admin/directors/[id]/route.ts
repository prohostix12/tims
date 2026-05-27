import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Director from '@/models/Director';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await request.json();
    const director = await Director.findByIdAndUpdate(id, body, { new: true });
    if (!director) return NextResponse.json({ error: 'Director not found' }, { status: 404 });
    return NextResponse.json(director);
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
    const director = await Director.findByIdAndDelete(id);
    if (!director) return NextResponse.json({ error: 'Director not found' }, { status: 404 });
    return NextResponse.json({ message: 'Director deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
