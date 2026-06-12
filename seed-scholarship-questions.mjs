import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load from .env.local first, then .env
dotenv.config({ path: path.join(__dirname, '.env.local') });
dotenv.config({ path: path.join(__dirname, '.env') });

const ScholarshipQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ text: { type: String, required: true }, isCorrect: { type: Boolean, default: false } }],
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  category: { type: String, enum: ['Online UG', 'Online PG', 'Credit Transfer', 'SIDP (Skill Integrated Diploma Programs)', 'Diploma', 'General'], default: 'General' },
}, { timestamps: true });

const ScholarshipQuestion = mongoose.models.ScholarshipQuestion || 
  mongoose.model('ScholarshipQuestion', ScholarshipQuestionSchema);

const onlineUGQuestions = [
  {
    question: 'What is the primary advantage of online undergraduate programs?',
    category: 'Online UG',
    order: 1,
    options: [
      { text: 'Flexibility to study at your own pace and schedule', isCorrect: true },
      { text: 'Lower quality of education compared to in-person', isCorrect: false },
      { text: 'No need for any study effort', isCorrect: false },
      { text: 'Automatic job placement after graduation', isCorrect: false },
    ],
  },
  {
    question: 'Which of the following is NOT a requirement for online UG programs?',
    category: 'Online UG',
    order: 2,
    options: [
      { text: 'Regular attendance at campus', isCorrect: true },
      { text: 'Internet connection', isCorrect: false },
      { text: 'Self-discipline and time management', isCorrect: false },
      { text: 'Completion of assignments and examinations', isCorrect: false },
    ],
  },
  {
    question: 'What is the typical duration of an online bachelor\'s degree?',
    category: 'Online UG',
    order: 3,
    options: [
      { text: '3-4 years', isCorrect: true },
      { text: '6-8 months', isCorrect: false },
      { text: '10-12 years', isCorrect: false },
      { text: '2 months', isCorrect: false },
    ],
  },
  {
    question: 'How are exams typically conducted in online undergraduate programs?',
    category: 'Online UG',
    order: 4,
    options: [
      { text: 'Through a secure online platform or at designated centers', isCorrect: true },
      { text: 'Only through assignments and projects', isCorrect: false },
      { text: 'There are no exams in online programs', isCorrect: false },
      { text: 'Only through group discussions', isCorrect: false },
    ],
  },
  {
    question: 'Which subject stream is commonly offered in online UG programs?',
    category: 'Online UG',
    order: 5,
    options: [
      { text: 'Commerce, Science, and Arts', isCorrect: true },
      { text: 'Only Medical courses', isCorrect: false },
      { text: 'Only Engineering courses', isCorrect: false },
      { text: 'Only Law courses', isCorrect: false },
    ],
  },
  {
    question: 'What is a key skill required for success in online undergraduate education?',
    category: 'Online UG',
    order: 6,
    options: [
      { text: 'Self-motivation and discipline', isCorrect: true },
      { text: 'Ability to travel frequently', isCorrect: false },
      { text: 'Having a high salary job', isCorrect: false },
      { text: 'Speaking multiple foreign languages', isCorrect: false },
    ],
  },
  {
    question: 'Are online UG degrees recognized by employers?',
    category: 'Online UG',
    order: 7,
    options: [
      { text: 'Yes, if from UGC-approved universities', isCorrect: true },
      { text: 'No, employers only prefer in-campus degrees', isCorrect: false },
      { text: 'Only by foreign companies', isCorrect: false },
      { text: 'Degrees are not issued in online programs', isCorrect: false },
    ],
  },
  {
    question: 'What is the estimated annual fee for an online bachelor\'s degree?',
    category: 'Online UG',
    order: 8,
    options: [
      { text: '₹20,000 - ₹80,000', isCorrect: true },
      { text: '₹10,00,000 - ₹20,00,000', isCorrect: false },
      { text: '₹5,00,000 - ₹10,00,000', isCorrect: false },
      { text: 'Free with no charges', isCorrect: false },
    ],
  },
  {
    question: 'Can you pursue an online UG degree while working full-time?',
    category: 'Online UG',
    order: 9,
    options: [
      { text: 'Yes, that is one of the main advantages', isCorrect: true },
      { text: 'No, you must quit your job', isCorrect: false },
      { text: 'Only if you take a leave of absence', isCorrect: false },
      { text: 'No online programs allow working students', isCorrect: false },
    ],
  },
  {
    question: 'What type of content is typically provided in online UG programs?',
    category: 'Online UG',
    order: 10,
    options: [
      { text: 'Video lectures, e-books, assignments, and live sessions', isCorrect: true },
      { text: 'Only printed books without any videos', isCorrect: false },
      { text: 'No study material is provided', isCorrect: false },
      { text: 'Only live classroom sessions', isCorrect: false },
    ],
  },
  {
    question: 'What does "UGC-DEB" stand for in Indian higher education?',
    category: 'Online UG',
    order: 11,
    options: [
      { text: 'University Grants Commission - Distance Education Bureau', isCorrect: true },
      { text: 'Under Graduate Course - Department of Education Board', isCorrect: false },
      { text: 'University Governance Council - Degree Evaluation Bureau', isCorrect: false },
      { text: 'Union General Committee of Distance Exams', isCorrect: false },
    ],
  },
  {
    question: 'Which of the following is an example of an online undergraduate course?',
    category: 'Online UG',
    order: 12,
    options: [
      { text: 'BBA or BCA', isCorrect: true },
      { text: 'Doctor of Medicine (MD)', isCorrect: false },
      { text: 'PhD in Research', isCorrect: false },
      { text: 'M.Tech in Nanotechnology', isCorrect: false },
    ],
  },
  {
    question: 'What is the main medium of instruction in most online UG courses in India?',
    category: 'Online UG',
    order: 13,
    options: [
      { text: 'English or regional language digital content', isCorrect: true },
      { text: 'Only Sanskrit language lectures', isCorrect: false },
      { text: 'Foreign languages like French', isCorrect: false },
      { text: 'Physical classrooms only', isCorrect: false },
    ],
  },
  {
    question: 'Which of the following is a benefit of online UG programs over traditional programs?',
    category: 'Online UG',
    order: 14,
    options: [
      { text: 'Affordable fees and self-paced learning flexibility', isCorrect: true },
      { text: 'Compulsory daily travel expenses', isCorrect: false },
      { text: 'Requires full-time classroom sitting', isCorrect: false },
      { text: 'No exams are required at all', isCorrect: false },
    ],
  },
  {
    question: 'What technology is essential for attending online UG classes?',
    category: 'Online UG',
    order: 15,
    options: [
      { text: 'A computer or smartphone with stable internet', isCorrect: true },
      { text: 'A satellite television connection', isCorrect: false },
      { text: 'A VR gaming console', isCorrect: false },
      { text: 'No technology is needed', isCorrect: false },
    ],
  },
  {
    question: 'How do online UG programs verify student identity during exams?',
    category: 'Online UG',
    order: 16,
    options: [
      { text: 'Online proctoring using webcams and AI tools', isCorrect: true },
      { text: 'Using physical signature on paper only', isCorrect: false },
      { text: 'No verification is done', isCorrect: false },
      { text: 'By submitting phone recordings', isCorrect: false },
    ],
  },
  {
    question: 'What is the minimum eligibility criteria for admission into a UG program in India?',
    category: 'Online UG',
    order: 17,
    options: [
      { text: '10+2 passing certificate', isCorrect: true },
      { text: 'Bachelor\'s degree completion', isCorrect: false },
      { text: '10 years of work experience', isCorrect: false },
      { text: 'Post-graduation degree', isCorrect: false },
    ],
  },
  {
    question: 'Are printed textbooks usually provided in purely online UG courses?',
    category: 'Online UG',
    order: 18,
    options: [
      { text: 'They are optional, as digital study material is the norm', isCorrect: true },
      { text: 'They are strictly compulsory for all students', isCorrect: false },
      { text: 'Printed books are never allowed', isCorrect: false },
      { text: 'Books are not used in online courses', isCorrect: false },
    ],
  },
  {
    question: 'Which of the following describes the interaction in online UG courses?',
    category: 'Online UG',
    order: 19,
    options: [
      { text: 'Asynchronous forum discussions and synchronous live classes', isCorrect: true },
      { text: 'In-person classroom group projects only', isCorrect: false },
      { text: 'No interaction is possible between students and faculty', isCorrect: false },
      { text: 'Only via post letters', isCorrect: false },
    ],
  },
  {
    question: 'What is the maximum duration typically allowed to complete a 3-year online UG degree?',
    category: 'Online UG',
    order: 20,
    options: [
      { text: '5 to 6 years', isCorrect: true },
      { text: 'Exactly 3 years only', isCorrect: false },
      { text: '10 years', isCorrect: false },
      { text: 'Infinite years', isCorrect: false },
    ],
  },
];

