import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { userTable } from "./auth.schema";

export const contactUsTable = sqliteTable("contact_us", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at"),
});

export const respondToContactUsTable = sqliteTable("respond_to_contact_us", {
  id: text("id").primaryKey(),
  contactUsID: text("contact_us_id")
    .notNull()
    .references(() => contactUsTable.id),
  message: text("message").notNull(),
  author: text("author")
    .notNull()
    .references(() => userTable.id),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at"),
});
