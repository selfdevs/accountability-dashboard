import Router from 'koa-router';
import { generateAndStoreDiscordCredentials } from '../services/discordService';
import User from '../domains/user/model';
import { generateJWT } from '../services/authService';
import newrelic from 'newrelic';
import { errorResponse } from '../services/httpService';

const authRouter = new Router();

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
    user.discordCredentials = discordCredentialsEntity._id;
    user.discordId = id;
    user.discordAvatar = avatar;
    await user.save();
    const token = await generateJWT(user._id);
    ctx.body = {
      token,
    };
    ctx.response.status = 200;
  } catch (e) {
    newrelic.noticeError(e);
    console.error(e.message);
    errorResponse(ctx, e.message);
  }
});

export default authRouter;
