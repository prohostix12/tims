require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const Program = require('../src/models/Program').default;

async function list() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tims_db');
    const programs = await Program.find({}).lean();
    console.log('Programs count:', programs.length);
    programs.forEach(p => {
      console.log(p._id.toString(), p.name, p.slug);
    });
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

list();
