// eslint-disable-next-line import/no-cycle
import axiosInstance from '../modules/http/axiosClient';

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
  axiosInstance.get(`/user/${username}`).then(({ data }) => data);
