import mongoose, { Schema, Document } from 'mongoose';

export interface ISyllabus extends Document {
  university: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  semester: string;
  fileUrl: string;
  status: 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const SyllabusSchema: Schema = new Schema({
  university: { type: Schema.Types.ObjectId, ref: 'University', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
  semester: { type: String, required: true },
  fileUrl: { type: String, required: true },
  status: { type: String, enum: ['active', 'archived'], default: 'active' },
}, { timestamps: true });

export default mongoose.models.Syllabus || mongoose.model<ISyllabus>('Syllabus', SyllabusSchema);
