import { Schema, Types } from 'mongoose';

export const AgencySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  contactEmail: { type: String, required: true, unique: true }, // unique email for login
  userId: { type: Types.ObjectId, ref: 'User', required: true }, // link to User
});
