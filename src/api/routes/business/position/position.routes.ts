/**
 * Position Routes
 *
 * This file contains CRUD endpoints for position operations
 */

import { Hono } from "hono";
import { and, eq, isNull, ne } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { db } from "@/api/database/database";
import { loggedIn } from "@/api/utils/loggedIn";
import { createApiResponse } from "@/api/utils/types";
import {
  positionTable,
  orgchartTable,
} from "@/api/database/schema/business.schema";
import type { Context } from "@/api/utils/context";

import {
  createPositionSchema,
  updatePositionSchema,
  PositionResponse,
  PositionsListResponse,
} from "./position.zod";

// Position routes with CRUD operations
export const positionRoutes = new Hono<{ Variables: Context }>()
  // Get all positions
  .get("/", loggedIn, async (c) => {
    try {
      const positions = await db.select().from(positionTable);

      return c.json(
        createApiResponse<PositionsListResponse["data"]>(
          true,
          "Positions retrieved successfully",
          positions
        )
      );
    } catch (error) {
      console.error("Error retrieving positions:", error);
      return c.json(
        createApiResponse(false, "Failed to retrieve positions"),
        500
      );
    }
  })
  // Get position by ID
  .get("/:id", loggedIn, async (c) => {
    try {
      const id = c.req.param("id");

      const position = await db
        .select()
        .from(positionTable)
        .where(eq(positionTable.id, id));

      if (!position || position.length === 0) {
        return c.json(createApiResponse(false, "Position not found"), 404);
      }

      return c.json(
        createApiResponse<PositionResponse["data"]>(
          true,
          "Position retrieved successfully",
          position[0]
        )
      );
    } catch (error) {
      console.error("Error retrieving position:", error);
      return c.json(
        createApiResponse(false, "Failed to retrieve position"),
        500
      );
    }
  })
  // Create a new position
  .post("/", loggedIn, zValidator("json", createPositionSchema), async (c) => {
    try {
      const data = c.req.valid("json");

      // Check if position with same title exists in the same company
      const [existingPosition] = await db
        .select()
        .from(positionTable)
        .where(
          and(
            eq(positionTable.title, data.title),
            eq(positionTable.companyID, data.companyID),
            data.parentID === null
              ? isNull(positionTable.parentID)
              : eq(positionTable.parentID, data.parentID || "")
          )
        )
        .limit(1);

      if (existingPosition) {
        return c.json(
          createApiResponse(
            false,
            "Position with this title already exists in this company"
          ),
          400
        );
      }

      // Create new position
      const newPosition = await db
        .insert(positionTable)
        .values({
          id: crypto.randomUUID(),
          title: data.title,
          companyID: data.companyID,
          parentID: data.parentID || null,
          jobDescription: data.jobDescription
            ? JSON.stringify(data.jobDescription)
            : null,
          salary: data.salary ? JSON.stringify(data.salary) : null,
          isVacant: data.isVacant !== undefined ? data.isVacant : true,
          createdAt: new Date().toISOString(),
        })
        .returning();

      return c.json(
        createApiResponse<PositionResponse["data"]>(
          true,
          "Position created successfully",
          newPosition[0]
        )
      );
    } catch (error) {
      console.error("Error creating position:", error);
      return c.json(createApiResponse(false, "Failed to create position"), 500);
    }
  })
  // Update position
  .patch(
    "/:id",
    loggedIn,
    zValidator("json", updatePositionSchema),
    async (c) => {
      try {
        const id = c.req.param("id");
        const data = c.req.valid("json");

        // Check if position exists
        const existingPosition = await db
          .select()
          .from(positionTable)
          .where(eq(positionTable.id, id));

        if (!existingPosition || existingPosition.length === 0) {
          return c.json(createApiResponse(false, "Position not found"), 404);
        }

        // Check if a position with the same title exists in the same company (excluding current position)
        if (data.title || data.companyID || data.parentID !== undefined) {
          const [duplicatePosition] = await db
            .select()
            .from(positionTable)
            .where(
              and(
                eq(
                  positionTable.title,
                  data.title || existingPosition[0].title
                ),
                eq(
                  positionTable.companyID,
                  data.companyID || existingPosition[0].companyID
                ),
                data.parentID !== undefined
                  ? data.parentID === null
                    ? isNull(positionTable.parentID)
                    : eq(positionTable.parentID, data.parentID || "")
                  : existingPosition[0].parentID === null
                    ? isNull(positionTable.parentID)
                    : eq(
                        positionTable.parentID,
                        existingPosition[0].parentID || ""
                      ),
                ne(positionTable.id, id)
              )
            )
            .limit(1);

          if (duplicatePosition) {
            return c.json(
              createApiResponse(
                false,
                "Another position with this title already exists in this company"
              ),
              400
            );
          }
        }

        // Update position
        const updatedPosition = await db
          .update(positionTable)
          .set({
            title:
              data.title !== undefined ? data.title : existingPosition[0].title,
            companyID:
              data.companyID !== undefined
                ? data.companyID
                : existingPosition[0].companyID,
            parentID:
              data.parentID !== undefined
                ? data.parentID
                : existingPosition[0].parentID,
            jobDescription:
              data.jobDescription !== undefined
                ? JSON.stringify(data.jobDescription)
                : existingPosition[0].jobDescription,
            salary:
              data.salary !== undefined
                ? JSON.stringify(data.salary)
                : existingPosition[0].salary,
            isVacant:
              data.isVacant !== undefined
                ? data.isVacant
                : existingPosition[0].isVacant,
            updatedAt: new Date().toISOString(),
          })
          .where(eq(positionTable.id, id))
          .returning();

        return c.json(
          createApiResponse<PositionResponse["data"]>(
            true,
            "Position updated successfully",
            updatedPosition[0]
          )
        );
      } catch (error) {
        console.error("Error updating position:", error);
        return c.json(
          createApiResponse(false, "Failed to update position"),
          500
        );
      }
    }
  )
  // Delete position
  .delete("/:id", loggedIn, async (c) => {
    try {
      const id = c.req.param("id");

      // Check if position exists
      const existingPosition = await db
        .select()
        .from(positionTable)
        .where(eq(positionTable.id, id));

      if (!existingPosition || existingPosition.length === 0) {
        return c.json(createApiResponse(false, "Position not found"), 404);
      }

      // Check if position has employees assigned in orgchart
      const [orgchartReference] = await db
        .select()
        .from(orgchartTable)
        .where(eq(orgchartTable.positionID, id))
        .limit(1);

      if (orgchartReference) {
        return c.json(
          createApiResponse(
            false,
            "Cannot delete position that has employees assigned. Remove employees first."
          ),
          400
        );
      }

      // Check if position has child positions
      const [childPosition] = await db
        .select()
        .from(positionTable)
        .where(eq(positionTable.parentID, id))
        .limit(1);

      if (childPosition) {
        return c.json(
          createApiResponse(
            false,
            "Cannot delete position that has child positions. Delete child positions first."
          ),
          400
        );
      }

      // Delete position
      await db.delete(positionTable).where(eq(positionTable.id, id));

      return c.json(createApiResponse(true, "Position deleted successfully"));
    } catch (error) {
      console.error("Error deleting position:", error);
      return c.json(createApiResponse(false, "Failed to delete position"), 500);
    }
  });
