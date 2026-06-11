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
  const data = await Program.find().populate('university');
  
  const courses = data.map(c => ({
    _id: c._id,
    slug: c.slug || '',
    title: c.name || c.title || '',
    level: c.level || '',
    category: c.category || '',
    type: c.type || '',
    courseType: c.courseType || '',
    description: c.description || '',
    duration: c.duration || '',
    eligibility: c.eligibility || '',
    image: c.image,
    universityName: c.university?.name || '',
    universityLogo: c.university?.logo || '',
  }));

  const categories = ['All', 'SSLC/Plus Two', 'UG', 'PG', 'Credit Transfer', 'Diploma'];

  categories.forEach(activeCategory => {
    const categoryMatches = (course) => {
      if (activeCategory === 'All') return true;
      if (activeCategory === 'UG') return (course.level === 'UG' || course.category === 'Online UG' || course.level === 'Undergraduate') && course.category !== 'SSLC' && course.category !== '+2' && course.level !== 'Secondary' && course.level !== 'Sr Secondary' && course.level !== 'Senior Secondary';
      if (activeCategory === 'PG') return course.level === 'PG' || course.category === 'Online PG' || course.level === 'Postgraduate';
      if (activeCategory === 'Credit Transfer') return (course.category || '').toLowerCase().includes('credit transfer') || course.type === 'Credit Transfer';
      if (activeCategory === 'SSLC/Plus Two') return course.category === 'SSLC' || course.category === '+2' || course.level === 'Secondary' || course.level === 'Sr Secondary' || course.level === 'Senior Secondary';
      if (activeCategory === 'Diploma') return (course.category === 'Diploma' || course.courseType === 'Others' || course.category === 'Others' || course.level === 'Diploma') && course.category !== 'SSLC' && course.category !== '+2' && course.level !== 'Secondary' && course.level !== 'Sr Secondary' && course.level !== 'Senior Secondary';
      return course.category === activeCategory;
    };

    const filtered = courses.filter(categoryMatches);
    console.log(`\nCategory: "${activeCategory}" matches ${filtered.length} courses:`);
    filtered.slice(0, 3).forEach(f => {
      console.log(`  - "${f.title}" (Category: "${f.category}", Level: "${f.level}", Uni: "${f.universityName}")`);
    });
    if (filtered.length > 3) {
      console.log(`  - ... and ${filtered.length - 3} more`);
    }
  });

  await mongoose.disconnect();
}
main();
