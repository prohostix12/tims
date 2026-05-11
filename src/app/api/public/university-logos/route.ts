import { NextResponse } from 'next/server';
import UniversityLogo from '@/models/UniversityLogo';
import connectDB from '@/lib/db';

export async function GET() {
  try {
    await connectDB();
    const logos = await UniversityLogo.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json(logos);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
