require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

const schema = new mongoose.Schema({}, { strict: false });
const CourseFinderQuestion = mongoose.models.CourseFinderQuestion || mongoose.model('CourseFinderQuestion', schema);

async function main() {
  await mongoose.connect(uri);
  const questions = await CourseFinderQuestion.find().sort({ order: 1 });
  console.log(JSON.stringify(questions, null, 2));
  await mongoose.disconnect();
}
main();
