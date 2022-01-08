import {sign} from "jsonwebtoken";

export const generateJWT = async (userId: string): Promise<string> => {
  return sign({
    userId,
  }, process.env.AUTH_SECRET, {
    expiresIn: 3600
  });
};

export const getTokenFromAuthorizationHeader = (headerValue: string): string =>
  headerValue.replace('Bearer ', '');