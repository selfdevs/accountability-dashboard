import { request } from '../modules/http/client';

export type User = {
  _id: string;
  username: string;
  dashboardTitle?: string;
  instagram?: string;
  github?: string;
  youtube?: string;
  discord?: string;
  discordId: string;
  discordAvatar: string;
  scratchpad?: string;
};

export const fetchUser = (username: string) => () =>
  request(`/user/${username}`);
