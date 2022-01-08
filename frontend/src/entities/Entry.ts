import { request } from '../modules/http/client';

type Entry = {
  date: string;
  goal: number;
  done: number;
  comment: string;
};

export const fetchEntries = async () => request('/api/entry');

export default Entry;
