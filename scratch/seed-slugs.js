
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import connectDB from '../src/lib/db.ts';
import Program from '../src/models/Program.ts';
import University from '../src/models/University.ts';

async function seedSlugs() {
  await connectDB();
  
  // Find a default university
  let uni = await University.findOne({});
  if (!uni) {
    uni = await University.create({ name: 'TIMS Partner University', status: 'active' });
  }

  const mappings = [
    { name: /\bMBA\b/i, slug: 'mba' },
    { name: /\bMCA\b/i, slug: 'mca' },
    { name: /\bM\.?Com\b/i, slug: 'mcom' },
    { name: /\bBBA\b/i, slug: 'bba' },
    { name: /\bBCA\b/i, slug: 'bca' },
    { name: /\bB\.?Com\b/i, slug: 'bcom' },
    { name: /\bSSLC\b|\bPlus Two\b/i, slug: 'sslc-plus-two' },
    { name: /\bBA\b/i, slug: 'ba' },
    { name: /\bTech\b|\bEngineering\b/i, slug: 'engineering' },
  ];

  for (const m of mappings) {
    // 1. Try to find by slug first
    let progBySlug = await Program.findOne({ slug: m.slug });
    if (progBySlug) {
      console.log(`Slug ${m.slug} already exists for ${progBySlug.name}`);
      continue;
    }

    // 2. If not found by slug, find by name
    let progByName = await Program.findOne({ name: m.name });
    if (progByName) {
      progByName.slug = m.slug;
      await progByName.save();
      console.log(`Updated ${progByName.name} with slug ${m.slug}`);
    } else {
      // 3. Create placeholder
      await Program.create({
        name: m.slug.toUpperCase().replace('-', ' '),
        slug: m.slug,
        university: uni._id,
        category: 'Others',
        description: `Placeholder for ${m.slug.toUpperCase()}`
      });
      console.log(`Created placeholder for slug ${m.slug}`);
    }
  }

  process.exit(0);
}

seedSlugs();
