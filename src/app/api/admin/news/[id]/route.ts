import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import News from '@/models/News';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const item = await News.findById(params.id);
    if (!item) return NextResponse.json({ error: 'News not found' }, { status: 404 });
    return NextResponse.json(item);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const item = await News.findByIdAndUpdate(params.id, body, { new: true });
    if (!item) return NextResponse.json({ error: 'News not found' }, { status: 404 });
    return NextResponse.json(item);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const item = await News.findByIdAndDelete(params.id);
    if (!item) return NextResponse.json({ error: 'News not found' }, { status: 404 });
    return NextResponse.json({ message: 'News deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
