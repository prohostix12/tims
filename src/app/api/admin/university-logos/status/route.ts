import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import UniversityLogo from '@/models/UniversityLogo';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    
    // Get all logos
    const allLogos = await UniversityLogo.find({}).sort({ order: 1 });
    const activeLogos = await UniversityLogo.find({ isActive: true }).sort({ order: 1 });
    const inactiveLogos = await UniversityLogo.find({ isActive: false }).sort({ order: 1 });
    
    // Check for missing URLs
    const missingUrls = allLogos.filter(logo => !logo.logoUrl || logo.logoUrl.trim() === '');
    
    return NextResponse.json({
      status: 'ok',
      total: allLogos.length,
      active: activeLogos.length,
      inactive: inactiveLogos.length,
      missingUrls: missingUrls.length,
      logos: allLogos.map(logo => ({
        _id: logo._id,
        name: logo.name,
        logoUrl: logo.logoUrl ? logo.logoUrl.substring(0, 80) + '...' : 'MISSING',
        order: logo.order,
        isActive: logo.isActive,
        hasUrl: !!logo.logoUrl && logo.logoUrl.trim() !== '',
      })),
      summary: {
        allRecords: allLogos.map(l => l.name),
        activeRecords: activeLogos.map(l => l.name),
        missingUrlRecords: missingUrls.map(l => l.name),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 'error' }, { status: 500 });
  }
}
