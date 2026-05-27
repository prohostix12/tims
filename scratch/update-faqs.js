require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected');

  const FaqSchema = new mongoose.Schema({
    question: String, answer: String,
    order: { type: Number, default: 0 },
    status: { type: String, default: 'active' },
  }, { timestamps: true });

  const Faq = mongoose.models.Faq || mongoose.model('Faq', FaqSchema);

  // Clear existing FAQs
  await Faq.deleteMany({});
  console.log('Cleared existing FAQs');

  const faqs = [
    {
      question: "What is Find Your University?",
      answer: "Find Your University is India's No.1 course finding platform that helps students discover the right university and programme based on their goals, budget, and eligibility. We partner with 90+ UGC-approved universities across India.",
      order: 1,
    },
    {
      question: "Is this platform free to use?",
      answer: "Yes, Find Your University is completely free for students. Our Course Finder tool, university listings, and expert counselling consultations are all provided at no cost.",
      order: 2,
    },
    {
      question: "How does the Course Finder work?",
      answer: "Our intelligent Course Finder asks you 10 targeted questions about your qualifications, study mode preference, field of interest, budget, and career goals. It then matches you with the most suitable programmes from our partner universities in real time.",
      order: 3,
    },
    {
      question: "Are the universities listed UGC approved?",
      answer: "Yes. Every university listed on our platform is UGC-recognised and NAAC-accredited. Degrees obtained through our partner universities are valid for employment, higher studies, and government job applications.",
      order: 4,
    },
    {
      question: "Can I study online or through distance mode?",
      answer: "Absolutely. We feature both online and distance learning programmes from top universities, making it easy for working professionals, homemakers, and students in remote areas to pursue higher education flexibly.",
      order: 5,
    },
    {
      question: "How do I apply for admission through this platform?",
      answer: "Simply use the Course Finder or browse our university listings, choose your preferred programme, and click Enquire. Our counsellors will contact you and guide you through the entire admission process.",
      order: 6,
    },
    {
      question: "What types of programmes are available?",
      answer: "We list programmes at every level — SSLC, Plus Two, UG (BA, B.Com, BBA, BCA, B.Sc, B.Tech), PG (MBA, MCA, MA, M.Com), Diplomas, and PhD programmes across streams like Management, IT, Arts, Science, Commerce, and Law.",
      order: 7,
    },
  ];

  for (const f of faqs) {
    await Faq.create(f);
    console.log('Created FAQ:', f.question);
  }

  console.log('\nAll FAQs updated!');
  await mongoose.disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
