import { Schema, model } from 'mongoose';

export const DISCORD_CREDENTIALS_MODEL_NAME = 'DiscordCredentials';

export interface DiscordCredentialsInterface {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

const discordCredentialsSchema = new Schema<DiscordCredentialsInterface>({
  accessToken: { type: String, required: true },
  expiresIn: { type: Number, required: true },
  refreshToken: { type: String, required: true },
});

const discordCredentialsModel = model(
  DISCORD_CREDENTIALS_MODEL_NAME,
  discordCredentialsSchema
);

export default discordCredentialsModel;
