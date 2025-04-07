import { z } from "zod";

/**
 * UUID validation schema for ID parameters
 */
export const idSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID format" }),
});

/**
 * UUID parameter schema for route params
 */
export const uuidParamSchema = z
  .string()
  .uuid({ message: "Invalid UUID format" });

/**
 * Type for UUID ID
 */
export type ID = z.infer<typeof idSchema>["id"];
