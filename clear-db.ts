import mongoose from 'mongoose';
import connectDB from './src/lib/db';
import Blog from './src/models/Blog';
import CourseFinderQuestion from './src/models/CourseFinderQuestion';
import Lead from './src/models/Lead';
import Message from './src/models/Message';
import News from './src/models/News';
import Program from './src/models/Program';
import StudyMaterial from './src/models/StudyMaterial';
import Syllabus from './src/models/Syllabus';
import Timetable from './src/models/Timetable';
import University from './src/models/University';

async function clearDB() {
  try {
    await connectDB();
    console.log('Connected to MongoDB.');

    await Blog.deleteMany({});
    console.log('Cleared Blogs.');

    await CourseFinderQuestion.deleteMany({});
    console.log('Cleared CourseFinderQuestions.');

    await Lead.deleteMany({});
    console.log('Cleared Leads.');

    await Message.deleteMany({});
    console.log('Cleared Messages.');

    await News.deleteMany({});
    console.log('Cleared News.');

    await Program.deleteMany({});
    console.log('Cleared Programs.');

    await StudyMaterial.deleteMany({});
    console.log('Cleared StudyMaterials.');

    await Syllabus.deleteMany({});
    console.log('Cleared Syllabus.');

    await Timetable.deleteMany({});
    console.log('Cleared Timetables.');

    await University.deleteMany({});
    console.log('Cleared Universities.');

    console.log('Successfully removed all data from the database.');
    process.exit(0);
  } catch (err) {
    console.error('Error clearing DB:', err);
    process.exit(1);
  }
}

clearDB();
