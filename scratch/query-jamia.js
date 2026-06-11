require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

const programSchema = new mongoose.Schema({
  university: { type: mongoose.Schema.Types.ObjectId, ref: 'University' }
}, { strict: false });
const Program = mongoose.models.Program || mongoose.model('Program', programSchema);
const University = mongoose.models.University || mongoose.model('University', new mongoose.Schema({}, { strict: false }));

async function main() {
  await mongoose.connect(uri);
  const programs = await Program.find().populate('university');
  const schoolPrograms = programs.filter(p => 
    p.level === 'Secondary' || 
    p.level === 'Sr Secondary' || 
    p.level === 'Senior Secondary' ||
    p.category === 'SSLC' ||
    p.category === '+2'
  );
  console.log('Total school programs count:', schoolPrograms.length);
  schoolPrograms.forEach(p => {
    console.log(`- Name: "${p.name}", Category: "${p.category}", Level: "${p.level}", University: "${p.university ? p.university.name : 'Unknown'}"`);
  });
  await mongoose.disconnect();
}
main();
