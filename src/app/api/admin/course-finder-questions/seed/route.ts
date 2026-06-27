import { NextResponse } from 'next/server';
import { CourseFinderQuestion } from '@/models/CourseFinderQuestion';
import connectDB from '@/lib/db';

const FALLBACK_QUESTIONS = [
  {
    stepId: 'category', field: 'category', order: 1, isActive: true,
    question: 'Which program category interests you?',
    subtitle: 'Choose the type of course you want to pursue.',
    emoji: '📋',
    options: [
      { value: 'sslc,plus_two', label: 'SSLC/Plus Two' },
      { value: 'online_ug', label: 'Online UG' },
      { value: 'online_pg', label: 'Online PG' },
      { value: 'credit_transfer_program', label: 'Credit Transfer Program' }
    ],
  },
  {
    stepId: 'interest', field: 'interest', order: 2, isActive: true,
    question: 'Which subject area do you prefer?',
    subtitle: 'Pick the field you want to build your career in.',
    emoji: '💡',
    options: [
      { value: 'management', label: 'Management & Business', desc: 'MBA, BBA, B.Com, M.Com, Finance' },
      { value: 'technology', label: 'Technology & Computers', desc: 'BCA, MCA, B.Tech, IT certifications' },
      { value: 'arts-science', label: 'Arts, Science & Humanities', desc: 'BA, B.Sc, MA, M.Sc, Literature' },
      { value: 'foundation', label: '10th / 12th Foundation', desc: 'NIOS, BOSSE programs' },
      { value: 'skill', label: 'Skill & Short Courses', desc: 'Digital marketing, Tally, Spoken English' },
      { value: 'any', label: 'Show All Options', desc: 'No preference — show me everything' }
    ],
  },
  {
    stepId: 'mode', field: 'mode', order: 3, isActive: true,
    question: 'How do you prefer to study?',
    subtitle: 'Choose what fits your schedule and lifestyle.',
    emoji: '💻',
    options: [
      { value: 'online', label: 'Online', desc: 'Study from home with digital classes' },
      { value: 'campus', label: 'On Campus', desc: 'Study at the university campus' }
    ],
  },
  {
    stepId: 'career_goal', field: 'career_goal', order: 4, isActive: true,
    question: "What is your primary career goal?",
    subtitle: "Select the option that best fits your current career plans.",
    emoji: "🎯",
    options: [
      { value: 'job_switch', label: 'Get a Job / Career Switch' },
      { value: 'promotion', label: 'Get Promotion / Salary Hike' },
      { value: 'business', label: 'Start Own Business' },
      { value: 'knowledge', label: 'Gain Knowledge & Skills' }
    ],
  },
  {
    stepId: 'budget', field: 'budget', order: 5, isActive: true,
    question: "What is your preferred budget range?",
    subtitle: 'We will filter out programs outside your range.',
    emoji: '💰',
    options: [
      { value: 'low', label: 'Under ₹50,000', max: 50000 },
      { value: 'mid1', label: '₹50,000 - ₹1,00,000', min: 50000, max: 100000 },
      { value: 'mid2', label: '₹1,00,000 - ₹2,00,000', min: 100000, max: 200000 },
      { value: 'high', label: 'Above ₹2,00,000', min: 200000 }
    ],
  },
];

export async function POST(req: Request) {
  try {
    await connectDB();
    
    // Clear existing to avoid duplicates when seeding
    await CourseFinderQuestion.deleteMany({});
    
    // Insert new
    await CourseFinderQuestion.insertMany(FALLBACK_QUESTIONS);

    return NextResponse.json({ success: true, message: 'Seeded successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
