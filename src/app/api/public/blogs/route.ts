import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';

export async function GET() {
  try {
    await connectDB();
    // Only fetch published blogs for the public site
    const blogs = await Blog.find({ status: 'published' }).sort({ publishedAt: -1 });
    return NextResponse.json(blogs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
