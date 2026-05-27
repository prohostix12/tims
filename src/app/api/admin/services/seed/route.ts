import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Service from '@/models/Service';

const DEFAULT_SERVICES = [
  {
    title: 'Online UG Programs',
    description: 'Earn a recognized undergraduate degree from top UGC-approved universities — entirely online. Our Online UG programs include BA, B.Com, BBA, BCA, and B.Sc, designed for students who want flexibility without compromising on quality. Study at your own pace with digital learning resources, live sessions, and dedicated mentor support.',
    icon: 'GraduationCap',
    order: 1,
    status: 'active',
  },
  {
    title: 'Online PG Programs',
    description: 'Advance your career with a postgraduate degree from India\'s leading universities. Our Online PG programs — MBA, MCA, M.Com, MA, and M.Sc — are tailored for working professionals seeking career growth. Gain specialized knowledge in your field with flexible schedules and expert faculty guidance.',
    icon: 'BookOpen',
    order: 2,
    status: 'active',
  },
  {
    title: 'Credit Transfer Program',
    description: 'Don\'t let incomplete degrees hold you back. Our Credit Transfer Program allows you to transfer previously earned academic credits to a new university and complete your degree faster. Whether you dropped out or want to switch institutions, we evaluate your transcripts and map credits to an equivalent program.',
    icon: 'Repeat',
    order: 3,
    status: 'active',
  },
  {
    title: 'SIDP — Skill Integrated Degree Program',
    description: 'The Skill Integrated Degree Program (SIDP) combines a formal degree with hands-on skill training, preparing students for the real-world job market from day one. Offered in collaboration with top universities, SIDP ensures you graduate with both academic credentials and industry-ready skills in areas like Digital Marketing, Data Science, Full-Stack Development, and more.',
    icon: 'Briefcase',
    order: 4,
    status: 'active',
  },
  {
    title: 'Diploma & Certification Programs',
    description: 'Fast-track your career with our professionally designed Diploma programs. Whether you\'re looking to upskill or enter a new field entirely, our short-term diploma courses in Data Science, Cyber Security, Hospital Management, Logistics, and more give you the credentials employers value — in as little as 6 to 12 months.',
    icon: 'FileCheck',
    order: 5,
    status: 'active',
  },
  {
    title: 'Document Attestation Services',
    description: 'Authorized Embassy Legalization & Authentication services for Global Education, Employment, and Migration. We provide certificate attestation services for Bahrain, Kuwait, Oman, Qatar, and UAE from various departments like Notary, GAD, State Home Ministry, HRD, MEA, Embassy and Consulate.',
    icon: 'ShieldCheck',
    order: 6,
    status: 'active',
  },
];

export async function POST() {
  try {
    await connectDB();
    const inserted = await Service.insertMany(DEFAULT_SERVICES);
    return NextResponse.json({ message: `${inserted.length} services seeded successfully.`, data: inserted }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
