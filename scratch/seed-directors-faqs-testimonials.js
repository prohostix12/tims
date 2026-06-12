require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  // ── Models ────────────────────────────────────────────────
  const DirectorSchema = new mongoose.Schema({
    name: String, role: String, bio: String, image: String,
    order: { type: Number, default: 0 },
    status: { type: String, default: 'active' },
  }, { timestamps: true });

  const FaqSchema = new mongoose.Schema({
    question: String, answer: String,
    order: { type: Number, default: 0 },
    status: { type: String, default: 'active' },
  }, { timestamps: true });

  const TestimonialSchema = new mongoose.Schema({
    name: String, role: String, avatar: String,
    rating: { type: Number, default: 5 },
    text: String,
    status: { type: String, default: 'active' },
  }, { timestamps: true });

  const Director = mongoose.models.Director || mongoose.model('Director', DirectorSchema);
  const Faq = mongoose.models.Faq || mongoose.model('Faq', FaqSchema);
  const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);

  // ── Directors ─────────────────────────────────────────────
  const directors = [
    {
      name: "Adv. ShoukathAli Pootheri",
      role: "Founder & Director",
      image: "/images/Adv-ShoukathAli-pootheri.jpg",
      bio: "A visionary legal professional and educator, Adv. ShoukathAli Pootheri founded TIMS Education in 2009 with a bold mission to make higher education accessible to all.",
      order: 1,
    },
    {
      name: "Nabeel CM",
      role: "Managing Director",
      image: "/images/Nabeel-cm.jpg",
      bio: "Driving the strategic growth of TIMS Education, Nabeel CM brings exceptional leadership in institutional management and student success initiatives.",
      order: 2,
    },
    {
      name: "Mohamed Shameem",
      role: "CEO & Director",
      image: "/images/Mohamed-shameem.jpg",
      bio: "As CEO, Mohamed Shameem leads TIMS Education's expansion efforts, forging partnerships with renowned global universities.",
      order: 3,
    },
  ];

  for (const d of directors) {
    await Director.findOneAndUpdate({ name: d.name }, d, { upsert: true, new: true });
    console.log('Upserted director:', d.name);
  }

  // ── FAQs ──────────────────────────────────────────────────
  const faqs = [
    {
      question: "What is Find Your University?",
      answer: "Find Your University is a leading distance and online higher education platform that simplifies the university discovery process. We partner with over 90 UGC-approved universities to connect students with flexible, accessible, and high-quality academic programs that fit their career goals, eligibility, and budget.",
      order: 1,
    },
    {
      question: "Are degrees recognized?",
      answer: "Yes, we partner with UGC-recognized universities to ensure your degrees are valid for employment and higher studies.",
      order: 2,
    },
    {
      question: "Do you offer scholarships?",
      answer: "Yes, we offer scholarships for financially disadvantaged and high-achieving students.",
      order: 3,
    },
    {
      question: "Can I study while working?",
      answer: "Absolutely. Our distance and online programs are designed specifically for working professionals who want to upgrade their qualifications without leaving their jobs.",
      order: 4,
    },
    {
      question: "What universities do you partner with?",
      answer: "We partner with over 90 UGC-approved universities including GLA University, Swami Vivekananda Subharti University, Andhra University, and many more.",
      order: 5,
    },
  ];

  for (const f of faqs) {
    await Faq.findOneAndUpdate({ question: f.question }, f, { upsert: true, new: true });
    console.log('Upserted FAQ:', f.question);
  }

  // ── Testimonials ──────────────────────────────────────────
  const testimonials = [
    { name: 'Aisha Raheem', role: 'MBA Graduate, Dubai', avatar: 'A', rating: 5, text: 'TIMS transformed my career. The distance MBA program was incredibly flexible and the faculty support was world-class. I went from a junior executive to a regional manager within a year of graduating.' },
    { name: 'Rahul Nair', role: 'B.Tech Graduate, Bangalore', avatar: 'R', rating: 5, text: "The credit transfer guidance from TIMS was exceptional. They helped me transition my Indian engineering degree to a Canadian university seamlessly. Couldn't have done it without their team." },
    { name: 'Priya Menon', role: 'BBA Graduate, Kochi', avatar: 'P', rating: 5, text: 'I completed my BBA through distance learning while working full-time. TIMS made it possible with their structured study materials and responsive support. Highly recommended for working professionals.' },
    { name: 'Mohammed Ashik', role: 'NIOS Graduate, Thrissur', avatar: 'M', rating: 5, text: 'I had failed my board exams twice. TIMS guided me through the NIOS pathway and I passed with distinction. Their coaching and mock tests gave me the confidence I needed to succeed.' },
    { name: 'Sreeja Thomas', role: 'MCA Graduate, Trivandrum', avatar: 'S', rating: 5, text: 'The attestation services at TIMS are outstanding. They handled all my documents for UAE employment, from state authentication to Embassy legalisation, within 7 days as promised.' },
    { name: 'Arjun Pillai', role: 'MBA Graduate, Abu Dhabi', avatar: 'A', rating: 5, text: 'TIMS opened doors I never knew existed. Their international university partnerships gave me access to a globally recognised MBA that is respected by employers across the Gulf.' },
    { name: 'Fatima Al Rashid', role: 'B.Com Graduate, Calicut', avatar: 'F', rating: 5, text: 'I chose TIMS for their reputation and was not disappointed. The admission counsellors were honest, helpful and guided me to the right program without pushing unnecessary courses.' },
    { name: 'Vineeth Kumar', role: 'Diploma in Data Science', avatar: 'V', rating: 5, text: 'The Data Science diploma from TIMS gave me practical skills that I applied immediately at my workplace. The curriculum is modern, relevant and delivered by industry experts.' },
  ];

  for (const t of testimonials) {
    await Testimonial.findOneAndUpdate({ name: t.name, role: t.role }, t, { upsert: true, new: true });
    console.log('Upserted testimonial:', t.name);
  }

  console.log('\nAll done!');
  await mongoose.disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
