// seed-scholarship.mjs — run with: node seed-scholarship.mjs
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const OptionSchema = new mongoose.Schema(
  { text: { type: String, required: true }, isCorrect: { type: Boolean, default: false } },
  { _id: false }
);
const ScholarshipQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options:  { type: [OptionSchema], required: true },
  order:    { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  category: { type: String, enum: ['Online UG', 'Online PG', 'Credit Transfer', 'General'], default: 'General' },
}, { timestamps: true });
const ScholarshipQuestion = mongoose.models.ScholarshipQuestion || mongoose.model('ScholarshipQuestion', ScholarshipQuestionSchema);

const ConfigSchema = new mongoose.Schema({
  tiers: [{ minScore: Number, amount: Number, label: String }],
  voucherValidityDays: { type: Number, default: 90 },
  passingScore: { type: Number, default: 40 },
  totalQuestionsForScore: { type: Number, default: 10 },
}, { timestamps: true });
const ScholarshipConfig = mongoose.models.ScholarshipConfig || mongoose.model('ScholarshipConfig', ConfigSchema);

// ── Question Bank ──────────────────────────────────────────────────────────────
const questions = [
  // GENERAL (fallback for all programs)
  { category:'General', order:1,  question:'UGC stands for?', options:[{text:'University Grants Commission',isCorrect:true},{text:'Universal Government Committee',isCorrect:false},{text:'University Growth Council',isCorrect:false},{text:'United Graduate Commission',isCorrect:false}]},
  { category:'General', order:2,  question:'Which body regulates distance education in India?', options:[{text:'UGC-DEB',isCorrect:true},{text:'AICTE',isCorrect:false},{text:'NAAC',isCorrect:false},{text:'Ministry of HRD',isCorrect:false}]},
  { category:'General', order:3,  question:'What does GDP stand for?', options:[{text:'Gross Domestic Product',isCorrect:true},{text:'Gross Departmental Profit',isCorrect:false},{text:'General Domestic Production',isCorrect:false},{text:'Government Development Plan',isCorrect:false}]},
  { category:'General', order:4,  question:'NAAC stands for?', options:[{text:'National Assessment and Accreditation Council',isCorrect:true},{text:'National Academy of Arts and Commerce',isCorrect:false},{text:'National Accreditation and Audit Centre',isCorrect:false},{text:'National Assessment of Academic Courses',isCorrect:false}]},
  { category:'General', order:5,  question:'India\'s currency is regulated by?', options:[{text:'Reserve Bank of India',isCorrect:true},{text:'SEBI',isCorrect:false},{text:'Finance Ministry',isCorrect:false},{text:'NITI Aayog',isCorrect:false}]},
  { category:'General', order:6,  question:'Full form of AI in technology?', options:[{text:'Artificial Intelligence',isCorrect:true},{text:'Automated Information',isCorrect:false},{text:'Advanced Internet',isCorrect:false},{text:'Academic Interface',isCorrect:false}]},
  { category:'General', order:7,  question:'What does HR stand for in a company?', options:[{text:'Human Resources',isCorrect:true},{text:'High Revenue',isCorrect:false},{text:'Head of Registration',isCorrect:false},{text:'Hybrid Relations',isCorrect:false}]},
  { category:'General', order:8,  question:'The headquarters of United Nations is in?', options:[{text:'New York',isCorrect:true},{text:'London',isCorrect:false},{text:'Paris',isCorrect:false},{text:'Geneva',isCorrect:false}]},
  { category:'General', order:9,  question:'What is inflation?', options:[{text:'Rise in general price level',isCorrect:true},{text:'Fall in stock prices',isCorrect:false},{text:'Increase in production',isCorrect:false},{text:'Decrease in imports',isCorrect:false}]},
  { category:'General', order:10, question:'Who is called the father of economics?', options:[{text:'Adam Smith',isCorrect:true},{text:'Karl Marx',isCorrect:false},{text:'John Keynes',isCorrect:false},{text:'Milton Friedman',isCorrect:false}]},
  { category:'General', order:11, question:'Which of the following is an online learning platform?', options:[{text:'Coursera',isCorrect:true},{text:'Flipkart',isCorrect:false},{text:'Swiggy',isCorrect:false},{text:'Zepto',isCorrect:false}]},
  { category:'General', order:12, question:'Full form of MBA?', options:[{text:'Master of Business Administration',isCorrect:true},{text:'Master of Basic Accounting',isCorrect:false},{text:'Management of Business Affairs',isCorrect:false},{text:'Master of Banking Administration',isCorrect:false}]},
  { category:'General', order:13, question:'Which is NOT a function of management?', options:[{text:'Purchasing raw materials only',isCorrect:true},{text:'Planning',isCorrect:false},{text:'Organising',isCorrect:false},{text:'Controlling',isCorrect:false}]},
  { category:'General', order:14, question:'GST stands for?', options:[{text:'Goods and Services Tax',isCorrect:true},{text:'General Sales Transaction',isCorrect:false},{text:'Government Sales Tax',isCorrect:false},{text:'Gross Service Tax',isCorrect:false}]},
  { category:'General', order:15, question:'Which sector is considered primary industry?', options:[{text:'Agriculture',isCorrect:true},{text:'Software Development',isCorrect:false},{text:'Banking',isCorrect:false},{text:'Retail',isCorrect:false}]},

  // ONLINE PG
  { category:'Online PG', order:1,  question:'What is the primary goal of Strategic Management?', options:[{text:'Long-term direction and competitive advantage',isCorrect:true},{text:'Short-term profit maximisation',isCorrect:false},{text:'Employee performance evaluation',isCorrect:false},{text:'Product distribution',isCorrect:false}]},
  { category:'Online PG', order:2,  question:'NPV in finance stands for?', options:[{text:'Net Present Value',isCorrect:true},{text:'Net Profit Variation',isCorrect:false},{text:'Nominal Price Value',isCorrect:false},{text:'Net Portfolio Value',isCorrect:false}]},
  { category:'Online PG', order:3,  question:'SWOT analysis evaluates?', options:[{text:'Strengths, Weaknesses, Opportunities, Threats',isCorrect:true},{text:'Sales, Wages, Operations, Technology',isCorrect:false},{text:'Strategy, Work, Output, Target',isCorrect:false},{text:'Supply, Workforce, Organisation, Trade',isCorrect:false}]},
  { category:'Online PG', order:4,  question:'ROI stands for?', options:[{text:'Return on Investment',isCorrect:true},{text:'Rate of Interest',isCorrect:false},{text:'Revenue of Income',isCorrect:false},{text:'Return of Inventory',isCorrect:false}]},
  { category:'Online PG', order:5,  question:'MCA is primarily a degree in?', options:[{text:'Computer Applications',isCorrect:true},{text:'Commerce and Accounts',isCorrect:false},{text:'Civil Administration',isCorrect:false},{text:'Chemical Analysis',isCorrect:false}]},
  { category:'Online PG', order:6,  question:'A balance sheet shows?', options:[{text:'Assets and liabilities at a point in time',isCorrect:true},{text:'Only profits',isCorrect:false},{text:'Only sales revenue',isCorrect:false},{text:'Employee salaries',isCorrect:false}]},
  { category:'Online PG', order:7,  question:'ERP stands for?', options:[{text:'Enterprise Resource Planning',isCorrect:true},{text:'Extended Revenue Process',isCorrect:false},{text:'Employee Reward Program',isCorrect:false},{text:'Equity Return Projection',isCorrect:false}]},
  { category:'Online PG', order:8,  question:'Big Data analytics is mostly used for?', options:[{text:'Extracting insights from large datasets',isCorrect:true},{text:'Designing logos',isCorrect:false},{text:'Writing poems',isCorrect:false},{text:'Physical manufacturing',isCorrect:false}]},
  { category:'Online PG', order:9,  question:'Porter\'s Five Forces does NOT include?', options:[{text:'Corporate culture',isCorrect:true},{text:'Threat of new entrants',isCorrect:false},{text:'Bargaining power of buyers',isCorrect:false},{text:'Competitive rivalry',isCorrect:false}]},
  { category:'Online PG', order:10, question:'A P&L statement shows?', options:[{text:'Profit and loss over a period',isCorrect:true},{text:'Only assets',isCorrect:false},{text:'Only liabilities',isCorrect:false},{text:'Employee headcount',isCorrect:false}]},
  { category:'Online PG', order:11, question:'Penetration pricing means?', options:[{text:'Pricing below cost to gain market share',isCorrect:true},{text:'Highest price to target premium customers',isCorrect:false},{text:'Bundle products together',isCorrect:false},{text:'Pricing equal to competitors',isCorrect:false}]},
  { category:'Online PG', order:12, question:'Supply chain management deals with?', options:[{text:'Flow of goods from producer to consumer',isCorrect:true},{text:'Financial investments',isCorrect:false},{text:'Advertising campaigns',isCorrect:false},{text:'Recruitment process',isCorrect:false}]},
  { category:'Online PG', order:13, question:'Which of these is a postgraduate degree?', options:[{text:'MBA',isCorrect:true},{text:'BBA',isCorrect:false},{text:'BCA',isCorrect:false},{text:'B.Com',isCorrect:false}]},
  { category:'Online PG', order:14, question:'Marketing concept focuses on?', options:[{text:'Customer needs',isCorrect:true},{text:'Production efficiency',isCorrect:false},{text:'Aggressive selling',isCorrect:false},{text:'Product innovation only',isCorrect:false}]},
  { category:'Online PG', order:15, question:'Working capital is calculated as?', options:[{text:'Current Assets minus Current Liabilities',isCorrect:true},{text:'Total Assets minus Total Liabilities',isCorrect:false},{text:'Fixed Assets plus Current Assets',isCorrect:false},{text:'Revenue minus Expenses',isCorrect:false}]},

  // ONLINE UG
  { category:'Online UG', order:1,  question:'BBA stands for?', options:[{text:'Bachelor of Business Administration',isCorrect:true},{text:'Bachelor of Basic Accounting',isCorrect:false},{text:'Business and Banking Administration',isCorrect:false},{text:'Board of Business Affairs',isCorrect:false}]},
  { category:'Online UG', order:2,  question:'BCA is a degree in?', options:[{text:'Computer Applications',isCorrect:true},{text:'Commerce and Accounts',isCorrect:false},{text:'Civil Architecture',isCorrect:false},{text:'Cooperative Administration',isCorrect:false}]},
  { category:'Online UG', order:3,  question:'Which of these is an output device?', options:[{text:'Monitor',isCorrect:true},{text:'Keyboard',isCorrect:false},{text:'Mouse',isCorrect:false},{text:'Scanner',isCorrect:false}]},
  { category:'Online UG', order:4,  question:'MS Excel is used for?', options:[{text:'Spreadsheets and calculations',isCorrect:true},{text:'Video editing',isCorrect:false},{text:'Photo editing',isCorrect:false},{text:'Email management',isCorrect:false}]},
  { category:'Online UG', order:5,  question:'Income tax in India is collected by?', options:[{text:'Income Tax Department',isCorrect:true},{text:'RBI',isCorrect:false},{text:'SEBI',isCorrect:false},{text:'NABARD',isCorrect:false}]},
  { category:'Online UG', order:6,  question:'HTML is used to create?', options:[{text:'Web pages',isCorrect:true},{text:'Mobile apps only',isCorrect:false},{text:'Desktop software',isCorrect:false},{text:'Databases',isCorrect:false}]},
  { category:'Online UG', order:7,  question:'A debit card is directly linked to your?', options:[{text:'Bank account',isCorrect:true},{text:'Credit limit',isCorrect:false},{text:'Investment portfolio',isCorrect:false},{text:'Insurance policy',isCorrect:false}]},
  { category:'Online UG', order:8,  question:'Double entry bookkeeping means?', options:[{text:'Every transaction has a debit and a credit',isCorrect:true},{text:'Recording transactions twice in the same column',isCorrect:false},{text:'Two separate books of accounts',isCorrect:false},{text:'Two accountants check each entry',isCorrect:false}]},
  { category:'Online UG', order:9,  question:'Which language is called the mother of all programming languages?', options:[{text:'C',isCorrect:true},{text:'Python',isCorrect:false},{text:'Java',isCorrect:false},{text:'BASIC',isCorrect:false}]},
  { category:'Online UG', order:10, question:'Full form of URL?', options:[{text:'Uniform Resource Locator',isCorrect:true},{text:'Universal Record Link',isCorrect:false},{text:'Unified Resource Layout',isCorrect:false},{text:'Unique Reference Link',isCorrect:false}]},
  { category:'Online UG', order:11, question:'Which Indian stock exchange is the oldest?', options:[{text:'BSE (Bombay Stock Exchange)',isCorrect:true},{text:'NSE',isCorrect:false},{text:'MCX',isCorrect:false},{text:'NCDEX',isCorrect:false}]},
  { category:'Online UG', order:12, question:'B.Com is a degree in?', options:[{text:'Commerce',isCorrect:true},{text:'Computer science',isCorrect:false},{text:'Communication',isCorrect:false},{text:'Civil engineering',isCorrect:false}]},
  { category:'Online UG', order:13, question:'RAM stands for?', options:[{text:'Random Access Memory',isCorrect:true},{text:'Read Access Memory',isCorrect:false},{text:'Rapid Access Module',isCorrect:false},{text:'Random Application Memory',isCorrect:false}]},
  { category:'Online UG', order:14, question:'Which of these is NOT an accounting principle?', options:[{text:'Social media marketing',isCorrect:true},{text:'Going concern',isCorrect:false},{text:'Consistency',isCorrect:false},{text:'Accrual',isCorrect:false}]},
  { category:'Online UG', order:15, question:'CGPA stands for?', options:[{text:'Cumulative Grade Point Average',isCorrect:true},{text:'Central Grade Point Assessment',isCorrect:false},{text:'College Grade Point Average',isCorrect:false},{text:'Combined Grade Point Analysis',isCorrect:false}]},

  // CREDIT TRANSFER
  { category:'Credit Transfer', order:1,  question:'Credit transfer allows students to?', options:[{text:'Move credits earned at one institution to another',isCorrect:true},{text:'Get extra marks in exams',isCorrect:false},{text:'Transfer money between accounts',isCorrect:false},{text:'Change their exam date',isCorrect:false}]},
  { category:'Credit Transfer', order:2,  question:'B.Tech is a degree in?', options:[{text:'Engineering and Technology',isCorrect:true},{text:'Business Technology',isCorrect:false},{text:'Biotechnology only',isCorrect:false},{text:'Biomedical Technology',isCorrect:false}]},
  { category:'Credit Transfer', order:3,  question:'LMS stands for?', options:[{text:'Learning Management System',isCorrect:true},{text:'Library Management Software',isCorrect:false},{text:'Local Management Service',isCorrect:false},{text:'Labour Management System',isCorrect:false}]},
  { category:'Credit Transfer', order:4,  question:'Which body approves engineering colleges in India?', options:[{text:'AICTE',isCorrect:true},{text:'UGC',isCorrect:false},{text:'NAAC',isCorrect:false},{text:'NCTE',isCorrect:false}]},
  { category:'Credit Transfer', order:5,  question:'A semester is typically how many months?', options:[{text:'6 months',isCorrect:true},{text:'3 months',isCorrect:false},{text:'12 months',isCorrect:false},{text:'9 months',isCorrect:false}]},
  { category:'Credit Transfer', order:6,  question:'Lateral entry in engineering allows joining at?', options:[{text:'2nd year (3rd semester)',isCorrect:true},{text:'1st year',isCorrect:false},{text:'3rd year',isCorrect:false},{text:'4th year',isCorrect:false}]},
  { category:'Credit Transfer', order:7,  question:'Which of these is a distance education university?', options:[{text:'IGNOU',isCorrect:true},{text:'IIT Delhi',isCorrect:false},{text:'AIIMS',isCorrect:false},{text:'NIT Trichy',isCorrect:false}]},
  { category:'Credit Transfer', order:8,  question:'A transcript is?', options:[{text:'Official record of academic grades',isCorrect:true},{text:'A type of degree certificate',isCorrect:false},{text:'A study guide',isCorrect:false},{text:'An admission form',isCorrect:false}]},
  { category:'Credit Transfer', order:9,  question:'ODL in education stands for?', options:[{text:'Open and Distance Learning',isCorrect:true},{text:'Online Degree Licensing',isCorrect:false},{text:'Optional Distance Learning',isCorrect:false},{text:'Organised Digital Learning',isCorrect:false}]},
  { category:'Credit Transfer', order:10, question:'Diploma programmes are usually of duration?', options:[{text:'1–2 years',isCorrect:true},{text:'4 years',isCorrect:false},{text:'6 years',isCorrect:false},{text:'Only 3 months',isCorrect:false}]},
  { category:'Credit Transfer', order:11, question:'Which ministry governs higher education in India?', options:[{text:'Ministry of Education',isCorrect:true},{text:'Ministry of Finance',isCorrect:false},{text:'Ministry of Science and Technology',isCorrect:false},{text:'Ministry of Labour',isCorrect:false}]},
  { category:'Credit Transfer', order:12, question:'Equivalence in credit transfer means?', options:[{text:'Matching credits from different institutions as equivalent',isCorrect:true},{text:'Equal marks in all subjects',isCorrect:false},{text:'Same fee structure',isCorrect:false},{text:'Equal number of students',isCorrect:false}]},
  { category:'Credit Transfer', order:13, question:'GPA of 10 is approximately equal to what percentage?', options:[{text:'95–100%',isCorrect:true},{text:'70–75%',isCorrect:false},{text:'80–85%',isCorrect:false},{text:'60–65%',isCorrect:false}]},
  { category:'Credit Transfer', order:14, question:'UGC-DEB stands for?', options:[{text:'University Grants Commission – Distance Education Bureau',isCorrect:true},{text:'Unified Government Council – Distance Education Board',isCorrect:false},{text:'University General Committee – Digital Education Branch',isCorrect:false},{text:'Union Grants Council – Degree Education Board',isCorrect:false}]},
  { category:'Credit Transfer', order:15, question:'Which of these is NOT a type of higher education?', options:[{text:'Primary school',isCorrect:true},{text:'Undergraduate',isCorrect:false},{text:'Postgraduate',isCorrect:false},{text:'Doctoral',isCorrect:false}]},
];

