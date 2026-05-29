import mongoose, { Schema, Document } from 'mongoose';

export interface IScoreTier {
  minScore: number;
  amount: number;
  label: string;
}

export interface IPartnerCompany {
  name: string;
  description: string;
}

export interface IScholarshipConfig extends Document {
  tiers: IScoreTier[];
  voucherValidityDays: number;
  eligibleCourses: string[];
  partnerCompanies: IPartnerCompany[];
  passingScore: number;
  totalQuestionsForScore: number;
}

const ScoreTierSchema = new Schema({
  minScore: { type: Number, required: true },
  amount:   { type: Number, required: true },
  label:    { type: String, default: '' },
}, { _id: false });

const PartnerCompanySchema = new Schema({
  name:        { type: String, required: true },
  description: { type: String, default: '' },
}, { _id: false });

const ScholarshipConfigSchema: Schema = new Schema({
  tiers: {
    type: [ScoreTierSchema],
    default: [
      { minScore: 50, amount: 1000, label: 'Silver Scholar' },
      { minScore: 60, amount: 2000, label: 'Gold Scholar' },
      { minScore: 80, amount: 3000, label: 'Platinum Scholar' },
    ],
  },
  voucherValidityDays:    { type: Number, default: 90 },
  eligibleCourses:        { type: [String], default: [] },
  partnerCompanies:       { type: [PartnerCompanySchema], default: [] },
  passingScore:           { type: Number, default: 50 },
  totalQuestionsForScore: { type: Number, default: 10 },
}, { timestamps: true });

export const ScholarshipConfig =
  mongoose.models.ScholarshipConfig ||
  mongoose.model<IScholarshipConfig>('ScholarshipConfig', ScholarshipConfigSchema);
