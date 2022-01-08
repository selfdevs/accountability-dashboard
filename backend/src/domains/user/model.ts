import {Schema, model, ObjectId,} from "mongoose";
import {DISCORD_CREDENTIALS_MODEL_NAME} from "../discordCredentials/model";

export const USER_MODEL_NAME = 'User';

export interface UserInterface {
  email: string;
  username: string;
  discordCredentials: ObjectId;
  picture?: string;
  dashboardTitle?: string;
  instagram?: string;
}

export const userSchema = new Schema<UserInterface>({
  email: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  discordCredentials: { type: Schema.Types.ObjectId, ref: DISCORD_CREDENTIALS_MODEL_NAME, required: true },
  picture: { type: String },
  dashboardTitle: { type: String },
  instagram: { type: String }
});

const User = model(USER_MODEL_NAME, userSchema);

export default User;