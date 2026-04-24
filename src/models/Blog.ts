import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image?: string;
  author: string;
  readTime?: string;
  status: 'published' | 'draft';
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, default: 'Education' },
  image: { type: String },
  author: { type: String, default: 'TIMS Admin' },
  readTime: { type: String },
  status: { type: String, enum: ['published', 'draft'], default: 'published' },
  publishedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
