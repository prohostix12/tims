import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ScholarshipQuestion } from '@/models/ScholarshipQuestion';

export const dynamic = 'force-dynamic';

const VALID_CATEGORIES = ['Online UG', 'Online PG', 'Credit Transfer', 'SIDP (Skill Integrated Diploma Programs)', 'Diploma', 'General'];

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const category = VALID_CATEGORIES.includes(body.category) ? body.category : 'General';

    // Use updateOne on the raw collection to guarantee category is always stored
    await ScholarshipQuestion.collection.updateOne(
      { _id: new (await import('mongoose')).Types.ObjectId(id) },
      {
        $set: {
          question: body.question,
          options: body.options,
          order: Number(body.order) || 0,
          isActive: body.isActive !== false,
          category,
          updatedAt: new Date(),
        },
      }
    );

    const q = await ScholarshipQuestion.findById(id).lean();
    if (!q) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(q);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await ScholarshipQuestion.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
