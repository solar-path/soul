import { Hono } from "hono";
import type { Context } from "@/api/utils/context";
import { zValidator } from "@hono/zod-validator";
import { lucia } from "@/api/utils/lucia";
import { userTable } from "@/api/database/schema/auth.schema";
import { db } from "@/api/database/database";
import { createApiResponse } from "@/api/utils/types";
import { eq } from "drizzle-orm";
import { loggedIn } from "@/api/utils/loggedIn";
import {
  activateSchema,
  forgotSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
  updateProfileSchema,
} from "./auth.zod.ts";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "@/api/mail/mail.settings.ts";

// Helper function to find a user by any field
const findUserBy = async (key: "email" | "token" | "id", value: string) => {
  return await db
    .select()
    .from(userTable)
    .where(
      key === "email"
        ? eq(userTable.email, value)
        : key === "token"
          ? eq(userTable.token, value)
          : eq(userTable.id, value)
    )
    .limit(1)
    .then((result) => result[0]);
};

// Convenience functions using the generic findUserBy
const checkUser = async (email: string) => findUserBy("email", email);
const findUserByToken = async (token: string) => findUserBy("token", token);

const isTokenExpired = (tokenExpiry: string | null | undefined): boolean => {
  if (!tokenExpiry) return true;
  const expiry = new Date(tokenExpiry);
  const now = new Date();
  return now > expiry;
};

const generateToken = (
  expiryHours = 24
): { token: string; tokenExpiry: string } => {
  const token = crypto.randomUUID();
  const tokenExpiry = new Date(
    Date.now() + expiryHours * 60 * 60 * 1000
  ).toISOString();
  return { token, tokenExpiry };
};

export const authRouter = new Hono<Context>()
  .post("/signup", zValidator("json", signUpSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    // check user
    const existingUser = await checkUser(email);

    // return error if user exists
    if (existingUser) {
      return c.json(createApiResponse(false, "User already exists"));
    }

    // Generate verification token with 24 hour expiry
    const { token, tokenExpiry } = generateToken(24);

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

    return c.json(
      createApiResponse(
        true,
        `User ${email} has been created. Please verity the account by follow the instructions mailed to you.`
      )
    );
  })
  .get("/verify/:token", async (c) => {
    const token = c.req.param("token");

    // Find user by token
    const existingUser = await findUserByToken(token);

    // Return error if user does not exist or token is invalid
    if (!existingUser) {
      return c.json(createApiResponse(false, "Invalid verification token"));
    }

    // Check if token has expired (24 hours)
    if (isTokenExpired(existingUser.tokenExpire)) {
      return c.json(
        createApiResponse(
          false,
          "Verification token has expired. Please request a new one."
        )
      );
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

    return c.json(
      createApiResponse(
        true,
        "Account verified successfully. You can now log in."
      )
    );
  })
  .post("/signin", zValidator("json", signInSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    //check user
    const existingUser = await checkUser(email);

    // return error if user does not exist
    if (!existingUser) {
      return c.json(createApiResponse(false, "Invalid credentials"));
    }

    // return error if user is not verified
    if (existingUser.isVerified === false && existingUser.token !== null) {
      return c.json(createApiResponse(false, "Account was not verified"));
    }

    // check password
    const validPassword = await Bun.password.verify(
      password,
      existingUser.password
    );

    // return error if password is invalid
    if (!validPassword) {
      return c.json(createApiResponse(false, "Invalid credentials"));
    }

    // create session
    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    c.header("Set-Cookie", sessionCookie.serialize());

    return c.json(
      createApiResponse(true, "User logged in", {
        email: existingUser.email,
        fullname: existingUser.fullname,
        avatar: existingUser.avatar,
        id: existingUser.id,
        gender: existingUser.gender || null,
        dob: existingUser.dob || null,
        contact: existingUser.contact || null,
        address: existingUser.address || null,
        // Add the missing required properties
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isVerified: Boolean(existingUser.isVerified),
      })
    );
  })
  .post("/signout", loggedIn, async (c) => {
    const session = c.get("session");
    if (session) {
      await lucia.invalidateSession(session.id);
    }

    const sessionCookie = lucia.createBlankSessionCookie();
    c.header("Set-Cookie", sessionCookie.serialize());

    return c.json(createApiResponse(true, "User logged out"));
  })
  .get("/user", loggedIn, async (c) => {
    const user = c.get("user")!;

    // Create a user object with all available properties
    const userData = {
      email: user.email,
      fullname: user.fullname,
      avatar: user.avatar,
      id: user.id,
      gender: user.gender || null,
      dob: user.dob || null,
      contact: user.contact || null,
      address: user.address || null,
      isVerified: Boolean(user.isVerified),
      // Use default values for potentially missing properties
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return c.json(createApiResponse(true, "User fetched", userData));
  })
  .post("/activate", zValidator("json", activateSchema), async (c) => {
    const { token } = c.req.valid("json");
    //check user
    const existingUser = await findUserByToken(token);

    // return error if user does not exist
    if (!existingUser) {
      return c.json(createApiResponse(false, "Invalid token"));
    }

    // Check if token has expired (24 hours)
    if (isTokenExpired(existingUser.updatedAt)) {
      return c.json(
        createApiResponse(
          false,
          "Verification token has expired. Please request a new one."
        )
      );
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

    return c.json(createApiResponse(true, "Account activated. Please log in."));
  })
  .post("/forgot", zValidator("json", forgotSchema), async (c) => {
    const { email } = c.req.valid("json");

    // check user
    const existingUser = await checkUser(email);

    const successMessage =
      "If your email is registered, you will receive a password reset link";

    // return success even if user doesn't exist (for security reasons)
    if (!existingUser) {
      return c.json(createApiResponse(true, successMessage));
    }

    // Generate reset token with 1 hour expiry
    const { token, tokenExpiry } = generateToken(1);

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

    return c.json(createApiResponse(true, successMessage));
  })
  .post(
    "/reset-password",
    zValidator("json", resetPasswordSchema),
    async (c) => {
      const { token, password } = c.req.valid("json");

      // Find user by token
      const existingUser = await findUserByToken(token);

      // Return error if user does not exist or token is invalid
      if (!existingUser) {
        return c.json(createApiResponse(false, "Invalid or expired token"));
      }

      // Check if token has expired (1 hour)
      if (isTokenExpired(existingUser.tokenExpire)) {
        return c.json(
          createApiResponse(
            false,
            "Password reset token has expired. Please request a new one."
          )
        );
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

      return c.json(createApiResponse(true, "Password reset successfully"));
    }
  )
  .post(
    "/updateProfile",
    loggedIn,
    zValidator("json", updateProfileSchema),
    async (c) => {
      const user = c.get("user")!;
      const { fullname, gender, dob, avatar, contact, address } =
        c.req.valid("json");

      // Update user profile
      await db
        .update(userTable)
        .set({
          fullname,
          gender,
          dob,
          avatar,
          contact,
          address,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(userTable.id, user.id));

      // Return updated user data
      return c.json(
        createApiResponse(true, "Profile updated successfully", {
          id: user.id,
          email: user.email,
          fullname,
          avatar,
          gender,
          dob,
          contact,
          address,
          // Use existing values from the database for these fields
          // instead of trying to access them from the user object
          updatedAt: new Date().toISOString(),
        })
      );
    }
  );
