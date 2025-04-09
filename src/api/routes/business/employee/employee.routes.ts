/**
 * Employee Routes
 *
 * This file contains CRUD endpoints for employee operations
 */

import { Hono } from "hono";
import { and, eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { db } from "@/api/database/database";
import { loggedIn } from "@/api/utils/loggedIn";
import { createApiResponse } from "@/api/utils/types";
import {
  orgchartTable,
  companyTable,
  departmentTable,
  positionTable,
} from "@/api/database/schema/business.schema";
import { userTable } from "@/api/database/schema/auth.schema";
import { randomUUID } from "crypto";
import type { Context } from "@/api/utils/context";

import {
  createEmployeeSchema,
  updateEmployeeSchema,
  EmployeeResponse,
  EmployeesListResponse,
} from "./employee.zod";

// Employee routes with CRUD operations
export const employeeRoutes = new Hono<{ Variables: Context }>()
  // Get all employees
  .get("/", loggedIn, async (c) => {
    try {
      // Join with user table to get employee details
      const employees = await db
        .select({
          id: orgchartTable.id,
          companyID: orgchartTable.companyID,
          departmentID: orgchartTable.departmentID,
          positionID: orgchartTable.positionID,
          employeeID: orgchartTable.employeeID,
          createdAt: orgchartTable.createdAt,
          updatedAt: orgchartTable.updatedAt,
          // User details
          email: userTable.email,
          fullname: userTable.fullname,
          avatar: userTable.avatar,
          // Company details
          companyTitle: companyTable.title,
          // Department details (if available)
          departmentTitle: departmentTable.title,
          // Position details (if available)
          positionTitle: positionTable.title,
        })
        .from(orgchartTable)
        .leftJoin(userTable, eq(orgchartTable.employeeID, userTable.id))
        .leftJoin(companyTable, eq(orgchartTable.companyID, companyTable.id))
        .leftJoin(
          departmentTable,
          eq(orgchartTable.departmentID, departmentTable.id)
        )
        .leftJoin(
          positionTable,
          eq(orgchartTable.positionID, positionTable.id)
        );

      // No need to parse JSON fields as they are not included in the query

      return c.json(
        createApiResponse<EmployeesListResponse["data"]>(
          true,
          "Employees retrieved successfully",
          employees
        )
      );
    } catch (error) {
      console.error("Error retrieving employees:", error);
      return c.json(
        createApiResponse(false, "Failed to retrieve employees"),
        500
      );
    }
  })
  // Get employee by ID
  .get("/:id", loggedIn, async (c) => {
    try {
      const id = c.req.param("id");

      const employee = await db
        .select({
          id: orgchartTable.id,
          companyID: orgchartTable.companyID,
          departmentID: orgchartTable.departmentID,
          positionID: orgchartTable.positionID,
          employeeID: orgchartTable.employeeID,
          createdAt: orgchartTable.createdAt,
          updatedAt: orgchartTable.updatedAt,
          // User details
          email: userTable.email,
          fullname: userTable.fullname,
          avatar: userTable.avatar,
          // Company details
          companyTitle: companyTable.title,
          // Department details (if available)
          departmentTitle: departmentTable.title,
          // Position details (if available)
          positionTitle: positionTable.title,
        })
        .from(orgchartTable)
        .leftJoin(userTable, eq(orgchartTable.employeeID, userTable.id))
        .leftJoin(companyTable, eq(orgchartTable.companyID, companyTable.id))
        .leftJoin(
          departmentTable,
          eq(orgchartTable.departmentID, departmentTable.id)
        )
        .leftJoin(positionTable, eq(orgchartTable.positionID, positionTable.id))
        .where(eq(orgchartTable.id, id));

      if (!employee || employee.length === 0) {
        return c.json(createApiResponse(false, "Employee not found"), 404);
      }

      // No need to parse JSON fields as they are not included in the query

      return c.json(
        createApiResponse<EmployeeResponse["data"]>(
          true,
          "Employee retrieved successfully",
          employee[0]
        )
      );
    } catch (error) {
      console.error("Error retrieving employee:", error);
      return c.json(
        createApiResponse(false, "Failed to retrieve employee"),
        500
      );
    }
  })
  // Create a new employee
  .post("/", loggedIn, zValidator("json", createEmployeeSchema), async (c) => {
    try {
      const data = c.req.valid("json");

      // Check if user exists
      const [user] = await db
        .select()
        .from(userTable)
        .where(eq(userTable.id, data.employeeID))
        .limit(1);

      if (!user) {
        return c.json(createApiResponse(false, "User not found"), 404);
      }

      // Check if company exists
      const [company] = await db
        .select()
        .from(companyTable)
        .where(eq(companyTable.id, data.companyID))
        .limit(1);

      if (!company) {
        return c.json(createApiResponse(false, "Company not found"), 404);
      }

      // Check if department exists (if provided)
      if (data.departmentID) {
        const [department] = await db
          .select()
          .from(departmentTable)
          .where(eq(departmentTable.id, data.departmentID))
          .limit(1);

        if (!department) {
          return c.json(createApiResponse(false, "Department not found"), 404);
        }
      }

      // Check if position exists (if provided)
      if (data.positionID) {
        const [position] = await db
          .select()
          .from(positionTable)
          .where(eq(positionTable.id, data.positionID))
          .limit(1);

        if (!position) {
          return c.json(createApiResponse(false, "Position not found"), 404);
        }
      }

      // Check if user is already an employee in this company
      const [existingEmployee] = await db
        .select()
        .from(orgchartTable)
        .where(
          and(
            eq(orgchartTable.employeeID, data.employeeID),
            eq(orgchartTable.companyID, data.companyID)
          )
        )
        .limit(1);

      if (existingEmployee) {
        return c.json(
          createApiResponse(
            false,
            "User is already an employee in this company"
          ),
          400
        );
      }

      // Create new employee entry in orgchart
      const newEmployee = await db
        .insert(orgchartTable)
        .values({
          id: randomUUID(),
          companyID: data.companyID,
          departmentID: data.departmentID || null,
          positionID: data.positionID || null,
          employeeID: data.employeeID,
          createdAt: new Date().toISOString(),
        })
        .returning();

      // Get full employee details with joins
      const employeeWithDetails = await db
        .select({
          id: orgchartTable.id,
          companyID: orgchartTable.companyID,
          departmentID: orgchartTable.departmentID,
          positionID: orgchartTable.positionID,
          employeeID: orgchartTable.employeeID,
          createdAt: orgchartTable.createdAt,
          updatedAt: orgchartTable.updatedAt,
          // User details
          email: userTable.email,
          fullname: userTable.fullname,
          avatar: userTable.avatar,
          // Company details
          companyTitle: companyTable.title,
          // Department details (if available)
          departmentTitle: departmentTable.title,
          // Position details (if available)
          positionTitle: positionTable.title,
        })
        .from(orgchartTable)
        .leftJoin(userTable, eq(orgchartTable.employeeID, userTable.id))
        .leftJoin(companyTable, eq(orgchartTable.companyID, companyTable.id))
        .leftJoin(
          departmentTable,
          eq(orgchartTable.departmentID, departmentTable.id)
        )
        .leftJoin(positionTable, eq(orgchartTable.positionID, positionTable.id))
        .where(eq(orgchartTable.id, newEmployee[0].id));

      // No need to parse JSON fields as they are not included in the query

      return c.json(
        createApiResponse<EmployeeResponse["data"]>(
          true,
          "Employee created successfully",
          employeeWithDetails[0]
        )
      );
    } catch (error) {
      console.error("Error creating employee:", error);
      return c.json(createApiResponse(false, "Failed to create employee"), 500);
    }
  })
  // Update employee
  .patch(
    "/:id",
    loggedIn,
    zValidator("json", updateEmployeeSchema),
    async (c) => {
      try {
        const id = c.req.param("id");
        const data = c.req.valid("json");

        // Check if employee exists
        const existingEmployee = await db
          .select()
          .from(orgchartTable)
          .where(eq(orgchartTable.id, id));

        if (!existingEmployee || existingEmployee.length === 0) {
          return c.json(createApiResponse(false, "Employee not found"), 404);
        }

        // Check if department exists (if provided)
        if (data.departmentID) {
          const [department] = await db
            .select()
            .from(departmentTable)
            .where(eq(departmentTable.id, data.departmentID))
            .limit(1);

          if (!department) {
            return c.json(
              createApiResponse(false, "Department not found"),
              404
            );
          }
        }

        // Check if position exists (if provided)
        if (data.positionID) {
          const [position] = await db
            .select()
            .from(positionTable)
            .where(eq(positionTable.id, data.positionID))
            .limit(1);

          if (!position) {
            return c.json(createApiResponse(false, "Position not found"), 404);
          }
        }

        // Update employee
        const updatedEmployee = await db
          .update(orgchartTable)
          .set({
            departmentID:
              data.departmentID !== undefined
                ? data.departmentID
                : existingEmployee[0].departmentID,
            positionID:
              data.positionID !== undefined
                ? data.positionID
                : existingEmployee[0].positionID,
            updatedAt: new Date().toISOString(),
          })
          .where(eq(orgchartTable.id, id))
          .returning();

        // Get full employee details with joins
        const employeeWithDetails = await db
          .select({
            id: orgchartTable.id,
            companyID: orgchartTable.companyID,
            departmentID: orgchartTable.departmentID,
            positionID: orgchartTable.positionID,
            employeeID: orgchartTable.employeeID,
            createdAt: orgchartTable.createdAt,
            updatedAt: orgchartTable.updatedAt,
            // User details
            email: userTable.email,
            fullname: userTable.fullname,
            avatar: userTable.avatar,
            // Company details
            companyTitle: companyTable.title,
            // Department details (if available)
            departmentTitle: departmentTable.title,
            // Position details (if available)
            positionTitle: positionTable.title,
          })
          .from(orgchartTable)
          .leftJoin(userTable, eq(orgchartTable.employeeID, userTable.id))
          .leftJoin(companyTable, eq(orgchartTable.companyID, companyTable.id))
          .leftJoin(
            departmentTable,
            eq(orgchartTable.departmentID, departmentTable.id)
          )
          .leftJoin(
            positionTable,
            eq(orgchartTable.positionID, positionTable.id)
          )
          .where(eq(orgchartTable.id, updatedEmployee[0].id));

        return c.json(
          createApiResponse<EmployeeResponse["data"]>(
            true,
            "Employee updated successfully",
            employeeWithDetails[0]
          )
        );
      } catch (error) {
        console.error("Error updating employee:", error);
        return c.json(
          createApiResponse(false, "Failed to update employee"),
          500
        );
      }
    }
  )
  // Delete employee
  .delete("/:id", loggedIn, async (c) => {
    try {
      const id = c.req.param("id");

      // Check if employee exists
      const existingEmployee = await db
        .select()
        .from(orgchartTable)
        .where(eq(orgchartTable.id, id));

      if (!existingEmployee || existingEmployee.length === 0) {
        return c.json(createApiResponse(false, "Employee not found"), 404);
      }

      // Delete employee from orgchart
      await db.delete(orgchartTable).where(eq(orgchartTable.id, id));

      return c.json(createApiResponse(true, "Employee deleted successfully"));
    } catch (error) {
      console.error("Error deleting employee:", error);
      return c.json(createApiResponse(false, "Failed to delete employee"), 500);
    }
  });
