import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import AdminConfig from '@/models/AdminConfig';
import { verifyToken, hashPassword, comparePassword, signToken, COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: 'Invalid session.' }, { status: 401 });

    const { currentPassword, newPassword, newEmail } = await req.json();
    if (!currentPassword) {
      return NextResponse.json({ error: 'Current password is required.' }, { status: 400 });
    }

    await connectDB();
    const admin = await AdminConfig.findOne({ email: payload.email });
    if (!admin) return NextResponse.json({ error: 'Admin not found.' }, { status: 404 });

    const valid = await comparePassword(currentPassword, admin.passwordHash);
    if (!valid) return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 400 });

    // Update email if provided
    if (newEmail && newEmail !== admin.email) {
      const exists = await AdminConfig.findOne({ email: newEmail.toLowerCase().trim() });
      if (exists) return NextResponse.json({ error: 'That email is already in use.' }, { status: 400 });
      admin.email = newEmail.toLowerCase().trim();
    }

    // Update password if provided
    if (newPassword) {
      if (newPassword.length < 6) {
        return NextResponse.json({ error: 'New password must be at least 6 characters.' }, { status: 400 });
      }
      admin.passwordHash = await hashPassword(newPassword);
    }

    await admin.save();

    // Re-issue token with potentially new email
    const newToken = signToken({ email: admin.email });
    const res = NextResponse.json({ success: true, email: admin.email });
    res.cookies.set(COOKIE_NAME, newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return res;
  } catch (err: any) {
    console.error('[Auth] Change password error:', err.message);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
