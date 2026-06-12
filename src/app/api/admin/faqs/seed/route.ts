import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Faq from '@/models/Faq';

const DEFAULT_FAQS = [
  {
    question: 'What is Find Your University?',
    answer: 'Find Your University is a leading distance and online higher education platform that simplifies the university discovery process. We partner with over 90 UGC-approved universities to connect students with flexible, accessible, and high-quality academic programs that fit their career goals, eligibility, and budget.',
    order: 1,
    status: 'active',
  },
  {
    question: 'Are degrees recognized?',
    answer: 'Yes, we partner with UGC-recognized universities to ensure your degrees are valid for employment and higher studies.',
    order: 2,
    status: 'active',
  },
  {
    question: 'Do you offer scholarships?',
    answer: 'Yes, we offer scholarships for financially disadvantaged and high-achieving students.',
    order: 3,
    status: 'active',
  },
];

export async function POST() {
  try {
    await connectDB();
    const inserted = await Faq.insertMany(DEFAULT_FAQS);
    return NextResponse.json({ message: `${inserted.length} FAQs seeded successfully.`, data: inserted }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
