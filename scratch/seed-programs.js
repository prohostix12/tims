import connectDB from '@/lib/db';
import Program from '@/models/Program';
import University from '@/models/University';

async function seedPrograms() {
  try {
    await connectDB();
    const uni = await University.findOne();
    if (!uni) {
      console.error('No university found. Seed a university first.');
      return;
    }
    const programs = [
      {
        name: 'MBA - Master of Business Administration',
        university: uni._id,
        slug: 'mba-mba',
        category: 'Management',
        courseType: 'Management',
        highlights: ['Leadership', 'Finance', 'Marketing'],
        curriculum: ['Core Courses', 'Electives'],
        fee: 200000,
      },
      {
        name: 'B.Tech - Bachelor of Technology',
        university: uni._id,
        slug: 'btech',
        category: 'Engineering',
        courseType: 'IT',
        highlights: ['Programming', 'Data Structures'],
        curriculum: ['Semester 1', 'Semester 2'],
        fee: 150000,
      },
      {
        name: 'B.Sc - Bachelor of Science',
        university: uni._id,
        slug: 'bsc-science',
        category: 'Science',
        courseType: 'Science',
        highlights: ['Physics', 'Chemistry', 'Maths'],
        curriculum: ['Year 1', 'Year 2', 'Year 3'],
        fee: 120000,
      },
    ];
    await Program.insertMany(programs);
    console.log('Sample programs seeded successfully');
  } catch (err) {
    console.error('Seeding error', err);
  } finally {
    process.exit();
  }
}

seedPrograms();
