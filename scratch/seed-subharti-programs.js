// Seed all programs for Swami Vivekanand Subharti University
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const UNI_ID = '69ee5b0b44cc96beb5e59742';
const UNI_OBJ = new mongoose.Types.ObjectId(UNI_ID);

// ─── helpers ────────────────────────────────────────────────────
const ugMeta = (slug, name, specialization, fee = 18000) => ({
  slug, name,
  university: UNI_OBJ,
  duration: '3 Years', type: 'Degree', category: 'Degree',
  level: 'Undergraduate', eligibility: '10+2 in any stream with minimum 45% marks',
  courseType: 'Arts', fee,
  image: '/images/student_book_cutout.png', brochure: '',
  description: `${name} is a three-year undergraduate programme at Swami Vivekanand Subharti University, Meerut. It combines theoretical depth with practical exposure to prepare graduates for careers in academics, civil services, and the private sector.`,
  highlights: ['UGC Recognised Degree', 'Experienced Faculty', 'Flexible Learning', 'Scholarship Opportunities', 'Campus Placement Support'],
  heroTitle: `Shape Your Future with ${name}`,
  intro: `The ${name} programme at Subharti University provides a rigorous academic foundation in ${specialization}. Students gain analytical thinking, research skills, and a broad understanding of society, preparing them for competitive exams, higher studies, and professional careers.`,
});

const pgMeta = (slug, name, specialization, fee = 16000) => ({
  slug, name,
  university: UNI_OBJ,
  duration: '2 Years', type: 'Post Graduate', category: 'Post Graduate',
  level: 'Postgraduate', eligibility: 'Any Bachelor\'s degree with minimum 50% marks',
  courseType: 'Arts', fee,
  image: '/images/student_book_cutout.png', brochure: '',
  description: `${name} is a two-year postgraduate programme at Swami Vivekanand Subharti University offering advanced study in ${specialization}. It is ideal for students seeking careers in academia, research, and public service.`,
  highlights: ['UGC Recognised', 'Research-Oriented Curriculum', 'Expert Faculty', 'Library & Resource Access', 'Career Counselling'],
  heroTitle: `Advance Your Career with ${name}`,
  intro: `The ${name} programme deepens expertise in ${specialization} through a combination of seminar-based learning, field research, and dissertation work. Graduates are well-equipped for roles in teaching, civil services, NGOs, and research institutes.`,
});

