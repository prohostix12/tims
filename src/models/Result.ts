import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Please provide student name'],
  },
  registerNumber: {
    type: String,
    required: [true, 'Please provide register number'],
    unique: true,
  },
  dob: {
    type: String,
    required: [true, 'Please provide date of birth'],
  },
  course: {
    type: String,
    required: [true, 'Please provide course name'],
  },
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'University',
    required: [true, 'Please provide university'],
  },
  status: {
    type: String,
    enum: ['PASSED', 'FAILED', 'WITHHELD', 'PENDING'],
    default: 'PASSED',
  },
  marksheetUrl: {
    type: String,
    required: [true, 'Please provide marksheet URL or PDF path'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Result || mongoose.model('Result', ResultSchema);
