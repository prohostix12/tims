import mongoose, { Schema, Document } from 'mongoose';

export interface IScholarshipContent extends Document {
  badge: string;
  heading: string;
  subheading: string;
  description: string;
  buttonText: string;
  termsAndConditions: string;
  isActive: boolean;
}

const ScholarshipContentSchema: Schema = new Schema({
  badge:               { type: String, default: 'Scholarship Program' },
  heading:             { type: String, default: 'Earn a Scholarship & Study Smarter' },
  subheading:          { type: String, default: 'Test your knowledge and unlock exclusive fee discounts' },
  description:         { type: String, default: 'Our scholarship program rewards motivated students with vouchers that can be redeemed as fee discounts on eligible courses. Attempt our short quiz, score above the qualifying mark, and receive a voucher code instantly.' },
  buttonText:          { type: String, default: 'Get Started – Take the Scholarship Exam' },
  termsAndConditions:  { type: String, default: '1. This scholarship voucher is valid for 90 days from the date of issue.\n2. The voucher can only be used once and is non-transferable.\n3. The discount applies only to the course and program selected at the time of the exam.\n4. Students must present the voucher code at the time of admission.\n5. The scholarship amount will be deducted from the total course fee.\n6. TIMS Education reserves the right to verify the authenticity of the voucher.\n7. This offer cannot be combined with any other ongoing discounts or offers.\n8. The scholarship is subject to seat availability.' },
  isActive:            { type: Boolean, default: true },
}, { timestamps: true });

export const ScholarshipContent =
  mongoose.models.ScholarshipContent ||
  mongoose.model<IScholarshipContent>('ScholarshipContent', ScholarshipContentSchema);
