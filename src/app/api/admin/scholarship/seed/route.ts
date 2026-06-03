import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ScholarshipQuestion } from '@/models/ScholarshipQuestion';
import { ScholarshipConfig } from '@/models/ScholarshipConfig';

export const dynamic = 'force-dynamic';

const QUESTIONS = [
  /* ─────────────── ONLINE UG ─────────────── */
  {
    category: 'Online UG', order: 1, isActive: true,
    question: 'What does BCA stand for?',
    options: [
      { text: 'Bachelor of Computer Applications', isCorrect: true },
      { text: 'Bachelor of Commerce and Arts', isCorrect: false },
      { text: 'Bachelor of Civil Administration', isCorrect: false },
      { text: 'Bachelor of Creative Arts', isCorrect: false },
    ],
  },
  {
    category: 'Online UG', order: 2, isActive: true,
    question: 'What does BBA stand for?',
    options: [
      { text: 'Bachelor of Business Administration', isCorrect: true },
      { text: 'Bachelor of Banking and Accountancy', isCorrect: false },
      { text: 'Bachelor of Basic Arts', isCorrect: false },
      { text: 'Bureau of Business Aptitude', isCorrect: false },
    ],
  },
  {
    category: 'Online UG', order: 3, isActive: true,
    question: 'What is the minimum educational qualification to apply for UG programs in India?',
    options: [
      { text: '10+2 / Class 12 pass from a recognised board', isCorrect: true },
      { text: 'Class 10 pass', isCorrect: false },
      { text: 'Diploma from any institute', isCorrect: false },
      { text: 'Graduate degree', isCorrect: false },
    ],
  },
  {
    category: 'Online UG', order: 4, isActive: true,
    question: 'What does UGC stand for?',
    options: [
      { text: 'University Grants Commission', isCorrect: true },
      { text: 'Union Government Council', isCorrect: false },
      { text: 'Universal Graduate Certification', isCorrect: false },
      { text: 'United General Council', isCorrect: false },
    ],
  },
  {
    category: 'Online UG', order: 5, isActive: true,
    question: 'What is the typical duration of a Bachelor\'s degree in India?',
    options: [
      { text: '3 years', isCorrect: true },
      { text: '2 years', isCorrect: false },
      { text: '4 years', isCorrect: false },
      { text: '5 years', isCorrect: false },
    ],
  },
  {
    category: 'Online UG', order: 6, isActive: true,
    question: 'What does CBCS stand for in higher education?',
    options: [
      { text: 'Choice Based Credit System', isCorrect: true },
      { text: 'Central Board of Course Selection', isCorrect: false },
      { text: 'Credit-Based Curriculum Structure', isCorrect: false },
      { text: 'College Board of Curriculum Studies', isCorrect: false },
    ],
  },
  {
    category: 'Online UG', order: 7, isActive: true,
    question: 'Which body regulates distance and online UG education in India?',
    options: [
      { text: 'UGC-DEB (Distance Education Bureau)', isCorrect: true },
      { text: 'AICTE', isCorrect: false },
      { text: 'NCERT', isCorrect: false },
      { text: 'Ministry of Finance', isCorrect: false },
    ],
  },
  {
    category: 'Online UG', order: 8, isActive: true,
    question: 'What does B.Com stand for?',
    options: [
      { text: 'Bachelor of Commerce', isCorrect: true },
      { text: 'Bachelor of Communication', isCorrect: false },
      { text: 'Bachelor of Computer', isCorrect: false },
      { text: 'Bachelor of Common Studies', isCorrect: false },
    ],
  },
  {
    category: 'Online UG', order: 9, isActive: true,
    question: 'Which of the following is an undergraduate degree program?',
    options: [
      { text: 'B.Sc', isCorrect: true },
      { text: 'M.Sc', isCorrect: false },
      { text: 'Ph.D', isCorrect: false },
      { text: 'MBA', isCorrect: false },
    ],
  },
  {
    category: 'Online UG', order: 10, isActive: true,
    question: 'Online and distance UG programs in India are approved by which authority?',
    options: [
      { text: 'UGC (University Grants Commission)', isCorrect: true },
      { text: 'RBI (Reserve Bank of India)', isCorrect: false },
      { text: 'SEBI', isCorrect: false },
      { text: 'ISRO', isCorrect: false },
    ],
  },

  /* ─────────────── ONLINE PG ─────────────── */
  {
    category: 'Online PG', order: 1, isActive: true,
    question: 'What does MBA stand for?',
    options: [
      { text: 'Master of Business Administration', isCorrect: true },
      { text: 'Master of Banking and Accounts', isCorrect: false },
      { text: 'Management of Business Activities', isCorrect: false },
      { text: 'Master of Business Analytics', isCorrect: false },
    ],
  },
  {
    category: 'Online PG', order: 2, isActive: true,
    question: 'What does MCA stand for?',
    options: [
      { text: 'Master of Computer Applications', isCorrect: true },
      { text: 'Master of Commerce and Arts', isCorrect: false },
      { text: 'Master of Civil Administration', isCorrect: false },
      { text: 'Management of Computer Algorithms', isCorrect: false },
    ],
  },
  {
    category: 'Online PG', order: 3, isActive: true,
    question: 'What is the minimum qualification to enrol in a PG program in India?',
    options: [
      { text: 'A recognised Bachelor\'s degree', isCorrect: true },
      { text: 'Class 12 certificate', isCorrect: false },
      { text: 'A Diploma certificate', isCorrect: false },
      { text: 'A Doctorate degree', isCorrect: false },
    ],
  },
  {
    category: 'Online PG', order: 4, isActive: true,
    question: 'Which entrance exam is most commonly used for MBA admissions in India?',
    options: [
      { text: 'CAT (Common Admission Test)', isCorrect: true },
      { text: 'GATE', isCorrect: false },
      { text: 'JEE Main', isCorrect: false },
      { text: 'NEET', isCorrect: false },
    ],
  },
  {
    category: 'Online PG', order: 5, isActive: true,
    question: 'What is the typical duration of most PG degree programs in India?',
    options: [
      { text: '2 years', isCorrect: true },
      { text: '1 year', isCorrect: false },
      { text: '3 years', isCorrect: false },
      { text: '4 years', isCorrect: false },
    ],
  },
  {
    category: 'Online PG', order: 6, isActive: true,
    question: 'What does M.Com stand for?',
    options: [
      { text: 'Master of Commerce', isCorrect: true },
      { text: 'Master of Communication', isCorrect: false },
      { text: 'Master of Computer', isCorrect: false },
      { text: 'Master of Corporate Management', isCorrect: false },
    ],
  },
  {
    category: 'Online PG', order: 7, isActive: true,
    question: 'What does PGDM stand for?',
    options: [
      { text: 'Post Graduate Diploma in Management', isCorrect: true },
      { text: 'Post Graduate Degree in Medicine', isCorrect: false },
      { text: 'Professional Graduate Diploma in Marketing', isCorrect: false },
      { text: 'Post Graduate Department of Management', isCorrect: false },
    ],
  },
  {
    category: 'Online PG', order: 8, isActive: true,
    question: 'What is UGC-NET used for?',
    options: [
      { text: 'Determining eligibility for Assistant Professor and Junior Research Fellowship', isCorrect: true },
      { text: 'Admission to UG programs', isCorrect: false },
      { text: 'Granting bank loans to students', isCorrect: false },
      { text: 'Issuing scholarship vouchers', isCorrect: false },
    ],
  },
  {
    category: 'Online PG', order: 9, isActive: true,
    question: 'What does M.Sc stand for?',
    options: [
      { text: 'Master of Science', isCorrect: true },
      { text: 'Master of Social Commerce', isCorrect: false },
      { text: 'Master of School Curriculum', isCorrect: false },
      { text: 'Master of Supply Chain', isCorrect: false },
    ],
  },
  {
    category: 'Online PG', order: 10, isActive: true,
    question: 'Which of the following is a postgraduate management degree?',
    options: [
      { text: 'MBA', isCorrect: true },
      { text: 'BBA', isCorrect: false },
      { text: 'B.Com', isCorrect: false },
      { text: 'BA Economics', isCorrect: false },
    ],
  },

  /* ─────────────── CREDIT TRANSFER ─────────────── */
  {
    category: 'Credit Transfer', order: 1, isActive: true,
    question: 'What is the primary purpose of a credit transfer program?',
    options: [
      { text: 'To allow students to continue education without repeating subjects already completed', isCorrect: true },
      { text: 'To transfer money from one bank to another', isCorrect: false },
      { text: 'To exchange students between universities for a semester', isCorrect: false },
      { text: 'To get a discount on course fees', isCorrect: false },
    ],
  },
  {
    category: 'Credit Transfer', order: 2, isActive: true,
    question: 'What does "lateral entry" mean in the context of credit transfer?',
    options: [
      { text: 'Joining a program at an advanced level based on prior education or credits', isCorrect: true },
      { text: 'Joining from the side entrance of a college building', isCorrect: false },
      { text: 'Transferring to a lateral-thinking course', isCorrect: false },
      { text: 'Applying to a university abroad', isCorrect: false },
    ],
  },
  {
    category: 'Credit Transfer', order: 3, isActive: true,
    question: 'What is a "credit hour" in academic terms?',
    options: [
      { text: 'A unit measuring the amount of coursework studied per week', isCorrect: true },
      { text: 'One hour of free credit on a prepaid card', isCorrect: false },
      { text: 'A one-hour exam conducted for credit evaluation', isCorrect: false },
      { text: 'The number of books in a library', isCorrect: false },
    ],
  },
  {
    category: 'Credit Transfer', order: 4, isActive: true,
    question: 'What is CBCS in the context of credit transfer?',
    options: [
      { text: 'Choice Based Credit System — enables flexible credit transfer between institutions', isCorrect: true },
      { text: 'Central Board of Credit Studies', isCorrect: false },
      { text: 'Credit Balance for Course Selection', isCorrect: false },
      { text: 'College Board Credit System', isCorrect: false },
    ],
  },
  {
    category: 'Credit Transfer', order: 5, isActive: true,
    question: 'What is an official "transcript" in the context of a credit transfer application?',
    options: [
      { text: 'An official academic record showing completed courses and grades earned', isCorrect: true },
      { text: 'A written speech delivered at graduation', isCorrect: false },
      { text: 'A type of bank account statement', isCorrect: false },
      { text: 'A summary of extracurricular activities', isCorrect: false },
    ],
  },
  {
    category: 'Credit Transfer', order: 6, isActive: true,
    question: 'Which students typically benefit most from credit transfer programs?',
    options: [
      { text: 'Students who have partially completed a degree at another institution', isCorrect: true },
      { text: 'Students appearing for Class 12 board exams', isCorrect: false },
      { text: 'Students who have never attended any college', isCorrect: false },
      { text: 'Students who want to study a foreign language only', isCorrect: false },
    ],
  },
  {
    category: 'Credit Transfer', order: 7, isActive: true,
    question: 'What does an "articulation agreement" between two universities mean?',
    options: [
      { text: 'A formal agreement to recognise and accept each other\'s academic credits', isCorrect: true },
      { text: 'A partnership for sports events between two universities', isCorrect: false },
      { text: 'An agreement to share library books', isCorrect: false },
      { text: 'A contract for staff exchange', isCorrect: false },
    ],
  },
  {
    category: 'Credit Transfer', order: 8, isActive: true,
    question: 'Which students are most likely eligible for B.Tech lateral entry via credit transfer?',
    options: [
      { text: 'Diploma holders in Engineering', isCorrect: true },
      { text: 'Class 10 pass students', isCorrect: false },
      { text: 'Students with only a commerce background', isCorrect: false },
      { text: 'PhD scholars', isCorrect: false },
    ],
  },
  {
    category: 'Credit Transfer', order: 9, isActive: true,
    question: 'What is the full form of NAAC?',
    options: [
      { text: 'National Assessment and Accreditation Council', isCorrect: true },
      { text: 'National Academy of Arts and Commerce', isCorrect: false },
      { text: 'New Academic Approval Committee', isCorrect: false },
      { text: 'National Alliance for Academic Credit', isCorrect: false },
    ],
  },
  {
    category: 'Credit Transfer', order: 10, isActive: true,
    question: 'Which body is the primary regulator of credit transfer in Indian higher education?',
    options: [
      { text: 'University Grants Commission (UGC)', isCorrect: true },
      { text: 'Reserve Bank of India (RBI)', isCorrect: false },
      { text: 'Securities and Exchange Board of India (SEBI)', isCorrect: false },
      { text: 'National Stock Exchange (NSE)', isCorrect: false },
    ],
  },
];

