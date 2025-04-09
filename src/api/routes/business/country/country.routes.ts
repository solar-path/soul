/**
 * Country Routes
 *
 * This file contains read-only endpoints for country operations
 */

import { Hono } from "hono";
import type { Context } from "@/api/utils/context";
import { eq } from "drizzle-orm";
import { db } from "@/api/database/database";
import { loggedIn } from "@/api/utils/loggedIn";
import { countryTable } from "@/api/database/schema/business.schema";
import { zValidator } from "@hono/zod-validator";
import { idSchema } from "@/api/utils/id.zod";

import { CountryResponse, CountriesListResponse } from "./country.zod";
import { createApiResponse } from "@/api/utils/types";

// Country routes (read-only)
export const countryRoutes = new Hono<{ Variables: Context }>()
  .get("/", loggedIn, async (c) => {
    try {
      const countries = await db.select().from(countryTable);

      return c.json(
        createApiResponse<CountriesListResponse["data"]>(
          true,
          "Countries retrieved successfully",
          countries
        )
      );
    } catch (error) {
      console.error("Error retrieving countries:", error);
      return c.json(
        createApiResponse(false, "Failed to retrieve countries"),
        500
      );
    }
  })
  .get("/:id", loggedIn, zValidator("param", idSchema), async (c) => {
    try {
      const { id } = c.req.valid("param");
      const country = await db
        .select()
        .from(countryTable)
        .where(eq(countryTable.id, id));

      if (!country || country.length === 0) {
        return c.json(createApiResponse(false, "Country not found"), 404);
      }

      return c.json(
        createApiResponse<CountryResponse["data"]>(
          true,
          "Country retrieved successfully",
          country[0]
        )
      );
    } catch (error) {
      console.error("Error retrieving country:", error);
      return c.json(
        createApiResponse(false, "Failed to retrieve country"),
        500
      );
    }
  });
