import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import OtpVerification from '@/models/OtpVerification';
import { sendOtpEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    await connectDB();

    // Delete any existing OTPs for this email
    await OtpVerification.deleteMany({ email: email.toLowerCase().trim() });

    const code = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await OtpVerification.create({
      email: email.toLowerCase().trim(),
      code,
      expiresAt,
      verified: false,
    });

    // Send OTP email
    await sendOtpEmail(email, code, name);
    console.log(`[OTP] Sent to ${email}`);

    return NextResponse.json({ success: true, message: 'OTP sent to your email.' });
  } catch (err: any) {
    console.error('[OTP] Send error:', err.message);
    return NextResponse.json({ error: 'Failed to send OTP. Please try again.' }, { status: 500 });
  }
}
