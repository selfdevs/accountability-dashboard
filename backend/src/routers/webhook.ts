import Router from 'koa-router';
import { handleInteraction, verifySignature } from '../services/discordService';
import { errorResponse } from '../services/httpService';

const webhookRouter = new Router();

webhookRouter.post('/', async (ctx, next) => {
  try {
    const signature = ctx.get('X-Signature-Ed25519');
    const timestamp = ctx.get('X-Signature-Timestamp');
    verifySignature(signature, timestamp, JSON.stringify(ctx.request.body));
    console.log('Webhook confirmed');
    ctx.body = await handleInteraction(ctx.request.body);
  } catch (e) {
    console.log(e.message);
    ctx.response.status = 401;
    ctx.body = 'invalid request signature';
    return errorResponse(ctx, e.message, 401);
  }
});

export default webhookRouter;
