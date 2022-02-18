import { sign } from 'jsonwebtoken';

export const generateJWT = async (userId: string): Promise<string> => {
  return sign(
    {
      userId,
    },
    process.env.AUTH_SECRET,
    {
      expiresIn: parseInt(process.env.TOKEN_LIFESPAN, 10),
    }
  );
};

export const generateRefreshJWT = async (userId: string): Promise<string> => {
  return sign(
    {
      userId,
    },
    process.env.REFRESH_SECRET
  );
};

export const getTokenFromAuthorizationHeader = (headerValue: string): string =>
  headerValue.replace('Bearer ', '');
