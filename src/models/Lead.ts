import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  description?: string;
  source: string;
  interest?: string;
  status: 'new' | 'contacted' | 'qualified' | 'lost' | 'won';
  createdAt: Date;
}

const LeadSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String },
  source: { type: String, default: 'Website' },
  interest: { type: String },
  status: { 
    type: String, 
    enum: ['new', 'contacted', 'qualified', 'lost', 'won'], 
    default: 'new' 
  },
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
