import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load from .env.local first, then .env
dotenv.config({ path: path.join(__dirname, '.env.local') });
dotenv.config({ path: path.join(__dirname, '.env') });

// Define the UniversityLogo model inline
const UniversityLogoSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  logoUrl: { type: String, required: true, trim: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const UniversityLogo = mongoose.models.UniversityLogo || 
  mongoose.model('UniversityLogo', UniversityLogoSchema);

const DEFAULT_LOGOS = [
  { name: 'Amity University',          logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Amity_University_logo.svg/320px-Amity_University_logo.svg.png' },
  { name: 'Manipal University',        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Manipal_Academy_of_Higher_Education_logo.svg/320px-Manipal_Academy_of_Higher_Education_logo.svg.png' },
  { name: 'LPU',                       logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Lovely_Professional_University_logo.png/320px-Lovely_Professional_University_logo.png' },
  { name: 'Jain University',           logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Jain_University_logo.png/320px-Jain_University_logo.png' },
  { name: 'Chandigarh University',     logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Chandigarh_University_logo.png/320px-Chandigarh_University_logo.png' },
  { name: 'IGNOU',                     logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/25/Indira_Gandhi_National_Open_University_logo.png/240px-Indira_Gandhi_National_Open_University_logo.png' },
  { name: 'Symbiosis',                 logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Symbiosis_International_University_logo.png/320px-Symbiosis_International_University_logo.png' },
  { name: 'Annamalai University',      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Annamalai_University_logo.png/240px-Annamalai_University_logo.png' },
  { name: 'Andhra University',         logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/Andhra_University_logo.png/240px-Andhra_University_logo.png' },
  { name: 'Sikkim Manipal University', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/Sikkim_Manipal_University_logo.png/240px-Sikkim_Manipal_University_logo.png' },
  { name: 'Venkateshwara',             logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Sri_Venkateshwara_University_logo.png/240px-Sri_Venkateshwara_University_logo.png' },
  { name: 'Karnataka State',           logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Karnataka_State_Open_University_logo.png/240px-Karnataka_State_Open_University_logo.png' },
];

async function recoverLogos() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // First, check what's currently in the database
    const currentLogos = await UniversityLogo.find({});
    console.log(`📊 Current logos in database: ${currentLogos.length}`);
    
    if (currentLogos.length > 0) {
      console.log('\nCurrent logo records:');
      currentLogos.forEach((logo, i) => {
        console.log(`  ${i + 1}. ${logo.name}`);
        console.log(`     URL: ${logo.logoUrl ? (logo.logoUrl.substring(0, 50) + '...') : 'MISSING'}`);
        console.log(`     Order: ${logo.order}, Active: ${logo.isActive}`);
      });
    }

    // Check for logos without URLs
    const missingUrls = await UniversityLogo.find({ logoUrl: { $in: ['', null, undefined] } });
    if (missingUrls.length > 0) {
      console.log(`\n⚠️  Found ${missingUrls.length} logos with missing URLs!`);
      
      // Fix them by using default URLs
      for (const logo of missingUrls) {
        const defaultLogo = DEFAULT_LOGOS.find(d => d.name.toLowerCase() === logo.name.toLowerCase());
        if (defaultLogo) {
          await UniversityLogo.findByIdAndUpdate(logo._id, { logoUrl: defaultLogo.logoUrl });
          console.log(`  ✅ Fixed: ${logo.name}`);
        }
      }
    }

    // Clear all logos and reload with defaults
    const shouldReload = process.argv.includes('--reload');
    if (shouldReload) {
      console.log('\n🗑️  Clearing all logos...');
      await UniversityLogo.deleteMany({});
      
      console.log('📥 Restoring default logos...');
      const inserted = await UniversityLogo.insertMany(
        DEFAULT_LOGOS.map((logo, i) => ({
          ...logo,
          order: i + 1,
          isActive: true,
        }))
      );
      console.log(`✅ Restored ${inserted.length} default logos`);
    } else {
      console.log('\n💡 To reload all default logos, run:');
      console.log('   node recover-logos.mjs --reload');
    }

    // Show final status
    const finalCount = await UniversityLogo.countDocuments({});
    const activeCount = await UniversityLogo.countDocuments({ isActive: true });
    console.log(`\n📊 Final status:`);
    console.log(`   Total logos: ${finalCount}`);
    console.log(`   Active logos: ${activeCount}`);
    console.log(`   Inactive logos: ${finalCount - activeCount}`);

    const finalLogos = await UniversityLogo.find({}).sort({ order: 1 });
    console.log('\n✅ Logo URLs are now:');
    finalLogos.forEach((logo, i) => {
      console.log(`  ${i + 1}. ${logo.name} (${logo.isActive ? 'Visible' : 'Hidden'})`);
      if (logo.logoUrl) {
        console.log(`     ✓ URL: ${logo.logoUrl.substring(0, 60)}...`);
      } else {
        console.log(`     ✗ URL: MISSING`);
      }
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

recoverLogos();