const onlinePGQuestions = [
  {
    question: 'What is the primary benefit of pursuing an online postgraduate degree?',
    category: 'Online PG',
    order: 1,
    options: [
      { text: 'Career advancement while maintaining current employment', isCorrect: true },
      { text: 'No need to study or attend classes', isCorrect: false },
      { text: 'Automatic promotion at your job', isCorrect: false },
      { text: 'Guaranteed high salary', isCorrect: false },
    ],
  },
  {
    question: 'What is the typical duration of an online master\'s degree?',
    category: 'Online PG',
    order: 2,
    options: [
      { text: '2 years', isCorrect: true },
      { text: '1 month', isCorrect: false },
      { text: '5 years', isCorrect: false },
      { text: '10 years', isCorrect: false },
    ],
  },
  {
    question: 'Which qualification is prerequisite for online postgraduate programs?',
    category: 'Online PG',
    order: 3,
    options: [
      { text: 'Bachelor\'s degree or equivalent', isCorrect: true },
      { text: '10th pass', isCorrect: false },
      { text: 'No prior qualification needed', isCorrect: false },
      { text: 'A diploma only', isCorrect: false },
    ],
  },
  {
    question: 'What are popular online postgraduate programs?',
    category: 'Online PG',
    order: 4,
    options: [
      { text: 'MBA, MCA, M.Com, M.Sc, MA', isCorrect: true },
      { text: 'Only MBA programs', isCorrect: false },
      { text: 'Only Certificate courses', isCorrect: false },
      { text: 'Only Diploma programs', isCorrect: false },
    ],
  },
  {
    question: 'Are online master\'s degrees valued by international employers?',
    category: 'Online PG',
    order: 5,
    options: [
      { text: 'Yes, especially from reputed universities', isCorrect: true },
      { text: 'No, only in-person degrees are valued', isCorrect: false },
      { text: 'Only if obtained from foreign universities', isCorrect: false },
      { text: 'International employers do not hire PG graduates', isCorrect: false },
    ],
  },
  {
    question: 'What is a typical annual fee for online postgraduate programs?',
    category: 'Online PG',
    order: 6,
    options: [
      { text: '₹30,000 - ₹1,00,000', isCorrect: true },
      { text: '₹1,00,000 - ₹50,00,000', isCorrect: false },
      { text: '₹5,00,000 - ₹20,00,000', isCorrect: false },
      { text: 'Always free', isCorrect: false },
    ],
  },
  {
    question: 'Can online postgraduate students apply for scholarships?',
    category: 'Online PG',
    order: 7,
    options: [
      { text: 'Yes, many universities offer scholarships', isCorrect: true },
      { text: 'No scholarships available for online students', isCorrect: false },
      { text: 'Only for international students', isCorrect: false },
      { text: 'Only for part-time students', isCorrect: false },
    ],
  },
  {
    question: 'What skills do online postgraduate programs typically develop?',
    category: 'Online PG',
    order: 8,
    options: [
      { text: 'Advanced subject knowledge and research skills', isCorrect: true },
      { text: 'Only basic communication skills', isCorrect: false },
      { text: 'No skills are developed in online programs', isCorrect: false },
      { text: 'Only sports and recreational skills', isCorrect: false },
    ],
  },
  {
    question: 'How is thesis/research conducted in online postgraduate programs?',
    category: 'Online PG',
    order: 9,
    options: [
      { text: 'Guided by faculty with flexible submission deadlines', isCorrect: true },
      { text: 'No thesis is required in online programs', isCorrect: false },
      { text: 'Only through in-person supervision', isCorrect: false },
      { text: 'Thesis is not accepted for online degrees', isCorrect: false },
    ],
  },
  {
    question: 'What is the expected ROI (Return on Investment) for online PG degrees?',
    category: 'Online PG',
    order: 10,
    options: [
      { text: 'High career growth and salary increment potential', isCorrect: true },
      { text: 'No career benefits from online PG degrees', isCorrect: false },
      { text: 'Career decline compared to undergraduate', isCorrect: false },
      { text: 'ROI is not applicable for PG degrees', isCorrect: false },
    ],
  },
  {
    question: 'Which organization approves distance and online PG courses in India?',
    category: 'Online PG',
    order: 11,
    options: [
      { text: 'UGC-DEB', isCorrect: true },
      { text: 'NCERT', isCorrect: false },
      { text: 'AICTE only', isCorrect: false },
      { text: 'State Board only', isCorrect: false },
    ],
  },
  {
    question: 'What is the primary objective of an online MBA program?',
    category: 'Online PG',
    order: 12,
    options: [
      { text: 'To build advanced managerial and leadership capabilities', isCorrect: true },
      { text: 'To teach basic coding skills', isCorrect: false },
      { text: 'To prepare for physical security jobs', isCorrect: false },
      { text: 'To avoid any professional training', isCorrect: false },
    ],
  },
  {
    question: 'What does the term "asynchronous learning" mean in online PG education?',
    category: 'Online PG',
    order: 13,
    options: [
      { text: 'Accessing pre-recorded lectures and materials at any time', isCorrect: true },
      { text: 'Attending live classes strictly at 9 AM', isCorrect: false },
      { text: 'Sitting in a laboratory in-person', isCorrect: false },
      { text: 'Doing exams in groups', isCorrect: false },
    ],
  },
  {
    question: 'What is a major criteria for selecting a good online PG program?',
    category: 'Online PG',
    order: 14,
    options: [
      { text: 'Accreditation, NAAC grade, and placement support', isCorrect: true },
      { text: 'The size of the university building', isCorrect: false },
      { text: 'Whether they offer free lunch', isCorrect: false },
      { text: 'Having no teachers in the department', isCorrect: false },
    ],
  },
  {
    question: 'How do online PG students interact with professors?',
    category: 'Online PG',
    order: 15,
    options: [
      { text: 'Via email, chat forums, and live query-resolution sessions', isCorrect: true },
      { text: 'Only by visiting their homes', isCorrect: false },
      { text: 'Interaction is strictly prohibited', isCorrect: false },
      { text: 'Through local newspapers', isCorrect: false },
    ],
  },
  {
    question: 'Which PG course is best suited for working professionals aiming at software engineering management?',
    category: 'Online PG',
    order: 16,
    options: [
      { text: 'Online MCA', isCorrect: true },
      { text: 'Online MA History', isCorrect: false },
      { text: 'Online M.Com', isCorrect: false },
      { text: 'Online B.Sc', isCorrect: false },
    ],
  },
  {
    question: 'Is an online PG degree valid for government job applications in India?',
    category: 'Online PG',
    order: 17,
    options: [
      { text: 'Yes, if the university is recognized by UGC-DEB', isCorrect: true },
      { text: 'No, government jobs never accept online PG', isCorrect: false },
      { text: 'Only if the candidate is already in a government job', isCorrect: false },
      { text: 'Only in state government jobs', isCorrect: false },
    ],
  },
  {
    question: 'What type of projects are online PG students required to submit in the final semester?',
    category: 'Online PG',
    order: 18,
    options: [
      { text: 'Capstone projects or research dissertations', isCorrect: true },
      { text: 'Simple homework exercises only', isCorrect: false },
      { text: 'No projects are required', isCorrect: false },
      { text: 'A report on campus visit', isCorrect: false },
    ],
  },
  {
    question: 'What is the significance of NAAC grading for a university offering online PG?',
    category: 'Online PG',
    order: 19,
    options: [
      { text: 'It indicates the overall quality and standards of the institution', isCorrect: true },
      { text: 'It specifies the number of computer labs', isCorrect: false },
      { text: 'It dictates the university holiday schedule', isCorrect: false },
      { text: 'It is a state tax classification', isCorrect: false },
    ],
  },
  {
    question: 'Which of the following is crucial for managing coursework in an online PG program?',
    category: 'Online PG',
    order: 20,
    options: [
      { text: 'Effective time management and self-study habits', isCorrect: true },
      { text: 'Frequent campus visits', isCorrect: false },
      { text: 'Buying expensive printed encyclopedias', isCorrect: false },
      { text: 'Having a high-speed gaming computer', isCorrect: false },
    ],
  },
];

