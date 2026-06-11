import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import University from '@/models/University';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    let doc = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      doc = await University.findById(id);
    }
    if (!doc) {
      doc = await University.findOne({ slug: id });
    }
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(doc);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await request.json();
    // Strip base64 blobs — only accept real URLs
    if (body.image && body.image.startsWith('data:')) delete body.image;
    if (body.logo && body.logo.startsWith('data:')) delete body.logo;
    const doc = await University.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: false });
    return NextResponse.json(doc);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const doc = await University.findByIdAndDelete(id);
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ message: 'University deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
