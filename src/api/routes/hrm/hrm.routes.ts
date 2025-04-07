import { Hono } from "hono";
import type { Context } from "@/api/utils/context";
import {
  departmentTable,
  positionTable,
  orgchartTable,
} from "@/api/database/schema/business.schema";
import { ApiResponse } from "@/api/utils/types";
import { db } from "@/api/database/database";
import { eq } from "drizzle-orm";
import {
  Department,
  InsertDepartment,
  UpdateDepartment,
  DeleteDepartment,
  insertDepartmentSchema,
  updateDepartmentSchema,
  deleteDepartmentSchema,
} from "./department/department.zod";
import {
  Position,
  InsertPosition,
  UpdatePosition,
  DeletePosition,
  insertPositionSchema,
  updatePositionSchema,
  deletePositionSchema,
  JsonValue,
} from "./position/position.zod";
import {
  Employee,
  InsertEmployee,
  UpdateEmployee,
  DeleteEmployee,
  insertEmployeeSchema,
  updateEmployeeSchema,
  deleteEmployeeSchema,
} from "./employee/employee.zod";
import { zValidator } from "@hono/zod-validator";
import crypto from "crypto";
import { uuidParamSchema } from "@/api/utils/id.zod";
import { loggedIn } from "@/api/utils/loggedIn";

