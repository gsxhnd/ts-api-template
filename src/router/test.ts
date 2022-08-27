import Router from "@koa/router";
import { test } from "../handler/test";

const test_route = new Router();

test_route.get("/", async (ctx, next) => {
  ctx.body = "Hello Body";
});

test_route.get("/test", test);

export { test_route };
