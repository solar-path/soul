import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { positionTable } from "@/api/database/schema/business.schema";

// JSON schema for job description and salary
export const jsonSchema = z.union([
  z.record(z.unknown()),
  z.array(z.unknown()),
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
]);

// Type for JSON fields
export type JsonValue = z.infer<typeof jsonSchema>;

// Select schema (for GET operations)
export const selectPositionSchema = createSelectSchema(positionTable);

// Define Position type with proper JSON field types
export type Position = {
  id: string;
  title: string;
  companyID: string;
  jobDescription: JsonValue | null;
  salary: JsonValue | null;
  isVacant: boolean | null;
  parentID: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

// Insert schema (for POST operations)
export const insertPositionSchema = createInsertSchema(positionTable, {
  id: z.string().uuid().optional(),
  title: z.string().min(2).max(100),
  companyID: z.string().uuid(),
  jobDescription: jsonSchema.optional(),
  salary: jsonSchema.optional(),
  isVacant: z.boolean().optional().default(true),
  parentID: z.string().uuid().nullable().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type InsertPosition = z.infer<typeof insertPositionSchema>;

// Update schema (for PUT operations)
export const updatePositionSchema = insertPositionSchema.partial().required({
  id: true,
});
export type UpdatePosition = z.infer<typeof updatePositionSchema>;

// Delete schema (for DELETE operations)
export const deletePositionSchema = z.object({
  id: z.string().uuid(),
});
export type DeletePosition = z.infer<typeof deletePositionSchema>;

// Response schemas
export const positionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: selectPositionSchema.optional(),
});

export const positionsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(selectPositionSchema).optional(),
});
