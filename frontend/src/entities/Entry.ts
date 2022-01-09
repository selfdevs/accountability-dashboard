import { request } from '../modules/http/client';

type Entry = {
  _id: string;
  date: string;
  goal: number;
  done: number;
  comment: string;
};

export const fetchEntries = async () => request('/entry');

export default Entry;
