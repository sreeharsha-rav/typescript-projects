import { Hono } from "hono";
import { logger } from "hono/logger";
import admin from "./routes/admin";
import user from "./routes/user";

const app = new Hono();
app.use(logger());

app.route("/admin", admin);
app.route("/user", user);

export default app;
