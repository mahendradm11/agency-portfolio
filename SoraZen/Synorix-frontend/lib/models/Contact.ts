import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  projectType?: string;
  description?: string;
  createdAt: Date;
}

const ContactSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, trim: true, default: '' },
  service: { type: String, trim: true, default: '' },
  budget: { type: String, trim: true, default: '' },
  timeline: { type: String, trim: true, default: '' },
  message: { type: String, trim: true, default: '' },
  projectType: { type: String, trim: true, default: '' },
  description: { type: String, trim: true, default: '' },
  createdAt: { type: Date, default: Date.now },
});

export const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;
