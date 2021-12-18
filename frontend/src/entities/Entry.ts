import { DateTime } from 'luxon';

type Entry = {
  date: DateTime;
  goal: number;
  done: number;
  comment: string;
};

export default Entry;
