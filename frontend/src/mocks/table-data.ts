import { DateTime, Duration } from 'luxon';
import * as faker from 'faker';

export type Entry = {
  date: DateTime;
  goal: number;
  done: number;
  comment: string;
};

const generateRandomValue = (): number => Math.ceil(Math.random() * 10);

const entryGenerator = (offset: number): Entry => {
  const goal = generateRandomValue();
  const done = generateRandomValue();
  const date = DateTime.now().startOf('month').plus(Duration.fromObject({ days: offset }));
  const comment = faker.company.catchPhrase();

  return {
    goal,
    date,
    done,
    comment,
  };
};

export const sampleDataGenerator = (): Entry[] => {
  const result = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 31; i++) {
    result.push(entryGenerator(i));
  }

  return result;
};
