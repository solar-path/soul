import { Hono } from "hono";
import type { Context } from "@/api/utils/context";
import { cors } from "hono/cors";
import { lucia } from "@/api/utils/lucia";
import { HTTPException } from "hono/http-exception";
import type { ApiResponse } from "@/api/utils/types";
import { authRouter } from "@/api/routes/auth/auth.routes";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { contactUsRouter } from "@/api/routes/contactUs/contactUs.routes";
import { companyRoutes } from "./routes/business/company/company.routes";
import { departmentRoutes } from "./routes/business/department/department.routes";
import { industryRoutes } from "./routes/business/industry/industry.routes";
import { countryRoutes } from "./routes/business/country/country.routes";
import { employeeRoutes } from "./routes/business/employee/employee.routes";
import { positionRoutes } from "./routes/business/position/position.routes";
import postsRoutes from "./routes/posts/posts.routes";

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
  .route("/business/company", companyRoutes)
  .route("/business/employee", employeeRoutes)
  .route("/business/position", positionRoutes)
  .route("/business/department", departmentRoutes)
  .route("/business/industry", industryRoutes)
  .route("/business/country", countryRoutes)
  .route("/contact-us", contactUsRouter)
  .route("/posts", postsRoutes);

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
