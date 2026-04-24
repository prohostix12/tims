import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import StudyMaterial from '@/models/StudyMaterial';

export async function GET() {
  try {
    await connectDB();
    const materials = await StudyMaterial.find({}).sort({ createdAt: -1 });
    return NextResponse.json(materials);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const material = await StudyMaterial.create(body);
    return NextResponse.json(material, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
