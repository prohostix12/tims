import mongoose, { Schema, Document } from 'mongoose';

export interface IDirector extends Document {
  name: string;
  role: string;
  bio: string;
  image?: string;
  order: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const DirectorSchema: Schema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

export default mongoose.models.Director || mongoose.model<IDirector>('Director', DirectorSchema);
