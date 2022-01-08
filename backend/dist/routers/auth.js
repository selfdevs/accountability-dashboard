"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const discordService_1 = require("../services/discordService");
const model_1 = __importDefault(require("../domains/user/model"));
const authService_1 = require("../services/authService");
const newrelic_1 = __importDefault(require("newrelic"));
const authRouter = new koa_router_1.default();
authRouter.post('/discord', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = ctx.request.body;
        const { email, username, discordCredentialsEntity } = yield (0, discordService_1.generateAndStoreDiscordCredentials)(code);
        let user = yield model_1.default.findOne({ email });
        if (!user) {
            user = new model_1.default({ email, username });
        }
        user.discordCredentials = discordCredentialsEntity._id;
        yield user.save();
        const token = yield (0, authService_1.generateJWT)(user._id);
        ctx.body = {
            token,
        };
        ctx.response.status = 200;
    }
    catch (e) {
        newrelic_1.default.noticeError(e);
        console.error(e.message);
        ctx.status = 500;
    }
}));
authRouter.get('/test', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new model_1.default({ email: 'clement@champouillon.com ' });
    yield user.save();
    ctx.response.status = 200;
}));
exports.default = authRouter;
//# sourceMappingURL=auth.js.map