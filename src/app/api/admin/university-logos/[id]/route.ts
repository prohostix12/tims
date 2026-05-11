import { NextResponse } from 'next/server';
import UniversityLogo from '@/models/UniversityLogo';
import connectDB from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await request.json();
    const logo = await UniversityLogo.findByIdAndUpdate(id, body, { new: true });
    if (!logo) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(logo);
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
    const logo = await UniversityLogo.findByIdAndDelete(id);
    if (!logo) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
