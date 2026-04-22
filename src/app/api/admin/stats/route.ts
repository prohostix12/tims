
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import University from '@/models/University';
import Message from '@/models/Message';

export async function GET() {
  try {
    await connectDB();
    
    const [universityCount, messageCount] = await Promise.all([
      University.countDocuments(),
      Message.countDocuments({ read: false })
    ]);

    return NextResponse.json({
      universities: universityCount,
      pendingMessages: messageCount,
      students: 0, // Placeholder until Student model is created
      programs: 0  // Placeholder until Program model is created
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
