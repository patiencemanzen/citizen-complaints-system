import { Schema, Document } from 'mongoose';

export const RoleSchema = new Schema({
  name: { type: String, required: true },
  permissions: [{ type: String }],
});

export interface Role extends Document {
  readonly name: string;
  readonly permissions: string[];
}
