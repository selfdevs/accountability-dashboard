import Koa, { DefaultState } from 'koa';
import cors from '@koa/cors';
import koaBody from 'koa-body';
import Router from 'koa-router';
import serve from 'koa-static';
import authRouter from './routers/auth';
import { indexNewRelicScriptInjection } from './services/monitoringService';
import userRouter from './routers/user';
import 'newrelic';
import './services/envService';
import './services/databaseService';
import { UserInterface } from './domains/user/model';
import entryRouter from './routers/entry';

export interface ApplicationContext {
  user: UserInterface;
}

const app = new Koa<DefaultState, ApplicationContext>();
const apiRouter = new Router({ prefix: '/api' });

app.use(cors());
app.use(koaBody());

apiRouter.use('/auth', authRouter.routes());
apiRouter.use('/user', userRouter.routes());
apiRouter.use('/entry', entryRouter.routes());
app.use(apiRouter.routes());
app.use((ctx, next) => {
  if (!ctx.url.startsWith('/api')) return next();
});
app.use(indexNewRelicScriptInjection);
app.use(serve('../frontend/build'));

app.listen(8001, () => {
  console.info('server started');
});
