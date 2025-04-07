import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const userTable = sqliteTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullname: text("fullname"),
  isVerified: integer("is_verified", { mode: "boolean" }).default(false),
  tokenExpire: text("token_expire"),
  avatar: text("avatar"),
  dob: text("dob"),
  token: text("token"),
  gender: text("gender"),
  contact: text("contact", { mode: "json" }), // Store as JSON string
  address: text("address", { mode: "json" }), // Store as JSON string
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at"),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
});
