import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import AdminConfig from '@/models/AdminConfig';
import { hashPassword } from '@/lib/auth';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email is required.' }, { status: 400 });

    await connectDB();
    const admin = await AdminConfig.findOne({ email: email.toLowerCase().trim() });

    // Always return success to avoid email enumeration
    if (!admin) {
      return NextResponse.json({ success: true, message: 'If that email exists, a reset link has been sent.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    admin.resetToken = resetToken;
    admin.resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 30); // 30 min
    await admin.save();

    // TODO: Send email with reset link
    // The reset link would be: /admin/reset-password?token=<resetToken>
    console.log(`[Auth] Password reset token for ${email}: ${resetToken}`);

    return NextResponse.json({ success: true, message: 'If that email exists, a reset link has been sent.' });
  } catch (err: any) {
    console.error('[Auth] Forgot password error:', err.message);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}

// Reset with token
export async function PUT(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();
    if (!token || !newPassword) {
      return NextResponse.json({ error: 'Token and new password are required.' }, { status: 400 });
    }
    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    await connectDB();
    const admin = await AdminConfig.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!admin) {
      return NextResponse.json({ error: 'Invalid or expired reset token.' }, { status: 400 });
    }

    admin.passwordHash = await hashPassword(newPassword);
    admin.resetToken = undefined;
    admin.resetTokenExpiry = undefined;
    await admin.save();

    return NextResponse.json({ success: true, message: 'Password reset successfully.' });
  } catch (err: any) {
    console.error('[Auth] Reset password error:', err.message);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
