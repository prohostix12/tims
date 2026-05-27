import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  title: string;
  description: string;
  date: string;
  time: string;
  link: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  date: { type: String, default: '' },
  time: { type: String, default: '' },
  link: { type: String, default: '' },
  status: { type: String, enum: ['upcoming', 'completed', 'cancelled'], default: 'upcoming' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema);
