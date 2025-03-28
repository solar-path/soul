import { timestampFields } from "@/api/utils/types";
import { z } from "zod";

export const companySchema = z.object({
  title: z.string().min(3),
  bin: z.string().min(3),
  logo: z.string().optional(),
  countryID: z.string().min(3),
  industryID: z.string().min(3),
  author: z.string().min(3),
});

export type Company = z.infer<typeof companySchema>;

export const countrySchema = z.object({
  id: z.string(),
  title: z.string(),
  ISO3: z.string(),
  currency: z.string(),
  currencyCode: z.string(),
});

export type Country = z.infer<typeof countrySchema>;

// Industry schemas
const industryBase = {
  id: z.string(),
  title: z.string(),
  parentID: z.string().nullable(),
  description: z.string().nullable(),
} as const;

// Create different schemas for different use cases
export const industrySchema = z.object(industryBase);
export const industryCreateSchema = industrySchema.omit({ id: true }); // For creation, ID is auto-generated
export const industryUpdateSchema = industryCreateSchema.partial(); // For updates, all fields are optional
export const industryResponseSchema = industrySchema.extend(timestampFields);

// Types
export type IndustryCreate = z.infer<typeof industryCreateSchema>;
export type IndustryUpdate = z.infer<typeof industryUpdateSchema>;
export type IndustryResponse = z.infer<typeof industryResponseSchema>;
