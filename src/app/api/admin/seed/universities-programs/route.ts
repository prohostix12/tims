import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import University from '@/models/University';
import Program from '@/models/Program';

export const dynamic = 'force-dynamic';

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/* ── Universities from edufolio.org ─────────────────────────────── */
const UNIVERSITIES = [
  {
    name: 'Manipal University Jaipur',
    code: 'MUJ',
    location: 'Jaipur, Rajasthan',
    establishedYear: 2011,
    ranking: 'A+',
    accreditations: 'NAAC A+',
    type: 'private' as const,
    status: 'active' as const,
    website: 'https://online.manipal.edu',
    description: 'Manipal University Jaipur offers UGC-DEB approved online programs in management, technology and commerce.',
  },
  {
    name: 'Jain University',
    code: 'JU',
    location: 'Bengaluru, Karnataka',
    establishedYear: 2008,
    ranking: 'A++',
    accreditations: 'NAAC A++',
    type: 'deemed' as const,
    status: 'active' as const,
    website: 'https://online.jainuniversity.ac.in',
    description: 'Jain (Deemed-to-be University) is a NAAC A++ accredited institution offering quality online education.',
  },
  {
    name: 'Swami Vivekanand Subharti University',
    code: 'SVSU',
    location: 'Meerut, Uttar Pradesh',
    establishedYear: 2008,
    ranking: 'A',
    accreditations: 'NAAC A',
    type: 'private' as const,
    status: 'active' as const,
    website: 'https://subhartionline.com',
    description: 'SVSU offers affordable online programs in arts, commerce and management across India.',
  },
  {
    name: 'Sikkim Manipal University',
    code: 'SMU',
    location: 'Majitar, Sikkim',
    establishedYear: 1995,
    ranking: 'A+',
    accreditations: 'NAAC A+',
    type: 'private' as const,
    status: 'active' as const,
    website: 'https://www.smu.edu.in',
    description: 'Sikkim Manipal University is a pioneer in distance and online education in India.',
  },
  {
    name: 'Amrita Vishwa Vidyapeetham',
    code: 'AMRITA',
    location: 'Ettimadai, Coimbatore',
    establishedYear: 2003,
    ranking: 'A++',
    accreditations: 'NAAC A++',
    type: 'deemed' as const,
    status: 'active' as const,
    website: 'https://www.amrita.edu',
    description: 'Amrita Vishwa Vidyapeetham is a NAAC A++ deemed university offering premium online programs.',
  },
  {
    name: 'Amity University',
    code: 'AMITY',
    location: 'Noida, Uttar Pradesh',
    establishedYear: 2005,
    ranking: 'A+',
    accreditations: 'NAAC A+',
    type: 'private' as const,
    status: 'active' as const,
    website: 'https://www.amityonline.com',
    description: 'Amity University offers industry-aligned online programs with TCS and HCLTech partnerships.',
  },
  {
    name: 'Aligarh Muslim University',
    code: 'AMU',
    location: 'Aligarh, Uttar Pradesh',
    establishedYear: 1920,
    ranking: 'A+',
    accreditations: 'NAAC A+',
    type: 'public' as const,
    status: 'active' as const,
    website: 'https://www.amu.ac.in',
    description: 'Aligarh Muslim University is a historic central university offering online programs with internship opportunities.',
  },
  {
    name: 'GLA University',
    code: 'GLA',
    location: 'Mathura, Uttar Pradesh',
    establishedYear: 2010,
    ranking: 'A+',
    accreditations: 'NAAC A+',
    type: 'private' as const,
    status: 'active' as const,
    website: 'https://www.gla.ac.in',
    description: 'GLA University offers UGC-approved online programs in technology, management and commerce.',
  },
  {
    name: 'Mizoram University',
    code: 'MZU',
    location: 'Aizawl, Mizoram',
    establishedYear: 2001,
    ranking: 'A+',
    accreditations: 'NAAC A+',
    type: 'public' as const,
    status: 'active' as const,
    website: 'https://www.mzu.edu.in',
    description: 'Mizoram University is a central university offering online programs in management and commerce.',
  },
  {
    name: 'Andhra University',
    code: 'AU',
    location: 'Visakhapatnam, Andhra Pradesh',
    establishedYear: 1926,
    ranking: 'A++',
    accreditations: 'NAAC A++',
    type: 'public' as const,
    status: 'active' as const,
    website: 'https://www.andhrauniversity.edu.in',
    description: 'Andhra University is one of the oldest universities in India offering online arts, commerce and management programs.',
  },
  {
    name: 'Suresh Gyan Vihar University',
    code: 'SGVU',
    location: 'Jaipur, Rajasthan',
    establishedYear: 2008,
    ranking: 'A+',
    accreditations: 'NAAC A+',
    type: 'private' as const,
    status: 'active' as const,
    website: 'https://www.sgvu.edu.in',
    description: 'Suresh Gyan Vihar University offers diverse online programs in technology, management and sciences.',
  },
  {
    name: 'Mangalayatan University',
    code: 'MGTN',
    location: 'Aligarh, Uttar Pradesh',
    establishedYear: 2006,
    ranking: 'A+',
    accreditations: 'NAAC A+',
    type: 'private' as const,
    status: 'active' as const,
    website: 'https://www.mangalayatan.in',
    description: 'Mangalayatan University offers affordable online programs across arts, management and technology streams.',
  },
];

