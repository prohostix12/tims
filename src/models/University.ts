
import mongoose, { Schema, Document } from 'mongoose';

export interface IUniversity extends Document {
  name: string;
  code: string;
  description?: string;
  location?: string;
  establishedYear?: number;
  status: 'active' | 'pending' | 'inactive';
  website?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UniversitySchema: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String },
  location: { type: String },
  establishedYear: { type: Number },
  status: { 
    type: String, 
    enum: ['active', 'pending', 'inactive'], 
    default: 'active' 
  },
  website: { type: String },
  image: { type: String },
}, { timestamps: true });

export default mongoose.models.University || mongoose.model<IUniversity>('University', UniversitySchema);
