import mongoose, { Schema, Document } from 'mongoose';

export interface IOption {
  text: string;
  isCorrect: boolean;
}

export type QuestionCategory = 'Online UG' | 'Online PG' | 'Credit Transfer' | 'SIDP (Skill Integrated Diploma Programs)' | 'Diploma' | 'General';

export interface IScholarshipQuestion extends Document {
  question: string;
  options: IOption[];
  order: number;
  isActive: boolean;
  category: QuestionCategory;
}

const OptionSchema = new Schema({
  text:      { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
}, { _id: false });

const ScholarshipQuestionSchema: Schema = new Schema({
  question: { type: String, required: true },
  options:  { type: [OptionSchema], required: true },
  order:    { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  category: { type: String, enum: ['Online UG', 'Online PG', 'Credit Transfer', 'SIDP (Skill Integrated Diploma Programs)', 'Diploma', 'General'], default: 'General' },
}, { timestamps: true });

// If the cached model is missing the category path (stale HMR cache), force re-registration
if (mongoose.models.ScholarshipQuestion && !mongoose.models.ScholarshipQuestion.schema.path('category')) {
  delete mongoose.models.ScholarshipQuestion;
}

export const ScholarshipQuestion =
  (mongoose.models.ScholarshipQuestion as mongoose.Model<IScholarshipQuestion>) ||
  mongoose.model<IScholarshipQuestion>('ScholarshipQuestion', ScholarshipQuestionSchema);
