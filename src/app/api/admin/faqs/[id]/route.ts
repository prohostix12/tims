import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Faq from '@/models/Faq';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await request.json();
    const faq = await Faq.findByIdAndUpdate(id, body, { new: true });
    if (!faq) return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    return NextResponse.json(faq);
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
    const faq = await Faq.findByIdAndDelete(id);
    if (!faq) return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    return NextResponse.json({ message: 'FAQ deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
