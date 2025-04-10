/**
 * Company Zod Schema
 * 
 * This file contains Zod schemas for company CRUD operations
 */

import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { companyTable } from "@/api/database/schema/business.schema";
import { ApiResponse } from "@/api/utils/types";

// Base schemas generated from the database table
export const insertCompanySchema = createInsertSchema(companyTable);
export const selectCompanySchema = createSelectSchema(companyTable);

// Company type derived from the select schema
export type Company = z.infer<typeof selectCompanySchema>;

// Contact information schema
export const contactSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
});

// Address schema
export const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
});

// Create company schema
export const createCompanySchema = insertCompanySchema.extend({
  contact: contactSchema.optional(),
  address: addressSchema.optional(),
  // Ensure countryID and industryID are valid UUIDs
  countryID: z.string().uuid({ message: "Country ID must be a valid UUID" }),
  industryID: z.string().uuid({ message: "Industry ID must be a valid UUID" }),
}).omit({ 
  id: true,
  slug: true, // Slug is generated on the server
  createdAt: true, 
  updatedAt: true 
});

// Update company schema
export const updateCompanySchema = createCompanySchema.partial();

// Company response schema
export const companyResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: selectCompanySchema.optional(),
});

// Companies list response schema
export const companiesListResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(selectCompanySchema).optional(),
});

// Type definitions for API responses
export type CompanyResponse = ApiResponse<Company>;
export type CompaniesListResponse = ApiResponse<Company[]>;