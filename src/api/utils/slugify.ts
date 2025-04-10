import { db } from "../database/database";
import { eq, and, not } from "drizzle-orm";
import { companyTable } from "../database/schema/business.schema";

/**
 * Creates a URL-friendly slug from a string
 * @param base - The string to convert to a slug
 * @returns A URL-friendly slug
 */
export const createBasicSlug = (base: string): string => {
  return base
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
};

/**
 * Generates a unique slug for a business
 * @param name - The business name to create a slug from
 * @param existingId - Optional ID of an existing business (for updates)
 * @returns A unique slug that doesn't conflict with existing ones
 */
export const generateUniqueSlug = async (
  name: string,
  existingId?: string
): Promise<string> => {
  // Create the base slug
  let slug = createBasicSlug(name);

  // If slug is empty (rare case with only special characters), use a fallback
  if (!slug) {
    slug = "business";
  }

  let isUnique = false;
  let counter = 0;
  let finalSlug = slug;

  // Keep checking until we find a unique slug
  while (!isUnique) {
    // Query to check if the slug already exists
    const existing = existingId
      ? await db
          .select()
          .from(companyTable)
          .where(
            and(
              eq(companyTable.slug, finalSlug),
              not(eq(companyTable.id, existingId))
            )
          )
      : await db
          .select()
          .from(companyTable)
          .where(eq(companyTable.slug, finalSlug));

    if (existing.length === 0) {
      // Slug is unique
      isUnique = true;
    } else {
      // Slug exists, append counter and try again
      counter++;
      finalSlug = `${slug}-${counter}`;
    }
  }

  return finalSlug;
};

/**
 * Legacy function for backward compatibility
 * @deprecated Use generateUniqueSlug instead
 */
export const slugify = async (base: string) => {
  return createBasicSlug(base);
};
