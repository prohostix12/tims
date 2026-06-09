import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import AdminConfig from '@/models/AdminConfig';
import { signToken, hashPassword, comparePassword, COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// Seed default admin if none exists
async function ensureDefaultAdmin() {
  const count = await AdminConfig.countDocuments();
  if (count === 0) {
    const passwordHash = await hashPassword('admin123');
    await AdminConfig.create({ email: 'admin@tims.edu', passwordHash });
    console.log('[Auth] Default admin created: admin@tims.edu / admin123');
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    await ensureDefaultAdmin();

    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const admin = await AdminConfig.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const valid = await comparePassword(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const token = signToken({ email: admin.email });
    const res = NextResponse.json({ success: true, email: admin.email });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    return res;
  } catch (err: any) {
    console.error('[Auth] Login error:', err.message);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
