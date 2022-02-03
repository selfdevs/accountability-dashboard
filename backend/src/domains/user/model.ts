import { Schema, model, ObjectId } from 'mongoose';
import { DISCORD_CREDENTIALS_MODEL_NAME } from '../discordCredentials/model';
import { EntryInterface } from '../entry/model';

export const USER_MODEL_NAME = 'User';

export interface UserInterface {
  _id: string;
  email: string;
  username: string;
  discordCredentials: ObjectId;
  dashboardTitle: string;
  instagram?: string;
  scratchpad?: string;
  discordId: string;
  discordAvatar: string;
}

export interface UserInterfaceWithEntries extends UserInterface {
  entries: EntryInterface[];
}

export const userSchema = new Schema<UserInterface>({
  email: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  discordCredentials: {
    type: Schema.Types.ObjectId,
    ref: DISCORD_CREDENTIALS_MODEL_NAME,
    required: true,
  },
  scratchpad: { type: String, default: '' },
  discordAvatar: { type: String, required: true },
  discordId: { type: String, required: true },
  dashboardTitle: { type: String, default: 'My dashboard', required: true },
  instagram: { type: String },
});

const User = model(USER_MODEL_NAME, userSchema);

export default User;
