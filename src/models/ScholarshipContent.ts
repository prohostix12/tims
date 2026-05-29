import mongoose, { Schema, Document } from 'mongoose';

export interface IScholarshipContent extends Document {
  badge: string;
  heading: string;
  subheading: string;
  description: string;
  buttonText: string;
  isActive: boolean;
}

const ScholarshipContentSchema: Schema = new Schema({
  badge:       { type: String, default: 'Scholarship Program' },
  heading:     { type: String, default: 'Earn a Scholarship & Study Smarter' },
  subheading:  { type: String, default: 'Test your knowledge and unlock exclusive fee discounts' },
  description: { type: String, default: 'Our scholarship program rewards motivated students with vouchers that can be redeemed as fee discounts on eligible courses. Attempt our short quiz, score above the qualifying mark, and receive a voucher code instantly.' },
  buttonText:  { type: String, default: 'Get Started – Take the Scholarship Exam' },
  isActive:    { type: Boolean, default: true },
}, { timestamps: true });

export const ScholarshipContent =
  mongoose.models.ScholarshipContent ||
  mongoose.model<IScholarshipContent>('ScholarshipContent', ScholarshipContentSchema);
