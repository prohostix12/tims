import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Batch from '@/models/Batch';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const universityId = searchParams.get('universityId');
    const programId = searchParams.get('programId');

    const filter: any = {};
    if (universityId) filter.universityId = universityId;
    if (programId) filter.programId = programId;

    const batches = await Batch.find(filter)
      .populate('universityId', 'name')
      .populate('programId', 'name')
      .sort({ createdAt: -1 });

    return NextResponse.json(batches);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const newBatch = await Batch.create(body);
    return NextResponse.json(newBatch, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
