import { db } from "../../database";
import { userTable } from "../../schema/auth.schema";
import { join } from "path";
import { mkdir, readFile, writeFile } from "fs/promises";
import { eq } from "drizzle-orm";
import { InferSelectModel } from "drizzle-orm";

// Type for the user model based on the schema
type User = InferSelectModel<typeof userTable>;

export const seedAdminUser = async (): Promise<User> => {
  try {
    // Generate a unique ID for the admin user
    const userId = crypto.randomUUID();

    // Create the admin user without avatar first
    const adminUser = {
      id: userId,
      email: "itgroup.luck@gmail.com",
      password: await Bun.password.hash("Bl@ckB00k@"),
      fullname: "Assanali Tungat",
      isVerified: true,
      tokenExpire: null,
      avatar: null, // Will be updated after file upload
      dob: null,
      token: null,
      gender: "male",
      contact: null,
      address: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Insert the admin user into the database
    await db.insert(userTable).values(adminUser);

    // Now handle the avatar upload
    try {
      // Path to the avatar image - using absolute path instead of import.meta.url
      const avatarSourcePath = join(
        process.cwd(),
        "src",
        "api",
        "database",
        "seed",
        "users",
        "admin.avatar.jpg"
      );

      // Create uploads directory if it doesn't exist
      const uploadsDir = join(process.cwd(), "public", "uploads", "avatars");
      await mkdir(uploadsDir, { recursive: true });

      // Generate a filename for the avatar
      const fileName = `${userId}-${Date.now()}.jpg`;
      const filePath = join(uploadsDir, fileName);

      // Read the avatar file
      const fileBuffer = await readFile(avatarSourcePath);

      // Write the file to the uploads directory
      await writeFile(filePath, fileBuffer);

      // Generate the URL for the avatar
      const avatarUrl = `/uploads/avatars/${fileName}`;

      // Update the user's avatar in the database
      const admin = await db
        .update(userTable)
        .set({
          avatar: avatarUrl,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(userTable.id, userId))
        .returning()
        .then((admin) => admin[0]);

      console.log("✅ Admin avatar uploaded successfully!");
      console.log("✅ Admin user seeding completed successfully!");
      return admin;
    } catch (avatarError) {
      console.error(
        "Error uploading admin avatar (continuing anyway):",
        avatarError
      );

      // If avatar upload fails, fetch and return the admin user without avatar
      const admin = await db
        .select()
        .from(userTable)
        .where(eq(userTable.id, userId))
        .then((results) => results[0]);

      console.log("✅ Admin user seeding completed successfully!");
      return admin;
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
    throw error;
  }
};
