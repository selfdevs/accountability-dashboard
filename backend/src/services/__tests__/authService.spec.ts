import {
  generateJWT,
  getTokenFromAuthorizationHeader,
  generateRefreshJWT,
} from '../authService';
import { sign } from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

process.env.AUTH_SECRET = 'secret';
process.env.TOKEN_LIFESPAN = '3600';

describe('getTokenFromAuthorizationHeader', () => {
  it('should return the token from the authorization header', () => {
    expect(getTokenFromAuthorizationHeader('Bearer token')).toBe('token');
  });
});

describe('generateJWT', () => {
  it('should return a JWT', () => {
    generateJWT('userId');
    expect(sign).toHaveBeenCalledWith({ userId: 'userId' }, 'secret', {
      expiresIn: 3600,
    });
  });
});

describe('generateRefreshJWT', () => {
  it('should return a refresh JWT with no expiration', () => {
    generateRefreshJWT('userId');
    expect(sign).toHaveBeenCalledWith({ userId: 'userId' }, 'secret');
  });
});
