import { Next, ParameterizedContext, Context } from "koa";

/**
 * 中间件-处理`token`验证
 * @param ctx
 * @param next
 * @description 需要`token`验证的接口时使用
 */
export async function testMiddleware(ctx: ParameterizedContext, next: Next) {
  console.log(ctx.request.url);
  if (ctx.request.url == "/test") {
  } else {
    ctx.body = "body";
    
  }
  await next();
}