// ─── program list ────────────────────────────────────────────────
const programs = [

  // ═══ BA PROGRAMS ═══
  {
    ...ugMeta('ba-general', 'BA General', 'humanities and social sciences'),
    specializations: [
      { id: 'foundation', title: 'Foundation Studies', description: 'Core modules in language, history, political theory, and economics that build a broad liberal arts foundation.', jobs: ['Civil Services Officer', 'NGO Programme Coordinator', 'Journalist', 'Research Assistant'] },
      { id: 'career-paths', title: 'Career Pathways', description: 'Prepares students for competitive exams (UPSC, State PSC) and postgraduate programmes across arts disciplines.', jobs: ['Bank Officer', 'Teacher', 'Social Worker', 'Administrative Officer'] },
    ],
  },
  {
    ...ugMeta('ba-hindi', 'BA Hindi', 'Hindi language and literature'),
    courseType: 'Arts',
    specializations: [
      { id: 'literature', title: 'Hindi Literature', description: 'Detailed study of Hindi prose, poetry, drama, and critical literary theory from ancient to contemporary periods.', jobs: ['Hindi Teacher', 'Content Writer', 'Translator', 'News Anchor'] },
      { id: 'language', title: 'Language & Linguistics', description: 'Phonetics, grammar, and applied linguistics with a focus on written and spoken Hindi proficiency.', jobs: ['Editor', 'Copywriter', 'Subtitling Specialist', 'Language Trainer'] },
    ],
  },
  {
    ...ugMeta('ba-english', 'BA English', 'English language and literature'),
    courseType: 'Arts',
    specializations: [
      { id: 'literature', title: 'English Literature', description: 'Survey of British, American, and postcolonial literature with emphasis on critical and cultural theory.', jobs: ['Content Strategist', 'English Teacher', 'Literary Editor', 'Copywriter'] },
      { id: 'communication', title: 'Communication & Writing', description: 'Creative writing, professional communication, and media writing skills for modern careers.', jobs: ['Corporate Communicator', 'Digital Writer', 'PR Executive', 'Script Writer'] },
    ],
  },
  {
    ...ugMeta('ba-political-science', 'BA Political Science', 'political theory and governance'),
    courseType: 'Arts',
    specializations: [
      { id: 'governance', title: 'Governance & Public Policy', description: 'Study of Indian constitution, government institutions, public policy analysis, and political ideologies.', jobs: ['Policy Analyst', 'Politician\'s Assistant', 'IAS/IPS Officer', 'Political Consultant'] },
      { id: 'international', title: 'International Relations', description: 'Diplomatic history, geopolitics, international organisations, and foreign policy frameworks.', jobs: ['Diplomat', 'Foreign Affairs Researcher', 'UN Agency Staff', 'Journalist'] },
    ],
  },
  {
    ...ugMeta('ba-history', 'BA History', 'Indian and world history'),
    courseType: 'Arts',
    specializations: [
      { id: 'ancient', title: 'Ancient & Medieval India', description: 'Indus Valley to Mughal era — archaeology, inscriptions, culture, and socio-economic history.', jobs: ['Archaeologist', 'Museum Curator', 'Heritage Consultant', 'Researcher'] },
      { id: 'modern', title: 'Modern & World History', description: 'Colonial India, independence movements, and key events in global history from 18th century onwards.', jobs: ['Civil Services Officer', 'Historian', 'Journalist', 'Content Creator'] },
    ],
  },
  {
    ...ugMeta('ba-economics', 'BA Economics', 'micro and macroeconomics'),
    courseType: 'Commerce',
    fee: 20000,
    specializations: [
      { id: 'micro', title: 'Microeconomics', description: 'Consumer behaviour, market structures, price theory, and welfare economics applied to real-world scenarios.', jobs: ['Economic Analyst', 'Market Research Analyst', 'Business Consultant', 'Policy Researcher'] },
      { id: 'macro', title: 'Macroeconomics & Statistics', description: 'National income, inflation, monetary policy, and quantitative research methods for economic analysis.', jobs: ['Banking Officer', 'Financial Analyst', 'Government Economist', 'Data Analyst'] },
    ],
  },
  {
    ...ugMeta('ba-sociology', 'BA Sociology', 'society, culture and social change'),
    courseType: 'Arts',
    specializations: [
      { id: 'social-theory', title: 'Social Theory', description: 'Classical and contemporary sociological theories from Durkheim, Weber, Marx, and modern thinkers.', jobs: ['Social Researcher', 'NGO Field Officer', 'HR Executive', 'Community Developer'] },
      { id: 'social-work', title: 'Applied Social Work', description: 'Community development, gender studies, and fieldwork in urban and rural settings.', jobs: ['Social Worker', 'Welfare Officer', 'Policy Analyst', 'Counsellor'] },
    ],
  },
  {
    ...ugMeta('ba-mathematics', 'BA Mathematics', 'pure and applied mathematics'),
    courseType: 'Science',
    fee: 20000,
    specializations: [
      { id: 'pure-math', title: 'Pure Mathematics', description: 'Algebra, calculus, real analysis, and abstract mathematical structures for theoretical careers.', jobs: ['Actuarial Analyst', 'Statistician', 'Data Scientist', 'Researcher'] },
      { id: 'applied-math', title: 'Applied Mathematics', description: 'Operations research, numerical methods, and mathematical modelling for industry applications.', jobs: ['Financial Modeller', 'Operations Analyst', 'Software Tester', 'Quantitative Analyst'] },
    ],
  },

  // ═══ OTHER UG ═══
  {
    slug: 'blis', name: 'Bachelor of Library and Information Science',
    university: UNI_OBJ, duration: '1 Year', type: 'Degree', category: 'Degree',
    level: 'Undergraduate', eligibility: 'Any Bachelor\'s degree with minimum 45% marks',
    courseType: 'Others', fee: 22000,
    image: '/images/student_book_cutout.png', brochure: '',
    description: 'A one-year professional undergraduate programme preparing students for careers in library management, information systems, and knowledge organisation across academic, public, and special libraries.',
    highlights: ['NAAC Accredited Institution', 'Practical Library Training', 'Digital Library Exposure', 'Government Job Eligibility', 'Archive & Records Management'],
    heroTitle: 'Build a Career in Library & Information Science',
    intro: 'The BLISc programme at Subharti University equips students with skills in library classification, cataloguing, digital resource management, and information retrieval. Graduates are eligible for librarian roles in schools, colleges, public libraries, and government bodies.',
    specializations: [
      { id: 'cataloguing', title: 'Cataloguing & Classification', description: 'DDC, UDC, and Library of Congress classification systems combined with MARC cataloguing standards.', jobs: ['Library Assistant', 'Cataloguer', 'Archive Specialist', 'Records Manager'] },
      { id: 'digital-library', title: 'Digital Library Management', description: 'Database management, digital preservation, e-resources management, and library automation software.', jobs: ['Digital Librarian', 'Information Officer', 'E-Resource Manager', 'Knowledge Manager'] },
    ],
  },
  {
    slug: 'bba-management', name: 'BBA Management',
    university: UNI_OBJ, duration: '3 Years', type: 'Degree', category: 'Degree',
    level: 'Undergraduate', eligibility: '10+2 in any stream with minimum 45% marks',
    courseType: 'Management', fee: 38000,
    image: '/images/hero-campus.png', brochure: '',
    description: 'Bachelor of Business Administration with Management is a three-year undergraduate programme at Subharti University combining business fundamentals with leadership and organisational skills for aspiring managers and entrepreneurs.',
    highlights: ['Industry Mentorship', 'Case-Study Based Learning', 'Internship Programme', 'Entrepreneurship Cell', 'Campus Placement Support'],
    heroTitle: 'Launch Your Business Career with BBA Management',
    intro: 'The BBA Management programme provides students with a strong foundation in business administration, organisational behaviour, marketing, finance, and human resources. Practical internships and live projects ensure students are industry-ready from day one.',
    specializations: [
      { id: 'general-management', title: 'General Management', description: 'Principles of management, organisational theory, leadership skills, and strategic decision-making for modern businesses.', jobs: ['Business Development Executive', 'Operations Coordinator', 'HR Trainee', 'Sales Manager'] },
      { id: 'entrepreneurship', title: 'Entrepreneurship & Innovation', description: 'Startup planning, business model design, venture funding, and innovation management for aspiring entrepreneurs.', jobs: ['Entrepreneur', 'Startup Consultant', 'Product Manager', 'Business Analyst'] },
    ],
  },
  {
    slug: 'bcom-management', name: 'B.Com Management',
    university: UNI_OBJ, duration: '3 Years', type: 'Degree', category: 'Degree',
    level: 'Undergraduate', eligibility: '10+2 in Commerce/Arts with minimum 45% marks',
    courseType: 'Commerce', fee: 22000,
    image: '/images/student_book_cutout.png', brochure: '',
    description: 'Bachelor of Commerce with Management specialisation at Subharti University combines core commerce education with management principles, preparing students for careers in banking, finance, and corporate management.',
    highlights: ['Industry-Aligned Curriculum', 'Tally & Financial Software Training', 'CA Foundation Preparation', 'Internship Programme', 'Placement Support'],
    heroTitle: 'Master Commerce & Management with B.Com',
    intro: 'The B.Com Management programme blends accounting, taxation, business law, and management principles into a comprehensive three-year curriculum. Students gain hands-on training in financial tools and business management, making them highly competitive in commerce and finance careers.',
    specializations: [
      { id: 'accounting', title: 'Accounting & Taxation', description: 'Advanced accountancy, GST, income tax, and financial statement analysis for commerce careers.', jobs: ['Accountant', 'Tax Consultant', 'Audit Assistant', 'Finance Executive'] },
      { id: 'business-management', title: 'Business Management', description: 'Business communication, marketing management, and organisational behaviour applied to commerce contexts.', jobs: ['Business Development Executive', 'Office Manager', 'Sales Executive', 'Banking Officer'] },
    ],
  },
  {
    slug: 'bcom-honours-management', name: 'B.Com Honours Management',
    university: UNI_OBJ, duration: '3 Years', type: 'Degree', category: 'Degree',
    level: 'Undergraduate', eligibility: '10+2 in Commerce with minimum 50% marks',
    courseType: 'Commerce', fee: 25000,
    image: '/images/student_book_cutout.png', brochure: '',
    description: 'An advanced three-year programme at Subharti University that provides an in-depth study of commerce, accounting, and management with research-oriented coursework and honours-level electives.',
    highlights: ['Honours Level Coursework', 'Research Paper Component', 'Advanced Accounting Training', 'CA/CS Pathway Compatible', 'Placement Assistance'],
    heroTitle: 'Excel in Commerce with B.Com Honours',
    intro: 'B.Com Honours Management is designed for students who want a rigorous, research-oriented commerce education. The programme covers advanced financial accounting, corporate law, business statistics, and management theory, equipping graduates for roles in finance, consulting, and postgraduate research.',
    specializations: [
      { id: 'advanced-accounting', title: 'Advanced Accounting', description: 'Corporate accounting, cost accounting, auditing standards, and financial reporting for professional roles.', jobs: ['Chartered Accountant', 'Cost Accountant', 'Auditor', 'Financial Controller'] },
      { id: 'corporate-management', title: 'Corporate Law & Management', description: 'Companies Act, SEBI regulations, corporate governance, and strategic management for the corporate world.', jobs: ['Company Secretary', 'Compliance Officer', 'Corporate Analyst', 'Investment Banker'] },
    ],
  },
  {
    slug: 'ba-jmc', name: 'BA JMC',
    university: UNI_OBJ, duration: '3 Years', type: 'Degree', category: 'Degree',
    level: 'Undergraduate', eligibility: '10+2 in any stream with minimum 45% marks',
    courseType: 'Arts', fee: 32000,
    image: '/images/hero-campus.png', brochure: '',
    description: 'Bachelor of Arts in Journalism and Mass Communication at Subharti University equips students with skills in print journalism, broadcast media, digital content, advertising, and public relations.',
    highlights: ['Campus Radio & TV Studio', 'Digital Media Lab', 'Industry Internship', 'Guest Lectures by Media Professionals', 'Placement in Top Media Houses'],
    heroTitle: 'Tell Stories That Matter — BA JMC at Subharti',
    intro: 'The BA JMC programme trains students in the full spectrum of mass communication — from traditional print journalism to digital media, broadcast production, PR, and advertising. Students get hands-on experience in the university\'s media labs and real-world internship placements.',
    specializations: [
      { id: 'journalism', title: 'Journalism & Reporting', description: 'News writing, investigative journalism, feature writing, and editorial design for print and digital media.', jobs: ['News Reporter', 'Correspondent', 'Editor', 'Content Creator'] },
      { id: 'broadcast', title: 'Broadcast & Digital Media', description: 'Radio production, video journalism, social media management, and OTT content creation.', jobs: ['Video Editor', 'Anchor', 'Social Media Manager', 'Documentary Filmmaker'] },
      { id: 'pr-advertising', title: 'PR & Advertising', description: 'Campaign planning, brand communication, event management, and public relations strategy.', jobs: ['PR Executive', 'Brand Manager', 'Advertising Copywriter', 'Media Planner'] },
    ],
  },

  // ═══ MA PROGRAMS ═══
  {
    ...pgMeta('ma-buddhist-studies', 'MA Buddhist Studies', 'Buddhist philosophy and history'),
    specializations: [
      { id: 'philosophy', title: 'Buddhist Philosophy', description: 'Theravada, Mahayana, and Vajrayana traditions; Pali texts, Abhidhamma, and Buddhist ethics.', jobs: ['Researcher', 'Museum Curator', 'University Lecturer', 'Buddhist Counsellor'] },
      { id: 'history', title: 'History of Buddhism in India', description: 'Spread of Buddhism from Magadha to Southeast Asia, pilgrimage sites, and Ashoka\'s legacy.', jobs: ['Heritage Consultant', 'Tour Guide (Buddhist Circuit)', 'Academic Writer', 'NGO Worker'] },
    ],
  },
  {
    ...pgMeta('ma-education', 'MA Education', 'educational theory and pedagogy'),
    courseType: 'Others',
    specializations: [
      { id: 'pedagogy', title: 'Pedagogy & Curriculum', description: 'Curriculum design, teaching methodologies, classroom management, and educational psychology.', jobs: ['School Principal', 'Curriculum Developer', 'Educational Consultant', 'Teacher Trainer'] },
      { id: 'ed-admin', title: 'Educational Administration', description: 'School management, policy frameworks, institutional planning, and assessment systems.', jobs: ['Education Officer', 'District Inspector', 'Academic Coordinator', 'NGO Education Manager'] },
    ],
  },
  {
    ...pgMeta('ma-public-administration', 'MA Public Administration', 'governance and public policy'),
    specializations: [
      { id: 'governance', title: 'Governance & Policy', description: 'Public administration theory, e-governance, decentralisation, and policy analysis at state and central levels.', jobs: ['IAS Officer', 'Policy Analyst', 'District Collector', 'Government Consultant'] },
      { id: 'development', title: 'Development Administration', description: 'Rural development, social welfare schemes, poverty alleviation, and administrative reforms in India.', jobs: ['Block Development Officer', 'Development Consultant', 'NGO Manager', 'Welfare Officer'] },
    ],
  },
  {
    ...pgMeta('ma-home-science', 'MA Home Science', 'home science and human ecology'),
    courseType: 'Science',
    specializations: [
      { id: 'nutrition', title: 'Nutrition & Dietetics', description: 'Advanced nutrition science, therapeutic diets, community nutrition programmes, and food safety.', jobs: ['Dietitian', 'Nutrition Educator', 'Food Safety Officer', 'Hospital Nutritionist'] },
      { id: 'family-management', title: 'Family & Resource Management', description: 'Family counselling, household resource management, consumer science, and child development.', jobs: ['Family Counsellor', 'Consumer Researcher', 'Child Development Specialist', 'Social Worker'] },
    ],
  },
  {
    ...pgMeta('ma-jmc', 'MA JMC', 'journalism and mass communication'),
    courseType: 'Arts', fee: 30000,
    specializations: [
      { id: 'digital-media', title: 'Digital Media & Communication', description: 'Data journalism, multimedia storytelling, social media strategy, and digital marketing communication.', jobs: ['Digital Journalist', 'Content Strategist', 'Media Researcher', 'Online Editor'] },
      { id: 'media-studies', title: 'Media Studies & Research', description: 'Media theory, audience research, media ethics, and communication policy analysis.', jobs: ['Media Analyst', 'PR Manager', 'Research Scholar', 'Media Consultant'] },
    ],
  },
  {
    ...pgMeta('ma-political-science', 'MA Political Science', 'political theory and international relations'),
    specializations: [
      { id: 'political-theory', title: 'Political Theory & Ideology', description: 'Liberal, Marxist, feminist, and postcolonial political theories with analysis of Indian political thought.', jobs: ['Political Researcher', 'Lecturer', 'Think Tank Analyst', 'Journalist'] },
      { id: 'ir', title: 'International Relations', description: 'Geopolitics, foreign policy, UN system, regional organisations, and conflict resolution.', jobs: ['Diplomat', 'Foreign Policy Analyst', 'UN Researcher', 'Civil Services Officer'] },
    ],
  },
  {
    ...pgMeta('ma-mathematics', 'MA Mathematics', 'advanced pure and applied mathematics'),
    courseType: 'Science', fee: 18000,
    specializations: [
      { id: 'pure', title: 'Pure Mathematics', description: 'Abstract algebra, functional analysis, topology, and number theory at the postgraduate level.', jobs: ['Mathematician', 'University Lecturer', 'Research Scientist', 'Cryptographer'] },
      { id: 'applied', title: 'Applied & Computational Mathematics', description: 'Differential equations, numerical analysis, fluid dynamics, and computational methods.', jobs: ['Data Scientist', 'Actuary', 'Quantitative Analyst', 'Operations Researcher'] },
    ],
  },
  {
    ...pgMeta('ma-sociology', 'MA Sociology', 'sociological theory and research methods'),
    specializations: [
      { id: 'social-theory', title: 'Sociological Theory', description: 'Classical and contemporary sociological frameworks including structuralism, feminism, and postmodernism.', jobs: ['Social Researcher', 'Lecturer', 'Policy Analyst', 'Development Consultant'] },
      { id: 'research-methods', title: 'Research Methods & Statistics', description: 'Qualitative and quantitative research design, data collection, fieldwork, and analysis techniques.', jobs: ['Market Researcher', 'Survey Analyst', 'NGO Researcher', 'Academic Researcher'] },
    ],
  },
  {
    ...pgMeta('ma-history', 'MA History', 'historical research and Indian heritage'),
    specializations: [
      { id: 'ancient-medieval', title: 'Ancient & Medieval History', description: 'Vedic period, Mauryan empire, Gupta period, Sultanate, and Mughal India through primary sources.', jobs: ['Archaeologist', 'Historian', 'Heritage Consultant', 'Museum Curator'] },
      { id: 'modern-history', title: 'Modern History & Archives', description: 'Colonial India, independence movement, partition history, and archival research methodologies.', jobs: ['Civil Services Officer', 'Archivist', 'Academic Writer', 'Documentary Researcher'] },
    ],
  },
  {
    ...pgMeta('ma-hindi', 'MA Hindi', 'Hindi language, literature and linguistics'),
    specializations: [
      { id: 'hindi-literature', title: 'Hindi Literature', description: 'In-depth study of Hindi literary traditions from Bhakti Kaal to modern and contemporary Hindi writing.', jobs: ['Hindi Lecturer', 'Author', 'Translator', 'Literary Critic'] },
      { id: 'applied-linguistics', title: 'Applied Linguistics', description: 'Phonology, morphology, discourse analysis, and sociolinguistics of Hindi and related languages.', jobs: ['Language Officer', 'Subtitling Expert', 'Language Trainer', 'Content Editor'] },
    ],
  },
  {
    ...pgMeta('ma-economics', 'MA Economics', 'economic theory and applied economics'),
    courseType: 'Commerce', fee: 18000,
    specializations: [
      { id: 'theory', title: 'Economic Theory', description: 'Advanced micro and macroeconomics, welfare economics, game theory, and international trade theory.', jobs: ['Economist', 'Policy Researcher', 'University Lecturer', 'Think Tank Analyst'] },
      { id: 'development', title: 'Development & Agricultural Economics', description: 'Indian economic planning, poverty analysis, rural development, and agricultural economics.', jobs: ['Development Economist', 'NABARD Officer', 'Government Economist', 'Research Fellow'] },
    ],
  },
  {
    ...pgMeta('ma-english', 'MA English', 'English literature and cultural studies'),
    specializations: [
      { id: 'literature', title: 'British & Postcolonial Literature', description: 'Victorian, Modernist, and postcolonial texts analysed through feminist, Marxist, and poststructuralist theory.', jobs: ['English Lecturer', 'Literary Researcher', 'Editor', 'Cultural Analyst'] },
      { id: 'cultural-studies', title: 'Cultural Studies & Media', description: 'Media culture, popular culture theory, visual studies, and the intersection of language and power.', jobs: ['Content Strategist', 'Media Researcher', 'Copywriter', 'Corporate Trainer'] },
    ],
  },

  // ═══ MLIS ═══
  {
    slug: 'mlis', name: 'Master of Library and Information Science',
    university: UNI_OBJ, duration: '1 Year', type: 'Post Graduate', category: 'Post Graduate',
    level: 'Postgraduate', eligibility: 'BLISc or any Bachelor\'s degree with minimum 50% marks',
    courseType: 'Others', fee: 24000,
    image: '/images/student_book_cutout.png', brochure: '',
    description: 'A one-year postgraduate programme equipping students with advanced skills in library administration, digital information management, knowledge organisation, and research for senior librarian roles.',
    highlights: ['Professional Library Certification', 'Digital Library Management Training', 'Eligibility for College Librarian Posts', 'Research Dissertation', 'NET/SET Exam Preparation'],
    heroTitle: 'Lead the Future of Information with MLISc',
    intro: 'The MLISc programme at Subharti University is designed for library professionals seeking advancement to senior roles. It covers advanced cataloguing systems, digital libraries, library legislation, knowledge management, and research methodology, preparing graduates for head librarian and information officer positions.',
    specializations: [
      { id: 'knowledge-mgmt', title: 'Knowledge Management', description: 'Ontology design, knowledge organisation systems, taxonomy creation, and institutional repository management.', jobs: ['Knowledge Manager', 'Information Architect', 'Digital Archivist', 'Research Librarian'] },
      { id: 'library-admin', title: 'Library Administration', description: 'Staff management, budget planning, collection development policy, and library automation using Koha/SOUL software.', jobs: ['College Librarian', 'University Librarian', 'Library Director', 'Special Librarian'] },
    ],
  },

  // ═══ MBA PROGRAMS ═══
  {
    slug: 'mba-general', name: 'MBA General',
    university: UNI_OBJ, duration: '2 Years', type: 'Post Graduate', category: 'Post Graduate',
    level: 'Postgraduate', eligibility: 'Any Bachelor\'s degree with minimum 50% marks',
    courseType: 'Management', fee: 65000,
    image: '/images/hero-campus.png', brochure: '',
    description: 'MBA General at Subharti University is a two-year flagship postgraduate management programme covering all core business disciplines — strategy, finance, marketing, operations, and HR — for a well-rounded management career.',
    highlights: ['AICTE Approved', 'Industry Mentorship Programme', 'Live Projects & Case Studies', 'National & International Internships', 'Strong Placement Record'],
    heroTitle: 'Lead Businesses. Drive Growth. MBA General at Subharti.',
    intro: 'The MBA General programme provides comprehensive management education with a focus on strategic thinking, data-driven decision making, and leadership development. Students benefit from industry partnerships, live case studies, and placement support in leading corporations.',
    specializations: [
      { id: 'strategy', title: 'Strategic Management', description: 'Corporate strategy, competitive analysis, M&A, and business model innovation for senior leadership roles.', jobs: ['Strategy Manager', 'Business Consultant', 'Corporate Planner', 'Entrepreneur'] },
      { id: 'operations', title: 'Operations & Supply Chain', description: 'Process optimisation, lean management, logistics, and global supply chain management.', jobs: ['Operations Manager', 'Supply Chain Analyst', 'Logistics Head', 'Project Manager'] },
      { id: 'entrepreneurship', title: 'Entrepreneurship', description: 'Venture creation, startup ecosystem, angel funding, and growth hacking for aspiring entrepreneurs.', jobs: ['Founder/CEO', 'Business Development Manager', 'Innovation Consultant', 'Product Owner'] },
    ],
  },
  {
    slug: 'mba-it', name: 'MBA Information Technology',
    university: UNI_OBJ, duration: '2 Years', type: 'Post Graduate', category: 'Post Graduate',
    level: 'Postgraduate', eligibility: 'Any Bachelor\'s degree with minimum 50% marks',
    courseType: 'IT', fee: 68000,
    image: '/images/student-laptop.png', brochure: '',
    description: 'MBA in Information Technology at Subharti University merges business management with IT strategy, equipping graduates to lead technology-driven organisations and manage digital transformation projects.',
    highlights: ['AICTE Approved', 'IT Lab Access', 'Tech Industry Internship', 'SAP/ERP Training', 'Placement in IT & Consulting Firms'],
    heroTitle: 'Bridge Business & Technology — MBA Information Technology',
    intro: 'The MBA IT programme prepares graduates to drive technology strategy in organisations. Students learn IT project management, enterprise systems, cybersecurity policy, cloud computing strategy, and digital business transformation alongside core management subjects.',
    specializations: [
      { id: 'it-management', title: 'IT Project Management', description: 'Agile/Scrum methodologies, PMP-oriented training, IT governance, and managing software development teams.', jobs: ['IT Project Manager', 'Scrum Master', 'IT Consultant', 'Product Manager'] },
      { id: 'digital-transformation', title: 'Digital Business Strategy', description: 'Cloud strategy, AI adoption roadmap, digital marketing automation, and e-commerce management.', jobs: ['Digital Transformation Lead', 'CTO', 'IT Business Analyst', 'Solutions Architect'] },
    ],
  },
  {
    slug: 'mba-hrm', name: 'MBA Human Resource Management',
    university: UNI_OBJ, duration: '2 Years', type: 'Post Graduate', category: 'Post Graduate',
    level: 'Postgraduate', eligibility: 'Any Bachelor\'s degree with minimum 50% marks',
    courseType: 'Management', fee: 65000,
    image: '/images/hero-campus.png', brochure: '',
    description: 'MBA in Human Resource Management at Subharti University focuses on talent acquisition, workforce planning, labour relations, organisational development, and HR technology for modern HR leaders.',
    highlights: ['AICTE Approved', 'HR Analytics Training', 'Industrial Visit Programme', 'SHRM Curriculum Aligned', 'Placement in HR Roles'],
    heroTitle: 'Build & Inspire Teams — MBA Human Resource Management',
    intro: 'The MBA HRM programme trains future HR leaders in talent management, compensation design, learning & development, organisational behaviour, and HR analytics. Students gain real-world experience through internships and HR simulations.',
    specializations: [
      { id: 'talent-management', title: 'Talent Acquisition & Management', description: 'Recruitment strategy, employer branding, onboarding, performance management, and succession planning.', jobs: ['HR Manager', 'Talent Acquisition Lead', 'Recruitment Consultant', 'HRBP'] },
      { id: 'od', title: 'Organisational Development', description: 'Change management, training & development, employee engagement, and OD interventions for growing companies.', jobs: ['OD Consultant', 'L&D Manager', 'Change Manager', 'Compensation & Benefits Analyst'] },
    ],
  },
  {
    slug: 'mba-marketing', name: 'MBA Marketing Management',
    university: UNI_OBJ, duration: '2 Years', type: 'Post Graduate', category: 'Post Graduate',
    level: 'Postgraduate', eligibility: 'Any Bachelor\'s degree with minimum 50% marks',
    courseType: 'Management', fee: 65000,
    image: '/images/hero-campus.png', brochure: '',
    description: 'MBA in Marketing Management at Subharti University prepares graduates in brand management, digital marketing, consumer behaviour, sales strategy, and integrated marketing communications for competitive marketing careers.',
    highlights: ['AICTE Approved', 'Digital Marketing Certification', 'Market Research Projects', 'Brand Management Lab', 'Placement in FMCG, Retail & Digital Companies'],
    heroTitle: 'Drive Brands. Win Markets. MBA Marketing Management.',
    intro: 'The MBA Marketing programme combines classical marketing theory with modern digital marketing tools, consumer insight research, and data-driven campaign management. Students graduate ready for roles in brand marketing, e-commerce, advertising, and sales leadership.',
    specializations: [
      { id: 'digital-marketing', title: 'Digital Marketing & Analytics', description: 'SEO/SEM, social media marketing, email campaigns, Google Analytics, and performance marketing.', jobs: ['Digital Marketing Manager', 'Growth Hacker', 'Brand Strategist', 'SEO Specialist'] },
      { id: 'brand-sales', title: 'Brand & Sales Management', description: 'Brand equity management, retail strategy, key account management, and B2B sales processes.', jobs: ['Brand Manager', 'Sales Manager', 'Account Manager', 'Marketing Director'] },
    ],
  },
  {
    slug: 'mba-finance', name: 'MBA Financial Management',
    university: UNI_OBJ, duration: '2 Years', type: 'Post Graduate', category: 'Post Graduate',
    level: 'Postgraduate', eligibility: 'Any Bachelor\'s degree with minimum 50% marks',
    courseType: 'Management', fee: 68000,
    image: '/images/hero-campus.png', brochure: '',
    description: 'MBA in Financial Management at Subharti University is designed for future finance leaders, covering investment banking, corporate finance, financial markets, risk management, and advanced financial analysis.',
    highlights: ['AICTE Approved', 'Bloomberg Terminal Access', 'CFA Level 1 Preparation', 'Finance Club & Competitions', 'Placement in Banks, NBFCs & Consulting'],
    heroTitle: 'Master Finance. Lead Markets. MBA Financial Management.',
    intro: 'The MBA Finance programme equips students with expertise in corporate finance, investment analysis, portfolio management, derivatives, risk management, and financial modelling. Graduates enter leading banks, investment firms, and financial consulting organisations.',
    specializations: [
      { id: 'corporate-finance', title: 'Corporate Finance & Valuation', description: 'Capital budgeting, M&A valuation, financial modelling, working capital management, and dividend policy.', jobs: ['Investment Banker', 'Corporate Finance Manager', 'M&A Analyst', 'CFO'] },
      { id: 'investment', title: 'Investment & Wealth Management', description: 'Portfolio construction, equity research, mutual funds, derivatives trading, and wealth advisory.', jobs: ['Portfolio Manager', 'Equity Analyst', 'Wealth Advisor', 'Risk Manager'] },
    ],
  },
  {
    slug: 'mba-fashion-designing', name: 'MBA Fashion Designing',
    university: UNI_OBJ, duration: '2 Years', type: 'Post Graduate', category: 'Post Graduate',
    level: 'Postgraduate', eligibility: 'Any Bachelor\'s degree with minimum 50% marks',
    courseType: 'Management', fee: 65000,
    image: '/images/hero-campus.png', brochure: '',
    description: 'MBA in Fashion Designing at Subharti University blends creative fashion expertise with business acumen — covering fashion merchandising, retail management, brand strategy, and global fashion industry dynamics.',
    highlights: ['AICTE Approved', 'Design Studio Access', 'Fashion Show Participation', 'Industry Collaboration Projects', 'Placement in Fashion Brands & Retail'],
    heroTitle: 'Where Fashion Meets Business — MBA Fashion Designing',
    intro: 'The MBA Fashion Designing programme is ideal for creative professionals who want to manage and grow fashion businesses. It covers fashion marketing, textile management, retail buying, visual merchandising, and global supply chains alongside standard MBA subjects.',
    specializations: [
      { id: 'fashion-marketing', title: 'Fashion Marketing & Branding', description: 'Luxury brand management, fashion communication, digital fashion retail, and influencer marketing strategy.', jobs: ['Fashion Brand Manager', 'Fashion PR Executive', 'Visual Merchandiser', 'Retail Buyer'] },
      { id: 'fashion-business', title: 'Fashion Business & Merchandising', description: 'Apparel supply chain, sourcing strategy, retail planning, fashion forecasting, and inventory management.', jobs: ['Fashion Merchandiser', 'Retail Operations Manager', 'Apparel Sourcing Manager', 'Fashion Entrepreneur'] },
    ],
  },

  // ═══ M.COM ═══
  {
    slug: 'mcom-management', name: 'M.Com Management',
    university: UNI_OBJ, duration: '2 Years', type: 'Post Graduate', category: 'Post Graduate',
    level: 'Postgraduate', eligibility: 'B.Com / BBA with minimum 50% marks',
    courseType: 'Commerce', fee: 22000,
    image: '/images/student_book_cutout.png', brochure: '',
    description: 'Master of Commerce with Management specialisation at Subharti University is a two-year postgraduate programme offering advanced knowledge in accountancy, business finance, taxation, and management principles.',
    highlights: ['UGC Recognised', 'Advanced Accountancy Training', 'Research Dissertation', 'CA/CS Pathway Compatible', 'Placement Support'],
    heroTitle: 'Master Commerce at the Highest Level — M.Com Management',
    intro: 'The M.Com Management programme provides advanced grounding in corporate accounting, financial management, taxation, business law, and research methodology. It prepares graduates for senior finance roles, academic positions, and professional certifications like CA and CS.',
    specializations: [
      { id: 'advanced-accounting', title: 'Advanced Corporate Accounting', description: 'Consolidated accounts, IFRS standards, forensic accounting, and advanced financial reporting.', jobs: ['Senior Accountant', 'Finance Manager', 'Internal Auditor', 'Tax Manager'] },
      { id: 'taxation-law', title: 'Taxation & Business Law', description: 'Direct and indirect tax laws, GST framework, corporate law, and compliance management.', jobs: ['Tax Consultant', 'GST Practitioner', 'Company Secretary', 'Compliance Officer'] },
    ],
  },
];

// ─── schema (minimal) ─────────────────────────────────────────────
const programSchema = new mongoose.Schema({}, { strict: false });
const Program = mongoose.models.Program || mongoose.model('Program', programSchema, 'programs');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ MongoDB connected');

  let added = 0, updated = 0;
  for (const prog of programs) {
    const result = await Program.findOneAndUpdate(
      { slug: prog.slug },
      prog,
      { upsert: true, new: true, returnDocument: 'after' }
    );
    const isNew = result.createdAt?.getTime() === result.updatedAt?.getTime();
    if (isNew) { console.log(`  ➕ Added   : ${prog.name}`); added++; }
    else        { console.log(`  ✏️  Updated : ${prog.name}`); updated++; }
  }

  console.log(`\n🎉 Done — ${added} added, ${updated} updated.`);
  await mongoose.disconnect();
}

run().catch(err => { console.error(err); process.exit(1); });
