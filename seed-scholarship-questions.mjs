import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load from .env.local first, then .env
dotenv.config({ path: path.join(__dirname, '.env.local') });
dotenv.config({ path: path.join(__dirname, '.env') });

const ScholarshipQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ text: { type: String, required: true }, isCorrect: { type: Boolean, default: false } }],
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  category: { type: String, enum: ['Online UG', 'Online PG', 'Credit Transfer', 'General'], default: 'General' },
}, { timestamps: true });

const ScholarshipQuestion = mongoose.models.ScholarshipQuestion || 
  mongoose.model('ScholarshipQuestion', ScholarshipQuestionSchema);

const onlineUGQuestions = [
  {
    question: 'What is the primary advantage of online undergraduate programs?',
    category: 'Online UG',
    order: 1,
    options: [
      { text: 'Flexibility to study at your own pace and schedule', isCorrect: true },
      { text: 'Lower quality of education compared to in-person', isCorrect: false },
      { text: 'No need for any study effort', isCorrect: false },
      { text: 'Automatic job placement after graduation', isCorrect: false },
    ],
  },
  {
    question: 'Which of the following is NOT a requirement for online UG programs?',
    category: 'Online UG',
    order: 2,
    options: [
      { text: 'Regular attendance at campus', isCorrect: true },
      { text: 'Internet connection', isCorrect: false },
      { text: 'Self-discipline and time management', isCorrect: false },
      { text: 'Completion of assignments and examinations', isCorrect: false },
    ],
  },
  {
    question: 'What is the typical duration of an online bachelor\'s degree?',
    category: 'Online UG',
    order: 3,
    options: [
      { text: '3-4 years', isCorrect: true },
      { text: '6-8 months', isCorrect: false },
      { text: '10-12 years', isCorrect: false },
      { text: '2 months', isCorrect: false },
    ],
  },
  {
    question: 'How are exams typically conducted in online undergraduate programs?',
    category: 'Online UG',
    order: 4,
    options: [
      { text: 'Through a secure online platform or at designated centers', isCorrect: true },
      { text: 'Only through assignments and projects', isCorrect: false },
      { text: 'There are no exams in online programs', isCorrect: false },
      { text: 'Only through group discussions', isCorrect: false },
    ],
  },
  {
    question: 'Which subject stream is commonly offered in online UG programs?',
    category: 'Online UG',
    order: 5,
    options: [
      { text: 'Commerce, Science, and Arts', isCorrect: true },
      { text: 'Only Medical courses', isCorrect: false },
      { text: 'Only Engineering courses', isCorrect: false },
      { text: 'Only Law courses', isCorrect: false },
    ],
  },
  {
    question: 'What is a key skill required for success in online undergraduate education?',
    category: 'Online UG',
    order: 6,
    options: [
      { text: 'Self-motivation and discipline', isCorrect: true },
      { text: 'Ability to travel frequently', isCorrect: false },
      { text: 'Having a high salary job', isCorrect: false },
      { text: 'Speaking multiple foreign languages', isCorrect: false },
    ],
  },
  {
    question: 'Are online UG degrees recognized by employers?',
    category: 'Online UG',
    order: 7,
    options: [
      { text: 'Yes, if from UGC-approved universities', isCorrect: true },
      { text: 'No, employers only prefer in-campus degrees', isCorrect: false },
      { text: 'Only by foreign companies', isCorrect: false },
      { text: 'Degrees are not issued in online programs', isCorrect: false },
    ],
  },
  {
    question: 'What is the estimated annual fee for an online bachelor\'s degree?',
    category: 'Online UG',
    order: 8,
    options: [
      { text: '₹20,000 - ₹80,000', isCorrect: true },
      { text: '₹10,00,000 - ₹20,00,000', isCorrect: false },
      { text: '₹5,00,000 - ₹10,00,000', isCorrect: false },
      { text: 'Free with no charges', isCorrect: false },
    ],
  },
  {
    question: 'Can you pursue an online UG degree while working full-time?',
    category: 'Online UG',
    order: 9,
    options: [
      { text: 'Yes, that is one of the main advantages', isCorrect: true },
      { text: 'No, you must quit your job', isCorrect: false },
      { text: 'Only if you take a leave of absence', isCorrect: false },
      { text: 'No online programs allow working students', isCorrect: false },
    ],
  },
  {
    question: 'What type of content is typically provided in online UG programs?',
    category: 'Online UG',
    order: 10,
    options: [
      { text: 'Video lectures, e-books, assignments, and live sessions', isCorrect: true },
      { text: 'Only printed books without any videos', isCorrect: false },
      { text: 'No study material is provided', isCorrect: false },
      { text: 'Only live classroom sessions', isCorrect: false },
    ],
  },
];

