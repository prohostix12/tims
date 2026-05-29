import mongoose from 'mongoose';

const OnlineCourseSchema = new mongoose.Schema({
  tab:      { type: String, required: true },
  name:     { type: String, required: true },
  icon:     { type: String, default: 'GraduationCap' },
  order:    { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.OnlineCourse ||
  mongoose.model('OnlineCourse', OnlineCourseSchema);