export const hrmRouter = new Hono<Context>()
  // CRUD department
  .get("/department", loggedIn, async (c) => {
    try {
      const departmentList = await db.select().from(departmentTable);
      return c.json<ApiResponse<Department[]>>({
        success: true,
        message: "Departments fetched successfully",
        data: departmentList,
      });
    } catch (error) {
      return c.json<ApiResponse<null>>(
        {
          success: false,
          message: `Failed to fetch departments: ${error instanceof Error ? error.message : "Unknown error"}`,
          data: null,
        },
        500
      );
    }
  })

  .get("/department/:id", loggedIn, async (c) => {
    try {
      const id = c.req.param("id");

      // Validate ID format
      const result = uuidParamSchema.safeParse(id);
      if (!result.success) {
        return c.json<ApiResponse<null>>(
          {
            success: false,
            message: "Invalid department ID format",
            data: null,
          },
          400
        );
      }

      const department = await db
        .select()
        .from(departmentTable)
        .where(eq(departmentTable.id, id));

      if (!department || department.length === 0) {
        return c.json<ApiResponse<null>>(
          {
            success: false,
            message: "Department not found",
            data: null,
          },
          404
        );
      }

      return c.json<ApiResponse<Department>>({
        success: true,
        message: "Department fetched successfully",
        data: department[0],
      });
    } catch (error) {
      return c.json<ApiResponse<null>>(
        {
          success: false,
          message: `Failed to fetch department: ${error instanceof Error ? error.message : "Unknown error"}`,
          data: null,
        },
        500
      );
    }
  })

  .post(
    "/newDepartment",
    zValidator("json", insertDepartmentSchema),
    loggedIn,
    async (c) => {
      try {
        const data = c.req.valid("json") as InsertDepartment;
        const newDepartment = {
          ...data,
          id: data.id || crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await db.insert(departmentTable).values(newDepartment);

        return c.json<ApiResponse<InsertDepartment>>(
          {
            success: true,
            message: "Department created successfully",
            data: newDepartment,
          },
          201
        );
      } catch (error) {
        return c.json<ApiResponse<null>>(
          {
            success: false,
            message: `Failed to create department: ${error instanceof Error ? error.message : "Unknown error"}`,
            data: null,
          },
          500
        );
      }
    }
  )

  .put(
    "/editDepartment",
    zValidator("json", updateDepartmentSchema),
    loggedIn,
    async (c) => {
      try {
        const data = c.req.valid("json") as UpdateDepartment;

        // Check if department exists
        const existingDepartment = await db
          .select()
          .from(departmentTable)
          .where(eq(departmentTable.id, data.id));

        if (!existingDepartment || existingDepartment.length === 0) {
          return c.json<ApiResponse<null>>(
            {
              success: false,
              message: "Department not found",
              data: null,
            },
            404
          );
        }

        const updateData = {
          ...data,
          updatedAt: new Date().toISOString(),
        };

        await db
          .update(departmentTable)
          .set(updateData)
          .where(eq(departmentTable.id, data.id));

        return c.json<ApiResponse<UpdateDepartment>>({
          success: true,
          message: "Department updated successfully",
          data: updateData,
        });
      } catch (error) {
        return c.json<ApiResponse<null>>(
          {
            success: false,
            message: `Failed to update department: ${error instanceof Error ? error.message : "Unknown error"}`,
            data: null,
          },
          500
        );
      }
    }
  )

  .delete(
    "/deleteDepartment",
    zValidator("json", deleteDepartmentSchema),
    loggedIn,
    async (c) => {
      try {
        const { id } = c.req.valid("json") as DeleteDepartment;

        // Check if department exists
        const existingDepartment = await db
          .select()
          .from(departmentTable)
          .where(eq(departmentTable.id, id));

        if (!existingDepartment || existingDepartment.length === 0) {
          return c.json<ApiResponse<null>>(
            {
              success: false,
              message: "Department not found",
              data: null,
            },
            404
          );
        }

        await db.delete(departmentTable).where(eq(departmentTable.id, id));

        return c.json<ApiResponse<{ id: string }>>({
          success: true,
          message: "Department deleted successfully",
          data: { id },
        });
      } catch (error) {
        return c.json<ApiResponse<null>>(
          {
            success: false,
            message: `Failed to delete department: ${error instanceof Error ? error.message : "Unknown error"}`,
            data: null,
          },
          500
        );
      }
    }
  )
  // CRUD position
  .get("/position", loggedIn, async (c) => {
    try {
      const positionList = await db.select().from(positionTable);

      // Cast the database results to the Position type to handle JSON fields properly
      const typedPositionList = positionList.map((pos) => ({
        ...pos,
        jobDescription: pos.jobDescription as JsonValue,
        salary: pos.salary as JsonValue,
      }));

      return c.json<ApiResponse<Position[]>>({
        success: true,
        message: "Positions fetched successfully",
        data: typedPositionList,
      });
    } catch (error) {
      return c.json<ApiResponse<null>>(
        {
          success: false,
          message: `Failed to fetch positions: ${error instanceof Error ? error.message : "Unknown error"}`,
          data: null,
        },
        500
      );
    }
  })

  .get("/position/:id", loggedIn, async (c) => {
    try {
      const id = c.req.param("id");

      // Validate ID format
      const result = uuidParamSchema.safeParse(id);
      if (!result.success) {
        return c.json<ApiResponse<null>>(
          {
            success: false,
            message: "Invalid position ID format",
            data: null,
          },
          400
        );
      }

      const position = await db
        .select()
        .from(positionTable)
        .where(eq(positionTable.id, id));

      if (!position || position.length === 0) {
        return c.json<ApiResponse<null>>(
          {
            success: false,
            message: "Position not found",
            data: null,
          },
          404
        );
      }

      // Cast the database result to the Position type to handle JSON fields properly
      const typedPosition: Position = {
        ...position[0],
        jobDescription: position[0].jobDescription as JsonValue,
        salary: position[0].salary as JsonValue,
      };

      return c.json<ApiResponse<Position>>({
        success: true,
        message: "Position fetched successfully",
        data: typedPosition,
      });
    } catch (error) {
      return c.json<ApiResponse<null>>(
        {
          success: false,
          message: `Failed to fetch position: ${error instanceof Error ? error.message : "Unknown error"}`,
          data: null,
        },
        500
      );
    }
  })

  .post(
    "/newPosition",
    zValidator("json", insertPositionSchema),
    loggedIn,
    async (c) => {
      try {
        const data = c.req.valid("json") as InsertPosition;
        const newPosition = {
          ...data,
          id: data.id || crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await db.insert(positionTable).values(newPosition);

        return c.json<ApiResponse<InsertPosition>>(
          {
            success: true,
            message: "Position created successfully",
            data: newPosition,
          },
          201
        );
      } catch (error) {
        return c.json<ApiResponse<null>>(
          {
            success: false,
            message: `Failed to create position: ${error instanceof Error ? error.message : "Unknown error"}`,
            data: null,
          },
          500
        );
      }
    }
  )

  .put(
    "/editPosition",
    zValidator("json", updatePositionSchema),
    loggedIn,
    async (c) => {
      try {
        const data = c.req.valid("json") as UpdatePosition;

        // Check if position exists
        const existingPosition = await db
          .select()
          .from(positionTable)
          .where(eq(positionTable.id, data.id));

        if (!existingPosition || existingPosition.length === 0) {
          return c.json<ApiResponse<null>>(
            {
              success: false,
              message: "Position not found",
              data: null,
            },
            404
          );
        }

        const updateData = {
          ...data,
          updatedAt: new Date().toISOString(),
        };

        await db
          .update(positionTable)
          .set(updateData)
          .where(eq(positionTable.id, data.id));

        return c.json<ApiResponse<UpdatePosition>>({
          success: true,
          message: "Position updated successfully",
          data: updateData,
        });
      } catch (error) {
        return c.json<ApiResponse<null>>(
          {
            success: false,
            message: `Failed to update position: ${error instanceof Error ? error.message : "Unknown error"}`,
            data: null,
          },
          500
        );
      }
    }
  )

  .delete(
    "/deletePosition",
    zValidator("json", deletePositionSchema),
    loggedIn,
    async (c) => {
      try {
        const { id } = c.req.valid("json") as DeletePosition;

        // Check if position exists
        const existingPosition = await db
          .select()
          .from(positionTable)
          .where(eq(positionTable.id, id));

        if (!existingPosition || existingPosition.length === 0) {
          return c.json<ApiResponse<null>>(
            {
              success: false,
              message: "Position not found",
              data: null,
            },
            404
          );
        }

        await db.delete(positionTable).where(eq(positionTable.id, id));

        return c.json<ApiResponse<{ id: string }>>({
          success: true,
          message: "Position deleted successfully",
          data: { id },
        });
      } catch (error) {
        return c.json<ApiResponse<null>>(
          {
            success: false,
            message: `Failed to delete position: ${error instanceof Error ? error.message : "Unknown error"}`,
            data: null,
          },
          500
        );
      }
    }
  )
  // CRUD employee
  .get("/employee", loggedIn, async (c) => {
    try {
      const employeeList = await db.select().from(orgchartTable);
      return c.json<ApiResponse<Employee[]>>({
        success: true,
        message: "Employees fetched successfully",
        data: employeeList,
      });
    } catch (error) {
      return c.json<ApiResponse<null>>(
        {
          success: false,
          message: `Failed to fetch employees: ${error instanceof Error ? error.message : "Unknown error"}`,
          data: null,
        },
        500
      );
    }
  })

  .get("/employee/:id", loggedIn, async (c) => {
    try {
      const id = c.req.param("id");

      // Validate ID format
      const result = uuidParamSchema.safeParse(id);
      if (!result.success) {
        return c.json<ApiResponse<null>>(
          {
            success: false,
            message: "Invalid employee ID format",
            data: null,
          },
          400
        );
      }

      const employee = await db
        .select()
        .from(orgchartTable)
        .where(eq(orgchartTable.id, id));

      if (!employee || employee.length === 0) {
        return c.json<ApiResponse<null>>(
          {
            success: false,
            message: "Employee not found",
            data: null,
          },
          404
        );
      }

      return c.json<ApiResponse<Employee>>({
        success: true,
        message: "Employee fetched successfully",
        data: employee[0],
      });
    } catch (error) {
      return c.json<ApiResponse<null>>(
        {
          success: false,
          message: `Failed to fetch employee: ${error instanceof Error ? error.message : "Unknown error"}`,
          data: null,
        },
        500
      );
    }
  })

  .post(
    "/newEmployee",
    zValidator("json", insertEmployeeSchema),
    loggedIn,
    async (c) => {
      try {
        const data = c.req.valid("json") as InsertEmployee;
        const newEmployee = {
          ...data,
          id: data.id || crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await db.insert(orgchartTable).values(newEmployee);

        return c.json<ApiResponse<InsertEmployee>>(
          {
            success: true,
            message: "Employee created successfully",
            data: newEmployee,
          },
          201
        );
      } catch (error) {
        return c.json<ApiResponse<null>>(
          {
            success: false,
            message: `Failed to create employee: ${error instanceof Error ? error.message : "Unknown error"}`,
            data: null,
          },
          500
        );
      }
    }
  )

  .put(
    "/editEmployee",
    zValidator("json", updateEmployeeSchema),
    loggedIn,
    async (c) => {
      try {
        const data = c.req.valid("json") as UpdateEmployee;

        // Check if employee exists
        const existingEmployee = await db
          .select()
          .from(orgchartTable)
          .where(eq(orgchartTable.id, data.id));

        if (!existingEmployee || existingEmployee.length === 0) {
          return c.json<ApiResponse<null>>(
            {
              success: false,
              message: "Employee not found",
              data: null,
            },
            404
          );
        }

        const updateData = {
          ...data,
          updatedAt: new Date().toISOString(),
        };

        await db
          .update(orgchartTable)
          .set(updateData)
          .where(eq(orgchartTable.id, data.id));

        return c.json<ApiResponse<UpdateEmployee>>({
          success: true,
          message: "Employee updated successfully",
          data: updateData,
        });
      } catch (error) {
        return c.json<ApiResponse<null>>(
          {
            success: false,
            message: `Failed to update employee: ${error instanceof Error ? error.message : "Unknown error"}`,
            data: null,
          },
          500
        );
      }
    }
  )

  .delete(
    "/deleteEmployee",
    zValidator("json", deleteEmployeeSchema),
    loggedIn,
    async (c) => {
      try {
        const { id } = c.req.valid("json") as DeleteEmployee;

        // Check if employee exists
        const existingEmployee = await db
          .select()
          .from(orgchartTable)
          .where(eq(orgchartTable.id, id));

        if (!existingEmployee || existingEmployee.length === 0) {
          return c.json<ApiResponse<null>>(
            {
              success: false,
              message: "Employee not found",
              data: null,
            },
            404
          );
        }

        await db.delete(orgchartTable).where(eq(orgchartTable.id, id));

        return c.json<ApiResponse<{ id: string }>>({
          success: true,
          message: "Employee deleted successfully",
          data: { id },
        });
      } catch (error) {
        return c.json<ApiResponse<null>>(
          {
            success: false,
            message: `Failed to delete employee: ${error instanceof Error ? error.message : "Unknown error"}`,
            data: null,
          },
          500
        );
      }
    }
  );
