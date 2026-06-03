import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { FooterContent } from '@/models/FooterContent';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    let footer = await FooterContent.findOne({});
    if (!footer) footer = await FooterContent.create({});
    return NextResponse.json(footer);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    let footer = await FooterContent.findOne({});
    if (!footer) {
      footer = await FooterContent.create(body);
    } else {
      footer.sections = body.sections;
      footer.copyrightText = body.copyrightText;
      await footer.save();
    }
    return NextResponse.json(footer);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
