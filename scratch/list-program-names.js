
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import connectDB from '../src/lib/db.ts';
import Program from '../src/models/Program.ts';

async function listPrograms() {
  await connectDB();
  const programs = await Program.find({}, 'name _id slug');
  console.log(JSON.stringify(programs, null, 2));
  process.exit(0);
}

listPrograms();
