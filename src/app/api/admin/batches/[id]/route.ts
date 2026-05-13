import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Batch from '@/models/Batch';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const batch = await Batch.findById(id)
      .populate('universityId', 'name')
      .populate('programId', 'name');

    if (!batch) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
    }
    return NextResponse.json(batch);
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

    const updatedBatch = await Batch.findByIdAndUpdate(id, body, { new: true });
    if (!updatedBatch) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
    }
    return NextResponse.json(updatedBatch);
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
    const deletedBatch = await Batch.findByIdAndDelete(id);
    if (!deletedBatch) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Batch deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
