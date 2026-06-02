// seed-scholarship.mjs
// Run with: node seed-scholarship.mjs
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

// ── Schemas ────────────────────────────────────────────────────
const OptionSchema = new mongoose.Schema(
  { text: { type: String, required: true }, isCorrect: { type: Boolean, default: false } },
  { _id: false }
);

const ScholarshipQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options:  { type: [OptionSchema], required: true },
    order:    { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const ScholarshipQuestion =
  mongoose.models.ScholarshipQuestion ||
  mongoose.model('ScholarshipQuestion', ScholarshipQuestionSchema);

// ── Questions ──────────────────────────────────────────────────
const questions = [
  {
    order: 1,
    isActive: true,
    question: 'Which of the following is the primary advantage of pursuing an Online MBA degree?',
    options: [
      { text: 'Flexibility to study at your own pace while working', isCorrect: true },
      { text: 'No requirement to submit assignments', isCorrect: false },
      { text: 'Degree is not recognised by employers', isCorrect: false },
      { text: 'You cannot specialise in any stream', isCorrect: false },
    ],
  },
  {
    order: 2,
    isActive: true,
    question: 'UGC-DEB stands for which of the following?',
    options: [
      { text: 'University Grants Commission – Distance Education Bureau', isCorrect: true },
      { text: 'Unified Government Council – Distance Education Board', isCorrect: false },
      { text: 'University General Committee – Digital Education Branch', isCorrect: false },
      { text: 'Union Grants Council – Degree Education Board', isCorrect: false },
    ],
  },
  {
    order: 3,
    isActive: true,
    question: 'Which learning mode allows a student to transfer existing credits from one university to another?',
    options: [
      { text: 'Credit Transfer Programme', isCorrect: true },
      { text: 'Open Book Examination', isCorrect: false },
      { text: 'Lateral Entry Scheme', isCorrect: false },
      { text: 'Dual Degree Programme', isCorrect: false },
    ],
  },
  {
    order: 4,
    isActive: true,
    question: 'What does the acronym "LMS" stand for in the context of online education?',
    options: [
      { text: 'Learning Management System', isCorrect: true },
      { text: 'Library Management Software', isCorrect: false },
      { text: 'Lecture Monitoring Service', isCorrect: false },
      { text: 'Learner Matching Solution', isCorrect: false },
    ],
  },
  {
    order: 5,
    isActive: true,
    question: 'Which of the following is a key benefit of UGC-approved online degrees compared to unrecognised programmes?',
    options: [
      { text: 'They are valid for government jobs and higher education admissions', isCorrect: true },
      { text: 'They cost significantly more than regular degrees', isCorrect: false },
      { text: 'They require the student to attend classes on campus every week', isCorrect: false },
      { text: 'They do not allow specialisation in any subject', isCorrect: false },
    ],
  },
];
// Shuffle utility
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Randomize option order for each question
const shuffledQuestions = questions.map(q => ({
  ...q,
  options: shuffle([...q.options]),
}));

// ── Main ───────────────────────────────────────────────────────
async function seed() {
  console.log('🔗  Connecting to MongoDB…');
  await mongoose.connect(MONGODB_URI);
  console.log('✅  Connected.');

  console.log('🗑   Clearing existing scholarship questions…');
  await ScholarshipQuestion.deleteMany({});

  console.log('🌱  Inserting 5 scholarship questions…');
  const inserted = await ScholarshipQuestion.insertMany(questions);
  console.log(`✅  Inserted ${inserted.length} questions.`);

  await mongoose.disconnect();
  console.log('🎉  Seeding complete!');
}

seed().catch(err => {
  console.error('❌  Seeding failed:', err);
  process.exit(1);
});