const onlinePGQuestions = [
  {
    question: 'What is the primary benefit of pursuing an online postgraduate degree?',
    category: 'Online PG',
    order: 1,
    options: [
      { text: 'Career advancement while maintaining current employment', isCorrect: true },
      { text: 'No need to study or attend classes', isCorrect: false },
      { text: 'Automatic promotion at your job', isCorrect: false },
      { text: 'Guaranteed high salary', isCorrect: false },
    ],
  },
  {
    question: 'What is the typical duration of an online master\'s degree?',
    category: 'Online PG',
    order: 2,
    options: [
      { text: '2 years', isCorrect: true },
      { text: '1 month', isCorrect: false },
      { text: '5 years', isCorrect: false },
      { text: '10 years', isCorrect: false },
    ],
  },
  {
    question: 'Which qualification is prerequisite for online postgraduate programs?',
    category: 'Online PG',
    order: 3,
    options: [
      { text: 'Bachelor\'s degree or equivalent', isCorrect: true },
      { text: '10th pass', isCorrect: false },
      { text: 'No prior qualification needed', isCorrect: false },
      { text: 'A diploma only', isCorrect: false },
    ],
  },
  {
    question: 'What are popular online postgraduate programs?',
    category: 'Online PG',
    order: 4,
    options: [
      { text: 'MBA, M.Tech, M.Com, M.Sc, MA', isCorrect: true },
      { text: 'Only MBA programs', isCorrect: false },
      { text: 'Only Certificate courses', isCorrect: false },
      { text: 'Only Diploma programs', isCorrect: false },
    ],
  },
  {
    question: 'Are online master\'s degrees valued by international employers?',
    category: 'Online PG',
    order: 5,
    options: [
      { text: 'Yes, especially from reputed universities', isCorrect: true },
      { text: 'No, only in-person degrees are valued', isCorrect: false },
      { text: 'Only if obtained from foreign universities', isCorrect: false },
      { text: 'International employers do not hire PG graduates', isCorrect: false },
    ],
  },
  {
    question: 'What is a typical annual fee for online postgraduate programs?',
    category: 'Online PG',
    order: 6,
    options: [
      { text: '₹30,000 - ₹1,00,000', isCorrect: true },
      { text: '₹1,00,000 - ₹50,00,000', isCorrect: false },
      { text: '₹5,00,000 - ₹20,00,000', isCorrect: false },
      { text: 'Always free', isCorrect: false },
    ],
  },
  {
    question: 'Can online postgraduate students apply for scholarships?',
    category: 'Online PG',
    order: 7,
    options: [
      { text: 'Yes, many universities offer scholarships', isCorrect: true },
      { text: 'No scholarships available for online students', isCorrect: false },
      { text: 'Only for international students', isCorrect: false },
      { text: 'Only for part-time students', isCorrect: false },
    ],
  },
  {
    question: 'What skills do online postgraduate programs typically develop?',
    category: 'Online PG',
    order: 8,
    options: [
      { text: 'Advanced subject knowledge and research skills', isCorrect: true },
      { text: 'Only basic communication skills', isCorrect: false },
      { text: 'No skills are developed in online programs', isCorrect: false },
      { text: 'Only sports and recreational skills', isCorrect: false },
    ],
  },
  {
    question: 'How is thesis/research conducted in online postgraduate programs?',
    category: 'Online PG',
    order: 9,
    options: [
      { text: 'Guided by faculty with flexible submission deadlines', isCorrect: true },
      { text: 'No thesis is required in online programs', isCorrect: false },
      { text: 'Only through in-person supervision', isCorrect: false },
      { text: 'Thesis is not accepted for online degrees', isCorrect: false },
    ],
  },
  {
    question: 'What is the expected ROI (Return on Investment) for online PG degrees?',
    category: 'Online PG',
    order: 10,
    options: [
      { text: 'High career growth and salary increment potential', isCorrect: true },
      { text: 'No career benefits from online PG degrees', isCorrect: false },
      { text: 'Career decline compared to undergraduate', isCorrect: false },
      { text: 'ROI is not applicable for PG degrees', isCorrect: false },
    ],
  },
];

