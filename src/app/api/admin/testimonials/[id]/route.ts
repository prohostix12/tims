import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Testimonial from '@/models/Testimonial';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    return NextResponse.json(testimonial);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await request.json();
    const testimonial = await Testimonial.findByIdAndUpdate(id, body, { new: true });
    if (!testimonial) return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    return NextResponse.json(testimonial);
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
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    return NextResponse.json({ message: 'Testimonial deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
