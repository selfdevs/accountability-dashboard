import Router from 'koa-router';
import authMiddleware from '../middlewares/authMiddleware';
import { ApplicationContext } from '../index';
import { DefaultState } from 'koa';
import newrelic from 'newrelic';
import User from '../domains/user/model';
import _ from 'lodash';
import { errorResponse } from '../services/httpService';

const userRouter = new Router<DefaultState, ApplicationContext>();

userRouter.get('/:username', async (ctx, next) => {
  try {
    const { username } = ctx.params;
    const user = await User.findOne({ username });
    if (!user) return errorResponse(ctx, 'User not found', 404);
    ctx.body = _.pick(user, [
      'dashboardTitle',
      'discordId',
      'discordAvatar',
      'username',
    ]);
    ctx.response.status = 200;
  } catch (e) {
    newrelic.noticeError(e);
    console.error(e);
    errorResponse(ctx, 'Fail to get user');
  }
});

userRouter.use(authMiddleware);
userRouter.get('/', (ctx, next) => {
  ctx.body = ctx.user;
  ctx.response.status = 200;
});

userRouter.patch('/', async (ctx, next) => {
  try {
    const user = new User(ctx.user);
    const data = ctx.request.body;
    Object.assign(user, data);
    await user.save();
    ctx.body = user;
    ctx.response.status = 200;
  } catch (e) {
    newrelic.noticeError(e);
    console.error(e);
    ctx.response.status = 500;
  }
});

export default userRouter;
