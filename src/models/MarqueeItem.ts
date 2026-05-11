import mongoose, { Schema, Document } from 'mongoose';

export interface IMarqueeItem extends Document {
  text: string;
  order: number;
  isActive: boolean;
}

const MarqueeItemSchema = new Schema<IMarqueeItem>(
  {
    text:     { type: String, required: true, trim: true },
    order:    { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.MarqueeItem ||
  mongoose.model<IMarqueeItem>('MarqueeItem', MarqueeItemSchema);
