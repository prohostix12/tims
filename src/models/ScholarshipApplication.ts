import mongoose, { Schema } from 'mongoose';

const ScholarshipApplicationSchema = new Schema({
  name:        { type: String, required: true },
  phone:       { type: String, required: true, unique: true, trim: true },
  email:       { type: String, required: true, unique: true, trim: true, lowercase: true },
  course:      { type: String, required: true },
  university:  { type: String, required: true },
  token:       { type: String, required: true, unique: true },
  questionIds: [{ type: Schema.Types.ObjectId, ref: 'ScholarshipQuestion' }],
  examCompleted:    { type: Boolean, default: false },
  score:            { type: Number, default: 0 },
  totalQuestions:   { type: Number, default: 0 },
  voucherCode:      { type: String, default: null },
  voucherAmount:    { type: Number, default: null },
  voucherLabel:     { type: String, default: null },
  voucherValidUntil:{ type: Date, default: null },
}, { timestamps: true });

export const ScholarshipApplication =
  mongoose.models.ScholarshipApplication ||
  mongoose.model('ScholarshipApplication', ScholarshipApplicationSchema);
