import { Hono } from "hono";
import type { Context } from "@/api/utils/context";
import { zValidator } from "@hono/zod-validator";
import { lucia } from "@/api/utils/lucia";
import { userTable } from "@/api/database/schema/auth.schema";
import { db } from "@/api/database/database";
import type { ApiResponse, User } from "@/api/utils/types";
import { eq } from "drizzle-orm";
import { loggedIn } from "@/api/utils/loggedIn";
import {
  activateSchema,
  forgotSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "./auth.zod.ts";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "@/api/mail/mail.settings.ts";

const checkUser = async (email: string) => {
  return await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email))
    .limit(1)
    .then((result) => result[0]);
};

export const authRouter = new Hono<Context>()
  .post("/signup", zValidator("json", signUpSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    // check user
    const existingUser = await checkUser(email);

    // return error if user exists
    if (existingUser) {
      return c.json<ApiResponse>({
        success: false,
        message: "User already exists",
        data: null,
      });
    }

    const token = crypto.randomUUID();
    // Set token expiration to 24 hours from now
    const tokenExpiry = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ).toISOString();

    // Create a new user
    await db
      .insert(userTable)
      .values({
        id: crypto.randomUUID(),
        email,
        token,
        isVerified: false,
        tokenExpire: tokenExpiry,
        password: await Bun.password.hash(password),
      })
      .returning();

    // Send account verification email
    await sendVerificationEmail(email, token);

    return c.json<ApiResponse>({
      success: true,
      message: `User ${email} has been created. Please verity the account by follow the instructions mailed to you.`,
      data: null,
    });
  })
  .get("/verify/:token", async (c) => {
    const token = c.req.param("token");

    // Find user by token
    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.token, token))
      .limit(1)
      .then((result) => result[0]);

    // Return error if user does not exist or token is invalid
    if (!existingUser) {
      return c.json<ApiResponse>({
        success: false,
        message: "Invalid verification token",
        data: null,
      });
    }

    // Check if token has expired (24 hours)
    const tokenExpiry = new Date(existingUser.tokenExpire || "");
    const now = new Date();
    if (now > tokenExpiry) {
      return c.json<ApiResponse>({
        success: false,
        message: "Verification token has expired. Please request a new one.",
        data: null,
      });
    }

    // Update user to verified status
    await db
      .update(userTable)
      .set({
        isVerified: true,
        token: null,
        tokenExpire: null,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(userTable.id, existingUser.id));

    return c.json<ApiResponse>({
      success: true,
      message: "Account verified successfully. You can now log in.",
      data: null,
    });
  })
  .post("/signin", zValidator("json", signInSchema), async (c) => {
    const { email, password } = c.req.valid("json");
    //check user
    const existingUser = await checkUser(email);

    // return error if user does not exist
    if (!existingUser) {
      return c.json<ApiResponse>({
        success: false,
        message: "Invalid credentials",
        data: null,
      });
    }

    // return error if user is not verified
    if (existingUser.isVerified === false && existingUser.token !== null) {
      return c.json<ApiResponse>({
        success: false,
        message: "Account was not verified",
        data: null,
      });
    }

    // check password
    const validPassword = await Bun.password.verify(
      password,
      existingUser.password
    );
    if (!validPassword) {
      return c.json<ApiResponse>({
        success: false,
        message: "Invalid credentials",
        data: null,
      });
    }

    // create session
    const session = await lucia.createSession(existingUser.id, { email });
    const sessionCookie = lucia.createSessionCookie(session.id).serialize();

    c.header("Set-Cookie", sessionCookie, { append: true });

    return c.json<ApiResponse<User>>({
      success: true,
      message: "Logged in",
      data: {
        email: existingUser.email,
        fullname: existingUser.fullname,
        avatar: existingUser.avatar,
        id: existingUser.id,
      },
    });
  })
  .get("/signout", loggedIn, async (c) => {
    const session = c.get("session");
    if (!session) {
      return c.json<ApiResponse>({
        success: false,
        message: "Not logged in",
        data: null,
      });
    }

    await lucia.invalidateSession(session.id);
    c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize());
    return c.json<ApiResponse>({
      success: true,
      message: "Logged out successfully",
      data: null,
    });
  })
  .get("/user", loggedIn, async (c) => {
    const user = c.get("user")!;

    return c.json<ApiResponse<User>>({
      success: true,
      message: "User fetched",
      data: {
        email: user.email,
        fullname: user.fullname,
        avatar: user.avatar,
        id: user.id,
      },
    });
  })
  .post("/activate", zValidator("json", activateSchema), async (c) => {
    const { token } = c.req.valid("json");
    //check user
    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.token, token))
      .limit(1)
      .then((result) => result[0]);

    // return error if user does not exist
    if (!existingUser) {
      return c.json<ApiResponse>({
        success: false,
        message: "Invalid token",
        data: null,
      });
    }

    // Check if token has expired (24 hours)
    const tokenExpiry = new Date(existingUser.updatedAt || "");
    const now = new Date();
    if (now > tokenExpiry) {
      return c.json<ApiResponse>({
        success: false,
        message: "Verification token has expired. Please request a new one.",
        data: null,
      });
    }

    // update user
    await db
      .update(userTable)
      .set({
        isVerified: true,
        token: null,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(userTable.id, existingUser.id));

    return c.json<ApiResponse>({
      success: true,
      message: "Account activated. Please log in.",
      data: null,
    });
  })
  .post("/forgot", zValidator("json", forgotSchema), async (c) => {
    const { email } = c.req.valid("json");

    // check user
    const existingUser = await checkUser(email);

    // return success even if user doesn't exist (for security reasons)
    if (!existingUser) {
      return c.json<ApiResponse>({
        success: true,
        message:
          "If your email is registered, you will receive a password reset link",
        data: null,
      });
    }

    // Generate reset token
    const token = crypto.randomUUID();
    // Set token expiration to 1 hour from now
    const tokenExpiry = new Date(Date.now() + 3600000).toISOString();

    // Update user with reset token
    await db
      .update(userTable)
      .set({
        token,
        tokenExpire: tokenExpiry,
      })
      .where(eq(userTable.id, existingUser.id));

    // Send password reset email
    await sendPasswordResetEmail(email, token);

    return c.json<ApiResponse>({
      success: true,
      message:
        "If your email is registered, you will receive a password reset link",
      data: null,
    });
  })
  .post(
    "/reset-password",
    zValidator("json", resetPasswordSchema),
    async (c) => {
      const { token, password } = c.req.valid("json");

      //check user
      const existingUser = await checkUser(token);

      // return error if user does not exist
      if (!existingUser) {
        return c.json<ApiResponse>({
          success: false,
          message: "Invalid credentials",
          data: null,
        });
      }

      // return error if token does not match
      if (existingUser.token !== token) {
        return c.json<ApiResponse>({
          success: false,
          message: "Invalid token",
          data: null,
        });
      }

      // update user
      await db
        .update(userTable)
        .set({
          token: null,
          updatedAt: new Date().toISOString(),
          isVerified: true,
          password: await Bun.password.hash(password),
        })
        .where(eq(userTable.id, existingUser.id));

      return c.json<ApiResponse>({
        success: true,
        message: "Password reset successfully",
        data: null,
      });
    }
  );