const creditTransferQuestions = [
  {
    question: 'What is the primary purpose of a credit transfer program?',
    category: 'Credit Transfer',
    order: 1,
    options: [
      { text: 'To recognize previously earned academic credits and complete degree faster', isCorrect: true },
      { text: 'To provide free education', isCorrect: false },
      { text: 'To change your career path completely', isCorrect: false },
      { text: 'To replace your existing degree', isCorrect: false },
    ],
  },
  {
    question: 'Who is eligible for credit transfer programs?',
    category: 'Credit Transfer',
    order: 2,
    options: [
      { text: 'Dropouts, switched students, or those with incomplete degrees', isCorrect: true },
      { text: 'Only fresh high school graduates', isCorrect: false },
      { text: 'Only working professionals', isCorrect: false },
      { text: 'Anyone regardless of previous education', isCorrect: false },
    ],
  },
  {
    question: 'How long does a credit transfer program typically take?',
    category: 'Credit Transfer',
    order: 3,
    options: [
      { text: '1-3 years depending on credits earned', isCorrect: true },
      { text: '10+ years', isCorrect: false },
      { text: 'Always 4 years', isCorrect: false },
      { text: '6 months', isCorrect: false },
    ],
  },
  {
    question: 'What documents are typically required for credit transfer?',
    category: 'Credit Transfer',
    order: 4,
    options: [
      { text: 'Academic transcripts, syllabi, and course descriptions', isCorrect: true },
      { text: 'Only passport copy', isCorrect: false },
      { text: 'No documents required', isCorrect: false },
      { text: 'Only age proof', isCorrect: false },
    ],
  },
  {
    question: 'Can credits from vocational training be transferred?',
    category: 'Credit Transfer',
    order: 5,
    options: [
      { text: 'Yes, if they meet degree requirements', isCorrect: true },
      { text: 'No, vocational credits are never accepted', isCorrect: false },
      { text: 'Only if the training was abroad', isCorrect: false },
      { text: 'Vocational training has no academic value', isCorrect: false },
    ],
  },
  {
    question: 'What is the average cost of a credit transfer program?',
    category: 'Credit Transfer',
    order: 6,
    options: [
      { text: '₹20,000 - ₹80,000 per year', isCorrect: true },
      { text: '₹10,00,000 - ₹20,00,000 per year', isCorrect: false },
      { text: 'Always free', isCorrect: false },
      { text: 'No fee structure exists', isCorrect: false },
    ],
  },
  {
    question: 'How are transferred credits evaluated in a new degree program?',
    category: 'Credit Transfer',
    order: 7,
    options: [
      { text: 'Through transcript evaluation and course mapping by the university', isCorrect: true },
      { text: 'All credits are automatically accepted', isCorrect: false },
      { text: 'No evaluation is done', isCorrect: false },
      { text: 'Credits are never accepted in transfer', isCorrect: false },
    ],
  },
  {
    question: 'Can you pursue a credit transfer program while working?',
    category: 'Credit Transfer',
    order: 8,
    options: [
      { text: 'Yes, flexibility is a key advantage', isCorrect: true },
      { text: 'No, you must be a full-time student', isCorrect: false },
      { text: 'Only if you are unemployed', isCorrect: false },
      { text: 'Working professionals are not eligible', isCorrect: false },
    ],
  },
  {
    question: 'Is a degree obtained through credit transfer recognized?',
    category: 'Credit Transfer',
    order: 9,
    options: [
      { text: 'Yes, fully recognized if from accredited university', isCorrect: true },
      { text: 'No, transfer degrees are not recognized', isCorrect: false },
      { text: 'Only recognized in certain states', isCorrect: false },
      { text: 'Recognition depends on the employer\'s mood', isCorrect: false },
    ],
  },
  {
    question: 'What is the maximum number of credits that can be transferred?',
    category: 'Credit Transfer',
    order: 10,
    options: [
      { text: 'Usually up to 50-60% of total degree credits', isCorrect: true },
      { text: '100% of all credits can be transferred', isCorrect: false },
      { text: 'Only 10% of credits can be transferred', isCorrect: false },
      { text: 'No transfer limit exists', isCorrect: false },
    ],
  },
  {
    question: 'What does "lateral entry" mean in credit transfer?',
    category: 'Credit Transfer',
    order: 11,
    options: [
      { text: 'Joining a program at an advanced level/year based on prior credits', isCorrect: true },
      { text: 'Entering college via side doors', isCorrect: false },
      { text: 'Studying creative lateral thinking courses', isCorrect: false },
      { text: 'Getting a degree without passing secondary school', isCorrect: false },
    ],
  },
  {
    question: 'What is credit mapping?',
    category: 'Credit Transfer',
    order: 12,
    options: [
      { text: 'Matching courses taken at a previous college to courses at the new college', isCorrect: true },
      { text: 'Drawing a map of the college campus layout', isCorrect: false },
      { text: 'Calculating the interest rate on credit cards', isCorrect: false },
      { text: 'Finding out where classrooms are located', isCorrect: false },
    ],
  },
  {
    question: 'Can a student transfer credits from a foreign university to an Indian university?',
    category: 'Credit Transfer',
    order: 13,
    options: [
      { text: 'Yes, subject to AIU recognition and host university approval', isCorrect: true },
      { text: 'No, foreign credits are strictly illegal in India', isCorrect: false },
      { text: 'Only if the student is a foreign national', isCorrect: false },
      { text: 'Yes, but only in engineering fields', isCorrect: false },
    ],
  },
  {
    question: 'What is an official academic transcript?',
    category: 'Credit Transfer',
    order: 14,
    options: [
      { text: 'A certified record of a student\'s academic history issued by their previous institution', isCorrect: true },
      { text: 'A photocopy of class notebook', isCorrect: false },
      { text: 'A syllabus document of courses', isCorrect: false },
      { text: 'A letter of recommendation from head of department', isCorrect: false },
    ],
  },
  {
    question: 'Which body helps in verifying compatibility of international credits in India?',
    category: 'Credit Transfer',
    order: 15,
    options: [
      { text: 'Association of Indian Universities (AIU)', isCorrect: true },
      { text: 'Reserve Bank of India (RBI)', isCorrect: false },
      { text: 'Ministry of External Affairs', isCorrect: false },
      { text: 'Local State Municipal Office', isCorrect: false },
    ],
  },
  {
    question: 'What happens to credits of a course where the student received a failing grade?',
    category: 'Credit Transfer',
    order: 16,
    options: [
      { text: 'Failing grades are not eligible for credit transfer', isCorrect: true },
      { text: 'They are transferred with bonus marks', isCorrect: false },
      { text: 'They are converted to passing marks automatically', isCorrect: false },
      { text: 'They require paying extra fees to transfer', isCorrect: false },
    ],
  },
  {
    question: 'Why might a university reject a credit transfer request?',
    category: 'Credit Transfer',
    order: 17,
    options: [
      { text: 'If the course syllabus or level does not match the new program requirements', isCorrect: true },
      { text: 'If the student has not paid local city taxes', isCorrect: false },
      { text: 'Because of too many students on campus', isCorrect: false },
      { text: 'If the previous college had a different color building', isCorrect: false },
    ],
  },
  {
    question: 'What is the "residency requirement" in a transfer university?',
    category: 'Credit Transfer',
    order: 18,
    options: [
      { text: 'The minimum number of credits a student must earn at the new university to graduate', isCorrect: true },
      { text: 'The type of hostel room the student must live in', isCorrect: false },
      { text: 'The address proof certificate required for admission', isCorrect: false },
      { text: 'Having a permanent home in the same state', isCorrect: false },
    ],
  },
  {
    question: 'Which of the following is a benefit of transferring credits?',
    category: 'Credit Transfer',
    order: 19,
    options: [
      { text: 'Saving money on repeating courses and graduating early', isCorrect: true },
      { text: 'Getting free housing on campus', isCorrect: false },
      { text: 'Automatic exemption from writing final exams', isCorrect: false },
      { text: 'Receiving a scholarship with no eligibility criteria', isCorrect: false },
    ],
  },
  {
    question: 'What is the first step in applying for a credit transfer?',
    category: 'Credit Transfer',
    order: 20,
    options: [
      { text: 'Obtaining official transcripts and submitting them for credit evaluation', isCorrect: true },
      { text: 'Paying the full tuition fee of 3 years', isCorrect: false },
      { text: 'Booking a hostel room', isCorrect: false },
      { text: 'Registering for sports events', isCorrect: false },
    ],
  },
];

