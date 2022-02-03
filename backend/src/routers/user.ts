import Router from 'koa-router';
import authMiddleware from '../middlewares/authMiddleware';
import { ApplicationContext } from '../index';
import { DefaultState } from 'koa';
import newrelic from 'newrelic';
import User from '../domains/user/model';
import _ from 'lodash';
import { errorResponse } from '../services/httpService';
import { getCurrentMonthEntries } from '../services/entryService';

const userRouter = new Router<DefaultState, ApplicationContext>();

userRouter.get('/', async (ctx, next) => {
  try {
    const users = await User.find();
    const usersWithEntries = await Promise.all(
      users.map(async (user) => {
        const entries = await getCurrentMonthEntries(user._id);

        return { ...user.toObject(), entries };
      })
    );
    ctx.body = usersWithEntries.filter(({ entries }) => entries.length > 0);
  } catch (error) {
    errorResponse(ctx, error);
  }
});

userRouter.use('/me', authMiddleware);
userRouter.get('/me', (ctx, next) => {
  ctx.body = ctx.user;
  ctx.response.status = 200;
});

userRouter.patch('/me', async (ctx, next) => {
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

export default userRouter;
