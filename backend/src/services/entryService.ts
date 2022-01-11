import { DateTime } from 'luxon';
import Entry from '../domains/entry/model';
import { getMonthLimits } from '../utils/date';
import _ from 'lodash';

export const getCurrentMonthEntries = async (userId: string) => {
  const { lastOfMonth, firstOfMonth } = getMonthLimits();
  return Entry.find({
    user: userId,
    date: { $lte: lastOfMonth.toISODate(), $gte: firstOfMonth.toISODate() },
  }).sort('date');
};

export const generateMissingEntries = async (userId: string) => {
  const { lastOfMonth, today } = getMonthLimits();
  const daysInMonth = Array(lastOfMonth.day)
    .fill(0)
    .map((v, i) => i + 1);
  const entries = await getCurrentMonthEntries(userId);
  const existingDays = entries.map(({ date }) => date.getDate());
  const missingDays = _.difference(daysInMonth, existingDays);
  return Promise.all(
    missingDays.map((day) => {
      const newEntry = new Entry({
        date: today.toUTC().startOf('day').set({ day }),
        user: userId,
      });
      return newEntry.save();
    })
  );
};
