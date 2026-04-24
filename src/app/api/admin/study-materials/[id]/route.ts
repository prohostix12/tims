import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import StudyMaterial from '@/models/StudyMaterial';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const material = await StudyMaterial.findByIdAndUpdate(params.id, body, { new: true });
    if (!material) return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    return NextResponse.json(material);
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
    const material = await StudyMaterial.findByIdAndDelete(params.id);
    if (!material) return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    return NextResponse.json({ message: 'Material deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
