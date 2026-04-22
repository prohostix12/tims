
import mongoose, { Schema, Document } from 'mongoose';

export interface IProgram extends Document {
  name: string;
  university: mongoose.Types.ObjectId;
  duration: string;
  type: 'Degree' | 'Diploma' | 'Certificate';
  category: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProgramSchema: Schema = new Schema({
  name: { type: String, required: true },
  university: { type: Schema.Types.ObjectId, ref: 'University', required: true },
  duration: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Degree', 'Diploma', 'Certificate'], 
    required: true 
  },
  category: { type: String, required: true },
  description: { type: String },
}, { timestamps: true });

export default mongoose.models.Program || mongoose.model<IProgram>('Program', ProgramSchema);
