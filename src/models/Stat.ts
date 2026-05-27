import mongoose, { Schema, Document } from 'mongoose';

export interface IStat extends Document {
  number: string;
  label: string;
  order: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const StatSchema: Schema = new Schema({
  number: { type: String, required: true },
  label: { type: String, required: true },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

export default mongoose.models.Stat || mongoose.model<IStat>('Stat', StatSchema);