/* ── Programs per university ─────────────────────────────────────── */
const PROGRAMS_BY_UNIVERSITY: Record<string, Array<{
  name: string; level: string; duration: string; fee: number;
  courseType: string; eligibility: string;
}>> = {
  MUJ: [
    // UG
    { name: 'BCA in Cloud Computing', level: 'UG', duration: '3 Years', fee: 135000, courseType: 'IT', eligibility: '10+2 from a recognised board' },
    { name: 'BCA in Cyber Security', level: 'UG', duration: '3 Years', fee: 135000, courseType: 'IT', eligibility: '10+2 from a recognised board' },
    { name: 'BCA in Data Science & Analytics', level: 'UG', duration: '3 Years', fee: 135000, courseType: 'IT', eligibility: '10+2 from a recognised board' },
    { name: 'BCA in Artificial Intelligence & Data Science', level: 'UG', duration: '3 Years', fee: 135000, courseType: 'IT', eligibility: '10+2 from a recognised board' },
    { name: 'BCom in Economics', level: 'UG', duration: '3 Years', fee: 99000, courseType: 'Commerce', eligibility: '10+2 from a recognised board' },
    { name: 'BCom in Accounting with AI', level: 'UG', duration: '3 Years', fee: 99000, courseType: 'Commerce', eligibility: '10+2 from a recognised board' },
    { name: 'BCom in Business Accounting & Taxation', level: 'UG', duration: '3 Years', fee: 99000, courseType: 'Commerce', eligibility: '10+2 from a recognised board' },
    { name: 'BCom in Financial Analytics', level: 'UG', duration: '3 Years', fee: 99000, courseType: 'Commerce', eligibility: '10+2 from a recognised board' },
    { name: 'BCom in Business Analytics', level: 'UG', duration: '3 Years', fee: 99000, courseType: 'Commerce', eligibility: '10+2 from a recognised board' },
    { name: 'BCom in Banking & FinTech', level: 'UG', duration: '3 Years', fee: 99000, courseType: 'Commerce', eligibility: '10+2 from a recognised board' },
    { name: 'BCom in E-Commerce', level: 'UG', duration: '3 Years', fee: 99000, courseType: 'Commerce', eligibility: '10+2 from a recognised board' },
    { name: 'BCom in Digital Marketing with AI', level: 'UG', duration: '3 Years', fee: 99000, courseType: 'Commerce', eligibility: '10+2 from a recognised board' },
    { name: 'BBA in Digital Marketing', level: 'UG', duration: '3 Years', fee: 135000, courseType: 'Management', eligibility: '10+2 from a recognised board' },
    { name: 'BBA in Retail & E-Commerce', level: 'UG', duration: '3 Years', fee: 135000, courseType: 'Management', eligibility: '10+2 from a recognised board' },
    { name: 'BBA in Data Analytics', level: 'UG', duration: '3 Years', fee: 135000, courseType: 'Management', eligibility: '10+2 from a recognised board' },
    { name: 'BBA in Entrepreneurship Management & Family Business', level: 'UG', duration: '3 Years', fee: 135000, courseType: 'Management', eligibility: '10+2 from a recognised board' },
    { name: 'BBA in Finance and Accounting', level: 'UG', duration: '3 Years', fee: 135000, courseType: 'Management', eligibility: '10+2 from a recognised board' },
    { name: 'BBA in Marketing', level: 'UG', duration: '3 Years', fee: 135000, courseType: 'Management', eligibility: '10+2 from a recognised board' },
    { name: 'BBA in Human Resource Management', level: 'UG', duration: '3 Years', fee: 135000, courseType: 'Management', eligibility: '10+2 from a recognised board' },
    // PG
    { name: 'Master of Commerce', level: 'PG', duration: '2 Years', fee: 108000, courseType: 'Commerce', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Economics', level: 'PG', duration: '2 Years', fee: 80000, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Journalism and Mass Communication', level: 'PG', duration: '2 Years', fee: 140000, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MCA in Comprehensive Emerging Technology', level: 'PG', duration: '2 Years', fee: 158000, courseType: 'IT', eligibility: 'Bachelor\'s degree with Mathematics' },
    { name: 'MCA in Cyber Security', level: 'PG', duration: '2 Years', fee: 158000, courseType: 'IT', eligibility: 'Bachelor\'s degree with Mathematics' },
    { name: 'MCA in Cloud Computing', level: 'PG', duration: '2 Years', fee: 158000, courseType: 'IT', eligibility: 'Bachelor\'s degree with Mathematics' },
    { name: 'MCA in Data Science', level: 'PG', duration: '2 Years', fee: 158000, courseType: 'IT', eligibility: 'Bachelor\'s degree with Mathematics' },
    { name: 'MCA in Artificial Intelligence & Machine Learning', level: 'PG', duration: '2 Years', fee: 158000, courseType: 'IT', eligibility: 'Bachelor\'s degree with Mathematics' },
    { name: 'MBA in Retail Management', level: 'PG', duration: '2 Years', fee: 175000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Supply Chain Management', level: 'PG', duration: '2 Years', fee: 175000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Project Management', level: 'PG', duration: '2 Years', fee: 175000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in International Business', level: 'PG', duration: '2 Years', fee: 175000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Operations Management', level: 'PG', duration: '2 Years', fee: 175000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in IT & FinTech', level: 'PG', duration: '2 Years', fee: 175000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Analytics & Data Science', level: 'PG', duration: '2 Years', fee: 175000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Marketing', level: 'PG', duration: '2 Years', fee: 175000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Digital Marketing', level: 'PG', duration: '2 Years', fee: 175000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Banking, Financial Services and Insurance', level: 'PG', duration: '2 Years', fee: 175000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Human Resource Management', level: 'PG', duration: '2 Years', fee: 175000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Finance', level: 'PG', duration: '2 Years', fee: 175000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Information System Management', level: 'PG', duration: '2 Years', fee: 175000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Healthcare Management', level: 'PG', duration: '2 Years', fee: 175000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
  ],
  JU: [
    { name: 'Bachelor of Computer Applications', level: 'UG', duration: '3 Years', fee: 74500, courseType: 'IT', eligibility: '10+2 from a recognised board' },
    { name: 'Bachelor of Commerce', level: 'UG', duration: '3 Years', fee: 66500, courseType: 'Commerce', eligibility: '10+2 from a recognised board' },
    { name: 'Bachelor of Business Administration', level: 'UG', duration: '3 Years', fee: 77000, courseType: 'Management', eligibility: '10+2 from a recognised board' },
    { name: 'Master of Computer Applications', level: 'PG', duration: '2 Years', fee: 70500, courseType: 'IT', eligibility: 'Bachelor\'s degree with Mathematics' },
    { name: 'Master of Commerce', level: 'PG', duration: '2 Years', fee: 39500, courseType: 'Commerce', eligibility: 'B.Com or equivalent' },
    { name: 'Master of Business Administration', level: 'PG', duration: '2 Years', fee: 100500, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'Master of Social Work', level: 'PG', duration: '2 Years', fee: 43500, courseType: 'Others', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Economics', level: 'PG', duration: '2 Years', fee: 39500, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
  ],
  SVSU: [
    { name: 'Bachelor of Commerce', level: 'UG', duration: '3 Years', fee: 55500, courseType: 'Commerce', eligibility: '10+2 from a recognised board' },
    { name: 'Bachelor of Business Administration', level: 'UG', duration: '3 Years', fee: 82500, courseType: 'Management', eligibility: '10+2 from a recognised board' },
    { name: 'BA in English', level: 'UG', duration: '3 Years', fee: 52500, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA in Economics', level: 'UG', duration: '3 Years', fee: 52500, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA in History', level: 'UG', duration: '3 Years', fee: 52500, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA in Political Science', level: 'UG', duration: '3 Years', fee: 67500, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'MA in English', level: 'PG', duration: '2 Years', fee: 46500, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Economics', level: 'PG', duration: '2 Years', fee: 46500, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in History', level: 'PG', duration: '2 Years', fee: 46500, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Political Science', level: 'PG', duration: '2 Years', fee: 57500, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA General', level: 'PG', duration: '2 Years', fee: 77500, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Marketing Management', level: 'PG', duration: '2 Years', fee: 77500, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Financial Management', level: 'PG', duration: '2 Years', fee: 77500, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Human Resource Management', level: 'PG', duration: '2 Years', fee: 77500, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'Master of Commerce', level: 'PG', duration: '2 Years', fee: 47500, courseType: 'Commerce', eligibility: 'B.Com or equivalent' },
    { name: 'Master of Library and Information Sciences', level: 'PG', duration: '2 Years', fee: 33500, courseType: 'Others', eligibility: 'Any Bachelor\'s degree' },
  ],
  SMU: [
    { name: 'Bachelor of Commerce', level: 'UG', duration: '3 Years', fee: 75000, courseType: 'Commerce', eligibility: '10+2 from a recognised board' },
    { name: 'BA in English', level: 'UG', duration: '3 Years', fee: 75000, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA in Sociology', level: 'UG', duration: '3 Years', fee: 75000, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA in Political Science', level: 'UG', duration: '3 Years', fee: 75000, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'MBA in Finance', level: 'PG', duration: '2 Years', fee: 110000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Marketing', level: 'PG', duration: '2 Years', fee: 110000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Human Resource Management', level: 'PG', duration: '2 Years', fee: 110000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Systems', level: 'PG', duration: '2 Years', fee: 110000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'Master of Computer Applications', level: 'PG', duration: '2 Years', fee: 98000, courseType: 'IT', eligibility: 'Bachelor\'s degree with Mathematics' },
    { name: 'Master of Commerce', level: 'PG', duration: '2 Years', fee: 75000, courseType: 'Commerce', eligibility: 'B.Com or equivalent' },
    { name: 'MA in English', level: 'PG', duration: '2 Years', fee: 75000, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Sociology', level: 'PG', duration: '2 Years', fee: 75000, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Political Science', level: 'PG', duration: '2 Years', fee: 75000, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
  ],
  AMRITA: [
    { name: 'BCA General', level: 'UG', duration: '3 Years', fee: 150500, courseType: 'IT', eligibility: '10+2 from a recognised board' },
    { name: 'BCA in Cyber Security', level: 'UG', duration: '3 Years', fee: 180500, courseType: 'IT', eligibility: '10+2 from a recognised board' },
    { name: 'BCA in Artificial Intelligence & Machine Learning', level: 'UG', duration: '3 Years', fee: 180500, courseType: 'IT', eligibility: '10+2 from a recognised board' },
    { name: 'BBA General', level: 'UG', duration: '3 Years', fee: 150500, courseType: 'Management', eligibility: '10+2 from a recognised board' },
    { name: 'Bachelor of Commerce', level: 'UG', duration: '3 Years', fee: 135500, courseType: 'Commerce', eligibility: '10+2 from a recognised board' },
    { name: 'MCA General', level: 'PG', duration: '2 Years', fee: 150500, courseType: 'IT', eligibility: 'Bachelor\'s degree with Mathematics' },
    { name: 'MCA in Cyber Security', level: 'PG', duration: '2 Years', fee: 205500, courseType: 'IT', eligibility: 'Bachelor\'s degree with Mathematics' },
    { name: 'MCA in Artificial Intelligence & Machine Learning', level: 'PG', duration: '2 Years', fee: 205500, courseType: 'IT', eligibility: 'Bachelor\'s degree with Mathematics' },
    { name: 'MBA in Finance', level: 'PG', duration: '2 Years', fee: 180500, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Marketing', level: 'PG', duration: '2 Years', fee: 180500, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Human Resource Management', level: 'PG', duration: '2 Years', fee: 180500, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Operations Management', level: 'PG', duration: '2 Years', fee: 270500, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
  ],
  AMITY: [
    { name: 'BCA General', level: 'UG', duration: '3 Years', fee: 132000, courseType: 'IT', eligibility: '10+2 from a recognised board' },
    { name: 'BCA in Cyber Security', level: 'UG', duration: '3 Years', fee: 198000, courseType: 'IT', eligibility: '10+2 from a recognised board' },
    { name: 'BCA in Artificial Intelligence & Data Science', level: 'UG', duration: '3 Years', fee: 198000, courseType: 'IT', eligibility: '10+2 from a recognised board' },
    { name: 'Bachelor of Commerce', level: 'UG', duration: '3 Years', fee: 87120, courseType: 'Commerce', eligibility: '10+2 from a recognised board' },
    { name: 'BCom in Digital Marketing with AI', level: 'UG', duration: '3 Years', fee: 220000, courseType: 'Commerce', eligibility: '10+2 from a recognised board' },
    { name: 'BBA General', level: 'UG', duration: '3 Years', fee: 145200, courseType: 'Management', eligibility: '10+2 from a recognised board' },
    { name: 'BBA E-Business', level: 'UG', duration: '3 Years', fee: 198000, courseType: 'Management', eligibility: '10+2 from a recognised board' },
    { name: 'BA in English', level: 'UG', duration: '3 Years', fee: 87120, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA in Political Science', level: 'UG', duration: '3 Years', fee: 87120, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA in Economics', level: 'UG', duration: '3 Years', fee: 149600, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA in Journalism and Mass Communication', level: 'UG', duration: '3 Years', fee: 149600, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'MSc in Data Science', level: 'PG', duration: '2 Years', fee: 230000, courseType: 'Science', eligibility: 'Bachelor\'s degree in Science/IT' },
    { name: 'MCA General', level: 'PG', duration: '2 Years', fee: 156400, courseType: 'IT', eligibility: 'Bachelor\'s degree with Mathematics' },
    { name: 'MCA TCS iON Machine Learning', level: 'PG', duration: '2 Years', fee: 230000, courseType: 'IT', eligibility: 'Bachelor\'s degree with Mathematics' },
    { name: 'MCA TCS iON AR/VR', level: 'PG', duration: '2 Years', fee: 230000, courseType: 'IT', eligibility: 'Bachelor\'s degree with Mathematics' },
    { name: 'MCA HCLTech Software Engineering', level: 'PG', duration: '2 Years', fee: 230000, courseType: 'IT', eligibility: 'Bachelor\'s degree with Mathematics' },
    { name: 'MCA HCLTech Cybersecurity', level: 'PG', duration: '2 Years', fee: 230000, courseType: 'IT', eligibility: 'Bachelor\'s degree with Mathematics' },
    { name: 'MCom in Financial Management', level: 'PG', duration: '2 Years', fee: 110400, courseType: 'Commerce', eligibility: 'B.Com or equivalent' },
    { name: 'MBA in Finance', level: 'PG', duration: '2 Years', fee: 183080, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Marketing', level: 'PG', duration: '2 Years', fee: 183080, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Human Resource Management', level: 'PG', duration: '2 Years', fee: 183080, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in International Business', level: 'PG', duration: '2 Years', fee: 275080, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA Dual Specialization', level: 'PG', duration: '2 Years', fee: 275080, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
  ],
  AMU: [
    { name: 'Bachelor of Commerce with Internship', level: 'UG', duration: '3 Years', fee: 52800, courseType: 'Commerce', eligibility: '10+2 from a recognised board' },
    { name: 'BA in Urdu with Internship', level: 'UG', duration: '3 Years', fee: 49800, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA in Political Science with Internship', level: 'UG', duration: '3 Years', fee: 49800, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA in History with Internship', level: 'UG', duration: '3 Years', fee: 49800, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA in Hindi with Internship', level: 'UG', duration: '3 Years', fee: 49800, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA in Economics with Internship', level: 'UG', duration: '3 Years', fee: 49800, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA in English with Internship', level: 'UG', duration: '3 Years', fee: 49800, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'MCom with Internship', level: 'PG', duration: '2 Years', fee: 39300, courseType: 'Commerce', eligibility: 'B.Com or equivalent' },
    { name: 'MA in Urdu with Internship', level: 'PG', duration: '2 Years', fee: 37300, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Political Science with Internship', level: 'PG', duration: '2 Years', fee: 37300, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in History with Internship', level: 'PG', duration: '2 Years', fee: 37300, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Hindi with Internship', level: 'PG', duration: '2 Years', fee: 37300, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Economics with Internship', level: 'PG', duration: '2 Years', fee: 37300, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in English with Internship', level: 'PG', duration: '2 Years', fee: 37300, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Journalism and Mass Communication', level: 'PG', duration: '2 Years', fee: 37300, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
  ],
  GLA: [
    { name: 'Bachelor of Computer Applications', level: 'UG', duration: '3 Years', fee: 99500, courseType: 'IT', eligibility: '10+2 from a recognised board' },
    { name: 'Bachelor of Commerce', level: 'UG', duration: '3 Years', fee: 71000, courseType: 'Commerce', eligibility: '10+2 from a recognised board' },
    { name: 'BBA in Marketing', level: 'UG', duration: '3 Years', fee: 99500, courseType: 'Management', eligibility: '10+2 from a recognised board' },
    { name: 'BBA in Finance and Accounting', level: 'UG', duration: '3 Years', fee: 99500, courseType: 'Management', eligibility: '10+2 from a recognised board' },
    { name: 'BBA in Human Resource Management', level: 'UG', duration: '3 Years', fee: 99500, courseType: 'Management', eligibility: '10+2 from a recognised board' },
    { name: 'Master of Computer Applications', level: 'PG', duration: '2 Years', fee: 94000, courseType: 'IT', eligibility: 'Bachelor\'s degree with Mathematics' },
    { name: 'MBA in Finance', level: 'PG', duration: '2 Years', fee: 105000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Marketing', level: 'PG', duration: '2 Years', fee: 105000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Human Resource Management', level: 'PG', duration: '2 Years', fee: 105000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in International Business', level: 'PG', duration: '2 Years', fee: 105000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Operations Management', level: 'PG', duration: '2 Years', fee: 105000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Supply Chain Management', level: 'PG', duration: '2 Years', fee: 105000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
  ],
  MZU: [
    { name: 'BBA E-Business', level: 'UG', duration: '3 Years', fee: 76860, courseType: 'Management', eligibility: '10+2 from a recognised board' },
    { name: 'BCom E-Commerce', level: 'UG', duration: '3 Years', fee: 67230, courseType: 'Commerce', eligibility: '10+2 from a recognised board' },
    { name: 'MBA General', level: 'PG', duration: '2 Years', fee: 66050, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Marketing Management', level: 'PG', duration: '2 Years', fee: 68690, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Financial Management', level: 'PG', duration: '2 Years', fee: 68690, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Human Resource Management', level: 'PG', duration: '2 Years', fee: 66050, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'Master of Commerce', level: 'PG', duration: '2 Years', fee: 56090, courseType: 'Commerce', eligibility: 'B.Com or equivalent' },
  ],
  AU: [
    { name: 'Bachelor of Commerce', level: 'UG', duration: '3 Years', fee: 43750, courseType: 'Commerce', eligibility: '10+2 from a recognised board' },
    { name: 'BCom in E-Accounting', level: 'UG', duration: '3 Years', fee: 67000, courseType: 'Commerce', eligibility: '10+2 from a recognised board' },
    { name: 'BA in Economics', level: 'UG', duration: '3 Years', fee: 43750, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA in History', level: 'UG', duration: '3 Years', fee: 43750, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA in Politics', level: 'UG', duration: '3 Years', fee: 43750, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'MA in Economics', level: 'PG', duration: '2 Years', fee: 33700, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in English', level: 'PG', duration: '2 Years', fee: 33700, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Political Science', level: 'PG', duration: '2 Years', fee: 33700, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Journalism and Mass Communication', level: 'PG', duration: '2 Years', fee: 40100, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Human Resource Management', level: 'PG', duration: '2 Years', fee: 40100, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'Master of Commerce', level: 'PG', duration: '2 Years', fee: 33700, courseType: 'Commerce', eligibility: 'B.Com or equivalent' },
  ],
  SGVU: [
    { name: 'Bachelor of Computer Applications', level: 'UG', duration: '3 Years', fee: 90000, courseType: 'IT', eligibility: '10+2 from a recognised board' },
    { name: 'Bachelor of Library and Information Science', level: 'UG', duration: '3 Years', fee: 60000, courseType: 'Others', eligibility: '10+2 from a recognised board' },
    { name: 'Bachelor of Business Administration', level: 'UG', duration: '3 Years', fee: 90000, courseType: 'Management', eligibility: '10+2 from a recognised board' },
    { name: 'Bachelor of Commerce', level: 'UG', duration: '3 Years', fee: 72000, courseType: 'Commerce', eligibility: '10+2 from a recognised board' },
    { name: 'BA in Journalism and Mass Communication', level: 'UG', duration: '3 Years', fee: 84000, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA Triple Main', level: 'UG', duration: '3 Years', fee: 65000, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'Master of Computer Applications', level: 'PG', duration: '2 Years', fee: 80000, courseType: 'IT', eligibility: 'Bachelor\'s degree with Mathematics' },
    { name: 'MBA General', level: 'PG', duration: '2 Years', fee: 80000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA Professional', level: 'PG', duration: '2 Years', fee: 80000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MSc in Mathematics', level: 'PG', duration: '2 Years', fee: 60000, courseType: 'Science', eligibility: 'Bachelor\'s degree in Science/Maths' },
    { name: 'MA in Economics', level: 'PG', duration: '2 Years', fee: 44000, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'Master of Commerce', level: 'PG', duration: '2 Years', fee: 48000, courseType: 'Commerce', eligibility: 'B.Com or equivalent' },
  ],
  MGTN: [
    { name: 'Bachelor of Computer Applications', level: 'UG', duration: '3 Years', fee: 85000, courseType: 'IT', eligibility: '10+2 from a recognised board' },
    { name: 'Bachelor of Business Administration', level: 'UG', duration: '3 Years', fee: 79000, courseType: 'Management', eligibility: '10+2 from a recognised board' },
    { name: 'BA in Hindi', level: 'UG', duration: '3 Years', fee: 49000, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA in Maths', level: 'UG', duration: '3 Years', fee: 49000, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA in Home Science', level: 'UG', duration: '3 Years', fee: 49000, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA in Political Science', level: 'UG', duration: '3 Years', fee: 49000, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA in Public Administration', level: 'UG', duration: '3 Years', fee: 49000, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'BA in Education', level: 'UG', duration: '3 Years', fee: 49000, courseType: 'Arts', eligibility: '10+2 from a recognised board' },
    { name: 'MSc in Maths', level: 'PG', duration: '2 Years', fee: 65000, courseType: 'Science', eligibility: 'Bachelor\'s degree in Science/Maths' },
    { name: 'Master of Computer Applications', level: 'PG', duration: '2 Years', fee: 77000, courseType: 'IT', eligibility: 'Bachelor\'s degree with Mathematics' },
    { name: 'Master of Commerce', level: 'PG', duration: '2 Years', fee: 51000, courseType: 'Commerce', eligibility: 'B.Com or equivalent' },
    { name: 'MBA in Finance', level: 'PG', duration: '2 Years', fee: 77000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Marketing', level: 'PG', duration: '2 Years', fee: 77000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA in Human Resource Management', level: 'PG', duration: '2 Years', fee: 77000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MBA General', level: 'PG', duration: '2 Years', fee: 77000, courseType: 'Management', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Hindi', level: 'PG', duration: '2 Years', fee: 47000, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in History', level: 'PG', duration: '2 Years', fee: 47000, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Sociology', level: 'PG', duration: '2 Years', fee: 47000, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Maths', level: 'PG', duration: '2 Years', fee: 47000, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Political Science', level: 'PG', duration: '2 Years', fee: 47000, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Home Science', level: 'PG', duration: '2 Years', fee: 47000, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Public Administration', level: 'PG', duration: '2 Years', fee: 47000, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Education', level: 'PG', duration: '2 Years', fee: 47000, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Buddhist Studies', level: 'PG', duration: '2 Years', fee: 47000, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
    { name: 'MA in Economics', level: 'PG', duration: '2 Years', fee: 47000, courseType: 'Arts', eligibility: 'Any Bachelor\'s degree' },
  ],
};

/* ── Credit Transfer Programs ────────────────────────────────────── */
const CREDIT_TRANSFER_PROGRAMS: Array<{
  universityCode: string;
  name: string; duration: string; fee: number; courseType: string; eligibility: string;
}> = [
  // Manipal University Jaipur
  { universityCode: 'MUJ', name: 'B.Tech Lateral Entry (Civil Engineering)', duration: '2 Years', fee: 175000, courseType: 'Science', eligibility: 'Diploma in Engineering (3 years)' },
  { universityCode: 'MUJ', name: 'B.Tech Lateral Entry (Computer Science)', duration: '2 Years', fee: 175000, courseType: 'IT', eligibility: 'Diploma in Engineering (3 years)' },
  { universityCode: 'MUJ', name: 'BCA Lateral Entry', duration: '2 Years', fee: 115000, courseType: 'IT', eligibility: 'Diploma in Computer Science / BCA 1st year completed' },
  { universityCode: 'MUJ', name: 'BBA Lateral Entry', duration: '2 Years', fee: 115000, courseType: 'Management', eligibility: 'Diploma in Business Management' },
  { universityCode: 'MUJ', name: 'B.Com Lateral Entry', duration: '2 Years', fee: 99000, courseType: 'Commerce', eligibility: 'Diploma in Commerce or 1 year B.Com completed' },

  // Jain University
  { universityCode: 'JU', name: 'BCA Lateral Entry', duration: '2 Years', fee: 65000, courseType: 'IT', eligibility: 'Diploma in Computer Science / 1 year BCA completed' },
  { universityCode: 'JU', name: 'BBA Lateral Entry', duration: '2 Years', fee: 65000, courseType: 'Management', eligibility: 'Diploma in Business / 1 year BBA completed' },
  { universityCode: 'JU', name: 'B.Com Lateral Entry', duration: '2 Years', fee: 58000, courseType: 'Commerce', eligibility: 'Diploma in Commerce / 1 year B.Com completed' },
  { universityCode: 'JU', name: 'MBA (Working Professionals)', duration: '2 Years', fee: 95000, courseType: 'Management', eligibility: 'Bachelor\'s degree with 2+ years work experience' },

  // Amity University
  { universityCode: 'AMITY', name: 'B.Tech Lateral Entry (Computer Science)', duration: '2 Years', fee: 198000, courseType: 'IT', eligibility: 'Diploma in Engineering (3 years)' },
  { universityCode: 'AMITY', name: 'BCA Lateral Entry', duration: '2 Years', fee: 150000, courseType: 'IT', eligibility: 'Diploma in Computer Science / 1 year BCA completed' },
  { universityCode: 'AMITY', name: 'BBA Lateral Entry', duration: '2 Years', fee: 155000, courseType: 'Management', eligibility: 'Diploma in Business / 1 year BBA completed' },
  { universityCode: 'AMITY', name: 'MBA (Credit Transfer — International)', duration: '2 Years', fee: 250000, courseType: 'Management', eligibility: 'Bachelor\'s degree with credits from a recognised institution' },

  // GLA University
  { universityCode: 'GLA', name: 'BCA Lateral Entry', duration: '2 Years', fee: 85000, courseType: 'IT', eligibility: 'Diploma in Computer Science / 1 year BCA completed' },
  { universityCode: 'GLA', name: 'B.Com Lateral Entry', duration: '2 Years', fee: 60000, courseType: 'Commerce', eligibility: 'Diploma in Commerce / 1 year B.Com completed' },
  { universityCode: 'GLA', name: 'BBA Lateral Entry', duration: '2 Years', fee: 85000, courseType: 'Management', eligibility: 'Diploma in Business / 1 year BBA completed' },

  // SVSU
  { universityCode: 'SVSU', name: 'BBA Lateral Entry', duration: '2 Years', fee: 70000, courseType: 'Management', eligibility: 'Diploma in Business / 1 year BBA completed' },
  { universityCode: 'SVSU', name: 'B.Com Lateral Entry', duration: '2 Years', fee: 48000, courseType: 'Commerce', eligibility: 'Diploma in Commerce / 1 year B.Com completed' },
  { universityCode: 'SVSU', name: 'MBA (Credit Transfer)', duration: '2 Years', fee: 72000, courseType: 'Management', eligibility: 'Bachelor\'s degree with credits from a recognised institution' },

  // Andhra University
  { universityCode: 'AU', name: 'B.Com Lateral Entry', duration: '2 Years', fee: 38000, courseType: 'Commerce', eligibility: 'Diploma in Commerce / 1 year B.Com completed' },
  { universityCode: 'AU', name: 'BBA Lateral Entry', duration: '2 Years', fee: 38000, courseType: 'Management', eligibility: 'Diploma in Business / 1 year BBA completed' },

  // SGVU
  { universityCode: 'SGVU', name: 'BCA Lateral Entry', duration: '2 Years', fee: 78000, courseType: 'IT', eligibility: 'Diploma in Computer Science / 1 year BCA completed' },
  { universityCode: 'SGVU', name: 'B.Com Lateral Entry', duration: '2 Years', fee: 60000, courseType: 'Commerce', eligibility: 'Diploma in Commerce / 1 year B.Com completed' },
  { universityCode: 'SGVU', name: 'MBA (Credit Transfer)', duration: '2 Years', fee: 75000, courseType: 'Management', eligibility: 'Bachelor\'s degree with credits from a recognised institution' },

  // Amrita
  { universityCode: 'AMRITA', name: 'BCA Lateral Entry', duration: '2 Years', fee: 130000, courseType: 'IT', eligibility: 'Diploma in Computer Science / 1 year BCA completed' },
  { universityCode: 'AMRITA', name: 'MBA (Credit Transfer)', duration: '2 Years', fee: 170000, courseType: 'Management', eligibility: 'Bachelor\'s degree with credits from a recognised institution' },

  // Mangalayatan
  { universityCode: 'MGTN', name: 'BCA Lateral Entry', duration: '2 Years', fee: 72000, courseType: 'IT', eligibility: 'Diploma in Computer Science / 1 year BCA completed' },
  { universityCode: 'MGTN', name: 'B.Com Lateral Entry', duration: '2 Years', fee: 44000, courseType: 'Commerce', eligibility: 'Diploma in Commerce / 1 year B.Com completed' },
  { universityCode: 'MGTN', name: 'MBA (Credit Transfer)', duration: '2 Years', fee: 72000, courseType: 'Management', eligibility: 'Bachelor\'s degree with credits from a recognised institution' },
];

export async function GET() {
  try {
    await connectDB();

    const summary: Record<string, { university: string; created: boolean; programs: number }> = {};

    for (const uniData of UNIVERSITIES) {
      // Upsert university by code
      const university = await University.findOneAndUpdate(
        { code: uniData.code },
        { $setOnInsert: uniData },
        { upsert: true, new: true }
      );

      const programs = PROGRAMS_BY_UNIVERSITY[uniData.code] || [];
      let programsInserted = 0;

      for (const p of programs) {
        const slug = `${slugify(uniData.code)}-${slugify(p.name)}`;
        const category = p.level === 'UG' ? 'Online UG' : 'Online PG';

        await Program.findOneAndUpdate(
          { slug },
          {
            $setOnInsert: {
              name: p.name,
              university: university._id,
              slug,
              duration: p.duration,
              type: 'Online',
              category,
              level: p.level,
              eligibility: p.eligibility,
              courseType: p.courseType,
              fee: p.fee,
            },
          },
          { upsert: true, new: true }
        );
        programsInserted++;
      }

      summary[uniData.code] = {
        university: uniData.name,
        created: true,
        programs: programsInserted,
      };
    }

    // Seed Credit Transfer programs
    let ctInserted = 0;
    for (const p of CREDIT_TRANSFER_PROGRAMS) {
      const university = await University.findOne({ code: p.universityCode });
      if (!university) continue;
      const slug = `${slugify(p.universityCode)}-ct-${slugify(p.name)}`;
      await Program.findOneAndUpdate(
        { slug },
        {
          $setOnInsert: {
            name: p.name,
            university: university._id,
            slug,
            duration: p.duration,
            type: 'Online',
            category: 'Credit Transfer',
            level: 'UG',
            eligibility: p.eligibility,
            courseType: p.courseType,
            fee: p.fee,
          },
        },
        { upsert: true, new: true }
      );
      ctInserted++;
    }

    const totalPrograms = Object.values(summary).reduce((sum, s) => sum + s.programs, 0) + ctInserted;

    return NextResponse.json({
      success: true,
      message: `Seeded ${UNIVERSITIES.length} universities, ${totalPrograms - ctInserted} regular programs, and ${ctInserted} Credit Transfer programs`,
      summary,
      creditTransfer: ctInserted,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
