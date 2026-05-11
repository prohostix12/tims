import { NextResponse } from 'next/server';
import UniversityLogo from '@/models/UniversityLogo';
import connectDB from '@/lib/db';

export async function GET() {
  try {
    await connectDB();
    const logos = await UniversityLogo.find().sort({ order: 1 });
    return NextResponse.json(logos);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const logo = new UniversityLogo(body);
    await logo.save();
    return NextResponse.json(logo, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
