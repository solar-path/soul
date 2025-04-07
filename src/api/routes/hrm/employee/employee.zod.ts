import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { orgchartTable } from "@/api/database/schema/business.schema";

// Select schema (for GET operations)
export const selectEmployeeSchema = createSelectSchema(orgchartTable);
export type Employee = z.infer<typeof selectEmployeeSchema>;

// Insert schema (for POST operations)
export const insertEmployeeSchema = createInsertSchema(orgchartTable, {
  id: z.string().uuid().optional(),
  companyID: z.string().uuid(),
  departmentID: z.string().uuid().nullable().optional(),
  positionID: z.string().uuid().nullable().optional(),
  employeeID: z.string().uuid(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;

// Update schema (for PUT operations)
export const updateEmployeeSchema = insertEmployeeSchema.partial().required({
  id: true,
});
export type UpdateEmployee = z.infer<typeof updateEmployeeSchema>;

// Delete schema (for DELETE operations)
export const deleteEmployeeSchema = z.object({
  id: z.string().uuid(),
});
export type DeleteEmployee = z.infer<typeof deleteEmployeeSchema>;

// Response schemas
export const employeeResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: selectEmployeeSchema.optional(),
});

export const employeesResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(selectEmployeeSchema).optional(),
});