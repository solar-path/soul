import industryData from "./industry.data.json";
import { db } from "../../database";
import { industryTable } from "@/api/database/schema/business.schema";

export const seedIndustryData = async () => {
  console.log("Starting to seed industry data...");

  // Create a map to store industry records by code for parent reference
  const industryMap = new Map<number, string>();

  try {
    // Check if data already exists to avoid duplicates
    const existingIndustries = await db.select().from(industryTable);
    if (existingIndustries.length > 0) {
      console.log(
        `Industry data already exists (${existingIndustries.length} records). Skipping seed.`
      );
      return;
    }

    // Sort the data by parentId to ensure parents are created before children
    // null parentId (top-level industries) come first, then industries with parents
    const sortedIndustryData = [...industryData].sort((a, b) => {
      if (a.parentId === null && b.parentId === null) return 0;
      if (a.parentId === null) return -1;
      if (b.parentId === null) return 1;
      return a.parentId - b.parentId;
    });

    console.log(`Processing ${sortedIndustryData.length} industry records...`);

    // Process each industry
    for (const industry of sortedIndustryData) {
      // Prepare the record data
      const recordData = {
        id: crypto.randomUUID(),
        title: industry.title,
        description: industry.description || null,
        parentID:
          industry.parentId !== null
            ? industryMap.get(industry.parentId) || null
            : null,
        updatedAt: new Date().toISOString(),
      };

      try {
        // Insert the record using Drizzle
        await db.insert(industryTable).values(recordData);

        // Store the mapping of code to UUID for parent references
        industryMap.set(industry.code, recordData.id);

        console.log(
          `✅ Created industry: ${industry.title} (${industry.code})`
        );
      } catch (insertError) {
        console.error(
          `❌ Failed to create record for ${industry.title}:`,
          insertError
        );
      }
    }

    console.log("✅ Industry data seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding industry data:", error);
    throw error;
  }
};
