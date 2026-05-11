import mongoose, { Schema, Document } from 'mongoose';

export interface IUniversityLogo extends Document {
  name: string;
  logoUrl: string;
  order: number;
  isActive: boolean;
}

const UniversityLogoSchema = new Schema<IUniversityLogo>(
  {
    name:    { type: String, required: true, trim: true },
    logoUrl: { type: String, required: true, trim: true },
    order:   { type: Number, default: 0 },
    isActive:{ type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.UniversityLogo ||
  mongoose.model<IUniversityLogo>('UniversityLogo', UniversityLogoSchema);
