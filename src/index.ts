import Koa from "koa";

import { routes } from "./router";

const app = new Koa();

app.use(routes.routes());
app.listen(3000);
