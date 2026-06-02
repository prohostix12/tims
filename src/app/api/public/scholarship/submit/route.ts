import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ScholarshipApplication } from '@/models/ScholarshipApplication';
import { ScholarshipQuestion } from '@/models/ScholarshipQuestion';
import { ScholarshipConfig } from '@/models/ScholarshipConfig';

export const dynamic = 'force-dynamic';

function generateVoucherCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const seg = (n: number) =>
    Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `SCHOL-${seg(4)}-${seg(4)}-${seg(4)}`;
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { token, answers } = await req.json();

    if (!token) return NextResponse.json({ error: 'Token required' }, { status: 400 });

    const application = await ScholarshipApplication.findOne({ token });
    if (!application) return NextResponse.json({ error: 'Invalid token' }, { status: 404 });
    if (application.examCompleted) {
      return NextResponse.json({ error: 'Exam already submitted' }, { status: 400 });
    }

    const allQuestions = await ScholarshipQuestion.find({ _id: { $in: application.questionIds } });
    const questionMap = new Map();
    allQuestions.forEach((q: any) => questionMap.set(String(q._id), q));

    const orderedQuestions = application.questionIds
      .map((id: any) => questionMap.get(String(id)))
      .filter(Boolean);

    // Fetch or create config (with default tiers)
    const config = await ScholarshipConfig.findOne({}) || await ScholarshipConfig.create({});

    let correct = 0;
    const results = orderedQuestions.map((q: any) => {
      const selected = answers[String(q._id)];
      const correctOption = q.options.find((o: any) => o.isCorrect);
      const isCorrect = correctOption && selected === correctOption.text;
      if (isCorrect) correct++;
      return {
        question: q.question,
        selected,
        correctAnswer: correctOption?.text ?? '',
        isCorrect: !!isCorrect,
      };
    });

    const total = orderedQuestions.length || 1;
    const scorePercent = Math.round((correct / total) * 100);

    // ── Dynamic tier matching ──────────────────────────────────
    // Sort tiers by minScore descending so we match the highest qualifying tier first
    const tiers: { minScore: number; amount: number; label: string }[] =
      Array.isArray(config.tiers) && config.tiers.length > 0
        ? [...config.tiers].sort((a, b) => b.minScore - a.minScore)
        : [
            { minScore: 80, amount: 3000, label: 'Platinum Scholar' },
            { minScore: 60, amount: 2000, label: 'Gold Scholar' },
            { minScore: 50, amount: 1000, label: 'Silver Scholar' },
          ];

    // passingScore is a percentage (e.g. 50 means 50%)
    const passingScorePercent: number = config.passingScore ?? 50;

    let voucherAmount: number | null = null;
    let voucherLabel = '';

    if (scorePercent >= passingScorePercent) {
      for (const tier of tiers) {
        if (scorePercent >= tier.minScore) {
          voucherAmount = tier.amount;
          voucherLabel = tier.label;
          break;
        }
      }
      // If no tier matched but student passed, fall back to the lowest tier
      if (voucherAmount === null && tiers.length > 0) {
        const lowestTier = tiers[tiers.length - 1];
        voucherAmount = lowestTier.amount;
        voucherLabel = lowestTier.label;
      }
    }

    // Compute the minimum correct answers the student needs to pass
    const minCorrectToPass = Math.ceil((passingScorePercent / 100) * total);

    let voucher = null;
    const updateData: any = {
      examCompleted: true,
      score: correct,
      totalQuestions: total,
    };

    if (voucherAmount !== null) {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + (config.voucherValidityDays || 90));
      const code = generateVoucherCode();
      voucher = {
        code,
        amount: voucherAmount,
        label: voucherLabel,
        validUntil: expiry.toISOString(),
        validityDays: config.voucherValidityDays || 90,
      };
      updateData.voucherCode = code;
      updateData.voucherAmount = voucherAmount;
      updateData.voucherLabel = voucherLabel;
      updateData.voucherValidUntil = expiry;
    }

    await ScholarshipApplication.findByIdAndUpdate(application._id, updateData);

    return NextResponse.json({
      score: correct,
      total,
      scorePercent,
      passed: voucherAmount !== null,
      voucher,
      results,
      applicantName: application.name,
      course: application.course,
      university: application.university,
      // Inform the frontend of the passing threshold
      minCorrectToPass,
      passingScorePercent,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
