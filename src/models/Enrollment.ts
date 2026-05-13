import mongoose, { Schema, Document } from 'mongoose';

export interface IEnrollment extends Document {
  studentName: string;
  email: string;
  phone: string;
  program: string;
  university: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: Date;
}

const EnrollmentSchema: Schema = new Schema({
  studentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  program: { type: String, required: true },
  university: { type: String, required: true },
  batchId: { type: Schema.Types.ObjectId, ref: 'Batch' },
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected'], 
    default: 'Pending' 
  },
}, { timestamps: true });

export default mongoose.models.Enrollment || mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