const sidpQuestions = [
  {
    question: 'What is the primary focus of SIDP?',
    category: 'SIDP (Skill Integrated Diploma Programs)',
    order: 1,
    options: [
      { text: 'Integrating professional skills with academic programs for employment', isCorrect: true },
      { text: 'Teaching classical music theory only', isCorrect: false },
      { text: 'Completing a pure research PhD in science', isCorrect: false },
      { text: 'Getting a degree with zero study elements', isCorrect: false },
    ],
  },
  {
    question: 'Which course is a popular choice under the SIDP stream?',
    category: 'SIDP (Skill Integrated Diploma Programs)',
    order: 2,
    options: [
      { text: 'BBA + HR Management', isCorrect: true },
      { text: 'MBBS in Surgery', isCorrect: false },
      { text: 'B.Sc in Astrophysics', isCorrect: false },
      { text: 'MA in Ancient History', isCorrect: false },
    ],
  },
  {
    question: 'How does SIDP differ from traditional degrees?',
    category: 'SIDP (Skill Integrated Diploma Programs)',
    order: 3,
    options: [
      { text: 'It includes industry-recognized skill certifications alongside the degree', isCorrect: true },
      { text: 'It is twice as long in duration', isCorrect: false },
      { text: 'It has no final examinations', isCorrect: false },
      { text: 'It requires daily physical lab presence', isCorrect: false },
    ],
  },
  {
    question: 'What is the eligibility for SIDP courses?',
    category: 'SIDP (Skill Integrated Diploma Programs)',
    order: 4,
    options: [
      { text: '10+2 passing certificate from any recognized board', isCorrect: true },
      { text: 'Master\'s degree completion', isCorrect: false },
      { text: '10 years of industrial experience', isCorrect: false },
      { text: 'Pass in a PhD entrance exam', isCorrect: false },
    ],
  },
  {
    question: 'Which industry sector is heavily targeted by BBA + Logistics?',
    category: 'SIDP (Skill Integrated Diploma Programs)',
    order: 5,
    options: [
      { text: 'Supply Chain, Warehouse Management, and Shipping', isCorrect: true },
      { text: 'Healthcare and Hospital operations', isCorrect: false },
      { text: 'Software coding and app development', isCorrect: false },
      { text: 'Agriculture and farming techniques', isCorrect: false },
    ],
  },
  {
    question: 'Who benefits most from a "BBA + Hospital Administration" program?',
    category: 'SIDP (Skill Integrated Diploma Programs)',
    order: 6,
    options: [
      { text: 'Individuals seeking management roles in healthcare and hospitals', isCorrect: true },
      { text: 'Civil engineers designing bridges', isCorrect: false },
      { text: 'Financial stock brokers', isCorrect: false },
      { text: 'Agriculture specialists', isCorrect: false },
    ],
  },
  {
    question: 'What does BCOM + ACCA provide to students?',
    category: 'SIDP (Skill Integrated Diploma Programs)',
    order: 7,
    options: [
      { text: 'A Commerce degree integrated with an internationally recognized accounting qualification', isCorrect: true },
      { text: 'A banking license', isCorrect: false },
      { text: 'A degree in computer architecture', isCorrect: false },
      { text: 'An internship in hospitality only', isCorrect: false },
    ],
  },
  {
    question: 'What does SIDP stand for?',
    category: 'SIDP (Skill Integrated Diploma Programs)',
    order: 8,
    options: [
      { text: 'Skill Integrated Diploma Programs', isCorrect: true },
      { text: 'Student Internship Development Pathway', isCorrect: false },
      { text: 'Secondary Industry Degree Programme', isCorrect: false },
      { text: 'Structured Information Degree Plan', isCorrect: false },
    ],
  },
  {
    question: 'Are internships part of the SIDP curriculum?',
    category: 'SIDP (Skill Integrated Diploma Programs)',
    order: 9,
    options: [
      { text: 'Yes, practical training and internships are highly encouraged', isCorrect: true },
      { text: 'No, internships are strictly forbidden', isCorrect: false },
      { text: 'Internships are only for PG courses', isCorrect: false },
      { text: 'Only observation sessions are allowed', isCorrect: false },
    ],
  },
  {
    question: 'What are the job prospects after completing BBA + Digital Marketing?',
    category: 'SIDP (Skill Integrated Diploma Programs)',
    order: 10,
    options: [
      { text: 'SEO specialist, Social Media Manager, or digital marketing executive', isCorrect: true },
      { text: 'Laboratory analyst', isCorrect: false },
      { text: 'Tax consultant or auditor', isCorrect: false },
      { text: 'Software developer', isCorrect: false },
    ],
  },
  {
    question: 'Which tool is crucial for students studying digital marketing under SIDP?',
    category: 'SIDP (Skill Integrated Diploma Programs)',
    order: 11,
    options: [
      { text: 'Google Analytics and search engine marketing tools', isCorrect: true },
      { text: 'AutoCAD software', isCorrect: false },
      { text: 'Mongoose database connector', isCorrect: false },
      { text: 'Excel tally templates only', isCorrect: false },
    ],
  },
  {
    question: 'What is the primary role of an HR Manager trained under BBA + HR?',
    category: 'SIDP (Skill Integrated Diploma Programs)',
    order: 12,
    options: [
      { text: 'Recruiting, training, and managing employee relations', isCorrect: true },
      { text: 'Keeping database servers active', isCorrect: false },
      { text: 'Balancing the balance sheet of the company', isCorrect: false },
      { text: 'Designing advertisement flyers', isCorrect: false },
    ],
  },
  {
    question: 'What type of certification do students receive in addition to the degree in SIDP?',
    category: 'SIDP (Skill Integrated Diploma Programs)',
    order: 13,
    options: [
      { text: 'A professional skill diploma or certificate from partner bodies', isCorrect: true },
      { text: 'A license to practice law', isCorrect: false },
      { text: 'A government clearance certificate', isCorrect: false },
      { text: 'No additional certificates are given', isCorrect: false },
    ],
  },
  {
    question: 'Why is logistics important in modern business?',
    category: 'SIDP (Skill Integrated Diploma Programs)',
    order: 14,
    options: [
      { text: 'It ensures efficient movement and storage of goods and services', isCorrect: true },
      { text: 'It decreases the quality of products', isCorrect: false },
      { text: 'It bypasses the need for customer service departments', isCorrect: false },
      { text: 'It is a form of digital banking security', isCorrect: false },
    ],
  },
  {
    question: 'Which course combines computer application knowledge with business administration under SIDP?',
    category: 'SIDP (Skill Integrated Diploma Programs)',
    order: 15,
    options: [
      { text: 'BBA + Business Management with IT focus', isCorrect: true },
      { text: 'BA Literature', isCorrect: false },
      { text: 'B.Sc Physics', isCorrect: false },
      { text: 'B.Com General', isCorrect: false },
    ],
  },
  {
    question: 'Is the skill diploma under SIDP recognized internationally?',
    category: 'SIDP (Skill Integrated Diploma Programs)',
    order: 16,
    options: [
      { text: 'Yes, many skills are globally certified by partner industry bodies', isCorrect: true },
      { text: 'No, it is only valid in Kerala', isCorrect: false },
      { text: 'Only in neighboring Asian countries', isCorrect: false },
      { text: 'Accreditation depends on the host state university only', isCorrect: false },
    ],
  },
  {
    question: 'What is the typical duration of an SIDP course?',
    category: 'SIDP (Skill Integrated Diploma Programs)',
    order: 17,
    options: [
      { text: '3 Years for integrated bachelor\'s degrees', isCorrect: true },
      { text: '6 months only', isCorrect: false },
      { text: '5 to 6 years', isCorrect: false },
      { text: '1 Year only', isCorrect: false },
    ],
  },
  {
    question: 'How does "BCOM + Advanced Accountants" help in employment?',
    category: 'SIDP (Skill Integrated Diploma Programs)',
    order: 18,
    options: [
      { text: 'Provides hands-on training in tally, taxation, and advanced accounting tools', isCorrect: true },
      { text: 'Qualifies students to become hardware engineers', isCorrect: false },
      { text: 'Teaches web graphics design', isCorrect: false },
      { text: 'It does not help with placements', isCorrect: false },
    ],
  },
  {
    question: 'What is the primary goal of the "BA + MTTC" program under SIDP?',
    category: 'SIDP (Skill Integrated Diploma Programs)',
    order: 19,
    options: [
      { text: 'To train students in travel, tourism, and airline management', isCorrect: true },
      { text: 'To teach advanced physics concepts', isCorrect: false },
      { text: 'To build database architecture skills', isCorrect: false },
      { text: 'To prepare students for corporate banking examinations', isCorrect: false },
    ],
  },
  {
    question: 'Can SIDP students transition to postgraduate studies easily?',
    category: 'SIDP (Skill Integrated Diploma Programs)',
    order: 20,
    options: [
      { text: 'Yes, they receive a fully recognized bachelor\'s degree eligible for PG', isCorrect: true },
      { text: 'No, they must write extra UG courses first', isCorrect: false },
      { text: 'Only if they complete a 1-year internship abroad', isCorrect: false },
      { text: 'SIDP graduates are not eligible for post-graduation', isCorrect: false },
    ],
  },
];

