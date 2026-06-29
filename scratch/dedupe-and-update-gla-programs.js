const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const oldId = '69e8988ffe26fed3dd708955';
const newId = '6a2a40569fe8033bc4523ea2';

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  
  console.log('--- Database Migration: GLA University Duplicates ---');
  
  // 1. Fetch programs
  const oldProgs = await db.collection('programs').find({ university: new mongoose.Types.ObjectId(oldId) }).toArray();
  const newProgs = await db.collection('programs').find({ university: new mongoose.Types.ObjectId(newId) }).toArray();
  
  console.log(`Old GLA Programs count: ${oldProgs.length}`);
  console.log(`New GLA Programs count: ${newProgs.length}`);
  
  let deletedCount = 0;
  let updatedCount = 0;
  
  for (const op of oldProgs) {
    // Normalise name to find duplicates (remove "in", space, special characters)
    const normOldName = op.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const isDuplicate = newProgs.some(np => {
      const normNewName = np.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      // Matches if name is extremely close or identical, and category/fee matches
      const nameMatch = normOldName === normNewName || 
                        normOldName.includes(normNewName) || 
                        normNewName.includes(normOldName) ||
                        (op.category === np.category && op.fee === np.fee && 
                         (op.name.includes('BCA') && np.name.includes('BCA') || 
                          op.name.includes('MCA') && np.name.includes('MCA') ||
                          op.name.includes('B.Com') && np.name.includes('Commerce') ||
                          op.name.includes('Commerce') && np.name.includes('B.Com')));
      return nameMatch && op.category === np.category;
    });
    
    if (isDuplicate) {
      console.log(`- Deleting duplicate program: "${op.name}" (fee: ${op.fee})`);
      await db.collection('programs').deleteOne({ _id: op._id });
      deletedCount++;
    } else {
      console.log(`- Updating unique program: "${op.name}" (fee: ${op.fee}) to refer to new university ID`);
      await db.collection('programs').updateOne(
        { _id: op._id },
        { $set: { university: new mongoose.Types.ObjectId(newId) } }
      );
      updatedCount++;
    }
  }
  
  console.log(`\nMigration Summary:`);
  console.log(`- Programs deleted (duplicates): ${deletedCount}`);
  console.log(`- Programs updated (unique, re-associated): ${updatedCount}`);
  
  // 2. Delete the old GLA University record
  const deleteUniRes = await db.collection('universities').deleteOne({ _id: new mongoose.Types.ObjectId(oldId) });
  console.log(`\n- Deleted duplicate GLA University document:`, deleteUniRes);
  
  process.exit(0);
}

run().catch(console.error);
