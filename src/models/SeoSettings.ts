import mongoose, { Schema, Document } from 'mongoose';

export interface ISeoSettings extends Document {
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  googleAnalyticsId: string;
  sitemapUrl: string;
  updatedAt: Date;
}

const SeoSettingsSchema = new Schema<ISeoSettings>({
  siteTitle: { type: String, default: 'TIMS Education' },
  metaDescription: { type: String, default: '' },
  keywords: { type: String, default: '' },
  googleAnalyticsId: { type: String, default: '' },
  sitemapUrl: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.SeoSettings || mongoose.model<ISeoSettings>('SeoSettings', SeoSettingsSchema);
