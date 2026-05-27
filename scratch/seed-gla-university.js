import connectDB from '@/lib/db';
import University from '@/models/University';

async function seedUniversity() {
  try {
    await connectDB();
    const existing = await University.findOne({ name: 'GLA University' });
    if (existing) {
      console.log('GLA University already exists with _id:', existing._id);
      process.exit(0);
    }
    const gla = new University({
      name: 'GLA University',
      code: 'GLA001',
      description: 'GLA University is a premier private institution offering a wide range of programs.',
      location: 'Mathura, Uttar Pradesh, India',
      establishedYear: 2006,
      status: 'active',
      website: 'https://www.gla.ac.in',
      image: '/images/universities/gla.jpg',
      logo: '/images/universities/gla-logo.png',
      ranking: 'Top 50 Private Universities in India',
      accreditations: 'UGC, NAAC A++',
      features: ['Modern Campus', 'Industry Partnerships', 'Research Opportunities'],
      facilities: ['Hostel', 'Library', 'Sports Complex'],
      type: 'private',
      contactEmail: 'info@gla.ac.in'
    });
    await gla.save();
    console.log('GLA University added with _id:', gla._id);
  } catch (err) {
    console.error('Error seeding GLA University:', err);
  } finally {
    process.exit();
  }
}

seedUniversity();
