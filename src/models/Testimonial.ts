import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema: Schema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  avatar: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
  text: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
