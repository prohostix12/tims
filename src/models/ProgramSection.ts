import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse {
  name: string;
  iconName: string;
  order: number;
}

export interface IProgramSection extends Document {
  categoryName: string;
  order: number;
  isActive: boolean;
  courses: ICourse[];
}

const CourseSchema = new Schema({
  name:     { type: String, required: true },
  iconName: { type: String, default: 'GraduationCap' },
  order:    { type: Number, default: 0 },
}, { _id: false });

const ProgramSectionSchema: Schema = new Schema({
  categoryName: { type: String, required: true, unique: true },
  order:        { type: Number, default: 0 },
  isActive:     { type: Boolean, default: true },
  courses:      { type: [CourseSchema], default: [] },
}, { timestamps: true });

export const ProgramSection =
  mongoose.models.ProgramSection ||
  mongoose.model<IProgramSection>('ProgramSection', ProgramSectionSchema);
