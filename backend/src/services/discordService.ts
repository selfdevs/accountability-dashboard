import fetch from 'node-fetch';
import {
  generateAuthorizationHeader,
  generateContentTypeHeader,
  generateSearchParams,
} from './httpService';
import DiscordCredentials, {
  DiscordCredentialsInterface,
} from '../domains/discordCredentials/model';
import { Error, HydratedDocument } from 'mongoose';
import Entry from '../domains/entry/model';
import nacl from 'tweetnacl';
import { get } from 'lodash';
import User from '../domains/user/model';
import { toReadableEntry } from './entryService';
import { DateTime } from 'luxon';

type TokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

type DiscordUser = {
  id: string;
  username: string;
  avatar: string;
  email: string;
};

export const exchangeTokenWithAuthToken = async (
  code: string,
  origin: string
): Promise<TokenResponse> => {
  const payload = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    redirect_uri: `${origin}/`,
  };
  console.log(payload);
  const response = await fetch(process.env.DISCORD_API + '/oauth2/token', {
    method: 'POST',
    headers: generateContentTypeHeader('application/x-www-form-urlencoded'),
    body: generateSearchParams(payload),
  });
  const data = await response.json();
  console.log(data);
  if (data.error) throw new Error(data.error_description);
  return data;
};

type GenerateAndStoreDiscordCredentials = DiscordUser & {
  discordCredentialsEntity: HydratedDocument<DiscordCredentialsInterface>;
};

export const generateAndStoreDiscordCredentials = async (
  code: string,
  origin: string
): Promise<GenerateAndStoreDiscordCredentials> => {
  const discordData = await exchangeTokenWithAuthToken(code, origin);
  const discordUser = await getCurrentUser(discordData.access_token);
  const user = await User.findOne({ email: discordUser.email });
  if (user) {
    await DiscordCredentials.deleteOne({ _id: user.discordCredentials }).catch(
      () => console.log('User not found.')
    );
  }
  const discordCredentialsEntity = new DiscordCredentials({
    accessToken: discordData.access_token,
    expiresIn: discordData.expires_in,
    refreshToken: discordData.refresh_token,
  });
  await discordCredentialsEntity.save();
  if (!process.env.WHITELISTED_DISCORD_IDS)
    throw new Error('Whitelist not found in env');
  if (
    !process.env.WHITELISTED_DISCORD_IDS.split(',').includes(discordUser.id)
  ) {
    throw new Error('User not whitelisted');
  }
  return {
    ...discordUser,
    discordCredentialsEntity,
  };
};

export const discordRequest = async (
  accessToken: string,
  path: string
): Promise<any> => {
  const response = await fetch(process.env.DISCORD_API + path, {
    method: 'GET',
    headers: {
      ...generateContentTypeHeader('application/json'),
      ...generateAuthorizationHeader(accessToken),
    },
  });
  return response.json();
};

export const getCurrentUser = async (
  accessToken: string
): Promise<DiscordUser> => {
  return discordRequest(accessToken, '/users/@me');
};

export const verifySignature = (
  signature: string,
  timestamp: string,
  body: string
) => {
  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, 'hex'),
    Buffer.from(process.env.DISCORD_APP_PUBLIC_KEY, 'hex')
  );
  if (!isVerified) throw new Error('Signature verification failed');
};

export const handleInteraction = async (interaction: any) => {
  const interactionType = get(interaction, 'type', null);
  const fieldToUpdate = get(
    interaction,
    'data.options[0].options[0].options[0].name',
    null
  );
  const userInput = get(
    interaction,
    'data.options[0].options[0].options[0].value',
    null
  );
  if (interactionType === 1) return { type: 1 };
  if (interactionType !== 2) throw new Error('Unknown interaction');
  const userId = get(interaction, 'member.user.id', null);
  const user = await User.findOne({ discordId: userId });
  if (!user) return { type: 4, data: { content: "We don't know you yet" } };
  const today = await Entry.findOne({
    user: user._id,
    date: DateTime.now().toISODate(),
  });
  if (fieldToUpdate === 'goal' && userInput) today.goal = userInput;
  if (fieldToUpdate === 'done' && userInput) today.done = userInput;
  if (fieldToUpdate === 'comment' && userInput) today.comment = userInput;
  await today.save();
  return { type: 4, data: { content: toReadableEntry(today) } };
};
