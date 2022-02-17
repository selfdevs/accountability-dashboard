import axiosInstance from '../modules/http/axiosClient';

type Entry = {
  _id?: string;
  date: string;
  goal?: number;
  done?: number;
  comment?: string;
};

export const fetchEntries = (username: string) => () =>
  axiosInstance.get(`/entry/user/${username}`).then(({ data }) => data);

export default Entry;
