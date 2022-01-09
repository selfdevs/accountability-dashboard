import Router from 'koa-router';
import authMiddleware from '../middlewares/authMiddleware';
import { ApplicationContext } from '../index';
import { DefaultState } from 'koa';
import newrelic from 'newrelic';
import User from '../domains/user/model';

const userRouter = new Router<DefaultState, ApplicationContext>();

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
