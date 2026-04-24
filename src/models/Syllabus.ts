import mongoose, { Schema, Document } from 'mongoose';

export interface ISyllabus extends Document {
  courseName: string;
  universityName: string;
  fileUrl: string;
  status: 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const SyllabusSchema: Schema = new Schema({
  courseName: { type: String, required: true },
  universityName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  status: { type: String, enum: ['active', 'archived'], default: 'active' },
}, { timestamps: true });

export default mongoose.models.Syllabus || mongoose.model<ISyllabus>('Syllabus', SyllabusSchema);
