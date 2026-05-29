import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ProgramSection } from '@/models/ProgramSection';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const section = await ProgramSection.findById(id);
    if (!section) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(section);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const section = await ProgramSection.findByIdAndUpdate(id, body, { new: true });
    if (!section) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(section);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await ProgramSection.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
