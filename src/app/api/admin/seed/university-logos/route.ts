import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import UniversityLogo from '@/models/UniversityLogo';

export const dynamic = 'force-dynamic';

const LOGOS = [
  {
    name: 'Manipal University Jaipur',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Manipal_Academy_of_Higher_Education_logo.svg/320px-Manipal_Academy_of_Higher_Education_logo.svg.png',
    order: 1,
  },
  {
    name: 'Jain University',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Jain_University_logo.png/320px-Jain_University_logo.png',
    order: 2,
  },
  {
    name: 'Sikkim Manipal University',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/Sikkim_Manipal_University_logo.png/240px-Sikkim_Manipal_University_logo.png',
    order: 3,
  },
  {
    name: 'Amrita Vishwa Vidyapeetham',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Amrita_logo.svg/320px-Amrita_logo.svg.png',
    order: 4,
  },
  {
    name: 'Amity University',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Amity_University_logo.svg/320px-Amity_University_logo.svg.png',
    order: 5,
  },
  {
    name: 'Andhra University',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/Andhra_University_logo.png/240px-Andhra_University_logo.png',
    order: 6,
  },
  {
    name: 'Aligarh Muslim University',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Aligarh_Muslim_University_crest.svg/200px-Aligarh_Muslim_University_crest.svg.png',
    order: 7,
  },
  {
    name: 'Mizoram University',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/MZU_logo.png/200px-MZU_logo.png',
    order: 8,
  },
  {
    name: 'GLA University',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/77/GLA_University_Logo.jpg/200px-GLA_University_Logo.jpg',
    order: 9,
  },
  {
    name: 'Swami Vivekanand Subharti University',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Subharti_University_logo.png/200px-Subharti_University_logo.png',
    order: 10,
  },
  {
    name: 'Suresh Gyan Vihar University',
    logoUrl: 'https://ui-avatars.com/api/?name=SGVU&background=006400&color=fff&size=256&bold=true&format=png',
    order: 11,
  },
  {
    name: 'Mangalayatan University',
    logoUrl: 'https://ui-avatars.com/api/?name=Mangalayatan&background=8B1A1A&color=fff&size=256&bold=true&format=png',
    order: 12,
  },
];

export async function GET() {
  try {
    await connectDB();

    const results = [];
    for (const logo of LOGOS) {
      const doc = await UniversityLogo.findOneAndUpdate(
        { name: logo.name },
        { $setOnInsert: { ...logo, isActive: true } },
        { upsert: true, new: true }
      );
      results.push({ name: logo.name, id: doc._id });
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${results.length} university logos`,
      logos: results,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
