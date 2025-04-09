/**
 * Position Zod Schema
 * 
 * This file contains Zod schemas for position CRUD operations
 */

import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { positionTable } from "@/api/database/schema/business.schema";
import { ApiResponse } from "@/api/utils/types";

// Base schemas generated from the database table
export const insertPositionSchema = createInsertSchema(positionTable);
export const selectPositionSchema = createSelectSchema(positionTable);

// Position type derived from the select schema
export type Position = z.infer<typeof selectPositionSchema>;

// Job description schema
export const jobDescriptionSchema = z.object({
  responsibilities: z.array(z.string()).optional(),
  requirements: z.array(z.string()).optional(),
  qualifications: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
});

// Salary schema
export const salarySchema = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
  currency: z.string().optional(),
  period: z.enum(["hourly", "daily", "weekly", "monthly", "yearly"]).optional(),
});

// Create position schema
export const createPositionSchema = insertPositionSchema.extend({
  jobDescription: jobDescriptionSchema.optional(),
  salary: salarySchema.optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// Update position schema
export const updatePositionSchema = createPositionSchema.partial();

// Position response schema
export const positionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: selectPositionSchema.optional(),
});

// Positions list response schema
export const positionsListResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(selectPositionSchema).optional(),
});

// Type definitions for API responses
export type PositionResponse = ApiResponse<Position>;
export type PositionsListResponse = ApiResponse<Position[]>;