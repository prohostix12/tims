// clear-programs.js
// Run with: node scratch/clear-programs.js
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tims_db';

async function clear() {
  try {
    await mongoose.connect(uri);
    const result = await mongoose.connection.db.collection('programs').deleteMany({});
    console.log('Deleted programs count:', result.deletedCount);
  } catch (err) {
    console.error('Error clearing programs:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

clear();
