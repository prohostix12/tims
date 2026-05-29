import mongoose, { Schema, Document } from 'mongoose';

export interface IOption {
  text: string;
  isCorrect: boolean;
}

export interface IScholarshipQuestion extends Document {
  question: string;
  options: IOption[];
  order: number;
  isActive: boolean;
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
}, { timestamps: true });

export const ScholarshipQuestion =
  mongoose.models.ScholarshipQuestion ||
  mongoose.model<IScholarshipQuestion>('ScholarshipQuestion', ScholarshipQuestionSchema);
