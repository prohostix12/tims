import mongoose, { Schema, Document } from 'mongoose';

export interface IFooterSection {
  heading: string;
  email: string;
  phone: string;
  addresses: string[];
  socialFacebook: string;
  socialInstagram: string;
  socialLinkedin: string;
  showSocial: boolean;
}

export interface IFooterContent extends Document {
  sections: IFooterSection[];
  copyrightText: string;
}

const FooterSectionSchema = new Schema({
  heading:         { type: String, default: '' },
  email:           { type: String, default: '' },
  phone:           { type: String, default: '' },
  addresses:       { type: [String], default: [] },
  socialFacebook:  { type: String, default: '' },
  socialInstagram: { type: String, default: '' },
  socialLinkedin:  { type: String, default: '' },
  showSocial:      { type: Boolean, default: true },
}, { _id: false });

const FooterContentSchema: Schema = new Schema({
  sections: {
    type: [FooterSectionSchema],
    default: [
      {
        heading: 'TIMS',
        email: 'info@findyouruniversity.com',
        phone: '+91 8943555592',
        addresses: ['Tirur, Malappuram, Kerala'],
        socialFacebook: 'https://www.facebook.com/timsedu/',
        socialInstagram: 'https://www.instagram.com/tims_education?igsh=MW04NzBsazBuYmYwNw==',
        socialLinkedin: 'https://linkedin.com',
        showSocial: true,
      },
      {
        heading: 'EDUMENTORA',
        email: 'info@edumentora.in',
        phone: '+91 8943555592',
        addresses: ['Calicut, Kerala', 'Kochi, Kerala'],
        socialFacebook: 'https://www.facebook.com/share/1BsZo9qCi3/',
        socialInstagram: 'https://www.instagram.com/edumentora?igsh=MW5vam5kYzdycm9wMw==',
        socialLinkedin: 'https://linkedin.com',
        showSocial: true,
      },
      {
        heading: 'PROFESSIONAL SKILL CAMPUS',
        email: 'info@pscampus.in',
        phone: '+91 8943555592',
        addresses: ['Tirur, Kerala'],
        socialFacebook: 'https://facebook.com',
        socialInstagram: 'https://www.instagram.com/psc_skillcampus?igsh=aG91cnE5bXY2eW54',
        socialLinkedin: 'https://linkedin.com',
        showSocial: true,
      },
      {
        heading: 'CONTACT US',
        email: 'info@findyouruniversity.com',
        phone: '+91 8943555592',
        addresses: [
          '2nd floor Al madeela complex Calicut road Edappal 679576 MALAPPURAM DT Kerala',
          'TIMS Tower, Thazhepalam, Tirur, Kerala 676101',
        ],
        socialFacebook: '',
        socialInstagram: '',
        socialLinkedin: '',
        showSocial: false,
      },
    ],
  },
  copyrightText: { type: String, default: 'TIMS Education' },
}, { timestamps: true });

export const FooterContent =
  mongoose.models.FooterContent ||
  mongoose.model<IFooterContent>('FooterContent', FooterContentSchema);
