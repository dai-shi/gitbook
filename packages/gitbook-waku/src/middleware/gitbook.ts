import type { Middleware } from 'waku/config';

const gitbookMiddleware: Middleware = () => {
    return async (ctx, next) => {
        // TODO do something before
        await next();
        // TODO do something after
        ctx.res.headers ||= {};
    };
};

export default gitbookMiddleware;
