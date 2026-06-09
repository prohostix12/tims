import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import OtpVerification from '@/models/OtpVerification';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();
    if (!email || !code) {
      return NextResponse.json({ error: 'Email and OTP code are required.' }, { status: 400 });
    }

    await connectDB();

    const otp = await OtpVerification.findOne({
      email: email.toLowerCase().trim(),
      verified: false,
    }).sort({ createdAt: -1 });

    if (!otp) {
      return NextResponse.json({ error: 'No OTP found for this email. Please request a new one.' }, { status: 400 });
    }

    if (otp.expiresAt < new Date()) {
      await OtpVerification.deleteOne({ _id: otp._id });
      return NextResponse.json({ error: 'OTP has expired. Please request a new one.' }, { status: 400 });
    }

    if (otp.code !== code.trim()) {
      return NextResponse.json({ error: 'Incorrect OTP. Please check and try again.' }, { status: 400 });
    }

    otp.verified = true;
    await otp.save();

    return NextResponse.json({ success: true, message: 'OTP verified successfully.' });
  } catch (err: any) {
    console.error('[OTP] Verify error:', err.message);
    return NextResponse.json({ error: 'Failed to verify OTP. Please try again.' }, { status: 500 });
  }
}
