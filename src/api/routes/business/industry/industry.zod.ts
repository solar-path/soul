/**
 * Industry Zod Schema
 *
 * This file contains Zod schemas for industry CRUD operations
 */

import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { industryTable } from "@/api/database/schema/business.schema";
import { ApiResponse } from "@/api/utils/types";

// Base schemas generated from the database table
export const insertIndustrySchema = createInsertSchema(industryTable);
export const selectIndustrySchema = createSelectSchema(industryTable);

// Industry type derived from the select schema
export type Industry = z.infer<typeof selectIndustrySchema>;

// Create industry schema
export const createIndustrySchema = insertIndustrySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update industry schema
export const updateIndustrySchema = createIndustrySchema.partial();

// Industry response schema
export const industryResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: selectIndustrySchema.optional(),
});

// Industries list response schema
export const industriesListResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(selectIndustrySchema).optional(),
});

// Type definitions for API responses
export type IndustryResponse = ApiResponse<Industry>;
export type IndustriesListResponse = ApiResponse<Industry[]>;