const diplomaQuestions = [
  {
    question: 'What is the typical duration of a standalone professional diploma program?',
    category: 'Diploma',
    order: 1,
    options: [
      { text: '1 Year', isCorrect: true },
      { text: '4 Years', isCorrect: false },
      { text: '1 Month', isCorrect: false },
      { text: '10 Years', isCorrect: false },
    ],
  },
  {
    question: 'Which of the following is a popular diploma course in the technology sector?',
    category: 'Diploma',
    order: 2,
    options: [
      { text: 'Diploma in IT or Cyber Security', isCorrect: true },
      { text: 'Diploma in History', isCorrect: false },
      { text: 'Diploma in General Arts', isCorrect: false },
      { text: 'Diploma in Dental Surgery', isCorrect: false },
    ],
  },
  {
    question: 'What is the entry-level eligibility for most professional diploma courses?',
    category: 'Diploma',
    order: 3,
    options: [
      { text: '10th or 12th standard passing certificate', isCorrect: true },
      { text: 'Bachelor\'s degree completion', isCorrect: false },
      { text: 'A PhD degree', isCorrect: false },
      { text: '15 years of industry experience', isCorrect: false },
    ],
  },
  {
    question: 'What is a major benefit of doing a Diploma in Data Science?',
    category: 'Diploma',
    order: 4,
    options: [
      { text: 'Acquiring key skills like data analysis, python, and statistical tools in a short time', isCorrect: true },
      { text: 'No need to write assignments or exams', isCorrect: false },
      { text: 'Guaranteed top management rank', isCorrect: false },
      { text: 'Exemption from basic programming', isCorrect: false },
    ],
  },
  {
    question: 'Which area is covered under a Diploma in Cyber Security?',
    category: 'Diploma',
    order: 5,
    options: [
      { text: 'Ethical hacking, network security, and cryptography', isCorrect: true },
      { text: 'Hardware building and chip manufacturing', isCorrect: false },
      { text: 'Financial accounting systems', isCorrect: false },
      { text: 'Marketing campaigns design', isCorrect: false },
    ],
  },
  {
    question: 'What does a Diploma in Fashion Design focus on?',
    category: 'Diploma',
    order: 6,
    options: [
      { text: 'Garment construction, textile design, and fashion illustration', isCorrect: true },
      { text: 'Analyzing database algorithms', isCorrect: false },
      { text: 'Healthcare management', isCorrect: false },
      { text: 'Aerospace structural design', isCorrect: false },
    ],
  },
  {
    question: 'What is the main role of a supply chain manager trained in Diploma in Supply Chain?',
    category: 'Diploma',
    order: 7,
    options: [
      { text: 'Optimizing logistics, sourcing, and procurement strategies', isCorrect: true },
      { text: 'Treating patients in hospitals', isCorrect: false },
      { text: 'Writing code for mobile applications', isCorrect: false },
      { text: 'Teaching primary school literature', isCorrect: false },
    ],
  },
  {
    question: 'What does a Diploma in Nutrition teach students?',
    category: 'Diploma',
    order: 8,
    options: [
      { text: 'Diet planning, human anatomy, and nutritional requirements', isCorrect: true },
      { text: 'Computer database query tuning', isCorrect: false },
      { text: 'Music composition systems', isCorrect: false },
      { text: 'Fashion layout formatting', isCorrect: false },
    ],
  },
  {
    question: 'Can a diploma in IT lead to a direct entry into BCA or B.Sc IT?',
    category: 'Diploma',
    order: 9,
    options: [
      { text: 'Yes, often allows lateral entry or credit exemption', isCorrect: true },
      { text: 'No, a diploma has no value for higher studies', isCorrect: false },
      { text: 'Only in foreign universities', isCorrect: false },
      { text: 'Only in post-graduate programs', isCorrect: false },
    ],
  },
  {
    question: 'Which software is commonly learned in a Diploma in IT?',
    category: 'Diploma',
    order: 10,
    options: [
      { text: 'Database management tools and programming environments', isCorrect: true },
      { text: 'Fashion garment sketches software', isCorrect: false },
      { text: 'Adobe Photoshop only', isCorrect: false },
      { text: 'No software is used in IT diploma', isCorrect: false },
    ],
  },
  {
    question: 'What is the focus of a Diploma in Music?',
    category: 'Diploma',
    order: 11,
    options: [
      { text: 'Vocal training, instrument playing, and music theory', isCorrect: true },
      { text: 'Network configuration systems', isCorrect: false },
      { text: 'Business supply chain pathways', isCorrect: false },
      { text: 'Garment pattern drafting', isCorrect: false },
    ],
  },
  {
    question: 'Are professional diplomas focused more on theory or practical skills?',
    category: 'Diploma',
    order: 12,
    options: [
      { text: 'Highly practical and skill-oriented to ensure immediate job readiness', isCorrect: true },
      { text: 'Purely theoretical reading with no practicals', isCorrect: false },
      { text: 'They do not focus on any skills', isCorrect: false },
      { text: 'Based on history literature memorization', isCorrect: false },
    ],
  },
  {
    question: 'What is the typical fee range for a 1-year online diploma program?',
    category: 'Diploma',
    order: 13,
    options: [
      { text: '₹15,000 - ₹45,000', isCorrect: true },
      { text: '₹5,00,000 - ₹10,00,000', isCorrect: false },
      { text: '₹10,00,000 - ₹25,00,000', isCorrect: false },
      { text: 'Always free', isCorrect: false },
    ],
  },
  {
    question: 'Who is eligible for a PG Diploma program?',
    category: 'Diploma',
    order: 14,
    options: [
      { text: 'Graduates in any discipline', isCorrect: true },
      { text: '10th class pass only', isCorrect: false },
      { text: 'Fresh high school pass candidate', isCorrect: false },
      { text: 'No qualifications are required', isCorrect: false },
    ],
  },
  {
    question: 'Which diploma program is highly useful for entering the hospitality industry?',
    category: 'Diploma',
    order: 15,
    options: [
      { text: 'Diploma in Food and Nutrition or Hotel Management', isCorrect: true },
      { text: 'Diploma in Cyber Security', isCorrect: false },
      { text: 'Diploma in Supply Chain Management', isCorrect: false },
      { text: 'Diploma in Music Theory', isCorrect: false },
    ],
  },
  {
    question: 'What is the significance of a Diploma in Cyber Security for corporate IT departments?',
    category: 'Diploma',
    order: 16,
    options: [
      { text: 'It trains personnel to protect company networks and databases from cyber attacks', isCorrect: true },
      { text: 'It assists in writing accounting tally logs', isCorrect: false },
      { text: 'It helps in organizing employee travel details', isCorrect: false },
      { text: 'It is useful for cataloging printed library books', isCorrect: false },
    ],
  },
  {
    question: 'What coding language is most common in a Data Science diploma?',
    category: 'Diploma',
    order: 17,
    options: [
      { text: 'Python', isCorrect: true },
      { text: 'Cobol', isCorrect: false },
      { text: 'HTML', isCorrect: false },
      { text: 'Assembly', isCorrect: false },
    ],
  },
  {
    question: 'Can you complete a professional diploma fully online?',
    category: 'Diploma',
    order: 18,
    options: [
      { text: 'Yes, many accredited boards offer them with online lectures and virtual labs', isCorrect: true },
      { text: 'No, online diplomas are illegal in India', isCorrect: false },
      { text: 'Only if the candidate is physically present for all exams', isCorrect: false },
      { text: 'Diplomas are only offered in hybrid format', isCorrect: false },
    ],
  },
  {
    question: 'What is the first step to design garments in a Fashion Design course?',
    category: 'Diploma',
    order: 19,
    options: [
      { text: 'Sketching and pattern making', isCorrect: true },
      { text: 'Running python data analytics scripts', isCorrect: false },
      { text: 'Configuring network firewalls', isCorrect: false },
      { text: 'Sourcing international shipping routes', isCorrect: false },
    ],
  },
  {
    question: 'Why do working professionals choose short-term diploma courses?',
    category: 'Diploma',
    order: 20,
    options: [
      { text: 'To upskill quickly in a new technology or industry domain', isCorrect: true },
      { text: 'To enjoy college life again', isCorrect: false },
      { text: 'To write fewer exams than a degree', isCorrect: false },
      { text: 'Because they are forced by state government regulations', isCorrect: false },
    ],
  },
];

