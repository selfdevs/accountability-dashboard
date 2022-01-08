import Router from "koa-router";
import authMiddleware from "../middlewares/authMiddleware";
import {ApplicationContext} from "../index";
import {DefaultState} from "koa";
import Entry from '../domains/entry/model';
import newrelic from "newrelic";
import _, {pick} from "lodash";

const entryRouter = new Router<DefaultState, ApplicationContext>();

entryRouter.use(authMiddleware);
entryRouter.get('/', async (ctx, next) => {
  try {
    const entries = await Entry.find({ user: ctx.user._id });
    ctx.body = entries;
  } catch (e) {
    newrelic.noticeError(e);
    console.error(e.message);
    ctx.response.status = 500;
  }
});

entryRouter.post('/', async (ctx, next) => {
  try {
    const entry = new Entry({
      ..._.pick(ctx.request.body, ['goal', 'done', 'comment']),
      date: new Date(),
      user: ctx.user._id,
    });
    await entry.save();
    ctx.body = entry;
    ctx.response.status = 200;
  } catch (e) {
    newrelic.noticeError(e);
    console.error(e.message);
    ctx.response.status = 500;
  }
});

export default entryRouter;