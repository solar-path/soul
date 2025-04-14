import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db } from "../../database/database";
import { postTable } from "../../database/schema/post.schema";
import { userTable } from "../../database/schema/auth.schema";
import { eq } from "drizzle-orm";
import { postIdSchema } from "./posts.zod";

const postsRoutes = new Hono()
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
  });

export default postsRoutes;
