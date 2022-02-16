import Router from 'koa-router';
import { generateAndStoreDiscordCredentials } from '../services/discordService';
import User from '../domains/user/model';
import { generateJWT, generateRefreshJWT } from '../services/authService';
import newrelic from 'newrelic';
import { errorResponse } from '../services/httpService';
import Token from '../domains/tokens/model';
import { decode, JsonWebTokenError, JwtPayload, verify } from 'jsonwebtoken';

const authRouter = new Router();

export interface userPayload extends JwtPayload {
  userId: string;
}

authRouter.post('/discord', async (ctx, next) => {
  try {
    const { code } = ctx.request.body;
    const origin = ctx.get('Origin');
    const { email, username, discordCredentialsEntity, id, avatar } =
      await generateAndStoreDiscordCredentials(code, origin);
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        username,
      });
    }

    let tokenDoc = await Token.findOne({ user: user._id });
    if (tokenDoc) await tokenDoc.delete();

    user.discordCredentials = discordCredentialsEntity._id;
    user.discordId = id;
    user.discordAvatar = avatar;
    await user.save();
    const accessToken = await generateJWT(user._id);
    const refreshToken = await generateRefreshJWT(user._id);
    await Token.create({ token: refreshToken, user: user._id });
    ctx.body = {
      accessToken,
      refreshToken,
    };
    ctx.response.status = 200;
  } catch (e) {
    newrelic.noticeError(e);
    console.error(e.message);
    errorResponse(ctx, e.message);
  }
});

authRouter.post('/token', async (ctx, next) => {
  try {
    const { token } = ctx.request.body;
    await verify(token, process.env.REFRESH_SECRET);
    const refreshTokenDoc = await Token.findOne({ token });

    if (!refreshTokenDoc)
      return errorResponse(
        ctx,
        'Token Not Found, Login again to get one.',
        403
      );

    await refreshTokenDoc.delete();

    const { userId } = decode(token) as userPayload;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      errorResponse(ctx, 'User Not Found.', 404);
      return;
    }

    const accessToken = await generateJWT(user._id);
    const refreshToken = await generateRefreshJWT(user._id);

    await Token.create({ token: refreshToken, user: user._id });

    ctx.body = {
      accessToken,
      refreshToken,
    };

    ctx.response.status = 201;
  } catch (e) {
    newrelic.noticeError(e);
    console.error(e.message);
    errorResponse(ctx, e.message);
  }
});

authRouter.post('/logout', async (ctx, next) => {
  try {
    const { token } = ctx.request.body;
    await verify(token, process.env.REFRESH_SECRET);
    const refreshTokenDoc = await Token.findOne({ token });

    if (!refreshTokenDoc) {
      return errorResponse(
        ctx,
        'Token Not Found, Login again to get one.',
        403
      );
    }

    await refreshTokenDoc.delete();
    ctx.response.status = 204;
  } catch (e) {
    newrelic.noticeError(e);
    console.error(e.message);
    errorResponse(ctx, e.message);
  }
});

export default authRouter;
