import { Schema } from 'mongoose';

export const AgencySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  contactEmail: { type: String, required: true },
});
