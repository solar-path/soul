import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db } from "../../database/database";
import { postTable } from "../../database/schema/post.schema";
import { userTable } from "../../database/schema/auth.schema";
import { eq } from "drizzle-orm";
import { createPostSchema, postIdSchema, updatePostSchema } from "./posts.zod";
import { loggedIn } from "@/api/utils/loggedIn";

const postsRoutes = new Hono()
  // get all posts
  .get("/", async (c) => {
    try {
      const posts = await db
        .select({
          id: postTable.id,
          title: postTable.title,
          content: postTable.content,
          createdAt: postTable.createdAt,
          updatedAt: postTable.updatedAt,
          author: postTable.author,
          authorFullname: userTable.fullname,
          authorAvatar: userTable.avatar,
        })
        .from(postTable)
        .leftJoin(userTable, eq(postTable.author, userTable.id))
        .orderBy(postTable.createdAt);
      return c.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      return c.json({ error: "Failed to fetch posts" }, 500);
    }
  })
  // get top 10 posts
  .get("/top", async (c) => {
    try {
      const posts = await db
        .select({
          id: postTable.id,
          title: postTable.title,
          content: postTable.content,
          createdAt: postTable.createdAt,
          updatedAt: postTable.updatedAt,
          author: postTable.author,
          authorFullname: userTable.fullname,
          authorAvatar: userTable.avatar,
        })
        .from(postTable)
        .leftJoin(userTable, eq(postTable.author, userTable.id))
        .orderBy(postTable.createdAt)
        .limit(10);
      return c.json(posts);
    } catch (error) {
      console.error("Error fetching top posts:", error);
      return c.json({ error: "Failed to fetch top posts" }, 500);
    }
  })
  // get post by id
  .get("/:id", zValidator("param", postIdSchema), async (c) => {
    try {
      const { id } = c.req.valid("param");
      const posts = await db
        .select({
          id: postTable.id,
          title: postTable.title,
          content: postTable.content,
          createdAt: postTable.createdAt,
          updatedAt: postTable.updatedAt,
          author: postTable.author,
          authorFullname: userTable.fullname,
          authorAvatar: userTable.avatar,
        })
        .from(postTable)
        .leftJoin(userTable, eq(postTable.author, userTable.id))
        .where(eq(postTable.id, id))
        .limit(1);

      if (!posts || posts.length === 0) {
        return c.json({ error: "Post not found" }, 404);
      }

      // Return the first (and only) post in the array
      return c.json(posts[0]);
    } catch (error) {
      console.error("Error fetching post:", error);
      return c.json({ error: "Failed to fetch post" }, 500);
    }
  })
  // create new post
  .post("/", zValidator("json", createPostSchema), loggedIn, async (c) => {
    try {
      const postData = c.req.valid("json");

      const newPost = {
        id: crypto.randomUUID(),
        title: postData.title,
        content: postData.content,
        author: postData.author,
        createdAt: new Date().toISOString(),
      };

      await db.insert(postTable).values(newPost);

      // Fetch the created post with author details
      const createdPost = await db
        .select({
          id: postTable.id,
          title: postTable.title,
          content: postTable.content,
          createdAt: postTable.createdAt,
          updatedAt: postTable.updatedAt,
          author: postTable.author,
          authorFullname: userTable.fullname,
          authorAvatar: userTable.avatar,
        })
        .from(postTable)
        .leftJoin(userTable, eq(postTable.author, userTable.id))
        .where(eq(postTable.id, newPost.id))
        .limit(1);

      return c.json(createdPost[0], 201);
    } catch (error) {
      console.error("Error creating post:", error);
      return c.json({ error: "Failed to create post" }, 500);
    }
  })

  // Update an existing post
  .patch(
    "/:id",
    zValidator("param", postIdSchema),
    zValidator("json", updatePostSchema),
    loggedIn,
    async (c) => {
      try {
        const { id } = c.req.valid("param");
        const updateData = c.req.valid("json");

        // Check if post exists
        const existingPost = await db
          .select()
          .from(postTable)
          .where(eq(postTable.id, id))
          .limit(1);

        if (!existingPost || existingPost.length === 0) {
          return c.json({ error: "Post not found" }, 404);
        }

        // Update the post
        await db
          .update(postTable)
          .set({
            ...updateData,
            updatedAt: new Date().toISOString(),
          })
          .where(eq(postTable.id, id));

        // Fetch the updated post with author details
        const updatedPost = await db
          .select({
            id: postTable.id,
            title: postTable.title,
            content: postTable.content,
            createdAt: postTable.createdAt,
            updatedAt: postTable.updatedAt,
            author: postTable.author,
            authorFullname: userTable.fullname,
            authorAvatar: userTable.avatar,
          })
          .from(postTable)
          .leftJoin(userTable, eq(postTable.author, userTable.id))
          .where(eq(postTable.id, id))
          .limit(1);

        return c.json(updatedPost[0]);
      } catch (error) {
        console.error("Error updating post:", error);
        return c.json({ error: "Failed to update post" }, 500);
      }
    }
  )
  // Delete a post
  .delete("/:id", zValidator("param", postIdSchema), loggedIn, async (c) => {
    try {
      const { id } = c.req.valid("param");

      // Check if post exists
      const existingPost = await db
        .select()
        .from(postTable)
        .where(eq(postTable.id, id))
        .limit(1);

      if (!existingPost || existingPost.length === 0) {
        return c.json({ error: "Post not found" }, 404);
      }

      // Delete the post
      await db.delete(postTable).where(eq(postTable.id, id));

      return c.json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      return c.json({ error: "Failed to delete post" }, 500);
    }
  });

export default postsRoutes;