async function seedQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing questions
    await ScholarshipQuestion.deleteMany({});
    console.log('🗑️  Cleared existing questions');

    // Seed Online UG questions
    const ugResult = await ScholarshipQuestion.insertMany(
      onlineUGQuestions.map(q => ({ ...q, isActive: true }))
    );
    console.log(`✅ Added ${ugResult.length} Online UG questions`);

    // Seed Online PG questions
    const pgResult = await ScholarshipQuestion.insertMany(
      onlinePGQuestions.map(q => ({ ...q, isActive: true }))
    );
    console.log(`✅ Added ${pgResult.length} Online PG questions`);

    // Seed Credit Transfer questions
    const ctResult = await ScholarshipQuestion.insertMany(
      creditTransferQuestions.map(q => ({ ...q, isActive: true }))
    );
    console.log(`✅ Added ${ctResult.length} Credit Transfer questions`);

    // Seed SIDP questions
    const sidpResult = await ScholarshipQuestion.insertMany(
      sidpQuestions.map(q => ({ ...q, isActive: true }))
    );
    console.log(`✅ Added ${sidpResult.length} SIDP questions`);

    // Seed Diploma questions
    const diplomaResult = await ScholarshipQuestion.insertMany(
      diplomaQuestions.map(q => ({ ...q, isActive: true }))
    );
    console.log(`✅ Added ${diplomaResult.length} Diploma questions`);

    console.log('\n📊 Question Bank Summary:');
    const counts = await Promise.all([
      ScholarshipQuestion.countDocuments({ category: 'Online UG' }),
      ScholarshipQuestion.countDocuments({ category: 'Online PG' }),
      ScholarshipQuestion.countDocuments({ category: 'Credit Transfer' }),
      ScholarshipQuestion.countDocuments({ category: 'SIDP (Skill Integrated Diploma Programs)' }),
      ScholarshipQuestion.countDocuments({ category: 'Diploma' }),
    ]);
    console.log(`  • Online UG: ${counts[0]} questions`);
    console.log(`  • Online PG: ${counts[1]} questions`);
    console.log(`  • Credit Transfer: ${counts[2]} questions`);
    console.log(`  • SIDP: ${counts[3]} questions`);
    console.log(`  • Diploma: ${counts[4]} questions`);
    console.log(`  • Total: ${counts.reduce((a, b) => a + b, 0)} questions`);

    console.log('\n✨ Scholarship question banks seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding questions:', error);
    process.exit(1);
  }
}

seedQuestions();
