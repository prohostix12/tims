import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Faq from '@/models/Faq';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const faqs = await Faq.find({}).sort({ order: 1, createdAt: 1 });
    return NextResponse.json(faqs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const faq = await Faq.create(body);
    return NextResponse.json(faq, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
