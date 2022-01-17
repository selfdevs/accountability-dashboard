import fetch from 'node-fetch';
import { discordRequest } from '../discordService';

jest.mock('node-fetch', () => jest.fn());

process.env.DISCORD_API = 'https://discord.com/api';

describe('discordRequest', () => {
  it('should execute a request to Discord API', async () => {
    await discordRequest('token', '/test');
    expect(fetch).toHaveBeenCalledWith('https://discord.com/api/test', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token',
      },
    });
  });
});
