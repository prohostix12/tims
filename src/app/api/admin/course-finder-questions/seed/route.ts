import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { CourseFinderQuestion } from '@/models/CourseFinderQuestion';

const FALLBACK_QUESTIONS = [
  {
    field: 'education', order: 1, isActive: true,
    question: 'What is your highest qualification?',
    options: [
      { value: 'below_12', label: 'Below 12th' },
      { value: '12th',     label: '12th Pass'  },
      { value: 'graduate', label: 'Graduate (Bachelors)' },
      { value: 'postgraduate', label: 'Post Graduate' },
    ],
  },
  {
    field: 'field', order: 2, isActive: true,
    question: 'Which field of study interests you?',
    options: [
      { value: 'commerce',   label: 'Commerce',   categories: ['B.Com', 'M.Com', 'Com'] },
      { value: 'arts',       label: 'Arts',       categories: ['BA', 'MA'] },
      { value: 'science',    label: 'Science',    categories: ['B.Sc', 'M.Sc', 'BSc', 'MSc', 'Sc'] },
      { value: 'technology', label: 'Technology', categories: ['BCA', 'MCA', 'B.Tech', 'M.Tech'] },
      { value: 'management', label: 'Management', categories: ['MBA', 'BBA', 'PGDM'] },
    ],
  },
  {
    field: 'budget', order: 3, isActive: true,
    question: 'What is your preferred fee range?',
    options: [
      { value: 'low',   label: 'Under ₹50,000',      max: 50000 },
      { value: 'mid1',  label: '₹50K – ₹1 Lakh',    min: 50000,  max: 100000 },
      { value: 'mid2',  label: '₹1L – ₹2 Lakh',     min: 100000, max: 200000 },
      { value: 'any',   label: 'No Preference' },
    ],
  },
];

export async function GET() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }
    
    // Clear existing to avoid duplicates when seeding
    await CourseFinderQuestion.deleteMany({});
    
    // Insert new
    await CourseFinderQuestion.insertMany(FALLBACK_QUESTIONS);

    return NextResponse.json({ success: true, message: 'Seeded successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
