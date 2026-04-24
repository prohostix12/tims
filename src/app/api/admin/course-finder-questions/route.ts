import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { CourseFinderQuestion } from '@/models/CourseFinderQuestion';

export async function GET() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }
    const questions = await CourseFinderQuestion.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json(questions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }
    const body = await req.json();
    const newQuestion = new CourseFinderQuestion(body);
    await newQuestion.save();
    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
