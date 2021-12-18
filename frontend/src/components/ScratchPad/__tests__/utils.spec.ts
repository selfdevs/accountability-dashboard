import { getStateText } from '../utils';
import { SAVED, SAVING } from '../constants';

describe('getStateText', () => {
  it('should return save in progress string', () => {
    expect(getStateText(true)).toEqual(SAVING);
  });

  it('should return save complete string', () => {
    expect(getStateText(false)).toEqual(SAVED);
  });
});
