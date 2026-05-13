import mongoose, { Schema, Document } from 'mongoose';

export interface IBatch extends Document {
  name: string;
  universityId: mongoose.Types.ObjectId;
  programId: mongoose.Types.ObjectId;
  startDate?: Date;
  endDate?: Date;
  status: 'Active' | 'Completed' | 'Upcoming';
  createdAt: Date;
  updatedAt: Date;
}

const BatchSchema: Schema = new Schema({
  name: { type: String, required: true },
  universityId: { type: Schema.Types.ObjectId, ref: 'University', required: true },
  programId: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { 
    type: String, 
    enum: ['Active', 'Completed', 'Upcoming'], 
    default: 'Active' 
  },
}, { timestamps: true });

export default mongoose.models.Batch || mongoose.model<IBatch>('Batch', BatchSchema);
