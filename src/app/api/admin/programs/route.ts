
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Program from '@/models/Program';
import University from '@/models/University';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const universityId = searchParams.get('universityId');
    
    let query = {};
    if (universityId) {
      if (universityId.match(/^[0-9a-fA-F]{24}$/)) {
        query = { university: universityId };
      } else {
        const uni = await University.findOne({ slug: universityId });
        if (uni) {
          query = { university: uni._id };
        } else {
          return NextResponse.json([]);
        }
      }
    }

    const programs = await Program.find(query)
      .populate({ path: 'university', model: University, select: 'name logo slug' })
      .sort({ createdAt: -1 });
      
    return NextResponse.json(programs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const program = await Program.create(body);
    return NextResponse.json(program, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
