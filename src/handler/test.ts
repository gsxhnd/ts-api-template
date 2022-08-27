import { Next, ParameterizedContext } from "koa";

const test = async (ctx: ParameterizedContext, next: Next) => {
  console.log(ctx.URL);
  ctx.body = "test";
};

export { test };
