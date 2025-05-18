import { Schema, Document } from 'mongoose';

export interface Complaint extends Document {
  readonly title: string;
  readonly description: string;
  readonly userId: string;
  readonly agencyId: string;
  readonly status: string;
  readonly createdAt: Date;
}

export const ComplaintSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true },
  agencyId: { type: String, required: true },
  status: { type: String, required: false, default: 'PENDING' },
  createdAt: { type: Date, default: Date.now },
});
