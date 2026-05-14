import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Enrollment from '@/models/Enrollment';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const { studentName, email, phone, program, university } = body;
    
    // Basic validation
    if (!studentName || !email || !phone || !program) {
      return NextResponse.json(
        { error: 'Name, email, phone, and program are required' }, 
        { status: 400 }
      );
    }

    const newEnrollment = await Enrollment.create({
      studentName,
      email,
      phone,
      program,
      university: university || 'Not specified',
      status: 'Pending',
    });

    return NextResponse.json(
      { message: 'Registration successful', enrollment: newEnrollment }, 
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during registration' }, 
      { status: 500 }
    );
  }
}
