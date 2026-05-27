import mongoose, { Schema, Document } from 'mongoose';

export interface IHowItWorksStep extends Document {
  stepNumber: number;
  title: string;
  description: string;
  order: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const HowItWorksStepSchema: Schema = new Schema({
  stepNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

export default mongoose.models.HowItWorksStep || mongoose.model<IHowItWorksStep>('HowItWorksStep', HowItWorksStepSchema);
