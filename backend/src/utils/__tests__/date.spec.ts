import { getMonthLimits } from '../date';

jest.useFakeTimers().setSystemTime(new Date('2/15/2022'));

describe('getMonthLimits', () => {
  it('should return first day of the month', () => {
    const { firstOfMonth } = getMonthLimits();
    expect(firstOfMonth.toISODate()).toBe('2022-02-01');
  });

  it('should return last day of the month', () => {
    const { lastOfMonth } = getMonthLimits();
    expect(lastOfMonth.toISODate()).toBe('2022-02-28');
  });

  it('should return the current day', () => {
    const { today } = getMonthLimits();
    expect(today.toISODate()).toBe('2022-02-15');
  });
});
