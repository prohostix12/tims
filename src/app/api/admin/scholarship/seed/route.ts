import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ScholarshipQuestion } from '@/models/ScholarshipQuestion';
import { ScholarshipConfig } from '@/models/ScholarshipConfig';

export const dynamic = 'force-dynamic';

const QUESTIONS = [
  {
    question: "What is the primary purpose of a scholarship?",
    options: [
      { text: "To increase university tuition fees", isCorrect: false },
      { text: "To provide financial support to students for their education", isCorrect: true },
      { text: "To sponsor holiday trips", isCorrect: false },
      { text: "To pay for gaming consoles", isCorrect: false }
    ],
    order: 1,
    isActive: true
  },
  {
    question: "If a student is applying for a credit transfer program, what does it typically mean?",
    options: [
      { text: "Transferring from one course to another without any credit", isCorrect: false },
      { text: "Transferring academic credits earned at one school/college to another to continue education", isCorrect: true },
      { text: "Taking a loan from a bank", isCorrect: false },
      { text: "Getting a new credit card", isCorrect: false }
    ],
    order: 2,
    isActive: true
  },
  {
    question: "What does 'UGC-DEB' approved stand for in the context of Indian higher education?",
    options: [
      { text: "University Grants Commission - Distance Education Bureau", isCorrect: true },
      { text: "United Global Council - Department of Education Board", isCorrect: false },
      { text: "Universal Growth Commission - Digital Education Branch", isCorrect: false },
      { text: "Union Grants Council - Distance Entry Board", isCorrect: false }
    ],
    order: 3,
    isActive: true
  },
  {
    question: "If a course has a 20% discount on a fee of ₹10,000, what is the final discounted fee?",
    options: [
      { text: "₹9,000", isCorrect: false },
      { text: "₹8,000", isCorrect: true },
      { text: "₹8,500", isCorrect: false },
      { text: "₹7,500", isCorrect: false }
    ],
    order: 4,
    isActive: true
  },
  {
    question: "Which study mode allows working professionals to pursue higher education without attending physical classes daily?",
    options: [
      { text: "Full-time on-campus mode", isCorrect: false },
      { text: "Distance & Online mode", isCorrect: true },
      { text: "Part-time night shift only", isCorrect: false },
      { text: "Residential research mode", isCorrect: false }
    ],
    order: 5,
    isActive: true
  }
];

export async function GET() {
  try {
    await connectDB();

    // 1. Seed Scholarship Questions
    await ScholarshipQuestion.deleteMany({});
    const seededQuestions = await ScholarshipQuestion.insertMany(QUESTIONS);

    // 2. Ensure default configuration exists
    let config = await ScholarshipConfig.findOne({});
    if (!config) {
      config = await ScholarshipConfig.create({
        tiers: [
          { minScore: 20, amount: 500, label: 'Participation Scholarship' },
          { minScore: 60, amount: 1000, label: 'Merit Scholarship' },
          { minScore: 100, amount: 2000, label: 'Perfect Score Scholarship' }
        ],
        voucherValidityDays: 90,
        eligibleCourses: [],
        partnerCompanies: [],
        passingScore: 20, // Min 1 correct answer (20%) to get the 500 voucher
        totalQuestionsForScore: 5
      });
    } else {
      // Make sure the tiers are configured logically
      config.tiers = [
        { minScore: 20, amount: 500, label: 'Participation Scholarship' },
        { minScore: 60, amount: 1000, label: 'Merit Scholarship' },
        { minScore: 100, amount: 2000, label: 'Perfect Score Scholarship' }
      ];
      config.passingScore = 20;
      await config.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Scholarship questions and configurations seeded successfully!',
      questionsCount: seededQuestions.length,
      config
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
