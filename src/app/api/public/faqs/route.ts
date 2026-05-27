import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Faq from '@/models/Faq';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const faqs = await Faq.find({ status: 'active' }).sort({ order: 1, createdAt: 1 });
    return NextResponse.json(faqs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
