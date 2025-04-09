/**
 * Department Zod Schema
 * 
 * This file contains Zod schemas for department CRUD operations
 */

import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { departmentTable } from "@/api/database/schema/business.schema";
import { ApiResponse } from "@/api/utils/types";

// Base schemas generated from the database table
export const insertDepartmentSchema = createInsertSchema(departmentTable);
export const selectDepartmentSchema = createSelectSchema(departmentTable);

// Department type derived from the select schema
export type Department = z.infer<typeof selectDepartmentSchema>;

// Create department schema
export const createDepartmentSchema = insertDepartmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// Update department schema
export const updateDepartmentSchema = createDepartmentSchema.partial();

// Department response schema
export const departmentResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: selectDepartmentSchema.optional(),
});

// Departments list response schema
export const departmentsListResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(selectDepartmentSchema).optional(),
});

// Type definitions for API responses
export type DepartmentResponse = ApiResponse<Department>;
export type DepartmentsListResponse = ApiResponse<Department[]>;