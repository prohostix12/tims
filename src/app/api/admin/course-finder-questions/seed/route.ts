import { NextResponse } from 'next/server';
import { CourseFinderQuestion } from '@/models/CourseFinderQuestion';
import connectDB from '@/lib/db';

const FALLBACK_QUESTIONS = [
  {
    field: 'what_course_are_you_interested', order: 1, isActive: true,
    question: 'What course are you interested in pursuing?',
    options: [
      { value: 'mba', label: 'MBA' },
      { value: 'mca', label: 'MCA' },
      { value: 'm_com', label: 'M.COM' },
      { value: 'ma', label: 'MA' },
      { value: 'msc', label: 'MSC' },
      { value: 'msw', label: 'MSW' },
      { value: 'bba', label: 'BBA' },
      { value: 'bca', label: 'BCA' },
      { value: 'b_com', label: 'B.COM' },
      { value: 'ba', label: 'BA' },
      { value: 'bsc', label: 'BSC' },
      { value: 'b_com_mba', label: 'B.COM+MBA' },
      { value: 'bba_mba', label: 'BBA+MBA' },
      { value: 'bca_mca', label: 'BCA+MCA' },
    ],
  },
  {
    field: 'education', order: 2, isActive: true,
    question: 'What is your highest qualification?',
    options: [
      { value: 'below_12',     label: 'Below 12th' },
      { value: '12th',         label: '12th Pass'  },
      { value: 'graduate',     label: 'Graduate (Bachelors)' },
      { value: 'postgraduate', label: 'Post Graduate' },
    ],
  },
  {
    field: 'current_status', order: 3, isActive: true,
    question: 'What are you currently doing?',
    options: [
      { value: 'student', label: 'Studying / Student' },
      { value: 'working', label: 'Working Professional' },
      { value: 'fresher', label: 'Fresher / Job Seeking' },
      { value: 'other',   label: 'Homemaker / Other' },
    ],
  },
  {
    field: 'field', order: 4, isActive: true,
    question: 'Which field of study interests you?',
    options: [
      { value: 'commerce',   label: 'Commerce',   categories: ['B.Com', 'M.Com', 'Com'] },
      { value: 'arts',       label: 'Arts',       categories: ['BA', 'MA'] },
      { value: 'science',    label: 'Science',    categories: ['B.Sc', 'M.Sc', 'BSc', 'MSc', 'Sc'] },
      { value: 'technology', label: 'Technology', categories: ['BCA', 'MCA', 'B.Tech', 'M.Tech'] },
      { value: 'management', label: 'Management', categories: ['MBA', 'BBA', 'PGDM'] },
      { value: 'law',        label: 'Law',        categories: ['LLB', 'LLM'] },
    ],
  },
  {
    field: 'specialization', order: 5, isActive: true,
    question: 'Which specialization interests you most?',
    options: [
      { value: 'finance',     label: 'Finance & Accounting' },
      { value: 'marketing',   label: 'Marketing & Sales' },
      { value: 'it_software', label: 'IT & Software' },
      { value: 'hr',          label: 'Human Resources' },
      { value: 'operations',  label: 'Operations & Logistics' },
      { value: 'general',     label: 'General / Not Sure' },
    ],
  },
  {
    field: 'goal', order: 6, isActive: true,
    question: 'What is your primary career goal?',
    options: [
      { value: 'get_job',        label: 'Get a Job' },
      { value: 'advance_career', label: 'Advance My Career' },
      { value: 'switch_field',   label: 'Switch Career Field' },
      { value: 'higher_studies', label: 'Pursue Higher Studies' },
    ],
  },
  {
    field: 'pref_university_location', order: 7, isActive: true,
    question: 'Do you prefer Indian or International Universities?',
    options: [
      { value: 'indian', label: 'Indian University' },
      { value: 'international', label: 'International University' },
      { value: 'both', label: 'Open to Both' },
    ],
  },
  {
    field: 'university_type', order: 8, isActive: true,
    question: 'What type of university do you prefer?',
    options: [
      { value: 'private', label: 'Private University' },
      { value: 'public',  label: 'Public / Government' },
      { value: 'state',   label: 'State University' },
      { value: 'any',     label: 'No Preference' },
    ],
  },
  {
    field: 'experience', order: 9, isActive: true,
    question: 'How much work experience do you have?',
    options: [
      { value: 'no_experience', label: 'No Experience (Fresher)' },
      { value: 'less_2',        label: 'Less than 2 Years' },
      { value: 'two_five',      label: '2 – 5 Years' },
      { value: 'five_plus',     label: '5+ Years' },
    ],
  },
  {
    field: 'budget', order: 10, isActive: true,
    question: 'What is your preferred fee range?',
    options: [
      { value: 'low',  label: 'Under ₹50,000',  max: 50000 },
      { value: 'mid1', label: '₹50K – ₹1 Lakh', min: 50000,  max: 100000 },
      { value: 'mid2', label: '₹1L – ₹2 Lakh',  min: 100000, max: 200000 },
      { value: 'any',  label: 'No Preference' },
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
