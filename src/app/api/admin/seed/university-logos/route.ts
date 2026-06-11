import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import UniversityLogo from '@/models/UniversityLogo';

export const dynamic = 'force-dynamic';

const LOGOS = [
  { name: 'Manipal University Jaipur',            logoUrl: '/university-logos/manipal-jaipur.svg',  order: 1 },
  { name: 'Jain University',                       logoUrl: '/university-logos/jain.svg',             order: 2 },
  { name: 'Sikkim Manipal University',             logoUrl: '/university-logos/smu.svg',              order: 3 },
  { name: 'Amrita Vishwa Vidyapeetham',            logoUrl: '/university-logos/amrita.svg',           order: 4 },
  { name: 'Amity University',                      logoUrl: '/university-logos/amity.svg',            order: 5 },
  { name: 'Andhra University',                     logoUrl: '/university-logos/andhra.svg',           order: 6 },
  { name: 'Aligarh Muslim University',             logoUrl: '/university-logos/amu.svg',              order: 7 },
  { name: 'Mizoram University',                    logoUrl: '/university-logos/mizoram.svg',          order: 8 },
  { name: 'GLA University',                        logoUrl: '/university-logos/gla.svg',              order: 9 },
  { name: 'Swami Vivekanand Subharti University',  logoUrl: '/university-logos/svsu.svg',             order: 10 },
  { name: 'Suresh Gyan Vihar University',          logoUrl: '/university-logos/sgvu.svg',             order: 11 },
  { name: 'Mangalayatan University',               logoUrl: '/university-logos/mangalayatan.svg',     order: 12 },
  { name: 'Manipal University',                    logoUrl: '/university-logos/manipal.svg',          order: 13 },
  { name: 'LPU',                                   logoUrl: '/university-logos/lpu.svg',              order: 14 },
  { name: 'Chandigarh University',                 logoUrl: '/university-logos/chandigarh.svg',       order: 15 },
  { name: 'IGNOU',                                 logoUrl: '/university-logos/ignou.svg',            order: 16 },
  { name: 'Symbiosis',                             logoUrl: '/university-logos/symbiosis.svg',        order: 17 },
  { name: 'Annamalai University',                  logoUrl: '/university-logos/annamalai.svg',        order: 18 },
  { name: 'Venkateshwara University',              logoUrl: '/university-logos/venkateshwara.svg',    order: 19 },
  { name: 'Karnataka State Open University',       logoUrl: '/university-logos/karnataka.svg',        order: 20 },
];

export async function GET() {
  try {
    await connectDB();

    const results = [];
    for (const logo of LOGOS) {
      const doc = await UniversityLogo.findOneAndUpdate(
        { name: logo.name },
        { $set: { logoUrl: logo.logoUrl, order: logo.order, isActive: true } },
        { upsert: true, new: true }
      );
      results.push({ name: logo.name, id: doc._id });
    }

    return NextResponse.json({
      success: true,
      message: `Seeded/updated ${results.length} university logos`,
      logos: results,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
