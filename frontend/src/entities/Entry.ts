import instance from '../modules/http/axiosClient';

type Entry = {
  _id?: string;
  date: string;
  goal?: number;
  done?: number;
  comment?: string;
};

export const fetchEntries = (username: string) => () =>
  instance.get(`/entry/user/${username}`).then(({ data }) => data);

export default Entry;
