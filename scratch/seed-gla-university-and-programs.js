// seed-gla-university-and-programs.js
// Run with: node scratch/seed-gla-university-and-programs.js

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tims_db';

// University schema (simplified)
const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: String,
  location: String,
  establishedYear: Number,
  status: { type: String, enum: ['active', 'pending', 'inactive'], default: 'active' },
  website: String,
  image: String,
  logo: String,
  ranking: String,
  accreditations: String,
  features: [String],
  facilities: [String],
  type: { type: String, enum: ['public', 'private', 'deemed', 'state'], default: 'private' },
  contactEmail: String,
}, { timestamps: true });

const University = mongoose.models.University || mongoose.model('University', universitySchema);

// Program schema (simplified)
const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
  slug: { type: String, unique: true, sparse: true },
  category: { type: String, required: true },
  courseType: { type: String },
  highlights: { type: [String], default: [] },
  curriculum: { type: [String], default: [] },
  fee: { type: Number, default: 0 },
}, { timestamps: true });

const Program = mongoose.models.Program || mongoose.model('Program', programSchema);

function slugify(str) {
  return str.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-');
}

async function seed() {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');

    // Upsert GLA University
    const glaData = {
      name: 'GLA University',
      code: 'GLA',
      description: 'GLA University is a private university offering a variety of undergraduate and postgraduate programs.',
      location: 'Mathura, Uttar Pradesh, India',
      establishedYear: 2010,
      status: 'active',
      website: 'https://www.gla.ac.in',
      image: '/images/universities/gla.png',
      logo: '/images/universities/gla-logo.png',
      ranking: 'Top 100 in India',
      accreditations: 'UGC, NAAC',
      features: ['Industry oriented', 'Research focus', 'International collaborations'],
      facilities: ['Library', 'Hostel', 'Sports Complex', 'Labs'],
      type: 'private',
      contactEmail: 'info@gla.ac.in'
    };
    const university = await University.findOneAndUpdate({ code: glaData.code }, glaData, { upsert: true, new: true, setDefaultsOnInsert: true });
    console.log('University upserted with _id:', university._id.toString());

    const programs = [
      { name: 'B.Com', category: 'Commerce', courseType: 'Commerce' },
      { name: 'BBA', category: 'Management', courseType: 'Management' },
      { name: 'BCA', category: 'IT', courseType: 'IT' },
      { name: 'MBA', category: 'Management', courseType: 'Management' },
      { name: 'MCA', category: 'IT', courseType: 'IT' }
    ];

    for (const prog of programs) {
      const progData = {
        name: prog.name,
        university: university._id,
        slug: slugify(prog.name),
        category: prog.category,
        courseType: prog.courseType,
        heroTitle: `${prog.name} - Empower Your Future`,
        intro: `Explore the ${prog.name} program at GLA University, designed to provide comprehensive knowledge and skills.`,
        specializations: [
          {
            id: 'spec1',
            title: `${prog.name} Core`,
            description: `Fundamental topics of ${prog.name}`,
            jobs: ['Job A', 'Job B']
          },
          {
            id: 'spec2',
            title: `${prog.name} Advanced`,
            description: `Advanced topics and electives for ${prog.name}`,
            jobs: ['Job C', 'Job D']
          }
        ],
        highlights: [],
        curriculum: [],
        fee: 0
      };
      await Program.findOneAndUpdate({ name: prog.name, university: university._id }, progData, { upsert: true, new: true, setDefaultsOnInsert: true });
      console.log('Program upserted:', prog.name);
    }

    console.log('Seeding complete');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
