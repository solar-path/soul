/**
 * Database table drop utility
 *
 * This script drops all tables from the database and cleans up avatar files.
 * USE WITH CAUTION: This will delete all data in the database and avatar files.
 */

// Direct SQLite access for dropping tables
import { Database } from "bun:sqlite";
import { z } from "zod";
import fs from "node:fs";
import path from "node:path";

// Access the raw SQLite connection
const EnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
});

const processEnv = EnvSchema.parse(process.env);
const sqlite = new Database(processEnv.DATABASE_URL);

// Avatar directory path
const AVATARS_DIR = path.join(process.cwd(), "public", "uploads", "avatars");

/**
 * Deletes all files in the avatars directory
 */
async function deleteAvatarFiles() {
  console.log("Starting avatar files cleanup...");

  try {
    // Check if directory exists
    if (!fs.existsSync(AVATARS_DIR)) {
      console.log("Avatars directory does not exist, creating it...");
      fs.mkdirSync(AVATARS_DIR, { recursive: true });
      return;
    }

    // Read all files in the directory
    const files = fs.readdirSync(AVATARS_DIR);

    // Delete each file
    for (const file of files) {
      // Skip .gitkeep or other special files you want to keep
      if (file === ".gitkeep") continue;

      const filePath = path.join(AVATARS_DIR, file);
      // Check if it's a file (not a directory)
      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
        console.log(`Deleted avatar file: ${file}`);
      }
    }

    console.log("✅ All avatar files have been deleted successfully.");
  } catch (error) {
    console.error("Error deleting avatar files:", error);
  }
}

/**
 * Drops all tables from the database and cleans up avatar files
 */
async function dropAllTables() {
  console.log(
    "⚠️ WARNING: This will delete all data in the database and avatar files ⚠️"
  );
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
  await deleteAvatarFiles();
  await dropAllTables();
}

export { dropAllTables };
