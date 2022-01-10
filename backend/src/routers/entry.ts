import Router from 'koa-router';
import authMiddleware from '../middlewares/authMiddleware';
import { ApplicationContext } from '../index';
import { DefaultState } from 'koa';
import Entry from '../domains/entry/model';
import newrelic from 'newrelic';
import _ from 'lodash';
import { errorResponse, successResponse } from '../services/httpService';
import User from '../domains/user/model';
import {
  generateMissingEntries,
  getCurrentMonthEntries,
} from '../services/entryService';

const entryRouter = new Router<DefaultState, ApplicationContext>();

entryRouter.get('/user/:username', async (ctx, next) => {
  try {
    const { username } = ctx.params;
    const user = await User.findOne({ username });
    if (!user) return errorResponse(ctx, 'User not found', 404);
    ctx.body = await getCurrentMonthEntries(user._id);
  } catch (e) {
    newrelic.noticeError(e);
    console.error(e.message);
    errorResponse(ctx, 'Fail to get entries');
  }
});

entryRouter.use(authMiddleware);
entryRouter.get('/', async (ctx, next) => {
  try {
    ctx.body = await getCurrentMonthEntries(ctx.user._id);
  } catch (e) {
    newrelic.noticeError(e);
    console.error(e.message);
    errorResponse(ctx, 'Fail to get entries');
  }
});

entryRouter.post('/', async (ctx, next) => {
  try {
    const entry = new Entry({
      ..._.pick(ctx.request.body, ['goal', 'done', 'comment', 'date']),
      user: ctx.user._id,
    });
    const prevEntry = await Entry.findOne({
      user: ctx.user._id,
      date: ctx.request.body.date,
    });
    if (prevEntry) throw new Error('Already a record for this day');
    await entry.save();
    ctx.body = entry;
    ctx.response.status = 200;
  } catch (e) {
    newrelic.noticeError(e);
    console.error(e.message);
    errorResponse(ctx, e.message);
  }
});

entryRouter.post('/month', async (ctx, next) => {
  try {
    await generateMissingEntries(ctx.user._id);
    successResponse(ctx, 'OK');
  } catch (e) {
    newrelic.noticeError(e);
    console.error(e.message);
    errorResponse(ctx, e.message);
  }
});

entryRouter.patch('/:id', async (ctx, next) => {
  try {
    const entry = await Entry.updateOne(
      {
        _id: ctx.params.id,
      },
      _.pick(ctx.request.body, ['goal', 'done', 'comment'])
    );
    successResponse(ctx, 'Updated');
  } catch (e) {
    newrelic.noticeError(e);
    console.error(e.message);
    errorResponse(ctx, 'Fail to update entry');
  }
});

entryRouter.del('/:id', async (ctx, next) => {
  try {
    await Entry.deleteOne({ _id: ctx.params.id });
    successResponse(ctx, 'Deleted');
  } catch (e) {
    newrelic.noticeError(e);
    console.error(e.message);
    errorResponse(ctx, 'Fail to delete entry');
  }
});

export default entryRouter;
