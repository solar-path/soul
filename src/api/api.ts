import { Hono } from "hono";
import type { Context } from "@/api/utils/context";
import { cors } from "hono/cors";
import { lucia } from "@/api/utils/lucia";
import { HTTPException } from "hono/http-exception";
import type { ApiResponse } from "@/api/utils/types";
import { authRouter } from "@/api/routes/auth/auth.routes";
import { logger } from "hono/logger";
import { businessRouter } from "@/api/routes/business/business.routes";
import { serveStatic } from "hono/bun";
import { contactUsRouter } from "@/api/routes/contactUs/contactUs.routes";

const app = new Hono<Context>().use(logger());

app.use("*", cors(), async (c, next) => {
  const sessionId = lucia.readSessionCookie(c.req.header("Cookie") ?? "");
  if (!sessionId) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    });
  }
  if (!session) {
    c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize(), {
      append: true,
    });
  }
  c.set("session", session);
  c.set("user", user);
  return next();
});

// API routes
const routes = app
  .basePath("/api")
  .route("/auth", authRouter)
  .route("/business", businessRouter)
  .route("/contact-us", contactUsRouter);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    const errResponse =
      err.res ??
      c.json<ApiResponse>(
        {
          success: false,
          message: err.message,
          data: null,
        },
        err.status
      );
    return errResponse;
  }

  return c.json<ApiResponse>(
    {
      success: false,
      message:
        process.env.NODE_ENV === "production"
          ? "Interal Server Error"
          : (err.stack ?? err.message),
      data: null,
    },
    500
  );
});

app.get("*", serveStatic({ root: "./dist" }));
app.get("*", serveStatic({ path: "./dist/index.html" }));

export type ApiRoutes = typeof routes;
export default app;
