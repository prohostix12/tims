import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Sample from '@/models/Sample';

export async function GET() {
  try {
    await connectDB();
    
    // Create a dummy document to make the database appear in Atlas
    const newSample = await Sample.create({
      name: 'Initial Data Entry ' + new Date().toLocaleString(),
    });

    return NextResponse.json({ 
      status: 'Success', 
      message: 'Database created and document inserted!',
      data: newSample 
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ status: 'Error', message }, { status: 500 });
  }
}
