import { request } from '../modules/http/client';

type Entry = {
  _id: string;
  date: string;
  goal: number;
  done: number;
  comment: string;
};

export const fetchEntries = (username: string) => () =>
  request(`/entry/user/${username}`);

export default Entry;
