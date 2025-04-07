/**
 * Database table drop utility
 *
 * This script drops all tables from the database.
 * USE WITH CAUTION: This will delete all data in the database.
 */

// Direct SQLite access for dropping tables
import { Database } from "bun:sqlite";
import { z } from "zod";

// Access the raw SQLite connection
const EnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
});

const processEnv = EnvSchema.parse(process.env);
const sqlite = new Database(processEnv.DATABASE_URL);

/**
 * Drops all tables from the database
 */
async function dropAllTables() {
  console.log("⚠️ WARNING: This will delete all data in the database ⚠️");
  console.log("Starting table drop process...");

  try {
    // Get all table names from SQLite
    const tables = sqlite
      .query(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE 'drizzle_%';"
      )
      .all() as { name: string }[];

    if (!tables || tables.length === 0) {
      console.log("No tables found to drop.");
      return;
    }

    // Disable foreign key constraints temporarily
    sqlite.run("PRAGMA foreign_keys = OFF;");

    // Drop each table
    for (const row of tables) {
      const tableName = row.name;
      console.log(`Dropping table: ${tableName}`);
      sqlite.run(`DROP TABLE IF EXISTS \`${tableName}\`;`);
    }

    // Re-enable foreign key constraints
    sqlite.run("PRAGMA foreign_keys = ON;");

    console.log("✅ All tables have been dropped successfully.");
  } catch (error) {
    console.error("Error dropping tables:", error);
  }
}

// Execute the function if this script is run directly
if (import.meta.main) {
  await dropAllTables();
}

export { dropAllTables };
