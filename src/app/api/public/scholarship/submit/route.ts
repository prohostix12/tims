import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ScholarshipQuestion } from '@/models/ScholarshipQuestion';
import { ScholarshipConfig } from '@/models/ScholarshipConfig';

export const dynamic = 'force-dynamic';

function generateVoucherCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const seg = (n: number) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `SCHOL-${seg(4)}-${seg(4)}-${seg(4)}`;
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { answers } = await req.json();
    // answers: { [questionId]: selectedOptionText }

    const questions = await ScholarshipQuestion.find({ isActive: true }).sort({ order: 1 });
    const config = await ScholarshipConfig.findOne({}) || await ScholarshipConfig.create({});

    let correct = 0;
    const results = questions.map(q => {
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

    const total = questions.length || 1;
    const scorePercent = Math.round((correct / total) * 100);

    // Find highest matching tier
    const sortedTiers = [...(config.tiers || [])].sort((a, b) => b.minScore - a.minScore);
    const matchedTier = sortedTiers.find(t => scorePercent >= t.minScore) ?? null;

    let voucher = null;
    if (matchedTier) {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + (config.voucherValidityDays || 90));
      voucher = {
        code: generateVoucherCode(),
        amount: matchedTier.amount,
        label: matchedTier.label,
        validUntil: expiry.toISOString(),
        validityDays: config.voucherValidityDays,
      };
    }

    return NextResponse.json({
      score: correct,
      total,
      scorePercent,
      passed: !!matchedTier,
      voucher,
      results,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
