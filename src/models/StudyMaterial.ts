import mongoose, { Schema, Document } from 'mongoose';

export interface IStudyMaterial extends Document {
  university: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  semester: string;
  subject: string;
  fileUrl: string;
  category?: string;
  description?: string;
  fileType?: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudyMaterialSchema: Schema = new Schema({
  university: { type: Schema.Types.ObjectId, ref: 'University', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
  semester: { type: String, required: true },
  subject: { type: String, required: true },
  fileUrl: { type: String, required: true },
  category: { type: String, default: 'General' },
  description: { type: String },
  fileType: { type: String, default: 'PDF' },
}, { timestamps: true });

export default mongoose.models.StudyMaterial || mongoose.model<IStudyMaterial>('StudyMaterial', StudyMaterialSchema);
