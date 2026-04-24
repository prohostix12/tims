import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { CourseFinderQuestion } from '@/models/CourseFinderQuestion';

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = await context.params;
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }
    const body = await req.json();
    const updated = await CourseFinderQuestion.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = await context.params;
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }
    await CourseFinderQuestion.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