async function seed() {
  console.log('Connecting to MongoDB...');
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected to Atlas');
  } catch {
    console.log('Atlas unreachable, using local MongoDB...');
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    const mem = await MongoMemoryServer.create();
    await mongoose.connect(mem.getUri());
    console.log('Connected to local MongoDB (NOTE: data lost on restart)');
  }

  await ScholarshipQuestion.deleteMany({});
  console.log('Cleared old questions');

  await ScholarshipQuestion.insertMany(questions);
  console.log(`Seeded ${questions.length} questions`);

  const existing = await ScholarshipConfig.findOne({});
  if (!existing) {
    await ScholarshipConfig.create({
      tiers: [
        { minScore: 40, amount: 1000, label: 'Bronze Scholar' },
        { minScore: 60, amount: 2000, label: 'Silver Scholar' },
        { minScore: 80, amount: 3000, label: 'Gold Scholar' },
      ],
      voucherValidityDays: 90,
      passingScore: 40,
      totalQuestionsForScore: 10,
    });
    console.log('Created default scholarship config');
  }

  const counts = await ScholarshipQuestion.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]);
  console.log('\nQuestions by category:');
  counts.forEach(c => console.log(`  ${c._id}: ${c.count}`));

  await mongoose.disconnect();
  console.log('\nDone!');
}

seed().catch(e => { console.error('Failed:', e.message); process.exit(1); });
