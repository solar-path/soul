import type { Config } from "drizzle-kit";

export default {
  schema: "./src/api/database/schema/**.schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env["DATABASE_URL"]!,
  },
} satisfies Config;
