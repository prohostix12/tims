
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
  heroTitle?: string;
  intro?: string;
  specializations?: {
    id: string;
    title: string;
    description: string;
    jobs: string[];
  }[];
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
  heroTitle: { type: String },
  intro: { type: String },
  specializations: {
    type: [
      new mongoose.Schema(
        {
          id: { type: String },
          title: { type: String },
          description: { type: String },
          jobs: { type: [String], default: [] }
        },
        { _id: false }
      )
    ],
    default: []
  },
  fee: { type: Number, default: 0 },

}, { timestamps: true });

export default mongoose.models.Program || mongoose.model<IProgram>('Program', ProgramSchema);
