import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ScholarshipQuestion } from '@/models/ScholarshipQuestion';

export const dynamic = 'force-dynamic';

const VALID_CATEGORIES = ['Online UG', 'Online PG', 'Credit Transfer', 'SIDP (Skill Integrated Diploma Programs)', 'Diploma', 'General'];

export async function GET() {
  try {
    await connectDB();
    // .lean() returns plain MongoDB objects — all stored fields including category
    const questions = await ScholarshipQuestion.find({}).sort({ order: 1 }).lean();
    return NextResponse.json(questions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const category = VALID_CATEGORIES.includes(body.category) ? body.category : 'General';

    // Use insertOne on the raw collection to guarantee category is always stored,
    // bypassing any potential stale Mongoose schema cache that could strip the field.
    const result = await ScholarshipQuestion.collection.insertOne({
      question: body.question,
      options: body.options,
      order: Number(body.order) || 0,
      isActive: body.isActive !== false,
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const q = await ScholarshipQuestion.findById(result.insertedId).lean();
    return NextResponse.json(q, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