const creditTransferQuestions = [
  {
    question: 'What is the primary purpose of a credit transfer program?',
    category: 'Credit Transfer',
    order: 1,
    options: [
      { text: 'To recognize previously earned academic credits and complete degree faster', isCorrect: true },
      { text: 'To provide free education', isCorrect: false },
      { text: 'To change your career path completely', isCorrect: false },
      { text: 'To replace your existing degree', isCorrect: false },
    ],
  },
  {
    question: 'Who is eligible for credit transfer programs?',
    category: 'Credit Transfer',
    order: 2,
    options: [
      { text: 'Dropouts, switched students, or those with incomplete degrees', isCorrect: true },
      { text: 'Only fresh high school graduates', isCorrect: false },
      { text: 'Only working professionals', isCorrect: false },
      { text: 'Anyone regardless of previous education', isCorrect: false },
    ],
  },
  {
    question: 'How long does a credit transfer program typically take?',
    category: 'Credit Transfer',
    order: 3,
    options: [
      { text: '1-3 years depending on credits earned', isCorrect: true },
      { text: '10+ years', isCorrect: false },
      { text: 'Always 4 years', isCorrect: false },
      { text: '6 months', isCorrect: false },
    ],
  },
  {
    question: 'What documents are typically required for credit transfer?',
    category: 'Credit Transfer',
    order: 4,
    options: [
      { text: 'Academic transcripts, syllabi, and course descriptions', isCorrect: true },
      { text: 'Only passport copy', isCorrect: false },
      { text: 'No documents required', isCorrect: false },
      { text: 'Only age proof', isCorrect: false },
    ],
  },
  {
    question: 'Can credits from vocational training be transferred?',
    category: 'Credit Transfer',
    order: 5,
    options: [
      { text: 'Yes, if they meet degree requirements', isCorrect: true },
      { text: 'No, vocational credits are never accepted', isCorrect: false },
      { text: 'Only if the training was abroad', isCorrect: false },
      { text: 'Vocational training has no academic value', isCorrect: false },
    ],
  },
  {
    question: 'What is the average cost of a credit transfer program?',
    category: 'Credit Transfer',
    order: 6,
    options: [
      { text: '₹20,000 - ₹80,000 per year', isCorrect: true },
      { text: '₹10,00,000 - ₹20,00,000 per year', isCorrect: false },
      { text: 'Always free', isCorrect: false },
      { text: 'No fee structure exists', isCorrect: false },
    ],
  },
  {
    question: 'How are transferred credits evaluated in a new degree program?',
    category: 'Credit Transfer',
    order: 7,
    options: [
      { text: 'Through transcript evaluation and course mapping by the university', isCorrect: true },
      { text: 'All credits are automatically accepted', isCorrect: false },
      { text: 'No evaluation is done', isCorrect: false },
      { text: 'Credits are never accepted in transfer', isCorrect: false },
    ],
  },
  {
    question: 'Can you pursue a credit transfer program while working?',
    category: 'Credit Transfer',
    order: 8,
    options: [
      { text: 'Yes, flexibility is a key advantage', isCorrect: true },
      { text: 'No, you must be a full-time student', isCorrect: false },
      { text: 'Only if you are unemployed', isCorrect: false },
      { text: 'Working professionals are not eligible', isCorrect: false },
    ],
  },
  {
    question: 'Is a degree obtained through credit transfer recognized?',
    category: 'Credit Transfer',
    order: 9,
    options: [
      { text: 'Yes, fully recognized if from accredited university', isCorrect: true },
      { text: 'No, transfer degrees are not recognized', isCorrect: false },
      { text: 'Only recognized in certain states', isCorrect: false },
      { text: 'Recognition depends on the employer\'s mood', isCorrect: false },
    ],
  },
  {
    question: 'What is the maximum number of credits that can be transferred?',
    category: 'Credit Transfer',
    order: 10,
    options: [
      { text: 'Usually up to 50-60% of total degree credits', isCorrect: true },
      { text: '100% of all credits can be transferred', isCorrect: false },
      { text: 'Only 10% of credits can be transferred', isCorrect: false },
      { text: 'No transfer limit exists', isCorrect: false },
    ],
  },
];

async function seedQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing questions
    await ScholarshipQuestion.deleteMany({});
    console.log('🗑️  Cleared existing questions');

    // Seed Online UG questions
    const ugResult = await ScholarshipQuestion.insertMany(
      onlineUGQuestions.map(q => ({ ...q, isActive: true }))
    );
    console.log(`✅ Added ${ugResult.length} Online UG questions`);

    // Seed Online PG questions
    const pgResult = await ScholarshipQuestion.insertMany(
      onlinePGQuestions.map(q => ({ ...q, isActive: true }))
    );
    console.log(`✅ Added ${pgResult.length} Online PG questions`);

    // Seed Credit Transfer questions
    const ctResult = await ScholarshipQuestion.insertMany(
      creditTransferQuestions.map(q => ({ ...q, isActive: true }))
    );
    console.log(`✅ Added ${ctResult.length} Credit Transfer questions`);

    console.log('\n📊 Question Bank Summary:');
    const counts = await Promise.all([
      ScholarshipQuestion.countDocuments({ category: 'Online UG' }),
      ScholarshipQuestion.countDocuments({ category: 'Online PG' }),
      ScholarshipQuestion.countDocuments({ category: 'Credit Transfer' }),
    ]);
    console.log(`  • Online UG: ${counts[0]} questions`);
    console.log(`  • Online PG: ${counts[1]} questions`);
    console.log(`  • Credit Transfer: ${counts[2]} questions`);
    console.log(`  • Total: ${counts[0] + counts[1] + counts[2]} questions`);

    console.log('\n✨ Scholarship question banks seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding questions:', error);
    process.exit(1);
  }
}

seedQuestions();
