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
export const createCompanySchema = insertCompanySchema
  .extend({
    contact: contactSchema.optional(),
    address: addressSchema.optional(),
    // Ensure countryID and industryID are valid UUIDs
    countryID: z.string().uuid({ message: "Country ID must be a valid UUID" }),
    industryID: z
      .string()
      .uuid({ message: "Industry ID must be a valid UUID" }),
  })
  .omit({
    id: true,
    slug: true, // Slug is generated on the server
    createdAt: true,
    updatedAt: true,
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

// Form-specific schema for the Company form
export const companyFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Company name is required"),
  description: z.string().optional(),
  bin: z.string().optional(),
  logo: z.unknown().optional(),
  // Fields for the QInput components
  residence: z.string().optional(),
  industry: z.string().optional(),
  // IDs that will be mapped to countryID and industryID
  residenceId: z.string().uuid({ message: "Please select a valid country" }),
  industryId: z.string().uuid({ message: "Please select a valid industry" }),
  // Contact fields
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.string().length(0)),
  // Address fields
  addressLine: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  postcode: z.string().optional(),
  state: z.string().optional(),
});

// Type for the form values
export type CompanyFormValues = z.infer<typeof companyFormSchema>;

// Helper function to transform form values to API schema
export const transformFormToApiData = (formData: CompanyFormValues) => {
  return {
    ...formData,
    // Map form field names to API field names
    countryID: formData.residenceId,
    industryID: formData.industryId,
    // Structure contact and address as expected by the API
    contact: {
      phone: formData.phone,
      website: formData.website,
    },
    address: {
      street: formData.addressLine,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postcode,
      country: formData.country,
    },
  };
};

// Type definitions for API responses
export type CompanyResponse = ApiResponse<Company>;
export type CompaniesListResponse = ApiResponse<Company[]>;
