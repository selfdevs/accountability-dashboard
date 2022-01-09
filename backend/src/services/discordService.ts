import fetch from 'node-fetch';
import {
  generateAuthorizationHeader,
  generateContentTypeHeader,
  generateSearchParams,
} from './httpService';
import DiscordCredentials, {
  DiscordCredentialsInterface,
} from '../domains/discordCredentials/model';
import { HydratedDocument } from 'mongoose';

type TokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

export const exchangeTokenWithAuthToken = async (
  code: string
): Promise<TokenResponse> => {
  const payload = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.REDIRECT_URI,
  };
  const response = await fetch(process.env.DISCORD_API + '/oauth2/token', {
    method: 'POST',
    headers: generateContentTypeHeader('application/x-www-form-urlencoded'),
    body: generateSearchParams(payload),
  });
  return response.json();
};

type GenerateAndStoreDiscordCredentials = {
  email: string;
  username: string;
  discordCredentialsEntity: HydratedDocument<DiscordCredentialsInterface>;
};

export const generateAndStoreDiscordCredentials = async (
  code: string
): Promise<GenerateAndStoreDiscordCredentials> => {
  const discordData = await exchangeTokenWithAuthToken(code);
  const discordUser = await getCurrentUser(discordData.access_token);
  const discordCredentialsEntity = new DiscordCredentials({
    accessToken: discordData.access_token,
    expiresIn: discordData.expires_in,
    refreshToken: discordData.refresh_token,
  });
  await discordCredentialsEntity.save();
  return {
    email: discordUser.email,
    username: discordUser.username,
    discordCredentialsEntity,
  };
};

const discordRequest = async (
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

export const getCurrentUser = async (accessToken: string) => {
  return discordRequest(accessToken, '/users/@me');
};
