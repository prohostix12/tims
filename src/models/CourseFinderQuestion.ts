import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICourseFinderQuestion extends Document {
  field: string;
  order: number;
  question: string;
  isActive: boolean;
  options: {
    value: string;
    label: string;
    min?: number;
    max?: number;
    categories?: string[];
  }[];
}

const CourseFinderQuestionSchema = new Schema<ICourseFinderQuestion>({
  field: { type: String, required: true },
  order: { type: Number, required: true },
  question: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  options: [{
    value: { type: String, required: true },
    label: { type: String, required: true },
    min: { type: Number },
    max: { type: Number },
    categories: [{ type: String }]
  }]
}, { timestamps: true });

export const CourseFinderQuestion: Model<ICourseFinderQuestion> = mongoose.models.CourseFinderQuestion || mongoose.model<ICourseFinderQuestion>('CourseFinderQuestion', CourseFinderQuestionSchema);
