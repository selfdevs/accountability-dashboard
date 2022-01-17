import { request } from '../modules/http/client';

export type User = {
  username: string;
  dashboardTitle?: string;
  instagram?: string;
  github?: string;
  youtube?: string;
  discord?: string;
  discordId: string;
  discordAvatar: string;
};

export const fetchUser = (username?: string) => () =>
  request(username ? `/user/${username}` : '/user');
