"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_body_1 = __importDefault(require("koa-body"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_static_1 = __importDefault(require("koa-static"));
const auth_1 = __importDefault(require("./routers/auth"));
const monitoringService_1 = require("./services/monitoringService");
const user_1 = __importDefault(require("./routers/user"));
require("newrelic");
require("./services/envService");
require("./services/databaseService");
const app = new koa_1.default();
const apiRouter = new koa_router_1.default();
app.use((0, cors_1.default)());
app.use((0, koa_body_1.default)());
apiRouter.use('/api/auth', auth_1.default.routes());
apiRouter.use('/api/user', user_1.default.routes());
app.use(apiRouter.routes());
app.use(monitoringService_1.indexNewRelicScriptInjection);
app.use((0, koa_static_1.default)('../frontend/build'));
app.listen(5000, () => {
    console.info('server started');
});
//# sourceMappingURL=index.js.map