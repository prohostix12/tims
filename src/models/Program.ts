
import mongoose, { Schema, Document } from 'mongoose';

export interface IProgram extends Document {
  name: string;
  university: mongoose.Types.ObjectId;
  slug: string;
  duration?: string;
  type?: string;
  category: string;
  level?: string;
  eligibility?: string;
  courseType?: string;
  image?: string;
  brochure?: string;
  description?: string;
  highlights: string[];
  curriculum: string[];
  fee?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProgramSchema: Schema = new Schema({
  name: { type: String, required: true },
  university: { type: Schema.Types.ObjectId, ref: 'University', required: true },
  slug: { type: String, unique: true, sparse: true },
  duration: { type: String },
  type: { type: String },
  category: { type: String, required: true },
  level: { type: String },
  eligibility: { type: String },
  courseType: { type: String, enum: ['Commerce', 'Science', 'Arts', 'IT', 'Others', 'Management', 'Medical'] },
  image: { type: String },
  brochure: { type: String },
  description: { type: String },
  highlights: { type: [String], default: [] },
  curriculum: { type: [String], default: [] },
  fee: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Program || mongoose.model<IProgram>('Program', ProgramSchema);
