
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import connectDB from '../src/lib/db.ts';
import Program from '../src/models/Program.ts';

async function checkPrograms() {
  await connectDB();
  const programs = await Program.find({});
  console.log(JSON.stringify(programs, null, 2));
  process.exit(0);
}

checkPrograms();
