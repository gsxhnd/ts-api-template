import Router from "@koa/router";

import { test_route } from "./test";

import { testMiddleware } from "../middleware";

const routes = new Router({});

routes.use(testMiddleware);
routes.use(test_route.routes());

export { routes };
