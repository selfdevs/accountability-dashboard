import Koa from "koa";
import {getTokenFromAuthorizationHeader} from "../services/authService";
import {decode, JwtPayload, verify} from "jsonwebtoken";
import User from "../domains/user/model";

interface Payload extends JwtPayload {
  userId: string;
}

import { Context } from "koa";

declare module "koa" {
  interface Context {
    user: string;
  }
}

const authMiddleware: Koa.Middleware = async (ctx, next) => {
  try {
    const authorization = ctx.get('Authorization');
    const token = getTokenFromAuthorizationHeader(authorization);
    await verify(token, process.env.AUTH_SECRET);
    const { userId } = decode(token) as Payload;
    ctx.user = await User.findOne({_id: userId});
    await next();
  } catch (e) {
    console.error(e.message);
    ctx.response.status = 401;
  }
};

export default authMiddleware;