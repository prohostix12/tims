import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import University from '@/models/University';
import UniversityLogo from '@/models/UniversityLogo';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    const universities = await University.find({ status: 'active' }).sort({ name: 1 });

    let added = 0;
    let skipped = 0;

    for (let i = 0; i < universities.length; i++) {
      const uni = universities[i];
      const existing = await UniversityLogo.findOne({ name: uni.name });
      if (existing) { skipped++; continue; }

      await UniversityLogo.create({
        name: uni.name,
        logoUrl: uni.logo || uni.image || 'https://placehold.co/200x80?text=' + encodeURIComponent(uni.name),
        order: 100 + i,
        isActive: true,
      });
      added++;
    }

    const total = await UniversityLogo.countDocuments();

    return NextResponse.json({
      success: true,
      message: `Added ${added} new entries, skipped ${skipped} existing. Total: ${total} logos.`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
