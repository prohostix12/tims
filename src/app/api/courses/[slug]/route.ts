import { NextResponse } from 'next/server';
import connectDB from '../../../../config/db'; // relative import for compatibility
import Program from '@/models/Program';
import '@/models/University';

// Ensure DB connection (idempotent)
await connectDB();

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Try to interpret as ObjectId if valid hex24
  const isObjectId = /^[a-f\d]{24}$/i.test(slug);
  const query = isObjectId ? { _id: slug } : { slug };
  const program = await Program.findOne(query).populate('university', 'name slug').lean();
  if (!program) {
    return NextResponse.json({ error: 'Program not found' }, { status: 404 });
  }
  return NextResponse.json(program);
}
