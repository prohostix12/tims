
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import University from '@/models/University';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const universities = await University.find({}).sort({ createdAt: -1 });
    return NextResponse.json(universities);
  } catch (error: any) {
    console.error('GET /api/admin/universities error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const university = await University.create(body);
    return NextResponse.json(university, { status: 201 });
  } catch (error: any) {
    console.error('University Creation API Error:', error);
    
    // Check for MongoDB authentication errors
    if (error.message.includes('auth') || error.message.includes('Authentication') || error.message.includes('bad auth')) {
      return NextResponse.json({ 
        error: 'Database Authentication Failed. Please check your MONGODB_URI in environment variables.' 
      }, { status: 401 });
    }
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
