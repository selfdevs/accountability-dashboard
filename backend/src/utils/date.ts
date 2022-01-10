import { DateTime } from 'luxon';

export const getMonthLimits = () => {
  const today = DateTime.now();
  const firstOfMonth = today.startOf('month');
  const lastOfMonth = today.endOf('month');
  return {
    firstOfMonth,
    lastOfMonth,
    today,
  };
};
