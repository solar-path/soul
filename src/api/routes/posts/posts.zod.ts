import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { postTable } from "../../database/schema/post.schema";

// Generate schemas from Drizzle schema definitions
const insertPostSchema = createInsertSchema(postTable);
const selectPostSchema = createSelectSchema(postTable);

// ID schema for validation
export const postIdSchema = z.object({
  id: z.string().uuid(),
});

// Schema for creating a new post
export const createPostSchema = insertPostSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    title: z.string().min(3).max(100),
    content: z.string().min(10),
    author: z.string().uuid(),
  });

// Schema for updating an existing post
export const updatePostSchema = insertPostSchema
  .partial()
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    author: true,
  })
  .extend({
    title: z.string().min(3).max(100).optional(),
    content: z.string().min(10).optional(),
  });

// Schema for post response
export const postResponseSchema = selectPostSchema.extend({
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  authorFullname: z.string().nullable(),
  authorAvatar: z.string().nullable(),
});

// Schema for multiple posts response
export const postsResponseSchema = z.array(postResponseSchema);

// Define the Post type based on our database schema
export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string | null;
  author: string;
  authorFullname: string | null;
  authorAvatar: string | null;
};
