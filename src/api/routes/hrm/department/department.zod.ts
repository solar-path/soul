import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { departmentTable } from "@/api/database/schema/business.schema";

// Select schema (for GET operations)
export const selectDepartmentSchema = createSelectSchema(departmentTable);
export type Department = z.infer<typeof selectDepartmentSchema>;

// Insert schema (for POST operations)
export const insertDepartmentSchema = createInsertSchema(departmentTable, {
  id: z.string().uuid().optional(),
  title: z.string().min(2).max(100),
  parentID: z.string().uuid().nullable().optional(),
  headcount: z.number().int().nonnegative().optional(),
  companyID: z.string().uuid(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type InsertDepartment = z.infer<typeof insertDepartmentSchema>;

// Update schema (for PUT operations)
export const updateDepartmentSchema = insertDepartmentSchema.partial().required({
  id: true,
});
export type UpdateDepartment = z.infer<typeof updateDepartmentSchema>;

// Delete schema (for DELETE operations)
export const deleteDepartmentSchema = z.object({
  id: z.string().uuid(),
});
export type DeleteDepartment = z.infer<typeof deleteDepartmentSchema>;

// Response schemas
export const departmentResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: selectDepartmentSchema.optional(),
});

export const departmentsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(selectDepartmentSchema).optional(),
});
