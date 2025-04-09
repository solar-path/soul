/**
 * Industry Routes
 *
 * This file contains read-only endpoints for industry operations
 */

import { Hono } from "hono";
import type { Context } from "@/api/utils/context";
import { and, eq, isNotNull } from "drizzle-orm";
import { db } from "@/api/database/database";
import { loggedIn } from "@/api/utils/loggedIn";
import { createApiResponse } from "@/api/utils/types";
import { industryTable } from "@/api/database/schema/business.schema";

import { IndustryResponse, IndustriesListResponse } from "./industry.zod";
import { zValidator } from "@hono/zod-validator";
import { idSchema } from "@/api/utils/id.zod";

// Industry routes (read-only)
export const industryRoutes = new Hono<{ Variables: Context }>()
  .get("/", loggedIn, async (c) => {
    try {
      const industries = await db
        .select()
        .from(industryTable)
        .where(
          and(
            isNotNull(industryTable.parentID),
            isNotNull(industryTable.description)
          )
        );

      return c.json(
        createApiResponse<IndustriesListResponse["data"]>(
          true,
          "Industries retrieved successfully",
          industries
        )
      );
    } catch (error) {
      console.error("Error retrieving industries:", error);
      return c.json(
        createApiResponse(false, "Failed to retrieve industries"),
        500
      );
    }
  })
  .get("/:id", loggedIn, zValidator("param", idSchema), async (c) => {
    try {
      const { id } = c.req.valid("param");
      const industry = await db
        .select()
        .from(industryTable)
        .where(eq(industryTable.id, id));

      if (!industry || industry.length === 0) {
        return c.json(createApiResponse(false, "Industry not found"), 404);
      }

      return c.json(
        createApiResponse<IndustryResponse["data"]>(
          true,
          "Industry retrieved successfully",
          industry[0]
        )
      );
    } catch (error) {
      console.error("Error retrieving industry:", error);
      return c.json(
        createApiResponse(false, "Failed to retrieve industry"),
        500
      );
    }
  });
