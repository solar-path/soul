/**
 * Country Zod Schema
 * 
 * This file contains Zod schemas for country CRUD operations
 */

import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { countryTable } from "@/api/database/schema/business.schema";
import { ApiResponse } from "@/api/utils/types";

// Base schemas generated from the database table
export const insertCountrySchema = createInsertSchema(countryTable);
export const selectCountrySchema = createSelectSchema(countryTable);

// Country type derived from the select schema
export type Country = z.infer<typeof selectCountrySchema>;

// Create country schema
export const createCountrySchema = insertCountrySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// Update country schema
export const updateCountrySchema = createCountrySchema.partial();

// Country response schema
export const countryResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: selectCountrySchema.optional(),
});

// Countries list response schema
export const countriesListResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(selectCountrySchema).optional(),
});

// Type definitions for API responses
export type CountryResponse = ApiResponse<Country>;
export type CountriesListResponse = ApiResponse<Country[]>;