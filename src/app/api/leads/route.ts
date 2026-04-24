import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Lead from '@/models/Lead';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Basic validation is handled in the frontend, but we can do a quick check here too
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json({ error: 'Name, email, and phone are required' }, { status: 400 });
    }

    const lead = await Lead.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      description: body.description,
      source: body.source || 'Enquiry Form',
      interest: body.interest
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
