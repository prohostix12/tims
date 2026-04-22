import mongoose, { Schema, Document } from 'mongoose';

export interface INews extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  image?: string;
  category?: string;
  status: 'published' | 'draft';
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema: Schema = new Schema({
  title:       { type: String, required: true },
  slug:        { type: String, required: true, unique: true },
  excerpt:     { type: String, required: true },
  content:     { type: String },
  image:       { type: String },
  category:    { type: String, default: 'General' },
  status:      { type: String, enum: ['published', 'draft'], default: 'published' },
  publishedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.News || mongoose.model<INews>('News', NewsSchema);
