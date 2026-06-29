const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const logoUrl = 'https://www.gku.ac.in/public/frontend/images/logo.webp';
const imageUrl = 'https://www.gku.ac.in/public/frontend/images/home_bout_campus.webp';
const gkuId = '69e8988ffe26fed3dd708951';

async function updateDB(dbName) {
  const baseUri = process.env.MONGODB_URI;
  let uri = baseUri;
  if (dbName === 'tims_education') {
    uri = baseUri.replace('/tims?', '/tims_education?');
  }
  
  console.log(`\nConnecting to ${dbName}...`);
  const conn = await mongoose.createConnection(uri).asPromise();
  console.log(`Connected to ${dbName}`);
  
  const res = await conn.db.collection('universities').updateOne(
    { _id: new mongoose.Types.ObjectId(gkuId) },
    {
      $set: {
        logo: logoUrl,
        image: imageUrl
      }
    }
  );
  
  console.log(`Update result for ${dbName}:`, res);
  await conn.close();
}

async function run() {
  await updateDB('tims');
  await updateDB('tims_education');
  console.log('\nAll databases updated successfully!');
  process.exit(0);
}

run().catch(console.error);
