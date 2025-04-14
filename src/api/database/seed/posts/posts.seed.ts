import { db } from "../../database";
import { postTable } from "../../schema/post.schema";
import { userTable } from "../../schema/auth.schema";

import { InferSelectModel } from "drizzle-orm";
import postList from "./posts.json";

// Type for the user model based on the schema
type User = InferSelectModel<typeof userTable>;

/**
 * Seeds posts data into the database
 * @param admin The admin user who will be set as the author of the posts
 */
export const seedPosts = async (admin: User) => {
  try {
    // Create posts with the admin user as the author
    for (const post of postList) {
      await db.insert(postTable).values({
        id: crypto.randomUUID(),
        title: post.title,
        content: post.content,
        author: admin.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      console.log(`✅ Post "${post.title}" created successfully!`);
    }

    console.log("✅ All posts seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding posts:", error);
    throw error;
  }
};
