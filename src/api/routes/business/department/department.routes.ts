/**
 * Department Routes
 *
 * This file contains CRUD endpoints for department operations
 */

import { Hono } from "hono";
import type { Context } from "@/api/utils/context";
import { and, eq, isNull, ne } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { db } from "@/api/database/database";
import { loggedIn } from "@/api/utils/loggedIn";
import { createApiResponse } from "@/api/utils/types";
import { departmentTable } from "@/api/database/schema/business.schema";
import { randomUUID } from "crypto";

import {
  createDepartmentSchema,
  updateDepartmentSchema,
  DepartmentResponse,
  DepartmentsListResponse,
} from "./department.zod";
import { idSchema } from "@/api/utils/id.zod";

// Department routes with CRUD operations
export const departmentRoutes = new Hono<{ Variables: Context }>()
  // Get all departments
  .get("/", loggedIn, async (c) => {
    try {
      const departments = await db.select().from(departmentTable);

      return c.json(
        createApiResponse<DepartmentsListResponse["data"]>(
          true,
          "Departments retrieved successfully",
          departments
        )
      );
    } catch (error) {
      console.error("Error retrieving departments:", error);
      return c.json(
        createApiResponse(false, "Failed to retrieve departments"),
        500
      );
    }
  })
  // Get a department by ID
  .get("/:id", loggedIn, zValidator("param", idSchema), async (c) => {
    try {
      const { id } = c.req.valid("param");
      const department = await db
        .select()
        .from(departmentTable)
        .where(eq(departmentTable.id, id));

      if (!department || department.length === 0) {
        return c.json(createApiResponse(false, "Department not found"), 404);
      }

      return c.json(
        createApiResponse<DepartmentResponse["data"]>(
          true,
          "Department retrieved successfully",
          department[0]
        )
      );
    } catch (error) {
      console.error("Error retrieving department:", error);
      return c.json(
        createApiResponse(false, "Failed to retrieve department"),
        500
      );
    }
  })
  // Create a new department
  .post(
    "/",
    loggedIn,
    zValidator("json", createDepartmentSchema),
    async (c) => {
      try {
        const data = c.req.valid("json");

        // Check if a department with the same title exists in the same company
        const existingDepartment = await db
          .select()
          .from(departmentTable)
          .where(
            and(
              eq(departmentTable.title, data.title),
              eq(departmentTable.companyID, data.companyID),
              data.parentID === null
                ? isNull(departmentTable.parentID)
                : eq(departmentTable.parentID, data.parentID || "")
            )
          )
          .limit(1);

        if (existingDepartment.length > 0) {
          return c.json(
            createApiResponse(
              false,
              "A department with this title already exists in this company"
            ),
            400
          );
        }

        // Create new department
        const timestamp = new Date().toISOString();
        const newDepartment = await db
          .insert(departmentTable)
          .values({
            id: randomUUID(),
            title: data.title,
            parentID: data.parentID || null,
            headcount: data.headcount || null,
            companyID: data.companyID,
            createdAt: timestamp,
            updatedAt: timestamp,
          })
          .returning();

        return c.json(
          createApiResponse<DepartmentResponse["data"]>(
            true,
            "Department created successfully",
            newDepartment[0]
          )
        );
      } catch (error) {
        console.error("Error creating department:", error);
        return c.json(
          createApiResponse(false, "Failed to create department"),
          500
        );
      }
    }
  )
  // Update a department
  .put(
    "/:id",
    loggedIn,
    zValidator("json", updateDepartmentSchema),
    async (c) => {
      try {
        const id = c.req.param("id");
        const data = c.req.valid("json");

        // Check if department exists
        const existingDepartment = await db
          .select()
          .from(departmentTable)
          .where(eq(departmentTable.id, id));

        if (!existingDepartment || existingDepartment.length === 0) {
          return c.json(createApiResponse(false, "Department not found"), 404);
        }

        // Check if a department with the same title exists in the same company (excluding current department)
        if (data.title) {
          const duplicateDepartment = await db
            .select()
            .from(departmentTable)
            .where(
              and(
                eq(departmentTable.title, data.title),
                eq(
                  departmentTable.companyID,
                  data.companyID || existingDepartment[0].companyID
                ),
                data.parentID !== undefined
                  ? data.parentID === null
                    ? isNull(departmentTable.parentID)
                    : eq(departmentTable.parentID, data.parentID)
                  : existingDepartment[0].parentID === null
                    ? isNull(departmentTable.parentID)
                    : eq(
                        departmentTable.parentID,
                        existingDepartment[0].parentID || ""
                      ),
                ne(departmentTable.id, id)
              )
            )
            .limit(1);

          if (duplicateDepartment.length > 0) {
            return c.json(
              createApiResponse(
                false,
                "A department with this title already exists in this company"
              ),
              400
            );
          }
        }

        // Update department
        const updatedDepartment = await db
          .update(departmentTable)
          .set({
            ...data,
            updatedAt: new Date().toISOString(),
          })
          .where(eq(departmentTable.id, id))
          .returning();

        return c.json(
          createApiResponse<DepartmentResponse["data"]>(
            true,
            "Department updated successfully",
            updatedDepartment[0]
          )
        );
      } catch (error) {
        console.error("Error updating department:", error);
        return c.json(
          createApiResponse(false, "Failed to update department"),
          500
        );
      }
    }
  )
  // Delete a department
  .delete("/:id", loggedIn, async (c) => {
    try {
      const id = c.req.param("id");

      // Check if department exists
      const existingDepartment = await db
        .select()
        .from(departmentTable)
        .where(eq(departmentTable.id, id));

      if (!existingDepartment || existingDepartment.length === 0) {
        return c.json(createApiResponse(false, "Department not found"), 404);
      }

      // Check if department has child departments
      const childDepartments = await db
        .select()
        .from(departmentTable)
        .where(eq(departmentTable.parentID, id));

      if (childDepartments.length > 0) {
        return c.json(
          createApiResponse(
            false,
            "Cannot delete department with child departments. Please delete child departments first."
          ),
          400
        );
      }

      // Delete department
      await db.delete(departmentTable).where(eq(departmentTable.id, id));

      return c.json(createApiResponse(true, "Department deleted successfully"));
    } catch (error) {
      console.error("Error deleting department:", error);
      return c.json(
        createApiResponse(false, "Failed to delete department"),
        500
      );
    }
  });
