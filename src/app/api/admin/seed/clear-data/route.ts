import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import CourseFinderQuestion from '@/models/CourseFinderQuestion';
import Lead from '@/models/Lead';
import Message from '@/models/Message';
import News from '@/models/News';
import Program from '@/models/Program';
import StudyMaterial from '@/models/StudyMaterial';
import Syllabus from '@/models/Syllabus';
import Timetable from '@/models/Timetable';
import University from '@/models/University';

export async function DELETE() {
  try {
    await connectDB();
    await Promise.all([
      Blog.deleteMany({}),
      CourseFinderQuestion.deleteMany({}),
      Lead.deleteMany({}),
      Message.deleteMany({}),
      News.deleteMany({}),
      Program.deleteMany({}),
      StudyMaterial.deleteMany({}),
      Syllabus.deleteMany({}),
      Timetable.deleteMany({}),
      University.deleteMany({}),
    ]);
    return NextResponse.json({ message: 'All demo data cleared successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
