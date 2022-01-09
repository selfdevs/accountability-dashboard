import Router from 'koa-router';
import { generateAndStoreDiscordCredentials } from '../services/discordService';
import User from '../domains/user/model';
import { generateJWT } from '../services/authService';
import newrelic from 'newrelic';

const authRouter = new Router();

authRouter.post('/discord', async (ctx, next) => {
  try {
    const { code } = ctx.request.body;
    const { email, username, discordCredentialsEntity } =
      await generateAndStoreDiscordCredentials(code);
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, username });
    }
    user.discordCredentials = discordCredentialsEntity._id;
    await user.save();
    const token = await generateJWT(user._id);
    ctx.body = {
      token,
    };
    ctx.response.status = 200;
  } catch (e) {
    newrelic.noticeError(e);
    console.error(e.message);
    ctx.status = 500;
  }
});

authRouter.get('/test', async (ctx, next) => {
  const user = new User({ email: 'clement@champouillon.com ' });
  await user.save();
  ctx.response.status = 200;
});

export default authRouter;
