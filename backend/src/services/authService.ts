import { sign } from 'jsonwebtoken';

export const generateJWT = async (userId: string): Promise<string> => {
  return sign(
    {
      userId,
    },
    process.env.AUTH_SECRET,
    {
      expiresIn: process.env.TOKEN_LIFESPAN,
    }
  );
};

export const getTokenFromAuthorizationHeader = (headerValue: string): string =>
  headerValue.replace('Bearer ', '');
