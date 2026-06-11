import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Program from '@/models/Program';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    await connectDB();
    
    // Try to interpret as ObjectId if valid hex24
    const isObjectId = /^[a-f\d]{24}$/i.test(slug);
    const query = isObjectId ? { _id: slug } : { slug };
    const program = await Program.findOne(query).populate('university', 'name slug').lean();
    
    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }
    return NextResponse.json(program);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
