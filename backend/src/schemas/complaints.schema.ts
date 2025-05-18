import { Schema, Document, Types } from 'mongoose';

export interface Complaint extends Document {
  readonly title: string;
  readonly description: string;
  readonly userId: string;
  readonly agencyId: Types.ObjectId | string;
  readonly status: string;
  readonly createdAt: Date;
}

export const ComplaintSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  agencyId: { type: Schema.Types.ObjectId, ref: 'Agency', required: true },
  status: { type: String, required: false, default: 'PENDING' },
  createdAt: { type: Date, default: Date.now },
  comments: [
    {
      userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});
