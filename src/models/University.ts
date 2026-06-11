
import mongoose, { Schema, Document } from 'mongoose';

export interface IUniversity extends Document {
  name: string;
  code: string;
  slug?: string;
  description?: string;
  location?: string;
  establishedYear?: number;
  status: 'active' | 'pending' | 'inactive';
  website?: string;
  image?: string;
  logo?: string;
  ranking?: string;
  accreditations?: string;
  features?: string[];
  facilities?: string[];
  type?: 'public' | 'private' | 'deemed' | 'state';
  contactEmail?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UniversitySchema: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  slug: { type: String, unique: true, sparse: true },
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
  logo: { type: String },
  ranking: { type: String },
  accreditations: { type: String },
  features: [{ type: String }],
  facilities: [{ type: String }],
  type: { type: String, enum: ['public', 'private', 'deemed', 'state'], default: 'private' },
  contactEmail: { type: String },
}, { timestamps: true });

export default mongoose.models.University || mongoose.model<IUniversity>('University', UniversitySchema);
