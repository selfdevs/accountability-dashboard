import { connect } from 'mongoose';
import { init } from '../databaseService';
import Mock = jest.Mock;

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

console.error = jest.fn();
console.log = jest.fn();

process.env.DATABASE_URL = 'mongodb://localhost:27017/test';

describe('init', () => {
  it('should init the database', async () => {
    await init();
    expect(connect).toHaveBeenCalledWith('mongodb://localhost:27017/test');
  });

  it('should print error message', async () => {
    (connect as Mock).mockImplementationOnce(() => {
      throw new Error('test');
    });
    await init();
    expect(console.error).toHaveBeenCalledWith('test');
  });
});