export async function GET() {
  try {
    await connectDB();

    await ScholarshipQuestion.deleteMany({});
    const seeded = await ScholarshipQuestion.insertMany(QUESTIONS);

    let config = await ScholarshipConfig.findOne({});
    if (!config) {
      config = await ScholarshipConfig.create({
        tiers: [
          { minScore: 40, amount: 500,  label: 'Participation Scholarship' },
          { minScore: 60, amount: 1000, label: 'Merit Scholarship' },
          { minScore: 80, amount: 2000, label: 'Excellence Scholarship' },
          { minScore: 100, amount: 3000, label: 'Perfect Score Scholarship' },
        ],
        voucherValidityDays: 90,
        eligibleCourses: [],
        partnerCompanies: [],
        passingScore: 40,
        totalQuestionsForScore: 5,
      });
    }

    const ug = seeded.filter((q: any) => q.category === 'Online UG').length;
    const pg = seeded.filter((q: any) => q.category === 'Online PG').length;
    const ct = seeded.filter((q: any) => q.category === 'Credit Transfer').length;

    return NextResponse.json({
      success: true,
      message: `Seeded ${seeded.length} questions across 3 question banks.`,
      breakdown: { 'Online UG': ug, 'Online PG': pg, 'Credit Transfer': ct },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
