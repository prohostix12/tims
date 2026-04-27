import mongoose, { Schema, Document } from 'mongoose';

export interface ITimetable extends Document {
  university: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  semester: string;
  examName: string;
  type: 'manual' | 'file';
  fileUrl?: string; // If type is 'file'
  entries?: {
    code: string;
    subject: string;
    date: string;
    time: string;
  }[]; // If type is 'manual'
  status: 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const TimetableSchema: Schema = new Schema({
  university: { type: Schema.Types.ObjectId, ref: 'University', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
  semester: { type: String, required: true },
  examName: { type: String, required: true },
  type: { type: String, enum: ['manual', 'file'], default: 'manual' },
  fileUrl: { type: String },
  entries: [{
    code: { type: String },
    subject: { type: String },
    date: { type: String },
    time: { type: String }
  }],
  status: { type: String, enum: ['active', 'archived'], default: 'active' },
}, { timestamps: true });

export default mongoose.models.Timetable || mongoose.model<ITimetable>('Timetable', TimetableSchema);
