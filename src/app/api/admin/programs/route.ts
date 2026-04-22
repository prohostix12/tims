
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Program from '@/models/Program';
import University from '@/models/University';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const universityId = searchParams.get('universityId');
    
    let query = {};
    if (universityId) {
      query = { university: universityId };
    }

    const programs = await Program.find(query)
      .populate('university', 'name')
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
