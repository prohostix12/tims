require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

const schema = new mongoose.Schema({}, { strict: false });
const CourseFinderQuestion = mongoose.models.CourseFinderQuestion || mongoose.model('CourseFinderQuestion', schema);

const FALLBACK_QUESTIONS = [
  {
    stepId: 'qualification', field: 'qualification', order: 1, isActive: true,
    question: "What's your highest qualification?",
    subtitle: "We use this to find programs you are eligible for.",
    emoji: "🎓",
    options: [
      { value: 'sslc', label: '10th Pass (SSLC)', desc: 'Looking for 11th, 12th or foundation courses' },
      { value: 'plus-two', label: '12th Pass (Plus Two)', desc: 'Ready for undergraduate programs' },
      { value: 'graduate', label: 'Bachelor\'s Degree', desc: 'Looking for PG, MBA or professional programs' },
      { value: 'postgraduate', label: 'Master\'s Degree', desc: 'Advanced certifications or research programs' }
    ],
  },
  {
    stepId: 'category', field: 'category', order: 2, isActive: true,
    question: 'Which program category interests you?',
    subtitle: 'Choose the type of course you want to pursue.',
    emoji: '📋',
    options: [
      { value: 'online_ug', label: 'Online UG' },
      { value: 'online_pg', label: 'Online PG' },
      { value: 'credit_transfer_program', label: 'Credit Transfer Program' },
      { value: 'skill_integrated_diploma_programs', label: 'Skill Integrated Diploma Programs' },
      { value: 'diploma', label: 'Diploma' },
      { value: 'plus_two', label: 'Plus Two' },
      { value: 'sslc', label: 'SSLC' }
    ],
  },
  {
    stepId: 'interest', field: 'interest', order: 3, isActive: true,
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
    stepId: 'mode', field: 'mode', order: 4, isActive: true,
    question: 'How do you prefer to study?',
    subtitle: 'Choose what fits your schedule and lifestyle.',
    emoji: '💻',
    options: [
      { value: 'online', label: 'Online (Live & Interactive)', desc: 'Study from home with real-time classes' },
      { value: 'distance', label: 'Distance Learning', desc: 'Self-paced study with materials' },
      { value: 'hybrid', label: 'Hybrid (Both)', desc: 'Mix of online and offline study' }
    ],
  },
  {
    stepId: 'goal', field: 'goal', order: 5, isActive: true,
    question: "What's your main goal?",
    subtitle: "This helps us rank the most relevant programs for you.",
    emoji: '🎯',
    options: [
      { value: 'degree', label: 'Get a Recognised Degree', desc: 'For govt jobs, higher studies, or career growth' },
      { value: 'career-upgrade', label: 'Upgrade My Career', desc: 'A better job, promotion, or pay hike' },
      { value: 'skill', label: 'Learn a Specific Skill', desc: 'Practical, job-ready skills fast' },
      { value: 'govt-job', label: 'Prepare for Govt Jobs', desc: 'Eligibility for PSC, SSC, or banking exams' }
    ],
  },
  {
    stepId: 'budget', field: 'budget', order: 6, isActive: true,
    question: 'What is your annual budget?',
    subtitle: 'We will filter out programs outside your range.',
    emoji: '💰',
    options: [
      { value: 'low', label: 'Under ₹20,000 / year', desc: 'Very affordable options', min: 0, max: 20000 },
      { value: 'medium', label: '₹20,000 – ₹75,000 / year', desc: 'Mid-range programs', min: 20000, max: 75000 },
      { value: 'high', label: 'Above ₹75,000 / year', desc: 'Premium universities', min: 75000 }
    ],
  },
];

async function main() {
  await mongoose.connect(uri);
  await CourseFinderQuestion.deleteMany({});
  await CourseFinderQuestion.insertMany(FALLBACK_QUESTIONS);
  console.log('Successfully seeded 6 questions into database');
  await mongoose.disconnect();
}
main();
