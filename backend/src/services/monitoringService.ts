import { readFileSync } from 'fs';
import newrelic from 'newrelic';
import Koa from 'koa';

export const indexNewRelicScriptInjection: Koa.Middleware = async (
  ctx,
  next
) => {
  const regexp = /\..*$/;
  if (!regexp.test(ctx.url)) {
    const index = readFileSync('../frontend/build/index.html').toString();
    const withInjection = index.replace(
      '<meta charset="utf-8"/>',
      '<meta charset="utf-8"/>' + newrelic.getBrowserTimingHeader()
    );
    return (ctx.body = withInjection);
  }
  await next();
};
