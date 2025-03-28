import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { z } from "zod";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { sessionTable, userTable } from "./schema/auth.schema";

const EnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
});

const processEnv = EnvSchema.parse(process.env);

const sqlite = new Database(processEnv.DATABASE_URL);
export const db = drizzle(sqlite);

export const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);
