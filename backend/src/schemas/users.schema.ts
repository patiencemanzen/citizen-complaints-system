import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  resetCode: { type: String, required: false },
  resetCodeExpiry: { type: Date, required: false },
});

export interface User extends Document {
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly role: string;
  resetCode?: string;
  resetCodeExpiry?: Date;
}
