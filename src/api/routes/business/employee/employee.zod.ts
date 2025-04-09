/**
 * Employee Zod Schema
 * 
 * This file contains Zod schemas for employee CRUD operations
 */

import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { orgchartTable } from "@/api/database/schema/business.schema";
import { ApiResponse } from "@/api/utils/types";

// Base schemas generated from the database table
// Note: We're using orgchartTable since there's no dedicated employee table
export const insertEmployeeSchema = createInsertSchema(orgchartTable);
export const selectEmployeeSchema = createSelectSchema(orgchartTable);

// Employee type derived from the select schema
export type Employee = z.infer<typeof selectEmployeeSchema>;

// Create employee schema
export const createEmployeeSchema = insertEmployeeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// Update employee schema
export const updateEmployeeSchema = createEmployeeSchema.partial();

// Employee response schema
export const employeeResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: selectEmployeeSchema.optional(),
});

// Employees list response schema
export const employeesListResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(selectEmployeeSchema).optional(),
});

// Type definitions for API responses
export type EmployeeResponse = ApiResponse<Employee>;
export type EmployeesListResponse = ApiResponse<Employee[]>;